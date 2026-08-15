/* ============================================================
   content/fabulae-r03.js — FĀBULAE · Regiō III · RĪVUS  (ladder S3)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō II:
     f7 Canis et Umbra    — GENITIVE (aqua rīvī, umbra canis)
     f8 Rāna et Bōs       — DATIVE sg + pl (bovī, rānīs)
     f9 Cervus ad Fontem  — both, incl. genitive PLURAL (rāmī arborum)

   STAGE CEILING (CURRICULUM §0 S3, binding):
     everything S1–S2 (nom/acc sg+pl · est/sunt · 3rd-person present of
     ANY conjugation, AUTHORING-BRIEF ruling 1 · -que · et…et · nōn)
     PLUS genitive and dative sg/pl.
     NO ablative except the locative pattern Regiōnēs I–II already ship
     receptively (in silvā, in arbore, in agrō, in aquā, in ōre — the
     same shape as Regiō I's own "in rōstrō tenet"), and the ad + acc
     of "ad rīvum" / "ad silvam". NO imperative, NO vocative, NO
     question words, NO pronouns, NO imperfect/perfect, NO comparative.
     Where the ladder and good Latin collided the SENTENCE was changed,
     never the grammar (AUTHORING-BRIEF, golden exemplar).

   TWO DELIBERATE MORPHOLOGY RULINGS, both for the learner's sake:

   1. AMBIGUOUS DATIVES ARE AVOIDED. `rānae` is dat. sg. AND nom. pl.;
      a learner meeting the dative for the first time must not have to
      guess. Every dative in f8 is therefore either `bovī` (3rd decl.,
      unmistakable) or `rānīs` (dat. pl., unmistakable). `rānae` appears
      ONLY as a nominative plural, glossed as such. Regiō IV's f11 leans
      on the same principle from the other side: it can afford the
      ambiguous `ciconiae` there because by then `dat` + an accusative
      object has fixed the slot, and it pairs it with `vulpī`, which is
      3rd declension and cannot be read as anything but a dative.

   2. THE GENITIVE IS BUILT UP FROM MARKED ENDINGS FIRST. `canis` is its
      own genitive, so "umbra canis" — the title's pun and the fable's
      whole point — is taught only AFTER `rīvus → rīvī` and
      `cāseus → cāseī` have shown what a genitive does. See f7 p4.

   PROGRESS IDS ARE FROZEN once shipped: f7/f8/f9 and progressId 'r03'
   are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ----------

     RIVER GEOMETRY (js/scenes.js bgRiver): the water band runs from
     (0,150)–(0,180) to (400,185)–(400,215). Regiō I's convention — far
     bank ≈ y 155, near bank ≈ y 230 — is kept here so a learner who has
     read f3 reads the same river the same way. */

  var SC = {

    /* ============ fable 7 — Canis et Umbra ============ */

    f7_silva:    { bg: 'forest', items: [
                   { t: 'tree',  x: 340, y: G, s: 0.9 },
                   { t: 'bush',  x: 50,  y: G },
                   { t: 'canis', x: 170, y: G, s: 1.1 }
                 ] },

    /* the cheese sits AT the muzzle (head x 27, r 11, muzzle 6 → the
       mouth tip is ~44 units forward, ~40 up, before scaling) */
    f7_portat:   { bg: 'forest', items: [
                   { t: 'tree',   x: 340, y: G, s: 0.9 },
                   { t: 'bush',   x: 50,  y: G },
                   { t: 'canis',  x: 170, y: G, s: 1.1 },
                   { t: 'cheese', x: 219, y: G - 45, s: 0.9 }
                 ] },

    /* DEFECT FIXED (see the report): at y 158 the dog's feet landed
       INSIDE the water band — the river top edge at x 120 is y 160.5 —
       so he read as walking on the water three pages before he even
       reaches the log. Regiō I's own convention (f3_river: wolf at
       x 85 / y 155) is a few units ABOVE the band; this follows it. */
    f7_rivus:    { bg: 'river', items: [
                   { t: 'canis',  x: 120, y: 152, s: 1, pose: 'walk' },
                   { t: 'cheese', x: 164, y: 112, s: 0.85 }
                 ] },

    /* aqua rīvī: nothing but the river, so the sentence about the WATER
       has no animal competing with it for attention */
    f7_aqua:     { bg: 'river', items: [
                   { t: 'bush',  x: 40,  y: G },
                   { t: 'canis', x: 105, y: 156, s: 0.9 }
                 ] },

    f7_truncus:  { bg: 'river', items: [
                   { t: 'truncus', x: 200, y: 176, s: 1.6 }
                 ] },

    f7_super:    { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'cheese',  x: 210, y: 118, s: 0.85 }
                 ] },

    /* THE picture of the fable. The reflection is built from three
       things, because one alone would lie:
         · the umbra ellipse (the art set registers it for exactly this),
         · a SECOND dog standing lower and smaller — what the dog in the
           story believes he is looking at,
         · that dog's own cheese.
       The reflection faces the same way as the dog above it, because a
       water reflection is a VERTICAL mirror, not a horizontal one. */
    f7_umbra:    { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'cheese',  x: 210, y: 118, s: 0.85 },
                   { t: 'umbra',   x: 200, y: 202, w: 56, h: 13, opacity: 0.5 },
                   { t: 'canis',   x: 200, y: 200, s: 0.85 }
                 ] },

    f7_caseus2:  { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'cheese',  x: 210, y: 118, s: 0.85 },
                   { t: 'umbra',   x: 200, y: 202, w: 56, h: 13, opacity: 0.5 },
                   { t: 'canis',   x: 200, y: 200, s: 0.85 },
                   { t: 'cheese',  x: 238, y: 164, s: 0.75 }
                 ] },

    f7_cupit:    { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'cheese',  x: 210, y: 118, s: 0.85 },
                   { t: 'umbra',   x: 200, y: 202, w: 56, h: 13, opacity: 0.5 },
                   { t: 'canis',   x: 200, y: 200, s: 0.85 },
                   { t: 'cheese',  x: 238, y: 164, s: 0.75 }
                 ],
                 bubbles: [{ x: 92, y: 66, w: 74, h: 44, text: '🧀 🧀', kind: 'thought', tail: 'right', fs: 18 }] },

    f7_latrat:   { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'cheese',  x: 210, y: 118, s: 0.85 },
                   { t: 'umbra',   x: 200, y: 202, w: 56, h: 13, opacity: 0.5 },
                   { t: 'canis',   x: 200, y: 200, s: 0.85 },
                   { t: 'cheese',  x: 238, y: 164, s: 0.75 }
                 ],
                 bubbles: [{ x: 88, y: 62, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'right', fs: 20 }] },

    /* the mouth opens, and the cheese is already in the air: no reflection
       cheese any more, because there is nothing left to reflect */
    f7_cadit:    { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'cheese',  x: 224, y: 150, s: 0.8 },
                   { t: 'umbra',   x: 200, y: 202, w: 56, h: 13, opacity: 0.5 },
                   { t: 'canis',   x: 200, y: 200, s: 0.85 }
                 ],
                 bubbles: [{ x: 88, y: 62, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'right', fs: 20 }] },

    f7_inaqua:   { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 },
                   { t: 'umbra',   x: 262, y: 200, w: 24, h: 8, opacity: 0.55 }
                 ] },

    f7_sedet:    { bg: 'river', items: [
                   { t: 'truncus', x: 180, y: 174, s: 1.5 },
                   { t: 'canis',   x: 166, y: 156, s: 1 }
                 ],
                 bubbles: [{ x: 296, y: 74, w: 74, h: 44, text: '🧀 ✗', kind: 'speech', tail: 'left', fs: 18 }] },

    f7_quaerit:  { bg: 'river', items: [
                   { t: 'canis', x: 150, y: 158, s: 1, pose: 'walk' }
                 ],
                 bubbles: [{ x: 300, y: 78, w: 80, h: 44, text: '🔎 🧀 ✗', kind: 'thought', tail: 'left', fs: 16 }] },

    f7_tristis:  { bg: 'river', items: [
                   { t: 'bush',  x: 40,  y: G },
                   { t: 'canis', x: 150, y: 158, s: 1 },
                   { t: 'umbra', x: 262, y: 200, w: 24, h: 8, opacity: 0.55 }
                 ],
                 bubbles: [{ x: 306, y: 92, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'left', fs: 19 }] },

    f7_moral:    { bg: 'river', items: [
                   { t: 'canis', x: 150, y: 158, s: 1 },
                   { t: 'umbra', x: 210, y: 200, w: 52, h: 12, opacity: 0.5 },
                   { t: 'canis', x: 210, y: 198, s: 0.85 }
                 ],
                 bubbles: [{ x: 92, y: 70, w: 76, h: 44, text: '🌑 ✓ 🧀 ✗', kind: 'thought', tail: 'right', fs: 15 }] },

    /* ============ fable 8 — Rāna et Bōs ============

       THE ONE RULE OF THIS FABLE'S ART: the ox is drawn at the SAME
       x and the SAME scale on every page where the frog swells. If the
       ox shrank while the frog grew, the picture would be telling a
       different (and false) story from the text. */

    f8_rana:     { bg: 'river', items: [
                   { t: 'rana', x: 190, y: G - 2, s: 1.4 }
                 ] },

    f8_ranae:    { bg: 'river', items: [
                   { t: 'rana', x: 80,  y: G - 2, s: 0.9 },
                   { t: 'rana', x: 170, y: G - 2, s: 0.8, flip: true },
                   { t: 'rana', x: 262, y: G - 2, s: 0.85 }
                 ] },

    f8_bos:      { bg: 'plain', items: [
                   { t: 'frumentum', x: 40,  y: G, s: 0.8 },
                   { t: 'bos',       x: 318, y: G, s: 1, flip: true }
                 ] },

    f8_videt:    { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 1 }
                 ] },

    f8_invidet:  { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 175, y: 92, w: 56, h: 40, text: '😒', kind: 'thought', tail: 'left', fs: 19 }] },

    /* dative of possession, pictured: the water belongs with the frogs,
       the field with the ox — two places, one frame.
       THREE frogs, not one, and deliberately so: the COMPLĒ item on this
       scene asks for `rānīs`, and with a single frog on the page `rānae`
       (dat. sg.) would be just as true — an ambiguous answer is a defect
       (LATIN-STYLE §4). The picture is what closes the case. */
    f8_habent:   { bg: 'plain', items: [
                   { t: 'bos',       x: 318, y: G, s: 1, flip: true },
                   { t: 'fons',      x: 92,  y: G, s: 1.15 },
                   { t: 'rana',      x: 62,  y: G - 6, s: 0.8 },
                   { t: 'rana',      x: 118, y: G - 6, s: 0.75, flip: true },
                   { t: 'rana',      x: 92,  y: G - 14, s: 0.7 }
                 ] },

    f8_tumet1:   { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 1.7 }
                 ] },

    f8_dicit:    { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 1.7 },
                   { t: 'rana', x: 218, y: G, s: 0.62 },
                   { t: 'rana', x: 256, y: G, s: 0.56, flip: true }
                 ],
                 bubbles: [{ x: 186, y: 60, w: 66, h: 42, text: '📢 🐸', kind: 'speech', tail: 'left', fs: 17 }] },

    f8_respondent: { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 1.7 },
                   { t: 'rana', x: 218, y: G, s: 0.62 },
                   { t: 'rana', x: 256, y: G, s: 0.56, flip: true }
                 ],
                 bubbles: [{ x: 200, y: 52, w: 88, h: 42, text: '🐂 ⬆', kind: 'speech', tail: 'right', fs: 17 }] },

    f8_superba:  { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 2.1 }
                 ],
                 bubbles: [{ x: 214, y: 60, w: 56, h: 40, text: '😤', kind: 'thought', tail: 'left', fs: 19 }] },

    f8_clamant:  { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 2.1 },
                   { t: 'rana', x: 222, y: G, s: 0.62 },
                   { t: 'rana', x: 258, y: G, s: 0.56, flip: true }
                 ],
                 bubbles: [{ x: 214, y: 48, w: 92, h: 42, text: '📢 🐂 ⬆', kind: 'speech', tail: 'right', fs: 15 }] },

    f8_tumet3:   { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 2.5 }
                 ],
                 bubbles: [{ x: 232, y: 56, w: 56, h: 40, text: '😤', kind: 'thought', tail: 'left', fs: 19 }] },

    /* B-RATING (DESIGN §8): the frog does NOT burst. She tips over,
       giddy, and is small again. Nothing on the page is broken. */
    f8_cadit:    { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 118, y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 186, y: 96, w: 56, h: 40, text: '💫', kind: 'thought', tail: 'left', fs: 19 }] },

    /* the humbling: the ox never even looked up */
    f8_nonvidet: { bg: 'plain', items: [
                   { t: 'frumentum', x: 44,  y: G, s: 0.8 },
                   { t: 'bos',       x: 318, y: G, s: 1, pose: 'eat', flip: true },
                   { t: 'rana',      x: 110, y: G, s: 0.85 }
                 ] },

    f8_iuvant:   { bg: 'river', items: [
                   { t: 'rana', x: 150, y: G - 2, s: 0.9 },
                   { t: 'rana', x: 232, y: G - 2, s: 0.8, flip: true },
                   { t: 'rana', x: 306, y: G - 2, s: 0.8, flip: true }
                 ] },

    f8_moral:    { bg: 'plain', items: [
                   { t: 'bos',  x: 318, y: G, s: 1, flip: true },
                   { t: 'rana', x: 110, y: G, s: 0.9 }
                 ],
                 bubbles: [{ x: 176, y: 74, w: 86, h: 44, text: '🐸 ⬆ ✗', kind: 'thought', tail: 'left', fs: 17 }] },

    /* ============ fable 9 — Cervus ad Fontem ============ */

    f9_cervus:   { bg: 'forest', items: [
                   { t: 'tree',   x: 60,  y: G, s: 0.85 },
                   { t: 'bush',   x: 345, y: G },
                   { t: 'cervus', x: 200, y: G, s: 1.05 }
                 ] },

    f9_fons:     { bg: 'forest', items: [
                   { t: 'fons',   x: 130, y: G, s: 1.2 },
                   { t: 'cervus', x: 260, y: G, s: 1, flip: true }
                 ] },

    f9_bibit:    { bg: 'forest', items: [
                   { t: 'fons',   x: 140, y: G, s: 1.2 },
                   { t: 'cervus', x: 250, y: G, s: 1, pose: 'eat', flip: true }
                 ] },

    f9_umbra:    { bg: 'forest', items: [
                   { t: 'fons',   x: 150, y: G, s: 1.3 },
                   { t: 'umbra',  x: 150, y: G - 8, w: 34, h: 9, opacity: 0.5 },
                   { t: 'cervus', x: 262, y: G, s: 1, flip: true }
                 ] },

    f9_cornua:   { bg: 'forest', items: [
                   { t: 'fons',   x: 120, y: G, s: 1.1 },
                   { t: 'cervus', x: 250, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 316, y: 54, w: 54, h: 40, text: '✨', kind: 'thought', tail: 'left', fs: 20 }] },

    f9_laudat:   { bg: 'forest', items: [
                   { t: 'fons',   x: 120, y: G, s: 1.1 },
                   { t: 'cervus', x: 250, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 316, y: 54, w: 54, h: 40, text: '😍', kind: 'thought', tail: 'left', fs: 20 }] },

    f9_pedes:    { bg: 'forest', items: [
                   { t: 'fons',   x: 120, y: G, s: 1.1 },
                   { t: 'cervus', x: 250, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 316, y: 132, w: 54, h: 40, text: '🐾', kind: 'thought', tail: 'left', fs: 20 }] },

    f9_nonlaudat: { bg: 'forest', items: [
                   { t: 'fons',   x: 120, y: G, s: 1.1 },
                   { t: 'cervus', x: 250, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 316, y: 132, w: 66, h: 40, text: '🐾 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f9_dicit:    { bg: 'forest', items: [
                   { t: 'fons',   x: 120, y: G, s: 1.1 },
                   { t: 'cervus', x: 250, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 160, y: 58, w: 96, h: 44, text: '✨ ✓ 🐾 ✗', kind: 'speech', tail: 'right', fs: 15 }] },

    f9_canes:    { bg: 'forest', items: [
                   { t: 'fons',   x: 348, y: G, s: 0.9 },
                   { t: 'cervus', x: 300, y: G, s: 1.05, flip: true },
                   { t: 'canis',  x: 75,  y: G, s: 0.95, pose: 'walk' },
                   { t: 'canis',  x: 160, y: G, s: 0.9,  pose: 'walk' }
                 ] },

    /* DIRECTION IS CONTINUITY: from here to the end of the fable the
       stag flees RIGHT and the hounds chase RIGHT, on every page. The
       first draft had him running left in f9_fugit — straight at the
       dogs — and left again in f9_rami, away from the wood he is said
       to be running into. */
    f9_fugit:    { bg: 'forest', items: [
                   { t: 'cervus', x: 300, y: G, s: 1.05, pose: 'run' },
                   { t: 'canis',  x: 70,  y: G, s: 0.95, pose: 'walk' },
                   { t: 'canis',  x: 150, y: G, s: 0.9,  pose: 'walk' }
                 ] },

    f9_portant:  { bg: 'plain', items: [
                   { t: 'cervus', x: 315, y: G, s: 1.05, pose: 'run' },
                   { t: 'canis',  x: 95,  y: G, s: 0.9, pose: 'walk' },
                   { t: 'canis',  x: 160, y: G, s: 0.85, pose: 'walk' }
                 ],
                 bubbles: [{ x: 230, y: 74, w: 56, h: 40, text: '🐾', kind: 'thought', tail: 'right', fs: 20 }] },

    /* arriving among the trees: still running, antlers still clear */
    f9_rami:     { bg: 'forest', items: [
                   { t: 'tree',   x: 250, y: G, s: 1.1 },
                   { t: 'tree',   x: 340, y: G, s: 0.85 },
                   { t: 'cervus', x: 150, y: G, s: 1.05, pose: 'run' },
                   { t: 'canis',  x: 45,  y: G, s: 0.9, pose: 'walk' }
                 ] },

    /* caught: the stag is drawn to the RIGHT of the trunk so his crown
       sits inside the leaves, not beside them. He is standing, not
       struggling — B-rating: the branches hold him, nothing hurts him. */
    /* TWO trees, for the same reason f8_habent carries three frogs: the
       COMPLĒ item here asks for the genitive PLURAL `arborum`, and beside
       a single tree `arboris` would be just as true. */
    f9_tenent:   { bg: 'forest', items: [
                   { t: 'tree',   x: 170, y: G, s: 1.2 },
                   { t: 'tree',   x: 330, y: G, s: 0.95 },
                   { t: 'cervus', x: 196, y: G, s: 1.05 },
                   { t: 'canis',  x: 60,  y: G, s: 0.9, pose: 'walk' }
                 ],
                 bubbles: [{ x: 108, y: 58, w: 60, h: 42, text: '💢', kind: 'thought', tail: 'right', fs: 20 }] },

    f9_liber:    { bg: 'forest', items: [
                   { t: 'tree',   x: 80,  y: G, s: 1 },
                   { t: 'cervus', x: 270, y: G, s: 1.05, pose: 'run' }
                 ] },

    /* the hounds are leaving the frame to the right; the stag stands
       clear of the trees, whole */
    f9_servant:  { bg: 'forest', items: [
                   { t: 'tree',   x: 55,  y: G, s: 0.9 },
                   { t: 'cervus', x: 170, y: G, s: 1.05 },
                   { t: 'canis',  x: 345, y: G, s: 0.85, pose: 'walk' }
                 ] },

    f9_laudatPedes: { bg: 'forest', items: [
                   { t: 'tree',   x: 55,  y: G, s: 0.9 },
                   { t: 'cervus', x: 250, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 150, y: 66, w: 88, h: 44, text: '🐾 ➡ 🦌', kind: 'speech', tail: 'right', fs: 16 }] },

    f9_moral:    { bg: 'plain', items: [
                   { t: 'cervus', x: 230, y: G, s: 1.1, flip: true }
                 ],
                 bubbles: [{ x: 120, y: 60, w: 66, h: 42, text: '✨ ✗', kind: 'thought', tail: 'right', fs: 19 },
                           { x: 120, y: 136, w: 66, h: 42, text: '🐾 ✓', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ vocabulary mini-scenes ============ */

    v_canis:     { bg: 'plain', items: [{ t: 'canis', x: 190, y: G, s: 1.5 }] },
    /* umbra: the dog and the thing in the water that is not a dog */
    v_umbra:     { bg: 'river', items: [
                   { t: 'canis', x: 140, y: 160, s: 1 },
                   { t: 'umbra', x: 190, y: 200, w: 54, h: 13, opacity: 0.5 },
                   { t: 'canis', x: 190, y: 198, s: 0.85 }
                 ] },
    v_truncus:   { bg: 'river', items: [{ t: 'truncus', x: 200, y: 176, s: 1.8 }] },
    v_latrat:    { bg: 'plain', items: [{ t: 'canis', x: 160, y: G, s: 1.5 }],
                   bubbles: [{ x: 300, y: 96, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'left', fs: 20 }] },
    v_rivus:     { bg: 'river', items: [{ t: 'bush', x: 44, y: G }, { t: 'bush', x: 356, y: G }] },
    /* portat: the dog WITH the cheese, walking — the cheese is riding,
       exactly as the ant carried its ear of grain in f5 */
    v_portat:    { bg: 'plain', items: [
                   { t: 'canis',  x: 155, y: G, s: 1.4, pose: 'walk' },
                   { t: 'cheese', x: 217, y: G - 57, s: 1 }
                 ] },

    v_rana:      { bg: 'plain', items: [{ t: 'rana', x: 195, y: G, s: 1.6 }] },
    v_bos:       { bg: 'plain', items: [{ t: 'bos', x: 190, y: G, s: 1.3 }] },
    /* tumet: the same animal small and swollen, side by side */
    v_tumet:     { bg: 'plain', items: [
                   { t: 'rana', x: 100, y: G, s: 0.85 },
                   { t: 'rana', x: 285, y: G, s: 2.3 }
                 ] },
    v_invidet:   { bg: 'plain', items: [
                   { t: 'bos',  x: 305, y: G, s: 1, flip: true },
                   { t: 'rana', x: 95,  y: G, s: 1.05 }
                 ],
                 bubbles: [{ x: 168, y: 96, w: 56, h: 40, text: '😒', kind: 'thought', tail: 'left', fs: 19 }] },
    v_superbus:  { bg: 'plain', items: [{ t: 'rana', x: 175, y: G, s: 2.3 }],
                   bubbles: [{ x: 316, y: 74, w: 56, h: 40, text: '😤', kind: 'thought', tail: 'left', fs: 19 }] },

    v_cervus:    { bg: 'plain', items: [{ t: 'cervus', x: 190, y: G, s: 1.35 }] },
    v_fons:      { bg: 'plain', items: [{ t: 'fons', x: 200, y: G, s: 1.7 }] },
    /* cornua: TWO animals that share nothing else. The card therefore
       teaches the horns, not the beast — the same device f6 used for
       `aureum` (a crown and an egg). Kept OUT of SONUS: by ear a learner
       could tap this card for `bōs` or `cervus` and be right about the
       picture, wrong about the word (LATIN-STYLE §4). */
    v_cornua:    { bg: 'plain', items: [
                   { t: 'bos',    x: 305, y: G, s: 0.95, flip: true },
                   { t: 'cervus', x: 105, y: G, s: 1.05 }
                 ] },
    v_laudat:    { bg: 'plain', items: [{ t: 'cervus', x: 165, y: G, s: 1.2, flip: true }],
                   bubbles: [{ x: 306, y: 68, w: 58, h: 42, text: '😍', kind: 'thought', tail: 'left', fs: 19 }] },
    v_fugit:     { bg: 'plain', items: [{ t: 'cervus', x: 190, y: G, s: 1.3, pose: 'run' }] },
    v_servat:    { bg: 'forest', items: [
                   { t: 'cervus', x: 290, y: G, s: 1.1, pose: 'run' },
                   { t: 'canis',  x: 68,  y: G, s: 0.9, pose: 'walk' },
                   { t: 'canis',  x: 132, y: G, s: 0.85, pose: 'walk' }
                 ],
                 bubbles: [{ x: 205, y: 62, w: 60, h: 42, text: '🐾 ✓', kind: 'thought', tail: 'right', fs: 18 }] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 7 — Canis et Umbra ============
       GENITIVE showcase. Deliberately LIGHT on new vocabulary (4 content
       lexemes + `ōs` by gloss, against a cap of 8): the new thing in this
       capitulum is a whole CASE, and LATIN-STYLE §2 says a sentence that
       introduces new grammar uses known vocabulary. The saved budget is
       spent on recycling f2's `cāseus` and f3's `rīvus`/`aqua`, which the
       ledger requires anyway. */
    {
      id: 'f7',
      titulus: 'Canis et Umbra',
      icon: '🐕🌑',
      numerus: 'VII',
      pos: { x: 0.72, y: 0.87 },
      vocab: [
        { la: 'canis',   scene: SC.v_canis,   pars: 'nomen' },
        { la: 'umbra',   scene: SC.v_umbra,   pars: 'nomen' },
        { la: 'truncus', scene: SC.v_truncus, pars: 'nomen' },
        { la: 'rīvus',   scene: SC.v_rivus,   pars: 'nomen' },
        { la: 'cāseus',  emoji: '🧀',         pars: 'nomen' },
        { la: 'aqua',    emoji: '💧',         pars: 'nomen' },
        { la: 'lātrat',  scene: SC.v_latrat,  pars: 'verbum' },
        { la: 'portat',  scene: SC.v_portat,  pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce canis! Canis in silvā ambulat.', scene: SC.f7_silva,
          nova: [{ w: 'canis', e: '🐕', g: '' }] },

        { la: 'Canis cāseum in ōre portat.', scene: SC.f7_portat,
          nova: [{ w: 'ōre', e: '👄', g: 'ōs canis: canis cāseum tenet' }] },

        { la: 'Canis ad rīvum venit. Canis aquam videt.', scene: SC.f7_rivus },

        /* FIRST GENITIVE. rīvus → rīvī is a marked ending, so the form
           itself carries the news; the gloss shows the morphology and the
           picture shows the shallow water. `umbra canis` — where the
           genitive is homographic with the nominative — waits four pages. */
        { la: 'Aqua rīvī nōn alta est.', scene: SC.f7_aqua,
          nova: [{ w: 'rīvī', e: '💧', g: 'rīvus → aqua rīvī' }] },

        { la: 'Ecce truncus! Truncus super rīvum est.', scene: SC.f7_truncus,
          nova: [{ w: 'truncus', e: '🌳', g: 'canis super truncum ambulat' }] },

        { la: 'Canis super truncum ambulat. Truncus nōn magnus est.', scene: SC.f7_super },

        { la: 'In aquā umbra est. Umbra canis in aquā est!', scene: SC.f7_umbra,
          nova: [{ w: 'umbra', e: '🐕🌑', g: 'canis in aquā: umbra canis' }] },

        { la: 'Umbra quoque cāseum portat. Ecce cāseus umbrae!', scene: SC.f7_caseus2,
          nova: [{ w: 'umbrae', e: '🌑🧀', g: 'umbra → cāseus umbrae' }] },

        { la: 'Canis cāseum umbrae videt et cupit.', scene: SC.f7_cupit },

        { la: 'Canis lātrat: “Umbra cāseum portat! Canis cāseum umbrae capit!”',
          scene: SC.f7_latrat,
          nova: [{ w: 'lātrat', e: '📢', g: 'canis clāmat' }] },

        { la: 'Canis ōs aperit et lātrat. Cāseus cadit!', scene: SC.f7_cadit },

        { la: 'Cāseus iam in aquā est. Canis cāseum nōn habet.', scene: SC.f7_inaqua },

        /* the fable's SECOND direct-speech beat, and `lātrat`'s third
           exposure — the self-check caught it at two. The old line here
           talked about the umbra, which this scene does not draw; what
           the scene actually shows is a dog on a log with no cheese, and
           that is now what the page says. */
        { la: 'Canis super truncum sedet. Canis lātrat: “Cāseus nōn est!”', scene: SC.f7_sedet },

        { la: 'Canis cāseum quaerit; nihil invenit.', scene: SC.f7_quaerit },

        { la: 'Canis trīstis est: cāseus canis in aquā est.', scene: SC.f7_tristis },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: canis umbram cupit; cāseum nōn habet.', scene: SC.f7_moral }
      ],
      ludus: {
        words: [
          { la: 'canis',   scene: SC.v_canis,   emoji: '🐕' },
          { la: 'umbra',   scene: SC.v_umbra },
          { la: 'cāseus',  emoji: '🧀' },
          { la: 'truncus', scene: SC.v_truncus },
          { la: 'leō',     emoji: '🦁' },
          { la: 'gallīna', emoji: '🐔' }
        ]
      },
      /* SONUS hand-authored. Two words are deliberately absent:
         · `umbra`, because v_umbra CONTAINS a dog — a learner who hears
           "canis" and taps it is right about the picture and wrong about
           the word (LATIN-STYLE §4). It is recycled in CORRIGE instead.
         · `lātrat`, because v_latrat is v_canis plus a bubble; by ear the
           two are a coin-flip. It is recycled in COMPLĒ instead. */
      sonus: [
        { la: 'canis',
          answer: { la: 'canis', scene: SC.v_canis },
          options: [{ la: 'canis', scene: SC.v_canis },
                    { la: 'rīvus', scene: SC.v_rivus },
                    { la: 'cāseus', emoji: '🧀' }] },
        { la: 'cāseus',
          answer: { la: 'cāseus', emoji: '🧀' },
          options: [{ la: 'cāseus', emoji: '🧀' },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'truncus', scene: SC.v_truncus },
                    { la: 'aqua', emoji: '💧' }] },
        { la: 'truncus',
          answer: { la: 'truncus', scene: SC.v_truncus },
          options: [{ la: 'truncus', scene: SC.v_truncus },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'cāseus', emoji: '🧀' }] },
        { la: 'portat',
          answer: { la: 'portat', scene: SC.v_portat },
          options: [{ la: 'portat', scene: SC.v_portat },
                    { la: 'rīvus', scene: SC.v_rivus },
                    { la: 'truncus', scene: SC.v_truncus },
                    { la: 'aqua', emoji: '💧' }] }
      ],
      /* OVERRIDES. The generated set was loaded and read first (see the
         report); three of its four CORRIGE items had to go:
           · it offered the VERB `Lātrat` as a candidate SUBJECT twice
             ("Lātrat rīvī nōn alta est"), a category error the `pars`
             heuristic did not catch;
           · "___ rīvī nōn alta est" accepted `Aqua` but `Umbra` is also
             feminine, also in the picture, and also "not deep" — a
             distractor that is accidentally correct (LATIN-STYLE §4);
           · nothing in the generated COMPLĒ or CORRIGE touched the
             GENITIVE, which is the only reason this capitulum exists.
         The hand set below tests the case four times. */
      overrides: {
        aenigmata: {
          /* `aqua` (💧) is dropped from the grid: beside v_rivus — which
             IS water — the two tiles compete. `portat` takes its slot. */
          pairs: [
            { la: 'canis',   scene: SC.v_canis },
            { la: 'umbra',   scene: SC.v_umbra },
            { la: 'truncus', scene: SC.v_truncus },
            { la: 'rīvus',   scene: SC.v_rivus },
            { la: 'cāseus',  emoji: '🧀' },
            { la: 'portat',  scene: SC.v_portat }
          ],
          scrambles: [
            { la: 'Canis cāseum in ōre portat.', scene: SC.f7_portat },
            { la: 'Aqua rīvī nōn alta est.',     scene: SC.f7_aqua },
            { la: 'Umbra canis in aquā est.',    scene: SC.f7_umbra },
            { la: 'Canis cāseum umbrae cupit.',  scene: SC.f7_cupit }
          ]
        },
        corrige: [
          /* every distractor is wrong IN THE PICTURE, not merely odd */
          { words: ['Umbra', 'cāseum', 'in', 'ōre', 'portat.'], wrong: 0,
            options: ['Canis', 'Rīvus', 'Aqua'], correct: 0, scene: SC.f7_portat },
          { words: ['Aqua', 'truncī', 'nōn', 'alta', 'est.'], wrong: 1,
            options: ['rīvī', 'canis', 'umbrae'], correct: 0, scene: SC.f7_aqua },
          { words: ['In', 'aquā', 'umbra', 'cāseī', 'est.'], wrong: 3,
            options: ['canis', 'rīvī', 'truncī'], correct: 0, scene: SC.f7_umbra },
          { words: ['Umbra', 'super', 'truncum', 'ambulat.'], wrong: 0,
            options: ['Canis', 'Cāseus', 'Aqua'], correct: 0, scene: SC.f7_super },
          /* lātrat's third exposure: it is deliberately kept out of SONUS
             (v_latrat is v_canis plus a bubble), so it is recycled here,
             where the open mouth and the falling cheese decide it. */
          { words: ['Canis', 'ōs', 'aperit', 'et', 'dormit.'], wrong: 4,
            options: ['lātrat.', 'sedet.', 'ambulat.'], correct: 0, scene: SC.f7_cadit }
        ],
        comple: [
          { text: 'Canis cāseum in ōr___ portat.', options: ['e', 'em', 'is'], correct: 0, scene: SC.f7_portat },
          { text: 'Aqua rīv___ nōn alta est.', options: ['ī', 'us', 'um'], correct: 0, scene: SC.f7_aqua },
          { text: 'In aquā umbra can___ est.', options: ['is', 'em', 'ēs'], correct: 0, scene: SC.f7_umbra },
          { text: 'Canis cāseum umbr___ cupit.', options: ['ae', 'am', 'a'], correct: 0, scene: SC.f7_cupit },
          { text: 'Canis super truncum ___.', options: ['ambulat', 'dormit', 'cadit'], correct: 0, scene: SC.f7_super },
          { text: 'Canis ōs aperit et ___.', options: ['lātrat', 'dormit', 'sedet'], correct: 0, scene: SC.f7_cadit }
        ]
      }
    },

    /* ============ FABLE 8 — Rāna et Bōs ============
       DATIVE showcase, and a B-RATING rewrite (DESIGN §8, assignment):
       the frog does NOT burst. She swells, swells again, tips over
       giddy, and is small — and the ox, who never noticed her at all,
       is the sharper humiliation anyway. Nothing dies on the page.

       Every dative here is `bovī` or `rānīs`. See the file header for
       why `rānae` is never used as one. */
    {
      id: 'f8',
      titulus: 'Rāna et Bōs',
      icon: '🐸🐂',
      numerus: 'VIII',
      pos: { x: 0.26, y: 0.63 },
      vocab: [
        { la: 'rāna',     scene: SC.v_rana,     pars: 'nomen' },
        { la: 'bōs',      scene: SC.v_bos,      pars: 'nomen' },
        { la: 'ager',     emoji: '🌾',          pars: 'nomen' },
        { la: 'tumet',    scene: SC.v_tumet,    pars: 'verbum' },
        { la: 'invidet',  scene: SC.v_invidet,  pars: 'verbum' },
        { la: 'cadit',    emoji: '⬇️',          pars: 'verbum' },
        { la: 'aqua',     emoji: '💧',          pars: 'nomen' },
        { la: 'superbus', scene: SC.v_superbus, pars: 'adiectivum' }
      ],
      story: [
        { la: 'Ecce rāna! Rāna parva est. Rāna in aquā habitat.', scene: SC.f8_rana,
          nova: [{ w: 'rāna', e: '🐸', g: '' }] },

        { la: 'In aquā multae rānae sunt.', scene: SC.f8_ranae,
          nova: [{ w: 'rānae', e: '🐸🐸', g: 'ūna rāna, multae rānae' }] },

        { la: 'Ecce bōs! Bōs in agrō est. Bōs magnus est.', scene: SC.f8_bos,
          nova: [{ w: 'bōs', e: '🐂', g: '' }] },

        { la: 'Rāna bovem videt. Rāna nōn laeta est.', scene: SC.f8_videt,
          nova: [{ w: 'bovem', e: '🐂', g: 'bōs → bovem' }] },

        /* FIRST DATIVE, and the case's own verb: invidēre takes it. The
           form `bovī` cannot be mistaken for anything else in this text. */
        { la: 'Rāna bovī invidet.', scene: SC.f8_invidet,
          nova: [{ w: 'bovī', e: '➡🐂', g: 'bōs → bovī' },
                 { w: 'invidet', e: '😒', g: 'rāna nōn laeta est: bōs magnus est' }] },

        /* dative of possession, both members unambiguous */
        { la: 'Bovī ager est; rānīs aqua est. Sed rāna bovī invidet.', scene: SC.f8_habent,
          nova: [{ w: 'rānīs', e: '➡🐸🐸', g: 'rānae → rānīs' }] },

        { la: 'Rāna tumet. Iam rāna magna est!', scene: SC.f8_tumet1,
          nova: [{ w: 'tumet', e: '🐸⬆', g: 'rāna parva, iam rāna magna' }] },

        { la: 'Rāna rānīs dīcit: “Ecce rāna magna! Rāna nōn parva est!”', scene: SC.f8_dicit },

        { la: 'Rānae respondent: “Sed bōs magnus est! Rāna parva est!”', scene: SC.f8_respondent },

        { la: 'Rāna iterum tumet. Rāna superba est.', scene: SC.f8_superba,
          nova: [{ w: 'superba', e: '😤', g: 'rāna superba rānās nōn audit' }] },

        { la: 'Rānae clāmant: “Bōs magnus est! Rāna parva est!”', scene: SC.f8_clamant },

        { la: 'Sed rāna superba nōn audit. Rāna bovī invidet et iterum tumet!',
          scene: SC.f8_tumet3 },

        { la: 'Rāna cadit! Iam rāna nōn magna, sed parva est.', scene: SC.f8_cadit },

        /* the humbling: the ox is not even a witness */
        { la: 'Bōs rānam nōn videt: bōs in agrō frūmentum dēvorat.', scene: SC.f8_nonvidet },

        { la: 'Rānae rānam iuvant. Rāna iam nōn tumet.', scene: SC.f8_iuvant },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: rāna superba tumet et cadit.', scene: SC.f8_moral }
      ],
      ludus: {
        words: [
          { la: 'rāna',      scene: SC.v_rana,  emoji: '🐸' },
          { la: 'bōs',       scene: SC.v_bos,   emoji: '🐂' },
          { la: 'canis',     scene: SC.v_canis, emoji: '🐕' },
          { la: 'cāseus',    emoji: '🧀' },
          { la: 'frūmentum', emoji: '🌾' },
          { la: 'mūs',       emoji: '🐭' }
        ]
      },
      /* SONUS: `superbus` and `tumet` both show a swollen frog and are
         never offered against each other or against `rāna` — by ear that
         would be three names for one picture. `superbus` is recycled in
         CORRIGE, `tumet` in COMPLĒ. */
      sonus: [
        { la: 'rāna',
          answer: { la: 'rāna', scene: SC.v_rana },
          options: [{ la: 'rāna', scene: SC.v_rana },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'ager', emoji: '🌾' }] },
        { la: 'bōs',
          answer: { la: 'bōs', scene: SC.v_bos },
          options: [{ la: 'bōs', scene: SC.v_bos },
                    { la: 'rāna', scene: SC.v_rana },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'ager', emoji: '🌾' }] },
        { la: 'invidet',
          answer: { la: 'invidet', scene: SC.v_invidet },
          options: [{ la: 'invidet', scene: SC.v_invidet },
                    { la: 'ager', emoji: '🌾' },
                    { la: 'cadit', emoji: '⬇️' }] },
        { la: 'ager',
          answer: { la: 'ager', emoji: '🌾' },
          options: [{ la: 'ager', emoji: '🌾' },
                    { la: 'rāna', scene: SC.v_rana },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'invidet', scene: SC.v_invidet }] }
      ],
      /* OVERRIDES. The generated set was read first. Its CORRIGE built
         two ungrammatical husks — "In superbus multae rānae sunt" puts a
         masculine nominative adjective inside a prepositional phrase, and
         "Bovī ager est; rānīs tumet est" has two verbs and no sense — and
         it again offered verbs (`Tumet`, `Invidet`) as candidate
         SUBJECTS. Worse, NOT ONE generated item in either step touched
         the DATIVE, which is this capitulum's whole reason to exist. The
         hand set tests it five times, always with an unambiguous form
         (`bovī`, `rānīs`; never `rānae` — see the file header). */
      overrides: {
        aenigmata: {
          /* v_tumet (two frogs, small and swollen) and v_superbus (one
             swollen frog) are close, and are BOTH kept here on purpose:
             in a memory grid the word is on screen, so telling them apart
             is a reading task the learner can win — by ear, in SONUS, it
             would be a coin-flip, which is why sonus keeps them out. */
          pairs: [
            { la: 'rāna',     scene: SC.v_rana },
            { la: 'bōs',      scene: SC.v_bos },
            { la: 'ager',     emoji: '🌾' },
            { la: 'tumet',    scene: SC.v_tumet },
            { la: 'invidet',  scene: SC.v_invidet },
            { la: 'superbus', scene: SC.v_superbus }
          ],
          scrambles: [
            { la: 'Rāna bovī invidet.',              scene: SC.f8_invidet },
            { la: 'Bovī ager est; rānīs aqua est.',  scene: SC.f8_habent },
            { la: 'Bōs in agrō frūmentum dēvorat.',  scene: SC.f8_nonvidet },
            { la: 'Rāna superba tumet et cadit.',    scene: SC.f8_moral }
          ]
        },
        corrige: [
          { words: ['Bōs', 'bovī', 'invidet.'], wrong: 0,
            options: ['Rāna', 'Ager', 'Aqua'], correct: 0, scene: SC.f8_invidet },
          /* the case itself is the intruder: invidēre governs the dative */
          { words: ['Rāna', 'bovem', 'invidet.'], wrong: 1,
            options: ['bovī', 'rānīs', 'aquae'], correct: 0, scene: SC.f8_invidet },
          { words: ['Bovī', 'ager', 'est;', 'bovī', 'aqua', 'est.'], wrong: 3,
            options: ['rānīs', 'rāna', 'agrō'], correct: 0, scene: SC.f8_habent },
          { words: ['Rāna', 'iterum', 'cadit.'], wrong: 2,
            options: ['tumet.', 'invidet.', 'dormit.'], correct: 0, scene: SC.f8_tumet3 },
          { words: ['Rāna', 'magna', 'est.'], wrong: 1,
            options: ['parva', 'superba', 'laeta'], correct: 0, scene: SC.f8_cadit }
        ],
        comple: [
          { text: 'Rāna bov___ invidet.', options: ['ī', 'em', 'ēs'], correct: 0, scene: SC.f8_invidet },
          { text: 'Bovī ager est; rān___ aqua est.', options: ['īs', 'am', 'a'], correct: 0, scene: SC.f8_habent },
          { text: 'Rāna rān___ dīcit.', options: ['īs', 'a', 'am'], correct: 0, scene: SC.f8_dicit },
          { text: 'Rāna iterum ___.', options: ['tumet', 'cadit', 'dormit'], correct: 0, scene: SC.f8_tumet3 },
          { text: 'Rāna ___ est: rāna rānās nōn audit.', options: ['superba', 'parva', 'trīstis'], correct: 0, scene: SC.f8_superba },
          { text: 'Bōs rānam nōn videt: bōs frūmentum ___.', options: ['dēvorat', 'tumet', 'cadit'], correct: 0, scene: SC.f8_nonvidet }
        ]
      }
    },

    /* ============ FABLE 9 — Cervus ad Fontem ============
       Genitive AND dative consolidated, plus the region's one genitive
       PLURAL (`rāmī arborum`). B-RATING (DESIGN §8, assignment): the
       hounds never reach him. He tears loose and escapes — humbled by
       the branches, not hurt by the dogs.

       ONE FORM FLAGGED FOR LINE-AUDIT: `cornua`. The 4th declension is
       S9. Every occurrence here is nominative or accusative PLURAL, and
       in that slot the form the learner reads is a neuter plural in -a,
       morphologically identical to f6's `ōva` — S2 grammar. No 4th-decl
       form outside nom/acc pl appears anywhere in this capitulum. */
    {
      id: 'f9',
      titulus: 'Cervus ad Fontem',
      icon: '🦌⛲',
      numerus: 'IX',
      pos: { x: 0.74, y: 0.40 },
      vocab: [
        { la: 'cervus', scene: SC.v_cervus, pars: 'nomen' },
        { la: 'fōns',   scene: SC.v_fons,   pars: 'nomen' },
        { la: 'cornua', scene: SC.v_cornua, pars: 'nomen' },
        { la: 'pedēs',  emoji: '🐾',        pars: 'nomen' },
        { la: 'canis',  scene: SC.v_canis,  pars: 'nomen' },
        { la: 'laudat', scene: SC.v_laudat, pars: 'verbum' },
        { la: 'fugit',  scene: SC.v_fugit,  pars: 'verbum' },
        { la: 'servat', scene: SC.v_servat, pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce cervus! Cervus in silvā ambulat.', scene: SC.f9_cervus,
          nova: [{ w: 'cervus', e: '🦌', g: '' }] },

        { la: 'Ecce fōns! Cervus ad fontem venit.', scene: SC.f9_fons,
          nova: [{ w: 'fōns', e: '⛲', g: 'fōns: aqua in silvā' },
                 { w: 'fontem', e: '⛲', g: 'fōns → ad fontem' }] },

        { la: 'Cervus aquam fontis bibit.', scene: SC.f9_bibit,
          nova: [{ w: 'fontis', e: '💧⛲', g: 'fōns → aqua fontis' }] },

        /* umbra + the genitive, both from f7, recycled here — the
           "again within the next two capitula" pass (LATIN-STYLE §2) */
        { la: 'In aquā fontis umbra cervī est.', scene: SC.f9_umbra,
          nova: [{ w: 'cervī', e: '🦌🌑', g: 'cervus → umbra cervī' }] },

        { la: 'Cervus cornua videt. Cornua magna et pulchra sunt.', scene: SC.f9_cornua,
          nova: [{ w: 'cornua', e: '✨', g: 'bōs cornua habet; cervus quoque cornua habet' }] },

        { la: 'Cervus cornua laudat.', scene: SC.f9_laudat,
          nova: [{ w: 'laudat', e: '😍', g: 'cervus dīcit: “cornua pulchra sunt!”' }] },

        { la: 'Cervus pedēs videt. Pedēs cervī parvī sunt.', scene: SC.f9_pedes,
          nova: [{ w: 'pedēs', e: '🐾', g: 'pēs, pedēs; cervus pedēs habet et currit' }] },

        { la: 'Cervus pedēs nōn laudat.', scene: SC.f9_nonlaudat },

        { la: 'Cervus dīcit: “Cornua cervī pulchra sunt! Pedēs nōn pulchrī!”',
          scene: SC.f9_dicit },

        { la: 'Sed ecce canēs! Canēs ad fontem veniunt.', scene: SC.f9_canes,
          nova: [{ w: 'canēs', e: '🐕🐕', g: 'ūnus canis, multī canēs' }] },

        { la: 'Cervus timet et fugit.', scene: SC.f9_fugit,
          nova: [{ w: 'fugit', e: '💨', g: 'currit: canēs cervum nōn capiunt' }] },

        { la: 'Pedēs cervum portant. Canēs cervum nōn capiunt.', scene: SC.f9_portant },

        { la: 'Cervus ad silvam fugit. Silva multās arborēs habet.', scene: SC.f9_rami,
          nova: [{ w: 'arborēs', e: '🌳🌳', g: 'ūna arbor, multae arborēs' }] },

        /* the region's genitive PLURAL */
        { la: 'Ecce rāmī! Rāmī arborum cornua tenent!', scene: SC.f9_tenent,
          nova: [{ w: 'rāmī', e: '🌿', g: 'arbor rāmōs habet' },
                 { w: 'arborum', e: '🌳🌳', g: 'arborēs → rāmī arborum' }] },

        { la: 'Cervus iterum fugit. Iam rāmī cornua nōn tenent.', scene: SC.f9_liber },

        { la: 'Canēs discēdunt. Cervus līber est: pedēs cervum servant.', scene: SC.f9_servant,
          nova: [{ w: 'servant', e: '🐾✓', g: 'canēs cervum nōn capiunt' }] },

        { la: 'Iam cervus pedēs laudat: “Pedēs cervum servant!”', scene: SC.f9_laudatPedes },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: pedēs cervum servant, nōn cornua.', scene: SC.f9_moral }
      ],
      ludus: {
        words: [
          { la: 'cervus', scene: SC.v_cervus, emoji: '🦌' },
          { la: 'fōns',   scene: SC.v_fons },
          { la: 'canis',  scene: SC.v_canis,  emoji: '🐕' },
          { la: 'rāna',   scene: SC.v_rana,   emoji: '🐸' },
          { la: 'bōs',    scene: SC.v_bos,    emoji: '🐂' },
          { la: 'umbra',  scene: SC.v_umbra }
        ]
      },
      /* SONUS: `cornua` is NOT offered (see the v_cornua comment — its
         card holds a bōs and a cervus, both of which are words the
         learner knows). `fugit` and `servat` are never offered against
         each other: v_fugit is v_servat minus the hounds. */
      sonus: [
        { la: 'cervus',
          answer: { la: 'cervus', scene: SC.v_cervus },
          options: [{ la: 'cervus', scene: SC.v_cervus },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'fōns', scene: SC.v_fons }] },
        { la: 'fōns',
          answer: { la: 'fōns', scene: SC.v_fons },
          options: [{ la: 'fōns', scene: SC.v_fons },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'pedēs', emoji: '🐾' }] },
        { la: 'canis',
          answer: { la: 'canis', scene: SC.v_canis },
          options: [{ la: 'canis', scene: SC.v_canis },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'fōns', scene: SC.v_fons }] },
        { la: 'fugit',
          answer: { la: 'fugit', scene: SC.v_fugit },
          options: [{ la: 'fugit', scene: SC.v_fugit },
                    { la: 'fōns', scene: SC.v_fons },
                    { la: 'laudat', scene: SC.v_laudat },
                    { la: 'pedēs', emoji: '🐾' }] }
      ],
      /* OVERRIDES. The generated set was read first. It produced
         "Fōns aquam fontis bibit" and "Servat cornua laudat" — verbs as
         subjects again — and "Cervus fugit videt", a two-verb husk. It
         also never reached the genitive PLURAL, the one form this
         capitulum adds to the region. */
      overrides: {
        aenigmata: {
          /* `servat` is out of the grid: v_servat is v_fugit with hounds
             added, and side by side as tiles they read as one picture.
             It is recycled in CORRIGE and COMPLĒ instead. */
          pairs: [
            { la: 'cervus', scene: SC.v_cervus },
            { la: 'fōns',   scene: SC.v_fons },
            { la: 'cornua', scene: SC.v_cornua },
            { la: 'pedēs',  emoji: '🐾' },
            { la: 'laudat', scene: SC.v_laudat },
            { la: 'fugit',  scene: SC.v_fugit }
          ],
          scrambles: [
            { la: 'Cervus aquam fontis bibit.',        scene: SC.f9_bibit },
            { la: 'In aquā fontis umbra cervī est.',   scene: SC.f9_umbra },
            { la: 'Rāmī arborum cornua tenent.',       scene: SC.f9_tenent },
            { la: 'Pedēs cervum servant.',             scene: SC.f9_servant }
          ]
        },
        corrige: [
          { words: ['Fōns', 'aquam', 'fontis', 'bibit.'], wrong: 0,
            options: ['Cervus', 'Canis', 'Rāmī'], correct: 0, scene: SC.f9_bibit },
          { words: ['Cervus', 'aquam', 'cervī', 'bibit.'], wrong: 2,
            options: ['fontis', 'canis', 'rāmī'], correct: 0, scene: SC.f9_bibit },
          { words: ['Rāmī', 'arborum', 'pedēs', 'tenent.'], wrong: 2,
            options: ['cornua', 'umbram', 'aquam'], correct: 0, scene: SC.f9_tenent },
          { words: ['Cervus', 'cornua', 'nōn', 'laudat.'], wrong: 1,
            options: ['pedēs', 'fontem', 'canēs'], correct: 0, scene: SC.f9_nonlaudat },
          { words: ['Cornua', 'cervum', 'servant.'], wrong: 0,
            options: ['Pedēs', 'Rāmī', 'Canēs'], correct: 0, scene: SC.f9_servant }
        ],
        comple: [
          { text: 'Cervus aquam font___ bibit.', options: ['is', 'em', 'ēs'], correct: 0, scene: SC.f9_bibit },
          { text: 'In aquā fontis umbra cerv___ est.', options: ['ī', 'us', 'um'], correct: 0, scene: SC.f9_umbra },
          /* the genitive PLURAL. Two trees stand in the scene on purpose:
             beside one, `arboris` would be just as true. */
          { text: 'Rāmī arbor___ cornua tenent.', options: ['um', 'ēs', 'em'], correct: 0, scene: SC.f9_tenent },
          { text: 'Cervus cornua ___.', options: ['laudat', 'fugit', 'servat'], correct: 0, scene: SC.f9_laudat },
          { text: 'Cervus timet et ___.', options: ['fugit', 'laudat', 'bibit'], correct: 0, scene: SC.f9_fugit },
          { text: 'Pedēs cervum ___.', options: ['servant', 'laudant', 'tenent'], correct: 0, scene: SC.f9_servant }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r03',
    titulus: 'Rīvus',
    ladder: 'S3',                 /* CURRICULUM §0: genitive; dative sg/pl */
    progressId: 'r03',            /* new region: content id doubles as the key */
    capitula: capitula,
    boss: {
      id: 'b_r03',
      progressId: 'r03',
      /* the ox of f8 returns as the region's boss (the wolf spine is
         R1/R5/R9/R12 — CURRICULUM §1 — so R3 gets its own beast) */
      name: 'Bōs',
      actor: 'bos',
      /* app.js falls back to "Lupum vince!" when content supplies no
         accusative of its own (js/app.js bossReady) — which is right for
         a wolf and wrong for an ox. */
      vinceText: 'Bovem vince!',
      /* LEGACY single-phase tuning, kept for the same two reasons r01 and
         r02 keep it: server/lib/rules.php derives rule_boss_min_ms from
         these numbers, and a client without js/boss-phases.js must still
         be able to run the fight. When `phases` is present it wins. */
      hp: 6,
      seconds: 45,
      /* same y as every other region's boss (0.16): the map frame clips a
         few pixels off the top node, so the convention is what keeps every
         crown sitting at the same height on the board. */
      pos: { x: 0.32, y: 0.16 },
      phases: [
        { type: 'caterva', hp: 2, seconds: 22 },
        { type: 'clamor',  hp: 2, seconds: 28 },
        { type: 'fuga',    hp: 2, seconds: 20 }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum, which is what
         app.js's bossWords() needs to resolve it. All three capitula are
         represented. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'canis',  from: 'f7' },
        { la: 'umbra',  from: 'f7' },
        { la: 'rāna',   from: 'f8' },
        { la: 'bōs',    from: 'f8' },
        { la: 'cervus', from: 'f9' }
      ]
    }
  });
})();
