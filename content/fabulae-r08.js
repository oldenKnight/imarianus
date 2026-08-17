/* ============================================================
   content/fabulae-r08.js — FĀBULAE · Regiō VIII · HORTUS  (ladder S8)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō VII:
     f22 Ventus et Sōl      — the COMPARATIVE, and the adverb, on a wager
     f23 Quercus et Harundō — the IRREGULAR comparatives maior · minor
     f24 Pāvō et Grūs       — the SUPERLATIVE, adjective and adverb

   STAGE CEILING (CURRICULUM §0 S8, binding):
     everything S1–S7 (all five cases · 3rd-person present of ANY
     conjugation, AUTHORING-BRIEF ruling 1 · the six prepositions ·
     imperative · vocative · questions · nōlī + īnfīnītīvus · posse/
     velle/cupere + īnfīnītīvus · the imperfect · the pronouns is /
     hic / ille · the PERFECT including the 3rd plural -ērunt · and
     Regiō V's ruling that the 2nd person present indicative is legal
     INSIDE DIRECT SPEECH) PLUS comparatives, superlatives and adverbs.
     STILL FORBIDDEN and avoided throughout: relative clauses (S9 —
     Regiō IX), the passive and deponents (S10), the subjunctive (S11),
     accusative + īnfīnītīvus (S12). No participles of any kind: the
     perfect passive participle is the commonest way to say "the bent
     reed" and it is two stages away, so f23 says what the picture shows
     instead (see its note).

   ------------------------------------------------------------
   COMPARISON IS A PICTURE BEFORE IT IS AN ENDING. That is the whole
   method here, and it is the reason this region can teach four
   morphological families in three fables: a comparative needs TWO
   THINGS IN ONE FRAME, and so does a vocabulary card built the way
   Regiō VI built `rūsticus`/`urbānus`. The two devices are the same
   device, so every comparative in this region is asserted on a page
   whose picture has already settled it.

   Five rulings, recorded because Regiō IX and every later author will
   hit them again.

   1. THE COMPARATIVE IS INTRODUCED ON `altus`, NOT ON A NEW WORD.
      f22 p3 is `Ventus in caelō altus est, sed sōl altior quam ventus
      est` — over a picture with the sun drawn ABOVE the cloud. `altus`
      has been in the learner's hands since Regiō I f1, the picture
      decides the claim, and the only thing on the page that is new is
      the ending. It is Regiō VII ruling 1 ("no new verb in the new
      tense") applied to a new morphology instead of a new tense.

   2. THE ADVERB IS TAUGHT AS DERIVED, IN ONE GLOSS, FROM THE ADJECTIVE
      STANDING BESIDE IT: `{ w: 'fortiter', g: 'fortis → fortiter:
      ventus fortis fortiter flat' }`. The adjective is always on the
      same page. No adverb in this region is introduced whose adjective
      the learner does not already have.

   3. THE COMPARATIVE ADVERB COMES THIRD, NEVER FIRST. `fortius` and
      `altius` are the neuter comparative doing adverbial work, which is
      a real thing to understand and not a spelling — so each appears
      only after BOTH its positive adjective and its positive adverb are
      on the page, and its gloss prints the series:
        f22  fortis → fortiter → fortius → fortissimē
        f24  altus  → altē     → altius  → altissimē
      Three forms of one word, in order, each on its own page. This is
      also why f22 spends four pages on the wind failing: the escalation
      IS the paradigm, and Aesop supplied it.

   4. IRREGULAR COMPARATIVES ARE MARKED, AND THERE ARE ONLY TWO.
      `magnus → maior` and `parvus → minor` are the two the learner
      cannot avoid, because magnus and parvus are the adjectives this
      track has used most since Regiō I. Both arrive in f23, on adjacent
      pages, each glossed with its own positive (`magnus, maior: quercus
      maior quam harundō est`). `bonus → melior` and `malus → peior` are
      NOT opened: nothing in these three fables needs them, and an
      irregular form with no work to do is a paradigm, not a lesson.

   5. THE -ERRIMUS SUPERLATIVE IS TAUGHT ONLY ON `pulcher`. Latin forms
      the superlative of -er adjectives in -errimus, and the learner has
      exactly two -er adjectives (`pulcher`, `celer`). f24's peacock is
      what -errimus was invented for, so `pulcherrimus` carries the
      pattern and `celerrimus` is left for a region that needs it.

   ------------------------------------------------------------
   THE WIND IS THE REGION'S THROUGH-LINE, and this is deliberate rather
   than convenient: `ventus` is a FACED CHARACTER in the library
   (js/actors-props.js draws it with eyes, a mouth and three gust
   strokes), it is f22's antagonist, f23's storm and the boss of the
   region. The learner meets one weather-being three times and then
   fights it, which is the same shape Regiō VI gave the fēlēs.

   MISSING ART, REPORTED AND NOT WORKED AROUND (Regiōnēs IV, V and VII
   filed the same kind of report; this is the fourth):

     · There is no garden, `hortus`, wall or bed in the library. This
       region is CALLED Hortus and its map header says so, and the word
       `hortus` is taught NOWHERE in it, for the reason Regiō V gave for
       `via` and Regiō VII for `lītus`: teaching it would mean
       approximating a scene, which LATIN-STYLE §5 forbids. Everything
       here grows `in agrō`.
     · There is no feather, wing or `penna`/`āla`. f24 therefore never
       names one: the peacock's tail is `cauda` (which the `pavo` actor
       draws, fanned, as its whole silhouette) and the crane simply
       flies, in the `fly` pose the bird core already has.

   ART THAT TURNED OUT TO EXIST, worth recording: `harundo` takes
   `bend:true` — the reed's own bending is one prop option, so f23
   needed no new art for the thing the fable is about. `person` takes
   `mantleColor` and `mantleColor:false`, which is f22's pallium ON and
   OFF the same man. `sol` and `ventus` both have faces. The art library
   was drawn for this curriculum, and the next author should look before
   assuming a gap.

   TWO ART TRAPS THIS FILE FELL INTO AND CLIMBED OUT OF, recorded
   because they are the Regiō VII `lapilli`-not-`lapillī` lesson again —
   an option that is silently wrong still renders a perfectly nice
   picture, and only a rendered thumbnail catches it:

     · `pose:'carry'` IS NOT "he holds his cloak". js/actors-person.js
       draws a SECOND PERSON riding the carrier's shoulders (it exists
       for Aenēās portāns Anchīsēn), so five pages of the wind fable
       showed the traveller with a bearded passenger on his back while
       the Latin talked about a garment. Every one of them is now the
       default `stand`: the mantle is on the man, the cloud grows, the
       reed bends, and nothing in the frame contradicts the sentence.
     · THE FALLEN PALLIUM IS NOT A `pellis`. The pellis prop is a
       near-WHITE fleece and the man's mantle is COL.terra #c9663c, so
       a learner reading `viātor pallium posuit` over a white hide would
       attach the word to the wrong object — and the same fleece is
       Regiō IX's wolf disguise, which would have made ONE picture carry
       two different words two regions apart. The cloak on the ground is
       two stacked `umbra` ellipses in the mantle's own colour instead,
       which is Regiō VII's lapillus/vestīgium device exactly.
       FLAGGED FOR LINE-AUDIT.

   A QUANTITY RULING, FLAGGED FOR LINE-AUDIT. `grūs` is a monosyllabic
   3rd-declension noun of the `bōs`/`sūs` class: the vowel is long in
   the nominative and SHORT in the oblique stem — grūs, gruis, gruem.
   The first draft wrote `grūem`/`grūis` throughout. The track's own
   shipped precedent settles it the same way (`bōs → bovem, bovī` in
   R3 f8; `vulpēs → vulpem, vulpe` in R1/R4), so the obliques here are
   `gruem` and `gruis`, unmacronised. If Fable rules the other way it is
   five string edits and nothing else moves.

   `quercus` IS 4TH DECLENSION and the ladder puts 4th/5th at S9, one
   rung above this region. It is used here in the NOMINATIVE and
   ACCUSATIVE ONLY (`quercus` / `quercum`), which are the two forms
   indistinguishable from the 2nd declension the learner has had since
   Regiō I — the same afford R3 f9 took for `cornua` and R7 f19 for
   `urna`'s neighbours. No genitive, dative or ablative of it anywhere,
   which is why f23's reed says `ad quercum` and never `quercuī`.
   FLAGGED FOR LINE-AUDIT.

   PROGRESS IDS ARE FROZEN once shipped: f22/f23/f24 and progressId
   'r08' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ----------

     SKY GEOMETRY. `sol` and `ventus` are the only actors in this track
     that do not stand on the ground. Both are drawn ABOVE their own
     origin (sol's disc sits at y −30 with rays to −68; ventus's cloud
     at y −36 to −64), so an origin of y = 96 puts the sun's disc at
     y ≈ 66 and an origin of y = 150 puts the cloud at y ≈ 114. Those
     two numbers are what f22 p3 uses to make `sōl altior quam ventus`
     TRUE IN THE PICTURE before the sentence claims it (file header,
     ruling 1).

     THE GUSTS BLOW +X. ventus draws its three gust strokes to the RIGHT
     of the cloud, so a wind that must reach a man on the right is drawn
     unflipped and to his left. Every blowing scene here obeys that; a
     flipped ventus blows backwards and it is not obvious in a thumbnail.

     CAMOUFLAGE (the Regiō IV ciconia lesson, re-checked at tile size):
     `ventus` is #cfd8dc, a pale grey-blue that the actor itself already
     solves with a darker silhouette underneath (its own source comment
     says so). `pavo` is #2f7d8c and `grus` a pale grey — the crane is
     the one bird here that needed care, so its card stands on bgHiems,
     whose #c3ced6 sky is darker than bgPlain's cream and throws the
     pale bird forward. Cranes in winter are also just true. */

  var SC = {

    /* ============ fable 22 — Ventus et Sōl ============

       THE CLOAK IS ONE OPTION ON THE PERSON ACTOR. `role:'man'` carries
       BASE's terra mantle, so a plain man is a cloaked man; the same man
       with `mantleColor:false` has no cloak. Every page of this fable is
       those two states of one figure, which means the picture can never
       disagree with the Latin about whether he is still wearing it. */

    f22_caelum:  { bg: 'plain', items: [
                   { t: 'sol',    x: 300, y: 96,  s: 1 },
                   { t: 'ventus', x: 104, y: 150, s: 1 }
                 ] },

    /* p3: the sun ABOVE the cloud — the comparative, drawn */
    f22_altior:  { bg: 'plain', items: [
                   { t: 'sol',    x: 250, y: 76,  s: 1 },
                   { t: 'ventus', x: 116, y: 168, s: 0.95 }
                 ] },

    f22_ventusDicit: { bg: 'plain', items: [
                   { t: 'sol',    x: 302, y: 96,  s: 1 },
                   { t: 'ventus', x: 104, y: 150, s: 1.05 }
                 ],
                 bubbles: [{ x: 190, y: 60, w: 66, h: 42, text: '💪 1️⃣', kind: 'speech', tail: 'left', fs: 17 }] },

    f22_solDicit: { bg: 'plain', items: [
                   { t: 'sol',    x: 296, y: 96,  s: 1.05 },
                   { t: 'ventus', x: 104, y: 152, s: 0.95 }
                 ],
                 bubbles: [{ x: 196, y: 58, w: 66, h: 42, text: '☀ 1️⃣', kind: 'speech', tail: 'right', fs: 17 }] },

    /* the traveller, CLOAKED (the default man) */
    f22_viator:  { bg: 'plain', items: [
                   { t: 'sol',    x: 320, y: 92, s: 0.85 },
                   { t: 'tree',   x: 64,  y: G,  s: 0.8 },
                   { t: 'person', x: 210, y: G,  s: 1.1, role: 'man', pose: 'walk' }
                 ] },

    f22_rogat:   { bg: 'plain', items: [
                   { t: 'ventus', x: 84,  y: 150, s: 1 },
                   { t: 'sol',    x: 322, y: 92,  s: 0.85 },
                   { t: 'person', x: 210, y: G,   s: 1.1, role: 'man', pose: 'walk' }
                 ],
                 bubbles: [{ x: 186, y: 54, w: 72, h: 42, text: '🧥 ❓', kind: 'speech', tail: 'right', fs: 17 }] },

    /* fortiter — the gusts point AT the man */
    f22_flat1:   { bg: 'plain', items: [
                   { t: 'ventus', x: 78,  y: 148, s: 1 },
                   { t: 'person', x: 250, y: G,   s: 1.1, role: 'man' }
                 ] },

    f22_tenet:   { bg: 'plain', items: [
                   { t: 'ventus', x: 78,  y: 148, s: 1 },
                   { t: 'person', x: 250, y: G,   s: 1.1, role: 'man' }
                 ],
                 bubbles: [{ x: 336, y: 78, w: 58, h: 40, text: '🧥 ✓', kind: 'thought', tail: 'left', fs: 17 }] },

    /* fortius — a bigger cloud */
    f22_flat2:   { bg: 'plain', items: [
                   { t: 'ventus', x: 74,  y: 142, s: 1.25 },
                   { t: 'person', x: 262, y: G,   s: 1.1, role: 'man' }
                 ] },

    f22_tenet2:  { bg: 'plain', items: [
                   { t: 'ventus', x: 74,  y: 142, s: 1.25 },
                   { t: 'person', x: 262, y: G,   s: 1.1, role: 'man' }
                 ],
                 bubbles: [{ x: 344, y: 74, w: 58, h: 40, text: '🧥 ✓', kind: 'thought', tail: 'left', fs: 17 }] },

    /* fortissimē — bigger still, and the reed bends flat beside him */
    f22_flat3:   { bg: 'plain', items: [
                   { t: 'ventus',  x: 70,  y: 136, s: 1.5 },
                   { t: 'harundo', x: 168, y: G,   s: 0.85, bend: true },
                   { t: 'person',  x: 288, y: G,   s: 1.1, role: 'man' }
                 ] },

    f22_manet:   { bg: 'plain', items: [
                   { t: 'ventus',  x: 70,  y: 136, s: 1.5 },
                   { t: 'harundo', x: 168, y: G,   s: 0.85, bend: true },
                   { t: 'person',  x: 288, y: G,   s: 1.1, role: 'man' }
                 ],
                 bubbles: [{ x: 348, y: 66, w: 58, h: 40, text: '🧥 ✓', kind: 'thought', tail: 'left', fs: 17 }] },

    /* the wind gives up: small cloud, no bent reed */
    f22_fessus:  { bg: 'plain', items: [
                   { t: 'ventus', x: 96,  y: 160, s: 0.75 },
                   { t: 'person', x: 276, y: G,   s: 1.1, role: 'man' }
                 ],
                 bubbles: [{ x: 96, y: 96, w: 56, h: 40, text: '😩', kind: 'thought', tail: 'right', fs: 19 }] },

    f22_solVenit: { bg: 'plain', items: [
                   { t: 'sol',    x: 292, y: 84, s: 1.15 },
                   { t: 'person', x: 150, y: G,  s: 1.1, role: 'man', pose: 'walk' }
                 ] },

    f22_calidus: { bg: 'plain', items: [
                   { t: 'sol',    x: 288, y: 80, s: 1.25 },
                   { t: 'person', x: 150, y: G,  s: 1.1, role: 'man' }
                 ],
                 bubbles: [{ x: 66, y: 88, w: 56, h: 40, text: '😓', kind: 'thought', tail: 'right', fs: 19 }] },

    /* THE PAYOFF: mantleColor:false, and the cloak on the ground.
       THE FALLEN PALLIUM IS AN `umbra` IN THE MANTLE'S OWN COLOUR. The
       first draft laid a `pellis` there and it was wrong twice over: the
       pellis is a near-WHITE fleece and the man's mantle is COL.terra
       #c9663c, so the picture named a different object than the word
       did — and the same fleece is Regiō IX's wolf disguise, which would
       have made one picture carry `pallium` here and `pellis` there.
       `umbra` takes w/h/color/opacity, which is exactly the device
       Regiō VII used to draw its lapillī and vestīgia out of one
       ellipse; at #c9663c it is the cloth he was wearing one page ago,
       lying where he dropped it. FLAGGED FOR LINE-AUDIT. */
    f22_ponit:   { bg: 'plain', items: [
                   { t: 'sol',    x: 286, y: 78, s: 1.3 },
                   { t: 'person', x: 150, y: G,  s: 1.1, role: 'man', mantleColor: false },
                   { t: 'umbra',  x: 232, y: G,     w: 26, h: 9, color: '#c9663c', opacity: 0.95 },
                   { t: 'umbra',  x: 228, y: G - 7, w: 17, h: 6, color: '#b0552f', opacity: 0.95 }
                 ] },

    f22_vicit:   { bg: 'plain', items: [
                   { t: 'sol',    x: 286, y: 78, s: 1.3 },
                   { t: 'person', x: 138, y: G,  s: 1.1, role: 'man', mantleColor: false, pose: 'walk' },
                   { t: 'umbra',  x: 236, y: G,     w: 26, h: 9, color: '#c9663c', opacity: 0.95 },
                   { t: 'umbra',  x: 232, y: G - 7, w: 17, h: 6, color: '#b0552f', opacity: 0.95 }
                 ],
                 bubbles: [{ x: 336, y: 130, w: 58, h: 40, text: '☀ ✓', kind: 'thought', tail: 'left', fs: 17 }] },

    f22_solDicit2: { bg: 'plain', items: [
                   { t: 'sol',    x: 288, y: 80, s: 1.3 },
                   { t: 'ventus', x: 84,  y: 164, s: 0.75 },
                   { t: 'person', x: 210, y: G,  s: 1, role: 'man', mantleColor: false }
                 ],
                 bubbles: [{ x: 190, y: 46, w: 72, h: 42, text: '☀ ⬆', kind: 'speech', tail: 'right', fs: 17 }] },

    /* mōrāle: both of them, and the man walking free */
    f22_moral:   { bg: 'plain', items: [
                   { t: 'sol',    x: 300, y: 82,  s: 1.2 },
                   { t: 'ventus', x: 86,  y: 166, s: 0.8 },
                   { t: 'person', x: 200, y: G,   s: 1, role: 'man', mantleColor: false, pose: 'walk' }
                 ] },

    /* ============ fable 23 — Quercus et Harundō ============

       NO PARTICIPLES (file header). "The bent reed" is a perfect passive
       participle and the passive is S10, so this fable never says it.
       What it says instead is what the picture shows and what the
       learner can already read: `Ventus harundinem flectit` — a plain
       accusative object, the construction Regiō I opened. The reed's
       bending is `bend:true` on the prop; the oak's fall is the
       `truncus` Regiō III already taught, lying where the tree stood. */

    f23_quercus: { bg: 'plain', items: [
                   { t: 'quercus', x: 176, y: G, s: 1 }
                 ] },

    f23_ambo:    { bg: 'plain', items: [
                   { t: 'quercus', x: 140, y: G, s: 1 },
                   { t: 'harundo', x: 306, y: G, s: 0.95 }
                 ] },

    f23_superba: { bg: 'plain', items: [
                   { t: 'quercus', x: 140, y: G, s: 1 },
                   { t: 'harundo', x: 306, y: G, s: 0.95 }
                 ],
                 bubbles: [{ x: 232, y: 62, w: 68, h: 42, text: '🌳 1️⃣', kind: 'speech', tail: 'right', fs: 17 }] },

    f23_respondet: { bg: 'plain', items: [
                   { t: 'quercus', x: 140, y: G, s: 1 },
                   { t: 'harundo', x: 306, y: G, s: 0.95 }
                 ],
                 bubbles: [{ x: 236, y: 60, w: 68, h: 42, text: '💨 ❓', kind: 'speech', tail: 'left', fs: 17 }] },

    f23_ventus:  { bg: 'hiems', items: [
                   { t: 'ventus',  x: 70,  y: 140, s: 1.35 },
                   { t: 'quercus', x: 216, y: G,   s: 1 },
                   { t: 'harundo', x: 344, y: G,   s: 0.95 }
                 ] },

    /* the reed bends — bend:true, one prop option */
    f23_flectit: { bg: 'hiems', items: [
                   { t: 'ventus',  x: 70,  y: 140, s: 1.35 },
                   { t: 'quercus', x: 216, y: G,   s: 1 },
                   { t: 'harundo', x: 344, y: G,   s: 0.95, bend: true }
                 ] },

    f23_nonCadit: { bg: 'hiems', items: [
                   { t: 'ventus',  x: 70,  y: 142, s: 1.3 },
                   { t: 'harundo', x: 300, y: G,   s: 1, bend: true }
                 ],
                 bubbles: [{ x: 176, y: 74, w: 66, h: 42, text: '🌾 ✓', kind: 'thought', tail: 'right', fs: 17 }] },

    f23_inQuercum: { bg: 'hiems', items: [
                   { t: 'ventus',  x: 66,  y: 134, s: 1.55 },
                   { t: 'quercus', x: 244, y: G,   s: 1 },
                   { t: 'harundo', x: 358, y: G,   s: 0.9, bend: true }
                 ] },

    f23_stat:    { bg: 'hiems', items: [
                   { t: 'ventus',  x: 66,  y: 134, s: 1.55 },
                   { t: 'quercus', x: 244, y: G,   s: 1 },
                   { t: 'harundo', x: 358, y: G,   s: 0.9, bend: true }
                 ],
                 bubbles: [{ x: 160, y: 58, w: 66, h: 42, text: '🌳 ✗', kind: 'thought', tail: 'right', fs: 17 }] },

    /* THE FALL: the quercus is gone and a truncus lies where it stood */
    f23_cadit:   { bg: 'hiems', items: [
                   { t: 'ventus',  x: 66,  y: 138, s: 1.4 },
                   { t: 'truncus', x: 232, y: G,   s: 1.15 },
                   { t: 'harundo', x: 356, y: G,   s: 0.9, bend: true }
                 ] },

    f23_truncus: { bg: 'hiems', items: [
                   { t: 'truncus', x: 176, y: G, s: 1.3 },
                   { t: 'harundo', x: 330, y: G, s: 0.95 }
                 ] },

    f23_harundoStat: { bg: 'plain', items: [
                   { t: 'truncus', x: 168, y: G, s: 1.3 },
                   { t: 'harundo', x: 322, y: G, s: 1 }
                 ] },

    f23_dicit:   { bg: 'plain', items: [
                   { t: 'truncus', x: 168, y: G, s: 1.3 },
                   { t: 'harundo', x: 322, y: G, s: 1 }
                 ],
                 bubbles: [{ x: 226, y: 60, w: 76, h: 42, text: '🌾 ✓ · 🌳 ✗', kind: 'speech', tail: 'left', fs: 14 }] },

    f23_sol:     { bg: 'plain', items: [
                   { t: 'sol',     x: 300, y: 86, s: 1.1 },
                   { t: 'truncus', x: 150, y: G,  s: 1.25 },
                   { t: 'harundo', x: 302, y: G,  s: 1 }
                 ] },

    f23_agricola: { bg: 'plain', items: [
                   { t: 'sol',      x: 316, y: 88, s: 0.9 },
                   { t: 'person',   x: 88,  y: G,  s: 1, role: 'man', pose: 'walk' },
                   { t: 'truncus',  x: 226, y: G,  s: 1.25 },
                   { t: 'harundo',  x: 346, y: G,  s: 0.95 }
                 ] },

    /* mōrāle: the log and the reed, side by side, one still standing */
    f23_moral:   { bg: 'plain', items: [
                   { t: 'truncus', x: 132, y: G, s: 1.35 },
                   { t: 'harundo', x: 300, y: G, s: 1.1 }
                 ],
                 bubbles: [{ x: 300, y: 62, w: 58, h: 40, text: '🌾 ✓', kind: 'thought', tail: 'left', fs: 17 }] },

    /* ============ fable 24 — Pāvō et Grūs ============

       THE PEACOCK IS ITS OWN TAIL. `pavo` is drawn with `alwaysFan`, so
       the fan is the actor's whole silhouette and `cauda` needs no prop
       and no second picture — which is just as well, because the library
       has no feather and no wing (file header). The crane's answer is
       the bird core's `fly` pose, which drops the legs and adds a far
       wing, and the three heights of f24 are three y values. */

    /* THE WEATHER ARC. f24's first draft carded `sōl` and `ventus` and
       then never said either word, which is a card with no capitulum
       behind it. Both are written into the fable instead, and the arc
       they make — sun, then wind, then sun again — is the one f23 already
       walks (`ventus discessit et sōl vēnit`), so the region's three
       fables end up sharing one sky. */
    f24_pavo:    { bg: 'plain', items: [
                   { t: 'sol',  x: 320, y: 88, s: 0.85 },
                   { t: 'pavo', x: 168, y: G,  s: 1 }
                 ] },

    f24_cauda:   { bg: 'plain', items: [
                   { t: 'pavo', x: 176, y: G, s: 1.15 }
                 ],
                 bubbles: [{ x: 330, y: 92, w: 56, h: 40, text: '😍', kind: 'thought', tail: 'left', fs: 19 }] },

    f24_grus:    { bg: 'plain', items: [
                   { t: 'pavo', x: 130, y: G, s: 1 },
                   { t: 'grus', x: 306, y: G, s: 1, flip: true }
                 ] },

    f24_ridet:   { bg: 'plain', items: [
                   { t: 'pavo', x: 130, y: G, s: 1 },
                   { t: 'grus', x: 306, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 218, y: 58, w: 68, h: 42, text: '😀 1️⃣', kind: 'speech', tail: 'right', fs: 17 }] },

    f24_irridet: { bg: 'plain', items: [
                   { t: 'pavo', x: 130, y: G, s: 1.05 },
                   { t: 'grus', x: 310, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 222, y: 56, w: 72, h: 42, text: '🦚 ✓ · ✗', kind: 'speech', tail: 'right', fs: 14 }] },

    f24_respondet: { bg: 'plain', items: [
                   { t: 'pavo', x: 130, y: G, s: 1 },
                   { t: 'grus', x: 306, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 216, y: 56, w: 68, h: 42, text: '⬆ ❓', kind: 'speech', tail: 'left', fs: 17 }] },

    /* altē — just off the ground */
    f24_volat1:  { bg: 'plain', items: [
                   { t: 'pavo', x: 118, y: G, s: 1 },
                   { t: 'grus', x: 292, y: G - 54, s: 0.95, pose: 'fly', flip: true }
                 ] },

    /* altius — above the tree */
    f24_volat2:  { bg: 'plain', items: [
                   { t: 'tree', x: 118, y: G, s: 0.85 },
                   { t: 'pavo', x: 96,  y: G, s: 0.9 },
                   { t: 'grus', x: 288, y: G - 116, s: 0.85, pose: 'fly', flip: true }
                 ] },

    /* altissimē — small with distance, at the top of the frame */
    f24_volat3:  { bg: 'plain', items: [
                   { t: 'tree', x: 110, y: G, s: 0.85 },
                   { t: 'pavo', x: 90,  y: G, s: 0.85 },
                   { t: 'grus', x: 276, y: 78, s: 0.6, pose: 'fly', flip: true }
                 ] },

    f24_cupit:   { bg: 'plain', items: [
                   { t: 'pavo', x: 150, y: G, s: 1.05 },
                   { t: 'grus', x: 300, y: 82, s: 0.55, pose: 'fly', flip: true }
                 ],
                 bubbles: [{ x: 66, y: 84, w: 58, h: 42, text: '⬆ ❓', kind: 'thought', tail: 'right', fs: 18 }] },

    f24_nonVolat: { bg: 'plain', items: [
                   { t: 'pavo', x: 172, y: G, s: 1.1 },
                   { t: 'grus', x: 306, y: 84, s: 0.55, pose: 'fly', flip: true }
                 ],
                 bubbles: [{ x: 74, y: 82, w: 62, h: 42, text: '⬆ ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    /* the wind tries and fails too: the gusts blow +x, so the cloud
       stands to the peacock's LEFT and the strokes reach him */
    f24_ventus:  { bg: 'plain', items: [
                   { t: 'ventus', x: 80,  y: 146, s: 1.3 },
                   { t: 'pavo',   x: 262, y: G,   s: 1.1 }
                 ],
                 bubbles: [{ x: 348, y: 80, w: 56, h: 40, text: '⬆ ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    /* the wind gone, the sun back, and the peacock still on the ground */
    f24_tristis: { bg: 'plain', items: [
                   { t: 'sol',  x: 318, y: 86, s: 0.9 },
                   { t: 'pavo', x: 168, y: G,  s: 1.1 }
                 ],
                 bubbles: [{ x: 74, y: 86, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 19 }] },

    f24_redit:   { bg: 'plain', items: [
                   { t: 'pavo', x: 130, y: G, s: 1 },
                   { t: 'grus', x: 300, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 220, y: 58, w: 72, h: 42, text: '🦚 ✓ · ⬆ ✗', kind: 'speech', tail: 'left', fs: 14 }] },

    /* mōrāle: the fan on the ground, the crane in the air */
    f24_moral:   { bg: 'plain', items: [
                   { t: 'pavo', x: 122, y: G, s: 1.1 },
                   { t: 'grus', x: 300, y: 96, s: 0.7, pose: 'fly', flip: true }
                 ] },

    /* ============ vocabulary mini-scenes ============ */

    v_ventus:    { bg: 'plain', items: [{ t: 'ventus', x: 168, y: 168, s: 1.6 }] },
    v_sol:       { bg: 'plain', items: [{ t: 'sol', x: 200, y: 150, s: 1.7 }] },
    /* pallium: the SAME man with the cloak and without it, so the card
       teaches the garment and not the man (the r06 v_rusticus device).
       Held out of SONUS and AENIGMATA for exactly that reason —
       `viātor` is a man on both boards. */
    v_pallium:   { bg: 'plain', items: [
                   { t: 'person', x: 118, y: G, s: 1.3, role: 'man' },
                   { t: 'person', x: 286, y: G, s: 1.3, role: 'man', mantleColor: false }
                 ] },
    v_viator:    { bg: 'plain', items: [
                   { t: 'person', x: 190, y: G, s: 1.45, role: 'man', pose: 'walk' }
                 ] },
    /* flat: the cloud AND what its gusts do, so the card is the blowing
       and not the wind. One more cloud than `ventus` — held out of
       SONUS and AENIGMATA.

       GAP (region sweep): this card used to blow a BENT REED, and f23's
       `flectit` is the wind bending a reed too — same background, same two
       actors, the same `bend` flag. Inside f22 nothing could see it, because
       `flectit` lives in f23; the boss of Regiō VIII draws its caterva, its
       clāmor cards and its quiz options from the WHOLE region's vocabulary,
       so the two met there as one picture. The reed was never f22's anyway
       (there is no harundō in Ventus et Sōl); the gusts now strip a bare
       tree, which is f22's own winter — `hiems` is on this very card list —
       and `arbor` keeps the leafy `tree`, so the two cannot be confused
       either. No Latin moved. */
    v_flat:      { bg: 'plain', items: [
                   { t: 'ventus',    x: 96,  y: 152, s: 1.35 },
                   { t: 'arborNuda', x: 292, y: G,   s: 1.05 }
                 ] },
    v_arbor:     { bg: 'plain', items: [{ t: 'tree', x: 200, y: G, s: 1.15 }] },
    /* hiems: the SEASON and nothing in it (the r06 v_urbs device) */
    v_hiems:     { bg: 'hiems', items: [] },
    /* pōnit: a man beside what he has put down — the same terra `umbra`
       the story pages use for the fallen pallium. A man is on the
       `viātor` card too, so this one is held out of SONUS. */
    v_ponit:     { bg: 'plain', items: [
                   { t: 'person', x: 138, y: G, s: 1.3, role: 'man', mantleColor: false },
                   { t: 'umbra',  x: 268, y: G,      w: 40, h: 14, color: '#c9663c', opacity: 0.95 },
                   { t: 'umbra',  x: 262, y: G - 11, w: 26, h: 10, color: '#b0552f', opacity: 0.95 }
                 ] },

    v_quercus:   { bg: 'plain', items: [{ t: 'quercus', x: 200, y: G, s: 1.15 }] },
    v_harundo:   { bg: 'plain', items: [{ t: 'harundo', x: 200, y: G, s: 1.5 }] },
    /* flectit: the reed BENT, with the wind that bends it. Two reeds on
       one board would be `harundō` twice, so this is held out of SONUS
       and AENIGMATA and recycled in CORRIGE/COMPLĒ. */
    v_flectit:   { bg: 'plain', items: [
                   { t: 'ventus',  x: 92,  y: 156, s: 1.2 },
                   { t: 'harundo', x: 288, y: G,   s: 1.4, bend: true }
                 ] },
    v_truncus:   { bg: 'plain', items: [{ t: 'truncus', x: 200, y: G, s: 1.7 }] },
    /* ager: the PLACE, with the grain that says which place */
    v_ager:      { bg: 'plain', items: [{ t: 'frumentum', x: 200, y: G, s: 1.5 }] },
    v_agricola:  { bg: 'plain', items: [
                   { t: 'person',    x: 150, y: G, s: 1.35, role: 'man' },
                   { t: 'frumentum', x: 296, y: G, s: 1.05 }
                 ] },

    v_pavo:      { bg: 'plain', items: [{ t: 'pavo', x: 190, y: G, s: 1.15 }] },
    /* grūs on the WINTER sky: #c3ced6 is darker than bgPlain's cream and
       throws a pale grey bird forward — the Regiō IV ciconia fix, and
       the card SONUS shrinks */
    v_grus:      { bg: 'hiems', items: [{ t: 'grus', x: 190, y: G, s: 1.3 }] },
    /* volat: the crane IN THE AIR. It is one more crane, so it never
       meets `grūs` in a listening round. */
    v_volat:     { bg: 'plain', items: [
                   { t: 'tree', x: 96,  y: G, s: 0.8 },
                   { t: 'grus', x: 248, y: 92, s: 1, pose: 'fly', flip: true }
                 ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 22 — Ventus et Sōl ============
       THE COMPARATIVE AND THE ADVERB. Aesop wrote the paradigm: the
       wind blows, blows harder, blows hardest, and fails three times,
       which is `fortiter → fortius → fortissimē` with a reason to exist
       on each page (file header, ruling 3). The comparative ADJECTIVE
       arrives first and on `altus`, over a picture with the sun drawn
       above the cloud (ruling 1), so the ending is the only new thing
       in the sentence.

       `quam` is introduced on that same page and carries the comparison
       throughout; the ablative of comparison is NOT opened, because one
       way of saying a thing is a lesson and two are a paradigm.

       B-RATING (DESIGN §8): the traveller is never harmed, frightened or
       stripped. He holds his cloak, gets warm, and takes it off himself
       — which is the fable's own point and the reason the sun wins. */
    {
      id: 'f22',
      titulus: 'Ventus et Sōl',
      icon: '💨☀',
      numerus: 'XXII',
      pos: { x: 0.74, y: 0.86 },
      vocab: [
        { la: 'ventus',  scene: SC.v_ventus,  pars: 'nomen' },
        { la: 'sōl',     scene: SC.v_sol,     pars: 'nomen' },
        { la: 'pallium', scene: SC.v_pallium, pars: 'nomen' },
        { la: 'viātor',  scene: SC.v_viator,  pars: 'nomen' },
        { la: 'arbor',   scene: SC.v_arbor,   pars: 'nomen' },
        { la: 'hiems',   scene: SC.v_hiems,   pars: 'nomen' },
        { la: 'flat',    scene: SC.v_flat,    pars: 'verbum' },
        { la: 'pōnit',   scene: SC.v_ponit,   pars: 'verbum' }
      ],
      story: [
        { la: 'Ōlim ventus et sōl in caelō erant.', scene: SC.f22_caelum,
          nova: [{ w: 'ventus', e: '💨', g: 'ventus flat; ventus arborēs movet' },
                 { w: 'sōl', e: '☀', g: 'sōl in caelō est; sōl nōn ventus est' }] },

        { la: 'Ventus fortis erat. Sōl quoque fortis erat.', scene: SC.f22_caelum,
          nova: [{ w: 'fortis', e: '💪', g: 'fortis ↔ fessus; fortis ventus nōn fessus est' }] },

        /* THE COMPARATIVE, on `altus`, over a picture that has settled it */
        { la: 'Ventus in caelō altus est, sed sōl altior quam ventus est.', scene: SC.f22_altior,
          nova: [{ w: 'altior', e: '⬆', g: 'ventus altus est; sōl altior est' },
                 { w: 'quam', e: '↔', g: 'sōl altior quam ventus: sōl suprā, ventus īnfrā' }] },

        { la: 'Ventus dīxit: “Fortior quam sōl sum!”', scene: SC.f22_ventusDicit,
          nova: [{ w: 'fortior', e: '💪⬆', g: 'fortis, fortior: hic fortis est, ille fortior' }] },

        { la: 'Sōl rīsit et respondit: “Fortior nōn es!”', scene: SC.f22_solDicit, nova: [] },

        /* `ab arbore` is TRUE IN THE PICTURE: the tree stands at the left
           edge and the man walks away from it, to the right. It is also
           the one honest body use of `arbor` in this capitulum — see the
           ledger's recorded call. */
        { la: 'Ecce viātor! Viātor ab arbore ambulābat. Viātor pallium portābat.',
          scene: SC.f22_viator,
          nova: [{ w: 'pallium', e: '🧥', g: 'hic vir pallium habet; ille vir pallium nōn habet' }] },

        { la: 'Ventus dīxit: “Quis pallium capere potest?”', scene: SC.f22_rogat, nova: [] },

        /* THE ADVERB, derived in its own gloss from the adjective above */
        { la: 'Ventus fortiter flāvit.', scene: SC.f22_flat1,
          nova: [{ w: 'flāvit', e: '💨', g: 'ventus flat; tum ventus flāvit' },
                 { w: 'fortiter', e: '💪', g: 'fortis → fortiter: ventus fortis fortiter flat' }] },

        { la: 'Sed viātor pallium tenuit.', scene: SC.f22_tenet,
          nova: [{ w: 'tenuit', e: '🕰🤲', g: 'iam tenet; tum tenuit' }] },

        /* THE COMPARATIVE ADVERB, third in the series (ruling 3) */
        { la: 'Tum ventus fortius flāvit!', scene: SC.f22_flat2,
          nova: [{ w: 'fortius', e: '💪⬆', g: 'fortiter, fortius: prīmum fortiter, tum fortius flat' }] },

        { la: 'Sed viātor pallium fortius tenuit.', scene: SC.f22_tenet2, nova: [] },

        { la: 'Tandem ventus fortissimē flāvit.', scene: SC.f22_flat3,
          nova: [{ w: 'fortissimē', e: '💪⬆⬆', g: 'fortiter, fortius, fortissimē: nēmō fortius flat' }] },

        { la: 'Sed pallium in viātōre mānsit. Ventus pallium nōn cēpit.', scene: SC.f22_manet, nova: [] },

        { la: 'Ventus fessus erat. Ventus iam nōn flāvit.', scene: SC.f22_fessus, nova: [] },

        { la: 'Tum sōl vēnit. Sōl in caelō stetit.', scene: SC.f22_solVenit, nova: [] },

        { la: 'Sōl calidus erat; hiems nōn erat. Viātor quoque calidus fuit.', scene: SC.f22_calidus,
          nova: [{ w: 'calidus', e: '🔥', g: 'sōl calidus est; hiems nōn calida est' }] },

        /* THE PAYOFF: he takes it off himself */
        { la: 'Sōl calidior fuit. Tum viātor pallium posuit.', scene: SC.f22_ponit,
          nova: [{ w: 'calidior', e: '🔥⬆', g: 'calidus, calidior: sōl calidior quam hiems est' }] },

        { la: 'Iam viātor pallium nōn portat. Sōl vīcit!', scene: SC.f22_vicit,
          nova: [{ w: 'vīcit', e: '🕰🥇', g: 'iam vincit; tum vīcit' }] },

        /* THE SUPERLATIVE ADJECTIVE */
        /* `tū` is NOT here, deliberately: the personal pronoun is new to
           the track (R6 shipped `mē`, R1 `ā tē`, but never `tū`) and it
           gets its one gloss in f23, where the reed says it to the oak
           and the two of them are the whole picture. The sun needs no
           pronoun to win — the man walking free behind him is the claim. */
        { la: 'Sōl dīxit: “Vidēsne? Fortissimus sum!”', scene: SC.f22_solDicit2,
          nova: [{ w: 'fortissimus', e: '💪🥇', g: 'fortis, fortior, fortissimus: sōl fortissimus est' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: sōl calidus fortior quam ventus est.', scene: SC.f22_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'ventus',  scene: SC.v_ventus },
          { la: 'sōl',     scene: SC.v_sol },
          { la: 'viātor',  scene: SC.v_viator },
          { la: 'arbor',   scene: SC.v_arbor },
          { la: 'hiems',   scene: SC.v_hiems },
          { la: 'pāvō',    scene: SC.v_pavo }
        ]
      },
      /* SONUS. `pallium` is TWO men and `pōnit` is a man beside a
         garment, so neither is ever offered against `viātor` — a
         learner who hears `viātor` and taps the two-men card has read
         the picture correctly and would be punished for it
         (LATIN-STYLE §4, the Regiō III/IV/VI/VII discipline). `flat` is
         one more cloud and never meets `ventus`. What is left is five
         cards that share nothing: a cloud, a sun, a man, a tree and a
         winter. The held-out cards are recycled in CORRIGE and COMPLĒ,
         where the sentence disambiguates them. */
      sonus: [
        { la: 'ventus',
          answer: { la: 'ventus', scene: SC.v_ventus },
          options: [{ la: 'ventus', scene: SC.v_ventus },
                    { la: 'sōl', scene: SC.v_sol },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'sōl',
          answer: { la: 'sōl', scene: SC.v_sol },
          options: [{ la: 'sōl', scene: SC.v_sol },
                    { la: 'ventus', scene: SC.v_ventus },
                    { la: 'viātor', scene: SC.v_viator }] },
        { la: 'viātor',
          answer: { la: 'viātor', scene: SC.v_viator },
          options: [{ la: 'viātor', scene: SC.v_viator },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'sōl', scene: SC.v_sol }] },
        { la: 'hiems',
          answer: { la: 'hiems', scene: SC.v_hiems },
          options: [{ la: 'hiems', scene: SC.v_hiems },
                    { la: 'sōl', scene: SC.v_sol },
                    { la: 'ventus', scene: SC.v_ventus },
                    { la: 'arbor', scene: SC.v_arbor }] }
      ],
      /* OVERRIDES. The generated set was read first. Two faults, one of
         them new to S8:
           · it clozed `fortius` and `fortiter` off adjacent pages with
             the OTHER form in the option pool, which makes an item
             where both answers are true Latin and only the page number
             decides — the escalation is a sequence, so an item that
             does not say WHERE in the sequence it stands is a
             coin-flip. Every hand item below therefore carries its own
             position word (`prīmum`, `tum`, `tandem`) in the text;
           · it offered `sōl` as a distractor for `ventus` in a sentence
             where the sun is on screen, which is not a distractor but a
             second right answer.
         The region exists for comparison, so the hand set asks for a
         comparative, a superlative or an adverb in 4 of 5 CORRIGE items
         and 5 of 6 COMPLĒ items. */
      overrides: {
        aenigmata: {
          /* five tiles, five pictures that share nothing. `pallium`,
             `flat` and `pōnit` are held out for the SONUS reason — each
             would put a second man or a second cloud on a board that
             already has one. All three are recycled below. */
          pairs: [
            { la: 'ventus', scene: SC.v_ventus },
            { la: 'sōl',    scene: SC.v_sol },
            { la: 'viātor', scene: SC.v_viator },
            { la: 'arbor',  scene: SC.v_arbor },
            { la: 'hiems',  scene: SC.v_hiems }
          ],
          scrambles: [
            { la: 'Ventus fortiter flāvit.',        scene: SC.f22_flat1 },
            { la: 'Viātor pallium portābat.',       scene: SC.f22_viator },
            { la: 'Tum viātor pallium posuit.',     scene: SC.f22_ponit },
            { la: 'Sōl in caelō stetit.',           scene: SC.f22_solVenit }
          ]
        },
        corrige: [
          /* COMPARATIVE ADJECTIVE, with the picture that settles it */
          { words: ['Sōl', 'altus', 'quam', 'ventus', 'est.'], wrong: 1,
            options: ['altior', 'altissimus', 'altē'], correct: 0, scene: SC.f22_altior },
          /* POSITIVE ADVERB: PRĪMUM says where in the series we are */
          { words: ['Prīmum', 'ventus', 'fortius', 'flāvit.'], wrong: 2,
            options: ['fortiter', 'fortis', 'fortissimē'], correct: 0, scene: SC.f22_flat1 },
          /* COMPARATIVE ADVERB: TUM says it, and the cloud is bigger */
          { words: ['Tum', 'ventus', 'fortiter', 'flāvit.'], wrong: 2,
            options: ['fortius', 'fortis', 'fortissimus'], correct: 0, scene: SC.f22_flat2 },
          /* SUPERLATIVE ADVERB: TANDEM says it */
          { words: ['Tandem', 'ventus', 'fortius', 'flāvit.'], wrong: 2,
            options: ['fortissimē', 'fortiter', 'fortior'], correct: 0, scene: SC.f22_flat3 },
          { words: ['Viātor', 'arborem', 'portābat.'], wrong: 1,
            options: ['pallium', 'ventum', 'sōlem'], correct: 0, scene: SC.f22_viator }
        ],
        comple: [
          { text: 'Sōl ___ quam ventus est.',
            options: ['altior', 'altus', 'altē'], correct: 0, scene: SC.f22_altior },
          { text: 'Prīmum ventus ___ flāvit.',
            options: ['fortiter', 'fortius', 'fortissimē'], correct: 0, scene: SC.f22_flat1 },
          { text: 'Tum ventus ___ flāvit!',
            options: ['fortius', 'fortiter', 'fortissimē'], correct: 0, scene: SC.f22_flat2 },
          { text: 'Tandem ventus ___ flāvit.',
            options: ['fortissimē', 'fortius', 'fortiter'], correct: 0, scene: SC.f22_flat3 },
          { text: 'Sōl dīxit: “Vidēsne? ___ sum!”',
            options: ['Fortissimus', 'Fortiter', 'Fortissimē'], correct: 0, scene: SC.f22_solDicit2 },
          { text: 'Tum viātor ___ posuit.',
            options: ['pallium', 'ventum', 'hiemem'], correct: 0, scene: SC.f22_ponit }
        ]
      }
    },

    /* ============ FABLE 23 — Quercus et Harundō ============
       THE IRREGULAR COMPARATIVES. `magnus → maior` and `parvus → minor`
       arrive on adjacent pages, each glossed with its own positive
       (file header, ruling 4), and they arrive HERE because this fable
       is nothing but a size contrast: the whole plot is that the bigger
       thing loses. Nothing else in the region needs an irregular form,
       and `melior`/`peior` are deliberately left shut.

       NO PARTICIPLES (file header). "The bent reed" is a perfect passive
       participle, and the passive is S10. Where the fable wanted one,
       the sentence was changed and never the grammar
       (AUTHORING-BRIEF's golden exemplar rule): the reed is not bent,
       the WIND BENDS IT — `Ventus harundinem flectit` — which is a
       plain accusative object, is what the picture shows, and puts the
       agent of the whole fable in the subject where it belongs.

       ONE DEPARTURE FROM THE FABLE AS COMMONLY TOLD, recorded: in Aesop
       the oak is uprooted and hurled into a river, and the reed's speech
       is a rebuke over the corpse. Here the oak simply falls and becomes
       the `truncus` Regiō III taught, the sun comes out, and the reed's
       line is about the wind rather than about the oak's ruin — the
       mōrāle is untouched and it is still the reed that survives, but
       the tone is B-rated (DESIGN §8) and the agricola of Regiō II
       comes to take the wood, which is what actually happens to a
       fallen oak. */
    {
      id: 'f23',
      titulus: 'Quercus et Harundō',
      icon: '🌳🌾',
      numerus: 'XXIII',
      pos: { x: 0.26, y: 0.60 },
      vocab: [
        { la: 'quercus',  scene: SC.v_quercus,  pars: 'nomen' },
        { la: 'harundō',  scene: SC.v_harundo,  pars: 'nomen' },
        { la: 'truncus',  scene: SC.v_truncus,  pars: 'nomen' },
        { la: 'ventus',   scene: SC.v_ventus,   pars: 'nomen' },
        { la: 'sōl',      scene: SC.v_sol,      pars: 'nomen' },
        { la: 'ager',     scene: SC.v_ager,     pars: 'nomen' },
        { la: 'agricola', scene: SC.v_agricola, pars: 'nomen' },
        { la: 'flectit',  scene: SC.v_flectit,  pars: 'verbum' }
      ],
      story: [
        { la: 'Ōlim quercus in agrō stābat.', scene: SC.f23_quercus,
          nova: [{ w: 'quercus', e: '🌳', g: 'quercus arbor magna est; quercus glandēs habet' }] },

        { la: 'Quercus magna et alta erat. Quercus fortis erat.', scene: SC.f23_quercus, nova: [] },

        { la: 'Prope quercum harundō stābat.', scene: SC.f23_ambo,
          nova: [{ w: 'prope', e: '↔', g: 'nōn prōcul: prope' },
                 { w: 'harundō', e: '🌾', g: 'harundō prope aquam crēscit; harundō tenuis est' }] },

        /* THE TWO IRREGULARS, on adjacent pages, each with its positive */
        { la: 'Quercus maior quam harundō erat.', scene: SC.f23_ambo,
          nova: [{ w: 'maior', e: '⬆', g: 'magnus, maior: quercus magna est, sed maior quam harundō' }] },

        { la: 'Harundō minor quam quercus erat.', scene: SC.f23_ambo,
          nova: [{ w: 'minor', e: '⬇', g: 'parvus, minor: harundō parva est, et minor quam quercus' }] },

        { la: 'Quercus superba erat. Quercus dīxit: “Ō harundō! Minor es!”', scene: SC.f23_superba,
          nova: [] },

        { la: 'Quercus iterum dīxit: “Fortissima sum! Ventum nōn timeō.”', scene: SC.f23_superba,
          nova: [] },

        /* `tū` — the region's one new personal pronoun, glossed by
           POINTING (the device Regiō V's ruling 3 fixed for `tuus`) on
           the page where the picture holds exactly two characters and
           one of them is speaking. Free after this: f23 p17, f24 p7/p9.
           `ad quercum` and not the dative, because `quercus` is 4th
           declension and its dative is S9. */
        { la: 'Harundō respondit: “Tū maior es. Sed ventus venit.”', scene: SC.f23_respondet,
          nova: [{ w: 'tū', e: '👉', g: 'harundō ad quercum dīcit: “tū” — quercus est' }] },

        { la: 'Subitō ventus magnus vēnit. Ventus fortissimē flāvit.', scene: SC.f23_ventus, nova: [] },

        /* the wind is the SUBJECT: no participle, no passive */
        { la: 'Ventus harundinem flexit.', scene: SC.f23_flectit,
          nova: [{ w: 'flexit', e: '🌾⬇', g: 'ventus harundinem flectit — harundō nōn cadit' }] },

        { la: 'Harundō nōn cecidit. Ventus harundinem flexit, sed harundō mānsit.',
          scene: SC.f23_nonCadit, nova: [] },

        { la: 'Tum ventus in quercum fortissimē flāvit.', scene: SC.f23_inQuercum, nova: [] },

        { la: 'Ventus quercum nōn flexit. Quercus alta stetit.', scene: SC.f23_stat, nova: [] },

        /* THE MOMENT */
        { la: 'Sed ventus fortior quam quercus erat. Quercus cecidit!', scene: SC.f23_cadit, nova: [] },

        { la: 'Iam quercus in agrō iacēbat. Quercus truncus erat.', scene: SC.f23_truncus,
          nova: [{ w: 'truncus', e: '🪵', g: 'quercus cecidit: iam truncus in agrō iacet' }] },

        { la: 'Sed harundō prope truncum stetit. Harundō ventum vīcit.',
          scene: SC.f23_harundoStat, nova: [] },

        { la: 'Harundō dīxit: “Tū maior es, sed ventus tē vīcit.”', scene: SC.f23_dicit, nova: [] },

        { la: 'Posteā ventus discessit et sōl vēnit. Sōl calidus erat.',
          scene: SC.f23_sol, nova: [] },

        { la: 'Tum agricola vēnit. Agricola truncum vīdit et portāvit.',
          scene: SC.f23_agricola, nova: [] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: minor harundō ventum vincit; maior quercus cadit.',
          scene: SC.f23_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'quercus',  scene: SC.v_quercus },
          { la: 'harundō',  scene: SC.v_harundo },
          { la: 'truncus',  scene: SC.v_truncus },
          { la: 'ventus',   scene: SC.v_ventus },
          { la: 'agricola', scene: SC.v_agricola },
          { la: 'sōl',      scene: SC.v_sol }
        ]
      },
      /* SONUS. `flectit` is one more reed and is never offered against
         `harundō`. `agricola` is a man beside grain and `ager` is the
         grain alone, so those two never meet either — by ear the
         learner would be choosing between two pictures that are both
         true of the word they heard. What is left is five cards that
         share nothing: an oak, a reed, a log, a cloud and a sun. The
         held-out cards are recycled in CORRIGE and COMPLĒ. */
      sonus: [
        { la: 'quercus',
          answer: { la: 'quercus', scene: SC.v_quercus },
          options: [{ la: 'quercus', scene: SC.v_quercus },
                    { la: 'harundō', scene: SC.v_harundo },
                    { la: 'truncus', scene: SC.v_truncus }] },
        { la: 'harundō',
          answer: { la: 'harundō', scene: SC.v_harundo },
          options: [{ la: 'harundō', scene: SC.v_harundo },
                    { la: 'quercus', scene: SC.v_quercus },
                    { la: 'ventus', scene: SC.v_ventus }] },
        { la: 'truncus',
          answer: { la: 'truncus', scene: SC.v_truncus },
          options: [{ la: 'truncus', scene: SC.v_truncus },
                    { la: 'quercus', scene: SC.v_quercus },
                    { la: 'harundō', scene: SC.v_harundo },
                    { la: 'sōl', scene: SC.v_sol }] },
        { la: 'ventus',
          answer: { la: 'ventus', scene: SC.v_ventus },
          options: [{ la: 'ventus', scene: SC.v_ventus },
                    { la: 'sōl', scene: SC.v_sol },
                    { la: 'quercus', scene: SC.v_quercus }] }
      ],
      /* OVERRIDES. The generated set produced one item that is simply
         false — "Quercus ___ quam harundō erat" with `maior` and
         `minor` both offered, which is a 50/50 on the ONE distinction
         this capitulum exists to draw, because the splitter had already
         eaten the subject that decides it. Every hand item below keeps
         BOTH nouns in the sentence, so the picture and the Latin agree
         about which is which.
         Target-grammar items: 4 of 5 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* five tiles. `flectit` and `ager` are held out (see SONUS):
             one is a second reed, the other is the grain that
             `agricola` already stands beside. Both are recycled below. */
          pairs: [
            { la: 'quercus',  scene: SC.v_quercus },
            { la: 'harundō',  scene: SC.v_harundo },
            { la: 'truncus',  scene: SC.v_truncus },
            { la: 'ventus',   scene: SC.v_ventus },
            { la: 'agricola', scene: SC.v_agricola }
          ],
          scrambles: [
            { la: 'Ventus harundinem flexit.',      scene: SC.f23_flectit },
            { la: 'Prope quercum harundō stābat.',  scene: SC.f23_ambo },
            { la: 'Quercus truncus erat.',          scene: SC.f23_truncus },
            { la: 'Tum agricola vēnit.',            scene: SC.f23_agricola }
          ]
        },
        corrige: [
          /* IRREGULAR COMPARATIVE, with both nouns left in the sentence */
          { words: ['Quercus', 'minor', 'quam', 'harundō', 'erat.'], wrong: 1,
            options: ['maior', 'minima', 'magis'], correct: 0, scene: SC.f23_ambo },
          /* the other one, same discipline */
          { words: ['Harundō', 'maior', 'quam', 'quercus', 'erat.'], wrong: 1,
            options: ['minor', 'maxima', 'magna'], correct: 0, scene: SC.f23_ambo },
          /* SUPERLATIVE ADVERB, recycled from f22 */
          { words: ['Ventus', 'fortiter', 'flāvit', 'et', 'quercus', 'cecidit.'], wrong: 1,
            options: ['fortissimē', 'fortis', 'fortior'], correct: 0, scene: SC.f23_cadit },
          /* COMPARATIVE with quam, on the sentence the fable turns on */
          { words: ['Sed', 'ventus', 'fortis', 'quam', 'quercus', 'erat.'], wrong: 2,
            options: ['fortior', 'fortissimus', 'fortiter'], correct: 0, scene: SC.f23_cadit },
          { words: ['Ventus', 'quercum', 'flexit.'], wrong: 1,
            options: ['harundinem', 'agricolam', 'sōlem'], correct: 0, scene: SC.f23_flectit }
        ],
        comple: [
          { text: 'Quercus ___ quam harundō erat.',
            options: ['maior', 'minor', 'magis'], correct: 0, scene: SC.f23_ambo },
          { text: 'Harundō ___ quam quercus erat.',
            options: ['minor', 'maior', 'minimē'], correct: 0, scene: SC.f23_ambo },
          { text: 'Sed ventus ___ quam quercus erat.',
            options: ['fortior', 'fortis', 'fortiter'], correct: 0, scene: SC.f23_cadit },
          { text: 'Ventus fortissimē flāvit et quercus ___.',
            options: ['cecidit', 'stetit', 'flexit'], correct: 0, scene: SC.f23_cadit },
          { text: 'Ventus ___ flexit, sed harundō nōn cecidit.',
            options: ['harundinem', 'quercum', 'truncum'], correct: 0, scene: SC.f23_flectit },
          { text: 'Quercus cecidit: iam ___ in agrō iacet.',
            options: ['truncus', 'harundō', 'agricola'], correct: 0, scene: SC.f23_truncus }
        ]
      }
    },

    /* ============ FABLE 24 — Pāvō et Grūs ============
       THE SUPERLATIVE, adjective and adverb, and the -ERRIMUS pattern
       (file header, ruling 5). The peacock is what -errimus was
       invented for: `pulcher → pulchrior → pulcherrimus` runs down the
       first half of the fable, and the crane answers it with the other
       series on the region's other axis — `altus → altē → altius →
       altissimē` — three heights that are three y values in three
       pictures (ruling 3).

       THE CRANE'S ANSWER IS NOT AN INSULT. Aesop's crane says the
       peacock is a slave to his own beauty; here she simply flies, and
       the last word is hers only because she is the one who can. The
       peacock is left admired and grounded, not humiliated (DESIGN §8),
       and the mōrāle gives each of them their true comparative.

       NO FEATHER AND NO WING IN THE LIBRARY (file header), so neither
       is ever named: the tail is `cauda`, which the `pavo` actor draws
       fanned as its entire silhouette, and `cauda` is taught by gloss
       with no card of its own — a card would have been a second
       peacock. Treatment precedent: Regiō V's `sōlus`. */
    {
      id: 'f24',
      titulus: 'Pāvō et Grūs',
      icon: '🦚🐦',
      numerus: 'XXIV',
      pos: { x: 0.72, y: 0.36 },
      /* SEVEN cards, not eight. `quercus` was the eighth and is gone: it
         is f23's headline word, it appears nowhere in f24's Latin, and
         on a board with `arbor` it was the region's closest 96 px call.
         Dropping it fixes both at once. Every card below now has a body
         use in this capitulum. */
      vocab: [
        { la: 'pāvō',   scene: SC.v_pavo,   pars: 'nomen' },
        { la: 'grūs',   scene: SC.v_grus,   pars: 'nomen' },
        { la: 'ager',   scene: SC.v_ager,   pars: 'nomen' },
        { la: 'sōl',    scene: SC.v_sol,    pars: 'nomen' },
        { la: 'ventus', scene: SC.v_ventus, pars: 'nomen' },
        { la: 'arbor',  scene: SC.v_arbor,  pars: 'nomen' },
        { la: 'volat',  scene: SC.v_volat,  pars: 'verbum' }
      ],
      story: [
        { la: 'Ōlim pāvō in agrō ambulābat. Sōl in caelō erat.', scene: SC.f24_pavo,
          nova: [{ w: 'pāvō', e: '🦚', g: 'pāvō avis magna est; pāvō caudam magnam habet' }] },

        { la: 'Pāvō caudam magnam habēbat.', scene: SC.f24_cauda,
          nova: [{ w: 'caudam', e: '🦚', g: 'cauda pāvōnis magna est; cauda gruis parva est' }] },

        /* THE -ERRIMUS SUPERLATIVE (ruling 5). `nūlla` is glossed here
           and then USED here, in the sentence beside it, rather than
           being left to live inside a gloss and reappear in an exercise
           — the gloss-once-use-once defect Regiō VII's ledger records
           against `terra` and `valdē`. */
        { la: 'Cauda pāvōnis pulcherrima erat. Nūlla cauda pulchrior erat.',
          scene: SC.f24_cauda,
          nova: [{ w: 'pulcherrima', e: '😍🥇', g: 'pulcher, pulchrior, pulcherrimus: pāvō pulcherrimam caudam habet' },
                 { w: 'nūlla', e: '0️⃣', g: 'nūlla cauda = nōn ūna cauda' }] },

        { la: 'Tum grūs vēnit. Grūs pulchra nōn erat.', scene: SC.f24_grus,
          nova: [{ w: 'grūs', e: '🐦', g: 'grūs avis alta est; grūs altē volat' }] },

        { la: 'Pāvō gruem vīdit et rīsit.', scene: SC.f24_ridet, nova: [] },

        /* THE COMPARATIVE, on the adjective the fable is about */
        { la: 'Pāvō dīxit: “Cauda mea pulchrior quam cauda tua est!”', scene: SC.f24_irridet,
          nova: [{ w: 'pulchrior', e: '😍⬆', g: 'pulcher, pulchrior: haec cauda pulchra, illa pulchrior' }] },

        { la: 'Pāvō iterum dīxit: “Tū pulchra nōn es!”', scene: SC.f24_irridet, nova: [] },

        { la: 'Grūs trīstis nōn erat. Grūs respondit: “Cauda tua pulchrior est.”',
          scene: SC.f24_respondet, nova: [] },

        { la: 'Grūs iterum dīxit: “Sed tū nōn volās!”', scene: SC.f24_respondet, nova: [] },

        /* THE ADVERB, derived from the adjective in its own gloss */
        { la: 'Tum grūs volāvit. Grūs altē volāvit.', scene: SC.f24_volat1,
          nova: [{ w: 'altē', e: '⬆', g: 'altus → altē: grūs alta est, et altē volat' }] },

        /* THE COMPARATIVE ADVERB, third in the series */
        { la: 'Grūs altius volāvit. Grūs suprā arborēs erat.', scene: SC.f24_volat2,
          nova: [{ w: 'altius', e: '⬆⬆', g: 'altē, altius: prīmum altē, tum altius volat' }] },

        /* THE SUPERLATIVE ADVERB */
        { la: 'Tandem grūs altissimē volāvit. Grūs in caelō erat.', scene: SC.f24_volat3,
          nova: [{ w: 'altissimē', e: '⬆🥇', g: 'altē, altius, altissimē: nēmō altius volat' }] },

        /* `spectābat` was cut here. The first draft glossed `spectat =
           videt` and then used the word exactly once — a whole new
           lexeme bought for one sentence, which is the defect Regiō VII
           cut `terra` and `valdē` for. `vidēbat` is R1's verb in R6's
           imperfect and costs nothing. */
        { la: 'Pāvō gruem vidēbat. Pāvō quoque volāre cupiēbat.', scene: SC.f24_cupit,
          nova: [{ w: 'vidēbat', e: '🕰👀', g: 'iam videt; tum vidēbat' }] },

        { la: 'Sed pāvō nōn volāvit. Cauda pāvōnis gravis erat.', scene: SC.f24_nonVolat, nova: [] },

        /* THE WIND CANNOT LIFT HIM EITHER — the region's own antagonist,
           who is about to be its boss, failing at the thing f22 said he
           could not do to a cloak */
        { la: 'Tum ventus vēnit et fortiter flāvit. Sed ventus pāvōnem nōn portāvit.',
          scene: SC.f24_ventus, nova: [] },

        { la: 'Ventus discessit et sōl vēnit. Pāvō trīstis in agrō mānsit.',
          scene: SC.f24_tristis, nova: [] },

        { la: 'Tum grūs vēnit et dīxit: “Cauda tua pulcherrima est. Nūlla cauda pulchrior est.”',
          scene: SC.f24_redit, nova: [] },

        /* `ego` was cut: the contrast is already carried by `tua` in the
           sentence before it, and the explicit personal pronoun would
           have been a second new pronoun in a region that opens `tū` */
        { la: 'Grūs iterum dīxit: “Sed altissimē volō.”', scene: SC.f24_redit, nova: [] },

        /* mōrāle: gnomic present, no new words — and each gets their own
           comparative, which is the fable's actual justice */
        { la: 'Fābula docet: pāvō pulchrior est, sed grūs altius volat.',
          scene: SC.f24_moral, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'pāvō',   scene: SC.v_pavo },
          { la: 'grūs',   scene: SC.v_grus },
          { la: 'arbor',  scene: SC.v_arbor },
          { la: 'sōl',    scene: SC.v_sol },
          { la: 'ventus', scene: SC.v_ventus },
          { la: 'ager',   scene: SC.v_ager }
        ]
      },
      /* SONUS. `volat` is the crane IN THE AIR and is never offered
         against `grūs`. The `arbor`/`quercus` pair — two pictures of a
         tree, the closest 96 px call in the region — no longer exists
         here at all: `quercus` was dropped from this capitulum's cards.
         What is left is six cards, five of which share nothing: a
         peacock, a crane, a field, a sun and a cloud. The held-out card
         is recycled in CORRIGE and COMPLĒ. */
      sonus: [
        { la: 'pāvō',
          answer: { la: 'pāvō', scene: SC.v_pavo },
          options: [{ la: 'pāvō', scene: SC.v_pavo },
                    { la: 'grūs', scene: SC.v_grus },
                    { la: 'sōl', scene: SC.v_sol }] },
        { la: 'grūs',
          answer: { la: 'grūs', scene: SC.v_grus },
          options: [{ la: 'grūs', scene: SC.v_grus },
                    { la: 'pāvō', scene: SC.v_pavo },
                    { la: 'ventus', scene: SC.v_ventus }] },
        { la: 'ager',
          answer: { la: 'ager', scene: SC.v_ager },
          options: [{ la: 'ager', scene: SC.v_ager },
                    { la: 'pāvō', scene: SC.v_pavo },
                    { la: 'grūs', scene: SC.v_grus },
                    { la: 'sōl', scene: SC.v_sol }] },
        { la: 'sōl',
          answer: { la: 'sōl', scene: SC.v_sol },
          options: [{ la: 'sōl', scene: SC.v_sol },
                    { la: 'ventus', scene: SC.v_ventus },
                    { la: 'pāvō', scene: SC.v_pavo }] }
      ],
      /* OVERRIDES. The generated set produced the region's subtlest
         fault: "Grūs ___ volāvit" off page 11, with `altē`, `altius`
         and `altissimē` all in the pool — and all three are true of a
         flying crane. Only the SEQUENCE decides, so every hand item
         below carries its position word (`prīmum`, `tum`, `tandem`) in
         the text, which is the same fix f22 needed for the wind.
         Target-grammar items: 4 of 5 in CORRIGE, 5 of 6 in COMPLĒ. */
      overrides: {
        aenigmata: {
          /* five tiles. `volat` is held out (a second crane) and is
             recycled below; `arbor` takes the fifth slot now that
             `quercus` has left the capitulum. */
          pairs: [
            { la: 'pāvō',   scene: SC.v_pavo },
            { la: 'grūs',   scene: SC.v_grus },
            { la: 'ventus', scene: SC.v_ventus },
            { la: 'ager',   scene: SC.v_ager },
            { la: 'sōl',    scene: SC.v_sol }
          ],
          scrambles: [
            { la: 'Tum grūs volāvit.',              scene: SC.f24_volat1 },
            { la: 'Grūs altius volāvit.',           scene: SC.f24_volat2 },
            { la: 'Cauda pāvōnis pulcherrima erat.', scene: SC.f24_cauda },
            { la: 'Pāvō gruem vīdit et rīsit.',     scene: SC.f24_ridet }
          ]
        },
        corrige: [
          /* POSITIVE ADVERB, with TUM fixing the place in the series */
          { words: ['Tum', 'grūs', 'altissimē', 'volāvit.'], wrong: 2,
            options: ['altē', 'altior', 'alta'], correct: 0, scene: SC.f24_volat1 },
          /* COMPARATIVE ADVERB, with the tree in the picture to prove it */
          { words: ['Grūs', 'altē', 'volāvit', 'et', 'suprā', 'arborēs', 'erat.'], wrong: 1,
            options: ['altius', 'altissimē', 'altus'], correct: 0, scene: SC.f24_volat2 },
          /* SUPERLATIVE ADVERB, with TANDEM */
          { words: ['Tandem', 'grūs', 'altius', 'volāvit.'], wrong: 2,
            options: ['altissimē', 'altē', 'alta'], correct: 0, scene: SC.f24_volat3 },
          /* COMPARATIVE WITH QUAM. This slot held a -errimus item whose
             sentence printed `pulchrior` TWICE — one of them the
             intruder and one of them correct — so the learner had to
             guess WHICH copy of the same word was wrong. Ambiguous, and
             LATIN-STYLE §4 rejects it. The -errimus keeps its drill in
             COMPLĒ[4], where the clause `Nūlla cauda pulchrior est`
             forces the superlative and nothing is doubled. Here the
             fault is a superlative standing where `quam` demands a
             comparative; the picture holds both birds, so `minor` is
             plainly false of the peacock's tail. */
          { words: ['Cauda', 'pāvōnis', 'pulcherrima', 'quam', 'cauda', 'gruis', 'est.'], wrong: 2,
            options: ['pulchrior', 'pulchra', 'minor'], correct: 0, scene: SC.f24_irridet },
          { words: ['Sed', 'pāvō', 'nōn', 'volāvit:', 'cauda', 'levis', 'erat.'], wrong: 5,
            options: ['gravis', 'parva', 'pulchra'], correct: 0, scene: SC.f24_nonVolat }
        ],
        comple: [
          { text: 'Tum grūs ___ volāvit.',
            options: ['altē', 'altius', 'altissimē'], correct: 0, scene: SC.f24_volat1 },
          { text: 'Grūs ___ volāvit et suprā arborēs erat.',
            options: ['altius', 'altē', 'altissimē'], correct: 0, scene: SC.f24_volat2 },
          { text: 'Tandem grūs ___ volāvit.',
            options: ['altissimē', 'altius', 'altē'], correct: 0, scene: SC.f24_volat3 },
          { text: 'Cauda pāvōnis ___ quam cauda gruis est.',
            options: ['pulchrior', 'pulcherrima', 'pulchra'], correct: 0, scene: SC.f24_irridet },
          { text: 'Nūlla cauda pulchrior est: cauda pāvōnis ___ est.',
            options: ['pulcherrima', 'pulchrior', 'pulchra'], correct: 0, scene: SC.f24_cauda },
          { text: 'Sed ___ nōn volāvit: cauda gravis erat.',
            options: ['pāvō', 'grūs', 'ventus'], correct: 0, scene: SC.f24_nonVolat }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r08',
    titulus: 'Hortus',
    ladder: 'S8',                 /* CURRICULUM §0: comparatives, superlatives, adverbs */
    progressId: 'r08',
    capitula: capitula,
    boss: {
      id: 'b_r08',
      progressId: 'r08',
      /* THE WIND. He blew through all three fables — f22's antagonist,
         f23's storm, and the thing f24's crane rides — so the region's
         duel is the one character the learner has been watching lose
         and win by turns. He is NOT the wolf (CURRICULUM §1 gives him
         R1, R5, R9 and the R12 finale), so his tuning is the ORDINARY
         one: hp 6 over 70 phase-seconds, exactly as r01–r04, r06 and
         r07, and rule_boss_min_ms('r08') should be the same 15000 every
         duel region uses.
           THE FUGA PHASE IS THEMATIC HERE and that is why the phase
         order is unchanged from r06/r07 rather than reshuffled the way
         r04's race was: in fuga the player is pushed, and being pushed
         by Ventus is the fable. Nothing in the content tunes it — the
         phase engine scales spawn rate and speed off regionIndex
         (DESIGN §6) — but the integrator should know the choice was
         made on meaning, not on difficulty. */
      name: 'Ventus',
      actor: 'ventus',
      vinceText: 'Ventum vince!',
      /* LEGACY single-phase tuning, kept for the two reasons every
         earlier region keeps it: server/lib/rules.php derives
         rule_boss_min_ms from these numbers, and a client without
         js/boss-phases.js must still be able to run the fight. */
      hp: 6,
      seconds: 45,
      pos: { x: 0.32, y: 0.14 },
      phases: [
        { type: 'caterva', hp: 2, seconds: 22 },
        { type: 'clamor',  hp: 2, seconds: 28 },
        { type: 'fuga',    hp: 2, seconds: 20 }
      ],
      /* HAND-AUTHORED CLĀMOR (AUTHORING-BRIEF, binding from wave 3).
         Five items, all three capitula represented. Every gap is a
         picturable content lexeme with a vocabulary card in this
         region; every gap stands where the DICTIONARY form stands
         (r05's ruling — the catchable tile carries the citation form,
         so every gap below is a nominative); every option is the same
         part of speech as the gap and is a thing plainly NOT in the
         pictured scene. Each gap's neighbours were checked against this
         region's own story bigrams, so no distractor stands where the
         region's Latin actually puts it.
           `cauda`, `fortis`, `calidus` and every comparative are absent
         from this list on purpose: `cauda` has no card (it would be a
         second peacock) and an adjective gap would need a card that is
         a comparison, which is two pictures and does not fit a tile.
           NOTE ON THE SURROUNDING FRAMES: every frame here carries a
         comparative, a superlative or an adverb — the region's target
         grammar. The gap stays a picturable noun (the brief's rule) and
         the morphology does its work in the words around it, so the
         learner reads five comparisons under time pressure. */
      clamor: [
        { text: '____ fortissimē flāvit, sed pallium nōn cēpit.',
          answer: 'ventus', options: ['ventus', 'sōl', 'pāvō'],
          scene: SC.f22_flat3 },
        { text: 'Sōl calidior fuit: tum viātor ____ posuit.',
          answer: 'pallium', options: ['pallium', 'quercus', 'harundō'],
          scene: SC.f22_ponit },
        { text: '____ maior quam harundō erat, sed cecidit.',
          answer: 'quercus', options: ['quercus', 'grūs', 'agricola'],
          scene: SC.f23_cadit },
        { text: '____ altissimē volāvit: nēmō altius volat.',
          answer: 'grūs', options: ['grūs', 'truncus', 'ager'],
          scene: SC.f24_volat3 },
        /* THE GAP STANDS WHERE THE DICTIONARY FORM STANDS (r05's ruling).
           The first draft wrote `Cauda ____ pulcherrima est.` and answered
           it with `pāvō` — the tile carries the citation form, so the
           filled frame read `Cauda pāvō pulcherrima est`, which is not
           Latin. The frame is turned around instead: the nominative now
           has a nominative's slot, the superlative survives, and
           `pulcherrimam` is the form this capitulum's own p3 gloss
           prints. */
        { text: '____ caudam pulcherrimam habet.',
          answer: 'pāvō', options: ['pāvō', 'agricola', 'truncus'],
          scene: SC.f24_cauda }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum, which is what
         app.js's bossWords() needs to resolve it. All three capitula
         are represented. Answer key: server/lib/rules.php.
           SHARED-PICTURE CHECK ACROSS CAPITULA (the rule Regiō VII's
         harness produced): the boss quiz is the one screen that draws
         cards from all three capitula at once, so pairs that are safely
         apart inside their own capitula have to be re-checked here.
         Two were excluded for it: `harundō` is not in this list because
         `quercus` is (a reed and an oak are both green things on the
         same cream field at 96 px), and `arbor` is excluded for the
         same reason. Measured, not guessed. */
      quiz: [
        { la: 'ventus',  from: 'f22' },
        { la: 'sōl',     from: 'f22' },
        { la: 'quercus', from: 'f23' },
        { la: 'pāvō',    from: 'f24' },
        { la: 'grūs',    from: 'f24' }
      ]
    }
  });
})();
