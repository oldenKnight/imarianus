/* ============================================================
   content-loader.js — CONTENT: the content pipeline (ES5)
   ------------------------------------------------------------
   Two jobs, both forced on us by the size of the curriculum
   (142 capitula × 7 steps — docs/CURRICULUM.md §4):

   1. ON-DEMAND LOADING. Content lives in content/<track>-<region>.js.
      loadRegion() injects that <script> the first time the learner
      opens the region and never again. Nothing is bundled; there is
      no build step (MASTER-PLAN standing rules).

   2. GENERATION. Only VERBA / FĀBULA / SONUS inputs are hand-authored
      (text, vocab, scene specs). AENIGMATA / CORRIGE / COMPLĒ are
      DERIVED here from the capitulum's vocab + story, unless the
      author supplies an override in `overrides`. Hand-writing ~3000
      exercise items is the single biggest risk in the plan (brief §5);
      this module is the answer to it.

   Public API
     CONTENT.registerRegion(def)            called BY content files
     CONTENT.loadRegion(track, region, cb)  cb(err, region)
     CONTENT.region(track, region)          already-loaded region or null
     CONTENT.tracks() / .regionEntries(track) / .regionEntry(t, r)
     CONTENT.capitulum(region, capId) / .capIndex(region, capId)
     CONTENT.steps(region, cap)             step id list (data, not code)
     CONTENT.aenigmata|corrige|comple|sonus(cap, region)
     CONTENT.checkComple(item, chosenWords) flexible-order validator

   Every generator is deterministic: the RNG is seeded from the
   capitulum id, so the same learner sees the same exercise on a
   retry and a bug is reproducible.
   ============================================================ */
