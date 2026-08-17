/* ============================================================
   game.js — LŪDUS: "Cape verbum rēctum!" (ES5, Canvas 2D)
   A Latin word appears at the top; emoji items fall from the
   sky; the player moves the fox to catch the item whose image
   matches the word. Pure comprehensible input: never any L1.
   Controls: ← → keys, mouse move, touch drag.
   ============================================================ */
var Game = (function () {
  'use strict';

  var canvas, ctx, raf = null, running = false;
  var W = 480, H = 420;
  var fox, items, words, target, caught, goal, lastTime, spawnTimer, speed;
  var cb = {};
  var foxImg = null;
  var audioCtx = null;
  var flash = null; /* {color, t} feedback overlay */
  var tile = 56;    /* drawn size of a falling item, in canvas units */
  var tileTimer = 0; /* seconds until the tile size is re-measured        */

  /* ---------- the frame source ----------
     rAF is the right clock for a game and the only one production uses. It is
     unusable from a headless test runner, which has no display to sync to and
     produces roughly ONE frame per second — a screenshot of the lūdus would
     always catch the very first frame, with nothing yet falling. So the pair
     is swappable exactly as js/boss.js makes it swappable, and tests/qa.html
     installs a timer-based source to photograph a game in progress. Nothing in
     the app ever calls this. */
  var reqFrame = function (fn) { return window.requestAnimationFrame(fn); };
  var cancelFrame = function (id) { window.cancelAnimationFrame(id); };
  function setFrameSource(request, cancel) {
    reqFrame = request || function (fn) { return window.requestAnimationFrame(fn); };
    cancelFrame = cancel || function (id) { window.cancelAnimationFrame(id); };
  }

  /* ---------- audio blips ---------- */
  function beep(freq, dur, type) {
    try {
      if (!audioCtx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { return; }
        audioCtx = new AC();
      }
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.type = type || 'sine';
      o.frequency.value = freq;
      g.gain.value = 0.08;
      o.connect(g); g.connect(audioCtx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      o.stop(audioCtx.currentTime + dur);
    } catch (e) { /* audio optional */ }
  }

  /* ---------- fox sprite from the SVG mascot ---------- */
  /* Scenes.toImage is the single SVG→Image conversion for the whole app: it
     strips any width/height already present on the <svg> tag before writing
     the new ones. Hand-rolled string surgery here is what produced duplicate
     attributes (and therefore an undecodable image) in boss.js — see FIX-1a. */
  function makeFoxImage() {
    return Scenes.toImage(Scenes.mascot(80), 80);
  }

  /* ---------- LUDUS: the falling item's picture ----------

     THE OWNER'S COMPLAINT, in the one game he actually plays. This used to be
     makeSceneImage(): the word's whole 400×240 mini-scene rendered into a 60px
     square and drawn at 56. A mini-scene is sky, ground and the thing itself
     standing somewhere on it, so the thing was ~14px across and three items
     falling together were three copies of the same landscape. The CLAR pass
     fixed precisely this for the DOM chips (js/chip-lint.js) and the boss
     tiles (js/boss.js) and left the minigame behind.

     Scenes.tileImage is now that same rule, shared: a scene that is ONE
     registered actor with no speech bubble draws the ACTOR ALONE as a tight
     transparent sprite, and the parchment floor behind it is the background it
     needed; anything genuinely multi-actor keeps its raster, because there the
     composition is the meaning. Rastered at TWICE the drawn size, because the
     canvas is scaled up by CSS on a phone and a 1:1 raster was visibly soft.

     NO WORD LABEL is ever drawn on these tiles, deliberately — unlike ordina's
     tiles, where the word is the question. Here the word is in the banner and
     the picture IS the answer: writing it under the picture would turn a
     word→picture recognition exercise into reading practice.

     The painting itself is Scenes.drawTile (see draw()); this only WARMS the
     cache, at the exact raster size drawTile will ask for, so the first tile
     to fall already has its picture decoded instead of showing the emoji
     fallback for the first second of the round. Keep the arithmetic in step
     with drawTile's `pad`, or the warm-up fills a key nothing reads. */
  function warmImage(word) {
    if (!word) { return null; }
    try { return Scenes.tileImage(word, Math.round((tile - 8) * 2)); } catch (e) { return null; }
  }

  /* How big a falling item is drawn, in the canvas's own 480-wide units.

     The canvas is 480 units wide and CSS-scaled to fit the column, so on a
     375px phone one canvas unit is about 0.71 CSS px: the old fixed 56 units
     landed as FORTY CSS pixels of picture held at arm's length. The tile is
     therefore sized in the unit that matters — the learner's screen — and
     converted back: at least 56 CSS px of art, whatever the scale factor.

     The cap is a gameplay limit, not a taste one. Items spawn anywhere across
     the field and up to three fall at once; a tile wider than a fifth of the
     field starts to overlap its neighbours instead of reading as its own
     catchable thing. 96 units is 20% of the field, and the spawn range below
     is derived from whatever this returns so a tile can never hang off an
     edge. Desktop, where the canvas is already 1:1, keeps the historical 56. */
  function computeTile() {
    var cssW = 0;
    try { cssW = canvas.getBoundingClientRect().width; } catch (e) { cssW = 0; }
    if (!cssW) { cssW = W; }
    /* ceil, not round: 56 CSS px is a FLOOR, and rounding 78.36 down to 78
       lands at 55.7 — a floor that is not one. */
    var units = Math.ceil(56 * (W / cssW));
    return Math.max(56, Math.min(96, units));
  }

  /* FIX-1b: the ONLY safe test before drawImage(). HTMLImageElement.complete
     is TRUE for an image that failed to load — only naturalWidth exposes the
     "broken" state — and drawImage() on a broken image throws
     InvalidStateError. Every drawImage in this file goes through this. */
  function imgReady(img) {
    return !!(img && img.complete && img.naturalWidth > 0);
  }

  /* ---------- helpers ---------- */
  function pickTarget() {
    var i = Math.floor(Math.random() * words.length);
    target = words[i];
  }

  function spawnItem() {
    var w;
    if (Math.random() < 0.45) {
      w = target;
    } else {
      w = words[Math.floor(Math.random() * words.length)];
    }
    /* keep the whole tile inside the field: the margin is the tile's own half
       plus two units of air, so a bigger tile narrows the spawn range instead
       of hanging off an edge (it used to be the constant 30, sized for the
       old 56-unit tile). */
    var margin = tile / 2 + 2;
    items.push({
      word: w,
      x: margin + Math.random() * (W - 2 * margin),
      y: -30,
      vy: speed * (0.8 + Math.random() * 0.5)
    });
  }

  /* ---------- input ---------- */
  var keys = {};
  function onKeyDown(e) { keys[e.keyCode] = true; if (e.keyCode === 37 || e.keyCode === 39) { e.preventDefault(); } }
  function onKeyUp(e) { keys[e.keyCode] = false; }

  var pointerX = null;
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

  /* ---------- loop ---------- */
  function update(dt) {
    /* The tile is sized from the canvas's CSS width, and that width is not
       final at start(): the step header above the canvas, a web font, or the
       phone turning sideways all change it afterwards. Re-measuring twice a
       second keeps the tile honest without asking the browser for layout on
       every frame. */
    tileTimer -= dt;
    if (tileTimer <= 0) { tile = computeTile(); tileTimer = 0.5; }

    /* fox movement */
    var v = 320;
    if (keys[37]) { fox.x -= v * dt; pointerX = null; }
    if (keys[39]) { fox.x += v * dt; pointerX = null; }
    if (pointerX !== null) {
      var d = pointerX - fox.x;
      fox.x += Math.max(-v * dt, Math.min(v * dt, d));
    }
    fox.x = Math.max(35, Math.min(W - 35, fox.x));

    /* spawn */
    spawnTimer -= dt;
    if (spawnTimer <= 0 && items.length < 3) {
      spawnItem();
      spawnTimer = 0.9 + Math.random() * 0.5;
    }

    /* items */
    var i, it;
    for (i = items.length - 1; i >= 0; i--) {
      it = items[i];
      it.y += it.vy * dt;
      /* catch? */
      if (it.y > H - 95 && it.y < H - 35 && Math.abs(it.x - fox.x) < 42) {
        if (it.word.la === target.la) {
          caught++;
          speed += 8;
          flash = { color: 'rgba(127,176,105,0.35)', t: 0.3 };
          beep(660, 0.15, 'sine'); beep(880, 0.2, 'sine');
          if (cb.onCorrect) { cb.onCorrect(); }
          pickTarget();
        } else {
          flash = { color: 'rgba(179,58,43,0.4)', t: 0.35 };
          beep(160, 0.3, 'square');
          if (cb.onWrong) { cb.onWrong(); }
        }
        items.splice(i, 1);
        continue;
      }
      if (it.y > H + 30) { items.splice(i, 1); }
    }

    if (flash) {
      flash.t -= dt;
      if (flash.t <= 0) { flash = null; }
    }

    if (caught >= goal) { end(true); }
  }

  function draw() {
    /* sky + ground, fresco tones matching the scenes */
    ctx.fillStyle = '#f6e8c9';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#b98a4e';
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = '#8d9c52';
    ctx.fillRect(0, H - 46, W, 8);

    /* falling items — the SAME parchment tile the boss duel drops, painted by
       the same function (js/scenes.js drawTile), which picks the cropped actor
       or, for a genuinely multi-actor scene, its raster. The tile's edge is
       half the fix: a bare picture on a parchment floor has no boundary, so
       two items falling near each other read as one smear, which is a large
       part of what "the items look alike" meant.

       NO LABEL is passed, ever, and the painter only draws one when asked:
       the word is already in the banner and the picture IS the answer. */
    var i;
    for (i = 0; i < items.length; i++) {
      Scenes.drawTile(ctx, items[i].word, items[i].x, items[i].y, tile);
    }

    /* fox */
    if (imgReady(foxImg)) {
      ctx.drawImage(foxImg, fox.x - 40, H - 118, 80, 80);
    } else {
      ctx.font = '52px serif';
      ctx.fillText('🦊', fox.x, H - 75);
    }

    /* target word banner */
    ctx.fillStyle = 'rgba(58,36,23,0.88)';
    roundRect(W / 2 - 110, 12, 220, 52, 12);
    ctx.fill();
    ctx.fillStyle = '#f6e8c9';
    ctx.font = 'bold 26px Palatino, Georgia, serif';
    ctx.fillText(target.la, W / 2, 38);
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#e0a93e';
    ctx.fillText(caught + ' / ' + goal, W / 2, 56);

    if (flash) {
      ctx.fillStyle = flash.color;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function loop(t) {
    if (!running) { return; }
    var dt = Math.min(0.05, (t - lastTime) / 1000);
    lastTime = t;
    update(dt);                       /* may call end() → stop() → running=false */
    /* BUG-5(a): never reschedule after the game has ended, or stop() leaves a
       dangling rAF id behind. */
    if (!running) { return; }
    /* FIX-1c: schedule the next frame BEFORE drawing, and swallow draw
       exceptions. A throw inside draw() (e.g. drawImage on a broken image)
       must never be able to kill the animation loop again. */
    raf = reqFrame(loop);
    try {
      draw();
    } catch (e) {
      if (window.console) { console.error('[ludus] draw failed, loop continues', e); }
    }
  }

  /* ---------- lifecycle ---------- */
  function start(canvasEl, wordList, goalCount, callbacks) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;
    words = wordList;
    goal = goalCount || 8;
    caught = 0;
    speed = 75;
    items = [];
    spawnTimer = 0.4;
    fox = { x: W / 2 };
    cb = callbacks || {};
    pickTarget();
    pointerX = null;

    foxImg = makeFoxImage();
    /* the tile size depends on how wide CSS made the canvas, so it can only be
       known once the element is in the document — which it is by now. */
    tile = computeTile();
    tileTimer = 0.5;
    /* warm the shared picture cache: an Image starts decoding when its src is
       set, so asking for every word's picture NOW means the first frame that
       needs one already has it instead of falling back to the emoji. */
    var wi;
    for (wi = 0; wi < words.length; wi++) { warmImage(words[wi]); }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchstart', onTouchMove);

    running = true;
    lastTime = window.performance ? window.performance.now() : new Date().getTime();
    raf = reqFrame(loop);
  }

  function end(won) {
    stop();
    if (cb.onEnd) { cb.onEnd(won, caught); }
  }

  function stop() {
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

  /* called by the app when global hearts hit zero mid-game */
  function abort() { end(false); }

  return { start: start, stop: stop, abort: abort, beep: beep,
           setFrameSource: setFrameSource,
           /* read-only, for the regression harness: the drawn tile size the
              last start() settled on. */
           tileSize: function () { return tile; } };
})();
