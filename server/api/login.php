<?php
/* ============================================================
   api/login.php — POST {username, password, remember?}
   Validates a local identity; on success starts a session and
   (optionally) issues a rotating remember-me token.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');

$body = read_json_body();
$username = isset($body['username']) ? trim($body['username']) : '';
$password = isset($body['password']) ? (string) $body['password'] : '';
$remember = !empty($body['remember']);

if ($username === '' || $password === '') {
  json_error('missing_credentials', 422);
}

$pdo = db();
$ip = client_ip();

/* ---- rate limit: too many recent failures from this IP? ---- */
$stmt = $pdo->prepare(
  'SELECT COUNT(*) FROM login_attempts
   WHERE ip = ? AND ok = 0 AND created_at > (NOW() - INTERVAL ? MINUTE)'
);
$stmt->execute(array($ip, LOGIN_WINDOW_MIN));
if ((int) $stmt->fetchColumn() >= LOGIN_MAX_FAILS) {
  json_error('too_many_attempts', 429);
}

/* ---- look up the local identity ---- */
$stmt = $pdo->prepare(
  'SELECT subject_id, password_hash FROM auth_identities
   WHERE provider = "local" AND subject_type = "student" AND identifier = ? LIMIT 1'
);
$stmt->execute(array($username));
$idRow = $stmt->fetch();

$ok = false;
$studentId = null;
if ($idRow && $idRow['password_hash'] && password_verify($password, $idRow['password_hash'])) {
  $ok = true;
  $studentId = (int) $idRow['subject_id'];
}

/* ---- record the attempt (for rate limiting) ---- */
$stmt = $pdo->prepare('INSERT INTO login_attempts (ip, identifier, ok) VALUES (?, ?, ?)');
$stmt->execute(array($ip, substr($username, 0, 190), $ok ? 1 : 0));

if (!$ok) {
  // Same generic error whether the username exists or not (no user enumeration).
  json_error('bad_login', 401);
}

/* ---- success ---- */
// Re-hash if PHP's default cost changed since the password was set.
if (password_needs_rehash($idRow['password_hash'], PASSWORD_DEFAULT)) {
  $new = password_hash($password, PASSWORD_DEFAULT);
  $pdo->prepare('UPDATE auth_identities SET password_hash = ? WHERE provider = "local" AND identifier = ?')
      ->execute(array($new, $username));
}

login_session($studentId);
if ($remember) {
  $device = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
  remember_issue($studentId, $device);
}

/* student profile for the client header */
$stmt = $pdo->prepare('SELECT display_name, nickname, avatar FROM students WHERE id = ?');
$stmt->execute(array($studentId));
$s = $stmt->fetch();

json_out(array(
  'ok' => true,
  'csrf' => csrf_token(),
  'student' => array(
    'id' => $studentId,
    'displayName' => $s ? $s['display_name'] : '',
    'nickname' => $s ? $s['nickname'] : '',
    'avatar' => $s ? $s['avatar'] : 'fox'
  ),
  'snapshot' => progress_snapshot($studentId)
));
