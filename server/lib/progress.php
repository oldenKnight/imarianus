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
  // previous fable must be fully complete
  if ($fi > 0) {
    $prevFable = rule_fables()[$fi - 1];
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

function progress_add_xp($studentId, $amount) {
  if ($amount <= 0) { return; }
  $stmt = db()->prepare('UPDATE progress SET xp = xp + ? WHERE student_id = ?');
  $stmt->execute(array((int) $amount, $studentId));
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
    progress_add_xp($studentId, $granted);
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
    progress_add_xp($studentId, $granted);
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
  if (!is_array($answers)) { json_error('bad_answers', 422); }

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
      progress_add_xp($studentId, $granted);
      progress_log_event($studentId, 'boss_quiz_xp', array('region' => $regionId, 'correct' => $correct));
    }
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
