/* ============================================================
   probatio.js — PROBATIŌNĒS: the non-combat trials (ES5, Canvas 2D)
   ------------------------------------------------------------
   DESIGN §6: "Wolf duels are tonally wrong in Genesis." The Historia
   Sacra and Aeneis tracks end a liber with a TRIAL, not a fight —
   sorting the animals into the ark, crossing the Red Sea, reading an
   oracle — but a trial is the same machine as a duel with the enemy
   taken out. So this module does NOT reimplement the engine: it asks
   js/boss.js for a SECOND INSTANCE of it.

       var engine = Boss.createEngine({ label:'probatio', foe:false });

   Everything the engine owns (canvas, clock, HP pool, input, HUD,
   interstitials, sprite caches, the result payload) is therefore
   identical to the boss, bug for bug and fix for fix. With foe:false
   there is no enemy sprite, the right-hand bar is a "tasks remaining"
   meter in green, and the interstitial is a calm title card instead
   of a roar.

   PUBLIC API — deliberately identical to Boss, so app.js can swap on
   one field (config.kind === 'probatio') and change nothing else:

       Probatio.start(canvasEl, config, callbacks)
       Probatio.stop() / Probatio.abort()
       Probatio.registerPhase(type, impl)  /  Probatio.PHASES

   CONFIG (content/<track>-<liber>.js; see content/README §4)
       {
         kind: 'probatio',
         name: 'Arca Noe', words: [...vocab with pictures...],
         region: 'historia1', regionIndex: 0, capitula: [...],
         phases: [
           { type:'ordina', hp:6, seconds:40,
             categories: [ { label:'IN ARCAM', accept:['leō','columba'],
                             actor:'ark' },
                           { label:'NŌN',      accept:['saxum'] } ] },
           { type:'transitus', hp:5, seconds:45, wall:'murusAquae' },
           { type:'sententia', hp:4, seconds:50,
             items:[ { text:'Deus ____ creāvit.', answer:'caelum',
                       options:['caelum','mare','ignis'], scene: SC.x } ] }
         ]
       }
   Every phase field except `type` has a working default, so a content
   file can ship a trial with three lines and tune it later.

   RESULT PAYLOAD: identical in shape to the boss's —
       { region, ms, mistakes, phases:[{type, ms, mistakes, hpDealt}] }
   ============================================================ */
