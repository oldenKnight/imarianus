/* ============================================================
   teacher/teacher.js — the teacher dashboard (ES5, M9)
   ------------------------------------------------------------
   Two screens and nothing else:

     1. INTRĀ    — POST ../server/api/teacher_login.php {email, password}
     2. TABULA   — GET  ../server/api/class_roster.php

   WHY ITS OWN XHR HELPER instead of js/api.js. api.js hardcodes
   BASE = 'server/api/' relative to the app root and carries the whole
   student surface (progress, bosses, the offline queue). This page sits one
   directory deeper, is used by a different subject type (a teacher session
   binds $_SESSION['tid'], never 'sid'), and must never gain the ability to
   post progress. A 30-line helper with the same CONVENTIONS — JSON in, JSON
   out, withCredentials, X-CSRF-Token on POST — is the honest way to say that.

   CSRF, per the endpoints as they are actually written (server/lib/auth.php):
     * teacher_login.php  — no require_csrf() (it is the login door itself,
       exactly like api/login.php), and it RETURNS the token;
     * class_roster.php   — GET, no CSRF;
     * logout.php         — require_csrf(), so the token from login is kept
       in memory for it. It calls logout_current(), which is subject-agnostic:
       it destroys the session, teacher or student.
   There is deliberately NO remember-me for teachers (auth.php says why: a
   roster is other people's children), so closing the browser logs out.
   ============================================================ */