var CONTENT = (function () {
  'use strict';

  /* key 'track/region' -> region definition object */
  var registry = {};
  /* key -> [callbacks] while its <script> is in flight */
  var pending = {};

  var manifest = (typeof CONTENT_MANIFEST !== 'undefined')
    ? CONTENT_MANIFEST
    : { version: 2, tracks: [], steps: [] };

  function key(trackId, regionId) { return trackId + '/' + regionId; }

  /* =================== manifest lookups =================== */

  function tracks() { return manifest.tracks || []; }

  function trackEntry(trackId) {
    var t = tracks(), i;
    for (i = 0; i < t.length; i++) { if (t[i].id === trackId) { return t[i]; } }
    return null;
  }
  function regionEntries(trackId) {
    var t = trackEntry(trackId);
    return (t && t.regions) ? t.regions : [];
  }
  function regionEntry(trackId, regionId) {
    var rs = regionEntries(trackId), i;
    for (i = 0; i < rs.length; i++) { if (rs[i].id === regionId) { return rs[i]; } }
    return null;
  }
  /* the first region of a track (where a door leads) or null for empty tracks */
  function firstRegionId(trackId) {
    var rs = regionEntries(trackId);
    return rs.length ? rs[0].id : null;
  }

  /* ============================================================
     TRACK NAVIGATION (NAV — the continuous board)
     ------------------------------------------------------------
     The map used to render ONE region and the app had no way to reach
     another, so a learner who beat a boss was stranded: 142 capitula
     shipped and only each track's first board was reachable. js/map.js now
     draws the WHOLE TRACK as one scrolling board, which means the client
     must be able to answer "what comes after this?" for a region whose
     content file is not (and must not have to be) in memory — twelve
     Aeneis files are a megabyte, and nobody downloads a megabyte to look
     at a map.

     Everything below is therefore a pure MANIFEST query: no content file
     is touched, no network happens, and the answers are the same before
     and after a region is loaded. Where the manifest is thin (a
     capitulum's titulus) the app enriches from the loaded region and
     falls back to the numeral, which is what the badge shows anyway.
     ============================================================ */

  /* Roman numerals, 1..3999. The board numbers capitula by their position
     in the TRACK (f4 is 'IV', a48 is 'XLVIII'), which is exactly what the
     content files author by hand — so an unloaded region can be numbered
     without being downloaded. */
  var ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'],
               [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'],
               [5, 'V'], [4, 'IV'], [1, 'I']];
  function roman(n) {
    n = Math.floor(n);
    if (!(n > 0) || n > 3999) { return String(n); }
    var out = '', i;
    for (i = 0; i < ROMAN.length; i++) {
      while (n >= ROMAN[i][0]) { out += ROMAN[i][1]; n -= ROMAN[i][0]; }
    }
    return out;
  }

  /* The region's display name. The loaded content file wins (it is the
     authority); the manifest copy is what makes a locked, never-downloaded
     region nameable on the board and in the index. */
  function regionTitulus(trackId, regionId) {
    var reg = region(trackId, regionId);
    if (reg && reg.titulus) { return reg.titulus; }
    var e = regionEntry(trackId, regionId);
    return (e && e.titulus) ? e.titulus : '';
  }

  /* The key boss progress is stored under on the server. Frozen ids: r01's
     rows say 'region1' and renaming them would lose a cleared boss. */
  function regionProgressId(trackId, regionId) {
    var reg = region(trackId, regionId);
    if (reg && reg.progressId) { return reg.progressId; }
    var e = regionEntry(trackId, regionId);
    if (!e) { return regionId; }
    return e.progressId || e.id;
  }

  function regionIndexOf(trackId, regionId) {
    var rs = regionEntries(trackId), i;
    for (i = 0; i < rs.length; i++) { if (rs[i].id === regionId) { return i; } }
    return -1;
  }

  function nextRegionId(trackId, regionId) {
    var rs = regionEntries(trackId);
    var i = regionIndexOf(trackId, regionId);
    return (i >= 0 && i + 1 < rs.length) ? rs[i + 1].id : null;
  }

  function firstCapitulumId(trackId, regionId) {
    var e = regionEntry(trackId, regionId);
    return (e && e.capitula && e.capitula.length) ? e.capitula[0] : '';
  }

  /* THE AUTO-ADVANCE. Beating a region's boss used to leave the learner on
     a summit with nowhere to go; the map now walks them onto the first
     capitulum of the next region. Returns '' at the end of a track, which
     is the signal to show the track-complete state instead. Pure: the
     caller decides whether the node is actually unlocked (it always is —
     the boss was only open because every capitulum before it was done). */
  function nextNodeAfterBoss(trackId, regionId) {
    var nxt = nextRegionId(trackId, regionId);
    return nxt ? firstCapitulumId(trackId, nxt) : '';
  }

  /* Every node of a track, in walking order: capitula then the region's
     boss, region by region. This is the spine the continuous board is
     built on AND the prerequisite chain the server enforces
     (lib/progress.php: "the previous capitulum IN THE SAME TRACK must be
     fully complete"). One list, so the two can never disagree. */
  function trackChain(trackId) {
    var rs = regionEntries(trackId), out = [], i, j, caps, capNo = 0;
    for (i = 0; i < rs.length; i++) {
      caps = rs[i].capitula || [];
      for (j = 0; j < caps.length; j++) {
        capNo++;
        out.push({ id: caps[j], kind: 'fable', track: trackId,
                   region: rs[i].id, regionIndex: i, indexInRegion: j,
                   capNumber: capNo });
      }
      if (rs[i].boss) {
        out.push({ id: rs[i].boss, kind: 'boss', track: trackId,
                   region: rs[i].id, regionIndex: i, indexInRegion: caps.length,
                   capNumber: 0 });
      }
    }
    return out;
  }

  /* Just the capitula of a track, in order — the prerequisite chain. */
  function trackCapitula(trackId) {
    var rs = regionEntries(trackId), out = [], i, j, caps;
    for (i = 0; i < rs.length; i++) {
      caps = rs[i].capitula || [];
      for (j = 0; j < caps.length; j++) { out.push(caps[j]); }
    }
    return out;
  }

  /* The capitulum that must be finished before this one, or null when it
     opens its track. MIRRORS rule_fable_prev() in server/lib/rules.php —
     if these two ever disagree the client offers a step the server then
     refuses with 409 step_locked, which is the silent-failure shape. */
  function prevCapitulumId(trackId, capId) {
    var list = trackCapitula(trackId), i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === capId) { return i > 0 ? list[i - 1] : null; }
    }
    return null;
  }

  /* Where does this node live? Accepts a capitulum id OR a boss id, and
     searches every track — S.mapNode may now name a node in any region of
     any track, so its reader cannot assume the current context. */
  function locate(nodeId) {
    var ts = tracks(), i, j, k, regs, caps;
    for (i = 0; i < ts.length; i++) {
      regs = ts[i].regions || [];
      for (j = 0; j < regs.length; j++) {
        caps = regs[j].capitula || [];
        for (k = 0; k < caps.length; k++) {
          if (caps[k] === nodeId) {
            return { track: ts[i].id, region: regs[j].id, kind: 'fable',
                     indexInRegion: k, capNumber: 0 };
          }
        }
        if (regs[j].boss === nodeId) {
          return { track: ts[i].id, region: regs[j].id, kind: 'boss',
                   indexInRegion: caps.length, capNumber: 0 };
        }
      }
    }
    return null;
  }

  /* 1-based position of a capitulum in its track — the number its badge
     shows. 0 for a boss or an unknown id. */
  function capNumber(trackId, capId) {
    var list = trackCapitula(trackId), i;
    for (i = 0; i < list.length; i++) { if (list[i] === capId) { return i + 1; } }
    return 0;
  }
  function defaultSteps() {
    return (manifest.steps && manifest.steps.length) ? manifest.steps : DATA.STEPS;
  }

  /* =================== loading =================== */

  /* content files call this at the bottom of their IIFE-free body. */
  function registerRegion(def) {
    if (!def || !def.track || !def.id) { return; }
    /* progressId: the id used for server boss rows. Region 1 historically
       shipped as 'region1' and server rows already exist under that name —
       never rename it, or a learner loses a cleared boss. */
    if (!def.progressId) { def.progressId = def.id; }
    if (!def.capitula) { def.capitula = []; }
    registry[key(def.track, def.id)] = def;
    /* if someone is waiting on this file, hand it over now */
    flush(key(def.track, def.id), null);
  }

  function flush(k, err) {
    var cbs = pending[k];
    if (!cbs) { return; }
    delete pending[k];
    var i;
    for (i = 0; i < cbs.length; i++) { cbs[i](err, registry[k] || null); }
  }

  function region(trackId, regionId) {
    return registry[key(trackId, regionId)] || null;
  }

  /* Load one region's content file exactly once. Callback style to match
     api.js (ES5, no Promises). File name is derived by convention:
     content/<track>-<region>.js — keep that convention when adding files. */
  function loadRegion(trackId, regionId, cb) {
    cb = cb || function () {};
    var k = key(trackId, regionId);
    if (registry[k]) { cb(null, registry[k]); return; }          /* already here */
    if (pending[k]) { pending[k].push(cb); return; }             /* in flight */
    if (!regionEntry(trackId, regionId)) {
      cb({ error: 'unknown_region', track: trackId, region: regionId }, null);
      return;
    }
    pending[k] = [cb];
    var s = document.createElement('script');
    s.src = 'content/' + trackId + '-' + regionId + '.js';
    s.async = false;
    s.onload = function () {
      /* registerRegion normally already flushed; if the file loaded but
         registered nothing, the file is broken — report instead of hanging. */
      if (pending[k]) { flush(k, registry[k] ? null : { error: 'no_register', src: s.src }); }
    };
    s.onerror = function () { flush(k, { error: 'load_failed', src: s.src }); };
    document.head.appendChild(s);
  }

  /* =================== capitulum helpers =================== */

  function capIndex(reg, capId) {
    var i;
    if (!reg) { return -1; }
    for (i = 0; i < reg.capitula.length; i++) {
      if (reg.capitula[i].id === capId) { return i; }
    }
    return -1;
  }
  function capitulum(reg, capId) {
    var i = capIndex(reg, capId);
    return i < 0 ? null : reg.capitula[i];
  }

  /* the step list is DATA: capitulum overrides region overrides manifest. */
  function steps(reg, cap) {
    if (cap && cap.steps) { return cap.steps; }
    if (reg && reg.steps) { return reg.steps; }
    return defaultSteps();
  }

  /* =================== small text utilities =================== */

  var MACRONS = { 'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'y',
                  'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U', 'Ȳ': 'Y' };

  function stripMacrons(t) {
    var out = '', i, c;
    for (i = 0; i < t.length; i++) { c = t.charAt(i); out += (MACRONS[c] || c); }
    return out;
  }

  /* comparison key for a word: no macrons, no punctuation, lower case.
     Used everywhere two Latin words must be compared for identity. */
  function normWord(w) {
    return stripMacrons(String(w))
      .replace(/[.,!?;:“”"«»…()]/g, '')
      .toLowerCase();
  }

  /* trailing punctuation of a token ('ambulat.' -> '.'), so a substituted
     word keeps the sentence's punctuation intact. */
  function tailPunct(w) {
    var m = String(w).match(/[.,!?;:]+$/);
    return m ? m[0] : '';
  }
  /* the token without its trailing punctuation — what a word CHIP shows.
     ('bibēbat;' as a tappable word chip looks like a typo.) */
  function bare(w) {
    return String(w).replace(/[.,!?;:]+$/, '');
  }
  /* copy the capitalisation of `model` onto `w`, so a word substituted at the
     head of a sentence is not left lower-case. */
  function matchCase(w, model) {
    var first = String(model).charAt(0);
    if (first && first === first.toUpperCase() && first !== first.toLowerCase()) {
      return String(w).charAt(0).toUpperCase() + String(w).slice(1);
    }
    return w;
  }

  function inArray(arr, v) {
    var i;
    for (i = 0; i < arr.length; i++) { if (arr[i] === v) { return true; } }
    return false;
  }

  /* deterministic RNG (FNV-1a seed + LCG). Same capitulum → same exercises. */
  function seedOf(str) {
    var h = 2166136261, i;
    for (i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h >>> 0;
  }
  function rngFrom(seed) {
    var s = (seed || 1) >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  function pick(rnd, arr) { return arr[Math.floor(rnd() * arr.length) % arr.length]; }

  /* =================== part of speech =================== */

  /* Closed class: the prepositions the curriculum uses (CURRICULUM §0 S4).
     A preposition MUST precede its noun, which is the one ordering rule
     COMPLĒ still enforces (DESIGN §4). */
  var PREPOSITIONS = ['in', 'ex', 'e', 'ab', 'a', 'cum', 'de', 'sub', 'ad',
                      'per', 'pro', 'post', 'ante', 'inter', 'trans', 'apud',
                      'sine', 'super', 'supra', 'infra', 'contra', 'circum'];
  /* irregular finite verbs the -t/-nt ending test misses */
  var VERB_EXTRA = ['est', 'sunt', 'es', 'sum', 'potest', 'possunt', 'esse',
                    'vult', 'volunt', 'fert', 'ferunt', 'it', 'eunt'];

  /* Coarse POS used ONLY to keep generated distractors in the same class
     (a verb is never offered where a noun belongs). Three buckets is enough
     for that job and needs no dictionary. Authors may override per vocab
     entry with `pars: 'nomen'|'verbum'|'adiectivum'|'praepositio'` — a
     declared part of speech always wins (see content/README.md). */
  function posOf(item) {
    /* NOTE the field is `pars` (pars ōrātiōnis), not `pos`: a capitulum
       already uses `pos` for its map POSITION, and one word meaning two
       things in the same schema is how content bugs are born. `pos` is
       still accepted on a vocab entry as an alias. */
    if (item && (item.pars || item.pos)) { return item.pars || item.pos; }
    var w = normWord(item && item.la ? item.la : item);
    if (inArray(PREPOSITIONS, w)) { return 'praepositio'; }
    if (inArray(VERB_EXTRA, w)) { return 'verbum'; }
    if (/(?:at|et|it|ant|ent|unt|iunt)$/.test(w)) { return 'verbum'; }
    return 'aliud';   /* nouns, adjectives, adverbs, particles */
  }

  /* words of a sentence, punctuation attached, as displayed */
  function tokens(sentence) {
    return String(sentence).replace(/^\s+|\s+$/g, '').split(/\s+/);
  }

  /* Story pages usable as exercise material: one plain sentence, no direct
     speech (quotes make a cloze ambiguous), a sane length, and a scene to
     show. Returns [{la, scene}]. */
  function usableLines(cap) {
    var out = [], i, p, n;
    if (!cap.story) { return out; }
    for (i = 0; i < cap.story.length; i++) {
      p = cap.story[i];
      if (!p.scene || !p.la) { continue; }
      if (/[“”"]/.test(p.la)) { continue; }            /* skip direct speech */
      /* a page may hold two short sentences; take the first complete one */
      var m = String(p.la).match(/[^.!?]+[.!?]/g);
      var sentence = m ? m[0] : p.la;
      n = tokens(sentence).length;
      if (n < 3 || n > 9) { continue; }
      out.push({ la: sentence.replace(/^\s+|\s+$/g, ''), scene: p.scene });
    }
    return out;
  }

  /* vocab entries that carry a picture (emoji or scene) */
  function visuals(cap) {
    var out = [], i, v;
    if (!cap.vocab) { return out; }
    for (i = 0; i < cap.vocab.length; i++) {
      v = cap.vocab[i];
      if (v && (v.emoji || v.scene)) { out.push(v); }
    }
    return out;
  }

  /* index the capitulum's vocab by normalised word for quick lookup */
  function vocabIndex(cap) {
    var map = {}, i;
    if (!cap.vocab) { return map; }
    for (i = 0; i < cap.vocab.length; i++) {
      map[normWord(cap.vocab[i].la)] = cap.vocab[i];
    }
    return map;
  }

  /* n distractor words of the same POS class as `word`, drawn from the
     capitulum's own vocab, never equal to the word or present in `avoid`. */
  function samePosPool(cap, word, avoid, n, rnd) {
    var cls = posOf({ la: word });
    var candidates = [], i, w;
    for (i = 0; i < (cap.vocab || []).length; i++) {
      w = cap.vocab[i].la;
      if (normWord(w) === normWord(word)) { continue; }
      if (avoid && inArray(avoid, normWord(w))) { continue; }
      if (posOf(cap.vocab[i]) !== cls) { continue; }
      candidates.push(w);
    }
    /* fall back to any other vocab word if the class pool is too thin;
       an off-class distractor is still clearly wrong in the picture. */
    if (candidates.length < n) {
      for (i = 0; i < (cap.vocab || []).length; i++) {
        w = cap.vocab[i].la;
        if (normWord(w) === normWord(word)) { continue; }
        if (avoid && inArray(avoid, normWord(w))) { continue; }
        if (!inArray(candidates, w)) { candidates.push(w); }
      }
    }
    /* deterministic shuffle-and-take */
    var out = [], guard = 0;
    while (out.length < n && candidates.length && guard < 50) {
      var c = pick(rnd, candidates);
      if (!inArray(out, c)) { out.push(c); }
      guard++;
    }
    return out;
  }

  /* =================== generators =================== */
  /* Each generator caches its result on the capitulum (cap._gen) so a step
     re-entered mid-lesson shows the same items, and so the cost is paid once. */

  function cache(cap, name, make) {
    if (!cap._gen) { cap._gen = {}; }
    if (!cap._gen[name]) { cap._gen[name] = make(); }
    return cap._gen[name];
  }

  /* --- AENIGMATA: picture↔word pairs + sentence scrambles --- */
  function genAenigmata(cap) {
    var rnd = rngFrom(seedOf(cap.id + ':aenigmata'));
    var vis = visuals(cap);
    var pairs = vis.slice(0, 6);
    var lines = usableLines(cap);
    var scrambles = [], i;
    for (i = 0; i < lines.length && scrambles.length < 4; i++) {
      scrambles.push({ la: lines[i].la, scene: lines[i].scene });
    }
    /* if the story yielded too few plain sentences, reuse the first ones */
    while (scrambles.length < Math.min(2, lines.length)) {
      scrambles.push(lines[scrambles.length % lines.length]);
    }
    if (!pairs.length) { pairs = vis; }
    /* touch rnd so the seed is used even in the trivial case (keeps the
       function honest if the shape changes later) */
    rnd();
    return { pairs: pairs, scrambles: scrambles };
  }

  /* --- CORRIGE: one word swapped for a wrong same-POS word --- */
  function genCorrige(cap) {
    var rnd = rngFrom(seedOf(cap.id + ':corrige'));
    var lines = usableLines(cap);
    var vidx = vocabIndex(cap);
    var items = [], i;
    for (i = 0; i < lines.length && items.length < 4; i++) {
      var toks = tokens(lines[i].la);
      /* candidate positions: tokens that ARE capitulum vocabulary, so we can
         build meaningful same-class distractors for them */
      var spots = [], t;
      for (t = 0; t < toks.length; t++) {
        if (vidx[normWord(toks[t])]) { spots.push(t); }
      }
      if (!spots.length) { continue; }
      var at = spots[Math.floor(rnd() * spots.length) % spots.length];
      var correct = toks[at];
      var avoid = [];
      var k;
      for (k = 0; k < toks.length; k++) { avoid.push(normWord(toks[k])); }
      /* three same-class words: one becomes the intruder in the sentence, the
         other two are the wrong fixes. The intruder is NEVER offered as a fix
         (it is the word already on screen — offering it is nonsense). */
      var wrongs = samePosPool(cap, correct, avoid, 3, rnd);
      if (wrongs.length < 3) { continue; }
      var tail = tailPunct(correct);
      /* the sentence is shown with the WRONG word in place; the learner taps
         it, then chooses the right one. Options[0] is always the truth —
         app.js shuffles the display order. */
      var shown = toks.slice();
      shown[at] = matchCase(wrongs[0], correct) + tail;
      items.push({
        words: shown,
        wrong: at,
        options: [
          correct,
          matchCase(wrongs[1], correct) + tail,
          matchCase(wrongs[2], correct) + tail
        ],
        correct: 0,
        scene: lines[i].scene
      });
    }
    return items;
  }

  /* --- COMPLĒ: cloze from the story, flexible word order --- */
  /* Two shapes are generated:
       one-blank : pick a vocab word, offer it + 2 same-class distractors
       two-blank : a preposition and its noun, which is where ORDER matters —
                   the generator emits an `adjacent` constraint so "in silvā"
                   is required but the rest of the sentence stays free. */
  function genComple(cap) {
    var rnd = rngFrom(seedOf(cap.id + ':comple'));
    var lines = usableLines(cap);
    var vidx = vocabIndex(cap);
    var items = [], i;

    for (i = 0; i < lines.length && items.length < 5; i++) {
      var toks = tokens(lines[i].la);
      var avoid = [], k;
      for (k = 0; k < toks.length; k++) { avoid.push(normWord(toks[k])); }

      /* look for PREPOSITION + the word it governs. The next token must not
         be a verb: several prepositions double as adverbs ("lupus suprā
         bibēbat"), and there the two words are NOT a phrase — emitting an
         `adjacent` constraint for them would teach a rule that is false. */
      var prepAt = -1;
      for (k = 0; k < toks.length - 1; k++) {
        if (posOf({ la: toks[k] }) === 'praepositio' &&
            posOf({ la: toks[k + 1] }) !== 'verbum') { prepAt = k; break; }
      }

      if (prepAt >= 0 && rnd() < 0.7) {
        var prep = bare(toks[prepAt]);
        var noun = bare(toks[prepAt + 1]);
        var d = samePosPool(cap, noun, avoid, 1, rnd);
        var opts = [prep, noun].concat(d);
        var text2 = toks.slice();
        text2[prepAt] = '___';
        text2[prepAt + 1] = '___' + tailPunct(toks[prepAt + 1]);
        items.push({
          text: text2.join(' '),
          options: opts,
          accept: [prep, noun],
          /* ORDER RULE: a preposition governs the word right after it. */
          constraints: { adjacent: [[prep, noun]] },
          scene: lines[i].scene
        });
        continue;
      }

      /* one-blank cloze on a vocabulary word */
      var spots = [], t;
      for (t = 0; t < toks.length; t++) {
        if (vidx[normWord(toks[t])]) { spots.push(t); }
      }
      if (!spots.length) { continue; }
      var at = spots[Math.floor(rnd() * spots.length) % spots.length];
      var word = bare(toks[at]);
      var dist = samePosPool(cap, word, avoid, 2, rnd);
      if (dist.length < 2) { continue; }
      var shown = toks.slice();
      shown[at] = '___' + tailPunct(toks[at]);
      var item = {
        text: shown.join(' '),
        /* chips carry no sentence punctuation; the blank keeps it */
        options: [word].concat(dist),
        accept: [word],
        scene: lines[i].scene
      };
      /* -que is an enclitic: it is glued to the END of a word, so a chip
         carrying it can never open the blank sequence. */
      if (/que$/.test(normWord(word)) && normWord(word).length > 4) {
        item.constraints = { notFirst: [word] };
      }
      items.push(item);
    }
    return items;
  }

  /* --- SONUS: hear a word, pick the PICTURE (never a speaker icon) --- */
  function genSonus(cap) {
    var rnd = rngFrom(seedOf(cap.id + ':sonus'));
    var vis = visuals(cap);
    var items = [], i;
    if (vis.length < 3) { return items; }
    for (i = 0; i < vis.length && items.length < 4; i++) {
      var target = vis[i];
      var others = [], j;
      for (j = 0; j < vis.length; j++) {
        if (vis[j].la !== target.la) { others.push(vis[j]); }
      }
      var opts = [target], guard = 0;
      while (opts.length < Math.min(4, vis.length) && guard < 40) {
        var c = pick(rnd, others);
        if (!inArray(opts, c)) { opts.push(c); }
        guard++;
      }
      items.push({ la: target.la, answer: target, options: opts });
    }
    return items;
  }

  /* =================== public step-data accessors =================== */
  /* Each returns the author's override when present, else the generated
     version. This is the ONE place the engine asks "what are this
     capitulum's items?", so a new track only has to fill `overrides`. */

  function aenigmata(cap) {
    if (cap.overrides && cap.overrides.aenigmata) { return cap.overrides.aenigmata; }
    return cache(cap, 'aenigmata', function () { return genAenigmata(cap); });
  }
  function corrige(cap) {
    if (cap.overrides && cap.overrides.corrige) { return cap.overrides.corrige; }
    return cache(cap, 'corrige', function () { return genCorrige(cap); });
  }
  function comple(cap) {
    var items = (cap.overrides && cap.overrides.comple)
      ? cap.overrides.comple
      : cache(cap, 'comple', function () { return genComple(cap); });
    return normalizeCompleList(items);
  }
  function sonus(cap) {
    /* SONUS is a hand-authorable step (a track may want whole sentences read
       aloud rather than single words), so it is accepted both as a top-level
       `sonus` array and inside `overrides` for symmetry with the rest. */
    if (cap.sonus) { return cap.sonus; }
    if (cap.overrides && cap.overrides.sonus) { return cap.overrides.sonus; }
    return cache(cap, 'sonus', function () { return genSonus(cap); });
  }

  /* =================== COMPLĒ validator (DESIGN §4) =================== */

  /* Legacy items were single-blank multiple choice:
       { text:'Ecce ___!', options:[...], correct:0 }
     The new model is "fill the blanks with these words, ANY valid order":
       { text, options:[chips], accept:[words], constraints:{...} }
     normalize() upgrades the old shape in place-free fashion so both work
     and no existing content had to be rewritten. */
  function normalizeComple(item) {
    if (item.accept) { return item; }
    var acc = [];
    if (typeof item.correct === 'number' && item.options) {
      acc = [item.options[item.correct]];
    }
    return {
      text: item.text,
      options: item.options,
      accept: acc,
      constraints: item.constraints || null,
      scene: item.scene
    };
  }
  function normalizeCompleList(items) {
    var out = [], i;
    for (i = 0; i < (items || []).length; i++) { out.push(normalizeComple(items[i])); }
    return out;
  }

  /* chosen = the words the learner tapped, IN TAP ORDER.
     Rule 1: the multiset of chosen words must equal `accept` — order free.
     Rule 2: declared constraints are then applied, and only those:
       before   [[a,b]]  a must come somewhere before b
       adjacent [[a,b]]  b must come immediately after a (prepositions)
       notFirst [w]      w may not open the sequence (-que enclitics)
       strict   true     the whole sequence must match `accept` exactly
     Anything not constrained is accepted, because Latin word order is
     free and teaching otherwise would be teaching a lie. */
  function checkComple(item, chosen) {
    var it = normalizeComple(item);
    var want = it.accept || [];
    if (!chosen || chosen.length !== want.length) { return false; }

    /* multiset equality on normalised words */
    var remaining = [], i, j, hit;
    for (i = 0; i < want.length; i++) { remaining.push(normWord(want[i])); }
    for (i = 0; i < chosen.length; i++) {
      hit = -1;
      for (j = 0; j < remaining.length; j++) {
        if (remaining[j] === normWord(chosen[i])) { hit = j; break; }
      }
      if (hit < 0) { return false; }
      remaining.splice(hit, 1);
    }

    var c = it.constraints;
    if (!c) { return true; }

    function idxOf(w) {
      var n = normWord(w), k;
      for (k = 0; k < chosen.length; k++) { if (normWord(chosen[k]) === n) { return k; } }
      return -1;
    }

    if (c.strict) {
      for (i = 0; i < want.length; i++) {
        if (normWord(want[i]) !== normWord(chosen[i])) { return false; }
      }
    }
    if (c.before) {
      for (i = 0; i < c.before.length; i++) {
        var a = idxOf(c.before[i][0]), b = idxOf(c.before[i][1]);
        if (a < 0 || b < 0 || a >= b) { return false; }
      }
    }
    if (c.adjacent) {
      for (i = 0; i < c.adjacent.length; i++) {
        var p = idxOf(c.adjacent[i][0]), q = idxOf(c.adjacent[i][1]);
        if (p < 0 || q < 0 || q !== p + 1) { return false; }
      }
    }
    if (c.notFirst) {
      for (i = 0; i < c.notFirst.length; i++) {
        if (idxOf(c.notFirst[i]) === 0) { return false; }
      }
    }
    return true;
  }

  return {
    /* manifest */
    manifest: function () { return manifest; },
    tracks: tracks,
    trackEntry: trackEntry,
    regionEntries: regionEntries,
    regionEntry: regionEntry,
    firstRegionId: firstRegionId,
    defaultSteps: defaultSteps,
    /* track navigation (NAV — the continuous board) */
    roman: roman,
    regionTitulus: regionTitulus,
    regionProgressId: regionProgressId,
    regionIndexOf: regionIndexOf,
    nextRegionId: nextRegionId,
    firstCapitulumId: firstCapitulumId,
    nextNodeAfterBoss: nextNodeAfterBoss,
    trackChain: trackChain,
    trackCapitula: trackCapitula,
    prevCapitulumId: prevCapitulumId,
    locate: locate,
    capNumber: capNumber,
    /* loading */
    registerRegion: registerRegion,
    loadRegion: loadRegion,
    region: region,
    /* capitula */
    capitulum: capitulum,
    capIndex: capIndex,
    steps: steps,
    /* step data (override or generated) */
    aenigmata: aenigmata,
    corrige: corrige,
    comple: comple,
    sonus: sonus,
    /* validators + utilities shared with app.js */
    checkComple: checkComple,
    normalizeComple: normalizeComple,
    stripMacrons: stripMacrons,
    normWord: normWord,
    posOf: posOf
  };
})();
