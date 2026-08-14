<?php
/* ============================================================
   api/profile.php — GET ?nickname=...
   ------------------------------------------------------------
   The PUBLIC profile behind /u/<nickname>: gradus, XP, rating, records,
   badges, tracks in progress.

   *** THE PRIVACY RULE, ENFORCED IN SQL ***
   Exactly TWO columns of the students table may leave this endpoint:
       nickname, avatar
   NEVER display_name, NEVER email, NEVER class_id or its teacher, NEVER
   `source` (which would reveal that a child was created by a teacher),
   NEVER anything from auth_identities. Every SELECT below names its
   columns one by one — there is no SELECT * in this file, and no filtering
   is delegated to the client, because a client-side filter is a filter an
   attacker can remove (plan §7).

   Public by design: no session is started, no CSRF, no cookie. The lookup
   key is students.nickname_lc, the UNIQUE column added by schema_v2.sql, so
   the URL is case-insensitive and can never resolve to two people.
   ============================================================ */

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/score.php';
require_once __DIR__ . '/../lib/progress.php';

require_method('GET');

$nickname = isset($_GET['nickname']) ? trim((string) $_GET['nickname']) : '';
if ($nickname === '' || !rule_nickname_is_valid($nickname)) {
  // Same shape as "not found": the validity of a nickname is not a hint
  // worth giving out, and it keeps the client's error handling simple.
  json_error('no_profile', 404);
}

$studentId = score_student_by_nickname($nickname);
if (!$studentId) { json_error('no_profile', 404); }

$pdo = db();

/* ---- 1. the public identity (TWO columns) + derived progress ----
   `progress` holds no personal data: xp and streak are exactly what the
   owner declared public. */
$stmt = $pdo->prepare(
  'SELECT s.nickname AS nickname,
          s.avatar   AS avatar,
          p.xp       AS xp,
          p.streak   AS streak
     FROM students s
     LEFT JOIN progress p ON p.student_id = s.id
    WHERE s.id = ?
    LIMIT 1'
);
$stmt->execute(array($studentId));
$row = $stmt->fetch();
if (!$row) { json_error('no_profile', 404); }

$xp = (int) $row['xp'];

/* ---- 2. tracks in progress ----
   Derived from the durable facts (step_completions), mapped onto the
   curriculum by lib/rules.php (which reads content/manifest.json when it is
   present). One indexed query, aggregated in PHP so the shape of the
   curriculum stays a rules.php concern and not an SQL one. */
$stmt = $pdo->prepare(
  'SELECT fable_id, COUNT(*) AS done
     FROM step_completions
    WHERE student_id = ?
    GROUP BY fable_id'
);
$stmt->execute(array($studentId));
$doneByFable = array();
foreach ($stmt->fetchAll() as $r) {
  $doneByFable[$r['fable_id']] = (int) $r['done'];
}

$stepCount = count(rule_steps());
$tracks = array();
foreach (rule_regions() as $regionId => $region) {
  $trackId = isset($region['track']) ? $region['track'] : 'fabulae';
  if (!isset($tracks[$trackId])) {
    $tracks[$trackId] = array(
      'track' => $trackId, 'capitula' => 0, 'started' => 0,
      'completed' => 0, 'steps' => 0, 'stepsTotal' => 0
    );
  }
  foreach ($region['fables'] as $fable) {
    $done = isset($doneByFable[$fable]) ? $doneByFable[$fable] : 0;
    $tracks[$trackId]['capitula']++;
    $tracks[$trackId]['stepsTotal'] += $stepCount;
    $tracks[$trackId]['steps'] += $done;
    if ($done > 0) { $tracks[$trackId]['started']++; }
    if ($done >= $stepCount) { $tracks[$trackId]['completed']++; }
  }
}
// Only show a track the student has actually touched.
$tracksOut = array();
foreach ($tracks as $t) {
  if ($t['steps'] > 0) { $tracksOut[] = $t; }
}

/* ---- 3. boss clears (for badges) and speed records ---- */
$stmt = $pdo->prepare(
  'SELECT region_id, fight_cleared_at, quiz_cleared_at
     FROM boss_clears WHERE student_id = ?'
);
$stmt->execute(array($studentId));
$clears = $stmt->fetchAll();

$records = progress_boss_records($studentId);   // best_ms / best_mistakes per region

/* ---- 4. badges ----
   Ids only. The Latin labels live in the client's content files, exactly
   like every other display string on the site. */
$badges = array();
$g = score_gradus($xp);
$badges[] = 'gradus:' . $g['key'];
foreach ($clears as $c) {
  if (!empty($c['fight_cleared_at'])) { $badges[] = 'victor:' . $c['region_id']; }
  if (!empty($c['quiz_cleared_at']))  { $badges[] = 'doctus:' . $c['region_id']; }
}
foreach ($records as $r) {
  if ($r['mistakes'] === 0) { $badges[] = 'sine_errore:' . $r['region']; }
}
$streak = (int) $row['streak'];
if ($streak >= 7)  { $badges[] = 'constans:7'; }
if ($streak >= 30) { $badges[] = 'constans:30'; }

header('Cache-Control: public, max-age=60');

json_out(array(
  'ok' => true,
  'profile' => array(
    'nickname' => $row['nickname'],   // ← the only two students columns
    'avatar'   => $row['avatar'],     //   that exist in this response
    'gradus'   => $g,
    'xp'       => $xp,
    'streak'   => $streak,
    'rating'   => score_rating($studentId),   // null until enough graded events
    'records'  => $records,
    'badges'   => $badges,
    'tracks'   => $tracksOut
  )
));
