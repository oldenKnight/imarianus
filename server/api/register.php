<?php
/* ============================================================
   api/register.php — POST {username, password, displayName,
                            nickname?, avatar?, joinCode?}
   Creates a student profile + a local identity + progress row.
   If joinCode matches a class, the student is attached to it.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');

$body = read_json_body();
$username    = isset($body['username']) ? trim($body['username']) : '';
$password    = isset($body['password']) ? (string) $body['password'] : '';
$displayName = isset($body['displayName']) ? trim($body['displayName']) : '';
$nickname    = isset($body['nickname']) ? trim($body['nickname']) : '';
$avatar      = isset($body['avatar']) ? trim($body['avatar']) : 'fox';
$joinCode    = isset($body['joinCode']) ? trim($body['joinCode']) : '';

/* ---- validation ---- */
if (strlen($username) < 3 || strlen($username) > 60) {
  json_error('username_length', 422);
}
if (strlen($password) < 6) {
  json_error('password_too_short', 422);
}
if ($displayName === '') { $displayName = $username; }
if ($nickname === '') { $nickname = $displayName; }
$avatar = preg_replace('/[^a-z0-9_\-]/i', '', $avatar);
if ($avatar === '') { $avatar = 'fox'; }

$pdo = db();

/* ---- username already taken? ---- */
$stmt = $pdo->prepare('SELECT 1 FROM auth_identities WHERE provider = "local" AND identifier = ? LIMIT 1');
$stmt->execute(array($username));
if ($stmt->fetchColumn()) {
  json_error('username_taken', 409);
}

/* ---- resolve optional class join code ---- */
$classId = null;
if ($joinCode !== '') {
  $stmt = $pdo->prepare('SELECT id FROM classes WHERE join_code = ? LIMIT 1');
  $stmt->execute(array($joinCode));
  $row = $stmt->fetch();
  if (!$row) { json_error('bad_join_code', 422); }
  $classId = (int) $row['id'];
}

/* ---- create everything atomically ---- */
try {
  $pdo->beginTransaction();

  $stmt = $pdo->prepare(
    'INSERT INTO students (class_id, display_name, nickname, avatar, source)
     VALUES (?, ?, ?, ?, ?)'
  );
  $stmt->execute(array($classId, $displayName, $nickname, $avatar, $classId ? 'self' : 'self'));
  $studentId = (int) $pdo->lastInsertId();

  $hash = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $pdo->prepare(
    'INSERT INTO auth_identities (subject_type, subject_id, provider, identifier, password_hash)
     VALUES ("student", ?, "local", ?, ?)'
  );
  $stmt->execute(array($studentId, $username, $hash));

  $pdo->prepare('INSERT INTO progress (student_id) VALUES (?)')->execute(array($studentId));

  $pdo->commit();
} catch (PDOException $e) {
  $pdo->rollBack();
  json_error('register_failed', 500, APP_DEBUG ? array('detail' => $e->getMessage()) : array());
}

/* ---- log them straight in ---- */
login_session($studentId);
progress_log_event($studentId, 'register', array('class' => $classId));

json_out(array(
  'ok' => true,
  'csrf' => csrf_token(),
  'student' => array(
    'id' => $studentId, 'displayName' => $displayName,
    'nickname' => $nickname, 'avatar' => $avatar
  ),
  'snapshot' => progress_snapshot($studentId)
));
