<?php
/* ============================================================
   api/teacher_login.php — POST {email, password}
   ------------------------------------------------------------
   M8 GROUNDWORK. api/class_roster.php needs a teacher session and there was
   no way to obtain one (admin_seed.php creates the teacher row and its
   auth_identities row, but nothing logs it in). This is that door, and it
   is a deliberate copy of api/login.php's shape: same rate limiting, same
   password_verify + rehash, same generic error so the endpoint cannot be
   used to enumerate teacher emails.

   The difference: it binds $_SESSION['tid'], not $_SESSION['sid'], and
   issues NO remember-me cookie (see require_teacher()).
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';

session_boot();
require_method('POST');

$body     = read_json_body();
$email    = isset($body['email']) ? trim($body['email']) : '';
$password = isset($body['password']) ? (string) $body['password'] : '';

if ($email === '' || $password === '') {
  json_error('missing_credentials', 422);
}

$pdo = db();
$ip  = client_ip();

/* ---- rate limit: too many recent failures from this IP? ---- */
$stmt = $pdo->prepare(
  'SELECT COUNT(*) FROM login_attempts
   WHERE ip = ? AND ok = 0 AND created_at > (NOW() - INTERVAL ? MINUTE)'
);
$stmt->execute(array($ip, LOGIN_WINDOW_MIN));
if ((int) $stmt->fetchColumn() >= LOGIN_MAX_FAILS) {
  json_error('too_many_attempts', 429);
}

/* ---- look up the teacher's local identity ---- */
$stmt = $pdo->prepare(
  'SELECT subject_id, password_hash FROM auth_identities
   WHERE provider = "local" AND subject_type = "teacher" AND identifier = ? LIMIT 1'
);
$stmt->execute(array($email));
$idRow = $stmt->fetch();

$ok = false;
$teacherId = null;
if ($idRow && $idRow['password_hash'] && password_verify($password, $idRow['password_hash'])) {
  $ok = true;
  $teacherId = (int) $idRow['subject_id'];
}

$stmt = $pdo->prepare('INSERT INTO login_attempts (ip, identifier, ok) VALUES (?, ?, ?)');
$stmt->execute(array($ip, substr('teacher:' . $email, 0, 190), $ok ? 1 : 0));

if (!$ok) { json_error('bad_login', 401); }

if (password_needs_rehash($idRow['password_hash'], PASSWORD_DEFAULT)) {
  $new = password_hash($password, PASSWORD_DEFAULT);
  $pdo->prepare('UPDATE auth_identities SET password_hash = ?
                  WHERE provider = "local" AND subject_type = "teacher" AND identifier = ?')
      ->execute(array($new, $email));
}

login_teacher_session($teacherId);

$stmt = $pdo->prepare('SELECT name, email FROM teachers WHERE id = ? LIMIT 1');
$stmt->execute(array($teacherId));
$t = $stmt->fetch();

json_out(array(
  'ok'   => true,
  'csrf' => csrf_token(),
  'teacher' => array(
    'id'    => $teacherId,
    'name'  => $t ? $t['name'] : '',
    'email' => $t ? $t['email'] : ''
  )
));
