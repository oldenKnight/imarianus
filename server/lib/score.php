<?php
/* ============================================================
   lib/score.php — scores, boards, gradus, anti-cheat helpers
   ------------------------------------------------------------
   Everything the ranking system needs that is not an HTTP concern.
   The endpoints (api/board.php, api/profile.php, api/boss_result.php,
   api/nickname.php) stay thin; the rules live here, next to
   lib/progress.php which owns XP itself.

   THREE INVARIANTS, in order of importance:

     1. THE CLIENT NEVER SETS XP OR A SCORE THAT PAYS OUT.
        Nothing in this file reads a reward value from the request.
        score_record() is called by server code with server-computed
        numbers only.

     2. score_events IS APPEND-ONLY.
        No UPDATE, no DELETE, ever. Boards are DERIVED from it (or from
        `progress`, which is itself derived from durable facts) and the
        derived result is cached in leaderboard_cache, which IS
        disposable and may be rewritten freely.

     3. ALL TIMES ARE UTC, WRITTEN EXPLICITLY BY PHP.
        Shared hosts rarely run MySQL in UTC, and the weekly board must
        reset at Monday 00:00 UTC for everyone. So we never rely on the
        DB's NOW() for anything a board compares against: PHP writes
        gmdate() strings and compares against gmdate() strings.
        (The rate limiter is the one exception — it compares NOW() to
        NOW(), entirely inside the DB, so the timezone cancels out.)
   ============================================================ */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/rules.php';

/* How long a cached board is served before a request recomputes it.
   There is NO CRON on shared hosting, so the refresh is piggy-backed on
   whichever request finds the cache stale (see score_board()). */
define('BOARD_CACHE_TTL', 300);          // seconds — 5 minutes
define('BOARD_SIZE', 100);               // rows kept per board

/* ============================================================
   Time helpers (all UTC)
   ============================================================ */

/* 'Y-m-d H:i:s' for now, UTC. */
function score_now_utc() {
  return gmdate('Y-m-d H:i:s');
}

/* Start of the current weekly window: Monday 00:00:00 UTC.
   Computed arithmetically rather than with strtotime('monday this week'),
   whose Sunday behaviour is a classic source of off-by-one-week bugs. */
function score_week_start_utc() {
  $dow = (int) gmdate('N');              // 1 = Monday … 7 = Sunday
  $ts  = time() - ($dow - 1) * 86400;
  return gmdate('Y-m-d 00:00:00', $ts);
}

/* Start of the current day, UTC (used by the daily XP cap). */
function score_day_start_utc() {
  return gmdate('Y-m-d 00:00:00');
}

/* ============================================================
   Recording score events
   ============================================================ */

/* Numeric id of an app code ('web' | 'ios' | 'books'), 1 if unknown.
   The ids are seeded fixed by schema_v2.sql; this lookup exists so a
   future app can be added without touching PHP. */
function score_app_id($code = 'web') {
  static $memo = array();
  if (isset($memo[$code])) { return $memo[$code]; }
  try {
    $stmt = db()->prepare('SELECT id FROM apps WHERE code = ? LIMIT 1');
    $stmt->execute(array($code));
    $id = $stmt->fetchColumn();
  } catch (PDOException $e) {
    $id = false;                          // schema_v2 not applied yet
  }
  $memo[$code] = $id ? (int) $id : 1;
  return $memo[$code];
}

/* Append one row to the source of truth.
   $board  'total' | 'rating' | 'records'
   $metric 'xp' | 'accuracy' | 'ms' | 'mistakes'
   $value  server-computed integer
   $ref    optional sub-key (region id for records)

   Failure is swallowed and logged: a ranking write must NEVER be able to
   break a student's actual progress (e.g. if schema_v2.sql has not been
   imported yet, the app must keep working exactly as before). */
function score_record($studentId, $board, $metric, $value, $ref = '', $app = 'web') {
  try {
    $stmt = db()->prepare(
      'INSERT INTO score_events (student_id, app_id, board, metric, value, ref, achieved_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute(array(
      (int) $studentId, score_app_id($app), $board, $metric,
      (int) $value, (string) $ref, score_now_utc()
    ));
    return true;
  } catch (PDOException $e) {
    error_log('imarianus: score_record failed (' . $board . '/' . $metric . '): ' . $e->getMessage());
    return false;
  }
}

