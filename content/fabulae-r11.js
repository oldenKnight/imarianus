/* ============================================================
   content/fabulae-r11.js — FĀBULAE · Regiō XI · TEMPLUM  (ladder S11)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō X:
     f31 Lupus et Grūs        — PURPOSE (ut / nē) and the indirect question
     f32 Rānae Rēgem Petunt   — purpose again, and the passive subjunctive
     f33 Senex et Mors        — the RESULT clause and the cum-clause

   STAGE CEILING (CURRICULUM §0 S11, binding):
     everything S1–S10 (all five cases · the perfect, the imperfect and the
     present · imperative, vocative, questions · pronouns is/hic/ille ·
     comparatives and adverbs · relative clauses · THE PASSIVE VOICE and
     the deponents loquitur/sequitur, Regiō X) PLUS the SUBJUNCTIVE:
     purpose with ut / nē, result with tam … ut, cum-clauses, and the
     indirect question.
     STILL FORBIDDEN and avoided throughout: accusative + īnfīnītīvus,
     the ablative absolute and the gerundive — all three are Regiō XII's,
     and this region deliberately leaves them alone so that the finale
     has something of its own.

   ------------------------------------------------------------
   SIX RULINGS TAKEN IN THIS REGION.

   1. THE SUBJUNCTIVE IS TAUGHT THE WAY REGIŌ VI TAUGHT THE IMPERFECT AND
      REGIŌ X THE PASSIVE: on ONE known verb at a time, with the
      indicative standing beside it in the gloss.

          grūs venit    →  lupus clāmat ut grūs veniat
          grūs iuvat    →  lupus rogat ut grūs eum iuvet
          lupus timet   →  lupus ōs aperit nē grūs timeat
          senex potest  →  onus tam magnum est ut senex portāre nōn possit

      NO NEW VERB IS EVER INTRODUCED IN THE SUBJUNCTIVE. Every ut-, nē-,
      result- and cum-clause in this region is built on a verb Regiōnēs
      I–X taught with a picture. The one new verb the region's grammar
      needs — `extrahit` — arrives in a purpose clause ONLY after the
      indicative has stood on the page beside it.

   2. THE CONJUNCTIONS ARE GLOSSED AS A CONTRAST, IN ONE FRAME: `ut` and
      `nē` are introduced two pages apart on the SAME verb and the same
      picture (`ut grūs veniat` · `nē grūs timeat`), so the learner meets
      the pair, not two unrelated words.

   3. SEQUENCE OF TENSES IS OBEYED AND IS NEVER FUDGED (LATIN-STYLE §4
      names this explicitly). The narrative tense of this track is the
      PRESENT, so every purpose, result and indirect question here takes
      the PRESENT subjunctive. The region contains exactly ONE historical
      cum-clause, and it sits inside a page-pair that is past on both
      sides — `Ōlim, cum senex in silvā ambulāret, onus magnum portābat`
      — an imperfect main verb (Regiō VI's own tense) with an imperfect
      subjunctive under it. Nowhere is a present main verb given a past
      subjunctive or the reverse.

   4. THE PASSIVE SUBJUNCTIVE IS USED, TWICE, AND ONLY IN f32: `nē
      capiantur`, `nē videantur`. It is not a new construction — it is
      Regiō X's voice inside Regiō XI's mood — and it is glossed off the
      passive the learner already reads (`capitur → nē capiantur`). It is
      also, in this fable, what keeps the B-rating: the frogs hide so as
      not to be caught, and nothing catches them.

   5. THE BONE IS NOT IN THIS FABLE, ON PURPOSE (departure from the fable
      as commonly told, recorded). Aesop's wolf has a BONE stuck in his
      throat; the Latin for it is `os, ossis`, which is a homograph of
      `ōs, ōris` — the MOUTH, which Regiō III taught and which this very
      page needs three times over (`caput in ōs lupī`, `ex ōre lupī`).
      Ørberg would not put `os in ōre` in front of a learner and neither
      will this file, and there is no bone in the art library to picture
      one with either. What sticks is `cibus` — a word the learner has
      had since Regiō IV, pictured, and the exact thing the crane then
      pulls out. The fable's punchline survives word for word:
      `satis est quod caput ex ōre lupī salvum extrāxistī`.

   6. B-RATING (DESIGN §8) — three decisions, all flagged for the line
      audit.
      · f31: the wolf never threatens to bite the crane's head off (the
        classical wolf makes the point by boasting he COULD have). He
        simply refuses to pay and says the head came out safe, which is
        the same moral without the menace, and the crane leaves whole.
      · f32: the stork CHASES and NOTHING IS EATEN ON-PAGE. The frogs
        dive, the stork walks the bank, and the fable ends on what the
        frogs have lost — `lībertātem iam nōn habent` — which is what
        the fable is actually about.
      · f33: MORS IS A PERSON, and a calm one — a veiled figure in a
        dark blue robe who walks up, stands, and asks a question. NO
        scythe, NO skeleton, NO shadow, no hood. She is drawn with the
        same `person` actor as everybody else in this track, at the same
        scale, on the same ground; the only thing that marks her is the
        colour of the cloth. The fable's own humour carries the page —
        the old man calls her and then wants his firewood lifted — and
        the mōrāle says exactly that. This is the region's most-flagged
        page-set and the report says so.

   TEMPLUM IS TAUGHT. Regiōnēs IV, V and X all had to report that their
   own name could not be pictured (`via`, `portus`). This one can: f32's
   frogs take their demand to a TEMPLE, with the `āra` Regiō X built
   standing in front of it, and `templum` is a vocabulary card.

   PROGRESS IDS ARE FROZEN once shipped: f31/f32/f33 and progressId
   'r11' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* the robe of Mors. Defined ONCE, as a variable, so that every frame
     she stands in is the same figure — a reader must never wonder
     whether this is the same person. Palette indigo (#4d6c8a) is the
     colour actors-person.js reserves for veils and royal trim; the
     mantle is one step darker. Nothing else in the track wears it. */
  var MORS = { role: 'woman', robeColor: '#4d6c8a', mantleColor: '#3d5670',
               veil: true, hair: 'long', hairColor: '#3a2417', beard: 'none' };
  function mors(x, s, extra) {
    var o = { t: 'person', x: x, y: G, s: s || 1 }, k;
    for (k in MORS) { if (Object.prototype.hasOwnProperty.call(MORS, k)) { o[k] = MORS[k]; } }
    if (extra) { for (k in extra) { if (Object.prototype.hasOwnProperty.call(extra, k)) { o[k] = extra[k]; } } }
    return o;
  }

  var SC = {

    /* ============ fable 31 — Lupus et Grūs ============

       THE CRANE AT THE WOLF'S MOUTH, staged against the art and MEASURED,
       not estimated. The first draft of this file put the two animals
       side by side at equal scale and the picture was wrong: rendered at
       the real 440 px story width, the crane's beak sailed clear over the
       wolf's skull and the crane's BODY covered his muzzle, so the frame
       read "a wolf about to bite a bird's flank" — the one thing the
       B-rating forbids and the opposite of the fable. The numbers below
       come from the art itself:

         · the `wolf` 'angry' pose is the ONE pose in this set with an
           OPEN MOUTH (js/scenes.js: `open = pose === 'angry' || 'leap'`).
           Its head group sits at actor-local (34, −50) and the gape is
           drawn from head-local x 8 to 26, y −2 to 12 — so the open jaw
           centres on actor-local (+50, −44), MIRRORED to (−50, −44) when
           the wolf is flipped: 44 units above the ground line.
         · the crane's beak is drawn from head-local (hr·0.6, −1) out to
           (hr·2.6, +3) with hr 7, and its head sits at actor-local
           (18, −76) — so the beak TIP is at actor-local (+40.4, −74):
           74 units above the ground line.

       74·sGrūs = 44·sLupus, i.e. sGrūs ≈ 0.6·sLupus, is therefore the
       only way these two heads meet on this ground line. Equal scales
       CANNOT produce this picture — the crane is drawn a third taller
       than the wolf.

       The solution is a CLOSE-UP rather than a shrunken bird: the wolf
       comes forward to s 1.7 (his hindquarters run off the right edge,
       which is what a close-up is), and the crane keeps a natural s 1.01.
       Then 74·1.01 = 74.7 ≈ 44·1.7 = 74.8 — the beak tip and the gape
       land on the same line, and
           craneX + 40.4·1.01 = 296 − 50·1.7  →  craneX ≈ 176
       puts the tip in the middle of the open jaw. Verified by rendering,
       not by arithmetic alone: the beak goes in between the teeth.

       The wolf then HOLDS STILL — same x, same scale, same pose across
       aperit → caput → extrahit — and only the crane moves (132 apart ·
       176 in · 146 backing out with the dish). That is the beat the text
       describes and it is why the three frames cut together. */

    f31_lupus:   { bg: 'forest', items: [
                   { t: 'tree', x: 320, y: G, s: 1.05 },
                   { t: 'wolf', x: 168, y: G, s: 1.05, pose: 'walk' }
                 ] },

    f31_cibus:   { bg: 'forest', items: [
                   { t: 'tree',    x: 336, y: G, s: 1 },
                   { t: 'wolf',    x: 208, y: G, s: 1.05 },
                   { t: 'patina',  x: 108, y: G, s: 1.2 }
                 ] },

    f31_devorat: { bg: 'forest', items: [
                   { t: 'wolf',   x: 196, y: G, s: 1.15, pose: 'angry' },
                   { t: 'patina', x: 104, y: G, s: 1.1 }
                 ] },

    /* the food that stays in the mouth: mouth open, and a 😖 over him */
    f31_manet:   { bg: 'forest', items: [
                   { t: 'wolf', x: 200, y: G, s: 1.2, pose: 'angry' }
                 ],
                 bubbles: [{ x: 316, y: 60, w: 62, h: 42, text: '😖', kind: 'thought', tail: 'left', fs: 19 }] },

    f31_nonbibit: { bg: 'river', items: [
                   { t: 'wolf', x: 196, y: 152, s: 1.1, pose: 'angry' }
                 ],
                 bubbles: [{ x: 322, y: 58, w: 68, h: 42, text: '💧 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f31_grus:    { bg: 'river', items: [
                   { t: 'grus', x: 214, y: 176, s: 1.15 }
                 ] },

    f31_venit:   { bg: 'river', items: [
                   { t: 'wolf', x: 288, y: 152, s: 1.05, pose: 'walk', flip: true },
                   { t: 'grus', x: 118, y: 172, s: 1.1 }
                 ] },

    f31_rogat:   { bg: 'river', items: [
                   { t: 'wolf', x: 284, y: 152, s: 1.05, pose: 'angry', flip: true },
                   { t: 'grus', x: 132, y: 172, s: 1.1 }
                 ],
                 bubbles: [{ x: 224, y: 48, w: 78, h: 44, text: '🆘 💬', kind: 'speech', tail: 'left', fs: 17 }] },

    f31_timet:   { bg: 'river', items: [
                   { t: 'wolf', x: 284, y: 152, s: 1.05, pose: 'angry', flip: true },
                   { t: 'grus', x: 132, y: 172, s: 1.1 }
                 ],
                 bubbles: [{ x: 108, y: 60, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'right', fs: 19 }] },

    /* THE CLOSE-UP. The wolf holds one position and one scale across all
       three frames (x 296, s 1.7) and ONLY THE CRANE MOVES: apart, in,
       back out. See the staging note at the head of the f31 block for
       why the numbers are what they are. */
    f31_aperit:  { bg: 'plain', items: [
                   { t: 'wolf', x: 296, y: G, s: 1.7, pose: 'angry', flip: true },
                   { t: 'grus', x: 132, y: G, s: 1.01 }
                 ] },

    /* the head goes IN: the crane steps up and the beak lands inside the
       open jaw, teeth above it and below it */
    f31_caput:   { bg: 'plain', items: [
                   { t: 'wolf', x: 296, y: G, s: 1.7, pose: 'angry', flip: true },
                   { t: 'grus', x: 176, y: G, s: 1.01 }
                 ] },

    f31_extrahit: { bg: 'plain', items: [
                   { t: 'wolf',   x: 296, y: G, s: 1.7, pose: 'angry', flip: true },
                   { t: 'grus',   x: 146, y: G, s: 1.01 },
                   { t: 'patina', x: 46,  y: G, s: 1 }
                 ],
                 bubbles: [{ x: 150, y: 52, w: 56, h: 40, text: '🍽 ⬅', kind: 'thought', tail: 'right', fs: 17 }] },

    f31_laetus:  { bg: 'river', items: [
                   { t: 'wolf', x: 286, y: 152, s: 1.05, flip: true },
                   { t: 'grus', x: 128, y: 172, s: 1.1 }
                 ],
                 bubbles: [{ x: 300, y: 56, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'left', fs: 19 }] },

    f31_petit:   { bg: 'river', items: [
                   { t: 'wolf', x: 286, y: 152, s: 1.05, flip: true },
                   { t: 'grus', x: 130, y: 172, s: 1.1 }
                 ],
                 bubbles: [{ x: 218, y: 50, w: 76, h: 44, text: '🍽 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    f31_nondat:  { bg: 'river', items: [
                   { t: 'wolf', x: 286, y: 152, s: 1.05, flip: true },
                   { t: 'grus', x: 130, y: 172, s: 1.1 }
                 ],
                 bubbles: [{ x: 210, y: 50, w: 76, h: 44, text: '🍽 ✗', kind: 'speech', tail: 'left', fs: 17 }] },

    f31_satis:   { bg: 'river', items: [
                   { t: 'wolf', x: 286, y: 152, s: 1.05, flip: true },
                   { t: 'grus', x: 130, y: 172, s: 1.1 }
                 ],
                 bubbles: [{ x: 206, y: 50, w: 84, h: 44, text: '👤 ✓ 👌', kind: 'speech', tail: 'left', fs: 16 }] },

    f31_discedit: { bg: 'river', items: [
                   { t: 'grus', x: 268, y: 174, s: 1.1 },
                   { t: 'wolf', x: 66,  y: 152, s: 0.95, pose: 'walk', flip: true }
                 ] },

    f31_moral:   { bg: 'river', items: [
                   { t: 'grus', x: 236, y: 176, s: 1.2 }
                 ] },

    /* ============ fable 32 — Rānae Rēgem Petunt ============ */

    f32_ranae:   { bg: 'river', items: [
                   { t: 'rana', x: 128, y: 172, s: 1.2 },
                   { t: 'rana', x: 216, y: 182, s: 1.05 },
                   { t: 'rana', x: 300, y: 190, s: 1.1, flip: true }
                 ] },

    f32_clamant: { bg: 'river', items: [
                   { t: 'rana', x: 128, y: 172, s: 1.2 },
                   { t: 'rana', x: 216, y: 182, s: 1.05 },
                   { t: 'rana', x: 300, y: 190, s: 1.1, flip: true }
                 ],
                 bubbles: [{ x: 200, y: 52, w: 78, h: 44, text: '👑 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    /* the temple, and Regiō X's altar in front of it */
    f32_templum: { bg: 'mountain', items: [
                   { t: 'temple', x: 236, y: G, s: 1.05 },
                   { t: 'altar',  x: 96,  y: G, s: 0.85 }
                 ] },

    /* IUPPITER IS NEVER DRAWN. He is a voice over the temple: a speech
       bubble high in the frame with nothing under its tail. The frogs
       are small and at the bottom, which is the whole composition of the
       page. (A pagan god in a children's Latin reader is a picture this
       product does not need, and the fable does not need it either — in
       Phaedrus he is a voice too.) */
    f32_iuppiter: { bg: 'mountain', items: [
                   { t: 'temple', x: 244, y: G, s: 1.05 },
                   { t: 'altar',  x: 104, y: G, s: 0.85 },
                   { t: 'rana',   x: 46,  y: G, s: 0.9 },
                   { t: 'rana',   x: 152, y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 244, y: 40, w: 92, h: 44, text: '👑 ➜ 🐸', kind: 'speech', tail: 'left', fs: 16 }] },

    f32_mittit:  { bg: 'river', items: [
                   { t: 'truncus', x: 210, y: 120, s: 1.3 },
                   { t: 'rana',    x: 106, y: 178, s: 1.1 },
                   { t: 'rana',    x: 308, y: 188, s: 1.05, flip: true }
                 ] },

    f32_cadit:   { bg: 'river', items: [
                   { t: 'truncus', x: 206, y: 180, s: 1.5 },
                   { t: 'rana',    x: 84,  y: 172, s: 1.05 },
                   { t: 'rana',    x: 330, y: 190, s: 1, flip: true }
                 ] },

    f32_fugiunt: { bg: 'river', items: [
                   { t: 'truncus', x: 206, y: 180, s: 1.5 }
                 ],
                 bubbles: [{ x: 74, y: 62, w: 68, h: 42, text: '🐸 💨', kind: 'thought', tail: 'right', fs: 18 }] },

    f32_truncus: { bg: 'river', items: [
                   { t: 'truncus', x: 200, y: 180, s: 1.6 }
                 ] },

    f32_saliunt: { bg: 'river', items: [
                   { t: 'truncus', x: 204, y: 180, s: 1.5 },
                   { t: 'rana',    x: 176, y: 166, s: 1 },
                   { t: 'rana',    x: 244, y: 168, s: 0.95, flip: true },
                   { t: 'rana',    x: 92,  y: 176, s: 1 }
                 ] },

    f32_ridet:   { bg: 'river', items: [
                   { t: 'truncus', x: 204, y: 180, s: 1.5 },
                   { t: 'rana',    x: 176, y: 166, s: 1 },
                   { t: 'rana',    x: 244, y: 168, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 96, y: 58, w: 68, h: 42, text: '👑 ✗', kind: 'speech', tail: 'right', fs: 18 }] },

    f32_iterum:  { bg: 'mountain', items: [
                   { t: 'temple', x: 244, y: G, s: 1.05 },
                   { t: 'altar',  x: 104, y: G, s: 0.85 },
                   { t: 'rana',   x: 46,  y: G, s: 0.9 },
                   { t: 'rana',   x: 152, y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 152, y: 46, w: 84, h: 44, text: '👑 ➕ ❗', kind: 'speech', tail: 'right', fs: 16 }] },

    f32_ciconia: { bg: 'river', items: [
                   { t: 'ciconia', x: 246, y: 158, s: 1.1, flip: true },
                   { t: 'rana',    x: 108, y: 180, s: 1.05 }
                 ] },

    f32_sequitur: { bg: 'river', items: [
                   { t: 'ciconia', x: 268, y: 160, s: 1.1, pose: 'walk', flip: true },
                   { t: 'rana',    x: 156, y: 178, s: 1.05 },
                   { t: 'rana',    x: 84,  y: 186, s: 1 }
                 ] },

    /* B-RATING: the frogs go UNDER, the stork walks the bank, and the
       frame holds no frog at all. Nothing is caught (see the header). */
    f32_capiantur: { bg: 'river', items: [
                   { t: 'ciconia', x: 292, y: 158, s: 1.1, pose: 'walk', flip: true }
                 ],
                 bubbles: [{ x: 96, y: 96, w: 76, h: 44, text: '🐸 ⬇ 💧', kind: 'thought', tail: 'right', fs: 17 }] },

    f32_manent:  { bg: 'river', items: [
                   { t: 'ciconia', x: 316, y: 158, s: 1.05, flip: true }
                 ],
                 bubbles: [{ x: 118, y: 104, w: 68, h: 42, text: '🐸 🙈', kind: 'thought', tail: 'right', fs: 18 }] },

    f32_tristes: { bg: 'river', items: [
                   { t: 'rana',    x: 116, y: 180, s: 1.1 },
                   { t: 'rana',    x: 196, y: 188, s: 1.05 },
                   { t: 'ciconia', x: 332, y: 158, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 120, y: 84, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 19 }] },

    f32_moral:   { bg: 'river', items: [
                   { t: 'rana',    x: 122, y: 180, s: 1.1 },
                   { t: 'rana',    x: 200, y: 190, s: 1.05 },
                   { t: 'ciconia', x: 330, y: 158, s: 1, flip: true }
                 ] },

    /* ============ fable 33 — Senex et Mors ============ */

    f33_senex:   { bg: 'forest', items: [
                   { t: 'tree',   x: 322, y: G, s: 1.05 },
                   { t: 'person', x: 168, y: G, s: 1.05, role: 'patriarch', pose: 'walk' }
                 ] },

    f33_onus:    { bg: 'forest', items: [
                   { t: 'tree',   x: 330, y: G, s: 1 },
                   { t: 'person', x: 176, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                   { t: 'fascis', x: 216, y: G, s: 1.15 }
                 ] },

    f33_ambulat: { bg: 'mountain', items: [
                   { t: 'person', x: 232, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                   { t: 'fascis', x: 272, y: G, s: 1.1 }
                 ] },

    f33_fessus:  { bg: 'mountain', items: [
                   { t: 'person', x: 236, y: G, s: 1.05, role: 'patriarch' },
                   { t: 'fascis', x: 278, y: G, s: 1.1 }
                 ],
                 bubbles: [{ x: 108, y: 78, w: 56, h: 40, text: '😓', kind: 'thought', tail: 'right', fs: 19 }] },

    f33_ponit:   { bg: 'forest', items: [
                   { t: 'tree',   x: 296, y: G, s: 1.15 },
                   { t: 'person', x: 196, y: G, s: 1.05, role: 'patriarch', pose: 'sit' },
                   { t: 'fascis', x: 118, y: G, s: 1.15 }
                 ] },

    f33_sedet:   { bg: 'forest', items: [
                   { t: 'tree',   x: 296, y: G, s: 1.15 },
                   { t: 'person', x: 196, y: G, s: 1.05, role: 'patriarch', pose: 'sit' },
                   { t: 'fascis', x: 118, y: G, s: 1.15 }
                 ],
                 bubbles: [{ x: 296, y: 74, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'left', fs: 19 }] },

    f33_vocat:   { bg: 'forest', items: [
                   { t: 'tree',   x: 296, y: G, s: 1.15 },
                   { t: 'person', x: 196, y: G, s: 1.05, role: 'patriarch', pose: 'arms-up' },
                   { t: 'fascis', x: 118, y: G, s: 1.15 }
                 ],
                 bubbles: [{ x: 262, y: 44, w: 68, h: 42, text: '📢 💬', kind: 'speech', tail: 'left', fs: 18 }] },

    /* MORS ARRIVES. She walks in from the left, upright, at the same
       scale as the old man, on the same ground — see the header,
       ruling 6. Nothing is dark in the frame but her cloth. */
    f33_mors:    { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.15 },
                   mors(96, 1.05, { pose: 'walk' }),
                   { t: 'person', x: 246, y: G, s: 1.05, role: 'patriarch', pose: 'sit', flip: true },
                   { t: 'fascis', x: 176, y: G, s: 1.1 }
                 ] },

    f33_stat:    { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.15 },
                   mors(120, 1.05),
                   { t: 'person', x: 246, y: G, s: 1.05, role: 'patriarch', pose: 'sit', flip: true },
                   { t: 'fascis', x: 182, y: G, s: 1.1 }
                 ] },

    f33_rogat:   { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.15 },
                   mors(120, 1.05),
                   { t: 'person', x: 246, y: G, s: 1.05, role: 'patriarch', pose: 'sit', flip: true },
                   { t: 'fascis', x: 182, y: G, s: 1.1 }
                 ],
                 bubbles: [{ x: 128, y: 46, w: 68, h: 42, text: '❓ 💬', kind: 'speech', tail: 'right', fs: 18 }] },

    f33_timet:   { bg: 'forest', items: [
                   { t: 'tree',   x: 300, y: G, s: 1.15 },
                   mors(120, 1.05),
                   { t: 'person', x: 250, y: G, s: 1.05, role: 'patriarch', pose: 'sit', flip: true },
                   { t: 'fascis', x: 184, y: G, s: 1.1 }
                 ],
                 bubbles: [{ x: 300, y: 60, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'left', fs: 19 }] },

    f33_levat:   { bg: 'forest', items: [
                   { t: 'tree',   x: 306, y: G, s: 1.15 },
                   mors(140, 1.05, { pose: 'point' }),
                   { t: 'fascis', x: 200, y: G, s: 1.15 },
                   { t: 'person', x: 268, y: G, s: 1.05, role: 'patriarch', pose: 'arms-up', flip: true }
                 ],
                 bubbles: [{ x: 268, y: 42, w: 76, h: 44, text: '📦 ⬆ ❗', kind: 'speech', tail: 'left', fs: 17 }] },

    f33_portat:  { bg: 'mountain', items: [
                   { t: 'person', x: 214, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                   { t: 'fascis', x: 254, y: G, s: 1.1 }
                 ] },

    /* THEY PART, and the picture has to say so: Mors walks off to the
       left (flipped) and the old man walks off to the right (not
       flipped), so the frame holds two backs going opposite ways. The
       draft had both flipped, which drew them leaving together — the one
       reading this page must not have. */
    f33_discedit: { bg: 'forest', items: [
                   { t: 'tree', x: 316, y: G, s: 1.1 },
                   mors(84, 1, { pose: 'walk', flip: true }),
                   { t: 'person', x: 240, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                   { t: 'fascis', x: 196, y: G, s: 1.05 }
                 ] },

    f33_moral:   { bg: 'mountain', items: [
                   { t: 'person', x: 200, y: G, s: 1.15, role: 'patriarch', pose: 'walk' },
                   { t: 'fascis', x: 242, y: G, s: 1.15 }
                 ] },

    /* ============ vocabulary mini-scenes ============ */

    v_grus:      { bg: 'river', items: [{ t: 'grus', x: 200, y: 180, s: 1.55 }] },
    /* cibus: grain AND a full dish, so the card teaches the CLASS and not
       one food — Regiō IV f11's own device, rebuilt here because a card
       may not point at another region's file */
    v_cibus:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 132, y: G, s: 1.5 },
                   { t: 'patina',    x: 272, y: G, s: 1.9 }
                 ] },
    v_silva:     { bg: 'forest', items: [
                   { t: 'tree', x: 120, y: G, s: 1.05 },
                   { t: 'tree', x: 282, y: G, s: 0.9 }
                 ] },
    v_arbor:     { bg: 'plain', items: [{ t: 'tree', x: 200, y: G, s: 1.2 }] },
    v_mons:      { bg: 'mountain', items: [] },
    v_rivus:     { bg: 'river', items: [] },

    v_rana:      { bg: 'river', items: [{ t: 'rana', x: 196, y: 178, s: 1.6 }] },
    /* rēx: the crown is on a man, because a crown lying on the ground is
       a picture of a crown and not of a king */
    v_rex:       { bg: 'plain', items: [{ t: 'person', x: 196, y: G, s: 1.5, role: 'king' }] },
    v_truncus:   { bg: 'river', items: [{ t: 'truncus', x: 200, y: 182, s: 1.7 }] },
    v_ciconia:   { bg: 'mountain', items: [{ t: 'ciconia', x: 150, y: G, s: 1.5 }] },
    v_templum:   { bg: 'mountain', items: [{ t: 'temple', x: 200, y: G, s: 1.35 }] },
    /* āra: the STONE, with flame:false — Regiō X's ruling, kept, so that
       the altar card and any fire in the track stay two pictures */
    v_ara:       { bg: 'plain', items: [{ t: 'altar', x: 200, y: G, s: 1.9, flame: false }] },

    v_senex:     { bg: 'mountain', items: [{ t: 'person', x: 196, y: G, s: 1.5, role: 'patriarch' }] },
    /* MORS on the card: the same figure, alone, standing still. HELD OUT
       OF SONUS on purpose — she is a person and so is `senex`, and a
       learner who hears one and taps the other has heard correctly. She
       is recycled in AENIGMATA, in both written sets, and in the boss's
       clāmor, where the SENTENCE decides. */
    v_mors:      { bg: 'forest', items: [mors(196, 1.5)] },
    v_onus:      { bg: 'plain', items: [{ t: 'fascis', x: 200, y: G, s: 2 }] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 31 — Lupus et Grūs ============
       PURPOSE CLAUSES EVERYWHERE, which is what this fable is made of:
       every single thing anybody does in it is done IN ORDER TO get
       something. Seven ut/nē clauses, one indirect question, one result
       clause and one cum-clause, all on verbs Regiōnēs I–X taught with a
       picture.

       THE WOLF SPINE (CURRICULUM §1): the same Lupus who has the bosses
       of R1, R5, R9 and the R12 finale walks through this capitulum as
       the one who cannot pay. It is his last appearance before the
       finale, and Regiō XII f36 begins where this leaves him — hungry,
       in the wood, owing a debt.

       THE BONE IS NOT HERE: see the file header, ruling 5. */
    {
      id: 'f31',
      titulus: 'Lupus et Grūs',
      icon: '🐺🐦',
      numerus: 'XXXI',
      pos: { x: 0.30, y: 0.86 },
      vocab: [
        { la: 'grūs',   scene: SC.v_grus,    pars: 'nomen' },
        { la: 'lupus',  emoji: '🐺',         pars: 'nomen' },
        { la: 'cibus',  scene: SC.v_cibus,   pars: 'nomen' },
        { la: 'silva',  scene: SC.v_silva,   pars: 'nomen' },
        { la: 'arbor',  scene: SC.v_arbor,   pars: 'nomen' },
        { la: 'mōns',   scene: SC.v_mons,    pars: 'nomen' },
        { la: 'rīvus',  scene: SC.v_rivus,   pars: 'nomen' },
        { la: 'timet',  emoji: '😨',         pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce lupus! Lupus in silvā habitat. Lupus semper ēsurit.',
          scene: SC.f31_lupus, nova: [] },

        { la: 'Lupus cibum quaerit ut dēvoret.',
          scene: SC.f31_cibus,
          nova: [{ w: 'ut dēvoret', e: '➜ 🍽', g: 'lupus dēvorat → lupus cibum quaerit ut dēvoret' }] },

        { la: 'Lupus cibum invenit. Lupus cibum celeriter dēvorat.',
          scene: SC.f31_devorat,
          nova: [{ w: 'celeriter', e: '💨', g: 'celer → celeriter; lupus nōn tardē, sed celeriter dēvorat' }] },

        { la: 'Sed cibus in ōre lupī manet! Lupus cibum nōn dēvorat.',
          scene: SC.f31_manet, nova: [] },

        /* RESULT: tam … ut, on posse — a construction the learner has had
           since Regiō V, in a mood he meets today */
        { la: 'Cibus tam magnus est ut lupus bibere nōn possit.',
          scene: SC.f31_manet,
          nova: [{ w: 'tam … ut', e: '📏 ➜', g: 'cibus magnus est; lupus bibere nōn potest: cibus tam magnus est ut bibere nōn possit' },
                 { w: 'possit', e: '💪 ❓', g: 'lupus potest → … ut nōn possit' }] },

        { la: 'Lupus celeriter ad rīvum currit ut aquam bibat.',
          scene: SC.f31_nonbibit,
          nova: [{ w: 'bibat', e: '💧 ➜', g: 'lupus bibit → lupus currit ut bibat' }] },

        { la: 'Sed lupus aquam bibere nōn potest. Lupus trīstis est.',
          scene: SC.f31_nonbibit, nova: [] },

        { la: 'Ecce grūs! Grūs in rīvō stat. Grūs longum rōstrum habet.',
          scene: SC.f31_grus,
          nova: [{ w: 'grūs', e: '🐦', g: 'grūs longum rōstrum habet et in aquā stat' }] },

        /* CUM + present subjunctive under a present main verb: the
           circumstantial cum, in sequence (see the header, ruling 3) */
        { la: 'Cum lupus clāmāre nōn possit, ad gruem ambulat.',
          scene: SC.f31_venit,
          nova: [{ w: 'cum … possit', e: '🕰 ➜', g: 'lupus clāmāre nōn potest: cum clāmāre nōn possit, ad gruem ambulat' }] },

        { la: 'Lupus gruem rogat ut grūs eum iuvet.',
          scene: SC.f31_rogat,
          nova: [{ w: 'rogat', e: '💬 ❓', g: 'lupus quaerit et rogat: “Iuvā mē!”' },
                 { w: 'iuvet', e: '🤝 ➜', g: 'grūs iuvat → lupus rogat ut grūs iuvet' }] },

        { la: 'Lupus dīcit: “Ō grūs! Venī et mē iuvā!”',
          scene: SC.f31_rogat, nova: [] },

        { la: 'Grūs timet: lupus enim magnus est. Grūs rogat quid lupus cupiat.',
          scene: SC.f31_timet,
          nova: [{ w: 'quid … cupiat', e: '❓ 💭', g: 'grūs rogat: “Quid cupis?” — grūs rogat quid lupus cupiat' }] },

        /* nē, two pages after ut, on the same picture and the same verb
           the learner has had since Regiō I */
        { la: 'Lupus ōs aperit nē grūs timeat.',
          scene: SC.f31_aperit,
          nova: [{ w: 'nē timeat', e: '🚫 😨', g: 'grūs timet → lupus ōs aperit nē grūs timeat' }] },

        { la: 'Grūs caput in ōs lupī pōnit ut cibum extrahat.',
          scene: SC.f31_caput,
          nova: [{ w: 'caput', e: '🧠', g: 'in capite oculī et ōs et aurēs sunt' },
                 { w: 'extrahat', e: '🍽 ⬅', g: 'grūs cibum ex ōre trahit: extrahit; grūs caput pōnit ut extrahat' }] },

        { la: 'Grūs cibum rōstrō capit. Grūs cibum ex ōre lupī extrahit.',
          scene: SC.f31_extrahit,
          nova: [{ w: 'extrahit', e: '🍽 ⬅', g: 'iam cibus in ōre nōn est: grūs cibum extrahit' }] },

        { la: 'Iam lupus bibere potest. Lupus laetus est.',
          scene: SC.f31_laetus, nova: [] },

        { la: 'Grūs lupō beneficium dat: grūs lupum iuvat.',
          scene: SC.f31_laetus,
          nova: [{ w: 'beneficium', e: '🎁 🤝', g: 'grūs lupum iuvat: grūs lupō beneficium dat' }] },

        { la: 'Iam grūs cibum petit. Grūs lupum rogat: “Ō lupe! Dā cibum!”',
          scene: SC.f31_petit,
          nova: [{ w: 'petit', e: '🤲 ❓', g: 'grūs cibum cupit et rogat: grūs cibum petit' }] },

        { la: 'Lupus rīdet. Lupus gruī cibum nōn dat: lupus beneficium nōn reddit.',
          scene: SC.f31_nondat, nova: [] },

        { la: 'Grūs iterum petit: “Ō lupe! Ubi est cibus meus?”',
          scene: SC.f31_petit, nova: [] },

        /* THE PUNCHLINE, word for word as the fable has it */
        { la: 'Lupus respondet: “Satis est quod caput ex ōre lupī salvum extrāxistī.”',
          scene: SC.f31_satis,
          nova: [{ w: 'salvum', e: '🛡', g: 'salvus = tūtus; caput gruis salvum est' },
                 { w: 'satis', e: '👌', g: 'caput tuum salvum est: satis est! lupus nihil dat' },
                 { w: 'extrāxistī', e: '⬅ 👤', g: 'grūs extrahit → lupus dīcit: “Ō grūs, extrāxistī!”' }] },

        { la: 'Grūs discēdit. Grūs nihil habet, sed grūs salva est: satis est.',
          scene: SC.f31_discedit, nova: [] },

        { la: 'Grūs nihil iam petit. Caput salvum est: satis est.',
          scene: SC.f31_moral, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: lupus beneficium nōn reddit.',
          scene: SC.f31_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'grūs',  scene: SC.v_grus },
          { la: 'lupus', emoji: '🐺' },
          { la: 'cibus', scene: SC.v_cibus },
          { la: 'rīvus', scene: SC.v_rivus },
          { la: 'mōns',  scene: SC.v_mons },
          { la: 'arbor', scene: SC.v_arbor }
        ]
      },
      /* SONUS. `silva` is trees and `arbor` is a tree, so they are never
         on one board (`silva` is out, and recycled in both written sets);
         `mōns` and `rīvus` are PLACES with nothing standing in them, and
         a rock face and a blue band are not each other. */
      sonus: [
        { la: 'grūs',
          answer: { la: 'grūs', scene: SC.v_grus },
          options: [{ la: 'grūs', scene: SC.v_grus },
                    { la: 'lupus', emoji: '🐺' },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'lupus',
          answer: { la: 'lupus', emoji: '🐺' },
          options: [{ la: 'lupus', emoji: '🐺' },
                    { la: 'grūs', scene: SC.v_grus },
                    { la: 'cibus', scene: SC.v_cibus }] },
        { la: 'cibus',
          answer: { la: 'cibus', scene: SC.v_cibus },
          options: [{ la: 'cibus', scene: SC.v_cibus },
                    { la: 'grūs', scene: SC.v_grus },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'mōns',
          answer: { la: 'mōns', scene: SC.v_mons },
          options: [{ la: 'mōns', scene: SC.v_mons },
                    { la: 'rīvus', scene: SC.v_rivus },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'grūs', scene: SC.v_grus }] }
      ],
      /* OVERRIDES. The generated set cannot reach this region's grammar
         for two reasons now: content-loader.js skips quoted pages, and it
         gaps only words standing in their DICTIONARY form — which a
         subjunctive never does. Every hand item below keeps the CUE on
         screen (the ut/nē, the tam, the question word), so no item is a
         coin-flip.
         Target-grammar items: 5 of 6 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'grūs',  scene: SC.v_grus },
            { la: 'lupus', emoji: '🐺' },
            { la: 'cibus', scene: SC.v_cibus },
            { la: 'rīvus', scene: SC.v_rivus },
            { la: 'mōns',  scene: SC.v_mons },
            { la: 'timet', emoji: '😨' }
          ],
          scrambles: [
            { la: 'Lupus ad rīvum currit ut aquam bibat.',   scene: SC.f31_nonbibit },
            { la: 'Lupus ōs aperit nē grūs timeat.',         scene: SC.f31_aperit },
            { la: 'Grūs cibum ex ōre lupī extrahit.',        scene: SC.f31_extrahit },
            { la: 'Grūs lupō beneficium dat.',               scene: SC.f31_laetus }
          ]
        },
        corrige: [
          /* PURPOSE: the three options are real forms of one verb, so
             only the mood is in question, and `ut` is on screen */
          { words: ['Lupus', 'currit', 'ut', 'aquam', 'bibit.'], wrong: 4,
            options: ['bibat.', 'bibite!', 'bibunt.'], correct: 0, scene: SC.f31_nonbibit },
          { words: ['Lupus', 'ōs', 'aperit', 'nē', 'grūs', 'timet.'], wrong: 5,
            options: ['timeat.', 'timent.', 'timē!'], correct: 0, scene: SC.f31_aperit },
          /* the CONJUNCTION itself: the wolf opens his mouth so that the
             crane may NOT be afraid, and the picture says which way */
          { words: ['Lupus', 'ōs', 'aperit', 'ut', 'grūs', 'timeat.'], wrong: 3,
            options: ['nē', 'et', 'iam'], correct: 0, scene: SC.f31_aperit },
          /* RESULT: `tam` is on screen, so the ut-clause can only be one
             thing */
          { words: ['Cibus', 'tam', 'magnus', 'est', 'ut', 'lupus', 'bibere', 'nōn', 'potest.'], wrong: 8,
            options: ['possit.', 'poterat.', 'potestis.'], correct: 0, scene: SC.f31_manet },
          /* INDIRECT QUESTION */
          { words: ['Grūs', 'rogat', 'quid', 'lupus', 'cupit.'], wrong: 4,
            options: ['cupiat.', 'cupīte!', 'cupimus.'], correct: 0, scene: SC.f31_timet },
          { words: ['Grūs', 'cibum', 'ex', 'ōre', 'lupī', 'pōnit.'], wrong: 5,
            options: ['extrahit.', 'bibit.', 'petit.'], correct: 0, scene: SC.f31_extrahit }
        ],
        comple: [
          { text: 'Lupus ad rīvum currit ut aquam ___.',
            options: ['bibat', 'bibit', 'bibunt'], correct: 0, scene: SC.f31_nonbibit },
          { text: 'Lupus ōs aperit ___ grūs timeat.',
            options: ['nē', 'ut', 'et'], correct: 0, scene: SC.f31_aperit },
          { text: 'Grūs caput in ōs lupī pōnit ut cibum ___.',
            options: ['extrahat', 'extrahit', 'extrahunt'], correct: 0, scene: SC.f31_caput },
          { text: 'Cibus tam magnus est ut lupus bibere nōn ___.',
            options: ['possit', 'potest', 'poterat'], correct: 0, scene: SC.f31_manet },
          { text: 'Grūs rogat quid lupus ___.',
            options: ['cupiat', 'cupit', 'cupiunt'], correct: 0, scene: SC.f31_timet },
          { text: 'Grūs lupō ___ dat, sed lupus nihil reddit.',
            options: ['beneficium', 'cibum', 'caput'], correct: 0, scene: SC.f31_laetus }
        ]
      }
    },

    /* ============ FABLE 32 — Rānae Rēgem Petunt ============
       PURPOSE AGAIN, and then the PASSIVE SUBJUNCTIVE — Regiō X's voice
       inside Regiō XI's mood, glossed off the passive the learner reads
       (`capitur → nē capiantur`). It is also what keeps the fable inside
       the B-rating: the frogs dive SO AS NOT TO BE CAUGHT, and nothing
       catches them. See the file header, ruling 6.

       IUPPITER IS NEVER DRAWN (see SC.f32_iuppiter) and never declined:
       he is nominative or vocative on every page he appears on, because
       `Iovis`/`Iovem` is a paradigm this ladder has no room for and no
       page needs. */
    {
      id: 'f32',
      titulus: 'Rānae Rēgem Petunt',
      icon: '🐸👑',
      numerus: 'XXXII',
      pos: { x: 0.72, y: 0.60 },
      vocab: [
        { la: 'rāna',    scene: SC.v_rana,    pars: 'nomen' },
        { la: 'rēx',     scene: SC.v_rex,     pars: 'nomen' },
        { la: 'truncus', scene: SC.v_truncus, pars: 'nomen' },
        { la: 'ciconia', scene: SC.v_ciconia, pars: 'nomen' },
        { la: 'templum', scene: SC.v_templum, pars: 'nomen' },
        { la: 'āra',     scene: SC.v_ara,     pars: 'nomen' },
        { la: 'rīvus',   scene: SC.v_rivus,   pars: 'nomen' },
        { la: 'timet',   emoji: '😨',         pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce rānae! Rānae in rīvō habitant. Rānae līberae sunt.',
          scene: SC.f32_ranae, nova: [] },

        { la: 'Sed rānae rēgem nōn habent. Rānae cotīdiē clāmant.',
          scene: SC.f32_clamant,
          nova: [{ w: 'rēx', e: '👑', g: 'rēx vir magnus est: rēx corōnam in capite habet' }] },

        { la: 'Rānae rēgem petunt ut tūtae sint.',
          scene: SC.f32_clamant,
          nova: [{ w: 'ut sint', e: '➜ 🛡', g: 'rānae tūtae sunt → rānae rēgem petunt ut tūtae sint' }] },

        { la: 'Rānae ad templum veniunt. In templō āra est.',
          scene: SC.f32_templum,
          nova: [{ w: 'templum', e: '🏛', g: 'in templō āra est; rānae ad templum veniunt ut Iuppiter audiat' }] },

        { la: 'Rānae ad āram clāmant: “Ō Iuppiter! Mitte rēgem!”',
          scene: SC.f32_iuppiter,
          nova: [{ w: 'Iuppiter', e: '☁ 💬', g: 'Iuppiter rānās audit; Iuppiter in templō nōn vidētur' },
                 { w: 'mitte', e: '➜', g: 'Iuppiter rēgem mittit → “Ō Iuppiter, mitte rēgem!”' }] },

        { la: 'Iuppiter rānās audit. Iuppiter rīdet.',
          scene: SC.f32_iuppiter, nova: [] },

        { la: 'Iuppiter truncum mittit ut rānae rēgem habeant.',
          scene: SC.f32_mittit,
          nova: [{ w: 'mittit', e: '➜ 🌳', g: 'Iuppiter truncum ad rānās mittit' },
                 { w: 'habeant', e: '👑 ➜', g: 'rānae habent → Iuppiter mittit ut habeant' }] },

        { la: 'Truncus in aquam cadit! Rānae timent et fugiunt.',
          scene: SC.f32_cadit, nova: [] },

        { la: 'Rānae sub aquā manent nē truncus eās videat.',
          scene: SC.f32_fugiunt,
          nova: [{ w: 'eās', e: '👉🐸🐸', g: 'rānae → truncus rānās nōn videt: eās nōn videt' }] },

        { la: 'Posteā rānae vident: truncus nōn ambulat, nōn clāmat.',
          scene: SC.f32_truncus, nova: [] },

        { la: 'Rānae super truncum saliunt. Rānae rīdent.',
          scene: SC.f32_saliunt, nova: [] },

        { la: 'Rānae clāmant: “Hic rēx malus est! Mitte rēgem magnum!”',
          scene: SC.f32_ridet, nova: [] },

        { la: 'Rānae iterum ad templum veniunt ut Iuppiter eās audiat.',
          scene: SC.f32_iterum, nova: [] },

        { la: 'Iuppiter ciconiam mittit ut rānae rēgem magnum habeant.',
          scene: SC.f32_ciconia,
          nova: [{ w: 'ciconia', e: '🐦', g: 'ciconia longum rōstrum habet; ciconia rānās petit' }] },

        { la: 'Ecce ciconia! Ciconia longa et alba est.',
          scene: SC.f32_ciconia, nova: [] },

        { la: 'Ciconia rānās sequitur. Rānae ciconiam timent.',
          scene: SC.f32_sequitur, nova: [] },

        /* THE PASSIVE SUBJUNCTIVE, and the B-rating: they hide, and the
           frame holds no frog at all */
        { la: 'Rānae in aquam saliunt nē capiantur.',
          scene: SC.f32_capiantur,
          nova: [{ w: 'nē capiantur', e: '🚫 ✊', g: 'rāna capitur → rānae saliunt nē capiantur' }] },

        { la: 'Rānae sub aquā manent nē videantur.',
          scene: SC.f32_manent,
          nova: [{ w: 'nē videantur', e: '🚫 👀', g: 'rāna vidētur → rānae manent nē videantur' }] },

        { la: 'Rānae iterum clāmant: “Ō Iuppiter! Mitte truncum!”',
          scene: SC.f32_tristes, nova: [] },

        { la: 'Sed Iuppiter nōn respondet. Rānae rēgem habent, lībertātem nōn habent.',
          scene: SC.f32_tristes, nova: [] },

        { la: 'Ōlim rānae lībertātem habēbant. Iam rēgem timent.',
          scene: SC.f32_tristes,
          nova: [{ w: 'lībertās', e: '🔓', g: 'līber → lībertās; ōlim rānae līberae erant: lībertātem habēbant' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: rānae rēgem petunt et lībertātem iam nōn habent.',
          scene: SC.f32_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'rāna',    scene: SC.v_rana },
          { la: 'rēx',     scene: SC.v_rex },
          { la: 'truncus', scene: SC.v_truncus },
          { la: 'ciconia', scene: SC.v_ciconia },
          { la: 'templum', scene: SC.v_templum },
          { la: 'āra',     scene: SC.v_ara }
        ]
      },
      /* SONUS. `templum` and `āra` are both stone and both in the same
         picture on two story pages, but the CARDS are a whole building
         and a waist-high block, and the altar deliberately does not burn
         (Regiō X's ruling) — so they may stand together. `rīvus` is the
         water with nothing in it and never meets `rāna`, who lives in it. */
      sonus: [
        { la: 'rāna',
          answer: { la: 'rāna', scene: SC.v_rana },
          options: [{ la: 'rāna', scene: SC.v_rana },
                    { la: 'ciconia', scene: SC.v_ciconia },
                    { la: 'truncus', scene: SC.v_truncus }] },
        { la: 'ciconia',
          answer: { la: 'ciconia', scene: SC.v_ciconia },
          options: [{ la: 'ciconia', scene: SC.v_ciconia },
                    { la: 'rāna', scene: SC.v_rana },
                    { la: 'rēx', scene: SC.v_rex }] },
        { la: 'rēx',
          answer: { la: 'rēx', scene: SC.v_rex },
          options: [{ la: 'rēx', scene: SC.v_rex },
                    { la: 'templum', scene: SC.v_templum },
                    { la: 'ciconia', scene: SC.v_ciconia }] },
        { la: 'templum',
          answer: { la: 'templum', scene: SC.v_templum },
          options: [{ la: 'templum', scene: SC.v_templum },
                    { la: 'āra', scene: SC.v_ara },
                    { la: 'truncus', scene: SC.v_truncus },
                    { la: 'rāna', scene: SC.v_rana }] }
      ],
      /* OVERRIDES. Target-grammar items: 5 of 6 in CORRIGE, 5 of 6 in
         COMPLĒ, and two of them are the PASSIVE subjunctive, which is the
         one thing in this region that no earlier region could set up. */
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'rāna',    scene: SC.v_rana },
            { la: 'rēx',     scene: SC.v_rex },
            { la: 'truncus', scene: SC.v_truncus },
            { la: 'ciconia', scene: SC.v_ciconia },
            { la: 'templum', scene: SC.v_templum },
            { la: 'āra',     scene: SC.v_ara }
          ],
          scrambles: [
            { la: 'Rānae rēgem petunt ut tūtae sint.',   scene: SC.f32_clamant },
            { la: 'Iuppiter truncum mittit.',            scene: SC.f32_mittit },
            { la: 'Rānae super truncum saliunt.',        scene: SC.f32_saliunt },
            { la: 'Ciconia rānās sequitur.',             scene: SC.f32_sequitur }
          ]
        },
        corrige: [
          { words: ['Rānae', 'rēgem', 'petunt', 'ut', 'tūtae', 'sunt.'], wrong: 5,
            options: ['sint.', 'estis.', 'erant.'], correct: 0, scene: SC.f32_clamant },
          { words: ['Iuppiter', 'truncum', 'mittit', 'ut', 'rānae', 'rēgem', 'habent.'], wrong: 6,
            options: ['habeant.', 'habēte!', 'habēbant.'], correct: 0, scene: SC.f32_mittit },
          /* PASSIVE SUBJUNCTIVE: the frogs jump so as not to BE caught,
             and the only frog-free frame in the fable says so */
          { words: ['Rānae', 'in', 'aquam', 'saliunt', 'nē', 'capiuntur.'], wrong: 5,
            options: ['capiantur.', 'capiunt.', 'capite!'], correct: 0, scene: SC.f32_capiantur },
          { words: ['Rānae', 'sub', 'aquā', 'manent', 'ut', 'videantur.'], wrong: 4,
            options: ['nē', 'et', 'quoque'], correct: 0, scene: SC.f32_manent },
          { words: ['Iuppiter', 'ciconiam', 'portat.'], wrong: 2,
            options: ['mittit.', 'petit.', 'timet.'], correct: 0, scene: SC.f32_ciconia },
          { words: ['Rānae', 'ad', 'templum', 'veniunt', 'ut', 'Iuppiter', 'eās', 'audit.'], wrong: 7,
            options: ['audiat.', 'audīte!', 'audiunt.'], correct: 0, scene: SC.f32_iterum }
        ],
        comple: [
          { text: 'Rānae rēgem petunt ut tūtae ___.',
            options: ['sint', 'sunt', 'erant'], correct: 0, scene: SC.f32_clamant },
          { text: 'Iuppiter truncum mittit ut rānae rēgem ___.',
            options: ['habeant', 'habent', 'habēbant'], correct: 0, scene: SC.f32_mittit },
          { text: 'Rānae in aquam saliunt nē ___.',
            options: ['capiantur', 'capiuntur', 'capiunt'], correct: 0, scene: SC.f32_capiantur },
          { text: 'Rānae sub aquā manent ___ videantur.',
            options: ['nē', 'ut', 'et'], correct: 0, scene: SC.f32_manent },
          { text: 'Rānae ad templum veniunt ut Iuppiter eās ___.',
            options: ['audiat', 'audit', 'audiunt'], correct: 0, scene: SC.f32_iterum },
          { text: 'In ___ āra est: rānae ad āram clāmant.',
            options: ['templō', 'truncō', 'rīvō'], correct: 0, scene: SC.f32_templum }
        ]
      }
    },

    /* ============ FABLE 33 — Senex et Mors ============
       THE RESULT CLAUSE AND THE CUM-CLAUSE, on the quietest page-set in
       the track. The region's only historical cum sits here, in a pair of
       sentences that are past on both sides (`cum … ambulāret` under an
       imperfect `portābat`), and the result clause is the fable's whole
       situation: `onus tam magnum est ut senex portāre nōn possit`.

       MORS: see the file header, ruling 6. A veiled woman in a dark blue
       robe, drawn with the same actor and at the same scale as the old
       man, who walks up, stands, and asks him a question. The fable's own
       joke does the rest, and the mōrāle states it without a shadow on
       it: `senex Mortem vocat, sed Mortem vidēre nōn cupit`.
       FLAGGED for line-audit — every page of it. */
    {
      id: 'f33',
      titulus: 'Senex et Mors',
      icon: '👴📦',
      numerus: 'XXXIII',
      pos: { x: 0.26, y: 0.36 },
      vocab: [
        { la: 'senex',  scene: SC.v_senex, pars: 'nomen' },
        { la: 'Mors',   scene: SC.v_mors,  pars: 'nomen' },
        { la: 'onus',   scene: SC.v_onus,  pars: 'nomen' },
        { la: 'arbor',  scene: SC.v_arbor, pars: 'nomen' },
        { la: 'silva',  scene: SC.v_silva, pars: 'nomen' },
        { la: 'mōns',   scene: SC.v_mons,  pars: 'nomen' },
        { la: 'fessus', emoji: '😓',       pars: 'adiectivum' },
        { la: 'timet',  emoji: '😨',       pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce senex! Senex in silvā ambulat.',
          scene: SC.f33_senex,
          nova: [{ w: 'senex', e: '👴', g: 'senex vir est: senex nōn celeriter ambulat, quia fessus est' }] },

        { la: 'Senex onus magnum portat. Onus ex silvā venit.',
          scene: SC.f33_onus, nova: [] },

        /* THE HISTORICAL CUM, in a page that is past on both sides —
           imperfect main verb, imperfect subjunctive under it. The one
           past sentence in the region (see the header, ruling 3). */
        { la: 'Ōlim, cum senex in silvā ambulāret, onus magnum portābat.',
          scene: SC.f33_ambulat,
          nova: [{ w: 'cum … ambulāret', e: '🕰 🚶', g: 'ōlim senex ambulābat: cum ambulāret, onus portābat' }] },

        { la: 'Senex tardē ambulat. Senex fessus est.',
          scene: SC.f33_fessus,
          nova: [{ w: 'tardē', e: '🐢', g: 'tardus → tardē; senex nōn celeriter ambulat' }] },

        /* RESULT, and the fable's whole situation in one sentence */
        { la: 'Onus tam magnum est ut senex portāre nōn possit.',
          scene: SC.f33_fessus, nova: [] },

        { la: 'Senex onus pōnit ut sedeat.',
          scene: SC.f33_ponit,
          nova: [{ w: 'sedeat', e: '🪑 ➜', g: 'senex sedet → senex onus pōnit ut sedeat' }] },

        { la: 'Senex sub arbore sedet. Senex trīstis est.',
          scene: SC.f33_sedet, nova: [] },

        { la: 'Senex tam fessus est ut ambulāre nōn possit.',
          scene: SC.f33_sedet, nova: [] },

        { la: 'Senex clāmat: “Ō Mors! Venī!”',
          scene: SC.f33_vocat,
          nova: [{ w: 'Mors', e: '🕊', g: 'Mors venit et stat; Mors nōn clāmat, nōn currit; senex Mortem timet' }] },

        { la: 'Senex Mortem vocat ut Mors veniat.',
          scene: SC.f33_vocat,
          nova: [{ w: 'vocat', e: '📢 ➜', g: 'senex clāmat: “Ō Mors, venī!” — senex Mortem vocat' }] },

        { la: 'Et ecce! Mors venit. Mors nōn currit, nōn clāmat.',
          scene: SC.f33_mors, nova: [] },

        { la: 'Mors ad senem ambulat et stat. Mors senem videt.',
          scene: SC.f33_stat, nova: [] },

        /* the indirect question, in narration, one line before the same
           question is asked aloud */
        { la: 'Mors rogat cūr senex clāmet.',
          scene: SC.f33_rogat,
          nova: [{ w: 'cūr … clāmet', e: '❓ 💭', g: 'Mors rogat: “Cūr clāmās?” — Mors rogat cūr senex clāmet' }] },

        { la: 'Mors dīcit: “Ō senex! Cūr mē vocās?”',
          scene: SC.f33_rogat, nova: [] },

        { la: 'Senex Mortem videt. Senex timet.',
          scene: SC.f33_timet, nova: [] },

        { la: 'Senex Mortem vidēre iam nōn cupit.',
          scene: SC.f33_timet, nova: [] },

        /* the fable's joke, and it is the whole fable */
        { la: 'Senex respondet: “Ō Mors! Levā onus meum! Tam magnum est!”',
          scene: SC.f33_levat,
          nova: [{ w: 'levā', e: '📦 ⬆', g: 'Mors onus levat → “Ō Mors, levā onus!”' }] },

        { la: 'Mors onus levat. Mors senī onus dat.',
          scene: SC.f33_levat, nova: [] },

        { la: 'Senex onus iterum levat et portat. Senex ambulat.',
          scene: SC.f33_portat, nova: [] },

        { la: 'Mors discēdit. Mors nōn clāmat, nōn currit.',
          scene: SC.f33_discedit, nova: [] },

        { la: 'Senex Mortem iam nōn vocat. Senex tardē in montem ambulat.',
          scene: SC.f33_moral, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: senex Mortem vocat, sed Mortem vidēre nōn cupit.',
          scene: SC.f33_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'senex',  scene: SC.v_senex },
          { la: 'onus',   scene: SC.v_onus },
          { la: 'arbor',  scene: SC.v_arbor },
          { la: 'mōns',   scene: SC.v_mons },
          { la: 'grūs',   scene: SC.v_grus },
          { la: 'rāna',   scene: SC.v_rana }
        ]
      },
      /* SONUS. `Mors` is HELD OUT: she is a person and so is `senex`, and
         a learner who hears one and taps the other has heard correctly.
         `silva` is out against `arbor` for the reason f31 gave. Both are
         recycled in AENIGMATA and in the two written sets, where the
         sentence decides — which is also where the boss meets her. */
      sonus: [
        { la: 'senex',
          answer: { la: 'senex', scene: SC.v_senex },
          options: [{ la: 'senex', scene: SC.v_senex },
                    { la: 'onus', scene: SC.v_onus },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'onus',
          answer: { la: 'onus', scene: SC.v_onus },
          options: [{ la: 'onus', scene: SC.v_onus },
                    { la: 'senex', scene: SC.v_senex },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'arbor',
          answer: { la: 'arbor', scene: SC.v_arbor },
          options: [{ la: 'arbor', scene: SC.v_arbor },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'onus', scene: SC.v_onus }] },
        { la: 'fessus',
          answer: { la: 'fessus', emoji: '😓' },
          options: [{ la: 'fessus', emoji: '😓' },
                    { la: 'timet', emoji: '😨' },
                    { la: 'senex', scene: SC.v_senex },
                    { la: 'onus', scene: SC.v_onus }] }
      ],
      /* OVERRIDES. Target-grammar items: 5 of 6 in CORRIGE, 5 of 6 in
         COMPLĒ. Every past-tense item keeps `Ōlim` inside the item text,
         which is Regiō VI's ruling 2 applied to the imperfect
         subjunctive: a drawing cannot show pastness, so the cue has to
         be on the screen. */
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'senex',  scene: SC.v_senex },
            { la: 'Mors',   scene: SC.v_mors },
            { la: 'onus',   scene: SC.v_onus },
            { la: 'arbor',  scene: SC.v_arbor },
            { la: 'mōns',   scene: SC.v_mons },
            { la: 'fessus', emoji: '😓' }
          ],
          scrambles: [
            { la: 'Senex onus magnum portat.',       scene: SC.f33_onus },
            { la: 'Senex onus pōnit ut sedeat.',     scene: SC.f33_ponit },
            { la: 'Senex Mortem vocat.',             scene: SC.f33_vocat },
            { la: 'Mors onus levat.',                scene: SC.f33_levat }
          ]
        },
        corrige: [
          { words: ['Senex', 'onus', 'pōnit', 'ut', 'sedet.'], wrong: 4,
            options: ['sedeat.', 'sedēte!', 'sedēbat.'], correct: 0, scene: SC.f33_ponit },
          { words: ['Senex', 'Mortem', 'vocat', 'ut', 'Mors', 'venit.'], wrong: 5,
            options: ['veniat.', 'venī!', 'veniunt.'], correct: 0, scene: SC.f33_vocat },
          /* RESULT: `tam` is on screen */
          { words: ['Onus', 'tam', 'magnum', 'est', 'ut', 'senex', 'portāre', 'nōn', 'potest.'], wrong: 8,
            options: ['possit.', 'poterat.', 'potestis.'], correct: 0, scene: SC.f33_fessus },
          /* THE HISTORICAL CUM, with Ōlim kept in the item (R6 ruling 2) */
          { words: ['Ōlim,', 'cum', 'senex', 'ambulābat,', 'onus', 'portābat.'], wrong: 3,
            options: ['ambulāret,', 'ambulā!,', 'ambulant,'], correct: 0, scene: SC.f33_ambulat },
          /* INDIRECT QUESTION */
          { words: ['Mors', 'rogat', 'cūr', 'senex', 'clāmat.'], wrong: 4,
            options: ['clāmet.', 'clāmā!', 'clāmant.'], correct: 0, scene: SC.f33_rogat },
          { words: ['Mors', 'onus', 'portat.'], wrong: 2,
            options: ['levat.', 'petit.', 'timet.'], correct: 0, scene: SC.f33_levat }
        ],
        comple: [
          { text: 'Senex onus pōnit ut ___.',
            options: ['sedeat', 'sedet', 'sedēte'], correct: 0, scene: SC.f33_ponit },
          { text: 'Senex Mortem vocat ut Mors ___.',
            options: ['veniat', 'venit', 'veniunt'], correct: 0, scene: SC.f33_vocat },
          { text: 'Onus tam magnum est ut senex portāre nōn ___.',
            options: ['possit', 'potest', 'poterat'], correct: 0, scene: SC.f33_fessus },
          { text: 'Ōlim, cum senex in silvā ___, onus portābat.',
            options: ['ambulāret', 'ambulat', 'ambulāte'], correct: 0, scene: SC.f33_ambulat },
          { text: 'Mors rogat cūr senex ___.',
            options: ['clāmet', 'clāmat', 'clāmant'], correct: 0, scene: SC.f33_rogat },
          { text: 'Senex ___ vocat, sed eam vidēre nōn cupit.',
            options: ['Mortem', 'onus', 'montem'], correct: 0, scene: SC.f33_vocat }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r11',
    titulus: 'Templum',
    ladder: 'S11',                /* CURRICULUM §0: the subjunctive */
    progressId: 'r11',
    capitula: capitula,
    boss: {
      id: 'b_r11',
      progressId: 'r11',
      /* THE CRANE of f31 comes back for the duel — the one creature in
         this region who did somebody a service and was not paid for it.
         Her fight is one hit longer than Regiō X's, and the extra hit is
         in CLĀMOR, because clāmor is the phase that reads sentences and
         this region's sentences are the point of it: hp 9 over 80
         phase-seconds.
         FLAGGED FOR THE INTEGRATOR: rule_boss_min_ms('r11') stays at the
         15000 every duel region uses. */
      name: 'Grūs',
      actor: 'grus',
      vinceText: 'Gruem vince!',
      /* LEGACY single-phase tuning (rules.php reads it; a client without
         js/boss-phases.js must still be able to fight) */
      hp: 9,
      seconds: 60,
      pos: { x: 0.66, y: 0.14 },
      phases: [
        { type: 'caterva', hp: 3, seconds: 26 },
        { type: 'clamor',  hp: 4, seconds: 32 },
        { type: 'fuga',    hp: 2, seconds: 22 }
      ],
      /* HAND-AUTHORED CLĀMOR (AUTHORING-BRIEF, binding from wave 3).
         Six items, two per capitulum, and EVERY SENTENCE FRAME CARRIES
         THE REGION'S GRAMMAR: four purpose clauses, one result clause and
         one nē-clause, with the subjunctive verb left standing so the
         learner reads it while choosing.
         The GAPS, by contrast, stay picturable and nominative. That is
         not a compromise, it is the phase's own contract: the catchable
         tile is a PICTURE with the word's dictionary form behind it
         (js/boss-phases.js), so a gap wanting `rēgem` would be answered
         by a card the learner knows as `rēx`. Every gap below is a
         subject; every option is a nomen with a card in this region;
         every distractor is a thing that is plainly not in the pictured
         scene, and each gap's neighbours were checked against the
         region's own story bigrams. */
      clamor: [
        { text: 'Lupus rogat ut ____ eum iuvet.',
          answer: 'grūs', options: ['grūs', 'rāna', 'ciconia'],
          scene: SC.f31_rogat },
        { text: 'Grūs caput in ōs lupī pōnit ut ____ extrahat.',
          answer: 'cibus', options: ['cibus', 'truncus', 'templum'],
          scene: SC.f31_caput },
        { text: 'Rānae clāmant ut ____ veniat: rēgem petunt.',
          answer: 'rēx', options: ['rēx', 'templum', 'āra'],
          scene: SC.f32_clamant },
        { text: 'Rānae in aquam saliunt nē capiantur: ____ enim venit.',
          answer: 'ciconia', options: ['ciconia', 'rāna', 'grūs'],
          scene: SC.f32_capiantur },
        { text: 'Senex sedet ut ____ veniat: senex fessus est.',
          answer: 'Mors', options: ['Mors', 'rēx', 'ciconia'],
          scene: SC.f33_vocat },
        { text: 'Senex tam fessus est ut ____ portāre nōn possit.',
          answer: 'onus', options: ['onus', 'templum', 'arbor'],
          scene: SC.f33_fessus }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum. All three
         capitula are represented; `Mors` is deliberately NOT among them,
         for the same reason she is out of SONUS — the quiz is a picture
         test, and hers is a person. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'grūs',    from: 'f31' },
        { la: 'cibus',   from: 'f31' },
        { la: 'rāna',    from: 'f32' },
        { la: 'templum', from: 'f32' },
        { la: 'senex',   from: 'f33' }
      ]
    }
  });
})();
