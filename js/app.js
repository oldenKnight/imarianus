/* ============================================================
   app.js — UI router + gamification + exercise engines (ES5)
   Screens: splash → home (fable path) → step screens.
   Steps per fable: verba, fabula, ludus, aenigmata, corrige,
   comple. XP +10 per correct, +20 step bonus. 5 hearts; at 0
   the learner restores them by reviewing vocabulary (never a
   paywall, always more input — that is the pedagogy).
   ============================================================ */
(function () {
  'use strict';

  var S;                 /* state (Storage) */
  var app;               /* #app container */
  var topbarShowBack = false; /* whether topbar currently shows the back arrow */
  var UI = DATA.UI;
  var STEPS = DATA.STEPS;
  var ICONS = DATA.STEP_ICONS;

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

  function isStepDone(fid, step) {
    return !!(S.completed[fid] && S.completed[fid][step]);
  }
  function fableDone(fi) {
    var f = DATA.fables[fi], i;
    for (i = 0; i < STEPS.length; i++) {
      if (!isStepDone(f.id, STEPS[i])) { return false; }
    }
    return true;
  }
  function fableUnlocked(fi) {
    return fi === 0 || fableDone(fi - 1);
  }
  function stepUnlocked(fi, si) {
    if (!fableUnlocked(fi)) { return false; }
    if (si === 0) { return true; }
    return isStepDone(DATA.fables[fi].id, STEPS[si - 1]);
  }

  /* =================== chrome =================== */

  /* renders the small visual for a vocab/aenigmata item: either a compact
     SVG scene (preferred when available) or the legacy emoji glyph. Used by
     verba check, refill, and aenigmata memory so the new scene-based vocab
     (silva, vōx, pulcher, rīvus) flows through every exercise. */
  function visualFor(item) {
    if (item.scene) {
      return '<span class="scn-thumb">' + Scenes.render(item.scene) + '</span>';
    }
    return item.emoji || '';
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
    var hearts = '';
    var i;
    for (i = 0; i < S.maxHearts; i++) {
      hearts += (i < S.hearts) ? '❤️' : '🖤';
    }
    var backChip = topbarShowBack
      ? '<button class="chip nav-back" type="button" aria-label="redī">←</button>'
      : '';
    bar.innerHTML =
      backChip +
      '<button class="chip nav-home" type="button" aria-label="' + UI.domus + '">🏠</button>' +
      '<button class="chip nav-map" type="button" aria-label="' + DATA.MAP_UI.provincia + '">🗺️</button>' +
      '<span class="chip stat">🔥 ' + S.streak + '</span>' +
      '<span class="chip stat hearts">' + hearts + '</span>' +
      '<span class="chip stat">⭐ ' + S.xp + '</span>' +
      '<button class="chip nav-ordo" type="button" aria-label="' + UI.ordo + '">🏆</button>';
    $('.nav-home', bar).addEventListener('click', function () { stopAllGames(); showHome(); });
    $('.nav-map', bar).addEventListener('click', function () { stopAllGames(); showMap(); });
    $('.nav-ordo', bar).addEventListener('click', function () { stopAllGames(); showOrdo(); });
    if (topbarShowBack) {
      $('.nav-back', bar).addEventListener('click', function () { stopAllGames(); showHome(); });
    }
  }

  /* stop whichever canvas game might be running before navigating away */
  function stopAllGames() {
    if (window.Game && Game.stop) { Game.stop(); }
    if (window.Boss && Boss.stop) { Boss.stop(); }
  }

  function setScreen(html, cls) {
    app.className = 'screen ' + (cls || '');
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

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
      showHome();
    }
    $('#go').addEventListener('click', go);
    inp.addEventListener('keydown', function (e) { if (e.keyCode === 13) { go(); } });
    inp.focus();
  }

  /* =================== home: the fable path =================== */

  function showHome() {
    renderTopbar(false);
    var html = '<header class="home-head">' +
      '<h2>' + esc(UI.salve) + ', <span id="uname"></span>!</h2></header>';
    html += '<nav class="path" aria-label="cursus">';
    var fi, si, f, cls, icon, done, unlocked;
    for (fi = 0; fi < DATA.fables.length; fi++) {
      f = DATA.fables[fi];
      unlocked = fableUnlocked(fi);
      html += '<section class="fable-block' + (unlocked ? '' : ' locked') + '">' +
        '<h3><span class="fnum">' + ['I', 'II', 'III'][fi] + '</span> ' + esc(f.titulus) + ' <span class="ficon">' + f.icon + '</span>' +
        (fableDone(fi) ? ' <span class="crown">👑</span>' : '') + '</h3>' +
        '<ol class="steps">';
      for (si = 0; si < STEPS.length; si++) {
        done = isStepDone(f.id, STEPS[si]);
        cls = done ? 'done' : (stepUnlocked(fi, si) ? 'open' : 'shut');
        icon = done ? '✔' : (cls === 'shut' ? '🔒' : ICONS[STEPS[si]]);
        html += '<li><button type="button" class="node ' + cls + '" data-f="' + fi + '" data-s="' + si + '"' +
          (cls === 'shut' ? ' disabled' : '') + '>' +
          '<span class="node-icon">' + icon + '</span>' +
          '<span class="node-label">' + esc(UI[STEPS[si]]) + '</span>' +
          '</button></li>';
      }
      html += '</ol></section>';
    }
    /* stubbed future languages */
    html += '<section class="fable-block locked future">' +
      '<h3>🇬🇧 English · 🇪🇸 Español <span class="soon">' + esc(UI.proximamente) + '</span></h3></section>';
    html += '</nav>';
    setScreen(html, 'home-screen');
    $('#uname').textContent = S.name;
    $all('.node.open, .node.done').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fi2 = parseInt(btn.getAttribute('data-f'), 10);
        var si2 = parseInt(btn.getAttribute('data-s'), 10);
        startStep(fi2, si2);
      });
    });
  }

  /* =================== leaderboard =================== */

  function showOrdo() {
    renderTopbar(false);
    var rows = DATA.BOTS.slice();
    rows.push({ name: S.name, xp: S.xp, me: true });
    rows.sort(function (a, b) { return b.xp - a.xp; });
    var html = '<section class="ordo"><h2>🏆 ' + esc(UI.ordo) + '</h2><ol class="board">';
    var i, medal;
    for (i = 0; i < rows.length; i++) {
      medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
      html += '<li class="' + (rows[i].me ? 'me' : '') + '">' +
        '<span class="rank">' + medal + '</span>' +
        '<span class="bname">' + esc(rows[i].name) + (rows[i].me ? ' 🦊' : '') + '</span>' +
        '<span class="bxp">⭐ ' + rows[i].xp + '</span></li>';
    }
    html += '</ol>' +
      '<div class="ordo-actions">' +
        '<button id="logout" class="btn ghost small" type="button">⎋ exī (logout)</button>' +
      '</div>' +
      '</section>';
    setScreen(html, 'ordo-screen');
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

  /* =================== PRŌVINCIA: the overworld map =================== */

  /* a region is "fables done" when every spine fable in it is fully complete */
  function regionFablesDone(region) {
    var i;
    for (i = 0; i < region.fables.length; i++) {
      var fi = fableIndexById(region.fables[i]);
      if (fi < 0 || !fableDone(fi)) { return false; }
    }
    return true;
  }
  function fableIndexById(id) {
    var i;
    for (i = 0; i < DATA.fables.length; i++) {
      if (DATA.fables[i].id === id) { return i; }
    }
    return -1;
  }
  function regionById(id) {
    var i;
    for (i = 0; i < DATA.REGIONS.length; i++) {
      if (DATA.REGIONS[i].id === id) { return DATA.REGIONS[i]; }
    }
    return null;
  }
  /* boss fully cleared = fight won AND quiz passed */
  function bossCleared(regionId) {
    var b = S.bosses[regionId];
    return !!(b && b.fight && b.quiz);
  }

  /* compute the click-state of each map node from progress */
  function mapModel() {
    var nodes = [];
    var i;
    for (i = 0; i < DATA.MAP.nodes.length; i++) {
      var src = DATA.MAP.nodes[i];
      var n = {
        id: src.id, kind: src.kind, x: src.x, y: src.y,
        label: src.label, links: src.links, state: 'shut'
      };
      if (src.kind === 'fable') {
        var fi = fableIndexById(src.fable);
        n.state = fableDone(fi) ? 'done' : (fableUnlocked(fi) ? 'open' : 'shut');
      } else if (src.kind === 'boss') {
        var reg = regionById(src.region);
        if (bossCleared(src.region)) { n.state = 'done'; }
        else if (reg && regionFablesDone(reg)) { n.state = 'open'; }
        else { n.state = 'shut'; }
      } else { /* gate */
        n.state = 'shut';
      }
      nodes.push(n);
    }
    return { nodes: nodes, foxNode: S.mapNode || 'f1' };
  }

  function showMap() {
    renderTopbar(false);
    var model = mapModel();
    var html =
      '<section class="provincia">' +
        '<header class="prov-head"><h2>🗺️ ' + esc(DATA.MAP_UI.provincia) + '</h2>' +
        '<p class="prov-sub">' + esc(DATA.MAP_UI.cursus) + ' ↔ ' + esc(DATA.MAP_UI.provincia) + '</p></header>' +
        '<div class="map-frame">' + WorldMap.render(model) + '</div>' +
        '<button id="to-cursus" class="btn primary" type="button">📜 ' + esc(DATA.MAP_UI.cursus) + '</button>' +
      '</section>';
    setScreen(html, 'map-screen');
    WorldMap.bind($('.map-frame'), model, {
      onNode: function (id, kind) {
        if (kind === 'fable') {
          /* move the fox there, then open the spine fable at its first
             unfinished step (or verba if all done) */
          S.mapNode = id; save();
          var fi = fableIndexById(id);
          var si = firstOpenStep(fi);
          startStep(fi, si);
        } else if (kind === 'boss') {
          S.mapNode = id; save();
          showBossIntro(id);
        }
      }
    });
    $('#to-cursus').addEventListener('click', showHome);
  }

  /* first not-yet-done step index in a fable (for jumping in from the map) */
  function firstOpenStep(fi) {
    var f = DATA.fables[fi], i;
    for (i = 0; i < STEPS.length; i++) {
      if (!isStepDone(f.id, STEPS[i])) { return i; }
    }
    return 0;
  }

  /* =================== BOSS: intro → timed fight → quiz =================== */

  function showBossIntro(nodeId) {
    renderTopbar(true);
    var node = mapNodeById(nodeId);
    var region = regionById(node.region);
    var boss = region.boss;
    var html =
      '<section class="boss-intro">' +
        '<figure class="scene">' + Scenes.render({ bg: 'river', items: [{ t: 'wolf', x: 200, y: 150, pose: 'leap', s: 1.3 }] }) + '</figure>' +
        '<h2>👑 ' + esc(boss.name) + '</h2>' +
        '<p class="boss-tag">' + esc(DATA.MAP_UI.bossReady) + '</p>' +
        '<button id="fight" class="btn primary" type="button">⚔ ' + esc(DATA.MAP_UI.pugna) + '</button>' +
      '</section>';
    setScreen(html, 'boss-intro-screen');
    $('#fight').addEventListener('click', function () { runBossFight(nodeId); });
  }

  function mapNodeById(id) {
    var i;
    for (i = 0; i < DATA.MAP.nodes.length; i++) {
      if (DATA.MAP.nodes[i].id === id) { return DATA.MAP.nodes[i]; }
    }
    return null;
  }

  /* build the boss word pool from the region's fables (reuse their ludus art) */
  function bossWords(region) {
    var words = [], seen = {}, i, j;
    for (i = 0; i < region.fables.length; i++) {
      var fi = fableIndexById(region.fables[i]);
      var vocab = DATA.fables[fi].vocab;
      for (j = 0; j < vocab.length; j++) {
        if (hasVisual(vocab[j]) && !seen[vocab[j].la]) {
          seen[vocab[j].la] = true;
          words.push(vocab[j]);
        }
      }
    }
    return words;
  }

  /* SWAP POINT: replace this one function's body to drop in a platformer boss.
     It must call onWin()/onLose() to keep the unlock flow intact. */
  function runBossFight(nodeId) {
    renderTopbar(true);
    var node = mapNodeById(nodeId);
    var region = regionById(node.region);
    var boss = region.boss;
    var html = '<section class="boss-wrap">' +
      '<p class="ask">' + esc(DATA.MAP_UI.bossReady) + ' ⬅ ➡</p>' +
      '<canvas id="bossgame" aria-label="pugna"></canvas>' +
      '</section>';
    setScreen(html, 'boss-screen');
    var cv = $('#bossgame');
    Boss.start(cv, { words: bossWords(region), hp: boss.hp, seconds: boss.seconds }, {
      onEnd: function (won) {
        if (won) {
          /* optimistic mirror update */
          if (!S.bosses[region.id]) { S.bosses[region.id] = {}; }
          S.bosses[region.id].fight = true;
          save();
          /* server records the fight + grants fight XP once, then we proceed */
          if (typeof Api !== 'undefined') {
            Api.bossFight(region.id, function (err, data) {
              if (!err && data && data.snapshot) {
                Storage.reconcile(S, data.snapshot);
                renderTopbar();
              }
              runBossQuiz(nodeId);
            });
          } else {
            addXP(30);
            runBossQuiz(nodeId);
          }
        } else {
          showBossResult(nodeId, false);
        }
      }
    });
  }

  /* the 5-question cumulative quiz that finishes the boss */
  function runBossQuiz(nodeId) {
    renderTopbar(true);
    var node = mapNodeById(nodeId);
    var region = regionById(node.region);
    var quiz = region.boss.quiz.slice();
    /* resolve each quiz entry to a vocab item (with its visual) */
    var pool = bossWords(region);
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
        Api.bossQuiz(region.id, answers, function (err, data) {
          if (!err && data) {
            if (data.snapshot) { Storage.reconcile(S, data.snapshot); renderTopbar(); }
            showBossResult(nodeId, !!data.passed);
            return;
          }
          /* network fell over: fall back to the local tally so the lesson
             isn't blocked; server will reconcile on next load. */
          var passedLocal = (wrong <= 1);
          if (passedLocal) {
            if (!S.bosses[region.id]) { S.bosses[region.id] = {}; }
            S.bosses[region.id].quiz = true; save();
          }
          showBossResult(nodeId, passedLocal);
        });
      } else {
        var passed = (wrong <= 1);
        if (passed) {
          if (!S.bosses[region.id]) { S.bosses[region.id] = {}; }
          S.bosses[region.id].quiz = true; save();
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
        '<div class="opt-row">';
      var k;
      for (k = 0; k < opts.length; k++) {
        html += '<button type="button" class="opt emoji-opt" data-la="' + esc(opts[k].la) + '">' + visualFor(opts[k]) + '</button>';
      }
      html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + items.length + '</p></section>';
      setScreen(html, 'boss-quiz-screen');
      AudioLA.speak(q.la);
      $('#say').addEventListener('click', function () { AudioLA.speak(q.la); });
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

  function showBossResult(nodeId, won) {
    renderTopbar(false);
    var node = mapNodeById(nodeId);
    var region = regionById(node.region);
    var fullyClear = bossCleared(region.id);
    var html = '<section class="finis">';
    if (won && fullyClear) {
      html += '<p class="euge">' + esc(DATA.MAP_UI.vicisti) + ' 👑</p>' +
        '<figure class="mascot">' + Scenes.mascot(96) + '</figure>' +
        '<p class="bonus">+30 ⭐</p>';
    } else if (won) {
      /* won the fight but quiz not yet passed, or vice-versa */
      html += '<p class="euge">' + esc(UI.euge) + ' 🎉</p>' +
        '<figure class="mascot">' + Scenes.mascot(96) + '</figure>';
    } else {
      html += '<p class="euge">' + esc(DATA.MAP_UI.victus) + '</p>' +
        '<figure class="scene small">' + Scenes.render({ bg: 'river', items: [{ t: 'wolf', x: 200, y: 150, pose: 'stand' }] }) + '</figure>';
    }
    html += '<button id="back-map" class="btn primary" type="button">🗺️ ' + esc(DATA.MAP_UI.provincia) + '</button>' +
      '</section>';
    setScreen(html, 'finis-screen');
    $('#back-map').addEventListener('click', showMap);
  }

  /* =================== step dispatcher =================== */

  function startStep(fi, si) {
    Game.stop();
    var step = STEPS[si];
    if (S.hearts <= 0 && step !== 'verba') { showRefill(fi); return; }
    if (step === 'verba') { runVerba(fi); }
    else if (step === 'fabula') { runFabula(fi); }
    else if (step === 'ludus') { runLudus(fi); }
    else if (step === 'aenigmata') { runAenigmata(fi); }
    else if (step === 'corrige') { runCorrige(fi); }
    else if (step === 'comple') { runComple(fi); }
  }

  function stepHeader(fi, step) {
    var f = DATA.fables[fi];
    return '<header class="step-head"><span class="step-ic">' + ICONS[step] + '</span>' +
      '<h2>' + esc(UI[step]) + '</h2><p class="step-fab">' + esc(f.titulus) + '</p></header>';
  }

  function finishStep(fi, step, bonusXP, extraHTML) {
    var f = DATA.fables[fi];
    /* optimistic local update so the UI is instant... */
    var first = completeStep(f.id, step);
    if (first && bonusXP) { addXP(bonusXP); }
    /* ...then tell the server, which is authoritative. It grants XP only on a
       genuine first completion (idempotent), enforces prerequisites, and hands
       back the true snapshot we reconcile into the mirror. */
    if (typeof Api !== 'undefined') {
      Api.completeStep(f.id, step, (bonusXP || 0), function (err, data) {
        if (!err && data && data.snapshot) {
          Storage.reconcile(S, data.snapshot);
          renderTopbar();
        }
      });
    }
    var html = '<section class="finis">' +
      '<p class="euge">' + esc(UI.euge) + ' 🎉</p>' +
      '<figure class="mascot">' + Scenes.mascot(96) + '</figure>' +
      (bonusXP && first ? '<p class="bonus">+' + bonusXP + ' ⭐</p>' : '') +
      (extraHTML || '') +
      '<button id="cont" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button>' +
      '</section>';
    setScreen(html, 'finis-screen');
    $('#cont').addEventListener('click', showHome);
  }

  function heartsOut(fi) {
    Game.stop();
    showRefill(fi);
  }

  /* hearts refill: review vocabulary (more input, never a wall) */
  function showRefill(fi) {
    renderTopbar(true);
    var f = DATA.fables[fi];
    var pool = [];
    var i;
    for (i = 0; i < f.vocab.length; i++) {
      if (hasVisual(f.vocab[i])) { pool.push(f.vocab[i]); }
    }
    /* recycle earlier fables' vocab too */
    var j, k;
    for (j = 0; j < fi; j++) {
      for (k = 0; k < DATA.fables[j].vocab.length; k++) {
        if (hasVisual(DATA.fables[j].vocab[k])) { pool.push(DATA.fables[j].vocab[k]); }
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
        $('#cont').addEventListener('click', showHome);
        return;
      }
      var q = quiz[idx];
      var opts = shuffle([q].concat(shuffle(pool.filter(function (w) { return w.la !== q.la; })).slice(0, 2)));
      var html = '<section class="refill">' +
        '<h2>💔 ' + esc(UI.nullaCorda) + '</h2>' +
        '<p class="prompt-word">' + esc(q.la) + '</p>' +
        '<div class="opt-row">';
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
    var f = DATA.fables[fi];
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
      AudioLA.speak(v.la);
      $('#say').addEventListener('click', function () { AudioLA.speak(v.la); });
      $('#next').addEventListener('click', function () { i++; AudioLA.stop(); card(); });
    }

    /* quick check: word → pick the matching image */
    function check() {
      var pool = [];
      var k;
      for (k = 0; k < f.vocab.length; k++) {
        if (hasVisual(f.vocab[k])) { pool.push(f.vocab[k]); }
      }
      var quiz = shuffle(pool).slice(0, 4);
      var qi = 0;
      function ask() {
        if (qi >= quiz.length) {
          finishStep(fi, 'verba', 20);
          return;
        }
        var q = quiz[qi];
        var opts = shuffle([q].concat(shuffle(pool.filter(function (w) { return w.la !== q.la; })).slice(0, 2)));
        var html = stepHeader(fi, 'verba') +
          '<section class="quickcheck">' +
          '<p class="ask">' + esc(UI.quaerere) + '</p>' +
          '<p class="prompt-word">' + esc(q.la) + ' <button type="button" id="say" class="speak" aria-label="audi">🔊</button></p>' +
          '<div class="opt-row">';
        var i2;
        for (i2 = 0; i2 < opts.length; i2++) {
          html += '<button type="button" class="opt emoji-opt" data-la="' + esc(opts[i2].la) + '">' + visualFor(opts[i2]) + '</button>';
        }
        html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + quiz.length + '</p></section>';
        setScreen(html, 'verba-screen');
        AudioLA.speak(q.la);
        $('#say').addEventListener('click', function () { AudioLA.speak(q.la); });
        $all('.emoji-opt').forEach(function (b) {
          b.addEventListener('click', function () {
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
      ask();
    }
    card();
  }

  /* =================== FĀBULA: illustrated reading =================== */

  function runFabula(fi) {
    renderTopbar(true);
    var f = DATA.fables[fi];
    var i = 0;

    function page() {
      if (i >= f.story.length) {
        finishStep(fi, 'fabula', 20);
        return;
      }
      var line = f.story[i];
      var glosses = '';
      var k, n;
      for (k = 0; k < line.nova.length; k++) {
        n = line.nova[k];
        glosses += '<li><strong>' + esc(n.w) + '</strong> <span class="g-emoji">' + n.e + '</span>' +
          (n.g ? ' <em>= ' + esc(n.g) + '</em>' : '') + '</li>';
      }
      /* in-card back: lets the reader re-read the previous story page without
         going all the way to home. Disabled (greyed) on the first page. */
      var backBtn = '<button id="prev" class="btn ghost small" type="button"' +
        (i === 0 ? ' disabled' : '') + '>◀ ' + esc(UI.retro) + '</button>';
      var html = stepHeader(fi, 'fabula') +
        '<article class="story-page">' +
        '<figure class="scene">' + Scenes.render(line.scene) + '</figure>' +
        '<p class="story-text">' + esc(line.la) + ' <button type="button" id="say" class="speak" aria-label="audi">🔊</button></p>' +
        (glosses ? '<ul class="margo">' + glosses + '</ul>' : '') +
        '<p class="card-progress">' + (i + 1) + ' / ' + f.story.length + '</p>' +
        '<div class="nav-row">' + backBtn +
          '<button id="next" class="btn primary" type="button">' + esc(UI.perge) + ' ▶</button>' +
        '</div>' +
        '</article>';
      setScreen(html, 'fabula-screen');
      AudioLA.speak(line.la);
      $('#say').addEventListener('click', function () { AudioLA.speak(line.la); });
      $('#next').addEventListener('click', function () { i++; AudioLA.stop(); page(); });
      if (i > 0) {
        $('#prev').addEventListener('click', function () { i--; AudioLA.stop(); page(); });
      }
    }
    page();
  }

  /* =================== LŪDUS: canvas game =================== */

  function runLudus(fi) {
    renderTopbar(true);
    var f = DATA.fables[fi];
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
    var f = DATA.fables[fi];

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
      var pairCount = f.aenigmata.pairs.length;
      var cards = [];
      var i;
      for (i = 0; i < pairCount; i++) {
        cards.push({ k: i, face: f.aenigmata.pairs[i].la, kind: 'word' });
        cards.push({ k: i, face: visualFor(f.aenigmata.pairs[i]), kind: 'pic' });
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
        if (qi >= f.aenigmata.scrambles.length) {
          finishStep(fi, 'aenigmata', 20,
            memoryPerfect ? '<p class="bonus">🧠 ' + esc(UI.memoriaPerfecta) + '</p>' : '');
          return;
        }
        var item = f.aenigmata.scrambles[qi];
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
        html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + f.aenigmata.scrambles.length + '</p></section>';
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
    var f = DATA.fables[fi];
    var qi = 0;

    function ask() {
      if (qi >= f.corrige.length) {
        finishStep(fi, 'corrige', 20);
        return;
      }
      var q = f.corrige[qi];
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
        '<p class="card-progress">' + (qi + 1) + ' / ' + f.corrige.length + '</p></section>';
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

  /* =================== COMPLĒ: fill the blank =================== */

  function runComple(fi) {
    renderTopbar(true);
    var f = DATA.fables[fi];
    var qi = 0;

    function ask() {
      if (qi >= f.comple.length) {
        /* finishing the last step of the last fable = grand finale */
        var lastFable = (fi === DATA.fables.length - 1);
        finishStep(fi, 'comple', 20,
          lastFable && allDoneAfter(fi) ? '<p class="bonus">👑 ' + esc(UI.finis) + ' 👑</p>' : '');
        return;
      }
      var q = f.comple[qi];
      var parts = q.text.split('___');
      var html = stepHeader(fi, 'comple') +
        '<section class="comple">' +
        '<figure class="scene">' + Scenes.render(q.scene) + '</figure>' +
        '<p class="sentence"><span>' + esc(parts[0]) + '</span><span class="blank" id="blank">___</span><span>' + esc(parts[1] || '') + '</span></p>' +
        '<div class="opt-row">';
      var opts = shuffle(q.options.map(function (o, oi) { return { o: o, oi: oi }; }));
      var i;
      for (i = 0; i < opts.length; i++) {
        html += '<button type="button" class="opt" data-oi="' + opts[i].oi + '">' + esc(opts[i].o) + '</button>';
      }
      html += '</div><p class="card-progress">' + (qi + 1) + ' / ' + f.comple.length + '</p></section>';
      setScreen(html, 'comple-screen');

      $all('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var oi = parseInt(b.getAttribute('data-oi'), 10);
          if (oi === q.correct) {
            $('#blank').textContent = q.options[q.correct];
            $('#blank').className = 'blank filled';
            toast(true);
            addXP(10);
            qi++;
            window.setTimeout(ask, 650);
          } else {
            toast(false);
            b.disabled = true;
            if (!loseHeart()) { heartsOut(fi); }
          }
        });
      });
    }

    function allDoneAfter(fi2) {
      var i;
      for (i = 0; i < DATA.fables.length; i++) {
        if (i === fi2) { continue; }
        if (!fableDone(i)) { return false; }
      }
      /* current fable: comple is being completed now; check the rest */
      var f2 = DATA.fables[fi2], j;
      for (j = 0; j < STEPS.length - 1; j++) {
        if (!isStepDone(f2.id, STEPS[j])) { return false; }
      }
      return true;
    }

    ask();
  }

  /* =================== boot =================== */

  /* called once a student is authenticated (login/register/session-restore).
     student = {id, displayName, nickname, avatar}; snapshot = server progress */
  function onAuthed(student, snapshot) {
    S = Storage.load();              /* start from the offline cache shell */
    S.name = student.nickname || student.displayName || '';
    S.avatar = student.avatar || 'fox';
    Storage.reconcile(S, snapshot);  /* server truth wins */
    offerLegacyImport(function () { showHome(); });
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
    setScreen('<section class="splash"><figure class="mascot">' +
      Scenes.mascot(120) + '</figure><p class="tagline">…</p></section>', 'loading-screen');

    if (typeof Api === 'undefined') {
      /* no backend present (e.g. opened as bare files): fall back to local-only */
      if (S.name) { showHome(); } else { AuthUI.show(app, onAuthed); }
      return;
    }
    /* try an existing session / remember-me cookie */
    Api.me(function (err, data) {
      if (!err && data && data.ok) {
        Api.setCsrf(data.csrf);
        onAuthed(data.student, data.snapshot);
      } else {
        AuthUI.show(app, onAuthed);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