(function () {
  'use strict';

  var API = '../server/api/';
  var csrf = '';
  var teacher = null;          /* {id, name, email} once logged in */
  var classes = [];            /* the last roster payload */
  var autoTimer = null;
  var AUTO_MS = 60000;         /* one minute: a lesson-length refresh */

  var app = document.getElementById('t-app');
  var toastEl = document.getElementById('t-toast');

  /* ---------- Latin UI strings (same conventions as js/data-core.js:
     macrons on, imperatives on buttons, an English gloss in parentheses
     only where a teacher must match a real-world field) ---------- */
  var T = {
    titulus: 'TABULA MAGISTRĪ',
    sub: 'MARIANE — discipulī tuī',
    intra: 'INTRĀ',
    exi: 'EXĪ',
    renova: 'RENOVĀ',
    automatice: 'automaticē',
    inscriptio: 'Inscrīptiō (email)',
    tessera: 'Tessera (password)',
    classis: 'CLASSIS',
    codex: 'CŌDEX',
    codexSub: 'Hunc cōdicem discipulīs dā.',
    exscribe: 'EXSCRĪBE',
    exscriptum: 'Exscrīptum!',
    discipuli: 'DISCIPULĪ',
    nullaClassis: 'Nūlla classis. Classēs in servō creantur.',
    nulliDiscipuli: 'Nūllī discipulī in hāc classe.',
    /* table headings — short on purpose, a phone shows six columns */
    thNomen: 'Discipulus',
    thXp: 'XP',
    thDies: 'Diēs',      /* streak */
    thGradus: 'Gradūs',  /* steps completed */
    thCapitula: 'Capitula',
    thCertamina: 'Certāmina',
    thNovissime: 'Novissimē',
    numquam: '—',
    exspecta: 'Exspectā…',
    errorRete: 'Rēte dēest. Iterum tentā.',
    errorLogin: 'Inscrīptiō aut tessera falsa.',
    errorMulti: 'Nimis cōnātūs. Exspectā paulum.',
    errorGeneric: 'Error. Iterum tentā.'
  };

  /* ---------- tiny DOM helpers ---------- */
  function esc(s) {
    return String(s === null || typeof s === 'undefined' ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function $(sel) { return app.querySelector(sel); }
  function setScreen(html, cls) {
    app.className = 't-wrap ' + (cls || '');
    app.innerHTML = html;
  }
  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.className = 't-toast show';
    if (toastTimer) { window.clearTimeout(toastTimer); }
    toastTimer = window.setTimeout(function () { toastEl.className = 't-toast'; }, 1800);
  }

  /* ---------- the 30-line API helper ---------- */
  function request(method, path, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, API + path, true);
    xhr.withCredentials = true;                       // session cookie
    xhr.setRequestHeader('Accept', 'application/json');
    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      if (csrf) { xhr.setRequestHeader('X-CSRF-Token', csrf); }
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) { return; }
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) { data = null; }
      if (xhr.status >= 200 && xhr.status < 300) { cb(null, data); }
      else { cb({ status: xhr.status, data: data }, data); }
    };
    xhr.send(body ? JSON.stringify(body) : null);
  }

  function loginError(err) {
    var code = err && err.data && err.data.error;
    if (err && err.status === 429) { return T.errorMulti; }
    if (code === 'bad_login' || code === 'missing_credentials') { return T.errorLogin; }
    if (!err || !err.status) { return T.errorRete; }
    return T.errorGeneric;
  }

  /* ============================================================
     SCREEN 1 — INTRĀ
     ============================================================ */
  function showLogin(message) {
    stopAuto();
    setScreen(
      '<section class="t-login">' +
        '<h1 class="t-brand">MARIANE</h1>' +
        '<p class="t-brand-sub">' + esc(T.titulus) + '</p>' +
        '<form id="t-form" class="t-form" autocomplete="on">' +
          '<label class="t-field"><span>' + esc(T.inscriptio) + '</span>' +
            '<input id="t-email" type="email" autocomplete="username" required></label>' +
          '<label class="t-field"><span>' + esc(T.tessera) + '</span>' +
            '<input id="t-pass" type="password" autocomplete="current-password" required></label>' +
          '<p class="auth-err" id="t-err">' + esc(message || '') + '</p>' +
          '<button type="submit" class="btn primary t-wide" id="t-go">' + esc(T.intra) + '</button>' +
        '</form>' +
      '</section>', 't-login-screen');

    $('#t-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = $('#t-go'), errEl = $('#t-err');
      var email = $('#t-email').value.replace(/^\s+|\s+$/g, '');
      var pass = $('#t-pass').value;
      if (!email || !pass) { errEl.textContent = T.errorLogin; return; }
      errEl.textContent = '';
      btn.disabled = true;
      btn.textContent = '…';
      request('POST', 'teacher_login.php', { email: email, password: pass },
        function (err, data) {
          btn.disabled = false;
          btn.textContent = T.intra;
          if (err || !data || !data.ok) { errEl.textContent = loginError(err); return; }
          csrf = data.csrf || '';
          teacher = data.teacher || null;
          loadRoster(true);
        });
    });
    var first = $('#t-email');
    if (first) { first.focus(); }
  }

  /* ============================================================
     SCREEN 2 — TABULA
     ============================================================ */
  function loadRoster(showWait) {
    if (showWait) { setScreen('<p class="t-wait">' + esc(T.exspecta) + '</p>', ''); }
    request('GET', 'class_roster.php', null, function (err, data) {
      if (err && err.status === 401) {
        /* the teacher session ended (no remember-me by design) */
        teacher = null;
        showLogin('');
        return;
      }
      if (err || !data || !data.ok) {
        if (!classes.length) {
          setScreen('<p class="t-wait">' + esc(T.errorRete) + '</p>', '');
        } else {
          toast(T.errorRete);       /* keep the roster on screen, say it is stale */
        }
        return;
      }
      classes = data.classes || [];
      renderBoard();
    });
  }

  function renderBoard() {
    var html = '' +
      '<header class="t-bar">' +
        '<div class="t-bar-id">' +
          '<span class="t-bar-title">' + esc(T.titulus) + '</span>' +
          '<span class="t-bar-sub">' + esc(teacher && teacher.name ? teacher.name : T.sub) + '</span>' +
        '</div>' +
        '<div class="t-bar-actions">' +
          '<label class="t-auto"><input type="checkbox" id="t-auto"' +
            (autoTimer ? ' checked' : '') + '> ' + esc(T.automatice) + '</label>' +
          '<button type="button" class="btn small t-refresh" id="t-renova">↻ ' + esc(T.renova) + '</button>' +
          '<button type="button" class="btn small ghost" id="t-exi">' + esc(T.exi) + '</button>' +
        '</div>' +
      '</header>';

    if (!classes.length) {
      html += '<p class="t-empty">' + esc(T.nullaClassis) + '</p>';
    } else {
      var i;
      for (i = 0; i < classes.length; i++) { html += classCard(classes[i], i); }
    }

    setScreen(html, 't-board-screen');

    $('#t-renova').addEventListener('click', function () { loadRoster(false); });
    $('#t-exi').addEventListener('click', logout);
    $('#t-auto').addEventListener('change', function () {
      if (this.checked) { startAuto(); } else { stopAuto(); }
    });
    bindCopyButtons();
  }

  function classCard(c, idx) {
    var students = c.students || [];
    var head = '' +
      '<div class="t-class-head">' +
        '<div>' +
          '<p class="t-kicker">' + esc(T.classis) + '</p>' +
          '<h2 class="t-class-name">' + esc(c.name) + '</h2>' +
          '<p class="t-count">' + esc(T.discipuli) + ': ' + students.length + '</p>' +
        '</div>' +
        '<div class="t-codex">' +
          '<p class="t-kicker">' + esc(T.codex) + '</p>' +
          /* the join code is the whole point of this screen on a phone:
             big, monospaced, selectable, and copyable in one tap */
          '<p class="t-code" id="t-code-' + idx + '">' + esc(c.joinCode) + '</p>' +
          '<button type="button" class="btn small ghost t-copy" data-code="' +
            esc(c.joinCode) + '">' + esc(T.exscribe) + '</button>' +
          '<p class="t-code-sub">' + esc(T.codexSub) + '</p>' +
        '</div>' +
      '</div>';

    var body;
    if (!students.length) {
      body = '<p class="t-empty">' + esc(T.nulliDiscipuli) + '</p>';
    } else {
      var rows = '', i, s;
      for (i = 0; i < students.length; i++) {
        s = students[i];
        rows += '<tr>' +
          '<td class="t-name">' +
            '<span class="t-name-main">' + esc(s.displayName || s.nickname || '—') + '</span>' +
            (s.nickname ? '<span class="t-name-nick">' + esc(s.nickname) + '</span>' : '') +
          '</td>' +
          '<td class="t-num t-xp">' + esc(s.xp) + '</td>' +
          '<td class="t-num">' + esc(s.streak) + '</td>' +
          '<td class="t-num">' + esc(s.stepsDone) + '</td>' +
          '<td class="t-num">' + esc(s.capitulaDone) + '</td>' +
          '<td class="t-num">' + esc(s.bossesCleared) + '</td>' +
          '<td class="t-num t-last">' + esc(s.lastDay || T.numquam) + '</td>' +
        '</tr>';
      }
      /* the wrapper is what makes six columns usable on a 360px phone:
         the TABLE scrolls sideways, the PAGE never does */
      body = '<div class="t-table-wrap"><table class="t-table">' +
        '<thead><tr>' +
          '<th>' + esc(T.thNomen) + '</th>' +
          '<th class="t-num">' + esc(T.thXp) + '</th>' +
          '<th class="t-num">' + esc(T.thDies) + '</th>' +
          '<th class="t-num">' + esc(T.thGradus) + '</th>' +
          '<th class="t-num">' + esc(T.thCapitula) + '</th>' +
          '<th class="t-num">' + esc(T.thCertamina) + '</th>' +
          '<th class="t-num">' + esc(T.thNovissime) + '</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>';
    }

    return '<section class="t-class">' + head + body + '</section>';
  }

  /* ---------- copy the join code ---------- */
  function bindCopyButtons() {
    var btns = app.querySelectorAll('.t-copy'), i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        copyText(this.getAttribute('data-code'));
      });
    }
  }

  function copyText(text) {
    /* modern path first; the fallback matters because a school tablet on
       plain http has no navigator.clipboard at all (it needs a secure
       context), and that is exactly where this dashboard will be used. */
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(T.exscriptum); },
        function () { legacyCopy(text); });
      return;
    }
    legacyCopy(text);
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', 'readonly');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    toast(ok ? T.exscriptum : text);   /* worst case: show it, big, to retype */
  }

  /* ---------- auto refresh ---------- */
  function startAuto() {
    stopAuto();
    autoTimer = window.setInterval(function () { loadRoster(false); }, AUTO_MS);
  }
  function stopAuto() {
    if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
  }

  /* ---------- logout ---------- */
  function logout() {
    stopAuto();
    request('POST', 'logout.php', {}, function () {
      /* whatever the server said, this browser is done: drop the token and
         the cached roster so nothing of another teacher's class lingers */
      csrf = '';
      teacher = null;
      classes = [];
      showLogin('');
    });
  }

  /* ---------- boot ----------
     Probe the roster first: a live teacher session (the browser was not
     closed) walks straight in, and a 401 falls back to the login form. */
  function init() {
    setScreen('<p class="t-wait">' + esc(T.exspecta) + '</p>', '');
    request('GET', 'class_roster.php', null, function (err, data) {
      if (!err && data && data.ok) {
        classes = data.classes || [];
        teacher = { id: data.teacherId, name: '' };
        renderBoard();
        return;
      }
      showLogin('');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* exported for tests/QA only (a stubbed roster can be rendered without a
     server); the page itself never reads this object. */
  window.TeacherDash = {
    renderWith: function (payload) {
      classes = (payload && payload.classes) || [];
      teacher = { id: (payload && payload.teacherId) || 0, name: (payload && payload.name) || '' };
      renderBoard();
    },
    showLogin: showLogin
  };
})();
