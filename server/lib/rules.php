<?php
/* ============================================================
   lib/rules.php — the server's source of truth
   ------------------------------------------------------------
   The client (data.js / content/*.js) holds the CONTENT (Latin
   text, art). The server only needs the FACTS required to
   validate events and grant rewards: which fables/steps exist,
   their order, XP values, unlock prerequisites, the boss config,
   and the quiz ANSWER KEY (never shipped to the client).

   v2 (M8) — the lists below are now the FALLBACK. When the
   generated content manifest (content/manifest.json) is present
   the curriculum is read from it, so adding 33 more fables is a
   content deploy and not a PHP edit. See "MANIFEST" below.

   NOTHING in this file is ever sent to the browser.
   ============================================================ */

require_once __DIR__ . '/../config.php';

/* ---- tunables ------------------------------------------------
   FLAGGED FOR THE OWNER (plan §10: "XP values and level thresholds
   are design, not implementation"). These are working defaults so
   the system runs; change the numbers, not the code. */
define('RULE_DEFAULT_STEP_XP',  20);   // any manifest step with no explicit value
define('RULE_DEFAULT_FIGHT_XP', 30);   // boss first clear, region with no config
define('RULE_DAILY_XP_CAP',   1000);   // anti-cheat ceiling, per student per UTC day
define('RULE_BOSS_MIN_MS',   15000);   // default "no human is that fast" floor
define('RULE_BOSS_MAX_MS',  3600000);  // 1 h: anything longer is a stuck tab

/* ============================================================
   MANIFEST — the generated content index
   ------------------------------------------------------------
   Shape (docs/MASTER-PLAN.md, content/manifest.json):

     { "version": 2,
       "tracks": [
         { "id": "fabulae",
           "regions": [
             { "id": "r01", "capitula": ["f1","f2","f3"], "boss": "b_r01" }
           ] }
       ],
       "steps": ["verba","fabula","sonus","ludus","aenigmata","corrige","comple"] }

   Rules of engagement:
     • Absent or malformed file  → silently fall back to the built-in lists
       below, so the server keeps working exactly as it does today.
     • Present                   → the manifest OWNS the capitulum list, the
       region membership and the step list (including new steps such as
       "sonus"; step validation accepts whatever the manifest declares).
     • Answer keys and XP values are NEVER in the manifest — the manifest is
       generated from client content and would leak them. They stay here.
   ============================================================ */

/* Candidate locations, first hit wins.
   __DIR__ is /server/lib, so dirname(dirname(__DIR__)) is the web root. */
function rule_manifest_paths() {
  $root = dirname(dirname(__DIR__));
  return array(
    $root . '/content/manifest.json',        // normal deploy
    dirname(__DIR__) . '/content/manifest.json' // optional server-side copy
  );
}

/* Load + validate the manifest once per request. Returns array|null. */
function rule_manifest() {
  static $cache = false;                 // false = not loaded yet, null = absent
  if ($cache !== false) { return $cache; }
  $cache = null;

  foreach (rule_manifest_paths() as $path) {
    if (!is_file($path) || !is_readable($path)) { continue; }
    $raw = file_get_contents($path);
    if ($raw === false || $raw === '') { continue; }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
      error_log('imarianus: manifest at ' . $path . ' is not valid JSON — ignoring it');
      continue;
    }
    if (!rule_manifest_is_shaped($data)) {
      error_log('imarianus: manifest at ' . $path . ' has the wrong shape — ignoring it');
      continue;
    }
    $cache = $data;
    break;
  }

  // Throttled consistency check (see rule_manifest_check).
  rule_manifest_check_throttled($cache);
  return $cache;
}

/* Minimal structural validation: tracks[] with regions[] with capitula[],
   plus a non-empty steps[]. Anything else is treated as "no manifest". */
function rule_manifest_is_shaped($m) {
  if (!isset($m['tracks']) || !is_array($m['tracks'])) { return false; }
  if (!isset($m['steps']) || !is_array($m['steps']) || count($m['steps']) === 0) { return false; }
  foreach ($m['steps'] as $s) {
    if (!is_string($s) || $s === '') { return false; }
  }
  foreach ($m['tracks'] as $t) {
    if (!is_array($t) || !isset($t['id']) || !isset($t['regions']) || !is_array($t['regions'])) {
      return false;
    }
    foreach ($t['regions'] as $r) {
      if (!is_array($r) || !isset($r['id'])) { return false; }
      if (!isset($r['capitula']) || !is_array($r['capitula'])) { return false; }
    }
  }
  return true;
}

/* ---- built-in fallbacks (what shipped before the manifest) ---- */
function rule_fables_builtin() {
  return array('f1', 'f2', 'f3', 'f4', 'f5', 'f6');
}
function rule_steps_builtin() {
  return array('verba', 'fabula', 'ludus', 'aenigmata', 'corrige', 'comple');
}

/* ordered fables (all tracks flattened; used for VALIDITY, not for ordering —
   see rule_fable_prev() for the prerequisite chain) */
function rule_fables() {
  static $out = null;
  if ($out !== null) { return $out; }
  $m = rule_manifest();
  if (!$m) { return $out = rule_fables_builtin(); }
  $out = array();
  foreach ($m['tracks'] as $track) {
    foreach ($track['regions'] as $region) {
      foreach ($region['capitula'] as $cap) { $out[] = (string) $cap; }
    }
  }
  if (count($out) === 0) { $out = rule_fables_builtin(); }
  return $out;
}

/* ordered steps within every capitulum (manifest may add e.g. "sonus") */
function rule_steps() {
  static $out = null;
  if ($out !== null) { return $out; }
  $m = rule_manifest();
  $out = $m ? array_values($m['steps']) : rule_steps_builtin();
  return $out;
}

/* XP granted on FIRST completion of each step (idempotent thereafter).
   Any step the manifest declares but that is not listed here earns the
   default; a step nobody declares earns nothing.

   PER-REGION STEP XP IS NOT EXPRESSIBLE HERE and is not a bug: this map is
   keyed by STEP NAME, globally, so 'verba' is worth the same in Regiō I and
   in Liber VIII. Several registration snippets asked for a per-region
   step value anyway — l7 and l8 asked 15, al1 and al2 asked 25 — and none of
   them could be applied. (r07-r09, l5 and l6 asked 20, which is what the
   default already is, so those were no-ops.) Where a track wanted to signal
   that its units are bigger, the FIGHT xp carries it instead: al1/al2 pay 40.
   WAVE 5 (the last content wave) repeats the request and does not change the
   answer: al3-al12 each asked 25, ten more snippets on the same 25, and
   historia l9 asked 20 (a no-op). So the WHOLE aeneis track — twelve librī —
   now wants a step value this function cannot express, and the whole track
   carries the signal in its fight xp instead (40 per liber against Historia's
   and Fabulae's 30).
   FLAGGED FOR OWNER TUNING: if the curve should really differ per track, this
   function needs a region argument and every caller needs to pass one. It is
   no longer a stray request from two regions; it is a track-wide one. */
function rule_step_xp($step) {
  $map = array(
    'verba' => 20, 'fabula' => 20, 'sonus' => 20, 'ludus' => 20,
    'aenigmata' => 20, 'corrige' => 20, 'comple' => 20
  );
  if (isset($map[$step])) { return $map[$step]; }
  return in_array($step, rule_steps(), true) ? RULE_DEFAULT_STEP_XP : 0;
}

/* is (fable,step) a real curriculum slot? */
function rule_is_valid_step($fable, $step) {
  return in_array($fable, rule_fables(), true)
      && in_array($step, rule_steps(), true);
}

/* index helpers */
function rule_fable_index($fable) {
  $f = rule_fables();
  return array_search($fable, $f, true); // int|false
}
function rule_step_index($step) {
  $s = rule_steps();
  return array_search($step, $s, true);
}

/* ------------------------------------------------------------
   The prerequisite chain, per TRACK.
   Before the manifest there was one track, so "the previous fable" was
   simply the previous entry in the global list. With three parallel tracks
   (Fabulae / Historia Sacra / Aeneis) a global list would mean a student
   could not start Historia until all 36 fables were done — wrong: the tracks
   are independent chains, and the topbar (XP, streak) is what they share.

   rule_fable_prev() therefore returns the previous capitulum WITHIN THE SAME
   TRACK, or null for a track's first capitulum. With no manifest loaded the
   single flattened list is the single track, so today's behaviour is
   bit-for-bit identical.
   ------------------------------------------------------------ */
