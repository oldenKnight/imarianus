/* ============================================================
   content/fabulae-r10.js — FĀBULAE · Regiō X · PORTUS  (ladder S10)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō IX:
     f28 Aquila et Vulpēs          — the PASSIVE, taught on known verbs
     f29 Formīca et Columba        — the passive again, + the PERFECT passive
     f30 Asinus in Pelle Leōnis    — the passive as "is seen as", + deponents

   STAGE CEILING (CURRICULUM §0 S10, binding):
     everything S1–S9 (all five cases and the 4th/5th declensions ·
     3rd-person present of ANY conjugation, AUTHORING-BRIEF ruling 1 ·
     the six prepositions · imperative · vocative · questions · nōlī +
     īnfīnītīvus · the 2nd person present indicative INSIDE DIRECT
     SPEECH, Regiō V's ruling · the imperfect · is/hic/ille · the
     perfect · comparatives and adverbs · relative clauses) PLUS the
     PASSIVE VOICE and the common deponents loquitur / sequitur.
     STILL FORBIDDEN and avoided throughout: the subjunctive (S11) and
     accusative + īnfīnītīvus, ablative absolute, gerundive (S12).

   ------------------------------------------------------------
   FIVE RULINGS TAKEN IN THIS REGION, all recorded because Regiō XI and
   Regiō XII stand on them.

   1. THE PASSIVE IS TAUGHT THE WAY REGIŌ VI TAUGHT THE IMPERFECT: on
      ONE known verb at a time, with the ACTIVE standing beside it in
      the same picture and the same gloss.

          aquila videt   →  vulpēs ab aquilā vidētur
          aquila capit   →  catulus ab aquilā capitur
          aquila portat  →  catulus ad nīdum portātur
          aquila reddit  →  catulus vulpī redditur
          vōx dētegit    →  asinus vōce dētegitur

      NO NEW VERB IS EVER INTRODUCED IN THE PASSIVE. Every passive in
      this region is built on a verb Regiōnēs I–VI already taught with a
      picture (videt, capit, portat, servat, dat/reddit, frangit is the
      one exception and is introduced ACTIVE first, in a learner's
      question, one page before its passive). LATIN-STYLE §2: a sentence
      that introduces new grammar uses known vocabulary.

   2. THE AGENT (ā / ab + ablative) IS PART OF THE LESSON, NOT A SIDE
      EFFECT. `ab` and `ā` are Regiō IV prepositions the learner reads as
      "away from"; the AGENT sense is new, so it is glossed at first use
      with a pointing device (`quis videt? aquila: “ab aquilā”`) and then
      used eleven times across the region, always with an animal the
      picture shows. It is never left to be guessed.

   3. THE NARRATIVE TENSE STAYS THE PRESENT. CURRICULUM §0 opens the
      perfect at S7 and Regiō VII is where a learner meets it; but the
      whole FĀBULAE track has told its stories in the narrative present
      since Regiō I, and the genre wants it (a fable is not a report).
      So the perfect appears here exactly ONCE, where the fable's own
      logic wants a completed act — f29's `columba ā formīcā servāta
      est` — and it is glossed against the present passive beside it.
      That single pair is the region's deepest sentence and the shape
      Regiō XII will build indirect statement on.

   4. THE DEPONENTS ARE RECEPTIVE ONLY, AND THEY ARE GLOSSED AS
      SYNONYMS OF VERBS THE LEARNER HAS. `loquitur` is glossed
      `dīcit = loquitur` and never asked for in an exercise that
      requires producing it; `sequitur` is glossed off a picture of one
      animal walking behind another. Neither is ever contrasted with a
      "real" passive: a learner who reads `loquitur` as a passive still
      reads the sentence correctly, which is precisely why these two are
      the deponents CURRICULUM names.

   5. B-RATING (DESIGN §8) — TWO SOFTENINGS, BOTH FLAGGED FOR THE
      LINE AUDIT.
      · f28: in the classical fable the eagle's chicks eat the cub, and
        the ember roasts them in the nest. NEITHER IS TOLD HERE. The
        eagle takes the cub to the nest and keeps it there; the fire
        that comes up with the stolen meat THREATENS the nest and the
        eagle gives the cub back to save it. Nothing is eaten, nothing
        burns, and the fable's actual lesson — a friendship broken is a
        friendship that stops protecting you — is what the mōrāle says.
      · f30: Aesop's ass is beaten by his master at the end. Here he is
        merely found out, and the animals — and the ass — laugh. The
        mockery IS the punishment, which is what the fable is about.

   ------------------------------------------------------------
   MISSING ART, REPORTED AND NOT WORKED AROUND (third time — Regiō IV
   and Regiō V filed the same kind of report about `via`): the region is
   called PORTUS and the word `portus` is taught NOWHERE in it. There is
   a `ship` prop and a `sea` background, but none of the three fables
   CURRICULUM §1 gives this region goes anywhere near the water, and
   teaching a harbour would mean either an eighth scene that no page
   needs or a fable rewritten to reach it. LATIN-STYLE §5 forbids
   approximating; the map header carries the name, the content does not.

   PROGRESS IDS ARE FROZEN once shipped: f28/f29/f30 and progressId
   'r10' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ----------

     THE NEST IN THE TREE (the region's one piece of new staging, worked
     out against js/scenes.js `tree` and js/actors-props.js `nidus`):
     the tree's canopy occupies y = G−94 … G−189 at s 1.15, so a nest
     placed at y = G−104 (occupying y 81…116 in scene coordinates) sits
     INSIDE the leaves. The nest is drawn AFTER whatever is in it — the
     eagle at y = G−112, the cub at y = G−104, s 0.5 — so the woven front
     rim paints over their legs and only what should be above the rim
     shows. This is Regiō VI's `puteus` trick (f18: the animal drawn
     before the well) turned upside down, and it costs no new art.

     CAMOUFLAGE, re-checked at SONUS tile size (~86 px), the discipline
     Regiōnēs IV–VI set: `aquila` is #7a4a26 on bgPlain's cream sky — it
     reads. `columba` is #fbf6ea, WHITE, and is the Regiō V `grex`
     defect exactly: a white bird on a cream sky vanishes when the card
     is shrunk. Every columba card and every columba that has to be
     recognised therefore stands against the LEAVES of bgForest or the
     rock of bgMountain, never against open sky. `pellis` carries its own
     darker edge stroke (actors-props.js says so in its own comment), so
     the lion hide needs no help. */

  var SC = {

    /* ============ fable 28 — Aquila et Vulpēs ============ */

    /* p1: the tree, the nest in it, the eagle on it. The eagle is drawn
       BEFORE the nest so the nest's front rim covers her feet. */
    f28_aquila:  { bg: 'plain', items: [
                   { t: 'tree',   x: 288, y: G, s: 1.15 },
                   { t: 'aquila', x: 292, y: G - 112, s: 0.85 },
                   { t: 'nidus',  x: 292, y: G - 104, s: 0.8, ova: 2 }
                 ] },

    /* p2: the same nest, closer to the middle of the frame and without
       the bird, so the two eggs are what the page is about */
    f28_ova:     { bg: 'plain', items: [
                   { t: 'tree',  x: 236, y: G, s: 1.15 },
                   { t: 'nidus', x: 240, y: G - 104, s: 1.05, ova: 2 }
                 ] },

    f28_vulpes:  { bg: 'plain', items: [
                   { t: 'tree', x: 288, y: G, s: 1.15 },
                   { t: 'fox',  x: 150, y: G, s: 1 }
                 ] },

    /* catulus: the SAME animal twice, big and small, in one frame — the
       contrastive device Regiō II f4 used for `parvus`. The size does
       the teaching, so the word never has to be translated. */
    f28_catulus: { bg: 'plain', items: [
                   { t: 'tree', x: 316, y: G, s: 1.1 },
                   { t: 'fox',  x: 132, y: G, s: 1.05 },
                   { t: 'fox',  x: 218, y: G, s: 0.5 }
                 ] },

    f28_amici:   { bg: 'plain', items: [
                   { t: 'aquila', x: 268, y: G, s: 1.05, flip: true },
                   { t: 'fox',    x: 138, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 202, y: 58, w: 56, h: 40, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    f28_videt:   { bg: 'plain', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.15 },
                   { t: 'aquila', x: 304, y: G - 112, s: 0.85 },
                   { t: 'nidus',  x: 304, y: G - 104, s: 0.8, ova: 2 },
                   { t: 'fox',    x: 132, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 214, y: 66, w: 56, h: 40, text: '👀', kind: 'thought', tail: 'right', fs: 19 }] },

    f28_esurit:  { bg: 'plain', items: [
                   { t: 'tree',   x: 306, y: G, s: 1.15 },
                   { t: 'aquila', x: 310, y: G - 112, s: 0.85 },
                   { t: 'nidus',  x: 310, y: G - 104, s: 0.8, ova: 2 },
                   { t: 'fox',    x: 120, y: G, s: 1 },
                   { t: 'fox',    x: 196, y: G, s: 0.5 }
                 ] },

    /* the taking. The eagle is in the air (pose 'fly') and the cub is on
       the ground under her: nothing touches, and the next page's picture
       is the cub sitting unhurt in the nest. */
    f28_capit:   { bg: 'plain', items: [
                   { t: 'tree',   x: 320, y: G, s: 1.1 },
                   { t: 'aquila', x: 168, y: G - 62, s: 1, pose: 'fly' },
                   { t: 'fox',    x: 120, y: G, s: 1.05 },
                   { t: 'fox',    x: 196, y: G, s: 0.5 }
                 ] },

    /* the cub IN the nest: drawn before the nest, so the rim covers its
       body and only the head and ears show over the straw */
    f28_innido:  { bg: 'plain', items: [
                   { t: 'tree',  x: 240, y: G, s: 1.15 },
                   { t: 'fox',   x: 238, y: G - 116, s: 0.6 },
                   { t: 'nidus', x: 244, y: G - 104, s: 1.05, ova: 0 }
                 ] },

    f28_quaerit: { bg: 'plain', items: [
                   { t: 'tree', x: 300, y: G, s: 1.15 },
                   { t: 'fox',  x: 140, y: G, s: 1.05, pose: 'walk' }
                 ],
                 bubbles: [{ x: 216, y: 62, w: 62, h: 42, text: '🦊 ❓', kind: 'thought', tail: 'right', fs: 17 }] },

    /* fox pose 'sad': the tail comes down. The whole page is that tail. */
    f28_tristis: { bg: 'plain', items: [
                   { t: 'tree', x: 300, y: G, s: 1.15 },
                   { t: 'fox',  x: 146, y: G, s: 1.05, pose: 'sad' }
                 ],
                 bubbles: [{ x: 150, y: 60, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 19 }] },

    f28_clamat:  { bg: 'plain', items: [
                   { t: 'tree',   x: 306, y: G, s: 1.15 },
                   { t: 'fox',    x: 304, y: G - 114, s: 0.5 },
                   { t: 'nidus',  x: 310, y: G - 104, s: 0.8, ova: 0 },
                   { t: 'fox',    x: 128, y: G, s: 1.05, pose: 'sad' }
                 ],
                 bubbles: [{ x: 176, y: 52, w: 84, h: 44, text: '🦊 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    f28_respondet: { bg: 'plain', items: [
                   { t: 'tree',   x: 306, y: G, s: 1.15 },
                   { t: 'aquila', x: 310, y: G - 112, s: 0.85 },
                   { t: 'nidus',  x: 310, y: G - 104, s: 0.8, ova: 2 },
                   { t: 'fox',    x: 128, y: G, s: 1.05, pose: 'sad' }
                 ],
                 bubbles: [{ x: 208, y: 46, w: 80, h: 42, text: '🦅 ⬆', kind: 'speech', tail: 'left', fs: 17 }] },

    /* she cannot climb: the fox at the foot of the trunk, looking up */
    f28_ascendit: { bg: 'plain', items: [
                   { t: 'tree', x: 250, y: G, s: 1.15 },
                   { t: 'fox',  x: 196, y: G, s: 1.05 }
                 ],
                 bubbles: [{ x: 128, y: 88, w: 62, h: 42, text: '⬆ ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    /* the broken friendship: the two of them in one frame and as far
       apart as the frame allows, with the 🤝 of f28_amici crossed out */
    f28_frangitur: { bg: 'plain', items: [
                   { t: 'tree',   x: 330, y: G, s: 1.1 },
                   { t: 'aquila', x: 334, y: G - 108, s: 0.8 },
                   { t: 'nidus',  x: 334, y: G - 100, s: 0.75, ova: 2 },
                   { t: 'fox',    x: 78,  y: G, s: 1, pose: 'sad' }
                 ],
                 bubbles: [{ x: 194, y: 62, w: 62, h: 42, text: '💔', kind: 'thought', tail: 'right', fs: 19 }] },

    f28_ara:     { bg: 'plain', items: [
                   { t: 'altar',  x: 214, y: G, s: 1.1 },
                   { t: 'person', x: 100, y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'person', x: 320, y: G, s: 0.95, role: 'man', flip: true }
                 ] },

    f28_ignis:   { bg: 'plain', items: [
                   { t: 'altar',  x: 200, y: G, s: 1.25, smoke: true },
                   { t: 'person', x: 96,  y: G, s: 1, role: 'man', pose: 'point' }
                 ] },

    f28_rapit:   { bg: 'plain', items: [
                   { t: 'altar',  x: 190, y: G, s: 1.2, smoke: true },
                   { t: 'aquila', x: 292, y: G - 74, s: 1, pose: 'fly', flip: true }
                 ] },

    /* the fire ARRIVES in the tree. The nest still holds its eggs and
       the eagle is beside it; the flame is small and on the branch, not
       on the bird (DESIGN §8: light, never a body). */
    f28_periculum: { bg: 'plain', items: [
                   { t: 'tree',   x: 250, y: G, s: 1.15 },
                   { t: 'aquila', x: 254, y: G - 112, s: 0.85 },
                   { t: 'nidus',  x: 254, y: G - 104, s: 0.9, ova: 2 },
                   { t: 'fire',   x: 190, y: G - 96, s: 0.6, sparks: false }
                 ],
                 bubbles: [{ x: 330, y: 66, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'left', fs: 19 }] },

    f28_volat:   { bg: 'plain', items: [
                   { t: 'tree',   x: 320, y: G, s: 1.15 },
                   { t: 'fire',   x: 292, y: G - 96, s: 0.55, sparks: false },
                   { t: 'aquila', x: 168, y: G - 66, s: 1, pose: 'fly', flip: true },
                   { t: 'fox',    x: 92,  y: G, s: 1 }
                 ] },

    f28_reddit:  { bg: 'plain', items: [
                   { t: 'aquila', x: 276, y: G, s: 1, flip: true },
                   { t: 'fox',    x: 142, y: G, s: 1.05 },
                   { t: 'fox',    x: 208, y: G, s: 0.5, flip: true }
                 ] },

    f28_laeta:   { bg: 'plain', items: [
                   { t: 'aquila', x: 288, y: G, s: 1, flip: true },
                   { t: 'fox',    x: 130, y: G, s: 1.05 },
                   { t: 'fox',    x: 194, y: G, s: 0.5 }
                 ],
                 bubbles: [{ x: 134, y: 60, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    /* mōrāle: the 🤝 of p5 is back, and the cub is on the fox's side */
    f28_moral:   { bg: 'plain', items: [
                   { t: 'aquila', x: 284, y: G, s: 1.05, flip: true },
                   { t: 'fox',    x: 128, y: G, s: 1.05 },
                   { t: 'fox',    x: 192, y: G, s: 0.5 }
                 ],
                 bubbles: [{ x: 216, y: 54, w: 56, h: 40, text: '🤝', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ fable 29 — Formīca et Columba ============

       bgRiver: the water band crosses y 150…215, the bank stands at
       y ≈ 152–156 (Regiō III f7 measured this and every river scene in
       the track has used those numbers since). An ant IN the water
       therefore sits at y ≈ 186; the same ant on the bank sits at 154. */

    f29_ager:    { bg: 'plain', items: [
                   { t: 'frumentum', x: 306, y: G, s: 1 },
                   { t: 'formica',   x: 150, y: G, s: 1.5 }
                 ] },

    f29_rivus:   { bg: 'river', items: [
                   { t: 'formica', x: 128, y: 154, s: 1.4 }
                 ] },

    f29_bibit:   { bg: 'river', items: [
                   { t: 'formica', x: 150, y: 158, s: 1.4 }
                 ] },

    /* IN the water. The ant is small and the river is wide: that is the
       page, so nothing else is in the frame. */
    f29_cadit:   { bg: 'river', items: [
                   { t: 'formica', x: 176, y: 186, s: 1.3 }
                 ] },

    f29_timet:   { bg: 'river', items: [
                   { t: 'formica', x: 214, y: 192, s: 1.3 }
                 ],
                 bubbles: [{ x: 258, y: 96, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'left', fs: 19 }] },

    /* the dove against the LEAVES, never against the sky: #fbf6ea on
       bgPlain's #f6e8c9 is the Regiō V grex defect (see the header) */
    f29_columba: { bg: 'forest', items: [
                   { t: 'tree',    x: 250, y: G, s: 1.2 },
                   { t: 'columba', x: 254, y: G - 108, s: 1.15 }
                 ] },

    f29_loquitur: { bg: 'river', items: [
                   { t: 'tree',    x: 322, y: G, s: 1.05 },
                   { t: 'columba', x: 316, y: G - 96, s: 1.05, flip: true },
                   { t: 'formica', x: 152, y: 188, s: 1.3 }
                 ],
                 bubbles: [{ x: 226, y: 60, w: 76, h: 44, text: '❓ 💬', kind: 'speech', tail: 'left', fs: 17 }] },

    f29_videtur: { bg: 'river', items: [
                   { t: 'tree',    x: 322, y: G, s: 1.05 },
                   { t: 'columba', x: 316, y: G - 96, s: 1.05, flip: true },
                   { t: 'formica', x: 152, y: 188, s: 1.3 }
                 ],
                 bubbles: [{ x: 232, y: 62, w: 56, h: 40, text: '👀', kind: 'thought', tail: 'left', fs: 19 }] },

    f29_ramus:   { bg: 'river', items: [
                   { t: 'tree',      x: 322, y: G, s: 1.05 },
                   { t: 'columba',   x: 262, y: 120, s: 1.05, pose: 'fly', flip: true },
                   { t: 'truncus',   x: 178, y: 184, s: 1.1 },
                   { t: 'formica',   x: 140, y: 190, s: 1.3 }
                 ] },

    f29_ascendit: { bg: 'river', items: [
                   { t: 'tree',    x: 322, y: G, s: 1.05 },
                   { t: 'truncus', x: 178, y: 184, s: 1.1 },
                   { t: 'formica', x: 176, y: 172, s: 1.3 }
                 ] },

    f29_servatur: { bg: 'river', items: [
                   { t: 'tree',    x: 322, y: G, s: 1.05 },
                   { t: 'columba', x: 316, y: G - 96, s: 1.05, flip: true },
                   { t: 'truncus', x: 210, y: 184, s: 1.05 },
                   { t: 'formica', x: 132, y: 154, s: 1.4 }
                 ] },

    f29_gratia:  { bg: 'river', items: [
                   { t: 'tree',    x: 322, y: G, s: 1.05 },
                   { t: 'columba', x: 316, y: G - 96, s: 1.05, flip: true },
                   { t: 'formica', x: 132, y: 154, s: 1.4 }
                 ],
                 bubbles: [{ x: 190, y: 92, w: 76, h: 44, text: '🐜 💬', kind: 'speech', tail: 'right', fs: 17 }] },

    f29_laborat: { bg: 'plain', items: [
                   { t: 'frumentum', x: 288, y: G, s: 1.05 },
                   { t: 'formica',   x: 166, y: G, s: 1.5 }
                 ] },

    f29_venator: { bg: 'forest', items: [
                   { t: 'tree',   x: 316, y: G, s: 1.1 },
                   { t: 'person', x: 132, y: G, s: 1, role: 'man', pose: 'walk' },
                   { t: 'rete',   x: 214, y: G, s: 0.7 }
                 ] },

    f29_rete:    { bg: 'forest', items: [
                   { t: 'tree',    x: 300, y: G, s: 1.15 },
                   { t: 'columba', x: 304, y: G - 108, s: 1.1 },
                   { t: 'rete',    x: 260, y: G, s: 0.85 },
                   { t: 'person',  x: 108, y: G, s: 1, role: 'man' }
                 ] },

    f29_nonvidet: { bg: 'forest', items: [
                   { t: 'tree',    x: 300, y: G, s: 1.15 },
                   { t: 'columba', x: 304, y: G - 108, s: 1.1 },
                   { t: 'rete',    x: 260, y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 128, y: 84, w: 68, h: 42, text: '🕸 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    /* the ant runs at the man's feet: she is drawn AFTER him, so she is
       in front of his ankles and not behind them */
    f29_currit:  { bg: 'forest', items: [
                   { t: 'tree',    x: 316, y: G, s: 1.1 },
                   { t: 'rete',    x: 268, y: G, s: 0.85 },
                   { t: 'person',  x: 140, y: G, s: 1, role: 'man' },
                   { t: 'formica', x: 108, y: G, s: 1.3 }
                 ] },

    f29_mordet:  { bg: 'forest', items: [
                   { t: 'tree',    x: 316, y: G, s: 1.1 },
                   { t: 'rete',    x: 268, y: G, s: 0.85 },
                   { t: 'person',  x: 140, y: G, s: 1, role: 'man', pose: 'arms-up' },
                   { t: 'formica', x: 128, y: G, s: 1.35 }
                 ],
                 bubbles: [{ x: 150, y: 50, w: 68, h: 42, text: '😖 ❗', kind: 'speech', tail: 'right', fs: 18 }] },

    f29_volat:   { bg: 'forest', items: [
                   { t: 'tree',    x: 316, y: G, s: 1.1 },
                   { t: 'columba', x: 214, y: 104, s: 1.15, pose: 'fly', flip: true },
                   { t: 'rete',    x: 292, y: G, s: 0.85 },
                   { t: 'person',  x: 132, y: G, s: 1, role: 'man', pose: 'arms-up' }
                 ] },

    f29_tuta:    { bg: 'forest', items: [
                   { t: 'tree',    x: 132, y: G, s: 1.2 },
                   { t: 'columba', x: 136, y: G - 108, s: 1.15, flip: true },
                   { t: 'rete',    x: 320, y: G, s: 0.8 }
                 ] },

    f29_moral:   { bg: 'forest', items: [
                   { t: 'tree',    x: 268, y: G, s: 1.2 },
                   { t: 'columba', x: 272, y: G - 108, s: 1.15, flip: true },
                   { t: 'formica', x: 128, y: G, s: 1.5 }
                 ] },

    /* ============ fable 30 — Asinus in Pelle Leōnis ============

       THE DISGUISE, staged and not approximated: the `asinus` is drawn
       FIRST and the `pellis` (kind 'leonis', 74 × 82) is drawn over him
       at his own x + 6. The hide covers the barrel of the body and
       carries the lion's face on the shoulder; the ass's head, muzzle
       and LONG EARS stand clear of it to the right, at x + 34, which is
       exactly what the fable needs the picture to say — and what f30's
       ears page then names. */

    f30_asinus:  { bg: 'plain', items: [
                   { t: 'frumentum', x: 330, y: G, s: 0.95 },
                   { t: 'asinus',    x: 176, y: G, s: 1.15 }
                 ] },

    f30_pellis:  { bg: 'forest', items: [
                   { t: 'tree',   x: 322, y: G, s: 1.05 },
                   { t: 'pellis', x: 196, y: G, s: 1.05, kind: 'leonis' },
                   { t: 'asinus', x: 88,  y: G, s: 1 }
                 ] },

    f30_induit:  { bg: 'forest', items: [
                   { t: 'tree',   x: 330, y: G, s: 1 },
                   { t: 'asinus', x: 186, y: G, s: 1.15 },
                   { t: 'pellis', x: 192, y: G, s: 1.05, kind: 'leonis' }
                 ] },

    f30_leo:     { bg: 'forest', items: [
                   { t: 'tree',   x: 330, y: G, s: 1 },
                   { t: 'asinus', x: 178, y: G, s: 1.15 },
                   { t: 'pellis', x: 184, y: G, s: 1.05, kind: 'leonis' }
                 ],
                 bubbles: [{ x: 306, y: 62, w: 62, h: 42, text: '🦁 ❓', kind: 'thought', tail: 'left', fs: 18 }] },

    f30_cervus:  { bg: 'forest', items: [
                   { t: 'tree',   x: 62,  y: G, s: 1 },
                   { t: 'asinus', x: 156, y: G, s: 1.1 },
                   { t: 'pellis', x: 162, y: G, s: 1, kind: 'leonis' },
                   { t: 'cervus', x: 316, y: G, s: 1, flip: true }
                 ] },

    f30_fugit:   { bg: 'forest', items: [
                   { t: 'asinus', x: 128, y: G, s: 1.1 },
                   { t: 'pellis', x: 134, y: G, s: 1, kind: 'leonis' },
                   { t: 'cervus', x: 330, y: G, s: 1, pose: 'walk', flip: true }
                 ],
                 bubbles: [{ x: 316, y: 60, w: 54, h: 38, text: '😨', kind: 'thought', tail: 'left', fs: 18 }] },

    f30_fugiunt: { bg: 'forest', items: [
                   { t: 'asinus', x: 108, y: G, s: 1.05 },
                   { t: 'pellis', x: 114, y: G, s: 0.95, kind: 'leonis' },
                   { t: 'lepus',  x: 248, y: G, s: 1, pose: 'walk', flip: true },
                   { t: 'cervus', x: 330, y: G, s: 0.95, pose: 'walk', flip: true },
                   { t: 'canis',  x: 292, y: G, s: 0.9, pose: 'walk', flip: true }
                 ] },

    f30_ridet:   { bg: 'forest', items: [
                   { t: 'asinus', x: 180, y: G, s: 1.15 },
                   { t: 'pellis', x: 186, y: G, s: 1.05, kind: 'leonis' }
                 ],
                 bubbles: [{ x: 312, y: 60, w: 62, h: 42, text: '🦁 😀', kind: 'thought', tail: 'left', fs: 18 }] },

    /* the fox does not run: she walks BEHIND him, which is the picture
       `sequitur` is learned from */
    f30_sequitur: { bg: 'forest', items: [
                   { t: 'asinus', x: 226, y: G, s: 1.1 },
                   { t: 'pellis', x: 232, y: G, s: 1, kind: 'leonis' },
                   { t: 'fox',    x: 88,  y: G, s: 1, pose: 'walk' }
                 ] },

    f30_audit:   { bg: 'forest', items: [
                   { t: 'asinus', x: 232, y: G, s: 1.1 },
                   { t: 'pellis', x: 238, y: G, s: 1, kind: 'leonis' },
                   { t: 'fox',    x: 104, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 110, y: 58, w: 56, h: 40, text: '👂', kind: 'thought', tail: 'right', fs: 19 }] },

    f30_clamat:  { bg: 'forest', items: [
                   { t: 'asinus', x: 232, y: G, s: 1.1 },
                   { t: 'pellis', x: 238, y: G, s: 1, kind: 'leonis' },
                   { t: 'fox',    x: 104, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 300, y: 48, w: 78, h: 44, text: '🔊 ✗🦁', kind: 'speech', tail: 'left', fs: 16 }] },

    f30_detegit: { bg: 'forest', items: [
                   { t: 'asinus', x: 236, y: G, s: 1.1 },
                   { t: 'pellis', x: 242, y: G, s: 1, kind: 'leonis' },
                   { t: 'fox',    x: 108, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 118, y: 56, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    /* the ears: the hide is DOWN one notch (s 0.9) so that what stands
       clear of it above and to the right is the ass's own head */
    f30_aures:   { bg: 'forest', items: [
                   { t: 'asinus', x: 220, y: G, s: 1.25 },
                   { t: 'pellis', x: 226, y: G, s: 0.9, kind: 'leonis' },
                   { t: 'fox',    x: 92,  y: G, s: 1 }
                 ],
                 bubbles: [{ x: 296, y: 44, w: 62, h: 42, text: '👂 👂', kind: 'thought', tail: 'left', fs: 18 }] },

    f30_omnes:   { bg: 'forest', items: [
                   { t: 'asinus', x: 214, y: G, s: 1.15 },
                   { t: 'pellis', x: 220, y: G, s: 0.9, kind: 'leonis' },
                   { t: 'fox',    x: 96,  y: G, s: 1 },
                   { t: 'cervus', x: 336, y: G, s: 0.95, flip: true }
                 ] },

    f30_sequuntur: { bg: 'forest', items: [
                   { t: 'asinus', x: 300, y: G, s: 1.1 },
                   { t: 'fox',    x: 176, y: G, s: 1, pose: 'walk' },
                   { t: 'cervus', x: 92,  y: G, s: 0.95, pose: 'walk' },
                   { t: 'lepus',  x: 42,  y: G, s: 0.95, pose: 'walk' }
                 ] },

    /* the hide comes off and lies on the ground; the ass walks away and
       is not touched by anybody (DESIGN §8 — see the header, ruling 5) */
    f30_discedit: { bg: 'plain', items: [
                   { t: 'pellis', x: 106, y: G, s: 0.95, kind: 'leonis' },
                   { t: 'asinus', x: 268, y: G, s: 1.1, pose: 'walk', flip: true }
                 ] },

    f30_moral:   { bg: 'plain', items: [
                   { t: 'pellis', x: 96,  y: G, s: 0.9, kind: 'leonis' },
                   { t: 'asinus', x: 250, y: G, s: 1.2 }
                 ] },

    /* ============ vocabulary mini-scenes ============ */

    /* aquila alone, big, on the ground: the card teaches the BIRD. The
       nest card below teaches the nest, and the two never meet by ear
       (the eagle is never in the nest card and the nest is never in
       hers) — the shared-picture rule Regiōnēs III–VI set. */
    v_aquila:    { bg: 'plain', items: [{ t: 'aquila', x: 196, y: G, s: 2.1 }] },
    /* the nest ON THE GROUND and very large: a nest drawn up in a tree
       is a picture of a TREE at 86 px, which is what v_arbor is. With
       two eggs in it, because an empty straw bowl is a basket. `ōvum`
       is therefore held OUT of SONUS and AENIGMATA and recycled in
       CORRIGE/COMPLĒ instead — the call Regiō V made for `onus`. */
    v_nidus:     { bg: 'plain', items: [{ t: 'nidus', x: 200, y: G, s: 2.4, ova: 2 }] },
    /* catulus: the pair, as in the story. Held OUT of SONUS for the
       obvious reason — it contains a `vulpēs`. */
    v_catulus:   { bg: 'plain', items: [
                   { t: 'fox', x: 116, y: G, s: 1.35 },
                   { t: 'fox', x: 262, y: G, s: 0.62 }
                 ] },
    /* THE ALTAR IS THE STONE, NOT THE FIRE. flame:false on the card, so
       `āra` and `ignis` are two different pictures and can stand on the
       same board; every STORY altar burns. This is the same move that
       made `aureum` (R2 f6) and `cornua` (R3 f9) teachable. */
    v_ara:       { bg: 'plain', items: [{ t: 'altar', x: 200, y: G, s: 1.9, flame: false }] },
    v_ignis:     { bg: 'plain', items: [{ t: 'fire', x: 200, y: G, s: 1.9 }] },
    v_arbor:     { bg: 'plain', items: [{ t: 'tree', x: 200, y: G, s: 1.2 }] },

    /* columba against the LEAVES (see the header) */
    v_columba:   { bg: 'mountain', items: [{ t: 'columba', x: 146, y: G, s: 2 }] },
    v_formica:   { bg: 'plain', items: [{ t: 'formica', x: 196, y: G, s: 2.4 }] },
    v_rivus:     { bg: 'river', items: [] },
    v_rete:      { bg: 'plain', items: [{ t: 'rete', x: 200, y: G, s: 1.35 }] },
    v_vir:       { bg: 'plain', items: [
                   { t: 'person', x: 138, y: G, s: 1.25, role: 'man' },
                   { t: 'person', x: 262, y: G, s: 1.2, role: 'man', flip: true }
                 ] },

    v_asinus:    { bg: 'plain', items: [{ t: 'asinus', x: 190, y: G, s: 1.45 }] },
    /* the hide ALONE, laid out, with nobody in it: the card has to teach
       the thing, not the joke */
    v_pellis:    { bg: 'plain', items: [{ t: 'pellis', x: 200, y: G, s: 1.85, kind: 'leonis' }] },
    v_cervus:    { bg: 'forest', items: [{ t: 'cervus', x: 190, y: G, s: 1.35 }] },
    v_lepus:     { bg: 'plain', items: [{ t: 'lepus', x: 196, y: G, s: 1.9 }] },
    v_canis:     { bg: 'plain', items: [{ t: 'canis', x: 190, y: G, s: 1.5 }] },
    v_silva:     { bg: 'forest', items: [
                   { t: 'tree', x: 120, y: G, s: 1.05 },
                   { t: 'tree', x: 282, y: G, s: 0.9 }
                 ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 28 — Aquila et Vulpēs ============
       THE PASSIVE ARRIVES. Five of the region's eleven passives are on
       this page-set, every one of them built on a verb the learner has
       read with a picture since Regiō I, and every one of them standing
       beside its own active in the same frame:

           Aquila ex arbore vulpem videt. Vulpēs ab aquilā vidētur.
           Aquila catulum vulpī reddit. Catulus vulpī redditur.

       That doubled sentence is the whole lesson, and it is the reason
       this capitulum spends its ≤8 cap on NOUNS (aquila, nīdus, catulus,
       amīcitia, āra, ignis) and only two verbs (reddit, frangit): a
       sentence introducing new grammar uses known vocabulary.

       B-RATING: see the file header, ruling 5. The classical cub is
       eaten and the classical chicks are roasted; here the nest is only
       THREATENED and the cub goes home. FLAGGED for line-audit. */
    {
      id: 'f28',
      titulus: 'Aquila et Vulpēs',
      icon: '🦅🦊',
      numerus: 'XXVIII',
      pos: { x: 0.22, y: 0.85 },
      vocab: [
        { la: 'aquila',    scene: SC.v_aquila,  pars: 'nomen' },
        { la: 'nīdus',     scene: SC.v_nidus,   pars: 'nomen' },
        { la: 'catulus',   scene: SC.v_catulus, pars: 'nomen' },
        { la: 'āra',       scene: SC.v_ara,     pars: 'nomen' },
        { la: 'ignis',     scene: SC.v_ignis,   pars: 'nomen' },
        { la: 'arbor',     scene: SC.v_arbor,   pars: 'nomen' },
        { la: 'vulpēs',    emoji: '🦊',         pars: 'nomen' },
        { la: 'ōvum',      emoji: '🥚',         pars: 'nomen' }
      ],
      story: [
        { la: 'Ecce aquila! Aquila magna est. Aquila in arbore altā habitat.',
          scene: SC.f28_aquila,
          nova: [{ w: 'aquila', e: '🦅', g: 'aquila volat; aquila nōn ambulat' }] },

        { la: 'In arbore nīdus est. In nīdō duo ōva sunt.',
          scene: SC.f28_ova,
          nova: [{ w: 'nīdus', e: '🥚🥚', g: 'aquila nīdum in arbore habet: in nīdō ōva sunt' }] },

        { la: 'Ecce vulpēs! Vulpēs sub arbore habitat.',
          scene: SC.f28_vulpes, nova: [] },

        { la: 'Vulpēs catulum habet. Vulpēs magna est, catulus parvus.',
          scene: SC.f28_catulus,
          nova: [{ w: 'catulus', e: '🦊 ⬇', g: 'vulpēs magna est; catulus vulpēs parva est' }] },

        /* amīcus → amīca: the morphology is shown, not translated, and
           both animals in the frame are feminine, which is why the page
           needs it at all */
        { la: 'Aquila et vulpēs amīcae sunt. Amīcitia magna est.',
          scene: SC.f28_amici,
          nova: [{ w: 'amīcae', e: '🦅🤝🦊', g: 'amīcus → amīca; aquila et vulpēs amīcae sunt' },
                 { w: 'amīcitia', e: '🤝', g: 'amīcus amīcum iuvat: amīcitia est' }] },

        /* THE PASSIVE, on the most-read verb in the track, with its own
           active in the same sentence and the agent glossed by a
           question the picture answers */
        { la: 'Aquila ex arbore vulpem videt. Vulpēs ab aquilā vidētur.',
          scene: SC.f28_videt,
          nova: [{ w: 'vidētur', e: '👀 ⬅', g: 'aquila videt → vulpēs vidētur' },
                 { w: 'ab aquilā', e: '⬅🦅', g: 'quis videt? aquila: “ab aquilā”' }] },

        { la: 'Sed aquila cibum quaerit. Aquila catulum videt.',
          scene: SC.f28_esurit, nova: [] },

        { la: 'Aquila ex arbore volat. Aquila catulum capit et portat.',
          scene: SC.f28_capit, nova: [] },

        { la: 'Catulus ab aquilā capitur. Catulus clāmat.',
          scene: SC.f28_capit,
          nova: [{ w: 'capitur', e: '✊ ⬅', g: 'aquila capit → catulus capitur' }] },

        { la: 'Catulus ad nīdum portātur. Iam catulus in nīdō est.',
          scene: SC.f28_innido,
          nova: [{ w: 'portātur', e: '📦 ⬅', g: 'aquila portat → catulus portātur' }] },

        { la: 'Vulpēs catulum quaerit. Vulpēs catulum nōn invenit.',
          scene: SC.f28_quaerit, nova: [] },

        { la: 'Vulpēs sub arbore stat. Vulpēs trīstis est.',
          scene: SC.f28_tristis, nova: [] },

        { la: 'Vulpēs clāmat: “Ō aquila! Ubi est catulus meus? Ubi est amīcitia?”',
          scene: SC.f28_clamat, nova: [] },

        { la: 'Aquila respondet: “Catulus in nīdō meō est. Nīdus altus est.”',
          scene: SC.f28_respondet, nova: [] },

        { la: 'Vulpēs in arborem ascendere nōn potest. Arbor alta est.',
          scene: SC.f28_ascendit, nova: [] },

        /* `frangit` arrives ACTIVE, in the fox's own question, one page
           before the narrator says it in the passive — ruling 1 */
        { la: 'Vulpēs iterum clāmat: “Ō aquila! Cūr amīcitiam frangis?”',
          scene: SC.f28_clamat,
          nova: [{ w: 'frangis', e: '💔', g: 'aquila amīcitiam frangit → “Ō aquila, frangis!”' }] },

        { la: 'Aquila catulum nōn reddit. Amīcitia frangitur.',
          scene: SC.f28_frangitur,
          nova: [{ w: 'reddit', e: '🤲 ⬅', g: 'aquila catulum nōn dat iterum: nōn reddit' },
                 { w: 'frangitur', e: '💔', g: 'aquila frangit → amīcitia frangitur; amīcitia iam nōn est' }] },

        { la: 'Sed ecce virī! Virī ad āram veniunt.',
          scene: SC.f28_ara,
          nova: [{ w: 'āra', e: '🏛', g: 'in ārā virī cibum pōnunt; in ārā ignis est' }] },

        { la: 'In ārā ignis est. Virī in ārā cibum pōnunt.',
          scene: SC.f28_ignis,
          nova: [{ w: 'ignis', e: '🔥', g: 'ignis in ārā est; aquila ignem timet' }] },

        { la: 'Aquila cibum videt. Aquila ad āram volat et cibum capit.',
          scene: SC.f28_rapit, nova: [] },

        { la: 'Sed in cibō ignis est! Cibus cum igne ad nīdum portātur.',
          scene: SC.f28_rapit, nova: [] },

        { la: 'Ecce ignis in arbore! Aquila timet: nīdus iam nōn tūtus est.',
          scene: SC.f28_periculum, nova: [] },

        { la: 'Aquila catulum capit et ex arbore volat.',
          scene: SC.f28_volat, nova: [] },

        /* the region's device one last time, and this time it is the
           good news: active and passive, one picture, one page */
        { la: 'Aquila catulum vulpī reddit. Catulus vulpī redditur.',
          scene: SC.f28_reddit,
          nova: [{ w: 'redditur', e: '🤲 ⬅', g: 'aquila reddit → catulus redditur' }] },

        { la: 'Vulpēs laeta est. Aquila dīcit: “Ō vulpēs! Catulus tuus est.”',
          scene: SC.f28_laeta, nova: [] },

        /* mōrāle: gnomic present, no new words, and the region's own
           grammar carries it — a passive with its agent */
        { la: 'Fābula docet: amīcitia ab amīcō nōn frangitur.',
          scene: SC.f28_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'aquila',  scene: SC.v_aquila },
          { la: 'nīdus',   scene: SC.v_nidus },
          { la: 'vulpēs',  emoji: '🦊' },
          { la: 'ignis',   scene: SC.v_ignis },
          { la: 'arbor',   scene: SC.v_arbor },
          { la: 'ōvum',    emoji: '🥚' }
        ]
      },
      /* SONUS. The shared-picture rule, applied to this capitulum:
           · `catulus` IS a vulpēs — the card is a big fox and a small
             one — so it never stands against `vulpēs`, and since there
             is no third fox-free board for it, it is out of SONUS
             entirely (recycled in AENIGMATA's scrambles and in both
             hand-written exercise sets);
           · `nīdus` holds two eggs, so `ōvum` is out for the same
             reason and by the same remedy;
           · `āra` and `ignis` CAN stand together, but only because the
             card altar deliberately does not burn (see v_ara). */
      sonus: [
        { la: 'aquila',
          answer: { la: 'aquila', scene: SC.v_aquila },
          options: [{ la: 'aquila', scene: SC.v_aquila },
                    { la: 'vulpēs', emoji: '🦊' },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'vulpēs',
          answer: { la: 'vulpēs', emoji: '🦊' },
          options: [{ la: 'vulpēs', emoji: '🦊' },
                    { la: 'aquila', scene: SC.v_aquila },
                    { la: 'nīdus', scene: SC.v_nidus }] },
        { la: 'nīdus',
          answer: { la: 'nīdus', scene: SC.v_nidus },
          options: [{ la: 'nīdus', scene: SC.v_nidus },
                    { la: 'āra', scene: SC.v_ara },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'ignis',
          answer: { la: 'ignis', scene: SC.v_ignis },
          options: [{ la: 'ignis', scene: SC.v_ignis },
                    { la: 'āra', scene: SC.v_ara },
                    { la: 'aquila', scene: SC.v_aquila },
                    { la: 'arbor', scene: SC.v_arbor }] }
      ],
      /* OVERRIDES. The generated set was read first and rejected for the
         reason every region since Regiō V has recorded: content-loader.js
         skips quoted pages, and it can only gap a word that stands in the
         sentence in its DICTIONARY form — which a passive verb never
         does. A generated CORRIGE/COMPLĒ for f28 therefore tests the
         nouns and leaves the region's entire grammar untouched.
         Target-grammar items: 5 of 6 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* six tiles, six pictures that share nothing. `catulus` (a fox)
             and `ōvum` (what is in the nest) are held out and recycled
             below. */
          pairs: [
            { la: 'aquila', scene: SC.v_aquila },
            { la: 'nīdus',  scene: SC.v_nidus },
            { la: 'vulpēs', emoji: '🦊' },
            { la: 'arbor',  scene: SC.v_arbor },
            { la: 'āra',    scene: SC.v_ara },
            { la: 'ignis',  scene: SC.v_ignis }
          ],
          scrambles: [
            { la: 'Catulus ab aquilā capitur.',        scene: SC.f28_capit },
            { la: 'Catulus ad nīdum portātur.',        scene: SC.f28_innido },
            { la: 'Aquila catulum vulpī reddit.',      scene: SC.f28_reddit },
            { la: 'In ārā ignis est.',                 scene: SC.f28_ignis }
          ]
        },
        corrige: [
          /* PASSIVE vs ACTIVE. All three options are real forms of the
             same verb, so only the voice is being asked about, and the
             picture (the cub in the eagle's claws, the fox below) says
             which way round it goes. */
          { words: ['Catulus', 'ab', 'aquilā', 'capit.'], wrong: 3,
            options: ['capitur.', 'capiunt.', 'capis.'], correct: 0, scene: SC.f28_capit },
          { words: ['Catulus', 'ad', 'nīdum', 'portat.'], wrong: 3,
            options: ['portātur.', 'portant.', 'portāte!'], correct: 0, scene: SC.f28_innido },
          { words: ['Vulpēs', 'ab', 'aquilā', 'videt.'], wrong: 3,
            options: ['vidētur.', 'vident.', 'vidē!'], correct: 0, scene: SC.f28_videt },
          /* THE AGENT: three prepositions, and only one of them can
             stand before the animal that is doing it */
          { words: ['Catulus', 'ad', 'aquilā', 'capitur.'], wrong: 1,
            options: ['ab', 'ex', 'sub'], correct: 0, scene: SC.f28_capit },
          { words: ['Amīcitia', 'frangit.'], wrong: 1,
            options: ['frangitur.', 'frangunt.', 'frangis.'], correct: 0, scene: SC.f28_frangitur },
          /* vocabulary: the nest is in the tree, not on the altar */
          { words: ['Aquila', 'in', 'ārā', 'nīdum', 'habet.'], wrong: 2,
            options: ['arbore', 'igne', 'nīdō'], correct: 0, scene: SC.f28_aquila }
        ],
        comple: [
          { text: 'Aquila catulum capit. Catulus ab aquilā ___.',
            options: ['capitur', 'capit', 'capiunt'], correct: 0, scene: SC.f28_capit },
          { text: 'Aquila catulum portat. Catulus ad nīdum ___.',
            options: ['portātur', 'portat', 'portant'], correct: 0, scene: SC.f28_innido },
          { text: 'Aquila catulum vulpī reddit. Catulus vulpī ___.',
            options: ['redditur', 'reddit', 'reddunt'], correct: 0, scene: SC.f28_reddit },
          { text: 'Aquila vulpem videt. Vulpēs ___ aquilā vidētur.',
            options: ['ab', 'ad', 'ex'], correct: 0, scene: SC.f28_videt },
          { text: 'Aquila catulum nōn reddit: amīcitia ___.',
            options: ['frangitur', 'frangunt', 'frangis'], correct: 0, scene: SC.f28_frangitur },
          { text: 'In ___ duo ōva sunt.',
            options: ['nīdō', 'ārā', 'igne'], correct: 0, scene: SC.f28_ova }
        ]
      }
    },

    /* ============ FABLE 29 — Formīca et Columba ============
       THE PASSIVE, RECYCLED AND THEN DEEPENED. `vidētur` and `capitur`
       come back from f28 on new animals (the "again within the next two
       capitula" pass), `servātur` is added, and then the region's one
       PERFECT passive lands where the fable needs a finished act:

           Formīca ā columbā servātur.      (iam)
           Columba ā formīcā servāta est.   (iam nōn capitur)

       The deponent `loquitur` is taught here too, as a plain synonym of
       `dīcit` (ruling 4), three times, always with a speech bubble in
       the frame.

       `vēnātor` gets NO vocabulary card, for exactly the reason Regiō V
       gave for `viātor` and Regiō IV for `locus`: every picture this art
       set can make of a fowler is a picture of a MAN, which is already
       `vir`. He is built out of words the learner has — `vir columbās
       rētī capere vult: vēnātor est` — and never asked for by ear. */
    {
      id: 'f29',
      titulus: 'Formīca et Columba',
      icon: '🐜🕊',
      numerus: 'XXIX',
      pos: { x: 0.68, y: 0.62 },
      vocab: [
        { la: 'columba', scene: SC.v_columba, pars: 'nomen' },
        { la: 'formīca', scene: SC.v_formica, pars: 'nomen' },
        { la: 'rīvus',   scene: SC.v_rivus,   pars: 'nomen' },
        { la: 'rēte',    scene: SC.v_rete,    pars: 'nomen' },
        { la: 'vir',     scene: SC.v_vir,     pars: 'nomen' },
        { la: 'arbor',   scene: SC.v_arbor,   pars: 'nomen' },
        { la: 'aqua',    emoji: '💧',         pars: 'nomen' },
        { la: 'timet',   emoji: '😨',         pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce formīca! Formīca parva est. Formīca in agrō labōrat.',
          scene: SC.f29_ager, nova: [] },

        { la: 'Formīca ad rīvum ambulat: formīca aquam bibere vult.',
          scene: SC.f29_rivus, nova: [] },

        { la: 'Formīca aquam bibit. Sed formīca in rīvum cadit!',
          scene: SC.f29_cadit, nova: [] },

        { la: 'Formīca in aquā est. Aqua formīcam portat. Formīca timet.',
          scene: SC.f29_timet, nova: [] },

        { la: 'Ecce columba! Columba in arbore sedet.',
          scene: SC.f29_columba,
          nova: [{ w: 'columba', e: '🕊', g: 'columba volat et in arbore sedet; columba nōn magna est' }] },

        /* the deponent, glossed as the synonym it is */
        { la: 'Columba formīcam videt et loquitur: “Quis in rīvō est?”',
          scene: SC.f29_loquitur,
          nova: [{ w: 'loquitur', e: '💬', g: 'dīcit = loquitur' }] },

        { la: 'Formīca ā columbā vidētur. Formīca clāmat: “Iuvā!”',
          scene: SC.f29_videtur, nova: [] },

        { la: 'Columba rāmum capit. Columba rāmum in rīvum pōnit.',
          scene: SC.f29_ramus, nova: [] },

        { la: 'Formīca in rāmum ascendit. Formīca ex aquā venit.',
          scene: SC.f29_ascendit, nova: [] },

        { la: 'Formīca ā columbā servātur. Iam formīca tūta est.',
          scene: SC.f29_servatur,
          nova: [{ w: 'servātur', e: '🛡 ⬅', g: 'columba servat → formīca servātur' }] },

        { la: 'Formīca loquitur: “Ō columba! Mē servās. Amīcitia magna est.”',
          scene: SC.f29_gratia,
          nova: [{ w: 'servās', e: '👤➡👤', g: 'columba servat → “Ō columba, servās!”' }] },

        { la: 'Posteā formīca iterum in agrō labōrat.',
          scene: SC.f29_laborat, nova: [] },

        { la: 'Sed ecce vir! Vir rēte portat. Vir columbās rētī capere vult.',
          scene: SC.f29_venator, nova: [] },

        { la: 'Vir vēnātor est. Vēnātor rēte sub arbore pōnit.',
          scene: SC.f29_rete,
          nova: [{ w: 'vēnātor', e: '👤 🕸', g: 'vir columbās rētī capere vult: vēnātor est' }] },

        { la: 'Columba in arbore sedet. Columba rēte nōn videt.',
          scene: SC.f29_nonvidet, nova: [] },

        { la: 'Formīca vēnātōrem videt. Formīca parva est, sed mordēre potest.',
          scene: SC.f29_currit,
          nova: [{ w: 'mordēre', e: '😖', g: 'formīca mordet: vir clāmat' }] },

        { la: 'Formīca ad vēnātōrem currit. Formīca vēnātōris pedem mordet!',
          scene: SC.f29_mordet, nova: [] },

        { la: 'Vēnātor clāmat: “Ō! Quid mē mordet?” Vēnātor rēte nōn tenet.',
          scene: SC.f29_mordet, nova: [] },

        { la: 'Columba vēnātōrem audit. Columba ex arbore volat.',
          scene: SC.f29_volat, nova: [] },

        { la: 'Columba nōn capitur. Columba tūta est.',
          scene: SC.f29_tuta, nova: [] },

        /* THE PERFECT PASSIVE — see the file header, ruling 3. The
           present passive stands three lines above it and the gloss puts
           the two side by side. */
        { la: 'Columba ā formīcā servāta est.',
          scene: SC.f29_tuta,
          nova: [{ w: 'servāta est', e: '🛡 ✓', g: 'formīca servātur (iam) · columba servāta est (iam nōn capitur)' }] },

        { la: 'Columba loquitur: “Ō formīca! Parva es, sed magna est amīcitia.”',
          scene: SC.f29_moral, nova: [] },

        /* mōrāle: gnomic present, no new words, passive with its agent */
        { la: 'Fābula docet: etiam ā parvā formīcā magna columba servātur.',
          scene: SC.f29_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'columba', scene: SC.v_columba },
          { la: 'formīca', scene: SC.v_formica },
          { la: 'rēte',    scene: SC.v_rete },
          { la: 'arbor',   scene: SC.v_arbor },
          { la: 'aquila',  scene: SC.v_aquila },
          { la: 'vir',     scene: SC.v_vir }
        ]
      },
      /* SONUS. `rīvus` is a background with nothing standing in it and
         `aqua` is 💧 — the same substance twice — so they are never on
         one board; `aqua` keeps the ear test and `rīvus` is recycled in
         both written sets. `vir` is two men, and the fowler is a man, so
         nothing else here is a person. */
      sonus: [
        { la: 'columba',
          answer: { la: 'columba', scene: SC.v_columba },
          options: [{ la: 'columba', scene: SC.v_columba },
                    { la: 'formīca', scene: SC.v_formica },
                    { la: 'rēte', scene: SC.v_rete }] },
        { la: 'formīca',
          answer: { la: 'formīca', scene: SC.v_formica },
          options: [{ la: 'formīca', scene: SC.v_formica },
                    { la: 'columba', scene: SC.v_columba },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'rēte',
          answer: { la: 'rēte', scene: SC.v_rete },
          options: [{ la: 'rēte', scene: SC.v_rete },
                    { la: 'columba', scene: SC.v_columba },
                    { la: 'vir', scene: SC.v_vir }] },
        { la: 'vir',
          answer: { la: 'vir', scene: SC.v_vir },
          options: [{ la: 'vir', scene: SC.v_vir },
                    { la: 'columba', scene: SC.v_columba },
                    { la: 'formīca', scene: SC.v_formica },
                    { la: 'arbor', scene: SC.v_arbor }] }
      ],
      /* OVERRIDES. Same structural reason as f28. This set adds the
         PERFECT passive and the agreement it forces (`servāta`, not
         `servātus`), which nothing generated could ever ask.
         Target-grammar items: 5 of 6 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'columba', scene: SC.v_columba },
            { la: 'formīca', scene: SC.v_formica },
            { la: 'rēte',    scene: SC.v_rete },
            { la: 'vir',     scene: SC.v_vir },
            { la: 'arbor',   scene: SC.v_arbor },
            { la: 'timet',   emoji: '😨' }
          ],
          scrambles: [
            { la: 'Formīca in rīvum cadit.',            scene: SC.f29_cadit },
            { la: 'Formīca ā columbā servātur.',        scene: SC.f29_servatur },
            { la: 'Vēnātor rēte sub arbore pōnit.',     scene: SC.f29_rete },
            { la: 'Columba ex arbore volat.',           scene: SC.f29_volat }
          ]
        },
        corrige: [
          { words: ['Formīca', 'ā', 'columbā', 'servat.'], wrong: 3,
            options: ['servātur.', 'servant.', 'servā!'], correct: 0, scene: SC.f29_servatur },
          { words: ['Columba', 'ā', 'vēnātōre', 'nōn', 'capit.'], wrong: 4,
            options: ['capitur.', 'capiunt.', 'cape!'], correct: 0, scene: SC.f29_tuta },
          /* PERFECT PASSIVE, and the agreement inside it: columba is
             feminine, and only one of the three forms says so */
          { words: ['Columba', 'ā', 'formīcā', 'servātus', 'est.'], wrong: 3,
            options: ['servāta', 'servātum', 'servātī'], correct: 0, scene: SC.f29_tuta },
          { words: ['Formīca', 'ad', 'columbā', 'vidētur.'], wrong: 1,
            options: ['ā', 'ex', 'sub'], correct: 0, scene: SC.f29_videtur },
          /* THE DEPONENT, and the number the picture fixes: ONE dove is
             in the frame, so only one of these three forms can stand */
          { words: ['Columba', 'videt', 'et', 'loquuntur.'], wrong: 3,
            options: ['loquitur.', 'loquēris.', 'loquere!'], correct: 0, scene: SC.f29_loquitur },
          { words: ['Formīca', 'vēnātōris', 'pedem', 'videt.'], wrong: 3,
            options: ['mordet.', 'portat.', 'servat.'], correct: 0, scene: SC.f29_mordet }
        ],
        comple: [
          { text: 'Columba formīcam servat. Formīca ā columbā ___.',
            options: ['servātur', 'servat', 'servāte'], correct: 0, scene: SC.f29_servatur },
          { text: 'Vēnātor columbam nōn capit: columba nōn ___.',
            options: ['capitur', 'capit', 'capiunt'], correct: 0, scene: SC.f29_tuta },
          { text: 'Columba ā formīcā servāta ___.',
            options: ['est', 'sunt', 'estis'], correct: 0, scene: SC.f29_tuta },
          { text: 'Formīca ___ columbā vidētur.',
            options: ['ā', 'ad', 'in'], correct: 0, scene: SC.f29_videtur },
          { text: 'Columba videt et ___: “Quis in rīvō est?”',
            options: ['loquitur', 'loquuntur', 'loquī'], correct: 0, scene: SC.f29_loquitur },
          { text: 'Formīca vēnātōris pedem ___.',
            options: ['mordet', 'portat', 'bibit'], correct: 0, scene: SC.f29_mordet }
        ]
      }
    },

    /* ============ FABLE 30 — Asinus in Pelle Leōnis ============
       THE PASSIVE AS THE FABLE'S OWN JOKE. `vidētur` returns from f28
       with the copular sense Latin actually uses it for —

           Iam asinus leō vidētur! Sed asinus leō nōn est.

       — and the unmasking is the region's last active/passive pair:
       `vōx asinum dētegit` beside `asinus vōce dētegitur`, with the
       instrumental ablative Regiō IV taught doing the work between them.
       `sequitur` joins `loquitur` (which is recycled here from f29), so
       the region ends with both deponents CURRICULUM names.

       B-RATING: Aesop's ass is beaten by his master. Here he is only
       found out, everybody laughs — the ass too — and he walks home.
       See the file header, ruling 5. FLAGGED for line-audit. */
    {
      id: 'f30',
      titulus: 'Asinus in Pelle Leōnis',
      icon: '🦁🎭',
      numerus: 'XXX',
      pos: { x: 0.28, y: 0.38 },
      vocab: [
        { la: 'asinus', scene: SC.v_asinus, pars: 'nomen' },
        { la: 'pellis', scene: SC.v_pellis, pars: 'nomen' },
        { la: 'cervus', scene: SC.v_cervus, pars: 'nomen' },
        { la: 'lepus',  scene: SC.v_lepus,  pars: 'nomen' },
        { la: 'canis',  scene: SC.v_canis,  pars: 'nomen' },
        { la: 'silva',  scene: SC.v_silva,  pars: 'nomen' },
        { la: 'vulpēs', emoji: '🦊',        pars: 'nomen' },
        { la: 'timet',  emoji: '😨',        pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce asinus! Asinus in agrō labōrat. Asinus fessus est.',
          scene: SC.f30_asinus, nova: [] },

        /* WHERE THE HIDE CAME FROM IS NOT TOLD, deliberately: a dead
           lion is not a thing this fable needs and not a thing DESIGN §8
           wants drawn or stated. The ass finds it, and that is all. */
        { la: 'Asinus in silvā pellem leōnis invenit.',
          scene: SC.f30_pellis,
          nova: [{ w: 'pellis', e: '🦁 ⬇', g: 'leō pellem habet; pellis leōnis in silvā iacet' }] },

        { la: 'Asinus pellem portat. Iam asinus in pelle leōnis est.',
          scene: SC.f30_induit, nova: [] },

        { la: 'Iam asinus leō vidētur! Sed asinus leō nōn est.',
          scene: SC.f30_leo, nova: [] },

        { la: 'Asinus in silvam ambulat. Ecce cervus!',
          scene: SC.f30_cervus, nova: [] },

        { la: 'Cervus asinum videt. Cervus timet: “Leō venit!”',
          scene: SC.f30_cervus, nova: [] },

        { la: 'Cervus fugit. Lepus quoque fugit.',
          scene: SC.f30_fugit, nova: [] },

        { la: 'Cervus et lepus et canis fugiunt: leōnem timent.',
          scene: SC.f30_fugiunt, nova: [] },

        { la: 'Asinus rīdet. Asinus laetus est: “Iam leō sum!”',
          scene: SC.f30_ridet,
          nova: [{ w: 'sum', e: '👉🦁', g: 'asinus est → asinus dīcit: “sum!”' }] },

        { la: 'Sed ecce vulpēs! Vulpēs nōn fugit: vulpēs asinum sequitur.',
          scene: SC.f30_sequitur,
          nova: [{ w: 'sequitur', e: '🦊 ➜', g: 'asinus ambulat; vulpēs quoque ambulat: vulpēs asinum sequitur' }] },

        { la: 'Vulpēs asinum sequitur et audit.',
          scene: SC.f30_audit, nova: [] },

        { la: 'Asinus clāmat: “Ō! Ō!” Vōx asinī nōn vōx leōnis est.',
          scene: SC.f30_clamat, nova: [] },

        /* the region's last active/passive pair, and its instrumental
           ablative: the VOICE is what does it */
        { la: 'Vōx asinum dētegit. Asinus vōce dētegitur.',
          scene: SC.f30_detegit,
          nova: [{ w: 'dētegit', e: '🎭 ⬇', g: 'iam vulpēs asinum videt, nōn leōnem: vōx asinum dētegit' },
                 { w: 'dētegitur', e: '🎭 ⬇', g: 'vōx dētegit → asinus dētegitur' }] },

        { la: 'Vulpēs loquitur: “Vōx tua nōn vōx leōnis est!”',
          scene: SC.f30_detegit, nova: [] },

        { la: 'Vulpēs aurēs videt. Aurēs longae ex pelle stant.',
          scene: SC.f30_aures,
          nova: [{ w: 'aurēs', e: '👂👂', g: 'asinus aurēs habet et audit; aurēs asinī longae sunt' },
                 { w: 'longae', e: '📏', g: 'aurēs asinī longae sunt ↔ aurēs leōnis parvae sunt' }] },

        { la: 'Aurēs asinī longae sunt; aurēs leōnis longae nōn sunt.',
          scene: SC.f30_aures, nova: [] },

        { la: 'Iam vulpēs et cervus asinum vident: asinus dētegitur.',
          scene: SC.f30_omnes, nova: [] },

        { la: 'Vulpēs rīdet: “Pellis nōn servat! Vōx et aurēs asinum dētegunt.”',
          scene: SC.f30_omnes,
          nova: [{ w: 'dētegunt', e: '🎭 ⬇⬇', g: 'vōx dētegit; vōx et aurēs dētegunt' }] },

        { la: 'Cervus et lepus vulpem sequuntur. Cervus et lepus iam nōn timent.',
          scene: SC.f30_sequuntur,
          nova: [{ w: 'sequuntur', e: '🦌🐇 ➜', g: 'ūnus sequitur, multī sequuntur' }] },

        { la: 'Asinus pellem iam nōn portat. Asinus in agrum ambulat.',
          scene: SC.f30_discedit, nova: [] },

        { la: 'Vulpēs et cervus et lepus rīdent. Asinus quoque rīdet.',
          scene: SC.f30_moral, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: asinus in pelle leōnis asinus manet.',
          scene: SC.f30_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'asinus', scene: SC.v_asinus },
          { la: 'pellis', scene: SC.v_pellis },
          { la: 'cervus', scene: SC.v_cervus },
          { la: 'lepus',  scene: SC.v_lepus },
          { la: 'canis',  scene: SC.v_canis },
          { la: 'vulpēs', emoji: '🦊' }
        ]
      },
      /* SONUS. Four four-footed animals share this capitulum and every
         one of them is a different silhouette (antlers · long ears ·
         a dog · a pack-beast), which is why they may stand together —
         the test is whether a learner who has HEARD the word can be
         punished for tapping a true picture, and none of these four is
         a picture of another. `silva` (trees) never meets `arbor`, which
         is not carded here, and `pellis` never meets a lion, because
         this fable does not contain one. */
      sonus: [
        { la: 'asinus',
          answer: { la: 'asinus', scene: SC.v_asinus },
          options: [{ la: 'asinus', scene: SC.v_asinus },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'pellis', scene: SC.v_pellis }] },
        { la: 'pellis',
          answer: { la: 'pellis', scene: SC.v_pellis },
          options: [{ la: 'pellis', scene: SC.v_pellis },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'silva', scene: SC.v_silva }] },
        { la: 'cervus',
          answer: { la: 'cervus', scene: SC.v_cervus },
          options: [{ la: 'cervus', scene: SC.v_cervus },
                    { la: 'lepus', scene: SC.v_lepus },
                    { la: 'canis', scene: SC.v_canis }] },
        { la: 'canis',
          answer: { la: 'canis', scene: SC.v_canis },
          options: [{ la: 'canis', scene: SC.v_canis },
                    { la: 'lepus', scene: SC.v_lepus },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'vulpēs', emoji: '🦊' }] }
      ],
      /* OVERRIDES. Target-grammar items: 4 of 6 in CORRIGE (the passive
         three times and a deponent once), 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'asinus', scene: SC.v_asinus },
            { la: 'pellis', scene: SC.v_pellis },
            { la: 'cervus', scene: SC.v_cervus },
            { la: 'lepus',  scene: SC.v_lepus },
            { la: 'canis',  scene: SC.v_canis },
            { la: 'vulpēs', emoji: '🦊' }
          ],
          scrambles: [
            { la: 'Asinus pellem leōnis invenit.',    scene: SC.f30_pellis },
            { la: 'Vulpēs asinum sequitur.',          scene: SC.f30_sequitur },
            { la: 'Asinus vōce dētegitur.',           scene: SC.f30_detegit },
            { la: 'Aurēs asinī longae sunt.',         scene: SC.f30_aures }
          ]
        },
        corrige: [
          { words: ['Asinus', 'vōce', 'dētegit.'], wrong: 2,
            options: ['dētegitur.', 'dētegunt.', 'dētege!'], correct: 0, scene: SC.f30_detegit },
          { words: ['Iam', 'asinus', 'leō', 'videt!'], wrong: 3,
            options: ['vidētur!', 'vidēte!', 'vident!'], correct: 0, scene: SC.f30_leo },
          { words: ['Vōx', 'asinum', 'dētegitur.'], wrong: 2,
            options: ['dētegit.', 'dētegis.', 'dētegite!'], correct: 0, scene: SC.f30_detegit },
          /* the deponent: one animal walks behind another, and only one
             of these three verbs is what the picture shows */
          { words: ['Vulpēs', 'asinum', 'fugit.'], wrong: 2,
            options: ['sequitur.', 'portat.', 'capit.'], correct: 0, scene: SC.f30_sequitur },
          { words: ['Aurēs', 'asinī', 'parvae', 'sunt.'], wrong: 2,
            options: ['longae', 'altae', 'aureae'], correct: 0, scene: SC.f30_aures },
          { words: ['Asinus', 'in', 'pelle', 'cervī', 'est.'], wrong: 3,
            options: ['leōnis', 'canis', 'leporis'], correct: 0, scene: SC.f30_induit }
        ],
        comple: [
          { text: 'Vōx asinum dētegit. Asinus vōce ___.',
            options: ['dētegitur', 'dētegit', 'dētegunt'], correct: 0, scene: SC.f30_detegit },
          { text: 'Asinus in pelle leōnis est: iam asinus leō ___!',
            options: ['vidētur', 'videt', 'vidēte'], correct: 0, scene: SC.f30_leo },
          { text: 'Vulpēs nōn fugit: vulpēs asinum ___.',
            options: ['sequitur', 'sequuntur', 'sequī'], correct: 0, scene: SC.f30_sequitur },
          { text: 'Cervus et lepus vulpem ___.',
            options: ['sequuntur', 'sequitur', 'sequere'], correct: 0, scene: SC.f30_sequuntur },
          { text: 'Aurēs asinī ___ sunt.',
            options: ['longae', 'parvae', 'altae'], correct: 0, scene: SC.f30_aures },
          { text: 'Asinus ___ leōnis portat.',
            options: ['pellem', 'pellis', 'pelle'], correct: 0, scene: SC.f30_induit }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r10',
    titulus: 'Portus',
    ladder: 'S10',                /* CURRICULUM §0: passive voice + deponents */
    progressId: 'r10',
    capitula: capitula,
    boss: {
      id: 'b_r10',
      progressId: 'r10',
      /* THE EAGLE of f28 comes back for the duel — the one animal in
         this region that took something and had to give it back. She is
         not the wolf (CURRICULUM §1 gives him R1, R5, R9 and the R12
         finale), but she is the boss of the track's tenth region, so
         her fight is longer than the ordinary six-hit duel: hp 8 over
         78 phase-seconds. Everything else the phase engine tunes —
         spawn rate, fall speed, item count — already scales off
         regionIndex (DESIGN §6, js/boss-phases.js), so r10 is
         automatically faster than r05 without a number here.
         FLAGGED FOR THE INTEGRATOR: rule_boss_min_ms('r10') should stay
         at the 15000 every duel region uses. A longer fight cannot be
         forged FASTER, so the floor does not move. */
      name: 'Aquila',
      actor: 'aquila',
      vinceText: 'Aquilam vince!',
      /* LEGACY single-phase tuning, kept for the two reasons every
         earlier region keeps it: server/lib/rules.php derives
         rule_boss_min_ms from these numbers, and a client without
         js/boss-phases.js must still be able to run the fight. */
      hp: 8,
      seconds: 55,
      pos: { x: 0.72, y: 0.15 },
      phases: [
        { type: 'caterva', hp: 3, seconds: 26 },
        { type: 'clamor',  hp: 3, seconds: 30 },
        { type: 'fuga',    hp: 2, seconds: 22 }
      ],
      /* HAND-AUTHORED CLĀMOR (AUTHORING-BRIEF, binding from wave 3).
         Six items, two from each capitulum. Every gap is a picturable
         content lexeme WITH a vocabulary card in this region and stands
         in its DICTIONARY form — the catchable tile carries the word's
         citation form, so a gap wanting `pellem` would be answered by a
         card the learner knows as `pellis` (the shape js/boss-phases.js
         enforces on its own deriver, and the shape r05/r06 kept). Every
         option is the same part of speech as the gap; every distractor
         is a thing that is plainly NOT in the pictured scene, and each
         gap's neighbours were checked against this region's own story
         bigrams so that no distractor stands where the region's Latin
         actually puts it.
         Note that the SENTENCES carry the region's grammar — four of
         the six are passive — while the GAPS stay nominative: the
         clāmor phase tests reading, and the reading is the passive. */
      clamor: [
        { text: '____ catulum capit et ad nīdum portat.',
          answer: 'aquila', options: ['aquila', 'columba', 'formīca'],
          scene: SC.f28_capit },
        { text: 'In arbore altā ____ est: aquila ōva servat.',
          answer: 'nīdus', options: ['nīdus', 'rēte', 'āra'],
          scene: SC.f28_ova },
        { text: 'Aquila ____ timet: nīdus iam nōn tūtus est.',
          answer: 'ignis', options: ['ignis', 'aqua', 'rēte'],
          scene: SC.f28_periculum },
        { text: '____ ā formīcā servāta est: iam tūta in arbore sedet.',
          answer: 'columba', options: ['columba', 'vulpēs', 'aquila'],
          scene: SC.f29_tuta },
        { text: 'Vēnātor ____ sub arbore pōnit: columbās capere vult.',
          answer: 'rēte', options: ['rēte', 'nīdus', 'āra'],
          scene: SC.f29_rete },
        { text: 'Asinus ____ leōnis portat: iam asinus leō vidētur.',
          answer: 'pellis', options: ['pellis', 'arbor', 'rēte'],
          scene: SC.f30_induit }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum, which is what
         app.js's bossWords() needs to resolve it. All three capitula are
         represented. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'aquila',  from: 'f28' },
        { la: 'nīdus',   from: 'f28' },
        { la: 'columba', from: 'f29' },
        { la: 'rēte',    from: 'f29' },
        { la: 'pellis',  from: 'f30' }
      ]
    }
  });
})();
