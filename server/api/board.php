<?php
/* ============================================================
   api/board.php — GET ?id=total|weekly|rating|records|streak[&region=...]
   ------------------------------------------------------------
   The PUBLIC leaderboard. Open to strangers by the owner's decision
   (plan §7: "a PUBLIC GLOBAL BOARD ... everyone public, NICKNAME ONLY").

   Consequences of "public", handled here:
     • NO SESSION IS STARTED. A visitor who never logs in must not be given
       a session cookie just for looking at a board, and the response must
       be cacheable by the browser.
     • NO CSRF: this is a read-only GET that changes nothing a caller owns.
     • The rows expose `nickname`, `avatar`, `value` and the derived
       `gradus` — nothing else. display_name, email, class, teacher and the
       auth identifier never enter the query (lib/score.php names every
       column explicitly; there is no SELECT * anywhere in the path).
     • A student with no claimed nickname (students.nickname_lc IS NULL) is
       omitted entirely: there is no name we are permitted to render them
       under.

   CACHING / "there is no cron on shared hosting":
     Boards are served from `leaderboard_cache`. Whichever request finds the
     cache older than 5 minutes recomputes it inline, under a MySQL advisory
     lock so only one request pays that cost; everyone else is handed the
     slightly stale rows rather than queueing. See lib/score.php.

   WEEKLY: the window starts at Monday 00:00:00 UTC and is applied to
   score_events.achieved_at, which PHP always writes in UTC. There is no
   reset job — a new week simply means a different WHERE bound.
   ============================================================ */

require_once __DIR__ . '/../lib/response.php';
require_once __DIR__ . '/../lib/score.php';

require_method('GET');

$id     = isset($_GET['id']) ? (string) $_GET['id'] : 'total';
$region = isset($_GET['region']) ? (string) $_GET['region'] : '';

if (!score_board_exists($id)) {
  json_error('unknown_board', 422);
}

/* The records board is per region/liber, so a region id is mandatory and
   must be one the server actually knows (no free-text cache keys). */
if ($id === 'records') {
  if ($region === '' || !rule_region($region)) {
    json_error('invalid_region', 422);
  }
  // Records are stored under the canonical region id ('region1', not 'r01'),
  // so the cache key must use it too — otherwise the same board would be
  // computed twice under two names. See rule_region_canonical().
  $region = rule_region_canonical($region);
} else {
  $region = '';   // ignored for every other board; keeps the cache key clean
}

$board = score_board($id, $region);

/* Browser/proxy cache for a minute. The data behind it is at most
   BOARD_CACHE_TTL old anyway, so this costs no extra staleness worth
   worrying about and absorbs a refresh-key-masher for free. */
header('Cache-Control: public, max-age=60');

json_out(array(
  'ok'      => true,
  'board'   => $id,
  'region'  => $region,
  /* asc  = rank 1 is the LOWEST value (records: fastest time)
     desc = rank 1 is the HIGHEST value (everything else)
     Sent explicitly so the client never has to infer it. */
  'order'   => ($id === 'records') ? 'asc' : 'desc',
  'unit'    => board_unit($id),
  'window'  => ($id === 'weekly') ? score_week_start_utc() : null,
  'computedAt' => $board['computedAt'],
  'ttl'     => BOARD_CACHE_TTL,
  'count'   => count($board['rows']),
  'rows'    => $board['rows']
));

/* What `value` means on each board, so the client can format it. */
function board_unit($id) {
  switch ($id) {
    case 'total':   return 'xp';
    case 'weekly':  return 'xp';
    case 'rating':  return 'percent';
    case 'streak':  return 'days';
    case 'records': return 'ms';
  }
  return '';
}