function rule_fable_prev($fable) {
  $chain = rule_track_chain_for($fable);
  $i = array_search($fable, $chain, true);
  if ($i === false || $i === 0) { return null; }
  return $chain[$i - 1];
}

/* Ordered capitulum list of the track that contains $fable (fallback: all). */
function rule_track_chain_for($fable) {
  $m = rule_manifest();
  if (!$m) { return rule_fables(); }
  foreach ($m['tracks'] as $track) {
    $chain = array();
    foreach ($track['regions'] as $region) {
      foreach ($region['capitula'] as $cap) { $chain[] = (string) $cap; }
    }
    if (in_array($fable, $chain, true)) { return $chain; }
  }
  return rule_fables();
}

/* track id for a capitulum, '' if unknown (used by the public profile) */
function rule_track_of($fable) {
  $m = rule_manifest();
  if (!$m) { return 'fabulae'; }
  foreach ($m['tracks'] as $track) {
    foreach ($track['regions'] as $region) {
      if (in_array($fable, $region['capitula'], true)) { return (string) $track['id']; }
    }
  }
  return '';
}

/* every track id, in manifest order */
function rule_tracks() {
  $m = rule_manifest();
  if (!$m) { return array('fabulae'); }
  $out = array();
  foreach ($m['tracks'] as $track) { $out[] = (string) $track['id']; }
  return $out;
}

/* ============================================================
   Regions and their bosses
   ------------------------------------------------------------
   Built-ins carry what the manifest cannot: XP values and the quiz ANSWER
   KEY. The manifest carries membership. rule_regions() merges the two:
   manifest wins on `fables`/`track`/`boss`, built-ins win on everything
   reward-related, and a manifest region with no built-in entry gets the
   defaults (and an empty quiz, which api/boss_quiz.php reports as a
   non-passing grade rather than granting anything).
   ============================================================ */
