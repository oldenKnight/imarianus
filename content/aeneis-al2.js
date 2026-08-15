/* ============================================================
   content/aeneis-al2.js — AENĒIS · Liber II · TRŌIA  (ladder S12)
   ------------------------------------------------------------
   Aenēās' own narrative at Dīdō's table, told as GRADED PROSE, and
   closing on the picture the whole track is built around — the man
   carrying his father out of the fire:

     a5 Equus ligneus     — Aen. 2,13–56 + 2,232–249
     a6 Sinōn et Lāocoōn  — Aen. 2,40–56, 57–198, 199–233  + VERBA
                            VERGILIĪ inline (2,49, quoted whole)
     a7 Trōia ārdet       — Aen. 2,250–437
     a8 Fuga Aenēae       — Aen. 2,634–804 + VERBA VERGILIĪ IPSĪUS
                            (2,723–724)

   THE CHARTER is the one written at the head of content/aeneis-al1.js
   and, in long form, at the head of content/_ledger-aeneis.md. In
   short: PRŌVECTĪ — the whole S1–S12 ladder is open from the first
   page; what is graded is the VOCABULARY (≤10 new content cards per
   capitulum, each pictured and recycled ≥3× inside its own capitulum);
   poetic diction is pre-taught by gloss BEFORE the authentic line uses
   it; the liber's last capitulum closes with "Verba Vergiliī ipsīus".

   WHICH LINES THIS LIBER QUOTES, and why both:
     · 2,49  "quidquid id est, timeō Danaōs et dōna ferentīs."
       Quoted WHOLE, inside a6, at the exact moment Lāocoōn says it —
       exactly as Liber I quotes 1,203 inside a2. It is quotable there
       and nowhere else: the line IS the scene. Its two hard words are
       pre-taught in the prose of the page before (Graecōs timeō …
       etiam dōna ferentēs), and `dōnum` is a5's own vocabulary card,
       one capitulum earlier.
     · 2,723–724 "succēdōque onerī; dextrae sē parvus Iūlus /
       implicuit sequiturque patrem nōn passibus aequīs."
       TWO whole hexameters as the liber's closing VERBA VERGILIĪ, on
       the last page-block of a8, because the closing quotation must
       land on the liber's own picture — and this liber's picture is
       the carry. `aequīs` also pays back a1's poetic gloss (aequor =
       mare), which is the kind of echo the track exists to build.
     The famous half-line stays where the poem puts it, and the liber
     still ends on Vergil's own voice. Both are OCT/Mynors text with
     quantity marks added and NOT ONE LETTER CHANGED.

   HOW THE PEOPLE ARE DRAWN. Two armies, told apart by colour, never
   by violence: Trōiānī keep a1's terracotta (`TROIA`), Graecī are
   iron and indigo. Anchīsēs is the `patriarch` (grey, staff),
   Ascanius the `child`, Creūsa a `woman` in wine, Lāocoōn the
   `priest`. Aenēās is the same figure as in Liber I, and on the
   flight pages he is drawn with the art library's own `carry` pose,
   which renders the rider on the shoulders — the pose exists for
   precisely this scene (js/actors-person.js: "Aenēās portat Anchīsēn").

   B RATING (DESIGN §8), the whole liber:
     · The war is shields and spears FACING each other; no blow, no
       wound and no body is drawn or described anywhere.
     · LĀOCOŌN: one dignified sentence ("sacerdōs cum fīliīs perit"),
       and a STYLIZED EMBLEM for a picture — two serpents on an empty
       sea, no people on the page at all.
     · PRIAM'S END IS OMITTED ENTIRELY (Aen. 2,469–558). Aenēās sees
       that the palace cannot be saved and the narrative moves on; the
       king's death is neither shown nor told.
     · CREŪSA is lost with grief and mystery, exactly as the poem has
       her: she is missing at the gate, Aenēās goes back and calls,
       and her imāgō speaks to him kindly. Nothing is depicted.
     · Trōia burns as bgTroy already paints it: a warm glow behind the
       skyline and smoke haze, with no flame on a building.

   MISSING ART, reported not substituted (AUTHORING-BRIEF "SCENES
   FIRST"):
     · No PENĀTĒS prop. They are composed as what they physically were
       — two small robed figures standing on the household altar
       (`altar` with flame:false + two `person` at s 0.42). Registered
       in the ledger.
     · No treasure/gold prop. `aurum` is composed as gold THINGS on a
       table (`mensa` + `crown` + `urna`), and the gloss names the
       metal, not the crown.
     · No ghost/shade actor. Creūsa's imāgō is therefore never drawn:
       the page shows Aenēās alone with a speech bubble, which is
       also the most B-rated way to tell it.
     · No rope, no torch, no smoke prop (the `altar` smoke option is
         the only smoke in the library and it is used on a6's altar).

   IDS ARE DATABASE KEYS once shipped: a5…a8, progressId 'al2'
   (content/README.md §5). The file is aeneis-al2.js and not aeneis-l2.js
   for the reason set out at the head of content/aeneis-al1.js: the loader
   derives content/<track>-<region>.js, and 'l2' is Historia's on the
   server's flat region map.

   Schema: content/README.md. Style: docs/LATIN-STYLE.md §3.
   ============================================================ */
