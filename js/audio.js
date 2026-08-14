/* ============================================================
   audio.js — vōx (ES5)
   BETA: Web Speech API using an Italian (it-IT) voice, which
   approximates ecclesiastical pronunciation almost for free.
   MIGRATION: replace speak() with playback of recorded MP3s
   (audio/f1_v1.mp3 …) — the rest of the app only calls
   AudioLA.speak(latinText).
   ============================================================ */
var AudioLA = (function () {
  'use strict';

  var voice = null;
  var ready = false;

  function pickVoice() {
    if (!window.speechSynthesis) { return; }
    var vs = window.speechSynthesis.getVoices();
    var i, best = null, ok = null;
    for (i = 0; i < vs.length; i++) {
      if (vs[i].lang && vs[i].lang.indexOf('it') === 0) {
        if (!ok) { ok = vs[i]; }
        /* prefer non-network "premium/enhanced" local voices when flagged */
        if (vs[i].localService && !best) { best = vs[i]; }
      }
    }
    voice = best || ok;
    ready = true;
  }

  if (window.speechSynthesis) {
    pickVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }

  /* Latin → Italian-friendly text, ecclesiastical adjustments */
  function prep(t) {
    var map = { 'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u', 'ȳ': 'i',
                'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U' };
    var out = '', i, c;
    for (i = 0; i < t.length; i++) {
      c = t.charAt(i);
      out += map[c] || c;
    }
    out = out.replace(/ae/g, 'e').replace(/Ae/g, 'E').replace(/oe/g, 'e').replace(/Oe/g, 'E');
    out = out.replace(/[“”«»]/g, '').replace(/y/g, 'i');
    return out;
  }

  function speak(text) {
    if (!window.speechSynthesis) { return false; }
    if (!ready) { pickVoice(); }
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(prep(text));
      u.lang = 'it-IT';
      if (voice) { u.voice = voice; }
      u.rate = 0.85;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  function stop() {
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) { /* noop */ }
    }
  }

  return { speak: speak, stop: stop };
})();
