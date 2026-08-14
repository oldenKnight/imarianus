<?php
/* ============================================================
   lib/progress.php — the authoritative progression engine
   ------------------------------------------------------------
   Everything that grants XP or marks progress goes through here,
   so the rules live in one place and the client can never set a
   value directly. Each mutating call returns the fresh snapshot
   the client mirrors.
   ============================================================ */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/rules.php';
require_once __DIR__ . '/score.php';   // v2: boards, gradus, anti-cheat helpers

/* Ensure a progress row exists for a student (created at registration). */
function progress_ensure($studentId) {
  $stmt = db()->prepare('INSERT IGNORE INTO progress (student_id) VALUES (?)');
  $stmt->execute(array($studentId));
}

/* Log an append-only event (analytics + audit). */
function progress_log_event($studentId, $type, $payload) {
  $stmt = db()->prepare('INSERT INTO events (student_id, type, payload) VALUES (?, ?, ?)');
  $stmt->execute(array($studentId, $type, json_encode($payload, JSON_UNESCAPED_UNICODE)));
}

/* ---- read the durable facts ---- */
function progress_completed_map($studentId) {
  $stmt = db()->prepare('SELECT fable_id, step FROM step_completions WHERE student_id = ?');
  $stmt->execute(array($studentId));
  $map = array();
  foreach ($stmt->fetchAll() as $row) {
    if (!isset($map[$row['fable_id']])) { $map[$row['fable_id']] = array(); }
    $map[$row['fable_id']][$row['step']] = true;
  }
  return $map;
}
function progress_boss_map($studentId) {
  $stmt = db()->prepare('SELECT region_id, fight_cleared_at, quiz_cleared_at FROM boss_clears WHERE student_id = ?');
  $stmt->execute(array($studentId));
  $map = array();
  foreach ($stmt->fetchAll() as $row) {
    $map[$row['region_id']] = array(
      'fight' => !empty($row['fight_cleared_at']),
      'quiz'  => !empty($row['quiz_cleared_at'])
    );
  }
  return $map;
}

/* is a given (fable,step) already done? */
function progress_step_done($completed, $fable, $step) {
  return isset($completed[$fable]) && isset($completed[$fable][$step]);
}

/* server-side unlock check: a step is reachable only if its fable is
   unlocked (previous fable fully done) and the previous step is done. */
function progress_step_unlocked($completed, $fable, $step) {
  $fi = rule_fable_index($fable);
  $si = rule_step_index($step);
  if ($fi === false || $si === false) { return false; }
  // previous capitulum IN THE SAME TRACK must be fully complete.
  // (v2: was "the previous entry in the global list". With one track that is
  //  the same thing; with three parallel tracks the global list would have
  //  locked Historia Sacra behind all 36 fables. See rule_fable_prev().)
  $prevFable = rule_fable_prev($fable);
  if ($prevFable !== null) {
    if (!progress_fable_done($completed, $prevFable)) { return false; }
  }
  // previous step in this fable must be done
  if ($si > 0) {
    $prevStep = rule_steps()[$si - 1];
    if (!progress_step_done($completed, $fable, $prevStep)) { return false; }
  }
  return true;
}

function progress_fable_done($completed, $fable) {
  foreach (rule_steps() as $step) {
    if (!progress_step_done($completed, $fable, $step)) { return false; }
  }
  return true;
}

/* ---- the snapshot the client mirrors ---- */
function progress_snapshot($studentId) {
  $stmt = db()->prepare('SELECT xp, hearts, max_hearts, streak, last_day, current_node FROM progress WHERE student_id = ?');
  $stmt->execute(array($studentId));
  $p = $stmt->fetch();
  if (!$p) {
    progress_ensure($studentId);
    $p = array('xp' => 0, 'hearts' => 5, 'max_hearts' => 5, 'streak' => 0, 'last_day' => null, 'current_node' => 'f1');
  }
  return array(
    'xp'        => (int) $p['xp'],
    'hearts'    => (int) $p['hearts'],
    'maxHearts' => (int) $p['max_hearts'],
    'streak'    => (int) $p['streak'],
    'lastDay'   => $p['last_day'],
    'mapNode'   => $p['current_node'],
    'completed' => progress_completed_map($studentId),
    'bosses'    => progress_boss_map($studentId)
  );
}

