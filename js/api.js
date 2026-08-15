/* ============================================================
   api.js — talks to the PHP backend (ES5, XMLHttpRequest)
   ------------------------------------------------------------
   Callback style (no Promises, to stay ES5-pure and dependency
   free). Every state-changing call sends the CSRF token the
   server handed us at login. Cookies (session + remember-me)
   ride along automatically via withCredentials.

   M9 — EVENT IDS AND THE OFFLINE QUEUE (brief §8). Every POST that changes
   durable state carries a client-generated event id, sent twice:

       X-Event-Id: <id>            request header
       { ..., "eventId": "<id>" }  same value inside the JSON body

   Both, deliberately: the header is the clean channel, the body field is the
   one that survives a shared host or proxy that strips unknown headers. The
   server MAY ignore both today — nothing here depends on it — but from this
   build on, a repeat of an action is identifiable as the SAME action, which
   is what lets a future server answer a replay with the original snapshot
   instead of paying the reward twice.

   When such a POST cannot be delivered (we know we are offline, or the
   request dies at the network layer with status 0), it is handed to
   Storage.enqueue() with that same id and the caller is told `queued`. The
   caller's existing error branch is enough: the optimistic local state it
   already applied is exactly what the queue will make true later.
   ============================================================ */
var Api = (function () {
  'use strict';

  /* The API lives under /server/api on the same origin as the app. */
  var BASE = 'server/api/';
  var csrf = '';

  /* Endpoints whose POSTs are safe to replay later. Auth is deliberately NOT
     here: login/register/logout need an answer NOW, and a queued logout is a
     contradiction in terms. */
  var QUEUEABLE = {
    'step_complete.php': true,
    'boss_fight.php': true,
    'boss_quiz.php': true,
    'boss_result.php': true,
    'sync.php': true
  };

  function setCsrf(token) {
    csrf = token || '';
    /* The queue cannot flush without this token (every queueable endpoint
       calls require_csrf), so the moment it arrives is a flush trigger. */
    if (csrf && typeof Storage !== 'undefined' && Storage.flush) { Storage.noteOnline(); }
  }
  function getCsrf() { return csrf; }

  function newEventId() {
    if (typeof Storage !== 'undefined' && Storage.eventId) { return Storage.eventId(); }
    /* storage.js absent (bare-file use): still send SOMETHING unique */
    return 'e' + (new Date().getTime()).toString(36) + '-' +
           Math.floor(Math.random() * 1679616).toString(36);
  }

  /* low-level request. method: 'GET'|'POST'; path under BASE; body object|null;
     cb(err, data). err is null on HTTP 2xx. `eventId` is optional and only
     meaningful on POST (see the header block at the top of this file). */
  function request(method, path, body, cb, eventId) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, BASE + path, true);
    xhr.withCredentials = true;                 // send cookies
    xhr.setRequestHeader('Accept', 'application/json');
    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      if (csrf) { xhr.setRequestHeader('X-CSRF-Token', csrf); }
      if (eventId) {
        xhr.setRequestHeader('X-Event-Id', eventId);
        /* body mirror — only for a real object, so we never turn a null body
           into "{}" and change what an endpoint sees. */
        if (body && typeof body === 'object') { body.eventId = eventId; }
      }
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) { return; }
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) { data = null; }
      if (xhr.status >= 200 && xhr.status < 300) {
        /* a call that worked proves the network is back: drain the queue */
        if (typeof Storage !== 'undefined' && Storage.noteOnline) { Storage.noteOnline(); }
        cb(null, data);
      } else {
        cb({ status: xhr.status, data: data }, data);
      }
    };
    xhr.send(body ? JSON.stringify(body) : null);
  }

  /* POST a queueable action. One event id is minted here and stays with the
     action for its whole life, live attempt and every replay alike. */
  function post(path, body, cb) {
    var id = newEventId();
    body = body || {};
    body.eventId = id;              // present even on the queued copy

    function queueIt(reason) {
      var item = null;
      if (typeof Storage !== 'undefined' && Storage.enqueue) {
        item = Storage.enqueue(path, body, id);
      }
      cb({ status: 0, queued: !!item, eventId: id, reason: reason, data: null }, null);
    }

    if (QUEUEABLE[path] && typeof Storage !== 'undefined' &&
        Storage.isOffline && Storage.isOffline()) {
      queueIt('offline');           // don't even try; the browser says there is no network
      return;
    }
    request('POST', path, body, function (err, data) {
      /* status 0 = the request never got an HTTP answer (dropped wifi, DNS,
         captive portal, tab suspended). That, and only that, is queueable:
         a 4xx is a real answer and means the action was rejected, not lost. */
      if (err && err.status === 0 && QUEUEABLE[path]) { queueIt('network'); return; }
      cb(err, data);
    }, id);
  }

  /* Replay one queued item. Used ONLY by Storage.flush(); it never re-queues
     on failure (the item is already in the queue — that is the point). */
  function replay(item, cb) {
    request('POST', item.path, item.body, cb, item.id);
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

  /* ---- progress ----
     All of these go through post(): they change durable state, so they carry
     an event id and survive a dead network by being queued. */
  function completeStep(fable, step, score, cb) {
    post('step_complete.php', { fable: fable, step: step, score: score || 0 }, cb);
  }
  function bossFight(region, cb) {
    post('boss_fight.php', { region: region }, cb);
  }
  function bossQuiz(region, answers, cb) {
    post('boss_quiz.php', { region: region, answers: answers }, cb);
  }
  /* The M3 phase engine's result payload:
       { region, ms, mistakes, phases:[{type, ms, mistakes, hpDealt}] }
     It is a MEASUREMENT, never a reward — api/boss_result.php rejects a body
     carrying xp/level/score outright. The callback is optional because the
     record board is a bonus: a failed post must never block the boss quiz. */
  function bossResult(payload, cb) {
    post('boss_result.php', payload, cb || function () {});
  }
  function sync(partial, cb) {
    post('sync.php', partial, cb || function () {});
  }

  return {
    setCsrf: setCsrf, getCsrf: getCsrf,
    me: me, login: login, register: register, logout: logout,
    completeStep: completeStep, bossFight: bossFight,
    bossQuiz: bossQuiz, bossResult: bossResult, sync: sync,
    /* M9: the offline queue's transport. post() is exported too so a future
       endpoint gets queueing for free by being added to QUEUEABLE. */
    post: post, replay: replay, QUEUEABLE: QUEUEABLE
  };
})();
