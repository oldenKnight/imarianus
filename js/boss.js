/* ============================================================
   boss.js — BOSS ENGINE (ES5, Canvas 2D) · M3 phase engine
   ------------------------------------------------------------
   WHAT THIS FILE IS NOW
   The boss fight is no longer one hard-coded minigame. It is a
   small ENGINE plus a REGISTRY of phase types (brief §4,
   DESIGN §6). The engine owns everything the whole duel shares:

       canvas / ctx / layout        the master clock and the
       input (arrows + pointer X)   result payload
       the hero the player steers   the HP pool
       the foe sprite               the HUD (bars + phase pips)
       the interstitial "roar"      the sprite caches

   A PHASE owns only its own game: it gets an `env` handle and
   implements four methods.

       Boss.registerPhase('caterva', {
         titulus: 'CATERVA',           // shown on the title card
         init: function (env, cfg) {}, // cfg = the content's phase entry
         update: function (dt) {},     // seconds since last frame
         draw: function () {},         // paint the play field
         backdrop: function () {},     // OPTIONAL: replaces the default sky
         teardown: function () {}      // drop references, stop sounds
       });

   The three Fabulae phases live in js/boss-phases.js. The
   non-combat PROBATIO trials (Historia Sacra, Aeneis) live in
   js/probatio.js and run on a SECOND INSTANCE of this same
   engine, built with Boss.createEngine({foe:false}) — which is
   why the engine is a factory and not a singleton.

   CONFIG (from content/<track>-<region>.js, see content/README §4)
       {
         words:     [vocab items with emoji/scene]  (required)
         region:    'region1'      progress id, copied into the payload
         regionIndex: 0            difficulty scaling input
         capitula:  [...]          story pages, for clamor's sentences
         name:      'Lupus', actor: 'wolf'
         phases:    [{type,hp,seconds,...}, ...]
         hp: 6, seconds: 45        LEGACY: used when `phases` is absent
       }

   SCREEN-ONLY KEYS ON THE SAME `boss` OBJECT. content/<track>-<region>.js
   writes ONE boss object, and app.js reads several fields off it that the
   engine never sees — they decorate the screens around the fight, not the
   fight. They are listed here because this comment is where an author looks
   for "what may a boss declare?":

       kind: 'probatio'   run the trial engine instead of the duel
       bg / sceneY / sceneScale / pose / fightPose / calmPose
                          how the intro and defeat frames draw the actor
                          (sceneScale absent ⇒ app.js derives one from the
                          actor's own height, so the frame is filled)
       headerText / vinceText
                          the line above the canvas and on the intro card
       postWin            OPTIONAL one-line Latin coda shown UNDER the
                          standard victory text when the region is fully
                          cleared — e.g. r12's 'Lupus līber discēdit.'
                          Content only: nothing generates it, and an absent
                          key draws nothing.

   BACKWARD COMPATIBILITY: a config with NO `phases` field runs one
   caterva phase with the ORIGINAL v1 tuning. content/fabulae-r02.js
   and any older caller therefore keeps working untouched.

   RESULT PAYLOAD (brief §4/§7, consumed by api/boss_result.php)
       { region, ms, mistakes, phases: [{type, ms, mistakes, hpDealt}] }
   handed to onEnd(won, payload) as the SECOND argument, so the old
   onEnd(won) callers keep working.

   SWAP NOTE: start / stop / abort are unchanged, so app.js's single
   dispatch line (runBossFight) is still the only swap point.
   ============================================================ */
