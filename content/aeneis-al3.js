/* ============================================================
   content/aeneis-al3.js — AENĒIS · Liber III · ERRŌRĒS  (ladder S12)
   ------------------------------------------------------------
   The liber of the wandering, told as GRADED PROSE. Aenēās is still
   speaking at Dīdō's table (the whole book is his own narrative), and
   the liber's shape is one long voyage from a burnt city to a grave:

     a9  Errōrēs per maria — Aen. 3,1–191
     a10 Harpyiae          — Aen. 3,192–277
     a11 Andromachē        — Aen. 3,294–505  + VERBA VERGILIĪ inline
                             (3,395, quoted whole)
     a12 Cyclōpes          — Aen. 3,506–718  + VERBA VERGILIĪ IPSĪUS
                             (3,71–72)

   THE CHARTER is the one written at the head of content/aeneis-al1.js
   and, in long form, at the head of content/_ledger-aeneis.md. In
   short: PRŌVECTĪ — the whole S1–S12 ladder is open from the first
   page; what is graded is the VOCABULARY (≤10 new content cards per
   capitulum, each pictured and recycled ≥3× inside its own capitulum);
   poetic diction is pre-taught by gloss BEFORE the authentic line uses
   it; the liber's last capitulum closes with "Verba Vergiliī ipsīus".

   WHICH LINES THIS LIBER QUOTES, and why both:
     · 3,395 "fāta viam invenient aderitque vocātus Apollō."
       Quoted WHOLE, inside a11, at the exact moment Helenus says it —
       the treatment Liber I gives 1,203 and Liber II gives 2,49. The
       line IS the scene: it is the vātēs' answer to the one thing the
       Trōiānī are afraid of, and what they are afraid of is a10's own
       prophecy of the tables. Its hard words are pre-taught in the
       prose of the page before ("Nōlī timēre mēnsās … fāta viam
       inveniunt"), `fātum` is a1's gloss and `Apollō` is a9's.
     · 3,71–72 "dēdūcunt sociī nāvīs et lītora complent; /
       prōvehimur portū terraeque urbēsque recēdunt."
       TWO whole hexameters as the liber's closing VERBA VERGILIĪ, on
       the last page-block of a12. They are quoted OUT OF NARRATIVE
       SEQUENCE — they belong to the departure of a9 — exactly as
       Liber I quotes the proem (1,1–3) in a4, and for the same
       reason: the closing quotation must land on the LIBER's picture,
       and this liber's picture is not any one landfall but the
       leaving of them all. The frame page says so in Latin ("tōtus
       hic liber ūna nāvigātiō est"). Every content word is in hand at
       the point of quotation: `sociī` is a2's card, `nāvis` and
       `terra` and `urbs` are a1's and the cōpia commūnis, `lītus` was
       glossed under a2's `ōra`, and `portus` is a9's own card, taught
       fifty pages before the line needs it; only dēdūcunt, complent,
       prōvehimur and recēdunt are new, and a9 and a11 pre-teach
       `recēdit` and `complētur` in prose so that even those two are
       met twice before Vergil uses them.
     Both are OCT/Mynors text with quantity marks added and NOT ONE
     LETTER CHANGED.

   HOW THE PEOPLE AND THE MŌNSTRA ARE DRAWN.
     · Aenēās, Anchīsēs and Ascanius are the same figures as in Librī
       I–II, colour for colour (TROIA + GOLD; the patriarch's cream
       and umber; the child's gold).
     · MISSING ART, reported not substituted (AUTHORING-BRIEF "SCENES
       FIRST"): there is NO HARPY actor in the library, and none can be
       honestly composed. The obvious compose — an `aquila` body with a
       veiled `person` head set on it — was tried on paper and rejected
       twice over: it is exactly the horror imagery DESIGN §8 forbids,
       and a floating head at tile size reads as a wound, not a face.
       The Harpyiae are therefore drawn as WHAT THE TEXT CALLS THEM:
       `avēs foedae`, i.e. the `aquila` actor with its colour overridden
       to a livid grey (`FOEDUM`), always ABOVE the frame's other
       figures, never touching anything, and never given a face beyond
       the bird's own. The maidens' faces of Aen. 3,216 are OMITTED
       from the text as well as from the art — a picture the learner
       cannot see must not be asserted in a gloss.
     · POLYPHĒMUS IS SHOWN ONLY AT A DISTANCE and only ONCE, as a
       `patriarch` at scale 2.1 with his `grex` behind him, standing on
       the far side of the frame. He is blind before he appears, and
       the text says the whole of it in two words — `caecus est` — and
       then refuses to say more, in Latin, on the page: *Plūra
       Achaemenidēs nōn dīcit.* The blinding (Aen. 3,622–638, with the
       eating of Ulysses' men) is OMITTED ENTIRELY: it is neither
       shown, nor told, nor alluded to beyond `Ulixēs eum dolō
       superāvit`. His single eye lives in the vocabulary gloss of
       `Cyclōps`, where it is a fact about a kind of giant, and nowhere
       else; the drawn figure's eyes are simply CLOSED (`eyes:
       'closed'`, the library's own option), so no eye is ever counted
       on the page.

   B RATING (DESIGN §8), the whole liber:
     · Nobody is struck, wounded or drowned anywhere. The one fight in
       the liber is the Harpy fight, and its point is that the weapons
       do NOT harm: *hastae tamen avēs nōn laedunt.*
     · ANCHĪSĒS' DEATH (3,708–715) is acknowledged in one dignified
       sentence — *Anchīsēs pater moritur* — with a scene of his son
       alone and no body anywhere. It is told because Liber V is built
       on his grave; it is told in six words because that is all a
       child needs.
     · POLYDŌRUS (3,19–68) IS OMITTED ENTIRELY: a bleeding bush over a
       murdered boy is horror imagery, and nothing in the liber's arc
       needs it. The plague of Crete (3,137–142) keeps only its
       harmless half — *frūmentum nōn crēscit* — and no sick person
       appears.
     · Scylla and Charybdis are named nowhere and drawn nowhere: the
       strait is `saxa perīculōsa` and a ship between two rocks.

   IDS ARE DATABASE KEYS once shipped: a9…a12, progressId 'al3'
   (content/README.md §5). The file is aeneis-al3.js and not
   aeneis-l3.js for the reason set out at the head of
   content/aeneis-al1.js: the loader derives content/<track>-<region>.js
   and 'l3' is Historia's on the server's flat region map.

   Schema: content/README.md. Style: docs/LATIN-STYLE.md §3.
   ============================================================ */
