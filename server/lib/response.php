<?php
/* ============================================================
   lib/response.php — JSON I/O, headers, input parsing
   ============================================================ */

require_once __DIR__ . '/../config.php';

/* Emit standard security headers on every API response. The strong CSP for
   the app pages themselves is set at the host (.htaccess); these protect the
   JSON endpoints. */
function send_base_headers() {
  header('Content-Type: application/json; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  header('Referrer-Policy: strict-origin-when-cross-origin');
  header('X-Frame-Options: DENY');
  if (CORS_ALLOW_ORIGIN !== '') {
    header('Access-Control-Allow-Origin: ' . CORS_ALLOW_ORIGIN);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
  }
}

/* Send a JSON payload and stop. */
function json_out($data, $code = 200) {
  http_response_code($code);
  send_base_headers();
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

/* Standard error shape. */
function json_error($error, $code = 400, $extra = array()) {
  $body = array('ok' => false, 'error' => $error);
  foreach ($extra as $k => $v) { $body[$k] = $v; }
  json_out($body, $code);
}

/* Read + decode a JSON request body into an associative array. */
function read_json_body() {
  $raw = file_get_contents('php://input');
  if ($raw === '' || $raw === false) { return array(); }
  $data = json_decode($raw, true);
  return is_array($data) ? $data : array();
}

/* Require a specific HTTP method or reject. */
function require_method($method) {
  if ($_SERVER['REQUEST_METHOD'] !== $method) {
    json_error('method_not_allowed', 405);
  }
}

/* Client IP, best-effort (host may sit behind a proxy). */
function client_ip() {
  if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $parts = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    return trim($parts[0]);
  }
  return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
}