var Boss = (function () {
  'use strict';

  /* ================= helpers shared by every engine instance ================= */

  /* FIX-1b: the ONLY safe test before drawImage(). .complete is TRUE for a
     FAILED image; only naturalWidth reveals the broken state, and drawImage on
     a broken image throws InvalidStateError. Every drawImage goes through it. */
  function imgReady(img) {
    return !!(img && img.complete && img.naturalWidth > 0);
  }

  /* one clock source for both the frame delta and the elapsed-time metric */
  function now() {
    return (window.performance && window.performance.now)
      ? window.performance.now() : new Date().getTime();
  }

  /* reuse the ludus beeper when it is loaded; silence is an acceptable
     degradation, never an error. */
  function beep(freq, dur, type) {
    if (window.Game && Game.beep) { Game.beep(freq, dur, type); }
  }

  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  function shuffled(arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ============================================================
     createEngine(opts) — one independent fight engine.

     opts.label    'boss' | 'probatio' — only used in console messages
     opts.foe      true  = there is an enemy: sprite in mid-arena, an HP bar
                           labelled with opts.foeIcon, and a ROARING
                           interstitial (shake + growl).
                   false = a trial: no enemy sprite, the right-hand bar is a
                           "tasks remaining" meter and the interstitial is a
                           calm title card. This is the whole difference
                           between a Fabulae duel and a Historia probatio.
     opts.foeIcon  glyph drawn beside the right-hand bar
     opts.heroActor which mascot the player steers (default: the app mascot)
     ============================================================ */
  function createEngine(engineOpts) {
    engineOpts = engineOpts || {};
    var LABEL = engineOpts.label || 'boss';
    var HAS_FOE = engineOpts.foe !== false;
    /* The HUD glyph beside the right-hand bar. It is a CROWN, not a wolf:
       Regiō II's boss is a Leō and Regiō V's is the wolf again, so the icon
       has to mean "the boss" rather than name one animal. A fight may still
       override it with cfg.hudIcon. */
    var FOE_ICON = engineOpts.foeIcon || (HAS_FOE ? '👑' : '📜');

    /* ---------- the frame source ----------
       The loop is driven by requestAnimationFrame, which is the right clock
       for a game: it syncs to the display and stops in a hidden tab.

       It is, however, unusable from a test runner. Headless Chrome has no
       display to sync to and produces roughly ONE frame per second, so an
       rAF-driven fight makes no measurable progress there — every timing
       assertion in tests/regression.html would hang rather than fail, which
       is the worst possible outcome for a regression page.

       So the pair is swappable. Production never touches it; the harness
       installs a setTimeout-based source and gets a deterministic loop. */
    var reqFrame = function (fn) { return window.requestAnimationFrame(fn); };
    var cancelFrame = function (id) { window.cancelAnimationFrame(id); };
    function setFrameSource(request, cancel) {
      reqFrame = request || function (fn) { return window.requestAnimationFrame(fn); };
      cancelFrame = cancel || function (id) { window.cancelAnimationFrame(id); };
    }

    /* ---------- the phase registry ---------- */
    var PHASES = {};

    /* registerPhase(type, impl) → true when the implementation is usable.
       The three method checks are not ceremony: a phase missing draw() would
       otherwise fail once per frame inside the loop's try/catch, i.e. it would
       "work" as an invisible phase that can never be cleared. */
    function registerPhase(type, phaseImpl) {
      if (!type || !phaseImpl) { return false; }
      if (typeof phaseImpl.init !== 'function' ||
          typeof phaseImpl.update !== 'function' ||
          typeof phaseImpl.draw !== 'function') {
        if (window.console) { console.error('[' + LABEL + '] bad phase ' + type); }
        return false;
      }
      PHASES[type] = phaseImpl;
      return true;
    }

    /* ---------- geometry (one canvas size, scaled by CSS) ---------- */
    var W = 480, H = 460;
    var GROUND = 40;                 /* height of the earth band at the foot */
    var BAR_Y = 8, BAR_H = 16;       /* the HUD bars live in the very top band */
    var TOP = 30;                    /* phases may draw their banner from here */
    var FIELD = 252;                 /* top of the play field                  */
    var CATCH = H - GROUND - 55;     /* y where the hero can catch an item     */
    var HERO_Y = H - GROUND - 78;    /* top of the 80px hero sprite            */
    var FOE_TOP = 96, FOE_SIZE = 152;

    /* ============================================================
       GAP: THE ARENA TILE, MEASURED IN THE UNIT THAT MATTERS
       ------------------------------------------------------------
       The canvas is 480 units wide and CSS-scaled to fit the column. On a
       375 px phone the screen column is 343 CSS px, so ONE canvas unit is
       0.715 CSS px — and the phases' hard-coded 54/56/58 units landed as
       thirty-nine to forty-one CSS PIXELS of picture, held at arm's length by
       a child. js/game.js already fixed exactly this for the lūdus by sizing
       its tile in CSS px and converting back; this is that same conversion,
       moved into the engine so all six phases (three duel, three trial) get
       it from one place instead of six literals.

       TWO NUMBERS, and both are load-bearing.

       tile(base)     the drawn size. `base` is the phase's own historical
                      literal, so caterva stays a shade bigger than fuga and
                      clāmor a shade bigger than both; the SCALE is shared.
       catchX(base)   the catch half-width. It has to move WITH the tile or
                      the picture overhangs a catch line that did not grow,
                      and the learner watches a tile pass through the fox.
                      It moves by HALF the tile's growth: a catch that grew
                      one-for-one would make every phase measurably easier,
                      and — see the clāmor note below — would leave the
                      player nowhere safe to stand.

       THE CEILING IS A GAMEPLAY LIMIT, NOT A TASTE ONE. caterva puts up to
       SIX items in the air at region IX+. Six tiles of 56 × 1.40 = 470 of
       the field's 480 units: at that scale the arena can still lay its own
       maximum spawn out side by side, and one notch wider it cannot. The
       floor is 1 — desktop, where the canvas is already 1:1, keeps exactly
       the game that shipped. */
    var TILE_TARGET_CSS = 50;   /* CSS px of art we are aiming to put on screen */
    var TILE_BASE = 56;         /* the historical caterva tile, in canvas units */
    var TILE_MAX_K = 1.40;      /* 6 × 56 × 1.40 = 470 of 480 units             */
    var tileK = 1;              /* the live scale factor                        */
    var tileTimer = 0;          /* seconds until it is re-measured              */

    function measureTileK() {
      var cssW = 0;
      try { cssW = canvas.getBoundingClientRect().width; } catch (e) { cssW = 0; }
      if (!cssW) { cssW = W; }
      /* ceil on the UNITS, not on the ratio: 50 CSS px is a FLOOR, and
         rounding 69.97 down to 69 lands at 49.3 — a floor that is not one. */
      var units = Math.ceil(TILE_TARGET_CSS * (W / cssW));
      return Math.max(1, Math.min(TILE_MAX_K, units / TILE_BASE));
    }

    /* THE SCALE IS ADDITIVE, NOT PROPORTIONAL, and that is deliberate. The
       three bases differ by two units apiece — clāmor 58, caterva 56, fuga 54
       — and those two units are a deliberate hierarchy between rounds, not a
       proportion of anything. Multiplying them all by 1.25 would stretch the
       gap to 2.5 and push clāmor past the top of the 48–52 CSS px band while
       fuga sat at its floor; growing the ANCHOR and carrying the offset keeps
       all three inside the band and keeps the hierarchy exactly as authored.
       Integers, so Scenes.drawTile's raster cache keeps two or three keys
       instead of one per frame of a resize. */
    function tileSize(base) {
      base = (typeof base === 'number') ? base : TILE_BASE;
      return Math.round(TILE_BASE * tileK) + (base - TILE_BASE);
    }
    /* half the tile's growth; see the comment above. */
    function catchHalf(base) {
      base = base || 42;
      return Math.round(base * (1 + (tileK - 1) * 0.5));
    }
    /* the margin that keeps a whole tile inside the field, so a bigger tile
       narrows the spawn range instead of hanging off an edge. */
    function spawnMargin(base) {
      return tileSize(base) / 2 + 2;
    }

    /* ---------- run state ---------- */
    var canvas = null, ctx = null, raf = null, running = false;
    var cfg = null, cb = {};
    var plan = [];            /* normalised phase configs                     */
    var idx = -1;             /* index of the phase currently running         */
    var impl = null;          /* its implementation object (null = none)      */
    var pending = 0;          /* phase index waiting behind an interstitial   */
    var log = [];             /* result rows, one per phase attempted         */
    var hpMax = 0, hpLeft = 0, phaseHp = 0, phaseHpDealt = 0;
    var mistakes = 0, phaseMistakes = 0;
    var startedAt = 0, phaseStartedAt = 0;
    var timeLeft = 0, timeMax = 0;
    var lastTime = 0;
    var inter = 0, interMax = 0, interTitle = '', interSub = '';
    var flash = null;         /* {color, t} full-canvas feedback tint          */
    var foeHurt = 0;          /* >0 = the foe shakes and dims                  */
    var env = null;

    /* ---------- sprites ---------- */
    var heroImg = null, foeImg = null;

    /* LUDUS: the three picture helpers below MOVED to js/scenes.js and are now
       thin delegations. They kept their names because they are published on
       every phase's `env` (see buildEnv) and a dozen phases call them; what
       changed is that js/game.js — the lūdus minigame, which had its own
       whole-scene raster path — now calls the SAME functions through
       Scenes.tileImage, so the crop rule cannot drift between the boss tiles
       and the falling items of the minigame. The caches moved with them, which
       also fixed a latent key collision: they were keyed on `word.la`, and two
       regions can spell the same Latin word over different artwork. */

    /* `px` is the RASTER size, not the draw size. A 60 px image blown up to
       fill a 76 px banner slot is the blur that made the clamor thumbnail
       unreadable, so a caller that draws bigger must ask for bigger. */
    function sceneImage(word, px) {
      return Scenes.sceneImage(word, px);
    }

    /* ---------- POLISH: the tile picture ----------
       A vocab item's `scene` is a 400x240 stage: sky, ground, and the animal
       standing somewhere on it. Squeezed into a 52px tile that is mostly sky
       and grass, and the animal itself is about 14px across — which is why
       ordina's `ovis` and `capra` tiles were the same beige smudge.

       When the scene is ONE actor on a background, the background is only
       staging and the actor is the whole meaning, so we can draw the actor
       through Scenes.sprite() instead: a tight, transparent crop of just the
       artwork, exactly what the map's zone figurines use. The tile's own
       parchment face is the background it needed. Anything else — two or more
       actors, or an actor the art library does not have — still goes through
       the scene raster, because there the composition IS the meaning
       (`mare` is two fish IN water; cropping one fish would lie).

       Returns null when the item has no picture at all; drawTile then falls
       back to the emoji and finally to the word itself. */
    function soloActorOf(word) {
      return Scenes.soloActorOf(word);
    }

    /* the picture for a tile, at the raster size it will actually be drawn */
    function tileImage(word, px) {
      return Scenes.tileImage(word, px);
    }

    /* a transparent single-actor sprite, cached. BUG-2: never a whole scene
       squeezed into a square — that painted an opaque sky over the arena. */
    function actorImage(name, opts, px) {
      return Scenes.actorImage(name, opts, px);
    }

    /* ---------- input (keyboard arrows + pointer/touch X) ----------
       Touch is the PRIMARY input for the owner's students (brief §4), so the
       pointer wins whenever it moves and the keys take over the moment one is
       pressed. Both are captured by the engine, never by a phase. */
    var keys = {};
    var pointerX = null;
    var hero = { x: W / 2, speed: 330, hidden: false };

    function onKeyDown(e) {
      keys[e.keyCode] = true;
      if (e.keyCode === 37 || e.keyCode === 39) { e.preventDefault(); }
    }
    function onKeyUp(e) { keys[e.keyCode] = false; }
    function canvasX(clientX) {
      var r = canvas.getBoundingClientRect();
      return (clientX - r.left) * (W / r.width);
    }
    function onMouseMove(e) { pointerX = canvasX(e.clientX); }
    function onTouchMove(e) {
      if (e.touches && e.touches.length) {
        pointerX = canvasX(e.touches[0].clientX);
        e.preventDefault();
      }
    }

    function moveHero(dt) {
      var v = hero.speed;
      if (keys[37]) { hero.x -= v * dt; pointerX = null; }
      if (keys[39]) { hero.x += v * dt; pointerX = null; }
      if (pointerX !== null) {
        var d = pointerX - hero.x;
        hero.x += Math.max(-v * dt, Math.min(v * dt, d));
      }
      hero.x = Math.max(35, Math.min(W - 35, hero.x));
    }

    /* ---------- the foe (owned here, ANIMATED by phases) ----------
       A phase that wants the wolf to charge (fuga) writes foe.x / foe.y /
       foe.scale and the engine keeps drawing it. Keeping the sprite itself in
       the engine is what lets every phase share one cached image and one
       hit-flash convention. */
    var foe = {
      x: W / 2, y: FOE_TOP, size: FOE_SIZE, scale: 1, hidden: false, flip: false
    };
    function resetFoe() {
      foe.x = W / 2; foe.y = FOE_TOP; foe.size = FOE_SIZE;
      foe.scale = 1; foe.hidden = false; foe.flip = false;
    }

    /* ============================================================
       the env handed to every phase
       ============================================================ */
    function buildEnv() {
      return {
        /* canvas + geometry */
        ctx: ctx, W: W, H: H,
        GROUND: GROUND, TOP: TOP, FIELD: FIELD, CATCH: CATCH, HERO_Y: HERO_Y,

        /* content */
        words: [],            /* vocab items that actually have a picture */
        capitula: [],         /* the region's capitula, for clamor sentences */
        config: null,         /* the whole boss config, for authored items */
        regionIndex: 0,       /* difficulty scaling input (0 = first region) */

        /* the player */
        hero: hero,
        foe: foe,

        /* effects the phases are allowed to cause */
        damage: damage,
        addMistake: addMistake,
        penalty: penalty,
        flash: doFlash,
        playSfx: playSfx,
        speak: speak,

        /* drawing helpers so every phase looks like the same game */
        imgReady: imgReady,
        sceneImage: sceneImage,
        actorImage: actorImage,
        tileImage: tileImage,   /* the two above, chosen by the tile rule */
        roundRect: roundRect,
        drawTile: drawTile,
        drawBanner: drawBanner,
        wrapText: wrapText,
        shuffled: shuffled,

        /* GAP: the arena's live tile geometry. A phase asks for its own
           historical base and gets it scaled to the screen; nothing below
           may hard-code a tile size or a catch radius again. */
        tile: tileSize,
        catchX: catchHalf,
        spawnMargin: spawnMargin,

        /* read-only clock, for phases that want to show their own countdown */
        timeLeft: function () { return timeLeft; },
        timeMax: function () { return timeMax; }
      };
    }

    /* ---------- effects ---------- */

    /* deal n damage to the shared HP pool. When the CURRENT PHASE's allotment
       is exhausted the phase is over — the pool keeps draining across phases
       (brief §4), so a phase never "heals" the foe back up. */
    function damage(n) {
      n = n || 1;
      hpLeft = Math.max(0, hpLeft - n);
      phaseHp -= n;
      phaseHpDealt += n;
      foeHurt = 0.4;
      doFlash('rgba(127,176,105,0.30)', 0.28);
      playSfx('hit');
      if (cb.onHit) { cb.onHit(hpLeft, hpMax); }
      if (phaseHp <= 0) { finishPhase(true); }
    }

    function addMistake(n) {
      n = (typeof n === 'number') ? n : 1;
      mistakes += n;
      phaseMistakes += n;
      if (cb.onMiss) { cb.onMiss(); }
    }

    /* take seconds off the phase clock. The clock check in update() turns a
       clock that reaches zero into a defeat on the NEXT frame, so a penalty
       never ends a phase from inside a phase's own update(). */
    function penalty(seconds) {
      timeLeft = Math.max(0, timeLeft - (seconds || 0));
    }

    function doFlash(color, t) { flash = { color: color, t: t || 0.3 }; }

    /* one named sound vocabulary for every phase, so a new phase cannot
       invent its own idea of what "wrong" sounds like. */
    function playSfx(name) {
      if (name === 'hit') { beep(660, 0.12, 'sine'); beep(880, 0.16, 'sine'); }
      else if (name === 'miss') { beep(150, 0.28, 'square'); }
      else if (name === 'roar') { beep(110, 0.42, 'sawtooth'); beep(80, 0.5, 'square'); }
      else if (name === 'dodge') { beep(420, 0.09, 'triangle'); }
      else if (name === 'tick') { beep(520, 0.06, 'sine'); }
      else if (name === 'win') { beep(660, 0.12, 'sine'); beep(990, 0.22, 'sine'); }
    }

    /* TTS is optional everywhere in this app (DESIGN §5): a browser without
       speech support must never block a phase. */
    function speak(text) {
      if (window.Tts && Tts.available && Tts.available()) {
        try { Tts.speak(text); } catch (e) { /* speech is decoration */ }
      }
    }

    /* ============================================================
       drawing helpers
       ============================================================ */

    function roundRect(x, y, w, h, r) {
      if (w < 2 * r) { r = w / 2; }
      if (h < 2 * r) { r = h / 2; }
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    /* a drifting/falling item: parchment tile + the word's picture. Every
       phase draws its catchables through this, which is what makes caterva,
       clamor and fuga read as three rounds of ONE game — and, since the
       LUDUS pass, the lūdus fox-catcher too: the painter itself now lives in
       js/scenes.js beside the crop rule it uses, so the minigame and the duel
       cannot drift into two different-looking tiles. This wrapper only feeds
       it this engine instance's ctx, so the env.drawTile(word, x, y, size,
       opts) signature every phase calls is unchanged. */
    function drawTile(word, cx, cy, size, opts) {
      Scenes.drawTile(ctx, word, cx, cy, size, opts);
    }

    /* the dark banner every phase writes its prompt into */
    function drawBanner(x, y, w, h) {
      ctx.fillStyle = 'rgba(58,36,23,0.90)';
      roundRect(x, y, w, h, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(224,169,62,0.55)';
      ctx.lineWidth = 2;
      roundRect(x + 3, y + 3, w - 6, h - 6, 9);
      ctx.stroke();
    }

    /* greedy word wrap against a pixel width; the caller has already set the
       font. Returns an array of lines. Latin sentences are short, so a greedy
       fit is indistinguishable from a good one here. */
    function wrapText(text, maxW) {
      var words = String(text).split(/\s+/);
      var lines = [], line = '', i, test;
      for (i = 0; i < words.length; i++) {
        test = line ? (line + ' ' + words[i]) : words[i];
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line);
          line = words[i];
        } else {
          line = test;
        }
      }
      if (line) { lines.push(line); }
      return lines;
    }

    /* a labelled progress bar; `fill` is 0..1 of the coloured portion.
       BUG-3: BOTH bars DRAIN, so a shrinking bar always means "this side is
       losing". The old wolf bar was filled with (1 - hp/hpMax) and therefore
       read as the wolf healing while the player hit him. */
    function drawBar(x, y, w, h, fill, color, icon) {
      ctx.font = '16px serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#3a2417';        /* explicit: the icon sits on pale sky */
      ctx.fillText(icon, x - 2, y + h / 2);
      var bx = x + 22, bw = w - 22;
      ctx.fillStyle = 'rgba(58,36,23,0.25)';
      roundRect(bx, y, bw, h, 7); ctx.fill();
      ctx.fillStyle = color;
      var fw = Math.max(0, Math.min(bw, bw * fill));
      if (fw > 0) { roundRect(bx, y, fw, h, 7); ctx.fill(); }
      ctx.textAlign = 'center';
    }

    /* one small diamond per phase, so the learner can see how long the duel
       is and where they are in it. Filled = cleared, gold ring = current. */
    function drawPips() {
      if (plan.length < 2) { return; }
      var n = plan.length, gap = 18, i, cx;
      var x0 = W / 2 - ((n - 1) * gap) / 2;
      /* A dark pill behind the row. The pips share the top band with falling
         tiles, and an umber diamond at 0.28 alpha over a bright parchment tile
         vanished exactly when the learner wanted to check how far in they were.
         Cream on its own dark ground reads at any backdrop. */
      ctx.save();
      ctx.fillStyle = 'rgba(43,28,22,0.72)';
      roundRect(x0 - 13, BAR_Y - 3, (n - 1) * gap + 26, BAR_H + 6, 10);
      ctx.fill();
      ctx.restore();
      for (i = 0; i < n; i++) {
        cx = x0 + i * gap;
        ctx.save();
        ctx.translate(cx, BAR_Y + BAR_H / 2);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = (i < idx) ? '#e0a93e' : 'rgba(246,232,201,0.60)';
        ctx.fillRect(-5, -5, 10, 10);
        if (i === idx) {
          ctx.strokeStyle = '#e0a93e';
          ctx.lineWidth = 2;
          ctx.strokeRect(-6.5, -6.5, 13, 13);
        }
        ctx.restore();
      }
    }

    function paintDefaultBackdrop() {
      ctx.fillStyle = '#f6e8c9';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#b98a4e';
      ctx.fillRect(0, H - GROUND, W, GROUND);
      ctx.fillStyle = '#8d9c52';
      ctx.fillRect(0, H - GROUND - 6, W, 8);
    }

    function drawFoe() {
      if (!HAS_FOE || foe.hidden || !imgReady(foeImg)) { return; }
      var s = foe.size * foe.scale;
      var shake = (foeHurt > 0) ? (Math.random() * 8 - 4) : 0;
      ctx.save();
      if (foeHurt > 0) { ctx.globalAlpha = 0.7; }
      if (foe.flip) {
        ctx.translate(foe.x + shake, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(foeImg, -s / 2, foe.y, s, s);
      } else {
        ctx.drawImage(foeImg, foe.x - s / 2 + shake, foe.y, s, s);
      }
      ctx.restore();
    }

    function drawHero() {
      if (hero.hidden) { return; }
      if (imgReady(heroImg)) {
        ctx.drawImage(heroImg, hero.x - 40, HERO_Y, 80, 80);
      } else {
        ctx.font = '52px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🦊', hero.x, HERO_Y + 45);
      }
    }

    function drawHud() {
      var tFrac = timeMax ? (timeLeft / timeMax) : 0;
      var tCol = (tFrac < 0.25) ? '#b33a2b' : '#e0a93e';
      drawBar(8, BAR_Y, 118, BAR_H, tFrac, tCol, '⏱');
      drawBar(W - 126, BAR_Y, 118, BAR_H, hpMax ? (hpLeft / hpMax) : 0,
              HAS_FOE ? '#b33a2b' : '#7fb069',
              (cfg && cfg.hudIcon) ? cfg.hudIcon : FOE_ICON);
      drawPips();
    }

    /* the interstitial: a roar (or, for a probatio, a calm breath) between
       phases so the player is not punished for the switch (brief §4). */
    function drawInterstitial() {
      var k = interMax ? (inter / interMax) : 0;        /* 1 → 0 across the card */
      var appear = Math.min(1, (1 - k) * 4);            /* quick fade in */
      var leave = Math.min(1, k * 4);                   /* quick fade out */
      var a = Math.min(appear, leave);
      ctx.save();
      ctx.globalAlpha = 0.55 * a;
      ctx.fillStyle = '#2b1c16';
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = a;
      var bw = 300, bh = 92, bx = W / 2 - bw / 2, by = H / 2 - bh / 2;
      drawBanner(bx, by, bw, bh);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#e0a93e';
      ctx.font = 'bold 26px Palatino, Georgia, serif';
      ctx.fillText(interTitle, W / 2, by + 38);
      if (interSub) {
        ctx.fillStyle = '#f6e8c9';
        ctx.font = '15px Palatino, Georgia, serif';
        ctx.fillText(interSub, W / 2, by + 66);
      }
      ctx.restore();
    }

    /* ============================================================
       the loop
       ============================================================ */

    function update(dt) {
      if (foeHurt > 0) { foeHurt = Math.max(0, foeHurt - dt); }
      if (flash) { flash.t -= dt; if (flash.t <= 0) { flash = null; } }

      /* GAP: the tile is sized from the canvas's CSS width, and that width is
         not final at start() — the header above the canvas, a web font, or the
         phone turning sideways all change it afterwards. Twice a second keeps
         the tile honest without asking the browser for layout every frame.
         Ahead of the interstitial return, so a phase that is about to begin
         reads a measured scale rather than the 1 of a cold start. */
      tileTimer -= dt;
      if (tileTimer <= 0) { tileK = measureTileK(); tileTimer = 0.5; }

      /* interstitial: no clock, no input, no phase (brief §4) */
      if (inter > 0) {
        inter -= dt;
        if (HAS_FOE) {
          /* the roar: the foe lunges a little towards the player and back */
          var k = interMax ? (1 - inter / interMax) : 1;
          foe.scale = 1 + 0.12 * Math.sin(Math.PI * Math.min(1, Math.max(0, k)));
        }
        if (inter <= 0) {
          inter = 0;
          resetFoe();
          beginPhase(pending);
        }
        return;
      }

      if (!impl) { return; }

      timeLeft -= dt;
      if (timeLeft <= 0) {
        timeLeft = 0;
        finishPhase(false);
        return;
      }

      moveHero(dt);
      impl.update(dt);
    }

    function draw() {
      if (impl && typeof impl.backdrop === 'function') { impl.backdrop(); }
      else { paintDefaultBackdrop(); }

      drawFoe();
      if (impl) { impl.draw(); }
      drawHero();
      drawHud();

      if (flash) {
        ctx.fillStyle = flash.color;
        ctx.fillRect(0, 0, W, H);
      }
      if (inter > 0) { drawInterstitial(); }
    }

    function loop(t) {
      if (!running) { return; }
      var dt = Math.min(0.05, (t - lastTime) / 1000);
      lastTime = t;
      update(dt);                     /* may call end() → stop() → running=false */
      /* BUG-5(a): never reschedule after teardown, or stop() leaves a dangling
         rAF id behind — harmless in v1, a real bug now that phases swap. */
      if (!running) { return; }
      /* FIX-1c: schedule the NEXT frame BEFORE drawing, and swallow anything
         draw() throws. This is what makes the v1 freeze impossible to repeat:
         previously the rAF call sat AFTER draw(), so the first InvalidStateError
         from a broken image ended the fight silently. */
      raf = reqFrame(loop);
      try {
        draw();
      } catch (e) {
        if (window.console) { console.error('[' + LABEL + '] draw failed, loop continues', e); }
      }
    }

    /* ============================================================
       phase sequencing
       ============================================================ */

    /* Turn the config into a list of {type, hp, seconds, ...} entries.
       No `phases` field  →  ONE caterva with the v1 tuning (legacy:true), so
       every pre-M3 content file and caller keeps working unchanged. */
    function buildPlan(config) {
      var out = [], i, p;
      if (config.phases && config.phases.length) {
        for (i = 0; i < config.phases.length; i++) {
          p = config.phases[i];
          if (!p || !p.type) { continue; }
          if (!Object.prototype.hasOwnProperty.call(PHASES, p.type)) {
            if (window.console) {
              console.warn('[' + LABEL + '] unknown phase type "' + p.type + '" — skipped');
            }
            continue;
          }
          out.push({
            type: p.type,
            hp: p.hp || 2,
            seconds: p.seconds || 25,
            legacy: false,
            data: p                     /* the raw entry, for phase-specific keys */
          });
        }
      }
      /* The fallback is only a fallback if it can actually be played. Pushing
         an unregistered 'caterva' here is what used to turn a missing
         js/boss-phases.js into a phase whose impl is undefined — see the
         guard in start(). */
      if (!out.length && Object.prototype.hasOwnProperty.call(PHASES, 'caterva')) {
        out.push({
          type: 'caterva',
          hp: config.hp || 6,
          seconds: config.seconds || 45,
          legacy: true,                 /* v1 tuning; see boss-phases.js */
          data: {}
        });
      }
      return out;
    }

    function phaseTitle(i) {
      var t = plan[i] && plan[i].type;
      var p = t ? PHASES[t] : null;
      var name = (p && p.titulus) ? p.titulus : String(t || '').toUpperCase();
      return (ROMAN[i] || String(i + 1)) + ' — ' + name;
    }

    /* close the running phase, write its result row, then move on (or end) */
    function finishPhase(cleared) {
      if (impl) {
        if (typeof impl.teardown === 'function') {
          try { impl.teardown(); } catch (e) {
            if (window.console) { console.error('[' + LABEL + '] teardown threw', e); }
          }
        }
        impl = null;
      }
      resetFoe();
      hero.hidden = false;
      if (idx >= 0 && plan[idx]) {
        log.push({
          type: plan[idx].type,
          ms: Math.round(now() - phaseStartedAt),
          mistakes: phaseMistakes,
          hpDealt: phaseHpDealt
        });
      }
      if (!cleared) { end(false); return; }
      gotoPhase(idx + 1);
    }

    function gotoPhase(i) {
      if (i >= plan.length) { end(true); return; }
      pending = i;
      idx = i;
      if (plan.length > 1) {
        /* a single-phase fight (legacy config) gets no card: it would only be
           a 1.2 s delay in front of the exact game v1 shipped. */
        interTitle = phaseTitle(i);
        interSub = cfg.name || '';
        interMax = 1.2;
        inter = interMax;
        /* a duel ROARS between rounds; a trial simply turns the page. Same
           1.2 s of input lockout either way — the pause is there so nobody is
           punished for the switch, not for drama. */
        playSfx(HAS_FOE ? 'roar' : 'tick');
        if (HAS_FOE) { foeHurt = 0.35; }
      } else {
        beginPhase(i);
      }
    }

    function beginPhase(i) {
      var entry = plan[i];
      idx = i;
      impl = PHASES[entry.type];
      /* buildPlan() filters unregistered types, so reaching here with no
         implementation means the registry was emptied AFTER the plan was
         built. Losing is the only safe answer: a phase that cannot run has
         not been beaten. */
      if (!impl) {
        if (window.console) {
          console.error('[' + LABEL + '] phase "' + entry.type + '" is not registered');
        }
        finishPhase(false);
        return;
      }
      phaseHp = entry.hp;
      phaseHpDealt = 0;
      phaseMistakes = 0;
      phaseStartedAt = now();
      timeMax = entry.seconds;
      timeLeft = timeMax;
      hero.x = W / 2;
      hero.hidden = false;
      pointerX = null;
      resetFoe();
      try {
        impl.init(env, entry);
      } catch (e) {
        /* a phase that cannot start must not hang the fight: log it, skip it,
           and let the learner keep playing the rest of the duel. */
        if (window.console) { console.error('[' + LABEL + '] phase ' + entry.type + ' init threw', e); }
        impl = null;
        finishPhase(true);
      }
    }

    /* ============================================================
       lifecycle
       ============================================================ */

    function start(canvasEl, config, callbacks) {
      stop();                       /* a second start() must not leave two loops */
      canvas = canvasEl;
      ctx = canvas.getContext('2d');
      canvas.width = W;
      canvas.height = H;
      cfg = config || {};
      cb = callbacks || {};

      /* only words with a picture can be drawn on a tile; a word without one
         would spawn a blank catchable, which is unplayable rather than hard. */
      var pool = [], i, list = cfg.words || [];
      for (i = 0; i < list.length; i++) {
        if (list[i] && (list[i].emoji || list[i].scene)) { pool.push(list[i]); }
      }

      plan = buildPlan(cfg);
      /* A duel with nothing to run must LOSE, not win. Without this guard the
         missing-phase-file case (js/boss-phases.js 404s, is blocked, or is
         killed by a syntax error) walked straight through gotoPhase(0) into
         end(true) and handed out a free region unlock — the worst kind of
         silent failure, because nothing looks broken: the learner is simply
         given the victory screen. */
      if (!plan.length) {
        if (window.console) {
          console.error('[' + LABEL + '] no phase is registered — is js/boss-phases.js loaded?');
        }
        running = false;
        hpMax = 0; hpLeft = 0;
        mistakes = 0;
        log = [];
        idx = -1;
        startedAt = now();
        if (cb.onEnd) { cb.onEnd(false, result()); }
        return;
      }
      hpMax = 0;
      for (i = 0; i < plan.length; i++) { hpMax += plan[i].hp; }
      hpLeft = hpMax;
      mistakes = 0;
      log = [];
      idx = -1;
      impl = null;
      inter = 0;
      flash = null;
      foeHurt = 0;
      keys = {};
      pointerX = null;
      hero.x = W / 2;
      hero.hidden = false;
      resetFoe();
      /* GAP: the tile scale depends on how wide CSS made the canvas, so it can
         only be known once the element is in the document — which it is by the
         time start() runs. */
      tileK = measureTileK();
      tileTimer = 0.5;
      /* the picture caches are NOT cleared here any more: they moved into
         js/scenes.js so the lūdus minigame shares them (see sceneImage above),
         and they are keyed on the scene's own identity plus the raster size,
         so nothing a new fight can ask for could collide with what an old one
         left behind. Clearing them per fight only re-decoded the same SVGs. */
      startedAt = now();

      heroImg = Scenes.toImage(Scenes.mascot(80, cfg.avatar), 80);
      /* the foe is whatever the region says it is. 'angry' is a wolf-only
         pose, so the caller passes the pose that suits its own actor
         (app.js: bossPose('fight')); everything else degrades to 'stand'. */
      foeImg = HAS_FOE
        ? actorImage(cfg.actor || 'wolf', { pose: cfg.actorPose || 'angry' }, 200)
        : null;

      env = buildEnv();
      env.words = pool;
      env.capitula = cfg.capitula || [];
      env.config = cfg;
      env.regionIndex = cfg.regionIndex || 0;

      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('touchmove', onTouchMove);
      canvas.addEventListener('touchstart', onTouchMove);

      running = true;
      lastTime = now();
      gotoPhase(0);
      raf = reqFrame(loop);
    }

    /* the plan §4/§7 payload. The region comes from the caller (it is a
       database key, not something the fight can know); the phase breakdown is
       exactly the rows finishPhase() wrote. */
    function result() {
      return {
        region: cfg && cfg.region ? cfg.region : '',
        ms: Math.round(now() - startedAt),
        mistakes: mistakes,
        phases: log.slice()
      };
    }

    function end(won) {
      var payload = result();     /* snapshot before stop() so timing is exact */
      stop();
      if (won) { playSfx('win'); }
      if (cb.onEnd) { cb.onEnd(won, payload); }
    }

    function stop() {
      if (impl && typeof impl.teardown === 'function') {
        try { impl.teardown(); } catch (e) { /* teardown must never block stop */ }
      }
      impl = null;
      running = false;
      if (raf) { cancelFrame(raf); raf = null; }
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('touchstart', onTouchMove);
      }
    }

    /* BUG-5(b): abort() tears the fight down WITHOUT reporting a result. It
       used to call end(false), so merely navigating away popped the "you lost"
       screen and booked a defeat the player never fought. Losing is decided by
       the clock or by HP, never by leaving. */
    function abort() { stop(); }

    /* ---- introspection, for tests/regression.html and ?debug ---- */
    function state() {
      return {
        running: running,
        phase: (idx >= 0 && plan[idx]) ? plan[idx].type : null,
        phaseIndex: idx,
        phaseCount: plan.length,
        interstitial: inter > 0,
        hpLeft: hpLeft, hpMax: hpMax,
        mistakes: mistakes,
        timeLeft: timeLeft,
        /* GAP: what the arena settled on for THIS canvas width */
        tileK: tileK,
        tile: tileSize(TILE_BASE),
        catchX: catchHalf()
      };
    }

    return {
      start: start, stop: stop, abort: abort,
      registerPhase: registerPhase, PHASES: PHASES,
      state: state, setFrameSource: setFrameSource, imgReady: imgReady,
      /* read-only, for tests/regression.html: the arena geometry a given
         canvas CSS width produces, without starting a fight. */
      tileSize: tileSize, catchX: catchHalf, spawnMargin: spawnMargin
    };
  }

  /* the Fabulae duel engine — the one app.js has always talked to.
     No foeIcon: the default crown means "the boss", which is right for the
     wolf, the lion and every beast after them. */
  var duel = createEngine({ label: 'boss', foe: true });

  return {
    start: duel.start,
    stop: duel.stop,
    abort: duel.abort,
    registerPhase: duel.registerPhase,
    PHASES: duel.PHASES,
    state: duel.state,
    /* GAP: the duel's live tile geometry, for the regression harness */
    tileSize: duel.tileSize, catchX: duel.catchX, spawnMargin: duel.spawnMargin,
    /* test/QA seam only — see the frame-source comment inside createEngine */
    setFrameSource: duel.setFrameSource,
    /* js/probatio.js builds its own instance from this factory: same engine,
       no foe, calm interstitials. */
    createEngine: createEngine,
    imgReady: imgReady
  };
})();
