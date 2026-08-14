/* ============================================================
   boss.js — BOSS FIGHT v1: "Lupum vince!" (ES5, Canvas 2D)
   A timed fight against the wolf. The target Latin word shows at
   the top; matching images fall; the fox catches the right ones
   to land hits and drain the wolf's HP. Catching a WRONG image
   lets the wolf bite back (the player loses time, not hearts).
   Win = HP to zero before the clock runs out.

   SWAP NOTE: this module exposes the SAME lifecycle as Game
   (start / stop / abort) so a future 2D platformer boss can
   replace it by writing a new module and changing ONE dispatch
   line in app.js (runBossFight). Nothing else needs to change.
   ============================================================ */
var Boss = (function () {
  'use strict';

  var canvas, ctx, raf = null, running = false;
  var W = 480, H = 460;
  var fox, items, words, target, lastTime, spawnTimer, speed;
  var hp, hpMax, timeLeft, timeMax;
  /* BUG-4: a wrong catch now costs the player a recorded mistake as well as
     time. Kept in module state because the phase engine (plan §4) and the
     leaderboard (plan §7) both consume it as part of the result payload
     { region, ms, mistakes, phases[] }. startedAt feeds the `ms` field. */
  var mistakes = 0, startedAt = 0;
  var cb = {};
  var foxImg = null, wolfImg = null;
  var sceneImgs = {};
  var flash = null;          /* {color, t} feedback overlay */
  var wolfHurt = 0;          /* >0 = wolf shows a hit shake/flash */
  var GROUND_OFFSET = 40;

  /* ---------- audio (reuse Game's beep if present) ---------- */
  function beep(freq, dur, type) {
    if (window.Game && Game.beep) { Game.beep(freq, dur, type); }
  }

  /* ---------- sprites from the SVG actors ---------- */
  /* FIX-1a: the local svgToImage() that used to live here blindly prepended
     width/height to the '<svg ' opener. Scenes.mascot() already emits its own
     pair, so the fox sprite came out with DUPLICATE attributes — a fatal XML
     well-formedness error in a data:image/svg+xml URL. The image never
     decoded, drawImage() threw InvalidStateError, and the loop died. All SVG
     sizing now goes through Scenes.toImage, which strips before it injects. */
  function makeFoxImage() {
    return Scenes.toImage(Scenes.mascot(80), 80);
  }

  /* BUG-2: the wolf used to be a whole {bg:'plain'} 400x240 scene crushed into
     a 200px square, so its sky and ground painted an opaque rectangle across
     the middle of the arena. Scenes.sprite draws the actor alone on a tight,
     fully transparent viewBox. */
  function makeWolfImage() {
    return Scenes.toImage(Scenes.sprite('wolf', { pose: 'angry' }, 200), 200);
  }

  function makeSceneImage(spec) {
    return Scenes.toImage(Scenes.render(spec), 60);
  }

  /* FIX-1b: the ONLY safe test before drawImage(). .complete is TRUE for a
     failed image; only naturalWidth reveals the broken state, and drawImage on
     a broken image throws. Every drawImage in this file goes through this. */
  function imgReady(img) {
    return !!(img && img.complete && img.naturalWidth > 0);
  }

  /* ---------- helpers ---------- */
  function pickTarget() {
    target = words[Math.floor(Math.random() * words.length)];
  }
  function spawnItem() {
    /* BUG-4 (partial): 50% of spawns being the target made the fight
       degenerate — holding one direction won it. 35% is the smallest change
       that removes the degenerate case; the real rebalance belongs to the
       three-phase engine (plan §4), which owns difficulty as a whole. */
    var w = (Math.random() < 0.35) ? target : words[Math.floor(Math.random() * words.length)];
    items.push({
      word: w,
      x: 30 + Math.random() * (W - 60),
      y: -30,
      vy: speed * (0.85 + Math.random() * 0.5)
    });
  }

  /* ---------- input (mirrors Game) ---------- */
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
    /* clock */
    timeLeft -= dt;
    if (timeLeft <= 0) { timeLeft = 0; end(false); return; }

    /* fox movement */
    var v = 330;
    if (keys[37]) { fox.x -= v * dt; pointerX = null; }
    if (keys[39]) { fox.x += v * dt; pointerX = null; }
    if (pointerX !== null) {
      var d = pointerX - fox.x;
      fox.x += Math.max(-v * dt, Math.min(v * dt, d));
    }
    fox.x = Math.max(35, Math.min(W - 35, fox.x));

    /* spawn */
    spawnTimer -= dt;
    if (spawnTimer <= 0 && items.length < 4) {
      spawnItem();
      spawnTimer = 0.75 + Math.random() * 0.45;
    }

    /* items */
    var catchY = H - GROUND_OFFSET - 55;
    var i, it;
    for (i = items.length - 1; i >= 0; i--) {
      it = items[i];
      it.y += it.vy * dt;
      if (it.y > catchY && it.y < catchY + 60 && Math.abs(it.x - fox.x) < 42) {
        if (it.word.la === target.la) {
          /* hit the wolf */
          hp = Math.max(0, hp - 1);
          wolfHurt = 0.4;
          speed += 6;
          flash = { color: 'rgba(127,176,105,0.30)', t: 0.28 };
          beep(660, 0.12, 'sine'); beep(880, 0.16, 'sine');
          if (cb.onHit) { cb.onHit(hp, hpMax); }
          pickTarget();
          if (hp <= 0) { items.splice(i, 1); end(true); return; }
        } else {
          /* wolf bites back: lose time, flash red, no heart cost */
          mistakes++;                                   /* BUG-4: recorded for the result payload */
          timeLeft = Math.max(0, timeLeft - 3);
          flash = { color: 'rgba(179,58,43,0.38)', t: 0.32 };
          beep(150, 0.28, 'square');
          if (cb.onMiss) { cb.onMiss(); }
        }
        items.splice(i, 1);
        continue;
      }
      if (it.y > H + 30) { items.splice(i, 1); }
    }

    if (flash) { flash.t -= dt; if (flash.t <= 0) { flash = null; } }
    if (wolfHurt > 0) { wolfHurt -= dt; if (wolfHurt < 0) { wolfHurt = 0; } }
  }

  function draw() {
    /* sky + ground (fresco tones, matching ludus) */
    ctx.fillStyle = '#f6e8c9';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#b98a4e';
    ctx.fillRect(0, H - GROUND_OFFSET, W, GROUND_OFFSET);
    ctx.fillStyle = '#8d9c52';
    ctx.fillRect(0, H - GROUND_OFFSET - 6, W, 8);

    /* the wolf boss, up top, with a hit shake */
    if (imgReady(wolfImg)) {
      var shake = (wolfHurt > 0) ? (Math.random() * 8 - 4) : 0;
      ctx.save();
      if (wolfHurt > 0) { ctx.globalAlpha = 0.7; }
      ctx.drawImage(wolfImg, W / 2 - 90 + shake, 58, 180, 180);
      ctx.restore();
    }

    /* falling items */
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var i;
    for (i = 0; i < items.length; i++) {
      var w = items[i].word;
      var sImg = sceneImgs[w.la];
      if (imgReady(sImg)) {
        ctx.drawImage(sImg, items[i].x - 28, items[i].y - 28, 56, 56);
      } else if (w.emoji) {
        ctx.font = '38px serif';
        ctx.fillText(w.emoji, items[i].x, items[i].y);
      }
    }

    /* fox */
    if (imgReady(foxImg)) {
      ctx.drawImage(foxImg, fox.x - 40, H - GROUND_OFFSET - 78, 80, 80);
    } else {
      ctx.font = '52px serif';
      ctx.fillText('🦊', fox.x, H - GROUND_OFFSET - 35);
    }

    /* target word banner, centred in the top band (x 130..350) */
    ctx.fillStyle = 'rgba(58,36,23,0.88)';
    roundRect(W / 2 - 110, 10, 220, 46, 12);
    ctx.fill();
    ctx.fillStyle = '#f6e8c9';
    ctx.font = 'bold 24px Palatino, Georgia, serif';
    ctx.fillText(target.la, W / 2, 34);

    /* BUG-3: both HUD bars now live in the top band, flanking the banner,
       instead of being drawn at y=250 across the middle of the play area.
       BOTH bars DRAIN, so the whole HUD reads the same way: a shrinking bar
       always means "this side is losing". The left bar is the player's
       resource (time left, amber, red when nearly out); the right bar is the
       wolf's remaining HP. The old wolf bar was filled with (1 - hp/hpMax),
       which GREW as the player hit him — it read as the wolf healing. */
    var tFrac = timeLeft / timeMax;
    var tCol = (tFrac < 0.25) ? '#b33a2b' : '#e0a93e';
    drawBar(10, 24, 112, 16, tFrac, tCol, '⏱');                    /* player, top-left  */
    drawBar(W - 122, 24, 112, 16, hp / hpMax, '#b33a2b', '🐺');    /* wolf,   top-right */

    if (flash) {
      ctx.fillStyle = flash.color;
      ctx.fillRect(0, 0, W, H);
    }
  }

  /* a labelled progress bar; `fill` is 0..1 of the coloured portion */
  function drawBar(x, y, w, h, fill, color, icon) {
    ctx.font = '16px serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    /* explicit ink colour: the icon is drawn over the pale sky, and without
       this it inherits whatever fillStyle the banner text left behind. */
    ctx.fillStyle = '#3a2417';
    ctx.fillText(icon, x - 2, y + h / 2);
    var bx = x + 22, bw = w - 22;
    ctx.fillStyle = 'rgba(58,36,23,0.25)';
    roundRect(bx, y, bw, h, 7); ctx.fill();
    ctx.fillStyle = color;
    var fw = Math.max(0, Math.min(bw, bw * fill));
    if (fw > 0) { roundRect(bx, y, fw, h, 7); ctx.fill(); }
    ctx.textAlign = 'center';
  }

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

  function loop(t) {
    if (!running) { return; }
    var dt = Math.min(0.05, (t - lastTime) / 1000);
    lastTime = t;
    update(dt);                       /* may call end() → stop() → running=false */
    /* BUG-5(a): the old code rescheduled unconditionally, so a fight that had
       just ended left a live rAF id behind, one frame past its own teardown. */
    if (!running) { return; }
    /* FIX-1c: schedule the NEXT frame BEFORE drawing, and swallow anything
       draw() throws. This is the change that makes the freeze impossible to
       repeat: previously the rAF call sat AFTER draw(), so the first
       InvalidStateError from a broken image ended the fight silently. */
    raf = window.requestAnimationFrame(loop);
    try {
      draw();
    } catch (e) {
      if (window.console) { console.error('[boss] draw failed, loop continues', e); }
    }
  }

  /* ---------- lifecycle (mirrors Game) ---------- */
  function start(canvasEl, config, callbacks) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;
    words = config.words;
    hpMax = config.hp || 6;
    hp = hpMax;
    timeMax = config.seconds || 45;
    timeLeft = timeMax;
    speed = 80;
    items = [];
    spawnTimer = 0.4;
    fox = { x: W / 2 };
    cb = callbacks || {};
    pointerX = null;
    mistakes = 0;
    startedAt = now();
    pickTarget();

    foxImg = makeFoxImage();
    wolfImg = makeWolfImage();
    sceneImgs = {};
    var wi;
    for (wi = 0; wi < words.length; wi++) {
      if (words[wi].scene) { sceneImgs[words[wi].la] = makeSceneImage(words[wi].scene); }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchstart', onTouchMove);

    running = true;
    lastTime = now();
    raf = window.requestAnimationFrame(loop);
  }

  /* one clock source for both the frame delta and the elapsed-time metric */
  function now() {
    return window.performance ? window.performance.now() : new Date().getTime();
  }

  /* The seed of the plan §4/§7 result payload { region, ms, mistakes,
     phases[] }. The region and the phase breakdown belong to the caller and to
     the phase engine; the fight itself only knows these two numbers. Passed as
     a SECOND argument so the existing onEnd(won) callers keep working. */
  function result() {
    return { ms: Math.round(now() - startedAt), mistakes: mistakes };
  }

  function end(won) {
    var payload = result();   /* snapshot before stop() so timing is exact */
    stop();
    if (cb.onEnd) { cb.onEnd(won, payload); }
  }

  function stop() {
    running = false;
    if (raf) { window.cancelAnimationFrame(raf); raf = null; }
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    if (canvas) {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchMove);
    }
  }

  /* BUG-5(b): abort() must tear the fight down WITHOUT reporting a result.
     It used to call end(false), which fires cb.onEnd(false) — so merely
     navigating away from the boss screen could pop the "you lost" screen and,
     worse, book a defeat the player never fought. Losing is decided by the
     clock or by HP, never by leaving. (app.js currently navigates away via
     Boss.stop(), which behaves identically; abort() is the explicit,
     self-documenting name for the same teardown.) */
  function abort() { stop(); }

  return { start: start, stop: stop, abort: abort };
})();
