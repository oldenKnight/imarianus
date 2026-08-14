<?php
/* ============================================================
   api/nickname.php — POST {nickname}
   ------------------------------------------------------------
   Claim or change YOUR OWN public nickname. The nickname is the one piece
   of a student's identity that is public (plan §7: "everyone public,
   NICKNAME ONLY"), and it is the /u/<nickname> URL segment, so it is
   validated tightly:

     • 3-20 characters, ASCII letters/digits/underscore only
       (no Unicode look-alikes in a public URL; Latin macrons belong in
        display_name, which is private and never leaves the server)
     • not on the blacklist hook in lib/rules.php
     • globally unique, case-insensitively — enforced by the UNIQUE index
       on students.nickname_lc, not by a check-then-write race
     • rate limited (5 changes/day by default) so the namespace cannot be
       farmed and so a squatter cannot cycle names

   Until a student claims a nickname, students.nickname_lc is NULL and they
   simply do not appear on any public board or profile. Claiming one is the
   act of going public.

   Session + CSRF like every other state-changing endpoint. The student id
   comes from the session, never the body.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');
$studentId = require_student();
require_csrf();

$body = read_json_body();
$nickname = isset($body['nickname']) ? trim((string) $body['nickname']) : '';

/* ---- rate limit (reuses the login_attempts table, see lib/score.php) ---- */
if (!score_rate_ok('nickname', $studentId)) {
  score_rate_note('nickname', $studentId, false);
  json_error('too_many_attempts', 429);
}

/* ---- validate ---- */
if (!rule_nickname_is_valid($nickname)) {
  score_rate_note('nickname', $studentId, false);
  json_error('invalid_nickname', 422);
}
if (rule_nickname_is_blacklisted($nickname)) {
  score_rate_note('nickname', $studentId, false);
  json_error('nickname_not_allowed', 422);
}

$lc  = strtolower($nickname);
$pdo = db();

/* Already yours? Then this is a no-op (re-casing is allowed and costs
   nothing) and must not burn a rate-limit slot's worth of surprise. */
$stmt = $pdo->prepare('SELECT nickname_lc FROM students WHERE id = ? LIMIT 1');
$stmt->execute(array($studentId));
$current = $stmt->fetchColumn();

/* ---- write. The UNIQUE index is the referee: we do not "check then
   insert", because between the check and the insert someone else can take
   the name. We attempt the write and treat SQLSTATE 23000 (integrity
   constraint violation) as "taken". ---- */
try {
  $stmt = $pdo->prepare('UPDATE students SET nickname = ?, nickname_lc = ? WHERE id = ?');
  $stmt->execute(array($nickname, $lc, $studentId));
} catch (PDOException $e) {
  if ($e->getCode() === '23000') {
    score_rate_note('nickname', $studentId, false);
    json_error('nickname_taken', 409);
  }
  // Anything else (e.g. schema_v2.sql not imported: no nickname_lc column)
  // is a server problem, not the student's.
  error_log('imarianus: nickname update failed: ' . $e->getMessage());
  json_error('nickname_failed', 500, APP_DEBUG ? array('detail' => $e->getMessage()) : array());
}

$changed = ($current !== $lc);
score_rate_note('nickname', $studentId, true);
if ($changed) {
  progress_log_event($studentId, 'nickname_set', array('nickname' => $nickname));
}

json_out(array(
  'ok'       => true,
  'nickname' => $nickname,
  'changed'  => $changed,
  'profile'  => '/u/' . rawurlencode($nickname)
));
