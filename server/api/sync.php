<?php
/* ============================================================
   api/sync.php — POST {hearts?, mapNode?}
   Low-frequency durable state that doesn't grant rewards:
   the current heart count and the fox's map position. Kept
   separate from the reward endpoints so it can be called
   sparingly (e.g. on leaving a screen).
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');
$studentId = require_student();
require_csrf();

$body = read_json_body();
if (array_key_exists('hearts', $body)) {
  progress_set_hearts($studentId, $body['hearts']);
}
if (array_key_exists('mapNode', $body)) {
  progress_set_node($studentId, $body['mapNode']);
}

json_out(array('ok' => true, 'snapshot' => progress_snapshot($studentId)));
