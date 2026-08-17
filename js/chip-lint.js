/* ============================================================
   chip-lint.js — CHIP: the picture-chip renderer rule + the
   distinctness linter (ES5)
   ------------------------------------------------------------
   ONE module so that the RUNTIME and the TEST can never disagree
   about what a picture option will look like. app.js asks it what
   to draw and whether a question is answerable; tests/regression.html
   sweeps every shipped capitulum through the same functions.

   Deliberately NOT part of content-loader.js: this is a rendering
   rule about art, not a content-pipeline concern, and keeping it
   separate lets the linter be loaded by a test page (or a node
   script) that has the art library but no manifest.

   Public API
     CHIP.soloActor(scene)            the crop rule (= boss.js soloActorOf)
     CHIP.actorKey(item)              t/role:pose comparison key
     CHIP.chipFingerprint(item)       what the chip will LOOK like
     CHIP.lintOptions(options)        {level, flags, prints}
     CHIP.optionsDistinct(options)    level === 'ok'
     CHIP.optionAmbiguous(opts, la)   the flag naming that word, or null
     CHIP.optionSets(cap)             every picture-choice set of a capitulum
   ============================================================ */
var CHIP = (function () {
  'use strict';

  /* vocab entries that carry a picture (emoji or scene) — the pool every
     picture-choice step draws its options from. Mirrors the private helper
     of the same name in content-loader.js; three lines, and copying them
     is what keeps this file loadable on its own. */
  function visuals(cap) {
    var out = [], i, v;
    if (!cap || !cap.vocab) { return out; }
    for (i = 0; i < cap.vocab.length; i++) {
      v = cap.vocab[i];
      if (v && (v.emoji || v.scene)) { out.push(v); }
    }
    return out;
  }

  /* =================== CLAR: picture-chip distinctness ===================

     THE COMPLAINT THIS BLOCK EXISTS FOR. A picture-choice step (the VERBA
     quiz "Quod verbum?", SONUS, the AENIGMATA picture cards) used to render
     every option as the whole 400x240 mini-scene shrunk into a ~72px square.
     A mini-scene is sky + ground + one small figure, so three options drawn
     from the same capitulum are three copies of the same garden with a
     14px difference somewhere inside them: h2's `Adam` question offered
     three identical paradise thumbnails, and l1 h1's `terra` offered three
     rectangles of grass. The distinguishing thing was on the page and
     invisible.

     Two mechanisms answer it, and both start here so the runtime and the
     test read the SAME rule:

       soloActor()       the crop rule, identical to boss.js soloActorOf():
                         a scene that is ONE registered actor and no speech
                         bubble is only staging around that actor, so the
                         chip may draw the actor alone (transparent sprite)
                         and let the chip's own face be the background.
                         Anything else keeps the raster, because there the
                         COMPOSITION is the meaning (`mare` is two fish IN
                         water; cropping one fish would lie).

       lintOptions()     the distinctness linter: fingerprints every option
                         of a set and reports the pairs a learner cannot
                         tell apart. CRITICAL = the two chips resolve to the
                         same picture (same cropped actor type, or the same
                         bg with the same actor multiset). WARN = same bg
                         with overlapping actors — ambiguous but not
                         identical. tests/regression.html fails the build on
                         CRITICAL; app.js flips a flagged VERBA question to
                         picture→word so the residual WARN cases still ask a
                         question that can be answered. */

  /* the art library's registered actor names, or null when no art is loaded
     (a non-browser host running the linter over content only). */
  function actorNameList() {
    try {
      if (typeof Scenes !== 'undefined' && Scenes && Scenes.actorNames) {
        return Scenes.actorNames();
      }
    } catch (e) { /* no art library here */ }
    return null;
  }

  /* Exactly boss.js soloActorOf(), taking the scene rather than the word so
     the option items of SONUS (which are {la, scene} literals, not vocab
     entries) go through the same door. Returns the scene item or null. */
  function soloActor(scene) {
    var sc = scene;
    if (!sc || !sc.items || sc.items.length !== 1) { return null; }
    /* a bubble is speech drawn on the STAGE, not on the actor: cropping to
       the actor would silently delete it, and for `dicit` the bubble IS the
       word. Such a scene keeps its raster. */
    if (sc.bubbles && sc.bubbles.length) { return null; }
    var it = sc.items[0];
    if (!it || !it.t) { return null; }
    var names = actorNameList();
    if (!names) { return it; }          /* no library to check against */
    var i;
    for (i = 0; i < names.length; i++) { if (names[i] === it.t) { return it; } }
    return null;
  }

  /* Keys of a scene item that only PLACE it: they move, scale or mirror the
     same artwork, so two items differing only in these are the same picture
     to a learner. Everything else an author writes on an item is passed
     straight to the actor fn and CHANGES WHAT IS DRAWN — `flame:true` lights
     Abel's altar, `ramus:true` puts the olive branch in the dove's beak,
     `onus:true` loads the donkey. Those are exactly the difference a quiz
     is asking about, so the key must carry them or the linter reports two
     genuinely different pictures as one. */
  var PLACEMENT_KEYS = { t: 1, x: 1, y: 1, s: 1, flip: 1 };

  /* One scene item as a comparison key: the actor, its role and pose, and
     every remaining variant flag in a stable order. `t` alone is the coarser
     "actor TYPE" used for the crop rule.
     `flip` is deliberately NOT in the key: a mirrored animal is the same
     silhouette, and telling two chips apart by which way the fox faces is
     not a question anyone should be asked. */
  function actorKey(it) {
    if (!it || !it.t) { return ''; }
    var extra = [], k;
    for (k in it) {
      if (!Object.prototype.hasOwnProperty.call(it, k)) { continue; }
      if (PLACEMENT_KEYS[k] || k === 'role' || k === 'pose') { continue; }
      extra.push(k + '=' + it[k]);
    }
    extra.sort();
    return it.t +
      (it.role ? '/' + it.role : '') +
      (it.pose ? ':' + it.pose : '') +
      (extra.length ? '{' + extra.join(',') + '}' : '');
  }

  /* Speech and thought bubbles are drawn ON THE STAGE, so they only survive
     into a chip that keeps its raster — but there they are the loudest thing
     in the frame. `magnus` and `parvus` are the same camel beside the same
     lamb and differ ONLY by an ⬆ or a ⬇ in a bubble; that is the lesson, and
     a fingerprint that ignored it called them the same picture. */
  function bubbleKey(sc) {
    var out = [], i;
    for (i = 0; i < ((sc && sc.bubbles) || []).length; i++) {
      out.push(String(sc.bubbles[i].text || ''));
    }
    out.sort();
    return out.join('|');
  }

  /* the actor whose silhouette dominates the thumbnail: biggest `s` wins,
     first one on ties. Reported by the linter so a flagged pair says WHICH
     shape the eye actually lands on. */
  function dominantActor(sc) {
    var best = null, bestS = -1, i, it, s;
    for (i = 0; i < ((sc && sc.items) || []).length; i++) {
      it = sc.items[i];
      if (!it || !it.t) { continue; }
      s = (typeof it.s === 'number') ? it.s : 1;
      if (s > bestS) { bestS = s; best = it; }
    }
    return best;
  }

  /* What one option will LOOK like once the chip renderer is done with it.
       kind      'crop' | 'scene' | 'emoji' | 'none'
       bg        background name (null for a crop — a crop has none)
       actors    sorted actorKey() list of everything in the scene
       types     sorted bare actor types
       solo      actorKey of the cropped actor, when kind === 'crop'
       soloType  its bare type
       dominant  actorKey of the dominant-silhouette actor            */
  function chipFingerprint(item) {
    var fp = { la: (item && item.la) || '', kind: 'none', bg: null, bubbles: '',
               actors: [], types: [], solo: null, soloType: null, dominant: null };
    if (!item) { return fp; }
    var sc = item.scene;
    if (!sc) {
      if (item.emoji) { fp.kind = 'emoji'; fp.solo = item.emoji; fp.soloType = item.emoji; }
      return fp;
    }
    var i, it;
    for (i = 0; i < (sc.items || []).length; i++) {
      it = sc.items[i];
      if (!it || !it.t) { continue; }
      fp.actors.push(actorKey(it));
      fp.types.push(it.t);
    }
    fp.actors.sort();
    fp.types.sort();
    var dom = dominantActor(sc);
    fp.dominant = dom ? actorKey(dom) : null;
    var solo = soloActor(sc);
    if (solo) {
      fp.kind = 'crop';
      fp.solo = actorKey(solo);
      fp.soloType = solo.t;
    } else {
      fp.kind = 'scene';
      fp.bg = sc.bg || 'plain';
      fp.bubbles = bubbleKey(sc);
    }
    return fp;
  }

  function sameList(a, b) {
    var i;
    if (a.length !== b.length) { return false; }
    for (i = 0; i < a.length; i++) { if (a[i] !== b[i]) { return false; } }
    return true;
  }
  function intersects(a, b) {
    var i, j;
    for (i = 0; i < a.length; i++) {
      for (j = 0; j < b.length; j++) { if (a[i] === b[j]) { return true; } }
    }
    return false;
  }
  function inList(a, v) {
    var i;
    for (i = 0; i < a.length; i++) { if (a[i] === v) { return true; } }
    return false;
  }

  /* Compare two options. Returns null when they are clearly different, else
     { level:'critical'|'warn', why:'…' }. */
  function comparePair(x, y) {
    if (x.kind === 'none' || y.kind === 'none') { return null; }
    if (x.kind === 'emoji' || y.kind === 'emoji') {
      if (x.kind === 'emoji' && y.kind === 'emoji' && x.solo === y.solo) {
        return { level: 'critical', why: 'both chips are the same emoji ' + x.solo };
      }
      return null;
    }
    if (x.kind === 'crop' && y.kind === 'crop') {
      /* SAME SPRITE = the two chips are byte-identical artwork. No learner can
         choose between them and no runtime trick can help: content must fix it. */
      if (x.solo === y.solo) {
        return { level: 'critical',
                 why: 'both chips crop to the SAME sprite "' + x.solo + '"' };
      }
      /* SAME TYPE, different pose or role — `mūs` beside `currit` (a mouse and
         a running mouse), `Sara` beside `Lot` (two robed figures). Ambiguous,
         but NOT fixable by content: a capitulum about Abraham, Sara and Lot has
         no other picture of Sara to swap in, and repainting the verb would
         delete the verb. This is exactly the residue the runtime flip to
         picture→word was designed to absorb, so it is reported, not failed. */
      if (x.soloType === y.soloType) {
        return { level: 'warn',
                 why: 'both chips crop to the same actor type "' + x.soloType +
                      '" (' + x.solo + ' vs ' + y.solo + ')' };
      }
      return null;
    }
    if (x.kind === 'scene' && y.kind === 'scene') {
      if (x.bg === y.bg && sameList(x.actors, y.actors) && x.bubbles === y.bubbles) {
        return { level: 'critical',
                 why: 'identical picture: bg "' + x.bg + '" with the same actors [' +
                      x.actors.join(', ') + ']' +
                      (x.bubbles ? ' and the same bubble ' + x.bubbles : '') };
      }
      /* SAME BACKGROUND. Two full-scene chips on one bg are two copies of the
         same sky and the same ground with a small difference somewhere inside
         — the owner's "three same-garden thumbnails" and "every option shows
         grass". Overlapping actors make it worse, so the reason says which
         case it is, but a shared bg alone is enough to call the pair weak. */
      if (x.bg === y.bg) {
        return { level: 'warn',
                 why: 'same bg "' + x.bg + '"' +
                      (intersects(x.types, y.types) ? ' AND overlapping actors' : '') +
                      ' [' + x.types.join(', ') + '] / [' + y.types.join(', ') + ']' };
      }
      return null;
    }
    /* one crop, one scene: the crop is unmistakable UNLESS the very same
       actor type is also the other scene's whole subject. */
    var crop = (x.kind === 'crop') ? x : y;
    var scn  = (x.kind === 'crop') ? y : x;
    if (inList(scn.types, crop.soloType)) {
      return { level: 'warn',
               why: 'the cropped "' + crop.soloType + '" also stands in the other option\'s scene [' +
                    scn.types.join(', ') + ']' };
    }
    return null;
  }

  /* Lint a whole option set. Returns
       { level:'ok'|'warn'|'critical', flags:[{level, a, b, why}], prints:[…] } */
  function lintOptions(options) {
    var fps = [], i, j, res;
    for (i = 0; i < (options || []).length; i++) { fps.push(chipFingerprint(options[i])); }
    var flags = [], level = 'ok';
    for (i = 0; i < fps.length; i++) {
      for (j = i + 1; j < fps.length; j++) {
        res = comparePair(fps[i], fps[j]);
        if (!res) { continue; }
        flags.push({ level: res.level, a: fps[i].la, b: fps[j].la, why: res.why });
        if (res.level === 'critical') { level = 'critical'; }
        else if (level === 'ok') { level = 'warn'; }
      }
    }
    return { level: level, flags: flags, prints: fps };
  }

  /* true when a picture-choice set is safe to show as pictures. */
  function optionsDistinct(options) {
    return lintOptions(options).level === 'ok';
  }

  /* THE FLIP TEST (DESIGN §4, CLAR). A picture-choice question is only broken
     when the ANSWER is one of a confusable pair: if two DISTRACTORS look alike
     but the answer's picture is unmistakable, the learner still has a question
     they can answer, and flipping it would cost the exercise its whole point.
     So app.js asks about the answer, not about the set. */
  function optionAmbiguous(options, la) {
    var res = lintOptions(options), i, f;
    for (i = 0; i < res.flags.length; i++) {
      f = res.flags[i];
      if (f.a === la || f.b === la) { return f; }
    }
    return null;
  }

  /* Every picture-choice option set a capitulum can put on screen, so the
     linter sweep and the runtime see the same inventory. Returns
       [{ step, item, options }]
     For the VERBA quiz and for GENERATED sonus the displayed set is drawn at
     random from a pool, so the POOL is linted: any pair in it can co-occur,
     therefore a critical pair in the pool is a critical pair on screen. */
  function optionSets(cap) {
    var out = [], i;
    var pool = visuals(cap);
    if (pool.length >= 2) {
      out.push({ step: 'verba', item: 'quiz pool', options: pool });
    }
    var son = (cap.sonus || (cap.overrides && cap.overrides.sonus)) || null;
    if (son) {
      for (i = 0; i < son.length; i++) {
        out.push({ step: 'sonus', item: son[i].la || ('#' + (i + 1)),
                   options: son[i].options || [] });
      }
    } else if (pool.length >= 3) {
      out.push({ step: 'sonus', item: 'generated pool', options: pool });
    }
    var ae = (cap.overrides && cap.overrides.aenigmata) || null;
    var pairs = ae ? (ae.pairs || []) : pool.slice(0, 6);
    if (pairs.length >= 2) {
      out.push({ step: 'aenigmata', item: 'memory pairs', options: pairs });
    }
    var lud = ludusPool(cap);
    if (lud.length >= 2) {
      out.push({ step: 'ludus', item: 'falling pool', options: lud });
    }
    return out;
  }

  /* LUDUS: the pool the fox-catcher drops.

     Every item of `capitulum.ludus.words` can be in the air at the same time as
     every other one — the game picks each spawn at random from the whole list —
     so the POOL is the option set, exactly as it is for the VERBA quiz. And the
     game gives the learner LESS to go on than a quiz does: the tiles are moving,
     they are small, there is no label (deliberately: the word is the question),
     and a wrong catch costs a heart. Two pool items that resolve to the same
     picture make the round unwinnable by knowledge.

     The fingerprint machinery is the same one the chips use, and so is the
     ranking — a `scene` always wins over an `emoji` on the same item in
     js/game.js exactly as it does in visualFor, which is why chipFingerprint
     can be reused unchanged. */
  function ludusPool(cap) {
    var lud = cap && cap.ludus;
    var words = (lud && lud.words) || [];
    var out = [], i;
    for (i = 0; i < words.length; i++) {
      if (words[i] && (words[i].emoji || words[i].scene)) { out.push(words[i]); }
    }
    return out;
  }

  /* the whole-product LUDUS sweep, in one call so the regression page and any
     future authoring tool ask the identical question. Returns
       { capitula, pools, critical, warn, flags:[{cap, level, a, b, why}] } */
  function lintLudus(capList) {
    var res = { capitula: 0, pools: 0, critical: 0, warn: 0, flags: [] };
    var i, j, cap, pool, lint, f;
    for (i = 0; i < (capList || []).length; i++) {
      cap = capList[i];
      if (!cap) { continue; }
      res.capitula++;
      pool = ludusPool(cap);
      if (pool.length < 2) { continue; }
      res.pools++;
      lint = lintOptions(pool);
      for (j = 0; j < lint.flags.length; j++) {
        f = lint.flags[j];
        if (f.level === 'critical') { res.critical++; } else { res.warn++; }
        res.flags.push({ cap: cap.id || '?', level: f.level, a: f.a, b: f.b, why: f.why });
      }
    }
    return res;
  }

  /* ============================================================
     GAP: the REGION-WIDE pools

     THE HOLE THIS BLOCK CLOSES. Every sweep above walks ONE capitulum at a
     time, because every screen above is one capitulum's screen. The BOSS is
     not. app.js bossWords() unions the vocabulary of the WHOLE region — every
     capitulum, deduplicated by `la` — and hands that one list to the engine as
     env.words, from which

       caterva   spawns its falling tiles (any word, any frame)
       fuga      spawns its counter-word tiles
       clamor    draws the distractors for its gapped sentences
       ordina / transitus / sententia   (js/probatio.js, same env.words)
       the boss quiz   picks two distractors per question (js/app.js ask())

     all draw. So two look-alike words from DIFFERENT capitula of one region
     never met on a capitulum screen and could not be flagged — and then met,
     unswept, in the air of the boss arena, where there is no picture→word
     flip to fall back on and a wrong catch costs a heart.

     The machinery is the machinery: same fingerprints, same comparePair, same
     CRITICAL/WARN semantics. Only the POOL is new.

     THE DEDUPE IS PART OF THE RULE, not an optimisation. bossWords() keeps the
     FIRST entry for a given `la` and drops later ones, so two capitula that
     both teach `agnus` over different art put exactly one of them in the
     arena. A sweep that skipped the dedupe would report a critical pair that
     can never co-occur — and, worse, would go on reporting it after the
     content was "fixed".
     ============================================================ */

  /* the region-wide boss pool — exactly app.js bossWords(). */
  function regionPool(region) {
    var out = [], seen = {}, caps = (region && region.capitula) || [];
    var i, j, vocab, v;
    for (i = 0; i < caps.length; i++) {
      vocab = (caps[i] && caps[i].vocab) || [];
      for (j = 0; j < vocab.length; j++) {
        v = vocab[j];
        if (!v || !(v.emoji || v.scene)) { continue; }
        if (Object.prototype.hasOwnProperty.call(seen, v.la)) { continue; }
        seen[v.la] = true;
        out.push(v);
      }
    }
    return out;
  }

  /* Every REGION-level option set, so the sweep and the runtime see the same
     inventory. Returns [{ step, item, options }] in the shape optionSets()
     uses, one row per genuinely distinct pool.

     The boss quiz gets its own row ONLY when its option universe differs from
     the arena's. Today it cannot: ask() picks its two distractors from the
     same bossWords() list, so the quiz's co-occurrence set IS the pool and a
     second identical row would double every flag. The row is emitted anyway
     when a quiz names a word the pool does not carry — that word is dropped by
     findWord() at runtime, and a sweep that silently agreed would hide it. */
  function regionSets(region) {
    var out = [], pool = regionPool(region), i;
    if (pool.length >= 2) {
      out.push({ step: 'boss', item: 'region pool', options: pool });
    }
    /* the quiz's own resolved questions, for the diagnostic above */
    var quiz = (region && region.boss && region.boss.quiz) || [];
    var missing = [];
    for (i = 0; i < quiz.length; i++) {
      if (!quiz[i] || !quiz[i].la) { continue; }
      if (!inPool(pool, quiz[i].la)) { missing.push(quiz[i].la); }
    }
    if (missing.length) {
      out.push({ step: 'quiz', item: 'unresolved: ' + missing.join(', '), options: [] });
    }
    return out;
  }

  function inPool(pool, la) {
    var i;
    for (i = 0; i < pool.length; i++) { if (pool[i].la === la) { return true; } }
    return false;
  }

  /* the whole-product REGION sweep, in one call so the regression page and any
     future authoring tool ask the identical question. `regionList` is a list of
     region definitions (what CONTENT.region() returns), each optionally
     carrying an `id` used only to name a flag. Returns
       { regions, pools, words, critical, warn, unresolved,
         flags:[{region, set, level, a, b, why}] } */
  function lintRegions(regionList) {
    var res = { regions: 0, pools: 0, words: 0, critical: 0, warn: 0,
                unresolved: [], flags: [] };
    var i, s, j, reg, name, sets, lint, f;
    for (i = 0; i < (regionList || []).length; i++) {
      reg = regionList[i];
      if (!reg) { continue; }
      res.regions++;
      name = reg.id || reg.progressId || ('#' + (i + 1));
      sets = regionSets(reg);
      for (s = 0; s < sets.length; s++) {
        if (sets[s].step === 'quiz') {
          res.unresolved.push(name + ' ' + sets[s].item);
          continue;
        }
        res.pools++;
        res.words += sets[s].options.length;
        lint = lintOptions(sets[s].options);
        for (j = 0; j < lint.flags.length; j++) {
          f = lint.flags[j];
          if (f.level === 'critical') { res.critical++; } else { res.warn++; }
          res.flags.push({ region: name, set: sets[s].step, level: f.level,
                           a: f.a, b: f.b, why: f.why });
        }
      }
    }
    return res;
  }

  return {
    soloActor: soloActor,
    actorKey: actorKey,
    chipFingerprint: chipFingerprint,
    lintOptions: lintOptions,
    optionsDistinct: optionsDistinct,
    optionAmbiguous: optionAmbiguous,
    optionSets: optionSets,
    visuals: visuals,
    /* LUDUS: the fox-catcher's falling pool */
    ludusPool: ludusPool,
    lintLudus: lintLudus,
    /* GAP: the boss arena's region-wide pool */
    regionPool: regionPool,
    regionSets: regionSets,
    lintRegions: lintRegions
  };
})();
