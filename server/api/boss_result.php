<?php
/* ============================================================
   api/boss_result.php — POST {region, ms, mistakes, phases[]}
   ------------------------------------------------------------
   Records the OUTCOME of a boss duel: the clear itself, the speed/mistake
   record for the records board, and the once-only first-clear XP.

   Everything in the body is a MEASUREMENT. The reward is looked up
   server-side in lib/rules.php and granted by lib/progress.php. A body that
   tries to state its own reward is rejected outright rather than ignored —
   an ignored field is an attack someone keeps refining; a 422 tells them
   immediately that this door does not exist.

   Session auth + CSRF exactly like api/boss_fight.php. The student id comes
   from the session, never from the body (the standing IDOR rule).

   Anti-cheat lives in progress_boss_result(): rate limit, plausible
   duration per region, region-unlocked check, once-only XP, daily XP cap.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/progress.php';

session_boot();
require_method('POST');
$studentId = require_student();
require_csrf();

$body = read_json_body();

/* ---- reject client-declared rewards, loudly ----
   The client never sets XP or a level. If any of these appear, the request
   is not a mistake — it is someone probing. Refuse the whole POST. */
$forbidden = array('xp', 'XP', 'level', 'gradus', 'rating', 'granted', 'score');
foreach ($forbidden as $k) {
  if (array_key_exists($k, $body)) {
    json_error('client_reward_rejected', 422, array('field' => $k));
  }
}

$region   = isset($body['region'])   ? (string) $body['region'] : '';
$ms       = isset($body['ms'])       ? (int) $body['ms'] : 0;
$mistakes = isset($body['mistakes']) ? (int) $body['mistakes'] : 0;
$phases   = isset($body['phases']) && is_array($body['phases']) ? $body['phases'] : array();

if ($region === '') { json_error('invalid_region', 422); }

$result = progress_boss_result($studentId, $region, $ms, $mistakes, $phases);
json_out($result);
