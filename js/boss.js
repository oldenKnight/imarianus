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
  function svgToImage(svg, px) {
    var sized = svg.replace('<svg ', '<svg width="' + px + '" height="' + px + '" ');
    var img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sized);
    return img;
  }
  function makeFoxImage() {
    return svgToImage(Scenes.mascot(80), 80);
  }
  /* render the wolf actor alone (no background) into an image */
  function makeWolfImage() {
    var spec = { bg: 'none', items: [{ t: 'wolf', x: 200, y: 150, s: 1.6 }] };
    /* Scenes.render needs a known bg; 'none' falls back to plain, so we
       instead build a minimal wrapper using the wolf actor via a plain bg
       then rely on transparent letterbox. Simpler: use a small scene. */
    spec.bg = 'plain';
    return svgToImage(Scenes.render(spec), 200);
  }
  function makeSceneImage(spec) {
    return svgToImage(Scenes.render(spec), 60);
  }

  /* ---------- helpers ---------- */
  function pickTarget() {
    target = words[Math.floor(Math.random() * words.length)];
  }
  function spawnItem() {
    var w = (Math.random() < 0.5) ? target : words[Math.floor(Math.random() * words.length)];
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
    if (wolfImg && wolfImg.complete && wolfImg.naturalWidth > 0) {
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
      if (sImg && sImg.complete && sImg.naturalWidth > 0) {
        ctx.drawImage(sImg, items[i].x - 28, items[i].y - 28, 56, 56);
      } else if (w.emoji) {
        ctx.font = '38px serif';
        ctx.fillText(w.emoji, items[i].x, items[i].y);
      }
    }

    /* fox */
    if (foxImg && foxImg.complete) {
      ctx.drawImage(foxImg, fox.x - 40, H - GROUND_OFFSET - 78, 80, 80);
    } else {
      ctx.font = '52px serif';
      ctx.fillText('🦊', fox.x, H - GROUND_OFFSET - 35);
    }

    /* target word banner */
    ctx.fillStyle = 'rgba(58,36,23,0.88)';
    roundRect(W / 2 - 110, 10, 220, 46, 12);
    ctx.fill();
    ctx.fillStyle = '#f6e8c9';
    ctx.font = 'bold 24px Palatino, Georgia, serif';
    ctx.fillText(target.la, W / 2, 34);

    /* HP bar (wolf health) — top left */
    drawBar(12, 250, 200, 14, 1 - hp / hpMax, '#b33a2b', '🐺');
    /* time bar — top right, turns red when low */
    var tFrac = timeLeft / timeMax;
    var tCol = (tFrac < 0.25) ? '#b33a2b' : '#e0a93e';
    drawBar(W - 212, 250, 200, 14, tFrac, tCol, '⏱');

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
    update(dt);
    if (running) { draw(); }
    raf = window.requestAnimationFrame(loop);
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
    lastTime = window.performance ? window.performance.now() : new Date().getTime();
    raf = window.requestAnimationFrame(loop);
  }

  function end(won) {
    stop();
    if (cb.onEnd) { cb.onEnd(won); }
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

  function abort() { end(false); }

  return { start: start, stop: stop, abort: abort };
})();
