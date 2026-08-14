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
  function fableUnlocked(fi) {
    return fi === 0 || fableDone(fi - 1);
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
      openTrack('fabulae', function () { showHome(); });
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
      '<h2>' + esc(UI.salve) + ', <span id="uname"></span>!</h2></header>';
    html += '<nav class="path" aria-label="cursus">';
    var fi;
    for (fi = 0; fi < caps().length; fi++) {
      html += capitulumBlock(fi);
    }
    html += '</nav>';
    setScreen(html, 'home-screen');
    $('#uname').textContent = S.name;
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
      var out = '', i, r, medal;
      for (i = 0; i < rows.length; i++) {
        r = rows[i];
        medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
        out += '<li class="' + (r.me ? 'me' : '') + (r.exemplum ? ' exemplum' : '') + '">' +
          '<span class="rank">' + medal + '</span>' +
          '<span class="bname">' + esc(r.nickname || r.name || '?') +
            (r.exemplum ? ' <em class="tag">exemplum</em>' : '') + '</span>' +
          '<span class="bxp">⭐ ' + (r.xp || 0) + '</span></li>';
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
  function bossNodeId() {
    return (CUR.region && CUR.region.boss) ? CUR.region.boss.id : 'boss';
  }

  /* Compute the map model from the region config + progress.
     Node positions stay 0..1 FRACTIONS (DESIGN §3) so one layout serves
     every screen width and any region length. */
  function mapModel() {
    var nodes = [], i, f, st;
    var list = caps();
    for (i = 0; i < list.length; i++) {
      f = list[i];
      st = fableDone(i) ? 'done' : (fableUnlocked(i) ? 'open' : 'shut');
      nodes.push({
        id: f.id,
        kind: 'fable',
        x: (f.pos && f.pos.x) || 0.5,
        y: (f.pos && f.pos.y) || (0.9 - i * 0.2),
        label: f.numerus || String(i + 1),
        titulus: f.titulus,
        icon: f.icon,
        links: (i + 1 < list.length) ? [list[i + 1].id] : [bossNodeId()],
        state: st
      });
    }
    if (CUR.region && CUR.region.boss) {
      var b = CUR.region.boss;
      nodes.push({
        id: b.id,
        kind: 'boss',
        x: (b.pos && b.pos.x) || 0.5,
        y: (b.pos && b.pos.y) || 0.12,
        label: '👑',
        titulus: b.name,
        links: [],
        state: bossCleared() ? 'done' : (regionCapsDone() ? 'open' : 'shut')
      });
    }
    /* the mascot stands on the saved node when it still exists here, else on
       the first unfinished capitulum (a learner arriving from another track
       must not see the fox on a node that isn't on this map). */
    var here = S.mapNode, found = false;
    for (i = 0; i < nodes.length; i++) { if (nodes[i].id === here) { found = true; } }
    if (!found) {
      here = nodes.length ? nodes[0].id : '';
      for (i = 0; i < list.length; i++) {
        if (!fableDone(i)) { here = list[i].id; break; }
      }
    }
    return {
      nodes: nodes,
      foxNode: here,
      track: CUR.trackId,
      titulus: CUR.region ? CUR.region.titulus : '',
      avatar: S.avatar || 'fox'
    };
  }

  function showMap() {
    if (!CUR.region) { openTrack(CUR.trackId || 'fabulae', showMap); return; }
    renderTopbar(false);
    var model = mapModel();
    var html =
      '<section class="provincia">' +
        '<header class="prov-head"><h2>' + esc(model.titulus || DATA.MAP_UI.provincia) + '</h2>' +
        '<p class="prov-sub">' + esc(trackTitle()) + '</p></header>' +
        '<div class="map-frame">' + WorldMap.render(model) + '</div>' +
      '</section>';
    setScreen(html, 'map-screen');
    WorldMap.bind($('.map-frame'), model, {
      onNode: function (id, kind) {
        if (kind === 'fable') {
          S.mapNode = id; save();
          showCapitulum(capIndexById(id));
        } else if (kind === 'boss') {
          S.mapNode = id; save();
          showBossIntro(id);
        }
      }
    });
  }

  function trackTitle() {
    var t = DATA.trackById(CUR.trackId);
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
    $('#mox-back').addEventListener('click', showHome);
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

  function showBossIntro(nodeId) {
    renderTopbar(true);
    var boss = CUR.region.boss;
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

  /* SWAP POINT: replace this one function's body to drop in a platformer boss.
     It must call onWin()/onLose() to keep the unlock flow intact. */
  function runBossFight(nodeId) {
    renderTopbar(true);
    var boss = CUR.region.boss;
    var regionKey = regionProgressId();
    var html = '<section class="boss-wrap">' +
      '<p class="ask">' + esc(DATA.MAP_UI.bossReady) + ' ⬅ ➡</p>' +
      '<canvas id="bossgame" aria-label="pugna"></canvas>' +
      '</section>';
    setScreen(html, 'boss-screen');
    var cv = $('#bossgame');
    Boss.start(cv, { words: bossWords(), hp: boss.hp, seconds: boss.seconds }, {
      onEnd: function (won) {
        if (won) {
          /* optimistic mirror update */
          if (!S.bosses[regionKey]) { S.bosses[regionKey] = {}; }
          S.bosses[regionKey].fight = true;
          save();
          /* server records the fight + grants fight XP once, then we proceed */
          if (typeof Api !== 'undefined') {
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
    var fullyClear = bossCleared();
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
    /* optimistic local update so the UI is instant... */
    var first = completeStep(f.id, step);
    if (first && bonusXP && !opts.noXP) { addXP(bonusXP); }
    /* ...then tell the server, which is authoritative. It grants XP only on a
       genuine first completion (idempotent), enforces prerequisites, and hands
       back the true snapshot we reconcile into the mirror. */
    if (typeof Api !== 'undefined' && !opts.noPost) {
      Api.completeStep(f.id, step, (bonusXP || 0), function (err, data) {
        if (!err && data && data.snapshot) {
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
    var f = capAt(fi);
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
      var parts = String(q.text).split('___');
      var slots = parts.length - 1;              /* how many blanks to fill */
      var filled = [];                           /* words tapped, in tap order */

      /* sentence with one <span class="blank"> per ___ */
      var sent = '', i;
      for (i = 0; i < parts.length; i++) {
        sent += '<span>' + esc(parts[i]) + '</span>';
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

  /* Open a track at its first region. Tracks with no region yet (Historia,
     Aeneis) show the "MOX — in fabricā" screen instead of a dead door. */
  function openTrack(trackId, then) {
    var regionId = CONTENT.firstRegionId(trackId);
    if (!regionId) { showMox(trackId); return; }
    openRegion(trackId, regionId, then || function () { showMap(); });
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
    $('#back').addEventListener('click', showHome);
  }

  /* =================== boot =================== */

  /* called once a student is authenticated (login/register/session-restore).
     student = {id, displayName, nickname, avatar}; snapshot = server progress */
  function onAuthed(student, snapshot) {
    S = Storage.load();              /* start from the offline cache shell */
    S.name = student.nickname || student.displayName || '';
    S.avatar = student.avatar || 'fox';
    Storage.reconcile(S, snapshot);  /* server truth wins */
    offerLegacyImport(function () {
      openTrack('fabulae', function () { showHome(); });
    });
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
      if (S.name) { openTrack('fabulae', function () { showHome(); }); }
      else { showSplash(); }
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
