/* ============================================================
   content/fabulae-r06.js — FĀBULAE · Regiō VI · URBS  (ladder S6)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō V:
     f16 Mūs Rūsticus et Mūs Urbānus — the IMPERFECT, and hic ↔ ille
     f17 Canis in Praesēpī           — the PRONOUN is (eius · eī · eum)
     f18 Vulpēs et Hircus            — both, on a well the goat cannot leave

   STAGE CEILING (CURRICULUM §0 S6, binding):
     everything S1–S5 (all five cases · 3rd-person present of ANY
     conjugation, AUTHORING-BRIEF ruling 1 · the six prepositions ·
     imperative · vocative · questions -ne/quis/quid/cūr/ubi · nōlī +
     īnfīnītīvus · and Regiō V's ruling that the 2nd person present
     indicative is legal INSIDE DIRECT SPEECH) PLUS the IMPERFECT and
     the personal and demonstrative pronouns is / hic / ille.
     STILL FORBIDDEN and avoided throughout: the perfect (S7),
     comparatives and adverbs in -ē/-iter as a system (S8), relative
     clauses (S9), the passive (S10). posse + īnfīnītīvus appears twice
     in the story, once in each tense and on the same verb — f18 p4
     `ascendere nōn poterat` (the fox, trapped) and f18 p12 `ascendere
     nōn potest` (the goat, trapped) — which is the construction ruling 2
     opened at S5, now shown in the region's own new tense. Not a new
     construction; a second tense of one the learner has.

   ------------------------------------------------------------
   THE IMPERFECT IS THE REGION'S WHOLE POINT, so it is taught the way
   Regiō III taught the genitive: on ONE marked ending, with the present
   the learner already reads standing beside it in the gloss.

       habitat → habitābat        est → erat        sunt → erant

   Three rulings, recorded because a later author will hit them again:

   1. NO NEW VERB IS INTRODUCED IN THE IMPERFECT. Every -bat/-bant and
      -ēbat in this region is built on a verb Regiōnēs I–V already
      taught with a picture (habitat, dēvorat, ambulat, dat, portat,
      quaerit, cupit, venit, dormit, iacet, clāmat). LATIN-STYLE §2:
      a sentence that introduces new grammar uses known vocabulary. The
      learner therefore never has to guess a word AND a tense at once.

   2. ŌLIM CARRIES THE TENSE, NOT THE PICTURE. A drawing cannot show
      pastness. Every imperfect in this region either sits under an
      explicit `ōlim` (Regiō I f3 taught it) or follows a page that did,
      and every hand-authored CORRIGE/COMPLĒ item that asks for an
      imperfect keeps `Ōlim` inside the item text so the cue is on the
      screen and the exercise is never a coin-flip.

   3. hic AND ille ARE TAUGHT AS A PAIR, IN ONE PICTURE. f16 p2 puts two
      mice in one frame, one in the field and one in the city, and names
      them `hic mūs` and `ille mūs`. Neither word is ever used alone
      before that page. `is` waits until f16 p6, where `eī dat` has a
      dative slot the learner has had since Regiō III.

   4. THE IMPERFECT IS NOT A NARRATIVE PAST HERE, AND MUST NOT BE. Latin
      does not tell a story in the imperfect; it tells it in the perfect,
      which CURRICULUM §0 places at S7 precisely so that S7 can CONTRAST
      the two. Writing "the mouse walked to the city" as `ambulābat`
      would teach the learner a false equation that S7 then has to
      unteach. So this region keeps the NARRATIVE PRESENT the whole track
      has used since Regiō I for events, and spends the imperfect on
      exactly what the imperfect is for:
        · habitual and durative background — `ōlim … habitābat`,
          `frūmentum dēvorābat`, `duo mūrēs ad urbem ambulābant`;
        · states that were going on when something happened —
          `bōs ad praesēpe venit. Bōs ēsuriēbat.`
      That last pair is the region's real lesson, and it is the exact
      shape S7 will re-use with the perfect. Every page of every fable
      here obeys it.

   PROGRESS IDS ARE FROZEN once shipped: f16/f17/f18 and progressId
   'r06' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ----------

     INTERIOR GEOMETRY (js/backgrounds2.js bgInterior): wall to y=150,
     a darker dado band y=150–210, floor below 210. The `mensa` prop is
     41 units tall, so at s 1.2 its table-top sits at y = 210 − 39×1.2 ≈
     163 — that is the y every mouse standing ON the table uses here.

     CAMOUFLAGE (the Regiō IV ciconia lesson, re-checked at SONUS tile
     size): `mus` is #9a8f84 and `feles` #8f8578, both mid-greys, and
     both read against bgPlain's cream sky and bgInterior's dado. The
     one actor in this region that needed help is `hircus` (#cbbba0,
     a pale beige on a pale cream sky) — its vocabulary card therefore
     stands on bgMountain, against the rock, exactly as Regiō IV moved
     `haedus` there for the same reason. Goats belong on mountains, so
     the fix costs nothing. */

  var SC = {

    /* ============ fable 16 — Mūs Rūsticus et Mūs Urbānus ============ */

    /* hic ↔ ille in ONE frame: near mouse left, far mouse right */
    f16_duo:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 44,  y: G, s: 0.95 },
                   { t: 'mus',       x: 116, y: G, s: 1.7 },
                   { t: 'mus',       x: 292, y: G, s: 1.6, flip: true }
                 ] },

    f16_ager:    { bg: 'plain', items: [
                   { t: 'frumentum', x: 306, y: G, s: 1.1 },
                   { t: 'mus',       x: 152, y: G, s: 1.7 }
                 ] },

    f16_urbs:    { bg: 'city', items: [
                   { t: 'person', x: 76,  y: G, s: 0.95, role: 'man' },
                   { t: 'person', x: 336, y: G, s: 0.9,  role: 'man', flip: true }
                 ] },

    f16_devorat: { bg: 'plain', items: [
                   { t: 'frumentum', x: 288, y: G, s: 1.05 },
                   { t: 'mus',       x: 168, y: G, s: 1.7 }
                 ],
                 bubbles: [{ x: 78, y: 88, w: 56, h: 40, text: '😋', kind: 'thought', tail: 'right', fs: 19 }] },

    f16_venit:   { bg: 'plain', items: [
                   { t: 'frumentum', x: 340, y: G, s: 1 },
                   { t: 'mus',       x: 124, y: G, s: 1.6 },
                   { t: 'mus',       x: 246, y: G, s: 1.55, pose: 'walk', flip: true }
                 ] },

    f16_dat:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 344, y: G, s: 0.95 },
                   { t: 'mus',       x: 128, y: G, s: 1.6 },
                   { t: 'mus',       x: 250, y: G, s: 1.55, flip: true }
                 ],
                 bubbles: [{ x: 190, y: 96, w: 56, h: 40, text: '➜', kind: 'thought', tail: 'right', fs: 20 }] },

    f16_mecum:   { bg: 'plain', items: [
                   { t: 'frumentum', x: 344, y: G, s: 0.95 },
                   { t: 'mus',       x: 128, y: G, s: 1.6 },
                   { t: 'mus',       x: 250, y: G, s: 1.55, flip: true }
                 ],
                 bubbles: [{ x: 208, y: 62, w: 88, h: 44, text: '🐭 ➜ 🏛', kind: 'speech', tail: 'left', fs: 16 }] },

    f16_ambulant: { bg: 'city', items: [
                   { t: 'mus', x: 116, y: G, s: 1.5, pose: 'walk' },
                   { t: 'mus', x: 190, y: G, s: 1.45, pose: 'walk' }
                 ] },

    f16_inurbe:  { bg: 'city', items: [
                   { t: 'person', x: 72,  y: G, s: 0.95, role: 'man' },
                   { t: 'person', x: 330, y: G, s: 0.9,  role: 'man', flip: true },
                   { t: 'mus',    x: 200, y: G, s: 1.35 }
                 ] },

    f16_mensa:   { bg: 'interior', items: [
                   { t: 'mensa', x: 200, y: G, s: 1.2 },
                   { t: 'mus',   x: 146, y: G - 47, s: 1.25 },
                   { t: 'mus',   x: 254, y: G - 47, s: 1.2, flip: true }
                 ] },

    f16_cibus:   { bg: 'interior', items: [
                   { t: 'mensa',  x: 200, y: G, s: 1.2 },
                   { t: 'cheese', x: 156, y: G - 47, s: 0.85 },
                   { t: 'grapes', x: 246, y: G - 47, s: 0.7 },
                   { t: 'mus',    x: 100, y: G, s: 1.3 },
                   { t: 'mus',    x: 306, y: G, s: 1.25, flip: true }
                 ] },

    f16_dicit:   { bg: 'interior', items: [
                   { t: 'mensa',  x: 200, y: G, s: 1.2 },
                   { t: 'cheese', x: 156, y: G - 47, s: 0.85 },
                   { t: 'grapes', x: 246, y: G - 47, s: 0.7 },
                   { t: 'mus',    x: 100, y: G, s: 1.3 },
                   { t: 'mus',    x: 306, y: G, s: 1.25, flip: true }
                 ],
                 bubbles: [{ x: 300, y: 62, w: 84, h: 44, text: '🍽 👀', kind: 'speech', tail: 'left', fs: 17 }] },

    f16_devorant: { bg: 'interior', items: [
                   { t: 'mensa', x: 200, y: G, s: 1.2 },
                   { t: 'mus',   x: 152, y: G - 47, s: 1.25 },
                   { t: 'mus',   x: 250, y: G - 47, s: 1.2, flip: true }
                 ],
                 bubbles: [{ x: 78, y: 70, w: 56, h: 40, text: '😋', kind: 'thought', tail: 'right', fs: 19 },
                           { x: 330, y: 70, w: 56, h: 40, text: '😋', kind: 'thought', tail: 'left', fs: 19 }] },

    f16_feles:   { bg: 'interior', items: [
                   { t: 'mensa', x: 226, y: G, s: 1.2 },
                   { t: 'mus',   x: 182, y: G - 47, s: 1.2 },
                   { t: 'mus',   x: 272, y: G - 47, s: 1.15, flip: true },
                   { t: 'feles', x: 72,  y: G, s: 1.15, pose: 'walk' }
                 ] },

    f16_timent:  { bg: 'interior', items: [
                   { t: 'mensa', x: 226, y: G, s: 1.2 },
                   { t: 'mus',   x: 182, y: G - 47, s: 1.2 },
                   { t: 'mus',   x: 272, y: G - 47, s: 1.15, flip: true },
                   { t: 'feles', x: 72,  y: G, s: 1.15, pose: 'walk' }
                 ],
                 bubbles: [{ x: 186, y: 58, w: 54, h: 38, text: '😨', kind: 'thought', tail: 'right', fs: 18 },
                           { x: 288, y: 58, w: 54, h: 38, text: '😨', kind: 'thought', tail: 'left', fs: 18 }] },

    /* B-RATING: the cat never reaches them. The mice are UNDER the
       table, the cat is on the far side of the room, and the next page
       is the road home. */
    f16_fugiunt: { bg: 'interior', items: [
                   { t: 'feles', x: 322, y: G, s: 1.1, flip: true },
                   { t: 'mensa', x: 176, y: G, s: 1.2 },
                   { t: 'mus',   x: 148, y: G, s: 1.25 },
                   { t: 'mus',   x: 200, y: G, s: 1.2 }
                 ],
                 bubbles: [{ x: 66, y: 76, w: 66, h: 42, text: '🐭 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f16_valedicit: { bg: 'interior', items: [
                   { t: 'mensa', x: 260, y: G, s: 1.15 },
                   { t: 'mus',   x: 300, y: G, s: 1.25, flip: true },
                   { t: 'mus',   x: 128, y: G, s: 1.3, pose: 'walk', flip: true }
                 ],
                 bubbles: [{ x: 178, y: 66, w: 92, h: 44, text: '🌾 ✓ · 🐱 ✗', kind: 'speech', tail: 'right', fs: 15 }] },

    f16_redit:   { bg: 'city', items: [
                   { t: 'mus', x: 236, y: G, s: 1.4, pose: 'walk', flip: true }
                 ] },

    f16_moral:   { bg: 'plain', items: [
                   { t: 'frumentum', x: 300, y: G, s: 1.1 },
                   { t: 'mus',       x: 162, y: G, s: 1.75 }
                 ],
                 bubbles: [{ x: 66, y: 86, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ fable 17 — Canis in Praesēpī ============

       bgStabulum is the only barn in the library. It carries a lamp, a
       stone wall and a lit opening (it was drawn for the Nativity), and
       nothing in it contradicts a fable: it is a stable with a manger
       in it, which is exactly what this fable needs, and the dark wall
       is also what keeps a cream `bos` legible at tile size. */

    f17_stabulum: { bg: 'stabulum', items: [
                   { t: 'canis', x: 108, y: G, s: 1 },
                   { t: 'bos',   x: 288, y: G, s: 1, flip: true }
                 ] },

    f17_praesepe: { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 200, y: G, s: 1.7 }
                 ] },

    f17_bos:     { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 152, y: G, s: 1.5 },
                   { t: 'bos',      x: 296, y: G, s: 1, pose: 'eat', flip: true }
                 ] },

    f17_salit:   { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 196, y: G, s: 1.6 },
                   { t: 'canis',    x: 196, y: G - 44, s: 0.85 }
                 ] },

    f17_dormit:  { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 196, y: G, s: 1.7 },
                   { t: 'canis',    x: 196, y: G - 48, s: 0.9, pose: 'lie' }
                 ],
                 bubbles: [{ x: 322, y: 74, w: 54, h: 40, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },

    f17_esurit:  { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 156, y: G, s: 1.6 },
                   { t: 'canis',    x: 156, y: G - 44, s: 0.82, pose: 'lie' },
                   { t: 'bos',      x: 318, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 330, y: 62, w: 56, h: 40, text: '😩', kind: 'thought', tail: 'left', fs: 19 }] },

    f17_latrat:  { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 156, y: G, s: 1.6 },
                   { t: 'canis',    x: 156, y: G - 44, s: 0.82, pose: 'lie' },
                   { t: 'bos',      x: 318, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 246, y: 62, w: 56, h: 40, text: '📢', kind: 'speech', tail: 'right', fs: 19 }] },

    f17_prohibet: { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 150, y: G, s: 1.6 },
                   { t: 'canis',    x: 150, y: G - 44, s: 0.82, pose: 'lie' },
                   { t: 'bos',      x: 330, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 250, y: 66, w: 68, h: 42, text: '🐂 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f17_dicit:   { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 150, y: G, s: 1.6 },
                   { t: 'canis',    x: 150, y: G - 44, s: 0.82, pose: 'lie' },
                   { t: 'bos',      x: 330, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 252, y: 56, w: 84, h: 44, text: '❓ 📢', kind: 'speech', tail: 'left', fs: 17 }] },

    f17_tristis: { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 150, y: G, s: 1.6 },
                   { t: 'canis',    x: 150, y: G - 44, s: 0.82, pose: 'lie' },
                   { t: 'bos',      x: 330, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 330, y: 60, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'left', fs: 19 }] },

    f17_agricola: { bg: 'stabulum', items: [
                   { t: 'person',   x: 66,  y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'praesepe', x: 228, y: G, s: 1.5 },
                   { t: 'canis',    x: 228, y: G - 42, s: 0.8, pose: 'lie' },
                   { t: 'bos',      x: 348, y: G, s: 0.9, flip: true }
                 ] },

    f17_clamat:  { bg: 'stabulum', items: [
                   { t: 'person',   x: 66,  y: G, s: 1, role: 'man', pose: 'point' },
                   { t: 'praesepe', x: 228, y: G, s: 1.5 },
                   { t: 'canis',    x: 228, y: G - 42, s: 0.8, pose: 'lie' },
                   { t: 'bos',      x: 348, y: G, s: 0.9, flip: true }
                 ],
                 bubbles: [{ x: 140, y: 52, w: 84, h: 44, text: '🚫 ⬇', kind: 'speech', tail: 'right', fs: 17 }] },

    f17_portat:  { bg: 'stabulum', items: [
                   { t: 'person',   x: 96,  y: G, s: 1, role: 'man' },
                   { t: 'canis',    x: 168, y: G, s: 0.95 },
                   { t: 'praesepe', x: 300, y: G, s: 1.4 }
                 ] },

    f17_devorat: { bg: 'stabulum', items: [
                   { t: 'canis',    x: 68,  y: G, s: 0.95 },
                   { t: 'praesepe', x: 196, y: G, s: 1.55 },
                   { t: 'bos',      x: 322, y: G, s: 1, pose: 'eat', flip: true }
                 ] },

    f17_iacet:   { bg: 'stabulum', items: [
                   { t: 'canis',    x: 96,  y: G, s: 1, pose: 'lie' },
                   { t: 'praesepe', x: 232, y: G, s: 1.45 },
                   { t: 'bos',      x: 340, y: G, s: 0.95, pose: 'eat', flip: true }
                 ] },

    f17_moral:   { bg: 'stabulum', items: [
                   { t: 'canis',    x: 92,  y: G, s: 1, pose: 'lie' },
                   { t: 'praesepe', x: 216, y: G, s: 1.5 },
                   { t: 'bos',      x: 336, y: G, s: 0.95, pose: 'eat', flip: true }
                 ],
                 bubbles: [{ x: 96, y: 84, w: 62, h: 42, text: '🌾 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    /* ============ fable 18 — Vulpēs et Hircus ============

       IN the well: the animal is drawn BEFORE the `well` prop, so the
       stones are painted over its body and only the head shows above
       the rim. At s 1.5 the well's stone rim sits at y ≈ 171, which is
       why the trapped animals stand at y = G − 6 and read as sunk. */

    f18_silva:   { bg: 'forest', items: [
                   { t: 'tree', x: 330, y: G, s: 0.95 },
                   { t: 'fox',  x: 158, y: G, s: 1, pose: 'walk' }
                 ] },

    f18_puteus:  { bg: 'plain', items: [
                   { t: 'well', x: 224, y: G, s: 1.5 },
                   { t: 'fox',  x: 96,  y: G, s: 1 }
                 ] },

    f18_salit:   { bg: 'plain', items: [
                   { t: 'fox',  x: 116, y: G, s: 1 },
                   { t: 'well', x: 264, y: G, s: 1.45 }
                 ],
                 bubbles: [{ x: 196, y: 74, w: 56, h: 40, text: '⬇', kind: 'thought', tail: 'right', fs: 20 }] },

    f18_inputeo: { bg: 'plain', items: [
                   { t: 'fox',  x: 202, y: G - 6, s: 0.8 },
                   { t: 'well', x: 202, y: G, s: 1.5 }
                 ] },

    f18_nonpotest: { bg: 'plain', items: [
                   { t: 'fox',  x: 202, y: G - 6, s: 0.8 },
                   { t: 'well', x: 202, y: G, s: 1.5 }
                 ],
                 bubbles: [{ x: 322, y: 76, w: 66, h: 42, text: '⬆ ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f18_hircus:  { bg: 'plain', items: [
                   { t: 'fox',    x: 172, y: G - 6, s: 0.8 },
                   { t: 'well',   x: 172, y: G, s: 1.45 },
                   { t: 'hircus', x: 320, y: G, s: 1, flip: true }
                 ] },

    f18_rogat:   { bg: 'plain', items: [
                   { t: 'fox',    x: 172, y: G - 6, s: 0.8 },
                   { t: 'well',   x: 172, y: G, s: 1.45 },
                   { t: 'hircus', x: 320, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 268, y: 56, w: 72, h: 44, text: '💧 ❓', kind: 'speech', tail: 'left', fs: 17 }] },

    f18_respondet: { bg: 'plain', items: [
                   { t: 'fox',    x: 172, y: G - 6, s: 0.8 },
                   { t: 'well',   x: 172, y: G, s: 1.45 },
                   { t: 'hircus', x: 320, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 268, y: 56, w: 84, h: 44, text: '💧 ✓ ⬇', kind: 'speech', tail: 'right', fs: 16 }] },

    f18_hircusSalit: { bg: 'plain', items: [
                   { t: 'fox',    x: 196, y: G - 6, s: 0.78 },
                   { t: 'hircus', x: 232, y: G - 6, s: 0.85 },
                   { t: 'well',   x: 208, y: G, s: 1.55 }
                 ] },

    f18_ascendit: { bg: 'plain', items: [
                   { t: 'hircus', x: 206, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 206, y: G, s: 1.5 },
                   { t: 'fox',    x: 244, y: G - 66, s: 0.72 }
                 ] },

    f18_libera:  { bg: 'plain', items: [
                   { t: 'hircus', x: 176, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 176, y: G, s: 1.5 },
                   { t: 'fox',    x: 322, y: G, s: 1, pose: 'walk' }
                 ] },

    f18_manet:   { bg: 'plain', items: [
                   { t: 'hircus', x: 176, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 176, y: G, s: 1.5 },
                   { t: 'fox',    x: 322, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 82, y: 74, w: 66, h: 42, text: '⬆ ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f18_clamat:  { bg: 'plain', items: [
                   { t: 'hircus', x: 176, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 176, y: G, s: 1.5 },
                   { t: 'fox',    x: 322, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 250, y: 54, w: 72, h: 44, text: '🤝 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    /* the fox's lecture — and the mōrāle one page early, in her mouth */
    f18_dicit:   { bg: 'plain', items: [
                   { t: 'hircus', x: 168, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 168, y: G, s: 1.5 },
                   { t: 'fox',    x: 326, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 254, y: 52, w: 96, h: 44, text: '👀 ➜ ⬇', kind: 'speech', tail: 'left', fs: 16 }] },

    f18_solus:   { bg: 'plain', items: [
                   { t: 'hircus', x: 200, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 200, y: G, s: 1.5 }
                 ],
                 bubbles: [{ x: 320, y: 76, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'left', fs: 19 }] },

    f18_agricola: { bg: 'plain', items: [
                   { t: 'hircus', x: 240, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 240, y: G, s: 1.5 },
                   { t: 'person', x: 78,  y: G, s: 1, role: 'man', pose: 'walk' }
                 ] },

    f18_clamat2: { bg: 'plain', items: [
                   { t: 'hircus', x: 240, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 240, y: G, s: 1.5 },
                   { t: 'person', x: 78,  y: G, s: 1, role: 'man', pose: 'point' }
                 ],
                 bubbles: [{ x: 156, y: 52, w: 76, h: 44, text: '🚫 😨', kind: 'speech', tail: 'right', fs: 17 }] },

    f18_tutus:   { bg: 'plain', items: [
                   { t: 'well',   x: 306, y: G, s: 1.4 },
                   { t: 'person', x: 82,  y: G, s: 1, role: 'man' },
                   { t: 'hircus', x: 198, y: G, s: 1.05, flip: true }
                 ] },

    f18_bibit:   { bg: 'plain', items: [
                   { t: 'well',   x: 300, y: G, s: 1.4 },
                   { t: 'hircus', x: 168, y: G, s: 1.05 }
                 ],
                 bubbles: [{ x: 74, y: 78, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    /* mōrāle: look FIRST, leap AFTER — 1️⃣ over the eye, 2️⃣ over the drop */
    f18_moral:   { bg: 'plain', items: [
                   { t: 'well',   x: 296, y: G, s: 1.4 },
                   { t: 'hircus', x: 130, y: G, s: 1.05 }
                 ],
                 bubbles: [{ x: 130, y: 58, w: 60, h: 42, text: '👀 1️⃣', kind: 'thought', tail: 'right', fs: 17 },
                           { x: 296, y: 62, w: 60, h: 42, text: '⬇ 2️⃣', kind: 'thought', tail: 'left', fs: 17 }] },

    /* ============ vocabulary mini-scenes ============ */

    v_mus:       { bg: 'plain', items: [{ t: 'mus', x: 195, y: G, s: 2.4 }] },
    v_feles:     { bg: 'interior', items: [{ t: 'feles', x: 195, y: G, s: 1.75 }] },
    v_mensa:     { bg: 'interior', items: [{ t: 'mensa', x: 200, y: G, s: 1.7 }] },
    /* urbs: the PLACE and nothing else in it — a card with an actor on
       it would teach the actor */
    v_urbs:      { bg: 'city', items: [] },
    /* rūsticus / urbānus: the SAME animal in two places, so the card
       teaches the quality and not the mouse (the device f6 used for
       `aureum`). Both are held out of SONUS for exactly that reason. */
    v_rusticus:  { bg: 'plain', items: [
                   { t: 'mus',       x: 146, y: G, s: 1.9 },
                   { t: 'frumentum', x: 292, y: G, s: 1.15 }
                 ] },
    v_urbanus:   { bg: 'interior', items: [
                   { t: 'mus',   x: 126, y: G, s: 1.9 },
                   { t: 'mensa', x: 274, y: G, s: 1.15 }
                 ] },
    v_cibus:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 300, y: G, s: 1 },
                   { t: 'patina',    x: 120, y: G, s: 1.7, food: true }
                 ] },

    v_praesepe:  { bg: 'stabulum', items: [{ t: 'praesepe', x: 200, y: G, s: 2.1 }] },
    /* stabulum: the barn EMPTY. Held out of SONUS and AENIGMATA, because
       a stable with a manger in it is also a stable and the learner
       would be guessing which word the picture meant. */
    v_stabulum:  { bg: 'stabulum', items: [] },
    v_canis:     { bg: 'plain', items: [{ t: 'canis', x: 190, y: G, s: 1.6 }] },
    v_bos:       { bg: 'plain', items: [{ t: 'bos', x: 190, y: G, s: 1.3 }] },
    v_dormit:    { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 194, y: G, s: 1.8 },
                   { t: 'canis',    x: 194, y: G - 50, s: 0.9, pose: 'lie' }
                 ],
                 bubbles: [{ x: 326, y: 78, w: 54, h: 40, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },
    v_latrat:    { bg: 'plain', items: [{ t: 'canis', x: 160, y: G, s: 1.55 }],
                   bubbles: [{ x: 302, y: 96, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'left', fs: 20 }] },
    v_prohibet:  { bg: 'stabulum', items: [
                   { t: 'praesepe', x: 146, y: G, s: 1.55 },
                   { t: 'canis',    x: 146, y: G - 43, s: 0.8, pose: 'lie' },
                   { t: 'bos',      x: 330, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 246, y: 66, w: 68, h: 42, text: '🐂 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    v_puteus:    { bg: 'plain', items: [{ t: 'well', x: 200, y: G, s: 1.9 }] },
    /* hircus against the ROCK: #cbbba0 on bgPlain's cream sky is the
       Regiō IV haedus defect, and this card is the one SONUS shrinks */
    v_hircus:    { bg: 'mountain', items: [{ t: 'hircus', x: 146, y: G, s: 1.5 }] },
    /* cornua: two animals that share nothing but their horns, so the
       card teaches the horns (Regiō III f9's device, with the goat in
       place of the stag). Kept OUT of SONUS. */
    v_cornua:    { bg: 'plain', items: [
                   { t: 'hircus', x: 108, y: G, s: 1.15 },
                   { t: 'bos',    x: 300, y: G, s: 0.95, flip: true }
                 ] },
    v_salit:     { bg: 'plain', items: [
                   { t: 'fox',  x: 136, y: G, s: 1.2 },
                   { t: 'well', x: 292, y: G, s: 1.3 }
                 ],
                 bubbles: [{ x: 216, y: 76, w: 54, h: 40, text: '⬇', kind: 'thought', tail: 'right', fs: 20 }] },
    v_ascendit:  { bg: 'plain', items: [
                   { t: 'hircus', x: 186, y: G - 6, s: 0.9 },
                   { t: 'well',   x: 186, y: G, s: 1.45 },
                   { t: 'fox',    x: 222, y: G - 64, s: 0.7 }
                 ] },
    v_agricola:  { bg: 'plain', items: [
                   { t: 'person',    x: 150, y: G, s: 1.35, role: 'man' },
                   { t: 'frumentum', x: 292, y: G, s: 1.05 }
                 ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 16 — Mūs Rūsticus et Mūs Urbānus ============
       THE IMPERFECT. The fable is told from `Ōlim` to its last page in
       the past, which is the first time this track has had a past tense
       at all — and the only reason it can be told that way is that
       every single verb under a -bat is a verb the learner already
       reads in the present (file header, ruling 1).

       `hic` and `ille` arrive on page two, in one frame, on two mice
       that differ only in where they live. That is also what the title
       words `rūsticus` and `urbānus` mean, so the picture does four
       words' work at once. */
    {
      id: 'f16',
      titulus: 'Mūs Rūsticus et Mūs Urbānus',
      icon: '🐭🏛',
      numerus: 'XVI',
      pos: { x: 0.72, y: 0.87 },
      vocab: [
        { la: 'mūs',      scene: SC.v_mus,      pars: 'nomen' },
        { la: 'fēlēs',    scene: SC.v_feles,    pars: 'nomen' },
        { la: 'mēnsa',    scene: SC.v_mensa,    pars: 'nomen' },
        { la: 'urbs',     scene: SC.v_urbs,     pars: 'nomen' },
        { la: 'cibus',    scene: SC.v_cibus,    pars: 'nomen' },
        { la: 'frūmentum', emoji: '🌾',         pars: 'nomen' },
        { la: 'rūsticus', scene: SC.v_rusticus, pars: 'adiectivum' },
        { la: 'urbānus',  scene: SC.v_urbanus,  pars: 'adiectivum' }
      ],
      story: [
        /* THE IMPERFECT OF ESSE, under an explicit ŌLIM (ruling 2) */
        { la: 'Ōlim duo mūrēs erant.', scene: SC.f16_duo,
          nova: [{ w: 'erant', e: '🕰', g: 'iam sunt; ōlim erant' }] },

        /* hic ↔ ille, in one frame, on two mice (ruling 3) */
        { la: 'Hic mūs in agrō habitābat; ille mūs in urbe habitābat.', scene: SC.f16_duo,
          nova: [{ w: 'hic', e: '👈', g: 'hic mūs in agrō est' },
                 { w: 'ille', e: '👉', g: 'ille mūs in urbe est' },
                 { w: 'habitābat', e: '🕰🏠', g: 'iam habitat; ōlim habitābat' },
                 { w: 'urbe', e: '🏛', g: 'in urbe multī virī sunt; in agrō frūmentum est' }] },

        { la: 'Hic mūs rūsticus erat. Ille mūs urbānus erat.', scene: SC.f16_duo,
          nova: [{ w: 'rūsticus', e: '🌾', g: 'in agrō habitat: mūs rūsticus' },
                 { w: 'urbānus', e: '🏛', g: 'in urbe habitat: mūs urbānus' }] },

        { la: 'Mūs rūsticus in agrō frūmentum dēvorābat.', scene: SC.f16_devorat,
          nova: [{ w: 'dēvorābat', e: '🕰😋', g: 'iam dēvorat; ōlim dēvorābat' }] },

        { la: 'Cibus eius parvus erat, sed mūs rūsticus laetus erat.', scene: SC.f16_ager,
          nova: [{ w: 'eius', e: '👉🐭', g: 'mūs rūsticus frūmentum habet: frūmentum cibus eius est' }] },

        { la: 'Ōlim mūs urbānus ad agrum veniēbat.', scene: SC.f16_venit, nova: [] },

        /* IS in the DATIVE, in the slot Regiō III built for it */
        { la: 'Mūs rūsticus eī frūmentum dabat.', scene: SC.f16_dat,
          nova: [{ w: 'eī', e: '➜🐭', g: 'mūs rūsticus mūrī urbānō dat: eī dat' },
                 { w: 'dabat', e: '🕰🤲', g: 'iam dat; ōlim dabat' }] },

        { la: 'Sed ille mūs nōn erat laetus. Ille dīcēbat: “Venī mēcum!”', scene: SC.f16_mecum,
          nova: [{ w: 'mēcum', e: '🐭🤝🐭', g: '“Venī mēcum!” = venī et ambulā cum mūre urbānō' }] },

        { la: 'Duo mūrēs ad urbem ambulābant.', scene: SC.f16_ambulant, nova: [] },

        { la: 'Ecce urbs! In urbe multī virī erant.', scene: SC.f16_inurbe,
          nova: [{ w: 'urbs', e: '🏛', g: 'in urbe nōn ager, sed multī virī sunt' }] },

        { la: 'Ecce mēnsa! Mūrēs in mēnsam ascendēbant.', scene: SC.f16_mensa,
          nova: [{ w: 'mēnsa', e: '🍽', g: 'in mēnsā cibus est: mēnsa nōn praesēpe est' }] },

        { la: 'In mēnsā cibus erat: cāseus et ūva.', scene: SC.f16_cibus, nova: [] },

        { la: 'Mūs urbānus dīcit: “Ecce cēna! Nōlī timēre!”', scene: SC.f16_dicit, nova: [] },

        { la: 'Mūrēs cāseum et ūvam dēvorābant. Mūrēs laetī erant.', scene: SC.f16_devorant, nova: [] },

        { la: 'Sed ecce fēlēs! Fēlēs in urbe habitābat.', scene: SC.f16_feles,
          nova: [{ w: 'fēlēs', e: '🐱', g: 'fēlēs mūrēs capit et dēvorat' }] },

        { la: 'Fēlēs mūrēs videt. Mūrēs fēlem timent.', scene: SC.f16_timent, nova: [] },

        /* B-RATING: the cat never reaches them */
        { la: 'Mūrēs sub mēnsam fugiunt. Fēlēs eōs nōn capit.', scene: SC.f16_fugiunt,
          nova: [{ w: 'eōs', e: '👉🐭🐭', g: 'fēlēs mūrēs nōn capit: eōs nōn capit' }] },

        { la: 'Mūs rūsticus dīcit: “Ō amīce! Hic cibus magnus est, sed fēlēs in urbe habitat!”',
          scene: SC.f16_valedicit, nova: [] },

        { la: 'Mūs rūsticus discēdit. Ille ex urbe ad agrum ambulat.', scene: SC.f16_redit, nova: [] },

        { la: 'In agrō fēlēs nōn est. Mūs rūsticus frūmentum dēvorat.', scene: SC.f16_ager, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: in agrō cibus parvus est, sed fēlēs nōn est.', scene: SC.f16_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'mūs',   scene: SC.v_mus },
          { la: 'fēlēs', scene: SC.v_feles },
          { la: 'mēnsa', scene: SC.v_mensa },
          { la: 'urbs',  scene: SC.v_urbs },
          { la: 'cibus', scene: SC.v_cibus },
          { la: 'grex',  emoji: '🐑' }
        ]
      },
      /* SONUS. `rūsticus` and `urbānus` are BOTH pictures of a mouse and
         are never offered against `mūs` or against each other — a
         learner who hears one and taps the other has read the picture
         correctly and would be punished for it (LATIN-STYLE §4, the
         Regiō III/IV discipline). `cibus` is a dish of food and `mēnsa`
         a table that paints its own bread, so those two do not meet
         either. All three held-out cards are recycled in CORRIGE and
         COMPLĒ, where the sentence disambiguates them. */
      sonus: [
        { la: 'mūs',
          answer: { la: 'mūs', scene: SC.v_mus },
          options: [{ la: 'mūs', scene: SC.v_mus },
                    { la: 'fēlēs', scene: SC.v_feles },
                    { la: 'mēnsa', scene: SC.v_mensa }] },
        { la: 'fēlēs',
          answer: { la: 'fēlēs', scene: SC.v_feles },
          options: [{ la: 'fēlēs', scene: SC.v_feles },
                    { la: 'mūs', scene: SC.v_mus },
                    { la: 'mēnsa', scene: SC.v_mensa }] },
        { la: 'mēnsa',
          answer: { la: 'mēnsa', scene: SC.v_mensa },
          options: [{ la: 'mēnsa', scene: SC.v_mensa },
                    { la: 'mūs', scene: SC.v_mus },
                    { la: 'fēlēs', scene: SC.v_feles },
                    { la: 'urbs', scene: SC.v_urbs }] },
        { la: 'urbs',
          answer: { la: 'urbs', scene: SC.v_urbs },
          options: [{ la: 'urbs', scene: SC.v_urbs },
                    { la: 'mūs', scene: SC.v_mus },
                    { la: 'fēlēs', scene: SC.v_feles }] }
      ],
      /* OVERRIDES. The generated set was read first. Two faults, one of
         them new to S6:
           · it clozed `erant` and `habitābat` off pages whose ŌLIM had
             already been consumed by the sentence-splitter, leaving
             items where present and imperfect are BOTH true — the
             coin-flip ruling 2 exists to prevent;
           · it never once offered a pronoun, because `hic`, `ille`,
             `eius`, `eī` and `eōs` are all on js/boss-phases.js's
             function-word stoplist and the COMPLĒ generator only clozes
             vocabulary words.
         The region exists for the imperfect and the pronouns, so the
         hand set asks for one or the other in 5 of 6 COMPLĒ items and
         4 of 5 CORRIGE items, always with the tense cue on screen. */
      overrides: {
        aenigmata: {
          /* five tiles, five different pictures. `rūsticus` and
             `urbānus` are held out for the SONUS reason above — each
             would put a second mouse on a board that already has one —
             and `frūmentum` because v_rusticus is where the learner met
             the grain. Both adjectives are recycled below. */
          pairs: [
            { la: 'mūs',   scene: SC.v_mus },
            { la: 'fēlēs', scene: SC.v_feles },
            { la: 'mēnsa', scene: SC.v_mensa },
            { la: 'urbs',  scene: SC.v_urbs },
            { la: 'cibus', scene: SC.v_cibus }
          ],
          scrambles: [
            { la: 'Duo mūrēs ad urbem ambulābant.',   scene: SC.f16_ambulant },
            { la: 'Mūs rūsticus eī frūmentum dabat.', scene: SC.f16_dat },
            { la: 'In mēnsā cibus erat.',             scene: SC.f16_cibus },
            { la: 'Fēlēs mūrēs videt.',               scene: SC.f16_timent }
          ]
        },
        corrige: [
          /* IMPERFECT of esse, with the ŌLIM left in the item */
          { words: ['Ōlim', 'duo', 'mūrēs', 'sunt.'], wrong: 3,
            options: ['erant.', 'erat.', 'est.'], correct: 0, scene: SC.f16_duo },
          /* IMPERFECT of a 1st-conjugation verb, same cue */
          { words: ['Ōlim', 'mūs', 'rūsticus', 'in', 'agrō', 'habitat.'], wrong: 5,
            options: ['habitābat.', 'habitant.', 'habitābant.'], correct: 0, scene: SC.f16_ager },
          /* DEMONSTRATIVES: the picture puts the field mouse on the left */
          { words: ['Ille', 'mūs', 'in', 'agrō', 'habitābat;', 'ille', 'mūs', 'in', 'urbe.'], wrong: 0,
            options: ['Hic', 'Eum', 'Eius'], correct: 0, scene: SC.f16_duo },
          /* PRONOUN CASE: two mice, so the accusative is plural */
          { words: ['Fēlēs', 'mūrēs', 'nōn', 'capit:', 'eum', 'nōn', 'capit.'], wrong: 4,
            options: ['eōs', 'eī', 'is'], correct: 0, scene: SC.f16_fugiunt },
          { words: ['Mūs', 'urbānus', 'in', 'agrō', 'frūmentum', 'dēvorābat.'], wrong: 1,
            options: ['rūsticus', 'trīstis', 'fessus'], correct: 0, scene: SC.f16_devorat }
        ],
        comple: [
          { text: 'Ōlim mūs rūsticus in agrō ___.',
            options: ['habitābat', 'habitat', 'habitābant'], correct: 0, scene: SC.f16_ager },
          { text: 'Ōlim duo mūrēs ___.',
            options: ['erant', 'sunt', 'est'], correct: 0, scene: SC.f16_duo },
          { text: '___ mūs in agrō habitābat; ille mūs in urbe.',
            options: ['Hic', 'Ille', 'Eum'], correct: 0, scene: SC.f16_duo },
          { text: 'Fēlēs mūrēs nōn capit: ___ nōn capit.',
            options: ['eōs', 'eum', 'eī'], correct: 0, scene: SC.f16_fugiunt },
          { text: 'Mūs rūsticus ___ frūmentum dabat.',
            options: ['eī', 'eum', 'eōs'], correct: 0, scene: SC.f16_dat },
          { text: 'Mūs ___ in urbe habitābat.',
            options: ['urbānus', 'rūsticus', 'parvus'], correct: 0, scene: SC.f16_urbs }
        ]
      }
    },

    /* ============ FABLE 17 — Canis in Praesēpī ============
       THE PRONOUN `is`. f16 gave the learner `eius`, `eī` and `eōs` in
       three separate sentences; this capitulum puts all of them plus
       `eum` to work in one small room, where there are exactly two
       animals and the reference is never in doubt — which is the only
       honest way to teach a pronoun.

       Deliberately light on vocabulary again (THREE content lexemes),
       and one of them — `stabulum` — carries no vocabulary card. Every
       picture the library can make of "stable" is bgStabulum, and
       bgStabulum with a manger in it is the picture of `praesēpe`; a
       card would have made SONUS a guess about which word the room
       meant. It is glossed on p1 and recycled three times, exactly the
       way Regiō IV f12 handled `locus`.

       ONE DEPARTURE FROM THE FABLE AS COMMONLY TOLD, recorded: Aesop's
       dog neither eats the hay nor lets the ox eat, and "lets … eat" is
       accusative + īnfīnītīvus (S12). The Latin here says what the
       picture shows instead — `canis bovem prohibet` — which is the
       same fact, one construction the learner has (a plain accusative
       object), and it is what the mōrāle then stands on. `faenum` was
       also dropped in favour of `frūmentum`: the fodder is drawn by the
       `frumentum` prop the learner met in Regiō II, so the fable costs
       no ninth lexeme and gains a recycled one. */
    {
      id: 'f17',
      titulus: 'Canis in Praesēpī',
      icon: '🐕🥣',
      numerus: 'XVII',
      pos: { x: 0.26, y: 0.62 },
      vocab: [
        { la: 'praesēpe',  scene: SC.v_praesepe, pars: 'nomen' },
        { la: 'stabulum',  scene: SC.v_stabulum, pars: 'nomen' },
        { la: 'canis',     scene: SC.v_canis,    pars: 'nomen' },
        { la: 'bōs',       scene: SC.v_bos,      pars: 'nomen' },
        { la: 'frūmentum', emoji: '🌾',          pars: 'nomen' },
        { la: 'prohibet',  scene: SC.v_prohibet, pars: 'verbum' },
        { la: 'lātrat',    scene: SC.v_latrat,   pars: 'verbum' },
        { la: 'dormit',    scene: SC.v_dormit,   pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce stabulum! In stabulō bōs et canis habitābant.', scene: SC.f17_stabulum,
          nova: [{ w: 'stabulum', e: '🏚', g: 'bōs et canis in stabulō habitant' },
                 { w: 'stabulō', e: '🏚', g: 'stabulum → in stabulō' }] },

        { la: 'In stabulō praesēpe erat. In praesēpī frūmentum erat.', scene: SC.f17_praesepe,
          nova: [{ w: 'praesēpe', e: '🥣', g: 'in praesēpī cibus bovis est' },
                 { w: 'praesēpī', e: '🥣', g: 'praesēpe → in praesēpī' }] },

        { la: 'Bōs frūmentum dēvorābat. Frūmentum cibus eius erat.', scene: SC.f17_bos, nova: [] },

        { la: 'Sed ecce! Canis in praesēpe salit.', scene: SC.f17_salit, nova: [] },

        { la: 'Canis in praesēpī iacēbat. Canis dormiēbat.', scene: SC.f17_dormit,
          nova: [{ w: 'iacēbat', e: '🕰⬇', g: 'iam iacet; ōlim iacēbat' },
                 { w: 'dormiēbat', e: '🕰💤', g: 'iam dormit; ōlim dormiēbat' }] },

        { la: 'Bōs ad praesēpe venit. Bōs ēsuriēbat.', scene: SC.f17_esurit, nova: [] },

        { la: 'Sed canis lātrat. Bōs frūmentum nōn dēvorat.', scene: SC.f17_latrat, nova: [] },

        { la: 'Canis bovem prohibet.', scene: SC.f17_prohibet,
          nova: [{ w: 'prohibet', e: '🚫', g: 'bōs venit; canis lātrat: bōs frūmentum nōn dēvorat' }] },

        { la: 'Bōs dīcit: “Ō canis! Cūr lātrās? Frūmentum nōn dēvorās!”', scene: SC.f17_dicit,
          nova: [{ w: 'lātrās', e: '👤➡🐕', g: 'canis lātrat → “Ō canis, lātrās!”' }] },

        { la: 'Canis nōn respondet. Ille iterum lātrat.', scene: SC.f17_latrat, nova: [] },

        /* IS in the ACCUSATIVE, with two animals in the room and only
           one of them possible */
        { la: 'Bōs iterum ad praesēpe venit, sed canis eum prohibet.', scene: SC.f17_prohibet,
          nova: [{ w: 'eum', e: '👉🐂', g: 'canis bovem prohibet: eum prohibet' }] },

        { la: 'Bōs trīstis est. Ille ēsurit.', scene: SC.f17_tristis, nova: [] },

        { la: 'Posteā agricola in stabulum venit. Agricola canem videt.', scene: SC.f17_agricola, nova: [] },

        { la: 'Agricola clāmat: “Ō canis! Nōlī in praesēpī iacēre!”', scene: SC.f17_clamat, nova: [] },

        { la: 'Agricola canem ex praesēpī portat.', scene: SC.f17_portat, nova: [] },

        { la: 'Iam bōs frūmentum dēvorat. Bōs laetus est.', scene: SC.f17_devorat, nova: [] },

        { la: 'Canis in stabulō iacet. Ille bovem iam nōn prohibet.', scene: SC.f17_iacet, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: canis frūmentum nōn dēvorat, sed bovem prohibet.',
          scene: SC.f17_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'praesēpe', scene: SC.v_praesepe },
          { la: 'canis',    scene: SC.v_canis },
          { la: 'bōs',      scene: SC.v_bos },
          { la: 'mūs',      scene: SC.v_mus },
          { la: 'fēlēs',    scene: SC.v_feles },
          { la: 'mēnsa',    scene: SC.v_mensa }
        ]
      },
      /* SONUS. Everything in this capitulum happens in one barn, so the
         listening step uses only the four cards that are pictures of
         DIFFERENT THINGS: the trough, the dog, the ox and the grain.
         `stabulum` (a barn with nothing in it) is never offered against
         `praesēpe` (a barn with a trough in it) — both pictures are a
         stable, and by ear the learner would be choosing between two
         true answers. `dormit`, `lātrat` and `prohibet` are each a dog,
         so they stay out too; all four held-out cards are recycled in
         CORRIGE and COMPLĒ. */
      sonus: [
        { la: 'praesēpe',
          answer: { la: 'praesēpe', scene: SC.v_praesepe },
          options: [{ la: 'praesēpe', scene: SC.v_praesepe },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'bōs', scene: SC.v_bos }] },
        { la: 'canis',
          answer: { la: 'canis', scene: SC.v_canis },
          options: [{ la: 'canis', scene: SC.v_canis },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'praesēpe', scene: SC.v_praesepe }] },
        { la: 'bōs',
          answer: { la: 'bōs', scene: SC.v_bos },
          options: [{ la: 'bōs', scene: SC.v_bos },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'praesēpe', scene: SC.v_praesepe }] },
        { la: 'frūmentum',
          answer: { la: 'frūmentum', emoji: '🌾' },
          options: [{ la: 'frūmentum', emoji: '🌾' },
                    { la: 'canis', scene: SC.v_canis },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'praesēpe', scene: SC.v_praesepe }] }
      ],
      /* OVERRIDES. The generated set offered the verb `Prohibet` as a
         subject, and — the fault that matters here — produced two clozes
         whose distractor is not clearly wrong: "Bōs in praesēpī
         ___" accepts `iacet` as readily as `dormit`, because an ox at a
         manger is doing neither in the picture. The hand items put the
         DOG in the trough, where the picture decides.
         Target-grammar items: 4 of 5 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* `stabulum` is held out (see SONUS), and so are `lātrat` and
             `prohibet`: each is one more dog on a board that already
             carries two. Both are recycled below. */
          pairs: [
            { la: 'praesēpe',  scene: SC.v_praesepe },
            { la: 'canis',     scene: SC.v_canis },
            { la: 'bōs',       scene: SC.v_bos },
            { la: 'frūmentum', emoji: '🌾' },
            { la: 'dormit',    scene: SC.v_dormit }
          ],
          scrambles: [
            { la: 'In praesēpī frūmentum erat.',   scene: SC.f17_praesepe },
            { la: 'Canis in praesēpī dormiēbat.',  scene: SC.f17_dormit },
            { la: 'Canis bovem prohibet.',         scene: SC.f17_prohibet },
            { la: 'Agricola canem videt.',         scene: SC.f17_agricola }
          ]
        },
        corrige: [
          /* IMPERFECT, plural: two animals live there, and the ŌLIM cue
             stays inside the item (file header, ruling 2) */
          { words: ['Ōlim', 'in', 'stabulō', 'bōs', 'et', 'canis', 'habitābat.'], wrong: 6,
            options: ['habitābant.', 'habitant.', 'habitat.'], correct: 0, scene: SC.f17_stabulum },
          /* IMPERFECT, singular: one heap of grain */
          { words: ['In', 'praesēpī', 'frūmentum', 'erant.'], wrong: 3,
            options: ['erat.', 'sunt.', 'est.'], correct: 0, scene: SC.f17_praesepe },
          /* PRONOUN: one ox, so the accusative is singular */
          { words: ['Canis', 'bovem', 'prohibet:', 'eōs', 'prohibet.'], wrong: 3,
            options: ['eum', 'eī', 'is'], correct: 0, scene: SC.f17_prohibet },
          /* PRONOUN: the grain is the OX's food, which is a genitive */
          { words: ['Frūmentum', 'cibus', 'eum', 'erat.'], wrong: 2,
            options: ['eius', 'eī', 'is'], correct: 0, scene: SC.f17_bos },
          { words: ['Bōs', 'in', 'praesēpī', 'dormiēbat.'], wrong: 0,
            options: ['Canis', 'Agricola', 'Frūmentum'], correct: 0, scene: SC.f17_dormit }
        ],
        comple: [
          { text: 'Ōlim in stabulō bōs et canis ___.',
            options: ['habitābant', 'habitābat', 'habitant'], correct: 0, scene: SC.f17_stabulum },
          { text: 'In praesēpī frūmentum ___.',
            options: ['erat', 'erant', 'sunt'], correct: 0, scene: SC.f17_praesepe },
          { text: 'Canis bovem prohibet: ___ prohibet.',
            options: ['eum', 'eōs', 'eī'], correct: 0, scene: SC.f17_prohibet },
          { text: 'Frūmentum cibus ___ erat.',
            options: ['eius', 'eum', 'eī'], correct: 0, scene: SC.f17_bos },
          { text: 'Canis nōn respondet. ___ iterum lātrat.',
            options: ['Ille', 'Eum', 'Eius'], correct: 0, scene: SC.f17_latrat },
          { text: 'Canis in praesēpī ___.',
            options: ['dormit', 'ascendit', 'currit'], correct: 0, scene: SC.f17_dormit }
        ]
      }
    },

    /* ============ FABLE 18 — Vulpēs et Hircus ============
       IMPERFECT and PRONOUNS together, on the region's hardest picture:
       an animal that is INSIDE something. The `well` prop is drawn AFTER
       the animal in every trapped scene, so the stones cover the body
       and only the head shows above the rim — no new art, and the
       learner can see at a glance who can leave and who cannot.

       B-RATING (DESIGN §8) and the assignment's requirement: the goat is
       NOT left in the well. The agricola of Regiō II comes, calls
       “Nōlī timēre!”, and lifts him out. Aesop's moral is untouched and
       is spoken by the fox one page earlier, where it belongs — the
       humane ending changes what happens to the goat, not what the
       fable teaches. */
    {
      id: 'f18',
      titulus: 'Vulpēs et Hircus',
      icon: '🦊🐐',
      numerus: 'XVIII',
      pos: { x: 0.70, y: 0.39 },
      vocab: [
        { la: 'puteus',   scene: SC.v_puteus,   pars: 'nomen' },
        { la: 'hircus',   scene: SC.v_hircus,   pars: 'nomen' },
        { la: 'vulpēs',   emoji: '🦊',          pars: 'nomen' },
        { la: 'cornua',   scene: SC.v_cornua,   pars: 'nomen' },
        { la: 'aqua',     emoji: '💧',          pars: 'nomen' },
        { la: 'agricola', scene: SC.v_agricola, pars: 'nomen' },
        { la: 'salit',    scene: SC.v_salit,    pars: 'verbum' },
        { la: 'ascendit', scene: SC.v_ascendit, pars: 'verbum' }
      ],
      story: [
        { la: 'Ōlim vulpēs in silvā ambulābat. Vulpēs aquam quaerēbat.', scene: SC.f18_silva,
          nova: [{ w: 'ambulābat', e: '🕰🚶', g: 'iam ambulat; ōlim ambulābat' },
                 { w: 'quaerēbat', e: '🕰🔎', g: 'iam quaerit; ōlim quaerēbat' }] },

        { la: 'Ecce puteus! In puteō aqua erat.', scene: SC.f18_puteus,
          nova: [{ w: 'puteus', e: '🕳💧', g: 'puteus altus est: in puteō aqua est' },
                 { w: 'puteō', e: '🕳', g: 'puteus → in puteō' }] },

        { la: 'Vulpēs in puteum salit. Vulpēs aquam bibit.', scene: SC.f18_salit, nova: [] },

        { la: 'Sed puteus altus erat. Vulpēs ex puteō ascendere nōn poterat.', scene: SC.f18_nonpotest,
          nova: [{ w: 'poterat', e: '🕰🚫', g: 'iam nōn potest; ōlim nōn poterat' }] },

        { la: 'Ecce hircus! Hircus ad puteum veniēbat.', scene: SC.f18_hircus,
          nova: [{ w: 'hircus', e: '🐐', g: 'hircus cornua habet; hircus nōn haedus est' }] },

        { la: 'Hircus quoque aquam cupiēbat.', scene: SC.f18_hircus, nova: [] },

        { la: 'Hircus clāmat: “Ō vulpēs! Quid in puteō est?”', scene: SC.f18_rogat, nova: [] },

        { la: 'Vulpēs respondet: “Aqua est! Salī, amīce! Nōlī timēre!”', scene: SC.f18_respondet,
          nova: [{ w: 'salī', e: '👉⬇', g: 'hircus salit → “Salī!”' }] },

        { la: 'Hircus nōn videt, sed salit. Iam hircus quoque in puteō est.', scene: SC.f18_hircusSalit, nova: [] },

        { la: 'Vulpēs in cornua hircī ascendit.', scene: SC.f18_ascendit, nova: [] },

        { la: 'Vulpēs ex puteō salit. Iam vulpēs lībera est.', scene: SC.f18_libera, nova: [] },

        { la: 'Sed hircus in puteō manet: hircus ascendere nōn potest.', scene: SC.f18_manet,
          nova: [{ w: 'manet', e: '📍', g: 'hircus nōn discēdit: in puteō manet' }] },

        { la: 'Hircus clāmat: “Ō vulpēs! Cūr mē nōn iuvās?”', scene: SC.f18_clamat,
          nova: [{ w: 'mē', e: '👉🐐', g: 'hircus dīcit: “Iuvā mē!” — vulpēs hircum nōn iuvat' }] },

        /* the fox's lecture: the mōrāle, one page early, in her mouth */
        { la: 'Vulpēs respondet: “Prīmum vidē, posteā salī!”', scene: SC.f18_dicit,
          nova: [{ w: 'prīmum', e: '1️⃣', g: 'prīmum, posteā' }] },

        { la: 'Vulpēs discēdit. Hircus in puteō sōlus manet.', scene: SC.f18_solus, nova: [] },

        { la: 'Posteā agricola venit. Agricola hircum in puteō videt.', scene: SC.f18_agricola, nova: [] },

        /* the humane ending: a vocative that MOVES (hircus → hirce) */
        { la: 'Agricola clāmat: “Ō hirce! Nōlī timēre! Nōlī clāmāre!”', scene: SC.f18_clamat2,
          nova: [{ w: 'hirce', e: '💬🐐', g: 'hircus → “Ō hirce!”' }] },

        { la: 'Agricola hircum ex puteō portat. Iam hircus tūtus est.', scene: SC.f18_tutus, nova: [] },

        { la: 'Hircus laetus est. Ille aquam bibit et discēdit.', scene: SC.f18_bibit, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: hircus prīmum salit, posteā videt.', scene: SC.f18_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'puteus',   scene: SC.v_puteus },
          { la: 'hircus',   scene: SC.v_hircus },
          { la: 'vulpēs',   emoji: '🦊' },
          { la: 'agricola', scene: SC.v_agricola },
          { la: 'praesēpe', scene: SC.v_praesepe },
          { la: 'fēlēs',    scene: SC.v_feles }
        ]
      },
      /* SONUS. `cornua` is a goat and an ox, `salit` and `ascendit` are
         both pictures of the well — so none of the three is ever offered
         against `hircus` or `puteus`. What is left is four cards that
         share nothing: a well, a goat, a fox and a farmer. The held-out
         cards are recycled in CORRIGE and COMPLĒ. */
      sonus: [
        { la: 'puteus',
          answer: { la: 'puteus', scene: SC.v_puteus },
          options: [{ la: 'puteus', scene: SC.v_puteus },
                    { la: 'hircus', scene: SC.v_hircus },
                    { la: 'vulpēs', emoji: '🦊' }] },
        { la: 'hircus',
          answer: { la: 'hircus', scene: SC.v_hircus },
          options: [{ la: 'hircus', scene: SC.v_hircus },
                    { la: 'puteus', scene: SC.v_puteus },
                    { la: 'vulpēs', emoji: '🦊' }] },
        { la: 'vulpēs',
          answer: { la: 'vulpēs', emoji: '🦊' },
          options: [{ la: 'vulpēs', emoji: '🦊' },
                    { la: 'hircus', scene: SC.v_hircus },
                    { la: 'puteus', scene: SC.v_puteus }] },
        { la: 'agricola',
          answer: { la: 'agricola', scene: SC.v_agricola },
          options: [{ la: 'agricola', scene: SC.v_agricola },
                    { la: 'puteus', scene: SC.v_puteus },
                    { la: 'hircus', scene: SC.v_hircus },
                    { la: 'vulpēs', emoji: '🦊' }] }
      ],
      /* OVERRIDES. The generated set produced one item that is simply
         false — "Vulpēs ex puteō ___" with `salit` and `ascendit` both
         offered, which on the page where she CANNOT get out makes the
         correct answer the one the picture refutes. The hand items keep
         `poterat` in the sentence, where the negation settles it.
         Target-grammar items: 4 of 5 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* six tiles. `salit` and `ascendit` are both the well with an
             animal at it, so only ONE of them is on the board; `aqua`
             takes the other slot. */
          pairs: [
            { la: 'puteus',   scene: SC.v_puteus },
            { la: 'hircus',   scene: SC.v_hircus },
            { la: 'vulpēs',   emoji: '🦊' },
            { la: 'cornua',   scene: SC.v_cornua },
            { la: 'agricola', scene: SC.v_agricola },
            { la: 'aqua',     emoji: '💧' }
          ],
          scrambles: [
            { la: 'Vulpēs in puteum salit.',           scene: SC.f18_salit },
            { la: 'Vulpēs in cornua hircī ascendit.',  scene: SC.f18_ascendit },
            { la: 'Agricola hircum in puteō videt.',   scene: SC.f18_agricola },
            { la: 'Hircus aquam bibit.',               scene: SC.f18_bibit }
          ]
        },
        corrige: [
          /* IMPERFECT, with the ŌLIM cue kept in the item */
          { words: ['Ōlim', 'vulpēs', 'in', 'silvā', 'ambulat.'], wrong: 4,
            options: ['ambulābat.', 'ambulābant.', 'ambulāmus.'], correct: 0, scene: SC.f18_silva },
          /* IMPERFECT of esse, singular */
          { words: ['In', 'puteō', 'aqua', 'erant.'], wrong: 3,
            options: ['erat.', 'sunt.', 'erāmus.'], correct: 0, scene: SC.f18_puteus },
          /* IMPERFECT of posse: the whole page is about what she could
             not do, and `nōn` is what makes the picture decide */
          { words: ['Vulpēs', 'ex', 'puteō', 'ascendere', 'nōn', 'potest.'], wrong: 5,
            options: ['poterat.', 'poterant.', 'possumus.'], correct: 0, scene: SC.f18_nonpotest },
          /* DEMONSTRATIVE as a subject */
          { words: ['Hircus', 'laetus', 'est.', 'Eum', 'aquam', 'bibit.'], wrong: 3,
            options: ['Ille', 'Eius', 'Eī'], correct: 0, scene: SC.f18_bibit },
          { words: ['Vulpēs', 'in', 'cornua', 'hircī', 'cadit.'], wrong: 4,
            options: ['ascendit.', 'iacet.', 'dormit.'], correct: 0, scene: SC.f18_ascendit }
        ],
        comple: [
          { text: 'Ōlim vulpēs in silvā ambulā___.',
            options: ['bat', 't', 'bant'], correct: 0, scene: SC.f18_silva },
          { text: 'In puteō aqua ___.',
            options: ['erat', 'erant', 'sunt'], correct: 0, scene: SC.f18_puteus },
          { text: 'Vulpēs ex puteō ascendere nōn ___.',
            options: ['poterat', 'potest', 'poterant'], correct: 0, scene: SC.f18_nonpotest },
          { text: 'Hircus clāmat: “Cūr ___ nōn iuvās?”',
            options: ['mē', 'eum', 'eī'], correct: 0, scene: SC.f18_clamat },
          { text: 'Hircus laetus est. ___ aquam bibit.',
            options: ['Ille', 'Eum', 'Eius'], correct: 0, scene: SC.f18_bibit },
          { text: 'Vulpēs in cornua hirc___ ascendit.',
            options: ['ī', 'us', 'um'], correct: 0, scene: SC.f18_ascendit }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r06',
    titulus: 'Urbs',
    ladder: 'S6',                 /* CURRICULUM §0: imperfect + is/hic/ille */
    progressId: 'r06',
    capitula: capitula,
    boss: {
      id: 'b_r06',
      progressId: 'r06',
      /* The cat of f16 comes back for the region's duel — the one animal
         in URBS that the whole region ran away from. She is not the wolf
         (the narrative spine is at R5, R9 and R12), so her tuning is the
         ORDINARY one: hp 6 / 70 phase-seconds, exactly as r01–r04, and
         rule_boss_min_ms('r06') should be the same 15000 the other duel
         regions use. */
      name: 'Fēlēs',
      actor: 'feles',
      vinceText: 'Fēlem vince!',
      hp: 6,
      seconds: 45,
      pos: { x: 0.33, y: 0.15 },
      phases: [
        { type: 'caterva', hp: 2, seconds: 22 },
        { type: 'clamor',  hp: 2, seconds: 28 },
        { type: 'fuga',    hp: 2, seconds: 20 }
      ],
      /* HAND-AUTHORED CLĀMOR (AUTHORING-BRIEF, binding from wave 3).
         Five items, one from f17 and two each from f16 and f18. Every
         gap is a picturable content lexeme with a vocabulary card in
         this region; every option is the same part of speech as the gap
         and is a thing that is plainly NOT in the pictured scene. Each
         gap's neighbours were checked against this region's own story
         bigrams, so no distractor stands where the region's Latin
         actually puts it. */
      clamor: [
        { text: '____ mūrēs capit et dēvorat.',
          answer: 'fēlēs', options: ['fēlēs', 'mūs', 'canis'],
          scene: SC.f16_timent },
        /* the gap takes the CITATION form (see r05's note): `In ____ cibus
           erat` wants the ablative `mēnsā`, so the gap moved to the noun
           the sentence puts in the nominative instead. */
        { text: 'In mēnsā ____ erat: cāseus et ūva.',
          answer: 'cibus', options: ['cibus', 'urbs', 'puteus'],
          scene: SC.f16_cibus },
        { text: 'Canis in praesēpī ____.',
          answer: 'dormit', options: ['dormit', 'salit', 'ascendit'],
          scene: SC.f17_dormit },
        { text: '____ altus erat: vulpēs ascendere nōn poterat.',
          answer: 'puteus', options: ['puteus', 'urbs', 'mēnsa'],
          scene: SC.f18_nonpotest },
        { text: '____ cornua habet, sed vulpēs nōn habet.',
          answer: 'hircus', options: ['hircus', 'mūs', 'fēlēs'],
          scene: SC.f18_hircus }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum. All three
         capitula are represented. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'fēlēs',    from: 'f16' },
        { la: 'urbs',     from: 'f16' },
        { la: 'praesēpe', from: 'f17' },
        { la: 'hircus',   from: 'f18' },
        { la: 'puteus',   from: 'f18' }
      ]
    }
  });
})();