/* ============================================================
   Anti-cheat: daily XP cap
   ------------------------------------------------------------
   The cap is a ceiling on how much XP one student can be GRANTED in one
   UTC day. It is not a punishment for a hard-working child (the honest
   ceiling of ~7 steps x 20 XP per capitulum is far below it); it is a
   bound on what a scripted replay attack can achieve before someone
   notices the board.
   ============================================================ */

/* XP already granted to this student today (UTC), from the append-only log. */
function score_xp_today($studentId) {
  try {
    $stmt = db()->prepare(
      'SELECT COALESCE(SUM(value), 0) FROM score_events
        WHERE student_id = ? AND board = "total" AND metric = "xp"
          AND achieved_at >= ?'
    );
    $stmt->execute(array((int) $studentId, score_day_start_utc()));
    return (int) $stmt->fetchColumn();
  } catch (PDOException $e) {
    return 0;                             // fail open: never block progress
  }
}

/* How much of the requested XP may still be granted today (0..$amount). */
function score_cap_grant($studentId, $amount) {
  $amount = (int) $amount;
  if ($amount <= 0) { return 0; }
  $remaining = rule_daily_xp_cap() - score_xp_today($studentId);
  if ($remaining <= 0) { return 0; }
  return min($amount, $remaining);
}

/* ============================================================
   Anti-cheat: per-student rate limiting
   ------------------------------------------------------------
   Reuses the existing login_attempts table rather than adding another one:
   same columns, same semantics ("a thing was attempted at time T"), and
   schema_v2.sql adds the (identifier, created_at) index it needs.
   The identifier is bucketed, e.g. 'boss:1234'.
   ============================================================ */

function score_rate_key($bucket, $studentId) {
  return $bucket . ':' . (int) $studentId;
}

/* true if the student is still within the limit for this bucket. */
function score_rate_ok($bucket, $studentId) {
  $limits = rule_rate_limits();
  if (!isset($limits[$bucket])) { return true; }
  $cfg = $limits[$bucket];
  try {
    // NOW() on both sides: entirely DB-side, so the server timezone cancels.
    $stmt = db()->prepare(
      'SELECT COUNT(*) FROM login_attempts
        WHERE identifier = ? AND created_at > (NOW() - INTERVAL ? MINUTE)'
    );
    $stmt->execute(array(score_rate_key($bucket, $studentId), (int) $cfg['window_min']));
    return ((int) $stmt->fetchColumn()) < (int) $cfg['max'];
  } catch (PDOException $e) {
    return true;                          // fail open
  }
}

/* Record one attempt in this bucket (call it whether or not it succeeded —
   a rejected attempt must still count against the limit, otherwise the
   limiter can be exhausted for free). */
function score_rate_note($bucket, $studentId, $ok) {
  try {
    $stmt = db()->prepare('INSERT INTO login_attempts (ip, identifier, ok) VALUES (?, ?, ?)');
    $stmt->execute(array(client_ip_safe(), score_rate_key($bucket, $studentId), $ok ? 1 : 0));
  } catch (PDOException $e) {
    /* non-fatal */
  }
}

/* client_ip() lives in lib/response.php, which score.php does not require
   (it is usable from CLI too). Degrade gracefully when it is absent. */
function client_ip_safe() {
  if (function_exists('client_ip')) { return client_ip(); }
  return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
}

/* ============================================================
   Gradus (level) — derived from XP, purely cosmetic
   ============================================================ */
function score_gradus($xp) {
  $xp = (int) $xp;
  $ladder = rule_gradus_ladder();
  $i = 0;
  foreach ($ladder as $n => $rung) {
    if ($xp >= (int) $rung['min']) { $i = $n; }
  }
  $next = isset($ladder[$i + 1]) ? (int) $ladder[$i + 1]['min'] : null;
  return array(
    'key'    => $ladder[$i]['key'],       // client owns the display string
    'index'  => $i,
    'min'    => (int) $ladder[$i]['min'],
    'nextAt' => $next                     // null at the top of the ladder
  );
}

