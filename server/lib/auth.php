<?php
/* ============================================================
   lib/auth.php — sessions, current student, remember-me, CSRF
   ------------------------------------------------------------
   IDOR rule: the logged-in student id ALWAYS comes from the
   session (current_student_id), never from the request body.
   ============================================================ */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/response.php';

/* Start a hardened session. Call at the top of every API entry point. */
function session_boot() {
  if (session_status() === PHP_SESSION_ACTIVE) { return; }
  $secure = APP_HTTPS;
  session_name(SESSION_NAME);
  session_set_cookie_params(array(
    'lifetime' => 0,            // session cookie (cleared on browser close)
    'path'     => '/',
    'secure'   => $secure,
    'httponly' => true,
    'samesite' => 'Lax'
  ));
  session_start();
  // Issue a CSRF token for this session if absent.
  if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
  }
}

/* The current student id, or null. */
function current_student_id() {
  return isset($_SESSION['sid']) ? (int) $_SESSION['sid'] : null;
}

/* Bind the session to a student (after a successful login/register). */
function login_session($studentId) {
  // Rotate the session id to prevent fixation.
  session_regenerate_id(true);
  $_SESSION['sid'] = (int) $studentId;
}

/* Require an authenticated student or 401. Returns the id. */
function require_student() {
  $id = current_student_id();
  if (!$id) {
    // Try a remember-me cookie before giving up.
    $id = try_remember_login();
  }
  if (!$id) { json_error('unauthenticated', 401); }
  return $id;
}

/* ---- CSRF ---- */
function csrf_token() {
  return isset($_SESSION['csrf']) ? $_SESSION['csrf'] : '';
}
/* Validate the CSRF header on state-changing requests. */
function require_csrf() {
  $sent = isset($_SERVER['HTTP_X_CSRF_TOKEN']) ? $_SERVER['HTTP_X_CSRF_TOKEN'] : '';
  if (!$sent || !hash_equals(csrf_token(), $sent)) {
    json_error('bad_csrf', 403);
  }
}

/* ============================================================
   Remember-me: selector + verifier split token (Barry Jaspan
   pattern). Cookie = "selector:verifier". DB stores selector
   (plain, for lookup) and sha256(verifier). On use we rotate.
   ============================================================ */

function remember_issue($studentId, $deviceLabel) {
  $selector = bin2hex(random_bytes(12));      // 24 hex chars
  $verifier = bin2hex(random_bytes(32));      // secret
  $hash     = hash('sha256', $verifier);
  $expires  = (new DateTime('+' . REMEMBER_DAYS . ' days'))->format('Y-m-d H:i:s');

  $stmt = db()->prepare(
    'INSERT INTO remember_tokens (student_id, selector, token_hash, device_label, expires_at)
     VALUES (?, ?, ?, ?, ?)'
  );
  $stmt->execute(array($studentId, $selector, $hash, substr($deviceLabel, 0, 120), $expires));

  set_remember_cookie($selector . ':' . $verifier);
}

function set_remember_cookie($value) {
  $expires = time() + REMEMBER_DAYS * 86400;
  setcookie(REMEMBER_COOKIE, $value, array(
    'expires'  => $expires,
    'path'     => '/',
    'secure'   => APP_HTTPS,
    'httponly' => true,
    'samesite' => 'Lax'
  ));
}

function clear_remember_cookie() {
  setcookie(REMEMBER_COOKIE, '', array(
    'expires'  => time() - 3600,
    'path'     => '/',
    'secure'   => APP_HTTPS,
    'httponly' => true,
    'samesite' => 'Lax'
  ));
}

/* Try to log in from the remember cookie; rotate on success. Returns id|null. */
function try_remember_login() {
  if (empty($_COOKIE[REMEMBER_COOKIE])) { return null; }
  $parts = explode(':', $_COOKIE[REMEMBER_COOKIE], 2);
  if (count($parts) !== 2) { clear_remember_cookie(); return null; }
  list($selector, $verifier) = $parts;

  $stmt = db()->prepare('SELECT * FROM remember_tokens WHERE selector = ? LIMIT 1');
  $stmt->execute(array($selector));
  $row = $stmt->fetch();
  if (!$row) { clear_remember_cookie(); return null; }

  // Expired?
  if (strtotime($row['expires_at']) < time()) {
    remember_delete_by_id($row['id']);
    clear_remember_cookie();
    return null;
  }
  // Constant-time compare of the verifier hash.
  if (!hash_equals($row['token_hash'], hash('sha256', $verifier))) {
    // Possible theft: nuke all tokens for this student.
    remember_delete_all($row['student_id']);
    clear_remember_cookie();
    return null;
  }

  // Valid → rotate the token (one-time use) and bind the session.
  remember_delete_by_id($row['id']);
  $sid = (int) $row['student_id'];
  login_session($sid);
  remember_issue($sid, $row['device_label']);
  return $sid;
}

function remember_delete_by_id($id) {
  db()->prepare('DELETE FROM remember_tokens WHERE id = ?')->execute(array($id));
}
function remember_delete_all($studentId) {
  db()->prepare('DELETE FROM remember_tokens WHERE student_id = ?')->execute(array($studentId));
}

/* Full logout: clear session + the current device's remember token. */
function logout_current() {
  if (!empty($_COOKIE[REMEMBER_COOKIE])) {
    $parts = explode(':', $_COOKIE[REMEMBER_COOKIE], 2);
    if (count($parts) === 2) {
      $stmt = db()->prepare('DELETE FROM remember_tokens WHERE selector = ?');
      $stmt->execute(array($parts[0]));
    }
    clear_remember_cookie();
  }
  $_SESSION = array();
  if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
  }
  session_destroy();
}
