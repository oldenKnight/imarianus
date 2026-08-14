-- ============================================================
--  IMARIANUS — schema v2 (M8: rankings, public profiles, boss records)
--  MySQL 5.7+ / MariaDB 10.2+  •  utf8mb4 / InnoDB, same style as schema.sql
--
--  *** ADDITIVE ONLY — THIS FILE NEVER DESTROYS DATA. ***
--
--  Hard rules obeyed by every statement below:
--    • CREATE TABLE IF NOT EXISTS       (never CREATE OR REPLACE)
--    • ALTER TABLE ... ADD COLUMN       (never MODIFY, never CHANGE, never DROP)
--    • CREATE INDEX                     (never DROP INDEX)
--    • No DELETE, no TRUNCATE, no DROP TABLE, no DROP DATABASE anywhere.
--    • The only UPDATE is a one-time, opt-out backfill of a brand-new column
--      (students.nickname_lc). It writes ONLY that new column, and only where
--      it is still NULL. Existing columns are never touched. See §3.
--
--  It is SAFE TO RUN TWICE. Every statement is guarded, so re-running is a
--  no-op on an already-migrated database.
--
--  Apply it with (see server/README.md §2b for the full procedure):
--      mysql -u USER -p YOURDB < server/schema_v2.sql
--
--  ------------------------------------------------------------
--  THE GUARD PATTERN (why the file looks like this)
--  ------------------------------------------------------------
--  MySQL 5.7 has no "ALTER TABLE ... ADD COLUMN IF NOT EXISTS" (MariaDB does,
--  but shared hosting may be either). The portable, DELIMITER-free way to make
--  a DDL statement conditional is to build it as a string from
--  information_schema and run it through PREPARE/EXECUTE:
--
--      SET @ddl := (SELECT IF(COUNT(*) = 0, '<the DDL>', 'SELECT 1')
--                     FROM information_schema.COLUMNS
--                    WHERE TABLE_SCHEMA = DATABASE() AND ...);
--      PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;
--
--  COUNT(*) always returns exactly one row, so @ddl is never NULL. When the
--  column/index already exists the statement degrades to a harmless SELECT 1.
--  This works in the mysql CLI, in phpMyAdmin, and in Adminer — no stored
--  procedures and no DELIMITER changes, which shared-hosting import tools
--  handle badly.
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ============================================================
-- 1. apps — which product a score came from
--    The account/score service is shared by three separate codebases
--    (this web app, the iFabulae iOS app, the Familia Romana books app).
--    Rows are seeded with FIXED ids so the three codebases can hardcode them.
-- ============================================================
CREATE TABLE IF NOT EXISTS apps (
  id         TINYINT UNSIGNED NOT NULL,
  code       VARCHAR(16) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- INSERT IGNORE: re-running the file leaves existing rows untouched.
INSERT IGNORE INTO apps (id, code) VALUES
  (1, 'web'),
  (2, 'ios'),
  (3, 'books');

-- ============================================================
-- 2. score_events — APPEND-ONLY source of truth for every board
--    Nothing here is ever updated or deleted. Boards are derived from it
--    (or from `progress`, see §5) and cached in leaderboard_cache.
--
--    Column meanings (kept deliberately generic so a new board needs no DDL):
--      board       'total'   XP volume        metric 'xp'
--                  'rating'  quality          metric 'accuracy' (0..100)
--                  'records' speed            metric 'ms' | 'mistakes'
--      metric      what `value` counts (see above)
--      value       BIGINT SIGNED — milliseconds fit, and a signed type leaves
--                  room for a future corrective/negative adjustment row
--                  (an append-only log corrects by appending, never by UPDATE)
--      ref         optional sub-key: the region/liber id for 'records'.
--                  (Extra column beyond the brief's list; a records board is
--                   per-region and without it the board id would have to be
--                   smuggled into `metric` as a compound string.)
--      achieved_at when it happened — the weekly board windows on THIS column
-- ============================================================
CREATE TABLE IF NOT EXISTS score_events (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id  BIGINT UNSIGNED NOT NULL,
  app_id      TINYINT UNSIGNED NOT NULL DEFAULT 1,
  board       VARCHAR(24) NOT NULL,
  metric      VARCHAR(24) NOT NULL,
  value       BIGINT NOT NULL DEFAULT 0,
  ref         VARCHAR(32) NOT NULL DEFAULT '',
  achieved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  -- weekly XP + rating board: range scan on (board, metric, achieved_at)
  KEY idx_score_board_metric_time (board, metric, achieved_at),
  -- per-student history: profile rating + the daily XP cap
  KEY idx_score_student_time (student_id, achieved_at),
  KEY idx_score_ref (board, ref),
  CONSTRAINT fk_score_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE,
  CONSTRAINT fk_score_app FOREIGN KEY (app_id)
    REFERENCES apps (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- WEEKLY XP: computed from score_events, NOT from a rollup table. Why:
--   A weekly rollup table would need a write (or an UPSERT) on every single
--   XP grant, plus a Monday-morning reset job. Shared hosting has NO CRON,
--   so the reset would have to be faked lazily on read anyway — i.e. all the
--   cost of the rollup and none of the simplicity.
--   Deriving instead: one indexed range scan over
--     (board='total', metric='xp', achieved_at >= last Monday 00:00 UTC),
--   which touches only ONE WEEK of rows however large the history grows, and
--   the result is written to leaderboard_cache for 5 minutes (§4). A board
--   view therefore costs one cached read; a recompute costs one week-sized
--   scan. That is the cheaper of the two on a shared host.
-- ------------------------------------------------------------

-- ============================================================
-- 3. students — new PUBLIC-IDENTITY columns
--    `nickname` and `avatar` already exist in schema.sql; the guards below
--    are for very old databases and are a no-op on a current one.
--
--    `nickname_lc` is NEW and is the uniqueness key for the public profile
--    URL /u/<nickname>. It exists instead of a UNIQUE index on `nickname`
--    because `nickname` is NOT NULL DEFAULT '' — several existing rows may
--    hold '' and MySQL treats '' as a value, so a UNIQUE index on it would
--    FAIL TO CREATE on the production table. `nickname_lc` is NULLable and
--    MySQL allows unlimited NULLs under a UNIQUE index, so:
--        nickname_lc IS NULL  ⇒  student has no public identity yet
--                                (invisible on boards, no profile URL)
--        nickname_lc = 'x'    ⇒  claimed, globally unique, case-insensitive
--    lib/score.php and api/profile.php both key on nickname_lc.
-- ============================================================

SET @ddl := (SELECT IF(COUNT(*) = 0,
    'ALTER TABLE students ADD COLUMN nickname VARCHAR(60) NOT NULL DEFAULT ''''',
    'SELECT 1')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'students' AND COLUMN_NAME = 'nickname');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @ddl := (SELECT IF(COUNT(*) = 0,
    'ALTER TABLE students ADD COLUMN avatar VARCHAR(40) NOT NULL DEFAULT ''fox''',
    'SELECT 1')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'students' AND COLUMN_NAME = 'avatar');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @ddl := (SELECT IF(COUNT(*) = 0,
    'ALTER TABLE students ADD COLUMN nickname_lc VARCHAR(60) NULL DEFAULT NULL',
    'SELECT 1')
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'students' AND COLUMN_NAME = 'nickname_lc');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- unique index on the new column only (never on an existing populated one)
SET @ddl := (SELECT IF(COUNT(*) = 0,
    'CREATE UNIQUE INDEX uq_student_nickname_lc ON students (nickname_lc)',
    'SELECT 1')
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'students'
    AND INDEX_NAME = 'uq_student_nickname_lc');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ------------------------------------------------------------
-- ONE-TIME OPT-OUT BACKFILL (the only UPDATE in this file)
--   Gives existing students a public identity so the boards are not empty on
--   launch day. Writes ONLY the new nickname_lc column, only where it is NULL.
--   UPDATE IGNORE: if two students already share a nickname, the loser is
--   simply skipped and keeps nickname_lc = NULL (invisible until they pick a
--   free nickname via api/nickname.php). Nothing fails, nothing is lost.
--
--   PRIVACY NOTE FOR THE DEPLOYER: api/register.php historically defaulted
--   `nickname` to the student's display name. Backfilling therefore makes
--   those display names publicly visible under the owner's "everyone public,
--   nickname only" decision. If you would rather every student opt in by
--   choosing a nickname first, COMMENT OUT the next statement — everything
--   else in this file works fine without it.
-- ------------------------------------------------------------
UPDATE IGNORE students
   SET nickname_lc = LOWER(nickname)
 WHERE nickname_lc IS NULL AND nickname <> '';

-- ============================================================
-- 4. leaderboard_cache — derived, disposable, rebuildable
--    Shared hosting will not survive an ORDER BY over a growing score_events
--    on every board view, and there is no cron to refresh it. So the cache is
--    recomputed INLINE by whichever request finds it older than 5 minutes
--    (see lib/score.php / api/board.php).
--
--    `board` is the full board key, region included:
--        'total' | 'weekly' | 'rating' | 'streak' | 'records:region1'
--    `rank_no` is 1..N, best first (for records, best = LOWEST ms).
--    rank_no = 0 is a META row: student_id NULL, it only carries computed_at,
--    so an empty-but-fresh board is distinguishable from a never-computed one.
--
--    The column is `rank_no`, not `rank`: RANK is a reserved word from
--    MySQL 8.0 and would need backticking in every single query.
--
--    NOTE: this table holds NO personal data — just ids and numbers. nickname
--    and avatar are joined in at serve time, so a nickname change is visible
--    immediately and a stale cache can never leak a stale identity.
-- ============================================================
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  board       VARCHAR(48) NOT NULL,
  rank_no     SMALLINT UNSIGNED NOT NULL,
  student_id  BIGINT UNSIGNED NULL,
  value       BIGINT NOT NULL DEFAULT 0,
  computed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (board, rank_no),
  KEY idx_cache_student (student_id),
  CONSTRAINT fk_cache_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. boss_records — one row per (student, region), best kept
--    Same idempotence pattern as step_completions: a replay bumps `attempts`
--    and may improve the record, but grants no XP (XP is granted once, by
--    lib/progress.php, guarded by the append-only events log).
--    `boss_clears` (schema.sql) still owns "did they clear it"; this table
--    owns "how fast / how clean", which is what the records board ranks.
-- ============================================================
CREATE TABLE IF NOT EXISTS boss_records (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id    BIGINT UNSIGNED NOT NULL,
  region_id     VARCHAR(24) NOT NULL,
  best_ms       INT UNSIGNED NOT NULL,     -- fastest clear, milliseconds
  best_mistakes INT UNSIGNED NOT NULL,     -- fewest mistakes in any clear
  attempts      INT UNSIGNED NOT NULL DEFAULT 1,
  phases        JSON NULL,                 -- phase breakdown of the BEST run
  first_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                  ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_boss_record (student_id, region_id),
  KEY idx_record_region_ms (region_id, best_ms),
  CONSTRAINT fk_record_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. Indexes on EXISTING tables (adding an index never changes a row)
--    • progress(xp), progress(streak): the total-XP and streak boards read
--      `progress` directly instead of aggregating score_events — one row per
--      student, already authoritative, so it is by far the cheapest source.
--    • login_attempts(identifier, created_at): the boss_result and nickname
--      rate limiters reuse the login_attempts table with a bucketed
--      identifier ('boss:123'), and the existing index is on (ip, created_at).
-- ============================================================

SET @ddl := (SELECT IF(COUNT(*) = 0,
    'CREATE INDEX idx_progress_xp ON progress (xp)', 'SELECT 1')
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'progress'
    AND INDEX_NAME = 'idx_progress_xp');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @ddl := (SELECT IF(COUNT(*) = 0,
    'CREATE INDEX idx_progress_streak ON progress (streak)', 'SELECT 1')
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'progress'
    AND INDEX_NAME = 'idx_progress_streak');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @ddl := (SELECT IF(COUNT(*) = 0,
    'CREATE INDEX idx_attempt_ident_time ON login_attempts (identifier, created_at)',
    'SELECT 1')
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'login_attempts'
    AND INDEX_NAME = 'idx_attempt_ident_time');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ============================================================
--  END OF schema_v2.sql
--  Verify with:
--      SHOW TABLES;                          -- apps, score_events,
--                                            -- leaderboard_cache, boss_records
--      SHOW COLUMNS FROM students;           -- nickname_lc present
--      SELECT COUNT(*) FROM students;        -- unchanged from before the run
-- ============================================================
