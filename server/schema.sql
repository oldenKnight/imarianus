-- ============================================================
--  MARIANE — Phase 1 schema (server-authoritative progress)
--  MySQL 5.7+ / MariaDB 10.2+  •  utf8mb4 throughout (Latin macrons!)
--
--  Design notes:
--   • Identity is PLUGGABLE: an account (student or teacher) can have a
--     `local` (password) identity now and a `google` identity later,
--     both pointing at the same account row — no rework when OAuth lands.
--   • Progress is DERIVED from durable facts (step_completions, boss_clears)
--     and cached in `progress` for fast loads. The cache can always be
--     rebuilt from facts + the append-only `events` log.
--   • The client never sets XP/hearts directly; the server grants them.
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ---- teachers (you, plus any co-teachers later) -------------
CREATE TABLE IF NOT EXISTS teachers (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(120) NOT NULL DEFAULT '',
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_teacher_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- classes / grupos --------------------------------------
-- join_code is the class's shared key; a student self-registering with a
-- valid code is auto-attached to that class (and thus to its teacher).
CREATE TABLE IF NOT EXISTS classes (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  teacher_id  BIGINT UNSIGNED NOT NULL,
  name        VARCHAR(120) NOT NULL,
  join_code   VARCHAR(24) NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_join_code (join_code),
  KEY idx_class_teacher (teacher_id),
  CONSTRAINT fk_class_teacher FOREIGN KEY (teacher_id)
    REFERENCES teachers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- students (the learner profile) ------------------------
-- No password column here on purpose — credentials live in auth_identities.
-- class_id is nullable: a self-registered "external" student may have no class
-- until a teacher (or a paid plan) attaches them.
CREATE TABLE IF NOT EXISTS students (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  class_id     BIGINT UNSIGNED NULL,
  display_name VARCHAR(60) NOT NULL DEFAULT '',
  nickname     VARCHAR(60) NOT NULL DEFAULT '',
  avatar       VARCHAR(40) NOT NULL DEFAULT 'fox',
  status       ENUM('active','disabled') NOT NULL DEFAULT 'active',
  source       ENUM('teacher','self') NOT NULL DEFAULT 'self',
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_student_class (class_id),
  CONSTRAINT fk_student_class FOREIGN KEY (class_id)
    REFERENCES classes (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- auth_identities (PLUGGABLE login) ---------------------
-- subject_type+subject_id = which account this credential belongs to.
-- provider 'local'  → identifier = username/email, password_hash set.
-- provider 'google' → identifier = google subject id, password_hash NULL.
CREATE TABLE IF NOT EXISTS auth_identities (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subject_type  ENUM('student','teacher') NOT NULL,
  subject_id    BIGINT UNSIGNED NOT NULL,
  provider      ENUM('local','google') NOT NULL DEFAULT 'local',
  identifier    VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  -- one identifier per provider, globally (a username/email is unique)
  UNIQUE KEY uq_identity (provider, identifier),
  KEY idx_identity_subject (subject_type, subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- progress (fast-load cache of derived state) -----------
CREATE TABLE IF NOT EXISTS progress (
  student_id   BIGINT UNSIGNED NOT NULL,
  xp           INT UNSIGNED NOT NULL DEFAULT 0,
  hearts       TINYINT UNSIGNED NOT NULL DEFAULT 5,
  max_hearts   TINYINT UNSIGNED NOT NULL DEFAULT 5,
  streak       INT UNSIGNED NOT NULL DEFAULT 0,
  last_day     DATE NULL,
  current_node VARCHAR(24) NOT NULL DEFAULT 'f1',
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                 ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id),
  CONSTRAINT fk_progress_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- step_completions (one row per (student,fable,step)) ----
-- XP is granted only on the FIRST insert. Replaying a step bumps times_done
-- and best_score but grants no further XP — this is the server-side end of
-- the memory-game / replay exploit fix.
CREATE TABLE IF NOT EXISTS step_completions (
  id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id         BIGINT UNSIGNED NOT NULL,
  fable_id           VARCHAR(24) NOT NULL,
  step               VARCHAR(24) NOT NULL,
  first_completed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  times_done         INT UNSIGNED NOT NULL DEFAULT 1,
  best_score         INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_step (student_id, fable_id, step),
  KEY idx_step_student (student_id),
  CONSTRAINT fk_step_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- boss_clears (one row per (student,region)) ------------
CREATE TABLE IF NOT EXISTS boss_clears (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id       BIGINT UNSIGNED NOT NULL,
  region_id        VARCHAR(24) NOT NULL,
  fight_cleared_at DATETIME NULL,
  quiz_cleared_at  DATETIME NULL,
  quiz_score       INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_boss (student_id, region_id),
  KEY idx_boss_student (student_id),
  CONSTRAINT fk_boss_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- remember_tokens (rotating "stay logged in") -----------
-- We store only a HASH of the token; the raw token lives in the user's cookie.
-- On use, the server validates then rotates (new token, old invalidated).
CREATE TABLE IF NOT EXISTS remember_tokens (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id   BIGINT UNSIGNED NOT NULL,
  selector     CHAR(24) NOT NULL,        -- public lookup key (not secret)
  token_hash   CHAR(64) NOT NULL,        -- sha256 of the secret verifier
  device_label VARCHAR(120) NOT NULL DEFAULT '',
  expires_at   DATETIME NOT NULL,
  last_used_at DATETIME NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_selector (selector),
  KEY idx_remember_student (student_id),
  CONSTRAINT fk_remember_student FOREIGN KEY (student_id)
    REFERENCES students (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- events (append-only audit + analytics feed) -----------
CREATE TABLE IF NOT EXISTS events (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id BIGINT UNSIGNED NULL,
  type       VARCHAR(40) NOT NULL,
  payload    JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_event_student (student_id),
  KEY idx_event_type (type),
  KEY idx_event_time (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- login_attempts (rate limiting) ------------------------
CREATE TABLE IF NOT EXISTS login_attempts (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip          VARCHAR(45) NOT NULL,
  identifier  VARCHAR(190) NOT NULL DEFAULT '',
  ok          TINYINT(1) NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_attempt_ip_time (ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