function rule_regions_builtin() {
  return array(
    'region1' => array(
      'fables' => array('f1', 'f2', 'f3'),
      'track'  => 'fabulae',
      'boss'   => 'boss1',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: question word -> the correct vocab key the student must pick.
      // For "word -> pick the matching image", the answer IS the same word; we
      // store it explicitly so grading is independent of client display order.
      'quiz' => array(
        array('q' => 'vulpēs', 'a' => 'vulpēs'),
        array('q' => 'cāseus', 'a' => 'cāseus'),
        array('q' => 'lupus',  'a' => 'lupus'),
        array('q' => 'ūva',    'a' => 'ūva'),
        array('q' => 'aqua',   'a' => 'aqua')
      )
    ),
    /* Regiō II · Ager (content id r02). Unlike region1 this one was BORN
       with the manifest, so its built-in id IS its manifest id and it
       needs no entry in rule_region_aliases(): rule_regions() finds
       $out['r02'] already present, keeps the rewards and the answer key
       below, and takes only membership from content/manifest.json. */
    'r02' => array(
      'fables' => array('f4', 'f5', 'f6'),
      'track'  => 'fabulae',
      'boss'   => 'b_r02',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: must mirror the boss.quiz `la` values in
      // content/fabulae-r02.js. Word -> pick the image, so the answer is
      // the same word; stored explicitly so grading never depends on the
      // order the client happened to draw the options in.
      'quiz' => array(
        array('q' => 'leō',     'a' => 'leō'),
        array('q' => 'formīca', 'a' => 'formīca'),
        array('q' => 'gallīna', 'a' => 'gallīna'),
        array('q' => 'rēte',    'a' => 'rēte'),
        array('q' => 'ōvum',    'a' => 'ōvum')
      )
    ),
    /* Regiō III · Rīvus (content id r03). Born with the manifest like r02,
       so its built-in id IS its manifest id and it needs no entry in
       rule_region_aliases(). The Bōs duel is tuned identically to r01/r02
       (hp 6 / 45 s legacy, phases 22+28+20), so the rewards are the
       ordinary ones. */
    'r03' => array(
      'fables' => array('f7', 'f8', 'f9'),
      'track'  => 'fabulae',
      'boss'   => 'b_r03',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: must mirror the boss.quiz `la` values in
      // content/fabulae-r03.js. Word -> pick the image, so the answer is
      // the same word; stored explicitly so grading never depends on the
      // order the client happened to draw the options in.
      'quiz' => array(
        array('q' => 'canis',  'a' => 'canis'),
        array('q' => 'umbra',  'a' => 'umbra'),
        array('q' => 'rāna',   'a' => 'rāna'),
        array('q' => 'bōs',    'a' => 'bōs'),
        array('q' => 'cervus', 'a' => 'cervus')
      )
    ),
    /* Regiō IV · Mōns (content id r04). The Lepus boss is a RACE — its
       phases are fuga/caterva/fuga rather than caterva/clāmor/fuga — but
       the server does not care which phase types were drawn: the result
       payload is the same one every duel posts, so the reward config is
       the ordinary one. Manifest-born, so no alias entry. */
    'r04' => array(
      'fables' => array('f10', 'f11', 'f12'),
      'track'  => 'fabulae',
      'boss'   => 'b_r04',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` values in
      // content/fabulae-r04.js, same word -> image shape as r03.
      'quiz' => array(
        array('q' => 'testūdō', 'a' => 'testūdō'),
        array('q' => 'lepus',   'a' => 'lepus'),
        array('q' => 'ciconia', 'a' => 'ciconia'),
        array('q' => 'urna',    'a' => 'urna'),
        array('q' => 'haedus',  'a' => 'haedus')
      )
    ),
    /* Regiō V · Via (content id r05). THE WOLF RETURNS — CURRICULUM §1 gives
       the same Lupus the bosses of R1, R5, R9 and the R12 finale — and this
       duel is deliberately LONGER than his first: hp 8 (not the 6 r01–r04
       share) over 72 phase-seconds, the extra hit landing in clāmor. None of
       that reaches the server: a longer fight posts the same result payload,
       so the rewards are the ordinary ones. Manifest-born, so no alias. */
    'r05' => array(
      'fables' => array('f13', 'f14', 'f15'),
      'track'  => 'fabulae',
      'boss'   => 'b_r05',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` values in
      // content/fabulae-r05.js, same word -> image shape as r03/r04.
      'quiz' => array(
        array('q' => 'pāstor', 'a' => 'pāstor'),
        array('q' => 'grex',   'a' => 'grex'),
        array('q' => 'ursus',  'a' => 'ursus'),
        array('q' => 'equus',  'a' => 'equus'),
        array('q' => 'asinus', 'a' => 'asinus')
      )
    ),
    /* Regiō VI · Urbs (content id r06). The boss is the FĒLĒS of f16, not
       the wolf, so her tuning is the ordinary one (hp 6 / 70 phase-seconds,
       22+28+20) and so are her rewards. Manifest-born, so no alias. */
    'r06' => array(
      'fables' => array('f16', 'f17', 'f18'),
      'track'  => 'fabulae',
      'boss'   => 'b_r06',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` values in
      // content/fabulae-r06.js.
      'quiz' => array(
        array('q' => 'fēlēs',    'a' => 'fēlēs'),
        array('q' => 'urbs',     'a' => 'urbs'),
        array('q' => 'praesēpe', 'a' => 'praesēpe'),
        array('q' => 'hircus',   'a' => 'hircus'),
        array('q' => 'puteus',   'a' => 'puteus')
      )
    ),
    /* Regiō VII · Lītus (content id r07). The boss is Vulpēs Callida, NOT the
       wolf (CURRICULUM §1 gives Lupus R1, R5, R9 and the R12 finale), so she
       gets r06's ordinary budget — hp 6 over 70 phase-seconds, 22+28+20 — and
       the ordinary rewards. Manifest-born, so no alias entry. */
    'r07' => array(
      'fables' => array('f19', 'f20', 'f21'),
      'track'  => 'fabulae',
      'boss'   => 'b_r07',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` order in content/fabulae-r07.js.
      // `lapillus` is deliberately NOT here — at 96 px it and `vestīgium` are
      // the same picture (pale/dark marks on grass), so `urna` takes the slot.
      // The snippet records the measurement; do not "correct" this back.
      'quiz' => array(
        array('q' => 'cornīx',    'a' => 'cornīx'),
        array('q' => 'urna',      'a' => 'urna'),
        array('q' => 'vestīgium', 'a' => 'vestīgium'),
        array('q' => 'lepus',     'a' => 'lepus'),
        array('q' => 'lāna',      'a' => 'lāna')
      )
    ),
    /* Regiō VIII · Hortus (content id r08). The boss is Ventus, again not the
       wolf, so again the ordinary budget (hp 6 / 70 s, 22+28+20) and the
       ordinary rewards. Manifest-born, so no alias entry. */
    'r08' => array(
      'fables' => array('f22', 'f23', 'f24'),
      'track'  => 'fabulae',
      'boss'   => 'b_r08',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/fabulae-r08.js. `harundō` and `arbor` are
      // deliberately absent — a reed and an oak are both green things on the
      // same cream field at tile size, so `quercus` holds the f23 slot alone.
      'quiz' => array(
        array('q' => 'ventus',  'a' => 'ventus'),
        array('q' => 'sōl',     'a' => 'sōl'),
        array('q' => 'quercus', 'a' => 'quercus'),
        array('q' => 'pāvō',    'a' => 'pāvō'),
        array('q' => 'grūs',    'a' => 'grūs')
      )
    ),
    /* Regiō IX · Castra (content id r09). THE WOLF'S THIRD MEETING, so this
       mirrors r05 rather than r06/r07/r08: hp 8 over 74 phase-seconds
       (24+30+20), the extra seconds all in CLĀMOR, which is where this
       region's syntax lives. None of that reaches the server — a longer
       fight posts the same result payload. Manifest-born, so no alias. */
    'r09' => array(
      'fables' => array('f25', 'f26', 'f27'),
      'track'  => 'fabulae',
      'boss'   => 'b_r09',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/fabulae-r09.js. `grex`, `agnus`, `leō`,
      // `fēlēs` and `mūs` are all deliberately absent: at 96 px a white flock,
      // a white lamb and a white `pellis` are one picture, and a wolf, lion,
      // cat and mouse are four grey quadrupeds in profile. Measured.
      'quiz' => array(
        array('q' => 'lupus',   'a' => 'lupus'),
        array('q' => 'pellis',  'a' => 'pellis'),
        array('q' => 'quercus', 'a' => 'quercus'),
        array('q' => 'cibus',   'a' => 'cibus'),
        array('q' => 'cāseus',  'a' => 'cāseus')
      )
    ),
    /* Regiō X · Portus (content id r10). A duel at hp 8 over 78
       phase-seconds (caterva 3/26 + clamor 3/30 + fuga 2/22), four seconds
       longer than r09's. Ordinary rewards. Manifest-born, so no alias. */
    'r10' => array(
      'fables' => array('f28', 'f29', 'f30'),
      'track'  => 'fabulae',
      'boss'   => 'b_r10',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/fabulae-r10.js.
      'quiz' => array(
        array('q' => 'aquila',  'a' => 'aquila'),
        array('q' => 'nīdus',   'a' => 'nīdus'),
        array('q' => 'columba', 'a' => 'columba'),
        array('q' => 'rēte',    'a' => 'rēte'),
        array('q' => 'pellis',  'a' => 'pellis')
      )
    ),
    /* Regiō XI · Templum (content id r11). hp 9 over 80 phase-seconds
       (caterva 3/26 + clamor 4/32 + fuga 2/22). The extra hit over r10 is in
       CLĀMOR on purpose — clāmor is the phase that reads sentences, and this
       region's purpose/result/indirect-question clauses are the point of it.
       Ordinary rewards. Manifest-born, so no alias. */
    'r11' => array(
      'fables' => array('f31', 'f32', 'f33'),
      'track'  => 'fabulae',
      'boss'   => 'b_r11',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/fabulae-r11.js. `Mors` is deliberately
      // absent — the quiz is a picture test and hers is a person, the same
      // call that keeps her out of SONUS.
      'quiz' => array(
        array('q' => 'grūs',    'a' => 'grūs'),
        array('q' => 'cibus',   'a' => 'cibus'),
        array('q' => 'rāna',    'a' => 'rāna'),
        array('q' => 'templum', 'a' => 'templum'),
        array('q' => 'senex',   'a' => 'senex')
      )
    ),
    /* Regiō XII · Forum (content id r12). THE FINALE, and the only FOUR-PHASE
       boss in the product: caterva 3/22 + clamor 3/26 + fuga 2/20 + clamor
       2/22, hp 10 over 90 phase-seconds. The repeated `clamor` type is
       deliberate and is supported (boss.js buildPlan() does not deduplicate
       types, and boss-phases.js prefers a phase's own cfg.data.items over
       boss.clamor, so the two carry different item sets). The server sees the
       same result payload a three-phase duel posts, so the only thing that
       changes here is the REWARD: 40 rather than 30, because the fight is the
       finale and is half again as long. Manifest-born, so no alias. */
    'r12' => array(
      'fables' => array('f34', 'f35', 'f36'),
      'track'  => 'fabulae',
      'boss'   => 'b_r12',
      'fight_xp' => 40,             // the finale, and 50% longer than r11's
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/fabulae-r12.js. A finale WANTS a
      // track-wide quiz and cannot have one — app.js bossWords() builds its
      // pool from CUR.region.capitula only, and runBossQuiz() silently DROPS
      // an entry it cannot resolve, so a row naming an earlier region's
      // capitulum would quietly shorten the quiz. Recorded in the engine
      // backlog; the cumulative feel is built inside r12's own cards instead.
      'quiz' => array(
        array('q' => 'forum',    'a' => 'forum'),
        array('q' => 'corpus',   'a' => 'corpus'),
        array('q' => 'serpēns',  'a' => 'serpēns'),
        array('q' => 'canis',    'a' => 'canis'),
        array('q' => 'praesēpe', 'a' => 'praesēpe')
      )
    ),
    /* ---- HISTORIA SACRA -------------------------------------------------
       Liber I · Creātiō (content id l1). NO BOSS: CURRICULUM §2 gives the
       first liber of the track no probātiō, so the entry declares an empty
       boss and an EMPTY answer key. That is not an oversight: the guard in
       progress_boss_quiz() refuses an empty key with 'quiz_unavailable',
       which is the right answer for a region with no trial. The entry exists
       at all so that rule_regions() has a `track` for these five capitula
       and rule_region_of('h1') answers 'l1'. */
    'l1' => array(
      'fables' => array('h1', 'h2', 'h3', 'h4', 'h5'),
      'track'  => 'historia',
      'boss'   => '',
      'fight_xp' => 0,                 // nothing to clear, nothing to grant
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,
      'quiz' => array()                // no trial ⇒ no answer key
    ),
    /* Liber II · Dīluvium (content id l2). Its trial is a PROBĀTIŌ, not a
       duel (js/probatio.js), but the server does not care which engine drew
       it: a probatio posts the same result payload a duel does, so the
       reward config is the ordinary one. Like r02 this region was born with
       the manifest, so its built-in id IS its manifest id and it needs no
       rule_region_aliases() entry. */
    'l2' => array(
      'fables' => array('h6', 'h7', 'h8', 'h9', 'h10'),
      'track'  => 'historia',
      'boss'   => 'b_l2',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` values in
      // content/historia-l2.js, one word per capitulum. Word -> pick the
      // image, so the answer is the same word; stored explicitly so grading
      // never depends on the order the client drew the options in.
      'quiz' => array(
        array('q' => 'clāmat',   'a' => 'clāmat'),
        array('q' => 'arca',     'a' => 'arca'),
        array('q' => 'dīluvium', 'a' => 'dīluvium'),
        array('q' => 'rāmus',    'a' => 'rāmus'),
        array('q' => 'turris',   'a' => 'turris')
      )
    ),
    /* Liber III · Abraham (content id l3). A PROBĀTIŌ like l2 — one gentle
       'sententia' phase, hp 5 / 55 s, no combat — and the server sees the
       same result payload either way, so the rewards mirror l2's. SIX
       capitula but FIVE quiz questions, which is what every shipped region
       does: h15's own cards are all verbs, so h15 is represented in the
       sententia phase instead. Manifest-born, so no alias entry. */
    'l3' => array(
      'fables' => array('h11', 'h12', 'h13', 'h14', 'h15', 'h16'),
      'track'  => 'historia',
      'boss'   => 'b_l3',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` values in
      // content/historia-l3.js.
      'quiz' => array(
        array('q' => 'camēlus', 'a' => 'camēlus'),
        array('q' => 'ovis',    'a' => 'ovis'),
        array('q' => 'stēlla',  'a' => 'stēlla'),
        array('q' => 'puer',    'a' => 'puer'),
        array('q' => 'puteus',  'a' => 'puteus')
      )
    ),
    /* Liber IV · Iacob (content id l4). The track's first TWO-PHASE probātiō
       (ordina hp 3 / 30 s, then sententia hp 3 / 45 s), which again the
       server never sees: same payload, same rewards. Six capitula, five quiz
       questions — h22's five cards are all figures under one night sky and
       none makes a fair pick-the-picture prompt, so h22 lives in the
       sententia phase. Manifest-born, so no alias entry. */
    'l4' => array(
      'fables' => array('h17', 'h18', 'h19', 'h20', 'h21', 'h22'),
      'track'  => 'historia',
      'boss'   => 'b_l4',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` values in
      // content/historia-l4.js.
      'quiz' => array(
        array('q' => 'cibus',  'a' => 'cibus'),
        array('q' => 'patina', 'a' => 'patina'),
        array('q' => 'scāla',  'a' => 'scāla'),
        array('q' => 'Rachēl', 'a' => 'Rachēl'),
        array('q' => 'hircus', 'a' => 'hircus')
      )
    ),
    /* Liber V · Ioseph (content id l5). A PROBĀTIŌ with TWO SENTENTIA phases
       (SOMNIA hp 3 / 50 s, then AEGYPTUS hp 3 / 50 s) — the liber has two
       halves and each phase is one of them. Same payload as any other trial,
       so the rewards mirror l3/l4. SEVEN capitula, five quiz questions: h28
       and h29 are represented in the AEGYPTUS phase instead, because their
       cards are robed men in the same desert as three earlier ones.
       Manifest-born, so no alias entry. */
    'l5' => array(
      'fables' => array('h23', 'h24', 'h25', 'h26', 'h27', 'h28', 'h29'),
      'track'  => 'historia',
      'boss'   => 'b_l5',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` order in content/historia-l5.js.
      // The five pictures come from five different families — grain, a camel
      // caravan, a bare stone room, grapes, a throne — so no two can be
      // confused at 96 px.
      'quiz' => array(
        array('q' => 'frūmentum', 'a' => 'frūmentum'),
        array('q' => 'mercātor',  'a' => 'mercātor'),
        array('q' => 'carcer',    'a' => 'carcer'),
        array('q' => 'ūva',       'a' => 'ūva'),
        array('q' => 'Pharaō',    'a' => 'Pharaō')
      )
    ),
    /* Liber VI · Moyses (content id l6). THE TRACK'S FIRST TRĀNSITUS: two
       phases, trānsitus hp 3 / 45 s (the Red Sea corridor) then sententia
       hp 3 / 50 s. EIGHT capitula, five quiz questions — h33 IS the trānsitus
       phase and h34/h36 are in the sententia phase, so all eight are
       represented exactly once somewhere in the trial. Manifest-born, so no
       alias entry. NOTE its bossMinMs is 20000, not the track's 15000; the
       reasoning is in rule_boss_min_ms() below. */
    'l6' => array(
      'fables' => array('h30', 'h31', 'h32', 'h33', 'h34', 'h35', 'h36', 'h37'),
      'track'  => 'historia',
      'boss'   => 'b_l6',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/historia-l6.js. Five picture families —
      // a basket on the Nile, a burning bush, a locust, two stone tablets,
      // a walled city.
      'quiz' => array(
        array('q' => 'fiscella', 'a' => 'fiscella'),
        array('q' => 'rubus',    'a' => 'rubus'),
        array('q' => 'locusta',  'a' => 'locusta'),
        array('q' => 'tabula',   'a' => 'tabula'),
        array('q' => 'Ierichō',  'a' => 'Ierichō')
      )
    ),
    /* Liber VII · Iūdicēs (content id l7). A PROBĀTIŌ shaped like l4's:
       ordina hp 3 / 32 s, then sententia hp 3 / 48 s. Ordinary rewards.
       Manifest-born, so no alias entry. */
    'l7' => array(
      'fables' => array('h38', 'h39', 'h40', 'h41', 'h42'),
      'track'  => 'historia',
      'boss'   => 'b_l7',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/historia-l7.js. One word per capitulum,
      // and no two share a picture family (fleece / lion / columns / temple /
      // crowned king).
      'quiz' => array(
        array('q' => 'vellus',  'a' => 'vellus'),
        array('q' => 'leō',     'a' => 'leō'),
        array('q' => 'columna', 'a' => 'columna'),
        array('q' => 'templum', 'a' => 'templum'),
        array('q' => 'rēx',     'a' => 'rēx')
      )
    ),
    /* Liber VIII · Rēgēs (content id l8). A PROBĀTIŌ whose two phases are in
       the REVERSE order of l4's and l7's — sententia hp 3 / 50 s FIRST, then
       ordina hp 3 / 34 s — because the David half comes before the temple
       half. probatio.js reads the array order and nothing outside the content
       file cares. EIGHT capitula, five quiz questions. The last
       Old-Testament liber of the track. Manifest-born, so no alias entry. */
    'l8' => array(
      'fables' => array('h43', 'h44', 'h45', 'h46', 'h47', 'h48', 'h49', 'h50'),
      'track'  => 'historia',
      'boss'   => 'b_l8',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/historia-l8.js. FIVE OF THE EIGHT
      // capitula (h44 · h45 · h46 · h48 · h49), five picture families
      // (sling-boy · mountain robe · throne and wall · cloud-filled house ·
      // fish). No NAME is in this key — the liber's
      // `David`/`Goliath` spelling question therefore touches nothing here.
      'quiz' => array(
        array('q' => 'funda',  'a' => 'funda'),
        array('q' => 'vestis', 'a' => 'vestis'),
        array('q' => 'rēgnum', 'a' => 'rēgnum'),
        array('q' => 'nebula', 'a' => 'nebula'),
        array('q' => 'piscis', 'a' => 'piscis')
      )
    ),
    /* Liber IX · Iesus (content id l9). THE LAST LIBER OF HISTORIA SACRA:
       with it the track is 58 capitula, h1..h58, complete. A PROBĀTIŌ whose
       TWO phases are BOTH 'sententia' (hp 2 / 60 s and hp 2 / 60 s) — l5 is
       the only other all-sententia trial, and this one is gentler still.

       *** THE TUNING IS DELIBERATELY GENTLE AND IS FLAGGED FOR THE OWNER.
       Total hp 4 where every other shipped boss totals 6 or more (legacy
       single-phase fallback in the content file: hp 4 / 120 s). The
       assignment calls this trial a meditation and not an exam, and the
       numbers say so. APPROVED AS SHIPPED at integration. The house-number
       revert is hp 3 + 3 in the content file (and legacy hp 6); nothing in
       THIS file changes with it, because none of the phase numbers reach the
       server. ***

       Rewards are l7's and l8's: fight 30. Manifest-born, so no alias entry.
       ANSWER KEY: mirrors the boss.quiz `la` order in content/historia-l9.js.
       FIVE OF THE EIGHT capitula (h51 · h52 · h54 · h55 · h58) and five
       picture families — manger and straw / smoking altar / man at the river
       / ship at sea / open tomb.

       *** NO NAME OF OUR LORD AND NO WORD OF THE PASSION IS IN THIS KEY. ***
       `crux` and `crucifīgit` are vocabulary cards nowhere in the liber (the
       ruling is in content/_ledger-historia.md), so js/app.js bossWords()
       cannot resolve them and they can reach no quiz row, no sententia gap
       and no distractor. h57 is represented in the trial only by its supper,
       h58 only by the OPEN tomb. `Ioannēs` is the key's one proper name and
       its single macron is on the nominative ending (Greek -ης → long -ēs,
       Liber VIII's `Tobiās` reasoning); Iesus, Maria and Ioseph are BARE
       everywhere in the liber per LATIN-STYLE §1 and none is in this key. */
    'l9' => array(
      'fables' => array('h51', 'h52', 'h53', 'h54', 'h55', 'h56', 'h57', 'h58'),
      'track'  => 'historia',
      'boss'   => 'b_l9',
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'praesēpe',  'a' => 'praesēpe'),
        array('q' => 'tūs',       'a' => 'tūs'),
        array('q' => 'Ioannēs',   'a' => 'Ioannēs'),
        array('q' => 'nāvis',     'a' => 'nāvis'),
        array('q' => 'sepulcrum', 'a' => 'sepulcrum')
      )
    ),
    /* ---- AENEIS ---------------------------------------------------------
       THE TRACK'S FIRST TWO REGIONS. Until now { "id": "aeneis", "regions": [] }
       made Aeneis the door that opens the MOX screen; it is a real track from
       here on.

       *** THE REGION IDS ARE al1 / al2, NOT l1 / l2. *** rule_regions() writes
       $out[$id] across ALL tracks — one FLAT namespace — and 'l1'/'l2' already
       belong to Historia Sacra. An aeneis region called 'l1' would MERGE with
       Historia's Liber I: one entry, two capitula lists, wrong track. The
       content files are named for the region id (content-loader.js derives
       content/<track>-<region>.js), hence content/aeneis-al1.js.

       Both are PROBĀTIŌ librī, so their numbers mirror l2/l3 and not a duel:
       al1 is transitus hp 5 / 45 s + sententia hp 5 / 50 s; al2 is ordina
       hp 6 / 45 s + sententia hp 5 / 55 s. Both manifest-born, so neither
       needs an alias entry. */
    'al1' => array(
      'fables' => array('a1', 'a2', 'a3', 'a4'),
      'track'  => 'aeneis',
      'boss'   => 'b_al1',
      // XP sits one step above the Historia curve because an Aeneis capitulum
      // is the longest unit in the product (16-21 story pages against
      // Historia's 12-14) and the track is explicitly for prōvectī. The STEP
      // value the snippet asked for (25) is a manifest-step concern and lives
      // in rule_step_xp(), which is per-step and not per-region; it is left at
      // the shared 20 rather than forked, and the signal is carried by the
      // fight instead. FLAGGED FOR OWNER TUNING with the rest of the curve.
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors the boss.quiz `la` order in content/aeneis-al1.js.
      'quiz' => array(
        array('q' => 'nāvis',   'a' => 'nāvis'),
        array('q' => 'ventus',  'a' => 'ventus'),
        array('q' => 'cervus',  'a' => 'cervus'),
        array('q' => 'columba', 'a' => 'columba'),
        array('q' => 'templum', 'a' => 'templum')
      )
    ),
    'al2' => array(
      'fables' => array('a5', 'a6', 'a7', 'a8'),
      'track'  => 'aeneis',
      'boss'   => 'b_al2',
      'fight_xp' => 40,             // as al1
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: mirrors content/aeneis-al2.js. al2's ordina phase declares
      // categories and no `items`, so probatio.js draws from the liber's whole
      // vocabulary — nothing for this file to know about it.
      'quiz' => array(
        array('q' => 'equus',   'a' => 'equus'),
        array('q' => 'castra',  'a' => 'castra'),
        array('q' => 'serpēns', 'a' => 'serpēns'),
        array('q' => 'ignis',   'a' => 'ignis'),
        array('q' => 'penātēs', 'a' => 'penātēs')
      )
    ),
    /* al3..al12 — THE REST OF THE AENEIS, and with them the last content
       wave. The track is twelve librī, a1..a48, complete; so is the product
       (fabulae 36 + historia 58 + aeneis 48 = 142 capitula).

       EVERY ONE of them is a PROBĀTIŌ, every one is manifest-born (so none
       needs a rule_region_aliases() entry), every one pays al1's rewards
       (fight 40, quiz 10 each, ≤1 wrong of 5 passes) and every one asked for
       bossMinMs 15000, which is what rule_boss_min_ms() gives them. The one
       thing that differs liber by liber is the PHASE SHAPE, and no phase
       number reaches this file — it is recorded per region below because the
       min-ms floors are derived from it.

       The ids carry the `a` for the reason written above al1: rule_regions()
       writes $out[$id] across ALL tracks in ONE FLAT namespace, and l3..l9
       already belong to Historia Sacra. Three snippets asked explicitly
       whether anything here does PREFIX matching that would let 'al10',
       'al11' or 'al12' be captured by a rule written for 'al1': nothing does.
       rule_regions(), rule_region(), rule_region_canonical(),
       rule_region_aliases() and rule_boss_min_ms() are all exact-key array
       lookups, and the only string comparisons in this file are `===`. */
    /* Liber III · Errōrēs. transitus hp 5 / 45 s + sententia hp 5 / 55 s.
       The transitus wall is 'mountain', not 'murusAquae' — this liber's
       danger is rock. ANSWER KEY: mirrors content/aeneis-al3.js; a12 gives
       two rows because it is the liber's longest capitulum. */
    'al3' => array(
      'fables' => array('a9', 'a10', 'a11', 'a12'),
      'track'  => 'aeneis',
      'boss'   => 'b_al3',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'portus',    'a' => 'portus'),
        array('q' => 'avis',      'a' => 'avis'),
        array('q' => 'sepulcrum', 'a' => 'sepulcrum'),
        array('q' => 'Aetna',     'a' => 'Aetna'),
        array('q' => 'grex',      'a' => 'grex')
      )
    ),
    /* Liber IV · Pietās. TWO SENTENTIA phases (hp 5 / 55 s twice) — Liber IV
       is a conflict of duties, so its trial is reading twice, with no chase
       and no sort. Both phases declare their own hand-authored items.
       ANSWER KEY: mirrors content/aeneis-al4.js. */
    'al4' => array(
      'fables' => array('a13', 'a14', 'a15', 'a16'),
      'track'  => 'aeneis',
      'boss'   => 'b_al4',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'turris',    'a' => 'turris'),
        array('q' => 'canis',     'a' => 'canis'),
        array('q' => 'fāma',      'a' => 'fāma'),
        array('q' => 'Mercurius', 'a' => 'Mercurius'),
        array('q' => 'rogus',     'a' => 'rogus')
      )
    ),
    /* Liber V · Lūdī. ordina hp 6 / 45 s + sententia hp 5 / 55 s — al2's
       shape, because this is the track's other ōrdina-first liber. The
       ordina phase declares categories and NO items, so js/probatio.js draws
       from the liber's whole vocabulary and zoneOf drops what no category
       claims; exactly eight words can fall. Nothing for this file to know.
       ANSWER KEY: mirrors content/aeneis-al5.js. */
    'al5' => array(
      'fables' => array('a17', 'a18', 'a19', 'a20'),
      'track'  => 'aeneis',
      'boss'   => 'b_al5',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'praemium', 'a' => 'praemium'),
        array('q' => 'rēmus',    'a' => 'rēmus'),
        array('q' => 'pellis',   'a' => 'pellis'),
        array('q' => 'corōna',   'a' => 'corōna'),
        array('q' => 'Iuppiter', 'a' => 'Iuppiter')
      )
    ),
    /* Liber VI · Īnferī. TWO SENTENTIA phases (hp 5 / 55 s twice) — al4's
       shape. CURRICULUM §3 names this trial itself ("underworld
       riddle-sentences"), so neither phase sorts or steers: nothing in Liber
       VI hurries. Twelve hand-authored items, six per phase.
       ANSWER KEY: mirrors content/aeneis-al6.js. */
    'al6' => array(
      'fables' => array('a21', 'a22', 'a23', 'a24'),
      'track'  => 'aeneis',
      'boss'   => 'b_al6',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'Sibylla', 'a' => 'Sibylla'),
        array('q' => 'rāmus',   'a' => 'rāmus'),
        array('q' => 'Charōn',  'a' => 'Charōn'),
        array('q' => 'umbra',   'a' => 'umbra'),
        array('q' => 'Rōma',    'a' => 'Rōma')
      )
    ),
    /* Liber VII · Latium. ordina hp 6 / 45 s + sententia hp 5 / 55 s, the
       al2/al5 shape. The ordina phase declares categories and no items;
       seven of the liber's words are unclaimed ON PURPOSE (a rēx who refuses
       the war and a gate that opens it belong to neither pile), so eight
       fall. ANSWER KEY: mirrors content/aeneis-al7.js. */
    'al7' => array(
      'fables' => array('a25', 'a26', 'a27', 'a28'),
      'track'  => 'aeneis',
      'boss'   => 'b_al7',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'mēnsa',     'a' => 'mēnsa'),
        array('q' => 'lūcus',     'a' => 'lūcus'),
        array('q' => 'pastor',    'a' => 'pastor'),
        array('q' => 'mānsuētus', 'a' => 'mānsuētus'),
        array('q' => 'Camilla',   'a' => 'Camilla')
      )
    ),
    /* Liber VIII · Scūtum. ordina hp 6 / 45 s + sententia hp 5 / 55 s again.
       The ordina banner is 'RŌMA AN NŌN', 11 characters, inside al5's
       known-good 12. ANSWER KEY: mirrors content/aeneis-al8.js. */
    'al8' => array(
      'fables' => array('a29', 'a30', 'a31', 'a32'),
      'track'  => 'aeneis',
      'boss'   => 'b_al8',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'Ēvander',    'a' => 'Ēvander'),
        array('q' => 'Capitōlium', 'a' => 'Capitōlium'),
        array('q' => 'Volcānus',   'a' => 'Volcānus'),
        array('q' => 'scūtum',     'a' => 'scūtum'),
        array('q' => 'lupa',       'a' => 'lupa')
      )
    ),
    /* Liber IX · Amīcitia. TWO SENTENTIA phases (hp 5 / 55 s twice), al4's
       shape, because al4 is the track's other liber built on a death.
       *** ITS ID IS al9 AND HISTORIA'S IS l9, AND BOTH LAND IN THIS WAVE. ***
       The flat namespace held: two distinct keys, two distinct tracks.
       ANSWER KEY: mirrors content/aeneis-al9.js. */
    'al9' => array(
      'fables' => array('a33', 'a34', 'a35', 'a36'),
      'track'  => 'aeneis',
      'boss'   => 'b_al9',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'Turnus',   'a' => 'Turnus'),
        array('q' => 'amīcitia', 'a' => 'amīcitia'),
        array('q' => 'lūna',     'a' => 'lūna'),
        array('q' => 'virtūs',   'a' => 'virtūs'),
        array('q' => 'carmen',   'a' => 'carmen')
      )
    ),
    /* Liber X · Fāma. sententia hp 5 / 55 s FIRST, then ordina hp 6 / 45 s —
       the reading half first and longer, which is the liber's own shape (the
       gods talk, then the world divides). The ordina phase omits items on
       purpose. `balteus` is in this key by the al9 balteus-exclusivity
       ruling, which the wave-5 audit approves as shipped.
       ANSWER KEY: mirrors content/aeneis-al10.js. */
    'al10' => array(
      'fables' => array('a37', 'a38', 'a39', 'a40'),
      'track'  => 'aeneis',
      'boss'   => 'b_al10',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'Iuppiter', 'a' => 'Iuppiter'),
        array('q' => 'Pallās',   'a' => 'Pallās'),
        array('q' => 'balteus',  'a' => 'balteus'),
        array('q' => 'Turnus',   'a' => 'Turnus'),
        array('q' => 'Lausus',   'a' => 'Lausus')
      )
    ),
    /* Liber XI · Camilla. transitus hp 5 / 45 s FIRST, then sententia
       hp 5 / 55 s: the girl's life begins with a river crossing and ends
       with words said about her. The transitus wall is 'harundo' — reeds,
       not Historia's Red Sea — on al3's precedent; VERIFIED AT 130 px at
       integration and kept. ANSWER KEY: mirrors content/aeneis-al11.js. */
    'al11' => array(
      'fables' => array('a41', 'a42', 'a43', 'a44'),
      'track'  => 'aeneis',
      'boss'   => 'b_al11',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'indūtiae', 'a' => 'indūtiae'),
        array('q' => 'Camilla',  'a' => 'Camilla'),
        array('q' => 'īnfāns',   'a' => 'īnfāns'),
        array('q' => 'eques',    'a' => 'eques'),
        array('q' => 'soror',    'a' => 'soror')
      )
    ),
    /* *** Liber XII · Ultimum — THE LAST REGION OF THE PRODUCT. ***
       THREE SENTENTIA PHASES: hp 4 / 55 s + hp 4 / 50 s + hp 4 / 45 s,
       eighteen hand-authored items, a shortening clock. Three phases is not
       a new engine feature: js/boss.js buildPlan() loops config.phases for
       its whole length and its ROMAN table covers ten. hp 12 over 150
       phase-seconds is the biggest budget shipped, and the phase seconds are
       ceilings as they are everywhere else, so the min-ms floor does NOT move
       (unlike r12's, which moved because a fourth phase of ITEM PUMP cannot
       be outrun; three sententiae are floored by reading). No track-completion
       award is invented here — that is a product decision, and this is the
       region to hang it on. ANSWER KEY: mirrors content/aeneis-al12.js. */
    'al12' => array(
      'fables' => array('a45', 'a46', 'a47', 'a48'),
      'track'  => 'aeneis',
      'boss'   => 'b_al12',
      'fight_xp' => 40,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      'quiz' => array(
        array('q' => 'foedus',  'a' => 'foedus'),
        array('q' => 'gladius', 'a' => 'gladius'),
        array('q' => 'dubitat', 'a' => 'dubitat'),
        array('q' => 'balteus', 'a' => 'balteus'),
        array('q' => 'moenia',  'a' => 'moenia')
      )
    )
  );
}

