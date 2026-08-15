/* ============================================================
   content/aeneis-al1.js — AENĒIS · Liber I · ARMA VIRUMQUE  (ladder S12)
   ------------------------------------------------------------
   Four capitula from Aeneid I, told as GRADED PROSE, and closing on
   the track's first payoff — Vergil's own opening hexameters:

     a1 Tempestās          — Aen. 1,1–156
     a2 Ad Āfricae ōram    — Aen. 1,157–222
     a3 Venus māter        — Aen. 1,305–417
     a4 Rēgīna Dīdō        — Aen. 1,418–722  + VERBA VERGILIĪ (1,1–3)

   THE TRACK'S CHARTER (designer rulings, binding — see the head of
   content/_ledger-aeneis.md for the long form):

   1. AUDIENCE = PRŌVECTĪ. The FULL grammar ladder S1–S12 is open from
      the first page: subjunctives, accūsātīvus cum īnfīnītīvō, ablātīvus
      absolūtus, passive, deponents, relatives, all tenses. This track is
      NOT a third beginner door; it assumes the two beginner tracks'
      core vocabulary (est, videt, dīcit, venit, magnus, urbs, terra…).
   2. WHAT IS GRADED IS THE VOCABULARY. ≤10 NEW content lexemes per
      capitulum, each pictured or Latin-glossed and recycled ≥3× inside
      its own capitulum. Poetic diction is PRE-TAUGHT by gloss device
      before any authentic line uses it: ratis = nāvis, aequor = mare,
      moenia = mūrī urbis, fātum, ōra, ēnsis = gladius, pietās.
   3. THE PAYOFF. The liber's last capitulum closes with "Verba Vergiliī
      ipsīus": authentic hexameters, quoted EXACTLY (OCT/Mynors text,
      macronized — quantity marks added, not a single letter changed),
      one hexameter per page, each with its own scene and its own
      Latin-only marginal glosses, then a graded-prose paraphrase, then
      the `versūs memorābilēs` closing page. Liber I quotes Aen. 1,1–3.
      Aen. 1,203 is quoted, whole, inside a2 in the same way.

   HOW THE GODS ARE DRAWN. Unlike Historia Sacra (where the Father is
   never given a body), the gods of the Aenēis ARE persons — that is
   what they are in the poem. They are told apart by their ATTRIBUTE
   BIRD, which the art library happens to own outright:
     Iūnō      = rēgīna (crown + veil) + pāvō      — the peacock
     Venus     = veiled woman + columba + rosa     — dove and rose
     Neptūnus  = rēx in sea-blue between two walls of water
     Aeolus    = rēx on a mountain among the winds
   NO gold radiance is used for any of them: `star` is Historia Sacra's
   sign for the God who has no body, and the two tracks must not teach
   the same picture twice with two meanings.
   MISSING ART, reported not substituted (AUTHORING-BRIEF "SCENES
   FIRST"): there is no TRIDENT (tridēns) prop in the library, so
   Neptūnus is composed as the charter's fallback — a king standing
   between two `murusAquae` walls on the sea. The word `tridēns` is
   therefore not taught anywhere in this liber.

   B RATING (DESIGN §8). The storm is dramatic, never frightening: no
   ship is shown sinking, no man is shown in the water, and the one
   loss the poem records is carried by a single dignified sentence
   with an empty sea behind it. Iūnō's order to Aeolus is rewritten
   from "submersās obrue puppēs" to a purpose clause that keeps her
   intent and drops the drowning.

   IDS ARE DATABASE KEYS once shipped: a1…a4 and progressId 'al1'
   (content/README.md §5).

   FILE NAME. js/content-loader.js derives the path as
   content/<track>-<region>.js, and server/lib/rules.php keys regions in a
   FLAT GLOBAL namespace (rule_regions() writes $out[$id]) where 'l1' and
   'l2' already belong to Historia Sacra. The region id therefore has to be
   'al1', and the file has to be aeneis-al1.js — not aeneis-l1.js, which
   content/README.md names as an illustration written before any Aeneis
   region existed. Reported to the integrator in
   content/_pending/a-l1.reg.json.

   Schema: content/README.md. Style: docs/LATIN-STYLE.md §3.
   ============================================================ */
