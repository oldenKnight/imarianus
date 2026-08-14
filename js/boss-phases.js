/* ============================================================
   boss-phases.js — the three FABULAE duel phases (ES5)
   ------------------------------------------------------------
   Registers into the Boss engine's phase registry (js/boss.js):

     caterva   catch the target word's picture      vocabulary
     clamor    the wolf shouts a sentence with a    SYNTAX  ← the
               gap; catch the picture that fills it   pedagogical core
     fuga      dodge the charging wolf and still    recall under
               catch the counter-word                pressure

   Each phase implements init(env, cfg) / update(dt) / draw() /
   teardown(). It never touches the canvas element, the clock, the
   HP pool, the HUD or the input: the engine owns those and hands
   the phase an `env` (see js/boss.js for the full surface).

   `cfg` is the entry from the content file, normalised by the
   engine:  { type, hp, seconds, legacy, data }
   where `data` is the RAW content entry, so a phase can read its
   own extra keys (clamor's authored `items`, for instance).

   DIFFICULTY: everything scales off env.regionIndex (0 = Silva),
   per DESIGN §6. The tuning table is in the comment above each
   phase — change numbers there, never scattered in the code.
   ============================================================ */
(function () {
  'use strict';

  if (!window.Boss || !Boss.registerPhase) {
    if (window.console) { console.error('[boss-phases] Boss engine not loaded'); }
    return;
  }

  /* ============================================================
     0. shared helpers
     ============================================================ */

  /* 0 at the first region, 1 from region IX on. Every difficulty knob is a
     linear interpolation over this one number, so "harder later" is a single
     concept instead of nine hand-tuned constants. */
  function ramp(env) {
    var i = env.regionIndex || 0;
    return Math.max(0, Math.min(1, i / 8));
  }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* strip the punctuation a Latin sentence wraps around a word, so
     'ambulat.' matches the vocab entry 'ambulat' and 'cūr?' matches 'cūr'. */
  function bare(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/^[“”"«»(\[¿¡]+/, '')
      .replace(/[.,;:!?“”"«»)\]]+$/, '');
  }
  function lower(s) { return String(s).toLowerCase(); }

  /* the trailing punctuation of a token, so a gap keeps the sentence's
     own full stop: 'ambulat.' → '____.' */
  function tail(token) {
    var m = /[.,;:!?“”"«»)\]]+$/.exec(String(token));
    return m ? m[0] : '';
  }

  /* a coarse part-of-speech guess, used only to keep distractors in the same
     class. content/README §2 lets an author declare `pars` explicitly; when
     they have, we believe them. */
  var PREPS = { 'in': 1, 'ad': 1, 'ex': 1, 'ē': 1, 'ab': 1, 'ā': 1, 'cum': 1,
                'dē': 1, 'sub': 1, 'per': 1, 'prō': 1, 'sine': 1 };
  function parsOf(word) {
    if (!word) { return 'aliud'; }
    if (word.pars) { return word.pars; }
    if (word.pos) { return word.pos; }               /* legacy alias */
    var la = lower(bare(word.la));
    if (Object.prototype.hasOwnProperty.call(PREPS, la)) { return 'praepositio'; }
    if (/(nt|t)$/.test(la)) { return 'verbum'; }
    return 'nomen';
  }

  /* pick `n` distractors: same part of speech first, anything else after,
     never the answer and never a word already standing in the sentence. */
  function distractors(env, answer, banned, n) {
    var same = [], other = [], i, w, la;
    var want = parsOf(answer);
    for (i = 0; i < env.words.length; i++) {
      w = env.words[i];
      la = lower(bare(w.la));
      if (la === lower(bare(answer.la))) { continue; }
      if (banned && Object.prototype.hasOwnProperty.call(banned, la)) { continue; }
      if (parsOf(w) === want) { same.push(w); } else { other.push(w); }
    }
    var pool = env.shuffled(same).concat(env.shuffled(other));
    return pool.slice(0, n);
  }

  /* falling/drifting catchable: is the hero under it, at catch height? */
  function caught(env, item) {
    return item.y > env.CATCH - 30 && item.y < env.CATCH + 34 &&
           Math.abs(item.x - env.hero.x) < 42;
  }

  /* the dark prompt banner every phase writes its Latin into */
  function promptBanner(env, text, sub) {
    var ctx = env.ctx;
    var w = 260, x = env.W / 2 - w / 2, y = env.TOP + 2, h = sub ? 54 : 46;
    env.drawBanner(x, y, w, h);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f6e8c9';
    ctx.font = 'bold 24px Palatino, Georgia, serif';
    ctx.fillText(text, env.W / 2, y + (sub ? 22 : 24));
    if (sub) {
      ctx.fillStyle = '#e0a93e';
      ctx.font = '13px Palatino, Georgia, serif';
      ctx.fillText(sub, env.W / 2, y + 42);
    }
  }

  /* ============================================================
     1. CATERVA — catch the target word's picture
     ------------------------------------------------------------
     The v1 boss game, rebalanced per DESIGN §6. BUG-4 was that 50 %
     of spawns were the target, only 4 items could be on screen and a
     wrong catch cost 3 seconds: holding one direction won the fight.

     TUNING                    region I        region IX+     legacy(v1)
       target share            35 %            25 %           35 %
       max items on screen     4               6              4
       spawn interval          0.75–1.00 s     0.55–0.80 s    0.75–1.20 s
       wrong catch             −4 s, +1 mistake               −3 s, +1
       fall speed (start)      95 px/s         120 px/s       80 px/s
       speed added per hit     7               7              6

     "legacy" is the no-`phases` config path (see buildPlan in boss.js):
     an older content file must keep playing EXACTLY as it shipped.
     ============================================================ */
  Boss.registerPhase('caterva', {
    titulus: 'CATERVA',

    init: function (env, cfg) {
      var t = ramp(env);
      this.env = env;
      this.legacy = !!cfg.legacy;
      this.items = [];
      this.target = null;
      this.speed = this.legacy ? 80 : lerp(95, 120, t);
      this.speedStep = this.legacy ? 6 : 7;
      this.share = this.legacy ? 0.35 : lerp(0.35, 0.25, t);
      this.maxItems = this.legacy ? 4 : Math.round(lerp(4, 6, t));
      this.spawnLo = this.legacy ? 0.75 : lerp(0.75, 0.55, t);
      this.spawnHi = this.legacy ? 1.20 : lerp(1.00, 0.80, t);
      this.wrongCost = this.legacy ? 3 : 4;
      this.spawnTimer = 0.4;
      this.pick();
    },

    pick: function () {
      var env = this.env;
      if (!env.words.length) { this.target = null; return; }
      var next = env.words[Math.floor(Math.random() * env.words.length)];
      /* never re-issue the same word twice running: the player would already
         be standing under the answer. */
      if (this.target && env.words.length > 1 && next.la === this.target.la) {
        next = env.words[(env.words.indexOf(next) + 1) % env.words.length];
      }
      this.target = next;
      env.speak(this.target.la);
    },

    spawn: function () {
      var env = this.env;
      var w = (Math.random() < this.share)
        ? this.target
        : env.words[Math.floor(Math.random() * env.words.length)];
      this.items.push({
        word: w,
        x: 34 + Math.random() * (env.W - 68),
        y: -30,
        vy: this.speed * (0.85 + Math.random() * 0.5)
      });
    },

    update: function (dt) {
      var env = this.env, i, it;
      if (!this.target) { return; }

      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.items.length < this.maxItems) {
        this.spawn();
        this.spawnTimer = this.spawnLo + Math.random() * (this.spawnHi - this.spawnLo);
      }

      for (i = this.items.length - 1; i >= 0; i--) {
        it = this.items[i];
        it.y += it.vy * dt;
        if (caught(env, it)) {
          if (it.word.la === this.target.la) {
            this.speed += this.speedStep;
            this.items.splice(i, 1);
            this.pick();
            env.damage(1);              /* may end the phase — nothing after it */
            return;
          }
          env.addMistake(1);
          env.penalty(this.wrongCost);
          env.flash('rgba(179,58,43,0.38)', 0.32);
          env.playSfx('miss');
          this.items.splice(i, 1);
          continue;
        }
        if (it.y > env.H + 30) { this.items.splice(i, 1); }
      }
    },

    draw: function () {
      var env = this.env, i;
      for (i = 0; i < this.items.length; i++) {
        env.drawTile(this.items[i].word, this.items[i].x, this.items[i].y, 56);
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
     2. CLAMOR — the wolf shouts a sentence with a gap
     ------------------------------------------------------------
     THE PEDAGOGICAL CORE (brief §4, DESIGN §6). Everywhere else in
     the app the learner is tested on vocabulary; this is the only
     place in the duel where they are tested on SYNTAX. Never cut it.

     The banner shows the sentence with the missing word marked, and
     — when the sentence came from a story page — that page's SCENE,
     so the sentence is comprehensible input rather than a puzzle.
     Three pictures drift in their own vertical lanes and sink; catch
     the one whose word completes the sentence.

     WHERE THE SENTENCES COME FROM, in order of preference:
       1. cfg.data.items    hand-authored, per phase entry
       2. boss.clamor       hand-authored, per region
       3. derived from the region's capitula story pages (below)
       4. vocabulary alone  — a region with no usable sentence still
                              gets a playable phase (word → picture)

     DERIVATION RULES (deliberately conservative — a bad gap teaches
     a wrong sentence, so we would rather derive fewer items):
       · skip any page with direct speech (quotes or a colon): a
         cloze inside quoted dialogue is usually ambiguous;
       · a sentence is 3–9 words;
       · the gap must be a vocab word WITH A PICTURE appearing in the
         sentence in exactly its dictionary form — no guessing at
         inflection;
       · distractors come from the same part of speech and may not
         already appear in the sentence.

     TUNING                     region I     region IX+
       sink speed               38 px/s      52 px/s
       drift speed              ±34 px/s     ±48 px/s
       wrong catch              −4 s, +1 mistake
     ============================================================ */
  Boss.registerPhase('clamor', {
    titulus: 'CLĀMOR',

    init: function (env, cfg) {
      var t = ramp(env);
      this.env = env;
      this.sink = lerp(38, 52, t);
      this.drift = lerp(34, 48, t);
      this.pool = this.buildPool(env, cfg);
      this.at = 0;
      this.item = null;
      this.cards = [];
      this.nextItem();
    },

    /* ---------- the sentence pool ---------- */

    buildPool: function (env, cfg) {
      var authored = (cfg.data && cfg.data.items) ||
                     (env.config && env.config.clamor) || null;
      if (authored && authored.length) {
        return env.shuffled(this.fromAuthored(env, authored));
      }
      var derived = this.fromCapitula(env);
      if (derived.length) { return env.shuffled(derived).slice(0, 24); }
      return env.shuffled(this.fromVocab(env));
    },

    /* authored: { text: 'Vulpēs in silvā ___.', answer: 'ambulat',
                   options: ['ambulat','sedet','cadit'], scene: SC.f1_walk } */
    fromAuthored: function (env, list) {
      var out = [], i, j, src, answer, opts, w;
      function find(la) {
        var k;
        for (k = 0; k < env.words.length; k++) {
          if (lower(bare(env.words[k].la)) === lower(bare(la))) { return env.words[k]; }
        }
        return null;
      }
      for (i = 0; i < list.length; i++) {
        src = list[i];
        answer = find(src.answer);
        if (!answer) { continue; }               /* no picture ⇒ unplayable */
        opts = [];
        for (j = 0; j < (src.options || []).length; j++) {
          w = find(src.options[j]);
          if (w) { opts.push(w); }
        }
        if (opts.length < 2) {
          opts = [answer].concat(distractors(env, answer, null, 2));
        }
        out.push({
          text: String(src.text).replace(/_{2,}/g, '____'),
          answer: answer,
          options: opts,
          scene: src.scene || null
        });
      }
      return out;
    },

    fromCapitula: function (env) {
      var out = [], ci, pi, cap, page, pages;
      var caps = env.capitula || [];
      for (ci = 0; ci < caps.length; ci++) {
        pages = (caps[ci] && caps[ci].story) || [];
        for (pi = 0; pi < pages.length; pi++) {
          page = pages[pi];
          if (!page || !page.la) { continue; }
          /* direct speech: a cloze inside a quotation is usually ambiguous */
          if (/[“”"«»:]/.test(page.la)) { continue; }
          this.harvest(env, page, out);
        }
      }
      return out;
    },

    /* pull every usable gap out of ONE story page */
    harvest: function (env, page, out) {
      var sentences = String(page.la).match(/[^.!?;]+[.!?;]*/g) || [];
      var si, ti, wi, tokens, tok, key, word, banned, gapText, item;
      for (si = 0; si < sentences.length; si++) {
        tokens = sentences[si].replace(/^\s+|\s+$/g, '').split(/\s+/);
        if (tokens.length < 3 || tokens.length > 9) { continue; }
        /* every word standing in this sentence is banned as a distractor:
           an option already visible in the banner is not a real choice. */
        banned = {};
        for (ti = 0; ti < tokens.length; ti++) { banned[lower(bare(tokens[ti]))] = true; }

        for (ti = 0; ti < tokens.length; ti++) {
          key = lower(bare(tokens[ti]));
          if (!key) { continue; }
          word = null;
          for (wi = 0; wi < env.words.length; wi++) {
            if (lower(bare(env.words[wi].la)) === key) { word = env.words[wi]; break; }
          }
          if (!word) { continue; }
          tok = tokens.slice();
          tok[ti] = '____' + tail(tokens[ti]);
          gapText = tok.join(' ');
          item = {
            text: gapText,
            answer: word,
            options: [word].concat(distractors(env, word, banned, 2)),
            scene: page.scene || null
          };
          if (item.options.length >= 2) { out.push(item); }
        }
      }
    },

    /* last resort: no sentence in this region is usable, so the wolf shouts a
       WORD and the player catches its picture. Still Latin-only, still
       playable — it just teaches less. */
    fromVocab: function (env) {
      var out = [], i, w;
      for (i = 0; i < env.words.length; i++) {
        w = env.words[i];
        out.push({
          text: w.la,
          verbum: true,
          answer: w,
          options: [w].concat(distractors(env, w, null, 2)),
          scene: null
        });
      }
      return out;
    },

    /* ---------- the round ---------- */

    nextItem: function () {
      var env = this.env, i, opts, bandW, centre;
      if (!this.pool.length) { this.item = null; this.cards = []; return; }
      var at = this.at % this.pool.length;
      this.item = this.pool[at];
      this.at++;
      /* keyed by the POOL INDEX, not by a counter: the cache must be reused
         when the pool cycles, or a long phase builds one Image per round. */
      this.sceneImg = this.item.scene
        ? env.sceneImage({ la: '__clamor__' + at, scene: this.item.scene })
        : null;

      opts = env.shuffled(this.item.options);
      this.cards = [];
      bandW = (env.W - 60) / opts.length;
      for (i = 0; i < opts.length; i++) {
        centre = 30 + i * bandW + bandW / 2;
        this.cards.push({
          word: opts[i],
          /* Each card sways around its OWN lane centre, ±22 px. The gaps
             between the lanes are what make the phase fair: the hero (catch
             radius 42) must be able to stand somewhere that touches no card
             while reading the sentence. Widen this and there is nowhere safe
             to stand — which reads as the game catching for you. */
          lo: centre - 22,
          hi: centre + 22,
          x: centre,
          y: env.FIELD - 40 - i * 26,
          vx: (Math.random() < 0.5 ? -1 : 1) * (this.drift * (0.7 + Math.random() * 0.6))
        });
      }
      /* the wolf SHOUTS it: the gap is read as a pause, never as "underscore" */
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
            env.damage(1);                 /* may end the phase — return now */
            return;
          }
          env.addMistake(1);
          env.penalty(4);
          env.flash('rgba(179,58,43,0.38)', 0.32);
          env.playSfx('miss');
          c.y = env.FIELD - 60;            /* the wrong card climbs back up */
          continue;
        }
        /* a card that sinks past the hero comes back around: the trio must
           stay complete or the answer could leave the screen. */
        if (c.y > env.H + 34) { c.y = env.FIELD - 60; }
      }
    },

    draw: function () {
      var env = this.env, ctx = env.ctx, i;
      if (!this.item) { return; }
      for (i = 0; i < this.cards.length; i++) {
        env.drawTile(this.cards[i].word, this.cards[i].x, this.cards[i].y, 58);
      }

      /* the shout: full-width banner, scene at the left, gap marked in gold */
      var x = 8, y = env.TOP + 2, w = env.W - 16, h = 72;
      env.drawBanner(x, y, w, h);
      var textX = x + 12, textW = w - 24;
      if (env.imgReady(this.sceneImg)) {
        ctx.drawImage(this.sceneImg, x + 10, y + 8, 56, 56);
        textX = x + 74;
        textW = w - 88;
      }
      ctx.font = (this.item.verbum ? 'bold 26px' : '17px') + ' Palatino, Georgia, serif';
      ctx.textBaseline = 'middle';
      var lines = env.wrapText(this.item.text, textW), li;
      if (lines.length > 2) { lines = [lines[0], lines.slice(1).join(' ')]; }
      var cx = textX + textW / 2;
      var y0 = y + h / 2 - (lines.length - 1) * 11;
      for (li = 0; li < lines.length; li++) {
        this.drawGapLine(lines[li], cx, y0 + li * 22);
      }
    },

    /* draw one line word by word so the ____ can be a gold slot instead of
       four underscores the learner has to squint at. */
    drawGapLine: function (line, cx, y) {
      var ctx = this.env.ctx;
      var words = String(line).split(' ');
      var total = ctx.measureText(line).width;
      var x = cx - total / 2, i, wtxt, wid;
      ctx.textAlign = 'left';
      for (i = 0; i < words.length; i++) {
        wtxt = words[i];
        wid = ctx.measureText(wtxt).width;
        if (wtxt.indexOf('____') === 0) {
          ctx.fillStyle = 'rgba(224,169,62,0.28)';
          this.env.roundRect(x - 2, y - 12, wid + 4, 24, 5);
          ctx.fill();
          ctx.fillStyle = '#e0a93e';
          ctx.fillText(wtxt, x, y);
        } else {
          ctx.fillStyle = '#f6e8c9';
          ctx.fillText(wtxt, x, y);
        }
        x += ctx.measureText(wtxt + ' ').width;
      }
      ctx.textAlign = 'center';
    },

    teardown: function () {
      this.cards = [];
      this.item = null;
      this.pool = [];
      this.sceneImg = null;
      this.env = null;
    }
  });

  /* ============================================================
     3. FUGA — dodge the charge, still catch the counter-word
     ------------------------------------------------------------
     Recall under pressure. The wolf picks one of three lanes, the
     lane GLOWS for the telegraph window, then he charges down it.
     Standing in that lane on impact costs 3 seconds and a mistake.
     Between charges the counter-word is shown and its picture must
     be caught to land a hit — so the player has to read while
     watching the lane. That is the whole point of the phase.

     TUNING                    region I     region IX+
       telegraph window        0.90 s       0.62 s
       time between charges    1.9–2.6 s    1.3–1.9 s
       charge descent          0.30 s       0.24 s
       target share            45 %         35 %
       being hit               −3 s, +1 mistake
       wrong catch             −4 s, +1 mistake
     ============================================================ */
  Boss.registerPhase('fuga', {
    titulus: 'FUGA',

    init: function (env, cfg) {
      var t = ramp(env);
      this.env = env;
      this.lanes = 3;
      this.telegraph = lerp(0.90, 0.62, t);
      this.gapLo = lerp(1.9, 1.3, t);
      this.gapHi = lerp(2.6, 1.9, t);
      this.descent = lerp(0.30, 0.24, t);
      this.share = lerp(0.45, 0.35, t);
      this.fall = lerp(90, 110, t);

      this.state = 'wait';
      this.timer = 1.1;                 /* a calm first second to read the word */
      this.lane = 1;
      this.items = [];
      this.spawnTimer = 0.5;
      this.target = null;
      this.pick();
    },

    laneBounds: function (i) {
      var w = this.env.W / this.lanes;
      return { lo: i * w, hi: (i + 1) * w, cx: i * w + w / 2 };
    },

    pick: function () {
      var env = this.env;
      if (!env.words.length) { this.target = null; return; }
      this.target = env.words[Math.floor(Math.random() * env.words.length)];
      env.speak(this.target.la);
    },

    update: function (dt) {
      var env = this.env, i, it, b;

      /* ---- the charge cycle ---- */
      this.timer -= dt;
      if (this.state === 'wait' && this.timer <= 0) {
        this.state = 'telegraph';
        this.timer = this.telegraph;
        this.lane = Math.floor(Math.random() * this.lanes);
        env.playSfx('tick');
      } else if (this.state === 'telegraph' && this.timer <= 0) {
        this.state = 'charge';
        this.timer = this.descent;
        env.playSfx('roar');
      } else if (this.state === 'charge' && this.timer <= 0) {
        /* impact: the lane the hero is standing in is the only thing that
           matters — this is a dodge, not a hitbox puzzle. */
        b = this.laneBounds(this.lane);
        if (env.hero.x >= b.lo && env.hero.x <= b.hi) {
          env.addMistake(1);
          env.penalty(3);
          env.flash('rgba(179,58,43,0.42)', 0.35);
          env.playSfx('miss');
        } else {
          env.flash('rgba(224,169,62,0.16)', 0.16);
          env.playSfx('dodge');
        }
        this.state = 'recover';
        this.timer = 0.42;
      } else if (this.state === 'recover' && this.timer <= 0) {
        this.state = 'wait';
        this.timer = this.gapLo + Math.random() * (this.gapHi - this.gapLo);
      }

      /* ---- where the wolf is, this frame ---- */
      b = this.laneBounds(this.lane);
      if (this.state === 'charge') {
        var k = 1 - Math.max(0, this.timer) / this.descent;      /* 0 → 1 */
        env.foe.x = b.cx;
        env.foe.y = lerp(96, env.HERO_Y - 46, k);
        env.foe.scale = lerp(1, 1.16, k);
      } else if (this.state === 'recover') {
        var r = Math.max(0, this.timer) / 0.42;                  /* 1 → 0 */
        env.foe.x = lerp(env.W / 2, b.cx, r);
        env.foe.y = lerp(96, env.HERO_Y - 46, r);
        env.foe.scale = lerp(1, 1.16, r);
      } else {
        env.foe.x = env.W / 2;
        env.foe.y = 96;
        env.foe.scale = 1;
      }

      /* ---- the counter-word, falling as usual ---- */
      if (!this.target) { return; }
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0 && this.items.length < 3) {
        var w = (Math.random() < this.share)
          ? this.target
          : env.words[Math.floor(Math.random() * env.words.length)];
        this.items.push({
          word: w,
          x: 34 + Math.random() * (env.W - 68),
          y: -30,
          vy: this.fall * (0.85 + Math.random() * 0.4)
        });
        this.spawnTimer = 0.75 + Math.random() * 0.5;
      }
      for (i = this.items.length - 1; i >= 0; i--) {
        it = this.items[i];
        it.y += it.vy * dt;
        if (caught(env, it)) {
          if (it.word.la === this.target.la) {
            this.items.splice(i, 1);
            this.pick();
            env.damage(1);                /* may end the phase — return now */
            return;
          }
          env.addMistake(1);
          env.penalty(4);
          env.flash('rgba(179,58,43,0.38)', 0.32);
          env.playSfx('miss');
          this.items.splice(i, 1);
          continue;
        }
        if (it.y > env.H + 30) { this.items.splice(i, 1); }
      }
    },

    draw: function () {
      var env = this.env, ctx = env.ctx, i, b;

      /* the telegraphed lane: a warm column of light down the play field,
         pulsing faster as the charge approaches. */
      if (this.state === 'telegraph' || this.state === 'charge') {
        b = this.laneBounds(this.lane);
        var k = (this.state === 'charge')
          ? 1
          : 1 - Math.max(0, this.timer) / this.telegraph;
        var pulse = 0.18 + 0.22 * Math.abs(Math.sin(k * Math.PI * 5));
        var grad = ctx.createLinearGradient(0, env.FIELD - 40, 0, env.H - env.GROUND);
        grad.addColorStop(0, 'rgba(179,58,43,0)');
        grad.addColorStop(1, 'rgba(179,58,43,' + pulse.toFixed(3) + ')');
        ctx.fillStyle = grad;
        ctx.fillRect(b.lo + 3, env.FIELD - 40, (b.hi - b.lo) - 6, env.H - env.GROUND - env.FIELD + 40);
        /* chevrons at the foot of the lane: the "get out of here" sign */
        ctx.fillStyle = 'rgba(179,58,43,' + (0.35 + pulse).toFixed(3) + ')';
        var cxx = b.cx, yy = env.H - env.GROUND - 10;
        ctx.beginPath();
        ctx.moveTo(cxx - 16, yy - 10); ctx.lineTo(cxx, yy);
        ctx.lineTo(cxx + 16, yy - 10); ctx.lineTo(cxx + 16, yy - 3);
        ctx.lineTo(cxx, yy + 7); ctx.lineTo(cxx - 16, yy - 3);
        ctx.closePath();
        ctx.fill();
      }

      for (i = 0; i < this.items.length; i++) {
        env.drawTile(this.items[i].word, this.items[i].x, this.items[i].y, 54);
      }
      if (this.target) { promptBanner(env, this.target.la); }
    },

    teardown: function () {
      this.items = [];
      this.target = null;
      if (this.env) {
        this.env.foe.x = this.env.W / 2;
        this.env.foe.y = 96;
        this.env.foe.scale = 1;
      }
      this.env = null;
    }
  });
}());
