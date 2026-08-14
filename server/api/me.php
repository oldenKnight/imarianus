<?php
/* ============================================================
   api/me.php — GET  → current student + progress snapshot
   Called on app load. If no live session, try_remember_login()
   inside require_student() silently restores it from the
   remember-me cookie (and rotates the token).
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('GET');

$studentId = require_student();

$stmt = db()->prepare('SELECT display_name, nickname, avatar FROM students WHERE id = ?');
$stmt->execute(array($studentId));
$s = $stmt->fetch();
if (!$s) { json_error('no_student', 404); }

json_out(array(
  'ok' => true,
  'csrf' => csrf_token(),
  'student' => array(
    'id' => $studentId,
    'displayName' => $s['display_name'],
    'nickname' => $s['nickname'],
    'avatar' => $s['avatar']
  ),
  'snapshot' => progress_snapshot($studentId)
));