/* ------------------------------------------------------------
   Region id aliases — the M4 renaming transition.
   The generated manifest names regions r01..r12; the shipped client and the
   rows already in boss_clears / events name the first one 'region1'. Both
   must work at once: an id the old client posts must keep grading, and an id
   the new content declares must not arrive without an answer key (a region
   with an EMPTY key would otherwise be "passed" by answering nothing).
   So a manifest region listed here INHERITS the built-in region's rewards
   and quiz key, and both ids stay valid. Delete an entry once no client and
   no stored row uses the old id.
   ------------------------------------------------------------ */
function rule_region_aliases() {
  return array(
    'r01' => 'region1'   // manifest id => built-in id it inherits from
  );
}

function rule_regions() {
  static $merged = null;
  if ($merged !== null) { return $merged; }

  $out = rule_regions_builtin();
  $aliases = rule_region_aliases();
  $m = rule_manifest();
  if ($m) {
    foreach ($m['tracks'] as $track) {
      foreach ($track['regions'] as $region) {
        $id = (string) $region['id'];
        $caps = array();
        foreach ($region['capitula'] as $cap) { $caps[] = (string) $cap; }
        if (!isset($out[$id])) {
          $out[$id] = array(
            'fables' => $caps,
            'track'  => (string) $track['id'],
            'boss'   => isset($region['boss']) ? (string) $region['boss'] : '',
            'fight_xp' => RULE_DEFAULT_FIGHT_XP,
            'quiz_xp_each' => 10,
            'quiz_pass_max_wrong' => 1,
            'quiz' => array()            // no answer key ⇒ quiz cannot be taken
          );
          // Inherit the rewards + answer key of the built-in region this one
          // is a rename of (see rule_region_aliases).
          if (isset($aliases[$id]) && isset($out[$aliases[$id]])) {
            $src = $out[$aliases[$id]];
            $out[$id]['fight_xp']            = $src['fight_xp'];
            $out[$id]['quiz_xp_each']        = $src['quiz_xp_each'];
            $out[$id]['quiz_pass_max_wrong'] = $src['quiz_pass_max_wrong'];
            $out[$id]['quiz']                = $src['quiz'];
          }
        } else {
          // Keep the built-in rewards/answer key; take membership from content.
          $out[$id]['fables'] = $caps;
          $out[$id]['track']  = (string) $track['id'];
          if (isset($region['boss'])) { $out[$id]['boss'] = (string) $region['boss']; }
        }
      }
    }
  }
  $merged = $out;
  return $merged;
}

