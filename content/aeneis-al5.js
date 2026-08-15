/* ============================================================
   content/aeneis-al5.js — AENĒIS · Liber V · LŪDĪ  (ladder S12)
   ------------------------------------------------------------
   The liber that breathes out. After the fire of Trōia, the wandering
   of Liber III and the grief of Liber IV, Vergil gives his reader a
   week of games on a Sicilian beach — and this track takes him at his
   word: Liber V is the happy liber, and it is allowed to be funny.

     a17 Lūdī Siciliēnsēs  — Aen. 5,1–113
     a18 Certāmen nāvium   — Aen. 5,114–285
     a19 Certāmen cursūs   — Aen. 5,286–361
     a20 Nāvēs ārdentēs    — Aen. 5,604–778  + VERBA VERGILIĪ inline
                             (5,709) + VERBA VERGILIĪ IPSĪUS (5,231)

   THE CHARTER is the one at the head of content/aeneis-al1.js and, in
   long form, at the head of content/_ledger-aeneis.md: prōvectī, the
   whole S1–S12 ladder open; the VOCABULARY is what is graded; poetic
   diction pre-taught before any authentic line uses it; the liber's
   last capitulum closes with "Verba Vergiliī ipsīus".

   WHICH LINES THIS LIBER QUOTES, and why in that order:
     · 5,709 "nāte deā, quō fāta trahunt retrahuntque sequāmur;"
       Inline in a20, at the moment old Nautēs says it — the treatment
       Liber I gives 1,203, Liber II 2,49 and Liber III 3,395. The line
       IS the scene: the ships have burned, the leader does not know
       whether to stay or sail, and a wise old man answers him in one
       hexameter. `fātum` is a1's gloss, and the prose of the page
       before pre-teaches the whole of it.
     · 5,231 "hōs successus alit: possunt, quia posse videntur."
       The liber's CLOSING VERBA VERGILIĪ IPSĪUS. It belongs to a18's
       boat race — Vergil says it of the crew that starts believing it
       can win — and it is brought back at the very end of the liber,
       with a18's own scene under it, because it is the one line in
       the Aenēid that is about the reader of a learning app. The frame
       page says so in Latin, and the closing paraphrase says it twice:
       *possunt, quia sē posse crēdunt.* That is the whole product's
       thesis in five words of Vergil.
     Both are OCT/Mynors text with quantity marks added and NOT ONE
     LETTER CHANGED.

   B RATING (DESIGN §8), the whole liber:
     · NOBODY IS HURT ANYWHERE, and the text says so out loud twice:
       *nēmō tamen laeditur* when Sergestus' ship strikes the rock, and
       *nēmō laesus est: nūlla māter, nūllus puer, nūllus nauta* when
       the fire is put out. In a liber of contests that is not a
       decoration; it is the point.
     · THE BOXING MATCH IS OMITTED ENTIRELY (Aen. 5,362–484, Darēs and
       Entellus). It is the one genuinely violent episode in the book —
       a man is beaten until his friends carry him off, and a bull is
       felled with a fist as a substitute sacrifice — and no part of
       the liber's arc needs it. The archery and the lūsus Trōiae go
       with it, for the lexeme cap rather than the rating.
     · NĪSUS' FALL keeps Vergil's slip and drops what he slipped in:
       the poem has him go down in the blood and offal of the
       sacrifice (5,328–333), and this file has *in locō lūbricō
       lābitur et cadit*. Registered as an adaptation.
     · ANCHĪSĒS' SERPENT (5,84–93) is kept exactly as Vergil has it,
       because it is the gentlest omen in the poem: the snake tastes
       the offerings and goes away without harming anything —
       *dapēs gustat et sine damnō abit*.
     · The women who fire the ships are not villains and are not
       punished: they are *fessae maris*, they are stopped by a boy
       shouting, they hide in the woods, and the liber ends by GIVING
       THEM A CITY (Acesta) and calling them *laetae*.

   HOW THE GODS ARE DRAWN (charter): IUPPITER is the first god in the
   track to get his attribute bird outright — `aquila`, which the art
   library owns, exactly as Iūnō has her `pāvō` in a1 and Venus her
   `columba` in a3. He is a `king` in gold and white with the eagle
   beside him, and NO radiance of any kind (`star` is Historia Sacra's
   sign for the God who has no body, and the two tracks must not teach
   one picture with two meanings).

   MISSING ART, reported not substituted (AUTHORING-BRIEF "SCENES
   FIRST"):
     · No OAR prop — but the `ship` actor takes `oars: true`, which
       draws five oars per side, so `rēmus` is carded as a ship with
       its oars out and the word is honestly pictured.
     · No TURNING-POST (mēta) and no ROCK prop: the rock in the sea is
       the `mountain` actor at 0.55–0.7 standing in water, which is
       what a rock in the sea looks like. `mēta` stays a glossed
       context word.
     · No HELMET or QUIVER props, so the third prize of the foot race
       is changed from Vergil's Greek helmet to an `urna`, which the
       library owns and which a17's `praemium` card already shows.
     · No SHIELD-PROP that reads as a gift, so Nīsus' consolation
       prize (Didymaon's shield, 5,359–361) becomes a `corōna`.
       Registered.

   IDS ARE DATABASE KEYS once shipped: a17…a20, progressId 'al5'
   (content/README.md §5). File name per the head of aeneis-al1.js.

   Schema: content/README.md. Style: docs/LATIN-STYLE.md §3.
   ============================================================ */
