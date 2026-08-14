<?php
/* ============================================================
   api/boss_fight.php — POST {region}
   Records a boss FIGHT as cleared (gameplay is client-side).
   Requires all the region's fables done; grants fight XP once.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');
$studentId = require_student();
require_csrf();

$body   = read_json_body();
$region = isset($body['region']) ? (string) $body['region'] : '';

$result = progress_boss_fight($studentId, $region);
json_out($result);