function rule_region($regionId) {
  $r = rule_regions();
  return isset($r[$regionId]) ? $r[$regionId] : null;
}

/* THE id a region is STORED under.
   Both 'region1' and 'r01' are accepted from clients during the renaming
   transition, but they must not become two rows: boss_clears, boss_records,
   the once-only XP marker in `events` and the records board are all keyed by
   this string, and a duplicate would hand out the first-clear XP twice and
   split one child's record in two. Everything that WRITES canonicalises
   first; only validation accepts both. Existing production rows say
   'region1', so the built-in id is the canonical one. */
function rule_region_canonical($regionId) {
  $a = rule_region_aliases();
  return isset($a[$regionId]) ? $a[$regionId] : $regionId;
}

/* which region contains this capitulum? '' if none */
function rule_region_of($fable) {
  foreach (rule_regions() as $id => $r) {
    if (in_array($fable, $r['fables'], true)) { return $id; }
  }
  return '';
}

/* ============================================================
   Anti-cheat configuration
   ============================================================ */

/* Minimum plausible boss duration, per region, in milliseconds.
   A result faster than this is not a good player, it is a forged POST.
   Derive it from the phase seconds in data.js when a region gets tuned;
   the default is deliberately conservative (better to accept a suspicious
   record than to reject a real child's genuinely fast run). */
