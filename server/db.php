<?php
/* ============================================================
   db.php — single shared PDO connection
   PDO + prepared statements everywhere = no SQL injection.
   ============================================================ */

require_once __DIR__ . '/config.php';

function db() {
  static $pdo = null;
  if ($pdo !== null) { return $pdo; }

  $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
  $opts = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,   // throw on error
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false                    // real prepares
  );
  try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $opts);
  } catch (PDOException $e) {
    // Never leak credentials/host details to the client.
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('ok' => false, 'error' => 'db_unavailable'));
    exit;
  }
  return $pdo;
}
