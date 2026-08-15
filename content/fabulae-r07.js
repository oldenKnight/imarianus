/* ============================================================
   content/fabulae-r07.js — FĀBULAE · Regiō VII · LĪTUS  (ladder S7)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō VI:
     f19 Cornīx et Urna       — the PERFECT arrives, against the imperfect
     f20 Leō Senex et Vulpēs  — the perfect in the PLURAL (-ērunt)
     f21 Asinus et Sal        — both tenses on one road, twice travelled

   STAGE CEILING (CURRICULUM §0 S7, binding):
     everything S1–S6 (all five cases · 3rd-person present of ANY
     conjugation, AUTHORING-BRIEF ruling 1 · the six prepositions ·
     imperative · vocative · questions · nōlī + īnfīnītīvus · posse/
     velle/cupere + īnfīnītīvus · the IMPERFECT · the pronouns is /
     hic / ille · and Regiō V's ruling that the 2nd person present
     indicative is legal INSIDE DIRECT SPEECH) PLUS the PERFECT.
     STILL FORBIDDEN and avoided throughout: comparatives, superlatives
     and adverbs in -ē/-iter as a system (S8 — Regiō VIII), relative
     clauses (S9), the passive and deponents (S10). No pluperfect and
     no future: S7 is ONE new tense, not a paradigm dump.

   ------------------------------------------------------------
   THE PERFECT IS THE REGION'S WHOLE POINT, and Regiō VI wrote the
   ruling this region exists to cash in. r06's file header, ruling 4:

       "Latin does not tell a story in the imperfect; it tells it in
        the perfect, which CURRICULUM §0 places at S7 precisely so
        that S7 can CONTRAST the two."

   So Regiō VI kept the narrative PRESENT for events and spent the
   imperfect only on background. Regiō VII now moves the narrative onto
   the perfect and leaves the imperfect exactly where r06 put it. The
   learner therefore meets the contrast as a DIVISION OF LABOUR that
   was already visible before the new tense existed:

       imperfect = the background that was going on   (ōlim … quaerēbat)
       perfect   = the event that happened in it      (subitō … vīdit)

   Five rulings, recorded because Regiō VIII and every later author
   will hit them again.

   1. NO NEW VERB IS INTRODUCED IN THE PERFECT. Every perfect in this
      region is built on a verb Regiōnēs I–VI already taught with a
      picture (videt, volat, clāmat, capit, cadit, est, potest,
      invenit, iacet, venit, discēdit, manet, stat, dīcit, respondet,
      pōnit, portat, rīdet, ambulat, cantat). LATIN-STYLE §2: a
      sentence that introduces new grammar uses known vocabulary. It is
      r06 ruling 1, unchanged, one tense later — and it is what makes a
      third-conjugation perfect like `cecidit` readable at all.

   2. EVERY PERFECT IS GLOSSED AGAINST THE PRESENT THE LEARNER HAS, in
      the shape r06 used for the imperfect:

          r06:  { w: 'habitābat', g: 'iam habitat; ōlim habitābat' }
          r07:  { w: 'vīdit',     g: 'iam videt; subitō vīdit' }

      One line, two forms, no translation — and the ADVERB in it is the
      tense cue, not decoration (ruling 3).

   3. ŌLIM STAYS WITH THE IMPERFECT; THE PERFECT GETS ITS OWN CUES.
      r06 ruling 2 put `ōlim` under every imperfect because a drawing
      cannot show pastness. If the perfect borrowed `ōlim` the cue would
      stop cueing anything, so the perfect takes `subitō`, `tum`,
      `tandem` and the already-taught `posteā` instead. Every
      hand-authored CORRIGE/COMPLĒ item that asks the learner to choose
      between the two tenses keeps its cue word INSIDE the item text, so
      the exercise is never a coin-flip — the r06 discipline, applied to
      a contrast that now has two live options instead of one.

   4. FORMS WHOSE PERFECT IS SPELLED LIKE THEIR PRESENT ARE NOT USED AS
      PERFECTS. `bibit`, `ascendit`, `dēfendit` are the same string in
      both tenses, and a page that teaches a tense with a form that does
      not show it teaches nothing. Wherever the story wanted one, the
      sentence was changed (AUTHORING-BRIEF's golden exemplar rule):
        · f19 wanted "the crow drank" → `Cornīx aquam bibere potuit!`,
          which says more (she could not before) and puts `potuit`
          against r06 f18's `poterat` on the same verb;
        · f19 wanted "the water rose" → `Aqua ascendēbat`, an imperfect,
          because the rising IS a process going on and this is exactly
          the job ruling 4 of r06 gave the imperfect;
        · f21 wanted "the wool drank the water" → `lāna aquam cēpit`.
      The one place a macron ALONE separates the two tenses — venit /
      vēnit, invenit / invēnit — is used deliberately and only where the
      gloss prints both forms side by side (f19 p17, f20 p7), so the
      macron is being TAUGHT there rather than relied upon.

   5. THE PLURAL PERFECT IS TAUGHT ON ONE PAGE, ON A KNOWN VERB, WITH
      THE SINGULAR BESIDE IT. f20 p5 is `Cervus et lepus leōnem
      aegrōtum vīdērunt`, glossed `ūnus vīdit; multī vīdērunt` — the
      same one-frame-two-forms device r06 used for hic ↔ ille.

   ------------------------------------------------------------
   MISSING ART, REPORTED AND NOT WORKED AROUND (Regiōnēs IV and V filed
   the same kind of report; this is the third):

     · There is no `lītus`, shore or beach in the library. `bgSea` is
       open water — it has no ground line at all (the water runs from
       y=150 to the bottom of the frame), so nothing can stand on it.
       This region is CALLED Lītus and its map header says so, and the
       word `lītus` is taught NOWHERE in it, for the reason Regiō V gave
       for `via`: teaching it would mean approximating a scene, which
       LATIN-STYLE §5 forbids.
     · There is no cave, den or `spēlunca`. f20's lion therefore lies ON
       the mountain (`bgMountain`, which the library does have) instead
       of in a den. Nothing is lost: what the fable needs is a PLACE
       animals go to and do not come back from, and the tracks are what
       carry that — see f20's own note.
     · There is no `sal` and no `spongia`. See f21's note for what was
       done instead, and the report for why `lāna` is the substitution
       the assignment itself authorised.

   ART THAT TURNED OUT TO EXIST, and is worth recording because the
   next author will look for it too: `urna` takes `water:false`,
   `high:true` and `lapilli:true` (js/actors-props.js), i.e. the jar,
   its water level and the PEBBLES IN IT are all one prop with options.
   *** THE OPTION KEY IS ASCII `lapilli`, NOT `lapillī`. *** The actor
   reads `o.lapilli`; a macron on the key is a silently different
   property, and the stones then never draw at all. This file's first
   draft had exactly that bug: every jar looked right and every jar was
   empty. Macrons belong in the Latin, never in a scene-spec key.
   f19 is drawn entirely with them and needs no new art whatever. The
   pebbles OUTSIDE the jar are `umbra` — the generic ellipse primitive
   Regiō III taught as the dog's reflection — driven at
   `w/h/color/opacity`, which is also what draws f20's vestīgia.

   PROGRESS IDS ARE FROZEN once shipped: f19/f20/f21 and progressId
   'r07' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ----------

     THE PEBBLE PRIMITIVE. `umbra` is `<ellipse rx=w ry=h fill=color
     opacity=…>` and nothing else, so a small opaque grey one is a
     stone and a small dark translucent one is a footprint. Both are
     used at a size that survives the SONUS tile: the stones are 13–20
     units wide in a 400-wide frame (≈ 4% of the width, the same
     fraction `cheese` occupies) and the tracks are 11 wide but come in
     a ROW of five, which is what makes them read as tracks rather than
     as dirt. A single track would not survive the tile and there is
     never a single one on screen.

     CAMOUFLAGE (the Regiō IV ciconia lesson, re-checked at tile size):
     the stones are COL.grey #a89c8a on bgPlain's #d8c9a0 ground —
     close in value, which is why every stone carries opacity 1 and
     sits on the GRASS band (y ≥ 204, #b9c07a) rather than on the bare
     earth. The tracks are COL.ink #3a2417 at 0.42, the darkest thing
     in the frame. `crow` is #3a3a44 and reads against every background
     here; `asinus` is a mid-grey that needed the same care as r06's
     hircus, so its vocabulary card stands on bgPlain where the cream
     sky is behind its head and the earth behind its legs. */

  var STONE = '#a89c8a';
  var TRACK = '#3a2417';

  /* one stone on the ground; x/y placed by the caller */
  function stone(x, y, w) {
    return { t: 'umbra', x: x, y: y, w: w, h: w * 0.72, color: STONE, opacity: 1 };
  }
  /* one footprint, at STORY scale */
  function track(x, y) {
    return { t: 'umbra', x: x, y: y, w: 11, h: 5.5, color: TRACK, opacity: 0.42 };
  }
  /* one footprint, at VOCABULARY-CARD scale (see v_vestigium's note:
     the story track is 5 px on a SONUS tile and has to be doubled) */
  function trackBig(x, y) {
    return { t: 'umbra', x: x, y: y, w: 24, h: 11, color: TRACK, opacity: 0.5 };
  }

  var SC = {

    /* ============ fable 19 — Cornīx et Urna ============

       THE CROW MUST NOT CARRY CHEESE. `crow`'s DEFAULT pose is 'hold',
       which draws the cāseus of Regiō I f2 in its beak (js/scenes.js).
       Every crow in this region is therefore posed 'sad' (head tilted
       down — the thirsty bird looking into the jar) or 'sing' (beak
       open — calling, and dropping). There is no neutral pose, and a
       cheese on the page would resurrect a different fable.

       THE JAR IS TALLER THAN THE BIRD, and that is the premise made
       visible: at s 1.6 the urna's rim sits at y ≈ G − 88, and at
       s 1.25 the crow's head reaches y ≈ G − 55. She cannot reach the
       water, and the picture says so before the Latin does. */

    f19_arbor:   { bg: 'plain', items: [
                   { t: 'tree', x: 296, y: G, s: 0.95 },
                   { t: 'crow', x: 296, y: G - 96, s: 1.1, pose: 'sad' }
                 ] },

    f19_quaerit: { bg: 'plain', items: [
                   { t: 'tree', x: 344, y: G, s: 0.9 },
                   { t: 'crow', x: 150, y: G, s: 1.25, pose: 'sad' }
                 ],
                 bubbles: [{ x: 78, y: 84, w: 56, h: 40, text: '💧', kind: 'thought', tail: 'right', fs: 19 }] },

    f19_videt:   { bg: 'plain', items: [
                   { t: 'crow', x: 116, y: G, s: 1.25, pose: 'sing' },
                   { t: 'urna', x: 284, y: G, s: 1.6 }
                 ] },

    f19_volat:   { bg: 'plain', items: [
                   { t: 'crow', x: 168, y: G - 54, s: 1.15, pose: 'sing' },
                   { t: 'urna', x: 288, y: G, s: 1.6 }
                 ] },

    /* the jar, its water LOW: this is the page the whole fable turns on */
    f19_urna:    { bg: 'plain', items: [
                   { t: 'crow', x: 108, y: G, s: 1.25, pose: 'sad' },
                   { t: 'urna', x: 262, y: G, s: 1.6 }
                 ] },

    f19_nonpotest: { bg: 'plain', items: [
                   { t: 'crow', x: 176, y: G, s: 1.25, pose: 'sad' },
                   { t: 'urna', x: 262, y: G, s: 1.6 }
                 ],
                 bubbles: [{ x: 82, y: 76, w: 66, h: 42, text: '💧 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f19_clamat:  { bg: 'plain', items: [
                   { t: 'crow', x: 168, y: G, s: 1.25, pose: 'sing' },
                   { t: 'urna', x: 274, y: G, s: 1.6 }
                 ],
                 bubbles: [{ x: 84, y: 60, w: 76, h: 44, text: '💧 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    /* the stones on the ground, first sight of them */
    f19_lapillus: { bg: 'plain', items: [
                   { t: 'crow', x: 250, y: G, s: 1.25, pose: 'sad' },
                   { t: 'urna', x: 340, y: G, s: 1.5 },
                   stone(96, 202, 18), stone(132, 206, 14), stone(114, 194, 11)
                 ] },

    f19_capit:   { bg: 'plain', items: [
                   { t: 'crow', x: 148, y: G, s: 1.3, pose: 'sing' },
                   { t: 'urna', x: 314, y: G, s: 1.55 },
                   stone(114, 200, 13), stone(84, 205, 16)
                 ] },

    /* the stone IN FLIGHT: one grey ellipse between the open beak and
       the jar's mouth. It is the only thing in the frame above the
       ground line that is not a bird, so it reads as thrown. */
    f19_iacit:   { bg: 'plain', items: [
                   { t: 'crow', x: 128, y: G, s: 1.3, pose: 'sing' },
                   stone(210, G - 96, 15),
                   { t: 'urna', x: 296, y: G, s: 1.6, lapilli: true }
                 ] },

    f19_ascendit1: { bg: 'plain', items: [
                   { t: 'crow', x: 122, y: G, s: 1.25, pose: 'sad' },
                   { t: 'urna', x: 288, y: G, s: 1.6, lapilli: true }
                 ],
                 bubbles: [{ x: 200, y: 74, w: 54, h: 38, text: '⬆', kind: 'thought', tail: 'right', fs: 19 }] },

    f19_multi:   { bg: 'plain', items: [
                   { t: 'crow', x: 122, y: G, s: 1.3, pose: 'sing' },
                   stone(198, G - 92, 14), stone(232, G - 118, 11),
                   { t: 'urna', x: 300, y: G, s: 1.6, lapilli: true },
                   stone(78, 204, 15), stone(108, 207, 12)
                 ] },

    f19_ascendit2: { bg: 'plain', items: [
                   { t: 'crow', x: 118, y: G, s: 1.3, pose: 'sing' },
                   stone(206, G - 100, 13),
                   { t: 'urna', x: 300, y: G, s: 1.6, high: true, lapilli: true },
                   stone(80, 205, 14)
                 ] },

    /* the water AT THE RIM: `high` moves it from y −20 to y −42 */
    f19_plena:   { bg: 'plain', items: [
                   { t: 'crow', x: 118, y: G, s: 1.3, pose: 'sing' },
                   { t: 'urna', x: 290, y: G, s: 1.6, high: true, lapilli: true }
                 ],
                 bubbles: [{ x: 196, y: 66, w: 54, h: 38, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    f19_bibit:   { bg: 'plain', items: [
                   { t: 'urna', x: 250, y: G, s: 1.6, high: true, lapilli: true },
                   { t: 'crow', x: 168, y: G - 58, s: 1.15, pose: 'sad' }
                 ] },

    f19_cantat:  { bg: 'plain', items: [
                   { t: 'tree', x: 300, y: G, s: 0.95 },
                   { t: 'crow', x: 300, y: G - 96, s: 1.1, pose: 'sing' },
                   { t: 'urna', x: 96, y: G, s: 1.4, high: true, lapilli: true }
                 ],
                 bubbles: [{ x: 208, y: 52, w: 56, h: 40, text: '🎶', kind: 'speech', tail: 'left', fs: 19 }] },

    f19_finis:   { bg: 'plain', items: [
                   { t: 'urna', x: 288, y: G, s: 1.6, high: true, lapilli: true },
                   { t: 'crow', x: 140, y: G, s: 1.3, pose: 'sing' }
                 ] },

    /* mōrāle: the small bird and the big jar, and the stones that did it */
    f19_moral:   { bg: 'plain', items: [
                   { t: 'urna', x: 288, y: G, s: 1.75, high: true, lapilli: true },
                   { t: 'crow', x: 130, y: G, s: 1.2, pose: 'sing' },
                   stone(80, 205, 15), stone(108, 207, 12)
                 ] },

    /* ============ fable 20 — Leō Senex et Vulpēs ============

       NO CAVE EXISTS IN THE LIBRARY (file header). The lion lies on
       bgMountain, whose rock mass fills the left of the frame, and the
       fable is written so that the missing den is not missed: what the
       animals walk TO is `leō`, not a hole, and what the fox reads is
       the ground. Aesop's point is the arithmetic of the tracks, and
       the arithmetic is intact.

       B-RATING (DESIGN §8) AND THE ASSIGNMENT'S OWN RULING: nothing is
       eaten on the page and nothing is eaten off it in words. Every
       sentence about a missing animal says only that it did not come
       back — `nōn discessit`, `nēmō discessit` — which is the fable's
       own discretion and not a softening of it. The pictures obey the
       same rule: an animal that has gone in is simply ABSENT from the
       next frame.

       `pose: 'aegrotus'` is a real option on the quadruped core
       (js/actors-props.js line ~189, folded in with 'lie'), so the
       sick lion needed no new art. */

    f20_mons:    { bg: 'mountain', items: [
                   { t: 'leo', x: 286, y: G, s: 1, flip: true }
                 ] },

    f20_senex:   { bg: 'mountain', items: [
                   { t: 'leo', x: 268, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 108, y: 88, w: 58, h: 42, text: '🕰', kind: 'thought', tail: 'left', fs: 19 }] },

    f20_quaerit: { bg: 'mountain', items: [
                   { t: 'leo',    x: 118, y: G, s: 1 },
                   { t: 'cervus', x: 336, y: G, s: 0.9, flip: true }
                 ],
                 bubbles: [{ x: 224, y: 74, w: 62, h: 42, text: '🍗 ✗', kind: 'thought', tail: 'right', fs: 17 }] },

    /* the feigned sickness: the SAME lion, lying */
    f20_aegrotus: { bg: 'mountain', items: [
                   { t: 'leo', x: 268, y: G, s: 1.05, pose: 'aegrotus', flip: true }
                 ] },

    f20_vident:  { bg: 'mountain', items: [
                   { t: 'leo',    x: 302, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   { t: 'cervus', x: 96,  y: G, s: 0.9 },
                   { t: 'lepus',  x: 170, y: G, s: 0.95 }
                 ] },

    f20_clamat:  { bg: 'mountain', items: [
                   { t: 'leo',    x: 302, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   { t: 'cervus', x: 96,  y: G, s: 0.9 },
                   { t: 'lepus',  x: 170, y: G, s: 0.95 }
                 ],
                 bubbles: [{ x: 214, y: 52, w: 84, h: 44, text: '😩 ➜', kind: 'speech', tail: 'left', fs: 17 }] },

    /* the stag walks in — and the tracks begin */
    f20_cervus:  { bg: 'mountain', items: [
                   { t: 'leo',    x: 312, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   { t: 'cervus', x: 196, y: G, s: 0.9, pose: 'walk', flip: true },
                   track(96, 222), track(124, 226), track(152, 222)
                 ] },

    /* and is simply NOT THERE on the next page (B-rating) */
    f20_lepus:   { bg: 'mountain', items: [
                   { t: 'leo',   x: 312, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   { t: 'lepus', x: 200, y: G, s: 0.95, pose: 'walk', flip: true },
                   track(84, 222), track(112, 226), track(140, 222), track(168, 226)
                 ] },

    f20_asinus:  { bg: 'mountain', items: [
                   { t: 'leo',    x: 316, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   { t: 'asinus', x: 190, y: G, s: 0.95, pose: 'walk', flip: true },
                   track(76, 222), track(104, 226), track(132, 222), track(160, 226)
                 ] },

    f20_nemo:    { bg: 'mountain', items: [
                   { t: 'leo', x: 316, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(70, 222), track(98, 226), track(126, 222),
                   track(154, 226), track(182, 222), track(210, 226)
                 ] },

    f20_vulpes:  { bg: 'mountain', items: [
                   { t: 'leo', x: 316, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(126, 222), track(154, 226), track(182, 222), track(210, 226),
                   { t: 'fox', x: 68, y: G, s: 0.95, pose: 'walk' }
                 ] },

    f20_procul:  { bg: 'mountain', items: [
                   { t: 'leo', x: 316, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(126, 222), track(154, 226), track(182, 222), track(210, 226),
                   { t: 'fox', x: 62, y: G, s: 0.95 }
                 ] },

    /* THE PAGE THE FABLE IS FOR: every track points one way */
    f20_vestigia: { bg: 'mountain', items: [
                   { t: 'leo', x: 320, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(112, 220), track(140, 224), track(168, 220),
                   track(196, 224), track(224, 220), track(252, 224),
                   { t: 'fox', x: 60, y: G, s: 0.95 }
                 ],
                 bubbles: [{ x: 128, y: 66, w: 62, h: 42, text: '👀 ⬇', kind: 'thought', tail: 'right', fs: 17 }] },

    f20_rogat:   { bg: 'mountain', items: [
                   { t: 'leo', x: 320, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(112, 220), track(140, 224), track(168, 220),
                   track(196, 224), track(224, 220), track(252, 224),
                   { t: 'fox', x: 60, y: G, s: 0.95 }
                 ],
                 bubbles: [{ x: 232, y: 54, w: 78, h: 44, text: '🦊 ➜ ❓', kind: 'speech', tail: 'left', fs: 16 }] },

    f20_respondet: { bg: 'mountain', items: [
                   { t: 'leo', x: 320, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(112, 220), track(140, 224), track(168, 220),
                   track(196, 224), track(224, 220), track(252, 224),
                   { t: 'fox', x: 60, y: G, s: 0.95 }
                 ],
                 bubbles: [{ x: 138, y: 54, w: 92, h: 44, text: '➜ 🦁 ✓ · 🦁 ➜ ✗', kind: 'speech', tail: 'right', fs: 13 }] },

    f20_discedit: { bg: 'mountain', items: [
                   { t: 'leo', x: 330, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(150, 222), track(178, 226), track(206, 222), track(234, 226),
                   { t: 'fox', x: 70, y: G, s: 0.95, pose: 'walk', flip: true }
                 ] },

    f20_manet:   { bg: 'mountain', items: [
                   { t: 'leo', x: 274, y: G, s: 1.05, pose: 'aegrotus', flip: true },
                   track(112, 222), track(140, 226), track(168, 222), track(196, 226)
                 ],
                 bubbles: [{ x: 96, y: 78, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 19 }] },

    /* mōrāle: the fox, at a distance, and the ground she read */
    f20_moral:   { bg: 'mountain', items: [
                   { t: 'leo', x: 330, y: G, s: 1, pose: 'aegrotus', flip: true },
                   track(150, 222), track(178, 226), track(206, 222), track(234, 226),
                   { t: 'fox', x: 78, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 150, y: 70, w: 60, h: 42, text: '👀 1️⃣', kind: 'thought', tail: 'right', fs: 17 }] },

    /* ============ fable 21 — Asinus et Sal ============

       THE LOAD IS `onus`, the pack the quadruped core draws on its own
       back (`{ onus: true }`) and the word Regiō V f15 already taught
       with a picture. It looks the SAME on both journeys, which is not
       a defect but the fable: the donkey cannot tell the two loads
       apart either, and the learner is told what is in the pack by the
       Latin, on the page, both times.

       THE RIVER. bgRiver's water band crosses from y 150 to y ≈ 215,
       so an animal placed at y = G − 18 stands IN it with the near
       bank in front of its feet — the same trick r06 used to sink the
       fox in the well, one prop lower. */

    f21_ager:    { bg: 'plain', items: [
                   { t: 'asinus', x: 178, y: G, s: 1.15 },
                   { t: 'person', x: 320, y: G, s: 1, role: 'man', flip: true }
                 ] },

    f21_onus:    { bg: 'plain', items: [
                   { t: 'asinus', x: 196, y: G, s: 1.2, onus: true }
                 ] },

    f21_sal:     { bg: 'plain', items: [
                   { t: 'person', x: 92,  y: G, s: 1, role: 'man' },
                   { t: 'asinus', x: 244, y: G, s: 1.2, onus: true, flip: true }
                 ],
                 bubbles: [{ x: 168, y: 62, w: 66, h: 42, text: '⬇ 📦', kind: 'speech', tail: 'right', fs: 17 }] },

    f21_tardus:  { bg: 'plain', items: [
                   { t: 'asinus', x: 176, y: G, s: 1.2, onus: true, pose: 'walk' }
                 ],
                 bubbles: [{ x: 322, y: 76, w: 56, h: 40, text: '😩', kind: 'thought', tail: 'left', fs: 19 }] },

    f21_rivus:   { bg: 'river', items: [
                   { t: 'asinus', x: 128, y: G, s: 1.15, onus: true, pose: 'walk' }
                 ] },

    f21_cadit:   { bg: 'river', items: [
                   { t: 'asinus', x: 214, y: G - 18, s: 1.05, onus: true }
                 ],
                 bubbles: [{ x: 96, y: 76, w: 56, h: 40, text: '⬇', kind: 'thought', tail: 'right', fs: 20 }] },

    f21_manet:   { bg: 'river', items: [
                   { t: 'asinus', x: 214, y: G - 18, s: 1.05, onus: true }
                 ],
                 bubbles: [{ x: 322, y: 70, w: 66, h: 42, text: '⚪ ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f21_levis:   { bg: 'river', items: [
                   { t: 'asinus', x: 296, y: G, s: 1.2, onus: true, pose: 'walk', flip: true }
                 ],
                 bubbles: [{ x: 108, y: 68, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    f21_laetus:  { bg: 'plain', items: [
                   { t: 'asinus', x: 190, y: G, s: 1.2, onus: true, pose: 'walk' }
                 ],
                 bubbles: [{ x: 320, y: 62, w: 66, h: 42, text: '⬆ ⬆', kind: 'speech', tail: 'left', fs: 18 }] },

    /* the second load: the fleece IN the pack's place, on the ground,
       so the learner sees WHAT goes in before it is on the donkey */
    f21_lana:    { bg: 'plain', items: [
                   { t: 'person', x: 92,  y: G, s: 1, role: 'man', pose: 'point' },
                   { t: 'pellis', x: 190, y: G, s: 0.85 },
                   { t: 'asinus', x: 314, y: G, s: 1.15, flip: true }
                 ] },

    f21_portat:  { bg: 'plain', items: [
                   { t: 'asinus', x: 186, y: G, s: 1.2, onus: true, pose: 'walk' },
                   { t: 'pellis', x: 336, y: G, s: 0.6 }
                 ] },

    f21_ridet:   { bg: 'river', items: [
                   { t: 'asinus', x: 132, y: G, s: 1.15, onus: true, pose: 'walk' }
                 ],
                 bubbles: [{ x: 300, y: 64, w: 62, h: 42, text: '😀 ⬇', kind: 'thought', tail: 'left', fs: 17 }] },

    f21_cadit2:  { bg: 'river', items: [
                   { t: 'asinus', x: 210, y: G - 18, s: 1.05, onus: true }
                 ],
                 bubbles: [{ x: 92, y: 74, w: 56, h: 40, text: '⬇', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the wool takes the water: the fleece is drawn AT the waterline
       beside him, so the thing that got heavy is on screen */
    f21_lana2:   { bg: 'river', items: [
                   { t: 'asinus', x: 210, y: G - 18, s: 1.05, onus: true },
                   { t: 'pellis', x: 306, y: G - 22, s: 0.55 }
                 ],
                 bubbles: [{ x: 92, y: 70, w: 66, h: 42, text: '💧 ⬆', kind: 'thought', tail: 'right', fs: 18 }] },

    f21_gravis:  { bg: 'river', items: [
                   { t: 'asinus', x: 208, y: G - 18, s: 1.05, onus: true }
                 ],
                 bubbles: [{ x: 322, y: 68, w: 66, h: 42, text: '⬆ ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f21_clamat:  { bg: 'river', items: [
                   { t: 'asinus', x: 208, y: G - 18, s: 1.05, onus: true }
                 ],
                 bubbles: [{ x: 96, y: 62, w: 72, h: 44, text: '🤝 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    /* B-RATING: the dominus of Regiō V comes and lifts him out */
    f21_dominus: { bg: 'river', items: [
                   { t: 'asinus', x: 240, y: G - 18, s: 1.05, onus: true },
                   { t: 'person', x: 78,  y: G, s: 1, role: 'man', pose: 'point' }
                 ] },

    f21_tutus:   { bg: 'plain', items: [
                   { t: 'person', x: 88,  y: G, s: 1, role: 'man' },
                   { t: 'asinus', x: 226, y: G, s: 1.2, flip: true }
                 ] },

    f21_stat:    { bg: 'plain', items: [
                   { t: 'asinus', x: 186, y: G, s: 1.25 },
                   { t: 'pellis', x: 320, y: G, s: 0.7 }
                 ],
                 bubbles: [{ x: 70, y: 80, w: 56, h: 40, text: '😩', kind: 'thought', tail: 'right', fs: 19 }] },

    /* mōrāle: the two loads, and the donkey between them */
    f21_moral:   { bg: 'plain', items: [
                   { t: 'urna',   x: 66,  y: G, s: 1.15 },
                   { t: 'asinus', x: 200, y: G, s: 1.2, onus: true },
                   { t: 'pellis', x: 336, y: G, s: 0.7 }
                 ],
                 bubbles: [{ x: 200, y: 58, w: 62, h: 42, text: '💭', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ vocabulary mini-scenes ============ */

    /* cornīx: the bird ALONE, posed so no cheese is drawn. Regiō I's
       `v_corvus` is the same actor in its DEFAULT pose, i.e. holding
       the cāseus — so the two cards are different pictures, which is
       the only reason this region may name the bird twice (see the
       ledger's f19 note and the report). */
    v_cornix:    { bg: 'plain', items: [{ t: 'crow', x: 196, y: G, s: 2.2, pose: 'sad' }] },
    /* urna: the jar EMPTY, so the card is the vessel and not its water.
       `aqua` keeps its own 💧, and the two never meet in a listening
       round with the jar full. */
    v_urna:      { bg: 'plain', items: [{ t: 'urna', x: 200, y: G, s: 2.3, water: false }] },
    /* lapillus: stones on the GRASS band, no jar in the frame — a jar in
       it would teach `urna` twice.
       CARD SIZE IS MEASURED, NOT GUESSED. At SONUS tile size the whole
       400×240 frame becomes 96×58 px, so a stone drawn at the story's
       w 14 (a 28-unit ellipse) arrives as 7 px and is dirt. The card's
       stones are therefore drawn at w 30–36 (60–72 units, ≈ 15–17 px on
       the tile) and CLUSTERED, which is also what separates this card
       from f20's `vestīgium`: round, pale, heaped — against dark, small,
       and in a straight line. The two were measured side by side at
       96 px before either shipped. */
    v_lapillus:  { bg: 'plain', items: [
                   stone(142, 198, 30), stone(214, 207, 36), stone(276, 196, 26),
                   stone(180, 176, 21)
                 ] },
    /* iacit: the stone in the AIR between the open beak and the jar.
       Two of this region's three pictures are in it, so it is held out
       of SONUS and AENIGMATA and recycled in CORRIGE/COMPLĒ instead. */
    v_iacit:     { bg: 'plain', items: [
                   { t: 'crow', x: 108, y: G, s: 1.4, pose: 'sing' },
                   stone(210, G - 100, 17),
                   { t: 'urna', x: 300, y: G, s: 1.7, lapilli: true }
                 ] },
    /* plēnus: the SAME jar twice, one full, one not — so the card
       teaches the quality and not the jar (the r06 v_rusticus device) */
    v_plenus:    { bg: 'plain', items: [
                   { t: 'urna', x: 120, y: G, s: 1.75, high: true },
                   { t: 'urna', x: 288, y: G, s: 1.75 }
                 ] },
    v_bibit:     { bg: 'plain', items: [
                   { t: 'urna', x: 236, y: G, s: 1.8, high: true, lapilli: true },
                   { t: 'crow', x: 150, y: G - 66, s: 1.25, pose: 'sad' }
                 ] },
    v_arbor:     { bg: 'plain', items: [{ t: 'tree', x: 200, y: G, s: 1.15 }] },

    v_leo:       { bg: 'plain', items: [{ t: 'leo', x: 190, y: G, s: 1.25 }] },
    /* aegrōtus: TWO lions, one standing and one lying, so the card
       teaches the STATE and not the animal. Held out of SONUS and
       AENIGMATA for exactly that reason — `leō` is on both boards. */
    v_aegrotus:  { bg: 'mountain', items: [
                   { t: 'leo', x: 100, y: G, s: 0.9 },
                   { t: 'leo', x: 288, y: G, s: 0.95, pose: 'aegrotus', flip: true }
                 ] },
    /* vestīgium: a row of tracks on bare bgPlain, nothing else. On
       bgMountain it would share its frame with `mōns`.
       MEASURED LIKE `lapillus` ABOVE: the story's track (w 11) lands on
       the SONUS tile at 5 × 3 px, which is not a picture of anything.
       The card's tracks are w 24 (a 48-unit mark, ≈ 11 px on the tile),
       there are four rather than six so they do not merge into a smear,
       and they are STAGGERED in pairs — left, right, left, right — which
       is what makes a row of dark ovals read as something that walked
       rather than as spilled ink. */
    v_vestigium: { bg: 'plain', items: [
                   trackBig(96, 208), trackBig(178, 194),
                   trackBig(252, 208), trackBig(330, 194)
                 ] },
    /* mōns: the PLACE and nothing in it (the r06 v_urbs device) */
    v_mons:      { bg: 'mountain', items: [] },
    v_cervus:    { bg: 'plain', items: [{ t: 'cervus', x: 196, y: G, s: 1.1 }] },
    v_lepus:     { bg: 'plain', items: [{ t: 'lepus', x: 196, y: G, s: 1.5 }] },

    v_asinus:    { bg: 'plain', items: [{ t: 'asinus', x: 196, y: G, s: 1.3 }] },
    v_onus:      { bg: 'plain', items: [{ t: 'asinus', x: 196, y: G, s: 1.3, onus: true }] },
    /* gravis: the same beast laden and unladen in one frame — the
       quality, not the donkey. Held out of SONUS and AENIGMATA. */
    v_gravis:    { bg: 'plain', items: [
                   { t: 'asinus', x: 104, y: G, s: 1.05, onus: true },
                   { t: 'asinus', x: 292, y: G, s: 1.05, flip: true }
                 ] },
    /* lāna: the fleece prop alone. In Regiō IX the SAME prop returns as
       `pellis`, worn — a different picture of a related thing, and the
       ledger records the pairing so the later card is not a collision. */
    v_lana:      { bg: 'plain', items: [{ t: 'pellis', x: 200, y: G, s: 1.35 }] },
    /* rīvus: the water and nothing standing in it */
    v_rivus:     { bg: 'river', items: [] },
    v_dominus:   { bg: 'plain', items: [{ t: 'person', x: 190, y: G, s: 1.4, role: 'man' }] },
    v_portat:    { bg: 'plain', items: [
                   { t: 'asinus', x: 180, y: G, s: 1.3, onus: true, pose: 'walk' }
                 ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 19 — Cornīx et Urna ============
       THE PERFECT ARRIVES. Nine perfect forms, every one of them built
       on a verb the learner already reads in the present (file header,
       ruling 1) and every one glossed against that present (ruling 2).
       The imperfect keeps the job r06 gave it and does not move: the
       thirst and the search are `quaerēbat` / `cupiēbat`, the rising of
       the water is `ascendēbat`, and everything that HAPPENS is
       perfect.

       Only FOUR content lexemes, and one of them is a stone. The
       capitulum is deliberately light on vocabulary for the reason r06
       f17 gave: a page that teaches a tense should not also be teaching
       a noun.

       ONE DEPARTURE FROM THE CURRICULUM LINE, FLAGGED: CURRICULUM §1
       names this fable `Cornīx et Urna` and the title is kept, but the
       bird is the SAME actor Regiō I f2 taught as `corvus`. `cornīx` is
       therefore introduced with a synonym gloss — `cornīx = corvus` —
       which is a sanctioned Latin-only gloss device (LATIN-STYLE §2),
       and the two words are never offered against each other anywhere.
       See the report. */
    {
      id: 'f19',
      titulus: 'Cornīx et Urna',
      icon: '🐦🏺',
      numerus: 'XIX',
      pos: { x: 0.74, y: 0.86 },
      vocab: [
        { la: 'cornīx',   scene: SC.v_cornix,   pars: 'nomen' },
        { la: 'lapillus', scene: SC.v_lapillus, pars: 'nomen' },
        { la: 'urna',     scene: SC.v_urna,     pars: 'nomen' },
        { la: 'aqua',     emoji: '💧',          pars: 'nomen' },
        { la: 'arbor',    scene: SC.v_arbor,    pars: 'nomen' },
        { la: 'plēnus',   scene: SC.v_plenus,   pars: 'adiectivum' },
        { la: 'iacit',    scene: SC.v_iacit,    pars: 'verbum' },
        { la: 'bibit',    scene: SC.v_bibit,    pars: 'verbum' }
      ],
      story: [
        /* the IMPERFECT background, under ŌLIM exactly where r06 left it */
        { la: 'Ōlim aestās erat. Cornīx in arbore sedēbat.', scene: SC.f19_arbor,
          nova: [{ w: 'cornīx', e: '🐦', g: 'cornīx = corvus; cornīx nigra est' }] },

        { la: 'Cornīx aquam quaerēbat. Aqua enim in agrō nōn erat.', scene: SC.f19_quaerit,
          nova: [] },

        /* THE FIRST PERFECT, with its own cue word (ruling 3) */
        { la: 'Subitō cornīx urnam vīdit!', scene: SC.f19_videt,
          nova: [{ w: 'subitō', e: '💨', g: 'nōn diū: subitō' },
                 { w: 'vīdit', e: '🕰👀', g: 'iam videt; subitō vīdit' }] },

        { la: 'Cornīx ad urnam volāvit.', scene: SC.f19_volat,
          nova: [{ w: 'volāvit', e: '🕰🐦', g: 'iam volat; subitō volāvit' }] },

        { la: 'In urnā aqua erat. Sed urna plēna nōn erat.', scene: SC.f19_urna,
          nova: [{ w: 'plēna', e: '🏺💧', g: 'urna plēna: aqua ad ōs urnae; urna nōn plēna: aqua īnfrā' }] },

        { la: 'Cornīx aquam bibere cupiēbat. Sed aqua īnfrā erat.', scene: SC.f19_nonpotest,
          nova: [] },

        { la: 'Cornīx clāmāvit: “Ō urna! Cūr plēna nōn es?”', scene: SC.f19_clamat,
          nova: [{ w: 'clāmāvit', e: '🕰📢', g: 'iam clāmat; subitō clāmāvit' }] },

        { la: 'Tum cornīx lapillum vīdit.', scene: SC.f19_lapillus,
          nova: [{ w: 'tum', e: '➡🕰', g: 'prīmum, tum, posteā' },
                 { w: 'lapillum', e: '⚪', g: 'lapillus parvus est; lapillī in agrō iacent' }] },

        { la: 'Cornīx lapillum rōstrō cēpit.', scene: SC.f19_capit,
          nova: [{ w: 'cēpit', e: '🕰✊', g: 'iam capit; tum cēpit' }] },

        { la: 'Cornīx lapillum in urnam iēcit.', scene: SC.f19_iacit,
          nova: [{ w: 'iēcit', e: '🕰⬇', g: 'lapillus ex rōstrō in urnam cadit: cornīx iacit' }] },

        /* the RISING is a process, so it is imperfect (ruling 4) */
        { la: 'Ecce! Tum aqua in urnā ascendēbat.', scene: SC.f19_ascendit1, nova: [] },

        { la: 'Subitō cornīx iterum lapillum iēcit. Et iterum!', scene: SC.f19_multi, nova: [] },

        { la: 'Multī lapillī in urnam cecidērunt. Aqua semper ascendēbat.', scene: SC.f19_ascendit2,
          nova: [{ w: 'cecidērunt', e: '🕰⬇⬇', g: 'ūnus cecidit; multī cecidērunt' }] },

        /* the PERFECT OF ESSE, against r06's `erat` on the same page */
        { la: 'Tandem urna plēna fuit! Aqua nōn iam īnfrā erat.', scene: SC.f19_plena,
          nova: [{ w: 'tandem', e: '➜', g: 'nōn prīmum, sed post multa: tandem' },
                 { w: 'fuit', e: '🕰', g: 'iam est; tandem fuit' }] },

        /* posse, in both tenses, on the verb r06 f18 left open */
        { la: 'Cornīx aquam bibere potuit! Cornīx laeta fuit.', scene: SC.f19_bibit,
          nova: [{ w: 'potuit', e: '🕰💪', g: 'prīmum nōn poterat; tandem potuit' }] },

        { la: 'Tum cornīx ad arborem volāvit et cantāvit.', scene: SC.f19_cantat,
          nova: [{ w: 'cantāvit', e: '🕰🎶', g: 'iam cantat; tum cantāvit' }] },

        /* the two tenses in ONE sentence, which is the region's lesson */
        { la: 'Ōlim cornīx aquam quaerēbat; tandem aquam invēnit.', scene: SC.f19_finis,
          nova: [{ w: 'invēnit', e: '🕰🔎', g: 'iam invenit; tandem invēnit' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: parva cornīx magnam urnam vincit.', scene: SC.f19_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'cornīx',   scene: SC.v_cornix },
          { la: 'lapillus', scene: SC.v_lapillus },
          { la: 'urna',     scene: SC.v_urna },
          { la: 'aqua',     emoji: '💧' },
          { la: 'arbor',    scene: SC.v_arbor },
          { la: 'fēlēs',    emoji: '🐱' }
        ]
      },
      /* SONUS. `iacit`, `bibit` and `plēnus` are all pictures that
         contain the jar, the bird, or both, so none of them is ever
         offered against `cornīx` or `urna` — a learner who hears
         `urna` and taps the crow-at-the-jar card has read the picture
         correctly and would be punished for it (LATIN-STYLE §4, the
         Regiō III/IV/VI discipline). What is left is four cards that
         share nothing: a bird, an empty jar, stones and water. The
         held-out cards are recycled in CORRIGE and COMPLĒ, where the
         sentence disambiguates them. */
      sonus: [
        { la: 'cornīx',
          answer: { la: 'cornīx', scene: SC.v_cornix },
          options: [{ la: 'cornīx', scene: SC.v_cornix },
                    { la: 'urna', scene: SC.v_urna },
                    { la: 'lapillus', scene: SC.v_lapillus }] },
        { la: 'urna',
          answer: { la: 'urna', scene: SC.v_urna },
          options: [{ la: 'urna', scene: SC.v_urna },
                    { la: 'cornīx', scene: SC.v_cornix },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'lapillus',
          answer: { la: 'lapillus', scene: SC.v_lapillus },
          options: [{ la: 'lapillus', scene: SC.v_lapillus },
                    { la: 'urna', scene: SC.v_urna },
                    { la: 'cornīx', scene: SC.v_cornix },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'aqua',
          answer: { la: 'aqua', emoji: '💧' },
          options: [{ la: 'aqua', emoji: '💧' },
                    { la: 'lapillus', scene: SC.v_lapillus },
                    { la: 'cornīx', scene: SC.v_cornix }] }
      ],
      /* OVERRIDES. The generated set was read first. Two faults, one of
         them new to S7:
           · it clozed `vīdit` and `fuit` off pages whose `subitō` and
             `tandem` had already been consumed by the sentence
             splitter, leaving items where the present, the imperfect
             and the perfect are ALL true — the coin-flip ruling 3
             exists to prevent, now with three options instead of two;
           · it swapped `ascendēbat` for `ascendit` in a CORRIGE item,
             which is not an error at all: the water both rises and was
             rising, so the learner who "corrects" it is right.
         The region exists for the perfect, so the hand set asks for a
         tense in 4 of 5 CORRIGE items and 5 of 6 COMPLĒ items, always
         with the cue word on screen. */
      overrides: {
        aenigmata: {
          /* five tiles, five pictures that share nothing. `iacit`,
             `bibit` and `plēnus` are held out for the SONUS reason —
             each would put a second jar or a second crow on a board
             that already has one. All three are recycled below. */
          pairs: [
            { la: 'cornīx',   scene: SC.v_cornix },
            { la: 'urna',     scene: SC.v_urna },
            { la: 'lapillus', scene: SC.v_lapillus },
            { la: 'aqua',     emoji: '💧' },
            { la: 'arbor',    scene: SC.v_arbor }
          ],
          scrambles: [
            { la: 'Subitō cornīx urnam vīdit.',        scene: SC.f19_videt },
            { la: 'Cornīx lapillum in urnam iēcit.',   scene: SC.f19_iacit },
            { la: 'Tandem urna plēna fuit.',           scene: SC.f19_plena },
            { la: 'Cornīx ad urnam volāvit.',          scene: SC.f19_volat }
          ]
        },
        corrige: [
          /* PERFECT vs PRESENT, with the SUBITŌ cue left in the item */
          { words: ['Subitō', 'cornīx', 'urnam', 'videt.'], wrong: 3,
            options: ['vīdit.', 'vidēbat.', 'vident.'], correct: 0, scene: SC.f19_videt },
          /* PERFECT vs IMPERFECT of esse: TANDEM decides it */
          { words: ['Tandem', 'urna', 'plēna', 'erat.'], wrong: 3,
            options: ['fuit.', 'est.', 'erant.'], correct: 0, scene: SC.f19_plena },
          /* the IMPERFECT keeps its own job: ŌLIM, and a process */
          { words: ['Ōlim', 'cornīx', 'aquam', 'quaesīvit.'], wrong: 3,
            options: ['quaerēbat.', 'quaerit.', 'quaerunt.'], correct: 0, scene: SC.f19_quaerit },
          /* PLURAL perfect against singular: multī lapillī */
          { words: ['Multī', 'lapillī', 'in', 'urnam', 'cecidit.'], wrong: 4,
            options: ['cecidērunt.', 'cadit.', 'cecidistī.'], correct: 0, scene: SC.f19_ascendit2 },
          /* vocabulary, on the picture that decides it */
          { words: ['Cornīx', 'urnam', 'in', 'urnam', 'iēcit.'], wrong: 1,
            options: ['lapillum', 'arborem', 'aquam'], correct: 0, scene: SC.f19_iacit }
        ],
        comple: [
          { text: 'Subitō cornīx urnam ___.',
            options: ['vīdit', 'videt', 'vidēbat'], correct: 0, scene: SC.f19_videt },
          { text: 'Tandem urna plēna ___.',
            options: ['fuit', 'erat', 'est'], correct: 0, scene: SC.f19_plena },
          { text: 'Ōlim cornīx aquam ___.',
            options: ['quaerēbat', 'quaesīvit', 'quaerit'], correct: 0, scene: SC.f19_quaerit },
          { text: 'Multī lapillī in urnam ___.',
            options: ['cecidērunt', 'cecidit', 'cadit'], correct: 0, scene: SC.f19_ascendit2 },
          { text: 'Prīmum cornīx bibere nōn poterat; tandem ___.',
            options: ['potuit', 'poterat', 'potest'], correct: 0, scene: SC.f19_bibit },
          { text: 'Cornīx ___ in urnam iēcit.',
            options: ['lapillum', 'arborem', 'urnam'], correct: 0, scene: SC.f19_iacit }
        ]
      }
    },

    /* ============ FABLE 20 — Leō Senex et Vulpēs ============
       THE PLURAL PERFECT. f19 taught the singular on nine verbs; this
       capitulum puts `-ērunt` beside `-it` on one page (ruling 5) and
       then spends the whole fable on the arithmetic the plural makes
       possible: `multī vēnērunt, sed nēmō discessit`.

       ONLY TWO CARDED LEXEMES — `aegrōtus` and `vestīgium` — and the
       rest of the fable is FREE vocabulary from five earlier regions
       (leō, vulpēs, cervus, lepus, asinus, mōns, cibus, silva). That is
       the r06 f17 shape and it is deliberate: a capitulum whose grammar
       is a new personal ending should not also be teaching a zoo.
       `senex` and `callidus` are taught by gloss with no card, the way
       Regiō V taught `sōlus` — neither can be drawn (no aged lion in
       the library, and cunning is not a picture), and both are held out
       of SONUS, AENIGMATA and the boss for exactly that reason.

       B-RATING (DESIGN §8): see the scene block. Nothing is eaten on
       the page or in the words; the fable's own discretion is the
       whole mechanism and is left intact.

       ONE DEPARTURE FROM THE FABLE AS COMMONLY TOLD, recorded: Aesop's
       lion lies in a CAVE and the fox stands at its mouth. There is no
       cave in the library (file header), so the lion lies on the
       mountain and the fox stands `prōcul`. The tracks — which are what
       the fable is actually about — are drawn in full, six of them, all
       pointing one way. */
    {
      id: 'f20',
      titulus: 'Leō Senex et Vulpēs',
      icon: '🦁🦊',
      numerus: 'XX',
      pos: { x: 0.26, y: 0.60 },
      vocab: [
        { la: 'leō',        scene: SC.v_leo,        pars: 'nomen' },
        { la: 'vulpēs',     emoji: '🦊',            pars: 'nomen' },
        { la: 'vestīgium',  scene: SC.v_vestigium,  pars: 'nomen' },
        { la: 'mōns',       scene: SC.v_mons,       pars: 'nomen' },
        { la: 'cervus',     scene: SC.v_cervus,     pars: 'nomen' },
        { la: 'lepus',      scene: SC.v_lepus,      pars: 'nomen' },
        { la: 'asinus',     scene: SC.v_asinus,     pars: 'nomen' },
        { la: 'aegrōtus',   scene: SC.v_aegrotus,   pars: 'adiectivum' }
      ],
      story: [
        { la: 'Ōlim leō in monte habitābat. Leō senex erat.', scene: SC.f20_mons,
          nova: [{ w: 'senex', e: '🕰🦁', g: 'leō senex est: leō iam nōn celer est' }] },

        /* the perfect of esse, early, against the imperfect above it */
        { la: 'Ōlim leō celer fuit; iam celer nōn est.', scene: SC.f20_senex,
          nova: [{ w: 'fuit', e: '🕰', g: 'iam est; ōlim fuit' }] },

        { la: 'Leō senex cibum quaerēbat, sed cervōs capere nōn poterat.', scene: SC.f20_quaerit,
          nova: [] },

        { la: 'Tum leō in monte iacuit. Leō aegrōtus nōn erat, sed aegrōtus iacēbat.',
          scene: SC.f20_aegrotus,
          nova: [{ w: 'aegrōtus', e: '😓', g: 'aegrōtus leō nōn currit; aegrōtus leō iacet' },
                 { w: 'iacuit', e: '🕰⬇', g: 'iam iacet; tum iacuit' }] },

        /* THE PLURAL PERFECT, with the singular in its own gloss (r5) */
        { la: 'Cervus et lepus leōnem aegrōtum vīdērunt.', scene: SC.f20_vident,
          nova: [{ w: 'vīdērunt', e: '👀👀', g: 'ūnus vīdit; multī vīdērunt' }] },

        { la: 'Leō clāmāvit: “Ō amīcī! Aegrōtus sum. Venīte ad mē!”', scene: SC.f20_clamat,
          nova: [] },

        /* venit / vēnit: the macron IS the lesson here (ruling 4) */
        { la: 'Cervus ad leōnem vēnit. Sed cervus nōn discessit.', scene: SC.f20_cervus,
          nova: [{ w: 'vēnit', e: '🕰🚶', g: 'iam venit; tum vēnit — “vēnit” longum est' },
                 { w: 'discessit', e: '🕰🚶↩', g: 'iam discēdit; tum discessit' }] },

        { la: 'Posteā lepus ad leōnem vēnit. Lepus quoque nōn discessit.', scene: SC.f20_lepus,
          nova: [] },

        { la: 'Posteā asinus vēnit. Asinus quoque nōn discessit.', scene: SC.f20_asinus,
          nova: [] },

        /* the arithmetic, in plural perfect against singular perfect */
        { la: 'Multī ad leōnem vēnērunt, sed nēmō discessit.', scene: SC.f20_nemo,
          nova: [{ w: 'vēnērunt', e: '🚶🚶', g: 'ūnus vēnit; multī vēnērunt' },
                 { w: 'nēmō', e: '0️⃣', g: 'nēmō = nōn ūnus' }] },

        { la: 'Tandem vulpēs vēnit. Vulpēs callida est.', scene: SC.f20_vulpes,
          nova: [{ w: 'callida', e: '🦊💭', g: 'vulpēs callida est: vulpēs prīmum videt, posteā ambulat' }] },

        { la: 'Vulpēs ad montem nōn ambulāvit. Vulpēs prōcul stetit.', scene: SC.f20_procul,
          nova: [{ w: 'prōcul', e: '↔', g: 'vulpēs nōn ad leōnem, sed prōcul stat' },
                 { w: 'stetit', e: '🕰👤', g: 'iam stat; tum stetit' }] },

        /* THE PAGE THE FABLE IS FOR */
        { la: 'Vulpēs vestīgia vīdit. Multa vestīgia ad montem erant.', scene: SC.f20_vestigia,
          nova: [{ w: 'vestīgia', e: '🐾', g: 'ubi cervus ambulat, ibi vestīgia sunt' }] },

        { la: 'Leō clāmāvit: “Ō vulpēs! Cūr prōcul stās? Venī ad mē!”', scene: SC.f20_rogat,
          nova: [] },

        /* the punchline: no first person, no new construction */
        { la: 'Vulpēs respondit: “Ō leō! Vestīgia ad tē sunt, sed ā tē nōn sunt.”',
          scene: SC.f20_respondet,
          nova: [{ w: 'respondit', e: '🕰💬', g: 'iam respondet; tum respondit' }] },

        { la: 'Vulpēs callida iterum dīxit: “Multī vēnērunt; nēmō discessit.”',
          scene: SC.f20_respondet,
          nova: [{ w: 'dīxit', e: '🕰💬', g: 'iam dīcit; tum dīxit' }] },

        { la: 'Tum vulpēs discessit. Vulpēs in silvam ambulāvit.', scene: SC.f20_discedit,
          nova: [] },

        { la: 'Leō senex trīstis in monte mānsit. Leō vulpem nōn cēpit.', scene: SC.f20_manet,
          nova: [{ w: 'mānsit', e: '🕰📍', g: 'iam manet; tum mānsit' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: vulpēs callida prīmum vestīgia videt, posteā ambulat.',
          scene: SC.f20_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'leō',       scene: SC.v_leo },
          { la: 'vulpēs',    emoji: '🦊' },
          { la: 'vestīgium', scene: SC.v_vestigium },
          { la: 'cervus',    scene: SC.v_cervus },
          { la: 'lepus',     scene: SC.v_lepus },
          { la: 'urna',      scene: SC.v_urna }
        ]
      },
      /* SONUS. `aegrōtus` is TWO lions in one frame and `mōns` is the
         bare mountain those lions stand on, so neither is offered
         against `leō`: by ear the learner would be choosing between
         pictures that are all true of the word they heard. What is
         left is five cards that share nothing — a lion, a fox, a stag,
         a hare and a row of tracks. `aegrōtus` and `mōns` are recycled
         in CORRIGE and COMPLĒ. */
      sonus: [
        { la: 'leō',
          answer: { la: 'leō', scene: SC.v_leo },
          options: [{ la: 'leō', scene: SC.v_leo },
                    { la: 'vulpēs', emoji: '🦊' },
                    { la: 'cervus', scene: SC.v_cervus }] },
        { la: 'vulpēs',
          answer: { la: 'vulpēs', emoji: '🦊' },
          options: [{ la: 'vulpēs', emoji: '🦊' },
                    { la: 'leō', scene: SC.v_leo },
                    { la: 'lepus', scene: SC.v_lepus }] },
        { la: 'vestīgium',
          answer: { la: 'vestīgium', scene: SC.v_vestigium },
          options: [{ la: 'vestīgium', scene: SC.v_vestigium },
                    { la: 'leō', scene: SC.v_leo },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'vulpēs', emoji: '🦊' }] },
        { la: 'cervus',
          answer: { la: 'cervus', scene: SC.v_cervus },
          options: [{ la: 'cervus', scene: SC.v_cervus },
                    { la: 'lepus', scene: SC.v_lepus },
                    { la: 'leō', scene: SC.v_leo }] },
        { la: 'lepus',
          answer: { la: 'lepus', scene: SC.v_lepus },
          options: [{ la: 'lepus', scene: SC.v_lepus },
                    { la: 'cervus', scene: SC.v_cervus },
                    { la: 'vulpēs', emoji: '🦊' }] }
      ],
      /* OVERRIDES. The generated set produced one item that is simply
         false — "Cervus ad leōnem ___" offering `vēnit` and `discessit`
         on the page where the stag arrives, which makes the wrong
         answer the one the NEXT sentence supplies. It also never once
         asked for a plural perfect, because the splitter only ever
         clozed the last word of a sentence and this fable's plurals sit
         mid-sentence. The hand set puts the plural ending under the
         learner's finger four times.
         Target-grammar items: 4 of 5 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* six tiles. `aegrōtus` and `mōns` are held out (see SONUS):
             each is a board that already carries a lion. Both are
             recycled below. */
          pairs: [
            { la: 'leō',       scene: SC.v_leo },
            { la: 'vulpēs',    emoji: '🦊' },
            { la: 'vestīgium', scene: SC.v_vestigium },
            { la: 'cervus',    scene: SC.v_cervus },
            { la: 'lepus',     scene: SC.v_lepus },
            { la: 'asinus',    scene: SC.v_asinus }
          ],
          scrambles: [
            { la: 'Cervus ad leōnem vēnit.',        scene: SC.f20_cervus },
            { la: 'Vulpēs prōcul stetit.',          scene: SC.f20_procul },
            { la: 'Vulpēs vestīgia vīdit.',         scene: SC.f20_vestigia },
            { la: 'Leō in monte iacuit.',           scene: SC.f20_aegrotus }
          ]
        },
        corrige: [
          /* PLURAL perfect: two animals are in the picture */
          { words: ['Cervus', 'et', 'lepus', 'leōnem', 'vīdit.'], wrong: 4,
            options: ['vīdērunt.', 'videt.', 'vidēbat.'], correct: 0, scene: SC.f20_vident },
          /* PLURAL against SINGULAR, in one sentence */
          { words: ['Multī', 'ad', 'leōnem', 'vēnit,', 'sed', 'nēmō', 'discessit.'], wrong: 3,
            options: ['vēnērunt,', 'veniunt,', 'veniēbant,'], correct: 0, scene: SC.f20_nemo },
          /* PERFECT vs IMPERFECT: TUM is the cue, and it is in the item */
          { words: ['Tum', 'leō', 'in', 'monte', 'iacēbat.'], wrong: 4,
            options: ['iacuit.', 'iacet.', 'iacent.'], correct: 0, scene: SC.f20_aegrotus },
          /* the IMPERFECT still has its own job, and ŌLIM still marks it */
          { words: ['Ōlim', 'leō', 'in', 'monte', 'habitāvit.'], wrong: 4,
            options: ['habitābat.', 'habitat.', 'habitābant.'], correct: 0, scene: SC.f20_mons },
          { words: ['Vulpēs', 'lapillōs', 'vīdit', 'et', 'nōn', 'vēnit.'], wrong: 1,
            options: ['vestīgia', 'urnās', 'montēs'], correct: 0, scene: SC.f20_vestigia }
        ],
        comple: [
          { text: 'Cervus et lepus leōnem aegrōtum ___.',
            options: ['vīdērunt', 'vīdit', 'videt'], correct: 0, scene: SC.f20_vident },
          { text: 'Multī ad leōnem ___, sed nēmō discessit.',
            options: ['vēnērunt', 'vēnit', 'veniunt'], correct: 0, scene: SC.f20_nemo },
          { text: 'Tum leō in monte ___.',
            options: ['iacuit', 'iacēbat', 'iacent'], correct: 0, scene: SC.f20_aegrotus },
          { text: 'Ōlim leō in monte ___.',
            options: ['habitābat', 'habitāvit', 'habitant'], correct: 0, scene: SC.f20_mons },
          { text: 'Tandem vulpēs ___ et prōcul stetit.',
            options: ['vēnit', 'vēnērunt', 'veniēbat'], correct: 0, scene: SC.f20_procul },
          { text: 'Leō ___ nōn erat, sed in monte iacēbat.',
            options: ['aegrōtus', 'celer', 'laetus'], correct: 0, scene: SC.f20_aegrotus }
        ]
      }
    },

    /* ============ FABLE 21 — Asinus et Sal ============
       BOTH TENSES ON ONE ROAD, TWICE TRAVELLED. The fable's shape is
       already the grammar lesson: the same journey happens twice, and
       the second time everything is the same except what was in the
       pack — so the Latin can hold the frame steady (`ad rīvum vēnit`,
       `in rīvum cecidit`) and let one word change. That is repetition
       WITH VARIATION in LATIN-STYLE §2's sense, and it is why the
       perfect can carry twenty pages here without a single new verb.

       MISSING ART AND THE SUBSTITUTION THE ASSIGNMENT AUTHORISED:
       there is no `spongia` in the library and no `sal` either. The
       assignment's own line — "'spongia'? check registry — if absent
       use 'lāna' wool with grex-adjacent art or STOP-report" — is
       taken: the second load is `lāna`, drawn with the `pellis` prop,
       which IS a fleece (js/actors-props.js draws it white and woolly,
       with three tufts). Wool that soaks up water and gets heavier is
       the fable's mechanism exactly, and it is true.
         `sal` has NO card. It cannot be drawn — the library has no
       salt, no sack and no white heap — so it is taught by gloss
       alone, recycled three times, and held out of SONUS, AENIGMATA
       and the boss. That is the treatment Regiō V gave `sōlus` and
       Regiō VI gave `stabulum`'s ambiguity, and the fable survives it
       because what the learner must understand is not what salt LOOKS
       like but what it DOES in water — which the story states twice
       and the pictures show as a weight change.
         Note also that `sal` is a gender trap (sal, salis is masculine
       in classical prose but neuter in some singular uses). No
       adjective is ever predicated of it here: the sentence that wanted
       "the salt was heavy" says `onus grave erat` instead, on the
       neuter noun Regiō V taught. Ledgered.

       B-RATING (DESIGN §8): the donkey does not drown and is not
       beaten. He struggles, cannot climb out, calls — and the
       `dominus` of Regiō V f15 comes and carries him out, the same
       humane ending r06 f18 gave the goat in the well. */
    {
      id: 'f21',
      titulus: 'Asinus et Sal',
      icon: '🐎💧',
      numerus: 'XXI',
      pos: { x: 0.72, y: 0.36 },
      vocab: [
        { la: 'asinus',  scene: SC.v_asinus,  pars: 'nomen' },
        { la: 'lāna',    scene: SC.v_lana,    pars: 'nomen' },
        { la: 'onus',    scene: SC.v_onus,    pars: 'nomen' },
        { la: 'rīvus',   scene: SC.v_rivus,   pars: 'nomen' },
        { la: 'dominus', scene: SC.v_dominus, pars: 'nomen' },
        { la: 'aqua',    emoji: '💧',         pars: 'nomen' },
        { la: 'gravis',  scene: SC.v_gravis,  pars: 'adiectivum' },
        { la: 'portat',  scene: SC.v_portat,  pars: 'verbum' }
      ],
      story: [
        { la: 'Ōlim asinus in agrō habitābat. Asinus dominum habēbat.', scene: SC.f21_ager,
          nova: [{ w: 'habēbat', e: '🕰🤲', g: 'iam habet; ōlim habēbat' }] },

        { la: 'Cotīdiē asinus onus portābat.', scene: SC.f21_onus,
          nova: [{ w: 'portābat', e: '🕰📦', g: 'iam portat; ōlim portābat' }] },

        { la: 'In onere sal erat. Onus grave erat.', scene: SC.f21_sal,
          nova: [{ w: 'sal', e: '⚪', g: 'sal in onere est; sal in aquā nōn manet' },
                 { w: 'grave', e: '⬇⚪', g: 'onus grave est: asinus tardus et fessus est' }] },

        { la: 'Asinus tardus et fessus erat.', scene: SC.f21_tardus, nova: [] },

        { la: 'Ōlim asinus ad rīvum vēnit.', scene: SC.f21_rivus,
          nova: [{ w: 'vēnit', e: '🕰🚶', g: 'iam venit; tum vēnit' }] },

        { la: 'Subitō asinus in rīvum cecidit!', scene: SC.f21_cadit,
          nova: [{ w: 'cecidit', e: '🕰⬇', g: 'iam cadit; subitō cecidit' }] },

        { la: 'Aqua salem cēpit. Sal in aquā nōn mānsit.', scene: SC.f21_manet,
          nova: [{ w: 'cēpit', e: '🕰✊', g: 'iam capit; tum cēpit' },
                 { w: 'mānsit', e: '🕰📍', g: 'iam manet; tum mānsit' }] },

        { la: 'Asinus ex aquā ambulāvit. Onus iam grave nōn erat!', scene: SC.f21_levis,
          nova: [{ w: 'ambulāvit', e: '🕰🚶', g: 'iam ambulat; tum ambulāvit' }] },

        { la: 'Onus leve erat. Asinus laetus fuit.', scene: SC.f21_laetus,
          nova: [{ w: 'leve', e: '⬆⬆', g: 'leve ↔ grave; onus leve est: asinus nōn fessus est' },
                 { w: 'fuit', e: '🕰', g: 'iam est; tum fuit' }] },

        { la: 'Asinus clāmāvit: “Ō rīve! Onus meum leve est!”', scene: SC.f21_laetus, nova: [] },

        /* the second journey begins: the fleece, on the ground, first */
        { la: 'Posteā dominus lānam in onus posuit.', scene: SC.f21_lana,
          nova: [{ w: 'lānam', e: '🐑', g: 'lāna alba et mollis est; lāna aquam capit' },
                 { w: 'posuit', e: '🕰⬇', g: 'iam pōnit; tum posuit' }] },

        { la: 'Asinus lānam portāvit. Onus iterum grave erat.', scene: SC.f21_portat,
          nova: [{ w: 'portāvit', e: '🕰📦', g: 'iam portat; tum portāvit' }] },

        { la: 'Asinus ad rīvum vēnit et rīsit.', scene: SC.f21_ridet,
          nova: [{ w: 'rīsit', e: '🕰😀', g: 'iam rīdet; tum rīsit' }] },

        { la: 'Asinus in rīvum iterum cecidit. Asinus enim leve onus cupiēbat.',
          scene: SC.f21_cadit2, nova: [] },

        /* the turn: same frame, one word different */
        { la: 'Sed lāna aquam cēpit! Onus grave, nōn leve, fuit.', scene: SC.f21_lana2,
          nova: [] },

        { la: 'Onus iam leve nōn erat. Onus grave erat!', scene: SC.f21_gravis, nova: [] },

        { la: 'Asinus ex aquā ascendere nōn poterat. Asinus clāmāvit.', scene: SC.f21_clamat,
          nova: [] },

        /* B-RATING: the humane ending, Regiō V's dominus */
        { la: 'Tum dominus vēnit. Dominus asinum ex rīvō portāvit.', scene: SC.f21_dominus,
          nova: [] },

        { la: 'Asinus in agrō stetit. Asinus fessus fuit.', scene: SC.f21_tutus,
          nova: [{ w: 'stetit', e: '🕰👤', g: 'iam stat; tum stetit' }] },

        { la: 'Iam asinus lānam videt et in rīvum nōn cadit.', scene: SC.f21_stat, nova: [] },

        /* mōrāle: gnomic present, no new words (callidus came from f20) */
        { la: 'Fābula docet: asinus callidus nōn semper laetus est.', scene: SC.f21_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'asinus',  scene: SC.v_asinus },
          { la: 'lāna',    scene: SC.v_lana },
          { la: 'rīvus',   scene: SC.v_rivus },
          { la: 'dominus', scene: SC.v_dominus },
          { la: 'aqua',    emoji: '💧' },
          { la: 'cornīx',  scene: SC.v_cornix }
        ]
      },
      /* SONUS. `onus`, `portat` and `gravis` are ALL pictures of a
         donkey with a pack — one standing, one walking, one beside an
         unladen twin — so none of them is ever offered against
         `asinus` or against each other. What is left is five cards
         that share nothing: a donkey, a fleece, a river, a man and
         water. All three held-out cards are recycled in CORRIGE and
         COMPLĒ, where the sentence disambiguates them. */
      sonus: [
        { la: 'asinus',
          answer: { la: 'asinus', scene: SC.v_asinus },
          options: [{ la: 'asinus', scene: SC.v_asinus },
                    { la: 'dominus', scene: SC.v_dominus },
                    { la: 'lāna', scene: SC.v_lana }] },
        { la: 'lāna',
          answer: { la: 'lāna', scene: SC.v_lana },
          options: [{ la: 'lāna', scene: SC.v_lana },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'rīvus', scene: SC.v_rivus }] },
        { la: 'rīvus',
          answer: { la: 'rīvus', scene: SC.v_rivus },
          options: [{ la: 'rīvus', scene: SC.v_rivus },
                    { la: 'lāna', scene: SC.v_lana },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'dominus', scene: SC.v_dominus }] },
        { la: 'dominus',
          answer: { la: 'dominus', scene: SC.v_dominus },
          options: [{ la: 'dominus', scene: SC.v_dominus },
                    { la: 'asinus', scene: SC.v_asinus },
                    { la: 'lāna', scene: SC.v_lana }] }
      ],
      /* OVERRIDES. The generated set produced the region's worst item
         so far: "Onus ___ erat" off page 3, with `grave` and `leve`
         both in the pool — and the fable makes BOTH true, on different
         pages, of the same pack. Every hand item that asks for one of
         those two adjectives therefore names what is in the pack, in
         the item, so the picture and the sentence agree.
         Target-grammar items: 4 of 5 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* five tiles. `onus`, `portat` and `gravis` are held out
             (see SONUS) — each is one more donkey on a board that
             already has one. All three are recycled below. */
          pairs: [
            { la: 'asinus',  scene: SC.v_asinus },
            { la: 'lāna',    scene: SC.v_lana },
            { la: 'rīvus',   scene: SC.v_rivus },
            { la: 'dominus', scene: SC.v_dominus },
            { la: 'aqua',    emoji: '💧' }
          ],
          scrambles: [
            { la: 'Asinus in rīvum cecidit.',        scene: SC.f21_cadit },
            { la: 'Dominus lānam in onus posuit.',   scene: SC.f21_lana },
            { la: 'Sed lāna aquam cēpit.',           scene: SC.f21_lana2 },
            { la: 'Asinus ad rīvum vēnit.',          scene: SC.f21_rivus }
          ]
        },
        corrige: [
          /* PERFECT vs PRESENT, with the SUBITŌ cue in the item */
          { words: ['Subitō', 'asinus', 'in', 'rīvum', 'cadit.'], wrong: 4,
            options: ['cecidit.', 'cadēbat.', 'cadunt.'], correct: 0, scene: SC.f21_cadit },
          /* PERFECT vs IMPERFECT on the fable's turn */
          { words: ['Sed', 'lāna', 'aquam', 'capiēbat.'], wrong: 3,
            options: ['cēpit.', 'capit.', 'cēpērunt.'], correct: 0, scene: SC.f21_lana2 },
          /* the IMPERFECT keeps its own job: COTĪDIĒ, and a habit */
          { words: ['Cotīdiē', 'asinus', 'onus', 'portāvit.'], wrong: 3,
            options: ['portābat.', 'portat.', 'portābant.'], correct: 0, scene: SC.f21_onus },
          /* PERFECT of pōnere, with TUM supplied by POSTEĀ in the item */
          { words: ['Posteā', 'dominus', 'lānam', 'in', 'onus', 'pōnit.'], wrong: 5,
            options: ['posuit.', 'pōnēbat.', 'pōnunt.'], correct: 0, scene: SC.f21_lana },
          /* the ADJECTIVE, with the pack's contents named in the item */
          { words: ['Lāna', 'aquam', 'cēpit:', 'onus', 'leve', 'fuit.'], wrong: 4,
            options: ['grave', 'parvum', 'plēnum'], correct: 0, scene: SC.f21_gravis }
        ],
        comple: [
          { text: 'Subitō asinus in rīvum ___.',
            options: ['cecidit', 'cadit', 'cadēbat'], correct: 0, scene: SC.f21_cadit },
          { text: 'Sed lāna aquam ___!',
            options: ['cēpit', 'capit', 'capiēbat'], correct: 0, scene: SC.f21_lana2 },
          { text: 'Cotīdiē asinus onus ___.',
            options: ['portābat', 'portāvit', 'portant'], correct: 0, scene: SC.f21_onus },
          { text: 'Posteā dominus lānam in onus ___.',
            options: ['posuit', 'pōnēbat', 'pōnit'], correct: 0, scene: SC.f21_lana },
          { text: 'Sal in aquā nōn mānsit: onus ___ fuit.',
            options: ['leve', 'grave', 'plēnum'], correct: 0, scene: SC.f21_levis },
          { text: 'Lāna aquam cēpit: onus ___ fuit.',
            options: ['grave', 'leve', 'parvum'], correct: 0, scene: SC.f21_gravis }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r07',
    titulus: 'Lītus',
    ladder: 'S7',                 /* CURRICULUM §0: the perfect, against the imperfect */
    progressId: 'r07',
    capitula: capitula,
    boss: {
      id: 'b_r07',
      progressId: 'r07',
      /* VULPĒS CALLIDA. The learner's own mascot — js/auth-ui.js offers
         'fox' as an avatar and js/app.js draws a fox on the Fabulae
         door — comes back as the rival, which is why the tone is
         MISCHIEF and not menace: she is the animal of f20 who read the
         ground and walked away, and the duel is her setting the same
         kind of puzzle for the player. She is NOT the wolf (CURRICULUM
         §1 gives him R1, R5, R9 and the R12 finale), so her tuning is
         the ORDINARY one: hp 6 over 70 phase-seconds, exactly as
         r01–r04 and r06, and rule_boss_min_ms('r07') should be the same
         15000 every duel region uses. */
      name: 'Vulpēs',
      actor: 'fox',
      vinceText: 'Vulpem vince!',
      /* LEGACY single-phase tuning, kept for the two reasons every
         earlier region keeps it: server/lib/rules.php derives
         rule_boss_min_ms from these numbers, and a client without
         js/boss-phases.js must still be able to run the fight. */
      hp: 6,
      seconds: 45,
      pos: { x: 0.30, y: 0.14 },
      phases: [
        { type: 'caterva', hp: 2, seconds: 22 },
        { type: 'clamor',  hp: 2, seconds: 28 },
        { type: 'fuga',    hp: 2, seconds: 20 }
      ],
      /* HAND-AUTHORED CLĀMOR (AUTHORING-BRIEF, binding from wave 3).
         Five items, at least one from each capitulum. Every gap is a
         picturable content lexeme with a vocabulary card in this
         region; every gap stands where the DICTIONARY form stands
         (r05's ruling — the catchable tile carries the citation form,
         so a gap wanting `vestīgia` would be answered by a card the
         learner knows as `vestīgium`, and every gap below is therefore
         a nominative or a neuter whose accusative IS its nominative);
         every option is the same part of speech as the gap and is a
         thing plainly NOT in the pictured scene. Each gap's neighbours
         were checked against this region's own story bigrams, so no
         distractor stands where the region's Latin actually puts it
         (the check js/boss-phases.js runs on us).
           `sal`, `senex`, `callidus` and `aegrōtus` are all absent from
         this list on purpose: the first three have no card at all, and
         `aegrōtus`'s card is two lions, so a tile carrying it competes
         with the `leō` tile beside it.
           NOTE ON THE SURROUNDING FRAMES: every frame here is in the
         PERFECT, which is the region's target grammar. The gap stays a
         picturable noun (the brief's rule), and the tense does its
         work in the words around it — the learner reads a perfect five
         times under time pressure. */
      clamor: [
        { text: '____ lapillōs in urnam iēcit.',
          answer: 'cornīx', options: ['cornīx', 'leō', 'vulpēs'],
          scene: SC.f19_iacit },
        { text: 'In urnā ____ erat, sed urna plēna nōn erat.',
          answer: 'aqua', options: ['aqua', 'lāna', 'onus'],
          scene: SC.f19_urna },
        { text: '____ aegrōtus in monte iacuit.',
          answer: 'leō', options: ['leō', 'cervus', 'lepus'],
          scene: SC.f20_aegrotus },
        { text: 'In rīvō ____ aquam cēpit.',
          answer: 'lāna', options: ['lāna', 'urna', 'lapillus'],
          scene: SC.f21_lana2 },
        { text: 'Asinus grave ____ portāvit.',
          answer: 'onus', options: ['onus', 'urna', 'mōns'],
          scene: SC.f21_onus }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum, which is what
         app.js's bossWords() needs to resolve it. All three capitula
         are represented. Answer key: server/lib/rules.php.
           SHARED-PICTURE CHECK ACROSS CAPITULA, and the one defect this
         region's harness caught late: `lapillus` (pale round stones on
         grass) and `vestīgium` (dark marks on grass) are DIFFERENT
         pictures inside their own capitula, where nothing else looks
         like either — but the boss quiz is the one screen that draws
         cards from all three capitula at once, and at tile size two
         sets of small marks on the same cream field are one picture.
         They are therefore never both here: `lapillus` gives its slot
         to `urna`, which shares nothing with anything. */
      quiz: [
        { la: 'cornīx',    from: 'f19' },
        { la: 'urna',      from: 'f19' },
        { la: 'vestīgium', from: 'f20' },
        { la: 'lepus',     from: 'f20' },
        { la: 'lāna',      from: 'f21' }
      ]
    }
  });
})();