function rule_boss_min_ms($regionId) {
  $map = array(
    // region1 = the three-phase Lupus duel. The phases as CONTENT ACTUALLY
    // SHIPS them are 22 s + 28 s + 20 s (content/fabulae-r01.js), not the
    // 25/30/20 an earlier draft of this comment quoted. A phase ENDS the
    // moment its hp is dealt, so those seconds are CEILINGS, not durations:
    // three clean phases at a few seconds each is a fast child, not a
    // forgery, and 20 s was rejecting real runs. 15 s is the floor.
    'region1' => 15000,
    // r02 = the Leō duel, tuned identically to region1 (hp 6 / 45 s, the
    // same 22/28/20 phases), so the same floor applies.
    'r02' => 15000,
    // r03 = the Bōs duel, tuned identically again (hp 6 / 45 s, phases
    // 22/28/20). Listed explicitly rather than left to the default so a
    // future retune of THIS region has an obvious place to land.
    'r03' => 15000,
    // r04 = the Lepus RACE (fuga/caterva/fuga, 22/26/22). Different shape,
    // same total: hp 6 and 70 phase-seconds, all of them ceilings, so the
    // same 15 s floor is the honest one.
    'r04' => 15000,
    // r05 = the Lupus duel, SECOND meeting: hp 8 over 72 phase-seconds
    // (24/28/20), the longest fight shipped. The floor does NOT move with
    // it — a longer fight cannot be forged FASTER, and the seconds are
    // ceilings as they are everywhere else. 15 s, like every duel.
    'r05' => 15000,
    // r06 = the Fēlēs duel, back to the ordinary budget (hp 6, 22/28/20).
    'r06' => 15000,
    // l2 = the Arca PROBĀTIŌ (js/probatio.js): ONE 'ordina' phase, hp 6 /
    // 45 s. Six items have to DRIFT down and be caught, and the spawn
    // interval at regionIndex 1 is ~1.5 s, so the trial is floored by the
    // item pump rather than by the player: 20 s.
    'l2' => 20000,
    // l3 = the Prōmissa PROBĀTIŌ: ONE 'sententia' phase, hp 5 / 55 s. No
    // item pump floors this one — a sententia asks the child to READ the
    // sentence and choose, so the honest floor is the duel floor and not
    // l2's: 15 s. (Both snippets asked for exactly this.)
    'l3' => 15000,
    // l4 = the Gregēs Iacob PROBĀTIŌ, TWO phases (ordina hp 3 / 30 s, then
    // sententia hp 3 / 45 s). The ordina half has l2's item pump but only
    // three items to catch, so 15 s stays the honest floor here too.
    'l4' => 15000,
    // r07 = the Vulpēs Callida duel, r06's ordinary budget (hp 6, 22/28/20).
    'r07' => 15000,
    // r08 = the Ventus duel, the same ordinary budget again.
    'r08' => 15000,
    // r09 = the Lupus duel, THIRD meeting: hp 8 over 74 phase-seconds
    // (24/30/20). The floor does not move with the length — r05's argument,
    // unchanged: a longer fight cannot be forged FASTER, and the phase
    // seconds are ceilings.
    'r09' => 15000,
    // r10 = hp 8 over 78 phase-seconds (26/30/22). Same argument.
    'r10' => 15000,
    // r11 = hp 9 over 80 phase-seconds (26/32/22), the extra hit in clāmor.
    // Same argument again: ceilings, not durations.
    'r11' => 15000,
    // *** r12 = THE FINALE, and the one anti-cheat value in the fabulae track
    // that MOVES. FOUR phases (caterva 3/22 + clamor 3/26 + fuga 2/20 +
    // clamor 2/22), hp 10 over 90 phase-seconds against r11's 80 over three.
    // A floor tuned for a three-phase fight is the wrong floor for a
    // four-phase one: there is a fourth phase's worth of item pump and
    // sentence-reading that no player can skip, so 15 s would sit below what
    // an honest child can achieve and would stop flagging anything. 20 s, for
    // l2's reason. If a blanket 15000 is ever applied across the duels, r12
    // must be exempted. ***
    'r12' => 20000,
    // l5 = the Ioseph PROBĀTIŌ, TWO SENTENTIA phases (3/50 s + 3/50 s). No
    // ORDINA item pump anywhere in this trial, so it is floored by the
    // child's reading speed and not by a machine: l3's number for l3's
    // reason, and it holds for both phases because both are sententia.
    'l5' => 15000,
    // *** l6 = the Moyses PROBĀTIŌ and THE TRACK'S FIRST TRĀNSITUS (hp 3 /
    // 45 s, then sententia hp 3 / 50 s). 20000, NOT the track's 15000, and
    // this was an explicit ruling rather than an oversight. A sententia is
    // floored by reading; a TRĀNSITUS is floored the way l2's ORDINA is —
    // probatio.js spawns at most 3 words at a time on a 0.8-1.3 s timer, the
    // corridor narrows on a clock (~3.4-4.6 px/s), and hp 3 means THREE
    // correct catches must physically fall down the screen before the phase
    // can end. That pump cannot be outrun. ***
    'l6' => 20000,
    // l7 = the Iūdicēs PROBĀTIŌ, l4's shape (ordina 3/32 s + sententia
    // 3/48 s). The ordina half has only three items to catch, so l4's floor.
    'l7' => 15000,
    // l8 = the Rēgēs PROBĀTIŌ, l7's two phases in the reverse order
    // (sententia 3/50 s first, then ordina 3/34 s). Order does not change
    // what can be forged: the same floor.
    'l8' => 15000,
    // al1 = the track's first PROBĀTIŌ (transitus hp 5 / 45 s + sententia
    // hp 5 / 50 s). NOTE it has a trānsitus and still takes 15 s rather than
    // l6's 20 s, and the difference is real: l6's trānsitus is hp 3 inside a
    // 95 s trial, al1's is hp 5 inside a 95 s trial with a 50 s sententia
    // after it, so the whole-trial floor is already dominated by reading. The
    // snippet asked for 15000 and it is the honest number.
    'al1' => 15000,
    // al2 = ordina hp 6 / 45 s + sententia hp 5 / 55 s. Six items to catch is
    // l2's pump, but again inside a 100 s trial whose second half is reading;
    // the snippet asked for 15000 and it matches al1/l3/l4.
    'al2' => 15000,
    // l9 = the Lūx Mundī PROBĀTIŌ and THE LAST HISTORIA LIBER: two sententia
    // phases, hp 2 / 60 s each. No item pump anywhere in it, so l3's and l5's
    // argument holds — floored by a child's reading, not by a machine. The
    // GENTLE hp does not lower the floor either: a floor is a floor, not a
    // ceiling, and 15 s is still under any honest run of two sentences.
    'l9' => 15000,
    // al3..al12 = THE REST OF THE AENEIS. Every one of the ten snippets asked
    // for 15000 and every one gets it, for reasons that are al1's and al2's
    // rather than new:
    //   · the four with an ORDINA half (al5, al7, al8, and al10's second
    //     phase) have l2's six-item pump, but always inside a ~100 s trial
    //     whose other half is reading, so the pump never dominates;
    //   · the two with a TRĀNSITUS half (al3 wall 'mountain', al11 wall
    //     'harundo') are al1's case and not l6's: l6 takes 20000 because its
    //     trānsitus is hp 3 inside a 95 s trial with only a 50 s sententia
    //     after it, whereas these are hp 5 crossings followed by 55 s of
    //     sentences, so reading dominates the whole-trial floor;
    //   · the rest (al4, al6, al9, al12) are sententia-only and are floored
    //     by reading by construction.
    // al12 is the explicit non-exception: THREE phases and hp 12, the largest
    // budget in the product, and it still takes 15000. r12 moved to 20000
    // because its fourth phase was more ITEM PUMP; al12's third phase is more
    // READING, and reading cannot be outrun by a forger any more slowly than
    // it already is. If a blanket retune ever touches this map, r12 and l6/l2
    // are the entries to exempt — not al12.
    'al3'  => 15000,
    'al4'  => 15000,
    'al5'  => 15000,
    'al6'  => 15000,
    'al7'  => 15000,
    'al8'  => 15000,
    'al9'  => 15000,
    'al10' => 15000,
    'al11' => 15000,
    'al12' => 15000
  );
  // A renamed region keeps its tuning (see rule_region_aliases).
  $aliases = rule_region_aliases();
  if (!isset($map[$regionId]) && isset($aliases[$regionId])) {
    $regionId = $aliases[$regionId];
  }
  return isset($map[$regionId]) ? $map[$regionId] : RULE_BOSS_MIN_MS;
}

