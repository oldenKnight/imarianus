/* ============================================================
   content/fabulae-r02.js — FĀBULAE · Regiō II · AGER  (ladder S2)
   ------------------------------------------------------------
   Three graded fables, one ladder rung above Regiō I:
     f4 Leō et Mūs            — nom/acc PLURAL, 3rd-conj present
     f5 Formīca et Cicāda     — + -que, et…et
     f6 Gallīna et Ōva Aurea  — + neuter plural (ōva aurea)

   STAGE CEILING (CURRICULUM §0 S2, binding):
     nom/acc sg+pl · present of esse (est/sunt) · 3rd-person present
     of ANY conjugation (AUTHORING-BRIEF ruling 1, receptive) · -que ·
     et…et · nōn. NO genitive, NO dative, NO ablative except the
     locative pattern Regiō I already ships receptively (in silvā,
     in arbore, in agrō) and the ad+acc of "ad rīvum" / "ad silvam".
     Where the ladder and good Latin collided the SENTENCE was
     changed, never the grammar (AUTHORING-BRIEF, golden exemplar).

   PROGRESS IDS ARE FROZEN once shipped: f4/f5/f6 and progressId
   'r02' are database keys (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ fable 4 — Leō et Mūs ============ */

    /* the lion asleep in the wood: 'lie' closes his eye, which is the
       whole meaning of dormit. The 💤 bubble doubles the signal. */
    f4_dormit:   { bg: 'forest', items: [
                   { t: 'tree', x: 340, y: G, s: 0.9 },
                   { t: 'bush', x: 55,  y: G },
                   { t: 'leo',  x: 175, y: G, s: 1, pose: 'lie' }
                 ],
                 bubbles: [{ x: 285, y: 108, w: 54, h: 40, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },

    /* three mice, so MŪRĒS is a plural the eye can count before the
       ending has to be parsed (this is the page that teaches sunt). */
    f4_mures:    { bg: 'forest', items: [
                   { t: 'tree', x: 348, y: G, s: 0.82 },
                   { t: 'bush', x: 40,  y: G },
                   { t: 'bush', x: 205, y: G },
                   { t: 'mus',  x: 105, y: G, s: 1 },
                   { t: 'mus',  x: 190, y: G, s: 0.9, flip: true },
                   { t: 'mus',  x: 280, y: G, s: 0.95 }
                 ] },

    /* same three mice, running: -unt shown as motion, not as a rule */
    f4_currunt:  { bg: 'forest', items: [
                   { t: 'tree', x: 344, y: G, s: 0.8 },
                   { t: 'bush', x: 45,  y: G },
                   { t: 'mus',  x: 100, y: G, s: 1,    pose: 'run' },
                   { t: 'mus',  x: 195, y: G, s: 0.92, pose: 'run' },
                   { t: 'mus',  x: 285, y: G, s: 0.98, pose: 'run' }
                 ] },

    /* ONE mouse, on top of the sleeping lion — ūnus + super in one image */
    f4_currit:   { bg: 'forest', items: [
                   { t: 'bush', x: 45,  y: G },
                   { t: 'leo',  x: 175, y: G, s: 1, pose: 'lie' },
                   { t: 'mus',  x: 160, y: 170, s: 0.72, pose: 'run' }
                 ] },

    f4_capit:    { bg: 'forest', items: [
                   { t: 'bush', x: 50,  y: G },
                   { t: 'leo',  x: 185, y: G, s: 1 },
                   { t: 'mus',  x: 268, y: G, s: 0.7 }
                 ],
                 bubbles: [{ x: 95, y: 104, w: 54, h: 40, text: '✊', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the size contrast is PICTURED before magnus/parvus assert it */
    f4_timet:    { bg: 'forest', items: [
                   { t: 'tree', x: 346, y: G, s: 0.78 },
                   { t: 'leo',  x: 250, y: G, s: 1.05, flip: true },
                   { t: 'mus',  x: 110, y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 70, y: 118, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'right', fs: 18 }] },

    f4_liberat:  { bg: 'forest', items: [
                   { t: 'tree', x: 346, y: G, s: 0.78 },
                   { t: 'leo',  x: 265, y: G, s: 1.05, flip: true },
                   { t: 'mus',  x: 110, y: G, s: 0.85, pose: 'walk', flip: true }
                 ],
                 bubbles: [{ x: 65, y: 116, w: 54, h: 40, text: '🔓', kind: 'thought', tail: 'right', fs: 19 }] },

    /* the men and the net. The lion is drawn FIRST so the net covers him. */
    f4_viri:     { bg: 'forest', items: [
                   { t: 'tree',   x: 42,  y: G, s: 0.8 },
                   { t: 'leo',    x: 290, y: G, s: 0.7 },
                   { t: 'rete',   x: 290, y: G, s: 1.7 },
                   { t: 'person', x: 110, y: G, s: 0.9,  role: 'man', pose: 'walk' },
                   { t: 'person', x: 172, y: G, s: 0.85, role: 'man', pose: 'walk' }
                 ] },

    f4_clamant:  { bg: 'forest', items: [
                   { t: 'tree',   x: 42,  y: G, s: 0.8 },
                   { t: 'leo',    x: 290, y: G, s: 0.7 },
                   { t: 'rete',   x: 290, y: G, s: 1.7 },
                   { t: 'person', x: 110, y: G, s: 0.9,  role: 'man', pose: 'point' },
                   { t: 'person', x: 172, y: G, s: 0.85, role: 'man' }
                 ],
                 bubbles: [{ x: 150, y: 52, w: 82, h: 40, text: '📢 🦁', kind: 'speech', tail: 'left', fs: 17 }] },

    /* the men are gone: the sentence is about the NET, so only the net
       and the roaring lion are on stage. */
    f4_rete:     { bg: 'forest', items: [
                   { t: 'tree', x: 48,  y: G, s: 0.8 },
                   { t: 'leo',  x: 235, y: G, s: 0.75 },
                   { t: 'rete', x: 235, y: G, s: 1.75 }
                 ],
                 bubbles: [{ x: 105, y: 72, w: 60, h: 42, text: '💢', kind: 'speech', tail: 'right', fs: 20 }] },

    f4_rodit:    { bg: 'forest', items: [
                   { t: 'tree', x: 48,  y: G, s: 0.8 },
                   { t: 'leo',  x: 255, y: G, s: 0.75 },
                   { t: 'rete', x: 255, y: G, s: 1.75 },
                   { t: 'mus',  x: 140, y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 100, y: 100, w: 56, h: 40, text: '🦷', kind: 'thought', tail: 'right', fs: 19 }] },

    /* the net is now empty and off to one side; the lion walks out */
    f4_liber:    { bg: 'forest', items: [
                   { t: 'rete', x: 330, y: G, s: 0.9 },
                   { t: 'leo',  x: 225, y: G, s: 0.95, pose: 'walk', flip: true },
                   { t: 'mus',  x: 95,  y: G, s: 0.85 }
                 ],
                 bubbles: [{ x: 150, y: 62, w: 56, h: 40, text: '🔓', kind: 'thought', tail: 'left', fs: 19 }] },

    f4_fremit:   { bg: 'forest', items: [
                   { t: 'rete', x: 332, y: G, s: 0.88 },
                   { t: 'leo',  x: 250, y: G, s: 0.98, flip: true },
                   { t: 'mus',  x: 110, y: G, s: 0.88 }
                 ],
                 bubbles: [{ x: 175, y: 56, w: 92, h: 42, text: '🦷 ➡ 🔓', kind: 'speech', tail: 'left', fs: 16 }] },

    f4_amici:    { bg: 'forest', items: [
                   { t: 'tree', x: 346, y: G, s: 0.8 },
                   { t: 'leo',  x: 250, y: G, s: 0.95, flip: true },
                   { t: 'mus',  x: 120, y: G, s: 0.9 }
                 ],
                 bubbles: [{ x: 78, y: 108, w: 54, h: 38, text: '😀', kind: 'thought', tail: 'right', fs: 18 },
                           { x: 312, y: 66, w: 54, h: 38, text: '😀', kind: 'thought', tail: 'left', fs: 18 }] },

    f4_moral:    { bg: 'plain', items: [
                   { t: 'leo', x: 258, y: G, s: 0.95, flip: true },
                   { t: 'mus', x: 128, y: G, s: 0.9 }
                 ],
                 bubbles: [{ x: 192, y: 56, w: 66, h: 42, text: '🤝', kind: 'thought', tail: 'left', fs: 20 }] },

    /* ============ fable 5 — Formīca et Cicāda ============ */

    /* AGER: sheaves of standing grain over the plain background. There is
       no dedicated 'ager' backdrop in the library, so the field is built
       from frūmentum props — which is also what makes it a CORN field. */
    f5_ager:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 65,  y: G, s: 0.9 },
                   { t: 'frumentum', x: 335, y: G, s: 0.9 },
                   { t: 'formica',   x: 200, y: G, s: 2 }
                 ] },

    /* aestās = sun + full field. Its winter twin (f5_hiems) is the SAME
       framing with the sun and the grain removed: the pair is the gloss. */
    f5_aestas:   { bg: 'plain', items: [
                   { t: 'sol',       x: 328, y: 104, s: 0.95 },
                   { t: 'frumentum', x: 95,  y: G, s: 1 },
                   { t: 'frumentum', x: 190, y: G, s: 1.05 },
                   { t: 'frumentum', x: 285, y: G, s: 0.95 }
                 ] },

    /* the ant with an ear of grain riding on its back = portat */
    f5_portat:   { bg: 'plain', items: [
                   { t: 'frumentum', x: 335, y: G, s: 0.9 },
                   { t: 'formica',   x: 160, y: G, s: 2 },
                   { t: 'frumentum', x: 142, y: 162, s: 0.5 }
                 ] },

    f5_laborat:  { bg: 'plain', items: [
                   { t: 'sol',       x: 340, y: 96, s: 0.8 },
                   { t: 'frumentum', x: 350, y: G, s: 0.85 },
                   { t: 'formica',   x: 115, y: G, s: 1.9 },
                   { t: 'frumentum', x: 98,  y: 165, s: 0.48 },
                   { t: 'formica',   x: 245, y: G, s: 1.8 },
                   { t: 'frumentum', x: 229, y: 167, s: 0.45 }
                 ] },

    f5_cicada:   { bg: 'plain', items: [
                   { t: 'tree',   x: 250, y: G, s: 1 },
                   { t: 'cicada', x: 264, y: 152, s: 1.3 }
                 ] },

    f5_cantat:   { bg: 'plain', items: [
                   { t: 'tree',   x: 250, y: G, s: 1 },
                   { t: 'cicada', x: 264, y: 152, s: 1.3 }
                 ],
                 bubbles: [{ x: 130, y: 74, w: 62, h: 42, text: '🎶', kind: 'speech', tail: 'right', fs: 20 }] },

    /* the two side by side: one sings, one carries. The contrast IS the fable. */
    f5_nonlab:   { bg: 'plain', items: [
                   { t: 'tree',      x: 300, y: G, s: 1 },
                   { t: 'cicada',    x: 314, y: 152, s: 1.25 },
                   { t: 'formica',   x: 105, y: G, s: 1.9 },
                   { t: 'frumentum', x: 88,  y: 165, s: 0.48 }
                 ],
                 bubbles: [{ x: 205, y: 72, w: 62, h: 42, text: '🎶', kind: 'speech', tail: 'right', fs: 20 }] },

    f5_canit2:   { bg: 'plain', items: [
                   { t: 'sol',    x: 60,  y: 96, s: 0.85 },
                   { t: 'tree',   x: 268, y: G, s: 1 },
                   { t: 'cicada', x: 282, y: 152, s: 1.3 }
                 ],
                 bubbles: [{ x: 150, y: 66, w: 88, h: 42, text: '🎶 ☀', kind: 'speech', tail: 'right', fs: 18 }] },

    /* HIEMS: f5_aestas with the sun and the grain taken away, wind added.
       Nothing else changes, so the eye reads the season, not the props. */
    f5_hiems:    { bg: 'plain', items: [
                   { t: 'bush',   x: 55,  y: G },
                   { t: 'bush',   x: 352, y: G },
                   { t: 'ventus', x: 130, y: 118, s: 1 },
                   { t: 'ventus', x: 290, y: 152, s: 0.85 }
                 ] },

    f5_esurit:   { bg: 'plain', items: [
                   { t: 'ventus',  x: 300, y: 112, s: 0.85 },
                   { t: 'formica', x: 348, y: G, s: 1.5, flip: true },
                   { t: 'cicada',  x: 160, y: G, s: 1.8 }
                 ],
                 bubbles: [{ x: 100, y: 96, w: 66, h: 42, text: '🍗❓', kind: 'thought', tail: 'right', fs: 17 }] },

    f5_clamat:   { bg: 'plain', items: [
                   { t: 'ventus',  x: 335, y: 112, s: 0.8 },
                   { t: 'formica', x: 285, y: G, s: 1.9, flip: true },
                   { t: 'cicada',  x: 115, y: G, s: 1.7 }
                 ],
                 bubbles: [{ x: 128, y: 78, w: 88, h: 44, text: '📢 🍗', kind: 'speech', tail: 'left', fs: 17 }] },

    f5_iuvat:    { bg: 'plain', items: [
                   { t: 'ventus',    x: 340, y: 112, s: 0.75 },
                   { t: 'formica',   x: 262, y: G, s: 1.9, flip: true },
                   { t: 'frumentum', x: 190, y: G, s: 0.85 },
                   { t: 'cicada',    x: 108, y: G, s: 1.7 }
                 ] },

    /* the KIND ending: both carry grain, both are fed, nobody starves */
    f5_portant:  { bg: 'plain', items: [
                   { t: 'formica',   x: 125, y: G, s: 1.9 },
                   { t: 'frumentum', x: 108, y: 165, s: 0.48 },
                   { t: 'cicada',    x: 268, y: G, s: 1.7 },
                   { t: 'frumentum', x: 253, y: 168, s: 0.5 }
                 ] },

    f5_dicit:    { bg: 'plain', items: [
                   { t: 'formica',   x: 125, y: G, s: 1.9 },
                   { t: 'frumentum', x: 108, y: 165, s: 0.48 },
                   { t: 'cicada',    x: 268, y: G, s: 1.7 },
                   { t: 'frumentum', x: 253, y: 168, s: 0.5 }
                 ],
                 bubbles: [{ x: 200, y: 58, w: 96, h: 42, text: '🎶 ➕ 🌾', kind: 'speech', tail: 'right', fs: 17 }] },

    f5_moral:    { bg: 'plain', items: [
                   { t: 'ventus',    x: 330, y: 128, s: 0.8 },
                   { t: 'formica',   x: 195, y: G, s: 2.1 },
                   { t: 'frumentum', x: 176, y: 159, s: 0.5 }
                 ],
                 bubbles: [{ x: 100, y: 74, w: 72, h: 44, text: '❄ 🚫', kind: 'thought', tail: 'right', fs: 19 }] },

    /* ============ fable 6 — Gallīna et Ōva Aurea ============ */

    f6_ager:     { bg: 'plain', items: [
                   { t: 'frumentum', x: 62,  y: G, s: 0.9 },
                   { t: 'frumentum', x: 342, y: G, s: 0.85 },
                   { t: 'person',    x: 200, y: G, s: 1, role: 'man', pose: 'walk' }
                 ] },

    f6_gallina:  { bg: 'plain', items: [
                   { t: 'frumentum', x: 350, y: G, s: 0.85 },
                   { t: 'frumentum', x: 232, y: G, s: 0.5 },
                   { t: 'gallina',   x: 165, y: G, s: 1.6, pose: 'peck' },
                   { t: 'person',    x: 300, y: G, s: 0.95, role: 'man', flip: true }
                 ] },

    f6_ponit:    { bg: 'plain', items: [
                   { t: 'gallina',    x: 145, y: G, s: 1.6 },
                   { t: 'ovumAureum', x: 268, y: G, s: 1.2 }
                 ] },

    f6_ovum:     { bg: 'plain', items: [
                   { t: 'ovumAureum', x: 200, y: G, s: 1.85 }
                 ] },

    f6_cotidie:  { bg: 'plain', items: [
                   { t: 'gallina',    x: 100, y: G, s: 1.4 },
                   { t: 'ovumAureum', x: 218, y: G, s: 1.1 },
                   { t: 'ovumAureum', x: 322, y: G, s: 1.05 }
                 ] },

    f6_laetus:   { bg: 'plain', items: [
                   { t: 'ovumAureum', x: 108, y: G, s: 1.15 },
                   { t: 'ovumAureum', x: 218, y: G, s: 1.1 },
                   { t: 'person',     x: 322, y: G, s: 1, role: 'man', pose: 'point', flip: true }
                 ],
                 bubbles: [{ x: 300, y: 58, w: 54, h: 38, text: '😀', kind: 'thought', tail: 'left', fs: 18 }] },

    f6_cupit:    { bg: 'plain', items: [
                   { t: 'ovumAureum', x: 108, y: G, s: 1.15 },
                   { t: 'ovumAureum', x: 218, y: G, s: 1.1 },
                   { t: 'person',     x: 322, y: G, s: 1, role: 'man', pose: 'point', flip: true }
                 ],
                 bubbles: [{ x: 240, y: 52, w: 96, h: 42, text: '🥇🥇🥇', kind: 'thought', tail: 'left', fs: 17 }] },

    f6_dicit:    { bg: 'plain', items: [
                   { t: 'gallina', x: 115, y: G, s: 1.5 },
                   { t: 'person',  x: 275, y: G, s: 1, role: 'man', pose: 'point', flip: true }
                 ],
                 bubbles: [{ x: 190, y: 54, w: 104, h: 42, text: '🥇 ⬅ 🐔', kind: 'speech', tail: 'right', fs: 17 }] },

    /* B-RATING (DESIGN §8): the hen is ALIVE and standing in every frame.
       The farmer is on his knees SEARCHING; the empty thought bubble is
       the only thing that "opens" anything. */
    f6_quaerit:  { bg: 'plain', items: [
                   { t: 'gallina', x: 175, y: G, s: 1.5 },
                   { t: 'person',  x: 288, y: G, s: 1, role: 'man', pose: 'kneel', flip: true }
                 ],
                 bubbles: [{ x: 100, y: 80, w: 78, h: 44, text: '🔎 🥇', kind: 'thought', tail: 'right', fs: 18 }] },

    f6_nihil:    { bg: 'plain', items: [
                   { t: 'gallina', x: 175, y: G, s: 1.5 },
                   { t: 'person',  x: 288, y: G, s: 1, role: 'man', pose: 'kneel', flip: true }
                 ],
                 bubbles: [{ x: 100, y: 80, w: 78, h: 44, text: '🥇 ✗', kind: 'thought', tail: 'right', fs: 19 }] },

    f6_volat:    { bg: 'plain', items: [
                   { t: 'tree',    x: 48,  y: G, s: 0.85 },
                   { t: 'gallina', x: 150, y: 132, s: 1.4, pose: 'fly', flip: true },
                   { t: 'person',  x: 305, y: G, s: 1, role: 'man', flip: true }
                 ] },

    /* no empty-nest actor exists (see the report): the absence is carried
       by the thought bubble instead of by a prop that would be a lie. */
    f6_nonponit: { bg: 'plain', items: [
                   { t: 'tree',   x: 55,  y: G, s: 0.85 },
                   { t: 'person', x: 258, y: G, s: 1, role: 'man' }
                 ],
                 bubbles: [{ x: 145, y: 72, w: 84, h: 44, text: '🥚 ✗', kind: 'thought', tail: 'right', fs: 19 }] },

    /* still searching, now with nothing left to search: no hen, no egg */
    f6_invenit:  { bg: 'plain', items: [
                   { t: 'tree',   x: 52,  y: G, s: 0.85 },
                   { t: 'person', x: 235, y: G, s: 1, role: 'man', pose: 'kneel', flip: true }
                 ],
                 bubbles: [{ x: 118, y: 78, w: 82, h: 44, text: '🔎 🥇 ✗', kind: 'thought', tail: 'right', fs: 17 }] },

    f6_tristis:  { bg: 'plain', items: [
                   { t: 'bush',   x: 52,  y: G },
                   { t: 'person', x: 195, y: G, s: 1, role: 'man', pose: 'kneel' },
                   { t: 'bush',   x: 350, y: G }
                 ],
                 bubbles: [{ x: 305, y: 78, w: 56, h: 40, text: '😢', kind: 'thought', tail: 'left', fs: 18 }] },

    f6_moral:    { bg: 'plain', items: [
                   { t: 'tree',   x: 60,  y: G, s: 0.8 },
                   { t: 'person', x: 248, y: G, s: 1, role: 'man', flip: true }
                 ],
                 bubbles: [{ x: 128, y: 66, w: 110, h: 44, text: '🥇 ✗ 🐔 ✗', kind: 'thought', tail: 'right', fs: 16 }] },

    /* ============ vocabulary mini-scenes ============ */

    v_leo:       { bg: 'plain', items: [{ t: 'leo', x: 185, y: G, s: 1.15 }] },
    v_mus:       { bg: 'plain', items: [{ t: 'mus', x: 195, y: G, s: 2 }] },
    v_dormit:    { bg: 'plain', items: [{ t: 'leo', x: 175, y: G, s: 1.05, pose: 'lie' }],
                   bubbles: [{ x: 300, y: 104, w: 52, h: 38, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },
    v_currit:    { bg: 'plain', items: [{ t: 'mus', x: 195, y: G, s: 2, pose: 'run' }] },
    v_rete:      { bg: 'plain', items: [{ t: 'rete', x: 200, y: G, s: 1.5 }] },
    /* rōdit: the mouse AT the net, mouth to the rope, with the tooth mark */
    v_rodit:     { bg: 'plain', items: [
                   { t: 'rete', x: 250, y: G, s: 1.35 },
                   { t: 'mus',  x: 118, y: G, s: 1.5 }
                 ],
                 bubbles: [{ x: 95, y: 104, w: 52, h: 38, text: '🦷', kind: 'thought', tail: 'right', fs: 19 }] },
    /* līber: the lion OUT of the net and walking away from it */
    v_liber:     { bg: 'plain', items: [
                   { t: 'rete', x: 348, y: G, s: 1 },
                   { t: 'leo',  x: 170, y: G, s: 1.05, pose: 'walk', flip: true }
                 ] },

    v_formica:   { bg: 'plain', items: [{ t: 'formica', x: 195, y: G, s: 2.4 }] },
    v_cicada:    { bg: 'plain', items: [{ t: 'cicada', x: 195, y: G, s: 2.4 }] },
    v_frumentum: { bg: 'plain', items: [{ t: 'frumentum', x: 200, y: G, s: 1.8 }] },
    /* ager: a whole field of standing grain, not one sheaf */
    v_ager:      { bg: 'plain', items: [
                   { t: 'frumentum', x: 58,  y: G, s: 0.88 },
                   { t: 'frumentum', x: 148, y: G, s: 1 },
                   { t: 'frumentum', x: 245, y: G, s: 0.95 },
                   { t: 'frumentum', x: 338, y: G, s: 0.85 }
                 ] },
    v_portat:    { bg: 'plain', items: [
                   { t: 'formica',   x: 190, y: G, s: 2 },
                   { t: 'frumentum', x: 172, y: 162, s: 0.5 }
                 ] },
    v_laborat:   { bg: 'plain', items: [
                   { t: 'sol',       x: 340, y: 92, s: 0.75 },
                   { t: 'formica',   x: 120, y: G, s: 1.9 },
                   { t: 'frumentum', x: 103, y: 165, s: 0.48 },
                   { t: 'formica',   x: 248, y: G, s: 1.8 },
                   { t: 'frumentum', x: 232, y: 167, s: 0.45 }
                 ] },
    v_aestas:    { bg: 'plain', items: [
                   { t: 'sol',       x: 200, y: 108, s: 1.15 },
                   { t: 'frumentum', x: 78,  y: G, s: 0.9 },
                   { t: 'frumentum', x: 318, y: G, s: 0.9 }
                 ] },

    v_agricola:  { bg: 'plain', items: [
                   { t: 'person',    x: 180, y: G, s: 1.05, role: 'man' },
                   { t: 'frumentum', x: 300, y: G, s: 0.85 }
                 ] },
    v_gallina:   { bg: 'plain', items: [{ t: 'gallina', x: 195, y: G, s: 2 }] },
    v_ovum:      { bg: 'plain', items: [{ t: 'ovumAureum', x: 200, y: G, s: 1.9 }] },
    /* aureum: TWO golden things that are not the same object, so the
       shared quality (not the egg) is what the card teaches */
    v_aureum:    { bg: 'plain', items: [
                   { t: 'crown',      x: 108, y: G, s: 1.7 },
                   { t: 'ovumAureum', x: 288, y: G, s: 1.5 }
                 ] },
    v_ponit:     { bg: 'plain', items: [
                   { t: 'gallina',    x: 138, y: G, s: 1.7 },
                   { t: 'ovumAureum', x: 272, y: G, s: 1.25 }
                 ] },
    v_quaerit:   { bg: 'plain', items: [
                   { t: 'ovumAureum', x: 118, y: G, s: 1.2 },
                   { t: 'person',     x: 262, y: G, s: 1, role: 'man', pose: 'kneel', flip: true }
                 ],
                 bubbles: [{ x: 196, y: 76, w: 54, h: 40, text: '❓', kind: 'thought', tail: 'right', fs: 20 }] },
    v_volat:     { bg: 'plain', items: [{ t: 'gallina', x: 190, y: 130, s: 1.8, pose: 'fly' }] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 4 — Leō et Mūs ============
       This is the AUTHORING-BRIEF golden exemplar, implemented as written
       (including its page-8 correction 'Rēte leōnem tenet! Leō fremit.',
       which avoids the ablative 'in rētī' the brief flags as the trap).
       Three pages are ADDED to the exemplar's twelve, because three
       standing rules of the brief cannot otherwise be met — see the
       comments on those pages. No exemplar sentence is altered. */
    {
      id: 'f4',
      titulus: 'Leō et Mūs',
      icon: '🦁🐭',
      numerus: 'IV',
      pos: { x: 0.26, y: 0.87 },
      vocab: [
        { la: 'leō',    scene: SC.v_leo,    pars: 'nomen' },
        { la: 'mūs',    scene: SC.v_mus,    pars: 'nomen' },
        { la: 'rēte',   scene: SC.v_rete,   pars: 'nomen' },
        { la: 'dormit', scene: SC.v_dormit, pars: 'verbum' },
        { la: 'currit', scene: SC.v_currit, pars: 'verbum' },
        { la: 'rōdit',  scene: SC.v_rodit,  pars: 'verbum' },
        { la: 'capit',  emoji: '✊',        pars: 'verbum' },
        { la: 'līber',  scene: SC.v_liber,  pars: 'adiectivum' }
      ],
      story: [
        { la: 'Ecce leō! Leō in silvā dormit.', scene: SC.f4_dormit,
          nova: [{ w: 'leō', e: '🦁', g: '' },
                 { w: 'dormit', e: '💤', g: '' }] },

        { la: 'Mūrēs quoque in silvā habitant. Mūrēs parvī sunt.', scene: SC.f4_mures,
          nova: [{ w: 'mūs', e: '🐭', g: 'mūrēs = multī mūs' },
                 /* quoque is FREE (f2) — its gloss is repeated here on
                    purpose, because it is the only place the mōrāle's
                    'etiam' is ever met. See the ledger's GLOSS-ONLY note. */
                 { w: 'quoque', e: '➕', g: '= etiam' },
                 { w: 'habitant', e: '🏠', g: 'in silvā sunt' },
                 { w: 'parvī', e: '🐭 ↔ 🦁', g: '' },
                 { w: 'sunt', e: '🐭🐭', g: 'ūnus est, multī sunt' }] },

        /* ADDED (1/3): the S2 target morphology — 3rd-conjugation PLURAL
           -unt — shown as motion before the singular currit is asked for.
           Introduces no new lexeme. */
        { la: 'Mūrēs in silvā currunt.', scene: SC.f4_currunt,
          nova: [{ w: 'currunt', e: '🏃🏃', g: 'multī mūrēs currunt' }] },

        { la: 'Ūnus mūs super leōnem currit!', scene: SC.f4_currit,
          nova: [{ w: 'currit', e: '🏃', g: '' },
                 { w: 'ūnus', e: '1️⃣', g: 'nōn multī' },
                 { w: 'super', e: '⬆', g: '' }] },

        { la: 'Leō oculōs aperit et mūrem capit.', scene: SC.f4_capit,
          nova: [{ w: 'capit', e: '✊', g: '' },
                 { w: 'oculōs', e: '👀', g: 'oculus, oculī' },
                 { w: 'aperit', e: '👁️', g: 'iam videt' }] },

        { la: 'Mūs timet: leō enim magnus est, mūs parvus.', scene: SC.f4_timet,
          nova: [{ w: 'enim', e: '➡', g: 'causa' },
                 { w: 'magnus', e: '🦁 ↔ 🐭', g: '↔ parvus' }] },

        { la: 'Sed leō mūrem nōn dēvorat: leō mūrem līberat.', scene: SC.f4_liberat,
          nova: [{ w: 'līberat', e: '🔓', g: 'nōn iam tenet' }] },

        { la: 'Posteā virī veniunt et leōnem capiunt.', scene: SC.f4_viri,
          nova: [{ w: 'posteā', e: '1️⃣➡2️⃣', g: '' },
                 { w: 'virī', e: '👨👨', g: 'vir, virī' },
                 { w: 'veniunt', e: '🚶🚶', g: 'venit, veniunt' }] },

        /* ADDED (2/3): LATIN-STYLE §3 requires direct speech in every
           fable and the exemplar has none. Every word here is already
           taught, and every verb is 3rd person — no imperative (S5),
           no vocative (S5), no pronoun (S6). */
        { la: 'Virī clāmant: “Ecce leō magnus!”', scene: SC.f4_clamant },

        { la: 'Rēte leōnem tenet! Leō fremit.', scene: SC.f4_rete,
          nova: [{ w: 'rēte', e: '🕸', g: 'virī rēte tenent' },
                 { w: 'fremit', e: '🦁💢', g: 'leō clāmat' }] },

        { la: 'Mūs leōnem audit, venit, rēte rōdit!', scene: SC.f4_rodit,
          nova: [{ w: 'audit', e: '👂🔊', g: '' },
                 { w: 'rōdit', e: '🦷', g: '' }] },

        { la: 'Iam rēte leōnem nōn tenet: leō līber est!', scene: SC.f4_liber,
          nova: [{ w: 'iam', e: '⏱', g: 'nunc, nōn ōlim' },
                 { w: 'līber', e: '🔓', g: '↔ captīvus' }] },

        /* ADDED (3/3): a second direct-speech beat, and the page that
           pre-teaches iuvat — the mōrāle may contain NO new word
           (AUTHORING-BRIEF), and the exemplar's mōrāle introduces it. */
        { la: 'Leō fremit: “Mūs rēte rōdit! Mūs leōnem iuvat!”', scene: SC.f4_fremit,
          nova: [{ w: 'iuvat', e: '🤝', g: 'leōnem līberat' }] },

        { la: 'Leō et mūs iam amīcī sunt.', scene: SC.f4_amici,
          nova: [{ w: 'amīcī', e: '🦁🤝🐭', g: 'amīcus, amīcī' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Etiam mūs parvus leōnem magnum iuvat.', scene: SC.f4_moral }
      ],
      ludus: {
        words: [
          { la: 'leō',    scene: SC.v_leo,  emoji: '🦁' },
          { la: 'mūs',    scene: SC.v_mus,  emoji: '🐭' },
          { la: 'rēte',   scene: SC.v_rete, emoji: '🕸' },
          { la: 'vulpēs', emoji: '🦊' },
          { la: 'lupus',  emoji: '🐺' },
          { la: 'arbor',  emoji: '🌳' }
        ]
      },
      /* SONUS hand-authored: the generator pairs every visual with every
         other, which here would offer leō against a NET — no contrast to
         learn from. These four sets keep two same-class rivals in view. */
      sonus: [
        { la: 'leō',
          answer: { la: 'leō', scene: SC.v_leo },
          options: [{ la: 'leō', scene: SC.v_leo },
                    { la: 'mūs', scene: SC.v_mus },
                    { la: 'rēte', scene: SC.v_rete }] },
        { la: 'mūs',
          answer: { la: 'mūs', scene: SC.v_mus },
          options: [{ la: 'mūs', scene: SC.v_mus },
                    { la: 'leō', scene: SC.v_leo },
                    { la: 'capit', emoji: '✊' },
                    { la: 'rēte', scene: SC.v_rete }] },
        { la: 'dormit',
          answer: { la: 'dormit', scene: SC.v_dormit },
          options: [{ la: 'dormit', scene: SC.v_dormit },
                    { la: 'currit', scene: SC.v_currit },
                    { la: 'rōdit', scene: SC.v_rodit }] },
        /* līber is NOT offered here: v_liber contains a net, so a learner
           who hears "rēte" and taps it would be right about the picture
           and wrong about the word (LATIN-STYLE §4). */
        { la: 'rēte',
          answer: { la: 'rēte', scene: SC.v_rete },
          options: [{ la: 'rēte', scene: SC.v_rete },
                    { la: 'dormit', scene: SC.v_dormit },
                    { la: 'mūs', scene: SC.v_mus },
                    { la: 'leō', scene: SC.v_leo }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'leō',    scene: SC.v_leo },
            { la: 'mūs',    scene: SC.v_mus },
            { la: 'rēte',   scene: SC.v_rete },
            { la: 'dormit', scene: SC.v_dormit },
            { la: 'currit', scene: SC.v_currit },
            { la: 'capit',  emoji: '✊' }
          ],
          scrambles: [
            { la: 'Leō in silvā dormit.',      scene: SC.f4_dormit },
            { la: 'Mūrēs in silvā currunt.',   scene: SC.f4_currunt },
            { la: 'Rēte leōnem tenet.',        scene: SC.f4_rete },
            { la: 'Mūs rēte rōdit.',           scene: SC.f4_rodit }
          ]
        },
        corrige: [
          { words: ['Leō', 'in', 'silvā', 'currit.'], wrong: 3,
            options: ['dormit.', 'rōdit.', 'capit.'], correct: 0, scene: SC.f4_dormit },
          /* only Mūrēs both fits the picture AND agrees with -unt; Leō is
             ruled out by the ending, Virī only by the picture. */
          { words: ['Leōnēs', 'in', 'silvā', 'currunt.'], wrong: 0,
            options: ['Mūrēs', 'Virī', 'Leō'], correct: 0, scene: SC.f4_currunt },
          { words: ['Mūs', 'leōnem', 'tenet.'], wrong: 0,
            options: ['Rēte', 'Silva', 'Arbor'], correct: 0, scene: SC.f4_rete },
          { words: ['Leō', 'rēte', 'rōdit.'], wrong: 0,
            options: ['Mūs', 'Vir', 'Arbor'], correct: 0, scene: SC.f4_rodit },
          { words: ['Mūs', 'magnus', 'est.'], wrong: 1,
            options: ['parvus', 'līber', 'ūnus'], correct: 0, scene: SC.f4_timet }
        ],
        comple: [
          { text: 'Leō in silv___ dormit.', options: ['ā', 'am', 'ae'], correct: 0, scene: SC.f4_dormit },
          { text: 'Mūrēs parvī ___.', options: ['sunt', 'est', 'dormit'], correct: 0, scene: SC.f4_mures },
          { text: 'Mūrēs in silvā ___.', options: ['currunt', 'currit', 'sunt'], correct: 0, scene: SC.f4_currunt },
          { text: 'Rēte leōn___ tenet.', options: ['em', 'ēs', 'is'], correct: 0, scene: SC.f4_rete },
          { text: 'Mūs rēte ___.', options: ['rōdit', 'dormit', 'tenet'], correct: 0, scene: SC.f4_rodit },
          /* līber's third exposure: it is deliberately kept out of SONUS
             (v_liber contains a net), so the recycling happens here, where
             the picture — a lion walking clear of the net — decides it. */
          { text: 'Leō iam ___ est!', options: ['līber', 'parvus', 'ūnus'], correct: 0, scene: SC.f4_liber }
        ]
      }
    },

    /* ============ FABLE 5 — Formīca et Cicāda ============
       The ending is KIND (assignment + DESIGN §8): the ant takes the
       cicada in and the cicada learns to work — nobody starves. -que
       and et…et, the two constructions S2 adds, are both taught here. */
    {
      id: 'f5',
      titulus: 'Formīca et Cicāda',
      icon: '🐜🎶',
      numerus: 'V',
      pos: { x: 0.72, y: 0.63 },
      vocab: [
        { la: 'formīca',   scene: SC.v_formica,   pars: 'nomen' },
        { la: 'cicāda',    scene: SC.v_cicada,    pars: 'nomen' },
        { la: 'ager',      scene: SC.v_ager,      pars: 'nomen' },
        { la: 'frūmentum', scene: SC.v_frumentum, pars: 'nomen' },
        { la: 'aestās',    scene: SC.v_aestas,    pars: 'nomen' },
        { la: 'hiems',     emoji: '❄️',           pars: 'nomen' },
        { la: 'portat',    scene: SC.v_portat,    pars: 'verbum' },
        { la: 'labōrat',   scene: SC.v_laborat,   pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce ager! In agrō formīca habitat.', scene: SC.f5_ager,
          nova: [{ w: 'ager', e: '🌾', g: 'in agrō frūmentum est' },
                 { w: 'formīca', e: '🐜', g: '' }] },

        { la: 'Aestās est. In agrō frūmentum est.', scene: SC.f5_aestas,
          nova: [{ w: 'aestās', e: '☀', g: '↔ hiems' },
                 { w: 'frūmentum', e: '🌾', g: 'cibus' }] },

        { la: 'Formīca frūmentum portat.', scene: SC.f5_portat,
          nova: [{ w: 'portat', e: '🐜🌾', g: 'frūmentum tenet et ambulat' }] },

        { la: 'Formīca semper labōrat.', scene: SC.f5_laborat,
          nova: [{ w: 'labōrat', e: '💪', g: 'nōn dormit, nōn cantat' }] },

        { la: 'Ecce cicāda! Cicāda in arbore sedet.', scene: SC.f5_cicada,
          nova: [{ w: 'cicāda', e: '🦗', g: '' }] },

        { la: 'Cicāda cantat. Cicāda nōn labōrat.', scene: SC.f5_nonlab },

        { la: 'Cicāda cantat: “Aestās pulchra est! Cicāda cantat, formīca labōrat!”',
          scene: SC.f5_canit2 },

        { la: 'Aestās discēdit; hiems venit. In agrō frūmentum nōn est.', scene: SC.f5_hiems,
          nova: [{ w: 'hiems', e: '❄', g: '↔ aestās' }] },

        { la: 'Cicāda ēsurit. Cicāda ad formīcam ambulat.', scene: SC.f5_esurit },

        { la: 'Cicāda clāmat: “Hiems venit! Cicāda ēsurit!”', scene: SC.f5_clamat },

        { la: 'Formīca cicādam videt. Formīca frūmentum portat.', scene: SC.f5_iuvat },

        { la: 'Iam formīca cicādaque frūmentum portant. Formīca cicādam iuvat.',
          scene: SC.f5_portant,
          nova: [{ w: 'cicādaque', e: '➕', g: '= et cicāda' }] },

        { la: 'Formīca dīcit: “Cicāda et cantat et labōrat!”', scene: SC.f5_dicit },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: labōrat formīca; hiemem nōn timet.', scene: SC.f5_moral }
      ],
      ludus: {
        words: [
          { la: 'formīca',   scene: SC.v_formica,   emoji: '🐜' },
          { la: 'cicāda',    scene: SC.v_cicada,    emoji: '🦗' },
          { la: 'frūmentum', scene: SC.v_frumentum, emoji: '🌾' },
          { la: 'hiems',     emoji: '❄️' },
          { la: 'leō',       scene: SC.v_leo,       emoji: '🦁' },
          { la: 'mūs',       scene: SC.v_mus,       emoji: '🐭' }
        ]
      },
      /* SONUS: aestās and hiems must be offered AGAINST EACH OTHER or the
         season pair is never actually discriminated; the generator's
         deterministic pick does not guarantee that. */
      sonus: [
        { la: 'formīca',
          answer: { la: 'formīca', scene: SC.v_formica },
          options: [{ la: 'formīca', scene: SC.v_formica },
                    { la: 'cicāda', scene: SC.v_cicada },
                    { la: 'frūmentum', scene: SC.v_frumentum }] },
        { la: 'cicāda',
          answer: { la: 'cicāda', scene: SC.v_cicada },
          options: [{ la: 'cicāda', scene: SC.v_cicada },
                    { la: 'formīca', scene: SC.v_formica },
                    { la: 'ager', scene: SC.v_ager },
                    { la: 'hiems', emoji: '❄️' }] },
        /* ager is NOT offered against aestās: v_ager and v_aestas are the
           same field of grain, one of them merely with the sun in it.
           Nor portat against labōrat, for the same reason. */
        { la: 'aestās',
          answer: { la: 'aestās', scene: SC.v_aestas },
          options: [{ la: 'aestās', scene: SC.v_aestas },
                    { la: 'hiems', emoji: '❄️' },
                    { la: 'cicāda', scene: SC.v_cicada }] },
        { la: 'labōrat',
          answer: { la: 'labōrat', scene: SC.v_laborat },
          options: [{ la: 'labōrat', scene: SC.v_laborat },
                    { la: 'hiems', emoji: '❄️' },
                    { la: 'cicāda', scene: SC.v_cicada },
                    { la: 'frūmentum', scene: SC.v_frumentum }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            /* ager is left out: as a memory tile v_ager (a field of grain)
               and v_frumentum (one sheaf) are too near each other. */
            { la: 'formīca',   scene: SC.v_formica },
            { la: 'cicāda',    scene: SC.v_cicada },
            { la: 'frūmentum', scene: SC.v_frumentum },
            { la: 'portat',    scene: SC.v_portat },
            { la: 'aestās',    scene: SC.v_aestas },
            { la: 'hiems',     emoji: '❄️' }
          ],
          scrambles: [
            { la: 'Formīca frūmentum portat.',        scene: SC.f5_portat },
            { la: 'Formīca semper labōrat.',          scene: SC.f5_laborat },
            { la: 'Cicāda in arbore sedet.',          scene: SC.f5_cicada },
            { la: 'Formīca cicādaque frūmentum portant.', scene: SC.f5_portant }
          ]
        },
        corrige: [
          { words: ['Cicāda', 'frūmentum', 'portat.'], wrong: 0,
            options: ['Formīca', 'Aestās', 'Hiems'], correct: 0, scene: SC.f5_portat },
          { words: ['Formīca', 'semper', 'cantat.'], wrong: 2,
            options: ['labōrat.', 'sedet.', 'dormit.'], correct: 0, scene: SC.f5_laborat },
          { words: ['Cicāda', 'in', 'agrō', 'sedet.'], wrong: 2,
            options: ['arbore', 'silvā', 'aquā'], correct: 0, scene: SC.f5_cicada },
          { words: ['Aestās', 'venit.', 'Frūmentum', 'nōn', 'est.'], wrong: 0,
            options: ['Hiems', 'Formīca', 'Cicāda'], correct: 0, scene: SC.f5_hiems },
          { words: ['Formīca', 'cicādaque', 'frūmentum', 'cantant.'], wrong: 3,
            options: ['portant.', 'sunt.', 'sedent.'], correct: 0, scene: SC.f5_portant }
        ],
        comple: [
          { text: 'In agr___ formīca habitat.', options: ['ō', 'um', 'ī'], correct: 0, scene: SC.f5_ager },
          { text: 'Formīca frūmentum ___.', options: ['portat', 'cantat', 'sedet'], correct: 0, scene: SC.f5_portat },
          { text: 'Cicāda cantat, sed nōn ___.', options: ['labōrat', 'portat', 'venit'], correct: 0, scene: SC.f5_nonlab },
          { text: 'Aestās discēdit; ___ venit.', options: ['hiems', 'aestās', 'ager'], correct: 0, scene: SC.f5_hiems },
          { text: 'Formīca cicādaque frūmentum ___.', options: ['portant', 'portat', 'cantant'], correct: 0, scene: SC.f5_portant }
        ]
      }
    },

    /* ============ FABLE 6 — Gallīna et Ōva Aurea ============
       B-RATING (DESIGN §8, assignment): the farmer NEVER kills the hen on
       the page. He searches; 'sed intrā gallīnam aurum nōn est'; the hen
       takes fright and flies to the wood; the golden eggs simply stop.
       The moral — greed loses everything — is untouched by the omission. */
    {
      id: 'f6',
      titulus: 'Gallīna et Ōva Aurea',
      icon: '🐔🥚',
      numerus: 'VI',
      pos: { x: 0.28, y: 0.40 },
      vocab: [
        { la: 'agricola', scene: SC.v_agricola, pars: 'nomen' },
        { la: 'gallīna',  scene: SC.v_gallina,  pars: 'nomen' },
        { la: 'ōvum',     scene: SC.v_ovum,     pars: 'nomen' },
        { la: 'aurum',    emoji: '🥇',          pars: 'nomen' },
        { la: 'aureum',   scene: SC.v_aureum,   pars: 'adiectivum' },
        { la: 'pōnit',    scene: SC.v_ponit,    pars: 'verbum' },
        { la: 'quaerit',  scene: SC.v_quaerit,  pars: 'verbum' },
        { la: 'volat',    scene: SC.v_volat,    pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce agricola! Agricola in agrō labōrat.', scene: SC.f6_ager,
          nova: [{ w: 'agricola', e: '👨🌾', g: 'in agrō labōrat' }] },

        { la: 'Ecce gallīna! Gallīna in agrō est.', scene: SC.f6_gallina,
          nova: [{ w: 'gallīna', e: '🐔', g: '' }] },

        { la: 'Gallīna ōvum pōnit.', scene: SC.f6_ponit,
          nova: [{ w: 'ōvum', e: '🥚', g: 'ōvum, ōva' },
                 { w: 'pōnit', e: '🐔➡🥚', g: '' }] },

        { la: 'Ecce ōvum! Ōvum aureum est!', scene: SC.f6_ovum,
          nova: [{ w: 'aureum', e: '✨', g: 'aurum → aureum' }] },

        { la: 'Cotīdiē gallīna ōvum aureum pōnit.', scene: SC.f6_cotidie,
          nova: [{ w: 'cotīdiē', e: '🔁', g: 'semper iterum' }] },

        { la: 'Agricola laetus est. Agricola ōva aurea videt.', scene: SC.f6_laetus },

        { la: 'Sed agricola multa ōva cupit.', scene: SC.f6_cupit,
          nova: [{ w: 'multa', e: '🥚🥚🥚', g: '↔ ūnum' }] },

        { la: 'Agricola dīcit: “Aurum intrā gallīnam est!”', scene: SC.f6_dicit,
          nova: [{ w: 'aurum', e: '🥇', g: '' },
                 { w: 'intrā', e: '📦➡•', g: '↔ extrā' }] },

        { la: 'Agricola gallīnam capit aurumque quaerit.', scene: SC.f6_quaerit,
          nova: [{ w: 'aurumque', e: '➕', g: '= et aurum' },
                 { w: 'quaerit', e: '🔎', g: 'vidēre cupit' }] },

        /* the whole B-rating hinge: a plain statement of fact, no act */
        { la: 'Sed intrā gallīnam aurum nōn est.', scene: SC.f6_nihil },

        { la: 'Gallīna timet et volat. Gallīna ad silvam volat.', scene: SC.f6_volat,
          nova: [{ w: 'volat', e: '🐔💨', g: 'in caelō est' }] },

        { la: 'Iam gallīna ōva aurea nōn pōnit.', scene: SC.f6_nonponit },

        { la: 'Agricola aurum quaerit; nihil invenit.', scene: SC.f6_invenit,
          nova: [{ w: 'nihil', e: '0️⃣', g: '↔ multa' }] },

        { la: 'Agricola trīstis est: aurum nōn habet.', scene: SC.f6_tristis,
          nova: [{ w: 'habet', e: '🤲', g: 'habeō → habet' }] },

        /* mōrāle: gnomic present, no new words */
        { la: 'Fābula docet: agricola multa cupit, nihil habet.', scene: SC.f6_moral }
      ],
      ludus: {
        words: [
          { la: 'gallīna',   scene: SC.v_gallina, emoji: '🐔' },
          { la: 'ōvum',      scene: SC.v_ovum,    emoji: '🥚' },
          { la: 'aurum',     emoji: '🥇' },
          { la: 'formīca',   scene: SC.v_formica, emoji: '🐜' },
          { la: 'cicāda',    scene: SC.v_cicada,  emoji: '🦗' },
          { la: 'frūmentum', scene: SC.v_frumentum, emoji: '🌾' }
        ]
      },
      /* SONUS: aurum (🥇) and aureum (two golden objects) look alike on
         purpose, so they are never offered in the same set — a picture
         choice between them would be ambiguous, not instructive
         (LATIN-STYLE §4: no distractor that is accidentally also right). */
      sonus: [
        { la: 'gallīna',
          answer: { la: 'gallīna', scene: SC.v_gallina },
          options: [{ la: 'gallīna', scene: SC.v_gallina },
                    { la: 'ōvum', scene: SC.v_ovum },
                    { la: 'agricola', scene: SC.v_agricola }] },
        { la: 'ōvum',
          answer: { la: 'ōvum', scene: SC.v_ovum },
          options: [{ la: 'ōvum', scene: SC.v_ovum },
                    { la: 'gallīna', scene: SC.v_gallina },
                    { la: 'agricola', scene: SC.v_agricola },
                    { la: 'volat', scene: SC.v_volat }] },
        { la: 'agricola',
          answer: { la: 'agricola', scene: SC.v_agricola },
          options: [{ la: 'agricola', scene: SC.v_agricola },
                    { la: 'gallīna', scene: SC.v_gallina },
                    { la: 'ōvum', scene: SC.v_ovum }] },
        { la: 'volat',
          answer: { la: 'volat', scene: SC.v_volat },
          options: [{ la: 'volat', scene: SC.v_volat },
                    { la: 'pōnit', scene: SC.v_ponit },
                    { la: 'quaerit', scene: SC.v_quaerit },
                    { la: 'gallīna', scene: SC.v_gallina }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            /* aurum vs aureum IS offered here, unlike in SONUS: in a memory
               grid the WORD is on screen, so distinguishing them is a
               reading task the learner can actually win. By ear it would
               be a coin-flip, which is why sonus keeps them apart. */
            { la: 'gallīna',  scene: SC.v_gallina },
            { la: 'ōvum',     scene: SC.v_ovum },
            { la: 'agricola', scene: SC.v_agricola },
            { la: 'aurum',    emoji: '🥇' },
            { la: 'aureum',   scene: SC.v_aureum },
            { la: 'volat',    scene: SC.v_volat }
          ],
          scrambles: [
            { la: 'Gallīna ōvum pōnit.',              scene: SC.f6_ponit },
            { la: 'Agricola in agrō labōrat.',        scene: SC.f6_ager },
            { la: 'Gallīna ad silvam volat.',         scene: SC.f6_volat },
            { la: 'Agricola ōva aurea videt.',        scene: SC.f6_laetus }
          ]
        },
        corrige: [
          { words: ['Gallīna', 'ōvum', 'quaerit.'], wrong: 2,
            options: ['pōnit.', 'volat.', 'videt.'], correct: 0, scene: SC.f6_ponit },
          { words: ['Ōvum', 'parvum', 'est.'], wrong: 1,
            options: ['aureum', 'līberum', 'trīste'], correct: 0, scene: SC.f6_ovum },
          { words: ['Gallīna', 'ad', 'silvam', 'ambulat.'], wrong: 3,
            options: ['volat.', 'pōnit.', 'sedet.'], correct: 0, scene: SC.f6_volat },
          { words: ['Formīca', 'ōva', 'aurea', 'videt.'], wrong: 0,
            options: ['Agricola', 'Gallīna', 'Cicāda'], correct: 0, scene: SC.f6_laetus },
          { words: ['Agricola', 'aurum', 'pōnit.'], wrong: 2,
            options: ['quaerit.', 'volat.', 'labōrat.'], correct: 0, scene: SC.f6_quaerit }
        ],
        comple: [
          { text: 'Gallīna ōv___ pōnit.', options: ['um', 'a', 'ī'], correct: 0, scene: SC.f6_ponit },
          { text: 'Ōvum ___ est!', options: ['aureum', 'parvum', 'trīste'], correct: 0, scene: SC.f6_ovum },
          /* ONE blank only: the legacy {options,correct} shape carries a
             single accepted word, so a two-blank item can never be solved. */
          { text: 'Agricola ōva aure___ videt.', options: ['a', 'um', 'ās'], correct: 0, scene: SC.f6_laetus },
          { text: 'Sed intrā gallīnam aurum nōn ___.', options: ['est', 'sunt', 'volat'], correct: 0, scene: SC.f6_nihil },
          { text: 'Gallīna ad silvam ___.', options: ['volat', 'pōnit', 'labōrat'], correct: 0, scene: SC.f6_volat }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r02',
    titulus: 'Ager',
    ladder: 'S2',                 /* CURRICULUM §0: nom/acc pl, 3rd conj, -que */
    progressId: 'r02',            /* new region: content id doubles as the key */
    capitula: capitula,
    boss: {
      id: 'b_r02',
      progressId: 'r02',
      /* the lion of f4 returns as the region's boss (the wolf spine is
         R1/R5/R9/R12 — CURRICULUM §1 — so R2 gets its own beast) */
      name: 'Leō',
      actor: 'leo',
      /* LEGACY single-phase tuning, kept for the same two reasons r01 keeps
         it: server/lib/rules.php derived rule_boss_min_ms('r02') from these
         numbers, and a client without js/boss-phases.js must still be able
         to run the fight. When `phases` is present the engine uses it. */
      hp: 6,                      /* same tuning as r01 */
      seconds: 45,
      /* same y as r01's boss (0.16): the map frame clips a few pixels off the
         top node, so the convention is what keeps every region's crown sitting
         at the same height on the board. */
      pos: { x: 0.68, y: 0.16 },
      /* M3 three-phase duel, the same split r01 ships (total HP 6 = the
         legacy pool, so the fight is the same LENGTH). No extra authoring
         is needed: js/boss-phases.js derives the CLĀMOR sentences from this
         region's own capitula story pages, and difficulty ramps off the
         region index by itself — Ager is region II, so it comes out a shade
         harder than Silva with no numbers touched here. */
      phases: [
        { type: 'caterva', hp: 2, seconds: 22 },
        { type: 'clamor',  hp: 2, seconds: 28 },
        { type: 'fuga',    hp: 2, seconds: 20 }
      ],
      /* 5 cumulative questions, word → pick the image; one from each
         capitulum plus two more. Every word here is a vocab entry WITH a
         picture in its capitulum, which is what app.js's bossWords()
         needs to resolve it. Answer key: server/lib/rules.php. */
      quiz: [
        { la: 'leō',     from: 'f4' },
        { la: 'formīca', from: 'f5' },
        { la: 'gallīna', from: 'f6' },
        { la: 'rēte',    from: 'f4' },
        { la: 'ōvum',    from: 'f6' }
      ]
    }
  });
})();