/* bump the daily streak (once per day) */
function progress_touch_streak($studentId) {
  $stmt = db()->prepare('SELECT streak, last_day FROM progress WHERE student_id = ?');
  $stmt->execute(array($studentId));
  $p = $stmt->fetch();
  $today = (new DateTime('today'))->format('Y-m-d');
  if ($p && $p['last_day'] === $today) { return; }
  $yesterday = (new DateTime('yesterday'))->format('Y-m-d');
  $streak = ($p && $p['last_day'] === $yesterday) ? ((int) $p['streak'] + 1) : 1;
  $stmt = db()->prepare('UPDATE progress SET streak = ?, last_day = ? WHERE student_id = ?');
  $stmt->execute(array($streak, $today, $studentId));
}

/* Grant XP. The ONLY place `progress.xp` ever grows.
   v2: every grant is also appended to score_events (board 'total',
   metric 'xp'). That log is what the WEEKLY board windows over — the total
   board reads progress.xp directly, but "XP earned since Monday 00:00 UTC"
   cannot be recovered from a running total, only from the events.
   $ref is a free-text tag ('step:f1/verba', 'boss:region1') for auditing. */
function progress_add_xp($studentId, $amount, $ref = '') {
  if ($amount <= 0) { return; }
  $stmt = db()->prepare('UPDATE progress SET xp = xp + ? WHERE student_id = ?');
  $stmt->execute(array((int) $amount, $studentId));
  // Never let a ranking write break progression: score_record() swallows and
  // logs its own errors (e.g. schema_v2.sql not imported yet).
  score_record($studentId, 'total', 'xp', (int) $amount, $ref);
}

/* ============================================================
   Mutations the API calls
   ============================================================ */

/* Complete a step. Idempotent on XP: granted only the first time.
   Returns array(ok, granted_xp, snapshot) or throws via json_error. */
function progress_complete_step($studentId, $fable, $step, $score) {
  if (!rule_is_valid_step($fable, $step)) {
    json_error('invalid_step', 422);
  }
  $completed = progress_completed_map($studentId);
  // Enforce prerequisites server-side (no skipping ahead).
  if (!progress_step_unlocked($completed, $fable, $step)) {
    json_error('step_locked', 409);
  }
  $score = (int) $score;
  $alreadyDone = progress_step_done($completed, $fable, $step);
  $granted = 0;

  if ($alreadyDone) {
    // Replay: bump counters, improve best score, grant NO xp.
    $stmt = db()->prepare(
      'UPDATE step_completions
         SET times_done = times_done + 1,
             best_score = GREATEST(best_score, ?)
       WHERE student_id = ? AND fable_id = ? AND step = ?'
    );
    $stmt->execute(array($score, $studentId, $fable, $step));
  } else {
    // First completion: insert + grant XP.
    $stmt = db()->prepare(
      'INSERT INTO step_completions (student_id, fable_id, step, best_score)
       VALUES (?, ?, ?, ?)'
    );
    $stmt->execute(array($studentId, $fable, $step, $score));
    $granted = rule_step_xp($step);
    progress_add_xp($studentId, $granted, 'step:' . $fable . '/' . $step);
    progress_touch_streak($studentId);
  }

  progress_log_event($studentId, 'step_complete', array(
    'fable' => $fable, 'step' => $step, 'score' => $score, 'first' => !$alreadyDone
  ));

  return array('ok' => true, 'granted' => $granted, 'first' => !$alreadyDone,
               'snapshot' => progress_snapshot($studentId));
}

/* Mark a boss FIGHT cleared (gameplay is client-side; we record + log).
   Requires all of the region's fables to be done first. */
