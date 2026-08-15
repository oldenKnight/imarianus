/* ============================================================
   content/fabulae-r05.js — FĀBULAE · Regiō V · VIA  (ladder S5)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō IV:
     f13 Pāstor et Lupus     — VOCATIVE and the questions (ubi · cūr)
     f14 Viātōrēs et Ursus   — the IMPERATIVE, and nōlī + īnfīnītīvus
     f15 Equus et Asinus     — the QUESTIONS again, on two beasts and a load

   STAGE CEILING (CURRICULUM §0 S5, binding):
     everything S1–S4 (nom/acc sg+pl · genitive · dative · ablative and
     the six prepositions in/ex/ab/cum/dē/sub · est/sunt · 3rd-person
     present of ANY conjugation, AUTHORING-BRIEF ruling 1 · -que · nōn)
     PLUS the imperative, the vocative, the question words (-ne, quis,
     quid, cūr, ubi) and the negative command nōlī + īnfīnītīvus.
     AUTHORING-BRIEF ruling 2 also opens the īnfīnītīvus with
     potest / vult / dēbet here; this region uses it exactly twice and
     only after `nōlī` has taught the form.
     STILL FORBIDDEN and avoided throughout: personal and demonstrative
     pronouns (is/hic/ille — S6), the imperfect and the perfect,
     comparatives, relative clauses.

   ------------------------------------------------------------
   TWO RULINGS TAKEN IN THIS REGION, both recorded because Regiō VI
   and every later author will hit them again.

   1. SECOND-PERSON PRESENT INDICATIVE, INSIDE DIRECT SPEECH ONLY.
      CURRICULUM §0 puts the IMPERATIVE and the VOCATIVE at S5 and says
      nothing about the 2nd person of the indicative. But an imperative
      needs somebody to obey it, and a vocative needs somebody to answer:
      "Ō pāstor! Cūr semper clāmās?" is the sentence the whole region is
      built to make possible, and there is no stage-legal way to write it
      without `clāmās`.
        The precedent is already SHIPPED and audited: Regiō I f3 puts
      `turbās` in the wolf's mouth and Regiō I f1/f3 put `cupiō`,
      `habeō` and `possum` in direct speech, all above their stage, all
      marked in the ledger as "direct speech only". This region does the
      same thing DELIBERATELY and systematically rather than by accident:
        · 2sg present indicative is allowed from S5, in quoted speech only;
        · it is GLOSSED at first use with a morphology hint that derives
          it from the 3rd person the learner already reads
          (`pāstor clāmat → "Ō pāstor, clāmās!"`);
        · it never appears in narrative, never in a mōrāle, and never in
          a generated exercise — only in hand-authored CORRIGE/COMPLĒ
          items that quote the speech verbatim;
        · the FIRST person is NOT opened. Every thought that wanted
          "I do not help" is written as a command instead
          ("Nōlī clāmāre!"), which is better Latin anyway.
      Ledgered under f13/f15. FLAGGED for line-audit.

   2. "NŌLĪ TĒ MOVĒRE" — SOLVED BY REWORDING, NOT BY BENDING THE LADDER.
      The Aesopic traveller is told to lie still, and every English
      retelling says "don't move". `tē` is a personal pronoun (S6) and
      `movērī` is passive (S10); `movēre` used absolutely is not Latin.
      AUTHORING-BRIEF's golden exemplar is explicit about what to do
      here — CHANGE THE SENTENCE, NEVER THE GRAMMAR — so f14 says

          Viātor clāmat: “Iacē! Nōlī currere!”

      `iacē` is the imperative of a verb this capitulum teaches with a
      picture, and `nōlī currere` is what you would actually shout at a
      man who has met a bear. Nothing is lost: the command is more
      concrete than "don't move", it costs no pronoun, and it makes the
      negative command sit next to a positive one on the same page,
      which is the best gloss the construction could get.

   ------------------------------------------------------------
   MISSING ART, REPORTED AND NOT WORKED AROUND (second time — Regiō IV
   filed the same report): there is still no road/`via` prop or
   background in the library. This region is CALLED Via and its map
   header says so, but the word `via` is taught NOWHERE in it, because
   teaching it would mean approximating a scene, which LATIN-STYLE §5
   forbids. The travelling is carried by `ambulat` + `viātor` and by
   backgrounds that change under the walkers' feet.

   PROGRESS IDS ARE FROZEN once shipped: f13/f14/f15 and progressId
   'r05' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ----------

     CAMOUFLAGE (the Regiō IV lesson, verified again here at SONUS tile
     size and not at page size): the `grex` prop paints its lambs in
     COL.white (#fbf6ea) and bgPlain's sky is cream (#f6e8c9). A flock
     standing on plain ground is a white shape on a cream field and
     disappears the moment a card is shrunk to ~86 px. Every flock in
     this region therefore stands against something: the rock mass of
     bgMountain (which fills x≈40–210 at ground level) in the story, and
     the dark stone wall of bgStabulum on the vocabulary card. The
     shepherd himself is COL.terra and needs no help. */

  var SC = {

    /* ============ fable 13 — Pāstor et Lupus ============ */

    /* the flock alone, against the rock: this is the picture the word
       `grex` is learned from, so nothing else may be in it */
    f13_grex:    { bg: 'mountain', items: [
                   { t: 'grex', x: 132, y: G, s: 1.35 }
                 ] },

    f13_pastor:  { bg: 'mountain', items: [
                   { t: 'grex',   x: 128, y: G, s: 1.2 },
                   { t: 'person', x: 288, y: G, s: 1.05, role: 'shepherd', flip: true }
                 ] },

    f13_mons:    { bg: 'mountain', items: [
                   { t: 'grex',   x: 120, y: G, s: 1.15 },
                   { t: 'grex',   x: 196, y: G, s: 0.95 },
                   { t: 'person', x: 300, y: G, s: 1, role: 'shepherd', flip: true }
                 ] },

    f13_lupus:   { bg: 'forest', items: [
                   { t: 'tree', x: 320, y: G, s: 1 },
                   { t: 'wolf', x: 150, y: G, s: 1, pose: 'walk' }
                 ] },

    f13_timent:  { bg: 'mountain', items: [
                   { t: 'grex',   x: 130, y: G, s: 1.2 },
                   { t: 'person', x: 296, y: G, s: 1, role: 'shepherd', flip: true }
                 ],
                 bubbles: [{ x: 306, y: 62, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'left', fs: 19 }] },

    /* THE FIRST FALSE ALARM. The shout says `Lupus!` and the picture
       has NO wolf in it: the lie is told by the image, not by a word
       the learner would have to be told the meaning of. */
    f13_clamat1: { bg: 'mountain', items: [
                   { t: 'grex',   x: 122, y: G, s: 1.15 },
                   { t: 'person', x: 300, y: G, s: 1.05, role: 'shepherd', pose: 'arms-up', flip: true }
                 ],
                 bubbles: [{ x: 232, y: 52, w: 76, h: 44, text: '🐺 🐺', kind: 'speech', tail: 'left', fs: 17 }] },

    f13_veniunt: { bg: 'plain', items: [
                   { t: 'person', x: 78,  y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'person', x: 168, y: G, s: 0.95, role: 'man', pose: 'walk' },
                   { t: 'person', x: 254, y: G, s: 1, role: 'man', pose: 'walk' }
                 ] },

    f13_nonest:  { bg: 'mountain', items: [
                   { t: 'grex',   x: 118, y: G, s: 1.1 },
                   { t: 'person', x: 236, y: G, s: 0.95, role: 'man' },
                   { t: 'person', x: 312, y: G, s: 1, role: 'man', flip: true }
                 ],
                 bubbles: [{ x: 60, y: 62, w: 68, h: 42, text: '🐺 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f13_ridet:   { bg: 'mountain', items: [
                   { t: 'grex',   x: 120, y: G, s: 1.1 },
                   { t: 'person', x: 300, y: G, s: 1.05, role: 'shepherd', flip: true }
                 ],
                 bubbles: [{ x: 306, y: 58, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'left', fs: 19 }] },

    f13_ubi:     { bg: 'mountain', items: [
                   { t: 'grex',   x: 116, y: G, s: 1.05 },
                   { t: 'person', x: 234, y: G, s: 0.95, role: 'man', pose: 'point' },
                   { t: 'person', x: 318, y: G, s: 1.05, role: 'shepherd', flip: true }
                 ],
                 bubbles: [{ x: 196, y: 50, w: 76, h: 44, text: '🐺 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    f13_videte:  { bg: 'mountain', items: [
                   { t: 'grex',   x: 116, y: G, s: 1.05 },
                   { t: 'person', x: 234, y: G, s: 0.95, role: 'man' },
                   { t: 'person', x: 318, y: G, s: 1.05, role: 'shepherd', pose: 'point', flip: true }
                 ],
                 bubbles: [{ x: 214, y: 50, w: 88, h: 44, text: '👀 🐺 ✗', kind: 'speech', tail: 'left', fs: 16 }] },

    /* they walk away asking; the 😠 hangs where they came FROM (the
       mountain, off right), the question is spoken over their heads */
    f13_irati:   { bg: 'plain', items: [
                   { t: 'person', x: 130, y: G, s: 1, role: 'man', pose: 'walk', flip: true },
                   { t: 'person', x: 216, y: G, s: 0.95, role: 'man', pose: 'walk', flip: true }
                 ],
                 bubbles: [{ x: 150, y: 50, w: 78, h: 44, text: '🐺 ❓', kind: 'speech', tail: 'right', fs: 17 },
                           { x: 330, y: 66, w: 56, h: 40, text: '😠', kind: 'thought', tail: 'left', fs: 19 }] },

    f13_iterum:  { bg: 'mountain', items: [
                   { t: 'grex',   x: 122, y: G, s: 1.15 },
                   { t: 'person', x: 300, y: G, s: 1.05, role: 'shepherd', pose: 'arms-up', flip: true }
                 ],
                 bubbles: [{ x: 226, y: 50, w: 92, h: 44, text: '🐺 · 🏃', kind: 'speech', tail: 'left', fs: 16 }] },

    f13_iterum2: { bg: 'plain', items: [
                   { t: 'person', x: 92,  y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'person', x: 182, y: G, s: 0.95, role: 'man', pose: 'walk' }
                 ],
                 bubbles: [{ x: 322, y: 66, w: 68, h: 42, text: '🐺 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f13_cur:     { bg: 'mountain', items: [
                   { t: 'grex',   x: 116, y: G, s: 1.05 },
                   { t: 'person', x: 232, y: G, s: 0.95, role: 'man', pose: 'point' },
                   { t: 'person', x: 320, y: G, s: 1.05, role: 'shepherd', flip: true }
                 ],
                 bubbles: [{ x: 190, y: 50, w: 80, h: 44, text: '❓ 📢', kind: 'speech', tail: 'right', fs: 17 }] },

    /* the wolf is REAL this time, and he comes from the wood on the left
       exactly as he did on the false-alarm pages' missing left edge */
    f13_verus:   { bg: 'mountain', items: [
                   { t: 'wolf',   x: 66,  y: G, s: 0.95, pose: 'walk' },
                   { t: 'grex',   x: 216, y: G, s: 1.1 },
                   { t: 'person', x: 336, y: G, s: 1, role: 'shepherd', flip: true }
                 ] },

    f13_clamat3: { bg: 'mountain', items: [
                   { t: 'wolf',   x: 66,  y: G, s: 0.95, pose: 'walk' },
                   { t: 'grex',   x: 216, y: G, s: 1.1 },
                   { t: 'person', x: 336, y: G, s: 1, role: 'shepherd', pose: 'arms-up', flip: true }
                 ],
                 bubbles: [{ x: 254, y: 48, w: 80, h: 44, text: '🐺 🐺', kind: 'speech', tail: 'left', fs: 17 }] },

    /* the villagers STAND. Nobody is walking, and that is the page. */
    f13_nonveniunt: { bg: 'plain', items: [
                   { t: 'person', x: 118, y: G, s: 1, role: 'man' },
                   { t: 'person', x: 206, y: G, s: 0.95, role: 'man', flip: true }
                 ],
                 bubbles: [{ x: 330, y: 66, w: 68, h: 42, text: '📢 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    /* B-RATING (DESIGN §8). The seizing is ONE clause and the picture
       shows the flock scattering with the wolf still crossing the field;
       the next page is the empty mountain. Nothing is shown being
       caught, and the boy is unhurt throughout. */
    f13_fugiunt: { bg: 'mountain', items: [
                   { t: 'wolf',   x: 108, y: G, s: 1, pose: 'run' },
                   { t: 'grex',   x: 262, y: G, s: 1.05 },
                   { t: 'person', x: 356, y: G, s: 0.95, role: 'shepherd', flip: true }
                 ] },

    /* the cut: the same mountain, and nothing on it */
    f13_vacuus:  { bg: 'mountain', items: [] },

    f13_solus:   { bg: 'mountain', items: [
                   { t: 'person', x: 262, y: G, s: 1.1, role: 'shepherd', flip: true }
                 ],
                 bubbles: [{ x: 272, y: 58, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'left', fs: 19 }] },

    /* mōrāle: he still shouts; the field where the men were is empty */
    f13_moral:   { bg: 'mountain', items: [
                   { t: 'person', x: 300, y: G, s: 1.1, role: 'shepherd', pose: 'arms-up', flip: true }
                 ],
                 bubbles: [{ x: 300, y: 46, w: 54, h: 40, text: '📢', kind: 'speech', tail: 'left', fs: 19 },
                           { x: 96, y: 120, w: 74, h: 44, text: '👨👨 ✗', kind: 'thought', tail: 'right', fs: 17 }] },

    /* ============ fable 14 — Viātōrēs et Ursus ============ */

    f14_viatores: { bg: 'forest', items: [
                   { t: 'tree',   x: 60,  y: G, s: 0.9 },
                   { t: 'person', x: 178, y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'person', x: 262, y: G, s: 0.95, role: 'man', pose: 'walk' }
                 ] },

    f14_amici:   { bg: 'forest', items: [
                   { t: 'person', x: 156, y: G, s: 1, role: 'man' },
                   { t: 'person', x: 240, y: G, s: 0.95, role: 'man', flip: true }
                 ],
                 bubbles: [{ x: 198, y: 56, w: 56, h: 40, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    f14_ursus:   { bg: 'forest', items: [
                   { t: 'ursus',  x: 82,  y: G, s: 1, pose: 'walk' },
                   { t: 'person', x: 244, y: G, s: 1, role: 'man', flip: true },
                   { t: 'person', x: 322, y: G, s: 0.95, role: 'man', flip: true }
                 ] },

    f14_timent:  { bg: 'forest', items: [
                   { t: 'ursus',  x: 78,  y: G, s: 1.05, pose: 'walk' },
                   { t: 'person', x: 246, y: G, s: 1, role: 'man', flip: true },
                   { t: 'person', x: 324, y: G, s: 0.95, role: 'man', flip: true }
                 ],
                 bubbles: [{ x: 246, y: 58, w: 54, h: 38, text: '😨', kind: 'thought', tail: 'right', fs: 18 },
                           { x: 330, y: 58, w: 54, h: 38, text: '😨', kind: 'thought', tail: 'left', fs: 18 }] },

    /* IN the tree: the trunk runs from y G-95 up and the canopy sits at
       y G-82…G-164 (js/scenes.js tree), so a figure whose feet are at
       G-104 stands inside the leaves and not beside them. */
    f14_ascendit: { bg: 'forest', items: [
                   { t: 'tree',   x: 292, y: G, s: 1.25 },
                   { t: 'person', x: 300, y: G - 104, s: 0.72, role: 'man', flip: true },
                   { t: 'ursus',  x: 80,  y: G, s: 1.05, pose: 'walk' },
                   { t: 'person', x: 196, y: G, s: 0.95, role: 'man', flip: true }
                 ] },

    f14_nonascendit: { bg: 'forest', items: [
                   { t: 'tree',   x: 292, y: G, s: 1.25 },
                   { t: 'person', x: 300, y: G - 104, s: 0.72, role: 'man', flip: true },
                   { t: 'ursus',  x: 76,  y: G, s: 1.05, pose: 'walk' },
                   { t: 'person', x: 190, y: G, s: 0.95, role: 'man', pose: 'arms-up', flip: true }
                 ],
                 bubbles: [{ x: 196, y: 54, w: 62, h: 42, text: '🌳 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f14_clamat:  { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.25 },
                   { t: 'person', x: 308, y: G - 104, s: 0.72, role: 'man', flip: true },
                   { t: 'person', x: 150, y: G, s: 1, role: 'man', pose: 'arms-up' }
                 ],
                 bubbles: [{ x: 158, y: 52, w: 74, h: 44, text: '🤝 ❗', kind: 'speech', tail: 'right', fs: 17 }] },

    f14_noniuvat: { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.25 },
                   { t: 'person', x: 308, y: G - 104, s: 0.72, role: 'man', flip: true },
                   { t: 'person', x: 150, y: G, s: 1, role: 'man', pose: 'arms-up' }
                 ],
                 bubbles: [{ x: 214, y: 62, w: 66, h: 42, text: '🤝 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    /* the tree-man's advice: a positive imperative and a negative one on
       the same page, which is the gloss `nōlī` is learned from */
    f14_iace:    { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.25 },
                   { t: 'person', x: 308, y: G - 104, s: 0.72, role: 'man', flip: true },
                   { t: 'ursus',  x: 66,  y: G, s: 1.05, pose: 'walk' },
                   { t: 'person', x: 178, y: G, s: 0.95, role: 'man', flip: true }
                 ],
                 bubbles: [{ x: 250, y: 44, w: 96, h: 44, text: '⬇ · 🏃 ✗', kind: 'speech', tail: 'right', fs: 16 }] },

    f14_iacet:   { bg: 'forest', items: [
                   { t: 'tree',   x: 316, y: G, s: 1.15 },
                   { t: 'person', x: 322, y: G - 96, s: 0.68, role: 'man', flip: true },
                   { t: 'ursus',  x: 80,  y: G, s: 1.05, pose: 'walk' },
                   { t: 'person', x: 196, y: G, s: 0.95, role: 'man', pose: 'sleep' }
                 ] },

    f14_odor:    { bg: 'forest', items: [
                   { t: 'person', x: 176, y: G, s: 1, role: 'man', pose: 'sleep' },
                   { t: 'ursus',  x: 128, y: G, s: 1.05, pose: 'eat' }
                 ] },

    /* the bear "speaks": the head is down at the man's ear and the words
       are in a small bubble. Nothing touches, nothing is hurt. */
    f14_dicit:   { bg: 'forest', items: [
                   { t: 'person', x: 176, y: G, s: 1, role: 'man', pose: 'sleep' },
                   { t: 'ursus',  x: 128, y: G, s: 1.05, pose: 'eat' }
                 ],
                 bubbles: [{ x: 268, y: 62, w: 96, h: 44, text: '🤝 ✗ 🚶', kind: 'speech', tail: 'left', fs: 16 }] },

    f14_discedit: { bg: 'forest', items: [
                   { t: 'person', x: 186, y: G, s: 1, role: 'man', pose: 'sleep' },
                   { t: 'ursus',  x: 62,  y: G, s: 0.95, pose: 'walk', flip: true }
                 ] },

    f14_descendit: { bg: 'forest', items: [
                   { t: 'tree',   x: 316, y: G, s: 1.15 },
                   { t: 'person', x: 254, y: G, s: 1, role: 'man', flip: true },
                   { t: 'person', x: 150, y: G, s: 1, role: 'man' }
                 ] },

    f14_rogat:   { bg: 'forest', items: [
                   { t: 'tree',   x: 316, y: G, s: 1.15 },
                   { t: 'person', x: 254, y: G, s: 1, role: 'man', pose: 'point', flip: true },
                   { t: 'person', x: 150, y: G, s: 1, role: 'man' }
                 ],
                 bubbles: [{ x: 202, y: 50, w: 76, h: 44, text: '🐻 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    f14_respondet: { bg: 'forest', items: [
                   { t: 'tree',   x: 316, y: G, s: 1.15 },
                   { t: 'person', x: 254, y: G, s: 1, role: 'man', flip: true },
                   { t: 'person', x: 150, y: G, s: 1, role: 'man', pose: 'point' }
                 ],
                 bubbles: [{ x: 206, y: 50, w: 96, h: 44, text: '🤝 ✗ 🚶', kind: 'speech', tail: 'left', fs: 16 }] },

    f14_solus:   { bg: 'forest', items: [
                   { t: 'person', x: 330, y: G, s: 0.95, role: 'man', pose: 'walk', flip: true },
                   { t: 'person', x: 148, y: G, s: 1, role: 'man' }
                 ],
                 bubbles: [{ x: 152, y: 58, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 19 }] },

    /* mōrāle: one man safe up the tree, one man on the ground; the ✓/✗
       says which of them is the amīcus */
    f14_moral:   { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.25 },
                   { t: 'person', x: 308, y: G - 104, s: 0.72, role: 'man', flip: true },
                   { t: 'person', x: 132, y: G, s: 1, role: 'man', pose: 'sleep' }
                 ],
                 bubbles: [{ x: 240, y: 44, w: 46, h: 34, text: '✗', kind: 'thought', tail: 'right', fs: 18 }] },

    /* ============ fable 15 — Equus et Asinus ============

       The `onus` load is drawn by the quadruped core itself
       (js/actors-props.js, `if (o.onus)`), which sits in the SHARED quad
       routine and not in the asinus row — so the same pack rides an
       equus, which is exactly what the last third of this fable needs
       and what makes the vocabulary card honest. */

    f15_equus:   { bg: 'plain', items: [
                   { t: 'bush',  x: 350, y: G },
                   { t: 'equus', x: 186, y: G, s: 1.1 }
                 ] },

    f15_asinus:  { bg: 'plain', items: [
                   { t: 'bush',   x: 50, y: G },
                   { t: 'asinus', x: 214, y: G, s: 1.1, flip: true }
                 ] },

    f15_dominus: { bg: 'plain', items: [
                   { t: 'person', x: 72,  y: G, s: 1, role: 'man' },
                   { t: 'equus',  x: 196, y: G, s: 1 },
                   { t: 'asinus', x: 322, y: G, s: 0.95 }
                 ] },

    f15_onus:    { bg: 'plain', items: [
                   { t: 'asinus', x: 200, y: G, s: 1.2, onus: true }
                 ] },

    f15_superbus: { bg: 'plain', items: [
                   { t: 'asinus', x: 96,  y: G, s: 1, onus: true },
                   { t: 'equus',  x: 268, y: G, s: 1.1, flip: true }
                 ],
                 bubbles: [{ x: 328, y: 58, w: 56, h: 40, text: '😤', kind: 'thought', tail: 'left', fs: 19 }] },

    f15_fessus:  { bg: 'plain', items: [
                   { t: 'asinus', x: 178, y: G, s: 1.1, onus: true }
                 ],
                 bubbles: [{ x: 306, y: 74, w: 56, h: 40, text: '😓', kind: 'thought', tail: 'left', fs: 19 }] },

    f15_tardus:  { bg: 'plain', items: [
                   { t: 'asinus', x: 108, y: G, s: 1.05, onus: true },
                   { t: 'equus',  x: 276, y: G, s: 1.05 }
                 ] },

    f15_rogat:   { bg: 'plain', items: [
                   { t: 'asinus', x: 104, y: G, s: 1.05, onus: true },
                   { t: 'equus',  x: 292, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 196, y: 52, w: 80, h: 44, text: '🤝 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    f15_respondet: { bg: 'plain', items: [
                   { t: 'asinus', x: 104, y: G, s: 1.05, onus: true },
                   { t: 'equus',  x: 292, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 200, y: 52, w: 88, h: 44, text: '📢 ✗', kind: 'speech', tail: 'left', fs: 17 }] },

    f15_rogat2:  { bg: 'plain', items: [
                   { t: 'asinus', x: 104, y: G, s: 1.05, onus: true },
                   { t: 'equus',  x: 292, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 196, y: 52, w: 84, h: 44, text: '❓ 🤝', kind: 'speech', tail: 'right', fs: 17 }] },

    f15_superbus2: { bg: 'plain', items: [
                   { t: 'asinus', x: 96,  y: G, s: 1, onus: true },
                   { t: 'equus',  x: 272, y: G, s: 1.1, flip: true }
                 ],
                 bubbles: [{ x: 332, y: 58, w: 56, h: 40, text: '😤', kind: 'thought', tail: 'left', fs: 19 }] },

    /* B-RATING: the ass goes DOWN under the load and the pack comes off
       beside him. He is lying, not injured; three pages later he is up
       and laetus. */
    f15_cadit:   { bg: 'plain', items: [
                   { t: 'asinus', x: 152, y: G, s: 1.1, pose: 'lie' },
                   { t: 'fascis', x: 250, y: G, s: 1.05 },
                   { t: 'equus',  x: 336, y: G, s: 1, flip: true }
                 ] },

    f15_venit:   { bg: 'plain', items: [
                   { t: 'person', x: 62,  y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'asinus', x: 178, y: G, s: 1.05, pose: 'lie' },
                   { t: 'fascis', x: 262, y: G, s: 1 },
                   { t: 'equus',  x: 340, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 118, y: 50, w: 68, h: 42, text: '❓ 📢', kind: 'speech', tail: 'right', fs: 17 }] },

    f15_iacet:   { bg: 'plain', items: [
                   { t: 'person', x: 78,  y: G, s: 1, role: 'man', pose: 'point' },
                   { t: 'asinus', x: 194, y: G, s: 1.05, pose: 'lie' },
                   { t: 'fascis', x: 274, y: G, s: 1 }
                 ] },

    f15_portas:  { bg: 'plain', items: [
                   { t: 'person', x: 88,  y: G, s: 1, role: 'man', pose: 'point' },
                   { t: 'fascis', x: 192, y: G, s: 1 },
                   { t: 'equus',  x: 300, y: G, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 196, y: 50, w: 84, h: 44, text: '📦 ➜ 🐎', kind: 'speech', tail: 'right', fs: 16 }] },

    f15_ponit:   { bg: 'plain', items: [
                   { t: 'person', x: 96,  y: G, s: 1, role: 'man' },
                   { t: 'equus',  x: 264, y: G, s: 1.1, onus: true, flip: true }
                 ] },

    f15_portat:  { bg: 'plain', items: [
                   { t: 'equus', x: 200, y: G, s: 1.15, onus: true }
                 ] },

    f15_fessus2: { bg: 'plain', items: [
                   { t: 'equus', x: 196, y: G, s: 1.15, onus: true }
                 ],
                 bubbles: [{ x: 330, y: 72, w: 56, h: 40, text: '😓', kind: 'thought', tail: 'left', fs: 19 }] },

    f15_laetus:  { bg: 'plain', items: [
                   { t: 'asinus', x: 180, y: G, s: 1.1 }
                 ],
                 bubbles: [{ x: 314, y: 74, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'left', fs: 19 }] },

    /* mōrāle: ONE load, and it is on the horse now */
    f15_moral:   { bg: 'plain', items: [
                   { t: 'asinus', x: 92,  y: G, s: 1 },
                   { t: 'equus',  x: 272, y: G, s: 1.1, onus: true, flip: true }
                 ] },

    /* ============ vocabulary mini-scenes ============ */

    /* pāstor ALONE — no flock. v_grex is the flock alone. The two cards
       must not share a picture or SONUS becomes a coin-flip
       (LATIN-STYLE §4, the discipline Regiōnēs III–IV set). */
    v_pastor:    { bg: 'mountain', items: [
                   { t: 'person', x: 268, y: G, s: 1.55, role: 'shepherd', flip: true }
                 ] },
    /* the flock against the DARK stone of the fold: white lambs on
       bgPlain's cream sky are the Regiō IV ciconia defect all over
       again, and this card is the one that gets shrunk to ~86 px */
    v_grex:      { bg: 'stabulum', items: [
                   { t: 'grex', x: 200, y: G, s: 2 }
                 ] },
    v_ridet:     { bg: 'mountain', items: [
                   { t: 'person', x: 262, y: G, s: 1.5, role: 'shepherd', flip: true }
                 ],
                 bubbles: [{ x: 96, y: 78, w: 62, h: 44, text: '😀', kind: 'thought', tail: 'right', fs: 21 }] },
    v_vir:       { bg: 'plain', items: [
                   { t: 'person', x: 138, y: G, s: 1.25, role: 'man' },
                   { t: 'person', x: 262, y: G, s: 1.2, role: 'man', flip: true }
                 ] },

    v_ursus:     { bg: 'forest', items: [{ t: 'ursus', x: 190, y: G, s: 1.5 }] },
    v_arbor:     { bg: 'plain', items: [{ t: 'tree', x: 200, y: G, s: 1.2 }] },
    v_silva:     { bg: 'forest', items: [
                   { t: 'tree', x: 120, y: G, s: 1.05 },
                   { t: 'tree', x: 282, y: G, s: 0.9 }
                 ] },
    v_ascendit:  { bg: 'forest', items: [
                   { t: 'tree',   x: 196, y: G, s: 1.3 },
                   { t: 'person', x: 204, y: G - 108, s: 0.75, role: 'man', flip: true }
                 ] },
    /* iacet on the OPEN ground, with no tree and no bear: the card has to
       teach the posture, not the scene it happens in. s 1.6, not the 1.3 the
       draft carried: a man lying down is a low horizontal shape, and at the
       86 px SONUS tile the 1.3 version covered 2.0 % of the tile — below
       every shipped card except Regiō I's `bibit`. 1.6 puts it at 2.9 %,
       inside the shipped band, without reaching the frame edges (the lying
       sprite is 77 units wide, so ±62 px around x 190). */
    v_iacet:     { bg: 'plain', items: [
                   { t: 'person', x: 190, y: G, s: 1.6, role: 'man', pose: 'sleep' }
                 ] },

    v_equus:     { bg: 'plain', items: [{ t: 'equus', x: 190, y: G, s: 1.4 }] },
    v_asinus:    { bg: 'plain', items: [{ t: 'asinus', x: 190, y: G, s: 1.45 }] },
    /* onus: TWO different beasts under the SAME pack, so the card teaches
       the load and not the animal (the device f6 used for `aureum` and
       f9 for `cornua`). Deliberately kept out of SONUS: it contains both
       of this capitulum's other nouns. */
    v_onus:      { bg: 'plain', items: [
                   { t: 'asinus', x: 104, y: G, s: 1, onus: true },
                   { t: 'equus',  x: 288, y: G, s: 1, onus: true, flip: true }
                 ] },
    v_fessus:    { bg: 'plain', items: [{ t: 'asinus', x: 176, y: G, s: 1.35, onus: true }],
                   bubbles: [{ x: 316, y: 84, w: 56, h: 40, text: '😓', kind: 'thought', tail: 'left', fs: 20 }] },
    v_dominus:   { bg: 'plain', items: [{ t: 'person', x: 190, y: G, s: 1.55, role: 'man' }] },
    v_portat:    { bg: 'plain', items: [{ t: 'asinus', x: 180, y: G, s: 1.35, onus: true, pose: 'walk' }] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 13 — Pāstor et Lupus ============
       THE VOCATIVE AND THE QUESTIONS. Deliberately light on new
       vocabulary — THREE content lexemes against a cap of eight —
       because the new thing here is a whole MOOD and a whole class of
       question word, and LATIN-STYLE §2 says a sentence that introduces
       new grammar uses known vocabulary. The saved budget buys the
       imperative for free: `venī/venīte`, `iuvā/iuvāte`, `currite` and
       `vidēte` are all built on verbs Regiōnēs I–II already taught, so
       the region's headline construction costs the ≤8 cap NOTHING.

       THE VOCATIVE IS TAUGHT ON A MARKED ENDING FIRST, exactly the way
       Regiō III built the genitive: `amīcus → amīce` and `equus → eque`
       (f15) carry the news, and the unmarked 3rd-declension `Ō pāstor!`
       is glossed beside them so the learner sees that the case exists
       even where the ending does not move. Regiō I f2 shipped `ō corve`
       already, so the pattern is not new to the ear. */
    {
      id: 'f13',
      titulus: 'Pāstor et Lupus',
      icon: '🐑🐺',
      numerus: 'XIII',
      pos: { x: 0.26, y: 0.87 },
      vocab: [
        { la: 'pāstor', scene: SC.v_pastor, pars: 'nomen' },
        { la: 'grex',   scene: SC.v_grex,   pars: 'nomen' },
        { la: 'vir',    scene: SC.v_vir,    pars: 'nomen' },
        { la: 'lupus',  emoji: '🐺',        pars: 'nomen' },
        { la: 'agnus',  emoji: '🐑',        pars: 'nomen' },
        { la: 'rīdet',  scene: SC.v_ridet,  pars: 'verbum' },
        { la: 'clāmat', emoji: '📢',        pars: 'verbum' },
        { la: 'timet',  emoji: '😨',        pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce grex! In grege multī agnī sunt.', scene: SC.f13_grex,
          nova: [{ w: 'grex', e: '🐑🐑🐑', g: 'ūnus agnus, multī agnī: grex' },
                 { w: 'grege', e: '🐑🐑', g: 'grex → in grege' }] },

        { la: 'Ecce pāstor! Pāstor gregem servat.', scene: SC.f13_pastor,
          nova: [{ w: 'pāstor', e: '👨🐑', g: 'pāstor gregem servat' },
                 { w: 'gregem', e: '🐑🐑', g: 'grex → gregem' }] },

        { la: 'Pāstor in monte habitat. Grex quoque in monte est.', scene: SC.f13_mons, nova: [] },

        { la: 'In silvā lupus habitat. Lupus agnōs cupit.', scene: SC.f13_lupus, nova: [] },

        { la: 'Agnī lupum timent. Pāstor quoque lupum timet.', scene: SC.f13_timent, nova: [] },

        /* THE FIRST IMPERATIVES. Both verbs are Regiō I/II words, so the
           only new thing on the page is the ENDING, which is what the
           morphology gloss shows. */
        { la: 'Pāstor clāmat: “Lupus! Lupus! Venīte, virī! Iuvāte!”', scene: SC.f13_clamat1,
          nova: [{ w: 'venīte', e: '👉🚶', g: 'vir venit → “Venī!” · virī veniunt → “Venīte!”' },
                 { w: 'iuvāte', e: '👉🤝', g: 'vir iuvat → “Iuvā!” · virī iuvant → “Iuvāte!”' }] },

        { la: 'Virī ex agrō currunt. Virī ad montem veniunt.', scene: SC.f13_veniunt, nova: [] },

        { la: 'Sed lupus nōn est! Grex tūtus est.', scene: SC.f13_nonest, nova: [] },

        { la: 'Pāstor rīdet. Pāstor nōn timet.', scene: SC.f13_ridet,
          nova: [{ w: 'rīdet', e: '😀', g: 'pāstor nōn trīstis est: pāstor laetus est' }] },

        /* THE VOCATIVE and the first question word, on one page, in one
           man's mouth. `ubi` is glossed by three places the learner has
           already lived in, which is the whole Ørberg device. */
        { la: 'Vir clāmat: “Ō pāstor! Ubi est lupus?”', scene: SC.f13_ubi,
          nova: [{ w: 'ō', e: '💬👤', g: 'vir pāstōrī dīcit: “Ō pāstor!”' },
                 { w: 'ubi', e: '📍❓', g: 'ubi? in monte, in silvā, in agrō' }] },

        { la: 'Pāstor rīdet: “Vidēte, virī! Lupus nōn est!”', scene: SC.f13_videte,
          nova: [{ w: 'vidēte', e: '👉👀', g: 'vir videt → “Vidē!” · virī vident → “Vidēte!”' }] },

        /* `ubi` a second time, in the mouths of the men who ran for nothing:
           the question word the capitulum exists to teach must not be a
           one-page word (LATIN-STYLE §2, recycled ≥3×). */
        { la: 'Virī īrātī sunt: “Ubi est lupus?” Virī ex monte discēdunt.',
          scene: SC.f13_irati, nova: [] },

        { la: 'Posteā pāstor iterum clāmat: “Lupus! Currite! Iuvāte!”', scene: SC.f13_iterum,
          nova: [{ w: 'currite', e: '👉🏃', g: 'vir currit → “Curre!” · virī currunt → “Currite!”' }] },

        { la: 'Virī iterum currunt. Sed lupus nōn est. Pāstor saepe rīdet.', scene: SC.f13_iterum2,
          nova: [{ w: 'saepe', e: '🔁', g: 'iterum et iterum: saepe' }] },

        /* THE 2nd PERSON, in quoted speech only — see the file header,
           ruling 1. The gloss derives it from the 3rd person the learner
           has read on nine pages of this capitulum alone. */
        { la: 'Vir clāmat: “Ō pāstor! Cūr semper clāmās?”', scene: SC.f13_cur,
          nova: [{ w: 'clāmās', e: '👤➡👤', g: 'pāstor clāmat → “Ō pāstor, clāmās!”' }] },

        { la: 'Sed ecce lupus! Lupus ex silvā ad gregem venit.', scene: SC.f13_verus, nova: [] },

        { la: 'Pāstor clāmat: “Lupus! Lupus! Venīte! Iuvāte!”', scene: SC.f13_clamat3, nova: [] },

        { la: 'Sed virī nōn veniunt. Virī pāstōrem nōn audiunt.', scene: SC.f13_nonveniunt, nova: [] },

        /* B-RATING (DESIGN §8): one clause, then the cut */
        { la: 'Agnī fugiunt. Lupus agnum capit.', scene: SC.f13_fugiunt, nova: [] },

        /* the question the empty picture answers: `ubi` third and last */
        { la: 'Iam lupus in silvā est. Ubi est grex? Grex in monte nōn est.',
          scene: SC.f13_vacuus, nova: [] },

        { la: 'Pāstor sōlus in monte stat. Pāstor sōlus et trīstis est.', scene: SC.f13_solus,
          nova: [{ w: 'sōlus', e: '1️⃣👤', g: 'ūnus pāstor est; virī nōn veniunt' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: pāstor saepe clāmat, sed virī iam nōn veniunt.',
          scene: SC.f13_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'pāstor', scene: SC.v_pastor },
          { la: 'grex',   scene: SC.v_grex },
          { la: 'lupus',  emoji: '🐺' },
          { la: 'agnus',  emoji: '🐑' },
          { la: 'haedus', emoji: '🐐' },
          { la: 'testūdō', emoji: '🐢' }
        ]
      },
      /* SONUS. The shared-picture rule (LATIN-STYLE §4, the discipline
         Regiōnēs III–IV set and this wave keeps):
           · `grex` and `agnus` are BOTH pictures of sheep and are never
             on the same board — a learner who hears one and taps the
             other has heard correctly and is punished for it;
           · `rīdet` is v_pastor with a 😀 bubble, so it is never offered
             against `pāstor`; it is out of SONUS entirely and recycled
             in CORRIGE and COMPLĒ;
           · `vir` is two men and `pāstor` is one man with a crook — a
             shepherd IS a man, so they never meet by ear either. */
      sonus: [
        { la: 'pāstor',
          answer: { la: 'pāstor', scene: SC.v_pastor },
          options: [{ la: 'pāstor', scene: SC.v_pastor },
                    { la: 'lupus', emoji: '🐺' },
                    { la: 'grex', scene: SC.v_grex }] },
        { la: 'lupus',
          answer: { la: 'lupus', emoji: '🐺' },
          options: [{ la: 'lupus', emoji: '🐺' },
                    { la: 'pāstor', scene: SC.v_pastor },
                    { la: 'grex', scene: SC.v_grex }] },
        { la: 'grex',
          answer: { la: 'grex', scene: SC.v_grex },
          options: [{ la: 'grex', scene: SC.v_grex },
                    { la: 'pāstor', scene: SC.v_pastor },
                    { la: 'lupus', emoji: '🐺' },
                    { la: 'clāmat', emoji: '📢' }] },
        { la: 'agnus',
          answer: { la: 'agnus', emoji: '🐑' },
          options: [{ la: 'agnus', emoji: '🐑' },
                    { la: 'lupus', emoji: '🐺' },
                    { la: 'pāstor', scene: SC.v_pastor }] }
      ],
      /* OVERRIDES. The generated set was read first and is unusable for
         this capitulum for one structural reason: content-loader.js
         SKIPS every page containing a quotation mark (README §6, "direct
         speech is skipped because a cloze inside quoted dialogue is
         usually ambiguous"), and in THIS region the target grammar lives
         nowhere else. A generated CORRIGE/COMPLĒ for f13 therefore
         cannot test one imperative, one vocative or one question — it
         tests the narrative frame around them.
         The hand set quotes the speech verbatim, where the ambiguity the
         generator fears does not exist because the author chose the gap.
         Target-grammar items: 4 of 6 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* six tiles, six different pictures. `rīdet` (a shepherd) and
             `agnus` (a sheep) are held out: each would put a second
             picture of something already on the board. Both are recycled
             below. */
          pairs: [
            { la: 'pāstor', scene: SC.v_pastor },
            { la: 'grex',   scene: SC.v_grex },
            { la: 'lupus',  emoji: '🐺' },
            { la: 'vir',    scene: SC.v_vir },
            { la: 'clāmat', emoji: '📢' },
            { la: 'timet',  emoji: '😨' }
          ],
          scrambles: [
            { la: 'Pāstor gregem servat.',                 scene: SC.f13_pastor },
            { la: 'Virī ex agrō currunt.',                 scene: SC.f13_veniunt },
            { la: 'Lupus ex silvā ad gregem venit.',       scene: SC.f13_verus },
            { la: 'Agnī lupum timent.',                    scene: SC.f13_timent }
          ]
        },
        corrige: [
          /* VOCATIVE: the three options are all real forms of pāstor, so
             only the case is being asked about */
          { words: ['Ō', 'pāstōrem!', 'Ubi', 'est', 'lupus?'], wrong: 1,
            options: ['pāstor!', 'pāstōris!', 'pāstōrī!'], correct: 0, scene: SC.f13_ubi },
          /* IMPERATIVE vs indicative, and plural vs singular */
          { words: ['Virī,', 'veniunt!', 'Iuvāte!'], wrong: 1,
            options: ['venīte!', 'venit!', 'venī!'], correct: 0, scene: SC.f13_clamat1 },
          /* QUESTION WORD: the answer is in the sentence's own second half */
          { words: ['Cūr', 'est', 'lupus?', 'Lupus', 'in', 'silvā', 'est.'], wrong: 0,
            options: ['Ubi', 'Quis', 'Quid'], correct: 0, scene: SC.f13_lupus },
          /* IMPERATIVE NUMBER: he is talking to two men, and the picture
             is what says so */
          { words: ['Vidē,', 'virī!', 'Lupus', 'nōn', 'est!'], wrong: 0,
            options: ['Vidēte,', 'Videt,', 'Vident,'], correct: 0, scene: SC.f13_videte },
          { words: ['Pāstor', 'currit.', 'Pāstor', 'nōn', 'timet.'], wrong: 1,
            options: ['rīdet.', 'clāmat.', 'venit.'], correct: 0, scene: SC.f13_ridet },
          { words: ['Lupus', 'gregem', 'servat.'], wrong: 0,
            options: ['Pāstor', 'Agnus', 'Grex'], correct: 0, scene: SC.f13_pastor }
        ],
        comple: [
          { text: 'Pāstor clāmat: “___, virī! Iuvāte!”',
            options: ['Venīte', 'Venit', 'Veniunt'], correct: 0, scene: SC.f13_clamat1 },
          { text: 'Vir clāmat: “Ō ___! Ubi est lupus?”',
            options: ['pāstor', 'pāstōrem', 'pāstōris'], correct: 0, scene: SC.f13_ubi },
          { text: 'Pāstor rīdet: “___, virī! Lupus nōn est!”',
            options: ['Vidēte', 'Videt', 'Vident'], correct: 0, scene: SC.f13_videte },
          { text: 'Vir clāmat: “Ō pāstor! ___ semper clāmās?”',
            options: ['Cūr', 'Ubi', 'Quis'], correct: 0, scene: SC.f13_cur },
          { text: '___ est lupus? Lupus in silvā est.',
            options: ['Ubi', 'Cūr', 'Quis'], correct: 0, scene: SC.f13_lupus },
          { text: 'Pāstor ___ in monte servat.',
            options: ['gregem', 'grex', 'grege'], correct: 0, scene: SC.f13_pastor }
        ]
      }
    },

    /* ============ FABLE 14 — Viātōrēs et Ursus ============
       THE IMPERATIVE SHOWCASE, and the region's hardest construction:
       the negative command. See the file header, ruling 2, for why the
       traveller says “Iacē! Nōlī currere!” and not “Nōlī tē movēre”.

       `viātor` gets NO vocabulary card on purpose. Every picture this
       art set can make of "traveller" is a picture of a man walking,
       which is already `vir` (f13) — the same reasoning that left
       `locus` cardless in Regiō IV f12. It is taught by a gloss that
       builds it out of two words the learner has (`virī ambulant et
       ambulant`), recycled four times, and never asked for by ear. */
    {
      id: 'f14',
      titulus: 'Viātōrēs et Ursus',
      icon: '🚶🐻',
      numerus: 'XIV',
      pos: { x: 0.71, y: 0.63 },
      vocab: [
        { la: 'ursus',    scene: SC.v_ursus,    pars: 'nomen' },
        { la: 'arbor',    scene: SC.v_arbor,    pars: 'nomen' },
        { la: 'silva',    scene: SC.v_silva,    pars: 'nomen' },
        { la: 'vir',      scene: SC.v_vir,      pars: 'nomen' },
        { la: 'amīcus',   emoji: '🤝',          pars: 'nomen' },
        { la: 'ascendit', scene: SC.v_ascendit, pars: 'verbum' },
        { la: 'iacet',    scene: SC.v_iacet,    pars: 'verbum' },
        { la: 'timet',    emoji: '😨',          pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce duo virī! Virī in silvā ambulant.', scene: SC.f14_viatores,
          nova: [{ w: 'duo', e: '2️⃣', g: 'ūnus, duo, multī' }] },

        { la: 'Virī viātōrēs sunt: viātōrēs semper ambulant.', scene: SC.f14_viatores,
          nova: [{ w: 'viātōrēs', e: '🚶🚶', g: 'virī ambulant et ambulant: viātōrēs sunt' }] },

        { la: 'Duo viātōrēs amīcī sunt.', scene: SC.f14_amici, nova: [] },

        { la: 'Sed ecce ursus! Ursus ex silvā venit.', scene: SC.f14_ursus,
          nova: [{ w: 'ursus', e: '🐻', g: 'ursus magnus est; ursus nōn lupus est' }] },

        { la: 'Viātōrēs ursum timent. Ursus magnus est.', scene: SC.f14_timent, nova: [] },

        { la: 'Ūnus viātor arborem videt. Viātor in arborem ascendit.', scene: SC.f14_ascendit,
          nova: [{ w: 'ascendit', e: '⬆🌳', g: 'viātor in arbore est; ursus sub arbore' }] },

        { la: 'Viātor in arbore tūtus est. Ursus in arborem nōn ascendit.', scene: SC.f14_ascendit, nova: [] },

        { la: 'Sed amīcus in arborem nōn ascendit. Amīcus timet.', scene: SC.f14_nonascendit, nova: [] },

        /* MARKED VOCATIVE, second declension: the ending moves, and the
           gloss shows exactly where. `iuvā` is the singular of the
           `iuvāte` f13 taught, so the imperative arrives twice-known. */
        { la: 'Amīcus clāmat: “Ō amīce! Iuvā!”', scene: SC.f14_clamat,
          nova: [{ w: 'amīce', e: '💬🤝', g: 'amīcus → “Ō amīce!”' },
                 { w: 'iuvā', e: '👉🤝', g: 'ūnus vir: “Iuvā!” · multī virī: “Iuvāte!”' }] },

        { la: 'Sed viātor in arbore amīcum nōn iuvat.', scene: SC.f14_noniuvat, nova: [] },

        /* THE NEGATIVE COMMAND, glossed by the positive one beside it */
        { la: 'Viātor clāmat: “Iacē! Nōlī currere!”', scene: SC.f14_iace,
          nova: [{ w: 'iacē', e: '👉⬇', g: 'vir iacet → “Iacē!”' },
                 { w: 'nōlī', e: '🚫👉', g: '“Curre!” ↔ “Nōlī currere!”' },
                 { w: 'currere', e: '🏃', g: 'vir currit → currere' }] },

        /* REFERENT: the man on the ground is the AMĪCUS — `viātor` is the
           one in the tree from p8 on, and he is the one who just shouted
           "Iacē!" (line audit). The two men are named apart on every page
           of this fable from here to the mōrāle. */
        { la: 'Amīcus in agrō iacet. Amīcus nōn currit, nōn clāmat.', scene: SC.f14_iacet,
          nova: [{ w: 'iacet', e: '⬇👤', g: 'nōn stat, nōn sedet: iacet' }] },

        { la: 'Ursus ad virum venit. Ursus virum videt et audit.', scene: SC.f14_odor, nova: [] },

        /* the bear "whispers". A speech bubble on an animal is what
           Regiō I's corvus and Regiō IV's lupus already do; the menace
           is entirely in the words. */
        { la: 'Ursus virō dīcit: “Nōlī cum malō amīcō ambulāre!”', scene: SC.f14_dicit,
          nova: [{ w: 'ambulāre', e: '🚶', g: 'vir ambulat → ambulāre' }] },

        { la: 'Posteā ursus in silvam ambulat. Vir tūtus est.', scene: SC.f14_discedit, nova: [] },

        /* `iacet` earns its third use here, and it is also the beat the
           fable needs: the man who played dead gets up. The picture
           (f14_descendit) has both men on their feet. */
        { la: 'Viātor ex arbore venit. Vir iam nōn iacet.',
          scene: SC.f14_descendit, nova: [] },

        { la: 'Viātor clāmat: “Quid ursus dīcit?”', scene: SC.f14_rogat,
          nova: [{ w: 'quid', e: '💬❓', g: '“Quid dīcit?” — “Nōlī cum malō amīcō ambulāre!”' }] },

        { la: 'Amīcus respondet: “Nōlī cum malō amīcō ambulāre!”', scene: SC.f14_respondet, nova: [] },

        { la: 'Amīcus discēdit. Viātor sōlus in silvā stat.', scene: SC.f14_solus, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: malus amīcus amīcum nōn iuvat.', scene: SC.f14_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'ursus',  scene: SC.v_ursus },
          { la: 'arbor',  scene: SC.v_arbor },
          { la: 'vir',    scene: SC.v_vir },
          { la: 'pāstor', scene: SC.v_pastor },
          { la: 'grex',   scene: SC.v_grex },
          { la: 'lupus',  emoji: '🐺' }
        ]
      },
      /* SONUS. `ascendit` is a man IN a tree and `silva` is trees, so
         neither is ever offered against `arbor`; `vir` is two men and
         `iacet` is one man, so those two never meet either. What is left
         is four cards that share nothing: a bear, a tree, a man on the
         ground, and a face. All four held-out words are recycled in
         CORRIGE and COMPLĒ, where the sentence disambiguates them. */
      sonus: [
        { la: 'ursus',
          answer: { la: 'ursus', scene: SC.v_ursus },
          options: [{ la: 'ursus', scene: SC.v_ursus },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'iacet', scene: SC.v_iacet }] },
        { la: 'arbor',
          answer: { la: 'arbor', scene: SC.v_arbor },
          options: [{ la: 'arbor', scene: SC.v_arbor },
                    { la: 'ursus', scene: SC.v_ursus },
                    { la: 'iacet', scene: SC.v_iacet }] },
        { la: 'iacet',
          answer: { la: 'iacet', scene: SC.v_iacet },
          options: [{ la: 'iacet', scene: SC.v_iacet },
                    { la: 'ursus', scene: SC.v_ursus },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'timet',
          answer: { la: 'timet', emoji: '😨' },
          options: [{ la: 'timet', emoji: '😨' },
                    { la: 'ursus', scene: SC.v_ursus },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'iacet', scene: SC.v_iacet }] }
      ],
      /* OVERRIDES. Same structural reason as f13 (the generator skips
         quoted pages, and the imperative lives only inside quotation
         marks), plus one fault of its own: the generated CORRIGE offered
         "Viātor in arbore iacet." against the tree page, and a man in a
         tree can perfectly well be lying along a branch — the picture
         does not refute it (LATIN-STYLE §4). The hand item uses the
         accusative `in arborem`, where the motion is the point and the
         picture decides.
         Target-grammar items: 3 of 6 in CORRIGE, 4 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* `silva` and `vir` are held out: trees are already on the
             board as `arbor`, and men are already on it twice
             (`ascendit`, `iacet`). Both recycled below. */
          pairs: [
            { la: 'ursus',    scene: SC.v_ursus },
            { la: 'arbor',    scene: SC.v_arbor },
            { la: 'ascendit', scene: SC.v_ascendit },
            { la: 'iacet',    scene: SC.v_iacet },
            { la: 'amīcus',   emoji: '🤝' },
            { la: 'timet',    emoji: '😨' }
          ],
          scrambles: [
            { la: 'Ursus ex silvā venit.',                  scene: SC.f14_ursus },
            { la: 'Viātor in arborem ascendit.',            scene: SC.f14_ascendit },
            { la: 'Amīcus in agrō iacet.',                  scene: SC.f14_iacet },
            { la: 'Ursus ad virum venit.',                  scene: SC.f14_odor }
          ]
        },
        corrige: [
          /* VOCATIVE: three real forms of amīcus, one case asked about */
          { words: ['Ō', 'amīcus!', 'Iuvā!'], wrong: 1,
            options: ['amīce!', 'amīcum!', 'amīcī!'], correct: 0, scene: SC.f14_clamat },
          /* NEGATIVE COMMAND: `nōlī` is the only word that can stand
             before an infinitive */
          { words: ['Iacē!', 'Cūr', 'currere!'], wrong: 1,
            options: ['Nōlī', 'Nōn', 'Iam'], correct: 0, scene: SC.f14_iace },
          /* QUESTION WORD: the bear said words, not a place */
          { words: ['Ubi', 'ursus', 'dīcit?'], wrong: 0,
            options: ['Quid', 'Cūr', 'Quis'], correct: 0, scene: SC.f14_rogat },
          { words: ['Viātor', 'in', 'arborem', 'iacet.'], wrong: 3,
            options: ['ascendit.', 'ambulat.', 'dormit.'], correct: 0, scene: SC.f14_ascendit },
          { words: ['Vir', 'in', 'agrō', 'currit.'], wrong: 3,
            options: ['iacet.', 'ascendit.', 'sedet.'], correct: 0, scene: SC.f14_iacet },
          { words: ['Viātōrēs', 'ursum', 'iuvant.'], wrong: 2,
            options: ['timent.', 'portant.', 'capiunt.'], correct: 0, scene: SC.f14_timent }
        ],
        comple: [
          { text: 'Amīcus clāmat: “Ō ___! Iuvā!”',
            options: ['amīce', 'amīcus', 'amīcum'], correct: 0, scene: SC.f14_clamat },
          { text: 'Viātor clāmat: “Iacē! ___ currere!”',
            options: ['Nōlī', 'Nōn', 'Cūr'], correct: 0, scene: SC.f14_iace },
          { text: 'Ursus dīcit: “Nōlī cum malō amīcō ___!”',
            options: ['ambulāre', 'ambulat', 'ambulant'], correct: 0, scene: SC.f14_dicit },
          { text: 'Viātor clāmat: “___ ursus dīcit?”',
            options: ['Quid', 'Ubi', 'Cūr'], correct: 0, scene: SC.f14_rogat },
          { text: 'Viātor in arbor___ ascendit.',
            options: ['em', 'e', 'ēs'], correct: 0, scene: SC.f14_ascendit },
          { text: 'Viātor in agrō ___. Viātor nōn currit.',
            options: ['iacet', 'ascendit', 'currit'], correct: 0, scene: SC.f14_iacet }
        ]
      }
    },

    /* ============ FABLE 15 — Equus et Asinus ============
       THE QUESTIONS, on a page where somebody actually wants an answer.
       `cūr`, `ubi`, `quid` and the enclitic `-ne` all appear in the two
       animals' mouths, and every one of them is answered by the picture
       or by the next line, never by a trick (LATIN-STYLE §2).

       This is also where the 2nd person earns its keep: “Cūr nōn iuvās?”
       is the fable, and the master's “Iam onus portās!” is the ending.
       See the file header, ruling 1. */
    {
      id: 'f15',
      titulus: 'Equus et Asinus',
      icon: '🐎📦',
      numerus: 'XV',
      pos: { x: 0.24, y: 0.40 },
      vocab: [
        { la: 'equus',    scene: SC.v_equus,   pars: 'nomen' },
        { la: 'asinus',   scene: SC.v_asinus,  pars: 'nomen' },
        { la: 'onus',     scene: SC.v_onus,    pars: 'nomen' },
        { la: 'dominus',  scene: SC.v_dominus, pars: 'nomen' },
        { la: 'fessus',   scene: SC.v_fessus,  pars: 'adiectivum' },
        { la: 'superbus', emoji: '😤',         pars: 'adiectivum' },
        { la: 'portat',   scene: SC.v_portat,  pars: 'verbum' },
        { la: 'cadit',    emoji: '⬇️',         pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce equus! Equus magnus et pulcher est.', scene: SC.f15_equus,
          nova: [{ w: 'equus', e: '🐎', g: 'equus celer est' }] },

        { la: 'Ecce asinus! Asinus parvus est.', scene: SC.f15_asinus,
          /* NO DONKEY EMOJI: 🫏 (U+1FACF) renders as tofu in the fonts this
             app can count on — measured, not assumed. The contrastive pair
             `🐎 ✗` is the device Regiō II f4 used for parvus, and the ass
             himself is drawn by the scene above. */
          nova: [{ w: 'asinus', e: '🐎 ✗', g: 'asinus nōn equus est: asinus parvus et tardus est' }] },

        { la: 'Dominus equum et asinum habet.', scene: SC.f15_dominus,
          nova: [{ w: 'dominus', e: '👨', g: 'equus et asinus dominī sunt' }] },

        { la: 'Asinus onus portat. Onus magnum est.', scene: SC.f15_onus,
          nova: [{ w: 'onus', e: '📦', g: 'asinus onus portat: onus in asinō est' }] },

        { la: 'Equus onus nōn portat. Equus superbus est.', scene: SC.f15_superbus, nova: [] },

        { la: 'Onus magnum est. Asinus fessus est.', scene: SC.f15_fessus,
          nova: [{ w: 'fessus', e: '😓', g: 'asinus onus portat et portat: fessus est' }] },

        { la: 'Asinus tardus ambulat. Equus celer ambulat.', scene: SC.f15_tardus, nova: [] },

        /* MARKED VOCATIVE (equus → eque) and the enclitic -ne, both on a
           page where the ass is plainly asking for something */
        { la: 'Asinus clāmat: “Ō eque! Iuvāsne? Onus magnum est!”', scene: SC.f15_rogat,
          nova: [{ w: 'eque', e: '💬🐎', g: 'equus → “Ō eque!”' },
                 { w: 'iuvāsne', e: '🤝❓', g: '“Iuvās.” ↔ “Iuvāsne?”' },
                 { w: 'iuvās', e: '👤➡👤', g: 'equus iuvat → “Ō eque, iuvās!”' }] },

        { la: 'Equus respondet: “Nōlī clāmāre! Onus tuum est.”', scene: SC.f15_respondet,
          nova: [{ w: 'clāmāre', e: '📢', g: 'equus clāmat → clāmāre' },
                 { w: 'tuum', e: '👉📦', g: 'onus asinī est, nōn equī' }] },

        { la: 'Asinus iterum clāmat: “Ō eque! Cūr nōn iuvās?”', scene: SC.f15_rogat2, nova: [] },

        { la: 'Equus nōn respondet. Equus superbus est.', scene: SC.f15_superbus2, nova: [] },

        /* B-RATING: he goes down under the load, and the load comes off */
        { la: 'Asinus fessus cadit. Onus in agrō iacet.', scene: SC.f15_cadit, nova: [] },

        { la: 'Dominus venit. Dominus clāmat: “Quid est? Ubi est asinus?”', scene: SC.f15_venit, nova: [] },

        { la: 'Dominus asinum videt. Asinus in agrō iacet.', scene: SC.f15_iacet, nova: [] },

        { la: 'Dominus equō dīcit: “Ō eque! Iam onus portās!”', scene: SC.f15_portas,
          nova: [{ w: 'portās', e: '👤➡🐎', g: 'equus portat → “Ō eque, portās!”' }] },

        { la: 'Dominus onus in equō pōnit.', scene: SC.f15_ponit, nova: [] },

        { la: 'Iam equus onus portat. Onus magnum est.', scene: SC.f15_portat, nova: [] },

        { la: 'Equus fessus est. Equus iam nōn superbus est.', scene: SC.f15_fessus2, nova: [] },

        { la: 'Asinus iam onus nōn portat. Asinus laetus est.', scene: SC.f15_laetus, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: equus asinum nōn iuvat; iam onus portat.', scene: SC.f15_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'equus',   scene: SC.v_equus },
          { la: 'asinus',  scene: SC.v_asinus },
          { la: 'onus',    scene: SC.v_onus },
          { la: 'dominus', scene: SC.v_dominus },
          { la: 'ursus',   scene: SC.v_ursus },
          { la: 'grex',    scene: SC.v_grex }
        ]
      },
      /* SONUS. `onus`, `fessus` and `portat` are ALL pictures of a horse
         or an ass — v_onus carries both — so none of them is ever
         offered against `equus` or `asinus`; all three are recycled in
         CORRIGE and COMPLĒ. `cadit` carries a ⬇️, which is a symbol and
         not a picture, so it stays out of the listening step too (the
         same test js/boss-phases.js applies to a clāmor gap). */
      sonus: [
        { la: 'equus',
          answer: { la: 'equus', scene: SC.v_equus },
          options: [{ la: 'equus', scene: SC.v_equus },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'dominus', scene: SC.v_dominus }] },
        { la: 'asinus',
          answer: { la: 'asinus', scene: SC.v_asinus },
          options: [{ la: 'asinus', scene: SC.v_asinus },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'dominus', scene: SC.v_dominus }] },
        { la: 'dominus',
          answer: { la: 'dominus', scene: SC.v_dominus },
          options: [{ la: 'dominus', scene: SC.v_dominus },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'asinus', scene: SC.v_asinus }] },
        { la: 'superbus',
          answer: { la: 'superbus', emoji: '😤' },
          options: [{ la: 'superbus', emoji: '😤' },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'dominus', scene: SC.v_dominus }] }
      ],
      /* OVERRIDES. The generated set never asks a question, for the
         structural reason given under f13, and it also offered the
         adjective `Fessus` as a subject twice. The hand set puts all
         five S5 question devices in front of the learner: the vocative,
         `cūr`, `ubi`, the enclitic `-ne` and `nōlī` + īnfīnītīvus, plus
         the 2nd person that answers them.
         Target-grammar items: 5 of 6 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* `fessus` and `portat` are held out: each is one more picture
             of an ass, and v_onus (which is on the board) already carries
             both animals under one pack. */
          pairs: [
            { la: 'equus',    scene: SC.v_equus },
            { la: 'asinus',   scene: SC.v_asinus },
            { la: 'dominus',  scene: SC.v_dominus },
            { la: 'onus',     scene: SC.v_onus },
            { la: 'superbus', emoji: '😤' },
            { la: 'cadit',    emoji: '⬇️' }
          ],
          scrambles: [
            { la: 'Asinus onus portat.',            scene: SC.f15_onus },
            { la: 'Dominus equum et asinum habet.', scene: SC.f15_dominus },
            { la: 'Asinus fessus cadit.',           scene: SC.f15_cadit },
            { la: 'Dominus onus in equō pōnit.',    scene: SC.f15_ponit }
          ]
        },
        corrige: [
          /* VOCATIVE */
          { words: ['Ō', 'equus!', 'Cūr', 'nōn', 'iuvās?'], wrong: 1,
            options: ['eque!', 'equum!', 'equī!'], correct: 0, scene: SC.f15_rogat2 },
          /* QUESTION WORD: he is not asking where, he is asking why */
          { words: ['Ō', 'eque!', 'Ubi', 'nōn', 'iuvās?'], wrong: 2,
            options: ['Cūr', 'Quis', 'Quid'], correct: 0, scene: SC.f15_rogat2 },
          /* NEGATIVE COMMAND */
          { words: ['Equus', 'respondet:', 'Nōn', 'clāmāre!'], wrong: 2,
            options: ['Nōlī', 'Iam', 'Quis'], correct: 0, scene: SC.f15_respondet },
          /* SECOND PERSON: the master is speaking TO the horse */
          { words: ['Dominus', 'dīcit:', 'Iam', 'onus', 'portat!'], wrong: 4,
            options: ['portās!', 'portāte!', 'portant!'], correct: 0, scene: SC.f15_portas },
          /* THE ENCLITIC -ne: the picture's bubble is a question */
          { words: ['Ō', 'eque!', 'Iuvās.', 'Onus', 'magnum', 'est!'], wrong: 2,
            options: ['Iuvāsne?', 'Iuvāte!', 'Iuvat.'], correct: 0, scene: SC.f15_rogat },
          { words: ['Asinus', 'onus', 'portat.'], wrong: 0,
            options: ['Equus', 'Dominus', 'Onus'], correct: 0, scene: SC.f15_portat }
        ],
        comple: [
          { text: 'Asinus clāmat: “Ō ___! Cūr nōn iuvās?”',
            options: ['eque', 'equus', 'equum'], correct: 0, scene: SC.f15_rogat2 },
          { text: 'Asinus clāmat: “Ō eque! ___ nōn iuvās?”',
            options: ['Cūr', 'Ubi', 'Quis'], correct: 0, scene: SC.f15_rogat2 },
          { text: 'Dominus clāmat: “Quid est? ___ est asinus?”',
            options: ['Ubi', 'Cūr', 'Quis'], correct: 0, scene: SC.f15_venit },
          { text: 'Equus respondet: “___ clāmāre! Onus tuum est.”',
            options: ['Nōlī', 'Nōn', 'Cūr'], correct: 0, scene: SC.f15_respondet },
          { text: 'Dominus dīcit: “Ō eque! Iam onus ___!”',
            options: ['portās', 'portat', 'portant'], correct: 0, scene: SC.f15_portas },
          { text: 'Asinus fessus ___. Onus in agrō iacet.',
            options: ['cadit', 'portat', 'currit'], correct: 0, scene: SC.f15_cadit }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r05',
    titulus: 'Via',
    ladder: 'S5',                 /* CURRICULUM §0: imperative · vocative · questions */
    progressId: 'r05',
    capitula: capitula,
    boss: {
      id: 'b_r05',
      progressId: 'r05',
      /* THE WOLF RETURNS. CURRICULUM §1 gives the same Lupus the bosses
         of R1, R5, R9 and the R12 finale. Regiō IV f12 was his cameo and
         he left on a promise — “Haedus nōn semper in mūrō stat.” — and
         Regiō V f13 is where he keeps it: he takes an agnus off-page and
         then waits here. This is his SECOND duel, so it is deliberately
         harder than r01's. */
      name: 'Lupus',
      actor: 'wolf',
      vinceText: 'Lupum vince!',
      /* LEGACY single-phase tuning, kept for the two reasons every
         earlier region keeps it: server/lib/rules.php derives
         rule_boss_min_ms from these numbers, and a client without
         js/boss-phases.js must still be able to run the fight. */
      hp: 8,
      seconds: 50,
      pos: { x: 0.67, y: 0.16 },
      /* RAISED DIFFICULTY, and the only honest lever for it.
         Everything else the phase engine tunes — spawn rate, fall speed,
         the number of tiles on screen — already scales off regionIndex
         (DESIGN §6, js/boss-phases.js), so r05 is automatically faster
         than r01 without a single number here. What content controls is
         LENGTH: total hp 8 instead of the 6 that r01–r04 all share, and
         72 phase-seconds instead of 70. Two extra hits, one of them in
         clāmor, which is where this region's syntax actually lives.
         FLAGGED FOR THE INTEGRATOR: rule_boss_min_ms('r05') should stay
         at the 15000 that the duel regions already use — a longer fight
         cannot be forged FASTER, so the floor does not move. */
      phases: [
        { type: 'caterva', hp: 3, seconds: 24 },
        { type: 'clamor',  hp: 3, seconds: 28 },
        { type: 'fuga',    hp: 2, seconds: 20 }
      ],
      /* HAND-AUTHORED CLĀMOR (AUTHORING-BRIEF, binding from wave 3).
         Five items. Every gap is a picturable content lexeme with a
         vocabulary card in this region; every option is the same part of
         speech as the gap; every distractor is a thing that is plainly
         NOT in the pictured scene, so a learner who has read the Latin
         and looked at the picture cannot be punished for either.
         Every gap's neighbours were checked against this region's own
         story bigrams so no distractor sits where the region's Latin
         actually puts it (the check js/boss-phases.js runs on us). */
      clamor: [
        /* THE GAP STANDS WHERE THE DICTIONARY FORM STANDS. The catchable
           tile is a picture with the word's CITATION form behind it, so a
           gap that wants `gregem` would be answered by a card the learner
           knows as `grex` — the shape the deriver enforces on itself
           (js/boss-phases.js: "in exactly its dictionary form") and the
           shape Historia l4's authored sententiae keep. Every gap below is
           a nominative (or a neuter whose accusative IS the nominative). */
        { text: 'In monte ____ est.',
          answer: 'grex', options: ['grex', 'lupus', 'ursus'],
          scene: SC.f13_pastor },
        { text: '____ ex silvā venit et agnum capit.',
          answer: 'lupus', options: ['lupus', 'pāstor', 'asinus'],
          scene: SC.f13_verus },
        { text: 'Viātor in arborem ____.',
          answer: 'ascendit', options: ['ascendit', 'iacet', 'rīdet'],
          scene: SC.f14_ascendit },
        { text: 'Asinus ____ portat.',
          answer: 'onus', options: ['onus', 'arbor', 'pāstor'],
          scene: SC.f15_onus },
        { text: 'Asinus fessus in agrō ____.',
          answer: 'iacet', options: ['iacet', 'ascendit', 'rīdet'],
          scene: SC.f15_cadit }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum, which is what
         app.js's bossWords() needs to resolve it. All three capitula are
         represented. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'pāstor', from: 'f13' },
        { la: 'grex',   from: 'f13' },
        { la: 'ursus',  from: 'f14' },
        { la: 'equus',  from: 'f15' },
        { la: 'asinus', from: 'f15' }
      ]
    }
  });
})();
