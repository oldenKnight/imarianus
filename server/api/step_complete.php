<?php
/* ============================================================
   api/step_complete.php — POST {fable, step, score?}
   Server validates prerequisites + idempotency, grants XP, and
   returns the authoritative snapshot for the client to mirror.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');
$studentId = require_student();
require_csrf();

$body  = read_json_body();
$fable = isset($body['fable']) ? (string) $body['fable'] : '';
$step  = isset($body['step'])  ? (string) $body['step']  : '';
$score = isset($body['score']) ? (int) $body['score'] : 0;

$result = progress_complete_step($studentId, $fable, $step, $score);
json_out($result);