(function () {
  'use strict';

  var G = 210;               /* ground line in scene space (400 × 240) */
  var SEA = 212;             /* where a figure stands on the sea scenes */

  /* the palette the liber's recurring figures are built from, kept in
     one place so Aenēās is the same man on every page he appears */
  var TROIA  = '#b3572b';    /* Aenēās' tunica: Trojan terracotta      */
  var GOLD   = '#e0a93e';
  var PONTUS = '#2c5f7a';    /* Neptūnus' robe: deep sea               */
  var SPUMA  = '#78bed7';    /* his mantle: foam                       */
  var AURA   = '#cfd8dc';    /* Aeolus' mantle: cloud                  */
  var VIRIDE = '#7a8a5a';    /* Aeolus' robe                           */

  /* Aenēās, always the same figure: robed, shielded, terracotta+gold */
  function heros(x, y, s, opts) {
    var o = { t: 'person', x: x, y: y, s: s, role: 'man',
              robeColor: TROIA, mantleColor: GOLD, shield: true };
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }
  function iuno(x, y, s, opts) {
    var o = { t: 'person', x: x, y: y, s: s, role: 'queen', mantleColor: GOLD };
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }
  function neptunus(x, y, s, opts) {
    var o = { t: 'person', x: x, y: y, s: s, role: 'king',
              robeColor: PONTUS, mantleColor: SPUMA };
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }
  function aeolus(x, y, s, opts) {
    var o = { t: 'person', x: x, y: y, s: s, role: 'king',
              robeColor: VIRIDE, mantleColor: AURA };
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }
  function venus(x, y, s, opts) {
    var o = { t: 'person', x: x, y: y, s: s, role: 'woman',
              robeColor: '#f2e4c9', mantleColor: GOLD };
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ a1 · vocabulary cards ============ */

    /* Aenēās: the man of the first line — arma (the shield) and vir.
       Deliberately NOT on a ship, so the card means the MAN. */
    v_aeneas:   { bg: 'plain', items: [ heros(200, G, 1.6) ] },

    v_navis:    { bg: 'sea', items: [
                  { t: 'ship', x: 200, y: 200, s: 1.25 }
                ] },

    /* mare: calm water with its fish, drawn LARGE — at 74 px (a boss
       tile) a fish at scale 1.3 was a speck and the card read "sky". */
    v_mare:     { bg: 'sea', items: [
                  { t: 'piscis', x: 130, y: 188, s: 2.1 },
                  { t: 'piscis', x: 282, y: 214, s: 1.6, flip: true }
                ] },

    /* unda: waves and nothing else. ONE wall alone read as a tower at
       tile size, so a smaller second crest gives it the sea's rhythm. */
    v_unda:     { bg: 'sea', items: [
                  { t: 'murusAquae', x: 168, y: 230, s: 0.86, fish: false },
                  { t: 'murusAquae', x: 300, y: 238, s: 0.5, fish: false, flip: true }
                ] },

    v_ventus:   { bg: 'plain', items: [
                  { t: 'ventus', x: 190, y: 196, s: 1.6 }
                ] },

    /* tempestās: wind AND wave on the storm ground, no ship — the storm
       itself. v_iactat is the same weather WITH the ship in it. */
    v_tempestas: { bg: 'stormSea', items: [
                  { t: 'ventus',     x: 92,  y: 176, s: 1.15 },
                  { t: 'murusAquae', x: 306, y: 234, s: 1, fish: false }
                ] },

    v_iactat:   { bg: 'stormSea', items: [
                  { t: 'murusAquae', x: 58,  y: 234, s: 0.72, fish: false },
                  { t: 'ship',       x: 208, y: 198, s: 0.95, sail: 'furled' },
                  { t: 'murusAquae', x: 350, y: 234, s: 0.72, fish: false, flip: true }
                ],
                bubbles: [{ x: 208, y: 62, w: 44, h: 34, text: '⬆', kind: 'thought', tail: 'right', fs: 18 },
                          { x: 208, y: 108, w: 44, h: 34, text: '⬇', kind: 'thought', tail: 'right', fs: 18 }] },

    v_sedat:    { bg: 'sea', items: [
                  neptunus(140, SEA, 1.15, { pose: 'point' }),
                  { t: 'ship', x: 306, y: 202, s: 0.85 }
                ] },

    /* Iūnō: crown, veil — and the peacock, which no other figure has */
    v_iuno:     { bg: 'plain', items: [
                  iuno(152, G, 1.25),
                  { t: 'pavo', x: 282, y: G, s: 0.9, flip: true }
                ] },

    /* Neptūnus: the charter's fallback composition — no trident exists
       in the library, so the god IS the sea he stands in */
    v_neptunus: { bg: 'sea', items: [
                  { t: 'murusAquae', x: 60,  y: 230, s: 0.66, fish: false },
                  neptunus(204, SEA, 1.2),
                  { t: 'murusAquae', x: 348, y: 230, s: 0.66, fish: false, flip: true }
                ] },

    /* ============ a1 · story ============ */

    a1_troia:   { bg: 'troy', items: [
                  heros(118, G, 1.05, { pose: 'walk' }),
                  { t: 'crowdGroup', x: 286, y: G, s: 0.85, n: 4 }
                ] },

    a1_fuga:    { bg: 'sea', items: [
                  { t: 'ship', x: 128, y: 196, s: 1 },
                  { t: 'ship', x: 288, y: 212, s: 0.8 }
                ] },

    a1_iuno:    { bg: 'plain', items: [
                  iuno(150, G, 1.2),
                  { t: 'pavo', x: 288, y: G, s: 0.85, flip: true }
                ],
                bubbles: [{ x: 62, y: 88, w: 54, h: 40, text: '😠', kind: 'thought', tail: 'right', fs: 20 }] },

    a1_iunovidet: { bg: 'sea', items: [
                  { t: 'mountain', x: 54, y: G, s: 0.85 },
                  iuno(66, 168, 0.82),
                  { t: 'ship', x: 296, y: 198, s: 0.85 }
                ] },

    a1_aeolus:  { bg: 'mountain', items: [
                  aeolus(196, G, 1.25),
                  { t: 'ventus', x: 330, y: 184, s: 0.9 }
                ] },

    a1_ventos:  { bg: 'mountain', items: [
                  { t: 'ventus', x: 96,  y: 170, s: 0.9 },
                  { t: 'ventus', x: 232, y: 150, s: 0.8, flip: true },
                  { t: 'ventus', x: 336, y: 190, s: 0.72 }
                ] },

    a1_iubet:   { bg: 'mountain', items: [
                  iuno(126, G, 1.1, { pose: 'point' }),
                  aeolus(280, G, 1.1, { flip: true })
                ],
                bubbles: [{ x: 210, y: 62, w: 56, h: 40, text: '💨', kind: 'speech', tail: 'right', fs: 20 }] },

    a1_emittit: { bg: 'stormSea', items: [
                  { t: 'ventus', x: 84,  y: 172, s: 1.05 },
                  { t: 'ventus', x: 224, y: 152, s: 0.9, flip: true },
                  { t: 'ventus', x: 340, y: 188, s: 0.78 }
                ] },

    a1_tempestas: { bg: 'stormSea', items: [
                  { t: 'murusAquae', x: 72,  y: 234, s: 0.9, fish: false },
                  { t: 'murusAquae', x: 328, y: 234, s: 0.9, fish: false, flip: true }
                ] },

    a1_iactantur: { bg: 'stormSea', items: [
                  { t: 'murusAquae', x: 56,  y: 234, s: 0.75, fish: false },
                  { t: 'ship',       x: 206, y: 198, s: 0.95, sail: 'furled' },
                  { t: 'murusAquae', x: 352, y: 234, s: 0.75, fish: false, flip: true }
                ] },

    /* Aenēās on the deck with his hands raised — Vergil's own gesture
       (1,93 "duplicīs tendēns ad sīdera palmās"), and the whole of the
       storm's danger. Nobody is in the water on any page of this liber. */
    a1_orat:    { bg: 'stormSea', items: [
                  { t: 'ship', x: 200, y: 208, s: 1.1, sail: 'furled' },
                  heros(194, 186, 0.6, { pose: 'arms-up', shield: false })
                ] },

    a1_neptunus: { bg: 'stormSea', items: [
                  neptunus(198, SEA, 1.2)
                ] },

    a1_quosego: { bg: 'stormSea', items: [
                  neptunus(150, SEA, 1.2, { pose: 'point' }),
                  { t: 'ventus', x: 324, y: 158, s: 0.85, flip: true }
                ],
                bubbles: [{ x: 244, y: 70, w: 50, h: 40, text: '❗', kind: 'speech', tail: 'right', fs: 24 }] },

    a1_fugiunt: { bg: 'sea', items: [
                  neptunus(140, SEA, 1.15, { pose: 'point' }),
                  { t: 'ventus', x: 340, y: 150, s: 0.75, flip: true }
                ] },

    a1_placidum: { bg: 'sea', items: [
                  { t: 'ship',   x: 166, y: 198, s: 1.05 },
                  { t: 'ship',   x: 304, y: 214, s: 0.78 },
                  { t: 'piscis', x: 62,  y: 206, s: 0.9 }
                ] },

    a1_memoria: { bg: 'sea', items: [
                  { t: 'ship', x: 200, y: 206, s: 1.15 },
                  heros(196, 184, 0.58, { shield: false })
                ] },

    /* ============ a2 · vocabulary cards ============ */

    v_ora:      { bg: 'sea', items: [
                  { t: 'palmTree', x: 66,  y: G, s: 0.85 },
                  { t: 'ship',     x: 250, y: 206, s: 0.9, sail: 'furled' }
                ] },

    v_socius:   { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 200, y: G, s: 1.25, n: 5 }
                ] },

    v_dux:      { bg: 'plain', items: [
                  heros(118, G, 1.1, { pose: 'point' }),
                  { t: 'crowdGroup', x: 290, y: G, s: 0.85, n: 4 }
                ] },

    v_cervus:   { bg: 'forest', items: [
                  { t: 'cervus', x: 200, y: G, s: 1.5 }
                ] },

    v_cibus:    { bg: 'plain', items: [
                  { t: 'mensa',  x: 200, y: G, s: 1.35 },
                  { t: 'patina', x: 200, y: G - 38, s: 1 }
                ] },

    v_fessus:   { bg: 'sea', items: [
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'crowd', pose: 'kneel' }
                ],
                bubbles: [{ x: 86, y: 92, w: 54, h: 40, text: '😖', kind: 'thought', tail: 'right', fs: 20 }] },

    v_hortatur: { bg: 'sea', items: [
                  heros(120, G, 1.1, { pose: 'arms-up', shield: false }),
                  { t: 'crowdGroup', x: 296, y: G, s: 0.85, n: 4 }
                ],
                bubbles: [{ x: 214, y: 60, w: 56, h: 40, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    v_iuvat:    { bg: 'plain', items: [
                  { t: 'person', x: 250, y: G, s: 1.05, role: 'crowd', pose: 'kneel', flip: true },
                  heros(150, G, 1.05, { pose: 'point', shield: false })
                ],
                bubbles: [{ x: 200, y: 88, w: 50, h: 38, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    /* spēs: the sun over a man with his hands raised. `sol` is placed
       ON TOP of bgSea's own pale disc (70,44) — side by side the two
       read as two suns, which is what the first pass looked like. */
    v_spes:     { bg: 'sea', items: [
                  { t: 'sol',    x: 70,  y: 74, s: 1 },
                  { t: 'person', x: 200, y: G, s: 1.3, role: 'crowd', pose: 'arms-up' }
                ] },

    v_servat:   { bg: 'sea', items: [
                  neptunus(112, SEA, 1, { pose: 'point' }),
                  { t: 'ship', x: 286, y: 202, s: 0.9 }
                ],
                bubbles: [{ x: 200, y: 84, w: 50, h: 38, text: '🛡', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ a2 · story ============ */

    a2_ora:     { bg: 'sea', items: [
                  { t: 'palmTree', x: 58,  y: G, s: 0.9 },
                  { t: 'ship',     x: 200, y: 202, s: 1, sail: 'furled' },
                  { t: 'ship',     x: 322, y: 214, s: 0.75, sail: 'furled' }
                ] },

    a2_exeunt:  { bg: 'sea', items: [
                  { t: 'ship',       x: 316, y: 208, s: 0.85, sail: 'furled' },
                  { t: 'crowdGroup', x: 148, y: G, s: 1, n: 5 }
                ] },

    a2_fessi:   { bg: 'sea', items: [
                  { t: 'palmTree', x: 344, y: G, s: 0.8 },
                  { t: 'person', x: 128, y: G, s: 1.05, role: 'crowd', pose: 'kneel' },
                  { t: 'person', x: 216, y: G, s: 1.05, role: 'crowd', pose: 'kneel', flip: true }
                ] },

    a2_ascendit: { bg: 'mountain', items: [
                  heros(206, 176, 0.95, { pose: 'walk' })
                ] },

    a2_spectat: { bg: 'sea', items: [
                  { t: 'mountain', x: 60, y: G, s: 0.85 },
                  heros(72, 168, 0.8, { pose: 'point', shield: false })
                ] },

    a2_cervi:   { bg: 'forest', items: [
                  { t: 'cervus', x: 118, y: G, s: 1.1 },
                  { t: 'cervus', x: 258, y: G, s: 1, flip: true },
                  { t: 'tree',   x: 350, y: G, s: 0.85 }
                ] },

    a2_portat:  { bg: 'sea', items: [
                  { t: 'cervus', x: 292, y: G, s: 0.9, flip: true },
                  heros(140, G, 1.05, { pose: 'walk', shield: false })
                ] },

    a2_cibus:   { bg: 'sea', items: [
                  { t: 'mensa',      x: 128, y: G, s: 1.1 },
                  { t: 'patina',     x: 128, y: G - 32, s: 0.85 },
                  { t: 'crowdGroup', x: 292, y: G, s: 0.85, n: 4 }
                ] },

    a2_tristis: { bg: 'sea', items: [
                  heros(200, G, 1.15, { shield: false })
                ],
                bubbles: [{ x: 84, y: 90, w: 54, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 20 }] },

    a2_hortatur: { bg: 'sea', items: [
                  heros(116, G, 1.1, { pose: 'arms-up', shield: false }),
                  { t: 'crowdGroup', x: 292, y: G, s: 0.85, n: 5 }
                ] },

    a2_dicit:   { bg: 'sea', items: [
                  heros(116, G, 1.1, { pose: 'point', shield: false }),
                  { t: 'crowdGroup', x: 296, y: G, s: 0.85, n: 4 }
                ],
                bubbles: [{ x: 214, y: 58, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    /* the page that hands the reader over to Vergil: the poet's own
       voice, so the frame changes — a column, and a man reciting */
    a2_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 92,  y: G, s: 0.9 },
                  { t: 'person',  x: 226, y: G, s: 1.15, role: 'priest', pose: 'point' }
                ] },

    a2_versus:  { bg: 'sea', items: [
                  { t: 'sol', x: 70, y: 74, s: 0.95 },
                  heros(148, G, 1.1, { pose: 'arms-up', shield: false }),
                  { t: 'crowdGroup', x: 300, y: G, s: 0.8, n: 4 }
                ] },

    a2_spes:    { bg: 'sea', items: [
                  { t: 'sol',    x: 70,  y: 74, s: 0.95 },
                  { t: 'person', x: 176, y: G, s: 1.15, role: 'crowd', pose: 'arms-up' },
                  { t: 'person', x: 268, y: G, s: 1.15, role: 'crowd', pose: 'arms-up', flip: true }
                ] },

    a2_venus:   { bg: 'sea', items: [
                  venus(150, G, 1.15),
                  { t: 'columba', x: 282, y: 146, s: 0.95, pose: 'fly', flip: true }
                ] },

    a2_memoria: { bg: 'sea', items: [
                  { t: 'sol', x: 70, y: 74, s: 0.9 },
                  { t: 'crowdGroup', x: 158, y: G, s: 1.05, n: 4 },
                  { t: 'ship', x: 326, y: 208, s: 0.7 }
                ] },

    /* ============ a3 · vocabulary cards ============ */

    v_venus:    { bg: 'forest', items: [
                  venus(180, G, 1.25),
                  { t: 'rose', x: 302, y: G - 4, s: 0.9 }
                ] },

    v_mater:    { bg: 'forest', items: [
                  venus(140, G, 1.15),
                  heros(258, G, 1.1, { flip: true, shield: false })
                ],
                bubbles: [{ x: 200, y: 60, w: 54, h: 40, text: '💭', kind: 'thought', tail: 'right', fs: 19 }] },

    v_filius:   { bg: 'plain', items: [
                  { t: 'person', x: 130, y: G, s: 1.15, role: 'patriarch' },
                  heros(258, G, 1.05, { flip: true, shield: false })
                ] },

    v_virgo:    { bg: 'forest', items: [
                  { t: 'tree',   x: 336, y: G, s: 0.9 },
                  { t: 'person', x: 168, y: G, s: 1.15, role: 'woman',
                    robeColor: '#8fa06a', mantleColor: '#f2e4c9', veil: false, hair: 'long' }
                ] },

    v_silva:    { bg: 'forest', items: [
                  { t: 'tree', x: 108, y: G, s: 1.05 },
                  { t: 'tree', x: 292, y: G, s: 0.9 },
                  { t: 'bush', x: 200, y: G }
                ] },

    /* NO `nūbēs` CARD — see the a3 header. The only cloud in the art
       library is the `ventus` actor, face and gusts included, so a card
       for nūbēs would be the same picture as a1's `ventus` card and the
       trial's word tiles would be a coin-flip. Venus' own bird takes
       the tenth slot instead, and nūbēs stays a glossed context word. */
    v_columba:  { bg: 'plain', items: [
                  { t: 'columba', x: 200, y: 150, s: 1.9, pose: 'fly' }
                ] },

    /* Carthāgō = the WHOLE city (wall + temple behind it); `moenia` is
       the wall alone on bare ground, `templum` the temple alone. Three
       cards, three different pictures — the first pass had all three
       standing on the city ground and they were one picture. */
    v_carthago: { bg: 'city', items: [
                  { t: 'cityWall', x: 196, y: G, s: 1.05 },
                  { t: 'temple',   x: 332, y: G, s: 0.55 }
                ] },

    /* cēlat: the two men are drawn FIRST so the cloud covers them —
       the staging carries the word, exactly as h4_latent does */
    v_celat:    { bg: 'plain', items: [
                  heros(176, G, 1, { shield: false }),
                  { t: 'person', x: 236, y: G, s: 1, role: 'crowd', flip: true },
                  { t: 'ventus', x: 158, y: 200, s: 1.5, face: false },
                  { t: 'ventus', x: 272, y: 196, s: 1.35, flip: true, face: false }
                ] },

    v_ostendit: { bg: 'forest', items: [
                  venus(196, G, 1.25),
                  { t: 'rose',    x: 322, y: G - 4, s: 0.8 },
                  { t: 'columba', x: 82,  y: 140, s: 0.9, pose: 'fly' }
                ] },

    v_agnoscit: { bg: 'forest', items: [
                  venus(268, G, 1.1, { flip: true }),
                  heros(132, G, 1.1, { pose: 'point', shield: false })
                ],
                bubbles: [{ x: 200, y: 62, w: 52, h: 40, text: '👀', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ a3 · story ============ */

    a3_explorat: { bg: 'forest', items: [
                  heros(140, G, 1.1, { pose: 'walk' }),
                  { t: 'person', x: 232, y: G, s: 1.05, role: 'crowd', pose: 'walk' }
                ] },

    a3_silva:   { bg: 'forest', items: [
                  { t: 'tree', x: 78,  y: G, s: 1.1 },
                  { t: 'tree', x: 320, y: G, s: 0.95 },
                  heros(200, G, 1, { pose: 'walk' })
                ] },

    a3_virgo:   { bg: 'forest', items: [
                  { t: 'tree',   x: 340, y: G, s: 0.85 },
                  heros(112, G, 1.05, { shield: false }),
                  { t: 'person', x: 262, y: G, s: 1.1, role: 'woman', flip: true,
                    robeColor: '#8fa06a', mantleColor: '#f2e4c9', veil: false, hair: 'long' }
                ] },

    a3_rogat:   { bg: 'forest', items: [
                  heros(112, G, 1.05, { shield: false }),
                  { t: 'person', x: 262, y: G, s: 1.1, role: 'woman', flip: true, pose: 'point',
                    robeColor: '#8fa06a', mantleColor: '#f2e4c9', veil: false, hair: 'long' }
                ],
                bubbles: [{ x: 188, y: 58, w: 56, h: 42, text: '❓', kind: 'speech', tail: 'left', fs: 22 }] },

    a3_respondet: { bg: 'forest', items: [
                  heros(112, G, 1.05, { pose: 'point', shield: false }),
                  { t: 'person', x: 268, y: G, s: 1.1, role: 'woman', flip: true,
                    robeColor: '#8fa06a', mantleColor: '#f2e4c9', veil: false, hair: 'long' }
                ],
                bubbles: [{ x: 192, y: 58, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a3_carthago: { bg: 'city', items: [
                  { t: 'cityWall', x: 208, y: G, s: 1.05 },
                  { t: 'temple',   x: 330, y: G, s: 0.6 }
                ] },

    a3_quaeris: { bg: 'forest', items: [
                  heros(122, G, 1.1, { pose: 'arms-up', shield: false }),
                  { t: 'person', x: 274, y: G, s: 1.1, role: 'woman', flip: true,
                    robeColor: '#8fa06a', mantleColor: '#f2e4c9', veil: false, hair: 'long' }
                ] },

    a3_discedit: { bg: 'forest', items: [
                  heros(108, G, 1.05, { shield: false }),
                  { t: 'person', x: 286, y: G, s: 1.05, role: 'woman', pose: 'walk',
                    robeColor: '#8fa06a', mantleColor: '#f2e4c9', veil: false, hair: 'long' }
                ] },

    a3_ostendit: { bg: 'forest', items: [
                  venus(258, G, 1.2, { flip: true }),
                  { t: 'rose',    x: 344, y: G - 4, s: 0.75 },
                  { t: 'columba', x: 118, y: 138, s: 0.9, pose: 'fly' }
                ] },

    a3_venus:   { bg: 'forest', items: [
                  venus(196, G, 1.3),
                  { t: 'rose', x: 320, y: G - 4, s: 0.85 }
                ] },

    a3_agnoscit: { bg: 'forest', items: [
                  venus(272, G, 1.1, { flip: true }),
                  heros(128, G, 1.1, { pose: 'arms-up', shield: false })
                ],
                bubbles: [{ x: 200, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a3_celat:   { bg: 'plain', items: [
                  heros(168, G, 1, { shield: false }),
                  { t: 'person', x: 232, y: G, s: 1, role: 'crowd', flip: true },
                  { t: 'ventus', x: 150, y: 202, s: 1.5, face: false },
                  { t: 'ventus', x: 272, y: 198, s: 1.4, flip: true, face: false }
                ] },

    a3_ambulant: { bg: 'city', items: [
                  { t: 'crowdGroup', x: 316, y: G, s: 0.8, n: 4 },
                  heros(120, G, 1, { pose: 'walk', shield: false }),
                  { t: 'ventus', x: 118, y: 200, s: 1.3, face: false }
                ] },

    a3_collis:  { bg: 'city', items: [
                  { t: 'cityWall', x: 236, y: G, s: 1 },
                  heros(70, G, 1, { pose: 'point', shield: false })
                ] },

    a3_memoria: { bg: 'forest', items: [
                  venus(148, G, 1.15),
                  { t: 'columba', x: 300, y: 142, s: 0.95, pose: 'fly', flip: true },
                  { t: 'rose',    x: 316, y: G - 4, s: 0.75 }
                ] },

    /* ============ a4 · vocabulary cards ============ */

    v_dido:     { bg: 'interior', items: [
                  { t: 'throne', x: 300, y: G, s: 0.9 },
                  { t: 'person', x: 150, y: G, s: 1.25, role: 'queen' }
                ] },

    v_regina:   { bg: 'interior', items: [
                  { t: 'person',     x: 152, y: G, s: 1.2, role: 'queen', pose: 'point' },
                  { t: 'crowdGroup', x: 300, y: G, s: 0.8, n: 4 }
                ] },

    v_moenia:   { bg: 'plain', items: [
                  { t: 'cityWall', x: 200, y: G, s: 1.35 }
                ] },

    v_templum:  { bg: 'plain', items: [
                  { t: 'temple', x: 200, y: G, s: 1.4 }
                ] },

    v_solium:   { bg: 'interior', items: [
                  { t: 'throne', x: 200, y: G, s: 1.55 }
                ] },

    v_convivium: { bg: 'interior', items: [
                  { t: 'mensa',   x: 186, y: G, s: 1.3 },
                  { t: 'patina',  x: 186, y: G - 38, s: 0.95 },
                  { t: 'amphora', x: 326, y: G, s: 0.85 }
                ] },

    v_vinum:    { bg: 'interior', items: [
                  { t: 'amphora', x: 200, y: G, s: 1.6 }
                ] },

    v_hospes:   { bg: 'interior', items: [
                  { t: 'person', x: 132, y: G, s: 1.15, role: 'queen', pose: 'point' },
                  heros(276, G, 1.1, { flip: true, shield: false })
                ],
                bubbles: [{ x: 204, y: 62, w: 52, h: 40, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    v_aedificat: { bg: 'city', items: [
                  { t: 'cityWall', x: 268, y: G, s: 1 },
                  { t: 'person',   x: 106, y: G, s: 1.1, role: 'crowd', pose: 'point' }
                ],
                bubbles: [{ x: 186, y: 78, w: 50, h: 38, text: '🔨', kind: 'thought', tail: 'right', fs: 19 }] },

    v_accipit:  { bg: 'interior', items: [
                  { t: 'throne', x: 310, y: G, s: 0.8 },
                  { t: 'person', x: 172, y: G, s: 1.2, role: 'queen', pose: 'point' }
                ],
                bubbles: [{ x: 74, y: 84, w: 50, h: 38, text: '🤲', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ a4 · story ============ */

    a4_urbs:    { bg: 'city', items: [
                  { t: 'cityWall', x: 250, y: G, s: 1.05 },
                  heros(74, G, 1, { pose: 'point', shield: false })
                ] },

    a4_aedificant: { bg: 'city', items: [
                  { t: 'cityWall',   x: 274, y: G, s: 1 },
                  { t: 'crowdGroup', x: 108, y: G, s: 0.95, n: 5, pose: 'point' }
                ] },

    a4_fortunati: { bg: 'city', items: [
                  { t: 'cityWall', x: 262, y: G, s: 1 },
                  heros(82, G, 1.05, { pose: 'arms-up', shield: false })
                ],
                bubbles: [{ x: 176, y: 62, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a4_templum: { bg: 'city', items: [
                  { t: 'temple', x: 208, y: G, s: 1.2 }
                ] },

    a4_picturae: { bg: 'interior', items: [
                  { t: 'columna', x: 336, y: G, s: 1 },
                  heros(168, G, 1.15, { shield: false })
                ],
                bubbles: [{ x: 66, y: 86, w: 54, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 20 }] },

    a4_dido:    { bg: 'interior', items: [
                  { t: 'person',     x: 140, y: G, s: 1.2, role: 'queen', pose: 'walk' },
                  { t: 'crowdGroup', x: 296, y: G, s: 0.8, n: 4 }
                ] },

    a4_solium:  { bg: 'interior', items: [
                  { t: 'throne',     x: 158, y: G, s: 1 },
                  { t: 'person',     x: 158, y: G, s: 1.05, role: 'queen', pose: 'sit' },
                  { t: 'crowdGroup', x: 312, y: G, s: 0.75, n: 3 }
                ] },

    a4_socii:   { bg: 'interior', items: [
                  { t: 'throne',     x: 318, y: G, s: 0.8 },
                  { t: 'person',     x: 300, y: G, s: 1.05, role: 'queen', flip: true },
                  { t: 'crowdGroup', x: 128, y: G, s: 0.95, n: 5 }
                ] },

    a4_accipit: { bg: 'interior', items: [
                  { t: 'person',     x: 148, y: G, s: 1.15, role: 'queen', pose: 'point' },
                  { t: 'crowdGroup', x: 300, y: G, s: 0.85, n: 4 }
                ],
                bubbles: [{ x: 232, y: 60, w: 54, h: 40, text: '🤲', kind: 'speech', tail: 'left', fs: 19 }] },

    a4_apparet: { bg: 'interior', items: [
                  heros(198, G, 1.2),
                  { t: 'ventus', x: 104, y: 196, s: 1.1, face: false }
                ] },

    a4_obstupescit: { bg: 'interior', items: [
                  { t: 'person', x: 132, y: G, s: 1.15, role: 'queen' },
                  heros(280, G, 1.1, { flip: true })
                ],
                bubbles: [{ x: 206, y: 58, w: 54, h: 42, text: '❓', kind: 'speech', tail: 'left', fs: 22 }] },

    a4_convivium: { bg: 'interior', items: [
                  { t: 'mensa',      x: 168, y: G, s: 1.25 },
                  { t: 'patina',     x: 168, y: G - 36, s: 0.9 },
                  { t: 'crowdGroup', x: 320, y: G, s: 0.7, n: 3 }
                ] },

    a4_vinum:   { bg: 'interior', items: [
                  { t: 'mensa',   x: 150, y: G, s: 1.15 },
                  { t: 'amphora', x: 300, y: G, s: 1 }
                ] },

    a4_rogat:   { bg: 'interior', items: [
                  { t: 'person', x: 130, y: G, s: 1.15, role: 'queen', pose: 'point' },
                  heros(282, G, 1.1, { flip: true, shield: false })
                ],
                bubbles: [{ x: 206, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a4_incipit: { bg: 'interior', items: [
                  heros(140, G, 1.2, { pose: 'point', shield: false }),
                  { t: 'crowdGroup', x: 300, y: G, s: 0.8, n: 4 }
                ] },

    /* VERBA VERGILIĪ — the frame changes for the poet's own voice */
    a4_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 90,  y: G, s: 0.95 },
                  { t: 'person',  x: 232, y: G, s: 1.2, role: 'priest', pose: 'point' }
                ] },

    /* versus I — arma virumque: the shield and the man, nothing else */
    a4_versus1: { bg: 'troy', items: [
                  { t: 'swordShield', x: 300, y: G, s: 1 },
                  heros(134, G, 1.25)
                ] },

    /* versus II — fātō profugus: the ships already at sea, going west */
    a4_versus2: { bg: 'sea', items: [
                  { t: 'ship', x: 150, y: 198, s: 1.05 },
                  { t: 'ship', x: 300, y: 214, s: 0.8 }
                ] },

    /* versus III — lītora … terrīs et altō: the shore the whole poem is
       aimed at, the LAND on both sides of it, and one wave for the
       "iactātus" the line remembers (a1's own picture, at half scale) */
    a4_versus3: { bg: 'sea', items: [
                  { t: 'palmTree',   x: 322, y: G, s: 0.85 },
                  { t: 'mountain',   x: 96,  y: G, s: 0.8 },
                  { t: 'murusAquae', x: 288, y: 236, s: 0.5, fish: false, flip: true },
                  { t: 'ship',       x: 200, y: 204, s: 0.85, sail: 'furled' }
                ] },

    a4_paraphrasis: { bg: 'sea', items: [
                  { t: 'mountain', x: 320, y: G, s: 0.85 },
                  { t: 'ship',     x: 168, y: 200, s: 1 },
                  heros(164, 178, 0.55, { shield: false })
                ] },

    a4_memoria: { bg: 'plain', items: [
                  { t: 'columna',     x: 320, y: G, s: 0.9 },
                  { t: 'swordShield', x: 76,  y: G, s: 0.85 },
                  heros(200, G, 1.2)
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ a1 — TEMPESTĀS ============
       fons Aen. 1,1–156. The liber opens where the poem opens: in
       medias res, on the water. Four of this capitulum's ten cards are
       the poem's own furniture (nāvis, mare, unda, ventus) and the
       three poetic synonyms the payoff will need — ratis = nāvis,
       aequor = mare, fātum — are glossed here, four capitula before
       Vergil's own lines use them.
       B RATING: Iūnō's command at 1,69 ("submersās obrue puppēs") is
       rewritten as a purpose clause — she still wants the Trojans kept
       from Italy, and no ship is sunk on the page. Nobody is ever shown
       in the water. Aen. 1,113–123 (the ship of Orontes) is OMITTED
       entirely; a2 records the loss in one sentence instead.
       OMITTED for the lexeme cap: 1,34–49 (Iūnō's soliloquy and the
       Pallas/Aiax exemplum), 1,50–63 (the cave of the winds described),
       1,124–156 (the simile of the statesman). */
    {
      id: 'a1',
      titulus: 'Tempestās',
      icon: '🌊💨',
      numerus: 'I',
      pos: { x: 0.24, y: 0.88 },
      fons: 'Aen. 1,1–156',
      vocab: [
        { la: 'Aenēās',    scene: SC.v_aeneas,    pars: 'nomen' },
        { la: 'nāvis',     scene: SC.v_navis,     pars: 'nomen' },
        { la: 'mare',      scene: SC.v_mare,      pars: 'nomen' },
        { la: 'unda',      scene: SC.v_unda,      pars: 'nomen' },
        { la: 'ventus',    scene: SC.v_ventus,    pars: 'nomen' },
        { la: 'tempestās', scene: SC.v_tempestas, pars: 'nomen' },
        { la: 'Iūnō',      scene: SC.v_iuno,      pars: 'nomen' },
        { la: 'Neptūnus',  scene: SC.v_neptunus,  pars: 'nomen' },
        { la: 'iactat',    scene: SC.v_iactat,    pars: 'verbum' },
        { la: 'sēdat',     scene: SC.v_sedat,     pars: 'verbum' }
      ],
      story: [
        /* Aen. 1,1–7 in prose: the whole argument in two sentences */
        { la: 'Trōia capta est. Trōiānī, quōrum urbs iam nōn est, ex patriā fugiunt.',
          scene: SC.a1_troia,
          nova: [{ w: 'Trōia', e: '🔥', g: 'urbs antīqua in Asiā' },
                 { w: 'Trōiānī', e: '👥', g: '= hominēs Trōiae' }] },

        { la: 'Aenēās eōs dūcit. Multae nāvēs per mare longum nāvigant, quia fāta Trōiānōs in Ītaliam vocant.',
          scene: SC.a1_fuga,
          nova: [{ w: 'Aenēās', e: '👤', g: 'vir Trōiānus, dux' },
                 { w: 'nāvis', e: '🚢', g: 'ratis quoque dīcitur: ratis = nāvis' },
                 { w: 'mare', e: '🌊', g: 'aequor quoque dīcitur: aequor = mare' },
                 { w: 'fātum', e: '📍', g: 'id quod deī fierī iubent' },
                 { w: 'Ītalia', e: '⛰', g: 'terra ad occidentem, ubi posteā Rōma erit' }] },

        /* Aen. 1,12–33 in one sentence: the anger, not the catalogue */
        { la: 'Sed Iūnō, rēgīna deōrum, Trōiānīs īrāta est.',
          scene: SC.a1_iuno,
          nova: [{ w: 'Iūnō', e: '👤', g: 'dea magna; avis eius pāvō est' },
                 { w: 'īrātus', e: '😠', g: '↔ placidus' }] },

        { la: 'Iūnō enim Trōiānōs Ītaliam petere nōn vult, quod urbem suam Carthāginem amat.',
          scene: SC.a1_iunovidet },

        /* Aen. 1,50–64 */
        { la: 'Itaque Iūnō ad Aeolum venit, quī ventōs regit.',
          scene: SC.a1_aeolus,
          nova: [{ w: 'Aeolus', e: '👤', g: 'rēx ventōrum' },
                 { w: 'ventus', e: '💨', g: 'aer quī movētur' }] },

        { la: 'Aeolus in monte altō habitat; ibi ventī clausī sunt et fremunt.',
          scene: SC.a1_ventos },

        /* Aen. 1,65–75, B-RATED: "submersās obrue puppēs" → a purpose
           clause. Her will is intact; the drowning is not on the page. */
        { la: 'Iūnō Aeolō imperat: "Ventōs ēmitte, nē Trōiānae nāvēs Ītaliam petant!"',
          scene: SC.a1_iubet },

        /* Aen. 1,81–91 — ablātīvus absolūtus, and the storm's name */
        { la: 'Aeolus pāret. Ventīs ēmissīs, tempestās ingēns in marī surgit.',
          scene: SC.a1_emittit,
          nova: [{ w: 'tempestās', e: '🌧', g: 'ventus et unda et pluvia simul' },
                 { w: 'ventīs ēmissīs', e: '➡💨', g: 'postquam ventī ēmissī sunt' }] },

        { la: 'Undae altae surgunt; tempestās nāvēs Trōiānās hūc illūc iactat.',
          scene: SC.a1_tempestas,
          nova: [{ w: 'unda', e: '🌊', g: 'mare nōn placidum est: undae surgunt' },
                 { w: 'iactat', e: '⬆⬇', g: 'sūrsum et deorsum movet' }] },

        { la: 'Nāvēs inter undās iactantur, sed nūlla mergitur.',
          scene: SC.a1_iactantur },

        /* Aen. 1,92–101 — the hero's gesture, and nothing worse */
        { la: 'Aenēās manūs ad caelum tollit et deōs vocat.',
          scene: SC.a1_orat },

        /* Aen. 1,124–129 */
        { la: 'Tum Neptūnus, maris deus, undās altās et nāvēs iactātās videt.',
          scene: SC.a1_neptunus,
          nova: [{ w: 'Neptūnus', e: '👤', g: 'deus maris' }] },

        /* Aen. 1,132–135 — the aposiopesis, kept as a FIXED FORMULA and
           glossed as what it is: a sentence the god does not finish. */
        { la: 'Neptūnus ventīs īrātus clāmat: "Quōs ego—!"',
          scene: SC.a1_quosego,
          nova: [{ w: 'Quōs ego—', e: '❗', g: 'verba Vergiliī ipsīus. Deus tam īrātus est ut sententiam nōn perficiat; ventī tamen intellegunt' }] },

        /* Aen. 1,142–147 */
        { la: 'Ventī statim fugiunt. Deus undās sēdat et mare placidum facit.',
          scene: SC.a1_fugiunt,
          nova: [{ w: 'sēdat', e: '🤲', g: '= placidum facit; ↔ iactat' }] },

        { la: 'Undīs sēdātīs, sōl lūcet et nāvēs Trōiānae salvae sunt.',
          scene: SC.a1_placidum },

        { la: 'Memoriā tenē: Neptūnus tempestātem sēdat, et Aenēās cum nāvibus ad terram novam venit.',
          scene: SC.a1_memoria,
          ttsText: 'Neptunus tempestatem sedat, et Aeneas cum navibus ad terram novam venit.',
          nova: [{ w: 'Memoriā tenē', e: '🧠', g: 'hoc nōn oblīvīscere!' }] }
      ],
      ludus: {
        words: [
          { la: 'nāvis',     scene: SC.v_navis,     emoji: '🚢' },
          { la: 'unda',      scene: SC.v_unda,      emoji: '🌊' },
          { la: 'ventus',    scene: SC.v_ventus,    emoji: '💨' },
          { la: 'Aenēās',    scene: SC.v_aeneas,    emoji: '👤' },
          { la: 'Iūnō',      scene: SC.v_iuno,      emoji: '👤' },
          { la: 'tempestās', scene: SC.v_tempestas, emoji: '🌧' }
        ]
      },
      /* SONUS, hand-authored (SHARED-PICTURE RULE). Six of this
         capitulum's ten cards stand on blue water — mare, unda, nāvis,
         tempestās, iactat, sēdat — so no two of them are ever offered
         together: by ear the learner would be choosing between two
         seascapes. Each set below mixes exactly ONE sea card with
         figures and a wind, which cannot be confused with anything. */
      sonus: [
        { la: 'nāvis',
          answer: { la: 'nāvis', scene: SC.v_navis },
          options: [{ la: 'nāvis', scene: SC.v_navis },
                    { la: 'ventus', scene: SC.v_ventus },
                    { la: 'Iūnō', scene: SC.v_iuno }] },
        { la: 'ventus',
          answer: { la: 'ventus', scene: SC.v_ventus },
          options: [{ la: 'ventus', scene: SC.v_ventus },
                    { la: 'Aenēās', scene: SC.v_aeneas },
                    { la: 'nāvis', scene: SC.v_navis },
                    { la: 'Iūnō', scene: SC.v_iuno }] },
        { la: 'Iūnō',
          answer: { la: 'Iūnō', scene: SC.v_iuno },
          options: [{ la: 'Iūnō', scene: SC.v_iuno },
                    { la: 'Neptūnus', scene: SC.v_neptunus },
                    { la: 'Aenēās', scene: SC.v_aeneas }] },
        { la: 'unda',
          answer: { la: 'unda', scene: SC.v_unda },
          options: [{ la: 'unda', scene: SC.v_unda },
                    { la: 'ventus', scene: SC.v_ventus },
                    { la: 'Aenēās', scene: SC.v_aeneas },
                    { la: 'Iūnō', scene: SC.v_iuno }] },
        { la: 'Neptūnus',
          answer: { la: 'Neptūnus', scene: SC.v_neptunus },
          options: [{ la: 'Neptūnus', scene: SC.v_neptunus },
                    { la: 'Iūnō', scene: SC.v_iuno },
                    { la: 'ventus', scene: SC.v_ventus }] }
      ],
      overrides: {
        aenigmata: {
          /* mare is the ONE sea card on the grid; unda, tempestās,
             iactat and sēdat stay off it for the same reason they stay
             out of each other's SONUS sets. */
          pairs: [
            { la: 'Aenēās',    scene: SC.v_aeneas },
            { la: 'nāvis',     scene: SC.v_navis },
            { la: 'ventus',    scene: SC.v_ventus },
            { la: 'Iūnō',      scene: SC.v_iuno },
            { la: 'Neptūnus',  scene: SC.v_neptunus },
            { la: 'tempestās', scene: SC.v_tempestas }
          ],
          scrambles: [
            { la: 'Aenēās Trōiānōs per mare dūcit.',   scene: SC.a1_fuga },
            { la: 'Iūnō Trōiānīs īrāta est.',          scene: SC.a1_iuno },
            { la: 'Tempestās nāvēs Trōiānās iactat.',  scene: SC.a1_tempestas },
            { la: 'Neptūnus undās altās sēdat.',       scene: SC.a1_fugiunt }
          ]
        },
        /* CORRIGE, hand-authored to test SYNTAX, not only words: two of
           the five put the intruder inside an accūsātīvus cum īnfīnītīvō
           or an ablātīvus absolūtus, where the case ending is the only
           thing that can be read to find it. */
        corrige: [
          { words: ['Iūnō', 'Trōiānōs', 'Ītaliam', 'petit', 'nōn', 'vult.'], wrong: 3,
            options: ['petere', 'petunt', 'petet'], correct: 0, scene: SC.a1_iunovidet },
          { words: ['Ventīs', 'ēmissae,', 'tempestās', 'surgit.'], wrong: 1,
            options: ['ēmissīs,', 'ēmissōs,', 'ēmittere,'], correct: 0, scene: SC.a1_emittit },
          { words: ['Tempestās', 'nāvēs', 'Trōiānās', 'sēdat.'], wrong: 3,
            options: ['iactat.', 'nāvigat.', 'regit.'], correct: 0, scene: SC.a1_tempestas },
          { words: ['Aeolus', 'undās', 'regit.'], wrong: 1,
            options: ['ventōs', 'nāvēs', 'deōs'], correct: 0, scene: SC.a1_aeolus },
          { words: ['Neptūnus', 'tempestātem', 'iactat.'], wrong: 2,
            options: ['sēdat.', 'petit.', 'fugit.'], correct: 0, scene: SC.a1_fugiunt }
        ],
        /* COMPLĒ: three morphology gaps that are pure syntax — the
           infinitive of an acc.+inf., the ablative of an abl. abs., and
           the accusative object of a purpose clause. */
        comple: [
          { text: 'Iūnō Trōiānōs Ītaliam pet___ nōn vult.',
            options: ['ere', 'unt', 'it'], correct: 0, scene: SC.a1_iunovidet },
          { text: 'Vent___ ēmissīs, tempestās surgit.',
            options: ['īs', 'ōs', 'us'], correct: 0, scene: SC.a1_emittit },
          { text: 'Undīs sēdāt___, mare placidum est.',
            options: ['īs', 'ōs', 'ae'], correct: 0, scene: SC.a1_placidum },
          { text: 'Tempestās ___ Trōiānās iactat.',
            options: ['nāvēs', 'nāvis', 'nāvibus'], correct: 0, scene: SC.a1_tempestas },
          { text: 'Neptūnus undās ___.',
            options: ['sēdat', 'iactat', 'petit'], correct: 0, scene: SC.a1_fugiunt },
          { text: 'Aeolus ___ regit.',
            options: ['ventōs', 'ventīs', 'ventus'], correct: 0, scene: SC.a1_aeolus }
        ]
      }
    },

    /* ============ a2 — AD ĀFRICAE ŌRAM ============
       fons Aen. 1,157–222. The capitulum of `ōra` — the word Vergil's
       first line needs ("Trōiae quī prīmus ab ōrīs") — and of the
       liber's first authentic hexameter, Aen. 1,203, quoted whole.
       B RATING: the poem's loss (one ship, Orontes and his men) is told
       in ONE sentence with an empty sea behind it and no death shown or
       described; the funeral grief of 1,217–222 is kept as `trīstis`.
       OMITTED for the lexeme cap: the harbour's topography (1,159–169),
       the details of the hunt and the wine of Acestes (1,180–197). */
    {
      id: 'a2',
      titulus: 'Ad Āfricae Ōram',
      icon: '🚢🦌',
      numerus: 'II',
      pos: { x: 0.70, y: 0.71 },
      fons: 'Aen. 1,157–222',
      vocab: [
        { la: 'ōra',      scene: SC.v_ora,      pars: 'nomen' },
        { la: 'socius',   scene: SC.v_socius,   pars: 'nomen' },
        { la: 'dux',      scene: SC.v_dux,      pars: 'nomen' },
        { la: 'cervus',   scene: SC.v_cervus,   pars: 'nomen' },
        { la: 'cibus',    scene: SC.v_cibus,    pars: 'nomen' },
        { la: 'spēs',     scene: SC.v_spes,     pars: 'nomen' },
        { la: 'fessus',   scene: SC.v_fessus,   pars: 'adiectivum' },
        { la: 'hortātur', scene: SC.v_hortatur, pars: 'verbum' },
        { la: 'iuvat',    scene: SC.v_iuvat,    pars: 'verbum' },
        { la: 'servat',   scene: SC.v_servat,   pars: 'verbum' }
      ],
      story: [
        /* Aen. 1,157–159 */
        { la: 'Post tempestātem septem nāvēs ad ōram ignōtam veniunt.',
          scene: SC.a2_ora,
          nova: [{ w: 'ōra', e: '📍', g: 'ubi terra mare tangit; lītus quoque dīcitur' }] },

        { la: 'Haec ōra Āfricae est. Trōiānī ē nāvibus in ōram exeunt.',
          scene: SC.a2_exeunt,
          nova: [{ w: 'Āfrica', e: '⛰', g: 'terra ad merīdiem trāns mare' }] },

        /* Aen. 1,170–179 */
        { la: 'Sociī fessī sunt: diū enim inter undās iactātī sunt.',
          scene: SC.a2_fessi,
          nova: [{ w: 'socius', e: '👥', g: 'quī cum duce it et labōrat' },
                 { w: 'fessus', e: '😖', g: 'quī diū labōrāvit et iam nōn valet' }] },

        /* Aen. 1,180–181 */
        { la: 'Aenēās, quī Trōiānōrum dux est, in montem ascendit.',
          scene: SC.a2_ascendit,
          nova: [{ w: 'dux', e: '👤', g: 'quī aliōs dūcit' }] },

        { la: 'Dē monte ōram longam spectat, sed nūllam nāvem in marī videt.',
          scene: SC.a2_spectat },

        /* Aen. 1,184–193 — the hunt, without the bow and the arrows */
        { la: 'Tum in silvā cervōs videt: septem cervī inter arborēs errant.',
          scene: SC.a2_cervi,
          nova: [{ w: 'cervus', e: '🦌', g: 'animal silvae, cui cornua sunt' }] },

        { la: 'Dux cervōs capit et ad sociōs portat.',
          scene: SC.a2_portat },

        /* Aen. 1,194–197 */
        { la: 'Cervī cibus sunt. Aenēās omnibus sociīs cibum dat, et cibus fessōs virōs iuvat.',
          scene: SC.a2_cibus,
          nova: [{ w: 'cibus', e: '🥚', g: 'quod hominēs edunt' },
                 { w: 'iuvat', e: '🤝', g: '= auxilium dat; cibus fessum virum iuvat' }] },

        /* Aen. 1,217–222, B-RATED: one sentence, an empty sea, no death
           shown. Neptūnus servāvit the rest — the loss is real and told. */
        { la: 'Tamen Aenēās trīstis est: ūna enim nāvis in tempestāte āmissa est, quamquam Neptūnus cēterās servāvit.',
          scene: SC.a2_tristis,
          nova: [{ w: 'servat', e: '🛡', g: 'servāre = ā perīculō tenēre' }] },

        /* Aen. 1,197–207 */
        { la: 'Sed dux sociōs hortātur, quamquam ipse dolet.',
          scene: SC.a2_hortatur,
          nova: [{ w: 'hortātur', e: '💬', g: 'verbīs animum alterī dat' }] },

        { la: 'Aenēās dīcit: "Ō sociī, deus etiam hīs malīs fīnem dabit. Vōs graviōra passī estis. Timōrem mittite!"',
          scene: SC.a2_dicit,
          nova: [{ w: 'timor', e: '😖', g: '↔ spēs; timōrem mittere = timēre dēsinere' }] },

        /* ---- VERBA VERGILIĪ (I) — Aen. 1,203, quoted whole ---- */
        { la: 'Haec Aenēās apud Vergilium ipsum dīcit. Audī versum Vergiliī:',
          scene: SC.a2_vergilius,
          nova: [{ w: 'versus', e: '🧠', g: 'ūna līnea carminis' }] },

        { la: 'mittite; forsan et haec ōlim meminisse iuvābit.',
          scene: SC.a2_versus,
          ttsText: 'mittite; forsan et haec olim meminisse iuvabit.',
          nova: [{ w: 'mittite', e: '🤲', g: 'timōrem mittite = timōrem dēpōnite' },
                 { w: 'forsan', e: '❓', g: '= fortasse' },
                 { w: 'haec', e: '📍', g: '= haec mala, hae rēs asperae' },
                 { w: 'ōlim', e: '⏱', g: '= post multōs annōs' },
                 { w: 'meminisse', e: '🧠', g: '= memoriā tenēre' },
                 { w: 'iuvābit', e: '🤝', g: 'iuvat → iuvābit: posteā iuvābit' }] },

        { la: 'Id est: timōrem dēpōnite! Fortasse post multōs annōs etiam haec memoriā tenēre nōs iuvābit.',
          scene: SC.a2_versus },

        /* Aen. 1,208–209 */
        { la: 'Sīc dux sociōs hortātur, et sociī iam spem habent.',
          scene: SC.a2_spes,
          nova: [{ w: 'spēs', e: '☀', g: 'spēs est cum animus bona exspectat; ↔ timor' }] },

        { la: 'Spēs fessōs virōs iuvat: spēs enim animōs firmat.',
          scene: SC.a2_spes },

        /* Aen. 1,223–229 — Venus, in one sentence, as the bridge to a3 */
        { la: 'Interim Venus, māter Aenēae, fīlium suum servat: dea enim eum semper servāre vult.',
          scene: SC.a2_venus,
          nova: [{ w: 'Venus', e: '👤', g: 'dea; māter Aenēae. Avis eius columba est' }] },

        { la: 'Memoriā tenē: dux sociōs hortātur — "forsan et haec ōlim meminisse iuvābit."',
          scene: SC.a2_memoria,
          ttsText: 'Dux socios hortatur: forsan et haec olim meminisse iuvabit.' }
      ],
      ludus: {
        words: [
          { la: 'ōra',    scene: SC.v_ora,    emoji: '📍' },
          { la: 'socius', scene: SC.v_socius, emoji: '👥' },
          { la: 'cervus', scene: SC.v_cervus, emoji: '🦌' },
          { la: 'cibus',  scene: SC.v_cibus,  emoji: '🥚' },
          { la: 'spēs',   scene: SC.v_spes,   emoji: '☀' },
          { la: 'nāvis',  scene: SC.v_navis,  emoji: '🚢' }
        ]
      },
      /* SONUS: `dux` and `hortātur` are both Aenēās in front of the same
         crowd, and `spēs` is that crowd with its arms up — so at most
         ONE of the three appears in any set. `socius` is never offered
         against `dux` for the same reason. */
      sonus: [
        { la: 'cervus',
          answer: { la: 'cervus', scene: SC.v_cervus },
          options: [{ la: 'cervus', scene: SC.v_cervus },
                    { la: 'nāvis', scene: SC.v_navis },
                    { la: 'cibus', scene: SC.v_cibus }] },
        { la: 'cibus',
          answer: { la: 'cibus', scene: SC.v_cibus },
          options: [{ la: 'cibus', scene: SC.v_cibus },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'ōra', scene: SC.v_ora },
                    { la: 'ventus', scene: SC.v_ventus }] },
        { la: 'socius',
          answer: { la: 'socius', scene: SC.v_socius },
          options: [{ la: 'socius', scene: SC.v_socius },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'nāvis', scene: SC.v_navis }] },
        { la: 'ōra',
          answer: { la: 'ōra', scene: SC.v_ora },
          options: [{ la: 'ōra', scene: SC.v_ora },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'cibus', scene: SC.v_cibus },
                    { la: 'Iūnō', scene: SC.v_iuno }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'ōra',    scene: SC.v_ora },
            { la: 'socius', scene: SC.v_socius },
            { la: 'cervus', scene: SC.v_cervus },
            { la: 'cibus',  scene: SC.v_cibus },
            { la: 'spēs',   scene: SC.v_spes },
            { la: 'fessus', scene: SC.v_fessus }
          ],
          scrambles: [
            { la: 'Septem nāvēs ad ōram veniunt.',  scene: SC.a2_ora },
            { la: 'Sociī fessī sunt.',              scene: SC.a2_fessi },
            { la: 'Dux cervōs ad sociōs portat.',   scene: SC.a2_portat },
            { la: 'Cibus fessōs virōs iuvat.',      scene: SC.a2_cibus }
          ]
        },
        corrige: [
          { words: ['Sociī', 'fessae', 'sunt.'], wrong: 1,
            options: ['fessī', 'fessum', 'fessās'], correct: 0, scene: SC.a2_fessi },
          { words: ['Aenēās,', 'quī', 'Trōiānōrum', 'dux', 'esse,', 'in', 'montem', 'ascendit.'], wrong: 4,
            options: ['est,', 'sunt,', 'erunt,'], correct: 0, scene: SC.a2_ascendit },
          { words: ['Dux', 'cervōs', 'ad', 'sociī', 'portat.'], wrong: 3,
            options: ['sociōs', 'sociīs', 'socius'], correct: 0, scene: SC.a2_portat },
          { words: ['Cibus', 'fessōs', 'virōs', 'iactat.'], wrong: 3,
            options: ['iuvat.', 'servat.', 'hortātur.'], correct: 0, scene: SC.a2_cibus },
          { words: ['Neptūnus', 'cēterās', 'nāvēs', 'hortātur.'], wrong: 3,
            options: ['servāvit.', 'iuvāvit.', 'petīvit.'], correct: 0, scene: SC.a2_tristis }
        ],
        comple: [
          { text: 'Septem nāvēs ad ___ ignōtam veniunt.',
            options: ['ōram', 'ōra', 'ōrā'], correct: 0, scene: SC.a2_ora },
          { text: 'Sociī fess___ sunt.',
            options: ['ī', 'us', 'ās'], correct: 0, scene: SC.a2_fessi },
          { text: 'Aenēās Trōiānōrum ___ est.',
            options: ['dux', 'ducem', 'ducis'], correct: 0, scene: SC.a2_ascendit },
          { text: 'In silvā ___ septem errant.',
            options: ['cervī', 'cervum', 'cervō'], correct: 0, scene: SC.a2_cervi },
          { text: 'Cibus fessōs virōs ___.',
            options: ['iuvat', 'iactat', 'servat'], correct: 0, scene: SC.a2_cibus },
          { text: 'Dux sociōs ___.',
            options: ['hortātur', 'hortantur', 'hortārī'], correct: 0, scene: SC.a2_hortatur }
        ]
      }
    },

    /* ============ a3 — VENUS MĀTER ============
       fons Aen. 1,305–417. The capitulum that teaches the cloud, so
       that a4 can lift it — and that teaches `māter` and `fīlius`, on
       which the whole track's pietās turns.
       ADAPTED: Vergil's Venus is dressed as a Spartan huntress with a
       bow (1,314–320). There is no BOW in the art library, so she is
       staged as a plain `virgō` in a green tunic, and the text never
       names a weapon it cannot show (LATIN-STYLE §5). Registered.
       MISSING ART, reported: there is no faceless cloud / fog / nebula
       prop. The only cloud in the library is the `ventus` actor, whose
       eyes, mouth and gust-lines are hard-coded, so `nūbēs` CANNOT have
       a vocabulary card of its own — it would be pixel-for-pixel a1's
       `ventus` card, and the trial's falling word-tiles would become a
       coin-flip. `nūbēs` is therefore taught as a glossed context word
       only, and the mist of 1,411–414 is composed from two `ventus`
       clouds WITH the two men drawn under them, which no wind card can
       be confused with. The tenth card is `columba`, Venus' own bird.
       OMITTED for the lexeme cap: Venus' complaint to Iuppiter and his
       prophecy (1,223–304 — the promise of Rome; it returns at L6),
       and Dīdō's own history at Tyre (1,335–368). */
    {
      id: 'a3',
      titulus: 'Venus Māter',
      icon: '🌳👤',
      numerus: 'III',
      pos: { x: 0.27, y: 0.54 },
      fons: 'Aen. 1,305–417',
      vocab: [
        { la: 'Venus',     scene: SC.v_venus,     pars: 'nomen' },
        { la: 'māter',     scene: SC.v_mater,     pars: 'nomen' },
        { la: 'fīlius',    scene: SC.v_filius,    pars: 'nomen' },
        { la: 'virgō',     scene: SC.v_virgo,     pars: 'nomen' },
        { la: 'silva',     scene: SC.v_silva,     pars: 'nomen' },
        { la: 'columba',   scene: SC.v_columba,   pars: 'nomen' },
        { la: 'Carthāgō',  scene: SC.v_carthago,  pars: 'nomen' },
        { la: 'cēlat',     scene: SC.v_celat,     pars: 'verbum' },
        { la: 'ostendit',  scene: SC.v_ostendit,  pars: 'verbum' },
        { la: 'agnōscit',  scene: SC.v_agnoscit,  pars: 'verbum' }
      ],
      story: [
        /* Aen. 1,305–309 */
        { la: 'Postrīdiē Aenēās cum ūnō sociō terram ignōtam vidēre vult.',
          scene: SC.a3_explorat },

        { la: 'Ambō in silvam magnam intrant, ut hominēs quaerant.',
          scene: SC.a3_silva,
          nova: [{ w: 'silva', e: '🌳', g: 'locus ubi multae arborēs sunt' }] },

        /* Aen. 1,314–320 — the huntress, without the bow (see header) */
        { la: 'Ecce, in silvā virgō ad eōs venit! Sōla per silvam ambulat neque timet.',
          scene: SC.a3_virgo,
          nova: [{ w: 'virgō', e: '👤', g: 'puella quae nōndum nūpsit' }] },

        /* Aen. 1,321–324 */
        { la: 'Virgō rogat: "Quis estis? Quid in hīs silvīs quaeritis?"',
          scene: SC.a3_rogat },

        /* Aen. 1,372–386 */
        { la: 'Aenēās respondet: "Trōiānī sumus. Tempestās nōs ad hanc ōram tulit."',
          scene: SC.a3_respondet },

        /* Aen. 1,335–368, compressed to the one thing they need to know */
        { la: 'Tum virgō dīcit: "Ecce Carthāgō, urbs nova! Hominēs eam nunc aedificant."',
          scene: SC.a3_carthago,
          nova: [{ w: 'Carthāgō', e: '🗼', g: 'urbs nova in Āfricae ōrā' }] },

        /* Aen. 1,326–327 */
        { la: 'Aenēās virginem rogat: "Ō virgō, quō nōmine tē appellem? Vōx enim tua nōn est hūmāna."',
          scene: SC.a3_quaeris },

        /* Aen. 1,402–405 */
        { la: 'Virgō nihil respondet, sed discēdit.',
          scene: SC.a3_discedit },

        { la: 'Dum discēdit, vēram fōrmam suam ostendit: nōn iam virgō, sed dea est.',
          scene: SC.a3_ostendit,
          nova: [{ w: 'ostendit', e: '👀', g: '↔ cēlat: quod cēlātum erat iam vidērī potest' }] },

        /* Aen. 1,405–409 */
        { la: 'Venus est, māter Aenēae! Dea sē fīliō ostendit, et columba eius suprā volat.',
          scene: SC.a3_venus,
          nova: [{ w: 'māter', e: '👤', g: 'quae fīlium genuit' },
                 { w: 'columba', e: '🐦', g: 'avis alba Veneris; ut pāvō avis Iūnōnis est' }] },

        { la: 'Aenēās mātrem agnōscit et clāmat: "Cūr fīlium tuum totiēs fallis?"',
          scene: SC.a3_agnoscit,
          nova: [{ w: 'agnōscit', e: '👀', g: 'iam scit quis sit' },
                 { w: 'fīlius', e: '👥', g: 'Aenēās fīlius Veneris est' }] },

        /* Aen. 1,411–414 */
        { la: 'Venus, ā fīliō agnita, eī nōn respondet, sed eum nūbe cēlat.',
          scene: SC.a3_celat,
          nova: [{ w: 'nūbēs', e: '☁', g: 'nūbēs in caelō est; per nūbem vidērī nōn potest' },
                 { w: 'cēlat', e: '🙈', g: '= facit ut nōn videātur' }] },

        { la: 'Nūbe cēlātī, Aenēās et socius per campōs ambulant, et nēmō eōs videt; sōla columba mātris suprā volat.',
          scene: SC.a3_ambulant },

        /* Aen. 1,418–420 */
        { la: 'Mox in collem ascendunt, et Carthāginem tōtam sub sē vident: magna est urbs Carthāgō.',
          scene: SC.a3_collis },

        { la: 'Memoriā tenē: Venus sē fīliō ostendit, deinde eum nūbe cēlat; Aenēās mātrem agnōscit, et columba deae suprā volat.',
          scene: SC.a3_memoria,
          ttsText: 'Venus se filio ostendit, deinde eum nube celat; Aeneas matrem agnoscit, et columba deae supra volat.' }
      ],
      ludus: {
        words: [
          { la: 'silva',    scene: SC.v_silva,    emoji: '🌳' },
          { la: 'virgō',    scene: SC.v_virgo,    emoji: '👤' },
          { la: 'columba',  scene: SC.v_columba,  emoji: '🐦' },
          { la: 'Carthāgō', scene: SC.v_carthago, emoji: '🗼' },
          { la: 'cervus',   scene: SC.v_cervus,   emoji: '🦌' },
          { la: 'ōra',      scene: SC.v_ora,      emoji: '📍' }
        ]
      },
      /* SONUS: `Venus`, `māter`, `ostendit` and `agnōscit` are all the
         same veiled woman in the same wood, and `virgō` is a woman in
         that wood too — so only ONE of those five is ever in a set.
         `silva` and `virgō` both stand among trees, so they are never
         offered against each other either; `columba` (a white bird on
         the plain ground) and `Carthāgō` (wall + temple) are this
         capitulum's two unmistakable cards and carry the sets. */
      sonus: [
        { la: 'silva',
          answer: { la: 'silva', scene: SC.v_silva },
          options: [{ la: 'silva', scene: SC.v_silva },
                    { la: 'Carthāgō', scene: SC.v_carthago },
                    { la: 'columba', scene: SC.v_columba }] },
        { la: 'Carthāgō',
          answer: { la: 'Carthāgō', scene: SC.v_carthago },
          options: [{ la: 'Carthāgō', scene: SC.v_carthago },
                    { la: 'silva', scene: SC.v_silva },
                    { la: 'Venus', scene: SC.v_venus },
                    { la: 'columba', scene: SC.v_columba }] },
        { la: 'columba',
          answer: { la: 'columba', scene: SC.v_columba },
          options: [{ la: 'columba', scene: SC.v_columba },
                    { la: 'silva', scene: SC.v_silva },
                    { la: 'Carthāgō', scene: SC.v_carthago }] },
        { la: 'virgō',
          answer: { la: 'virgō', scene: SC.v_virgo },
          options: [{ la: 'virgō', scene: SC.v_virgo },
                    { la: 'Carthāgō', scene: SC.v_carthago },
                    { la: 'columba', scene: SC.v_columba },
                    { la: 'cervus', scene: SC.v_cervus }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'silva',    scene: SC.v_silva },
            { la: 'virgō',    scene: SC.v_virgo },
            { la: 'Venus',    scene: SC.v_venus },
            { la: 'columba',  scene: SC.v_columba },
            { la: 'Carthāgō', scene: SC.v_carthago },
            { la: 'fīlius',   scene: SC.v_filius }
          ],
          scrambles: [
            { la: 'Aenēās in silvam intrat.',          scene: SC.a3_silva },
            { la: 'Virgō ad eōs venit.',               scene: SC.a3_virgo },
            { la: 'Venus māter Aenēae est.',           scene: SC.a3_venus },
            { la: 'Venus fīlium nūbe cēlat.',          scene: SC.a3_celat }
          ]
        },
        corrige: [
          { words: ['Ambō', 'in', 'silvam', 'intrant,', 'ut', 'hominēs', 'quaerunt.'], wrong: 6,
            options: ['quaerant.', 'quaerere.', 'quaesīvit.'], correct: 0, scene: SC.a3_silva },
          { words: ['Venus', 'māter', 'Aenēam', 'est.'], wrong: 2,
            options: ['Aenēae', 'Aenēān', 'Aenēā'], correct: 0, scene: SC.a3_venus },
          { words: ['Venus', 'fīlium', 'nūbēs', 'cēlat.'], wrong: 2,
            options: ['nūbe', 'nūbem', 'nūbium'], correct: 0, scene: SC.a3_celat },
          { words: ['Nūbe', 'cēlātī,', 'Aenēās', 'et', 'socius', 'videntur.'], wrong: 5,
            options: ['ambulant.', 'cēlantur.', 'ostenduntur.'], correct: 0, scene: SC.a3_ambulant },
          { words: ['Aenēās', 'mātrem', 'cēlat.'], wrong: 2,
            options: ['agnōscit.', 'aedificat.', 'iactat.'], correct: 0, scene: SC.a3_agnoscit }
        ],
        comple: [
          { text: 'Ambō in silvam intrant, ut hominēs quaer___.',
            options: ['ant', 'unt', 'ere'], correct: 0, scene: SC.a3_silva },
          { text: 'In silvā ___ ad eōs venit.',
            options: ['virgō', 'virginem', 'virginis'], correct: 0, scene: SC.a3_virgo },
          { text: 'Venus ___ Aenēae est.',
            options: ['māter', 'mātrem', 'mātrī'], correct: 0, scene: SC.a3_venus },
          { text: 'Venus fīlium nūb___ cēlat.',
            options: ['e', 'ēs', 'ium'], correct: 0, scene: SC.a3_celat },
          { text: 'Nūbe cēlāt___, Aenēās per campōs ambulat.',
            options: ['us', 'ī', 'ōs'], correct: 0, scene: SC.a3_ambulant },
          { text: 'Aenēās mātrem ___.',
            options: ['agnōscit', 'aedificat', 'cēlat'], correct: 0, scene: SC.a3_agnoscit }
        ]
      }
    },

    /* ============ a4 — RĒGĪNA DĪDŌ ============
       fons Aen. 1,418–722. The liber's last capitulum, and therefore
       the one that carries VERBA VERGILIĪ IPSĪUS: Aen. 1,1–3, one
       hexameter per page, each with its own scene and its own Latin
       glosses, then a graded-prose paraphrase, then `versūs
       memorābilēs`. THREE WHOLE HEXAMETERS, 1,1–3, not two and a word:
       the third line is quoted entire ("lītora, multum ille et terrīs
       iactātus et altō") because every one of its content words was
       already taught — iactātus is a1's own `iactat` in the perfect
       participle, terra and mare are a1's, and `altum` is the poetic
       noun the liber has been pre-teaching since a1's "undae altae".
       Of the whole proem only six words are new at the point of
       quotation (canō, profugus, Lāvīna, lītora, multum, altō as a
       noun), and each carries its own Latin gloss on its own page.
       ADAPTED: Vergil's temple murals (1,453–493) are shown as the
       `interior` room with Aenēās weeping before a column — there is no
       fresco/pictūra prop, so the text says `pictūrās videt` and the
       picture shows the man and the place, not the paintings.
       OMITTED: Ilioneus' embassy speech in full (1,520–560), Cupid in
       Ascanius' shape (1,657–694 — it belongs to Liber IV's own arc),
       and the poet's "sunt lacrimae rērum" (1,462), which is held back
       so that this liber ends on the proem and nothing competes with it. */
    {
      id: 'a4',
      titulus: 'Rēgīna Dīdō',
      icon: '🗼🤝',
      numerus: 'IV',
      pos: { x: 0.72, y: 0.36 },
      fons: 'Aen. 1,418–722 (+ 1,1–3)',
      vocab: [
        { la: 'Dīdō',      scene: SC.v_dido,      pars: 'nomen' },
        { la: 'rēgīna',    scene: SC.v_regina,    pars: 'nomen' },
        { la: 'moenia',    scene: SC.v_moenia,    pars: 'nomen' },
        { la: 'templum',   scene: SC.v_templum,   pars: 'nomen' },
        { la: 'solium',    scene: SC.v_solium,    pars: 'nomen' },
        { la: 'convīvium', scene: SC.v_convivium, pars: 'nomen' },
        { la: 'vīnum',     scene: SC.v_vinum,     pars: 'nomen' },
        { la: 'hospes',    scene: SC.v_hospes,    pars: 'nomen' },
        { la: 'aedificat', scene: SC.v_aedificat, pars: 'verbum' },
        { la: 'accipit',   scene: SC.v_accipit,   pars: 'verbum' }
      ],
      story: [
        /* Aen. 1,421–429 */
        { la: 'Ē colle Aenēās urbem novam spectat: moenia Carthāginis surgunt.',
          scene: SC.a4_urbs,
          nova: [{ w: 'moenia', e: '🗼', g: 'moenia = mūrī quī urbem cingunt' }] },

        { la: 'Hominēs moenia aedificant: aliī portās, aliī domōs faciunt.',
          scene: SC.a4_aedificant,
          nova: [{ w: 'aedificat', e: '🔨', g: 'domum aut mūrum facit' }] },

        /* Aen. 1,437, paraphrased in graded prose, not quoted — this
           liber's only quotation is the proem */
        { la: 'Aenēās dīcit: "Beātī sunt illī quōrum moenia iam surgunt et quōrum urbs aedificātur!"',
          scene: SC.a4_fortunati },

        /* Aen. 1,441–449 */
        { la: 'In mediā urbe templum ingēns aedificātur, Iūnōnī sacrum.',
          scene: SC.a4_templum,
          nova: [{ w: 'templum', e: '🗼', g: 'domus deī aut deae' }] },

        /* Aen. 1,453–465 — the murals, told without a mural prop: the
           room and the weeping man are shown, and the paintings are
           named only in the gloss, by the style guide's own device
           (LATIN-STYLE §2: "imāgō"). */
        { la: 'In templō Aenēās Trōiam suam in mūrīs videt et lacrimat.',
          scene: SC.a4_picturae,
          nova: [{ w: 'in mūrīs', e: '👀', g: 'in templī mūrīs sunt imāginēs bellī Trōiānī: Aenēās patriam suam ibi videt' }] },

        /* Aen. 1,494–497 */
        { la: 'Tum rēgīna Dīdō in templum intrat, multīs comitibus cīncta.',
          scene: SC.a4_dido,
          nova: [{ w: 'Dīdō', e: '👤', g: 'rēgīna quae Carthāginem condidit' },
                 { w: 'rēgīna', e: '👤', g: 'fēmina quae rēgnum regit' }] },

        /* Aen. 1,505–508 */
        { la: 'Rēgīna in soliō sedet et populō suō iūra dat.',
          scene: SC.a4_solium,
          nova: [{ w: 'solium', e: '👑', g: 'sella rēgis aut rēgīnae' }] },

        /* Aen. 1,509–519 */
        { la: 'Ecce! Sociī Aenēae, quōs āmissōs esse putābat, ad rēgīnae solium veniunt.',
          scene: SC.a4_socii },

        /* Aen. 1,562–578 */
        { la: 'Dīdō in soliō sedēns eōs benignē accipit et dīcit: "Trōiānōs iam nōvī; vōs hospitēs meī estis."',
          scene: SC.a4_accipit,
          nova: [{ w: 'accipit', e: '🤲', g: 'benignē accipere = in domum suam vocāre' },
                 { w: 'hospes', e: '🤝', g: 'quī ab aliō benignē accipitur' }] },

        /* Aen. 1,586–593 */
        { la: 'Tum nūbēs discēdit, et Aenēās ipse omnibus appāret; rēgīna eum quoque benignē accipit.',
          scene: SC.a4_apparet },

        /* Aen. 1,613–615 */
        { la: 'Dīdō obstupēscit et rogat: "Tūne ille Aenēās es?"',
          scene: SC.a4_obstupescit },

        /* Aen. 1,637–642 */
        { la: 'Rēgīna, quae hospitēs benignē accēpit, eōs in domum suam vocat, et convīvium magnum parātur.',
          scene: SC.a4_convivium,
          nova: [{ w: 'convīvium', e: '🥚', g: 'cēna magna cum multīs hospitibus' }] },

        { la: 'In convīviī mēnsīs cibus est; amphorae vīnō plēnae sunt, et omnēs vīnum bibunt.',
          scene: SC.a4_vinum,
          nova: [{ w: 'vīnum', e: '🤲', g: 'pōtiō ex ūvīs facta' }] },

        /* Aen. 1,753–756 */
        { la: 'Post convīvium, vīnō iam sūmptō, rēgīna rogat: "Nārrā nōbīs, hospes, quō modō Trōia capta sit!"',
          scene: SC.a4_rogat },

        /* Aen. 2,1–2 — the hinge into Liber II */
        { la: 'Omnēs tacent; tum Aenēās ipse nārrāre incipit.',
          scene: SC.a4_incipit },

        /* ---- VERBA VERGILIĪ IPSĪUS — Aen. 1,1–3 ---- */
        { la: 'Haec omnia Vergilius poēta Rōmānus versibus cecinit. Nunc verba Vergiliī ipsīus audī:',
          scene: SC.a4_vergilius,
          nova: [{ w: 'poēta', e: '💬', g: 'quī carmina facit et canit' },
                 { w: 'canit', e: '💬', g: 'poēta carmen canit; Vergilius dē Aenēā canit' }] },

        { la: 'Arma virumque canō, Trōiae quī prīmus ab ōrīs',
          scene: SC.a4_versus1,
          ttsText: 'Arma virumque cano, Troiae qui primus ab oris',
          nova: [{ w: 'arma', e: '🛡', g: 'scūtum et gladius et hasta' },
                 { w: 'virum', e: '👤', g: 'vir = homō fortis; hic vir Aenēās est' },
                 { w: 'canō', e: '💬', g: 'canit → canō: "ego canō". Vergilius ipse loquitur' },
                 { w: 'prīmus', e: '🥇', g: 'ante omnēs aliōs' },
                 { w: 'ōrīs', e: '📍', g: 'ōra → ab ōrīs: ā lītoribus Trōiae' }] },

        { la: 'Ītaliam fātō profugus Lāvīnaque vēnit',
          scene: SC.a4_versus2,
          ttsText: 'Italiam fato profugus Lavinaque venit',
          nova: [{ w: 'fātō', e: '📍', g: 'fātum → fātō: quia fāta ita iubent' },
                 { w: 'profugus', e: '🚶➡', g: 'quī ex patriā fūgit et sēdem novam quaerit' },
                 { w: 'Lāvīna', e: '⛰', g: 'Lāvīna lītora = lītora Ītaliae ubi posteā Lāvīnium erit' }] },

        { la: 'lītora, multum ille et terrīs iactātus et altō',
          scene: SC.a4_versus3,
          ttsText: 'litora, multum ille et terris iactatus et alto',
          nova: [{ w: 'lītora', e: '📍', g: 'lītus → lītora = ōrae maris. Vergilius hoc verbum in versum tertium pōnit: ita versus alter in alterum fluit' },
                 { w: 'multum', e: '➕', g: '= valdē, diū' },
                 { w: 'ille', e: '👤', g: '= is vir, Aenēās' },
                 { w: 'iactātus', e: '⬆⬇', g: 'iactat → iactātus est: ā tempestāte iactātus, sīcut in capitulō prīmō' },
                 { w: 'altō', e: '🌊', g: 'altum = mare altum, aequor. "terrīs et altō" = in terrā et in marī' }] },

        { la: 'Id est: Vergilius dē armīs et dē virō canit, quī prīmus ā Trōiae ōrīs, fātō profugus, in Ītaliam ad Lāvīna lītora vēnit, multum et in terrīs et in marī iactātus.',
          scene: SC.a4_paraphrasis },

        { la: 'Versūs memorābilēs: "Arma virumque canō."',
          scene: SC.a4_memoria,
          ttsText: 'Arma virumque cano.' }
      ],
      ludus: {
        words: [
          { la: 'moenia',    scene: SC.v_moenia,    emoji: '🗼' },
          { la: 'templum',   scene: SC.v_templum,   emoji: '🗼' },
          { la: 'solium',    scene: SC.v_solium,    emoji: '👑' },
          { la: 'vīnum',     scene: SC.v_vinum,     emoji: '🤲' },
          { la: 'Carthāgō',  scene: SC.v_carthago,  emoji: '🗼' },
          { la: 'cibus',     scene: SC.v_cibus,     emoji: '🥚' }
        ]
      },
      /* SONUS: `Dīdō`, `rēgīna` and `accipit` are the SAME crowned woman
         in the same room, so no two of them are ever offered together —
         exactly the mulier/Eva rule of Historia I. `moenia`, `templum`
         and `aedificat` all stand on the city ground; only one of the
         three appears per set, and `templum` is the one kept for SONUS
         because its pediment reads at tile size. */
      sonus: [
        { la: 'templum',
          answer: { la: 'templum', scene: SC.v_templum },
          options: [{ la: 'templum', scene: SC.v_templum },
                    { la: 'solium', scene: SC.v_solium },
                    { la: 'vīnum', scene: SC.v_vinum }] },
        { la: 'solium',
          answer: { la: 'solium', scene: SC.v_solium },
          options: [{ la: 'solium', scene: SC.v_solium },
                    { la: 'templum', scene: SC.v_templum },
                    { la: 'vīnum', scene: SC.v_vinum },
                    { la: 'cervus', scene: SC.v_cervus }] },
        { la: 'vīnum',
          answer: { la: 'vīnum', scene: SC.v_vinum },
          options: [{ la: 'vīnum', scene: SC.v_vinum },
                    { la: 'solium', scene: SC.v_solium },
                    { la: 'templum', scene: SC.v_templum }] },
        { la: 'Dīdō',
          answer: { la: 'Dīdō', scene: SC.v_dido },
          options: [{ la: 'Dīdō', scene: SC.v_dido },
                    { la: 'templum', scene: SC.v_templum },
                    { la: 'vīnum', scene: SC.v_vinum },
                    { la: 'cervus', scene: SC.v_cervus }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'moenia',    scene: SC.v_moenia },
            { la: 'templum',   scene: SC.v_templum },
            { la: 'solium',    scene: SC.v_solium },
            { la: 'convīvium', scene: SC.v_convivium },
            { la: 'vīnum',     scene: SC.v_vinum },
            { la: 'Dīdō',      scene: SC.v_dido }
          ],
          scrambles: [
            { la: 'Moenia Carthāginis surgunt.',       scene: SC.a4_urbs },
            { la: 'Hominēs moenia aedificant.',        scene: SC.a4_aedificant },
            { la: 'Rēgīna in soliō sedet.',            scene: SC.a4_solium },
            { la: 'Dīdō hospitēs benignē accipit.',    scene: SC.a4_accipit }
          ]
        },
        corrige: [
          { words: ['Hominēs', 'moenia', 'aedificat.'], wrong: 2,
            options: ['aedificant.', 'accipiunt.', 'bibunt.'], correct: 0, scene: SC.a4_aedificant },
          { words: ['Rēgīna', 'in', 'solium', 'sedet.'], wrong: 2,
            options: ['soliō', 'soliī', 'solia'], correct: 0, scene: SC.a4_solium },
          { words: ['Sociī,', 'quōs', 'āmissōs', 'sunt', 'putābat,', 'veniunt.'], wrong: 3,
            options: ['esse', 'erant', 'fuērunt'], correct: 0, scene: SC.a4_socii },
          { words: ['Dīdō', 'hospitēs', 'benignē', 'aedificat.'], wrong: 3,
            options: ['accipit.', 'agnōscit.', 'hortātur.'], correct: 0, scene: SC.a4_accipit },
          { words: ['Amphorae', 'cibō', 'plēnae', 'sunt.'], wrong: 1,
            options: ['vīnō', 'undā', 'nūbe'], correct: 0, scene: SC.a4_vinum }
        ],
        comple: [
          { text: '___ Carthāginis surgunt.',
            options: ['Moenia', 'Moenibus', 'Moenium'], correct: 0, scene: SC.a4_urbs },
          { text: 'In mediā urbe ___ ingēns stat.',
            options: ['templum', 'templī', 'templō'], correct: 0, scene: SC.a4_templum },
          { text: 'Rēgīna in soli___ sedet.',
            options: ['ō', 'um', 'a'], correct: 0, scene: SC.a4_solium },
          { text: 'Sociī, quōs āmissōs ___ putābat, veniunt.',
            options: ['esse', 'sunt', 'erant'], correct: 0, scene: SC.a4_socii },
          { text: 'Dīdō hospitēs benignē ___.',
            options: ['accipit', 'aedificat', 'cēlat'], correct: 0, scene: SC.a4_accipit },
          { text: 'Amphorae ___ plēnae sunt.',
            options: ['vīnō', 'vīnum', 'vīnī'], correct: 0, scene: SC.a4_vinum }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ---------- */

  CONTENT.registerRegion({
    track: 'aeneis',
    id: 'al1',
    titulus: 'Arma Virumque',
    ladder: 'S12',             /* CURRICULUM §0: the whole ladder is open */
    progressId: 'al1',
    capitula: capitula,

    /* ============ PROBĀTIŌ — TEMPESTĀS ============
       CURRICULUM §3: "Boss per liber = probātiō themed to the liber
       (storm-crossing …)". Two phases, and neither is a fight:

       1. TRĀNSITUS. The learner steers between two walls of water in
          the storm's own palette — this liber's picture, turned into a
          verb. `wall: 'murusAquae'` is the art the phase already names;
          `water` is darkened from the Red Sea's blue to the storm blue
          of bgStormSea so the crossing reads as Aen. 1, not Ex. 14.
       2. SENTENTIA. Five HAND-AUTHORED items (AUTHORING-BRIEF, "Boss
          clamor/sententia items"). Every gap is a picturable content
          lexeme; every distractor is same-POS and wrong IN THE PICTURE;
          and three of the five carry the syntax the liber taught — an
          accūsātīvus cum īnfīnītīvō and two ablātīvī absolūtī — so the
          learner must read the construction, not only the noun.

       hp 5 + 5 = 10, seconds 45 + 50 = 95: comfortably over the 20 s
       anti-cheat floor, and longer than a Fabulae duel because a trial
       is meant to be read, not raced. */
    boss: {
      id: 'b_al1',
      progressId: 'al1',
      kind: 'probatio',
      name: 'Tempestās',
      actor: 'ship',
      bg: 'stormSea',
      sceneY: 202,
      sceneScale: 1,
      /* legacy single-phase tuning: a client without js/probatio.js must
         still run something, and rules.php derives rule_boss_min_ms
         from these numbers (same reason r01/r02/l2 keep theirs). */
      hp: 10,
      seconds: 95,
      pos: { x: 0.36, y: 0.16 },
      phases: [
        { type: 'transitus', hp: 5, seconds: 45,
          wall: 'murusAquae', water: '#1f4a63' },
        { type: 'sententia', hp: 5, seconds: 50,
          items: [
            /* acc. + inf. — the learner has to see that Trōiānōs …
               petere is what Iūnō does not want, and only a goddess can
               be the subject of nōn vult. */
            { text: '____ Trōiānōs Ītaliam petere nōn vult.',
              answer: 'Iūnō',
              options: ['Iūnō', 'Neptūnus', 'Aenēās'],
              scene: SC.a1_iunovidet },
            /* abl. abs. */
            { text: 'Ventīs ēmissīs, ____ ingēns in marī surgit.',
              answer: 'tempestās',
              options: ['tempestās', 'nāvis', 'cervus'],
              scene: SC.a1_emittit },
            { text: '____ nāvēs Trōiānās hūc illūc iactat.',
              answer: 'tempestās',
              options: ['tempestās', 'Aenēās', 'Dīdō'],
              scene: SC.a1_tempestas },
            /* abl. abs. again, this time with the god as the answer */
            { text: 'Ventīs fugientibus, ____ undās altās sēdat.',
              answer: 'Neptūnus',
              options: ['Neptūnus', 'Iūnō', 'Dīdō'],
              scene: SC.a1_fugiunt },
            { text: 'Cibus fessōs sociōs ____.',
              answer: 'iuvat',
              options: ['iuvat', 'aedificat', 'agnōscit'],
              scene: SC.a2_cibus },
            { text: 'In soliō sedēns, ____ hospitēs benignē accipit.',
              answer: 'Dīdō',
              options: ['Dīdō', 'Venus', 'Aenēās'],
              scene: SC.a4_solium }
          ] }
      ],
      /* 5 cumulative questions; every word is a vocab entry WITH a
         picture in its own capitulum (js/app.js bossWords()). All four
         capitula are represented; a1 gives two because it is the liber's
         longest. Answer key lives on the server — see
         content/_pending/a-l1.reg.json. */
      quiz: [
        { la: 'nāvis',    from: 'a1' },
        { la: 'ventus',   from: 'a1' },
        { la: 'cervus',   from: 'a2' },
        { la: 'columba',  from: 'a3' },
        { la: 'templum',  from: 'a4' }
      ]
    }
  });
})();