function progress_boss_fight($studentId, $regionId) {
  $region = rule_region($regionId);
  if (!$region) { json_error('invalid_region', 422); }
  $regionId = rule_region_canonical($regionId);   // one row per logical region
  $completed = progress_completed_map($studentId);
  foreach ($region['fables'] as $f) {
    if (!progress_fable_done($completed, $f)) { json_error('boss_locked', 409); }
  }
  // upsert the boss row, set fight time if not set
  $stmt = db()->prepare(
    'INSERT INTO boss_clears (student_id, region_id, fight_cleared_at)
     VALUES (?, ?, NOW())
     ON DUPLICATE KEY UPDATE fight_cleared_at = COALESCE(fight_cleared_at, NOW())'
  );
  $stmt->execute(array($studentId, $regionId));

  // Grant fight XP exactly once, guarded by the append-only events log.
  $granted = 0;
  if (!progress_event_exists($studentId, 'boss_fight_xp', $regionId)) {
    $granted = (int) $region['fight_xp'];
    progress_add_xp($studentId, $granted, 'boss:' . $regionId);
    progress_log_event($studentId, 'boss_fight_xp', array('region' => $regionId));
  }
  progress_log_event($studentId, 'boss_fight', array('region' => $regionId));
  return array('ok' => true, 'granted' => $granted, 'snapshot' => progress_snapshot($studentId));
}

/* Grade the boss QUIZ server-side against the answer key.
   $answers = array('vulpēs' => 'vulpēs', ...) i.e. question -> chosen key. */
function progress_boss_quiz($studentId, $regionId, $answers) {
  $region = rule_region($regionId);
  if (!$region) { json_error('invalid_region', 422); }
  $regionId = rule_region_canonical($regionId);   // one row per logical region
  if (!is_array($answers)) { json_error('bad_answers', 422); }

  /* v2 GUARD: a region declared by content/manifest.json but with no answer
     key here has an EMPTY quiz — and an empty quiz has zero wrong answers,
     which would score as a pass and mark the region cleared for free.
     Refuse instead: no key, no exam. */
  if (empty($region['quiz'])) { json_error('quiz_unavailable', 409); }

  $wrong = 0; $total = 0;
  foreach ($region['quiz'] as $item) {
    $total++;
    $chosen = isset($answers[$item['q']]) ? $answers[$item['q']] : null;
    if ($chosen !== $item['a']) { $wrong++; }
  }
  $passed = ($wrong <= (int) $region['quiz_pass_max_wrong']);
  $correct = $total - $wrong;
  $granted = 0;

  if ($passed) {
    $stmt = db()->prepare(
      'INSERT INTO boss_clears (student_id, region_id, quiz_cleared_at, quiz_score)
       VALUES (?, ?, NOW(), ?)
       ON DUPLICATE KEY UPDATE
         quiz_cleared_at = COALESCE(quiz_cleared_at, NOW()),
         quiz_score = GREATEST(quiz_score, VALUES(quiz_score))'
    );
    $stmt->execute(array($studentId, $regionId, $correct));

    // grant quiz xp once
    if (!progress_event_exists($studentId, 'boss_quiz_xp', $regionId)) {
      $granted = $correct * (int) $region['quiz_xp_each'];
      progress_add_xp($studentId, $granted, 'quiz:' . $regionId);
      progress_log_event($studentId, 'boss_quiz_xp', array('region' => $regionId, 'correct' => $correct));
    }
  }

  /* v2 RATING: the quiz is graded HERE, against a key the browser never
     sees, so its accuracy is the one number on this site a cheater cannot
     forge. Recorded on every attempt (including replays) because rating is
     a rolling quality measure, not a reward — replaying badly costs you. */
  if ($total > 0) {
    score_record($studentId, 'rating', 'accuracy',
                 (int) round(($correct * 100) / $total), $regionId);
  }

  progress_log_event($studentId, 'boss_quiz', array(
    'region' => $regionId, 'correct' => $correct, 'wrong' => $wrong, 'passed' => $passed
  ));

  return array('ok' => true, 'passed' => $passed, 'correct' => $correct,
               'wrong' => $wrong, 'granted' => $granted,
               'snapshot' => progress_snapshot($studentId));
}

/* has a once-only event already fired for this region? */
function progress_event_exists($studentId, $type, $regionId) {
  $stmt = db()->prepare(
    "SELECT 1 FROM events
     WHERE student_id = ? AND type = ?
       AND JSON_UNQUOTE(JSON_EXTRACT(payload, '$.region')) = ?
     LIMIT 1"
  );
  $stmt->execute(array($studentId, $type, $regionId));
  return (bool) $stmt->fetchColumn();
}

