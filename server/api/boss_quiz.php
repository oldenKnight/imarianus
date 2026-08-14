<?php
/* ============================================================
   api/boss_quiz.php — POST {region, answers:{question:choice}}
   The server grades against its own answer key (never shipped to
   the client) and grants quiz XP once on pass.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');
$studentId = require_student();
require_csrf();

$body    = read_json_body();
$region  = isset($body['region']) ? (string) $body['region'] : '';
$answers = isset($body['answers']) && is_array($body['answers']) ? $body['answers'] : array();

$result = progress_boss_quiz($studentId, $region, $answers);
json_out($result);
