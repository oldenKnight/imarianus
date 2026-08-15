/* ============================================================
   pwa.js — service-worker registration + install chip (ES5, M9)
   ------------------------------------------------------------
   Two small jobs, deliberately in one small file:

     1. REGISTER sw.js at the app root, so MARIANE opens offline.
     2. Offer a modest INSTALL chip when the browser says the app is
        installable — once, dismissible, and never nagging again.

   SCOPE, and why it is computed rather than hardcoded. The site lives at
   https://<host>/imarianus/ in production (see <base href> in index.html and
   the .htaccess) but at / in some local setups. A service worker may only
   control pages at or below the directory of its own script, so registering
   "/sw.js" from /imarianus/ would silently control nothing, and registering
   "/imarianus/sw.js" from / would do the same in reverse. We therefore derive
   the root from document.baseURI — the one value that is correct in both
   worlds — and refuse to register (loudly, in the console) when the page we
   are on is outside the scope that would produce. No default
   Service-Worker-Allowed header is needed for that, which matters: shared
   hosting will not let us add one.
   ============================================================ */
var PWA = (function () {
  'use strict';

  /* Latin UI strings, kept here so this file has no dependency on data-core.
     Same convention as the rest of the app: Latin first, macrons on. */
  var TEXT = {
    titulus: 'INSTALLĀ',
    sub: 'MARIANE in tēlephonō tuō',
    ita: 'ITA',
    nolo: 'Nōlō'
  };

  var DISMISS_KEY = 'mariane_install_dismissed_v1';
  var deferredPrompt = null;   /* the browser's BeforeInstallPromptEvent */
  var chipEl = null;
  var registration = null;

  /* ---------- 1. registration ---------- */

  /* the directory the app is served from, with a trailing slash */
  function appRoot() {
    var base = (document.baseURI || window.location.href).split('#')[0].split('?')[0];
    return base.replace(/[^\/]*$/, '');
  }

  function pathOf(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.pathname;
  }

  function register() {
    if (!('serviceWorker' in navigator)) { return; }
    /* Registration requires a secure context. http://localhost IS one by
       spec, so local QA works with no certificate; a plain-http staging
       host is not, and simply gets no worker (the app still runs). */
    if (!window.isSecureContext) {
      if (window.console) {
        console.info('[pwa] insecure context — no service worker (this is expected on plain http)');
      }
      return;
    }

    var root = appRoot();
    var scopePath = pathOf(root);
    if (window.location.pathname.indexOf(scopePath) !== 0) {
      if (window.console) {
        console.warn('[pwa] not registering: this page (' + window.location.pathname +
                     ') is outside the worker scope (' + scopePath + '). ' +
                     'Open the app under ' + scopePath + ' instead.');
      }
      return;
    }

    navigator.serviceWorker.register(root + 'sw.js', { scope: root })
      .then(function (reg) {
        registration = reg;
        if (window.console) { console.info('[pwa] service worker registered for ' + reg.scope); }
      })['catch'](function (err) {
        /* never fatal: a site without a worker is just a site */
        if (window.console) { console.warn('[pwa] service worker registration failed: ' + err); }
      });
  }

  /* ---------- 2. the install chip ---------- */

  function dismissed() {
    try { return window.localStorage.getItem(DISMISS_KEY) === '1'; }
    catch (e) { return false; }
  }
  function rememberDismissal() {
    try { window.localStorage.setItem(DISMISS_KEY, '1'); } catch (e) { /* noop */ }
  }

  function buildChip() {
    var wrap = document.createElement('div');
    wrap.id = 'pwa-install';
    wrap.className = 'pwa-chip';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', TEXT.titulus + ' — ' + TEXT.sub);

    var art = document.createElement('span');
    art.className = 'pwa-fox';
    /* the same fox as everywhere else, when the art library is present */
    if (typeof Scenes !== 'undefined' && Scenes.mascot) {
      art.innerHTML = Scenes.mascot(34, 'fox');
    }

    var txt = document.createElement('span');
    txt.className = 'pwa-text';
    var b = document.createElement('b');
    b.appendChild(document.createTextNode(TEXT.titulus));
    var small = document.createElement('small');
    small.appendChild(document.createTextNode(TEXT.sub));
    txt.appendChild(b);
    txt.appendChild(small);

    var yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'btn small primary pwa-yes';
    yes.appendChild(document.createTextNode(TEXT.ita));

    var no = document.createElement('button');
    no.type = 'button';
    no.className = 'pwa-no';
    no.setAttribute('aria-label', TEXT.nolo);
    no.appendChild(document.createTextNode('×'));

    yes.addEventListener('click', accept);
    no.addEventListener('click', function () { hideChip(); rememberDismissal(); });

    wrap.appendChild(art);
    wrap.appendChild(txt);
    wrap.appendChild(yes);
    wrap.appendChild(no);
    return wrap;
  }

  /* `force` shows the chip with no pending browser prompt — used by QA and
     by any future "how do I install this?" help link. */
  function showChip(force) {
    if (!force && (dismissed() || !deferredPrompt)) { return false; }
    if (!chipEl) {
      chipEl = buildChip();
      document.body.appendChild(chipEl);
    }
    /* one frame later so the CSS transition actually runs */
    window.setTimeout(function () { chipEl.className = 'pwa-chip show'; }, 30);
    return true;
  }

  function hideChip() {
    if (!chipEl) { return; }
    chipEl.className = 'pwa-chip';
    window.setTimeout(function () {
      if (chipEl && chipEl.parentNode) { chipEl.parentNode.removeChild(chipEl); }
      chipEl = null;
    }, 250);
  }

  function accept() {
    if (!deferredPrompt) { hideChip(); return; }
    var evt = deferredPrompt;
    deferredPrompt = null;          /* a BeforeInstallPromptEvent is single-use */
    hideChip();
    evt.prompt();
    if (evt.userChoice && evt.userChoice.then) {
      evt.userChoice.then(function (choice) {
        if (choice && choice.outcome !== 'accepted') { rememberDismissal(); }
      });
    }
  }

  /* ---------- wiring ---------- */

  window.addEventListener('beforeinstallprompt', function (e) {
    /* Chrome/Edge/Android. Stopping the default banner is what lets us put
       the offer inside the app's own visual language instead of on top of it. */
    e.preventDefault();
    deferredPrompt = e;
    /* wait for the app to have painted something before offering to install it */
    window.setTimeout(function () { showChip(false); }, 4000);
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    rememberDismissal();
    hideChip();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', register);
  } else {
    register();
  }

  return {
    register: register,
    showChip: showChip,
    hideChip: hideChip,
    isDismissed: dismissed,
    /* iOS/Safari never fires beforeinstallprompt: there the chip stays
       hidden and installation is Share → "Add to Home Screen". Exposed so a
       future help screen can say so in Latin. */
    canPrompt: function () { return !!deferredPrompt; },
    registration: function () { return registration; }
  };
})();