/* ============================================================
   Rating — rolling accuracy, 0..100
   ------------------------------------------------------------
   ONE STUDENT (profile): the true "last N exercises" average. Cheap: one
   indexed lookup of at most 50 rows.
   THE BOARD: a 30-day average with a minimum sample size, because doing
   "last 50 per student" for every student needs a per-group limit, which
   MySQL 5.7 cannot do without a correlated subquery per row. Over a
   30-day window the two agree closely, and the board is a ranking, not a
   certificate. Documented so nobody "fixes" the discrepancy by accident.
   ============================================================ */
define('RATING_WINDOW', 50);              // events, for a single profile
define('RATING_MIN_SAMPLE', 3);           // events before you appear on the board
define('RATING_BOARD_DAYS', 30);

/* WHERE RATING EVENTS COME FROM — deliberately narrow.
   Only SERVER-GRADED outcomes are recorded as accuracy:
     • boss quiz   → correct/total, graded here against the answer key
     • boss fight  → derived from the mistake count the fight reports
   Step completions are NOT recorded: the server does not grade them (the
   `score` the client posts is a bonus-XP hint, not an accuracy), and taking
   an accuracy number from the client would make the quality board the one
   thing on the site a browser console can forge. When a step type becomes
   server-graded, call score_record($id,'rating','accuracy',$pct) from
   lib/progress.php and it joins the rating automatically. */

function score_rating($studentId) {
  try {
    $stmt = db()->prepare(
      'SELECT ROUND(AVG(v)) FROM (
         SELECT value AS v FROM score_events
          WHERE student_id = ? AND board = "rating"
          ORDER BY id DESC LIMIT ' . RATING_WINDOW . '
       ) t'
    );
    $stmt->execute(array((int) $studentId));
    $v = $stmt->fetchColumn();
    return ($v === null || $v === false) ? null : (int) $v;
  } catch (PDOException $e) {
    return null;
  }
}

/* ============================================================
   Boards
   ------------------------------------------------------------
   score_board($id, $region) is the ONLY entry point. It serves the cache,
   recomputing inline when the cache is older than BOARD_CACHE_TTL.
   ============================================================ */

/* Is this a board we know how to build? */
function score_board_exists($id) {
  return in_array($id, array('total', 'weekly', 'rating', 'records', 'streak'), true);
}

/* Full cache key, region included for the per-region records board. */
function score_board_key($id, $region) {
  return ($id === 'records') ? ('records:' . $region) : $id;
}

/* ---- the five recomputations ----
   Each returns array(array('student_id' => int, 'value' => int), ...)
   already sorted best-first, at most BOARD_SIZE rows.

   Every one of them filters on `nickname_lc IS NOT NULL`: a student with no
   claimed nickname has no public identity and must not appear on a public
   board at all (there is nothing we are allowed to render them as —
   display_name is private). */

function score_compute_total() {
  // Straight from `progress`: one row per student, already authoritative.
  $sql = 'SELECT p.student_id AS student_id, p.xp AS value
            FROM progress p
            JOIN students s ON s.id = p.student_id
           WHERE s.nickname_lc IS NOT NULL AND s.status = "active" AND p.xp > 0
           ORDER BY p.xp DESC, p.student_id ASC
           LIMIT ' . BOARD_SIZE;
  return db()->query($sql)->fetchAll();
}

function score_compute_weekly() {
  // One indexed range scan over this week's XP grants only.
  $stmt = db()->prepare(
    'SELECT e.student_id AS student_id, SUM(e.value) AS value
       FROM score_events e
       JOIN students s ON s.id = e.student_id
      WHERE e.board = "total" AND e.metric = "xp" AND e.achieved_at >= ?
        AND s.nickname_lc IS NOT NULL AND s.status = "active"
      GROUP BY e.student_id
      ORDER BY value DESC, e.student_id ASC
      LIMIT ' . BOARD_SIZE
  );
  $stmt->execute(array(score_week_start_utc()));
  return $stmt->fetchAll();
}

