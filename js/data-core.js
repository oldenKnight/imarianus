/* ============================================================
   data-core.js — UI strings, shared config, gradus ladder (ES5)
   ------------------------------------------------------------
   This file is the ENGINE's half of the old data.js. It carries
   nothing that a content author writes: no fables, no vocab, no
   scenes. Those now live in content/<track>-<region>.js and are
   loaded on demand by content-loader.js (CONTENT).

   Split rationale (MASTER-PLAN M4): data.js was 25 KB with three
   fables. The curriculum is 142 capitula. One monolith would be
   megabytes of JavaScript parsed on every page load, so content
   is per-region files injected only when a learner opens that
   region, while THIS file — small, always needed — ships in the
   initial defer chain.

   Load order (index.html): data-core.js → content/manifest.js →
   content-loader.js → … → app.js.
   ============================================================ */
var DATA = (function () {
  'use strict';

  /* ---------- UI strings ----------
     Kept as data so the chrome can be swapped wholesale later.
     Everything a learner can read is Latin (LATIN-STYLE §1: macrons
     on every long vowel, buttons included). */

  var UI = {
    appName: 'MARIANE',
    tagline: 'Fābulae Latīnae per sē illūstrātae',
    salve: 'Salvē!',
    quidNomen: 'Quid nōmen tibi est?',
    incipe: 'INCIPE',
    intra: 'INTRĀ',
    domus: 'Domus',
    ordo: 'Ōrdō',
    perge: 'PERGE',
    retro: 'RETRŌ',
    iterum: 'ITERUM',
    recte: 'RECTĒ!',
    minime: 'MINIMĒ…',
    euge: 'EUGE!',
    finis: 'FĪNIS',

    /* step names — keys MUST equal the step ids in STEPS */
    verba: 'Verba',
    fabula: 'Fābula',
    sonus: 'Sonus',
    ludus: 'Lūdus',
    aenigmata: 'Aenigmata',
    corrige: 'Corrige',
    comple: 'Complē',

    nullaCorda: 'Nūlla corda! Verba iterā.',
    cordaPlena: 'Corda plēna sunt!',
    proximamente: 'mox…',
    quaerere: 'Quod verbum?',
    tange: 'Tange verbum falsum!',
    ordina: 'Verba ōrdinā!',
    inveni: 'Paria invenī!',
    memoriaPerfecta: 'Memoria perfecta!',
    cape: 'Cape verbum rēctum!',
    puncta: 'pūncta',

    /* --- landing (logged out) --- */
    pitch: 'Linguam Latīnam disce legendō.',
    pitchSub: 'Imāginēs docent — nūlla alia lingua.',
    pitchThree: 'Trēs viae: fābulae, historia sacra, Aenēis.',

    /* --- three doors (logged in home) --- */
    eligePortam: 'Ēlige portam!',
    provectis: 'PRŌVECTĪS',

    /* --- "coming soon" track screen --- */
    moxTitulus: 'MOX',
    moxSub: 'in fabricā',
    moxLibri: 'Librī ventūrī:',

    /* --- SONUS step --- */
    audiEtElige: 'Audī — quae imāgō est?',
    audiIterum: 'Audī iterum',
    sineSono: 'Sine sonō: hoc īnstrūmentum vōcem nōn habet.',
    sineSonoPerge: 'Perge sine sonō.',

    /* --- FĀBULA autoplay --- */
    pausa: 'Pausa',
    curre: 'Curre',

    /* --- COMPLĒ (flexible order) --- */
    compleAsk: 'Complē sententiam!',
    dele: 'Dēle',

    /* --- ōrdō / board --- */
    tabulaVacua: 'Tabula vacua est.',
    tabulaMox: 'Prīmus estō!',
    gradus: 'Gradus'
  };

  /* ---------- gradus ladder (DESIGN §7) ----------
     Level derived from total XP. Names are the Latin ranks the owner
     chose; the THRESHOLDS BELOW ARE PROPOSALS AWAITING OWNER TUNING —
     they are pedagogy/economy design, not implementation (brief §10),
     so treat them as placeholders until Mariano signs them off. */
  var GRADUS = [
    { id: 'tiro',        titulus: 'Tīrō',        min: 0 },
    { id: 'auditor',     titulus: 'Audītor',     min: 150 },
    { id: 'lector',      titulus: 'Lēctor',      min: 450 },
    { id: 'grammaticus', titulus: 'Grammaticus', min: 1000 },
    { id: 'rhetor',      titulus: 'Rhētor',      min: 2000 },
    { id: 'magister',    titulus: 'Magister',    min: 3500 }
  ];

  /* highest gradus whose threshold the xp has reached */
  function gradusFor(xp) {
    var g = GRADUS[0], i;
    for (i = 0; i < GRADUS.length; i++) {
      if (xp >= GRADUS[i].min) { g = GRADUS[i]; }
    }
    return g;
  }
  /* xp still needed for the next gradus (0 when already at the top) */
  function gradusRemaining(xp) {
    var i;
    for (i = 0; i < GRADUS.length; i++) {
      if (xp < GRADUS[i].min) { return GRADUS[i].min - xp; }
    }
    return 0;
  }

  /* ---------- default step order (DESIGN §4) ----------
     The engine iterates this list as DATA; a capitulum or a region may
     override it with its own `steps` array, so a track can vary the
     lesson shape without an engine change. Step IDS ARE FROZEN — the
     server's step_completions rows key on these exact strings. */
  var STEPS = ['verba', 'fabula', 'ludus', 'aenigmata', 'corrige', 'comple'];
  var STEP_ICONS = {
    verba: '🖼️', fabula: '📜', sonus: '🔊', ludus: '🕹️',
    aenigmata: '🧩', corrige: '✏️', comple: '✍️'
  };

  /* ---------- XP economy (client mirror only) ----------
     The SERVER grants XP; these numbers only drive the optimistic UI
     so the counter moves instantly. lib/rules.php is authoritative. */
  var XP = { perCorrect: 10, stepBonus: 20, bossFight: 30 };

  /* ---------- the three doors (DESIGN §2) ----------
     `id` matches the track id in content/manifest.json. `mox` lists the
     librī still in fabricā, straight from docs/CURRICULUM.md, so the
     placeholder screen shows the real plan rather than a dead end.
     `tint` is the map background family (map.js TINTS). */
  var TRACKS = [
    {
      id: 'fabulae',
      titulus: 'FĀBULAE',
      subtitulus: 'Aesōpī fābulae',
      art: 'fox',
      tint: 'fabulae',
      mox: [
        'II · Ager', 'III · Rīvus', 'IV · Mōns', 'V · Via', 'VI · Urbs',
        'VII · Lītus', 'VIII · Hortus', 'IX · Castra', 'X · Portus',
        'XI · Templum', 'XII · Forum'
      ]
    },
    {
      id: 'historia',
      titulus: 'HISTORIA SACRA',
      subtitulus: 'Ā creātiōne',
      art: 'arca',
      tint: 'historia',
      mox: [
        'I · Creātiō', 'II · Dīluvium', 'III · Abraham', 'IV · Iacob',
        'V · Ioseph', 'VI · Moyses', 'VII · Iūdicēs', 'VIII · Rēgēs', 'IX · Iesus'
      ]
    },
    {
      id: 'aeneis',
      titulus: 'AENĒIS',
      subtitulus: 'Arma virumque',
      art: 'navis',
      badge: UI.provectis,          /* laurel badge; the door is NEVER locked */
      tint: 'aeneis',
      mox: [
        'I · Tempestās', 'II · Equus ligneus', 'III · Errōrēs', 'IV · Dīdō',
        'V · Lūdī', 'VI · Sibylla', 'VII · Latium', 'VIII · Scūtum',
        'IX · Nīsus et Euryalus', 'X · Pallās', 'XI · Camilla', 'XII · Pāx'
      ]
    }
  ];

  function trackById(id) {
    var i;
    for (i = 0; i < TRACKS.length; i++) {
      if (TRACKS[i].id === id) { return TRACKS[i]; }
    }
    return null;
  }

  /* ---------- map / boss chrome strings ---------- */
  var MAP_UI = {
    titulus: 'Prōvincia',
    bossLocked: 'Perfice omnēs fābulās prīmum!',
    bossReady: 'Lupum vince!',
    pugna: 'PUGNA',
    quizTitle: 'Probātiō',
    gateLocked: 'Mox plūra…',
    vicisti: 'VĪCISTĪ!',
    victus: 'Iterum tempta!',
    tempus: 'Tempus',
    cursus: 'Cursus',
    provincia: 'Prōvincia'
  };

  return {
    UI: UI,
    STEPS: STEPS,
    STEP_ICONS: STEP_ICONS,
    XP: XP,
    GRADUS: GRADUS,
    gradusFor: gradusFor,
    gradusRemaining: gradusRemaining,
    TRACKS: TRACKS,
    trackById: trackById,
    MAP_UI: MAP_UI
  };
})();
