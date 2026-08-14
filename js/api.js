/* ============================================================
   api.js — talks to the PHP backend (ES5, XMLHttpRequest)
   ------------------------------------------------------------
   Callback style (no Promises, to stay ES5-pure and dependency
   free). Every state-changing call sends the CSRF token the
   server handed us at login. Cookies (session + remember-me)
   ride along automatically via withCredentials.
   ============================================================ */
var Api = (function () {
  'use strict';

  /* The API lives under /server/api on the same origin as the app. */
  var BASE = 'server/api/';
  var csrf = '';

  function setCsrf(token) { csrf = token || ''; }
  function getCsrf() { return csrf; }

  /* low-level request. method: 'GET'|'POST'; path under BASE; body object|null;
     cb(err, data). err is null on HTTP 2xx. */
  function request(method, path, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, BASE + path, true);
    xhr.withCredentials = true;                 // send cookies
    xhr.setRequestHeader('Accept', 'application/json');
    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      if (csrf) { xhr.setRequestHeader('X-CSRF-Token', csrf); }
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) { return; }
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) { data = null; }
      if (xhr.status >= 200 && xhr.status < 300) {
        cb(null, data);
      } else {
        cb({ status: xhr.status, data: data }, data);
      }
    };
    xhr.send(body ? JSON.stringify(body) : null);
  }

  /* ---- auth ---- */
  function me(cb) { request('GET', 'me.php', null, cb); }
  function login(username, password, remember, cb) {
    request('POST', 'login.php',
      { username: username, password: password, remember: !!remember }, cb);
  }
  function register(payload, cb) {
    request('POST', 'register.php', payload, cb);
  }
  function logout(cb) { request('POST', 'logout.php', {}, cb); }

  /* ---- progress ---- */
  function completeStep(fable, step, score, cb) {
    request('POST', 'step_complete.php',
      { fable: fable, step: step, score: score || 0 }, cb);
  }
  function bossFight(region, cb) {
    request('POST', 'boss_fight.php', { region: region }, cb);
  }
  function bossQuiz(region, answers, cb) {
    request('POST', 'boss_quiz.php', { region: region, answers: answers }, cb);
  }
  /* The M3 phase engine's result payload:
       { region, ms, mistakes, phases:[{type, ms, mistakes, hpDealt}] }
     It is a MEASUREMENT, never a reward — api/boss_result.php rejects a body
     carrying xp/level/score outright. The callback is optional because the
     record board is a bonus: a failed post must never block the boss quiz. */
  function bossResult(payload, cb) {
    request('POST', 'boss_result.php', payload, cb || function () {});
  }
  function sync(partial, cb) {
    request('POST', 'sync.php', partial, cb || function () {});
  }

  return {
    setCsrf: setCsrf, getCsrf: getCsrf,
    me: me, login: login, register: register, logout: logout,
    completeStep: completeStep, bossFight: bossFight,
    bossQuiz: bossQuiz, bossResult: bossResult, sync: sync
  };
})();