function score_compute_rating() {
  $since = gmdate('Y-m-d H:i:s', time() - RATING_BOARD_DAYS * 86400);
  $stmt = db()->prepare(
    'SELECT e.student_id AS student_id, ROUND(AVG(e.value)) AS value
       FROM score_events e
       JOIN students s ON s.id = e.student_id
      WHERE e.board = "rating" AND e.achieved_at >= ?
        AND s.nickname_lc IS NOT NULL AND s.status = "active"
      GROUP BY e.student_id
      HAVING COUNT(*) >= ' . RATING_MIN_SAMPLE . '
      ORDER BY value DESC, e.student_id ASC
      LIMIT ' . BOARD_SIZE
  );
  $stmt->execute(array($since));
  return $stmt->fetchAll();
}

function score_compute_streak() {
  $sql = 'SELECT p.student_id AS student_id, p.streak AS value
            FROM progress p
            JOIN students s ON s.id = p.student_id
           WHERE s.nickname_lc IS NOT NULL AND s.status = "active" AND p.streak > 0
           ORDER BY p.streak DESC, p.student_id ASC
           LIMIT ' . BOARD_SIZE;
  return db()->query($sql)->fetchAll();
}

/* Records: fastest boss clear for one region. NOTE the ASC ordering —
   rank 1 is the LOWEST value here. api/board.php tells the client with
   an explicit "order" field so it never has to guess. */
function score_compute_records($region) {
  $stmt = db()->prepare(
    'SELECT r.student_id AS student_id, r.best_ms AS value
       FROM boss_records r
       JOIN students s ON s.id = r.student_id
      WHERE r.region_id = ? AND r.best_ms > 0
        AND s.nickname_lc IS NOT NULL AND s.status = "active"
      ORDER BY r.best_ms ASC, r.student_id ASC
      LIMIT ' . BOARD_SIZE
  );
  $stmt->execute(array($region));
  return $stmt->fetchAll();
}

/* Rewrite the cache for one board key. leaderboard_cache is DERIVED data:
   deleting and re-inserting its rows destroys nothing durable (contrast
   with score_events, which is append-only forever). */
function score_board_refresh($id, $region) {
  $key = score_board_key($id, $region);
  $pdo = db();

  /* Fail soft: if schema_v2.sql has not been imported yet these tables and
     the nickname_lc column do not exist. A missing board must never be a
     500 on a public URL — log it and serve nothing. */
  try {
    switch ($id) {
      case 'total':   $rows = score_compute_total();   break;
      case 'weekly':  $rows = score_compute_weekly();  break;
      case 'rating':  $rows = score_compute_rating();  break;
      case 'streak':  $rows = score_compute_streak();  break;
      case 'records': $rows = score_compute_records($region); break;
      default:        return array();
    }
  } catch (PDOException $e) {
    error_log('imarianus: board compute failed for ' . $key . ': ' . $e->getMessage());
    return array();
  }

  $now = score_now_utc();
  try {
    $pdo->beginTransaction();
    $pdo->prepare('DELETE FROM leaderboard_cache WHERE board = ?')->execute(array($key));

    // rank_no = 0 is the meta row: proves "computed at T" even for an empty board.
    $ins = $pdo->prepare(
      'INSERT INTO leaderboard_cache (board, rank_no, student_id, value, computed_at)
       VALUES (?, ?, ?, ?, ?)'
    );
    $ins->execute(array($key, 0, null, 0, $now));

    $rank = 0;
    foreach ($rows as $row) {
      $rank++;
      $ins->execute(array($key, $rank, (int) $row['student_id'], (int) $row['value'], $now));
    }
    $pdo->commit();
  } catch (PDOException $e) {
    if ($pdo->inTransaction()) { $pdo->rollBack(); }
    error_log('imarianus: board refresh failed for ' . $key . ': ' . $e->getMessage());
  }
  return $rows;
}

/* Read the cache for a board key. Returns array('computedAt'=>?, 'rows'=>[]).
   computedAt is null when the board has never been computed. */