(function () {
  'use strict';

  var G = 210;               /* ground line in scene space (400 × 240) */

  var TROIA  = '#b3572b';    /* Aenēās' tunica — a1's own colour        */
  var GOLD   = '#e0a93e';
  var CANUS  = '#f4e7cd';
  var UMBER  = '#7a4a26';
  var SICULA = '#8a7a55';    /* Acestēs' robe: Sicilian earth           */
  var CAELUM = '#f6f1e4';    /* Iuppiter's robe: high cloud             */
  var VIRIDE = '#6f8f3f';    /* Euryalus' tunica                        */
  var FERRUM = '#8d9299';

  function merge(o, opts) {
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }

  function heros(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: TROIA, mantleColor: GOLD, shield: true }, opts);
  }
  function ascanius(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'child',
                   robeColor: GOLD }, opts);
  }
  function acestes(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'king',
                   robeColor: SICULA, mantleColor: CANUS }, opts);
  }
  /* Iuppiter: the charter's attribute-bird device, at last with the
     bird the library owns outright. No radiance — see the header. */
  function iuppiter(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'king',
                   robeColor: CAELUM, mantleColor: GOLD,
                   hairColor: '#cfc6b2', beardColor: '#cfc6b2' }, opts);
  }
  /* the two runners: young men, short tunics, no beards */
  function nisus(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: TROIA, mantleColor: false, beard: 'none',
                   shortTunic: true }, opts);
  }
  function euryalus(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: VIRIDE, mantleColor: false, beard: 'none',
                   shortTunic: true }, opts);
  }
  function salius(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: FERRUM, mantleColor: false, beard: 'none',
                   shortTunic: true }, opts);
  }
  function nauta(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'crowd' }, opts);
  }

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ a17 · vocabulary cards ============ */

    /* certāmen: two men facing each other with the crowd behind — the
       IDEA of a contest. a19's `cursus` is two men running the same
       way at a post, and the two never meet in one SONUS set. */
    v_certamen: { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 200, y: G - 26, s: 0.62, n: 4 },
                  nisus(132, G, 1.2, { pose: 'point' }),
                  salius(268, G, 1.2, { pose: 'point', flip: true })
                ] },

    /* praemium: the prize table — everything a victor can carry away */
    v_praemium: { bg: 'plain', items: [
                  { t: 'mensa',  x: 196, y: G, s: 1.3 },
                  { t: 'crown',  x: 170, y: G - 40, s: 0.85 },
                  { t: 'urna',   x: 228, y: G - 38, s: 0.7 },
                  { t: 'pellis', x: 320, y: G, s: 0.75 }
                ] },

    v_vincit:   { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 306, y: G, s: 0.72, n: 3 },
                  { t: 'crown',      x: 108, y: G - 96, s: 0.9 },
                  euryalus(108, G, 1.35, { pose: 'arms-up' })
                ] },

    v_honorat:  { bg: 'plain', items: [
                  { t: 'sepulcrum', x: 288, y: G, s: 0.9, open: false },
                  heros(136, G, 1.2, { pose: 'arms-up', shield: false })
                ] },

    v_acestes:  { bg: 'sea', items: [
                  { t: 'palmTree', x: 316, y: G, s: 0.85 },
                  acestes(160, G, 1.3)
                ] },

    /* ============ a17 · story ============ */

    a17_pervenit: { bg: 'sea', items: [
                  { t: 'palmTree', x: 342, y: G, s: 0.8 },
                  { t: 'ship',     x: 168, y: 200, s: 1 },
                  { t: 'ship',     x: 282, y: 214, s: 0.75 }
                ] },

    a17_acestes: { bg: 'sea', items: [
                  { t: 'palmTree',   x: 350, y: G, s: 0.75 },
                  acestes(128, G, 1.25, { pose: 'point' }),
                  { t: 'crowdGroup', x: 276, y: G, s: 0.85, n: 4 }
                ] },

    a17_sepulcrum: { bg: 'plain', items: [
                  { t: 'sepulcrum', x: 262, y: G, s: 1, open: false },
                  heros(122, G, 1.15, { shield: false })
                ] },

    a17_honorat: { bg: 'plain', items: [
                  { t: 'sepulcrum', x: 286, y: G, s: 0.95, open: false },
                  { t: 'amphora',   x: 210, y: G, s: 0.7 },
                  heros(126, G, 1.2, { pose: 'arms-up', shield: false })
                ] },

    a17_salve:  { bg: 'plain', items: [
                  { t: 'sepulcrum', x: 290, y: G, s: 0.95, open: false },
                  heros(130, G, 1.2, { pose: 'arms-up', shield: false })
                ],
                bubbles: [{ x: 208, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    /* the gentlest omen in the poem: the snake tastes and goes */
    a17_serpens: { bg: 'plain', items: [
                  { t: 'sepulcrum', x: 268, y: G, s: 0.95, open: false },
                  { t: 'serpent',   x: 150, y: G, s: 0.9 },
                  { t: 'patina',    x: 214, y: G, s: 0.8 }
                ] },

    a17_mirantur: { bg: 'plain', items: [
                  { t: 'sepulcrum',  x: 306, y: G, s: 0.85, open: false },
                  { t: 'crowdGroup', x: 140, y: G, s: 1, n: 5 }
                ],
                bubbles: [{ x: 232, y: 62, w: 50, h: 38, text: '👀', kind: 'thought', tail: 'right', fs: 19 }] },

    a17_indicit: { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 300, y: G, s: 0.85, n: 5 },
                  heros(124, G, 1.25, { pose: 'point', shield: false })
                ],
                bubbles: [{ x: 216, y: 58, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a17_certamina: { bg: 'sea', items: [
                  { t: 'ship',       x: 306, y: 208, s: 0.8, sail: 'furled' },
                  { t: 'crowdGroup', x: 132, y: G, s: 0.95, n: 5 }
                ] },

    a17_praemia: { bg: 'plain', items: [
                  { t: 'mensa',  x: 176, y: G, s: 1.25 },
                  { t: 'crown',  x: 150, y: G - 38, s: 0.8 },
                  { t: 'urna',   x: 206, y: G - 36, s: 0.68 },
                  { t: 'pellis', x: 306, y: G, s: 0.72 },
                  { t: 'equus',  x: 60,  y: G, s: 0.6 }
                ] },

    a17_cupiunt: { bg: 'plain', items: [
                  { t: 'mensa',      x: 300, y: G, s: 1.05 },
                  { t: 'crown',      x: 300, y: G - 34, s: 0.7 },
                  { t: 'crowdGroup', x: 128, y: G, s: 1, n: 5 }
                ],
                bubbles: [{ x: 214, y: 62, w: 50, h: 38, text: '👀', kind: 'thought', tail: 'right', fs: 19 }] },

    a17_omnibus: { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 296, y: G, s: 0.85, n: 5 },
                  heros(120, G, 1.2, { pose: 'point', shield: false }),
                  { t: 'crown', x: 214, y: G - 60, s: 0.7 }
                ] },

    a17_memoria: { bg: 'plain', items: [
                  { t: 'sepulcrum', x: 320, y: G, s: 0.8, open: false },
                  { t: 'crown',     x: 96,  y: G - 92, s: 0.85 },
                  euryalus(96, G, 1.3, { pose: 'arms-up' })
                ] },

    /* ============ a18 · vocabulary cards ============ */

    /* rēmus: the library's `ship` with `oars: true` — five oars a side,
       which is the only honest picture of an oar it owns */
    v_remus:    { bg: 'sea', items: [
                  { t: 'ship', x: 200, y: 198, s: 1.35, oars: true, sail: 'furled' }
                ] },

    v_saxum:    { bg: 'sea', items: [
                  { t: 'mountain', x: 200, y: 226, s: 0.62 }
                ] },

    /* celer: the same two ships, one plainly ahead of the other */
    v_celer:    { bg: 'sea', items: [
                  { t: 'ship', x: 116, y: 196, s: 1.15, oars: true },
                  { t: 'ship', x: 300, y: 218, s: 0.7, oars: true }
                ],
                bubbles: [{ x: 208, y: 60, w: 44, h: 34, text: '➡', kind: 'thought', tail: 'left', fs: 18 }] },

    v_gubernator: { bg: 'sea', items: [
                  { t: 'ship', x: 216, y: 204, s: 1.1, sail: 'furled' },
                  nauta(152, 182, 0.62, { pose: 'point' })
                ] },

    /* ============ a18 · story ============ */

    a18_quattuor: { bg: 'sea', items: [
                  { t: 'ship', x: 92,  y: 196, s: 0.78, oars: true },
                  { t: 'ship', x: 196, y: 206, s: 0.72, oars: true },
                  { t: 'ship', x: 296, y: 216, s: 0.66, oars: true },
                  { t: 'ship', x: 372, y: 226, s: 0.55, oars: true }
                ] },

    a18_meta:   { bg: 'sea', items: [
                  { t: 'mountain', x: 292, y: 226, s: 0.58 },
                  { t: 'ship',     x: 118, y: 202, s: 0.9, oars: true }
                ] },

    a18_remi:   { bg: 'sea', items: [
                  { t: 'ship', x: 190, y: 198, s: 1.3, oars: true, sail: 'furled' }
                ] },

    a18_gubernator: { bg: 'sea', items: [
                  { t: 'ship', x: 224, y: 204, s: 1.1, sail: 'furled' },
                  nauta(160, 182, 0.62, { pose: 'point' })
                ] },

    a18_incipit: { bg: 'sea', items: [
                  { t: 'ship', x: 120, y: 198, s: 1, oars: true },
                  { t: 'ship', x: 248, y: 210, s: 0.85, oars: true },
                  { t: 'ship', x: 350, y: 220, s: 0.68, oars: true }
                ] },

    a18_gyas:   { bg: 'sea', items: [
                  { t: 'mountain', x: 330, y: 226, s: 0.55 },
                  { t: 'ship',     x: 132, y: 198, s: 1.05, oars: true },
                  { t: 'ship',     x: 246, y: 214, s: 0.78, oars: true }
                ] },

    a18_cloanthus: { bg: 'sea', items: [
                  { t: 'mountain', x: 316, y: 226, s: 0.55 },
                  { t: 'ship',     x: 236, y: 202, s: 1, oars: true },
                  { t: 'ship',     x: 108, y: 216, s: 0.72, oars: true }
                ] },

    a18_sergestus: { bg: 'sea', items: [
                  { t: 'mountain', x: 268, y: 226, s: 0.6 },
                  { t: 'ship',     x: 214, y: 208, s: 0.85, sail: 'furled' }
                ],
                bubbles: [{ x: 96, y: 78, w: 50, h: 38, text: '❗', kind: 'thought', tail: 'right', fs: 20 }] },

    a18_nemolaeditur: { bg: 'sea', items: [
                  { t: 'mountain', x: 300, y: 226, s: 0.55 },
                  { t: 'ship',     x: 168, y: 206, s: 0.9, sail: 'furled' },
                  nauta(112, 184, 0.6, { pose: 'arms-up' })
                ] },

    a18_hortatur: { bg: 'sea', items: [
                  { t: 'ship', x: 224, y: 200, s: 1.15, oars: true },
                  nauta(160, 178, 0.62, { pose: 'arms-up' })
                ],
                bubbles: [{ x: 96, y: 70, w: 52, h: 40, text: '💬', kind: 'speech', tail: 'right', fs: 19 }] },

    a18_contendunt: { bg: 'sea', items: [
                  { t: 'ship', x: 138, y: 198, s: 1.1, oars: true },
                  { t: 'ship', x: 282, y: 210, s: 0.95, oars: true }
                ] },

    a18_orat:   { bg: 'sea', items: [
                  { t: 'ship', x: 234, y: 202, s: 1.05, oars: true },
                  nauta(170, 180, 0.62, { pose: 'arms-up' }),
                  { t: 'piscis', x: 66, y: 214, s: 1 }
                ] },

    a18_vincit: { bg: 'sea', items: [
                  { t: 'ship',       x: 250, y: 204, s: 1, oars: true },
                  { t: 'crowdGroup', x: 92,  y: G, s: 0.85, n: 4 }
                ],
                bubbles: [{ x: 176, y: 60, w: 50, h: 38, text: '🤲', kind: 'thought', tail: 'right', fs: 19 }] },

    a18_praemia: { bg: 'plain', items: [
                  { t: 'mensa',  x: 186, y: G, s: 1.2 },
                  { t: 'crown',  x: 160, y: G - 36, s: 0.78 },
                  { t: 'urna',   x: 214, y: G - 34, s: 0.66 },
                  heros(66, G, 1.05, { pose: 'point', shield: false })
                ] },

    a18_memoria: { bg: 'sea', items: [
                  { t: 'mountain', x: 322, y: 226, s: 0.55 },
                  { t: 'ship',     x: 148, y: 198, s: 1.15, oars: true }
                ] },

    /* ============ a19 · vocabulary cards ============ */

    v_cursus:   { bg: 'plain', items: [
                  { t: 'columna', x: 332, y: G, s: 0.85 },
                  nisus(116, G, 1.25, { pose: 'walk' }),
                  euryalus(206, G, 1.25, { pose: 'walk' })
                ] },

    v_amicus:   { bg: 'plain', items: [
                  nisus(154, G, 1.3),
                  euryalus(244, G, 1.3, { flip: true })
                ],
                bubbles: [{ x: 200, y: 56, w: 50, h: 38, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    v_iuvenis:  { bg: 'plain', items: [
                  euryalus(200, G, 1.5)
                ] },

    /* cadit: the kneeling pose with the library's own ⬇ device (a1's
       `iactat` uses ⬆⬇ the same way) */
    v_cadit:    { bg: 'plain', items: [
                  nisus(200, G, 1.35, { pose: 'kneel' })
                ],
                bubbles: [{ x: 96, y: 82, w: 44, h: 34, text: '⬇', kind: 'thought', tail: 'right', fs: 18 }] },

    v_pellis:   { bg: 'plain', items: [
                  { t: 'pellis', x: 200, y: G, s: 1.35 }
                ] },

    v_corona:   { bg: 'plain', items: [
                  { t: 'crown', x: 200, y: G - 30, s: 1.5 }
                ] },

    v_equus:    { bg: 'plain', items: [
                  { t: 'equus', x: 200, y: G, s: 1.35 }
                ] },

    /* ============ a19 · story ============ */

    a19_cursus: { bg: 'plain', items: [
                  { t: 'columna', x: 336, y: G, s: 0.85 },
                  { t: 'crowdGroup', x: 76, y: G - 22, s: 0.6, n: 3 },
                  nisus(146, G, 1.2, { pose: 'walk' }),
                  euryalus(232, G, 1.2, { pose: 'walk' })
                ] },

    a19_iuvenes: { bg: 'plain', items: [
                  nisus(120, G, 1.15),
                  euryalus(196, G, 1.15),
                  salius(272, G, 1.15)
                ] },

    a19_amici:  { bg: 'plain', items: [
                  nisus(158, G, 1.3),
                  euryalus(246, G, 1.3, { flip: true })
                ],
                bubbles: [{ x: 202, y: 56, w: 50, h: 38, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    a19_praemia: { bg: 'plain', items: [
                  { t: 'equus',  x: 296, y: G, s: 0.85 },
                  { t: 'pellis', x: 200, y: G, s: 0.8 },
                  { t: 'urna',   x: 132, y: G, s: 0.85 },
                  { t: 'crown',  x: 62,  y: G - 24, s: 0.8 }
                ] },

    a19_currunt: { bg: 'plain', items: [
                  { t: 'columna', x: 344, y: G, s: 0.8 },
                  nisus(238, G, 1.2, { pose: 'walk' }),
                  salius(160, G, 1.2, { pose: 'walk' }),
                  euryalus(92, G, 1.2, { pose: 'walk' })
                ] },

    a19_cadit:  { bg: 'plain', items: [
                  { t: 'columna', x: 342, y: G, s: 0.8 },
                  euryalus(250, G, 1.2, { pose: 'walk' }),
                  salius(186, G, 1.2, { pose: 'walk' }),
                  nisus(104, G, 1.25, { pose: 'kneel' })
                ],
                bubbles: [{ x: 62, y: 78, w: 44, h: 34, text: '⬇', kind: 'thought', tail: 'right', fs: 18 }] },

    a19_vincit: { bg: 'plain', items: [
                  { t: 'columna',    x: 348, y: G, s: 0.8 },
                  { t: 'crowdGroup', x: 118, y: G - 20, s: 0.6, n: 3 },
                  euryalus(266, G, 1.3, { pose: 'arms-up' })
                ] },

    a19_salius: { bg: 'plain', items: [
                  salius(140, G, 1.25, { pose: 'arms-up' }),
                  heros(284, G, 1.2, { flip: true, shield: false })
                ],
                bubbles: [{ x: 212, y: 58, w: 54, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a19_pellis: { bg: 'plain', items: [
                  { t: 'pellis', x: 274, y: G, s: 0.95 },
                  heros(122, G, 1.2, { pose: 'point', shield: false }),
                  salius(206, G, 1.15, { flip: true })
                ] },

    a19_corona: { bg: 'plain', items: [
                  { t: 'crown', x: 262, y: G - 26, s: 1 },
                  nisus(150, G, 1.25, { pose: 'arms-up' })
                ] },

    a19_equus:  { bg: 'plain', items: [
                  { t: 'equus', x: 280, y: G, s: 1 },
                  euryalus(126, G, 1.25, { pose: 'point' })
                ] },

    a19_rident: { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 296, y: G, s: 0.85, n: 5 },
                  nisus(112, G, 1.2),
                  euryalus(190, G, 1.2)
                ] },

    a19_memoria: { bg: 'plain', items: [
                  nisus(148, G, 1.25),
                  euryalus(238, G, 1.25, { flip: true }),
                  { t: 'crown', x: 330, y: G - 26, s: 0.8 }
                ],
                bubbles: [{ x: 194, y: 56, w: 50, h: 38, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ a20 · vocabulary cards ============ */

    /* Iuppiter: the attribute bird the library owns outright, and no
       radiance of any kind — see the header */
    v_iuppiter: { bg: 'plain', items: [
                  iuppiter(154, G, 1.3),
                  { t: 'aquila', x: 296, y: 150, s: 1.05, pose: 'fly', flip: true }
                ] },

    v_imber:    { bg: 'stormSea', items: [
                  { t: 'ship', x: 200, y: 204, s: 1.15, sail: 'furled' }
                ] },

    v_condit:   { bg: 'city', items: [
                  { t: 'cityWall',   x: 268, y: G, s: 0.95 },
                  { t: 'crowdGroup', x: 108, y: G, s: 0.95, n: 4, pose: 'point' }
                ] },

    /* remanet: the ones who stay, and the ship already going */
    v_remanet:  { bg: 'sea', items: [
                  { t: 'ship',       x: 330, y: 212, s: 0.6 },
                  { t: 'crowdGroup', x: 128, y: G, s: 1.05, n: 5 }
                ] },

    /* ============ a20 · story ============ */

    a20_iuno:   { bg: 'sea', items: [
                  { t: 'person', x: 132, y: G, s: 1.2, role: 'queen', mantleColor: GOLD },
                  { t: 'pavo',   x: 280, y: G, s: 0.85, flip: true }
                ],
                bubbles: [{ x: 62, y: 86, w: 52, h: 40, text: '😠', kind: 'thought', tail: 'right', fs: 20 }] },

    a20_matres: { bg: 'sea', items: [
                  { t: 'ship',   x: 320, y: 210, s: 0.72, sail: 'furled' },
                  { t: 'person', x: 122, y: G, s: 1.15, role: 'woman', pose: 'sit' },
                  { t: 'person', x: 196, y: G, s: 1.1, role: 'woman', pose: 'sit', flip: true }
                ],
                bubbles: [{ x: 66, y: 86, w: 52, h: 40, text: '😖', kind: 'thought', tail: 'right', fs: 20 }] },

    a20_dicunt: { bg: 'sea', items: [
                  { t: 'palmTree', x: 352, y: G, s: 0.7 },
                  { t: 'person',   x: 138, y: G, s: 1.15, role: 'woman', pose: 'point' },
                  { t: 'person',   x: 216, y: G, s: 1.1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 292, y: 62, w: 52, h: 40, text: '💬', kind: 'speech', tail: 'left', fs: 19 }] },

    a20_ignis: { bg: 'sea', items: [
                  { t: 'ship', x: 128, y: 204, s: 0.9, sail: 'furled' },
                  { t: 'fire', x: 250, y: G, s: 0.85 },
                  { t: 'ship', x: 330, y: 216, s: 0.62, sail: 'furled' }
                ] },

    a20_ascanius: { bg: 'sea', items: [
                  { t: 'fire',  x: 306, y: G, s: 0.8 },
                  { t: 'equus', x: 92,  y: G, s: 0.75 },
                  ascanius(180, G, 1.25, { pose: 'arms-up' })
                ],
                bubbles: [{ x: 244, y: 58, w: 54, h: 42, text: '❗', kind: 'speech', tail: 'right', fs: 22 }] },

    a20_fugiunt: { bg: 'forest', items: [
                  { t: 'tree',   x: 330, y: G, s: 0.9 },
                  { t: 'person', x: 138, y: G, s: 1.1, role: 'woman', pose: 'walk' },
                  { t: 'person', x: 214, y: G, s: 1.05, role: 'woman', pose: 'walk' }
                ] },

    a20_orat:   { bg: 'sea', items: [
                  { t: 'fire',  x: 320, y: G, s: 0.72 },
                  heros(146, G, 1.25, { pose: 'arms-up', shield: false })
                ] },

    a20_iuppiter: { bg: 'plain', items: [
                  iuppiter(148, G, 1.3),
                  { t: 'aquila', x: 292, y: 148, s: 1, pose: 'fly', flip: true }
                ] },

    a20_imber:  { bg: 'stormSea', items: [
                  { t: 'ship', x: 138, y: 202, s: 1, sail: 'furled' },
                  { t: 'fire', x: 282, y: G, s: 0.5 }
                ] },

    a20_exstinguit: { bg: 'stormSea', items: [
                  { t: 'ship', x: 168, y: 202, s: 1.05, sail: 'furled' },
                  { t: 'ship', x: 300, y: 216, s: 0.7, sail: 'furled' }
                ] },

    a20_salvi:  { bg: 'sea', items: [
                  { t: 'ship',       x: 320, y: 212, s: 0.7, sail: 'furled' },
                  { t: 'crowdGroup', x: 146, y: G, s: 1, n: 5 }
                ] },

    a20_dubitat: { bg: 'sea', items: [
                  heros(196, G, 1.25, { shield: false })
                ],
                bubbles: [{ x: 82, y: 84, w: 50, h: 38, text: '❓', kind: 'thought', tail: 'right', fs: 20 }] },

    a20_nautes: { bg: 'sea', items: [
                  { t: 'person', x: 134, y: G, s: 1.2, role: 'patriarch',
                    robeColor: CANUS, mantleColor: UMBER, pose: 'point' },
                  heros(284, G, 1.2, { flip: true, shield: false })
                ],
                bubbles: [{ x: 210, y: 56, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    /* VERBA VERGILIĪ — the poet's own frame */
    a20_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 90,  y: G, s: 0.95 },
                  { t: 'person',  x: 232, y: G, s: 1.2, role: 'priest', pose: 'point' }
                ] },

    a20_versusNautes: { bg: 'sea', items: [
                  { t: 'person', x: 128, y: G, s: 1.2, role: 'patriarch',
                    robeColor: CANUS, mantleColor: UMBER },
                  { t: 'ship',   x: 292, y: 204, s: 0.85, sail: 'furled' }
                ] },

    a20_condit: { bg: 'city', items: [
                  { t: 'cityWall',   x: 276, y: G, s: 0.95 },
                  { t: 'crowdGroup', x: 112, y: G, s: 0.95, n: 4, pose: 'point' }
                ] },

    a20_remanent: { bg: 'sea', items: [
                  { t: 'ship',       x: 336, y: 212, s: 0.6 },
                  { t: 'crowdGroup', x: 134, y: G, s: 1.05, n: 5 }
                ] },

    a20_somnium: { bg: 'nightSky', items: [
                  { t: 'person', x: 292, y: G - 66, s: 0.9, role: 'patriarch',
                    robeColor: CANUS, mantleColor: UMBER, staff: false },
                  heros(136, G, 1.1, { pose: 'sleep', shield: false })
                ],
                bubbles: [{ x: 200, y: 54, w: 60, h: 44, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a20_discessus: { bg: 'sea', items: [
                  { t: 'crowdGroup', x: 66,  y: G, s: 0.85, n: 4 },
                  { t: 'ship',       x: 210, y: 200, s: 1 },
                  { t: 'ship',       x: 330, y: 214, s: 0.7 }
                ] },

    a20_memoria: { bg: 'sea', items: [
                  { t: 'ship', x: 146, y: 198, s: 1.15, oars: true },
                  { t: 'ship', x: 296, y: 212, s: 0.85, oars: true }
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ a17 — LŪDĪ SICILIĒNSĒS ============
       fons Aen. 5,1–113. A grave is honoured and a week of games is
       announced: the liber's whole vocabulary of contest — certāmen,
       praemium, vincit, honōrat — is laid down here so that a18, a19
       and the trial can spend it.
       Anchīsēs' serpent (5,84–93) is kept EXACTLY as Vergil has it,
       because it is the gentlest omen in the poem: it tastes the
       offerings and goes away without harming anything.
       OMITTED: the storm that drives them to Sicily (5,8–34, already
       told at the end of a12); Beroē and the calendar of the ninth day
       (5,64–71); and — for the B rating and for the cap — the whole
       BOXING MATCH of 5,362–484, with the archery (5,485–544) and the
       lūsus Trōiae (5,545–603). See the file header. */
    {
      id: 'a17',
      titulus: 'Lūdī Siciliēnsēs',
      icon: '🏺🏅',
      numerus: 'XVII',
      pos: { x: 0.25, y: 0.88 },
      fons: 'Aen. 5,1–113',
      vocab: [
        { la: 'certāmen', scene: SC.v_certamen, pars: 'nomen' },
        { la: 'praemium', scene: SC.v_praemium, pars: 'nomen' },
        { la: 'Acestēs',  scene: SC.v_acestes,  pars: 'nomen' },
        { la: 'vincit',   scene: SC.v_vincit,   pars: 'verbum' },
        { la: 'honōrat',  scene: SC.v_honorat,  pars: 'verbum' }
      ],
      story: [
        /* Aen. 5,35–41 */
        { la: 'Classis Trōiāna ad Siciliam pervenit, ubi Acestēs rēx habitat.',
          scene: SC.a17_pervenit,
          nova: [{ w: 'Acestēs', e: '👑', g: 'rēx Siciliae, mātre Trōiānā nātus; itaque Trōiānōs ut frātrēs accipit' }] },

        { la: 'Acestēs hospitēs laetus accipit et cibum vīnumque dat; nēmō apud Acestēn fessus manet.',
          scene: SC.a17_acestes },

        /* Aen. 5,42–48 */
        { la: 'Aenēās locum agnōscit: hīc annō superiōre pater Anchīsēs in sepulcrō positus est.',
          scene: SC.a17_sepulcrum },

        { la: 'Iam annus tōtus est ex quō pater periit. Itaque fīlius sepulcrum patris honōrat.',
          scene: SC.a17_honorat,
          nova: [{ w: 'honōrat', e: '🙏', g: 'honōrem dat: dōna et sacra mortuō aut deō offert' }] },

        /* Aen. 5,77–80 */
        { la: 'Ad sepulcrum vīnum, lac, flōrēs fundit et patrem vocat: "Salvē, sāncte parēns!"',
          scene: SC.a17_salve },

        /* Aen. 5,84–93 — the gentlest omen in the poem, kept whole */
        { la: 'Ecce, ē sepulcrō serpēns lēnis exit, dapēs gustat et sine damnō abit.',
          scene: SC.a17_serpens,
          nova: [{ w: 'lēnis', e: '🤲', g: '= placidus, quī nōn nocet; ↔ ferōx' }] },

        { la: 'Omnēs mīrantur: signum bonum est, et Aenēās patrem suum ā deīs honōrārī putat.',
          scene: SC.a17_mirantur },

        /* Aen. 5,58–71, 104–113 */
        { la: 'Tum Aenēās Trōiānōs vocat et lūdōs indīcit: "Nōnō diē certāmina erunt!" Acestēs quoque adest et gaudet.',
          scene: SC.a17_indicit,
          nova: [{ w: 'certāmen', e: '🏁', g: 'cum duo aut plūrēs inter sē contendunt, uter melior sit' },
                 { w: 'lūdī', e: '🏅', g: 'certāmina et spectācula quae hominēs deīs aut mortuīs dant' }] },

        { la: 'Tria certāmina erunt: nāvium, cursūs, sagittārum. Prīmum certāmen in marī fīet.',
          scene: SC.a17_certamina },

        /* Aen. 5,109–113 */
        { la: 'Praemia in mediō pōnuntur: corōnae, vestēs, urnae, pellēs, equī.',
          scene: SC.a17_praemia,
          nova: [{ w: 'praemium', e: '🏅', g: 'dōnum quod victor accipit' }] },

        { la: 'Omnēs praemia spectant et vincere cupiunt; nam praemium pulchrum animōs iuvenum movet.',
          scene: SC.a17_cupiunt,
          nova: [{ w: 'vincit', e: '🥇', g: 'superat: quī vincit victor est et praemium accipit' }] },

        /* Aen. 5,305 — the law of these games */
        { la: 'Aenēās autem dīcit: "Nēmō sine praemiō discēdet: etiam quī nōn vincit dōnum accipiet."',
          scene: SC.a17_omnibus },

        { la: 'Haec est lēx lūdōrum Aenēae: certāmen sine īrā, victōria sine dolōre.',
          scene: SC.a17_omnibus },

        { la: 'Memoriā tenē: fīlius sepulcrum patris honōrat, deinde lūdōs indīcit. Quī vincit praemium accipit, sed nēmō sine dōnō discēdit.',
          scene: SC.a17_memoria,
          ttsText: 'Filius sepulcrum patris honorat, deinde ludos indicit. Qui vincit praemium accipit, sed nemo sine dono discedit.' }
      ],
      ludus: {
        words: [
          { la: 'praemium', scene: SC.v_praemium, emoji: '🏅' },
          { la: 'certāmen', scene: SC.v_certamen, emoji: '🏁' },
          { la: 'Acestēs',  scene: SC.v_acestes,  emoji: '👑' },
          { la: 'vincit',   scene: SC.v_vincit,   emoji: '🥇' },
          { la: 'honōrat',  scene: SC.v_honorat,  emoji: '🙏' },
          { la: 'corōna',   scene: SC.v_corona,   emoji: '👑' }
        ]
      },
      /* SONUS, hand-authored (SHARED-PICTURE RULE). `certāmen` and
         `vincit` are the same young men on the same bare ground, so
         they are never offered together; `honōrat` and `Acestēs` are
         both a single robed man and are likewise kept apart.
         `praemium` (the loaded table) is this capitulum's unmistakable
         card and carries the sets. */
      sonus: [
        { la: 'praemium',
          answer: { la: 'praemium', scene: SC.v_praemium },
          options: [{ la: 'praemium', scene: SC.v_praemium },
                    { la: 'certāmen', scene: SC.v_certamen },
                    { la: 'Acestēs', scene: SC.v_acestes }] },
        { la: 'Acestēs',
          answer: { la: 'Acestēs', scene: SC.v_acestes },
          options: [{ la: 'Acestēs', scene: SC.v_acestes },
                    { la: 'praemium', scene: SC.v_praemium },
                    { la: 'certāmen', scene: SC.v_certamen }] },
        { la: 'certāmen',
          answer: { la: 'certāmen', scene: SC.v_certamen },
          options: [{ la: 'certāmen', scene: SC.v_certamen },
                    { la: 'praemium', scene: SC.v_praemium },
                    { la: 'honōrat', scene: SC.v_honorat }] },
        { la: 'honōrat',
          answer: { la: 'honōrat', scene: SC.v_honorat },
          options: [{ la: 'honōrat', scene: SC.v_honorat },
                    { la: 'praemium', scene: SC.v_praemium },
                    { la: 'certāmen', scene: SC.v_certamen },
                    { la: 'corōna', scene: SC.v_corona }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'praemium', scene: SC.v_praemium },
            { la: 'certāmen', scene: SC.v_certamen },
            { la: 'Acestēs',  scene: SC.v_acestes },
            { la: 'vincit',   scene: SC.v_vincit },
            { la: 'honōrat',  scene: SC.v_honorat },
            { la: 'corōna',   scene: SC.v_corona }
          ],
          scrambles: [
            { la: 'Acestēs hospitēs laetus accipit.',   scene: SC.a17_acestes },
            { la: 'Fīlius sepulcrum patris honōrat.',   scene: SC.a17_honorat },
            { la: 'Serpēns dapēs gustat.',              scene: SC.a17_serpens },
            { la: 'Omnēs vincere cupiunt.',             scene: SC.a17_cupiunt }
          ]
        },
        /* CORRIGE: two of the five put the intruder inside an
           accūsātīvus cum īnfīnītīvō or a passive, where the ending is
           the only thing that can be read to find it. */
        corrige: [
          { words: ['Aenēās', 'patrem', 'suum', 'ā', 'deīs', 'honōrāre', 'putat.'], wrong: 5,
            options: ['honōrārī', 'honōrat', 'honōrant'], correct: 0, scene: SC.a17_mirantur },
          { words: ['Praemia', 'in', 'mediō', 'pōnitur.'], wrong: 3,
            options: ['pōnuntur.', 'pōnere.', 'pōnēbat.'], correct: 0, scene: SC.a17_praemia },
          { words: ['Quī', 'vincit', 'praemium', 'honōrat.'], wrong: 3,
            options: ['accipit.', 'pōnit.', 'gustat.'], correct: 0, scene: SC.a17_cupiunt },
          { words: ['Fīlius', 'sepulcrum', 'patris', 'vincit.'], wrong: 3,
            options: ['honōrat.', 'accipit.', 'indīcit.'], correct: 0, scene: SC.a17_honorat },
          { words: ['Nēmō', 'sine', 'praemium', 'discēdet.'], wrong: 2,
            options: ['praemiō', 'praemia', 'praemiī'], correct: 0, scene: SC.a17_omnibus }
        ],
        comple: [
          { text: 'Fīlius sepulcrum patris ___.',
            options: ['honōrat', 'vincit', 'accipit'], correct: 0, scene: SC.a17_honorat },
          { text: 'Nōnō diē ___ erunt.',
            options: ['certāmina', 'certāmen', 'certāminis'], correct: 0, scene: SC.a17_indicit },
          { text: '___ in mediō pōnuntur.',
            options: ['Praemia', 'Praemium', 'Praemiō'], correct: 0, scene: SC.a17_praemia },
          { text: 'Quī ___ praemium accipit.',
            options: ['vincit', 'vincunt', 'vincere'], correct: 0, scene: SC.a17_cupiunt },
          { text: 'Nēmō sine praemi___ discēdet.',
            options: ['ō', 'um', 'a'], correct: 0, scene: SC.a17_omnibus },
          { text: 'Aenēās patrem ā deīs ___ putat.',
            options: ['honōrārī', 'honōrat', 'honōrāre'], correct: 0, scene: SC.a17_mirantur }
        ]
      }
    },

    /* ============ a18 — CERTĀMEN NĀVIUM ============
       fons Aen. 5,114–285. Sport, told as sport: four ships, one rock,
       a helmsman who is too careful and one who is not careful enough,
       and a finish decided by a prayer. It is the liber's happiest
       capitulum and the one the closing quotation comes from.
       B RATING: Sergestus' ship strikes the rock and BREAKS ITS OARS —
       and the next sentence is *nēmō tamen laeditur*, with the crew
       working the ship free by hand. Vergil's Menoetēs, thrown
       overboard by Gyās and swimming ashore (5,172–182), IS OMITTED:
       this track has never put a man in the water (al1's charter) and
       will not start for a joke.
       MISSING ART: no oar prop (the `ship` actor's own `oars: true`
       does the work) and no turning-post (the rock is `mountain` at
       0.55–0.62 standing in water). `mēta` and `puppis` are glossed
       context words — and `puppis = nāvis` is one more piece of poetic
       diction pre-taught by the charter's own device.
       OMITTED for the cap: the catalogue of crews and ancestors
       (5,116–123), Cloanthus' vow in full (5,235–238), the prize
       list in full (5,244–267). */
    {
      id: 'a18',
      titulus: 'Certāmen Nāvium',
      icon: '🚣⛵',
      numerus: 'XVIII',
      pos: { x: 0.72, y: 0.70 },
      fons: 'Aen. 5,114–285',
      vocab: [
        { la: 'rēmus',       scene: SC.v_remus,       pars: 'nomen' },
        { la: 'saxum',       scene: SC.v_saxum,       pars: 'nomen' },
        { la: 'gubernātor',  scene: SC.v_gubernator,  pars: 'nomen' },
        { la: 'celer',       scene: SC.v_celer,       pars: 'adiectivum' }
      ],
      story: [
        /* Aen. 5,114–123 */
        { la: 'Prīmum certāmen nāvium est. Quattuor nāvēs ēliguntur, quārum ducēs Gyās, Cloanthus, Mnēstheus, Sergestus sunt.',
          scene: SC.a18_quattuor },

        /* Aen. 5,124–131 */
        { la: 'In mediō marī saxum stat, quod mēta certāminis erit: id saxum omnēs circumīre dēbent.',
          scene: SC.a18_meta,
          nova: [{ w: 'saxum', e: '🪨', g: 'lapis magnus; saxum in marī ē fluctibus surgit' },
                 { w: 'mēta', e: '🏁', g: 'signum quod circumīre aut tangere dēbēs' }] },

        { la: 'Nautae in nāvibus sedent, et rēmus in manū cuiusque est; rēmīs enim, nōn vēlīs, hoc certāmen fīet.',
          scene: SC.a18_remi,
          nova: [{ w: 'rēmus', e: '🚣', g: 'lignum longum quō nāvis per aquam movētur' }] },

        { la: 'In puppī gubernātor stat et nāvem regit.',
          scene: SC.a18_gubernator,
          nova: [{ w: 'gubernātor', e: '👤', g: 'quī nāvem regit et viam eī mōnstrat' },
                 { w: 'puppis', e: '🚢', g: 'pars nāvis posterior; apud poētās puppis = nāvis tōta' }] },

        /* Aen. 5,139–147 */
        { la: 'Signum datur: statim omnēs rēmīs mare percutiunt, et nāvēs celerēs prōsiliunt.',
          scene: SC.a18_incipit,
          nova: [{ w: 'celer', e: '➡', g: 'quī celeriter it; ↔ tardus' }] },

        /* Aen. 5,151–158 */
        { la: 'Gyās prīmus est; sed gubernātor eius saxum nimis timet et longē circum id nāvigat.',
          scene: SC.a18_gyas },

        /* Aen. 5,167–171 */
        { la: 'Cloanthus interim propius saxum tenet et celerior fit: brevior enim via eius est.',
          scene: SC.a18_cloanthus },

        /* Aen. 5,202–209, B-RATED: oars break, nobody does */
        { la: 'Sergestus autem nimis propē venit: nāvis eius in saxō haeret, et rēmī franguntur.',
          scene: SC.a18_sergestus,
          nova: [{ w: 'frangit', e: '💢', g: 'in partēs dīvidit: rēmus frāctus iam nōn valet' }] },

        { la: 'Nēmō tamen laeditur. Sociī nāvem manibus solvunt et rēmīs paucīs lentē redeunt.',
          scene: SC.a18_nemolaeditur },

        /* Aen. 5,189–197 */
        { la: 'Mnēstheus sociōs hortātur: "Nunc, nunc rēmīs incumbite, virī! Ultimī esse nōlīte!"',
          scene: SC.a18_hortatur },

        { la: 'Duae nāvēs celerēs ad fīnem contendunt: Mnēstheī et Cloanthī.',
          scene: SC.a18_contendunt },

        /* Aen. 5,232–243 */
        { la: 'Tum Cloanthus deōs maris ōrat et dōna prōmittit; deī nāvem eius manū premunt et ad lītus dūcunt.',
          scene: SC.a18_orat },

        { la: 'Sīc Cloanthus vincit et prīmum praemium accipit; celer fuit, sed etiam deōs ōrāvit.',
          scene: SC.a18_vincit },

        /* Aen. 5,244–285 */
        { la: 'Aenēās omnēs corōnat: etiam Sergestus dōnum accipit, quia nāvem suam et sociōs servāvit.',
          scene: SC.a18_praemia },

        { la: 'Memoriā tenē: nāvis celer vincit, sed gubernātor prūdēns saxum vītat; et in lūdīs Aenēae nēmō sine dōnō discēdit.',
          scene: SC.a18_memoria,
          ttsText: 'Navis celer vincit, sed gubernator prudens saxum vitat; et in ludis Aeneae nemo sine dono discedit.' }
      ],
      ludus: {
        words: [
          { la: 'rēmus',      scene: SC.v_remus,      emoji: '🚣' },
          { la: 'saxum',      scene: SC.v_saxum,      emoji: '🪨' },
          { la: 'gubernātor', scene: SC.v_gubernator, emoji: '👤' },
          { la: 'celer',      scene: SC.v_celer,      emoji: '➡' },
          { la: 'praemium',   scene: SC.v_praemium,   emoji: '🏅' },
          { la: 'corōna',     scene: SC.v_corona,     emoji: '👑' }
        ]
      },
      /* SONUS: every card in this capitulum but `saxum` contains a
         ship, so each set holds AT MOST ONE of rēmus / celer /
         gubernātor, and the other slots are filled from a17 and a19,
         whose cards stand on dry ground. */
      sonus: [
        { la: 'saxum',
          answer: { la: 'saxum', scene: SC.v_saxum },
          options: [{ la: 'saxum', scene: SC.v_saxum },
                    { la: 'praemium', scene: SC.v_praemium },
                    { la: 'rēmus', scene: SC.v_remus }] },
        { la: 'rēmus',
          answer: { la: 'rēmus', scene: SC.v_remus },
          options: [{ la: 'rēmus', scene: SC.v_remus },
                    { la: 'saxum', scene: SC.v_saxum },
                    { la: 'praemium', scene: SC.v_praemium },
                    { la: 'corōna', scene: SC.v_corona }] },
        { la: 'gubernātor',
          answer: { la: 'gubernātor', scene: SC.v_gubernator },
          options: [{ la: 'gubernātor', scene: SC.v_gubernator },
                    { la: 'saxum', scene: SC.v_saxum },
                    { la: 'corōna', scene: SC.v_corona }] },
        { la: 'celer',
          answer: { la: 'celer', scene: SC.v_celer },
          options: [{ la: 'celer', scene: SC.v_celer },
                    { la: 'saxum', scene: SC.v_saxum },
                    { la: 'praemium', scene: SC.v_praemium },
                    { la: 'Acestēs', scene: SC.v_acestes }] }
      ],
      overrides: {
        aenigmata: {
          /* rēmus is the ONE ship card on the grid; celer and
             gubernātor stay off it for the same reason they stay out
             of each other's SONUS sets. */
          pairs: [
            { la: 'saxum',    scene: SC.v_saxum },
            { la: 'rēmus',    scene: SC.v_remus },
            { la: 'praemium', scene: SC.v_praemium },
            { la: 'corōna',   scene: SC.v_corona },
            { la: 'certāmen', scene: SC.v_certamen },
            { la: 'vincit',   scene: SC.v_vincit }
          ],
          scrambles: [
            { la: 'In mediō marī saxum stat.',        scene: SC.a18_meta },
            { la: 'Nautae rēmīs mare percutiunt.',    scene: SC.a18_incipit },
            { la: 'Gubernātor in puppī stat.',        scene: SC.a18_gubernator },
            { la: 'Cloanthus prīmum praemium accipit.', scene: SC.a18_vincit }
          ]
        },
        corrige: [
          { words: ['In', 'mediō', 'marī', 'saxum', 'stant.'], wrong: 4,
            options: ['stat.', 'stāre.', 'stābant.'], correct: 0, scene: SC.a18_meta },
          { words: ['Rēmus', 'in', 'manum', 'cuiusque', 'est.'], wrong: 2,
            options: ['manū', 'manūs', 'manuī'], correct: 0, scene: SC.a18_remi },
          { words: ['Gubernātor', 'in', 'puppī', 'sedet', 'et', 'nāvem', 'frangit.'], wrong: 6,
            options: ['regit.', 'ōrat.', 'vincit.'], correct: 0, scene: SC.a18_gubernator },
          { words: ['Nāvēs', 'celerēs', 'saxum', 'circumīre', 'dēbet.'], wrong: 4,
            options: ['dēbent.', 'dēbēre.', 'dēbēbat.'], correct: 0, scene: SC.a18_meta },
          { words: ['Sergestī', 'nāvis', 'in', 'saxō', 'haeret,', 'et', 'rēmī', 'vincunt.'], wrong: 7,
            options: ['franguntur.', 'frangunt.', 'frāctus.'], correct: 0, scene: SC.a18_sergestus }
        ],
        comple: [
          { text: 'In mediō marī ___ stat.',
            options: ['saxum', 'saxō', 'saxī'], correct: 0, scene: SC.a18_meta },
          { text: '___ in manū cuiusque est.',
            options: ['Rēmus', 'Rēmum', 'Rēmō'], correct: 0, scene: SC.a18_remi },
          { text: 'In puppī ___ stat et nāvem regit.',
            options: ['gubernātor', 'gubernātōrem', 'gubernātōris'], correct: 0, scene: SC.a18_gubernator },
          { text: 'Nāvēs celer___ prōsiliunt.',
            options: ['ēs', 'em', 'is'], correct: 0, scene: SC.a18_incipit },
          { text: 'Nāvis in saxō haeret, et rēmī ___.',
            options: ['franguntur', 'frangunt', 'frangere'], correct: 0, scene: SC.a18_sergestus },
          { text: 'Cloanthus prīmum ___ accipit.',
            options: ['praemium', 'praemiō', 'praemiī'], correct: 0, scene: SC.a18_vincit }
        ]
      }
    },

    /* ============ a19 — CERTĀMEN CURSŪS ============
       fons Aen. 5,286–361. The foot race, and the introduction of the
       two friends the track will need in Liber IX — IN FRIENDSHIP, and
       in nothing else. Vergil's own words for them are the ones this
       capitulum keeps: *Euryalus fōrmā īnsignis vīridīque iuventā, /
       Nīsus amōre piō puerī* (5,295–296), rendered as `Nīsus eum amōre
       piō amat` — the same `pius` the whole track is built on.
       THE SLIP, and what is dropped with it: Vergil has Nīsus go down
       in the blood and offal of the sacrifice (5,328–333). This file
       has *in locō lūbricō lābitur et cadit*. Registered as an
       adaptation; the slip is Vergil's, the ground is not.
       What is NOT dropped is what he does next: he trips Salius so his
       friend can win. The liber does not hide it (*Salium impedit*),
       and it does not moralise; it lets Aenēās do what Vergil has him
       do — give everybody a prize, laugh, and let the quarrel end.
       MISSING ART: no helmet and no quiver props, so the third prize
       is an `urna`; and no shield-prop that reads as a gift, so Nīsus'
       consolation prize (Didymaon's shield, 5,359–361) is a `corōna`.
       OMITTED: the catalogue of runners (5,294–302) beyond the three
       who matter, and Diōrēs' claim (5,345–347). */
    {
      id: 'a19',
      titulus: 'Certāmen Cursūs',
      icon: '🏃🤝',
      numerus: 'XIX',
      pos: { x: 0.27, y: 0.52 },
      fons: 'Aen. 5,286–361',
      vocab: [
        { la: 'cursus',  scene: SC.v_cursus,  pars: 'nomen' },
        { la: 'amīcus',  scene: SC.v_amicus,  pars: 'nomen' },
        { la: 'iuvenis', scene: SC.v_iuvenis, pars: 'nomen' },
        { la: 'corōna',  scene: SC.v_corona,  pars: 'nomen' },
        { la: 'pellis',  scene: SC.v_pellis,  pars: 'nomen' },
        { la: 'equus',   scene: SC.v_equus,   pars: 'nomen' },
        { la: 'cadit',   scene: SC.v_cadit,   pars: 'verbum' }
      ],
      story: [
        /* Aen. 5,286–290 */
        { la: 'Secundum certāmen cursūs est: quī celerrimē currit, vincit.',
          scene: SC.a19_cursus,
          nova: [{ w: 'cursus', e: '🏃', g: 'cum hominēs pedibus certant, uter celerius currat' }] },

        { la: 'Ad cursum multī iuvenēs veniunt, Trōiānī et Siculī; senēs spectant, iuvenēs currunt.',
          scene: SC.a19_iuvenes,
          nova: [{ w: 'iuvenis', e: '👤', g: 'homō iam nōn puer, nōndum senex' }] },

        /* Aen. 5,294–296 — the friendship, in Vergil's own terms */
        { la: 'Inter eōs Nīsus et Euryalus stant, duo amīcī.',
          scene: SC.a19_amici,
          nova: [{ w: 'amīcus', e: '🤝', g: 'quī alium amat et eī fidēlis est' },
                 { w: 'Nīsus', e: '👤', g: 'iuvenis Trōiānus, amīcus Euryalī' },
                 { w: 'Euryalus', e: '👤', g: 'iuvenis Trōiānus, amīcus Nīsī' }] },

        { la: 'Euryalus fōrmā īnsignis est et flōre iuventae; Nīsus eum amōre piō amat.',
          scene: SC.a19_amici },

        { la: 'Amīcī semper ūnā sunt: ūnā in lūdīs, ūnā posteā in bellō.',
          scene: SC.a19_amici },

        /* Aen. 5,306–314 */
        { la: 'Aenēās praemia ostendit: omnibus corōna, prīmō equus, secundō pellis leōnis, tertiō urna pulchra.',
          scene: SC.a19_praemia,
          nova: [{ w: 'corōna', e: '👑', g: 'flōrēs aut aurum quae in capite victōris pōnuntur' },
                 { w: 'pellis', e: '🦁', g: 'vestis ex tergō animālis facta; pellis leōnis magnum praemium est' },
                 { w: 'equus', e: '🐎', g: 'equus vīvus, praemium prīmī' }] },

        /* Aen. 5,315–323 */
        { la: 'Signum datur, et iuvenēs currunt: Nīsus prīmus est, longē ante omnēs; post eum Salius, tum Euryalus.',
          scene: SC.a19_currunt },

        /* Aen. 5,328–333, B-RATED: the slip, without the blood */
        { la: 'Sed prope fīnem cursūs Nīsus in locō lūbricō lābitur et cadit.',
          scene: SC.a19_cadit,
          nova: [{ w: 'cadit', e: '⬇', g: 'in terram it; ↔ surgit' },
                 { w: 'lūbricus', e: '⬇', g: 'ubi pēs nōn stat: locus lūbricus est' }] },

        { la: 'Cadēns tamen amīcum suum nōn oblīvīscitur: Salium impedit, et Euryalus prīmus ad fīnem venit.',
          scene: SC.a19_cadit },

        /* Aen. 5,334–345 */
        { la: 'Euryalus vincit et equum accipit. Salius autem clāmat: "Iniūria est! Ego prīmus eram!"',
          scene: SC.a19_vincit },

        { la: 'Aenēās rīdet et respondet: "Praemia manent ut sunt; sed etiam tibi dōnum dabō."',
          scene: SC.a19_salius },

        /* Aen. 5,351–352 */
        { la: 'Et Saliō pellem leōnis ingentem dat; Salius pellem accipit et tacet.',
          scene: SC.a19_pellis },

        /* Aen. 5,353–361 — Didymaon's shield → a corōna (see header) */
        { la: 'Nīsus quoque, terrā adhūc sordidus, dōnum petit; et rīdēns corōnam pulcherrimam accipit. Corōna enim omnibus dēbētur.',
          scene: SC.a19_corona },

        { la: 'Euryalus amīcum suum spectat et equum eī mōnstrat: "Tuus equus est," inquit, "nam tū mē vīcistī."',
          scene: SC.a19_equus },

        { la: 'Sīc omnēs rīdent, et īra nūlla manet: certāmen cursūs sine īrā fīnītur.',
          scene: SC.a19_rident },

        { la: 'Memoriā tenē: Nīsus cadit, sed amīcum servat. In lūdīs Aenēae amīcitia maior est quam victōria.',
          scene: SC.a19_memoria,
          ttsText: 'Nisus cadit, sed amicum servat. In ludis Aeneae amicitia maior est quam victoria.' }
      ],
      ludus: {
        words: [
          { la: 'cursus',  scene: SC.v_cursus,  emoji: '🏃' },
          { la: 'amīcus',  scene: SC.v_amicus,  emoji: '🤝' },
          { la: 'corōna',  scene: SC.v_corona,  emoji: '👑' },
          { la: 'pellis',  scene: SC.v_pellis,  emoji: '🦁' },
          { la: 'equus',   scene: SC.v_equus,   emoji: '🐎' },
          { la: 'cadit',   scene: SC.v_cadit,   emoji: '⬇' }
        ]
      },
      /* SONUS: `cursus`, `amīcus`, `iuvenis` and `cadit` are all the
         same two young men on the same bare ground, so no two of them
         are ever offered together. `corōna`, `pellis` and `equus` are
         three unmistakable objects and carry the sets — and `corōna`
         is never offered against a17's `praemium`, whose table has a
         crown on it. */
      sonus: [
        { la: 'equus',
          answer: { la: 'equus', scene: SC.v_equus },
          options: [{ la: 'equus', scene: SC.v_equus },
                    { la: 'pellis', scene: SC.v_pellis },
                    { la: 'corōna', scene: SC.v_corona }] },
        { la: 'pellis',
          answer: { la: 'pellis', scene: SC.v_pellis },
          options: [{ la: 'pellis', scene: SC.v_pellis },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'corōna', scene: SC.v_corona },
                    { la: 'cursus', scene: SC.v_cursus }] },
        { la: 'corōna',
          answer: { la: 'corōna', scene: SC.v_corona },
          options: [{ la: 'corōna', scene: SC.v_corona },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'cadit', scene: SC.v_cadit }] },
        { la: 'cadit',
          answer: { la: 'cadit', scene: SC.v_cadit },
          options: [{ la: 'cadit', scene: SC.v_cadit },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'pellis', scene: SC.v_pellis },
                    { la: 'saxum', scene: SC.v_saxum }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'equus',   scene: SC.v_equus },
            { la: 'pellis',  scene: SC.v_pellis },
            { la: 'corōna',  scene: SC.v_corona },
            { la: 'cursus',  scene: SC.v_cursus },
            { la: 'amīcus',  scene: SC.v_amicus },
            { la: 'cadit',   scene: SC.v_cadit }
          ],
          scrambles: [
            { la: 'Multī iuvenēs ad cursum veniunt.',   scene: SC.a19_iuvenes },
            { la: 'Nīsus prope fīnem cadit.',           scene: SC.a19_cadit },
            { la: 'Euryalus prīmus equum accipit.',     scene: SC.a19_vincit },
            { la: 'Aenēās Saliō pellem dat.',           scene: SC.a19_pellis }
          ]
        },
        corrige: [
          { words: ['Nīsus', 'prope', 'fīnem', 'cursūs', 'surgit.'], wrong: 4,
            options: ['cadit.', 'vincit.', 'currit.'], correct: 0, scene: SC.a19_cadit },
          { words: ['Multī', 'iuvenēs', 'ad', 'cursum', 'venit.'], wrong: 4,
            options: ['veniunt.', 'venīre.', 'veniēbat.'], correct: 0, scene: SC.a19_iuvenes },
          { words: ['Aenēās', 'Salius', 'pellem', 'leōnis', 'dat.'], wrong: 1,
            options: ['Saliō', 'Salium', 'Saliī'], correct: 0, scene: SC.a19_pellis },
          { words: ['Euryalus', 'vincit', 'et', 'equus', 'accipit.'], wrong: 3,
            options: ['equum', 'equō', 'equī'], correct: 0, scene: SC.a19_vincit },
          { words: ['Nīsus', 'amīcum', 'suum', 'nōn', 'cadit.'], wrong: 4,
            options: ['oblīvīscitur.', 'accipit.', 'currit.'], correct: 0, scene: SC.a19_cadit }
        ],
        comple: [
          { text: 'Secundum certāmen ___ est.',
            options: ['cursūs', 'cursum', 'cursuī'], correct: 0, scene: SC.a19_cursus },
          { text: 'Multī ___ ad cursum veniunt.',
            options: ['iuvenēs', 'iuvenem', 'iuvenis'], correct: 0, scene: SC.a19_iuvenes },
          { text: 'Nīsus prope fīnem ___.',
            options: ['cadit', 'cadunt', 'cadere'], correct: 0, scene: SC.a19_cadit },
          { text: 'Euryalus vincit et ___ accipit.',
            options: ['equum', 'equus', 'equō'], correct: 0, scene: SC.a19_vincit },
          { text: 'Aenēās Saliō ___ leōnis dat.',
            options: ['pellem', 'pellis', 'pelle'], correct: 0, scene: SC.a19_pellis },
          { text: 'Nīsus rīdēns ___ pulcherrimam accipit.',
            options: ['corōnam', 'corōna', 'corōnae'], correct: 0, scene: SC.a19_corona }
        ]
      }
    },

    /* ============ a20 — NĀVĒS ĀRDENTĒS ============
       fons Aen. 5,604–778. The liber's last capitulum, and therefore
       the one that carries VERBA VERGILIĪ IPSĪUS. It carries TWO
       quotations, in the two modes the charter allows:
         · INLINE, 5,709, at the moment old Nautēs says it, with the
           whole of it pre-taught in the prose of the page before;
         · CLOSING, 5,231, brought back from a18's boat race with
           a18's own scene under it, because it is the one line in the
           Aenēid that is about the reader of a learning app. The frame
           page says so in Latin.
       B RATING: nobody is hurt, and the text says so — *nēmō laesus
       est: nūlla māter, nūllus puer, nūllus nauta*. The women who fire
       the ships are not villains and are not punished: they are
       `fessae maris`, a boy shouting stops them, they hide in the
       woods, and the liber ends by GIVING THEM A CITY and calling them
       `laetae`.
       OMITTED: Iris in the shape of Beroē (5,606–640) — the goddess
       acts through Iūnō's will and no disguise is needed for the arc;
       Iuppiter's thunderbolt language in Aenēās' prayer (5,691–693 —
       *si mereor, demitte morti* is a man asking to be killed, and
       this file does not put that sentence in a child's mouth);
       Palinūrus (5,779–871), which belongs with Liber VI's opening and
       is a death at sea this liber does not need. */
    {
      id: 'a20',
      titulus: 'Nāvēs Ārdentēs',
      icon: '🔥🌧',
      numerus: 'XX',
      pos: { x: 0.71, y: 0.33 },
      fons: 'Aen. 5,604–778 (+ 5,709 · 5,231)',
      vocab: [
        { la: 'Iuppiter', scene: SC.v_iuppiter, pars: 'nomen' },
        { la: 'imber',    scene: SC.v_imber,    pars: 'nomen' },
        { la: 'condit',   scene: SC.v_condit,   pars: 'verbum' },
        { la: 'remanet',  scene: SC.v_remanet,  pars: 'verbum' }
      ],
      story: [
        /* Aen. 5,604–609 */
        { la: 'Dum iuvenēs lūdunt, Iūnō, quae Trōiānīs adhūc īrāta est, novum cōnsilium capit.',
          scene: SC.a20_iuno },

        /* Aen. 5,613–617 */
        { la: 'Mātrēs Trōiānae in lītore sedent et nāvēs spectant: septem annōs iam errant, et eās maris taedet.',
          scene: SC.a20_matres,
          nova: [{ w: 'taedet', e: '😖', g: 'cum quis rem diū tolerātam ferre iam nōn vult' }] },

        { la: '"Cūr nōn hīc manēmus?" inquiunt. "Hīc urbs est, hīc Acestēs rēx, hīc pāx."',
          scene: SC.a20_dicunt },

        /* Aen. 5,641–663 */
        { la: 'Tum, Iūnōne suādente, ignem in nāvēs iaciunt: quattuor nāvēs ārdent.',
          scene: SC.a20_ignis },

        /* Aen. 5,667–674 */
        { la: 'Fūmus in caelum surgit. Ascanius, quī equō lūdēbat, prīmus advolat et clāmat: "Quid facitis? Nōn hostium, sed vestrās nāvēs ūritis!"',
          scene: SC.a20_ascanius },

        { la: 'Mātrēs, quasi ē somniō excitātae, in silvās fugiunt et sē cēlant; nēminem laedunt, ā nēmine laeduntur.',
          scene: SC.a20_fugiunt },

        /* Aen. 5,685–692, B-RATED: the prayer without the thunderbolt */
        { la: 'Sed ignis nōn cessat. Tum Aenēās manūs ad caelum tollit et Iovem ōrat.',
          scene: SC.a20_orat },

        { la: '"Iuppiter omnipotēns," inquit, "sī pietās mea tibi cāra est, nāvēs Trōiānās servā!"',
          scene: SC.a20_iuppiter,
          nova: [{ w: 'Iuppiter', e: '🦅', g: 'rēx deōrum, pater deōrum et hominum; avis eius aquila est, ut pāvō Iūnōnis' }] },

        /* Aen. 5,693–699 */
        { la: 'Vix haec dīcit, cum imber ingēns dē caelō cadit: nūbēs nigrae aquam multam fundunt.',
          scene: SC.a20_imber,
          nova: [{ w: 'imber', e: '🌧', g: 'aqua multa quae dē nūbibus cadit' }] },

        { la: 'Imber ignem exstinguit. Quattuor nāvēs āmissae sunt, cēterae salvae; et imber ipse Iovis dōnum fuit.',
          scene: SC.a20_exstinguit },

        { la: 'Nēmō laesus est: nūlla māter, nūllus puer, nūllus nauta. Iuppiter enim precēs piī virī audīvit.',
          scene: SC.a20_salvi },

        /* Aen. 5,700–703 */
        { la: 'Aenēās tamen dubitat: "Manēbimusne hīc, an Ītaliam petēmus?" Nescit enim quid fāta velint.',
          scene: SC.a20_dubitat },

        /* Aen. 5,704–718 */
        { la: 'Tum Nautēs senex, vir sapiēns, cōnsilium dat: "Fessōs hīc relinque; fortēs tēcum dūc."',
          scene: SC.a20_nautes,
          nova: [{ w: 'Nautēs', e: '👴', g: 'senex Trōiānus, cōnsiliō sapiēns' }] },

        { la: 'Et addit: "Nāte deā, fāta nōs dūcunt; nōn omnia contrā fāta possumus. Fāta sequāmur!"',
          scene: SC.a20_nautes },

        /* ---- VERBA VERGILIĪ (inline) — Aen. 5,709, quoted whole ---- */
        { la: 'Haec Nautēs apud Vergilium ipsum dīcit. Audī versum Vergiliī:',
          scene: SC.a20_vergilius },

        { la: 'nāte deā, quō fāta trahunt retrahuntque sequāmur;',
          scene: SC.a20_versusNautes,
          ttsText: 'nate dea, quo fata trahunt retrahuntque sequamur;',
          nova: [{ w: 'nāte deā', e: '👤', g: 'vocātīvus: "ō fīlī deae" — Aenēās enim Veneris fīlius est' },
                 { w: 'quō', e: '🧭', g: '= in quam partem' },
                 { w: 'trahunt', e: '➡', g: 'trahere = ad sē dūcere' },
                 { w: 'retrahunt', e: '⬅', g: 're-trahere = retrō dūcere: fāta nōs nunc hūc nunc illūc dūcunt' },
                 { w: 'sequāmur', e: '🚶', g: 'subiūnctīvus hortātīvus: "sequī dēbēmus"' }] },

        { la: 'Id est: quōcumque fāta nōs dūcunt aut redūcunt, sequī dēbēmus.',
          scene: SC.a20_versusNautes },

        /* Aen. 5,746–761 */
        { la: 'Aenēās pāret: urbem novam in Siciliā condit, quam Acestam vocat, et lēgēs eī dat.',
          scene: SC.a20_condit,
          nova: [{ w: 'condit', e: '🧱', g: 'urbem novam facit et nōmen eī dat' }] },

        { la: 'Ubi urbs condita est, mātrēs et senēs et fessī ibi remanent; laetī sunt, quia domum tandem habent.',
          scene: SC.a20_remanent,
          nova: [{ w: 'remanet', e: '🏠', g: 're-manet: cum aliī abeunt, ille manet' }] },

        /* Aen. 5,719–740 */
        { la: 'Nocte Anchīsēs pater in somniō fīliō appāret: "Ītaliam pete," inquit, "et ad Sibyllam Cūmānam venī."',
          scene: SC.a20_somnium },

        { la: 'Prīmā lūce classis vēla dat. Quī remanent in lītore urbis conditae stant et manūs tollunt; quī nāvigant respiciunt. Sīc pars remanet, pars Ītaliam petit.',
          scene: SC.a20_discessus },

        /* ---- VERBA VERGILIĪ IPSĪUS — Aen. 5,231 ---- */
        { la: 'Ūnum tamen versum huius librī omnēs discipulī meminērunt. In certāmine nāvium Vergilius dē nautīs quī rēmīs contendēbant hoc scrīpsit:',
          scene: SC.a20_vergilius },

        { la: 'hōs successus alit: possunt, quia posse videntur.',
          scene: SC.a18_contendunt,
          ttsText: 'hos successus alit: possunt, quia posse videntur.',
          nova: [{ w: 'hōs', e: '👥', g: '= hōs nautās, quī iam propē victōriam sunt' },
                 { w: 'successus', e: '➡', g: 'cum rēs bene prōcēdit et melius fit' },
                 { w: 'alit', e: '➕', g: 'cibum dat et auget: successus animōs alit' },
                 { w: 'possunt', e: '💪', g: 'posse = valēre, facere posse' },
                 { w: 'videntur', e: '👀', g: 'vidērī = sibi et aliīs vidērī: "quia sē posse putant"' }] },

        { la: 'Id est: bonus exitus animōs eōrum alit; possunt, quia sē posse crēdunt.',
          scene: SC.a18_contendunt },

        { la: 'Versūs memorābilēs: "possunt, quia posse videntur." Hoc et in lūdīs et in scholā vērum est.',
          scene: SC.a20_memoria,
          ttsText: 'Possunt, quia posse videntur. Hoc et in ludis et in schola verum est.' }
      ],
      ludus: {
        words: [
          { la: 'Iuppiter', scene: SC.v_iuppiter, emoji: '🦅' },
          { la: 'imber',    scene: SC.v_imber,    emoji: '🌧' },
          { la: 'condit',   scene: SC.v_condit,   emoji: '🧱' },
          { la: 'remanet',  scene: SC.v_remanet,  emoji: '🏠' },
          { la: 'rēmus',    scene: SC.v_remus,    emoji: '🚣' },
          { la: 'corōna',   scene: SC.v_corona,   emoji: '👑' }
        ]
      },
      /* SONUS: `imber` and `remanet` both stand on water, so they are
         never offered together; `condit` and `remanet` both carry a
         crowd and are likewise kept apart. `Iuppiter` (the only figure
         in the track with an eagle beside him) is unmistakable and
         carries the sets. */
      sonus: [
        { la: 'Iuppiter',
          answer: { la: 'Iuppiter', scene: SC.v_iuppiter },
          options: [{ la: 'Iuppiter', scene: SC.v_iuppiter },
                    { la: 'imber', scene: SC.v_imber },
                    { la: 'condit', scene: SC.v_condit }] },
        { la: 'imber',
          answer: { la: 'imber', scene: SC.v_imber },
          options: [{ la: 'imber', scene: SC.v_imber },
                    { la: 'Iuppiter', scene: SC.v_iuppiter },
                    { la: 'condit', scene: SC.v_condit },
                    { la: 'corōna', scene: SC.v_corona }] },
        { la: 'condit',
          answer: { la: 'condit', scene: SC.v_condit },
          options: [{ la: 'condit', scene: SC.v_condit },
                    { la: 'imber', scene: SC.v_imber },
                    { la: 'Iuppiter', scene: SC.v_iuppiter }] },
        { la: 'remanet',
          answer: { la: 'remanet', scene: SC.v_remanet },
          options: [{ la: 'remanet', scene: SC.v_remanet },
                    { la: 'Iuppiter', scene: SC.v_iuppiter },
                    { la: 'condit', scene: SC.v_condit },
                    { la: 'pellis', scene: SC.v_pellis }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Iuppiter', scene: SC.v_iuppiter },
            { la: 'imber',    scene: SC.v_imber },
            { la: 'condit',   scene: SC.v_condit },
            { la: 'remanet',  scene: SC.v_remanet },
            { la: 'corōna',   scene: SC.v_corona },
            { la: 'equus',    scene: SC.v_equus }
          ],
          scrambles: [
            { la: 'Mātrēs in lītore sedent.',           scene: SC.a20_matres },
            { la: 'Imber ingēns dē caelō cadit.',       scene: SC.a20_imber },
            { la: 'Aenēās urbem novam condit.',         scene: SC.a20_condit },
            { la: 'Fessī in Siciliā remanent.',         scene: SC.a20_remanent }
          ]
        },
        corrige: [
          { words: ['Imber', 'ingēns', 'dē', 'caelō', 'cadunt.'], wrong: 4,
            options: ['cadit.', 'cadere.', 'cadēbant.'], correct: 0, scene: SC.a20_imber },
          { words: ['Aenēās', 'urbem', 'novam', 'in', 'Siciliā', 'remanet.'], wrong: 5,
            options: ['condit.', 'vincit.', 'ōrat.'], correct: 0, scene: SC.a20_condit },
          { words: ['Ubi', 'urbs', 'condita', 'sunt,', 'fessī', 'ibi', 'remanent.'], wrong: 3,
            options: ['est,', 'erunt,', 'esse,'], correct: 0, scene: SC.a20_remanent },
          { words: ['Nēmō', 'laesus', 'est:', 'nūlla', 'māter,', 'nūllus', 'imber.'], wrong: 6,
            options: ['nauta.', 'nautam.', 'nautae.'], correct: 0, scene: SC.a20_salvi },
          { words: ['Iuppiter', 'imbrem', 'mittit', 'et', 'nāvēs', 'condit.'], wrong: 5,
            options: ['servat.', 'ārdet.', 'remanet.'], correct: 0, scene: SC.a20_exstinguit }
        ],
        comple: [
          { text: '___ ingēns dē caelō cadit.',
            options: ['Imber', 'Imbrem', 'Imbris'], correct: 0, scene: SC.a20_imber },
          { text: 'Aenēās urbem novam in Siciliā ___.',
            options: ['condit', 'remanet', 'vincit'], correct: 0, scene: SC.a20_condit },
          { text: 'Ubi urbs condita ___, fessī ibi remanent.',
            options: ['est', 'sunt', 'esse'], correct: 0, scene: SC.a20_remanent },
          { text: 'Mātrēs et senēs in Siciliā ___.',
            options: ['remanent', 'remanet', 'remanēre'], correct: 0, scene: SC.a20_remanent },
          { text: '___ omnipotēns nāvēs Trōiānās servat.',
            options: ['Iuppiter', 'Iovem', 'Iovis'], correct: 0, scene: SC.a20_iuppiter },
          { text: 'Imber ignem ___.',
            options: ['exstinguit', 'condit', 'remanet'], correct: 0, scene: SC.a20_exstinguit }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ---------- */

  CONTENT.registerRegion({
    track: 'aeneis',
    id: 'al5',
    titulus: 'Lūdī',
    ladder: 'S12',             /* CURRICULUM §0: the whole ladder is open */
    progressId: 'al5',
    capitula: capitula,

    /* ============ PROBĀTIŌ — LŪDĪ ============
       CURRICULUM §3: "Boss per liber = probātiō themed to the liber".
       Two phases, and neither is a fight — which in THIS liber is not
       a concession but the subject: Aenēās' games are contests without
       anger, and so is the trial.

       1. ŌRDINĀ — the games sorted into what you row with and what you
          carry home. The two zones are the liber's own two halves:
          `CERTĀMEN` (rēmus, saxum, cursus, gubernātor — the things of
          the contest) against `PRAEMIUM` (praemium, pellis, corōna,
          equus — the things the contest gives away), with an actor
          badge on each that the library already owns: the `ship` they
          race and the `crown` they win.
          `items` is deliberately absent: the phase then draws from the
          whole liber's vocabulary and silently drops every word no
          category claims (js/probatio.js, zoneOf), so exactly the
          eight words below can fall and nothing else.
          The banner is short on purpose — js/probatio.js promptBanner
          is 260 px at bold 24 px, and al2's report records what a long
          one looks like clipped.
       2. SENTENTIA. Six HAND-AUTHORED items. Every gap is a picturable
          content lexeme IN THE NOMINATIVE (the form the caught card
          carries), every distractor is same-POS and wrong IN THE
          PICTURE, and every item carries syntax this liber taught:
          three ablātīvī absolūtī, a relative clause, a passive and a
          comparative.

       hp 6 + 5 = 11, seconds 45 + 55 = 100: the al2 shape, because
       this is an ōrdina liber like al2 and the two should tune alike. */
    boss: {
      id: 'b_al5',
      progressId: 'al5',
      kind: 'probatio',
      name: 'Lūdī',
      actor: 'ship',
      bg: 'sea',
      sceneY: 202,
      sceneScale: 1,
      /* legacy single-phase tuning: a client without js/probatio.js must
         still run something, and rules.php derives rule_boss_min_ms
         from these numbers (as r01/r02/l2/al1–al4 do). */
      hp: 11,
      seconds: 100,
      pos: { x: 0.37, y: 0.14 },
      phases: [
        { type: 'ordina', hp: 6, seconds: 45,
          titulus: 'LŪDĪ ET DŌNA',
          categories: [
            { label: 'CERTĀMEN', actor: 'ship',
              accept: ['rēmus', 'saxum', 'cursus', 'gubernātor'] },
            { label: 'PRAEMIUM', actor: 'crown',
              accept: ['praemium', 'pellis', 'corōna', 'equus'] }
          ] },
        { type: 'sententia', hp: 5, seconds: 55,
          items: [
            /* abl. abs. + passive: the signal is given and the thing in
               the hands moves — only one card is in a rower's hand */
            { text: 'Signō datō, ____ in manibus nautārum movētur.',
              answer: 'rēmus',
              options: ['rēmus', 'corōna', 'pellis'],
              scene: SC.a18_incipit },
            /* relative clause: what the ships must go round */
            { text: 'In mediō marī stat ____, quod nāvēs circumīre dēbent.',
              answer: 'saxum',
              options: ['saxum', 'praemium', 'cursus'],
              scene: SC.a18_meta },
            /* abl. abs.: the ship is stuck and one man still saves it */
            { text: 'Nāve haerente, ____ tamen nāvem suam servat.',
              answer: 'gubernātor',
              options: ['gubernātor', 'iuvenis', 'amīcus'],
              scene: SC.a18_sergestus },
            /* passive: what is GIVEN to the winner, not who wins */
            { text: 'Victōrī prīmō ____ datur, secundō pellis leōnis.',
              answer: 'equus',
              options: ['equus', 'saxum', 'cursus'],
              scene: SC.a19_praemia },
            /* abl. abs. + the liber's moral: who comes first when the
               fastest man is on the ground */
            { text: 'Nīsō lāpsō, ____ eius prīmus ad fīnem venit.',
              answer: 'amīcus',
              options: ['amīcus', 'gubernātor', 'iuvenis'],
              scene: SC.a19_cadit },
            /* abl. abs. again, and the god's answer to a prayer */
            { text: 'Nāvibus ārdentibus, ____ ingēns dē caelō cadit.',
              answer: 'imber',
              options: ['imber', 'corōna', 'praemium'],
              scene: SC.a20_imber }
          ] }
      ],
      /* 5 cumulative questions; every word is a vocab entry WITH a
         picture in its own capitulum (js/app.js bossWords()). All four
         capitula are represented; a19 gives two because it is the
         liber's card-heaviest. Answer key lives on the server — see
         content/_pending/a-l5.reg.json. */
      quiz: [
        { la: 'praemium', from: 'a17' },
        { la: 'rēmus',    from: 'a18' },
        { la: 'pellis',   from: 'a19' },
        { la: 'corōna',   from: 'a19' },
        { la: 'Iuppiter', from: 'a20' }
      ]
    }
  });
})();
