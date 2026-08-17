/* ============================================================
   sw.js — MARIANE service worker (M9)
   ------------------------------------------------------------
   Goal, in one sentence: a student who opened a lesson on the school wifi
   can finish it on the bus with no network, and comes back to NEW capitula
   the moment there is one, without ever being served a stale app shell.

   THE CACHING MATRIX (read this before changing a line below):

     request                      strategy        why
     ---------------------------  --------------  -------------------------
     server/api/**                NETWORK ONLY    Progress is server truth
                                  (not even       and a cached POST answer
                                  intercepted)    is a lie. Offline posts
                                                  are handled by the queue
                                                  in js/storage.js, not here.
     content/**                   NETWORK FIRST   A new capitulum must arrive
     teacher/**                   → cache         the day it ships; the cache
                                                  is only the offline safety
                                                  net. Same for the teacher
                                                  dashboard, where stale code
                                                  showing a stale roster is a
                                                  support call.
     navigations (the app shell)  CACHE FIRST     Instant launch offline.
     css/, js/, icons/, manifest  CACHE FIRST     Versioned by VERSION below.
     anything cross-origin        NOT INTERCEPTED We have none; if one ever
                                                  appears it must not land in
                                                  our cache as an opaque blob.

   VERSION IS THE DEPLOY SWITCH. Bump it on every deploy that changes a
   shell file. activate() then deletes every cache whose name does not carry
   the current VERSION, so the shell can never be half-old/half-new.

   CACHE POISONING. Only same-origin (`response.type === 'basic'`), status
   200, GET responses are ever stored. Opaque cross-origin responses, error
   pages and partial (206) responses are refused: a poisoned cache on a PWA
   survives reloads and would be untraceable from the outside.
   ============================================================ */

var VERSION = 'v1-2026-08-17';
var SHELL_CACHE = 'mariane-shell-' + VERSION;
var RUNTIME_CACHE = 'mariane-runtime-' + VERSION;
var SHELL_INDEX = 'index.html';

/* The app shell. Relative URLs here resolve against the worker's own URL
   (/imarianus/sw.js on the live host), which is exactly the app root. */
var SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/styles.css',
  'icons/icon-192.png',
  'icons/icon-512.png',
  /* load order does not matter for caching, but this list is kept in
     index.html's order so a missing file is easy to spot */
  'js/storage.js',
  'js/api.js',
  'js/audio.js',
  'js/tts.js',
  'js/scenes.js',
  'js/actors-person.js',
  'js/actors-props.js',
  'js/backgrounds2.js',
  'js/data-core.js',
  'content/manifest.js',
  'js/content-loader.js',
  'js/chip-lint.js',
  'js/auth-ui.js',
  'js/game.js',
  'js/boss.js',
  'js/boss-phases.js',
  'js/probatio.js',
  'js/map.js',
  'js/app.js',
  'js/pwa.js'
];

/* paths (matched against the pathname) that must prefer the network */
var NETWORK_FIRST = ['/content/', '/teacher/'];
/* paths the worker must keep its hands off entirely */
var NEVER = ['/server/'];

function pathMatches(pathname, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (pathname.indexOf(list[i]) >= 0) { return true; }
  }
  return false;
}

/* Is this response safe to put in a cache? */
function isCacheable(response) {
  return !!response &&
         response.status === 200 &&
         response.type === 'basic';      /* same-origin, fully readable */
}

/* ---------- install: warm the shell ---------- */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      /* Deliberately NOT cache.addAll(): that is all-or-nothing, so one
         404 (a file not yet uploaded over FTP) would fail the whole
         install and leave the site with no worker at all. Each file is
         added on its own and a failure is logged, not fatal. */
      var jobs = SHELL.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' }))['catch'](function (err) {
          console.warn('[sw] shell file not cached: ' + url + ' (' + err + ')');
        });
      });
      return Promise.all(jobs);
    })
  );
  /* A new worker should not sit waiting behind a tab the student left open
     for a week. Combined with clients.claim() below, a reload picks up the
     new version immediately. */
  self.skipWaiting();
});

/* ---------- activate: drop every cache of another VERSION ---------- */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        if (name.indexOf('mariane-') !== 0) { return null; }   /* not ours */
        if (name === SHELL_CACHE || name === RUNTIME_CACHE) { return null; }
        return caches['delete'](name);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ---------- fetch ---------- */
self.addEventListener('fetch', function (event) {
  var req = event.request;

  /* Only GET is ever cached or replayed. A POST is either a live call or a
     job for the offline queue in storage.js — never the worker's business. */
  if (req.method !== 'GET') { return; }

  var url;
  try { url = new URL(req.url); } catch (e) { return; }

  /* cross-origin: leave it to the browser entirely */
  if (url.origin !== self.location.origin) { return; }

  /* the API is network-only, and not even wrapped: no respondWith() at all,
     so the browser's own handling (including credentials + CSRF headers) is
     untouched by us. */
  if (pathMatches(url.pathname, NEVER)) { return; }

  if (req.mode === 'navigate') {
    event.respondWith(navigationResponse(req));
    return;
  }

  if (pathMatches(url.pathname, NETWORK_FIRST)) {
    event.respondWith(networkFirst(req));
    return;
  }

  event.respondWith(cacheFirst(req));
});

/* A navigation: serve the cached shell instantly, refresh it in the
   background. Offline this is what makes the app open at all. */
function navigationResponse(req) {
  return caches.match(SHELL_INDEX).then(function (cached) {
    var live = fetch(req).then(function (response) {
      if (isCacheable(response)) {
        var copy = response.clone();
        caches.open(SHELL_CACHE).then(function (c) { c.put(SHELL_INDEX, copy); });
      }
      return response;
    })['catch'](function () {
      return cached || Response.error();
    });
    return cached || live;
  });
}

/* Network first, cache as the fallback (and as the offline copy). */
function networkFirst(req) {
  return fetch(req).then(function (response) {
    if (isCacheable(response)) {
      var copy = response.clone();
      caches.open(RUNTIME_CACHE).then(function (c) { c.put(req, copy); });
    }
    return response;
  })['catch'](function () {
    return caches.match(req).then(function (cached) {
      return cached || Response.error();
    });
  });
}

/* Cache first; on a miss, fetch and remember. */
function cacheFirst(req) {
  return caches.match(req).then(function (cached) {
    if (cached) { return cached; }
    return fetch(req).then(function (response) {
      if (isCacheable(response)) {
        var copy = response.clone();
        caches.open(RUNTIME_CACHE).then(function (c) { c.put(req, copy); });
      }
      return response;
    })['catch'](function () {
      return Response.error();
    });
  });
}

/* ---------- page → worker messages ---------- */
self.addEventListener('message', function (event) {
  var data = event.data || {};
  if (data.type === 'SKIP_WAITING') { self.skipWaiting(); }
  if (data.type === 'VERSION' && event.ports && event.ports[0]) {
    event.ports[0].postMessage({ version: VERSION });
  }
});
