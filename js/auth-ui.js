/* ============================================================
   auth-ui.js — login / register screen (ES5)
   ------------------------------------------------------------
   One screen, two modes (login | register). On success it calls
   onAuthed(student, snapshot). Avatar + nickname are collected
   at register (a fuller avatar picker can come in a later stage).
   ============================================================ */
var AuthUI = (function () {
  'use strict';

  var AVATARS = ['fox', 'crow', 'wolf', 'lamb'];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* render into the given container; onAuthed(student, snapshot) on success */
  function show(container, onAuthed) {
    renderLogin(container, onAuthed);
  }

  function shell(inner) {
    return '<section class="auth">' +
      '<header class="auth-head">' +
        '<figure class="auth-logo">' + Scenes.mascot(72) + '</figure>' +
        '<h1>MARIANE</h1>' +
        '<p class="auth-sub">Lingua Latina</p>' +
      '</header>' + inner + '</section>';
  }

  function field(id, label, type, attrs) {
    return '<label class="auth-field"><span>' + esc(label) + '</span>' +
      '<input id="' + id + '" type="' + type + '" ' + (attrs || '') + '></label>';
  }

  /* ---------- LOGIN ---------- */
  function renderLogin(container, onAuthed) {
    var html = shell(
      '<form id="login-form" class="auth-form" novalidate>' +
        '<h2>Intrā</h2>' +
        field('lg-user', 'Nōmen (username)', 'text', 'autocomplete="username" required') +
        field('lg-pass', 'Tessera (password)', 'password', 'autocomplete="current-password" required') +
        '<label class="auth-check"><input id="lg-remember" type="checkbox"> Manē in sessiōne (stay logged in)</label>' +
        '<p class="auth-err" id="lg-err" role="alert"></p>' +
        '<button type="submit" class="btn primary" id="lg-go">Intrā</button>' +
        '<p class="auth-switch">Novus es? <button type="button" class="linklike" id="to-register">Crea ratiōnem</button></p>' +
      '</form>'
    );
    container.innerHTML = html;
    container.className = 'screen auth-screen';

    var form = document.getElementById('login-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = document.getElementById('lg-user').value.trim();
      var p = document.getElementById('lg-pass').value;
      var r = document.getElementById('lg-remember').checked;
      var errEl = document.getElementById('lg-err');
      var btn = document.getElementById('lg-go');
      errEl.textContent = '';
      if (!u || !p) { errEl.textContent = 'Comple omnia.'; return; }
      btn.disabled = true; btn.textContent = '…';
      Api.login(u, p, r, function (err, data) {
        btn.disabled = false; btn.textContent = 'Intrā';
        if (err || !data || !data.ok) {
          errEl.textContent = loginErrorMsg(err);
          return;
        }
        Api.setCsrf(data.csrf);
        onAuthed(data.student, data.snapshot);
      });
    });
    document.getElementById('to-register').addEventListener('click', function () {
      renderRegister(container, onAuthed);
    });
  }

  function loginErrorMsg(err) {
    if (err && err.data && err.data.error === 'too_many_attempts') {
      return 'Nimis cōnātūs. Exspectā paulum.';
    }
    return 'Nōmen aut tessera falsa.';
  }

  /* ---------- REGISTER ---------- */
  function renderRegister(container, onAuthed) {
    var avatarBtns = '';
    var i;
    for (i = 0; i < AVATARS.length; i++) {
      avatarBtns += '<button type="button" class="avatar-opt' + (i === 0 ? ' sel' : '') +
        '" data-av="' + AVATARS[i] + '">' + Scenes.mascot(48, AVATARS[i]) + '</button>';
    }
    var html = shell(
      '<form id="reg-form" class="auth-form" novalidate>' +
        '<h2>Crea ratiōnem</h2>' +
        field('rg-user', 'Nōmen (username)', 'text', 'autocomplete="username" required') +
        field('rg-nick', 'Cognōmen (nickname)', 'text', 'autocomplete="nickname"') +
        field('rg-pass', 'Tessera (password)', 'password', 'autocomplete="new-password" required') +
        field('rg-code', 'Cōdex classis (optional)', 'text', '') +
        '<fieldset class="avatar-row"><legend>Imāgō</legend>' + avatarBtns + '</fieldset>' +
        '<label class="auth-check"><input id="rg-remember" type="checkbox"> Manē in sessiōne</label>' +
        '<p class="auth-err" id="rg-err" role="alert"></p>' +
        '<button type="submit" class="btn primary" id="rg-go">Crea</button>' +
        '<p class="auth-switch">Iam ratiōnem habēs? <button type="button" class="linklike" id="to-login">Intrā</button></p>' +
      '</form>'
    );
    container.innerHTML = html;
    container.className = 'screen auth-screen';

    var chosenAvatar = AVATARS[0];
    var opts = container.querySelectorAll('.avatar-opt');
    Array.prototype.slice.call(opts).forEach(function (b) {
      b.addEventListener('click', function () {
        Array.prototype.slice.call(opts).forEach(function (x) { x.className = 'avatar-opt'; });
        b.className = 'avatar-opt sel';
        chosenAvatar = b.getAttribute('data-av');
      });
    });

    document.getElementById('reg-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var errEl = document.getElementById('rg-err');
      var btn = document.getElementById('rg-go');
      var payload = {
        username: document.getElementById('rg-user').value.trim(),
        nickname: document.getElementById('rg-nick').value.trim(),
        password: document.getElementById('rg-pass').value,
        joinCode: document.getElementById('rg-code').value.trim(),
        avatar: chosenAvatar,
        remember: document.getElementById('rg-remember').checked
      };
      errEl.textContent = '';
      if (payload.username.length < 3) { errEl.textContent = 'Nōmen brevius est (3+).'; return; }
      if (payload.password.length < 6) { errEl.textContent = 'Tessera brevior est (6+).'; return; }
      btn.disabled = true; btn.textContent = '…';
      Api.register(payload, function (err, data) {
        btn.disabled = false; btn.textContent = 'Crea';
        if (err || !data || !data.ok) {
          errEl.textContent = registerErrorMsg(err);
          return;
        }
        Api.setCsrf(data.csrf);
        onAuthed(data.student, data.snapshot);
      });
    });
    document.getElementById('to-login').addEventListener('click', function () {
      renderLogin(container, onAuthed);
    });
  }

  function registerErrorMsg(err) {
    var code = err && err.data && err.data.error;
    if (code === 'username_taken') { return 'Nōmen iam occupātum.'; }
    if (code === 'bad_join_code') { return 'Cōdex classis falsus.'; }
    if (code === 'password_too_short') { return 'Tessera brevior est (6+).'; }
    if (code === 'username_length') { return 'Nōmen 3–60 litterārum.'; }
    return 'Error. Iterum tentā.';
  }

  return { show: show };
})();