(function () {
  'use strict';

  var G = 210;               /* ground line in scene space (400 × 240) */
  var SEA = 212;             /* where a figure stands on the sea scenes */

  var TROIA  = '#b3572b';    /* Trojan terracotta — a1's own colour     */
  var GOLD   = '#e0a93e';
  var CANUS  = '#f4e7cd';    /* Anchīsēs' robe: old man's cream         */
  var UMBER  = '#7a4a26';
  var VINUM  = '#8e4257';    /* Andromachē's robe: mourning wine        */
  var FOEDUM = '#6f6a5c';    /* the Harpyiae: livid grey, never brown   */
  var SAXUM  = '#8d8579';    /* Polyphēmus' rock-grey tunic             */

  function merge(o, opts) {
    var k;
    for (k in (opts || {})) {
      if (Object.prototype.hasOwnProperty.call(opts, k)) { o[k] = opts[k]; }
    }
    return o;
  }

  /* Aenēās — the same man as in Librī I–II, page for page */
  function heros(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'man',
                   robeColor: TROIA, mantleColor: GOLD, shield: true }, opts);
  }
  function anchises(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'patriarch',
                   robeColor: CANUS, mantleColor: UMBER }, opts);
  }
  function ascanius(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'child',
                   robeColor: GOLD }, opts);
  }
  function troianus(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'soldier',
                   robeColor: TROIA, mantleColor: GOLD }, opts);
  }
  function andromache(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'woman',
                   robeColor: VINUM, mantleColor: CANUS }, opts);
  }
  /* Helenus: Trōiānus sacerdōs who is now also a king — the `priest`
     of Liber II with a crown on him, which no other figure wears here */
  function helenus(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'priest',
                   crown: true, mantleColor: '#4d6c8a' }, opts);
  }
  /* a Harpy: the `aquila` body, livid, always in flight and always
     above everything else in the frame. See the header. */
  function harpyia(x, y, s, opts) {
    return merge({ t: 'aquila', x: x, y: y, s: s, pose: 'fly',
                   color: FOEDUM }, opts);
  }
  /* Polyphēmus: a `patriarch` at 2.1, eyes CLOSED, his flock behind
     him, never nearer the reader than the far half of the frame */
  function cyclops(x, y, s, opts) {
    return merge({ t: 'person', x: x, y: y, s: s, role: 'patriarch',
                   robeColor: SAXUM, mantleColor: UMBER, eyes: 'closed',
                   hairColor: '#6e6355', beardColor: '#6e6355' }, opts);
  }

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ a9 · vocabulary cards ============ */

    /* portus: ships AT REST beside land — furled sails and a headland.
       `errat` below is the same two ships with sails set on empty
       water, and the two are never offered in one SONUS set. */
    v_portus:   { bg: 'sea', items: [
                  { t: 'mountain', x: 52,  y: G, s: 0.8 },
                  { t: 'ship',     x: 196, y: 202, s: 0.95, sail: 'furled' },
                  { t: 'ship',     x: 312, y: 214, s: 0.72, sail: 'furled' }
                ] },

    /* īnsula: land with water all round it and NO ship — the card must
       mean the island, not the voyage */
    v_insula:   { bg: 'sea', items: [
                  { t: 'mountain', x: 186, y: G, s: 0.92 },
                  { t: 'palmTree', x: 292, y: G, s: 0.8 }
                ] },

    v_oraculum: { bg: 'plain', items: [
                  { t: 'temple', x: 146, y: G, s: 1 },
                  { t: 'person', x: 288, y: G, s: 1.15, role: 'priest', pose: 'arms-up' }
                ],
                bubbles: [{ x: 214, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    /* patria: the city itself, on the burning ground of bgTroy, with
       nobody in it — what they left, not who left it */
    v_patria:   { bg: 'troy', items: [
                  { t: 'cityWall', x: 196, y: G, s: 1.15 }
                ] },

    v_frumentum: { bg: 'plain', items: [
                  { t: 'frumentum', x: 152, y: G, s: 1.2 },
                  { t: 'frumentum', x: 250, y: G, s: 1.05 }
                ] },

    /* exsul: a man walking AWAY from a wall that is already small */
    v_exsul:    { bg: 'plain', items: [
                  { t: 'cityWall', x: 336, y: G, s: 0.62 },
                  heros(138, G, 1.2, { pose: 'walk', shield: false })
                ] },

    v_errat:    { bg: 'sea', items: [
                  { t: 'ship', x: 152, y: 200, s: 1 },
                  { t: 'ship', x: 306, y: 214, s: 0.76 }
                ],
                bubbles: [{ x: 200, y: 56, w: 44, h: 34, text: '⬅', kind: 'thought', tail: 'left', fs: 18 },
                          { x: 258, y: 56, w: 44, h: 34, text: '➡', kind: 'thought', tail: 'right', fs: 18 }] },

    /* ============ a9 · story ============ */

    a9_troia:   { bg: 'troy', items: [
                  { t: 'cityWall',   x: 300, y: G, s: 0.95 },
                  { t: 'crowdGroup', x: 120, y: G, s: 0.95, n: 5 }
                ] },

    a9_classis: { bg: 'mountain', items: [
                  { t: 'truncus', x: 96,  y: G, s: 1 },
                  { t: 'ship',    x: 246, y: 198, s: 0.95, sail: 'furled' },
                  { t: 'crowdGroup', x: 118, y: G - 26, s: 0.7, n: 3 }
                ] },

    a9_portus:  { bg: 'sea', items: [
                  { t: 'mountain', x: 48,  y: G, s: 0.78 },
                  { t: 'ship',     x: 200, y: 200, s: 1 },
                  { t: 'ship',     x: 320, y: 214, s: 0.74 }
                ] },

    a9_recedit: { bg: 'sea', items: [
                  { t: 'cityWall', x: 348, y: G, s: 0.5 },
                  { t: 'ship',     x: 148, y: 200, s: 1.05 },
                  heros(144, 178, 0.55, { shield: false })
                ] },

    a9_delos:   { bg: 'sea', items: [
                  { t: 'mountain', x: 168, y: G, s: 0.88 },
                  { t: 'temple',   x: 296, y: G, s: 0.62 }
                ] },

    a9_rogat:   { bg: 'plain', items: [
                  { t: 'temple', x: 300, y: G, s: 0.8 },
                  heros(124, G, 1.15, { pose: 'arms-up', shield: false })
                ],
                bubbles: [{ x: 208, y: 58, w: 56, h: 42, text: '❓', kind: 'speech', tail: 'left', fs: 22 }] },

    a9_vox:     { bg: 'plain', items: [
                  { t: 'temple', x: 150, y: G, s: 1 },
                  { t: 'person', x: 292, y: G, s: 1.1, role: 'priest', pose: 'point' }
                ],
                bubbles: [{ x: 216, y: 56, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a9_anchises: { bg: 'sea', items: [
                  anchises(140, G, 1.2, { pose: 'point' }),
                  heros(284, G, 1.1, { flip: true, shield: false })
                ],
                bubbles: [{ x: 212, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a9_creta:   { bg: 'city', items: [
                  { t: 'cityWall',   x: 268, y: G, s: 0.9 },
                  { t: 'crowdGroup', x: 112, y: G, s: 0.95, n: 5, pose: 'point' }
                ] },

    a9_frumentum: { bg: 'desert', items: [
                  { t: 'frumentum', x: 132, y: G, s: 1 },
                  { t: 'frumentum', x: 226, y: G, s: 0.86 },
                  { t: 'sol',       x: 322, y: 62, s: 1 }
                ] },

    a9_fessi:   { bg: 'desert', items: [
                  { t: 'person', x: 146, y: G, s: 1.1, role: 'crowd', pose: 'kneel' },
                  { t: 'person', x: 240, y: G, s: 1.1, role: 'crowd', pose: 'kneel', flip: true }
                ],
                bubbles: [{ x: 62, y: 90, w: 54, h: 40, text: '😖', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the penātēs speak in a dream: the household gods of a8, drawn as
       a8 draws them (two small robed figures on the altar), and the
       sleeping man under them */
    a9_penates: { bg: 'nightSky', items: [
                  { t: 'altar',  x: 296, y: G, s: 0.9, flame: false },
                  { t: 'person', x: 284, y: G - 62, s: 0.42, role: 'patriarch', staff: false },
                  { t: 'person', x: 310, y: G - 62, s: 0.42, role: 'patriarch', staff: false },
                  heros(132, G, 1.05, { pose: 'sleep', shield: false })
                ],
                bubbles: [{ x: 168, y: 54, w: 62, h: 44, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a9_hesperia: { bg: 'nightSky', items: [
                  { t: 'altar',  x: 130, y: G, s: 0.9, flame: false },
                  { t: 'person', x: 118, y: G - 62, s: 0.42, role: 'patriarch', staff: false },
                  { t: 'person', x: 144, y: G - 62, s: 0.42, role: 'patriarch', staff: false },
                  { t: 'mountain', x: 330, y: G, s: 0.72 }
                ] },

    a9_narrat:  { bg: 'sea', items: [
                  heros(126, G, 1.15, { pose: 'point', shield: false }),
                  anchises(278, G, 1.15, { flip: true })
                ],
                bubbles: [{ x: 206, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a9_vela:    { bg: 'sea', items: [
                  { t: 'ship', x: 166, y: 198, s: 1.05 },
                  { t: 'ship', x: 306, y: 212, s: 0.8 }
                ] },

    a9_errant:  { bg: 'sea', items: [
                  { t: 'mountain', x: 348, y: G, s: 0.62 },
                  { t: 'ship',     x: 138, y: 200, s: 1 },
                  { t: 'ship',     x: 262, y: 214, s: 0.76 }
                ],
                bubbles: [{ x: 190, y: 54, w: 44, h: 34, text: '⬅', kind: 'thought', tail: 'left', fs: 18 },
                          { x: 248, y: 54, w: 44, h: 34, text: '➡', kind: 'thought', tail: 'right', fs: 18 }] },

    a9_spes:    { bg: 'sea', items: [
                  { t: 'sol',  x: 70,  y: 74, s: 0.95 },
                  { t: 'ship', x: 216, y: 202, s: 1 },
                  heros(212, 180, 0.55, { pose: 'arms-up', shield: false })
                ] },

    a9_memoria: { bg: 'sea', items: [
                  { t: 'mountain', x: 356, y: G, s: 0.55 },
                  { t: 'ship',     x: 150, y: 200, s: 1.05 },
                  { t: 'ship',     x: 268, y: 214, s: 0.78 }
                ] },

    /* ============ a10 · vocabulary cards ============ */

    v_avis:     { bg: 'plain', items: [
                  { t: 'aquila', x: 200, y: 148, s: 1.8, pose: 'fly' }
                ] },

    /* mēnsa: the table and its dish, on bare ground — the thing the
       whole prophecy turns on */
    v_mensa:    { bg: 'plain', items: [
                  { t: 'mensa',  x: 200, y: G, s: 1.35 },
                  { t: 'patina', x: 200, y: G - 38, s: 1 }
                ] },

    v_armentum: { bg: 'plain', items: [
                  { t: 'bos', x: 142, y: G, s: 1.05 },
                  { t: 'bos', x: 284, y: G, s: 0.92, flip: true }
                ] },

    /* rapit: the bird ABOVE the table, never on it — see the header */
    v_rapit:    { bg: 'sea', items: [
                  { t: 'mensa',  x: 186, y: G, s: 1.15 },
                  { t: 'patina', x: 186, y: G - 34, s: 0.9 },
                  harpyia(196, 116, 1.5, { flip: true })
                ] },

    v_fugat:    { bg: 'sea', items: [
                  troianus(120, G, 1.15, { pose: 'point' }),
                  harpyia(308, 116, 1.15)
                ] },

    v_praedicit: { bg: 'sea', items: [
                  { t: 'mountain', x: 74, y: G, s: 0.7 },
                  harpyia(86, 138, 1.05, { pose: 'stand' }),
                  { t: 'crowdGroup', x: 306, y: G, s: 0.78, n: 4 }
                ],
                bubbles: [{ x: 196, y: 54, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    v_orat:     { bg: 'sea', items: [
                  { t: 'altar', x: 300, y: G, s: 0.9 },
                  anchises(150, G, 1.2, { pose: 'arms-up', staff: false })
                ] },

    /* ============ a10 · story ============ */

    a10_tempestas: { bg: 'stormSea', items: [
                  { t: 'murusAquae', x: 60,  y: 234, s: 0.72, fish: false },
                  { t: 'ship',       x: 208, y: 198, s: 0.95, sail: 'furled' },
                  { t: 'murusAquae', x: 350, y: 234, s: 0.72, fish: false, flip: true }
                ] },

    a10_insulae: { bg: 'sea', items: [
                  { t: 'mountain', x: 176, y: G, s: 0.85 },
                  { t: 'palmTree', x: 286, y: G, s: 0.78 },
                  { t: 'ship',     x: 60,  y: 212, s: 0.7, sail: 'furled' }
                ] },

    a10_armenta: { bg: 'plain', items: [
                  { t: 'bos',      x: 130, y: G, s: 1 },
                  { t: 'bos',      x: 262, y: G, s: 0.88, flip: true },
                  { t: 'palmTree', x: 352, y: G, s: 0.7 }
                ] },

    a10_mensae: { bg: 'sea', items: [
                  { t: 'mensa',      x: 148, y: G, s: 1.15 },
                  { t: 'patina',     x: 148, y: G - 34, s: 0.9 },
                  { t: 'crowdGroup', x: 306, y: G, s: 0.82, n: 4 }
                ] },

    a10_veniunt: { bg: 'sea', items: [
                  { t: 'mensa',  x: 160, y: G, s: 1.1 },
                  { t: 'patina', x: 160, y: G - 32, s: 0.85 },
                  harpyia(120, 104, 1.15),
                  harpyia(258, 84,  0.95, { flip: true }),
                  harpyia(340, 122, 0.8)
                ] },

    a10_rapiunt: { bg: 'sea', items: [
                  { t: 'mensa',  x: 190, y: G, s: 1.15 },
                  { t: 'patina', x: 190, y: G - 34, s: 0.9 },
                  harpyia(200, 112, 1.55, { flip: true })
                ] },

    a10_iterum: { bg: 'forest', items: [
                  { t: 'tree',   x: 78,  y: G, s: 1 },
                  { t: 'mensa',  x: 216, y: G, s: 1.1 },
                  { t: 'patina', x: 216, y: G - 32, s: 0.85 },
                  { t: 'tree',   x: 348, y: G, s: 0.85 }
                ] },

    a10_arma:   { bg: 'sea', items: [
                  troianus(112, G, 1.15, { pose: 'point' }),
                  troianus(178, G, 1.05, { pose: 'point' }),
                  harpyia(316, 108, 1.2)
                ] },

    a10_nonlaedunt: { bg: 'sea', items: [
                  troianus(120, G, 1.1),
                  harpyia(298, 96, 1.25, { flip: true })
                ],
                bubbles: [{ x: 214, y: 60, w: 50, h: 38, text: '❓', kind: 'thought', tail: 'right', fs: 20 }] },

    a10_celaeno: { bg: 'sea', items: [
                  { t: 'mountain', x: 78, y: G, s: 0.72 },
                  harpyia(90, 140, 1.1, { pose: 'stand' }),
                  { t: 'crowdGroup', x: 300, y: G, s: 0.8, n: 4 }
                ],
                bubbles: [{ x: 198, y: 52, w: 60, h: 44, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a10_fames: { bg: 'sea', items: [
                  { t: 'mensa',  x: 200, y: G, s: 1.25 },
                  { t: 'patina', x: 200, y: G - 36, s: 0.95 }
                ],
                bubbles: [{ x: 82, y: 88, w: 54, h: 40, text: '❓', kind: 'thought', tail: 'right', fs: 20 }] },

    a10_timent: { bg: 'sea', items: [
                  { t: 'crowdGroup', x: 200, y: G, s: 1.05, n: 5 }
                ],
                bubbles: [{ x: 82, y: 88, w: 54, h: 40, text: '😖', kind: 'thought', tail: 'right', fs: 20 }] },

    a10_orat:   { bg: 'sea', items: [
                  { t: 'altar', x: 306, y: G, s: 0.9 },
                  anchises(146, G, 1.2, { pose: 'arms-up', staff: false }),
                  heros(232, G, 1.05, { pose: 'arms-up', shield: false })
                ] },

    a10_fugiunt: { bg: 'sea', items: [
                  { t: 'ship',     x: 168, y: 198, s: 1.05 },
                  { t: 'ship',     x: 306, y: 212, s: 0.8 },
                  { t: 'mountain', x: 40,  y: G, s: 0.6 }
                ] },

    a10_memoria: { bg: 'sea', items: [
                  { t: 'mensa',  x: 132, y: G, s: 1.1 },
                  { t: 'patina', x: 132, y: G - 32, s: 0.85 },
                  harpyia(310, 108, 1, { flip: true })
                ] },

    /* ============ a11 · vocabulary cards ============ */

    v_andromache: { bg: 'forest', items: [
                  { t: 'tree', x: 340, y: G, s: 0.85 },
                  andromache(176, G, 1.3)
                ] },

    v_vates:    { bg: 'plain', items: [
                  { t: 'temple', x: 322, y: G, s: 0.6 },
                  helenus(158, G, 1.25, { pose: 'point' })
                ],
                bubbles: [{ x: 248, y: 60, w: 52, h: 40, text: '💬', kind: 'speech', tail: 'left', fs: 19 }] },

    v_sepulcrum: { bg: 'forest', items: [
                  { t: 'sepulcrum', x: 200, y: G, s: 1.2, open: false }
                ] },

    v_flumen:   { bg: 'river', items: [
                  { t: 'tree', x: 82,  y: G, s: 0.95 },
                  { t: 'tree', x: 328, y: G, s: 0.8 }
                ] },

    v_lacrimat: { bg: 'plain', items: [
                  andromache(200, G, 1.35)
                ],
                bubbles: [{ x: 84, y: 86, w: 54, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 20 }] },

    /* similis: the same wall twice, small and great — parva Trōia and
       the Trōia that was */
    v_similis:  { bg: 'city', items: [
                  { t: 'cityWall', x: 106, y: G, s: 0.44 },
                  { t: 'cityWall', x: 292, y: G, s: 1 }
                ] },

    /* ============ a11 · story ============ */

    a11_buthrotum: { bg: 'sea', items: [
                  { t: 'cityWall', x: 316, y: G, s: 0.72 },
                  { t: 'ship',     x: 140, y: 202, s: 0.95, sail: 'furled' }
                ] },

    a11_audiunt: { bg: 'city', items: [
                  heros(126, G, 1.1, { shield: false }),
                  { t: 'crowdGroup', x: 300, y: G, s: 0.82, n: 4 }
                ],
                bubbles: [{ x: 214, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a11_flumen: { bg: 'river', items: [
                  { t: 'tree', x: 74,  y: G, s: 1 },
                  heros(212, G, 1.1, { pose: 'walk', shield: false })
                ] },

    a11_sepulcrum: { bg: 'river', items: [
                  { t: 'sepulcrum', x: 268, y: G, s: 1, open: false },
                  { t: 'tree',      x: 66,  y: G, s: 0.9 }
                ] },

    a11_sacra:  { bg: 'river', items: [
                  { t: 'sepulcrum', x: 288, y: G, s: 0.95, open: false },
                  andromache(150, G, 1.15, { pose: 'kneel' })
                ] },

    a11_lacrimat: { bg: 'river', items: [
                  { t: 'sepulcrum', x: 320, y: G, s: 0.8, open: false },
                  andromache(148, G, 1.2),
                  heros(250, G, 1.1, { flip: true, shield: false })
                ],
                bubbles: [{ x: 78, y: 84, w: 54, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 20 }] },

    a11_narrant: { bg: 'river', items: [
                  andromache(140, G, 1.15),
                  heros(268, G, 1.1, { flip: true, pose: 'point', shield: false })
                ],
                bubbles: [{ x: 204, y: 58, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a11_helenus: { bg: 'city', items: [
                  helenus(136, G, 1.2, { pose: 'point' }),
                  heros(288, G, 1.1, { flip: true, shield: false })
                ],
                bubbles: [{ x: 214, y: 58, w: 54, h: 40, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    a11_parvatroia: { bg: 'city', items: [
                  { t: 'cityWall', x: 112, y: G, s: 0.46 },
                  { t: 'cityWall', x: 296, y: G, s: 0.98 }
                ] },

    a11_porta:  { bg: 'city', items: [
                  { t: 'cityWall', x: 178, y: G, s: 0.55 },
                  { t: 'columna',  x: 322, y: G, s: 0.75 },
                  heros(64, G, 0.95, { pose: 'point', shield: false })
                ] },

    a11_rogat:  { bg: 'plain', items: [
                  heros(122, G, 1.15, { pose: 'arms-up', shield: false }),
                  helenus(284, G, 1.15, { flip: true })
                ],
                bubbles: [{ x: 208, y: 56, w: 56, h: 42, text: '❓', kind: 'speech', tail: 'left', fs: 22 }] },

    a11_vates:  { bg: 'plain', items: [
                  { t: 'temple', x: 318, y: G, s: 0.62 },
                  helenus(160, G, 1.25, { pose: 'point' })
                ],
                bubbles: [{ x: 250, y: 58, w: 52, h: 40, text: '💬', kind: 'speech', tail: 'left', fs: 19 }] },

    a11_praedicit: { bg: 'plain', items: [
                  helenus(128, G, 1.2, { pose: 'point' }),
                  { t: 'crowdGroup', x: 300, y: G, s: 0.8, n: 4 }
                ],
                bubbles: [{ x: 214, y: 56, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    a11_mensas: { bg: 'plain', items: [
                  { t: 'mensa',  x: 300, y: G, s: 1 },
                  { t: 'patina', x: 300, y: G - 30, s: 0.8 },
                  helenus(126, G, 1.2, { pose: 'point' })
                ],
                bubbles: [{ x: 212, y: 56, w: 56, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    /* VERBA VERGILIĪ — the frame changes for the poet's own voice */
    a11_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 92,  y: G, s: 0.95 },
                  { t: 'person',  x: 232, y: G, s: 1.2, role: 'priest', pose: 'point' }
                ] },

    /* versus — fāta viam invenient: the road ahead, and Apollo's own
       house at the end of it */
    a11_versus: { bg: 'plain', items: [
                  { t: 'temple', x: 312, y: G, s: 0.68 },
                  heros(120, G, 1.15, { pose: 'walk' })
                ] },

    a11_dona:   { bg: 'city', items: [
                  andromache(140, G, 1.15, { pose: 'point' }),
                  ascanius(266, G, 1.15, { flip: true })
                ],
                bubbles: [{ x: 206, y: 60, w: 52, h: 40, text: '🤲', kind: 'speech', tail: 'left', fs: 19 }] },

    a11_valedicunt: { bg: 'sea', items: [
                  andromache(66, G, 1.05),
                  { t: 'ship', x: 232, y: 200, s: 1 },
                  { t: 'ship', x: 340, y: 214, s: 0.72 }
                ] },

    a11_memoria: { bg: 'sea', items: [
                  { t: 'cityWall', x: 350, y: G, s: 0.44 },
                  { t: 'ship',     x: 172, y: 200, s: 1.05 }
                ] },

    /* ============ a12 · vocabulary cards ============ */

    /* Cyclōps: the giant AT DISTANCE, eyes closed, his flock with him.
       He is never nearer than the far half of any frame. */
    v_cyclops:  { bg: 'mountain', items: [
                  { t: 'grex', x: 108, y: G, s: 0.8 },
                  cyclops(268, G, 2.1)
                ] },

    v_caecus:   { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.4, role: 'man', pose: 'point',
                    eyes: 'closed', beard: 'long', beardColor: '#6e6355',
                    hairColor: '#6e6355', robeColor: SAXUM, mantleColor: UMBER }
                ] },

    v_grex:     { bg: 'mountain', items: [
                  { t: 'grex', x: 200, y: G, s: 1.4 }
                ] },

    v_supplex:  { bg: 'forest', items: [
                  { t: 'tree',   x: 330, y: G, s: 0.85 },
                  { t: 'person', x: 176, y: G, s: 1.25, role: 'crowd', pose: 'kneel' }
                ],
                bubbles: [{ x: 90, y: 86, w: 52, h: 40, text: '🤲', kind: 'thought', tail: 'right', fs: 19 }] },

    /* Aetna: the mountain with fire at the top of it — the library's
       own `fire`, set at the peak and nowhere near a person */
    v_aetna:    { bg: 'mountain', items: [
                  { t: 'mountain', x: 200, y: G, s: 1.15 },
                  { t: 'fire',     x: 200, y: G - 108, s: 0.7 }
                ] },

    v_periculum: { bg: 'stormSea', items: [
                  { t: 'mountain', x: 46,  y: G, s: 0.72 },
                  { t: 'ship',     x: 200, y: 200, s: 0.85, sail: 'furled' },
                  { t: 'mountain', x: 356, y: G, s: 0.72, flip: true }
                ] },

    /* ============ a12 · story ============ */

    a12_italia: { bg: 'sea', items: [
                  { t: 'mountain', x: 320, y: G, s: 0.78 },
                  { t: 'ship',     x: 152, y: 200, s: 1 },
                  heros(148, 178, 0.55, { pose: 'point', shield: false })
                ] },

    a12_circum: { bg: 'sea', items: [
                  { t: 'ship',     x: 176, y: 200, s: 1 },
                  { t: 'ship',     x: 306, y: 214, s: 0.76 },
                  { t: 'mountain', x: 44,  y: G, s: 0.66 }
                ] },

    a12_saxa:   { bg: 'stormSea', items: [
                  { t: 'mountain', x: 44,  y: G, s: 0.7 },
                  { t: 'ship',     x: 200, y: 200, s: 0.85, sail: 'furled' },
                  { t: 'mountain', x: 358, y: G, s: 0.7, flip: true }
                ] },

    a12_aetna:  { bg: 'nightSky', items: [
                  { t: 'mountain', x: 250, y: G, s: 1.05 },
                  { t: 'fire',     x: 250, y: G - 98, s: 0.66 },
                  { t: 'ship',     x: 72,  y: 214, s: 0.62, sail: 'furled' }
                ] },

    a12_vir:    { bg: 'forest', items: [
                  { t: 'tree',   x: 336, y: G, s: 0.9 },
                  { t: 'person', x: 188, y: G, s: 1.15, role: 'crowd', pose: 'walk' }
                ] },

    a12_supplex: { bg: 'forest', items: [
                  { t: 'person', x: 246, y: G, s: 1.15, role: 'crowd', pose: 'kneel', flip: true },
                  heros(124, G, 1.15, { shield: false })
                ],
                bubbles: [{ x: 200, y: 58, w: 54, h: 42, text: '🤲', kind: 'speech', tail: 'right', fs: 19 }] },

    a12_narrat: { bg: 'forest', items: [
                  { t: 'person', x: 252, y: G, s: 1.1, role: 'crowd', pose: 'point', flip: true },
                  heros(126, G, 1.1, { shield: false })
                ],
                bubbles: [{ x: 200, y: 56, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    a12_cyclops: { bg: 'mountain', items: [
                  { t: 'grex', x: 96, y: G, s: 0.7 },
                  cyclops(292, G, 1.95)
                ] },

    a12_grex:   { bg: 'mountain', items: [
                  { t: 'grex', x: 176, y: G, s: 1.2 },
                  cyclops(330, G, 1.6)
                ] },

    a12_caecus: { bg: 'mountain', items: [
                  cyclops(300, G, 2, { pose: 'point' })
                ] },

    a12_descendit: { bg: 'sea', items: [
                  { t: 'ship', x: 106, y: 206, s: 0.85, sail: 'furled' },
                  cyclops(336, G, 1.7)
                ] },

    a12_truncus: { bg: 'sea', items: [
                  { t: 'grex', x: 260, y: G, s: 0.6 },
                  cyclops(340, G, 1.75)
                ] },

    a12_fugiunt: { bg: 'sea', items: [
                  { t: 'ship', x: 132, y: 198, s: 1.05 },
                  { t: 'ship', x: 246, y: 214, s: 0.78 },
                  cyclops(360, G, 1.35)
                ] },

    a12_clamor: { bg: 'sea', items: [
                  { t: 'ship', x: 118, y: 200, s: 0.95 },
                  cyclops(330, G, 1.7, { pose: 'arms-up' })
                ],
                bubbles: [{ x: 232, y: 58, w: 52, h: 40, text: '❗', kind: 'speech', tail: 'right', fs: 24 }] },

    a12_ceteri: { bg: 'sea', items: [
                  { t: 'ship', x: 96, y: 204, s: 0.8 },
                  cyclops(238, G, 1.5),
                  cyclops(348, G, 1.35, { flip: true })
                ] },

    a12_servatur: { bg: 'sea', items: [
                  heros(140, G, 1.15, { pose: 'point', shield: false }),
                  { t: 'person', x: 258, y: G, s: 1.1, role: 'crowd', flip: true }
                ],
                bubbles: [{ x: 202, y: 60, w: 52, h: 38, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    /* Anchīsēs' death: his son alone on the shore, and nothing else on
       the page. DESIGN §8 — acknowledged, dignified, never depicted. */
    a12_anchises: { bg: 'sea', items: [
                  { t: 'palmTree', x: 344, y: G, s: 0.8 },
                  heros(160, G, 1.2, { shield: false })
                ],
                bubbles: [{ x: 74, y: 88, w: 54, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 20 }] },

    a12_finis:  { bg: 'sea', items: [
                  { t: 'ship', x: 200, y: 202, s: 1.05, sail: 'furled' },
                  heros(196, 180, 0.55, { shield: false })
                ] },

    /* VERBA VERGILIĪ IPSĪUS — the poet's own frame */
    a12_vergilius: { bg: 'plain', items: [
                  { t: 'columna', x: 90,  y: G, s: 0.95 },
                  { t: 'person',  x: 232, y: G, s: 1.2, role: 'priest', pose: 'point' }
                ] },

    /* versus I — dēdūcunt sociī nāvīs et lītora complent: the whole
       shore full of men and ships going down into the water */
    a12_versus1: { bg: 'sea', items: [
                  { t: 'ship',       x: 268, y: 204, s: 0.9, sail: 'furled' },
                  { t: 'crowdGroup', x: 128, y: G, s: 1, n: 5 },
                  { t: 'palmTree',   x: 356, y: G, s: 0.7 }
                ] },

    /* versus II — prōvehimur portū terraeque urbēsque recēdunt: the
       land already small behind the one ship going out */
    a12_versus2: { bg: 'sea', items: [
                  { t: 'cityWall', x: 350, y: G, s: 0.42 },
                  { t: 'mountain', x: 300, y: G, s: 0.5 },
                  { t: 'ship',     x: 138, y: 198, s: 1.1 }
                ] },

    a12_paraphrasis: { bg: 'sea', items: [
                  { t: 'cityWall', x: 356, y: G, s: 0.4 },
                  { t: 'ship',     x: 150, y: 200, s: 1.05 },
                  { t: 'ship',     x: 258, y: 214, s: 0.76 }
                ] },

    a12_memoria: { bg: 'sea', items: [
                  { t: 'columna',  x: 336, y: G, s: 0.8 },
                  { t: 'mountain', x: 372, y: G, s: 0.4 },
                  { t: 'ship',     x: 152, y: 200, s: 1.1 }
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ a9 — ERRŌRĒS PER MARIA ============
       fons Aen. 3,1–191. The liber opens on the only thing left after
       Liber II: a coast, a wood on Ida, and men building ships. Its
       seven cards are the furniture of exile — portus, īnsula,
       ōrāculum, patria, frūmentum, exsul, errat — and `portus` is
       carded HERE, three capitula before Vergil's own line needs it
       (3,72 "prōvehimur portū"). The prose also pre-teaches `recēdit`
       for the same line.
       This capitulum spends the rest of its budget on RECYCLING: the
       penātēs of a8 speak, the somnium of a7 carries them, monet is
       a6's, agnōscit is a3's, spēs and servat are a2's, fātum and
       ratis and aequor are a1's glosses.
       B RATING: POLYDŌRUS (3,19–68) IS OMITTED ENTIRELY — a bleeding
       bush over a murdered boy is horror imagery and the arc does not
       need it. The plague of Crete (3,137–142) keeps only its harmless
       half: `frūmentum nōn crēscit`, and no sick person appears.
       OMITTED for the lexeme cap: the Thracian landfall, the whole
       Delian topography (3,73–83), Anchīsēs' second reading of the
       oracle (3,143–171), the storm of 3,192–195 (it opens a10). */
    {
      id: 'a9',
      titulus: 'Errōrēs per Maria',
      icon: '⛵🧭',
      numerus: 'IX',
      pos: { x: 0.25, y: 0.88 },
      fons: 'Aen. 3,1–191',
      vocab: [
        { la: 'portus',    scene: SC.v_portus,    pars: 'nomen' },
        { la: 'īnsula',    scene: SC.v_insula,    pars: 'nomen' },
        { la: 'ōrāculum',  scene: SC.v_oraculum,  pars: 'nomen' },
        { la: 'patria',    scene: SC.v_patria,    pars: 'nomen' },
        { la: 'frūmentum', scene: SC.v_frumentum, pars: 'nomen' },
        { la: 'exsul',     scene: SC.v_exsul,     pars: 'nomen' },
        { la: 'errat',     scene: SC.v_errat,     pars: 'verbum' }
      ],
      story: [
        /* Aen. 3,1–5 */
        { la: 'Trōia capta et incēnsa est. Aenēās et sociī eius iam sine patriā sunt: exsulēs sunt.',
          scene: SC.a9_troia,
          nova: [{ w: 'patria', e: '🏛', g: 'terra et urbs ubi nātus es' },
                 { w: 'exsul', e: '🚶', g: 'quī patriam āmīsit et sēdem novam quaerit' }] },

        { la: 'Sub monte Īdā classem novam aedificant: ex silvīs Īdae multae ratēs fīunt.',
          scene: SC.a9_classis,
          nova: [{ w: 'classis', e: '⛵', g: 'multae nāvēs simul; ratis = nāvis, ut in capitulō prīmō' }] },

        /* Aen. 3,6–12 */
        { la: 'Vēre novō sociī nāvēs in mare dēdūcunt, et classis ex portū exit.',
          scene: SC.a9_portus,
          nova: [{ w: 'portus', e: '⚓', g: 'locus tūtus ubi nāvēs stant; ex portū nāvēs exeunt' },
                 { w: 'dēdūcit', e: '⬇🚢', g: 'nāvem ex terrā in mare dūcit' }] },

        { la: 'Aenēās patriam suam spectat: terra post nāvēs recēdit et minor fit.',
          scene: SC.a9_recedit,
          nova: [{ w: 'recēdit', e: '↔', g: 'longius abit; minor fit et tandem nōn vidētur' }] },

        /* Aen. 3,73–79 */
        { la: 'Prīmum ad Dēlum veniunt: parva est haec īnsula, sed portus tūtus et templum Apollinis ibi stant.',
          scene: SC.a9_delos,
          nova: [{ w: 'īnsula', e: '🏝', g: 'terra quam mare undique cingit' },
                 { w: 'Dēlos', e: '📍', g: 'īnsula sacra in mediō marī' },
                 { w: 'Apollō', e: '👤', g: 'deus quī hominibus futūra ostendit' }] },

        /* Aen. 3,84–89 */
        { la: 'Ibi Aenēās ōrāculum rogat: "Quam terram nōbīs deī dant? Ubi sēdem pōnere dēbēmus?"',
          scene: SC.a9_rogat,
          nova: [{ w: 'ōrāculum', e: '💬', g: 'verba deī, quae sacerdōs hominibus reddit' }] },

        /* Aen. 3,94–98 — "antīquam exquīrite mātrem", in graded prose */
        { la: 'Vōx dē templō respondet: "Antīquam mātrem quaerite! Illa terra Trōiānōs accipiet."',
          scene: SC.a9_vox },

        { la: 'Sed quae terra māter Trōiānōrum est? Ōrāculum obscūrum est, et omnēs tacent.',
          scene: SC.a9_vox },

        /* Aen. 3,103–117 — Anchīsēs reads the oracle, and reads it wrong */
        { la: 'Tum Anchīsēs putat Crētam esse antīquam mātrem: "Ex Crētā," inquit, "māiōrēs nostrī vēnērunt."',
          scene: SC.a9_anchises,
          nova: [{ w: 'Crēta', e: '🏝', g: 'īnsula magna ad merīdiem' },
                 { w: 'māiōrēs', e: '👥', g: 'quī ante nōs fuērunt: patrēs patrum nostrōrum' }] },

        /* Aen. 3,131–134 */
        { la: 'Itaque ad Crētam nāvigant et prope portum urbem novam condunt; iam nōn exsulēs sed cīvēs esse putant.',
          scene: SC.a9_creta,
          nova: [{ w: 'condit', e: '🔨', g: 'urbem novam facit' }] },

        /* Aen. 3,137–142, B-RATED: the harmless half of the plague */
        { la: 'Sed terra illa Trōiānōs nōn accipit: agrī siccī sunt et frūmentum nōn crēscit.',
          scene: SC.a9_frumentum,
          nova: [{ w: 'frūmentum', e: '🌾', g: 'ex frūmentō pānis fit; sine frūmentō famēs est' }] },

        { la: 'Frūmentum enim in campīs perit; sine frūmentō autem nūlla urbs stāre potest, et sociī iterum fessī sunt.',
          scene: SC.a9_fessi },

        /* Aen. 3,147–159 — the penātēs correct the reading */
        { la: 'Tum nocte penātēs Trōiae in somniō Aenēae appārent et eum monent: "Nōn haec est terra vestra."',
          scene: SC.a9_penates },

        { la: '"Hesperiam petite," inquiunt, "quae nunc Ītalia vocātur: illa est antīqua māter vestra."',
          scene: SC.a9_hesperia,
          nova: [{ w: 'Hesperia', e: '⛰', g: 'terra ad occidentem, id est Ītalia' }] },

        /* Aen. 3,178–189 */
        { la: 'Aenēās patrī somnium nārrat: nunc ōrāculum Apollinis clārum est, et Anchīsēs errōrem suum agnōscit.',
          scene: SC.a9_narrat,
          nova: [{ w: 'error', e: '🧭', g: 'via falsa: cum quis viam vēram nōn tenet' }] },

        { la: 'Iterum vēla dant; iterum patriam novam quaerunt. Sīc Trōiānī per maria errant.',
          scene: SC.a9_vela,
          nova: [{ w: 'errat', e: '🧭', g: 'hūc illūc it neque sēdem certam habet' }] },

        { la: 'Multōs annōs errant: nunc ad hanc īnsulam, nunc ad illam veniunt, sed nūlla eōrum patria est.',
          scene: SC.a9_errant },

        { la: 'Exsul tamen spem nōn dēpōnit: fāta enim Trōiānīs terram novam prōmittunt.',
          scene: SC.a9_spes },

        { la: 'Memoriā tenē: Trōiānī exsulēs per maria errant; īnsulam post īnsulam petunt, et omnis terra post nāvēs recēdit.',
          scene: SC.a9_memoria,
          ttsText: 'Troiani exsules per maria errant; insulam post insulam petunt, et omnis terra post naves recedit.' }
      ],
      ludus: {
        words: [
          { la: 'portus',    scene: SC.v_portus,    emoji: '⚓' },
          { la: 'īnsula',    scene: SC.v_insula,    emoji: '🏝' },
          { la: 'patria',    scene: SC.v_patria,    emoji: '🏛' },
          { la: 'frūmentum', scene: SC.v_frumentum, emoji: '🌾' },
          { la: 'exsul',     scene: SC.v_exsul,     emoji: '🚶' },
          { la: 'ōrāculum',  scene: SC.v_oraculum,  emoji: '💬' }
        ]
      },
      /* SONUS, hand-authored (SHARED-PICTURE RULE). Three of this
         capitulum's seven cards stand on blue water — portus, īnsula,
         errat — so no two of them are ever offered together: by ear the
         learner would be choosing between two seascapes. `exsul` and
         `patria` both show a cityWall and are likewise kept apart. */
      sonus: [
        { la: 'portus',
          answer: { la: 'portus', scene: SC.v_portus },
          options: [{ la: 'portus', scene: SC.v_portus },
                    { la: 'frūmentum', scene: SC.v_frumentum },
                    { la: 'ōrāculum', scene: SC.v_oraculum }] },
        { la: 'īnsula',
          answer: { la: 'īnsula', scene: SC.v_insula },
          options: [{ la: 'īnsula', scene: SC.v_insula },
                    { la: 'ōrāculum', scene: SC.v_oraculum },
                    { la: 'frūmentum', scene: SC.v_frumentum },
                    { la: 'exsul', scene: SC.v_exsul }] },
        { la: 'frūmentum',
          answer: { la: 'frūmentum', scene: SC.v_frumentum },
          options: [{ la: 'frūmentum', scene: SC.v_frumentum },
                    { la: 'patria', scene: SC.v_patria },
                    { la: 'errat', scene: SC.v_errat }] },
        { la: 'ōrāculum',
          answer: { la: 'ōrāculum', scene: SC.v_oraculum },
          options: [{ la: 'ōrāculum', scene: SC.v_oraculum },
                    { la: 'errat', scene: SC.v_errat },
                    { la: 'frūmentum', scene: SC.v_frumentum },
                    { la: 'patria', scene: SC.v_patria }] }
      ],
      overrides: {
        aenigmata: {
          /* errat is the ONE open-sea card on the grid; portus and
             īnsula stay off it for the same reason they stay out of
             each other's SONUS sets. */
          pairs: [
            { la: 'īnsula',    scene: SC.v_insula },
            { la: 'ōrāculum',  scene: SC.v_oraculum },
            { la: 'patria',    scene: SC.v_patria },
            { la: 'frūmentum', scene: SC.v_frumentum },
            { la: 'exsul',     scene: SC.v_exsul },
            { la: 'errat',     scene: SC.v_errat }
          ],
          scrambles: [
            { la: 'Trōiānī sine patriā sunt.',          scene: SC.a9_troia },
            { la: 'Classis ex portū exit.',             scene: SC.a9_portus },
            { la: 'Frūmentum in campīs nōn crēscit.',   scene: SC.a9_frumentum },
            { la: 'Exsulēs per maria errant.',          scene: SC.a9_errant }
          ]
        },
        /* CORRIGE, hand-authored to test SYNTAX and not only words:
           two of the five put the intruder inside an accūsātīvus cum
           īnfīnītīvō or a purpose clause, where the ending is the only
           thing that can be read to find it. */
        corrige: [
          { words: ['Anchīsēs', 'putat', 'Crētam', 'est', 'antīquam', 'mātrem.'], wrong: 3,
            options: ['esse', 'sunt', 'erat'], correct: 0, scene: SC.a9_anchises },
          { words: ['Classis', 'ex', 'portum', 'exit.'], wrong: 2,
            options: ['portū', 'portus', 'portuī'], correct: 0, scene: SC.a9_portus },
          { words: ['Frūmentum', 'in', 'campīs', 'crēscit.'], wrong: 3,
            options: ['perit.', 'errat.', 'condit.'], correct: 0, scene: SC.a9_frumentum },
          { words: ['Trōiānī', 'per', 'maria', 'errat.'], wrong: 3,
            options: ['errant.', 'errāre.', 'errābat.'], correct: 0, scene: SC.a9_errant },
          { words: ['Aenēās', 'patriam', 'suam', 'condit.'], wrong: 3,
            options: ['āmittit.', 'crēscit.', 'recēdit.'], correct: 0, scene: SC.a9_recedit }
        ],
        comple: [
          { text: 'Trōiānī sine patriā sunt: ___ sunt.',
            options: ['exsulēs', 'exsulis', 'exsulem'], correct: 0, scene: SC.a9_troia },
          { text: 'Classis ex port___ exit.',
            options: ['ū', 'um', 'ī'], correct: 0, scene: SC.a9_portus },
          { text: 'Anchīsēs putat Crētam antīquam mātrem ___.',
            options: ['esse', 'est', 'sunt'], correct: 0, scene: SC.a9_anchises },
          { text: 'In agrīs siccīs ___ nōn crēscit.',
            options: ['frūmentum', 'frūmentī', 'frūmentō'], correct: 0, scene: SC.a9_frumentum },
          { text: 'Parva est haec ___, sed templum ibi stat.',
            options: ['īnsula', 'īnsulam', 'īnsulae'], correct: 0, scene: SC.a9_delos },
          { text: 'Trōiānī per maria ___.',
            options: ['errant', 'errat', 'errāre'], correct: 0, scene: SC.a9_errant }
        ]
      }
    },

    /* ============ a10 — HARPYIAE ============
       fons Aen. 3,192–277. The liber's one mōnstrum capitulum, and the
       one that sets up the payoff of a11: the prophecy the Trōiānī are
       afraid of is the prophecy Helenus will answer with Vergil's own
       line. The capitulum therefore ENDS by defusing its own menace —
       the memoria page tells the learner, in Latin, what the tables
       will turn out to be (Aen. 7,109–117: bread eaten under the food),
       so nobody carries a fright away from the trial.
       MISSING ART — THE HARPIES, reported not substituted: there is no
       harpy actor, and the obvious compose (an `aquila` with a veiled
       `person` head) is exactly the horror DESIGN §8 forbids and reads
       as a wound at tile size. They are drawn as the text calls them —
       `avēs foedae`: the `aquila` actor in a livid grey (FOEDUM), in
       flight, ALWAYS ABOVE everything else and never touching anything.
       The maidens' faces of 3,216 are OMITTED FROM THE TEXT TOO: a
       picture the learner cannot see must not be asserted in a gloss.
       B RATING: the only fight in the liber ends with nobody hurt on
       either side — `hastae tamen avēs nōn laedunt` is Vergil's own
       (3,242–244), and it is why this episode can be told at all.
       OMITTED for the cap: the catalogue of the Strophades (3,209–212),
       Mīsēnus' trumpet (3,239), the voyage past Ithaca and Actium
       (3,270–289, which a11 opens over). */
    {
      id: 'a10',
      titulus: 'Harpyiae',
      icon: '🕊🍽',
      numerus: 'X',
      pos: { x: 0.71, y: 0.70 },
      fons: 'Aen. 3,192–277',
      vocab: [
        { la: 'avis',      scene: SC.v_avis,      pars: 'nomen' },
        { la: 'mēnsa',     scene: SC.v_mensa,     pars: 'nomen' },
        { la: 'armentum',  scene: SC.v_armentum,  pars: 'nomen' },
        { la: 'rapit',     scene: SC.v_rapit,     pars: 'verbum' },
        { la: 'fugat',     scene: SC.v_fugat,     pars: 'verbum' },
        { la: 'praedīcit', scene: SC.v_praedicit, pars: 'verbum' },
        { la: 'ōrat',      scene: SC.v_orat,      pars: 'verbum' }
      ],
      story: [
        /* Aen. 3,192–204 */
        { la: 'Ex Crētā profectī, Trōiānī iterum in altō sunt; tempestās trium diērum eōs per aequor iactat.',
          scene: SC.a10_tempestas },

        /* Aen. 3,209–212 */
        { la: 'Quārtō diē terram vident: īnsulae Strophadēs sunt, in mediō marī positae.',
          scene: SC.a10_insulae,
          nova: [{ w: 'Strophadēs', e: '📍', g: 'duae īnsulae parvae in marī Ioniō' }] },

        { la: 'In hīs īnsulīs armenta boum errant, sed armenta nūllus pāstor custōdit neque ūllus homō adest.',
          scene: SC.a10_armenta,
          nova: [{ w: 'armentum', e: '🐂', g: 'multī bovēs simul, quī in campīs pāscuntur' }] },

        /* Aen. 3,222–224 */
        { la: 'Trōiānōs, quōs famēs premit, cibus iuvat: ex armentīs cibum sūmunt, mēnsās in lītore pōnunt, epulās parant.',
          scene: SC.a10_mensae,
          nova: [{ w: 'mēnsa', e: '🍽', g: 'in mēnsā cibus pōnitur; ad mēnsam hominēs edunt' },
                 { w: 'famēs', e: '😖', g: 'cum cibus dēest, famēs est; ↔ cibus plēnus' }] },

        /* Aen. 3,225–228, B-RATED: birds, and nothing but birds */
        { la: 'Sed subitō avēs dē caelō veniunt: foedae sunt et ingentēs. Harpyiae vocantur.',
          scene: SC.a10_veniunt,
          nova: [{ w: 'avis', e: '🕊', g: 'animal quod ālās habet et volat' },
                 { w: 'foedus', e: '😖', g: '↔ pulcher; quod vidēre nōn vīs' },
                 { w: 'Harpyia', e: '🕊', g: 'avis ingēns et foeda, quae cibum aliēnum rapit' }] },

        { la: 'Harpyiae cibum ē mēnsīs rapiunt, et quod nōn rapiunt foedant: nēmō id edere vult.',
          scene: SC.a10_rapiunt,
          nova: [{ w: 'rapit', e: '✊', g: 'celeriter capit et sēcum aufert' },
                 { w: 'foedat', e: '😖', g: 'foedum facit; ↔ pūrum servat' }] },

        /* Aen. 3,229–234 */
        { la: 'Trōiānī mēnsās in locum sēcrētum trānsferunt, ubi arborēs altae stant, et iterum cibum pōnunt.',
          scene: SC.a10_iterum },

        { la: 'Sed avēs iterum veniunt. Tum virī arma capiunt et hastīs avēs fugant.',
          scene: SC.a10_arma,
          nova: [{ w: 'fugat', e: '➡', g: 'facit ut alius fugiat; ↔ manēre iubet' }] },

        /* Aen. 3,242–244 — the whole reason this episode is tellable */
        { la: 'Hastae tamen avēs nōn laedunt: plūmae eārum dūrae sunt. Fugantur, sed nōn laeduntur, et in caelum altum abeunt.',
          scene: SC.a10_nonlaedunt,
          nova: [{ w: 'laedit', e: '🛡', g: 'malum corporī facit; quod nōn laeditur, integrum manet' }] },

        /* Aen. 3,245–252 */
        { la: 'Ūna ex eīs, cui Celaenō nōmen est, in saxō altō sedet et Trōiānīs praedīcit.',
          scene: SC.a10_celaeno,
          nova: [{ w: 'praedīcit', e: '💬', g: 'ea dīcit quae futūra sunt: prae-dīcit, ante dīcit' },
                 { w: 'Celaenō', e: '🕊', g: 'nōmen ūnīus ex Harpyiīs' }] },

        /* Aen. 3,253–257 — the tables */
        { la: 'Avis dīcit: "Ītaliam petitis et Ītaliam vidēbitis; sed urbem vestram moenibus nōn cingētis, antequam famēs vōs mēnsās vestrās edere cōgat."',
          scene: SC.a10_fames },

        { la: 'Trōiānī timent: quis enim mēnsās suās edere potest? Avēs cibum rapiunt, sed verba avis magis terrent.',
          scene: SC.a10_timent },

        /* Aen. 3,263–266 */
        { la: 'Tum Anchīsēs manūs ad caelum tollit et deōs ōrat: "Ōmen āvertite, dī, et Trōiānōs servāte!"',
          scene: SC.a10_orat,
          nova: [{ w: 'ōrat', e: '🙏', g: 'deōs rogat; ōrāre est ā deīs auxilium petere' },
                 { w: 'ōmen', e: '💬', g: 'signum eōrum quae futūra sunt' }] },

        { la: 'Aenēās quoque ōrat; deinde sociōs hortātur, quia avēs eōs ab hāc terrā fugant.',
          scene: SC.a10_orat },

        { la: 'Dum classis ab īnsulīs foedīs fugit, dux etiam deōs maris ōrat; avēs post nāvēs nōn veniunt.',
          scene: SC.a10_fugiunt },

        /* the menace, defused — Aen. 7,109–117, promised in Latin */
        { la: 'Aenēās verba avis memoriā tenet; sed quid significent, nōndum intellegit.',
          scene: SC.a10_memoria },

        { la: 'Memoriā tenē: avis foeda dē mēnsīs praedīcit. Posteā in Ītaliā Trōiānī pānēs sub cibō positōs edent, et rīdēbunt: illae erunt mēnsae quās Celaenō praedīxit.',
          scene: SC.a10_memoria,
          ttsText: 'Avis foeda de mensis praedicit. Postea in Italia Troiani panes sub cibo positos edent, et ridebunt: illae erunt mensae quas Celaeno praedixit.' }
      ],
      ludus: {
        words: [
          { la: 'avis',      scene: SC.v_avis,      emoji: '🕊' },
          { la: 'mēnsa',     scene: SC.v_mensa,     emoji: '🍽' },
          { la: 'armentum',  scene: SC.v_armentum,  emoji: '🐂' },
          { la: 'rapit',     scene: SC.v_rapit,     emoji: '✊' },
          { la: 'ōrat',      scene: SC.v_orat,      emoji: '🙏' },
          { la: 'īnsula',    scene: SC.v_insula,    emoji: '🏝' }
        ]
      },
      /* SONUS: `rapit`, `fugat` and `praedīcit` all contain a livid
         bird, so no two of them are ever offered together — and `avis`
         is never offered against any of the three, because by ear the
         learner would be choosing between four birds. `mēnsa` and
         `rapit` share the table for the same reason. `armentum`,
         `mēnsa` and `ōrat` are this capitulum's unmistakable cards and
         carry the sets. */
      sonus: [
        { la: 'armentum',
          answer: { la: 'armentum', scene: SC.v_armentum },
          options: [{ la: 'armentum', scene: SC.v_armentum },
                    { la: 'mēnsa', scene: SC.v_mensa },
                    { la: 'ōrat', scene: SC.v_orat }] },
        { la: 'mēnsa',
          answer: { la: 'mēnsa', scene: SC.v_mensa },
          options: [{ la: 'mēnsa', scene: SC.v_mensa },
                    { la: 'armentum', scene: SC.v_armentum },
                    { la: 'avis', scene: SC.v_avis },
                    { la: 'ōrat', scene: SC.v_orat }] },
        { la: 'avis',
          answer: { la: 'avis', scene: SC.v_avis },
          options: [{ la: 'avis', scene: SC.v_avis },
                    { la: 'armentum', scene: SC.v_armentum },
                    { la: 'mēnsa', scene: SC.v_mensa }] },
        { la: 'ōrat',
          answer: { la: 'ōrat', scene: SC.v_orat },
          options: [{ la: 'ōrat', scene: SC.v_orat },
                    { la: 'avis', scene: SC.v_avis },
                    { la: 'armentum', scene: SC.v_armentum },
                    { la: 'īnsula', scene: SC.v_insula }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'avis',      scene: SC.v_avis },
            { la: 'mēnsa',     scene: SC.v_mensa },
            { la: 'armentum',  scene: SC.v_armentum },
            { la: 'rapit',     scene: SC.v_rapit },
            { la: 'fugat',     scene: SC.v_fugat },
            { la: 'ōrat',      scene: SC.v_orat }
          ],
          scrambles: [
            { la: 'Armenta boum in īnsulīs errant.',   scene: SC.a10_armenta },
            { la: 'Trōiānī mēnsās in lītore pōnunt.',  scene: SC.a10_mensae },
            { la: 'Avēs cibum ē mēnsīs rapiunt.',      scene: SC.a10_rapiunt },
            { la: 'Anchīsēs deōs ōrat.',               scene: SC.a10_orat }
          ]
        },
        corrige: [
          { words: ['Avēs', 'cibum', 'ē', 'mēnsās', 'rapiunt.'], wrong: 3,
            options: ['mēnsīs', 'mēnsam', 'mēnsae'], correct: 0, scene: SC.a10_rapiunt },
          { words: ['Hastae', 'avēs', 'nōn', 'laedit.'], wrong: 3,
            options: ['laedunt.', 'laedere.', 'laedēbat.'], correct: 0, scene: SC.a10_nonlaedunt },
          { words: ['Virī', 'hastīs', 'avēs', 'rapiunt.'], wrong: 3,
            options: ['fugant.', 'ōrant.', 'praedīcunt.'], correct: 0, scene: SC.a10_arma },
          { words: ['Armenta', 'boum', 'in', 'īnsulīs', 'errat.'], wrong: 4,
            options: ['errant.', 'errāre.', 'errābit.'], correct: 0, scene: SC.a10_armenta },
          { words: ['Anchīsēs', 'deōs', 'praedīcit.'], wrong: 2,
            options: ['ōrat.', 'rapit.', 'fugat.'], correct: 0, scene: SC.a10_orat }
        ],
        comple: [
          { text: 'Trōiānī ___ in lītore pōnunt.',
            options: ['mēnsās', 'mēnsīs', 'mēnsae'], correct: 0, scene: SC.a10_mensae },
          { text: 'In īnsulīs ___ boum errant.',
            options: ['armenta', 'armentum', 'armentō'], correct: 0, scene: SC.a10_armenta },
          { text: 'Avēs cibum ē mēns___ rapiunt.',
            options: ['īs', 'am', 'ae'], correct: 0, scene: SC.a10_rapiunt },
          { text: 'Virī hastīs avēs ___.',
            options: ['fugant', 'ōrant', 'rapiunt'], correct: 0, scene: SC.a10_arma },
          { text: 'Antequam famēs Trōiānōs mēnsās edere ___, urbem nōn condent.',
            options: ['cōgat', 'cōgit', 'cōgere'], correct: 0, scene: SC.a10_fames },
          { text: 'Anchīsēs deōs ___.',
            options: ['ōrat', 'rapit', 'fugat'], correct: 0, scene: SC.a10_orat }
        ]
      }
    },

    /* ============ a11 — ANDROMACHĒ ============
       fons Aen. 3,294–505. The liber's quiet capitulum, and its moral
       centre: a woman who has lost everything keeps her dignity, and a
       prophet answers a10's fear with Vergil's own line. It carries
       the INLINE quotation, 3,395, quoted whole at the moment Helenus
       speaks it — the treatment Liber I gives 1,203 and Liber II 2,49.
       GRIEF WITH DIGNITY (DESIGN §8): the tomb is `ināne`, and the
       text says so — *in quō nēmō iacet*. Andromachē weeps, asks after
       the living, gives a child a gift, and stands on the shore
       watching the ships go. Nothing of her past is depicted, and her
       first husband's death is not retold: Hector is named as a4/a7
       named him, and nothing is added.
       OMITTED for the B rating: Pyrrhus and everything Andromachē
       suffered at his hands (3,321–336) — she is `Hectoris coniūnx`
       and now Helenus' queen, and the liber says no more; the death of
       her son Astyanax (3,489) — Ascanius simply reminds her of a son,
       and `imāgō` (a8's own word) does the work.
       OMITTED for the lexeme cap: the white sow of 3,389–393 (there is
       NO PIG in the art library — MISSING ART, reported: the sign is
       dropped rather than told without a picture), Helenus'
       instructions on Iūnō's rites (3,433–440), and the whole Scylla
       and Charybdis warning (3,410–432), whose one useful sentence
       moves into a12 as `saxa perīculōsa`. */
    {
      id: 'a11',
      titulus: 'Andromachē',
      icon: '🏺😢',
      numerus: 'XI',
      pos: { x: 0.27, y: 0.52 },
      fons: 'Aen. 3,294–505 (+ 3,395)',
      vocab: [
        { la: 'Andromachē', scene: SC.v_andromache, pars: 'nomen' },
        { la: 'vātēs',      scene: SC.v_vates,      pars: 'nomen' },
        { la: 'sepulcrum',  scene: SC.v_sepulcrum,  pars: 'nomen' },
        { la: 'flūmen',     scene: SC.v_flumen,     pars: 'nomen' },
        { la: 'lacrimat',   scene: SC.v_lacrimat,   pars: 'verbum' },
        { la: 'similis',    scene: SC.v_similis,    pars: 'adiectivum' }
      ],
      story: [
        /* Aen. 3,294–297 */
        { la: 'Post multōs errōrēs ad Būthrōtum veniunt, urbem quae in Ēpīrī ōrā sita est.',
          scene: SC.a11_buthrotum,
          nova: [{ w: 'Būthrōtum', e: '📍', g: 'urbs parva in Ēpīrō, trāns mare ab Ītaliā' }] },

        { la: 'Ibi rem mīram audiunt: Helenus, vir Trōiānus, in Graecā terrā rēgnat, et Andromachē, quae Hectoris coniūnx fuit, uxor eius est.',
          scene: SC.a11_audiunt,
          nova: [{ w: 'Helenus', e: '👤', g: 'Trōiānus, fīlius Priamī, quī futūra videt' },
                 { w: 'Andromachē', e: '👤', g: 'fēmina Trōiāna, quae Hectoris coniūnx fuit' }] },

        /* Aen. 3,300–305 */
        { la: 'Aenēās ā portū per silvam ambulat et ad flūmen parvum venit.',
          scene: SC.a11_flumen,
          nova: [{ w: 'flūmen', e: '🌊', g: 'aqua quae per terram fluit; flūmen in mare it' }] },

        { la: 'Trōiānī illud flūmen "Simoenta" vocant, quia flūmen Trōiae quondam Simoīs vocābātur.',
          scene: SC.a11_flumen,
          nova: [{ w: 'Simoīs', e: '🌊', g: 'flūmen Trōiae; hoc flūmen falsum eōdem nōmine vocātur' }] },

        /* Aen. 3,303–305 — the empty tomb */
        { la: 'Prope flūmen sepulcrum stat, in quō nēmō iacet: ināne est, Hectorī factum.',
          scene: SC.a11_sepulcrum,
          nova: [{ w: 'sepulcrum', e: '🏺', g: 'locus ubi mortuī pōnuntur et honōrantur' },
                 { w: 'inānis', e: '⬜', g: '= vacuus; nihil in eō est' }] },

        { la: 'Ante sepulcrum fēmina stat et sacra facit: Andromachē est, quae ad sepulcrum ināne cotīdiē venit.',
          scene: SC.a11_sacra },

        /* Aen. 3,306–312, paraphrased in graded prose (not quoted) */
        { la: 'Andromachē Aenēān videt et lacrimat: "Vīvisne, Aenēā? Aut, sī lūx tibi abiit, ubi est Hector meus?"',
          scene: SC.a11_lacrimat,
          nova: [{ w: 'lacrimat', e: '😢', g: 'lacrimae ex oculīs eius cadunt' }] },

        { la: 'Aenēās respondet et dē Trōiā captā, dē fugā, dē marī nārrat. Ambō dē patriā āmissā lacrimant; etiam dux fortis lacrimat.',
          scene: SC.a11_narrant },

        /* Aen. 3,345–355 */
        { la: 'Tum Helenus rēx eōs benignē accipit et in urbem suam dūcit; hospitēs enim Trōiānī sunt.',
          scene: SC.a11_helenus },

        /* Aen. 3,349–351 — parva Trōia */
        { la: 'Mīrum est quod vident: urbs parva magnae Trōiae similis est.',
          scene: SC.a11_parvatroia,
          nova: [{ w: 'similis', e: '⇔', g: 'quī eandem fōrmam habet; parva urbs magnae similis est' }] },

        { la: 'Porta quoque "Scaea" vocātur et flūmen siccum "Xanthus": omnia nōmina patriae hīc iterum vīvunt. Etiam nōmina similia sunt.',
          scene: SC.a11_porta },

        /* Aen. 3,358–368 */
        { la: 'Aenēās Helenum rogat, quid fāta sibi parent et quō īre dēbeat.',
          scene: SC.a11_rogat },

        { la: 'Helenus enim vātēs est: deus Apollō eī futūra ostendit.',
          scene: SC.a11_vates,
          nova: [{ w: 'vātēs', e: '💬', g: 'homō cui deus futūra ostendit; vātēs praedīcit' }] },

        /* Aen. 3,374–462, compressed to what a12 and Liber VI need */
        { la: 'Vātēs multa praedīcit: longam viam, saxa perīculōsa, Sibyllam Cūmānam, quae posteā Aenēae viam mōnstrābit.',
          scene: SC.a11_praedicit,
          nova: [{ w: 'Sibylla', e: '👤', g: 'fēmina sacra apud Cūmās, quae futūra canit' }] },

        /* Aen. 3,394 — the answer to a10's fear */
        { la: 'Deinde vātēs Aenēam dē mēnsīs cōnsōlātur: "Nōlī timēre mēnsās! Fāta ipsa viam inveniunt."',
          scene: SC.a11_mensas },

        /* ---- VERBA VERGILIĪ (inline) — Aen. 3,395, quoted whole ---- */
        { la: 'Haec Helenus apud Vergilium ipsum dīcit. Audī versum Vergiliī:',
          scene: SC.a11_vergilius },

        { la: 'fāta viam invenient aderitque vocātus Apollō.',
          scene: SC.a11_versus,
          ttsText: 'fata viam invenient aderitque vocatus Apollo.',
          nova: [{ w: 'fāta', e: '📍', g: 'fātum → fāta: ea quae deī fierī iubent' },
                 { w: 'viam', e: '🧭', g: 'via = iter; "viam invenīre" est exitum reperīre' },
                 { w: 'invenient', e: '👀', g: 'invenit → invenient: posteā invenient' },
                 { w: 'aderit', e: '🤝', g: 'ad-erit: praesēns erit et auxilium dabit' },
                 { w: 'vocātus', e: '💬', g: 'vocat → vocātus: sī eum vocābis, vocātus veniet' }] },

        { la: 'Id est: fāta ipsa viam aperient, et Apollō, sī eum vocābis, aderit.',
          scene: SC.a11_versus },

        /* Aen. 3,482–491, B-RATED: a gift, and a mother's memory */
        { la: 'Deinde Helenus dōna dat, et Andromachē Ascaniō vestēs suā manū factās: "Accipe, puer," inquit; "tū enim imāgō fīliī meī es."',
          scene: SC.a11_dona },

        /* Aen. 3,492–505 */
        { la: 'Tum omnēs valedīcunt. Andromachē in lītore stat et nāvēs recēdentēs spectat, dōnec iam nōn videntur.',
          scene: SC.a11_valedicunt },

        { la: 'Memoriā tenē: "fāta viam invenient." Trōia parva, magnae Trōiae similis, post eōs manet; sed Trōiānī maiōra quaerunt.',
          scene: SC.a11_memoria,
          ttsText: 'Fata viam invenient. Troia parva, magnae Troiae similis, post eos manet; sed Troiani maiora quaerunt.' }
      ],
      ludus: {
        words: [
          { la: 'sepulcrum',  scene: SC.v_sepulcrum,  emoji: '🏺' },
          { la: 'flūmen',     scene: SC.v_flumen,     emoji: '🌊' },
          { la: 'vātēs',      scene: SC.v_vates,      emoji: '💬' },
          { la: 'lacrimat',   scene: SC.v_lacrimat,   emoji: '😢' },
          { la: 'similis',    scene: SC.v_similis,    emoji: '⇔' },
          { la: 'mēnsa',      scene: SC.v_mensa,      emoji: '🍽' }
        ]
      },
      /* SONUS: `Andromachē` and `lacrimat` are the same woman in the
         same wine robe, so they are never offered together; `vātēs`
         stands beside a temple and `sepulcrum` in a wood, and the two
         never meet a third robed figure in one set. `flūmen` (the only
         river card in the region) and `similis` (two walls) are this
         capitulum's unmistakable cards and carry the sets. */
      sonus: [
        { la: 'flūmen',
          answer: { la: 'flūmen', scene: SC.v_flumen },
          options: [{ la: 'flūmen', scene: SC.v_flumen },
                    { la: 'similis', scene: SC.v_similis },
                    { la: 'sepulcrum', scene: SC.v_sepulcrum }] },
        { la: 'similis',
          answer: { la: 'similis', scene: SC.v_similis },
          options: [{ la: 'similis', scene: SC.v_similis },
                    { la: 'flūmen', scene: SC.v_flumen },
                    { la: 'Andromachē', scene: SC.v_andromache },
                    { la: 'sepulcrum', scene: SC.v_sepulcrum }] },
        { la: 'sepulcrum',
          answer: { la: 'sepulcrum', scene: SC.v_sepulcrum },
          options: [{ la: 'sepulcrum', scene: SC.v_sepulcrum },
                    { la: 'similis', scene: SC.v_similis },
                    { la: 'flūmen', scene: SC.v_flumen }] },
        { la: 'Andromachē',
          answer: { la: 'Andromachē', scene: SC.v_andromache },
          options: [{ la: 'Andromachē', scene: SC.v_andromache },
                    { la: 'flūmen', scene: SC.v_flumen },
                    { la: 'similis', scene: SC.v_similis },
                    { la: 'mēnsa', scene: SC.v_mensa }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Andromachē', scene: SC.v_andromache },
            { la: 'vātēs',      scene: SC.v_vates },
            { la: 'sepulcrum',  scene: SC.v_sepulcrum },
            { la: 'flūmen',     scene: SC.v_flumen },
            { la: 'similis',    scene: SC.v_similis },
            { la: 'lacrimat',   scene: SC.v_lacrimat }
          ],
          scrambles: [
            { la: 'Sepulcrum prope flūmen stat.',       scene: SC.a11_sepulcrum },
            { la: 'Andromachē Aenēān videt.',           scene: SC.a11_lacrimat },
            { la: 'Urbs parva magnae Trōiae similis est.', scene: SC.a11_parvatroia },
            { la: 'Vātēs Trōiānīs multa praedīcit.',    scene: SC.a11_praedicit }
          ]
        },
        corrige: [
          { words: ['Urbs', 'parva', 'magnam', 'Trōiam', 'similis', 'est.'], wrong: 2,
            options: ['magnae', 'magna', 'magnārum'], correct: 0, scene: SC.a11_parvatroia },
          { words: ['Aenēās', 'Helenum', 'rogat,', 'quid', 'fāta', 'sibi', 'parant.'], wrong: 6,
            options: ['parent.', 'parāre.', 'parābant.'], correct: 0, scene: SC.a11_rogat },
          { words: ['Sepulcrum', 'ināne', 'est:', 'in', 'quō', 'nēmō', 'iacent.'], wrong: 6,
            options: ['iacet.', 'iacēre.', 'iacēbant.'], correct: 0, scene: SC.a11_sepulcrum },
          { words: ['Andromachē', 'ante', 'sepulcrum', 'praedīcit.'], wrong: 3,
            options: ['lacrimat.', 'rapit.', 'fugat.'], correct: 0, scene: SC.a11_sacra },
          { words: ['Vātēs', 'Trōiānīs', 'multa', 'lacrimat.'], wrong: 3,
            options: ['praedīcit.', 'ōrat.', 'errat.'], correct: 0, scene: SC.a11_praedicit }
        ],
        comple: [
          { text: 'Prope ___ sepulcrum stat.',
            options: ['flūmen', 'flūminis', 'flūminī'], correct: 0, scene: SC.a11_sepulcrum },
          { text: 'Urbs parva magnae Trōiae ___ est.',
            options: ['similis', 'similem', 'similī'], correct: 0, scene: SC.a11_parvatroia },
          { text: 'Andromachē virum suum videt et ___.',
            options: ['lacrimat', 'lacrimant', 'lacrimāre'], correct: 0, scene: SC.a11_lacrimat },
          { text: 'Aenēās rogat, quid fāta sibi ___.',
            options: ['parent', 'parant', 'parāre'], correct: 0, scene: SC.a11_rogat },
          { text: 'Helenus ___ est: deus eī futūra ostendit.',
            options: ['vātēs', 'vātem', 'vātis'], correct: 0, scene: SC.a11_vates },
          { text: 'In sepulcrō inānī nēmō ___.',
            options: ['iacet', 'iacent', 'iacēre'], correct: 0, scene: SC.a11_sepulcrum }
        ]
      }
    },

    /* ============ a12 — CYCLŌPĒS ============
       fons Aen. 3,506–718. The liber's last capitulum, and therefore
       the one that carries VERBA VERGILIĪ IPSĪUS — Aen. 3,71–72, one
       hexameter per page, each with its own scene and its own Latin
       glosses, then a graded-prose paraphrase, then the `versūs
       memorābilēs` page.
       WHY THOSE TWO LINES, OUT OF SEQUENCE. They belong to a9's
       departure, and they are quoted here for the reason Liber I
       quotes the proem in a4: the closing lines must land on the
       LIBER's picture, and this liber's picture is not one landfall
       but the leaving of all of them. The frame page says exactly that
       in Latin. Every content word is already in hand — `sociī` (a2),
       `nāvis` (a1), `lītus` (glossed under a2's `ōra`), `terra` and
       `urbs` (cōpia commūnis), and `portus`, carded in a9 precisely so
       that this line could be read and not decoded. `recēdit` and
       `complētur` are pre-taught in a9 and in this capitulum's own
       prose, so only `dēdūcunt` and `prōvehimur` are met cold, and
       each carries its own gloss on its own page.
       POLYPHĒMUS — see the file header for the whole ruling. He is
       shown ONCE, at the far side of the frame, at scale 1.95–2.1,
       with his flock and with his eyes CLOSED. The text says `caecus
       est` and then, in Latin, on the page, refuses to say more:
       *Plūra Achaemenidēs nōn dīcit.* Aen. 3,622–638 (the blinding and
       the eating of Ulysses' men) IS OMITTED ENTIRELY.
       ANCHĪSĒS' DEATH (3,708–715): one dignified sentence, a scene of
       his son alone on an empty shore, no body anywhere. It is told
       because Liber V is built on his grave.
       OMITTED for the cap: the first Italian landfall's omens
       (3,537–547), Charybdis by name (3,554–569 → `saxa perīculōsa`),
       Aetna's eruption described (3,570–587), the catalogue of Sicilian
       harbours (3,687–707). */
    {
      id: 'a12',
      titulus: 'Cyclōpēs',
      icon: '🌋👣',
      numerus: 'XII',
      pos: { x: 0.72, y: 0.34 },
      fons: 'Aen. 3,506–718 (+ 3,71–72)',
      vocab: [
        { la: 'Cyclōps',   scene: SC.v_cyclops,   pars: 'nomen' },
        { la: 'grex',      scene: SC.v_grex,      pars: 'nomen' },
        { la: 'Aetna',     scene: SC.v_aetna,     pars: 'nomen' },
        { la: 'perīculum', scene: SC.v_periculum, pars: 'nomen' },
        { la: 'supplex',   scene: SC.v_supplex,   pars: 'nomen' },
        { la: 'caecus',    scene: SC.v_caecus,    pars: 'adiectivum' }
      ],
      story: [
        /* Aen. 3,521–524 */
        { la: 'Ab Ēpīrō nāvigantēs, Trōiānī prīmum Ītaliae lītus vident: omnēs "Ītaliam!" clāmant.',
          scene: SC.a12_italia },

        /* Aen. 3,550–553 */
        { la: 'Sed illa ōra Graecīs plēna est. Itaque Helenī monitīs pārent et longē circum Siciliam nāvigant.',
          scene: SC.a12_circum },

        /* Aen. 3,554–569, B-RATED: no monster, no name, two rocks */
        { la: 'Inter saxa perīculōsa iter faciunt: ibi mare bis in diē fervet, et magnum perīculum nāvibus est. Sed hoc perīculum minus est quam illud quod sequitur.',
          scene: SC.a12_saxa,
          nova: [{ w: 'perīculum', e: '⚠', g: 'ubi perīculum est, homō timēre et cavēre dēbet' }] },

        /* Aen. 3,570–587, kept as one calm sentence */
        { la: 'Nocte sub monte Aetnā quiēscunt. Aetna enim ignem ē summō ēmittit, et caelum lūce rubrā complētur.',
          scene: SC.a12_aetna,
          nova: [{ w: 'Aetna', e: '🌋', g: 'mōns Siciliae quī ignem ē summō ēmittit' },
                 { w: 'complētur', e: '🔴', g: 'plēnum fit: caelum tōtum lūce plēnum est' }] },

        /* Aen. 3,588–597 */
        { la: 'Prīmā lūce, dum Aetna adhūc fūmat, vir ignōtus ē silvā currit: vestēs eius lacerae sunt et barba longa.',
          scene: SC.a12_vir },

        { la: 'Ille manūs tendit et supplex ōrat: "Servāte mē! Graecus sum, fateor; sed vōs per caelum ōrō."',
          scene: SC.a12_supplex,
          nova: [{ w: 'supplex', e: '🤲', g: 'quī humī positus auxilium ōrat et manūs tendit' }] },

        /* Aen. 3,613–618 */
        { la: 'Nōmen eī Achaemenidēs est: cum Ulixe vēnerat et ā sociīs in hāc terrā relictus erat.',
          scene: SC.a12_narrat,
          nova: [{ w: 'Achaemenidēs', e: '👤', g: 'Graecus, socius Ulixis, hīc relictus' },
                 { w: 'Ulixēs', e: '👤', g: 'dux Graecōrum, vir callidus' }] },

        /* Aen. 3,619–621 */
        { la: '"Fugite," inquit, "ō miserī! Hīc Cyclōpēs habitant, quōrum ūnus Polyphēmus vocātur."',
          scene: SC.a12_cyclops,
          nova: [{ w: 'Cyclōps', e: '👣', g: 'gigās ingēns quī in Siciliā habitat; ūnum oculum habet' },
                 { w: 'Polyphēmus', e: '👣', g: 'nōmen ūnīus ex Cyclōpibus' }] },

        { la: '"Polyphēmus, quī maximus Cyclōpum est, pecora in monte pāscit: grex eius magnus est, et grex eum semper sequitur."',
          scene: SC.a12_grex,
          nova: [{ w: 'grex', e: '🐑', g: 'multae ovēs simul, quae pāstōrem sequuntur' }] },

        /* the blinding, refused on the page — see the header */
        { la: '"Iam nōn videt: caecus est. Ulixēs enim eum dolō superāvit." Plūra Achaemenidēs nōn dīcit; nam caecī gigantis fortūna trīstis est.',
          scene: SC.a12_caecus,
          nova: [{ w: 'caecus', e: '🙈', g: 'quī oculīs nōn videt; caecō manūs prō oculīs sunt' }] },

        /* Aen. 3,655–661 — the giant, PROCUL */
        { la: 'Dum haec dīcit, ecce! Polyphēmus ipse dē monte dēscendit; procul in lītore stat.',
          scene: SC.a12_descendit,
          nova: [{ w: 'procul', e: '↔', g: 'longē ab oculīs; ↔ prope' }] },

        { la: 'Ingēns est: truncus pīnūs manum eius regit, et grex eum, ut semper, sequitur.',
          scene: SC.a12_truncus },

        /* Aen. 3,666–668, B-RATED: nobody is touched */
        { la: 'Trōiānī tacitī fugiunt: fūnēs incīdunt et nāvēs celeriter movent.',
          scene: SC.a12_fugiunt },

        { la: 'Caecus gigās sonum audit et manūs tendit, sed nāvem tangere nōn potest: aqua alta eum prohibet.',
          scene: SC.a12_fugiunt },

        /* Aen. 3,672–681 */
        { la: 'Tum clāmat, et clāmōre eius mare tremit; cēterī Cyclōpēs ad lītus veniunt et procul stant.',
          scene: SC.a12_clamor },

        { la: 'Trōiānī eōs procul vident, sed iam tūtī sunt: ventus secundus vēla implet et nāvēs portat.',
          scene: SC.a12_ceteri },

        /* the liber's moral: pietās toward an enemy */
        { la: 'Sīc Achaemenidēs, hostis quondam, ā Trōiānīs servātur: Aenēās enim etiam Graecum supplicem accipit, quia supplex hominis fidem, nōn patriam, rogat.',
          scene: SC.a12_servatur },

        /* Aen. 3,708–715, B-RATED: acknowledged, dignified, not shown */
        { la: 'Deinde circum Siciliam nāvigant. Ibi, in ōrā occidentālī, Anchīsēs pater moritur.',
          scene: SC.a12_anchises,
          nova: [{ w: 'moritur', e: '🕯', g: 'vīvere dēsinit; ↔ vīvit' }] },

        { la: 'Aenēās patrem, quem per tot maria umerīs portāverat, hīc āmittit; neque Helenus vātēs hoc eī praedīxerat.',
          scene: SC.a12_anchises },

        { la: 'Hic errōrum fīnis est, hic labōrum ultimus: hinc ad Āfricam tempestās Trōiānōs feret.',
          scene: SC.a12_finis },

        /* ---- VERBA VERGILIĪ IPSĪUS — Aen. 3,71–72 ---- */
        { la: 'Tōtus hic liber ūna nāvigātiō est. Audī igitur quō modō Vergilius ipse discessum Trōiānōrum canat:',
          scene: SC.a12_vergilius,
          nova: [{ w: 'nāvigātiō', e: '⛵', g: 'iter quod nāvibus per mare fit' }] },

        { la: 'dēdūcunt sociī nāvīs et lītora complent;',
          scene: SC.a12_versus1,
          ttsText: 'deducunt socii navis et litora complent;',
          nova: [{ w: 'dēdūcunt', e: '⬇🚢', g: 'nāvēs ex terrā in mare dūcunt, ut in capitulō nōnō' },
                 { w: 'nāvīs', e: '🚢', g: 'nāvīs = nāvēs: accūsātīvus plūrālis apud poētās' },
                 { w: 'lītora', e: '📍', g: 'lītus → lītora = ōrae maris' },
                 { w: 'complent', e: '👥', g: 'plēna faciunt: tot sunt ut lītus vacuum nōn sit' }] },

        { la: 'prōvehimur portū terraeque urbēsque recēdunt.',
          scene: SC.a12_versus2,
          ttsText: 'provehimur portu terraeque urbesque recedunt.',
          nova: [{ w: 'prōvehimur', e: '⛵', g: 'nāvibus ex portū in altum vehimur. Aenēās ipse hīc loquitur: "nōs prōvehimur"' },
                 { w: 'portū', e: '⚓', g: 'portus → portū: ex portū' },
                 { w: 'recēdunt', e: '↔', g: 'longius fīunt et minōrēs, dōnec iam nōn videntur' }] },

        { la: 'Id est: sociī nāvēs in mare dēdūcunt et lītus tōtum complent; deinde ex portū prōvehimur, et terrae urbēsque post nōs recēdunt.',
          scene: SC.a12_paraphrasis },

        { la: 'Versūs memorābilēs: "prōvehimur portū terraeque urbēsque recēdunt." Hic est tōtus liber tertius.',
          scene: SC.a12_memoria,
          ttsText: 'Provehimur portu terraeque urbesque recedunt. Hic est totus liber tertius.' }
      ],
      ludus: {
        words: [
          { la: 'Cyclōps',   scene: SC.v_cyclops,   emoji: '👣' },
          { la: 'grex',      scene: SC.v_grex,      emoji: '🐑' },
          { la: 'Aetna',     scene: SC.v_aetna,     emoji: '🌋' },
          { la: 'supplex',   scene: SC.v_supplex,   emoji: '🤲' },
          { la: 'perīculum', scene: SC.v_periculum, emoji: '⚠' },
          { la: 'portus',    scene: SC.v_portus,    emoji: '⚓' }
        ]
      },
      /* SONUS: `Cyclōps`, `grex` and `Aetna` all stand on the mountain
         ground, so no two of them are ever offered together; `caecus`
         is the same grey figure as the Cyclōps and never meets him
         either. `supplex` (a kneeling man in a wood), `perīculum` (a
         ship between two rocks) and `Aetna` (the one mountain with
         fire on it) carry the sets. */
      sonus: [
        { la: 'Aetna',
          answer: { la: 'Aetna', scene: SC.v_aetna },
          options: [{ la: 'Aetna', scene: SC.v_aetna },
                    { la: 'supplex', scene: SC.v_supplex },
                    { la: 'perīculum', scene: SC.v_periculum }] },
        { la: 'supplex',
          answer: { la: 'supplex', scene: SC.v_supplex },
          options: [{ la: 'supplex', scene: SC.v_supplex },
                    { la: 'Aetna', scene: SC.v_aetna },
                    { la: 'perīculum', scene: SC.v_periculum },
                    { la: 'grex', scene: SC.v_grex }] },
        { la: 'grex',
          answer: { la: 'grex', scene: SC.v_grex },
          options: [{ la: 'grex', scene: SC.v_grex },
                    { la: 'perīculum', scene: SC.v_periculum },
                    { la: 'supplex', scene: SC.v_supplex }] },
        { la: 'Cyclōps',
          answer: { la: 'Cyclōps', scene: SC.v_cyclops },
          options: [{ la: 'Cyclōps', scene: SC.v_cyclops },
                    { la: 'perīculum', scene: SC.v_periculum },
                    { la: 'supplex', scene: SC.v_supplex },
                    { la: 'portus', scene: SC.v_portus }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Cyclōps',   scene: SC.v_cyclops },
            { la: 'grex',      scene: SC.v_grex },
            { la: 'Aetna',     scene: SC.v_aetna },
            { la: 'supplex',   scene: SC.v_supplex },
            { la: 'perīculum', scene: SC.v_periculum },
            { la: 'caecus',    scene: SC.v_caecus }
          ],
          scrambles: [
            { la: 'Mōns Aetna ignem ēmittit.',          scene: SC.a12_aetna },
            { la: 'Grex Polyphēmum sequitur.',          scene: SC.a12_grex },
            { la: 'Trōiānī tacitī fugiunt.',            scene: SC.a12_fugiunt },
            { la: 'Aenēās supplicem Graecum accipit.',  scene: SC.a12_servatur }
          ]
        },
        corrige: [
          { words: ['Helenī', 'monitīs', 'pārent', 'et', 'circum', 'Siciliam', 'nāvigat.'], wrong: 6,
            options: ['nāvigant.', 'nāvigāre.', 'nāvigābat.'], correct: 0, scene: SC.a12_circum },
          { words: ['Mōns', 'Aetna', 'ignem', 'ē', 'summō', 'accipit.'], wrong: 5,
            options: ['ēmittit.', 'moritur.', 'sequitur.'], correct: 0, scene: SC.a12_aetna },
          { words: ['Polyphēmus', 'iam', 'nōn', 'videt:', 'supplex', 'est.'], wrong: 4,
            options: ['caecus', 'caecum', 'caecī'], correct: 0, scene: SC.a12_caecus },
          { words: ['Ovēs', 'pāstōrem', 'caecum', 'sequitur.'], wrong: 3,
            options: ['sequuntur.', 'sequitur.', 'sequī.'], correct: 0, scene: SC.a12_grex },
          { words: ['Aenēās', 'supplicem', 'Graecum', 'fugat.'], wrong: 3,
            options: ['accipit.', 'praedīcit.', 'lacrimat.'], correct: 0, scene: SC.a12_servatur }
        ],
        comple: [
          { text: 'Mōns ___ ignem ē summō ēmittit.',
            options: ['Aetna', 'Aetnae', 'Aetnam'], correct: 0, scene: SC.a12_aetna },
          { text: 'Inter saxa magnum ___ nāvibus est.',
            options: ['perīculum', 'perīculī', 'perīculō'], correct: 0, scene: SC.a12_saxa },
          { text: 'Polyphēmus iam nōn videt: ___ est.',
            options: ['caecus', 'caecum', 'caecī'], correct: 0, scene: SC.a12_caecus },
          { text: '___ eius magnus est: ovēs eum sequuntur.',
            options: ['Grex', 'Gregem', 'Gregis'], correct: 0, scene: SC.a12_grex },
          { text: 'Vir Graecus manūs tendit et ___ ōrat.',
            options: ['supplex', 'supplicem', 'supplicis'], correct: 0, scene: SC.a12_supplex },
          { text: 'Aenēās supplicem Graecum ___.',
            options: ['accipit', 'fugat', 'rapit'], correct: 0, scene: SC.a12_servatur }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ---------- */

  CONTENT.registerRegion({
    track: 'aeneis',
    id: 'al3',
    titulus: 'Errōrēs',
    ladder: 'S12',             /* CURRICULUM §0: the whole ladder is open */
    progressId: 'al3',
    capitula: capitula,

    /* ============ PROBĀTIŌ — ERRŌRĒS ============
       CURRICULUM §3: "Boss per liber = probātiō themed to the liber".
       Two phases, and neither is a fight:

       1. TRĀNSITUS — the liber's own picture turned into a verb: the
          strait of a12, steered. The wall actor is `mountain` and not
          al1's `murusAquae`, because THIS liber's danger is rock and
          not water (a12: `inter saxa perīculōsa iter faciunt`), and
          because two librī in a row must not run the same trial with
          the same art. The water is the calm Ionian blue of bgSea and
          not al1's storm blue, for the same reason.
          *** VERIFIED AT INTEGRATION (wave 5) AND KEPT. The flag this
          comment used to carry was real — the phase rasterises the wall
          actor into a 130×130 tile and the mountain silhouette had
          never been tiled — so the tile was rendered headlessly at
          exactly 130 px, tiled down a wall face over this phase's own
          water colour, and LOOKED AT beside `murusAquae` as a control.
          It reads: two brown peaks with white snow caps on #3d7fa0, a
          triangular silhouette at full contrast, and stacked it reads
          as a RANGE. It is the most legible of the three transitus
          walls in the product. The one-word revert (wall: 'murusAquae')
          is NOT taken and should not be. ***
       2. SENTENTIA. Six HAND-AUTHORED items (AUTHORING-BRIEF, "Boss
          clamor/sententia items"). Every gap is a picturable content
          lexeme; every distractor is same-POS and wrong IN THE
          PICTURE; and every item carries syntax this liber taught —
          two ablātīvī absolūtī, an accūsātīvus cum īnfīnītīvō, a
          deponent, a passive and a relative clause — so the learner
          must read the construction, not only the noun.

       hp 5 + 5 = 10, seconds 45 + 55 = 100: over the 20 s anti-cheat
       floor, and longer than a Fabulae duel because a trial is meant
       to be read, not raced. */
    boss: {
      id: 'b_al3',
      progressId: 'al3',
      kind: 'probatio',
      name: 'Errōrēs',
      actor: 'ship',
      bg: 'sea',
      sceneY: 202,
      sceneScale: 1,
      /* legacy single-phase tuning: a client without js/probatio.js must
         still run something, and rules.php derives rule_boss_min_ms
         from these numbers (same reason r01/r02/l2/al1/al2 keep theirs). */
      hp: 10,
      seconds: 100,
      pos: { x: 0.37, y: 0.15 },
      phases: [
        { type: 'transitus', hp: 5, seconds: 45,
          wall: 'mountain', water: '#3d7fa0' },
        { type: 'sententia', hp: 5, seconds: 55,
          items: [
            /* abl. abs.: the learner has to read `dēductīs` to see that
               the missing word is what the ships go out OF. */
            { text: 'Nāvibus dēductīs, classis ex ____ exit.',
              answer: 'portus',
              options: ['portus', 'īnsula', 'patria'],
              scene: SC.a9_portus },
            /* the gap is the subject of a negated verb, and only one
               card can be sown in a dry field */
            { text: 'In agrīs siccīs ____ nōn crēscit.',
              answer: 'frūmentum',
              options: ['frūmentum', 'armentum', 'sepulcrum'],
              scene: SC.a9_frumentum },
            /* acc. + inf.: `cibum rapere` is what the birds do, and
               only a bird can be the subject of it */
            { text: 'Trōiānī vident ____ cibum ē mēnsīs rapere.',
              answer: 'avis',
              options: ['avis', 'grex', 'vātēs'],
              scene: SC.a10_rapiunt },
            /* relative clause: `in quō nēmō iacet` names one card */
            { text: 'Prope flūmen stat ____, in quō nēmō iacet.',
              answer: 'sepulcrum',
              options: ['sepulcrum', 'ōrāculum', 'perīculum'],
              scene: SC.a11_sepulcrum },
            /* deponent: only what follows a shepherd can be the subject
               of `sequitur` here */
            { text: 'Caecum pāstōrem ____ suus sequitur.',
              answer: 'grex',
              options: ['grex', 'portus', 'flūmen'],
              scene: SC.a12_grex },
            /* passive + abl. abs.: `servātur` makes the gap the man who
               is saved, and `Graecus` tells the learner which one */
            { text: 'Manibus tentīs, Graecus ____ ā Trōiānīs servātur.',
              answer: 'supplex',
              options: ['supplex', 'exsul', 'vātēs'],
              scene: SC.a12_servatur }
          ] }
      ],
      /* 5 cumulative questions; every word is a vocab entry WITH a
         picture in its own capitulum (js/app.js bossWords()). All four
         capitula are represented; a12 gives two because it is the
         liber's longest. Answer key lives on the server — see
         content/_pending/a-l3.reg.json. */
      quiz: [
        { la: 'portus',    from: 'a9' },
        { la: 'avis',      from: 'a10' },
        { la: 'sepulcrum', from: 'a11' },
        { la: 'Aetna',     from: 'a12' },
        { la: 'grex',      from: 'a12' }
      ]
    }
  });
})();
