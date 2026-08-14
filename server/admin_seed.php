<?php
/* ============================================================
   admin_seed.php — ONE-TIME setup helper (delete after use!)
   ------------------------------------------------------------
   Creates a teacher account and a class with a join code, so
   students can self-register against your class. Run it ONCE
   from the browser or CLI, then DELETE this file.

   Usage (browser):
     https://yoursite/server/admin_seed.php?key=SETUP&email=you@x.com&pass=YOURPASS&class=Latina%20I

   Security: requires a one-time key you set below, refuses to
   run if any teacher already exists (so it can't be re-run to
   create rogue admins), and tells you to delete it afterward.
   ============================================================ */

require_once __DIR__ . '/db.php';

/* CHANGE THIS before uploading, then pass ?key=... to match. */
$SETUP_KEY = 'CHANGE_ME_ONCE';

header('Content-Type: text/plain; charset=utf-8');

$key = isset($_GET['key']) ? $_GET['key'] : '';
if (!hash_equals($SETUP_KEY, $key)) {
  http_response_code(403);
  echo "Forbidden: bad setup key.\n";
  exit;
}

$pdo = db();

/* refuse if a teacher already exists */
if ((int) $pdo->query('SELECT COUNT(*) FROM teachers')->fetchColumn() > 0) {
  echo "A teacher already exists. For safety this script won't run again.\n";
  echo "DELETE this file now.\n";
  exit;
}

$email = isset($_GET['email']) ? trim($_GET['email']) : '';
$pass  = isset($_GET['pass'])  ? (string) $_GET['pass'] : '';
$class = isset($_GET['class']) ? trim($_GET['class']) : 'Latina I';

if ($email === '' || strlen($pass) < 8) {
  echo "Provide ?email=...&pass=... (password 8+ chars) [&class=...]\n";
  exit;
}

try {
  $pdo->beginTransaction();

  $hash = password_hash($pass, PASSWORD_DEFAULT);
  $stmt = $pdo->prepare('INSERT INTO teachers (email, password_hash, name) VALUES (?, ?, ?)');
  $stmt->execute(array($email, $hash, 'Magistra'));
  $teacherId = (int) $pdo->lastInsertId();

  // a teacher can also log in via auth_identities (provider local)
  $stmt = $pdo->prepare(
    'INSERT INTO auth_identities (subject_type, subject_id, provider, identifier, password_hash)
     VALUES ("teacher", ?, "local", ?, ?)'
  );
  $stmt->execute(array($teacherId, $email, $hash));

  // create a class with a random join code
  $joinCode = strtoupper(bin2hex(random_bytes(3))); // 6 hex chars, e.g. "A1B2C3"
  $stmt = $pdo->prepare('INSERT INTO classes (teacher_id, name, join_code) VALUES (?, ?, ?)');
  $stmt->execute(array($teacherId, $class, $joinCode));

  $pdo->commit();

  echo "OK. Teacher and class created.\n";
  echo "Teacher email : $email\n";
  echo "Class         : $class\n";
  echo "JOIN CODE     : $joinCode   <-- give this to students who self-register\n\n";
  echo "NOW DELETE THIS FILE (server/admin_seed.php).\n";
} catch (PDOException $e) {
  $pdo->rollBack();
  echo "Failed: " . $e->getMessage() . "\n";
}
