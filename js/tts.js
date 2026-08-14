/* ============================================================
   tts.js — vōx Latīna (ES5, Web Speech API)
   ------------------------------------------------------------
   DESIGN §5. One central speaker for the whole app.

   THE BUG THIS FILE EXISTS TO PREVENT: in the owner's iFabulae
   app the utterance inherited the page/browser language, so an
   English voice read Latin "diēs" as "daiez". Here `lang` is set
   EXPLICITLY on every utterance and is never an en-* value.

   Voice priority (DESIGN §5):
     1. any it-IT voice  — Italian phonology is the closest thing
        a stock TTS engine has to ecclesiastical Latin;
     2. any es-ES voice  — five pure vowels, also close;
     3. whatever the platform gives us, still tagged it-IT so the
        engine applies Italian letter-to-sound rules.
   Local (offline) voices win over network voices at equal rank:
   students are on phones with bad wifi.

   Macrons are stripped before speaking (some engines spell out or
   choke on ā ē ī ō ū) while the DISPLAY keeps them everywhere.

   Every caller must survive Tts.available() === false: a browser
   with no speech support must never block a lesson.

   Supersedes the speak() half of audio.js; that module stays for
   its own callers and its own migration note.
   ============================================================ */
var Tts = (function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var voice = null;
  var picked = false;
  var LANG = 'it-IT';          /* NEVER en-*; see the header */

  /* ---------- voice selection ---------- */

  function scoreVoice(v) {
    if (!v || !v.lang) { return 0; }
    var lang = v.lang.replace('_', '-').toLowerCase();
    var s = 0;
    if (lang.indexOf('it') === 0) { s = (lang === 'it-it') ? 102 : 100; }
    else if (lang === 'es-es') { s = 62; }   /* Castilian first, per DESIGN §5 */
    else if (lang.indexOf('es') === 0) { s = 55; }  /* any other Spanish still works */
    else { return 0; }                       /* anything else: not our voice */
    if (v.localService) { s += 5; }          /* offline beats network */
    if (/enhanced|premium|siri|natural/i.test(v.name || '')) { s += 3; }
    return s;
  }

  function pickVoice() {
    if (!synth) { return; }
    var list = [];
    try { list = synth.getVoices() || []; } catch (e) { list = []; }
    /* Chrome returns [] until the voiceschanged event; stay unpicked so the
       next speak() tries again rather than caching "nothing". */
    if (!list.length) { return; }
    var best = null, bestScore = 0, i, sc;
    for (i = 0; i < list.length; i++) {
      sc = scoreVoice(list[i]);
      if (sc > bestScore) { bestScore = sc; best = list[i]; }
    }
    voice = best;                     /* may stay null: we still set lang */
    if (voice && voice.lang) {
      LANG = voice.lang.replace('_', '-');
      if (/^en/i.test(LANG)) { LANG = 'it-IT'; }   /* belt and braces */
    }
    picked = true;
  }

  if (synth) {
    pickVoice();
    if (typeof synth.onvoiceschanged !== 'undefined') {
      synth.onvoiceschanged = pickVoice;
    }
  }

  /* ---------- text preparation ---------- */

  var MACRON = { 'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'i',
                 'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U', 'Ȳ': 'I' };

  /* Latin → letters an Italian voice pronounces correctly.
     Ecclesiastical adjustments: ae/oe → e, y → i, and the typographic
     quotation marks dropped so they are not read out as "virgolette". */
  function prep(text) {
    var out = '', i, c;
    var t = String(text);
    for (i = 0; i < t.length; i++) {
      c = t.charAt(i);
      out += (MACRON[c] || c);
    }
    out = out.replace(/ae/g, 'e').replace(/Ae/g, 'E')
             .replace(/oe/g, 'e').replace(/Oe/g, 'E')
             .replace(/[“”«»"]/g, '')
             .replace(/y/g, 'i').replace(/Y/g, 'I');
    return out;
  }

  /* ---------- public API ---------- */

  function available() {
    return !!(synth && window.SpeechSynthesisUtterance);
  }

  /* speak(text, opts)
       opts.rate   default 0.85 — slow enough for a beginner to follow
       opts.onEnd  called when the utterance finishes OR errors, so a caller
                   that advances a page on speech end cannot hang
     Returns false when nothing was spoken (caller decides what to do). */
  function speak(text, opts) {
    opts = opts || {};
    if (!available() || !text) {
      if (opts.onEnd) { opts.onEnd(); }
      return false;
    }
    if (!picked) { pickVoice(); }
    try {
      synth.cancel();
      var u = new window.SpeechSynthesisUtterance(prep(text));
      u.lang = opts.lang || LANG;            /* ALWAYS explicit */
      if (voice) { u.voice = voice; }
      u.rate = (typeof opts.rate === 'number') ? opts.rate : 0.85;
      u.pitch = (typeof opts.pitch === 'number') ? opts.pitch : 1;
      if (opts.onEnd) {
        var done = false;
        var fire = function () { if (!done) { done = true; opts.onEnd(); } };
        u.onend = fire;
        u.onerror = fire;
      }
      synth.speak(u);
      return true;
    } catch (e) {
      if (opts.onEnd) { opts.onEnd(); }
      return false;
    }
  }

  function stop() {
    if (!synth) { return; }
    try { synth.cancel(); } catch (e) { /* noop */ }
  }

  /* what we ended up using — for ?debug and for bug reports */
  function info() {
    return {
      available: available(),
      lang: LANG,
      voice: voice ? (voice.name + ' [' + voice.lang + ']') : '(platform default)',
      local: voice ? !!voice.localService : null
    };
  }

  return { speak: speak, stop: stop, available: available, info: info, prep: prep };
})();