function score_board_read($key) {
  $out = array('computedAt' => null, 'rows' => array());
  try {
    // Only nickname and avatar are read from `students` — the public rule.
    $stmt = db()->prepare(
      'SELECT c.rank_no, c.value, c.computed_at,
              s.id AS student_id, s.nickname, s.avatar, p.xp
         FROM leaderboard_cache c
         LEFT JOIN students s ON s.id = c.student_id
         LEFT JOIN progress p ON p.student_id = c.student_id
        WHERE c.board = ?
        ORDER BY c.rank_no ASC'
    );
    $stmt->execute(array($key));
    $all = $stmt->fetchAll();
  } catch (PDOException $e) {
    error_log('imarianus: board read failed for ' . $key . ': ' . $e->getMessage());
    return $out;   // schema_v2.sql not imported yet
  }

  foreach ($all as $r) {
    if ((int) $r['rank_no'] === 0) {           // meta row
      $out['computedAt'] = $r['computed_at'];
      continue;
    }
    if ($out['computedAt'] === null) { $out['computedAt'] = $r['computed_at']; }
    // A student deleted since the last refresh leaves a NULL join: skip.
    if ($r['student_id'] === null || $r['nickname'] === null) { continue; }
    $out['rows'][] = array(
      'rank'     => (int) $r['rank_no'],
      'nickname' => $r['nickname'],           // ONLY these two columns
      'avatar'   => $r['avatar'],             // ever leave the students table
      'value'    => (int) $r['value'],
      'gradus'   => score_gradus((int) $r['xp'])
    );
  }
  return $out;
}

/* Serve a board, refreshing inline if the cache is stale.

   Concurrency: two visitors can find the cache stale at the same instant.
   A MySQL advisory lock (GET_LOCK with a 0 s timeout) means exactly one of
   them recomputes; the other is handed the slightly stale cache instead of
   queueing behind the recompute. On a shared host that is the right
   trade-off — a board is never worth making a page wait. */
function score_board($id, $region = '') {
  $key = score_board_key($id, $region);
  $cached = score_board_read($key);

  $stale = ($cached['computedAt'] === null)
        || ((time() - score_utc_to_ts($cached['computedAt'])) >= BOARD_CACHE_TTL);
  if (!$stale) {
    $cached['fresh'] = true;
    return $cached;
  }

  $lockName = 'imarianus_board_' . md5($key);   // <= 64 chars, MySQL 8 safe
  $got = false;
  try {
    $stmt = db()->prepare('SELECT GET_LOCK(?, 0)');
    $stmt->execute(array($lockName));
    $got = ((int) $stmt->fetchColumn() === 1);
  } catch (PDOException $e) {
    $got = false;
  }

  if (!$got) {
    // Someone else is recomputing. Serve what we have (possibly empty).
    $cached['fresh'] = false;
    return $cached;
  }

  try {
    score_board_refresh($id, $region);
  } catch (Exception $e) {
    error_log('imarianus: board ' . $key . ' refresh error: ' . $e->getMessage());
  }
  try {
    $rel = db()->prepare('SELECT RELEASE_LOCK(?)');
    $rel->execute(array($lockName));
    $rel->fetchColumn();
  } catch (PDOException $e) {
    /* the lock dies with the connection anyway */
  }

  $fresh = score_board_read($key);
  $fresh['fresh'] = true;
  return $fresh;
}

/* 'Y-m-d H:i:s' (UTC) -> unix timestamp. Written by us, so the format is known. */
function score_utc_to_ts($s) {
  if (!$s) { return 0; }
  $ts = strtotime($s . ' UTC');
  return $ts === false ? 0 : $ts;
}

/* ============================================================
   Public identity helpers
   ============================================================ */

/* Resolve a public nickname to a student id, or null.
   Keys on nickname_lc, the unique column, so the URL /u/<nickname> is
   case-insensitive and can never be ambiguous. */
function score_student_by_nickname($nickname) {
  try {
    $stmt = db()->prepare(
      'SELECT id FROM students
        WHERE nickname_lc = ? AND status = "active" LIMIT 1'
    );
    $stmt->execute(array(strtolower($nickname)));
    $id = $stmt->fetchColumn();
  } catch (PDOException $e) {
    // schema_v2.sql not imported yet: nobody has a public profile.
    error_log('imarianus: nickname lookup failed: ' . $e->getMessage());
    return null;
  }
  return $id ? (int) $id : null;
}