/* ============================================================
   v2 — BOSS RESULT (records board + first-clear XP)
   ------------------------------------------------------------
   api/boss_result.php POSTs {region, ms, mistakes, phases[]}. Everything
   the client sends here is a MEASUREMENT, never a reward: the XP for a
   first clear is looked up in lib/rules.php and granted by this function.

   Layers of defence, in the order they are applied:
     1. the endpoint rejects any client-supplied xp/level/gradus field
     2. per-student rate limit (reuses the login_attempts pattern)
     3. plausibility bounds on the duration, per region (lib/rules.php)
     4. the region must actually be unlocked (all its capitula complete)
     5. XP is granted at most once per region, guarded by the append-only
        events log — a replay bumps `attempts` and may improve the record,
        but pays nothing
     6. the daily XP cap trims whatever is left

   Returns array(ok, granted, record, snapshot).
   ============================================================ */
function progress_boss_result($studentId, $regionId, $ms, $mistakes, $phases) {
  $region = rule_region($regionId);
  if (!$region) { json_error('invalid_region', 422); }
  // Accept either the built-in or the manifest id, but STORE only the
  // canonical one — otherwise 'region1' and 'r01' would each pay a
  // first-clear XP and hold a separate record. See rule_region_canonical().
  $regionId = rule_region_canonical($regionId);

  /* --- 2. rate limit ------------------------------------------------ */
  if (!score_rate_ok('boss', $studentId)) {
    score_rate_note('boss', $studentId, false);
    json_error('too_many_attempts', 429);
  }

  /* --- 3. plausibility ---------------------------------------------- */
  $ms       = (int) $ms;
  $mistakes = (int) $mistakes;
  $minMs = rule_boss_min_ms($regionId);
  $maxMs = rule_boss_max_ms($regionId);
  if ($ms < $minMs || $ms > $maxMs || $mistakes < 0 || $mistakes > 9999) {
    score_rate_note('boss', $studentId, false);
    progress_log_event($studentId, 'boss_result_rejected', array(
      'region' => $regionId, 'ms' => $ms, 'mistakes' => $mistakes, 'min_ms' => $minMs
    ));
    json_error('implausible_result', 422);
  }

  /* --- 4. the region must be unlocked ------------------------------- */
  $completed = progress_completed_map($studentId);
  foreach ($region['fables'] as $f) {
    if (!progress_fable_done($completed, $f)) {
      score_rate_note('boss', $studentId, false);
      json_error('boss_locked', 409);
    }
  }

  /* the run counts as a clear of the fight */
  $stmt = db()->prepare(
    'INSERT INTO boss_clears (student_id, region_id, fight_cleared_at)
     VALUES (?, ?, NOW())
     ON DUPLICATE KEY UPDATE fight_cleared_at = COALESCE(fight_cleared_at, NOW())'
  );
  $stmt->execute(array($studentId, $regionId));

  /* --- the record row: one per (student, region), best kept ---------
     Assignment order in ON DUPLICATE KEY UPDATE matters: MySQL evaluates
     left to right, so `phases` and `best_mistakes` are compared against the
     OLD best_ms, and best_ms is overwritten last. */
  $phasesJson = json_encode(progress_clean_phases($phases), JSON_UNESCAPED_UNICODE);
  $improved = false;
  try {
    $stmt = db()->prepare(
      'INSERT INTO boss_records (student_id, region_id, best_ms, best_mistakes, attempts, phases)
       VALUES (?, ?, ?, ?, 1, ?)
       ON DUPLICATE KEY UPDATE
         attempts      = attempts + 1,
         phases        = IF(VALUES(best_ms) < best_ms, VALUES(phases), phases),
         best_mistakes = LEAST(best_mistakes, VALUES(best_mistakes)),
         best_ms       = LEAST(best_ms, VALUES(best_ms))'
    );
    $stmt->execute(array($studentId, $regionId, $ms, $mistakes, $phasesJson));
  } catch (PDOException $e) {
    // boss_records lives in schema_v2.sql; if it has not been imported yet the
    // fight must still count. Log and carry on.
    error_log('imarianus: boss_records write failed: ' . $e->getMessage());
  }

  /* --- 5 + 6. first-clear XP, once, then capped --------------------- */
  $granted = 0;
  $capped  = false;
  if (!progress_event_exists($studentId, 'boss_fight_xp', $regionId)) {
    $want = (int) $region['fight_xp'];
    $granted = score_cap_grant($studentId, $want);
    $capped  = ($granted < $want);
    if ($granted > 0) {
      progress_add_xp($studentId, $granted, 'boss:' . $regionId);
    }
    // Log the once-only marker even at 0 XP: the clear happened, and the
    // grant must not be retryable by hammering the endpoint at midnight.
    progress_log_event($studentId, 'boss_fight_xp', array(
      'region' => $regionId, 'granted' => $granted, 'capped' => $capped
    ));
    progress_touch_streak($studentId);
  }

  /* --- score events: records board + rating ------------------------- */
  score_record($studentId, 'records', 'ms', $ms, $regionId);
  score_record($studentId, 'records', 'mistakes', $mistakes, $regionId);
  score_record($studentId, 'rating', 'accuracy',
               rule_accuracy_from_mistakes($mistakes), $regionId);

  score_rate_note('boss', $studentId, true);
  progress_log_event($studentId, 'boss_result', array(
    'region' => $regionId, 'ms' => $ms, 'mistakes' => $mistakes
  ));

  return array(
    'ok'       => true,
    'granted'  => $granted,
    'capped'   => $capped,
    'record'   => progress_boss_record($studentId, $regionId),
    'snapshot' => progress_snapshot($studentId)
  );
}