var Probatio = (function () {
  'use strict';

  if (!window.Boss || !Boss.createEngine) {
    if (window.console) { console.error('[probatio] Boss engine not loaded'); }
    /* a stub with the same shape: a missing file must not throw at a call
       site, it must fail visibly and let the app route around it. */
    return {
      start: function (c, cfg, cb) { if (cb && cb.onEnd) { cb.onEnd(false, null); } },
      stop: function () {}, abort: function () {},
      registerPhase: function () { return false; }, PHASES: {},
      state: function () { return { running: false }; },
      setFrameSource: function () {}
    };
  }

  var engine = Boss.createEngine({ label: 'probatio', foe: false, foeIcon: '📜' });

  /* ============================================================
     shared helpers (kept in step with js/boss-phases.js)
     ============================================================ */

  function ramp(env) {
    var i = env.regionIndex || 0;
    return Math.max(0, Math.min(1, i / 8));
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function bare(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/^[“”"«»(\[]+/, '').replace(/[.,;:!?“”"«»)\]]+$/, '');
  }
  function lower(s) { return String(s).toLowerCase(); }

  function caught(env, item, radius) {
    return item.y > env.CATCH - 30 && item.y < env.CATCH + 34 &&
           Math.abs(item.x - env.hero.x) < (radius || 44);
  }

  /* coarse part of speech, only ever used to build a default sorting rule */
  function isVerb(word) {
    if (!word) { return false; }
    var p = word.pars || word.pos;
    if (p) { return p === 'verbum'; }
    return /(nt|t)$/.test(lower(bare(word.la)));
  }

  /* one line of a gapped sentence, with the ____ painted as a gold slot.
     Deliberately a local copy of the clamor painter (js/boss-phases.js): a
     twenty-line drawing helper is cheaper to duplicate than to reach across
     files for, and probatio must still work on a page that never loads the
     Fabulae phases. */
  function drawGapLine(env, line, cx, y) {
    var ctx = env.ctx;
    var words = String(line).split(' ');
    var x = cx - ctx.measureText(line).width / 2, i, wtxt, wid;
    ctx.textAlign = 'left';
    for (i = 0; i < words.length; i++) {
      wtxt = words[i];
      wid = ctx.measureText(wtxt).width;
      if (wtxt.indexOf('____') === 0) {
        ctx.fillStyle = 'rgba(224,169,62,0.28)';
        env.roundRect(x - 2, y - 12, wid + 4, 24, 5);
        ctx.fill();
        ctx.fillStyle = '#e0a93e';
      } else {
        ctx.fillStyle = '#f6e8c9';
      }
      ctx.fillText(wtxt, x, y);
      x += ctx.measureText(wtxt + ' ').width;
    }
    ctx.textAlign = 'center';
  }

  function promptBanner(env, text) {
    var ctx = env.ctx;
    var w = 260, x = env.W / 2 - w / 2, y = env.TOP + 2, h = 46;
    env.drawBanner(x, y, w, h);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f6e8c9';
    ctx.font = 'bold 24px Palatino, Georgia, serif';
    ctx.fillText(text, env.W / 2, y + 24);
  }

  /* ============================================================
     1. ŌRDINĀ — sort the drifting items into the right zone
     ------------------------------------------------------------
     Two labelled zones split the floor (animālia IN ARCAM | NŌN).
     Items enter from one side and CROSS the screen as they sink, so
     every item can be intercepted on either side: the player chooses
     where to catch it, and where they caught it is the answer.

     Config (phase entry):
       categories: [ { label, accept:[la…], actor }, { … } ]   2 zones
       items:      [ vocab items ]      optional; defaults to config.words
     With no categories at all the trial falls back to the one rule that
     can be derived from any vocabulary list: NŌMINA vs VERBA.

     TUNING                     region I     region IX+
       items on screen          2            3
       spawn interval           1.5–2.1 s    1.1–1.6 s
       crossing speed           78 px/s      98 px/s
       wrong zone               −3 s, +1 mistake
     ============================================================ */
  engine.registerPhase('ordina', {
    titulus: 'ŌRDINĀ',

    init: function (env, cfg) {
      var t = ramp(env), i, w;
      this.env = env;
      this.max = Math.round(lerp(2, 3, t));
      this.spawnLo = lerp(1.5, 1.1, t);
      this.spawnHi = lerp(2.1, 1.6, t);
      this.cross = lerp(78, 98, t);
      this.items = [];
      this.spawnTimer = 0.6;
      this.hint = 0;
      /* the banner text: content's own, or the phase's Latin imperative. It
         is never an invented sentence — "ŌRDINĀ" is the instruction. Held in
         its OWN field: writing it to this.titulus would rewrite the registry
         object's title for every later fight in the session. */
      this.banner = (cfg.data && cfg.data.titulus) || 'ŌRDINĀ';

      /* zones: from the content, or the derivable default */
      var cats = (cfg.data && cfg.data.categories) || null;
      if (!cats || cats.length < 2) {
        cats = [{ label: 'NŌMINA', accept: null }, { label: 'VERBA', accept: null }];
        this.byPars = true;
      } else {
        this.byPars = false;
      }
      this.cats = cats;

      /* the pool: only words we can actually place in a zone */
      this.pool = [];
      var src = (cfg.data && cfg.data.items) || env.words;
      for (i = 0; i < src.length; i++) {
        w = src[i];
        if (!w || (!w.emoji && !w.scene)) { continue; }
        if (this.zoneOf(w) < 0) { continue; }
        this.pool.push(w);
      }
      env.hero.hidden = true;            /* the player steers a basket, not a fox */
    },

    /* which zone does this word belong in? −1 = no rule covers it */
    zoneOf: function (word) {
      var i, j, acc, la = lower(bare(word.la));
      if (this.byPars) { return isVerb(word) ? 1 : 0; }
      for (i = 0; i < this.cats.length; i++) {
        acc = this.cats[i].accept || [];
        for (j = 0; j < acc.length; j++) {
          if (lower(bare(acc[j])) === la) { return i; }
        }
      }
      return -1;
    },

    spawn: function () {
      var env = this.env;
      if (!this.pool.length) { return; }
      var w = this.pool[Math.floor(Math.random() * this.pool.length)];
      var fromLeft = Math.random() < 0.5;
      this.items.push({
        word: w,
        zone: this.zoneOf(w),
        x: fromLeft ? 30 : env.W - 30,
        y: -30,
        vx: (fromLeft ? 1 : -1) * this.cross,
        vy: 62
      });
    },

    update: function (dt) {
      var env = this.env, i, it, side;
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.items.length < this.max) {
        this.spawn();
        this.spawnTimer = this.spawnLo + Math.random() * (this.spawnHi - this.spawnLo);
      }
      if (this.hint > 0) { this.hint = Math.max(0, this.hint - dt); }

      for (i = this.items.length - 1; i >= 0; i--) {
        it = this.items[i];
        it.x += it.vx * dt;
        it.y += it.vy * dt;
        if (it.x < 30) { it.x = 30; it.vx = -it.vx; }
        if (it.x > env.W - 30) { it.x = env.W - 30; it.vx = -it.vx; }

        if (caught(env, it, 46)) {
          side = (env.hero.x < env.W / 2) ? 0 : 1;
          this.items.splice(i, 1);
          if (side === it.zone) {
            this.hint = 0.5;
            env.damage(1);               /* may end the phase — return now */
            return;
          }
          env.addMistake(1);
          env.penalty(3);
          env.flash('rgba(179,58,43,0.34)', 0.3);
          env.playSfx('miss');
          continue;
        }
        /* an item that reaches the floor uncaught costs nothing: a trial is
           not a punishment, and a missed animal simply walks past. */
        if (it.y > env.H + 30) { this.items.splice(i, 1); }
      }
    },

    draw: function () {
      var env = this.env, ctx = env.ctx, i;
      var side = (env.hero.x < env.W / 2) ? 0 : 1;

      /* the two zones, drawn over the earth band */
      var zy = env.H - env.GROUND - 24, zh = env.GROUND + 24;
      for (i = 0; i < 2; i++) {
        ctx.fillStyle = (i === side) ? 'rgba(224,169,62,0.30)' : 'rgba(58,36,23,0.16)';
        ctx.fillRect(i * env.W / 2, zy, env.W / 2, zh);
        ctx.strokeStyle = 'rgba(58,36,23,0.45)';
        ctx.lineWidth = 2;
        ctx.strokeRect(i * env.W / 2 + 1, zy, env.W / 2 - 2, zh - 1);
        ctx.fillStyle = (i === side) ? '#3a2417' : 'rgba(58,36,23,0.72)';
        ctx.font = 'bold 15px Palatino, Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.cats[i].label || '', i * env.W / 2 + env.W / 4, zy + 15);
        /* an optional actor badge: the ark on the accepting side, etc. */
        if (this.cats[i].actor) {
          var badge = env.actorImage(this.cats[i].actor, {}, 64);
          if (env.imgReady(badge)) {
            ctx.drawImage(badge, i * env.W / 2 + env.W / 4 - 22, zy + 24, 44, 44);
          }
        }
      }
      /* the dividing line the basket is judged against */
      ctx.strokeStyle = 'rgba(58,36,23,0.55)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(env.W / 2, env.FIELD - 30);
      ctx.lineTo(env.W / 2, env.H - env.GROUND);
      ctx.stroke();

      /* the word is the QUESTION here (which zone does THIS belong in?), so
         unlike the duel phases the tile carries its label */
      for (i = 0; i < this.items.length; i++) {
        env.drawTile(this.items[i].word, this.items[i].x, this.items[i].y, 56,
                     { label: true });
      }
      this.drawBasket();
      promptBanner(env, this.banner);
    },

    /* the gangway basket the player steers: a wicker box with rope handles */
    drawBasket: function () {
      var env = this.env, ctx = env.ctx;
      var x = env.hero.x, y = env.CATCH + 12, w = 88, h = 40;
      ctx.save();
      ctx.fillStyle = (this.hint > 0) ? '#d8b45f' : '#c69a5a';
      env.roundRect(x - w / 2, y - h / 2, w, h, 8);
      ctx.fill();
      ctx.strokeStyle = '#7a5230';
      ctx.lineWidth = 2;
      env.roundRect(x - w / 2, y - h / 2, w, h, 8);
      ctx.stroke();
      /* weave */
      var i;
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = 'rgba(122,82,48,0.65)';
      for (i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(x - w / 2 + i * w / 5, y - h / 2 + 3);
        ctx.lineTo(x - w / 2 + i * w / 5, y + h / 2 - 3);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(x - w / 2 + 3, y); ctx.lineTo(x + w / 2 - 3, y);
      ctx.stroke();
      /* handles */
      ctx.strokeStyle = '#7a5230';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y - h / 2, 22, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.restore();
    },

    teardown: function () {
      if (this.env) { this.env.hero.hidden = false; }
      this.items = [];
      this.pool = [];
      this.env = null;
    }
  });

  /* ============================================================
     2. TRĀNSITUS — cross between the walls of water
     ------------------------------------------------------------
     A vertical-scrolling crossing: two walls close in from both
     sides and the dry corridor drifts and NARROWS. Stay in the dry
     lane; catch the right word to push the walls back. Mistakes
     narrow it further. Standing in the water costs time.

     Config (phase entry):
       wall:  actor name for the wall sprite (default 'murusAquae')
       water: base colour of the walls (default deep sea blue)

     TUNING                     region I     region IX+
       corridor at the start    ±92 px       ±80 px
       narrowing                3.4 px/s     4.6 px/s
       correct catch            +14 px, 1 hp
       wrong catch              −12 px, −3 s, +1 mistake
       in the water             −1.5 s every 0.6 s, one mistake per soaking
     ============================================================ */
  engine.registerPhase('transitus', {
    titulus: 'TRĀNSITUS',

    init: function (env, cfg) {
      var t = ramp(env);
      this.env = env;
      this.half = lerp(92, 80, t);
      this.narrow = lerp(3.4, 4.6, t);
      this.minHalf = 42;
      this.maxHalf = 132;
      this.phaseT = 0;                 /* drives the corridor's drift */
      this.scroll = 0;                 /* the scrolling water texture      */
      this.wet = 0;                    /* seconds spent in the water        */
      this.soaked = false;             /* one mistake per excursion         */
      this.items = [];
      this.spawnTimer = 0.7;
      this.fall = lerp(84, 104, t);
      this.wallActor = (cfg.data && cfg.data.wall) || 'murusAquae';
      this.water = (cfg.data && cfg.data.water) || '#2c5f7a';
      this.target = null;
      this.pick();
    },

    pick: function () {
      var env = this.env;
      if (!env.words.length) { this.target = null; return; }
      this.target = env.words[Math.floor(Math.random() * env.words.length)];
      env.speak(this.target.la);
    },

    corridorX: function () {
      /* a slow sine so the crossing is a steering task, not a memory test */
      return this.env.W / 2 + 78 * Math.sin(this.phaseT * 0.55);
    },

    update: function (dt) {
      var env = this.env, i, it, cx;
      this.phaseT += dt;
      this.scroll = (this.scroll + 70 * dt) % 40;
      this.half = Math.max(this.minHalf, this.half - this.narrow * dt);
      cx = this.corridorX();

      /* in the water? */
      if (Math.abs(env.hero.x - cx) > this.half - 22) {
        this.wet += dt;
        if (!this.soaked) {
          this.soaked = true;
          env.addMistake(1);
        }
        if (this.wet >= 0.6) {
          this.wet = 0;
          env.penalty(1.5);
          /* a light wash, not a blue screen: this fires repeatedly while the
             player is in the water, and at 0.34 the whole trial turned grey */
          env.flash('rgba(44,95,122,0.16)', 0.2);
          env.playSfx('miss');
        }
      } else {
        this.wet = 0;
        this.soaked = false;
      }

      /* the words fall INSIDE the corridor: reaching them is the reason to
         steer, and a word in the wall would be unreachable by construction. */
      if (!this.target) { return; }
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.items.length < 3) {
        var w = (Math.random() < 0.45)
          ? this.target
          : env.words[Math.floor(Math.random() * env.words.length)];
        this.items.push({
          word: w,
          /* stored as an OFFSET from the corridor centre, not an absolute x:
             the corridor drifts, and a word that stayed put would sail off
             into the wall where the player cannot reach it. */
          off: (Math.random() * 2 - 1) * (this.half - 30),
          x: cx,
          y: -30,
          vy: this.fall * (0.85 + Math.random() * 0.4)
        });
        this.spawnTimer = 0.8 + Math.random() * 0.5;
      }
      for (i = this.items.length - 1; i >= 0; i--) {
        it = this.items[i];
        it.y += it.vy * dt;
        /* ride the lane, clamped so a narrowing corridor pulls the word in */
        var lim = Math.max(0, this.half - 30);
        it.x = cx + Math.max(-lim, Math.min(lim, it.off));
        if (caught(env, it)) {
          if (it.word.la === this.target.la) {
            this.half = Math.min(this.maxHalf, this.half + 14);
            this.items.splice(i, 1);
            this.pick();
            env.damage(1);               /* may end the phase — return now */
            return;
          }
          this.half = Math.max(this.minHalf, this.half - 12);
          env.addMistake(1);
          env.penalty(3);
          env.flash('rgba(179,58,43,0.34)', 0.3);
          env.playSfx('miss');
          this.items.splice(i, 1);
          continue;
        }
        if (it.y > env.H + 30) { this.items.splice(i, 1); }
      }
    },

    /* the whole canvas is sea floor and water here, so this phase replaces
       the engine's fresco backdrop entirely. */
    backdrop: function () {
      var env = this.env, ctx = env.ctx, i;
      var g = ctx.createLinearGradient(0, 0, 0, env.H);
      g.addColorStop(0, '#f0e0bd');
      g.addColorStop(0.35, '#e3cfa4');
      g.addColorStop(1, '#c9a86f');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, env.W, env.H);
      /* wet sand ripples, scrolling downward = we are moving forward */
      ctx.strokeStyle = 'rgba(140,105,60,0.35)';
      ctx.lineWidth = 2;
      for (i = -1; i < env.H / 40 + 1; i++) {
        var y = i * 40 + this.scroll;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(env.W * 0.3, y - 7, env.W * 0.7, y + 7, env.W, y);
        ctx.stroke();
      }
    },

    draw: function () {
      var env = this.env, ctx = env.ctx, i;
      var cx = this.corridorX();
      var left = cx - this.half, right = cx + this.half;
      var top = env.FIELD - 76, bot = env.H;

      /* the two walls of water */
      ctx.save();
      var wl = ctx.createLinearGradient(0, 0, left, 0);
      wl.addColorStop(0, this.water);
      wl.addColorStop(1, 'rgba(120,190,215,0.92)');
      ctx.fillStyle = wl;
      ctx.fillRect(0, top, Math.max(0, left), bot - top);
      var wr = ctx.createLinearGradient(right, 0, env.W, 0);
      wr.addColorStop(0, 'rgba(120,190,215,0.92)');
      wr.addColorStop(1, this.water);
      ctx.fillStyle = wr;
      ctx.fillRect(right, top, Math.max(0, env.W - right), bot - top);

      /* foam crests along both faces, scrolling with the corridor */
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 3;
      for (i = 0; i < 6; i++) {
        var fy = top + ((i * 46 + this.scroll * 1.4) % (bot - top));
        ctx.beginPath();
        ctx.moveTo(left - 10, fy); ctx.lineTo(left, fy + 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(right + 10, fy); ctx.lineTo(right, fy + 8);
        ctx.stroke();
      }
      ctx.restore();

      /* the wall actor, tiled down each face — this is the art the config
         names, so a storm at sea can swap it for something else. */
      var wall = env.actorImage(this.wallActor, {}, 180);
      if (env.imgReady(wall)) {
        ctx.save();
        ctx.globalAlpha = 0.9;
        for (i = 0; i < 3; i++) {
          var y = top + i * 122 - (this.scroll * 0.5);
          /* Both faces are drawn UNFLIPPED and just inside their own wall.
             The mirrored version used to be placed by a translate/scale pair
             whose arithmetic put the right-hand wall INSIDE the dry corridor
             — the art stood in the lane the player was steering down. */
          ctx.drawImage(wall, left - 122, y, 130, 130);
          ctx.drawImage(wall, right - 8, y, 130, 130);
        }
        ctx.restore();
      }

      for (i = 0; i < this.items.length; i++) {
        env.drawTile(this.items[i].word, this.items[i].x, this.items[i].y, 54);
      }
      if (this.target) { promptBanner(env, this.target.la); }
    },

    teardown: function () {
      this.items = [];
      this.target = null;
      this.env = null;
    }
  });

  /* ============================================================
     3. SENTENTIA — complete the sentence, gently
     ------------------------------------------------------------
     The same syntax exercise as the boss's CLAMOR, without the
     pressure: the options sink at a third of the speed, a wrong
     catch costs two seconds and no shake, and the phase's clock is
     meant to be generous (50 s+ in content).

     Items come from, in order: the phase's own `items`, the trial's
     `sententiae`, the liber's capitula (derived exactly as clamor
     derives them — the same helper, so the two can never drift
     apart), and finally the vocabulary alone.
     ============================================================ */
  engine.registerPhase('sententia', {
    titulus: 'SENTENTIA',

    init: function (env, cfg) {
      var t = ramp(env);
      this.env = env;
      this.sink = lerp(16, 24, t);
      this.drift = lerp(22, 30, t);
      this.pool = this.buildPool(env, cfg);
      this.at = 0;
      this.item = null;
      this.cards = [];
      this.sceneImg = null;
      this.nextItem();
    },

    /* REUSE: clamor already owns the sentence-derivation rules (skip direct
       speech, 3–9 words, gap only on a dictionary form that has a picture).
       Duplicating them here would guarantee they diverge, so we borrow the
       object's own builders when js/boss-phases.js is loaded and fall back to
       plain vocabulary when it is not. */
    buildPool: function (env, cfg) {
      var clamor = (window.Boss && Boss.PHASES) ? Boss.PHASES.clamor : null;
      var authored = (cfg.data && cfg.data.items) ||
                     (env.config && env.config.sententiae) || null;
      var pool = [];
      if (authored && authored.length && clamor) {
        /* the label only names the phase in fromAuthored's validation
           warnings, so a content author is told WHICH list to fix */
        pool = clamor.fromAuthored(env, authored, 'SENTENTIA');
      }
      if (!pool.length && clamor) { pool = clamor.fromCapitula(env); }
      if (!pool.length && clamor) { pool = clamor.fromVocab(env); }
      if (!pool.length) { pool = this.plainVocab(env); }
      return env.shuffled(pool).slice(0, 24);
    },

    plainVocab: function (env) {
      var out = [], i, j, opts;
      for (i = 0; i < env.words.length; i++) {
        opts = [env.words[i]];
        for (j = 0; j < env.words.length && opts.length < 3; j++) {
          if (j !== i) { opts.push(env.words[j]); }
        }
        out.push({ text: env.words[i].la, verbum: true,
                   answer: env.words[i], options: opts, scene: null });
      }
      return out;
    },

    nextItem: function () {
      var env = this.env, i, opts, bandW, centre;
      if (!this.pool.length) { this.item = null; this.cards = []; return; }
      var at = this.at % this.pool.length;
      this.item = this.pool[at];
      this.at++;
      /* rastered at 96, drawn at 76 — see the same note in clamor's nextItem */
      this.sceneImg = this.item.scene
        ? env.sceneImage({ la: '__sententia__' + at, scene: this.item.scene }, 96)
        : null;
      opts = env.shuffled(this.item.options);
      this.cards = [];
      bandW = (env.W - 60) / opts.length;
      for (i = 0; i < opts.length; i++) {
        centre = 30 + i * bandW + bandW / 2;
        this.cards.push({
          word: opts[i],
          lo: centre - 20, hi: centre + 20,
          x: centre,
          y: env.FIELD - 30 - i * 22,
          vx: (Math.random() < 0.5 ? -1 : 1) * (this.drift * (0.7 + Math.random() * 0.6))
        });
      }
      env.speak(String(this.item.text).replace(/_{2,}/g, ' '));
    },

    update: function (dt) {
      var env = this.env, i, c;
      if (!this.item) { return; }
      for (i = 0; i < this.cards.length; i++) {
        c = this.cards[i];
        c.x += c.vx * dt;
        if (c.x < c.lo) { c.x = c.lo; c.vx = -c.vx; }
        if (c.x > c.hi) { c.x = c.hi; c.vx = -c.vx; }
        c.y += this.sink * dt;
        if (caught(env, c)) {
          if (c.word.la === this.item.answer.la) {
            this.cards = [];
            this.nextItem();
            env.damage(1);                /* may end the phase — return now */
            return;
          }
          env.addMistake(1);
          env.penalty(2);
          env.flash('rgba(179,58,43,0.26)', 0.26);
          env.playSfx('miss');
          c.y = env.FIELD - 50;
          continue;
        }
        if (c.y > env.H + 34) { c.y = env.FIELD - 50; }
      }
    },

    draw: function () {
      var env = this.env, ctx = env.ctx, i;
      if (!this.item) { return; }
      /* labelled for the same reason clāmor's cards are — see the note in
         js/boss-phases.js. The prompt is a gapped sentence, so reading the
         three candidate WORDS is the exercise, not a shortcut past it; and
         a 50 px picture cannot carry the distinction on its own (GAUNTLET
         F7). `verbum` items, whose prompt IS the word, stay mute. */
      var labelled = !this.item.verbum;
      for (i = 0; i < this.cards.length; i++) {
        env.drawTile(this.cards[i].word, this.cards[i].x, this.cards[i].y, 58,
                     { label: labelled });
      }
      var x = 8, y = env.TOP + 2, w = env.W - 16, h = 92;
      env.drawBanner(x, y, w, h);
      var textX = x + 12, textW = w - 24;
      if (env.imgReady(this.sceneImg)) {
        ctx.drawImage(this.sceneImg, x + 10, y + 8, 76, 76);
        textX = x + 94; textW = w - 108;
      }
      ctx.font = (this.item.verbum ? 'bold 26px' : '17px') + ' Palatino, Georgia, serif';
      ctx.textBaseline = 'middle';
      var lines = env.wrapText(this.item.text, textW), li;
      if (lines.length > 2) { lines = [lines[0], lines.slice(1).join(' ')]; }
      var cx = textX + textW / 2;
      var y0 = y + h / 2 - (lines.length - 1) * 11;
      for (li = 0; li < lines.length; li++) {
        drawGapLine(env, lines[li], cx, y0 + li * 22);
      }
    },

    teardown: function () {
      this.cards = [];
      this.item = null;
      this.pool = [];
      this.sceneImg = null;
      this.env = null;
    }
  });

  return {
    start: engine.start,
    stop: engine.stop,
    abort: engine.abort,
    registerPhase: engine.registerPhase,
    PHASES: engine.PHASES,
    state: engine.state,
    setFrameSource: engine.setFrameSource
  };
})();