/* Upper bound: past this the tab was left open, not played. */
function rule_boss_max_ms($regionId) {
  return RULE_BOSS_MAX_MS;
}

/* Accuracy (0..100) implied by a boss run's mistake count.
   The rating board wants a quality number and the fight only reports
   mistakes, so this is the conversion. Linear, 5 points per mistake:
   a flawless clear rates 100, a twenty-mistake scramble rates 0.
   FLAGGED FOR OWNER TUNING along with the phase balance. */
function rule_accuracy_from_mistakes($mistakes) {
  $m = (int) $mistakes;
  if ($m < 0) { $m = 0; }
  $acc = 100 - ($m * 5);
  return $acc < 0 ? 0 : $acc;
}

/* Per-student XP ceiling per UTC day (see lib/score.php). */
function rule_daily_xp_cap() {
  return RULE_DAILY_XP_CAP;
}

/* Rate limits, reusing the login_attempts table as the counter store.
   array(max attempts, window in minutes) per bucket name. */
function rule_rate_limits() {
  return array(
    'boss'     => array('max' => 20, 'window_min' => 60),  // boss results/hour
    'nickname' => array('max' => 5,  'window_min' => 1440) // nickname changes/day
  );
}

/* ============================================================
   Gradus (level) ladder — cosmetic, derived from XP.
   Thresholds proposed in docs/DESIGN.md §7 and FLAGGED FOR OWNER TUNING.
   ============================================================ */
