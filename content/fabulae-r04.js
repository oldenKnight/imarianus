/* ============================================================
   content/fabulae-r04.js — FĀBULAE · Regiō IV · MŌNS  (ladder S4)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō III:
     f10 Testūdō et Lepus   — the PREPOSITIONS: in · ex · ab · cum · dē · sub
     f11 Vulpēs et Cicōnia  — the INSTRUMENTAL ablative (linguā, rōstrō)
     f12 Haedus et Lupus    — all of them again, on one wall; WOLF CAMEO

   STAGE CEILING (CURRICULUM §0 S4, binding):
     everything S1–S3 (nom/acc sg+pl · genitive · dative sg+pl · est/sunt ·
     3rd-person present of ANY conjugation, AUTHORING-BRIEF ruling 1 ·
     -que · et…et · nōn) PLUS the ablative: the six prepositions
     in / ex / ab / cum / dē / sub, and the instrumental ablative.
     STILL FORBIDDEN: imperative, vocative, question words, pronouns,
     imperfect, perfect, comparative, and the infinitive with potest /
     vult / dēbet (AUTHORING-BRIEF ruling 2 puts that at S5 — so
     "capere nōn potest", which Regiō I shipped, is NOT reused here;
     every such thought is rewritten as a plain negative present).

   Regiō I–III shipped `in silvā / in arbore / in agrō / in aquā /
   in ōre / in rōstrō` as an unanalysed locative habit. THIS is the
   region where that habit is named: `in monte` on f10 p6 carries the
   first morphology gloss for the case, and every ablative after it is
   built on that page.

   ONE PIECE OF ART THE LIBRARY DOES NOT HAVE (reported, not worked
   around): there is no road/`via` prop or background. The assignment's
   sample phrase `in viā` is therefore NOT in this region; teaching it
   would have meant approximating a scene, which LATIN-STYLE §5 forbids.
   Nothing is lost — the six prepositions the ladder actually names are
   all pictured, which is better coverage than `via` would have bought.

   PROGRESS IDS ARE FROZEN once shipped: f10/f11/f12 and progressId
   'r04' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  var SC = {

    /* ============ fable 10 — Testūdō et Lepus ============ */

    f10_testudo: { bg: 'plain', items: [
                   { t: 'bush',    x: 350, y: G },
                   { t: 'testudo', x: 170, y: G, s: 1.4 }
                 ] },

    f10_lepus:   { bg: 'forest', items: [
                   { t: 'tree',  x: 60,  y: G, s: 0.95 },
                   { t: 'lepus', x: 230, y: G, s: 1.15, pose: 'walk' }
                 ] },

    f10_celer:   { bg: 'plain', items: [
                   { t: 'testudo', x: 70,  y: G, s: 1.25 },
                   { t: 'lepus',   x: 280, y: G, s: 1.15, pose: 'run' }
                 ] },

    f10_videt:   { bg: 'plain', items: [
                   { t: 'testudo', x: 105, y: G, s: 1.3 },
                   { t: 'lepus',   x: 285, y: G, s: 1.15, flip: true }
                 ] },

    f10_dicit:   { bg: 'plain', items: [
                   { t: 'testudo', x: 105, y: G, s: 1.3 },
                   { t: 'lepus',   x: 285, y: G, s: 1.15, flip: true }
                 ],
                 bubbles: [{ x: 205, y: 66, w: 88, h: 44, text: '🐢 🐌', kind: 'speech', tail: 'right', fs: 17 }] },

    /* The page where the ABLATIVE gets its name, so the picture has to
       say `in monte` and not `ad montem`.
       DEFECT FIXED (see the report): the first draft used the plain
       background with the `mountain` PROP behind two animals standing on
       flat ground — which pictures "beside the mountain", not "on it",
       and the whole gloss hangs off that preposition. The `mountain`
       BACKGROUND puts the peak behind and mountain ground underfoot, so
       the animals really are in the mountains. They are placed clear of
       the background's foreground boulders: a turtle on a grey rock is
       camouflage, not art. */
    f10_mons:    { bg: 'mountain', items: [
                   { t: 'testudo', x: 112, y: G, s: 1.3 },
                   { t: 'lepus',   x: 268, y: G, s: 1.1, flip: true }
                 ] },

    /* dē monte: the mountain is behind them now, on the left */
    f10_demonte: { bg: 'plain', items: [
                   { t: 'mountain', x: 80,  y: G, s: 1.05 },
                   { t: 'testudo',  x: 235, y: G, s: 1.25 },
                   { t: 'lepus',    x: 320, y: G, s: 1.1 }
                 ] },

    f10_currit:  { bg: 'plain', items: [
                   { t: 'mountain', x: 60,  y: G, s: 0.95 },
                   { t: 'testudo',  x: 150, y: G, s: 1.2 },
                   { t: 'lepus',    x: 330, y: G, s: 1.1, pose: 'run' }
                 ] },

    f10_subsedet: { bg: 'plain', items: [
                   { t: 'tree',  x: 180, y: G, s: 1.25 },
                   { t: 'lepus', x: 202, y: G, s: 1.1 }
                 ] },

    f10_dormit:  { bg: 'plain', items: [
                   { t: 'tree',  x: 180, y: G, s: 1.25 },
                   { t: 'lepus', x: 200, y: G, s: 1.15, pose: 'lie' }
                 ],
                 bubbles: [{ x: 316, y: 100, w: 54, h: 40, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },

    f10_ambulat: { bg: 'plain', items: [
                   { t: 'mountain', x: 60,  y: G, s: 0.95 },
                   { t: 'testudo',  x: 230, y: G, s: 1.25 }
                 ] },

    f10_semper:  { bg: 'plain', items: [
                   { t: 'mountain', x: 50,  y: G, s: 0.85 },
                   /* pulled in from x 355 s 0.9: the canopy (±56 local)
                      was running off the right edge of the frame */
                   { t: 'tree',     x: 342, y: G, s: 0.8 },
                   { t: 'testudo',  x: 215, y: G, s: 1.25 }
                 ] },

    /* the turtle arrives; the hare is still asleep under the same tree */
    f10_advenit: { bg: 'plain', items: [
                   { t: 'tree',    x: 180, y: G, s: 1.25 },
                   { t: 'lepus',   x: 200, y: G, s: 1.15, pose: 'lie' },
                   { t: 'testudo', x: 78,  y: G, s: 1.2 }
                 ],
                 bubbles: [{ x: 316, y: 100, w: 54, h: 40, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },

    /* ab arbore: the turtle has left the tree behind it */
    f10_abarbore: { bg: 'plain', items: [
                   { t: 'tree',    x: 110, y: G, s: 1.2 },
                   { t: 'lepus',   x: 130, y: G, s: 1.1, pose: 'lie' },
                   { t: 'testudo', x: 285, y: G, s: 1.25 }
                 ] },

    f10_aperit:  { bg: 'plain', items: [
                   { t: 'tree',    x: 90,  y: G, s: 1.1 },
                   { t: 'lepus',   x: 175, y: G, s: 1.15, pose: 'run' },
                   { t: 'testudo', x: 330, y: G, s: 1.25 }
                 ] },

    /* the tree was at x 350 s 0.95 and its canopy (±62 local) ran off the
       right edge of the 400-unit frame; pulled in and shrunk to fit */
    f10_vincit:  { bg: 'plain', items: [
                   { t: 'tree',    x: 332, y: G, s: 0.85 },
                   { t: 'testudo', x: 258, y: G, s: 1.35 },
                   { t: 'lepus',   x: 90,  y: G, s: 1.1, pose: 'run' }
                 ],
                 bubbles: [{ x: 190, y: 62, w: 56, h: 40, text: '🥇', kind: 'thought', tail: 'right', fs: 19 }] },

    f10_dicit2:  { bg: 'plain', items: [
                   { t: 'tree',    x: 332, y: G, s: 0.85 },
                   { t: 'testudo', x: 258, y: G, s: 1.35 },
                   { t: 'lepus',   x: 90,  y: G, s: 1.1, pose: 'run' }
                 ],
                 bubbles: [{ x: 190, y: 60, w: 88, h: 42, text: '🐇 💨 · 🐢 🥇', kind: 'speech', tail: 'right', fs: 14 }] },

    f10_moral:   { bg: 'plain', items: [
                   { t: 'testudo', x: 265, y: G, s: 1.35 },
                   { t: 'lepus',   x: 110, y: G, s: 1.1 }
                 ],
                 bubbles: [{ x: 200, y: 68, w: 70, h: 42, text: '🐢 🥇', kind: 'thought', tail: 'right', fs: 18 }] },

    /* ============ fable 11 — Vulpēs et Cicōnia ============ */

    f11_duo:     { bg: 'plain', items: [
                   { t: 'fox',     x: 110, y: G, s: 1 },
                   { t: 'ciconia', x: 300, y: G, s: 1, flip: true }
                 ] },

    f11_cibus:   { bg: 'plain', items: [
                   { t: 'mensa',  x: 200, y: G, s: 1.05 },
                   { t: 'patina', x: 200, y: G - 26, s: 0.85, food: true },
                   { t: 'fox',    x: 85,  y: G, s: 0.95 }
                 ] },

    f11_dat:     { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85, food: true },
                   { t: 'fox',     x: 85,  y: G, s: 0.95 },
                   { t: 'ciconia', x: 320, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 200, y: 58, w: 62, h: 40, text: '➡', kind: 'thought', tail: 'right', fs: 20 }] },

    f11_lingua:  { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85, food: true },
                   { t: 'fox',     x: 118, y: G, s: 0.95 },
                   { t: 'ciconia', x: 330, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 92, y: 78, w: 56, h: 40, text: '👅', kind: 'thought', tail: 'right', fs: 20 }] },

    f11_rostro:  { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85, food: true },
                   { t: 'ciconia', x: 300, y: G, s: 1, pose: 'peck', flip: true }
                 ],
                 bubbles: [{ x: 96, y: 78, w: 70, h: 42, text: '🐦 👄', kind: 'thought', tail: 'right', fs: 18 }] },

    f11_frustra: { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85, food: true },
                   { t: 'ciconia', x: 300, y: G, s: 1, pose: 'peck', flip: true }
                 ],
                 bubbles: [{ x: 96, y: 78, w: 72, h: 42, text: '🍽 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f11_tristis: { bg: 'plain', items: [
                   { t: 'mensa',   x: 210, y: G, s: 1.05 },
                   { t: 'patina',  x: 210, y: G - 26, s: 0.85, food: true },
                   { t: 'ciconia', x: 320, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 252, y: 66, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'right', fs: 19 }] },

    f11_laeta:   { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85 },
                   { t: 'fox',     x: 78,  y: G, s: 0.95 },
                   { t: 'ciconia', x: 330, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 78, y: 66, w: 54, h: 38, text: '😀', kind: 'thought', tail: 'right', fs: 18 },
                           { x: 330, y: 66, w: 54, h: 38, text: '😢', kind: 'thought', tail: 'left', fs: 18 }] },

    f11_dicit1:  { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85 },
                   { t: 'fox',     x: 78,  y: G, s: 0.95 },
                   { t: 'ciconia', x: 330, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 216, y: 58, w: 108, h: 42, text: '👅 ✓ 🐦 ✗', kind: 'speech', tail: 'right', fs: 15 }] },

    /* the second dinner: same table, the jar has replaced the dish */
    f11_urna:    { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'urna',    x: 200, y: G - 25, s: 0.72 },
                   { t: 'fox',     x: 85,  y: G, s: 0.95 },
                   { t: 'ciconia', x: 320, y: G, s: 1, flip: true }
                 ] },

    /* The two vessels side by side and big, so `alta` / `nōn alta` is a
       comparison the eye finishes before the words start.
       TWO DEFECTS FIXED HERE (see the report). First the patina sat at
       x 300 on a table that only spans 155–245 — it hung in mid-air.
       Then the table went altogether: the `mensa` prop paints its own
       bread, olives and cup, and this page's CORRIGE item turns on
       whether the cibus is in the patina or in the urna — a third,
       painted-on dinner would have made that answer arguable. */
    f11_urnaAlta: { bg: 'plain', items: [
                   { t: 'urna',   x: 140, y: G, s: 1.3 },
                   { t: 'patina', x: 275, y: G, s: 1.7 }
                 ] },

    f11_exUrna:  { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'urna',    x: 200, y: G - 25, s: 0.72 },
                   { t: 'ciconia', x: 300, y: G, s: 1, pose: 'peck', flip: true },
                   { t: 'fox',     x: 85,  y: G, s: 0.95 }
                 ] },

    f11_vulpNon: { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'urna',    x: 200, y: G - 25, s: 0.72 },
                   { t: 'fox',     x: 100, y: G, s: 0.95 },
                   { t: 'ciconia', x: 320, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 92, y: 70, w: 72, h: 42, text: '👅 ✗', kind: 'thought', tail: 'right', fs: 18 }] },

    f11_abUrna:  { bg: 'plain', items: [
                   { t: 'mensa',   x: 250, y: G, s: 1.05 },
                   { t: 'urna',    x: 250, y: G - 25, s: 0.72 },
                   { t: 'ciconia', x: 340, y: G, s: 1, flip: true },
                   { t: 'fox',     x: 80,  y: G, s: 0.95, pose: 'walk', flip: true }
                 ] },

    f11_dicit2:  { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.15 },
                   { t: 'patina',  x: 168, y: G - 29, s: 0.75, food: true },
                   { t: 'urna',    x: 236, y: G - 28, s: 0.55 },
                   { t: 'ciconia', x: 330, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 196, y: 56, w: 104, h: 42, text: '🍽 🦊 · 🏺 🐦', kind: 'speech', tail: 'right', fs: 14 }] },

    f11_moral:   { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.15 },
                   { t: 'patina',  x: 168, y: G - 29, s: 0.75, food: true },
                   { t: 'urna',    x: 236, y: G - 28, s: 0.55 },
                   { t: 'fox',     x: 72,  y: G, s: 0.95 },
                   { t: 'ciconia', x: 336, y: G, s: 1, flip: true }
                 ] },

    /* ============ fable 12 — Haedus et Lupus ============

       THE HIGH PLACE. The Aesopic kid stands "on a roof"; the art set has
       no roof, and LATIN-STYLE §5 forbids approximating one. It has a
       `cityWall` — a high, man-made, unmistakably standing-on-able place —
       so the kid stands `in mūrō`. The fable is untouched: what matters is
       that he is out of reach and that the WALL, not the kid, is what the
       wolf cannot beat. That is exactly the moral, and `mūrus` says it
       more plainly than `tēctum` would. */

    f12_haedus:  { bg: 'plain', items: [
                   { t: 'bush',   x: 350, y: G },
                   { t: 'haedus', x: 175, y: G, s: 1.5 }
                 ] },

    f12_murus:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 190, y: G, s: 1.1 }
                 ] },

    f12_stat:    { bg: 'plain', items: [
                   { t: 'cityWall', x: 175, y: G, s: 1 },
                   { t: 'haedus',   x: 175, y: G - 88, s: 0.9 }
                 ] },

    f12_lupus:   { bg: 'forest', items: [
                   { t: 'cityWall', x: 285, y: G, s: 0.95 },
                   { t: 'haedus',   x: 285, y: G - 84, s: 0.85 },
                   { t: 'wolf',     x: 70,  y: G, s: 0.95, pose: 'walk' }
                 ] },

    /* sub mūrō: the wolf is at the foot of the wall, under the kid */
    f12_submuro: { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 208, y: G, s: 0.95, flip: true }
                 ] },

    f12_tutus:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 208, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 58, y: 48, w: 56, h: 40, text: '😀', kind: 'thought', tail: 'right', fs: 19 }] },

    f12_altus:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 300, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 58, y: 66, w: 56, h: 40, text: '⬆', kind: 'thought', tail: 'right', fs: 20 }] },

    f12_clamat:  { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 250, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 268, y: 46, w: 62, h: 40, text: '📢', kind: 'speech', tail: 'left', fs: 19 }] },

    f12_iratus:  { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 235, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 330, y: 92, w: 56, h: 40, text: '😠', kind: 'thought', tail: 'left', fs: 19 }] },

    /* the wolf has come as close as the wall allows and stopped */
    f12_noncapit: { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 208, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 320, y: 92, w: 66, h: 42, text: '🐐 ✗', kind: 'thought', tail: 'left', fs: 18 }] },

    f12_locus:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 235, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 58, y: 52, w: 56, h: 40, text: '📍', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the wolf's parting line. He is still under the wall, still looking
       up: the menace is in the words, not in the picture. */
    f12_dicit:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 150, y: G, s: 1 },
                   { t: 'haedus',   x: 150, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 235, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 320, y: 46, w: 76, h: 42, text: '🏰 📢', kind: 'speech', tail: 'left', fs: 17 }] },

    f12_discedit: { bg: 'plain', items: [
                   { t: 'cityWall', x: 140, y: G, s: 1 },
                   { t: 'haedus',   x: 140, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 335, y: G, s: 0.9, pose: 'walk' }
                 ] },

    /* mōrāle: ONE kid, TWO places. On the wall he is safe; on the ground
       he is a kid. The picture is the argument. */
    f12_moral:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 265, y: G, s: 0.95 },
                   { t: 'haedus',   x: 265, y: G - 84, s: 0.8 },
                   { t: 'haedus',   x: 65,  y: G, s: 0.8 }
                 ],
                 bubbles: [{ x: 265, y: 40, w: 46, h: 34, text: '✓', kind: 'thought', tail: 'left', fs: 18 },
                           { x: 65, y: 140, w: 46, h: 34, text: '✗', kind: 'thought', tail: 'right', fs: 18 }] },

    /* ============ vocabulary mini-scenes ============ */

    v_testudo:   { bg: 'plain', items: [{ t: 'testudo', x: 195, y: G, s: 2 }] },
    v_lepus:     { bg: 'plain', items: [{ t: 'lepus', x: 195, y: G, s: 1.7 }] },
    v_mons:      { bg: 'plain', items: [{ t: 'mountain', x: 200, y: G, s: 1.3 }] },
    v_celer:     { bg: 'plain', items: [{ t: 'lepus', x: 190, y: G, s: 1.7, pose: 'run' }] },
    v_tardus:    { bg: 'plain', items: [{ t: 'testudo', x: 190, y: G, s: 1.9 }] },
    v_vincit:    { bg: 'plain', items: [
                   { t: 'tree',    x: 340, y: G, s: 0.95 },
                   { t: 'testudo', x: 270, y: G, s: 1.4 },
                   { t: 'lepus',   x: 85,  y: G, s: 1.05, pose: 'run' }
                 ],
                 bubbles: [{ x: 195, y: 62, w: 56, h: 40, text: '🥇', kind: 'thought', tail: 'right', fs: 19 }] },
    v_dormit:    { bg: 'plain', items: [
                   { t: 'tree',  x: 180, y: G, s: 1.25 },
                   { t: 'lepus', x: 200, y: G, s: 1.15, pose: 'lie' }
                 ],
                 bubbles: [{ x: 316, y: 100, w: 54, h: 40, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },
    /* sub: the whole card IS the relation — one thing above, one below */
    v_sub:       { bg: 'plain', items: [
                   { t: 'tree',  x: 190, y: G, s: 1.3 },
                   { t: 'lepus', x: 208, y: G, s: 1.05 }
                 ],
                 bubbles: [{ x: 70, y: 70, w: 46, h: 34, text: '⬆', kind: 'thought', tail: 'right', fs: 17 },
                           { x: 70, y: 168, w: 46, h: 34, text: '⬇', kind: 'thought', tail: 'right', fs: 17 }] },

    /* CAMOUFLAGE DEFECT FIXED (see the report). The ciconia is painted
       white (#fbf6ea) and `plain`'s sky is cream (#f6e8c9): on a 400×240
       story page the bird reads fine, but SONUS shrinks a card to about
       86 px and at that size the body disappeared — only the red legs
       and beak survived, which is not a picture a child can pick. The
       river band puts a block of blue behind the bird (and a wading
       stork is not a liberty). Verified at real tile size, not full
       size, which is how the defect got past the first pass. */
    v_ciconia:   { bg: 'river', items: [{ t: 'ciconia', x: 200, y: 204, s: 2.1 }] },
    /* patina EMPTY on the card: the dish is what the word means, and a
       dish full of food would teach `cibus` instead */
    v_patina:    { bg: 'plain', items: [{ t: 'patina', x: 200, y: G, s: 2.1 }] },
    v_urna:      { bg: 'plain', items: [{ t: 'urna', x: 200, y: G, s: 1.5 }] },
    /* cibus: TWO foods that are not the same thing, so the card teaches
       the class and not one dish (the device f6 used for `aureum`) */
    v_cibus:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 300, y: G, s: 1 },
                   { t: 'patina',    x: 120, y: G, s: 1.7, food: true }
                 ] },
    v_cena:      { bg: 'plain', items: [
                   { t: 'mensa',  x: 200, y: G, s: 1.35 },
                   { t: 'patina', x: 168, y: G - 34, s: 0.9, food: true },
                   { t: 'urna',   x: 240, y: G - 33, s: 0.62 }
                 ] },
    v_lingua:    { bg: 'plain', items: [{ t: 'fox', x: 175, y: G, s: 1.45 }],
                   bubbles: [{ x: 316, y: 108, w: 54, h: 40, text: '👅', kind: 'thought', tail: 'left', fs: 20 }] },
    v_dat:       { bg: 'plain', items: [
                   { t: 'mensa',   x: 200, y: G, s: 1.05 },
                   { t: 'patina',  x: 200, y: G - 26, s: 0.85, food: true },
                   { t: 'fox',     x: 78,  y: G, s: 0.95 },
                   { t: 'ciconia', x: 330, y: G, s: 1, flip: true }
                 ],
                 bubbles: [{ x: 200, y: 58, w: 62, h: 40, text: '➡', kind: 'thought', tail: 'right', fs: 20 }] },

    /* same defect, same fix: the haedus is cream (#e2d6bd / #f7f1e3) and
       was washing out at SONUS tile size. The mountain background gives
       it grey to stand against and costs nothing — a kid on a mountain
       is where kids are, and MŌNS is this region's name. */
    v_haedus:    { bg: 'mountain', items: [{ t: 'haedus', x: 200, y: G, s: 2.4 }] },
    v_murus:     { bg: 'plain', items: [{ t: 'cityWall', x: 200, y: G, s: 1.15 }] },
    v_stat:      { bg: 'plain', items: [
                   { t: 'cityWall', x: 200, y: G, s: 1 },
                   { t: 'haedus',   x: 200, y: G - 88, s: 0.9 }
                 ] },
    v_tutus:     { bg: 'plain', items: [
                   { t: 'cityWall', x: 145, y: G, s: 1 },
                   { t: 'haedus',   x: 145, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 330, y: G, s: 0.85, flip: true }
                 ],
                 bubbles: [{ x: 145, y: 44, w: 54, h: 38, text: '🛡', kind: 'thought', tail: 'right', fs: 19 }] },
    v_subMuro:   { bg: 'plain', items: [
                   { t: 'cityWall', x: 165, y: G, s: 1 },
                   { t: 'haedus',   x: 165, y: G - 88, s: 0.85 },
                   { t: 'wolf',     x: 222, y: G, s: 0.95, flip: true }
                 ],
                 bubbles: [{ x: 340, y: 60, w: 46, h: 34, text: '⬆', kind: 'thought', tail: 'left', fs: 17 },
                           { x: 340, y: 150, w: 46, h: 34, text: '⬇', kind: 'thought', tail: 'left', fs: 17 }] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 10 — Testūdō et Lepus ============
       The preposition capitulum. Every one of the six the ladder names
       appears here except `ab`… which appears here too (p14). They are
       glossed as FUNCTION words (AUTHORING-BRIEF: free against the ≤8
       cap, but each carries a nova at first use and a ledger line). */
    {
      id: 'f10',
      titulus: 'Testūdō et Lepus',
      icon: '🐢🐇',
      numerus: 'X',
      pos: { x: 0.27, y: 0.87 },
      vocab: [
        { la: 'testūdō', scene: SC.v_testudo, pars: 'nomen' },
        { la: 'lepus',   scene: SC.v_lepus,   pars: 'nomen' },
        { la: 'mōns',    scene: SC.v_mons,    pars: 'nomen' },
        { la: 'celer',   scene: SC.v_celer,   pars: 'adiectivum' },
        { la: 'tardus',  scene: SC.v_tardus,  pars: 'adiectivum' },
        { la: 'vincit',  scene: SC.v_vincit,  pars: 'verbum' },
        { la: 'dormit',  scene: SC.v_dormit,  pars: 'verbum' },
        { la: 'sub',     scene: SC.v_sub,     pars: 'praepositio' }
      ],
      story: [
        { la: 'Ecce testūdō! Testūdō tarda est.', scene: SC.f10_testudo,
          nova: [{ w: 'testūdō', e: '🐢', g: '' },
                 { w: 'tarda', e: '🐢', g: 'testūdō nōn currit; testūdō ambulat' }] },

        { la: 'Ecce lepus! Lepus ex silvā venit.', scene: SC.f10_lepus,
          nova: [{ w: 'lepus', e: '🐇', g: '' },
                 { w: 'ex', e: '⬅🌳', g: 'lepus iam nōn in silvā est' }] },

        { la: 'Lepus celer est. Lepus currit et currit.', scene: SC.f10_celer,
          nova: [{ w: 'celer', e: '💨', g: '↔ tardus' }] },

        { la: 'Lepus testūdinem videt.', scene: SC.f10_videt,
          nova: [{ w: 'testūdinem', e: '🐢', g: 'testūdō → testūdinem' }] },

        { la: 'Lepus dīcit: “Testūdō tarda est! Lepus celer est!”', scene: SC.f10_dicit },

        /* THE ablative page: the case Regiōnēs I–III used as a habit is
           named here, on a noun the whole region is named after. */
        { la: 'Ecce mōns! Testūdō et lepus in monte sunt.', scene: SC.f10_mons,
          nova: [{ w: 'mōns', e: '⛰', g: 'mōns altus est' },
                 { w: 'monte', e: '⛰', g: 'mōns → in monte' }] },

        { la: 'Testūdō cum lepore dē monte currit.', scene: SC.f10_demonte,
          nova: [{ w: 'cum', e: '🐢➕🐇', g: '= testūdō et lepus' },
                 { w: 'lepore', e: '🐇', g: 'lepus → cum lepore' },
                 { w: 'dē', e: '⛰⬇️', g: 'mōns suprā est; testūdō dē monte venit' }] },

        { la: 'Lepus celer est. Testūdō tarda est.', scene: SC.f10_currit },

        { la: 'Lepus arborem videt. Lepus sub arbore sedet.', scene: SC.f10_subsedet,
          nova: [{ w: 'sub', e: '🌳⬇', g: 'arbor suprā, lepus īnfrā' },
                 { w: 'arbore', e: '🌳', g: 'arbor → sub arbore' }] },

        { la: 'Lepus sub arbore dormit.', scene: SC.f10_dormit },

        { la: 'Testūdō nōn dormit. Testūdō dē monte ambulat.', scene: SC.f10_ambulat },

        { la: 'Testūdō tarda est, sed testūdō semper ambulat.', scene: SC.f10_semper },

        { la: 'Testūdō ad arborem venit. Lepus sub arbore dormit!', scene: SC.f10_advenit },

        { la: 'Testūdō ab arbore ambulat.', scene: SC.f10_abarbore,
          nova: [{ w: 'ab', e: '🌳➡', g: '↔ ad arborem' }] },

        { la: 'Iam lepus oculōs aperit et currit!', scene: SC.f10_aperit },

        { la: 'Sed testūdō vincit!', scene: SC.f10_vincit,
          nova: [{ w: 'vincit', e: '🥇', g: 'lepus nōn vincit' }] },

        { la: 'Testūdō dīcit: “Lepus celer est, sed testūdō vincit!”', scene: SC.f10_dicit2 },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: tarda testūdō celerem leporem vincit.', scene: SC.f10_moral }
      ],
      ludus: {
        words: [
          { la: 'testūdō', scene: SC.v_testudo, emoji: '🐢' },
          { la: 'lepus',   scene: SC.v_lepus,   emoji: '🐇' },
          { la: 'mōns',    scene: SC.v_mons,    emoji: '⛰' },
          { la: 'cervus',  emoji: '🦌' },
          { la: 'rāna',    emoji: '🐸' },
          { la: 'canis',   emoji: '🐕' }
        ]
      },
      /* SONUS: `tardus` is never offered against `testūdō`, nor `celer`
         against `lepus` — v_tardus IS a turtle and v_celer IS a hare, so
         by ear the pair would be a coin-flip (LATIN-STYLE §4). Both
         adjectives are recycled in CORRIGE and COMPLĒ instead. `sub` is
         out of SONUS for the same reason: v_sub contains an arbor and a
         lepus, both of which are words the learner has. */
      sonus: [
        { la: 'testūdō',
          answer: { la: 'testūdō', scene: SC.v_testudo },
          options: [{ la: 'testūdō', scene: SC.v_testudo },
                    { la: 'lepus', scene: SC.v_lepus },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'lepus',
          answer: { la: 'lepus', scene: SC.v_lepus },
          options: [{ la: 'lepus', scene: SC.v_lepus },
                    { la: 'testūdō', scene: SC.v_testudo },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'dormit', scene: SC.v_dormit }] },
        { la: 'mōns',
          answer: { la: 'mōns', scene: SC.v_mons },
          options: [{ la: 'mōns', scene: SC.v_mons },
                    { la: 'testūdō', scene: SC.v_testudo },
                    { la: 'lepus', scene: SC.v_lepus }] },
        { la: 'dormit',
          answer: { la: 'dormit', scene: SC.v_dormit },
          options: [{ la: 'dormit', scene: SC.v_dormit },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'vincit', scene: SC.v_vincit },
                    { la: 'testūdō', scene: SC.v_testudo }] }
      ],
      /* OVERRIDES. The generated set was read first. Two faults made it
         unusable, and one of them is new to S4:
           · it offered the PREPOSITION `Sub` as a candidate SUBJECT twice
             ("Sub cum lepore dē monte currit") and once as a sentence-
             final verb — the `pars: 'praepositio'` declaration did not
             stop it, which is worth reporting as an engine issue;
           · it emitted "Lepus celer est." as TWO different scrambles and
             "Lepus ___ est." as two different clozes, off two different
             story pages that happen to share a sentence.
         And the region exists for the six prepositions, of which the
         generated COMPLĒ tested exactly one. The hand set tests five. */
      overrides: {
        aenigmata: {
          /* `celer` and `tardus` are out of the grid on purpose: v_celer
             IS a hare and v_tardus IS a turtle, so four tiles would carry
             two pictures. Both are recycled in CORRIGE and COMPLĒ. */
          pairs: [
            { la: 'testūdō', scene: SC.v_testudo },
            { la: 'lepus',   scene: SC.v_lepus },
            { la: 'mōns',    scene: SC.v_mons },
            { la: 'vincit',  scene: SC.v_vincit },
            { la: 'dormit',  scene: SC.v_dormit },
            { la: 'sub',     scene: SC.v_sub }
          ],
          scrambles: [
            { la: 'Testūdō et lepus in monte sunt.',     scene: SC.f10_mons },
            { la: 'Testūdō cum lepore dē monte currit.', scene: SC.f10_demonte },
            { la: 'Lepus sub arbore dormit.',            scene: SC.f10_dormit },
            { la: 'Testūdō ab arbore ambulat.',          scene: SC.f10_abarbore }
          ]
        },
        corrige: [
          { words: ['Lepus', 'sub', 'arbore', 'currit.'], wrong: 3,
            options: ['dormit.', 'vincit.', 'ambulat.'], correct: 0, scene: SC.f10_dormit },
          /* the PREPOSITION is the intruder. All three options govern the
             ablative, so `monte` stays a legal form whichever is picked —
             only the picture decides, which is the whole idea. */
          { words: ['Testūdō', 'cum', 'lepore', 'sub', 'monte', 'currit.'], wrong: 3,
            options: ['dē', 'in', 'ad'], correct: 0, scene: SC.f10_demonte },
          { words: ['Lepus', 'ab', 'arbore', 'sedet.'], wrong: 1,
            options: ['sub', 'dē', 'ex'], correct: 0, scene: SC.f10_subsedet },
          { words: ['Lepus', 'vincit.'], wrong: 0,
            options: ['Testūdō', 'Mōns', 'Arbor'], correct: 0, scene: SC.f10_vincit },
          { words: ['Testūdō', 'celer', 'est,', 'sed', 'testūdō', 'semper', 'ambulat.'], wrong: 1,
            options: ['tarda', 'magna', 'laeta'], correct: 0, scene: SC.f10_semper }
        ],
        comple: [
          { text: 'Testūdō et lepus in mont___ sunt.', options: ['e', 'em', 'ēs'], correct: 0, scene: SC.f10_mons },
          { text: 'Testūdō cum lepor___ dē monte currit.', options: ['e', 'em', 'ēs'], correct: 0, scene: SC.f10_demonte },
          { text: 'Lepus ___ arbore dormit.', options: ['sub', 'ad', 'cum'], correct: 0, scene: SC.f10_dormit },
          { text: 'Testūdō ___ arbore ambulat.', options: ['ab', 'in', 'sub'], correct: 0, scene: SC.f10_abarbore },
          { text: 'Lepus ___ silvā venit.', options: ['ex', 'in', 'sub'], correct: 0, scene: SC.f10_lepus },
          { text: 'Lepus ___ est; testūdō tarda est.', options: ['celer', 'tardus', 'altus'], correct: 0, scene: SC.f10_celer }
        ]
      }
    },

    /* ============ FABLE 11 — Vulpēs et Cicōnia ============
       INSTRUMENTAL ablative: `linguā` and `rōstrō`, one per animal,
       against two vessels that decide who can use which. `dat` + dative
       carries Regiō III's case forward, as the ledger requires. */
    {
      id: 'f11',
      titulus: 'Vulpēs et Cicōnia',
      icon: '🦊🐦',
      numerus: 'XI',
      pos: { x: 0.70, y: 0.63 },
      vocab: [
        { la: 'ciconia', scene: SC.v_ciconia, pars: 'nomen' },
        { la: 'patina',  scene: SC.v_patina,  pars: 'nomen' },
        { la: 'urna',    scene: SC.v_urna,    pars: 'nomen' },
        { la: 'cēna',    scene: SC.v_cena,    pars: 'nomen' },
        { la: 'cibus',   scene: SC.v_cibus,   pars: 'nomen' },
        { la: 'lingua',  scene: SC.v_lingua,  pars: 'nomen' },
        { la: 'vulpēs',  emoji: '🦊',         pars: 'nomen' },
        { la: 'dat',     scene: SC.v_dat,     pars: 'verbum' }
      ],
      story: [
        /* `avis` and `longus` were both drafted into this gloss and both
           taken out again: each would have been a ninth and tenth content
           lexeme in a capitulum already at the ≤8 cap, and neither could
           have been recycled three times. `rōstrum` (f2, FREE) carries
           the same information on p5, where it is doing real work. */
        { la: 'Ecce vulpēs! Ecce ciconia!', scene: SC.f11_duo,
          nova: [{ w: 'ciconia', e: '🐦', g: 'ciconia rōstrum habet' }] },

        { la: 'Vulpēs cibum habet. Cibus in patinā est.', scene: SC.f11_cibus,
          nova: [{ w: 'cibus', e: '🍲', g: 'frūmentum, cāseus, ōva: cibus' },
                 { w: 'patina', e: '🍽', g: 'patina nōn alta est' },
                 { w: 'patinā', e: '🍽', g: 'patina → in patinā' }] },

        { la: 'Vulpēs ciconiae cēnam dat.', scene: SC.f11_dat,
          nova: [{ w: 'cēna', e: '🍽', g: 'cibus in patinā: cēna' },
                 { w: 'dat', e: '🤲➡', g: 'vulpēs cēnam ciconiae pōnit' },
                 { w: 'ciconiae', e: '➡🐦', g: 'ciconia → vulpēs ciconiae dat' }] },

        /* INSTRUMENTAL, first exposure */
        { la: 'Vulpēs linguā cibum dēvorat.', scene: SC.f11_lingua,
          nova: [{ w: 'lingua', e: '👅', g: 'lingua in ōre est' },
                 { w: 'linguā', e: '👅', g: 'lingua vulpis cibum capit' }] },

        { la: 'Sed ciconia rōstrō cibum nōn capit.', scene: SC.f11_rostro,
          nova: [{ w: 'rōstrō', e: '🐦👄', g: 'vulpēs linguam habet, ciconia rōstrum' }] },

        { la: 'Patina nōn alta est. Ciconia cibum nōn capit.', scene: SC.f11_frustra },

        { la: 'Ciconia ēsurit. Ciconia trīstis est.', scene: SC.f11_tristis },

        { la: 'Vulpēs laeta est, sed ciconia trīstis.', scene: SC.f11_laeta },

        { la: 'Ciconia dīcit: “Vulpēs linguā dēvorat! Ciconia rōstrō nōn capit!”',
          scene: SC.f11_dicit1 },

        { la: 'Posteā ciconia vulpī cēnam dat.', scene: SC.f11_urna,
          nova: [{ w: 'vulpī', e: '➡🦊', g: 'vulpēs → ciconia vulpī dat' }] },

        { la: 'Cibus in urnā est. Urna alta est.', scene: SC.f11_urnaAlta,
          nova: [{ w: 'urna', e: '🏺', g: 'urna alta est; patina nōn alta' },
                 { w: 'urnā', e: '🏺', g: 'urna → in urnā' }] },

        { la: 'Ciconia rōstrō cibum ex urnā capit.', scene: SC.f11_exUrna },

        { la: 'Sed vulpēs linguā cibum ex urnā nōn capit.', scene: SC.f11_vulpNon },

        { la: 'Vulpēs ēsurit. Vulpēs ab urnā discēdit.', scene: SC.f11_abUrna },

        { la: 'Ciconia dīcit: “Vulpēs patinam habet; ciconia urnam habet!”',
          scene: SC.f11_dicit2 },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: vulpēs ciconiae cēnam dat; ciconia vulpī cēnam dat.',
          scene: SC.f11_moral }
      ],
      ludus: {
        words: [
          { la: 'ciconia', scene: SC.v_ciconia, emoji: '🐦' },
          { la: 'urna',    scene: SC.v_urna,    emoji: '🏺' },
          { la: 'patina',  scene: SC.v_patina },
          { la: 'vulpēs',  emoji: '🦊' },
          { la: 'testūdō', emoji: '🐢' },
          { la: 'lepus',   emoji: '🐇' }
        ]
      },
      /* SONUS: `cēna` is not offered against `patina` or `cibus` — the
         three cards all show a dish, and by ear the learner could tap
         any of them and be right about the picture (LATIN-STYLE §4).
         `dat` is out for the same reason (v_dat contains the patina and
         both animals); it is recycled in CORRIGE and COMPLĒ. */
      sonus: [
        { la: 'ciconia',
          answer: { la: 'ciconia', scene: SC.v_ciconia },
          options: [{ la: 'ciconia', scene: SC.v_ciconia },
                    { la: 'vulpēs', emoji: '🦊' },
                    { la: 'urna', scene: SC.v_urna }] },
        { la: 'urna',
          answer: { la: 'urna', scene: SC.v_urna },
          options: [{ la: 'urna', scene: SC.v_urna },
                    { la: 'ciconia', scene: SC.v_ciconia },
                    { la: 'vulpēs', emoji: '🦊' },
                    { la: 'lingua', scene: SC.v_lingua }] },
        { la: 'patina',
          answer: { la: 'patina', scene: SC.v_patina },
          options: [{ la: 'patina', scene: SC.v_patina },
                    { la: 'urna', scene: SC.v_urna },
                    { la: 'ciconia', scene: SC.v_ciconia }] },
        { la: 'lingua',
          answer: { la: 'lingua', scene: SC.v_lingua },
          options: [{ la: 'lingua', scene: SC.v_lingua },
                    { la: 'urna', scene: SC.v_urna },
                    { la: 'patina', scene: SC.v_patina },
                    { la: 'ciconia', scene: SC.v_ciconia }] }
      ],
      /* OVERRIDES. The generated set was read first. It offered the verb
         `Dat` as a subject, built the husk "Vulpēs ciconiae cēnam cēna.",
         and — fatally for this capitulum — never once asked for an
         INSTRUMENTAL ablative, which is the only case S4 adds that the
         prepositions do not already carry. The hand set asks four times. */
      overrides: {
        aenigmata: {
          /* `cēna` is out of the grid: v_cena is a table carrying BOTH the
             patina and the urna, so as a tile it competes with two others
             that are already on the board. It is recycled in CORRIGE and
             COMPLĒ, where the sentence disambiguates it. */
          pairs: [
            { la: 'ciconia', scene: SC.v_ciconia },
            { la: 'patina',  scene: SC.v_patina },
            { la: 'urna',    scene: SC.v_urna },
            { la: 'cibus',   scene: SC.v_cibus },
            { la: 'lingua',  scene: SC.v_lingua },
            { la: 'vulpēs',  emoji: '🦊' }
          ],
          scrambles: [
            { la: 'Vulpēs linguā cibum dēvorat.',        scene: SC.f11_lingua },
            { la: 'Ciconia rōstrō cibum ex urnā capit.', scene: SC.f11_exUrna },
            { la: 'Vulpēs ciconiae cēnam dat.',          scene: SC.f11_dat },
            { la: 'Cibus in urnā est.',                  scene: SC.f11_urnaAlta }
          ]
        },
        corrige: [
          { words: ['Ciconia', 'ciconiae', 'cēnam', 'dat.'], wrong: 0,
            options: ['Vulpēs', 'Urna', 'Lingua'], correct: 0, scene: SC.f11_dat },
          /* the instrument is the intruder: a fox has no rōstrum */
          { words: ['Vulpēs', 'rōstrō', 'cibum', 'dēvorat.'], wrong: 1,
            options: ['linguā', 'urnā', 'patinā'], correct: 0, scene: SC.f11_lingua },
          { words: ['Ciconia', 'linguā', 'cibum', 'ex', 'urnā', 'capit.'], wrong: 1,
            options: ['rōstrō', 'patinā', 'cēnā'], correct: 0, scene: SC.f11_exUrna },
          { words: ['Cibus', 'in', 'patinā', 'est.'], wrong: 2,
            options: ['urnā', 'linguā', 'ciconiā'], correct: 0, scene: SC.f11_urnaAlta },
          { words: ['Vulpēs', 'ab', 'urnā', 'dēvorat.'], wrong: 3,
            options: ['discēdit.', 'dat.', 'pōnit.'], correct: 0, scene: SC.f11_abUrna }
        ],
        comple: [
          { text: 'Vulpēs lingu___ cibum dēvorat.', options: ['ā', 'a', 'am'], correct: 0, scene: SC.f11_lingua },
          { text: 'Ciconia rōstr___ cibum capit.', options: ['ō', 'um', 'a'], correct: 0, scene: SC.f11_exUrna },
          { text: 'Ciconia rōstrō cibum ___ urnā capit.', options: ['ex', 'sub', 'cum'], correct: 0, scene: SC.f11_exUrna },
          { text: 'Cibus in urn___ est.', options: ['ā', 'a', 'am'], correct: 0, scene: SC.f11_urnaAlta },
          /* Regiō III's dative, carried forward as the ledger requires */
          { text: 'Vulpēs ciconi___ cēnam dat.', options: ['ae', 'a', 'ās'], correct: 0, scene: SC.f11_dat },
          { text: 'Posteā ciconia vulp___ cēnam dat.', options: ['ī', 'ēs', 'em'], correct: 0, scene: SC.f11_urna }
        ]
      }
    },

    /* ============ FABLE 12 — Haedus et Lupus ============
       THE WOLF CAMEO. CURRICULUM §1 gives the wolf the bosses of R1, R5,
       R9 and the R12 finale; between them he has to stay ALIVE in the
       learner's mind, and this is the region where he walks through
       without a fight. He loses, and he leaves — and the line he leaves
       on is the whole point of the cameo. Its constraints were: no
       future tense (S-far), no 2nd person (S5 at the earliest), no
       pronouns (S6). A third-person gnomic present does all three jobs:

           “Mūrus clāmat, nōn haedus! Haedus nōn semper in mūrō stat.”

       The first half is the Aesopic wolf's own retort — it is the PLACE
       that is brave, not the kid — and it hands the learner the mōrāle
       one page early. The second half is the menace, and it is menacing
       precisely because it is only a present-tense fact about goats.
       Charming, stage-legal, and nothing in it needs a tense the learner
       has not met. */
    {
      id: 'f12',
      titulus: 'Haedus et Lupus',
      icon: '🐐🐺',
      numerus: 'XII',
      pos: { x: 0.25, y: 0.40 },
      vocab: [
        { la: 'haedus', scene: SC.v_haedus,  pars: 'nomen' },
        { la: 'mūrus',  scene: SC.v_murus,   pars: 'nomen' },
        { la: 'lupus',  emoji: '🐺',         pars: 'nomen' },
        { la: 'stat',   scene: SC.v_stat,    pars: 'verbum' },
        { la: 'clāmat', emoji: '📢',         pars: 'verbum' },
        { la: 'tūtus',  scene: SC.v_tutus,   pars: 'adiectivum' },
        { la: 'īrātus', emoji: '😠',         pars: 'adiectivum' },
        { la: 'sub',    scene: SC.v_subMuro, pars: 'praepositio' }
      ],
      story: [
        { la: 'Ecce haedus! Haedus parvus est.', scene: SC.f12_haedus,
          nova: [{ w: 'haedus', e: '🐐', g: '' }] },

        { la: 'Ecce mūrus! Mūrus altus est.', scene: SC.f12_murus,
          nova: [{ w: 'mūrus', e: '🏰', g: 'mūrus altus est: haedus suprā, lupus īnfrā' }] },

        { la: 'Haedus in mūrō stat.', scene: SC.f12_stat,
          nova: [{ w: 'stat', e: '🐐⬆', g: 'nōn sedet, nōn ambulat: stat' },
                 { w: 'mūrō', e: '🏰', g: 'mūrus → in mūrō' }] },

        { la: 'Ecce lupus! Lupus ex silvā venit.', scene: SC.f12_lupus },

        { la: 'Lupus sub mūrō ambulat. Lupus haedum videt.', scene: SC.f12_submuro },

        { la: 'Haedus dē mūrō lupum videt. Haedus tūtus est.', scene: SC.f12_tutus,
          nova: [{ w: 'tūtus', e: '🛡', g: 'lupus haedum nōn capit' }] },

        { la: 'Haedus nōn timet: mūrus altus est.', scene: SC.f12_altus },

        { la: 'Haedus dē mūrō clāmat: “Lupus malus est! Lupus haedum nōn capit!”',
          scene: SC.f12_clamat },

        { la: 'Lupus īrātus est. Lupus sub mūrō stat.', scene: SC.f12_iratus },

        { la: 'Lupus īrātus est. Sed mūrus altus est: lupus haedum nōn capit.',
          scene: SC.f12_noncapit },

        { la: 'Mūrus locus altus est. Locus haedum servat.', scene: SC.f12_locus,
          nova: [{ w: 'locus', e: '📍', g: 'mūrus locus altus est; silva locus lupī est' }] },

        /* the cameo line — see the capitulum comment */
        { la: 'Lupus dīcit: “Mūrus clāmat, nōn haedus! Haedus nōn semper in mūrō stat.”',
          scene: SC.f12_dicit },

        /* `tūtus` is a NEW lexeme and the self-check caught it at two
           exposures; this is its third, and it is also the beat the
           fable needs — the wolf leaves, the kid is still safe. */
        { la: 'Lupus discēdit et ad silvam ambulat. Haedus tūtus est.',
          scene: SC.f12_discedit },

        { la: 'Haedus in mūrō tūtus est: locus haedum servat.', scene: SC.f12_stat },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: nōn haedus, sed locus lupum vincit.', scene: SC.f12_moral }
      ],
      ludus: {
        words: [
          { la: 'haedus',  scene: SC.v_haedus, emoji: '🐐' },
          { la: 'mūrus',   scene: SC.v_murus },
          { la: 'lupus',   emoji: '🐺' },
          { la: 'ciconia', emoji: '🐦' },
          { la: 'urna',    emoji: '🏺' },
          { la: 'testūdō', emoji: '🐢' }
        ]
      },
      /* SONUS: `stat` and `tūtus` and `sub` all show the kid on the wall
         and are never offered against each other or against `mūrus` —
         one wall, four words is not a hearing test, it is a lottery.
         Each is recycled in CORRIGE or COMPLĒ instead. */
      sonus: [
        { la: 'haedus',
          answer: { la: 'haedus', scene: SC.v_haedus },
          options: [{ la: 'haedus', scene: SC.v_haedus },
                    { la: 'lupus', emoji: '🐺' },
                    { la: 'mūrus', scene: SC.v_murus }] },
        { la: 'mūrus',
          answer: { la: 'mūrus', scene: SC.v_murus },
          options: [{ la: 'mūrus', scene: SC.v_murus },
                    { la: 'haedus', scene: SC.v_haedus },
                    { la: 'lupus', emoji: '🐺' },
                    { la: 'clāmat', emoji: '📢' }] },
        { la: 'lupus',
          answer: { la: 'lupus', emoji: '🐺' },
          options: [{ la: 'lupus', emoji: '🐺' },
                    { la: 'haedus', scene: SC.v_haedus },
                    { la: 'mūrus', scene: SC.v_murus }] },
        { la: 'īrātus',
          answer: { la: 'īrātus', emoji: '😠' },
          options: [{ la: 'īrātus', emoji: '😠' },
                    { la: 'clāmat', emoji: '📢' },
                    { la: 'haedus', scene: SC.v_haedus },
                    { la: 'mūrus', scene: SC.v_murus }] }
      ],
      /* OVERRIDES. The generated set was read first. It offered the verb
         `Clāmat` as a subject twice, offered the preposition `sub` as a
         sentence-final verb ("Haedus in mūrō sub."), and produced one item
         whose distractor is not clearly wrong — "Haedus nōn timet: lupus
         altus est" is perfectly grammatical and the picture does not
         refute it (LATIN-STYLE §4). It also never touched `locus` or
         `tūtus`, the two words the mōrāle stands on. */
      overrides: {
        aenigmata: {
          /* `tūtus` is out of the grid: v_tutus is v_stat with a wolf and
             a shield added, and next to v_stat and v_murus that is a third
             picture of the same wall. It is recycled in CORRIGE and
             COMPLĒ. */
          pairs: [
            { la: 'haedus', scene: SC.v_haedus },
            { la: 'mūrus',  scene: SC.v_murus },
            { la: 'lupus',  emoji: '🐺' },
            { la: 'stat',   scene: SC.v_stat },
            { la: 'clāmat', emoji: '📢' },
            { la: 'īrātus', emoji: '😠' }
          ],
          scrambles: [
            { la: 'Lupus ex silvā venit.',        scene: SC.f12_lupus },
            { la: 'Lupus sub mūrō ambulat.',      scene: SC.f12_submuro },
            { la: 'Haedus dē mūrō lupum videt.',  scene: SC.f12_tutus },
            { la: 'Locus haedum servat.',         scene: SC.f12_locus }
          ]
        },
        corrige: [
          { words: ['Lupus', 'in', 'mūrō', 'stat.'], wrong: 0,
            options: ['Haedus', 'Mūrus', 'Locus'], correct: 0, scene: SC.f12_stat },
          { words: ['Lupus', 'dē', 'mūrō', 'ambulat.'], wrong: 1,
            options: ['sub', 'in', 'ex'], correct: 0, scene: SC.f12_submuro },
          { words: ['Lupus', 'sub', 'silvā', 'venit.'], wrong: 1,
            options: ['ex', 'in', 'dē'], correct: 0, scene: SC.f12_lupus },
          { words: ['Haedus', 'in', 'mūrō', 'īrātus', 'est.'], wrong: 3,
            options: ['tūtus', 'trīstis', 'tardus'], correct: 0, scene: SC.f12_tutus },
          { words: ['Haedus', 'sub', 'mūrō', 'stat.'], wrong: 1,
            options: ['in', 'ex', 'dē'], correct: 0, scene: SC.f12_stat }
        ],
        comple: [
          { text: 'Haedus in mūr___ stat.', options: ['ō', 'um', 'us'], correct: 0, scene: SC.f12_stat },
          { text: 'Lupus ___ mūrō ambulat.', options: ['sub', 'in', 'ad'], correct: 0, scene: SC.f12_submuro },
          { text: 'Haedus ___ mūrō clāmat.', options: ['dē', 'sub', 'ad'], correct: 0, scene: SC.f12_clamat },
          { text: 'Lupus ___ silvā venit.', options: ['ex', 'in', 'sub'], correct: 0, scene: SC.f12_lupus },
          { text: 'Haedus in mūrō ___ est.', options: ['tūtus', 'trīstis', 'īrātus'], correct: 0, scene: SC.f12_tutus },
          { text: 'Nōn haedus, sed ___ lupum vincit.', options: ['locus', 'haedus', 'lupus'], correct: 0, scene: SC.f12_moral }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r04',
    titulus: 'Mōns',
    ladder: 'S4',                 /* CURRICULUM §0: ablative + prepositions */
    progressId: 'r04',
    capitula: capitula,
    boss: {
      id: 'b_r04',
      progressId: 'r04',
      /* the hare of f10 returns as the region's boss. He lost a race, so
         he wants another one: the phase order is fuga · caterva · fuga,
         a RACE boss rather than the caterva/clāmor/fuga of r01–r03. */
      name: 'Lepus',
      actor: 'lepus',
      vinceText: 'Leporem vince!',
      /* LEGACY single-phase tuning, kept for the same two reasons the
         earlier regions keep it: server/lib/rules.php derives
         rule_boss_min_ms from these numbers, and a client without
         js/boss-phases.js must still be able to run the fight. */
      hp: 6,
      seconds: 45,
      pos: { x: 0.66, y: 0.16 },
      /* Total HP 6 and 70 phase-seconds, exactly as r01–r03, so this
         fight is the same LENGTH and the 20 s anti-cheat floor still
         holds. Only the SHAPE differs. */
      phases: [
        { type: 'fuga',    hp: 2, seconds: 22 },
        { type: 'caterva', hp: 2, seconds: 26 },
        { type: 'fuga',    hp: 2, seconds: 22 }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum. All three
         capitula are represented. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'testūdō', from: 'f10' },
        { la: 'lepus',   from: 'f10' },
        { la: 'ciconia', from: 'f11' },
        { la: 'urna',    from: 'f11' },
        { la: 'haedus',  from: 'f12' }
      ]
    }
  });
})();
