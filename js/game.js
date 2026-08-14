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
  var sceneImgs = {}; /* la → Image, pre-rendered from each word's SVG scene */
  var audioCtx = null;
  var flash = null; /* {color, t} feedback overlay */

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

  /* pre-render a vocab scene into an off-screen Image so it can be painted
     onto the canvas like an emoji glyph. The scene SVG has its own viewBox
     (400×240) and preserveAspectRatio="xMidYMid meet", so giving it width=60
     height=60 letterboxes correctly. The letterbox fill is the same parchment
     cream as the game floor, so the icon blends in seamlessly. */
  function makeSceneImage(spec) {
    return Scenes.toImage(Scenes.render(spec), 60);
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
    items.push({
      word: w,
      x: 30 + Math.random() * (W - 60),
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

    /* falling items */
    ctx.font = '38px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var i;
    for (i = 0; i < items.length; i++) {
      var w = items[i].word;
      var sImg = sceneImgs[w.la];
      if (imgReady(sImg)) {
        /* 56px square centred on the item position */
        ctx.drawImage(sImg, items[i].x - 28, items[i].y - 28, 56, 56);
      } else if (w.emoji) {
        ctx.fillText(w.emoji, items[i].x, items[i].y);
      }
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
    raf = window.requestAnimationFrame(loop);
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
    /* pre-render any scene-bearing words so they appear with custom art
       (e.g. silva → little woods icon) instead of as an emoji glyph. */
    sceneImgs = {};
    var wi;
    for (wi = 0; wi < words.length; wi++) {
      if (words[wi].scene) {
        sceneImgs[words[wi].la] = makeSceneImage(words[wi].scene);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchstart', onTouchMove);

    running = true;
    lastTime = window.performance ? window.performance.now() : new Date().getTime();
    raf = window.requestAnimationFrame(loop);
  }

  function end(won) {
    stop();
    if (cb.onEnd) { cb.onEnd(won, caught); }
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

  /* called by the app when global hearts hit zero mid-game */
  function abort() { end(false); }

  return { start: start, stop: stop, abort: abort, beep: beep };
})();