/* Read back one record row (also used by the public profile). */
function progress_boss_record($studentId, $regionId) {
  try {
    $stmt = db()->prepare(
      'SELECT region_id, best_ms, best_mistakes, attempts
         FROM boss_records WHERE student_id = ? AND region_id = ? LIMIT 1'
    );
    $stmt->execute(array($studentId, $regionId));
    $r = $stmt->fetch();
  } catch (PDOException $e) {
    return null;
  }
  if (!$r) { return null; }
  return array(
    'region'   => $r['region_id'],
    'ms'       => (int) $r['best_ms'],
    'mistakes' => (int) $r['best_mistakes'],
    'attempts' => (int) $r['attempts']
  );
}

/* All of a student's records, best first (public profile). */
function progress_boss_records($studentId) {
  try {
    $stmt = db()->prepare(
      'SELECT region_id, best_ms, best_mistakes, attempts
         FROM boss_records WHERE student_id = ? ORDER BY region_id ASC'
    );
    $stmt->execute(array($studentId));
    $rows = $stmt->fetchAll();
  } catch (PDOException $e) {
    return array();
  }
  $out = array();
  foreach ($rows as $r) {
    $out[] = array(
      'region'   => $r['region_id'],
      'ms'       => (int) $r['best_ms'],
      'mistakes' => (int) $r['best_mistakes'],
      'attempts' => (int) $r['attempts']
    );
  }
  return $out;
}

/* Sanitise the client's phase breakdown before it is stored as JSON.
   It is display data only — nothing downstream reads it to grant anything —
   but it still gets bounded so a hostile POST cannot store a megabyte of
   junk in the row. Max 8 phases, known keys only, integers clamped. */
function progress_clean_phases($phases) {
  $out = array();
  if (!is_array($phases)) { return $out; }
  $i = 0;
  foreach ($phases as $p) {
    if ($i >= 8) { break; }
    $i++;
    if (!is_array($p)) { continue; }
    $type = isset($p['type']) ? substr(preg_replace('/[^a-z0-9_\-]/i', '', (string) $p['type']), 0, 24) : '';
    $out[] = array(
      'type'     => $type,
      'ms'       => isset($p['ms']) ? max(0, min(RULE_BOSS_MAX_MS, (int) $p['ms'])) : 0,
      'mistakes' => isset($p['mistakes']) ? max(0, min(9999, (int) $p['mistakes'])) : 0
    );
  }
  return $out;
}

/* hearts + map position: low-value durable state, updated directly. */
function progress_set_hearts($studentId, $hearts) {
  $hearts = max(0, min(99, (int) $hearts));
  $stmt = db()->prepare('UPDATE progress SET hearts = ? WHERE student_id = ?');
  $stmt->execute(array($hearts, $studentId));
}
function progress_set_node($studentId, $node) {
  $node = substr((string) $node, 0, 24);
  $stmt = db()->prepare('UPDATE progress SET current_node = ? WHERE student_id = ?');
  $stmt->execute(array($node, $studentId));
}
