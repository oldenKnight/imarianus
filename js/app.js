/* ============================================================
   app.js — UI router + gamification + exercise engines (ES5)
   Screens: landing (logged out) → three doors → map → capitulum
            → step screens.
   Steps per capitulum come from the CONTENT pipeline as DATA
   (default: verba, fabula, sonus, ludus, aenigmata, corrige,
   comple). XP +10 per correct, +20 step bonus. 5 hearts; at 0
   the learner restores them by reviewing vocabulary (never a
   paywall, always more input — that is the pedagogy).

   M4 note: content no longer lives in a global DATA.fables. The
   app holds a CURRENT CONTEXT (track + region) whose content file
   was injected on demand by content-loader.js. Every former
   `DATA.fables[fi]` is now `capAt(fi)` inside that context.
   ============================================================ */
(function () {
  'use strict';

  var S;                 /* state (Storage) */
  var app;               /* #app container */
  var topbarShowBack = false; /* whether topbar currently shows the back arrow */
  var UI = DATA.UI;
  var ICONS = DATA.STEP_ICONS;

  /* ---- current content context ----
     Which track/region the learner is inside. Set by openTrack()/openRegion()
     once content-loader has the region object in memory. Everything below
     reads capitula through caps()/capAt() so a second track is config, not a
     rewrite. */
  var CUR = { trackId: null, regionId: null, region: null };

  function caps() { return (CUR.region && CUR.region.capitula) ? CUR.region.capitula : []; }
  function capAt(fi) { return caps()[fi]; }
  /* the step list of one capitulum — data, not code (DESIGN §4) */
  function stepsOf(fi) { return CONTENT.steps(CUR.region, capAt(fi)); }
  /* the region key used for boss progress rows on the server (frozen ids) */
  function regionProgressId() {
    return CUR.region ? (CUR.region.progressId || CUR.region.id) : '';
  }

  /* =================== utils =================== */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) {
    var list = (root || document).querySelectorAll(sel);
    return Array.prototype.slice.call(list);
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function shuffle(arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function nowMs() {
    return (window.performance && window.performance.now)
      ? window.performance.now() : new Date().getTime();
  }
  function todayStr() {
    var d = new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  }
  function yesterdayStr() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  }

  /* =================== state ops =================== */

  function save() { Storage.save(S); }

  function addXP(n) {
    S.xp += n;
    save();
    renderTopbar();
  }

  function loseHeart() {
    if (S.hearts > 0) { S.hearts--; }
    save();
    renderTopbar();
    if (S.hearts <= 0) { return false; }
    return true;
  }

  function touchStreak() {
    var t = todayStr();
    if (S.lastDay === t) { return; }
    if (S.lastDay === yesterdayStr()) { S.streak++; } else { S.streak = 1; }
    S.lastDay = t;
    save();
  }

  function completeStep(fid, step) {
    if (!S.completed[fid]) { S.completed[fid] = {}; }
    var first = !S.completed[fid][step];
    S.completed[fid][step] = true;
    touchStreak();
    save();
    return first;
  }

  /* LOCAL-ONLY completions.
     A step the server does not know yet (today: 'sonus', until the server's
     manifest loader ships in parallel) cannot live in S.completed, because
     Storage.reconcile() replaces `completed` wholesale with the server
     snapshot and the mark would vanish on the next reload — re-locking the
     next step. reconcile() only touches a fixed set of keys, so an extra key
     on S survives it and still gets written to the offline cache. */
  function markLocalStep(fid, step) {
    if (!S.localSteps) { S.localSteps = {}; }
    if (!S.localSteps[fid]) { S.localSteps[fid] = {}; }
    S.localSteps[fid][step] = true;
    save();
  }
  function isLocalStep(fid, step) {
    return !!(S.localSteps && S.localSteps[fid] && S.localSteps[fid][step]);
  }

  function isStepDone(fid, step) {
    if (S.completed[fid] && S.completed[fid][step]) { return true; }
    return isLocalStep(fid, step);
  }
  function fableDone(fi) {
    var f = capAt(fi), st = stepsOf(fi), i;
    if (!f) { return false; }
    for (i = 0; i < st.length; i++) {
      if (!isStepDone(f.id, st[i])) { return false; }
    }
    return true;
  }
  /* ---- CROSS-REGION PROGRESSION (NAV) ----
     The board is one continuous track now, so "is this capitulum open?" can
     no longer be answered inside the current region. The rule below is the
     SERVER'S rule, restated: lib/progress.php unlocks a step when "the
     previous capitulum IN THE SAME TRACK is fully complete"
     (rule_fable_prev), and it enforces it with a 409. A client rule that
     said anything else would offer a lesson the server then refuses —
     which fails silently, as a locked door that looks open always does.

     Note what the server does NOT require: clearing a region's BOSS is not
     a prerequisite for the next region. Finishing the last capitulum is.
     (Historia's liber I has no boss at all, so it could not be otherwise.)
     The boss is still the ceremony, and beating it walks the learner
     forward — see advanceAfterBoss() — but it never bars the road. */

  /* the step list of a capitulum named by ID, in any region, loaded or not.
     CONTENT.steps() falls back to the manifest's default list when the
     region is not in memory, which is the right answer: no shipped
     capitulum overrides its steps. */
  function stepsForCap(capId) {
    var loc = CONTENT.locate ? CONTENT.locate(capId) : null;
    var reg = loc ? CONTENT.region(loc.track, loc.region) : null;
    var cap = reg ? CONTENT.capitulum(reg, capId) : null;
    return CONTENT.steps(reg, cap) || [];
  }
  function capDoneById(capId) {
    var st = stepsForCap(capId), i;
    if (!st.length) { return false; }
    for (i = 0; i < st.length; i++) {
      if (!isStepDone(capId, st[i])) { return false; }
    }
    return true;
  }
  function capUnlockedById(capId) {
    var loc = CONTENT.locate ? CONTENT.locate(capId) : null;
    /* no manifest (a bare-files deploy): fall back to the old rule, where
       the region IS the track and its first capitulum is always open */
    if (!loc) { return true; }
    var prev = CONTENT.prevCapitulumId(loc.track, capId);
    return (prev === null) ? true : capDoneById(prev);
  }
  /* every capitulum of a region finished — the boss's own gate, server-side
     (progress_boss_fight) and here */
  function regionCapsDoneIn(trackId, regionId) {
    var e = CONTENT.regionEntry(trackId, regionId);
    var caps = (e && e.capitula) ? e.capitula : [], i;
    if (!caps.length) { return false; }
    for (i = 0; i < caps.length; i++) { if (!capDoneById(caps[i])) { return false; } }
    return true;
  }
  function bossClearedIn(trackId, regionId) {
    var e = CONTENT.regionEntry(trackId, regionId);
    if (!e || !e.boss) { return false; }
    var b = S.bosses[CONTENT.regionProgressId(trackId, regionId)];
    return !!(b && b.fight && b.quiz);
  }

  function fableUnlocked(fi) {
    if (fi > 0) { return fableDone(fi - 1); }
    var f = capAt(0);
    return f ? capUnlockedById(f.id) : false;
  }
  function stepUnlocked(fi, si) {
    if (!fableUnlocked(fi)) { return false; }
    if (si === 0) { return true; }
    var st = stepsOf(fi);
    return isStepDone(capAt(fi).id, st[si - 1]);
  }

  /* =================== chrome =================== */

  /* renders the small visual for a vocab/aenigmata item: either a compact
     SVG scene (preferred when available) or the legacy emoji glyph. Used by
     verba check, refill, and aenigmata memory so the new scene-based vocab
     (silva, vōx, pulcher, rīvus) flows through every exercise. */
  /* ---------- CLAR: the ONE picture-chip renderer ----------

     THE OWNER'S COMPLAINT. Every picture option used to be the item's whole
     400x240 mini-scene squeezed into a ~72px square. A mini-scene is sky,
     ground, and the thing itself standing somewhere on it, so three options
     from one capitulum were three copies of the same garden with a 14px
     difference buried inside them: the `Adam` question showed three identical
     paradise thumbnails, and `terra` showed three rectangles of grass.

     THE RULE (identical to boss.js soloActorOf/tileImage, and shared with
     tests/regression.html through js/chip-lint.js): when a scene resolves to
     ONE registered actor and carries no speech bubble, the background is only
     staging and the actor is the whole meaning — so the chip draws the ACTOR
     ALONE, as a tight transparent sprite, and the chip's own face is the
     background it needed. Anything else — two or more actors, a bubble, an
     actor the art library does not have — still draws the scene raster,
     because there the COMPOSITION is the meaning (`mare` is two fish IN
     water; cropping one fish would lie).

     Used by the VERBA quick check, SONUS, the AENIGMATA picture cards and the
     boss quiz, so all four look like one game and all four improve together. */
  function visualFor(item) {
    if (item && item.scene) {
      var solo = (typeof CHIP !== 'undefined' && CHIP.soloActor)
        ? CHIP.soloActor(item.scene) : null;
      if (solo) {
        return '<span class="scn-thumb crop">' +
          Scenes.sprite(solo.t,
            { pose: solo.pose, role: solo.role, flip: solo.flip }) +
          '</span>';
      }
      return '<span class="scn-thumb">' + Scenes.render(item.scene) + '</span>';
    }
    return (item && item.emoji) || '';
  }

  /* same item is also used to decide whether to include it in pools that
     historically were emoji-gated. Treats scenes as first-class visuals. */
  function hasVisual(item) {
    return !!(item && (item.emoji || item.scene));
  }

  function renderTopbar(showBack) {
    var bar = $('#topbar');
    if (!bar) { return; }
    /* if caller passes an explicit boolean, remember it; otherwise reuse last
       value so addXP / loseHeart mid-step do not erase the back button. */
    if (showBack === true || showBack === false) {
      topbarShowBack = showBack;
    }
    /* Hearts in two forms, one hidden by CSS at a time (see styles.css):
       the full row of glyphs when there is room, and a compact "❤️ 4/5"
       under ~420px, where five emoji plus the other chips no longer fit on
       one line and the bar wrapped to two rows. */
    var hearts = '';
    var i;
    for (i = 0; i < S.maxHearts; i++) {
      hearts += (i < S.hearts) ? '❤️' : '🖤';
    }
    var heartsChip = '<span class="chip stat hearts">' +
      '<span class="hearts-full">' + hearts + '</span>' +
      '<span class="hearts-short">❤️ ' + S.hearts + '/' + S.maxHearts + '</span>' +
      '</span>';
    var backChip = topbarShowBack
      ? '<button class="chip nav-back" type="button" aria-label="redī">←</button>'
      : '';
    bar.innerHTML =
      backChip +
      '<button class="chip nav-home" type="button" aria-label="' + UI.domus + '">🏠</button>' +
      '<button class="chip nav-map" type="button" aria-label="' + DATA.MAP_UI.provincia + '">🗺️</button>' +
      '<span class="chip stat">🔥 ' + S.streak + '</span>' +
      heartsChip +
      '<span class="chip stat">⭐ ' + S.xp + '</span>' +
      '<button class="chip nav-ordo" type="button" aria-label="' + UI.ordo + '">🏆</button>';
    $('.nav-home', bar).addEventListener('click', function () { stopAllGames(); showDoors(); });
    $('.nav-map', bar).addEventListener('click', function () { stopAllGames(); showMap(); });
    $('.nav-ordo', bar).addEventListener('click', function () { stopAllGames(); showOrdo(); });
    if (topbarShowBack) {
      $('.nav-back', bar).addEventListener('click', function () { stopAllGames(); showMap(); });
    }
  }

  /* stop whichever canvas game might be running before navigating away */
  function stopAllGames() {
    if (window.Game && Game.stop) { Game.stop(); }
    if (window.Boss && Boss.stop) { Boss.stop(); }
    /* the probatio engine is a SECOND engine instance with its own rAF id, so
       stopping the boss does not stop it (M3). */
    if (window.Probatio && Probatio.stop) { Probatio.stop(); }
  }

  /* Timers a screen owns (the fabula autoplay clock). Leaving the screen must
     kill them, or a page turn fires after the learner has navigated away. */
  var screenTimers = [];
  function registerTimer(id) { screenTimers.push(id); }
  function clearScreenTimers() {
    var i;
    for (i = 0; i < screenTimers.length; i++) { window.clearInterval(screenTimers[i]); }
    screenTimers = [];
  }

  function setScreen(html, cls) {
    /* every navigation passes through here, so this is the one place that has
       to stop the previous screen's clock and its voice */
    clearScreenTimers();
    Tts.stop();
    app.className = 'screen ' + (cls || '');
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  /* Does the learner want the voice on? Kept on S (so it survives
     Storage.reconcile, which only overwrites server-owned keys) and defaults
     to ON — hearing the language is the point of the method. */
  function ttsWanted() {
    if (!Tts.available()) { return false; }
    return S.ttsOff !== true;
  }
  function setTtsWanted(on) { S.ttsOff = !on; save(); }

  function toast(ok, text) {
    var t = document.createElement('aside');
    t.className = 'toast ' + (ok ? 'ok' : 'bad');
    t.textContent = text || (ok ? UI.recte : UI.minime);
    document.body.appendChild(t);
    window.setTimeout(function () {
      t.className += ' show';
    }, 10);
    window.setTimeout(function () {
      if (t.parentNode) { t.parentNode.removeChild(t); }
    }, 1100);
  }

  /* =================== track art (DESIGN §2) ===================
     Fabulae uses the existing fox mascot from scenes.js. The ark and the
     ship have no actors yet (they arrive with the M2 art subsystem), so
     they are drawn here from primitives — deliberately simple, flat and in
     the fresco palette, and easy to swap for real actors later: replace the
     body of artArca()/artNavis() and every door and hero band follows. */

  var ART = {
    wood: '#7a4a26', woodDk: '#5a3419', woodLt: '#9a6238',
    gold: '#e0a93e', goldDk: '#a87a24',
    cream: '#f3e6d0', ink: '#3a2417',
    sail: '#f0dcb4', sea: '#5d8db3', seaDk: '#3f6e93'
  };

  /* Noah's ark: hull + deckhouse + dove. Placeholder for actors-props.js. */
  function artArca(w) {
    var s = '<svg viewBox="0 0 160 120" width="' + w + '" height="' + Math.round(w * 0.75) +
      '" role="img" aria-label="arca">';
    s += '<path d="M14,62 h132 l-16,34 a10,10 0 0 1 -8,5 H38 a10,10 0 0 1 -8,-5 Z" fill="' + ART.wood + '"/>';
    s += '<path d="M14,62 h132 l-4,9 H18 Z" fill="' + ART.woodDk + '"/>';
    s += '<rect x="44" y="30" width="72" height="32" rx="4" fill="' + ART.woodLt + '"/>';
    s += '<path d="M38,30 h84 l-10,-14 H48 Z" fill="' + ART.goldDk + '"/>';
    s += '<rect x="56" y="40" width="14" height="14" rx="2" fill="' + ART.ink + '" opacity="0.55"/>';
    s += '<rect x="90" y="40" width="14" height="14" rx="2" fill="' + ART.ink + '" opacity="0.55"/>';
    /* dove with an olive twig */
    s += '<g transform="translate(120,18)">' +
         '<ellipse cx="0" cy="0" rx="9" ry="6" fill="' + ART.cream + '"/>' +
         '<path d="M-2,-2 q7,-8 12,-2 q-6,4 -12,2 Z" fill="#ffffff"/>' +
         '<circle cx="8" cy="-3" r="3.4" fill="' + ART.cream + '"/>' +
         '<path d="M11,-3 l5,1 l-5,1 Z" fill="' + ART.gold + '"/>' +
         '<path d="M-9,1 l-8,3" stroke="#6f8f3f" stroke-width="2" stroke-linecap="round"/>' +
         '</g>';
    s += '</svg>';
    return s;
  }

  /* Aeneas' ship: hull, mast, square sail, two waves. */
  function artNavis(w) {
    var s = '<svg viewBox="0 0 160 120" width="' + w + '" height="' + Math.round(w * 0.75) +
      '" role="img" aria-label="nāvis">';
    s += '<path d="M18,74 h124 l-14,22 H32 Z" fill="' + ART.wood + '"/>';
    s += '<path d="M18,74 h124 l-3,6 H21 Z" fill="' + ART.woodDk + '"/>';
    s += '<path d="M140,74 q14,-10 8,-22 q-10,8 -14,18 Z" fill="' + ART.woodLt + '"/>';
    s += '<rect x="76" y="14" width="5" height="60" rx="2" fill="' + ART.woodDk + '"/>';
    s += '<path d="M78,20 h44 l-8,22 h-36 Z" fill="' + ART.sail + '"/>';
    s += '<path d="M78,20 h-40 l8,22 h32 Z" fill="' + ART.cream + '"/>';
    s += '<path d="M60,26 h56" stroke="' + ART.goldDk + '" stroke-width="2" opacity="0.55"/>';
    s += '<path d="M6,102 q12,-7 24,0 q12,7 24,0 q12,-7 24,0 q12,7 24,0 q12,-7 24,0" ' +
         'stroke="' + ART.sea + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    s += '<path d="M6,112 q12,-7 24,0 q12,7 24,0 q12,-7 24,0 q12,7 24,0 q12,-7 24,0" ' +
         'stroke="' + ART.seaDk + '" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>';
    s += '</svg>';
    return s;
  }

  /* Is this actor registered in the scene library? The art subsystem (M2)
     registers 'ark' and 'ship' from js/actors-props.js; until that file is
     present the inline placeholders below stand in, and the moment it loads
     the doors and the hero band pick up the real artwork with no other
     change. Never assume it is there. */
  function hasActor(name) {
    if (!window.Scenes || !Scenes.actorNames || !Scenes.sprite) { return false; }
    var names = Scenes.actorNames() || [];
    var i;
    for (i = 0; i < names.length; i++) { if (names[i] === name) { return true; } }
    return false;
  }

  /* The hero triptych wants the WHOLE animal, not the mascot head the doors
     use, so it asks for the fox sprite when the art library is present. */
  function heroArt(trackId, w) {
    if (trackId === 'fabulae' && hasActor('fox')) { return Scenes.sprite('fox', {}, w); }
    return trackArt(trackId, w);
  }

  /* art for one track id, sized to fit a door or a hero panel */
  function trackArt(trackId, w) {
    if (trackId === 'historia') {
      return hasActor('ark') ? Scenes.sprite('ark', {}, w) : artArca(w);
    }
    if (trackId === 'aeneis') {
      /* full sail: at door size the furled version collapses to a hull and
         a stick, and stops reading as a ship at a glance. */
      return hasActor('ship') ? Scenes.sprite('ship', {}, w) : artNavis(w);
    }
    return Scenes.mascot(Math.round(w * 0.62), 'fox');
  }

  /* One laurel sprig, curving up from the base. `dir` is 1 for the right-hand
     sprig and -1 for the left (mirrored). Drawn small: it FLANKS a label, it
     does not enclose it — the previous wreath-behind-text version rendered
     the letters unreadable at phone size. */
  function laurelSprig(dir) {
    var s = '<svg class="sprig" viewBox="0 0 20 26" width="13" height="17" aria-hidden="true">';
    s += '<g transform="' + (dir < 0 ? 'translate(20,0) scale(-1,1)' : '') + '">';
    /* the stem */
    s += '<path d="M4,25 C4,16 8,8 16,3" fill="none" stroke="' + ART.gold +
         '" stroke-width="1.8" stroke-linecap="round"/>';
    /* four leaves stepping up the outside of the curve */
    var leaves = [[6, 19, -30], [8, 14, -20], [11, 9, -8], [14, 5, 4]];
    var i;
    for (i = 0; i < leaves.length; i++) {
      s += '<ellipse cx="' + leaves[i][0] + '" cy="' + leaves[i][1] + '" rx="4.2" ry="2" fill="' +
           ART.gold + '" transform="rotate(' + leaves[i][2] + ' ' + leaves[i][0] + ' ' + leaves[i][1] + ')"/>';
    }
    s += '</g></svg>';
    return s;
  }

  /* the AENEIS "PRŌVECTĪS" badge: a small-caps label flanked by two sprigs,
     nothing overlapping anything. It is a HINT, never a lock — the owner's
     rule is free choice of track. */
  function laurelBadge(text) {
    return '<span class="laurel">' + laurelSprig(-1) +
      '<span class="laurel-text">' + esc(text) + '</span>' +
      laurelSprig(1) + '</span>';
  }

  /* one carved arch door: SVG frame + track art, wrapped in a button */
  function doorSvg(track) {
    var s = '<svg class="door-svg" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';
    /* stone surround */
    s += '<path d="M8,236 V104 A92,92 0 0 1 192,104 V236 Z" fill="' + ART.woodDk + '"/>';
    /* inner door leaf */
    s += '<path d="M22,232 V106 A78,78 0 0 1 178,106 V232 Z" fill="' + ART.wood + '"/>';
    /* plank lines */
    s += '<path d="M100,30 V232 M62,44 V232 M138,44 V232" stroke="' + ART.woodDk +
         '" stroke-width="2" opacity="0.55"/>';
    /* gold arch rim + keystone */
    s += '<path d="M22,110 A78,78 0 0 1 178,110" fill="none" stroke="' + ART.gold + '" stroke-width="3"/>';
    s += '<path d="M92,30 h16 l5,14 h-26 Z" fill="' + ART.gold + '"/>';
    /* bevel highlight down the left jamb */
    s += '<path d="M22,232 V106 A78,78 0 0 1 46,50" fill="none" stroke="' + ART.woodLt +
         '" stroke-width="3" opacity="0.7"/>';
    s += '</svg>';
    return s;
  }

  function doorButton(track, i) {
    return '<button type="button" class="door door-' + esc(track.id) + '" data-track="' + esc(track.id) + '">' +
      '<span class="door-frame">' + doorSvg(track) +
        '<span class="door-art">' + trackArt(track.id, 96) + '</span>' +
      '</span>' +
      '<span class="door-label">' +
        '<span class="door-titulus">' + esc(track.titulus) + '</span>' +
        '<span class="door-sub">' + esc(track.subtitulus) + '</span>' +
        (track.badge ? laurelBadge(track.badge) : '') +
      '</span></button>';
  }

  /* =================== HOME: the three doors =================== */

  function showDoors() {
    renderTopbar(false);
    var html = '<section class="doors-screen">' +
      '<header class="doors-head"><h2>' + esc(UI.salveVoc) + ', <span id="uname"></span>!</h2>' +
      '<p class="doors-sub">' + esc(UI.eligePortam) + '</p></header>' +
      '<div class="doors">';
    var i;
    for (i = 0; i < DATA.TRACKS.length; i++) { html += doorButton(DATA.TRACKS[i], i); }
    html += '</div></section>';
    setScreen(html, 'doors-screen-wrap');
    $('#uname').textContent = DATA.vocative(S.name);
    $all('.door').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-track');
        /* a door is NEVER locked (owner's rule). A track with no region yet
           opens the MOX screen; a track with content opens its map. */
        openTrack(id, function () { showMap(); });
      });
    });
  }

  /* =================== LANDING (logged out) =================== */

  /* DESIGN §2 asks the landing for a preview band of what a lesson is. Rather
     than ship a screenshot that goes stale, the three cards render the REAL
     art the steps use: a vocabulary card, a story panel, and the minigame.
     Latin-only captions, like everything a learner reads. */
  function lessonPreview() {
    var verba = hasActor('fox')
      ? Scenes.sprite('fox', {}, 120)
      : Scenes.mascot(96, 'fox');
    var fabula = Scenes.render({
      bg: 'forest',
      items: [{ t: 'tree', x: 300, y: 210, grapes: true }, { t: 'fox', x: 140, y: 210, pose: 'walk' }]
    });
    /* a two-second mock of the LŪDUS canvas: the mascot below, one word
       falling towards it */
    var ludus = '<svg viewBox="0 0 200 150" role="img" aria-label="lūdus">' +
      '<rect width="200" height="150" rx="8" fill="#f6e8c9"/>' +
      '<g transform="translate(58,26)">' +
        '<rect x="0" y="0" width="84" height="30" rx="8" fill="' + ART.wood + '"/>' +
        '<text x="42" y="21" text-anchor="middle" font-family="Palatino, Georgia, serif" ' +
          'font-size="17" fill="' + ART.cream + '">ūva</text>' +
      '</g>' +
      '<path d="M100,62 v16 m0,0 l-6,-7 m6,7 l6,-7" stroke="' + ART.goldDk +
        '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<g transform="translate(72,86)">' + Scenes.mascot(56, 'fox') + '</g>' +
      '</svg>';

    function card(art, label) {
      return '<figure class="prev-card"><span class="prev-art">' + art + '</span>' +
        '<figcaption>' + esc(label) + '</figcaption></figure>';
    }
    return '<section class="preview" aria-label="' + esc(UI.pitchSteps) + '">' +
      '<p class="preview-lead">' + esc(UI.pitchSteps) + '</p>' +
      '<div class="preview-row">' +
        card(verba, UI.verba) +
        card(fabula, UI.fabula) +
        card(ludus, UI.ludus) +
      '</div></section>';
  }

  function showLanding() {
    $('#topbar').innerHTML = '';
    var html = '<section class="landing">' +
      '<header class="landing-head">' +
        '<h1>' + esc(UI.appName) + '</h1>' +
        '<p class="tagline">' + esc(UI.tagline) + '</p>' +
      '</header>' +
      '<div class="hero-band" aria-hidden="true">' +
        '<span class="hero-panel">' + heroArt('fabulae', 170) + '</span>' +
        '<span class="hero-panel">' + heroArt('historia', 170) + '</span>' +
        '<span class="hero-panel">' + heroArt('aeneis', 170) + '</span>' +
      '</div>' +
      '<p class="pitch">' + esc(UI.pitch) + '</p>' +
      '<p class="pitch-sub">' + esc(UI.pitchSub) + '</p>' +
      '<p class="pitch-three">' + esc(UI.pitchThree) + '</p>' +
      '<div class="landing-actions">' +
        '<button id="go-login" class="btn primary" type="button">' + esc(UI.intra) + '</button>' +
        '<button id="go-register" class="btn ghost" type="button">' + esc(UI.incipe) + ' ▶</button>' +
      '</div>' +
      lessonPreview() +
      '</section>';
    setScreen(html, 'landing-screen');
    $('#go-login').addEventListener('click', function () { AuthUI.show(app, onAuthed); });
    $('#go-register').addEventListener('click', function () {
      /* auth-ui.js owns that screen and exposes only show() (= login mode);
         its own "crea ratiōnem" link switches to register, so INCIPE lands
         the visitor there by following it. */
      AuthUI.show(app, onAuthed);
      var toReg = $('#to-register');
      if (toReg) { toReg.click(); }
    });
  }

  /* =================== splash =================== */

  function showSplash() {
    $('#topbar').innerHTML = '';
    var html =
      '<section class="splash">' +
        '<figure class="mascot">' + Scenes.mascot(120) + '</figure>' +
        '<h1>' + esc(UI.appName) + '</h1>' +
        '<p class="tagline">' + esc(UI.tagline) + '</p>' +
        '<p class="big-salve">' + esc(UI.salve) + ' 👋</p>' +
        '<label for="nomen">👤 ' + esc(UI.quidNomen) + '</label>' +
        '<input id="nomen" type="text" maxlength="20" autocomplete="off">' +
        '<button id="go" class="btn primary" type="button">' + esc(UI.incipe) + ' ▶</button>' +
      '</section>';
    setScreen(html, 'splash-screen');
    var inp = $('#nomen');
    inp.value = S.name || '';
    function go() {
      var v = inp.value.replace(/^\s+|\s+$/g, '');
      if (!v) { inp.focus(); return; }
      S.name = v;
      save();
      showDoors();
    }
    $('#go').addEventListener('click', go);
    inp.addEventListener('keydown', function (e) { if (e.keyCode === 13) { go(); } });
    inp.focus();
  }

  /* =================== home: the fable path =================== */

  /* the cursus: every capitulum of the current region with its step row.
     Reached from the map (a node opens its own block) and from the topbar. */
  function showHome() {
    renderTopbar(false);
    var html = '<header class="home-head">' +
      '<h2>' + esc(UI.salveVoc) + ', <span id="uname"></span>!</h2></header>';
    html += '<nav class="path" aria-label="cursus">';
    var fi;
    for (fi = 0; fi < caps().length; fi++) {
      html += capitulumBlock(fi);
    }
    html += '</nav>';
    setScreen(html, 'home-screen');
    $('#uname').textContent = DATA.vocative(S.name);
    bindStepButtons();
  }

  /* one capitulum card: title + its step row. Shared by the cursus and by the
     single-capitulum screen the map opens. */
  function capitulumBlock(fi) {
    var f = capAt(fi);
    var st = stepsOf(fi);
    var unlocked = fableUnlocked(fi);
    var html = '<section class="fable-block' + (unlocked ? '' : ' locked') + '">' +
      '<h3><span class="fnum">' + esc(f.numerus || (fi + 1)) + '</span> ' + esc(f.titulus) +
      ' <span class="ficon">' + (f.icon || '') + '</span>' +
      (fableDone(fi) ? ' <span class="crown">👑</span>' : '') + '</h3>' +
      '<ol class="steps">';
    var si, done, cls, icon;
    for (si = 0; si < st.length; si++) {
      done = isStepDone(f.id, st[si]);
      cls = done ? 'done' : (stepUnlocked(fi, si) ? 'open' : 'shut');
      icon = done ? '✔' : (cls === 'shut' ? '🔒' : ICONS[st[si]]);
      html += '<li><button type="button" class="node ' + cls + '" data-f="' + fi + '" data-s="' + si + '"' +
        (cls === 'shut' ? ' disabled' : '') + '>' +
        '<span class="node-icon">' + icon + '</span>' +
        '<span class="node-label">' + esc(UI[st[si]] || st[si]) + '</span>' +
        '</button></li>';
    }
    html += '</ol></section>';
    return html;
  }

  function bindStepButtons() {
    $all('.node.open, .node.done').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fi2 = parseInt(btn.getAttribute('data-f'), 10);
        var si2 = parseInt(btn.getAttribute('data-s'), 10);
        startStep(fi2, si2);
      });
    });
  }

  /* the screen a map node opens: one capitulum, its seven steps, back to map */
  function showCapitulum(fi) {
    renderTopbar(false);
    var f = capAt(fi);
    if (!f) { showMap(); return; }
    S.mapNode = f.id; save();
    var done = fableDone(fi);
    var html = '<header class="home-head"><h2>' + esc(CUR.region.titulus) + '</h2></header>' +
      capitulumBlock(fi) +
      '<div class="cap-actions">' +
        (done ? '' : '<button id="go-on" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button>') +
        '<button id="to-map" class="btn ghost small" type="button">🗺️ ' + esc(DATA.MAP_UI.provincia) + '</button>' +
      '</div>';
    setScreen(html, 'home-screen');
    bindStepButtons();
    /* one tap continues at the first step that is not finished yet */
    if (!done) {
      $('#go-on').addEventListener('click', function () { startStep(fi, firstOpenStep(fi)); });
    }
    $('#to-map').addEventListener('click', showMap);
  }

  /* where PERGE goes after a step: back to the capitulum the learner is in */
  function afterStep(fi) {
    if (typeof fi === 'number' && capAt(fi)) { showCapitulum(fi); } else { showMap(); }
  }

  /* =================== leaderboard =================== */

  /* THE FAKE BOARD IS GONE. data.js used to ship six hardcoded "students"
     (Marcus 340, Iūlia 285 …) and sort the learner against them — precisely
     the complaint the owner raised (brief §7). The board is now real: it asks
     api/board.php and, when there is nothing to show yet, says so in Latin
     instead of inventing rivals. */
  function showOrdo() {
    renderTopbar(false);
    var g = DATA.gradusFor(S.xp);
    var need = DATA.gradusRemaining(S.xp);
    var html = '<section class="ordo">' +
      '<h2>🏆 ' + esc(UI.ordo) + '</h2>' +
      '<p class="gradus-line"><span class="gradus-name">' + esc(g.titulus) + '</span>' +
        ' · ⭐ ' + S.xp + (need ? ' <span class="gradus-next">(+' + need + ')</span>' : '') + '</p>' +
      '<ol class="board" id="board"><li class="board-wait"><span class="bname">…</span></li></ol>' +
      '<div class="ordo-actions">' +
        '<button id="logout" class="btn ghost small" type="button">⎋ exī (logout)</button>' +
      '</div>' +
      '</section>';
    setScreen(html, 'ordo-screen');

    fetchBoard(function (err, rows) {
      var el = $('#board');
      if (!el) { return; }
      if (err || !rows || !rows.length) {
        /* no endpoint yet, or nobody on the board: an honest empty state */
        el.innerHTML = '<li class="board-empty"><span class="bname">' +
          esc(UI.tabulaVacua) + '</span></li>' +
          '<li class="me"><span class="rank">·</span><span class="bname">' + esc(S.name) +
          '</span><span class="bxp">⭐ ' + S.xp + '</span></li>';
        return;
      }
      /* Row shape from server/api/board.php (M8):
           { rank, nickname, avatar, value, gradus }
         `value` is XP on the total/weekly boards — the unit is per board, so
         it is read generically. NOTHING else is public by design (nickname +
         avatar only), which is why no other field is touched here. */
      var out = '', i, r, medal, rank, mine;
      for (i = 0; i < rows.length; i++) {
        r = rows[i];
        rank = r.rank || (i + 1);
        medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank + '.';
        mine = (r.me === true) || (r.nickname && (r.nickname === S.nickname ||
                String(r.nickname).toLowerCase() === String(S.name).toLowerCase()));
        out += '<li class="' + (mine ? 'me' : '') + (r.exemplum ? ' exemplum' : '') + '">' +
          '<span class="rank">' + medal + '</span>' +
          '<span class="bname">' + esc(r.nickname || r.name || '?') +
            gradusTag(r.gradus) +
            (r.exemplum ? ' <em class="tag">exemplum</em>' : '') + '</span>' +
          '<span class="bxp">⭐ ' + (typeof r.value === 'number' ? r.value : (r.xp || 0)) + '</span></li>';
      }
      el.innerHTML = out;
    });
    $('#logout').addEventListener('click', function () {
      if (!window.confirm('Exīre? (log out)')) { return; }
      if (typeof Api !== 'undefined') {
        Api.logout(function () {
          Storage.reset();
          AuthUI.show(app, onAuthed);
        });
      } else {
        Storage.reset();
        AuthUI.show(app, onAuthed);
      }
    });
  }

  /* The board sends a gradus KEY ('lector'); the Latin display string is the
     client's business (server/lib/score.php says so explicitly). */
  function gradusTag(g) {
    if (!g) { return ''; }
    var rung = DATA.gradusByKey(g.key || g);
    if (!rung) { return ''; }
    return ' <em class="tag">' + esc(rung.titulus) + '</em>';
  }

  /* Read the public board. PREFERRED PATH is Api.board(), which api.js gains
     with the rest of the v2 endpoints (brief §7, milestone M8, owned by the
     server agent). Until that method exists we ask the endpoint directly so
     this screen becomes real the moment board.php lands — and degrades to the
     "tabula vacua" state, never to invented rivals, when it does not.
     MIGRATE: delete the XHR branch once Api.board exists. */
  function fetchBoard(cb) {
    if (typeof Api !== 'undefined' && Api.board) { Api.board('total', cb); return; }
    if (!window.XMLHttpRequest) { cb({ error: 'no_xhr' }, null); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'server/api/board.php?id=total', true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) { return; }
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) { data = null; }
      if (xhr.status < 200 || xhr.status >= 300 || !data) {
        cb({ status: xhr.status }, null);
        return;
      }
      /* accept the shapes the endpoint might use; rows carry nickname + xp
         ONLY (nickname-only rule, brief §7) */
      var rows = data.rows || data.board || (data.length ? data : []);
      cb(null, rows);
    };
    xhr.send(null);
  }

  /* =================== PRŌVINCIA: the overworld map =================== */

  /* a region's spine is done when every capitulum in it is fully complete */
  function regionCapsDone() {
    var i;
    for (i = 0; i < caps().length; i++) {
      if (!fableDone(i)) { return false; }
    }
    return caps().length > 0;
  }
  function capIndexById(id) {
    var i;
    for (i = 0; i < caps().length; i++) {
      if (caps()[i].id === id) { return i; }
    }
    return -1;
  }
  /* boss fully cleared = fight won AND quiz passed (keyed by the FROZEN
     progress id, not the content id — see content/README.md §5) */
  function bossCleared() {
    var b = S.bosses[regionProgressId()];
    return !!(b && b.fight && b.quiz);
  }
  /* every region of the track finished, boss included — the summit state */
  function trackCleared(trackId) {
    var es = CONTENT.regionEntries(trackId), i;
    if (!es.length) { return false; }
    for (i = 0; i < es.length; i++) {
      if (!regionCapsDoneIn(trackId, es[i].id)) { return false; }
      if (es[i].boss && !bossClearedIn(trackId, es[i].id)) { return false; }
    }
    return true;
  }
  function bossNodeId() {
    return (CUR.region && CUR.region.boss) ? CUR.region.boss.id : 'boss';
  }

  /* Where a node sits on its region's 0..1 grid when its content file is
     NOT in memory. The board draws every region of the track at once and
     must not download twelve content files to do it, so an unvisited
     region is laid out on the convention its authors follow anyway:
     alternating sides, evenly spaced, boss at the top. map.js normalises
     each segment independently, so the only thing that has to match the
     authored layout is the RHYTHM — and it does. */
  function defaultPos(k, total) {
    var span = (total > 1) ? (0.71 / (total - 1)) : 0;
    return { x: (k % 2 === 0) ? 0.28 : 0.71, y: 0.87 - k * span };
  }

  /* THE CONTINUOUS TRACK MODEL (NAV).
     One segment per region of the track, bottom-first, built from the
     MANIFEST and enriched from whichever content files happen to be in
     memory. Node positions stay 0..1 FRACTIONS (DESIGN §3) so one layout
     serves every screen width and any region length. */
  function trackModel(trackId) {
    var entries = CONTENT.regionEntries(trackId);
    var segs = [], i, j;

    for (i = 0; i < entries.length; i++) {
      var e = entries[i];
      var reg = CONTENT.region(trackId, e.id);
      var capIds = e.capitula || [];
      var total = capIds.length + (e.boss ? 1 : 0);
      var nodes = [], allDone = capIds.length > 0;

      for (j = 0; j < capIds.length; j++) {
        var cid = capIds[j];
        var cap = reg ? CONTENT.capitulum(reg, cid) : null;
        var d = defaultPos(j, total);
        var done = capDoneById(cid);
        if (!done) { allDone = false; }
        nodes.push({
          id: cid,
          kind: 'fable',
          x: (cap && cap.pos && cap.pos.x) || d.x,
          y: (cap && cap.pos && cap.pos.y) || d.y,
          label: (cap && cap.numerus) || CONTENT.roman(CONTENT.capNumber(trackId, cid)),
          titulus: (cap && cap.titulus) || '',
          icon: cap ? cap.icon : '',
          state: done ? 'done' : (capUnlockedById(cid) ? 'open' : 'shut')
        });
      }

      if (e.boss) {
        var b = (reg && reg.boss) || null;
        var bd = defaultPos(total - 1, total);
        var cleared = bossClearedIn(trackId, e.id);
        nodes.push({
          id: e.boss,
          kind: 'boss',
          x: (b && b.pos && b.pos.x) || 0.5,
          y: (b && b.pos && b.pos.y) || bd.y,
          label: '👑',
          titulus: (b && b.name) || CONTENT.regionTitulus(trackId, e.id),
          state: cleared ? 'done' : (allDone ? 'open' : 'shut')
        });
      }

      segs.push({
        id: e.id,
        titulus: CONTENT.regionTitulus(trackId, e.id),
        numeral: CONTENT.roman(i + 1),
        /* a region is locked when you cannot yet set foot in it */
        locked: !(capIds.length && capUnlockedById(capIds[0])),
        cleared: allDone && (!e.boss || bossClearedIn(trackId, e.id)),
        capsDone: countDone(capIds),
        capsTotal: capIds.length,
        bossCleared: e.boss ? bossClearedIn(trackId, e.id) : null,
        nodes: nodes
      });
    }

    return {
      segments: segs,
      foxNode: currentNodeOn(trackId, segs),
      track: trackId,
      titulus: trackTitle(trackId),
      trackDone: trackCleared(trackId),
      avatar: S.avatar || 'fox'
    };
  }

  function countDone(capIds) {
    var n = 0, i;
    for (i = 0; i < capIds.length; i++) { if (capDoneById(capIds[i])) { n++; } }
    return n;
  }

  /* The tile the mascot stands on. S.mapNode may now name a node in ANY
     region of ANY track (that is the whole point of the fix), so a node
     belonging to a different track falls back to the first unfinished
     capitulum of THIS one rather than putting the fox nowhere. */
  function currentNodeOn(trackId, segs) {
    var here = S.mapNode, i, j, first = '';
    for (i = 0; i < segs.length; i++) {
      for (j = 0; j < segs[i].nodes.length; j++) {
        if (!first) { first = segs[i].nodes[j].id; }
        if (segs[i].nodes[j].id === here) { return here; }
      }
    }
    var chain = CONTENT.trackCapitula(trackId);
    for (i = 0; i < chain.length; i++) {
      if (!capDoneById(chain[i])) { return chain[i]; }
    }
    return chain.length ? chain[chain.length - 1] : first;
  }

  /* Open whatever a tile leads to, LOADING ITS REGION FIRST when the tap
     crossed a region boundary. Everything downstream (showCapitulum,
     showBossIntro, the step engines) reads CUR, so CUR must be pointing at
     the node's own region before any of them runs. */
  function goToNode(id, kind) {
    var loc = CONTENT.locate ? CONTENT.locate(id) : null;
    S.mapNode = id; save();
    function route() {
      if (kind === 'boss') { showBossIntro(id); }
      else { showCapitulum(capIndexById(id)); }
    }
    if (!loc || (loc.track === CUR.trackId && loc.region === CUR.regionId)) {
      route();
      return;
    }
    openRegion(loc.track, loc.region, route);
  }

  function showMap() {
    var trackId = CUR.trackId || 'fabulae';
    if (!CUR.region) { openTrack(trackId, showMap); return; }
    /* KEEP CUR UNDER THE LEARNER'S FEET. The board is track-wide, but CUR is
       still one region — it is what the Cursus button lists and what the step
       engines read. After an auto-advance the saved node has crossed into the
       next region while CUR has not, and a learner who has just beaten Silva
       and is standing in Ager must not open a cursus full of Silva. One
       content file, for the region they are already in. */
    var at = CONTENT.locate ? CONTENT.locate(S.mapNode) : null;
    if (at && at.track === trackId && at.region !== CUR.regionId && nodeReachable(at)) {
      openRegion(at.track, at.region, showMap);
      return;
    }
    renderTopbar(false);
    var model = trackModel(trackId);
    var html =
      '<section class="provincia">' +
        '<header class="prov-head">' +
          '<h2 id="prov-title" class="prov-title" role="button" tabindex="0" ' +
            'aria-label="' + esc(DATA.MAP_UI.regiones) + '">' +
            esc(model.titulus || DATA.MAP_UI.provincia) + ' <span class="prov-caret">▾</span></h2>' +
          '<p class="prov-sub">' + esc(regionSubtitle(model)) + '</p>' +
        '</header>' +
        '<div class="map-frame">' + WorldMap.render(model) + '</div>' +
        '<div class="cap-actions">' +
          '<button id="to-regiones" class="btn ghost small" type="button">🗺️ ' +
            esc(DATA.MAP_UI.regiones) + '</button>' +
          '<button id="to-cursus" class="btn ghost small" type="button">📜 ' +
            esc(DATA.MAP_UI.cursus) + '</button>' +
        '</div>' +
        regionIndexHtml(model) +
      '</section>';
    setScreen(html, 'map-screen');
    var api = WorldMap.bind($('.map-frame'), model, { onNode: goToNode });
    bindRegionIndex(model, api);
    $('#to-cursus').addEventListener('click', showHome);
  }

  /* the line under the track name: which region the learner is standing in */
  function regionSubtitle(model) {
    var loc = CONTENT.locate ? CONTENT.locate(model.foxNode) : null;
    var i, seg;
    if (!loc) { return DATA.MAP_UI.provincia; }
    for (i = 0; i < model.segments.length; i++) {
      seg = model.segments[i];
      if (seg.id === loc.region) {
        return DATA.MAP_UI.regio + ' ' + seg.numeral + (seg.titulus ? ' · ' + seg.titulus : '');
      }
    }
    return DATA.MAP_UI.provincia;
  }

  /* =================== REGIŌNĒS: the region index ===================
     The Cursus button opens the capitula of ONE region; this opens the
     track. It is the map's table of contents — numeral, name, how much of
     it is finished, whether its boss is down — and tapping a row scrolls
     the board to that region instead of navigating away, so the learner
     never loses the board they were reading. */

  function regionIndexHtml(model) {
    var h = '<div class="regio-index" id="regio-index" hidden>' +
      '<div class="ri-panel" role="dialog" aria-modal="true" aria-label="' +
        esc(DATA.MAP_UI.regiones) + '">' +
      '<header class="ri-head"><h3>' + esc(DATA.MAP_UI.regiones) + '</h3>' +
      '<button id="ri-close" class="ri-close" type="button" aria-label="claudere">✕</button></header>' +
      '<ol class="ri-list">';
    var i, seg;
    for (i = 0; i < model.segments.length; i++) {
      seg = model.segments[i];
      var mark = seg.locked ? '🔒'
        : (seg.cleared ? '👑' : (seg.bossCleared ? '✔' : ''));
      h += '<li><button type="button" class="ri-row' +
             (seg.locked ? ' is-shut' : '') + (seg.id === currentRegionOf(model) ? ' is-here' : '') +
             '" data-region="' + esc(seg.id) + '"' + (seg.locked ? ' aria-disabled="true"' : '') + '>' +
           '<span class="ri-num">' + esc(seg.numeral) + '</span>' +
           '<span class="ri-name">' + esc(seg.titulus || ('—')) + '</span>' +
           '<span class="ri-prog">' + seg.capsDone + '/' + seg.capsTotal +
             (mark ? ' <span class="ri-mark">' + mark + '</span>' : '') + '</span>' +
           '</button></li>';
    }
    h += '</ol></div></div>';
    return h;
  }

  function currentRegionOf(model) {
    var loc = CONTENT.locate ? CONTENT.locate(model.foxNode) : null;
    return loc ? loc.region : '';
  }

  function bindRegionIndex(model, api) {
    var panel = $('#regio-index');
    if (!panel) { return; }
    function open() {
      panel.hidden = false;
      var first = $('.ri-row.is-here', panel) || $('.ri-row', panel);
      if (first && first.scrollIntoView) { first.scrollIntoView({ block: 'center' }); }
      if (first && first.focus) { first.focus(); }
    }
    function close() { panel.hidden = true; }
    $('#to-regiones').addEventListener('click', open);
    $('#ri-close').addEventListener('click', close);
    /* tapping the backdrop (never the panel) closes it */
    panel.addEventListener('click', function (e) { if (e.target === panel) { close(); } });
    var title = $('#prov-title');
    if (title) {
      title.addEventListener('click', open);
      title.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) { e.preventDefault(); open(); }
      });
    }
    $all('.ri-row', panel).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rid = btn.getAttribute('data-region');
        if (btn.className.indexOf('is-shut') >= 0) {
          /* a locked region says so and stays put — nothing to scroll to
             that the learner could act on */
          btn.className = btn.className.replace(/ ri-deny/g, '') + ' ri-deny';
          window.setTimeout(function () {
            btn.className = btn.className.replace(/ ri-deny/g, '');
          }, 620);
          return;
        }
        close();
        if (api && api.scrollToRegion) { api.scrollToRegion(rid, true); }
      });
    });
  }

  function trackTitle(trackId) {
    var t = DATA.trackById(trackId || CUR.trackId);
    return t ? t.titulus : '';
  }

  /* A door whose track has no region yet opens THIS instead of nothing:
     the real plan from docs/CURRICULUM.md, so "coming soon" reads as a
     promise with contents rather than an empty room. */
  function showMox(trackId) {
    renderTopbar(false);
    var t = DATA.trackById(trackId) || { titulus: '', mox: [] };
    var list = '', i;
    for (i = 0; i < (t.mox || []).length; i++) {
      list += '<li>' + esc(t.mox[i]) + '</li>';
    }
    var html = '<section class="mox">' +
      '<p class="mox-kicker">' + esc(t.titulus) + '</p>' +
      '<h2>' + esc(UI.moxTitulus) + '</h2>' +
      '<p class="mox-sub">' + esc(UI.moxSub) + '</p>' +
      '<p class="mox-lead">' + esc(UI.moxLibri) + '</p>' +
      '<ol class="mox-list">' + list + '</ol>' +
      '<button id="mox-back" class="btn primary" type="button">' + esc(UI.domus) + '</button>' +
      '</section>';
    setScreen(html, 'mox-screen');
    $('#mox-back').addEventListener('click', showDoors);
  }

  /* first not-yet-done step index in a capitulum (for jumping in) */
  function firstOpenStep(fi) {
    var f = capAt(fi), st = stepsOf(fi), i;
    for (i = 0; i < st.length; i++) {
      if (!isStepDone(f.id, st[i])) { return i; }
    }
    return 0;
  }

  /* =================== BOSS: intro → timed fight → quiz =================== */

  /* ---- the boss is DATA, not the wolf ----
     Regiō I's boss is Lupus; Regiō II's is a Leō, and the Historia/Aeneis
     trials have no beast at all. Every screen that draws the enemy or names
     the challenge therefore reads the REGION'S OWN boss config. The wolf
     survives only as the last-resort fallback, for a config that names an
     actor the art library does not have (a missing art file must degrade to
     the wrong animal, never to a blank frame). */
  function bossActor() {
    var b = (CUR.region && CUR.region.boss) || {};
    var want = b.actor || 'wolf';
    var names = (window.Scenes && Scenes.actorNames) ? Scenes.actorNames() : [];
    var i;
    for (i = 0; i < names.length; i++) { if (names[i] === want) { return want; } }
    if (window.console && b.actor) {
      console.warn('[app] boss actor "' + b.actor + '" is not in the art library');
    }
    return 'wolf';
  }

  /* ---- how big the boss should be drawn in its own intro frame ----
     Every boss is ONE actor on the shared 400x240 stage, and the actors are
     not the same size: the wolf's artwork is 80 units tall, the hare's is 46
     and the ox's is well over 100. A single fixed scale therefore gave Lupus
     a portrait and Lepus a speck in the middle of an empty field. Scale from
     the actor's OWN height instead, so every region's intro card frames its
     boss the same way.

     Scenes keeps its bounds table private, but sprite() writes exactly those
     bounds into the viewBox of the SVG it returns — so the measurement is
     read back from the one string we already know how to build, rather than
     duplicated here where it would silently rot when art changes. */
  function actorBounds(name, pose) {
    if (!window.Scenes || !Scenes.sprite) { return null; }
    var m;
    try {
      m = /viewBox="(-?[0-9.]+)\s+(-?[0-9.]+)\s+(-?[0-9.]+)\s+(-?[0-9.]+)"/
        .exec(Scenes.sprite(name, { pose: pose }, 100));
    } catch (e) { return null; }
    if (!m) { return null; }
    return { x: +m[1], y: +m[2], w: +m[3], h: +m[4] };
  }

  /* the share of the frame's height the boss should occupy: big enough to be
     a portrait, small enough to leave sky above and ground below. */
  var BOSS_FILL = 0.60;

  function bossSceneScale(actor, pose, sceneY) {
    var b = actorBounds(actor, pose);
    /* no bounds (no art library, or an unregistered actor): keep the old
       hand-tuned defaults rather than guessing. */
    if (!b || !b.h || !b.w) { return (actor === 'wolf') ? 1.3 : 1.0; }
    var s = (Scenes.H * BOSS_FILL) / b.h;
    /* three ceilings, all of them "do not crowd the stage":
         width  — never wider than 82% of the frame;
         height — the art above the actor's ground point must fit above
                  sceneY and still leave a seventh of the frame as sky. This
                  is what keeps the wolf civil: it stands on a RIVER BANK at
                  y=155, not on the ground at y=210, so 60% of the frame would
                  put its ears against the top edge;
         sanity — no actor is ever blown up past 3x its drawn size. */
    s = Math.min(s, (Scenes.W * 0.82) / b.w);
    if (b.y < 0) { s = Math.min(s, (sceneY - Scenes.H * 0.14) / (-b.y)); }
    return Math.max(0.5, Math.min(s, 3));
  }

  /* ---- poses whose art does not touch its own origin ----
     scenes.js draws every actor standing ON y=0, except that the wolf's
     'leap' tucks its legs: the lowest ink in that pose is 8 units ABOVE the
     origin, because a leaping animal is off the ground. Placing the origin
     on the bank therefore hangs the art 8*scale units over it. The gap is
     added back so it is the ARTWORK, not the origin, that lands. */
  var POSE_LIFT = { leap: 8 };

  /* one illustrated frame of the boss, for the intro and the defeat screen.
     Content may override every choice (bg / sceneY / sceneScale / pose);
     the defaults are what made Regiō I look right. */
  function bossScene(pose) {
    var b = (CUR.region && CUR.region.boss) || {};
    var actor = bossActor();
    var bg = b.bg || (actor === 'wolf' ? 'river' : 'plain');
    /* GAUNTLET F2 — GROUND HIM ON THE BANK.
       This used to read `bg === 'river' ? 155 : GROUND`, on the belief that
       a river scene has a far bank above the water line. Look at bgRiver():
       it is sky from the top of the frame down to the water, the water band
       from y≈167 to y≈197 at centre, and grass below y=210. There is no far
       bank in that picture. y=155 stood the wolf on SKY, twelve units above
       the water — and 'leap', whose art floats another 8 units on top of
       that, lifted him clear into the air over the river. Both Lupus intros
       (r01 and r12) shipped that way.
       The bank in bgRiver is the NEAR one, the grass at GROUND, which is
       also where every other background puts its actors. */
    var y = (typeof b.sceneY === 'number') ? b.sceneY : Scenes.GROUND;
    /* authored sceneScale always wins: content that has been eyeballed beats
       anything derived. */
    var s = (typeof b.sceneScale === 'number') ? b.sceneScale
          : bossSceneScale(actor, pose, y);
    var lift = POSE_LIFT[pose] || 0;
    return Scenes.render({ bg: bg,
      items: [{ t: actor, x: 200, y: y + lift * s, pose: pose, s: s }] });
  }
  /* the dramatic pose for the intro, and the sprite pose for the fight
     itself. 'leap' and 'angry' are wolf-only poses; every other actor
     degrades to 'stand', so the fallback is chosen per actor family.

     GAUNTLET F2: the wolf's INTRO pose was 'leap'. A leaping animal has its
     legs tucked and no contact with anything, so on the intro card — one
     actor alone on a wide frame with a river behind him — he read as
     floating rather than as bounding. Standing him on the bank (see
     bossScene) fixed the height and not the impression: the pose itself has
     nothing under it. The default is now 'angry', which plants four feet
     and bares the teeth, and it frames him the way the Leō of Regiō II is
     framed. 'leap' is untouched in the art and content may still ask for it
     by name; POSE_LIFT above is what makes it land when it does. */
  function bossPose(kind) {
    var b = (CUR.region && CUR.region.boss) || {};
    var wolf = (bossActor() === 'wolf');
    if (kind === 'fight') { return b.fightPose || (wolf ? 'angry' : 'stand'); }
    if (kind === 'lost') { return b.calmPose || 'stand'; }
    return b.pose || (wolf ? 'angry' : 'run');
  }
  /* "Lupum vince!" is the RIGHT line for a wolf and the wrong one for a lion.
     Content supplies its own accusative (`vinceText: 'Leōnem vince!'`); the
     generic fallback carries no object at all, because a Latin accusative
     cannot be derived from a nominative safely. */
  function bossVinceText() {
    var b = (CUR.region && CUR.region.boss) || {};
    if (b.vinceText) { return b.vinceText; }
    if (bossActor() === 'wolf') { return DATA.MAP_UI.bossReady; }
    return DATA.MAP_UI.bossReadyAny || DATA.MAP_UI.bossReady;
  }

  /* (probatioTitulus() lived here: it read Probatio.PHASES[type].titulus so
     the header could name the round. GAUNTLET F9 took the round name out of
     the header — the canvas banner owns it — and with it the last caller,
     so the helper went too rather than sitting here unreferenced.) */

  /* The line above the canvas. A DUEL challenges — "Lupum vince!". A TRIAL
     does not: there is nobody to defeat, and telling a child to conquer the
     ark is both wrong and, in Genesis, tonally absurd (DESIGN §6). A probatio
     is NAMED instead: "Probātiō: Arca".

     It used to be instructed too — "Probātiō: Arca — ŌRDINĀ!" — and that was
     the phase name said twice, because the engine's own in-canvas banner
     already announces ŌRDINĀ two lines below (GAUNTLET F9). The header keeps
     the part only it can say (which trial this is); the banner keeps the part
     only it can say (which round is running, and it updates when the round
     changes, which a header written once never did).
     Content may override either with `boss.headerText`. */
  function bossHeaderText() {
    var b = (CUR.region && CUR.region.boss) || {};
    if (b.headerText) { return b.headerText; }
    if (b.kind !== 'probatio') { return bossVinceText(); }
    var label = DATA.MAP_UI.probatioLabel || 'Probātiō';
    return label + (b.name ? ': ' + b.name : '');
  }

  function showBossIntro(nodeId) {
    renderTopbar(true);
    var boss = CUR.region.boss;
    /* a duel is crowned and fought; a trial is a scroll to be undertaken.
       Same screen, and the same two strings decide which it reads as. */
    var trial = (boss.kind === 'probatio');
    var html =
      '<section class="boss-intro">' +
        '<figure class="scene">' + bossScene(bossPose('intro')) + '</figure>' +
        '<h2>' + (trial ? '📜' : '👑') + ' ' + esc(boss.name) + '</h2>' +
        '<p class="boss-tag">' + esc(bossHeaderText()) + '</p>' +
        '<button id="fight" class="btn primary" type="button">' +
          (trial ? '📜 ' : '⚔ ') +
          esc(trial ? (DATA.MAP_UI.incipe || DATA.MAP_UI.pugna) : DATA.MAP_UI.pugna) +
        '</button>' +
      '</section>';
    setScreen(html, 'boss-intro-screen');
    $('#fight').addEventListener('click', function () { runBossFight(nodeId); });
  }

  /* build the boss word pool from the region's capitula (reuse their art) */
  function bossWords() {
    var words = [], seen = {}, i, j, vocab;
    for (i = 0; i < caps().length; i++) {
      vocab = caps()[i].vocab || [];
      for (j = 0; j < vocab.length; j++) {
        if (hasVisual(vocab[j]) && !seen[vocab[j].la]) {
          seen[vocab[j].la] = true;
          words.push(vocab[j]);
        }
      }
    }
    return words;
  }

  /* how far into its track this region sits: the ONE difficulty input the
     phase engine scales everything else from (DESIGN §6). */
  function regionIndex() {
    var list = CONTENT.regionEntries(CUR.trackId) || [], i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === CUR.regionId) { return i; }
    }
    return 0;
  }

  /* SWAP POINT: replace this one function's body to drop in a platformer boss.
     It must call onWin()/onLose() to keep the unlock flow intact.

     M3: the fight itself is now a PHASE ENGINE (js/boss.js) driven by the
     content file's `boss.phases`. This function's job shrank to three things:
     build the config, pick the engine, and forward the result payload. A boss
     declared `kind: 'probatio'` runs the non-combat trial engine instead —
     same contract, same payload, one field. */
  function runBossFight(nodeId) {
    renderTopbar(true);
    var boss = CUR.region.boss;
    var regionKey = regionProgressId();
    var trial = (boss.kind === 'probatio');
    var runner = trial && window.Probatio ? Probatio : Boss;
    var html = '<section class="boss-wrap">' +
      '<p class="ask">' + esc(bossHeaderText()) + ' ⬅ ➡</p>' +
      '<canvas id="bossgame" aria-label="' + (trial ? 'probatio' : 'pugna') + '"></canvas>' +
      '</section>';
    setScreen(html, 'boss-screen');
    var cv = $('#bossgame');
    runner.start(cv, {
      words: bossWords(),
      /* the whole region's capitula: clamor and sententia derive their gapped
         sentences from the story pages (see js/boss-phases.js) */
      capitula: caps(),
      phases: boss.phases,          /* absent ⇒ the legacy single-phase fight */
      hp: boss.hp,                  /* legacy tuning, still honoured */
      seconds: boss.seconds,
      region: regionKey,            /* copied verbatim into the result payload */
      regionIndex: regionIndex(),
      name: boss.name,
      actor: bossActor(),           /* validated against the art library */
      actorPose: bossPose('fight'),
      kind: boss.kind,
      avatar: S.avatar,
      clamor: boss.clamor,          /* optional hand-authored sentence items */
      sententiae: boss.sententiae
    }, {
      onEnd: function (won, payload) {
        if (won) {
          /* optimistic mirror update */
          if (!S.bosses[regionKey]) { S.bosses[regionKey] = {}; }
          S.bosses[regionKey].fight = true;
          save();
          /* server records the fight + grants fight XP once, then we proceed */
          if (typeof Api !== 'undefined') {
            postBossResult(payload);
            Api.bossFight(regionKey, function (err, data) {
              if (!err && data && data.snapshot) {
                Storage.reconcile(S, data.snapshot);
                renderTopbar();
              }
              runBossQuiz(nodeId);
            });
          } else {
            addXP(DATA.XP.bossFight);
            runBossQuiz(nodeId);
          }
        } else {
          showBossResult(nodeId, false);
        }
      }
    });
  }

  /* The richer M3 payload goes to the NEW endpoint, in ADDITION to the
     unchanged boss_fight.php call above — the old contract is what unlocks the
     region, this one only feeds the records board (brief §7). Both grant the
     first-clear XP through the same once-only event marker, so posting both is
     idempotent. Fire-and-forget: a records board that is down must never stop
     a learner reaching the quiz. Feature-detected because api.js may be an
     older copy (or the QA harness's stub). */
  function postBossResult(payload) {
    if (!payload || !payload.region) { return; }
    if (typeof Api === 'undefined' || !Api.bossResult) { return; }
    try {
      Api.bossResult({
        region: payload.region,
        ms: payload.ms,
        mistakes: payload.mistakes,
        phases: payload.phases
      }, function () { /* records are a bonus; errors are not the learner's */ });
    } catch (e) {
      if (window.console) { console.warn('[app] boss result not posted', e); }
    }
  }

  /* the 5-question cumulative quiz that finishes the boss */
  function runBossQuiz(nodeId) {
    renderTopbar(true);
    var regionKey = regionProgressId();
    var quiz = CUR.region.boss.quiz.slice();
    /* resolve each quiz entry to a vocab item (with its visual) */
    var pool = bossWords();
    function findWord(la) {
      var i;
      for (i = 0; i < pool.length; i++) { if (pool[i].la === la) { return pool[i]; } }
      return null;
    }
    var items = [];
    var i;
    for (i = 0; i < quiz.length; i++) {
      var w = findWord(quiz[i].la);
      if (w) { items.push(w); }
    }
    var qi = 0, wrong = 0;
    var answers = {};   /* question word -> chosen word, for server grading */

    function finishQuiz() {
      /* the SERVER is authoritative on pass/fail: it holds the answer key and
         grants quiz XP. We submit the collected answers and reconcile. */
      if (typeof Api !== 'undefined') {
        Api.bossQuiz(regionKey, answers, function (err, data) {
          if (!err && data) {
            if (data.snapshot) { Storage.reconcile(S, data.snapshot); renderTopbar(); }
            showBossResult(nodeId, !!data.passed);
            return;
          }
          /* network fell over: fall back to the local tally so the lesson
             isn't blocked; server will reconcile on next load. */
          var passedLocal = (wrong <= 1);
          if (passedLocal) {
            if (!S.bosses[regionKey]) { S.bosses[regionKey] = {}; }
            S.bosses[regionKey].quiz = true; save();
          }
          showBossResult(nodeId, passedLocal);
        });
      } else {
        var passed = (wrong <= 1);
        if (passed) {
          if (!S.bosses[regionKey]) { S.bosses[regionKey] = {}; }
          S.bosses[regionKey].quiz = true; save();
        }
        showBossResult(nodeId, passed);
      }
    }

    function ask() {
      if (qi >= items.length) { finishQuiz(); return; }
      var q = items[qi];
      var opts = shuffle([q].concat(shuffle(pool.filter(function (w) { return w.la !== q.la; })).slice(0, 2)));
      var html = '<section class="boss-quiz">' +
        '<header class="step-head"><span class="step-ic">⚔️</span><h2>' + esc(DATA.MAP_UI.quizTitle) + '</h2></header>' +
        '<p class="ask">' + esc(UI.quaerere) + '</p>' +
        '<p class="prompt-word">' + esc(q.la) + ' <button type="button" id="say" class="speak" aria-label="audi">🔊</button></p>' +
        '<div class="opt-row picks">';
      var k;
      for (k = 0; k < opts.length; k++) {
        html += '<button type="button" class="opt emoji-opt" data-la="' + esc(opts[k].la) + '">' + visualFor(opts[k]) + '</button>';
      }
      html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + items.length + '</p></section>';
      setScreen(html, 'boss-quiz-screen');
      Tts.speak(q.la);
      $('#say').addEventListener('click', function () { Tts.speak(q.la); });
      $all('.emoji-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.disabled) { return; }
          var chosen = b.getAttribute('data-la');
          if (chosen === q.la) {
            /* record the answer (correct), advance */
            answers[q.la] = chosen;
            toast(true);
            qi++;
            window.setTimeout(ask, 450);
          } else {
            /* first wrong tap on this question is what we record + count */
            if (typeof answers[q.la] === 'undefined') {
              answers[q.la] = chosen;
              wrong++;
            }
            toast(false);
            b.disabled = true;
          }
        });
      });
    }
    ask();
  }

  /* OPTIONAL narrative coda on the victory screen. A region may close its own
     story with one line of Latin — r12's `postWin: 'Lupus līber discēdit.'`
     lets the Fabulae finale end with the wolf walking away free instead of
     with a bare "Vīcistī!". It is CONTENT, never generated: no Latin sentence
     is safe to invent from a boss name (see bossVinceText above for the same
     rule applied to the challenge line). Absent ⇒ nothing is drawn. */
  function bossPostWin() {
    var b = (CUR.region && CUR.region.boss) || {};
    return (typeof b.postWin === 'string' && b.postWin) ? b.postWin : '';
  }

  /* NAV — AUTO-ADVANCE.
     The bug this whole change exists for ended here: the learner beat a
     boss, tapped "Prōvincia", and landed back on a board whose every tile
     was gold with no road off it. Clearing a boss now MOVES the learner —
     S.mapNode becomes the first capitulum of the next region, so the map
     opens on the new segment with the current-node glow already there.

     Returns the node advanced to, or '' when there is nowhere to go (the
     last region of a track), which is the track-complete state. The
     unlock check is not ceremony: it is the same rule the server will
     apply to the first step taken there. */
  /* "Regiō II · Ager →" — the road ahead, named. Read AFTER the advance, so
     it names the region the learner has just been walked into. */
  function nextRegionLine() {
    var loc = CONTENT.locate ? CONTENT.locate(S.mapNode) : null;
    if (!loc) { return ''; }
    var i = CONTENT.regionIndexOf(loc.track, loc.region);
    var tit = CONTENT.regionTitulus(loc.track, loc.region);
    return DATA.MAP_UI.regio + ' ' + CONTENT.roman(i + 1) + (tit ? ' · ' + tit : '') + ' →';
  }

  function advanceAfterBoss() {
    if (!bossCleared()) { return ''; }
    var next = CONTENT.nextNodeAfterBoss(CUR.trackId, CUR.regionId);
    if (!next || !capUnlockedById(next)) { return ''; }
    S.mapNode = next;
    save();
    return next;
  }

  function showBossResult(nodeId, won) {
    renderTopbar(false);
    var fullyClear = bossCleared();
    var advanced = (won && fullyClear) ? advanceAfterBoss() : '';
    var finished = (won && fullyClear && !advanced && trackCleared(CUR.trackId));
    var html = '<section class="finis">';
    if (won && fullyClear) {
      html += '<p class="euge">' + esc(DATA.MAP_UI.vicisti) + ' 👑</p>' +
        '<figure class="mascot">' + Scenes.mascot(96) + '</figure>' +
        '<p class="bonus">+30 ⭐</p>';
      if (bossPostWin()) {
        html += '<p class="post-win">' + esc(bossPostWin()) + '</p>';
      }
      if (finished) {
        html += '<p class="cursus-done">' + esc(DATA.MAP_UI.cursusConfectus) + ' 🏆</p>';
      } else if (advanced) {
        html += '<p class="next-regio">' + esc(nextRegionLine()) + '</p>';
      }
    } else if (won) {
      /* won the fight but quiz not yet passed, or vice-versa */
      html += '<p class="euge">' + esc(UI.euge) + ' 🎉</p>' +
        '<figure class="mascot">' + Scenes.mascot(96) + '</figure>';
    } else {
      html += '<p class="euge">' + esc(DATA.MAP_UI.victus) + '</p>' +
        '<figure class="scene small">' + bossScene(bossPose('lost')) + '</figure>';
    }
    html += '<button id="back-map" class="btn primary" type="button">🗺️ ' + esc(DATA.MAP_UI.provincia) + '</button>' +
      '</section>';
    setScreen(html, 'finis-screen');
    $('#back-map').addEventListener('click', showMap);
  }

  /* =================== step dispatcher =================== */

  /* The engine iterates the capitulum's step list as DATA: a step id is
     looked up in this registry, so a track can drop or add steps in content
     without touching the router (DESIGN §4). */
  var RUNNERS = {};

  function startStep(fi, si) {
    Game.stop();
    var step = stepsOf(fi)[si];
    if (!step) { afterStep(fi); return; }
    if (S.hearts <= 0 && step !== 'verba') { showRefill(fi); return; }
    var run = RUNNERS[step];
    if (!run) {
      /* unknown step id in content: skip it rather than dead-ending a lesson */
      if (window.console) { console.warn('[app] no runner for step "' + step + '"'); }
      afterStep(fi);
      return;
    }
    run(fi);
  }

  function stepHeader(fi, step) {
    var f = capAt(fi);
    return '<header class="step-head"><span class="step-ic">' + ICONS[step] + '</span>' +
      '<h2>' + esc(UI[step] || step) + '</h2><p class="step-fab">' + esc(f.titulus) + '</p></header>';
  }

  /* Finish a step: optimistic local mark, then the authoritative server call.
     `opts.noXP` marks the step complete WITHOUT claiming XP — used when the
     server does not know the step id yet (see the 'sonus' fallback below). */
  function finishStep(fi, step, bonusXP, extraHTML, opts) {
    var f = capAt(fi);
    opts = opts || {};
    /* A step this server build has already rejected (see the 422 handler
       below) never claims XP again: showing "+20 ⭐" that the next reconcile
       silently takes away is worse than showing nothing. */
    if (S.unknownSteps && S.unknownSteps[step]) { opts.noXP = true; opts.local = true; }
    /* optimistic local update so the UI is instant... */
    var first = completeStep(f.id, step);
    if (first && bonusXP && !opts.noXP) { addXP(bonusXP); }
    /* ...then tell the server, which is authoritative. It grants XP only on a
       genuine first completion (idempotent), enforces prerequisites, and hands
       back the true snapshot we reconcile into the mirror. */
    if (typeof Api !== 'undefined' && !opts.noPost) {
      Api.completeStep(f.id, step, (bonusXP || 0), function (err, data) {
        if (!err && data && data.snapshot) {
          /* the server accepted the step: if it had rejected it before, it has
             now learned it (its manifest loader shipped), so stop suppressing */
          if (S.unknownSteps && S.unknownSteps[step]) { delete S.unknownSteps[step]; }
          Storage.reconcile(S, data.snapshot);
          renderTopbar();
          return;
        }
        /* FEATURE DETECT (M4 ↔ M8 handshake): a 422 invalid_step means this
           server build predates the step (today: 'sonus'; its manifest loader
           ships in parallel). Keep the step locally complete so the lesson
           flow is not blocked, and claim NO XP — the server stays the only
           source of XP. Once the server learns the step, the next completion
           posts normally and the server grants it then. */
        if (err && err.status === 422 && err.data && err.data.error === 'invalid_step') {
          markLocalStep(f.id, step);
          if (!S.unknownSteps) { S.unknownSteps = {}; }
          S.unknownSteps[step] = true;
          /* take back the optimistic XP we just showed: the server never
             granted it, and it is the only authority on XP */
          if (first && bonusXP && !opts.noXP) {
            S.xp = Math.max(0, S.xp - bonusXP);
            var bonusEl = $('.finis .bonus');
            if (bonusEl && bonusEl.parentNode) { bonusEl.parentNode.removeChild(bonusEl); }
          }
          save();
          renderTopbar();
          if (window.console) {
            console.info('[app] server does not know step "' + step + '" yet; marked locally, no XP');
          }
        }
      });
    }
    if (opts.local) { markLocalStep(f.id, step); }
    var html = '<section class="finis">' +
      '<p class="euge">' + esc(UI.euge) + ' 🎉</p>' +
      '<figure class="mascot">' + Scenes.mascot(96, S.avatar) + '</figure>' +
      (bonusXP && first && !opts.noXP ? '<p class="bonus">+' + bonusXP + ' ⭐</p>' : '') +
      (extraHTML || '') +
      '<button id="cont" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button>' +
      '</section>';
    setScreen(html, 'finis-screen');
    $('#cont').addEventListener('click', function () { afterStep(fi); });
  }

  function heartsOut(fi) {
    Game.stop();
    showRefill(fi);
  }

  /* hearts refill: review vocabulary (more input, never a wall) */
  function showRefill(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var pool = [];
    var i;
    for (i = 0; i < f.vocab.length; i++) {
      if (hasVisual(f.vocab[i])) { pool.push(f.vocab[i]); }
    }
    /* recycle earlier capitula's vocab too */
    var j, k;
    for (j = 0; j < fi; j++) {
      for (k = 0; k < capAt(j).vocab.length; k++) {
        if (hasVisual(capAt(j).vocab[k])) { pool.push(capAt(j).vocab[k]); }
      }
    }
    var quiz = shuffle(pool).slice(0, 5);
    var idx = 0;

    function ask() {
      if (idx >= quiz.length) {
        S.hearts = S.maxHearts;
        save();
        renderTopbar(false);
        var html = '<section class="finis"><p class="euge">' + esc(UI.cordaPlena) + '</p>' +
          '<p class="hearts-big">❤️❤️❤️❤️❤️</p>' +
          '<button id="cont" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button></section>';
        setScreen(html, 'finis-screen');
        $('#cont').addEventListener('click', function () { afterStep(fi); });
        return;
      }
      var q = quiz[idx];
      var opts = shuffle([q].concat(shuffle(pool.filter(function (w) { return w.la !== q.la; })).slice(0, 2)));
      var html = '<section class="refill">' +
        '<h2>💔 ' + esc(UI.nullaCorda) + '</h2>' +
        '<p class="prompt-word">' + esc(q.la) + '</p>' +
        '<div class="opt-row picks">';
      var i2;
      for (i2 = 0; i2 < opts.length; i2++) {
        html += '<button type="button" class="opt emoji-opt" data-la="' + esc(opts[i2].la) + '">' + visualFor(opts[i2]) + '</button>';
      }
      html += '</div><p class="refill-progress">' + (idx + 1) + ' / ' + quiz.length + '</p></section>';
      setScreen(html, 'refill-screen');
      $all('.emoji-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.getAttribute('data-la') === q.la) {
            toast(true);
            idx++;
            window.setTimeout(ask, 450);
          } else {
            toast(false);
            b.disabled = true;
          }
        });
      });
    }
    ask();
  }

  /* =================== VERBA: vocabulary warm-up =================== */

  function runVerba(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var i = 0;

    function card() {
      if (i >= f.vocab.length) { check(); return; }
      var v = f.vocab[i];
      var visual = v.scene
        ? '<figure class="scene small">' + Scenes.render(v.scene) + '</figure>'
        : '<p class="vocab-emoji">' + v.emoji + '</p>';
      var html = stepHeader(fi, 'verba') +
        '<section class="vocab-card">' +
        visual +
        '<p class="vocab-word">' + esc(v.la) + ' <button type="button" id="say" class="speak" aria-label="audi">🔊</button></p>' +
        '<p class="card-progress">' + (i + 1) + ' / ' + f.vocab.length + '</p>' +
        '<button id="next" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button>' +
        '</section>';
      setScreen(html, 'verba-screen');
      Tts.speak(v.la);
      $('#say').addEventListener('click', function () { Tts.speak(v.la); });
      $('#next').addEventListener('click', function () { i++; Tts.stop(); card(); });
    }

    /* quick check: word → pick the matching image, OR (see the flip below)
       picture → pick the matching word. */
    function check() {
      var pool = [];
      var k;
      for (k = 0; k < f.vocab.length; k++) {
        if (hasVisual(f.vocab[k])) { pool.push(f.vocab[k]); }
      }
      var quiz = shuffle(pool).slice(0, 4);
      var qi = 0;

      /* one grader for both directions: every option button carries data-la,
         and the answer is always the asked word. */
      function wire(q) {
        $all('.quickcheck .opt').forEach(function (b) {
          b.addEventListener('click', function () {
            if (b.disabled) { return; }
            if (b.getAttribute('data-la') === q.la) {
              toast(true);
              addXP(10);
              qi++;
              window.setTimeout(ask, 450);
            } else {
              toast(false);
              b.disabled = true;
              if (!loseHeart()) { heartsOut(fi); }
            }
          });
        });
      }

      /* THE FLIP (CLAR, ruling (d)). Some option sets cannot be made visually
         distinct by any amount of art: a capitulum whose vocabulary is
         `Abraham`, `Sara` and `Lot` has three robed figures and no fourth
         picture of Sara to swap in, and repainting a verb's scene to look
         unlike its own noun would delete the verb. Asking "which picture is
         Sara?" there is not a hard question, it is an unanswerable one.

         So when the ASKED word's picture is flagged against a distractor's,
         this item turns around: ONE large picture of the asked item, and the
         three WORDS as the choices. The same knowledge is tested, the picture
         is big enough to read on a phone, and the answer is decidable. It is
         a per-item runtime fallback, not a content change — the same capitulum
         still asks its distinct items the normal way round.

         Only the ANSWER's flags count: if two DISTRACTORS look alike but the
         asked item is unmistakable, the learner still has a question they can
         answer, and flipping it would throw away a good one (CHIP.optionAmbiguous). */
      function askPicture(q, opts) {
        var html = stepHeader(fi, 'verba') +
          '<section class="quickcheck flipped">' +
          '<p class="ask">' + esc(UI.quaerere) + '</p>' +
          '<figure class="scene small">' + Scenes.render(q.scene) + '</figure>' +
          '<div class="opt-row">';
        var i2;
        var words = shuffle(opts.slice());
        for (i2 = 0; i2 < words.length; i2++) {
          html += '<button type="button" class="opt word-opt" data-la="' +
            esc(words[i2].la) + '">' + esc(words[i2].la) + '</button>';
        }
        html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + quiz.length + '</p></section>';
        setScreen(html, 'verba-screen');
        wire(q);
      }

      function askWord(q, opts) {
        var html = stepHeader(fi, 'verba') +
          '<section class="quickcheck">' +
          '<p class="ask">' + esc(UI.quaeImago) + '</p>' +
          '<p class="prompt-word">' + esc(q.la) + ' <button type="button" id="say" class="speak" aria-label="audi">🔊</button></p>' +
          '<div class="opt-row picks">';
        var i2;
        for (i2 = 0; i2 < opts.length; i2++) {
          html += '<button type="button" class="opt emoji-opt" data-la="' + esc(opts[i2].la) + '">' + visualFor(opts[i2]) + '</button>';
        }
        html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + quiz.length + '</p></section>';
        setScreen(html, 'verba-screen');
        Tts.speak(q.la);
        $('#say').addEventListener('click', function () { Tts.speak(q.la); });
        wire(q);
      }

      function ask() {
        if (qi >= quiz.length) {
          finishStep(fi, 'verba', 20);
          return;
        }
        var q = quiz[qi];
        var opts = shuffle([q].concat(shuffle(pool.filter(function (w) { return w.la !== q.la; })).slice(0, 2)));
        /* the flip needs a picture to enlarge; an emoji-only item has none, so
           it stays in the picture-choice direction whatever the linter says. */
        var flip = q.scene && (typeof CHIP !== 'undefined') && CHIP.optionAmbiguous &&
                   CHIP.optionAmbiguous(opts, q.la);
        if (flip) { askPicture(q, opts); } else { askWord(q, opts); }
      }
      ask();
    }
    card();
  }

  /* =================== FĀBULA: illustrated reading =================== */

  /* AUTOPLAY (DESIGN §4, brief §5): the story turns its own pages. The dwell
     is proportional to how much there is to read, TTS reads the page aloud
     when it is available, and the reader can always pause or step by hand.
     Timing constants live here so they are tunable in one place. */
  var FABULA_BASE_MS = 1500;      /* fixed pause per page */
  var FABULA_PER_WORD_MS = 420;   /* + this much per word */
  var FABULA_MIN_MS = 2600;
  var FABULA_MAX_MS = 11000;

  function dwellFor(text) {
    var words = String(text).replace(/^\s+|\s+$/g, '').split(/\s+/).length;
    var ms = FABULA_BASE_MS + words * FABULA_PER_WORD_MS;
    return Math.max(FABULA_MIN_MS, Math.min(FABULA_MAX_MS, ms));
  }

  /* BUG-3: `nova` IS OPTIONAL ON A STORY PAGE.
     content/README.md makes the key optional and the shipped regions use it
     that way — a page that introduces no new word simply omits it (r02 f4
     `Mūs timet…`, most of r03/r04, and every "memoriā tenē" page). The
     renderer used to read `line.nova.length` straight, so the FIRST such page
     threw TypeError mid-FĀBULA and left the reader on a dead screen with no
     way forward but the back arrow. Every read of nova goes through these two
     helpers now, so a missing key is a page without glosses, not a crash. */
  function novaOf(line) {
    return (line && line.nova) || [];
  }

  function glossesFor(line) {
    var nova = novaOf(line);
    var out = '', k, n;
    for (k = 0; k < nova.length; k++) {
      n = nova[k];
      out += '<li><strong>' + esc(n.w) + '</strong> <span class="g-emoji">' + (n.e || '') + '</span>' +
        (n.g ? ' <em>= ' + esc(n.g) + '</em>' : '') + '</li>';
    }
    return out;
  }

  /* ---- VERSE PAGES (GAUNTLET F5) ----
     A story page whose Latin carries ' / ' is not prose: the slash is the
     scholarly line-break of a QUOTED HEXAMETER, and every page that uses it
     is Vergil in his own metre. Run together as one paragraph the a48 proem
     read as seven clauses with four stray slashes in them — the one page the
     whole Aeneis track exists to arrive at, set as though the verse did not
     matter.

     Each segment becomes its own centred line instead. A long verse may still
     wrap inside its line (a hexameter does not fit a 375 px phone at reading
     size, and hanging the overflow is what print does too), so a page with
     more than four verses also steps the type down — seven verses at the
     prose size pushed the play controls below the fold, which is the same
     bug wearing a different hat.

     The SPEECH is untouched: verseOf() is display-only, `ttsText` (which the
     proem already ships, slash-free) still wins, and js/tts.js now drops any
     '/' that reaches it so no voice can read one as "slash". */
  function verseOf(la) {
    var s = String(la);
    if (s.indexOf(' / ') < 0) { return null; }
    return s.split(/\s*\/\s*/);
  }

  function storyTextHtml(la, sayBtn) {
    var verses = verseOf(la), out, k;
    if (!verses) {
      return '<p class="story-text">' + esc(la) + ' ' + sayBtn + '</p>';
    }
    out = '<p class="story-text verse' + (verses.length > 4 ? ' verse-many' : '') + '">';
    for (k = 0; k < verses.length; k++) {
      out += '<span class="versus">' + esc(verses[k]) +
             (k === verses.length - 1 ? ' ' + sayBtn : '') + '</span>';
    }
    return out + '</p>';
  }

  function runFabula(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var i = 0;
    /* `playing` persists across pages; `token` invalidates the timers of a
       page we have left (setScreen also clears them — belt and braces). */
    var playing = true;
    var token = 0;

    function page() {
      token++;
      var mine = token;
      if (i >= f.story.length) {
        finishStep(fi, 'fabula', DATA.XP.stepBonus);
        return;
      }
      var line = f.story[i];
      var glosses = glossesFor(line);
      /* in-card back: lets the reader re-read the previous story page without
         going all the way to home. Disabled (greyed) on the first page. */
      var backBtn = '<button id="prev" class="btn ghost small" type="button"' +
        (i === 0 ? ' disabled' : '') + '>◀ ' + esc(UI.retro) + '</button>';
      var soundOn = ttsWanted();
      var html = stepHeader(fi, 'fabula') +
        '<article class="story-page">' +
        '<figure class="scene">' + Scenes.render(line.scene) + '</figure>' +
        storyTextHtml(line.la,
          '<button type="button" id="say" class="speak" aria-label="audī">🔊</button>') +
        (glosses ? '<ul class="margo">' + glosses + '</ul>' : '') +
        '<div class="auto-row">' +
          '<button id="playpause" class="chip" type="button" aria-label="' +
            esc(playing ? UI.pausa : UI.curre) + '">' + (playing ? '⏸' : '▶') + '</button>' +
          '<span class="auto-bar"><span class="auto-bar-fill" id="autofill"></span></span>' +
          '<button id="mute" class="chip" type="button" aria-label="vōx">' +
            (soundOn ? '🔊' : '🔇') + '</button>' +
        '</div>' +
        '<p class="card-progress">' + (i + 1) + ' / ' + f.story.length + '</p>' +
        '<div class="nav-row">' + backBtn +
          '<button id="next" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button>' +
        '</div>' +
        '</article>';
      setScreen(html, 'fabula-screen');

      var spoken = line.ttsText || line.la;
      var speechDone = false;
      /* the page advances when BOTH the dwell has elapsed and the voice has
         finished — whichever is later — so a long sentence is never cut off */
      function maybeAdvance() {
        if (mine !== token || !playing) { return; }
        if (!dwellDone || (soundOn && !speechDone)) { return; }
        i++;
        page();
      }
      var dwellDone = false;

      if (soundOn) {
        Tts.speak(spoken, { onEnd: function () { speechDone = true; maybeAdvance(); } });
      } else {
        speechDone = true;
      }

      /* progress bar for the dwell, so the reader can see a page is about to
         turn instead of being surprised by it */
      var total = dwellFor(line.la);
      var started = nowMs();
      var fill = $('#autofill');
      var tick = window.setInterval(function () {
        if (mine !== token) { window.clearInterval(tick); return; }
        if (!playing) { return; }
        var frac = Math.min(1, (nowMs() - started) / total);
        if (fill) { fill.style.width = (frac * 100) + '%'; }
        if (frac >= 1) {
          window.clearInterval(tick);
          dwellDone = true;
          maybeAdvance();
        }
      }, 120);
      registerTimer(tick);

      function stopHere() { playing = false; }

      $('#say').addEventListener('click', function () { Tts.speak(spoken); });
      $('#playpause').addEventListener('click', function () {
        playing = !playing;
        var b = $('#playpause');
        b.textContent = playing ? '⏸' : '▶';
        b.setAttribute('aria-label', playing ? UI.pausa : UI.curre);
        if (!playing) { Tts.stop(); }
        else {
          /* resuming restarts this page's clock from now */
          started = nowMs();
          dwellDone = false;
        }
      });
      $('#mute').addEventListener('click', function () {
        setTtsWanted(!ttsWanted());
        Tts.stop();
        page();                 /* re-render this page with the new setting */
      });
      /* MANUAL CONTROLS ALWAYS WIN: stepping by hand stops the autoplay so
         the reader is not fighting the timer. */
      $('#next').addEventListener('click', function () { stopHere(); Tts.stop(); i++; page(); });
      if (i > 0) {
        $('#prev').addEventListener('click', function () { stopHere(); Tts.stop(); i--; page(); });
      }
    }
    page();
  }

  /* =================== SONUS: hear it, pick the picture =================== */

  /* Never a "speaker icon vs text" exercise — audio → IMAGE only (DESIGN §4).
     Without speech support the step passes with a visible notice and costs
     nothing: a browser limitation must not read as the learner's failure. */
  function runSonus(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var items = CONTENT.sonus(f);

    if (!Tts.available() || !items.length) {
      var html = stepHeader(fi, 'sonus') +
        '<section class="sine-sono">' +
          '<p class="mute-glyph">🔇</p>' +
          '<p class="notice">' + esc(UI.sineSono) + '</p>' +
          '<button id="skip" class="btn primary" type="button">' + esc(UI.sineSonoPerge) + ' ▶</button>' +
        '</section>';
      setScreen(html, 'sonus-screen');
      $('#skip').addEventListener('click', function () {
        /* complete, but claim NO xp for a step that was not actually done */
        finishStep(fi, 'sonus', 0,
          '<p class="notice small">' + esc(UI.sineSono) + '</p>', { noXP: true });
      });
      return;
    }

    var qi = 0;
    function ask() {
      if (qi >= items.length) {
        finishStep(fi, 'sonus', DATA.XP.stepBonus);
        return;
      }
      var q = items[qi];
      var opts = shuffle(q.options.slice());
      var html = stepHeader(fi, 'sonus') +
        '<section class="sonus">' +
        '<p class="ask">' + esc(UI.audiEtElige) + '</p>' +
        '<button type="button" id="say" class="big-speak" aria-label="' + esc(UI.audiIterum) + '">🔊</button>' +
        '<div class="opt-row picks">';
      var i;
      for (i = 0; i < opts.length; i++) {
        html += '<button type="button" class="opt emoji-opt" data-la="' + esc(opts[i].la) + '">' +
          visualFor(opts[i]) + '</button>';
      }
      html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + items.length + '</p></section>';
      setScreen(html, 'sonus-screen');

      var spoken = q.ttsText || q.la;
      Tts.speak(spoken);
      $('#say').addEventListener('click', function () { Tts.speak(spoken); });
      $all('.emoji-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.disabled) { return; }
          if (b.getAttribute('data-la') === (q.answer ? q.answer.la : q.la)) {
            toast(true);
            addXP(DATA.XP.perCorrect);
            qi++;
            window.setTimeout(ask, 450);
          } else {
            toast(false);
            b.disabled = true;
            if (!loseHeart()) { heartsOut(fi); }
          }
        });
      });
    }
    ask();
  }

  /* =================== LŪDUS: canvas game =================== */

  function runLudus(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var html = stepHeader(fi, 'ludus') +
      '<section class="ludus-wrap">' +
      '<p class="ask">' + esc(UI.cape) + ' ⬅ ➡</p>' +
      '<canvas id="game" aria-label="ludus"></canvas>' +
      '</section>';
    setScreen(html, 'ludus-screen');
    var cv = $('#game');
    Game.start(cv, f.ludus.words, 8, {
      onCorrect: function () { addXP(10); toast(true); },
      onWrong: function () {
        toast(false);
        if (!loseHeart()) { Game.abort(); }
      },
      onEnd: function (won, caught) {
        if (S.hearts <= 0) { heartsOut(fi); return; }
        if (won) {
          finishStep(fi, 'ludus', 20, '<p class="bonus">🦊 ' + caught + ' ✔</p>');
        } else {
          showHome();
        }
      }
    });
  }

  /* =================== AENIGMATA: memory match + scramble =================== */

  function runAenigmata(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    /* items: the author's override when present, else generated from the
       capitulum's vocab + story by the pipeline (content-loader.js). */
    var AE = CONTENT.aenigmata(f);

    /* --- phase 1: memory pairs ---
       EXPLOIT FIX: the old version paid +10 XP on every match with no penalty
       for wrong flips, so brute-force tapping was the optimal (and meaningless)
       strategy. Now:
         • a mismatch counter tracks every wrong pair of flips (visible);
         • a soft clock counts down (visible bar) — running out does NOT fail
           the round (keeps the natural-method gentleness) but forfeits the
           speed bonus;
         • XP is awarded ONCE, at the end, SCALED by mistakes + time. A clean,
           quick solve pays full; a brute-forced one pays almost nothing.
       No hearts are ever lost here. */
    function memory() {
      var pairCount = AE.pairs.length;
      var cards = [];
      var i;
      for (i = 0; i < pairCount; i++) {
        cards.push({ k: i, face: AE.pairs[i].la, kind: 'word' });
        cards.push({ k: i, face: visualFor(AE.pairs[i]), kind: 'pic' });
      }
      cards = shuffle(cards);

      /* soft clock: generous base + a little per pair. Tuned for 8-year-olds. */
      var clockMax = 12 + pairCount * 6;  /* e.g. 6 pairs → 48s */
      var clockLeft = clockMax;
      var mismatches = 0;
      var matched = 0;
      var finished = false;
      var clockTimer = null;

      var html = stepHeader(fi, 'aenigmata') +
        '<section class="memory">' +
        '<p class="ask">' + esc(UI.inveni) + '</p>' +
        '<div class="mem-meters">' +
          '<span class="mem-meter" id="mm-miss">❌ 0</span>' +
          '<span class="mem-clock"><span class="mem-clock-bar" id="mm-bar"></span></span>' +
        '</div>' +
        '<div class="mem-grid">';
      for (i = 0; i < cards.length; i++) {
        html += '<button type="button" class="mem-card" data-i="' + i + '"><span class="face"></span></button>';
      }
      html += '</div></section>';
      setScreen(html, 'aenigmata-screen');

      var barEl = $('#mm-bar');
      var missEl = $('#mm-miss');

      /* drive the soft clock; expiry just stops the bar, never fails */
      var tickStart = nowMs();
      clockTimer = window.setInterval(function () {
        var elapsed = (nowMs() - tickStart) / 1000;
        clockLeft = Math.max(0, clockMax - elapsed);
        var frac = clockLeft / clockMax;
        if (barEl) {
          barEl.style.width = (frac * 100) + '%';
          barEl.className = 'mem-clock-bar' + (frac < 0.25 ? ' low' : '');
        }
        if (clockLeft <= 0) { stopClock(); }
      }, 200);

      function stopClock() {
        if (clockTimer) { window.clearInterval(clockTimer); clockTimer = null; }
      }

      var openA = null, lockBoard = false;
      function setFace(btn, c) {
        var faceEl = $('.face', btn);
        if (c.kind === 'pic') { faceEl.innerHTML = c.face; }
        else { faceEl.textContent = c.face; }
      }
      function clearFace(btn) { $('.face', btn).innerHTML = ''; }

      function finish() {
        if (finished) { return; }
        finished = true;
        stopClock();
        /* SCALED XP: start from a base, subtract for each mismatch, bonus if
           the clock hadn't expired. Clamped so brute-force ≈ 0, clean ≈ full. */
        var base = 20;
        var perMiss = 4;
        var timeBonus = (clockLeft > 0) ? 10 : 0;
        var earned = Math.max(0, base - mismatches * perMiss) + timeBonus;
        /* perfect run flag for the finish screen */
        var perfect = (mismatches === 0 && clockLeft > 0);
        window.setTimeout(function () {
          scramblePhase(earned, perfect);
        }, 650);
      }

      $all('.mem-card').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (finished || lockBoard || btn.className.indexOf('flip') !== -1) { return; }
          var idx = parseInt(btn.getAttribute('data-i'), 10);
          var c = cards[idx];
          btn.className = 'mem-card flip ' + c.kind;
          setFace(btn, c);
          if (openA === null) {
            openA = { btn: btn, c: c };
            return;
          }
          if (openA.c.k === c.k && openA.btn !== btn) {
            /* match — no per-match XP anymore; reward is computed at the end */
            btn.className += ' hit';
            openA.btn.className += ' hit';
            openA = null;
            matched++;
            toast(true);
            if (matched === pairCount) { finish(); }
          } else {
            /* mismatch — count it, update the meter, flip both back */
            mismatches++;
            if (missEl) { missEl.textContent = '❌ ' + mismatches; }
            lockBoard = true;
            var a = openA;
            openA = null;
            window.setTimeout(function () {
              btn.className = 'mem-card';
              clearFace(btn);
              a.btn.className = 'mem-card';
              clearFace(a.btn);
              lockBoard = false;
            }, 750);
          }
        });
      });
    }

    /* --- phase 2: sentence scrambles ---
       receives the memory phase's scaled reward so it can be granted once the
       whole aenigmata step is genuinely finished (not on brute-force). */
    function scramblePhase(memoryXP, memoryPerfect) {
      /* bank the memory reward now that phase 1 is legitimately done */
      if (memoryXP && memoryXP > 0) { addXP(memoryXP); }
      var qi = 0;
      function ask() {
        if (qi >= AE.scrambles.length) {
          finishStep(fi, 'aenigmata', 20,
            memoryPerfect ? '<p class="bonus">🧠 ' + esc(UI.memoriaPerfecta) + '</p>' : '');
          return;
        }
        var item = AE.scrambles[qi];
        var words = item.la.split(' ');
        var chips = shuffle(words);
        if (chips.join(' ') === words.join(' ') && words.length > 1) { chips = chips.reverse(); }
        var built = [];

        var html = stepHeader(fi, 'aenigmata') +
          '<section class="scramble">' +
          '<p class="ask">' + esc(UI.ordina) + '</p>' +
          '<figure class="scene">' + Scenes.render(item.scene) + '</figure>' +
          '<p class="built" id="built">&nbsp;</p>' +
          '<div class="chip-row" id="chips">';
        var i;
        for (i = 0; i < chips.length; i++) {
          html += '<button type="button" class="opt chip-word" data-w="' + esc(chips[i]) + '">' + esc(chips[i]) + '</button>';
        }
        html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + AE.scrambles.length + '</p></section>';
        setScreen(html, 'aenigmata-screen');

        $all('.chip-word').forEach(function (b) {
          b.addEventListener('click', function () {
            if (b.disabled) { return; }
            b.disabled = true;
            built.push(b.getAttribute('data-w'));
            $('#built').textContent = built.join(' ');
            if (built.length === words.length) {
              if (built.join(' ') === words.join(' ')) {
                toast(true);
                addXP(10);
                qi++;
                window.setTimeout(ask, 600);
              } else {
                toast(false);
                if (!loseHeart()) { heartsOut(fi); return; }
                window.setTimeout(ask, 700); /* retry same item */
              }
            }
          });
        });
      }
      ask();
    }

    memory();
  }

  /* =================== CORRIGE: tap the wrong word, fix it =================== */

  function runCorrige(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var ITEMS = CONTENT.corrige(f);
    var qi = 0;

    function ask() {
      if (qi >= ITEMS.length) {
        finishStep(fi, 'corrige', 20);
        return;
      }
      var q = ITEMS[qi];
      var html = stepHeader(fi, 'corrige') +
        '<section class="corrige">' +
        '<p class="ask">' + esc(UI.tange) + ' 👆</p>' +
        '<figure class="scene">' + Scenes.render(q.scene) + '</figure>' +
        '<p class="sentence" id="sent">';
      var i;
      for (i = 0; i < q.words.length; i++) {
        html += '<button type="button" class="word" data-i="' + i + '">' + esc(q.words[i]) + '</button> ';
      }
      html += '</p><div class="opt-row" id="fixes" hidden></div>' +
        '<p class="card-progress">' + (qi + 1) + ' / ' + ITEMS.length + '</p></section>';
      setScreen(html, 'corrige-screen');

      $all('.word').forEach(function (b) {
        b.addEventListener('click', function () {
          var i2 = parseInt(b.getAttribute('data-i'), 10);
          if (i2 === q.wrong) {
            b.className = 'word found';
            toast(true);
            showFixes(b, q);
          } else {
            toast(false);
            b.disabled = true;
            if (!loseHeart()) { heartsOut(fi); }
          }
        });
      });

      function showFixes(wordBtn, q2) {
        var box = $('#fixes');
        box.hidden = false;
        box.innerHTML = '';
        var opts = shuffle(q2.options.map(function (o, oi) { return { o: o, oi: oi }; }));
        var i3;
        for (i3 = 0; i3 < opts.length; i3++) {
          (function (opt) {
            var ob = document.createElement('button');
            ob.type = 'button';
            ob.className = 'opt';
            ob.textContent = opt.o;
            ob.addEventListener('click', function () {
              if (opt.oi === q2.correct) {
                wordBtn.textContent = opt.o;
                wordBtn.className = 'word fixed';
                toast(true);
                addXP(10);
                qi++;
                window.setTimeout(ask, 650);
              } else {
                toast(false);
                ob.disabled = true;
                if (!loseHeart()) { heartsOut(fi); }
              }
            });
            box.appendChild(ob);
          })(opts[i3]);
        }
      }
    }
    ask();
  }

  /* =================== COMPLĒ: complete the sentence ===================
     ORDER IS FREE (DESIGN §4, LATIN-STYLE §2). The learner taps words into
     the blanks; the validator in content-loader.js accepts ANY order of the
     chosen words unless the item declares a constraint (a preposition must
     stay glued to its noun, an enclitic -que cannot open the sequence…).
     Teaching one fixed order would teach a lie about Latin.
     Tapping a filled blank takes the word back out. */

  /* punctuation that must never be left floating after a blank. Latin
     needs no more than these: the corpus writes . ! ? , ; : and the
     closing quote. tests/regression.html lifts joinTerminal() out of this
     file by source, the way it already lifts novaOf/glossesFor. */
  var TERMINAL = /^[.,!?;:»”)]/;

  /* the sentence-splitting half of GAUNTLET F4, as a pure function a
     regression row can call: which parts get the tight class. */
  function joinTerminal(text) {
    var parts = String(text).split('___'), out = [], i;
    for (i = 0; i < parts.length; i++) {
      out.push({ text: parts[i], tight: (i > 0 && TERMINAL.test(parts[i])) });
    }
    return out;
  }

  function runComple(fi) {
    renderTopbar(true);
    var f = capAt(fi);
    var ITEMS = CONTENT.comple(f);
    var qi = 0;

    function ask() {
      if (qi >= ITEMS.length) {
        /* finishing the last step of the last capitulum = grand finale */
        var lastCap = (fi === caps().length - 1);
        finishStep(fi, 'comple', DATA.XP.stepBonus,
          lastCap && allDoneAfter(fi) ? '<p class="bonus">👑 ' + esc(UI.finis) + ' 👑</p>' : '');
        return;
      }
      var q = ITEMS[qi];
      /* ONE splitter, not two. joinTerminal() decides both how the sentence
         breaks around its gaps and which pieces are punctuation that must be
         pulled back against the blank before them; this loop only writes the
         markup. The condition lived here as well until the regression row for
         GAUNTLET F4 proved the copy could rot while the row stayed green. */
      var parts = joinTerminal(q.text);
      var slots = parts.length - 1;              /* how many blanks to fill */
      var filled = [];                           /* words tapped, in tap order */

      /* sentence with one <span class="blank"> per ___
         A blank carries 0.2rem of margin and 0.4rem of padding on each
         side, which is right between two words and wrong before a full
         stop: a sentence-final gap set as 'Aegyptō ____ .', with the
         period adrift (GAUNTLET F4). Punctuation that immediately follows
         a blank is therefore marked `.post-blank` and pulled back against
         it — the blank's own trailing space, no more. Nothing else in the
         sentence changes, so every gap mid-sentence is untouched. */
      var sent = '', i, part;
      for (i = 0; i < parts.length; i++) {
        part = parts[i].text;
        if (parts[i].tight) {
          sent += '<span class="post-blank">' + esc(part.charAt(0)) + '</span>' +
                  '<span>' + esc(part.slice(1)) + '</span>';
        } else {
          sent += '<span>' + esc(part) + '</span>';
        }
        if (i < slots) {
          sent += '<button type="button" class="blank slot" data-slot="' + i + '">___</button>';
        }
      }

      var html = stepHeader(fi, 'comple') +
        '<section class="comple">' +
        '<figure class="scene">' + Scenes.render(q.scene) + '</figure>' +
        '<p class="ask">' + esc(UI.compleAsk) + '</p>' +
        '<p class="sentence">' + sent + '</p>' +
        '<div class="opt-row" id="chips">';
      var opts = shuffle(q.options.map(function (o, oi) { return { o: o, oi: oi }; }));
      for (i = 0; i < opts.length; i++) {
        html += '<button type="button" class="opt chip-word" data-oi="' + opts[i].oi +
          '" data-w="' + esc(opts[i].o) + '">' + esc(opts[i].o) + '</button>';
      }
      html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + ITEMS.length + '</p></section>';
      setScreen(html, 'comple-screen');

      var slotEls = $all('.slot');
      var chipEls = $all('.chip-word');

      function paint() {
        var k;
        for (k = 0; k < slotEls.length; k++) {
          if (k < filled.length) {
            slotEls[k].textContent = filled[k].w;
            slotEls[k].className = 'blank slot taken';
          } else {
            slotEls[k].textContent = '___';
            slotEls[k].className = 'blank slot';
          }
        }
      }

      function judge() {
        var words = filled.map(function (x) { return x.w; });
        if (CONTENT.checkComple(q, words)) {
          for (var k = 0; k < slotEls.length; k++) { slotEls[k].className = 'blank slot filled'; }
          toast(true);
          addXP(DATA.XP.perCorrect);
          qi++;
          window.setTimeout(ask, 650);
          return;
        }
        toast(false);
        if (!loseHeart()) { heartsOut(fi); return; }
        /* wrong combination: hand every word back and let them try again */
        window.setTimeout(function () {
          var k;
          for (k = 0; k < filled.length; k++) { filled[k].el.disabled = false; }
          filled = [];
          paint();
        }, 700);
      }

      chipEls.forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.disabled || filled.length >= slots) { return; }
          b.disabled = true;
          filled.push({ w: b.getAttribute('data-w'), el: b });
          paint();
          if (filled.length === slots) { window.setTimeout(judge, 200); }
        });
      });

      /* tap a filled blank to take that word back (only before judging) */
      slotEls.forEach(function (el) {
        el.addEventListener('click', function () {
          var k = parseInt(el.getAttribute('data-slot'), 10);
          if (k >= filled.length || filled.length === slots) { return; }
          filled[k].el.disabled = false;
          filled.splice(k, 1);
          paint();
        });
      });
    }

    /* every OTHER capitulum done, and every step of this one but comple */
    function allDoneAfter(fi2) {
      var i;
      for (i = 0; i < caps().length; i++) {
        if (i === fi2) { continue; }
        if (!fableDone(i)) { return false; }
      }
      var f2 = capAt(fi2), st = stepsOf(fi2), j;
      for (j = 0; j < st.length; j++) {
        if (st[j] === 'comple') { continue; }
        if (!isStepDone(f2.id, st[j])) { return false; }
      }
      return true;
    }

    ask();
  }

  /* =================== step registry ===================
     Filled after every runner is defined; startStep() looks step ids up here
     so the step LIST can come from content without touching the router. */
  RUNNERS.verba = runVerba;
  RUNNERS.fabula = runFabula;
  RUNNERS.sonus = runSonus;
  RUNNERS.ludus = runLudus;
  RUNNERS.aenigmata = runAenigmata;
  RUNNERS.corrige = runCorrige;
  RUNNERS.comple = runComple;

  /* =================== track / region navigation =================== */

  /* Open a region: make sure its content file is in memory (content-loader
     injects the <script> exactly once), point CUR at it, then run `then`.
     A missing/broken content file must never leave the learner on a blank
     screen — we say so in Latin and offer the way back. */
  function openRegion(trackId, regionId, then) {
    var have = CONTENT.region(trackId, regionId);
    if (have) {
      CUR.trackId = trackId; CUR.regionId = regionId; CUR.region = have;
      then();
      return;
    }
    showLoading();
    CONTENT.loadRegion(trackId, regionId, function (err, reg) {
      if (err || !reg) {
        if (window.console) { console.error('[app] region load failed', err); }
        showContentError();
        return;
      }
      CUR.trackId = trackId; CUR.regionId = regionId; CUR.region = reg;
      then();
    });
  }

  /* Open a track. Tracks with no region yet show the "MOX — in fabricā"
     screen instead of a dead door.

     NAV: the door used to always land on region ONE, which is half of why
     a learner who had cleared six regions was stuck looking at Silva. It
     now RESUMES: whichever region the saved map node belongs to, provided
     that node is actually reachable (a mapNode from a stale or hand-edited
     save must not open a region the learner has not earned). The board
     shows the whole track either way — this only decides which region's
     content file is loaded, and therefore which region the Cursus button
     and the step engines are pointed at. */
  function openTrack(trackId, then) {
    var regionId = CONTENT.firstRegionId(trackId);
    if (!regionId) { showMox(trackId); return; }
    var loc = CONTENT.locate ? CONTENT.locate(S && S.mapNode) : null;
    if (loc && loc.track === trackId && nodeReachable(loc)) { regionId = loc.region; }
    openRegion(trackId, regionId, then || function () { showMap(); });
  }

  /* is the node this location describes one the learner may stand on? */
  function nodeReachable(loc) {
    if (loc.kind === 'boss') { return regionCapsDoneIn(loc.track, loc.region); }
    var e = CONTENT.regionEntry(loc.track, loc.region);
    var caps = (e && e.capitula) ? e.capitula : [];
    var id = caps[loc.indexInRegion];
    return id ? capUnlockedById(id) : false;
  }

  function showLoading() {
    setScreen('<section class="splash"><figure class="mascot">' +
      Scenes.mascot(120, S && S.avatar) + '</figure><p class="tagline">…</p></section>',
      'loading-screen');
  }

  function showContentError() {
    renderTopbar(false);
    setScreen('<section class="finis">' +
      '<p class="euge">' + esc(DATA.MAP_UI.gateLocked) + '</p>' +
      '<button id="back" class="btn primary" type="button">' + esc(UI.domus) + '</button>' +
      '</section>', 'finis-screen');
    $('#back').addEventListener('click', showDoors);
  }

  /* =================== boot =================== */

  /* called once a student is authenticated (login/register/session-restore).
     student = {id, displayName, nickname, avatar}; snapshot = server progress */
  function onAuthed(student, snapshot) {
    S = Storage.load();              /* start from the offline cache shell */
    S.name = student.nickname || student.displayName || '';
    /* the PUBLIC identity, ASCII-only by server policy — kept separately so a
       board row can be matched to "me" even when the display name differs */
    S.nickname = student.nickname || '';
    S.avatar = student.avatar || 'fox';
    Storage.reconcile(S, snapshot);  /* server truth wins */
    offerLegacyImport(function () { showDoors(); });
  }

  /* one-time: if an old local-only save exists with progress the server doesn't
     have yet, offer to import it. For Phase 1 we keep this minimal: if the
     legacy save has any completed steps and the server has none, push them. */
  function offerLegacyImport(done) {
    var legacy = Storage.legacySave();
    var hasLegacy = legacy && legacy.completed && Object.keys(legacy.completed).length > 0;
    var serverEmpty = !S.completed || Object.keys(S.completed).length === 0;
    if (!hasLegacy || !serverEmpty || typeof Api === 'undefined') { done(); return; }

    /* replay each completed step to the server (idempotent), then clear legacy */
    var calls = [];
    var fid, step;
    for (fid in legacy.completed) {
      if (!legacy.completed.hasOwnProperty(fid)) { continue; }
      for (step in legacy.completed[fid]) {
        if (legacy.completed[fid][step]) { calls.push({ f: fid, s: step }); }
      }
    }
    var i = 0;
    function next() {
      if (i >= calls.length) {
        Storage.clearLegacy();
        /* refresh snapshot once after import */
        Api.me(function (err, data) {
          if (!err && data && data.snapshot) { Storage.reconcile(S, data.snapshot); }
          done();
        });
        return;
      }
      var c = calls[i++];
      Api.completeStep(c.f, c.s, 0, function () { next(); });
    }
    next();
  }

  function init() {
    app = $('#app');
    S = Storage.load();
    /* loading shell while we ask the server who we are */
    $('#topbar').innerHTML = '';
    showLoading();

    if (typeof Api === 'undefined') {
      /* no backend present (e.g. opened as bare files): fall back to local-only */
      if (S.name) { showDoors(); }
      else { showSplash(); }
      return;
    }
    /* try an existing session / remember-me cookie */
    Api.me(function (err, data) {
      if (!err && data && data.ok) {
        Api.setCsrf(data.csrf);
        onAuthed(data.student, data.snapshot);
      } else {
        showLanding();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