function rule_gradus_ladder() {
  return array(
    array('key' => 'tiro',        'min' => 0),
    array('key' => 'auditor',     'min' => 150),
    array('key' => 'lector',      'min' => 450),
    array('key' => 'grammaticus', 'min' => 1000),
    array('key' => 'rhetor',      'min' => 2000),
    array('key' => 'magister',    'min' => 3500)
  );
}

/* ============================================================
   Nickname policy
   ============================================================ */

/* 3-20 chars, ASCII letters/digits/underscore. Deliberately narrow: the
   nickname is a public URL segment (/u/<nickname>) and must not carry
   look-alike Unicode. Latin macrons live in display_name, which is private. */
function rule_nickname_is_valid($nick) {
  return (bool) preg_match('/^[A-Za-z0-9_]{3,20}$/', $nick);
}

/* Profanity-blind blacklist HOOK. Deliberately left as a plain array for the
   owner to fill (it is a classroom app; the list is a pedagogical/pastoral
   decision, not an engineering one). Matching is case-insensitive and
   substring-based, so 'admin' also blocks 'xxadminxx'. */
function rule_nickname_blacklist() {
  return array(
    // reserved / impersonation
    'admin', 'administrator', 'magister', 'magistra', 'imarianus', 'moderator',
    'root', 'system', 'null', 'undefined'
    // TODO(owner): add profanity in Latin/Spanish/English here.
  );
}

function rule_nickname_is_blacklisted($nick) {
  $lc = strtolower($nick);
  foreach (rule_nickname_blacklist() as $bad) {
    if ($bad !== '' && strpos($lc, strtolower($bad)) !== false) { return true; }
  }
  return false;
}

/* ============================================================
   Consistency check — manifest vs built-ins
   ------------------------------------------------------------
   The manifest is generated from the client content; the built-ins are what
   this file has hardcoded. A drift between them means the server is grading
   content the client no longer ships (or vice versa) — silent, and expensive
   to debug later. So we log it.

   Returns an array of human-readable problem strings (empty = consistent),
   which also makes it callable from a future health endpoint.
   ============================================================ */
function rule_manifest_check($m) {
  $problems = array();
  if (!$m) { return $problems; }   // no manifest is a valid state, not a drift

  // steps: built-ins must all survive in the manifest, or old completions
  // stored in step_completions become unvalidatable.
  $mSteps = array_values($m['steps']);
  foreach (rule_steps_builtin() as $s) {
    if (!in_array($s, $mSteps, true)) {
      $problems[] = 'step "' . $s . '" exists in lib/rules.php but not in the manifest';
    }
  }

  // capitula: same argument.
  $mFables = array();
  foreach ($m['tracks'] as $track) {
    foreach ($track['regions'] as $region) {
      foreach ($region['capitula'] as $cap) { $mFables[] = (string) $cap; }
    }
  }
  foreach (rule_fables_builtin() as $f) {
    if (!in_array($f, $mFables, true)) {
      $problems[] = 'capitulum "' . $f . '" exists in lib/rules.php but not in the manifest';
    }
  }

  // regions: a built-in region (with its answer key) that the manifest does
  // not declare is dead weight; a mismatch in membership is worse.
  $mRegions = array();
  foreach ($m['tracks'] as $track) {
    foreach ($track['regions'] as $region) {
      $caps = array();
      foreach ($region['capitula'] as $cap) { $caps[] = (string) $cap; }
      $mRegions[(string) $region['id']] = $caps;
    }
  }
  $aliasBack = array();   // built-in id => manifest id, from rule_region_aliases()
  foreach (rule_region_aliases() as $manifestId => $builtinId) {
    $aliasBack[$builtinId] = $manifestId;
  }
  foreach (rule_regions_builtin() as $id => $r) {
    // An aliased region is not a drift: it is a deliberate rename in flight.
    if (isset($aliasBack[$id]) && isset($mRegions[$aliasBack[$id]])) {
      if ($mRegions[$aliasBack[$id]] !== $r['fables']) {
        $problems[] = 'aliased region "' . $id . '"/"' . $aliasBack[$id]
          . '" membership differs: rules.php [' . implode(',', $r['fables'])
          . '] vs manifest [' . implode(',', $mRegions[$aliasBack[$id]]) . ']';
      }
      continue;
    }
    if (!isset($mRegions[$id])) {
      $problems[] = 'region "' . $id . '" (answer key present) is absent from the manifest';
    } elseif ($mRegions[$id] !== $r['fables']) {
      $problems[] = 'region "' . $id . '" membership differs: rules.php ['
        . implode(',', $r['fables']) . '] vs manifest [' . implode(',', $mRegions[$id]) . ']';
    }
  }

  // duplicate capitulum ids across tracks would break rule_track_chain_for()
  $seen = array();
  foreach ($mFables as $f) {
    if (isset($seen[$f])) { $problems[] = 'capitulum id "' . $f . '" appears twice in the manifest'; }
    $seen[$f] = true;
  }

  return $problems;
}

/* Run the check at most once an hour per host, so a permanent drift does not
   fill the error log on every single request. The marker is a zero-byte file
   in the system temp dir; if it cannot be written we simply check every time,
   which is correct but noisier. */
function rule_manifest_check_throttled($m) {
  if (!$m) { return; }
  $marker = sys_get_temp_dir() . '/imarianus_manifest_check';
  $now = time();
  if (!APP_DEBUG && is_file($marker) && ($now - (int) @filemtime($marker)) < 3600) {
    return;
  }
  @touch($marker);
  foreach (rule_manifest_check($m) as $problem) {
    error_log('imarianus manifest/rules mismatch: ' . $problem);
  }
}
