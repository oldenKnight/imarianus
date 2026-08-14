/* ============================================================
   storage.js — progress mirror + server sync (ES5)
   ------------------------------------------------------------
   Phase 1 (server-authoritative): the server owns the truth.
   This module keeps an in-memory mirror `S` so the UI stays
   instant, writes durable changes through to the API, and
   reconciles the mirror from the authoritative snapshot the
   server returns. A localStorage copy is kept ONLY as an
   offline cache so a flaky school network never bricks a lesson.

   The rest of the app still calls Storage.save(S) / reads S
   exactly as before — the network details live here.
   ============================================================ */
var Storage = (function () {
  'use strict';

  var KEY = 'mariane_cache_v2';       /* offline cache (not the source of truth) */
  var LEGACY_KEY = 'mariane_save_v1'; /* old local-only save, for one-time import */
  var syncTimer = null;

  function defaultState() {
    return {
      name: '',
      xp: 0,
      hearts: 5,
      maxHearts: 5,
      streak: 0,
      lastDay: '',
      completed: {},
      bosses: {},
      mapNode: 'f1',
      createdAt: new Date().getTime()
    };
  }

  /* ---- offline cache (best-effort, never authoritative) ---- */
  function writeCache(state) {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
  }
  function readCache() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  /* load() returns the cached mirror if present, else defaults. The real
     truth arrives via reconcile() once the server responds on app start. */
  function load() {
    var cached = readCache();
    if (!cached) { return defaultState(); }
    var d = defaultState(), k;
    for (k in d) {
      if (d.hasOwnProperty(k) && typeof cached[k] === 'undefined') { cached[k] = d[k]; }
    }
    return cached;
  }

  /* save() updates the offline cache immediately and schedules a debounced
     low-value sync (hearts + map node) to the server. Reward-bearing changes
     do NOT go through here — they call the dedicated API endpoints, which
     return an authoritative snapshot to reconcile(). */
  function save(state) {
    writeCache(state);
    scheduleSync(state);
    return true;
  }

  /* push hearts + mapNode to the server, debounced so we aren't chatty */
  function scheduleSync(state) {
    if (typeof Api === 'undefined') { return; }
    if (syncTimer) { window.clearTimeout(syncTimer); }
    syncTimer = window.setTimeout(function () {
      Api.sync({ hearts: state.hearts, mapNode: state.mapNode }, function () {});
    }, 1200);
  }

  /* reconcile the mirror with the server's authoritative snapshot. Returns the
     updated state object (same reference if given). */
  function reconcile(state, snapshot) {
    if (!snapshot) { return state; }
    state.xp        = snapshot.xp;
    state.hearts    = snapshot.hearts;
    state.maxHearts = snapshot.maxHearts;
    state.streak    = snapshot.streak;
    state.lastDay   = snapshot.lastDay || '';
    state.mapNode   = snapshot.mapNode || 'f1';
    state.completed = snapshot.completed || {};
    state.bosses    = snapshot.bosses || {};
    writeCache(state);
    return state;
  }

  /* one-time import of a legacy local-only save (offered at first login). */
  function legacySave() {
    try {
      var raw = window.localStorage.getItem(LEGACY_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function clearLegacy() {
    try { window.localStorage.removeItem(LEGACY_KEY); } catch (e) { /* noop */ }
  }

  /* reset only clears the LOCAL cache; server progress is authoritative and is
     reset through the account, not the browser. */
  function reset() {
    try { window.localStorage.removeItem(KEY); } catch (e) { /* noop */ }
    return defaultState();
  }

  return {
    load: load,
    save: save,
    reset: reset,
    reconcile: reconcile,
    legacySave: legacySave,
    clearLegacy: clearLegacy,
    defaultState: defaultState
  };
})();