(function () {
  'use strict';

  var G = 210;               /* ground line in scene space (400 × 240) */
  var SEA = 212;             /* where a figure stands on the sea scenes */

  var TROIA  = '#b3572b';    /* Trojan terracotta — a1's own colour     */
  var GOLD   = '#e0a93e';
  var FERRUM = '#8d9299';    /* Greek iron                              */
  var CAERUL = '#4d6c8a';    /* Greek indigo                            */
  var VINUM  = '#8e4257';    /* Creūsa's robe                           */
  var CANUS  = '#f4e7cd';    /* Anchīsēs' robe: old man's cream         */
  var UMBER  = '#7a4a26';

  function merge(o, opts) {
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }

  /* Aenēās — the same man as in Liber I, page for page */
  function heros(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: TROIA, mantleColor: GOLD, shield: true }, opts);
  }
  /* Aenēās carrying his father: the library's own `carry` pose, with
     Anchīsēs' colours handed to the rider it draws on the shoulders */
  function portans(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: TROIA, mantleColor: GOLD, shield: false,
                   pose: 'carry', carryRole: 'patriarch',
                   carryRobe: CANUS, carryMantle: UMBER }, opts);
  }
  function troianus(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'soldier',
                   robeColor: TROIA, mantleColor: GOLD }, opts);
  }
  function graecus(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'soldier',
                   robeColor: FERRUM, mantleColor: CAERUL }, opts);
  }
  function anchises(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'patriarch',
                   robeColor: CANUS, mantleColor: UMBER }, opts);
  }
  function ascanius(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'child',
                   robeColor: GOLD }, opts);
  }
  function creusa(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'woman',
                   robeColor: VINUM, mantleColor: CANUS }, opts);
  }
  function sacerdos(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'priest' }, opts);
  }
  function civis(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'crowd' }, opts);
  }

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ a5 · vocabulary cards ============ */

    /* Graecī: soldiers in iron and indigo, their ships behind them.
       The Trojan soldier is never in this card — the two armies are
       told apart by colour, and the card must teach that colour. */
    v_graecus:  { bg: 'sea', items: [
                  { t: 'ship', x: 322, y: 206, s: 0.75, sail: 'furled' },
                  graecus(124, G, 1.2),
                  graecus(206, G, 1.1, { flip: true })
                ] },

    /* equus: the horse ALONE on bare ground — the thing itself */
    v_equus:    { bg: 'plain', items: [
                  { t: 'woodenHorse', x: 200, y: G, s: 1.35 }
                ] },

    v_lignum:   { bg: 'forest', items: [
                  { t: 'truncus', x: 146, y: G, s: 1.2 },
                  { t: 'truncus', x: 262, y: G - 4, s: 0.95, flip: true }
                ] },

    /* dōnum: a man bringing a jar to an altar. Deliberately NOT the
       horse — the horse is `equus`, and the two must not be one card. */
    v_donum:    { bg: 'city', items: [
                  { t: 'altar',   x: 146, y: G, s: 1 },
                  { t: 'amphora', x: 232, y: G, s: 0.85 },
                  civis(308, G, 1.1, { pose: 'point', flip: true })
                ] },

    v_castra:   { bg: 'sea', items: [
                  { t: 'tent', x: 122, y: G, s: 0.9 },
                  { t: 'tent', x: 274, y: G - 4, s: 0.78 },
                  { t: 'fire', x: 200, y: G, s: 0.62 }
                ] },

    /* mīrātur: the crowd and its wonder, with NOTHING to wonder at in
       the picture — the bubble is the word. (The horse would make this
       card a second `equus`.) */
    v_miratur:  { bg: 'city', items: [
                  { t: 'crowdGroup', x: 208, y: G, s: 1.15, n: 5 }
                ],
                bubbles: [{ x: 76, y: 82, w: 56, h: 42, text: '😮', kind: 'thought', tail: 'right', fs: 20 }] },

    /* relinquit: the tent still standing and the ships already gone —
       what is LEFT is the point, so nobody is on the shore */
    v_relinquit: { bg: 'sea', items: [
                  { t: 'tent', x: 92,  y: G, s: 0.85 },
                  { t: 'ship', x: 252, y: 200, s: 0.85 },
                  { t: 'ship', x: 344, y: 214, s: 0.62 }
                ] },

    v_trahit:   { bg: 'city', items: [
                  { t: 'cityWall',    x: 322, y: G, s: 0.85, open: true },
                  { t: 'woodenHorse', x: 226, y: G, s: 0.85 },
                  { t: 'crowdGroup',  x: 92,  y: G, s: 0.9, n: 4 }
                ] },

    /* latet: the same horse as `equus`, with the men shown where they
       cannot be shown — in a thought bubble. The two cards are never
       offered against each other (see the a5 SONUS note). */
    v_latet:    { bg: 'plain', items: [
                  { t: 'woodenHorse', x: 216, y: G, s: 1.15 }
                ],
                bubbles: [{ x: 76, y: 78, w: 58, h: 44, text: '👥', kind: 'thought', tail: 'right', fs: 20 }] },

    /* ============ a5 · story ============ */

    a5_bellum:  { bg: 'city', items: [
                  { t: 'cityWall', x: 316, y: G, s: 0.9 },
                  graecus(92, G, 1.15),
                  troianus(186, G, 1.1, { flip: true })
                ] },

    a5_castra:  { bg: 'sea', items: [
                  { t: 'tent', x: 112, y: G, s: 0.95 },
                  { t: 'tent', x: 236, y: G - 4, s: 0.8 },
                  { t: 'ship', x: 344, y: 208, s: 0.68, sail: 'furled' }
                ] },

    a5_consilium: { bg: 'sea', items: [
                  graecus(112, G, 1.15, { pose: 'point' }),
                  { t: 'woodenHorse', x: 284, y: G, s: 0.85 }
                ],
                bubbles: [{ x: 200, y: 60, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a5_lignum:  { bg: 'forest', items: [
                  { t: 'truncus', x: 122, y: G, s: 1.1 },
                  graecus(238, G, 1.05),
                  { t: 'tree',    x: 344, y: G, s: 0.85 }
                ] },

    a5_latent:  { bg: 'plain', items: [
                  { t: 'woodenHorse', x: 204, y: G, s: 1.2 }
                ],
                bubbles: [{ x: 78, y: 76, w: 58, h: 44, text: '👥', kind: 'thought', tail: 'right', fs: 20 }] },

    a5_relinquunt: { bg: 'sea', items: [
                  { t: 'tent', x: 84,  y: G, s: 0.8 },
                  { t: 'ship', x: 232, y: 200, s: 0.9 },
                  { t: 'ship', x: 336, y: 214, s: 0.68 }
                ] },

    a5_insula:  { bg: 'sea', items: [
                  { t: 'mountain', x: 70,  y: G, s: 0.85 },
                  { t: 'ship',     x: 258, y: 204, s: 0.8, sail: 'furled' },
                  { t: 'ship',     x: 340, y: 216, s: 0.6, sail: 'furled' }
                ] },

    a5_portae:  { bg: 'city', items: [
                  { t: 'cityWall',   x: 232, y: G, s: 1.05, open: true },
                  { t: 'crowdGroup', x: 86,  y: G, s: 0.9, n: 4 }
                ] },

    a5_litus:   { bg: 'sea', items: [
                  { t: 'tent',     x: 128, y: G, s: 0.8 },
                  { t: 'palmTree', x: 336, y: G, s: 0.8 }
                ] },

    a5_mirantur: { bg: 'city', items: [
                  { t: 'woodenHorse', x: 292, y: G, s: 0.95 },
                  { t: 'crowdGroup',  x: 112, y: G, s: 0.95, n: 5 }
                ],
                bubbles: [{ x: 200, y: 62, w: 52, h: 40, text: '😮', kind: 'thought', tail: 'right', fs: 20 }] },

    a5_disputant: { bg: 'city', items: [
                  { t: 'crowdGroup',  x: 138, y: G, s: 1, n: 5 },
                  { t: 'woodenHorse', x: 324, y: G, s: 0.68 }
                ],
                bubbles: [{ x: 214, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a5_trahunt: { bg: 'city', items: [
                  { t: 'cityWall',    x: 330, y: G, s: 0.85, open: true },
                  { t: 'woodenHorse', x: 216, y: G, s: 0.9 },
                  { t: 'crowdGroup',  x: 84,  y: G, s: 0.9, n: 4 }
                ] },

    a5_inurbe:  { bg: 'city', items: [
                  { t: 'woodenHorse', x: 196, y: G, s: 1.05 },
                  { t: 'crowdGroup',  x: 336, y: G, s: 0.72, n: 3 }
                ] },

    a5_memoria: { bg: 'city', items: [
                  { t: 'cityWall',    x: 340, y: G, s: 0.72 },
                  { t: 'woodenHorse', x: 178, y: G, s: 1.05 }
                ],
                bubbles: [{ x: 66, y: 74, w: 56, h: 42, text: '👥', kind: 'thought', tail: 'right', fs: 20 }] },

    /* ============ a6 · vocabulary cards ============ */

    v_sacerdos: { bg: 'plain', items: [
                  { t: 'temple', x: 318, y: G, s: 0.55 },
                  { t: 'altar',  x: 246, y: G, s: 0.8 },
                  sacerdos(140, G, 1.25)
                ] },

    v_ara:      { bg: 'plain', items: [
                  { t: 'altar', x: 200, y: G, s: 1.5 }
                ] },

    /* serpēns: the emblem card — the creature alone on the water, which
       is also the only picture this liber gives Lāocoōn's end */
    v_serpens:  { bg: 'sea', items: [
                  { t: 'serpent', x: 200, y: SEA, s: 1.5 }
                ] },

    v_captivus: { bg: 'troy', items: [
                  troianus(112, G, 1.05),
                  civis(200, G, 1.1, { pose: 'kneel' }),
                  troianus(290, G, 1.05, { flip: true })
                ] },

    v_hasta:    { bg: 'plain', items: [
                  troianus(200, G, 1.45, { pose: 'point', shield: false })
                ] },

    v_monet:    { bg: 'city', items: [
                  { t: 'woodenHorse', x: 306, y: G, s: 0.8 },
                  sacerdos(114, G, 1.25, { pose: 'point' })
                ],
                bubbles: [{ x: 208, y: 60, w: 50, h: 40, text: '❗', kind: 'speech', tail: 'left', fs: 24 }] },

    v_timet:    { bg: 'troy', items: [
                  { t: 'crowdGroup', x: 208, y: G, s: 1.1, n: 4 }
                ],
                bubbles: [{ x: 74, y: 80, w: 56, h: 42, text: '😨', kind: 'thought', tail: 'right', fs: 20 }] },

    v_credit:   { bg: 'city', items: [
                  civis(104, G, 1.05, { pose: 'kneel' }),
                  { t: 'crowdGroup', x: 284, y: G, s: 0.9, n: 4 }
                ],
                bubbles: [{ x: 192, y: 56, w: 46, h: 38, text: '💬', kind: 'speech', tail: 'left', fs: 19 },
                          { x: 288, y: 92, w: 44, h: 36, text: '👍', kind: 'thought', tail: 'left', fs: 18 }] },

    /* ============ a6 · story ============ */

    a6_laocoon: { bg: 'plain', items: [
                  { t: 'temple', x: 322, y: G, s: 0.6 },
                  { t: 'altar',  x: 248, y: G, s: 0.85 },
                  sacerdos(132, G, 1.25)
                ] },

    a6_currit:  { bg: 'city', items: [
                  { t: 'woodenHorse', x: 310, y: G, s: 0.8 },
                  sacerdos(104, G, 1.2, { pose: 'walk' })
                ] },

    a6_monet:   { bg: 'city', items: [
                  { t: 'woodenHorse', x: 306, y: G, s: 0.85 },
                  sacerdos(110, G, 1.25, { pose: 'point' }),
                  { t: 'crowdGroup', x: 208, y: G, s: 0.62, n: 3 }
                ],
                bubbles: [{ x: 196, y: 54, w: 50, h: 40, text: '❗', kind: 'speech', tail: 'left', fs: 24 }] },

    a6_timeo:   { bg: 'city', items: [
                  { t: 'woodenHorse', x: 316, y: G, s: 0.75 },
                  sacerdos(112, G, 1.25, { pose: 'arms-up' }),
                  { t: 'crowdGroup', x: 216, y: G, s: 0.6, n: 3 }
                ],
                bubbles: [{ x: 200, y: 52, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    /* the page that hands the reader over to Vergil — the same frame
       the track uses for every quotation: a column, and a man reciting */
    a6_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 92,  y: G, s: 0.9 },
                  sacerdos(230, G, 1.2, { pose: 'point' })
                ] },

    a6_versus:  { bg: 'city', items: [
                  { t: 'woodenHorse', x: 300, y: G, s: 0.9 },
                  { t: 'amphora',     x: 232, y: G, s: 0.6 },
                  sacerdos(108, G, 1.25, { pose: 'point' })
                ],
                bubbles: [{ x: 178, y: 54, w: 50, h: 40, text: '❗', kind: 'speech', tail: 'left', fs: 24 }] },

    a6_hasta:   { bg: 'city', items: [
                  { t: 'woodenHorse', x: 296, y: G, s: 0.95 },
                  sacerdos(112, G, 1.2, { pose: 'point', spear: true })
                ] },

    a6_noncredunt: { bg: 'city', items: [
                  sacerdos(104, G, 1.15, { pose: 'arms-up' }),
                  { t: 'crowdGroup', x: 282, y: G, s: 0.95, n: 5 }
                ],
                bubbles: [{ x: 196, y: 58, w: 48, h: 40, text: '❓', kind: 'thought', tail: 'right', fs: 22 }] },

    a6_captivus: { bg: 'troy', items: [
                  troianus(108, G, 1.05),
                  civis(196, G, 1.1, { pose: 'kneel' }),
                  troianus(286, G, 1.05, { flip: true })
                ] },

    a6_sinon:   { bg: 'city', items: [
                  civis(106, G, 1.1, { pose: 'kneel' }),
                  { t: 'crowdGroup', x: 290, y: G, s: 0.9, n: 4 }
                ],
                bubbles: [{ x: 196, y: 56, w: 52, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a6_promittit: { bg: 'city', items: [
                  civis(104, G, 1.1, { pose: 'kneel' }),
                  { t: 'woodenHorse', x: 322, y: G, s: 0.7 },
                  { t: 'crowdGroup',  x: 214, y: G, s: 0.7, n: 3 }
                ],
                bubbles: [{ x: 176, y: 54, w: 50, h: 40, text: '💬', kind: 'speech', tail: 'left', fs: 19 }] },

    a6_credunt: { bg: 'city', items: [
                  civis(102, G, 1.05, { pose: 'kneel' }),
                  { t: 'crowdGroup', x: 286, y: G, s: 0.95, n: 5 }
                ],
                bubbles: [{ x: 214, y: 88, w: 46, h: 36, text: '👍', kind: 'thought', tail: 'left', fs: 18 }] },

    /* LĀOCOŌN: the STYLIZED EMBLEM the B rating asks for. Two serpents
       on an empty sea — no man is on this page, and no page of this
       liber shows what happens to him. */
    a6_serpentes: { bg: 'sea', items: [
                  { t: 'serpent', x: 132, y: SEA, s: 1.2 },
                  { t: 'serpent', x: 276, y: SEA, s: 1, flip: true }
                ] },

    a6_ara:     { bg: 'plain', items: [
                  { t: 'temple', x: 330, y: G, s: 0.55 },
                  { t: 'altar',  x: 176, y: G, s: 1.2, smoke: true }
                ] },

    a6_trahunt: { bg: 'city', items: [
                  { t: 'cityWall',    x: 330, y: G, s: 0.85, open: true },
                  { t: 'woodenHorse', x: 214, y: G, s: 0.9 },
                  { t: 'crowdGroup',  x: 84,  y: G, s: 0.88, n: 4 }
                ] },

    a6_memoria: { bg: 'city', items: [
                  { t: 'woodenHorse', x: 304, y: G, s: 0.85 },
                  sacerdos(112, G, 1.25, { pose: 'point' })
                ],
                bubbles: [{ x: 202, y: 56, w: 50, h: 40, text: '❗', kind: 'speech', tail: 'left', fs: 24 }] },

    /* ============ a7 · vocabulary cards ============ */

    v_nox:      { bg: 'nightSky', items: [
                  { t: 'cityWall', x: 200, y: G, s: 1 }
                ] },

    v_somnium:  { bg: 'interior', items: [
                  heros(178, G, 1.15, { pose: 'sleep', shield: false })
                ],
                bubbles: [{ x: 290, y: 76, w: 58, h: 46, text: '👤', kind: 'thought', tail: 'left', fs: 22 }] },

    v_ignis:    { bg: 'plain', items: [
                  { t: 'fire', x: 200, y: G, s: 1.5 }
                ] },

    /* ārdet: the CITY on fire, which bgTroy already paints as a warm
       glow behind the skyline — two small fires give it a foreground
       and no building is ever drawn burning (DESIGN §8) */
    v_ardet:    { bg: 'troy', items: [
                  { t: 'cityWall', x: 206, y: G, s: 0.95 },
                  { t: 'fire',     x: 78,  y: G, s: 0.85 },
                  { t: 'fire',     x: 330, y: G, s: 0.7 }
                ] },

    v_clamor:   { bg: 'troy', items: [
                  { t: 'crowdGroup', x: 196, y: G, s: 1.15, n: 5 }
                ],
                bubbles: [{ x: 300, y: 62, w: 46, h: 40, text: '❗', kind: 'speech', tail: 'left', fs: 24 },
                          { x: 82,  y: 78, w: 40, h: 34, text: '❗', kind: 'speech', tail: 'right', fs: 20 }] },

    v_arma:     { bg: 'plain', items: [
                  { t: 'swordShield', x: 200, y: G, s: 1.5 }
                ] },

    v_hostis:   { bg: 'troy', items: [
                  graecus(200, G, 1.45)
                ] },

    v_fugit:    { bg: 'nightSky', items: [
                  { t: 'cityWall', x: 330, y: G, s: 0.8, open: true },
                  civis(104, G, 1.15, { pose: 'walk' }),
                  civis(186, G, 1.05, { pose: 'walk' })
                ] },

    /* ============ a7 · story ============ */

    a7_nox:     { bg: 'nightSky', items: [
                  { t: 'cityWall', x: 214, y: G, s: 0.95 }
                ] },

    a7_naves:   { bg: 'nightSky', items: [
                  { t: 'ship', x: 132, y: 196, s: 0.85 },
                  { t: 'ship', x: 268, y: 208, s: 0.7 }
                ] },

    a7_equus:   { bg: 'nightSky', items: [
                  { t: 'woodenHorse', x: 150, y: G, s: 1 },
                  graecus(268, G, 1.05, { pose: 'walk' }),
                  graecus(330, G, 0.95, { pose: 'walk' })
                ] },

    a7_portae:  { bg: 'nightSky', items: [
                  { t: 'cityWall', x: 214, y: G, s: 1, open: true },
                  graecus(84, G, 1.05, { pose: 'walk' })
                ] },

    a7_somnium: { bg: 'interior', items: [
                  heros(168, G, 1.15, { pose: 'sleep', shield: false })
                ],
                bubbles: [{ x: 286, y: 74, w: 58, h: 46, text: '👤', kind: 'thought', tail: 'left', fs: 22 }] },

    a7_hector:  { bg: 'interior', items: [
                  heros(158, G, 1.1, { pose: 'sleep', shield: false })
                ],
                bubbles: [{ x: 282, y: 70, w: 62, h: 46, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a7_excitat: { bg: 'troy', items: [
                  heros(176, G, 1.2, { pose: 'arms-up', shield: false }),
                  { t: 'fire', x: 330, y: G, s: 0.7 }
                ] },

    a7_ardet:   { bg: 'troy', items: [
                  { t: 'cityWall', x: 212, y: G, s: 0.95 },
                  { t: 'fire',     x: 74,  y: G, s: 0.85 },
                  { t: 'fire',     x: 336, y: G, s: 0.68 }
                ] },

    a7_clamor:  { bg: 'troy', items: [
                  { t: 'crowdGroup', x: 190, y: G, s: 1.1, n: 5 },
                  { t: 'fire',       x: 348, y: G, s: 0.6 }
                ],
                bubbles: [{ x: 84, y: 74, w: 44, h: 38, text: '❗', kind: 'speech', tail: 'right', fs: 22 }] },

    a7_arma:    { bg: 'troy', items: [
                  { t: 'swordShield', x: 322, y: G, s: 0.9 },
                  heros(150, G, 1.2)
                ] },

    a7_pugnat:  { bg: 'troy', items: [
                  troianus(112, G, 1.1),
                  troianus(178, G, 1, { flip: false }),
                  graecus(302, G, 1.1, { flip: true })
                ] },

    a7_hostes:  { bg: 'troy', items: [
                  { t: 'cityWall', x: 92, y: G, s: 0.75 },
                  graecus(232, G, 1.1),
                  graecus(310, G, 1, { flip: true }),
                  { t: 'fire', x: 30, y: G, s: 0.55 }
                ] },

    a7_fugiunt: { bg: 'troy', items: [
                  { t: 'cityWall', x: 336, y: G, s: 0.78, open: true },
                  civis(112, G, 1.15, { pose: 'walk' }),
                  civis(196, G, 1.05, { pose: 'walk' }),
                  civis(258, G, 0.95, { pose: 'walk' })
                ] },

    a7_regia:   { bg: 'troy', items: [
                  { t: 'columna', x: 300, y: G, s: 1 },
                  { t: 'columna', x: 350, y: G, s: 0.9 },
                  heros(126, G, 1.15)
                ] },

    a7_venus:   { bg: 'troy', items: [
                  { t: 'person', x: 274, y: G, s: 1.2, role: 'woman',
                    robeColor: '#f2e4c9', mantleColor: GOLD, flip: true },
                  heros(122, G, 1.15, { shield: false })
                ],
                bubbles: [{ x: 200, y: 56, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a7_domum:   { bg: 'troy', items: [
                  { t: 'fire', x: 320, y: G, s: 0.6 },
                  heros(140, G, 1.15, { pose: 'walk', shield: false })
                ] },

    a7_memoria: { bg: 'troy', items: [
                  { t: 'cityWall',    x: 300, y: G, s: 0.8 },
                  { t: 'swordShield', x: 82,  y: G, s: 0.8 },
                  heros(190, G, 1.15)
                ] },

    /* ============ a8 · vocabulary cards ============ */

    v_anchises: { bg: 'interior', items: [
                  anchises(200, G, 1.35)
                ] },

    v_ascanius: { bg: 'interior', items: [
                  ascanius(200, G, 1.7)
                ] },

    v_creusa:   { bg: 'interior', items: [
                  creusa(200, G, 1.35)
                ] },

    /* penātēs: MISSING ART, composed (see the file header) — the two
       household gods as small robed figures standing on their own
       altar, its flame off so the statuettes are not hidden by it */
    v_penates:  { bg: 'interior', items: [
                  { t: 'altar', x: 200, y: G, s: 1.15, flame: false },
                  sacerdos(182, G - 44, 0.42, { mantleColor: GOLD }),
                  sacerdos(220, G - 44, 0.42, { mantleColor: GOLD, flip: true })
                ] },

    /* aurum: MISSING ART, composed — gold THINGS on a table. The gloss
       names the metal, not the crown, so the card cannot be read as
       "rēgnum". */
    v_aurum:    { bg: 'interior', items: [
                  { t: 'mensa', x: 200, y: G, s: 1.25 },
                  { t: 'crown', x: 174, y: G - 48, s: 0.85 },
                  { t: 'urna',  x: 236, y: G - 48, s: 0.7 }
                ] },

    /* portat: the library's own carry pose, alone on bare ground —
       the emblem of the whole track, with nothing else in the frame */
    v_portat:   { bg: 'plain', items: [
                  portans(200, G, 1.4)
                ] },

    v_tenet:    { bg: 'plain', items: [
                  heros(158, G, 1.15, { pose: 'point', shield: false }),
                  ascanius(232, G, 1.4)
                ],
                bubbles: [{ x: 200, y: 78, w: 48, h: 38, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    /* pietās: the same carry, but told whole — father on the shoulders,
       son at the hand, the fire behind them. `portat` is the ACT,
       `pietās` is the reason; the two are never offered together. */
    v_pietas:   { bg: 'troy', items: [
                  portans(168, G, 1.25),
                  ascanius(252, G, 1.3),
                  { t: 'fire', x: 344, y: G, s: 0.6 }
                ] },

    /* ============ a8 · story ============ */

    a8_domus:   { bg: 'interior', items: [
                  anchises(104, G, 1.15),
                  ascanius(178, G, 1.35),
                  creusa(268, G, 1.15),
                  heros(340, G, 1.1, { flip: true, shield: false })
                ] },

    a8_anchises: { bg: 'interior', items: [
                  anchises(140, G, 1.25),
                  heros(276, G, 1.15, { flip: true, pose: 'arms-up', shield: false })
                ],
                bubbles: [{ x: 208, y: 58, w: 54, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    /* the omen of Aen. 2,680–684: a small flame on the boy's head that
       does not hurt him. The fire actor is drawn at 0.3 above his head
       — the whole prodigy, and nothing frightening in it. */
    a8_flamma:  { bg: 'interior', items: [
                  ascanius(196, G, 1.5),
                  { t: 'fire', x: 196, y: G - 100, s: 0.3, sparks: false },
                  anchises(306, G, 1.1, { flip: true, pose: 'arms-up' })
                ] },

    a8_consentit: { bg: 'interior', items: [
                  anchises(150, G, 1.2, { pose: 'arms-up' }),
                  heros(282, G, 1.15, { flip: true, shield: false })
                ] },

    a8_portat:  { bg: 'interior', items: [
                  portans(200, G, 1.35)
                ] },

    a8_penates: { bg: 'interior', items: [
                  { t: 'altar', x: 306, y: G, s: 1, flame: false },
                  sacerdos(292, G - 38, 0.4, { mantleColor: GOLD }),
                  sacerdos(322, G - 38, 0.4, { mantleColor: GOLD, flip: true }),
                  portans(140, G, 1.25)
                ] },

    a8_manus:   { bg: 'troy', items: [
                  portans(160, G, 1.3),
                  ascanius(244, G, 1.3)
                ],
                bubbles: [{ x: 202, y: 82, w: 46, h: 36, text: '🤝', kind: 'thought', tail: 'right', fs: 18 }] },

    a8_fuga:    { bg: 'troy', items: [
                  portans(140, G, 1.25),
                  ascanius(222, G, 1.25),
                  creusa(296, G, 1.1, { pose: 'walk' }),
                  { t: 'fire', x: 356, y: G, s: 0.55 }
                ] },

    a8_aurum:   { bg: 'troy', items: [
                  { t: 'mensa', x: 306, y: G, s: 1 },
                  { t: 'crown', x: 290, y: G - 40, s: 0.7 },
                  { t: 'urna',  x: 336, y: G - 40, s: 0.6 },
                  civis(118, G, 1.1, { pose: 'walk' })
                ] },

    a8_pietas:  { bg: 'troy', items: [
                  portans(172, G, 1.3),
                  ascanius(256, G, 1.3),
                  { t: 'fire', x: 348, y: G, s: 0.55 }
                ] },

    a8_porta:   { bg: 'nightSky', items: [
                  { t: 'cityWall', x: 318, y: G, s: 0.8, open: true },
                  portans(128, G, 1.25),
                  ascanius(206, G, 1.2)
                ] },

    a8_quaerit: { bg: 'troy', items: [
                  { t: 'columna', x: 340, y: G, s: 0.9 },
                  heros(160, G, 1.2, { pose: 'arms-up', shield: false })
                ],
                bubbles: [{ x: 258, y: 60, w: 50, h: 40, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    /* Creūsa's imāgō is NOT drawn (no shade actor exists, and the B
       rating is better served without one): the page is Aenēās alone,
       and the voice is a speech bubble with nobody under it. */
    a8_umbra:   { bg: 'troy', items: [
                  heros(148, G, 1.2, { shield: false })
                ],
                bubbles: [{ x: 288, y: 70, w: 62, h: 46, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a8_socii:   { bg: 'mountain', items: [
                  portans(126, G, 1.2),
                  ascanius(202, G, 1.2),
                  { t: 'crowdGroup', x: 312, y: G, s: 0.85, n: 5 }
                ] },

    /* VERBA VERGILIĪ — the frame changes for the poet's own voice */
    a8_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 90,  y: G, s: 0.95 },
                  { t: 'person',  x: 232, y: G, s: 1.2, role: 'priest', pose: 'point' }
                ] },

    /* versus I — succēdō onerī … dextrae sē parvus Iūlus */
    a8_versus1: { bg: 'troy', items: [
                  portans(170, G, 1.35),
                  ascanius(258, G, 1.3)
                ] },

    /* versus II — sequiturque patrem nōn passibus aequīs */
    a8_versus2: { bg: 'troy', items: [
                  portans(148, G, 1.3),
                  ascanius(240, G, 1.25),
                  { t: 'cityWall', x: 344, y: G, s: 0.7, open: true }
                ] },

    a8_paraphrasis: { bg: 'nightSky', items: [
                  portans(146, G, 1.25),
                  ascanius(226, G, 1.2),
                  { t: 'cityWall', x: 334, y: G, s: 0.72, open: true }
                ] },

    a8_memoria: { bg: 'mountain', items: [
                  { t: 'columna', x: 340, y: G, s: 0.85 },
                  portans(174, G, 1.3),
                  ascanius(258, G, 1.25)
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ a5 — EQUUS LIGNEUS ============
       fons Aen. 2,13–56 + 2,232–249. Aenēās begins his own story at
       Dīdō's table, so the whole liber is in his mouth — but the prose
       stays in the third person for the story pages, exactly as Liber I
       does, and only the direct speech is his. (Vergil's first person
       returns for the closing quotation of a8, where the "ego" is the
       point of the lines.)
       B RATING: the ten years of war are ONE sentence and one picture
       of two armed men FACING each other. Nothing is struck.
       OMITTED for the lexeme cap: the catalogue of Greek leaders,
       Calchas and the augury (2,100–125), the details of the ropes and
       the four halts of the horse at the gate (2,242–245 — kept as one
       clause), and the prophecy of Cassandra (2,246–247), which is
       registered in the ledger and returns in Liber III. */
    {
      id: 'a5',
      titulus: 'Equus Ligneus',
      icon: '🐴🎁',
      numerus: 'V',
      pos: { x: 0.26, y: 0.88 },
      fons: 'Aen. 2,13–56 · 232–249',
      vocab: [
        { la: 'Graecus',   scene: SC.v_graecus,   pars: 'nomen' },
        { la: 'equus',     scene: SC.v_equus,     pars: 'nomen' },
        { la: 'lignum',    scene: SC.v_lignum,    pars: 'nomen' },
        { la: 'dōnum',     scene: SC.v_donum,     pars: 'nomen' },
        { la: 'castra',    scene: SC.v_castra,    pars: 'nomen' },
        { la: 'mīrātur',   scene: SC.v_miratur,   pars: 'verbum' },
        { la: 'relinquit', scene: SC.v_relinquit, pars: 'verbum' },
        { la: 'trahit',    scene: SC.v_trahit,    pars: 'verbum' },
        { la: 'latet',     scene: SC.v_latet,     pars: 'verbum' }
      ],
      story: [
        /* Aen. 2,13–14 */
        { la: 'Decem annōs Graecī contrā Trōiam bellum gerunt, sed urbem capere nōn possunt.',
          scene: SC.a5_bellum,
          nova: [{ w: 'Graecī', e: '👤', g: 'populus quī trāns mare habitat; Danaī quoque dīcuntur' },
                 { w: 'bellum', e: '🛡', g: 'pugna longa inter duōs populōs; ↔ pāx' }] },

        { la: 'Castra Graecōrum ante moenia Trōiae stant, et nāvēs eōrum in lītore iacent.',
          scene: SC.a5_castra,
          nova: [{ w: 'castra', e: '⛺', g: 'locus ubi mīlitēs habitant: multa tabernācula simul' }] },

        /* Aen. 2,15–16 */
        { la: 'Tandem Graecī novum cōnsilium capiunt: equum ligneum ingentem faciunt.',
          scene: SC.a5_consilium,
          nova: [{ w: 'equus', e: '🐴', g: 'animal quod virōs portat — sed hic equus nōn vīvus est' },
                 { w: 'ligneus', e: '🌳', g: '= ex lignō factus' }] },

        { la: 'Ex lignō montis Īdae equum aedificant; tam altus est ut moenia superet.',
          scene: SC.a5_lignum,
          nova: [{ w: 'lignum', e: '🌳', g: 'māteria arborum: ex lignō et nāvēs et equus fīunt' }] },

        /* Aen. 2,18–20 */
        { la: 'In equī ventre virī armātī latent: dolus est.',
          scene: SC.a5_latent,
          nova: [{ w: 'latet', e: '🙈', g: 'sē cēlat: est, sed vidērī nōn potest' },
                 { w: 'dolus', e: '❓', g: 'cōnsilium quō hostis fallitur: nōn vīs, sed ars' }] },

        /* Aen. 2,21–24 */
        { la: 'Deinde Graecī castra relinquunt et in nāvēs ascendunt.',
          scene: SC.a5_relinquunt,
          nova: [{ w: 'relinquit', e: '👋', g: 'discēdit et rem post sē manēre sinit' }] },

        { la: 'Post īnsulam sē cēlant; Trōiānī autem eōs domum nāvigāvisse putant.',
          scene: SC.a5_insula },

        /* Aen. 2,25–30 */
        { la: 'Māne Trōiānī portās aperiunt et ex urbe currunt: lītus vacuum est!',
          scene: SC.a5_portae },

        { la: 'Castra relicta sunt, et nūlla nāvis Graeca in marī vidētur.',
          scene: SC.a5_litus },

        /* Aen. 2,31–34 */
        { la: 'Sed in lītore equus ingēns stat. Trōiānī eum mīrantur: "Quid est hoc dōnum?"',
          scene: SC.a5_mirantur,
          nova: [{ w: 'mīrātur', e: '😮', g: 'rem novam et magnam videt et stupet' }] },

        { la: 'Aliī dīcunt equum dōnum deae esse; aliī eum in mare mittere volunt.',
          scene: SC.a5_disputant,
          nova: [{ w: 'dōnum', e: '🤲', g: 'quod aliquis alterī libēns dat; dōna deīs ad āram dantur' }] },

        { la: 'Nēmō autem scit virōs in equō latēre: omnēs dōnum sine timōre mīrantur.',
          scene: SC.a5_latent },

        /* Aen. 2,232–239 */
        { la: 'Tandem Trōiānī equum, dōnum ingēns, ad moenia trahunt.',
          scene: SC.a5_trahunt,
          nova: [{ w: 'trahit', e: '⬅', g: 'post sē movet: equus ipse nōn ambulat, Trōiānī eum trahunt' }] },

        /* Aen. 2,242–245, compressed to the one clause the B rating and
           the lexeme cap both allow */
        { la: 'Quater in ipsā portā equus stat, sed Trōiānī eum trahere nōn dēsinunt.',
          scene: SC.a5_trahunt },

        { la: 'Sīc equus ligneus in urbem trahitur, et omnēs laetī sunt: castra vacua, bellum fīnītum vidētur.',
          scene: SC.a5_inurbe },

        { la: 'Memoriā tenē: Graecī castra relinquunt; Trōiānī equum mīrantur et in urbem trahunt; in equō virī latent.',
          scene: SC.a5_memoria,
          ttsText: 'Graeci castra relinquunt; Troiani equum mirantur et in urbem trahunt; in equo viri latent.',
          nova: [{ w: 'Memoriā tenē', e: '🧠', g: 'hoc nōn oblīvīscere!' }] }
      ],
      ludus: {
        words: [
          { la: 'equus',     scene: SC.v_equus,     emoji: '🐴' },
          { la: 'lignum',    scene: SC.v_lignum,    emoji: '🌳' },
          { la: 'castra',    scene: SC.v_castra,    emoji: '⛺' },
          { la: 'dōnum',     scene: SC.v_donum,     emoji: '🤲' },
          { la: 'Graecus',   scene: SC.v_graecus,   emoji: '👤' },
          { la: 'relinquit', scene: SC.v_relinquit, emoji: '👋' }
        ]
      },
      /* SONUS, hand-authored (SHARED-PICTURE RULE). Three of this
         capitulum's cards contain the wooden horse — `equus`, `trahit`
         and `latet` — so no two of them ever appear in one set: by ear
         the learner would be choosing between three horses. `castra`
         and `relinquit` both stand on the shore with a tent, so they
         are likewise never offered together. Each set below mixes at
         most ONE horse card with pictures that share nothing. */
      sonus: [
        { la: 'equus',
          answer: { la: 'equus', scene: SC.v_equus },
          options: [{ la: 'equus', scene: SC.v_equus },
                    { la: 'castra', scene: SC.v_castra },
                    { la: 'Graecus', scene: SC.v_graecus }] },
        { la: 'lignum',
          answer: { la: 'lignum', scene: SC.v_lignum },
          options: [{ la: 'lignum', scene: SC.v_lignum },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'dōnum', scene: SC.v_donum },
                    { la: 'castra', scene: SC.v_castra }] },
        { la: 'castra',
          answer: { la: 'castra', scene: SC.v_castra },
          options: [{ la: 'castra', scene: SC.v_castra },
                    { la: 'lignum', scene: SC.v_lignum },
                    { la: 'mīrātur', scene: SC.v_miratur }] },
        { la: 'dōnum',
          answer: { la: 'dōnum', scene: SC.v_donum },
          options: [{ la: 'dōnum', scene: SC.v_donum },
                    { la: 'lignum', scene: SC.v_lignum },
                    { la: 'relinquit', scene: SC.v_relinquit },
                    { la: 'equus', scene: SC.v_equus }] },
        { la: 'Graecus',
          answer: { la: 'Graecus', scene: SC.v_graecus },
          options: [{ la: 'Graecus', scene: SC.v_graecus },
                    { la: 'mīrātur', scene: SC.v_miratur },
                    { la: 'lignum', scene: SC.v_lignum }] }
      ],
      overrides: {
        aenigmata: {
          /* `equus` is the ONE horse card on the grid, for the same
             reason it is the only one in any SONUS set */
          pairs: [
            { la: 'equus',     scene: SC.v_equus },
            { la: 'lignum',    scene: SC.v_lignum },
            { la: 'castra',    scene: SC.v_castra },
            { la: 'dōnum',     scene: SC.v_donum },
            { la: 'Graecus',   scene: SC.v_graecus },
            { la: 'mīrātur',   scene: SC.v_miratur }
          ],
          scrambles: [
            { la: 'Graecī castra relinquunt.',        scene: SC.a5_relinquunt },
            { la: 'Trōiānī equum mīrantur.',          scene: SC.a5_mirantur },
            { la: 'In equō virī latent.',             scene: SC.a5_latent },
            { la: 'Trōiānī equum ad moenia trahunt.', scene: SC.a5_trahunt }
          ]
        },
        /* CORRIGE, hand-authored to test SYNTAX, not only words: three
           of the five put the intruder inside an accūsātīvus cum
           īnfīnītīvō or a passive, where the ending is the only thing
           that can be read to find it. */
        corrige: [
          { words: ['Trōiānī', 'dīcunt', 'equum', 'dōnum', 'est.'], wrong: 4,
            options: ['esse.', 'sunt.', 'erat.'], correct: 0, scene: SC.a5_disputant },
          { words: ['Nēmō', 'scit', 'virōs', 'in', 'equō', 'latent.'], wrong: 5,
            options: ['latēre.', 'latet.', 'latuit.'], correct: 0, scene: SC.a5_latent },
          { words: ['Equus', 'in', 'urbem', 'trahit.'], wrong: 3,
            options: ['trahitur.', 'trahunt.', 'trahere.'], correct: 0, scene: SC.a5_inurbe },
          { words: ['Graecī', 'castra', 'mīrantur.'], wrong: 2,
            options: ['relinquunt.', 'aedificant.', 'trahunt.'], correct: 0, scene: SC.a5_relinquunt },
          { words: ['Equus', 'ex', 'lignā', 'factus', 'est.'], wrong: 2,
            options: ['lignō', 'lignum', 'lignī'], correct: 0, scene: SC.a5_lignum }
        ],
        /* COMPLĒ: four morphology gaps that are pure syntax — the
           infinitive of an acc.+inf., the ablative of māteria, a
           passive ending, and the plural of a plūrāle tantum. */
        comple: [
          { text: 'Trōiānī dīcunt equum dōnum ___.',
            options: ['esse', 'est', 'sunt'], correct: 0, scene: SC.a5_disputant },
          { text: 'Nēmō scit virōs in equō lat___.',
            options: ['ēre', 'ent', 'et'], correct: 0, scene: SC.a5_latent },
          { text: 'Equus ex lign___ factus est.',
            options: ['ō', 'um', 'a'], correct: 0, scene: SC.a5_lignum },
          { text: 'Equus in urbem trah___.',
            options: ['itur', 'unt', 'ere'], correct: 0, scene: SC.a5_inurbe },
          { text: 'Graecī ___ relinquunt.',
            options: ['castra', 'castrīs', 'castrōrum'], correct: 0, scene: SC.a5_relinquunt },
          { text: 'Trōiānī equum ingentem ___.',
            options: ['mīrantur', 'relinquunt', 'aedificant'], correct: 0, scene: SC.a5_mirantur }
        ]
      }
    },

    /* ============ a6 — SINŌN ET LĀOCOŌN ============
       fons Aen. 2,40–249. The capitulum that carries the liber's inline
       quotation: Lāocoōn's own line, 2,49, quoted WHOLE at the exact
       moment he speaks it, with every hard word pre-taught on the page
       before it (Graecōs timeō … etiam dōna ferentēs) and `dōnum`
       taught a whole capitulum earlier.
       B RATING: Lāocoōn's end is ONE dignified sentence — "sacerdōs cum
       fīliīs perit" — and the picture is a STYLIZED EMBLEM: two serpents
       on an empty sea, with no person on the page. The page after it
       shows the altar alone, with its smoke. Nothing is depicted.
       ADAPTED: Sinōn's long false narrative (2,57–198 — the sacrifice of
       Iphigenia, Ulixes, Calchas) is compressed into two sentences of
       direct speech. What he says is false IN THE STORY, and the text
       says so plainly ("falsa nārrat"), so a learner is never left
       holding a lie as fact.
       OMITTED for the lexeme cap: the binding of Sinōn and the shepherds
       (2,57–59, kept as one clause), Priamus' pity (2,145–151), and the
       whole of Cassandra (2,246–247 — registered, returns in Liber III). */
    {
      id: 'a6',
      titulus: 'Sinōn et Lāocoōn',
      icon: '🐍🛕',
      numerus: 'VI',
      pos: { x: 0.71, y: 0.70 },
      fons: 'Aen. 2,40–249 (+ 2,49)',
      vocab: [
        { la: 'sacerdōs',  scene: SC.v_sacerdos,  pars: 'nomen' },
        { la: 'āra',       scene: SC.v_ara,       pars: 'nomen' },
        { la: 'serpēns',   scene: SC.v_serpens,   pars: 'nomen' },
        { la: 'captīvus',  scene: SC.v_captivus,  pars: 'nomen' },
        { la: 'hasta',     scene: SC.v_hasta,     pars: 'nomen' },
        { la: 'monet',     scene: SC.v_monet,     pars: 'verbum' },
        { la: 'timet',     scene: SC.v_timet,     pars: 'verbum' },
        { la: 'crēdit',    scene: SC.v_credit,    pars: 'verbum' }
      ],
      story: [
        /* Aen. 2,40–41 */
        { la: 'Erat inter Trōiānōs sacerdōs, nōmine Lāocoōn, quī deīs ad āram sacra faciēbat.',
          scene: SC.a6_laocoon,
          nova: [{ w: 'sacerdōs', e: '👤', g: 'vir quī prō populō deīs sacra facit' },
                 { w: 'āra', e: '🔥', g: 'mēnsa sacra ubi dōna deīs dantur' },
                 { w: 'Lāocoōn', e: '👤', g: 'sacerdōs Trōiānus; acc. Lāocoontem' }] },

        { la: 'Is ad equum currit et magnā vōce clāmat: "Ō miserī cīvēs! Quid facitis?"',
          scene: SC.a6_currit },

        /* Aen. 2,42–44 */
        { la: 'Trōiānōs monet equum in urbem dūcere perīculōsum esse.',
          scene: SC.a6_monet,
          nova: [{ w: 'monet', e: '❗', g: 'dīcit quid perīculōsum sit, ut alter caveat' }] },

        /* Aen. 2,45–48, and the pre-teaching of the line itself */
        { la: 'Sacerdōs dīcit: "Aut virī in equō latent, aut hoc dōnum aliquem dolum cēlat. Graecōs timeō, etiam dōna ferentēs!"',
          scene: SC.a6_timeo,
          nova: [{ w: 'timet', e: '😨', g: 'perīculum sentit; ↔ audet' },
                 { w: 'ferentēs', e: '🤲', g: 'quī dōna ferunt, id est portant' }] },

        /* ---- VERBA VERGILIĪ (inline) — Aen. 2,49, quoted whole ---- */
        { la: 'Haec apud Vergilium ipsum ūnō versū dīcuntur. Audī verba Lāocoontis:',
          scene: SC.a6_vergilius,
          nova: [{ w: 'versus', e: '🧠', g: 'ūna līnea carminis' }] },

        { la: 'quidquid id est, timeō Danaōs et dōna ferentīs.',
          scene: SC.a6_versus,
          ttsText: 'quidquid id est, timeo Danaos et dona ferentis.',
          nova: [{ w: 'quidquid', e: '❓', g: '= quaecumque rēs' },
                 { w: 'id est', e: '👉', g: '= haec rēs est, hoc dōnum est' },
                 { w: 'timeō', e: '😨', g: 'timet → timeō: "ego timeō"' },
                 { w: 'Danaōs', e: '👤', g: 'Danaī = Graecī' },
                 { w: 'ferentīs', e: '🤲', g: 'ferentīs = ferentēs: quī dōna ferunt' }] },

        { la: 'Id est: quidquid hoc dōnum est, Graecōs timeō, etiam cum dōna ferunt.',
          scene: SC.a6_versus },

        /* Aen. 2,50–53 — the spear, and nothing beyond the wood */
        { la: 'Tum sacerdōs hastam validam in equī latus iacit.',
          scene: SC.a6_hasta,
          nova: [{ w: 'hasta', e: '🛡', g: 'tēlum longum quod mīles manū iacit' }] },

        { la: 'Hasta in lignō stat, et intus sonus audītur: aliquid in equō est!',
          scene: SC.a6_hasta },

        { la: 'Sed Trōiānī sacerdōtī nōn crēdunt.',
          scene: SC.a6_noncredunt,
          nova: [{ w: 'crēdit', e: '👍', g: 'verba alterīus vēra esse putat' }] },

        /* Aen. 2,57–59 */
        { la: 'Ecce, Trōiānī Graecum captīvum ad rēgem trahunt.',
          scene: SC.a6_captivus,
          nova: [{ w: 'captīvus', e: '👤', g: 'quī ab hostibus captus est' }] },

        /* Aen. 2,57–198, compressed — and named as false */
        { la: 'Sinōn est nōmen eius. Multa et falsa nārrat: "Graecī mē relīquērunt; equum deae dōnum fēcērunt."',
          scene: SC.a6_sinon },

        { la: 'Addit etiam: "Sī equum in urbem dūcētis, urbs vestra numquam capiētur."',
          scene: SC.a6_promittit },

        { la: 'Trōiānī captīvō crēdunt, quamquam sacerdōs eōs monuerat.',
          scene: SC.a6_credunt },

        /* Aen. 2,199–227, B-RATED: ONE dignified sentence, and an emblem
           for a picture — two serpents on an empty sea. */
        { la: 'Tum rēs mīra et trīstis accidit: dum sacerdōs ad āram sacra facit, duo serpentēs ingentēs ē marī veniunt, et Lāocoōn cum fīliīs perit.',
          scene: SC.a6_serpentes,
          nova: [{ w: 'serpēns', e: '🐍', g: 'animal longum sine pedibus' }] },

        { la: 'Serpentēs ad templum abeunt; āra sōla manet, et omnēs timent.',
          scene: SC.a6_ara },

        /* Aen. 2,228–233 */
        { la: 'Trōiānī putant sacerdōtem deōs offendisse, quia hastam in dōnum sacrum iēcerat: serpentēs enim ā deīs missī esse videntur.',
          scene: SC.a6_serpentes },

        { la: 'Itaque nēmō iam dubitat: equus per portās in urbem trahitur.',
          scene: SC.a6_trahunt },

        { la: 'Memoriā tenē: sacerdōs Trōiānōs monet — "timeō Danaōs et dōna ferentīs" — sed Trōiānī captīvō crēdunt.',
          scene: SC.a6_memoria,
          ttsText: 'Sacerdos Troianos monet: timeo Danaos et dona ferentis. Sed Troiani captivo credunt.' }
      ],
      ludus: {
        words: [
          { la: 'sacerdōs', scene: SC.v_sacerdos, emoji: '👤' },
          { la: 'āra',      scene: SC.v_ara,      emoji: '🔥' },
          { la: 'serpēns',  scene: SC.v_serpens,  emoji: '🐍' },
          { la: 'hasta',    scene: SC.v_hasta,    emoji: '🛡' },
          { la: 'captīvus', scene: SC.v_captivus, emoji: '👤' },
          { la: 'equus',    scene: SC.v_equus,    emoji: '🐴' }
        ]
      },
      /* SONUS: `sacerdōs` and `monet` are the same grey-bearded priest,
         and `captīvus` and `crēdit` are the same kneeling man — so one
         of each pair only, never both. `āra` and `serpēns` are this
         capitulum's two unmistakable cards and carry the sets. */
      sonus: [
        { la: 'serpēns',
          answer: { la: 'serpēns', scene: SC.v_serpens },
          options: [{ la: 'serpēns', scene: SC.v_serpens },
                    { la: 'āra', scene: SC.v_ara },
                    { la: 'sacerdōs', scene: SC.v_sacerdos }] },
        { la: 'āra',
          answer: { la: 'āra', scene: SC.v_ara },
          options: [{ la: 'āra', scene: SC.v_ara },
                    { la: 'serpēns', scene: SC.v_serpens },
                    { la: 'captīvus', scene: SC.v_captivus },
                    { la: 'hasta', scene: SC.v_hasta }] },
        { la: 'sacerdōs',
          answer: { la: 'sacerdōs', scene: SC.v_sacerdos },
          options: [{ la: 'sacerdōs', scene: SC.v_sacerdos },
                    { la: 'serpēns', scene: SC.v_serpens },
                    { la: 'captīvus', scene: SC.v_captivus }] },
        { la: 'hasta',
          answer: { la: 'hasta', scene: SC.v_hasta },
          options: [{ la: 'hasta', scene: SC.v_hasta },
                    { la: 'āra', scene: SC.v_ara },
                    { la: 'serpēns', scene: SC.v_serpens },
                    { la: 'timet', scene: SC.v_timet }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'sacerdōs', scene: SC.v_sacerdos },
            { la: 'āra',      scene: SC.v_ara },
            { la: 'serpēns',  scene: SC.v_serpens },
            { la: 'hasta',    scene: SC.v_hasta },
            { la: 'captīvus', scene: SC.v_captivus },
            { la: 'timet',    scene: SC.v_timet }
          ],
          scrambles: [
            { la: 'Sacerdōs ad āram sacra facit.',   scene: SC.a6_laocoon },
            { la: 'Sacerdōs Trōiānōs monet.',        scene: SC.a6_monet },
            { la: 'Trōiānī captīvō crēdunt.',        scene: SC.a6_credunt },
            { la: 'Serpentēs ē marī veniunt.',       scene: SC.a6_serpentes }
          ]
        },
        corrige: [
          { words: ['Sacerdōs', 'monet', 'equum', 'perīculōsus', 'esse.'], wrong: 3,
            options: ['perīculōsum', 'perīculōsī', 'perīculōsē'], correct: 0, scene: SC.a6_monet },
          { words: ['Trōiānī', 'captīvum', 'crēdunt.'], wrong: 1,
            options: ['captīvō', 'captīvī', 'captīvōs'], correct: 0, scene: SC.a6_credunt },
          { words: ['Sacerdōs', 'hastam', 'in', 'equum', 'crēdit.'], wrong: 4,
            options: ['iacit.', 'monet.', 'timet.'], correct: 0, scene: SC.a6_hasta },
          { words: ['Duo', 'serpentēs', 'ē', 'marī', 'venit.'], wrong: 4,
            options: ['veniunt.', 'venīre.', 'vēnerat.'], correct: 0, scene: SC.a6_serpentes },
          { words: ['Trōiānī', 'putant', 'sacerdōs', 'deōs', 'offendisse.'], wrong: 2,
            options: ['sacerdōtem', 'sacerdōtī', 'sacerdōtis'], correct: 0, scene: SC.a6_serpentes }
        ],
        comple: [
          { text: 'Sacerdōs ad ār___ sacra facit.',
            options: ['am', 'a', 'īs'], correct: 0, scene: SC.a6_laocoon },
          { text: 'Sacerdōs monet equum perīculōs___ esse.',
            options: ['um', 'us', 'ī'], correct: 0, scene: SC.a6_monet },
          { text: 'Trōiānī captīv___ crēdunt.',
            options: ['ō', 'um', 'ī'], correct: 0, scene: SC.a6_credunt },
          { text: 'Sacerdōs ___ in equum iacit.',
            options: ['hastam', 'hasta', 'hastae'], correct: 0, scene: SC.a6_hasta },
          { text: 'Duo ___ ē marī veniunt.',
            options: ['serpentēs', 'serpēns', 'serpentis'], correct: 0, scene: SC.a6_serpentes },
          { text: 'Sacerdōs Graecōs ___.',
            options: ['timet', 'crēdit', 'trahit'], correct: 0, scene: SC.a6_timeo }
        ]
      }
    },

    /* ============ a7 — TRŌIA ĀRDET ============
       fons Aen. 2,250–437. The night capitulum: the ships come back,
       the horse opens, Hector warns Aenēās in a dream, and the city
       burns behind a warm sky.
       B RATING, and it governs this whole capitulum:
        · bgTroy paints the fire as a GLOW behind the skyline; the two
          `fire` props on the ground are camp-fire sized. No building is
          drawn burning and no flame touches a person.
        · The fighting is "cum paucīs sociīs contrā hostēs pugnat" and a
          picture of armed men facing each other across the frame. No
          blow, no wound, no body, anywhere.
        · PRIAM IS OMITTED. Aen. 2,469–558 (Pyrrhus at the palace and
          the king's death) is not told, not shown and not alluded to:
          Aenēās sees that the palace cannot be saved, and the narrative
          turns to his own house. Registered in the ledger.
        · Hector's shade is a SPEECH BUBBLE over a sleeping man — the
          library has no ghost actor, and this is the gentler picture
          anyway.
       OMITTED for the lexeme cap: Panthūs and the fall of the citadel
       (2,318–369), the Greek armour stratagem (2,370–401), Cassandra
       dragged from the temple (2,403–406 — omitted for the B rating as
       well), and Helen (2,567–588, a disputed passage in any case). */
    {
      id: 'a7',
      titulus: 'Trōia Ārdet',
      icon: '🌙🔥',
      numerus: 'VII',
      pos: { x: 0.28, y: 0.52 },
      fons: 'Aen. 2,250–437',
      vocab: [
        { la: 'nox',      scene: SC.v_nox,      pars: 'nomen' },
        { la: 'somnium',  scene: SC.v_somnium,  pars: 'nomen' },
        { la: 'ignis',    scene: SC.v_ignis,    pars: 'nomen' },
        { la: 'clāmor',   scene: SC.v_clamor,   pars: 'nomen' },
        { la: 'arma',     scene: SC.v_arma,     pars: 'nomen' },
        { la: 'hostis',   scene: SC.v_hostis,   pars: 'nomen' },
        { la: 'ārdet',    scene: SC.v_ardet,    pars: 'verbum' },
        { la: 'fugit',    scene: SC.v_fugit,    pars: 'verbum' }
      ],
      story: [
        /* Aen. 2,250–253 */
        { la: 'Nox erat, et Trōia fessa post longum diem dormiēbat.',
          scene: SC.a7_nox,
          nova: [{ w: 'nox', e: '🌙', g: 'tempus obscūrum inter duōs diēs; ↔ diēs' }] },

        { la: 'Per noctem tacitam nāvēs Graecae ab īnsulā redeunt.',
          scene: SC.a7_naves },

        /* Aen. 2,256–267 */
        { la: 'Tum Sinōn equum aperit, et virī armātī ex equō dēscendunt.',
          scene: SC.a7_equus },

        { la: 'Portās aperiunt, et sociī suī in urbem dormientem intrant.',
          scene: SC.a7_portae },

        /* Aen. 2,268–279 */
        { la: 'Interim Aenēās in domō suā dormit. In somniō Hectorem videt, quī ōlim Trōiae fortissimus fuit.',
          scene: SC.a7_somnium,
          nova: [{ w: 'somnium', e: '💤', g: 'quod dormiēns vidēs; in somniō hominēs et deōs vidēmus' },
                 { w: 'Hector', e: '👤', g: 'Trōiānus fortissimus, quī iam mortuus est' }] },

        /* Aen. 2,289–295 */
        { la: 'Hector eum monet: "Fuge, fīlī deae! Hostis intrā mūrōs est. Trōia cadit; tū sacra tua cape et novam urbem quaere."',
          scene: SC.a7_hector,
          nova: [{ w: 'hostis', e: '🛡', g: 'quī bellum contrā tē gerit; ↔ socius' }] },

        /* Aen. 2,298–303 */
        { la: 'Somniō monitus, Aenēās ē somnō surgit et ē domō suā spectat.',
          scene: SC.a7_excitat },

        { la: 'Ignem et clāmōrem videt: urbs ārdet, et nox tōta lūce ignis plēna est.',
          scene: SC.a7_clamor,
          nova: [{ w: 'ignis', e: '🔥', g: 'quod lūcet et ūrit; ex lignō ignis fit' },
                 { w: 'clāmor', e: '❗', g: 'vōcēs multōrum hominum simul' }] },

        /* Aen. 2,304–312 */
        { la: 'Trōia ārdet! Ignis per urbem it, et clāmor ubīque audītur.',
          scene: SC.a7_ardet,
          nova: [{ w: 'ārdet', e: '🔥', g: 'ignis eam tenet; quod ārdet, ignī perit' }] },

        /* Aen. 2,313–317 */
        { la: 'Aenēās arma capit et in viās currit: nam vir fortis prō patriā pugnāre vult.',
          scene: SC.a7_arma,
          nova: [{ w: 'arma', e: '🛡', g: 'scūtum et gladius; gladius ēnsis quoque dīcitur' }] },

        { la: 'Cum paucīs sociīs contrā hostēs stat, et viam armīs tenet.',
          scene: SC.a7_pugnat },

        /* Aen. 2,361–369, told without a single blow */
        { la: 'Sed hostēs multō plūrēs sunt, et Trōia iam armīs servārī nōn potest.',
          scene: SC.a7_hostes },

        { la: 'Multī cīvēs cum clāmōre per viās fugiunt; aliī in templa fugiunt et deōs vocant.',
          scene: SC.a7_fugiunt,
          nova: [{ w: 'fugit', e: '🏃', g: 'celeriter discēdit quia perīculum timet' }] },

        /* Aen. 2,438–468 — the palace is SEEN and not entered; what
           happens inside it is not told (DESIGN §8, and the a7 header) */
        { la: 'Aenēās ad rēgiam Priamī currit, sed ibi iam nihil servārī potest.',
          scene: SC.a7_regia },

        /* Aen. 2,589–620, kept as the mother's counsel */
        { la: 'Tum Venus māter eī appāret: "Trōia cadit quia deī ita volunt. Domum tuam pete: pater tuus et fīlius tē exspectant."',
          scene: SC.a7_venus },

        { la: 'Aenēās deae pāret: arma dēpōnere nōn vult, sed per ignem domum suam petit.',
          scene: SC.a7_domum },

        { la: 'Memoriā tenē: nocte Graecī redeunt; somnium Aenēān monet; Trōia ārdet; Aenēās arma capit, sed māter eum domum mittit.',
          scene: SC.a7_memoria,
          ttsText: 'Nocte Graeci redeunt; somnium Aenean monet; Troia ardet; Aeneas arma capit, sed mater eum domum mittit.' }
      ],
      ludus: {
        words: [
          { la: 'nox',     scene: SC.v_nox,     emoji: '🌙' },
          { la: 'ignis',   scene: SC.v_ignis,   emoji: '🔥' },
          { la: 'arma',    scene: SC.v_arma,    emoji: '🛡' },
          { la: 'hostis',  scene: SC.v_hostis,  emoji: '🛡' },
          { la: 'clāmor',  scene: SC.v_clamor,  emoji: '❗' },
          { la: 'equus',   scene: SC.v_equus,   emoji: '🐴' }
        ]
      },
      /* SONUS: `ignis` (one fire on bare ground) and `ārdet` (the city
         with two fires) share their flames, so they are never offered
         together; `nox` and `fugit` are both the moonlit wall, and
         `clāmor` and `hostis` both stand on the dusk ground of bgTroy —
         one of each pair per set, never both. */
      sonus: [
        { la: 'arma',
          answer: { la: 'arma', scene: SC.v_arma },
          options: [{ la: 'arma', scene: SC.v_arma },
                    { la: 'ignis', scene: SC.v_ignis },
                    { la: 'nox', scene: SC.v_nox }] },
        { la: 'ignis',
          answer: { la: 'ignis', scene: SC.v_ignis },
          options: [{ la: 'ignis', scene: SC.v_ignis },
                    { la: 'arma', scene: SC.v_arma },
                    { la: 'nox', scene: SC.v_nox },
                    { la: 'hostis', scene: SC.v_hostis }] },
        { la: 'nox',
          answer: { la: 'nox', scene: SC.v_nox },
          options: [{ la: 'nox', scene: SC.v_nox },
                    { la: 'ignis', scene: SC.v_ignis },
                    { la: 'arma', scene: SC.v_arma }] },
        { la: 'hostis',
          answer: { la: 'hostis', scene: SC.v_hostis },
          options: [{ la: 'hostis', scene: SC.v_hostis },
                    { la: 'arma', scene: SC.v_arma },
                    { la: 'somnium', scene: SC.v_somnium },
                    { la: 'ignis', scene: SC.v_ignis }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'nox',      scene: SC.v_nox },
            { la: 'ignis',    scene: SC.v_ignis },
            { la: 'arma',     scene: SC.v_arma },
            { la: 'hostis',   scene: SC.v_hostis },
            { la: 'somnium',  scene: SC.v_somnium },
            { la: 'clāmor',   scene: SC.v_clamor }
          ],
          scrambles: [
            { la: 'Nāvēs Graecae per noctem redeunt.', scene: SC.a7_naves },
            { la: 'Tōta Trōia igne ārdet.',            scene: SC.a7_ardet },
            { la: 'Aenēās arma capit.',                scene: SC.a7_arma },
            { la: 'Multī cīvēs per viās fugiunt.',     scene: SC.a7_fugiunt }
          ]
        },
        corrige: [
          { words: ['Trōia', 'ārdent.'], wrong: 1,
            options: ['ārdet.', 'ārdēre.', 'ārdēbant.'], correct: 0, scene: SC.a7_ardet },
          { words: ['Aenēās', 'in', 'somniō', 'Hectorem', 'audit.'], wrong: 4,
            options: ['videt.', 'vidēre.', 'vidētur.'], correct: 0, scene: SC.a7_somnium },
          { words: ['Trōia', 'armīs', 'servāre', 'nōn', 'potest.'], wrong: 2,
            options: ['servārī', 'servat', 'servāvit'], correct: 0, scene: SC.a7_hostes },
          { words: ['Aenēās', 'nox', 'arma', 'capit.'], wrong: 1,
            options: ['nocte', 'noctem', 'noctis'], correct: 0, scene: SC.a7_arma },
          { words: ['Multī', 'cīvēs', 'per', 'viās', 'ārdent.'], wrong: 4,
            options: ['fugiunt.', 'fugere.', 'fugit.'], correct: 0, scene: SC.a7_fugiunt }
        ],
        comple: [
          { text: 'Nāvēs Graecae per noct___ redeunt.',
            options: ['em', 'is', 'e'], correct: 0, scene: SC.a7_naves },
          { text: 'Trōia ___: ignis per urbem it.',
            options: ['ārdet', 'ārdent', 'ārdēre'], correct: 0, scene: SC.a7_ardet },
          { text: 'Aenēās ___ capit et in viās currit.',
            options: ['arma', 'armīs', 'armōrum'], correct: 0, scene: SC.a7_arma },
          { text: 'Trōia iam armīs servār___ nōn potest.',
            options: ['ī', 'e', 'et'], correct: 0, scene: SC.a7_hostes },
          { text: 'In somniō Aenēās ___ videt.',
            options: ['Hectorem', 'Hector', 'Hectoris'], correct: 0, scene: SC.a7_somnium },
          { text: 'Multī cīvēs per viās ___.',
            options: ['fugiunt', 'ārdent', 'dormiunt'], correct: 0, scene: SC.a7_fugiunt }
        ]
      }
    },

    /* ============ a8 — FUGA AENĒAE ============
       fons Aen. 2,634–804. The liber's last capitulum, and therefore
       the one that carries VERBA VERGILIĪ IPSĪUS: Aen. 2,723–724, one
       hexameter per page, each with its own scene and its own Latin
       glosses, then a graded-prose paraphrase, then the `versūs
       memorābilēs` page.
       WHY THESE TWO LINES. They are the picture this capitulum has been
       building for fifteen pages — the father on the shoulders, the boy
       at the hand — and every content word in them is already taught:
       `pater` and `parvus` are core, `sequitur` is the deponent this
       track has been reading since a1, `tenet` and `portat` are this
       capitulum's own cards, and `aequīs` closes the circle on a1's
       poetic gloss (aequor = mare, aequus = pār). Only four words are
       new at the point of quotation — succēdō, onus, dextra, implicuit
       — and each carries its own Latin gloss on its own page.
       B RATING: Creūsa is lost with grief and mystery, exactly as the
       poem has her. She is missing at the gate; Aenēās goes back and
       calls her name; her imāgō speaks kindly and tells him the fāta
       hold her. Nothing is depicted — there is no shade actor in the
       library and the page is deliberately Aenēās alone with a voice.
       OMITTED for the lexeme cap: Anchīsēs' omens in full (2,679–704 —
       the flame is kept, the thunder and the star are not), the
       instruction about the meeting place at Cerēs' temple
       (2,712–716), and the gathering of the exiles (2,796–800, kept as
       one sentence). */
    {
      id: 'a8',
      titulus: 'Fuga Aenēae',
      icon: '👴🔥',
      numerus: 'VIII',
      pos: { x: 0.72, y: 0.35 },
      fons: 'Aen. 2,634–804 (+ 2,723–724)',
      vocab: [
        { la: 'Anchīsēs', scene: SC.v_anchises, pars: 'nomen' },
        { la: 'Ascanius', scene: SC.v_ascanius, pars: 'nomen' },
        { la: 'Creūsa',   scene: SC.v_creusa,   pars: 'nomen' },
        { la: 'penātēs',  scene: SC.v_penates,  pars: 'nomen' },
        { la: 'aurum',    scene: SC.v_aurum,    pars: 'nomen' },
        { la: 'pietās',   scene: SC.v_pietas,   pars: 'nomen' },
        { la: 'portat',   scene: SC.v_portat,   pars: 'verbum' },
        { la: 'tenet',    scene: SC.v_tenet,    pars: 'verbum' }
      ],
      story: [
        /* Aen. 2,634–638 */
        { la: 'Per ignēs Aenēās ad domum suam venit. Ibi pater Anchīsēs, fīlius Ascanius, uxor Creūsa eum exspectant.',
          scene: SC.a8_domus,
          nova: [{ w: 'Anchīsēs', e: '👴', g: 'pater Aenēae, vir senex' },
                 { w: 'Ascanius', e: '👶', g: 'fīlius Aenēae, puer parvus; Iūlus quoque dīcitur' },
                 { w: 'Creūsa', e: '👤', g: 'uxor Aenēae, māter Ascaniī' }] },

        /* Aen. 2,638–649 */
        { la: 'Sed Anchīsēs senex fugere nōn vult: "Vōs īte," inquit; "ego hīc manēbō."',
          scene: SC.a8_anchises },

        /* Aen. 2,679–684 — the omen, and only this one */
        { la: 'Tum rēs mīra vidētur: super Ascaniī caput ignis parvus lūcet, neque puer dolet.',
          scene: SC.a8_flamma },

        { la: 'Anchīsēs signum deōrum agnōscit et tandem fugere vult.',
          scene: SC.a8_consentit },

        /* Aen. 2,707–711 — the carry itself */
        { la: 'Itaque Aenēās patrem suum in umerīs portat, quia senex ambulāre iam nōn potest.',
          scene: SC.a8_portat,
          nova: [{ w: 'portat', e: '🤲', g: 'in umerīs fert; umerī sunt suprā bracchia, ubi onus pōnitur' }] },

        { la: 'Anchīsēs penātēs, deōs domūs, manibus tenet: sacra Trōiae nōn relinquuntur.',
          scene: SC.a8_penates,
          nova: [{ w: 'penātēs', e: '🏠', g: 'deī domūs et familiae: parvae fōrmae quae in ārā domesticā stant' },
                 { w: 'tenet', e: '🤝', g: 'manū suā habet et nōn dīmittit' }] },

        /* Aen. 2,723–724 in prose, before the lines themselves */
        { la: 'Ascanius parvā manū dextram patris tenet et post eum it, sed passūs eius nōn tam longī sunt.',
          scene: SC.a8_manus },

        { la: 'Creūsa post eōs it, et omnēs per urbem ārdentem ad portam currunt.',
          scene: SC.a8_fuga },

        /* Aen. 2,763–767, turned into the liber's moral hinge */
        { la: 'Aliī cīvēs aurum et vestēs ex domibus portant; Aenēās aurum nōn portat.',
          scene: SC.a8_aurum,
          nova: [{ w: 'aurum', e: '🥇', g: 'metallum flāvum et pretiōsum: ex aurō corōnae fīunt' }] },

        { la: 'Ille patrem, fīlium, penātēs portat. Aurum enim ārdēre potest, pietās nōn potest.',
          scene: SC.a8_pietas,
          nova: [{ w: 'pietās', e: '🙏', g: 'amor et cūra ergā deōs, ergā patrem, ergā patriam' }] },

        { la: 'Haec est pietās Aenēae: propter eam "pius Aenēās" apud Vergilium vocātur.',
          scene: SC.a8_pietas },

        /* Aen. 2,735–744, B-RATED: lost with grief and mystery */
        { la: 'Sed ubi ad portam veniunt, Creūsa nōn iam post eōs est.',
          scene: SC.a8_porta },

        { la: 'Aenēās trīstis in urbem redit et per viās nōmen uxōris vocat, sed nēmō respondet.',
          scene: SC.a8_quaerit },

        /* Aen. 2,771–794 */
        { la: 'Tum imāgō Creūsae eī appāret et placidē dīcit: "Nōlī lacrimāre, dulcis coniūnx. Fāta mē hīc tenent; tibi rēgnum novum et nova uxor in Ītaliā manent."',
          scene: SC.a8_umbra,
          nova: [{ w: 'imāgō', e: '👤', g: 'nōn corpus, sed fōrma quae vidērī potest' },
                 { w: 'coniūnx', e: '👤', g: '= uxor' }] },

        { la: 'Aenēās eam tenēre vult, sed manūs per imāginem eunt: iam nōn corpus, sed umbra est.',
          scene: SC.a8_umbra },

        /* Aen. 2,796–804 */
        { la: 'Tum ad sociōs redit, et multī Trōiānī cum eō ad montem Īdam fugiunt; penātēs Trōiae cum eīs veniunt.',
          scene: SC.a8_socii },

        /* ---- VERBA VERGILIĪ IPSĪUS — Aen. 2,723–724 ---- */
        { la: 'Haec omnia Vergilius poēta versibus cecinit, et Aenēān ipsum loquentem facit. Nunc verba Vergiliī ipsīus audī:',
          scene: SC.a8_vergilius,
          nova: [{ w: 'poēta', e: '💬', g: 'quī carmina facit et canit' }] },

        { la: 'succēdōque onerī; dextrae sē parvus Iūlus',
          scene: SC.a8_versus1,
          ttsText: 'succedoque oneri; dextrae se parvus Iulus',
          nova: [{ w: 'succēdō', e: '🤲', g: 'sub onus eō et id in umerōs accipiō. Aenēās ipse hīc loquitur: "ego succēdō"' },
                 { w: 'onerī', e: '👴', g: 'onus = quod portātur; hoc onus pater est' },
                 { w: 'dextrae', e: '🤝', g: 'dextra = manus dextra; dextrae meae' },
                 { w: 'Iūlus', e: '👶', g: 'Iūlus = Ascanius, fīlius Aenēae' }] },

        { la: 'implicuit sequiturque patrem nōn passibus aequīs.',
          scene: SC.a8_versus2,
          ttsText: 'implicuit sequiturque patrem non passibus aequis.',
          nova: [{ w: 'implicuit', e: '🤝', g: 'manum suam manuī patris implicuit: eam tenet neque dīmittit' },
                 { w: 'sequitur', e: '🚶', g: 'post alium it' },
                 { w: 'passibus', e: '🚶', g: 'passus = quod pede facis cum ambulās' },
                 { w: 'aequīs', e: '⚖', g: 'aequus = pār (unde aequor = mare aequum, ut in capitulō prīmō): passūs puerī nōn tam longī sunt quam patris' }] },

        { la: 'Id est: onus in umerōs meōs accipiō; parvus Iūlus dextram meam manū tenet et patrem sequitur, sed passūs eius nōn tam longī sunt quam meī.',
          scene: SC.a8_paraphrasis },

        { la: 'Versūs memorābilēs: "sequiturque patrem nōn passibus aequīs." Sīc pietās Aenēae ex ignibus Trōiae Rōmam portat.',
          scene: SC.a8_memoria,
          ttsText: 'Sequiturque patrem non passibus aequis. Sic pietas Aeneae ex ignibus Troiae Romam portat.' }
      ],
      ludus: {
        words: [
          { la: 'Anchīsēs', scene: SC.v_anchises, emoji: '👴' },
          { la: 'Ascanius', scene: SC.v_ascanius, emoji: '👶' },
          { la: 'penātēs',  scene: SC.v_penates,  emoji: '🏠' },
          { la: 'aurum',    scene: SC.v_aurum,    emoji: '🥇' },
          { la: 'portat',   scene: SC.v_portat,   emoji: '🤲' },
          { la: 'ignis',    scene: SC.v_ignis,    emoji: '🔥' }
        ]
      },
      /* SONUS: `portat` and `pietās` are the same carry pose (the act
         and its reason), so they are never offered together; `Anchīsēs`
         and `Creūsa` are two robed adults in the same room and are
         likewise kept apart; `Ascanius`, `penātēs` and `aurum` are this
         capitulum's three unmistakable cards and carry the sets. */
      sonus: [
        { la: 'Ascanius',
          answer: { la: 'Ascanius', scene: SC.v_ascanius },
          options: [{ la: 'Ascanius', scene: SC.v_ascanius },
                    { la: 'penātēs', scene: SC.v_penates },
                    { la: 'aurum', scene: SC.v_aurum }] },
        { la: 'penātēs',
          answer: { la: 'penātēs', scene: SC.v_penates },
          options: [{ la: 'penātēs', scene: SC.v_penates },
                    { la: 'aurum', scene: SC.v_aurum },
                    { la: 'Ascanius', scene: SC.v_ascanius },
                    { la: 'portat', scene: SC.v_portat }] },
        { la: 'aurum',
          answer: { la: 'aurum', scene: SC.v_aurum },
          options: [{ la: 'aurum', scene: SC.v_aurum },
                    { la: 'penātēs', scene: SC.v_penates },
                    { la: 'Anchīsēs', scene: SC.v_anchises }] },
        { la: 'portat',
          answer: { la: 'portat', scene: SC.v_portat },
          options: [{ la: 'portat', scene: SC.v_portat },
                    { la: 'aurum', scene: SC.v_aurum },
                    { la: 'Creūsa', scene: SC.v_creusa },
                    { la: 'penātēs', scene: SC.v_penates }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Anchīsēs', scene: SC.v_anchises },
            { la: 'Ascanius', scene: SC.v_ascanius },
            { la: 'Creūsa',   scene: SC.v_creusa },
            { la: 'penātēs',  scene: SC.v_penates },
            { la: 'aurum',    scene: SC.v_aurum },
            { la: 'portat',   scene: SC.v_portat }
          ],
          scrambles: [
            { la: 'Aenēās patrem in umerīs portat.',   scene: SC.a8_portat },
            { la: 'Anchīsēs penātēs manibus tenet.',   scene: SC.a8_penates },
            { la: 'Ascanius dextram patris tenet.',    scene: SC.a8_manus },
            { la: 'Aenēās aurum nōn portat.',          scene: SC.a8_aurum }
          ]
        },
        corrige: [
          { words: ['Aenēās', 'patrem', 'in', 'umerōs', 'portat.'], wrong: 3,
            options: ['umerīs', 'umerum', 'umerōrum'], correct: 0, scene: SC.a8_portat },
          { words: ['Anchīsēs', 'penātēs', 'manibus', 'portat.'], wrong: 3,
            options: ['tenet.', 'relinquit.', 'timet.'], correct: 0, scene: SC.a8_penates },
          { words: ['Ascanius', 'dextram', 'patris', 'tenent.'], wrong: 3,
            options: ['tenet.', 'tenēre.', 'tenentur.'], correct: 0, scene: SC.a8_manus },
          { words: ['Aenēās', 'aurum', 'nōn', 'portat,', 'sed', 'pietātem', 'ārdet.'], wrong: 6,
            options: ['servat.', 'trahit.', 'timet.'], correct: 0, scene: SC.a8_pietas },
          { words: ['Urbe', 'ārdēns,', 'Aenēās', 'ad', 'portam', 'contendit.'], wrong: 1,
            options: ['ārdente,', 'ārdentem,', 'ārdet,'], correct: 0, scene: SC.a8_fuga }
        ],
        comple: [
          { text: 'Aenēās patrem in umer___ portat.',
            options: ['īs', 'ōs', 'um'], correct: 0, scene: SC.a8_portat },
          { text: 'Anchīsēs ___ manibus tenet.',
            options: ['penātēs', 'penātibus', 'penātium'], correct: 0, scene: SC.a8_penates },
          { text: 'Ascanius dextram patris ___.',
            options: ['tenet', 'tenent', 'tenēre'], correct: 0, scene: SC.a8_manus },
          { text: 'Urbe ārdent___, omnēs ad portam contendunt.',
            options: ['e', 'em', 'ēs'], correct: 0, scene: SC.a8_fuga },
          { text: 'Aenēās ___ nōn portat: patrem portat.',
            options: ['aurum', 'aurō', 'aurī'], correct: 0, scene: SC.a8_aurum },
          { text: 'Haec est ___ Aenēae.',
            options: ['pietās', 'pietātem', 'pietāte'], correct: 0, scene: SC.a8_pietas }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ---------- */

  CONTENT.registerRegion({
    track: 'aeneis',
    id: 'al2',
    titulus: 'Trōia',
    ladder: 'S12',             /* CURRICULUM §0: the whole ladder is open */
    progressId: 'al2',
    capitula: capitula,

    /* ============ PROBĀTIŌ — NOX TRŌIĀNA ============
       CURRICULUM §3: "Boss per liber = probātiō themed to the liber
       (… horse-sorting …)". Two phases, and neither is a fight:

       1. ŌRDINĀ — PIETĀS AS GAMEPLAY. The falling words are the things
          in the burning city, and the two zones are the whole moral of
          the liber: what Aenēās CARRIES OUT (his father, his son, the
          household gods — and the pietās that makes him do it) against
          what he LEAVES BURNING (the gold, the horse, the fire, the
          enemy). The learner does not answer a question about pietās;
          the learner performs it. Both zones carry an actor badge the
          library already owns: the ship he is carrying them TO, and
          the fire he is leaving them IN.
          `items` is deliberately absent: the phase then draws from the
          whole liber's vocabulary and silently drops every word no
          category claims (js/probatio.js, zoneOf), so the eight sorted
          words are exactly the eight named below and nothing else can
          fall.
       2. SENTENTIA. Six HAND-AUTHORED items (AUTHORING-BRIEF, "Boss
          clamor/sententia items"). Every gap is a picturable content
          lexeme with same-POS distractors that are wrong IN THE
          PICTURE, and every single item carries the syntax this liber
          taught: three ablātīvī absolūtī, two accūsātīvī cum īnfīnītīvō
          and one passive — so the learner must READ THE CONSTRUCTION to
          know which noun can fill the slot, not merely recognise a
          word.

       hp 6 + 5 = 11, seconds 45 + 55 = 100: over the anti-cheat floor,
       and longer than a Fabulae duel because a trial is meant to be
       read, not raced. */
    boss: {
      id: 'b_al2',
      progressId: 'al2',
      kind: 'probatio',
      name: 'Nox Trōiāna',
      actor: 'woodenHorse',
      bg: 'troy',
      sceneY: 208,
      sceneScale: 0.9,
      /* legacy single-phase tuning: a client without js/probatio.js must
         still run something, and rules.php derives rule_boss_min_ms from
         these numbers (same reason r01/r02/l2/al1 keep theirs). */
      hp: 11,
      seconds: 100,
      pos: { x: 0.38, y: 0.15 },
      phases: [
        { type: 'ordina', hp: 6, seconds: 45,
          /* the banner is 260 px wide at bold 24 px (js/probatio.js
             promptBanner) — 'QUID AENĒĀS PORTAT?' was clipped to
             "UID AENĒĀS PORTA" in the first headless frame */
          titulus: 'QUID PORTAT?',
          categories: [
            { label: 'PORTAT', actor: 'ship',
              accept: ['Anchīsēs', 'Ascanius', 'penātēs', 'pietās'] },
            { label: 'RELINQUIT', actor: 'fire',
              accept: ['aurum', 'equus', 'ignis', 'hostis'] }
          ] },
        { type: 'sententia', hp: 5, seconds: 55,
          items: [
            /* acc. + inf.: the gap is the NOMINATIVE subject, so the
               learner has to parse "equum … esse" to see that the
               missing word is the one doing the saying. */
            { text: '____ Trōiānīs dīcit equum dōnum deae esse.',
              answer: 'captīvus',
              options: ['captīvus', 'sacerdōs', 'serpēns'],
              scene: SC.a6_sinon },
            { text: '____ Trōiānōs monet equum perīculōsum esse.',
              answer: 'sacerdōs',
              options: ['sacerdōs', 'captīvus', 'hostis'],
              scene: SC.a6_monet },
            /* abl. abs. + adjective agreement: "ligneus" is masculine
               singular nominative, and only one card can wear it */
            { text: 'Castrīs relictīs, ____ ligneus sōlus in lītore stat.',
              answer: 'equus',
              options: ['equus', 'ignis', 'aurum'],
              scene: SC.a5_litus },
            /* abl. abs. again, this time with "magnus" as the cue */
            { text: 'Nocte factā, ____ magnus per urbem audītur.',
              answer: 'clāmor',
              options: ['clāmor', 'somnium', 'lignum'],
              scene: SC.a7_clamor },
            /* abl. abs. + PASSIVE: "portātur" makes the gap the thing
               carried, and "senex" tells the learner which one */
            { text: 'Urbe ārdente, ____ senex in umerīs fīliī portātur.',
              answer: 'Anchīsēs',
              options: ['Anchīsēs', 'Ascanius', 'Creūsa'],
              scene: SC.a8_portat },
            /* the liber's own moral, as a sentence: "sōla" is feminine
               singular, and only one card can be it */
            /* distractors are feminine singulars too, so `sōla` cannot give
               the answer away by agreement alone — and neither is attested
               beside `sōla` anywhere in the liber (the engine's own
               gap-context check caught `āra`: a6 ends "āra sōla manet") */
            { text: 'Aurō relictō, ____ sōla Aenēān servat.',
              answer: 'pietās',
              options: ['pietās', 'hasta', 'nox'],
              scene: SC.a8_pietas }
          ] }
      ],
      /* 5 cumulative questions; every word is a vocab entry WITH a
         picture in its own capitulum (js/app.js bossWords()). All four
         capitula are represented, a5 twice because it is the liber's
         longest. Answer key lives on the server — see
         content/_pending/a-l2.reg.json. */
      quiz: [
        { la: 'equus',    from: 'a5' },
        { la: 'castra',   from: 'a5' },
        { la: 'serpēns',  from: 'a6' },
        { la: 'ignis',    from: 'a7' },
        { la: 'penātēs',  from: 'a8' }
      ]
    }
  });
})();
