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
  return array('f1', 'f2', 'f3');
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
   default; a step nobody declares earns nothing. */
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
    // region1 = the three-phase Lupus duel (25 s + 30 s + 20 s of phases);
    // even a perfect run cannot finish the three phases under ~20 s.
    'region1' => 20000
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
