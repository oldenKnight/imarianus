/* ============================================================
   content/historia-l2.js — HISTORIA SACRA · Liber II · DĪLUVIUM  (ladder S2)
   ------------------------------------------------------------
   Five capitula from Genesis 6–11, still in the NARRATIVE PRESENT:

     h6  Hominēs malī        — Gn 6, 1–12
     h7  Arca aedificātur    — Gn 6, 13–22 · 7, 1–9
     h8  Dīluvium magnum     — Gn 7, 10–24
     h9  Columba et rāmus    — Gn 8
     h10 Turris Babel        — Gn 11, 1–9
     PROBĀTIŌ 'Arca'         — ōrdinā: animālia in arcam (DESIGN §6)

   STAGE CEILING (CURRICULUM §0 S2, binding):
     everything Liber I may use, PLUS nom/acc PLURAL, 3rd-conjugation
     present, -que, et…et. Still NO genitive, NO dative, NO ablative
     beyond the locative `in` + abl and the `in` + acc of direction that
     h5 glossed with an arrow. Still no pronouns, imperative, vocative
     or perfect.
     The plural is this liber's TARGET, so it is introduced the way f4
     introduces it in Regiō II: pictured first (many men, many animals,
     many tongues), then asserted.

   NAMES: 'Noe' is the Clementine spelling (Noë) and is INDECLINABLE
   there — nominative "Fecit igitur Noe omnia" (6,22), accusative
   "dixit ad Noe" (6,13), dative "Benedixitque Deus Noe" (9,1),
   genitive "generationes Noe" (6,9). It is never inflected in this file.

   GOD is drawn exactly as in Liber I: the gold radiance, never a body.

   FIDELITY: checked against latin-sources/vulgata-clementina-raw.txt.
   THE DROWNED WORLD (Gn 7,21–23) IS OMITTED ENTIRELY — the camera stays
   ON the ark for the whole of h8 (DESIGN §8). Nothing that is told
   contradicts the Vulgate; the omissions are listed in the report.

   MISSING ART, reported not substituted: there is no rainbow/`arcus`
   actor, so the foedus of Gn 9,12–17 is carried by altar + radiance +
   'Deus prōmittit', and the bow itself is not drawn or named. There is
   also no rain actor: pluvia is the stormSea background plus `ventus`.

   IDS ARE DATABASE KEYS once shipped: h6…h10, boss b_l2, progressId 'l2'.

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ vocabulary mini-scenes ============ */

    v_multi:    { bg: 'city', items: [
                  { t: 'crowdGroup', x: 130, y: G, s: 1 },
                  { t: 'crowdGroup', x: 282, y: G, s: 0.92 }
                ] },

    v_malus:    { bg: 'city', items: [
                  { t: 'crowdGroup', x: 200, y: G, s: 1.05 }
                ],
                bubbles: [{ x: 78, y: 84, w: 56, h: 40, text: '💢', kind: 'thought', tail: 'right', fs: 20 },
                          { x: 322, y: 84, w: 56, h: 40, text: '💢', kind: 'thought', tail: 'left', fs: 20 }] },

    v_clamat:   { bg: 'city', items: [
                  { t: 'crowdGroup', x: 190, y: G, s: 1.05 }
                ],
                bubbles: [{ x: 314, y: 74, w: 62, h: 42, text: '📢', kind: 'speech', tail: 'left', fs: 20 }] },

    v_audit:    { bg: 'desert', items: [
                  { t: 'star',   x: 84,  y: 88, s: 0.8 },
                  { t: 'person', x: 234, y: G, s: 1.05, role: 'patriarch' }
                ],
                bubbles: [{ x: 152, y: 116, w: 56, h: 40, text: '👂', kind: 'thought', tail: 'right', fs: 20 }] },

    v_noe:      { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'patriarch' }
                ] },

    v_iustus:   { bg: 'desert', items: [
                  { t: 'star',   x: 200, y: 84, s: 0.8 },
                  { t: 'person', x: 200, y: G, s: 1.1, role: 'patriarch', pose: 'arms-up' }
                ] },

    v_vir:      { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'man' }
                ] },

    v_filius:   { bg: 'plain', items: [
                  { t: 'person', x: 118, y: G, s: 0.95, role: 'man' },
                  { t: 'person', x: 200, y: G, s: 0.95, role: 'man', flip: true },
                  { t: 'person', x: 282, y: G, s: 0.95, role: 'man' }
                ] },

    v_arca:     { bg: 'plain', items: [
                  { t: 'ark', x: 200, y: G, s: 1.1 }
                ] },

    v_aedificat: { bg: 'plain', items: [
                  { t: 'ark',     x: 262, y: G, s: 0.9 },
                  { t: 'truncus', x: 96,  y: G, s: 0.9 },
                  { t: 'person',  x: 140, y: G, s: 1, role: 'man', pose: 'point' }
                ],
                bubbles: [{ x: 70, y: 100, w: 56, h: 40, text: '🔨', kind: 'thought', tail: 'right', fs: 20 }] },

    v_lignum:   { bg: 'plain', items: [
                  { t: 'truncus', x: 132, y: G, s: 1.1 },
                  { t: 'truncus', x: 262, y: G, s: 1 }
                ] },

    v_intrat:   { bg: 'plain', items: [
                  { t: 'ark', x: 236, y: G, s: 1 },
                  { t: 'leo', x: 90,  y: G, s: 0.7, pose: 'walk' }
                ],
                bubbles: [{ x: 108, y: 96, w: 56, h: 40, text: '➡', kind: 'thought', tail: 'right', fs: 20 }] },

    v_leo:      { bg: 'plain', items: [{ t: 'leo',   x: 190, y: G, s: 1.1 }] },
    v_ursus:    { bg: 'plain', items: [{ t: 'ursus', x: 195, y: G, s: 1.15 }] },
    v_equus:    { bg: 'plain', items: [{ t: 'equus', x: 195, y: G, s: 1.05 }] },
    v_columba:  { bg: 'plain', items: [{ t: 'columba', x: 195, y: 156, s: 1.5, pose: 'fly' }] },

    /* pluvia: no rain actor exists (reported). The storm sky and the wind
       carry it, and the bubble is the sign, as f5 does for its seasons. */
    v_pluvia:   { bg: 'stormSea', items: [
                  { t: 'ventus', x: 116, y: 118, s: 0.95 },
                  { t: 'ventus', x: 286, y: 152, s: 0.85 }
                ],
                bubbles: [{ x: 200, y: 60, w: 64, h: 42, text: '🌧', kind: 'thought', tail: 'left', fs: 20 }] },

    v_cadit:    { bg: 'stormSea', items: [
                  { t: 'ventus', x: 200, y: 130, s: 1.1 }
                ],
                bubbles: [{ x: 86, y: 68, w: 56, h: 42, text: '⬇', kind: 'thought', tail: 'right', fs: 22 }] },

    /* aqua is a SPRING, not the open sea: v_mare (Liber I) is the sea, and
       two identical blue cards would be a coin-flip in every exercise. */
    v_aqua:     { bg: 'plain', items: [
                  { t: 'fons', x: 200, y: G, s: 1.7 }
                ] },

    v_crescit:  { bg: 'sea', items: [
                  { t: 'mountain', x: 118, y: G, s: 0.45 }
                ],
                bubbles: [{ x: 292, y: 96, w: 66, h: 42, text: '💧⬆', kind: 'thought', tail: 'left', fs: 18 }] },

    v_mons:     { bg: 'plain', items: [
                  { t: 'mountain', x: 200, y: G, s: 1.15 }
                ] },

    /* operit: the SAME mountain as v_mons, with the water over it.
       CLAR. That "same mountain" was the bug: v_mons and v_operit were each
       ONE mountain and nothing else, so both took the sprite-crop path, which
       throws the background away — and the background was the entire
       difference between a peak and a drowned peak. The flood is now what
       Gn 7,19 says it is, PLURAL: "operuit omnēs montēs excelsōs". Two peaks
       barely above the water is a picture the crop rule leaves alone (two
       actors keep their raster), it is true to the verse, and no Latin
       moved. */
    v_operit:   { bg: 'sea', items: [
                  { t: 'mountain', x: 138, y: 240, s: 0.5 },
                  { t: 'mountain', x: 286, y: 244, s: 0.42 }
                ] },

    v_diluvium: { bg: 'stormSea', items: [
                  { t: 'ventus',   x: 92,  y: 116, s: 0.9 },
                  { t: 'mountain', x: 318, y: 240, s: 0.5 },
                  { t: 'ventus',   x: 232, y: 156, s: 0.85 }
                ] },

    v_natat:    { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 208, s: 0.95 }
                ] },

    v_corvus:   { bg: 'sea', items: [
                  { t: 'ark',  x: 190, y: 208, s: 0.95 },
                  { t: 'crow', x: 196, y: 118, s: 1.2, pose: 'sad' }
                ] },

    v_volat:    { bg: 'sea', items: [
                  { t: 'columba', x: 196, y: 120, s: 1.4, pose: 'fly' }
                ] },

    v_redit:    { bg: 'sea', items: [
                  { t: 'ark',     x: 250, y: 208, s: 0.95 },
                  { t: 'columba', x: 118, y: 128, s: 1.1, pose: 'fly' }
                ],
                bubbles: [{ x: 186, y: 78, w: 58, h: 40, text: '↩', kind: 'thought', tail: 'right', fs: 22 }] },

    v_ramus:    { bg: 'sea', items: [
                  { t: 'columba', x: 180, y: 126, s: 1.5, pose: 'fly', ramus: true }
                ] },

    v_portat:   { bg: 'sea', items: [
                  { t: 'ark',     x: 288, y: 208, s: 0.85 },
                  { t: 'columba', x: 132, y: 122, s: 1.25, pose: 'fly', ramus: true }
                ] },

    v_exspectat: { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 206, s: 1 }
                ],
                bubbles: [{ x: 96, y: 76, w: 56, h: 42, text: '⏳', kind: 'thought', tail: 'right', fs: 20 }] },

    v_altare:   { bg: 'mountain', items: [
                  { t: 'altar', x: 200, y: G, s: 1.2, flame: true, smoke: true }
                ] },

    v_promittit: { bg: 'mountain', items: [
                  { t: 'star',   x: 200, y: 82, s: 1 },
                  { t: 'altar',  x: 258, y: G, s: 0.95, flame: true, smoke: true },
                  { t: 'person', x: 128, y: G, s: 1, role: 'patriarch', pose: 'arms-up' }
                ] },

    v_turris:   { bg: 'city', items: [
                  { t: 'turris', x: 200, y: G, s: 1.05 }
                ] },

    v_urbs:     { bg: 'city', items: [
                  { t: 'cityWall', x: 200, y: G, s: 0.95 }
                ] },

    v_lingua:   { bg: 'city', items: [
                  { t: 'crowdGroup', x: 200, y: G, s: 1 }
                ],
                bubbles: [{ x: 78, y: 76, w: 58, h: 40, text: '💬', kind: 'speech', tail: 'right', fs: 20 },
                          { x: 322, y: 76, w: 58, h: 40, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    v_altus:    { bg: 'plain', items: [
                  { t: 'turris', x: 274, y: G, s: 1.15 },
                  { t: 'bush',   x: 96,  y: G }
                ],
                bubbles: [{ x: 108, y: 96, w: 56, h: 42, text: '⬆', kind: 'thought', tail: 'right', fs: 22 }] },

    v_intellegit: { bg: 'city', items: [
                  { t: 'crowdGroup', x: 200, y: G, s: 1.05 }
                ],
                bubbles: [{ x: 200, y: 66, w: 66, h: 42, text: '💬✔', kind: 'speech', tail: 'left', fs: 18 }] },

    v_descendit: { bg: 'city', items: [
                  { t: 'star',   x: 200, y: 148, s: 0.9 },
                  { t: 'turris', x: 296, y: G, s: 0.8 }
                ],
                bubbles: [{ x: 84, y: 92, w: 56, h: 42, text: '⬇', kind: 'thought', tail: 'right', fs: 22 }] },

    v_discedit: { bg: 'desert', items: [
                  { t: 'person', x: 74,  y: G, s: 0.95, role: 'man', pose: 'walk', flip: true },
                  { t: 'person', x: 200, y: G, s: 0.95, role: 'woman', pose: 'walk' },
                  { t: 'person', x: 326, y: G, s: 0.95, role: 'man', pose: 'walk' }
                ] },

    /* ============ h6 — Hominēs malī ============ */

    h6_multi:   { bg: 'city', items: [
                  { t: 'crowdGroup', x: 118, y: G, s: 1 },
                  { t: 'crowdGroup', x: 286, y: G, s: 0.92 }
                ] },

    h6_mali:    { bg: 'city', items: [
                  { t: 'crowdGroup', x: 126, y: G, s: 1 },
                  { t: 'crowdGroup', x: 280, y: G, s: 0.92 }
                ],
                bubbles: [{ x: 200, y: 78, w: 60, h: 42, text: '💢', kind: 'thought', tail: 'left', fs: 20 }] },

    h6_clamant: { bg: 'city', items: [
                  { t: 'crowdGroup', x: 130, y: G, s: 1.02 },
                  { t: 'crowdGroup', x: 278, y: G, s: 0.94 }
                ],
                bubbles: [{ x: 72, y: 70, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'right', fs: 20 },
                          { x: 330, y: 70, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'left', fs: 20 }] },

    h6_surdi:   { bg: 'city', items: [
                  { t: 'crowdGroup', x: 132, y: G, s: 1.02 },
                  { t: 'crowdGroup', x: 276, y: G, s: 0.94 }
                ],
                bubbles: [{ x: 200, y: 66, w: 74, h: 44, text: '👂🚫', kind: 'thought', tail: 'left', fs: 18 }] },

    h6_videt:   { bg: 'city', items: [
                  { t: 'star',       x: 200, y: 88, s: 0.85 },
                  { t: 'crowdGroup', x: 200, y: G, s: 1.05 }
                ],
                bubbles: [{ x: 74, y: 128, w: 58, h: 42, text: '📢', kind: 'speech', tail: 'right', fs: 20 }] },

    h6_noe:     { bg: 'desert', items: [
                  { t: 'person', x: 214, y: G, s: 1.1, role: 'patriarch' }
                ] },

    h6_vir:     { bg: 'desert', items: [
                  { t: 'star',   x: 92,  y: 86, s: 0.8 },
                  { t: 'person', x: 226, y: G, s: 1.1, role: 'patriarch' }
                ] },

    h6_audit:   { bg: 'desert', items: [
                  { t: 'star',   x: 88,  y: 86, s: 0.85 },
                  { t: 'person', x: 236, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' }
                ],
                bubbles: [{ x: 156, y: 122, w: 56, h: 40, text: '👂', kind: 'thought', tail: 'right', fs: 20 }] },

    h6_filii:   { bg: 'desert', items: [
                  { t: 'person', x: 82,  y: G, s: 1.05, role: 'patriarch', pose: 'point' },
                  { t: 'person', x: 196, y: G, s: 0.95, role: 'man', flip: true },
                  { t: 'person', x: 268, y: G, s: 0.95, role: 'man', flip: true },
                  { t: 'person', x: 340, y: G, s: 0.95, role: 'man', flip: true }
                ] },

    h6_filii2:  { bg: 'desert', items: [
                  { t: 'star',   x: 200, y: 84, s: 0.8 },
                  { t: 'person', x: 116, y: G, s: 0.95, role: 'man' },
                  { t: 'person', x: 200, y: G, s: 0.95, role: 'man' },
                  { t: 'person', x: 284, y: G, s: 0.95, role: 'man', flip: true }
                ] },

    h6_iustus:  { bg: 'desert', items: [
                  { t: 'star',   x: 200, y: 82, s: 0.9 },
                  { t: 'person', x: 200, y: G, s: 1.1, role: 'patriarch', pose: 'arms-up' }
                ] },

    h6_memoria: { bg: 'desert', items: [
                  { t: 'crowdGroup', x: 100, y: G, s: 0.85 },
                  { t: 'person',     x: 288, y: G, s: 1.1, role: 'patriarch' }
                ] },

    /* ============ h7 — Arca aedificātur ============ */

    h7_vocat:   { bg: 'desert', items: [
                  { t: 'star',   x: 90,  y: 86, s: 0.9 },
                  { t: 'person', x: 244, y: G, s: 1.1, role: 'patriarch' }
                ],
                bubbles: [{ x: 160, y: 118, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    h7_aedificat: { bg: 'plain', items: [
                  { t: 'ark',    x: 268, y: G, s: 0.85 },
                  { t: 'person', x: 118, y: G, s: 1.05, role: 'patriarch', pose: 'point' }
                ],
                bubbles: [{ x: 90, y: 98, w: 56, h: 40, text: '🔨', kind: 'thought', tail: 'right', fs: 20 }] },

    h7_arca:    { bg: 'plain', items: [
                  { t: 'ark', x: 200, y: G, s: 1.15 }
                ] },

    h7_lignum:  { bg: 'plain', items: [
                  { t: 'truncus', x: 118, y: G, s: 1 },
                  { t: 'truncus', x: 248, y: G, s: 0.9 },
                  { t: 'person',  x: 330, y: G, s: 1, role: 'patriarch', flip: true }
                ] },

    h7_lignum2: { bg: 'plain', items: [
                  { t: 'ark',     x: 300, y: G, s: 0.8 },
                  { t: 'truncus', x: 96,  y: G, s: 0.9 },
                  { t: 'person',  x: 156, y: G, s: 0.95, role: 'man', pose: 'walk' },
                  { t: 'person',  x: 218, y: G, s: 0.95, role: 'man', pose: 'walk' }
                ] },

    h7_omnes:   { bg: 'plain', items: [
                  { t: 'ark',    x: 286, y: G, s: 0.95 },
                  { t: 'person', x: 84,  y: G, s: 1, role: 'patriarch', pose: 'point' },
                  { t: 'person', x: 148, y: G, s: 0.92, role: 'man', pose: 'point' },
                  { t: 'person', x: 202, y: G, s: 0.92, role: 'man', pose: 'point' }
                ] },

    h7_animalia: { bg: 'plain', items: [
                  { t: 'ark',     x: 316, y: G, s: 0.8 },
                  { t: 'person',  x: 60,  y: G, s: 1, role: 'patriarch', pose: 'point' },
                  { t: 'leo',     x: 150, y: G, s: 0.62, pose: 'walk' },
                  { t: 'equus',   x: 226, y: G, s: 0.6,  pose: 'walk' },
                  { t: 'columba', x: 180, y: 118, s: 0.7, pose: 'fly', flip: true }
                ] },

    h7_leo:     { bg: 'plain', items: [
                  { t: 'ark', x: 268, y: G, s: 0.95 },
                  { t: 'leo', x: 108, y: G, s: 0.85, pose: 'walk' }
                ] },

    h7_ursus:   { bg: 'plain', items: [
                  { t: 'ark',   x: 268, y: G, s: 0.95 },
                  { t: 'ursus', x: 108, y: G, s: 0.85, pose: 'walk' }
                ] },

    h7_equus:   { bg: 'plain', items: [
                  { t: 'ark',   x: 274, y: G, s: 0.95 },
                  { t: 'equus', x: 106, y: G, s: 0.8, pose: 'walk' }
                ] },

    h7_columba: { bg: 'plain', items: [
                  { t: 'ark',     x: 274, y: G, s: 0.95 },
                  { t: 'columba', x: 112, y: 130, s: 1.05, pose: 'fly', flip: true }
                ] },

    h7_intus1:  { bg: 'plain', items: [
                  { t: 'ark', x: 224, y: G, s: 1.1 }
                ],
                bubbles: [{ x: 84, y: 92, w: 78, h: 44, text: '🦁🐻', kind: 'thought', tail: 'right', fs: 20 }] },

    h7_intus2:  { bg: 'plain', items: [
                  { t: 'ark', x: 224, y: G, s: 1.1 }
                ],
                bubbles: [{ x: 84, y: 92, w: 78, h: 44, text: '🐴🐦', kind: 'thought', tail: 'right', fs: 20 }] },

    h7_noe:     { bg: 'plain', items: [
                  { t: 'ark',    x: 268, y: G, s: 1 },
                  { t: 'person', x: 78,  y: G, s: 1, role: 'patriarch', pose: 'walk' },
                  { t: 'person', x: 142, y: G, s: 0.92, role: 'man', pose: 'walk' },
                  { t: 'person', x: 194, y: G, s: 0.92, role: 'man', pose: 'walk' }
                ] },

    h7_memoria: { bg: 'plain', items: [
                  { t: 'ark',   x: 244, y: G, s: 1.05 },
                  { t: 'leo',   x: 74,  y: G, s: 0.62, pose: 'walk' },
                  { t: 'ursus', x: 140, y: G, s: 0.6,  pose: 'walk' }
                ] },

    /* ============ h8 — Dīluvium magnum ============ */

    h8_intus:   { bg: 'plain', items: [
                  { t: 'ark', x: 224, y: G, s: 1.1 }
                ],
                bubbles: [{ x: 84, y: 92, w: 72, h: 44, text: '👤👥', kind: 'thought', tail: 'right', fs: 20 }] },

    h8_pluvia:  { bg: 'stormSea', items: [
                  { t: 'ark',    x: 200, y: 214, s: 0.9 },
                  { t: 'ventus', x: 92,  y: 112, s: 0.9 },
                  { t: 'ventus', x: 306, y: 138, s: 0.8 }
                ],
                bubbles: [{ x: 200, y: 58, w: 62, h: 40, text: '🌧', kind: 'thought', tail: 'left', fs: 20 }] },

    h8_cadit:   { bg: 'stormSea', items: [
                  { t: 'ventus', x: 118, y: 108, s: 1 },
                  { t: 'ventus', x: 268, y: 146, s: 0.9 },
                  { t: 'ark',    x: 200, y: 216, s: 0.85 }
                ],
                bubbles: [{ x: 62, y: 62, w: 54, h: 40, text: '⬇', kind: 'thought', tail: 'right', fs: 22 }] },

    h8_aqua:    { bg: 'plain', items: [
                  { t: 'fons', x: 210, y: G, s: 1.5 },
                  { t: 'bush', x: 66,  y: G }
                ] },

    h8_crescit: { bg: 'sea', items: [
                  { t: 'mountain', x: 116, y: G, s: 0.5 },
                  { t: 'ark',      x: 288, y: 206, s: 0.75 }
                ],
                bubbles: [{ x: 216, y: 92, w: 62, h: 42, text: '💧⬆', kind: 'thought', tail: 'left', fs: 18 }] },

    h8_diluvium: { bg: 'stormSea', items: [
                  { t: 'ventus',   x: 88,  y: 110, s: 0.95 },
                  { t: 'mountain', x: 314, y: 240, s: 0.5 },
                  { t: 'ark',      x: 176, y: 214, s: 0.8 }
                ] },

    h8_operit:  { bg: 'sea', items: [
                  { t: 'mountain', x: 120, y: 236, s: 0.6 },
                  { t: 'ark',      x: 288, y: 204, s: 0.8 }
                ] },

    /* the water is already partway up it: the page says "aqua montem operit",
       and a dry peak would have contradicted its own sentence. v_mons keeps
       the mountain on dry land, so the CARD still teaches the plain noun. */
    h8_mons:    { bg: 'sea', items: [
                  { t: 'mountain', x: 200, y: 228, s: 0.95 }
                ] },

    h8_montes:  { bg: 'sea', items: [
                  { t: 'mountain', x: 92,  y: 240, s: 0.5 },
                  { t: 'mountain', x: 236, y: 244, s: 0.55 },
                  { t: 'mountain', x: 344, y: 238, s: 0.45 }
                ] },

    h8_natat:   { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 204, s: 1.05 }
                ] },

    h8_natat2:  { bg: 'sea', items: [
                  { t: 'ark',  x: 214, y: 206, s: 1 },
                  { t: 'star', x: 336, y: 74, s: 0.7 }
                ] },

    h8_natat3:  { bg: 'sea', items: [
                  { t: 'ark', x: 186, y: 208, s: 1.05 }
                ],
                bubbles: [{ x: 316, y: 92, w: 60, h: 42, text: '⬆🚢', kind: 'thought', tail: 'left', fs: 17 }] },

    h8_memoria: { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 206, s: 1.1 }
                ] },

    /* ============ h9 — Columba et rāmus ============ */

    h9_serenum: { bg: 'sea', items: [
                  { t: 'sol', x: 322, y: 68, s: 0.85 },
                  { t: 'ark', x: 186, y: 208, s: 1 }
                ] },

    h9_exspectat: { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 206, s: 1 }
                ],
                bubbles: [{ x: 92, y: 74, w: 56, h: 42, text: '⏳', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the raven stands ON the ark's roof: `crow` has no flying pose, and a
       bird with legs drawn in the open sky would be a lie the eye catches */
    h9_corvus:  { bg: 'sea', items: [
                  { t: 'ark',  x: 190, y: 208, s: 1 },
                  { t: 'crow', x: 190, y: 112, s: 1.15, pose: 'sad' }
                ] },

    h9_nonredit: { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 208, s: 1 }
                ],
                bubbles: [{ x: 92, y: 72, w: 66, h: 42, text: '↩🚫', kind: 'thought', tail: 'right', fs: 18 }] },

    h9_columba: { bg: 'sea', items: [
                  { t: 'ark',     x: 268, y: 208, s: 0.9 },
                  { t: 'columba', x: 120, y: 118, s: 1.2, pose: 'fly', flip: true }
                ] },

    h9_redit:   { bg: 'sea', items: [
                  { t: 'ark',     x: 252, y: 208, s: 0.9 },
                  { t: 'columba', x: 132, y: 126, s: 1.2, pose: 'fly' }
                ],
                bubbles: [{ x: 200, y: 76, w: 56, h: 40, text: '↩', kind: 'thought', tail: 'right', fs: 22 }] },

    h9_iterum:  { bg: 'sea', items: [
                  { t: 'ark', x: 200, y: 206, s: 1 }
                ],
                bubbles: [{ x: 92, y: 74, w: 62, h: 42, text: '⏳🔁', kind: 'thought', tail: 'right', fs: 17 }] },

    h9_volat2:  { bg: 'sea', items: [
                  { t: 'ark',     x: 288, y: 208, s: 0.85 },
                  { t: 'columba', x: 110, y: 112, s: 1.15, pose: 'fly', flip: true }
                ] },

    h9_ramus:   { bg: 'sea', items: [
                  { t: 'columba', x: 186, y: 122, s: 1.5, pose: 'fly', ramus: true }
                ] },

    h9_portat:  { bg: 'sea', items: [
                  { t: 'ark',     x: 292, y: 208, s: 0.85 },
                  { t: 'columba', x: 128, y: 124, s: 1.25, pose: 'fly', ramus: true }
                ] },

    h9_mons:    { bg: 'mountain', items: [
                  { t: 'ark', x: 232, y: 176, s: 0.85 }
                ] },

    h9_exeunt:  { bg: 'mountain', items: [
                  { t: 'ark',     x: 328, y: G, s: 0.85 },
                  { t: 'person',  x: 82,  y: G, s: 1, role: 'patriarch', pose: 'walk', flip: true },
                  { t: 'person',  x: 148, y: G, s: 0.92, role: 'man', pose: 'walk', flip: true },
                  { t: 'leo',     x: 226, y: G, s: 0.6, pose: 'walk', flip: true },
                  { t: 'columba', x: 260, y: 118, s: 0.7, pose: 'fly', flip: true }
                ] },

    h9_altare:  { bg: 'mountain', items: [
                  { t: 'altar',  x: 252, y: G, s: 1.05, flame: false },
                  { t: 'person', x: 120, y: G, s: 1, role: 'patriarch', pose: 'point' }
                ] },

    h9_donum:   { bg: 'mountain', items: [
                  { t: 'altar',  x: 248, y: G, s: 1.05, flame: true, smoke: true },
                  { t: 'person', x: 118, y: G, s: 1, role: 'patriarch', pose: 'kneel' }
                ] },

    /* THE FOEDUS. There is no rainbow actor in the library (reported), so
       the covenant is the altar, the radiance and the word — never a bow
       drawn from parts that would only look like one. */
    h9_promittit: { bg: 'mountain', items: [
                  { t: 'star',   x: 200, y: 80, s: 1.05 },
                  { t: 'altar',  x: 262, y: G, s: 0.95, flame: true, smoke: true },
                  { t: 'person', x: 118, y: G, s: 1, role: 'patriarch', pose: 'arms-up' }
                ] },

    h9_foedus:  { bg: 'mountain', items: [
                  { t: 'star',    x: 200, y: 78, s: 1 },
                  { t: 'person',  x: 128, y: G, s: 1, role: 'patriarch', pose: 'arms-up' },
                  { t: 'person',  x: 220, y: G, s: 0.92, role: 'man' },
                  { t: 'columba', x: 316, y: 122, s: 0.8, pose: 'fly', flip: true }
                ] },

    h9_memoria: { bg: 'mountain', items: [
                  { t: 'star',    x: 96,  y: 78, s: 0.85 },
                  { t: 'altar',   x: 288, y: G, s: 0.9 },
                  { t: 'columba', x: 150, y: 128, s: 1.2, pose: 'fly', ramus: true }
                ] },

    /* ============ h10 — Turris Babel ============ */

    h10_multi:  { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 124, y: G, s: 1 },
                  { t: 'crowdGroup', x: 282, y: G, s: 0.92 }
                ] },

    h10_lingua: { bg: 'plain', items: [
                  { t: 'crowdGroup', x: 200, y: G, s: 1.05 }
                ],
                bubbles: [{ x: 200, y: 64, w: 68, h: 42, text: '💬✔', kind: 'speech', tail: 'left', fs: 18 }] },

    h10_urbs:   { bg: 'plain', items: [
                  { t: 'cityWall',   x: 268, y: G, s: 0.85 },
                  { t: 'crowdGroup', x: 92,  y: G, s: 0.9 }
                ] },

    h10_turris: { bg: 'city', items: [
                  { t: 'turris',     x: 258, y: G, s: 0.95 },
                  { t: 'crowdGroup', x: 96,  y: G, s: 0.9 }
                ] },

    h10_alta:   { bg: 'plain', items: [
                  { t: 'turris', x: 200, y: G, s: 1.35 }
                ],
                bubbles: [{ x: 78, y: 86, w: 56, h: 42, text: '⬆', kind: 'thought', tail: 'right', fs: 22 }] },

    h10_caelum: { bg: 'plain', items: [
                  { t: 'turris', x: 212, y: G, s: 1.4 },
                  { t: 'sol',    x: 62,  y: 70, s: 0.7 }
                ],
                bubbles: [{ x: 322, y: 66, w: 58, h: 42, text: '⬆☁', kind: 'thought', tail: 'left', fs: 17 }] },

    h10_descendit: { bg: 'plain', items: [
                  { t: 'star',   x: 112, y: 144, s: 0.95 },
                  { t: 'turris', x: 276, y: G, s: 1.1 }
                ] },

    h10_videt:  { bg: 'city', items: [
                  { t: 'star',       x: 108, y: 158, s: 0.85 },
                  { t: 'turris',     x: 288, y: G, s: 0.95 },
                  { t: 'crowdGroup', x: 176, y: G, s: 0.85 }
                ] },

    h10_linguae: { bg: 'city', items: [
                  { t: 'turris',     x: 320, y: G, s: 0.75 },
                  { t: 'crowdGroup', x: 116, y: G, s: 1 },
                  { t: 'crowdGroup', x: 234, y: G, s: 0.92 }
                ],
                bubbles: [{ x: 66, y: 68, w: 56, h: 40, text: '💬', kind: 'speech', tail: 'right', fs: 19 },
                          { x: 186, y: 62, w: 56, h: 40, text: '🗨', kind: 'speech', tail: 'left', fs: 19 },
                          { x: 300, y: 74, w: 56, h: 40, text: '❓', kind: 'speech', tail: 'left', fs: 19 }] },

    h10_nonintellegunt: { bg: 'city', items: [
                  { t: 'crowdGroup', x: 130, y: G, s: 1 },
                  { t: 'crowdGroup', x: 276, y: G, s: 0.94 }
                ],
                bubbles: [{ x: 200, y: 66, w: 72, h: 44, text: '💬❓', kind: 'thought', tail: 'left', fs: 18 }] },

    h10_clamant: { bg: 'city', items: [
                  { t: 'crowdGroup', x: 130, y: G, s: 1 },
                  { t: 'crowdGroup', x: 276, y: G, s: 0.94 }
                ],
                bubbles: [{ x: 68, y: 68, w: 56, h: 40, text: '📢', kind: 'speech', tail: 'right', fs: 19 },
                          { x: 332, y: 68, w: 56, h: 40, text: '❓', kind: 'speech', tail: 'left', fs: 19 }] },

    /* Gn 11,8: "cessaverunt aedificare civitatem" — the tower is LEFT
       UNFINISHED, not thrown down. Nothing in this file breaks it. */
    h10_cessant: { bg: 'city', items: [
                  { t: 'turris',     x: 268, y: G, s: 0.95 },
                  { t: 'crowdGroup', x: 106, y: G, s: 0.9 }
                ],
                bubbles: [{ x: 180, y: 74, w: 66, h: 42, text: '🔨🚫', kind: 'thought', tail: 'right', fs: 18 }] },

    h10_discedunt: { bg: 'desert', items: [
                  { t: 'turris', x: 200, y: G, s: 0.55 },
                  { t: 'person', x: 74,  y: G, s: 0.95, role: 'man', pose: 'walk', flip: true },
                  { t: 'person', x: 320, y: G, s: 0.95, role: 'woman', pose: 'walk' }
                ] },

    h10_terrae: { bg: 'desert', items: [
                  { t: 'person', x: 62,  y: G, s: 0.9, role: 'man', pose: 'walk', flip: true },
                  { t: 'person', x: 138, y: G, s: 0.9, role: 'woman', pose: 'walk', flip: true },
                  { t: 'person', x: 262, y: G, s: 0.9, role: 'man', pose: 'walk' },
                  { t: 'person', x: 338, y: G, s: 0.9, role: 'woman', pose: 'walk' }
                ] },

    h10_memoria: { bg: 'desert', items: [
                  { t: 'turris', x: 200, y: G, s: 0.6 },
                  { t: 'person', x: 76,  y: G, s: 0.9, role: 'man', pose: 'walk', flip: true },
                  { t: 'person', x: 324, y: G, s: 0.9, role: 'man', pose: 'walk' }
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ h6 — HOMINĒS MALĪ ============
       fons Gn 6, 1–12. The wickedness is STYLIZED: quarrelling crowds,
       shouting, and men who do not listen. Gn 6,1–4 (the sons of God and
       the daughters of men, the giants) is OMITTED — it is neither
       tellable at S2 nor a scene for children; Gn 6,3 (the hundred and
       twenty years) and 6,7 (the resolve to destroy) are omitted too,
       so that the liber's first note is Noe's justice, not a threat.
       Nothing told here contradicts 6,5 ("multa malitia hominum") or
       6,9 ("Noe vir justus atque perfectus"). */
    {
      id: 'h6',
      titulus: 'Hominēs Malī',
      icon: '👥💢',
      numerus: 'VI',
      pos: { x: 0.28, y: 0.87 },
      fons: 'Gn 6, 1–12',
      vocab: [
        { la: 'vir',    scene: SC.v_vir,    pars: 'nomen' },
        { la: 'fīlius', scene: SC.v_filius, pars: 'nomen' },
        { la: 'Noe',    scene: SC.v_noe,    pars: 'nomen' },
        { la: 'multus', scene: SC.v_multi,  pars: 'adiectivum' },
        { la: 'malus',  scene: SC.v_malus,  pars: 'adiectivum' },
        { la: 'iūstus', scene: SC.v_iustus, pars: 'adiectivum' },
        { la: 'clāmat', scene: SC.v_clamat, pars: 'verbum' },
        { la: 'audit',  scene: SC.v_audit,  pars: 'verbum' }
      ],
      story: [
        /* Gn 6,1 — and the S2 target, PICTURED before it is asserted */
        { la: 'Ecce multī hominēs! Hominēs in terrā sunt.', scene: SC.h6_multi,
          nova: [{ w: 'hominēs', e: '👥', g: 'ūnus homō, multī hominēs' },
                 { w: 'multī', e: '👥👥', g: 'nōn ūnus' }] },

        /* Gn 6,5 */
        { la: 'Hominēs malī sunt.', scene: SC.h6_mali,
          nova: [{ w: 'malī', e: '💢', g: '↔ bonī' }] },

        { la: 'Multī hominēs clāmant.', scene: SC.h6_clamant,
          nova: [{ w: 'clāmant', e: '📢', g: 'clāmat, clāmant' }] },

        { la: 'Malī hominēs clāmant et nōn audiunt.', scene: SC.h6_surdi,
          nova: [{ w: 'audiunt', e: '👂', g: 'audit, audiunt' }] },

        { la: 'Deus multōs hominēs videt. Hominēs clāmant.', scene: SC.h6_videt },

        /* Gn 6,8–9 */
        { la: 'Sed Noe iūstus est.', scene: SC.h6_noe,
          nova: [{ w: 'Noe', e: '👤', g: '' },
                 { w: 'iūstus', e: '👍', g: '↔ malus' }] },

        /* Gn 6,9 — "Noe vir justus" */
        { la: 'Noe vir iūstus est. Noe vir bonus est.', scene: SC.h6_vir,
          nova: [{ w: 'vir', e: '👤', g: '' }] },

        /* Gn 6,22 — "Fecit igitur Noe omnia quae praeceperat illi Deus" */
        { la: 'Noe Deum audit. Noe Deum semper audit.', scene: SC.h6_audit },

        /* Gn 6,10 — Sem, Cham et Iapheth; the names wait for a later liber */
        { la: 'Noe fīliōs vocat. Ecce fīliī!', scene: SC.h6_filii,
          nova: [{ w: 'fīliōs', e: '👥', g: 'fīlius, fīliī, fīliōs' }] },

        { la: 'Fīliī quoque iūstī sunt.', scene: SC.h6_filii2 },

        { la: 'Deus virum iūstum videt.', scene: SC.h6_iustus },

        /* memoriā tenē */
        { la: 'Memoriā tenē: hominēs malī sunt, Noe iūstus.', scene: SC.h6_memoria,
          ttsText: 'Homines mali sunt, Noe iustus.' }
      ],
      ludus: {
        words: [
          { la: 'vir',    scene: SC.v_vir,    emoji: '👤' },
          { la: 'fīlius', scene: SC.v_filius, emoji: '👥' },
          { la: 'Noe',    scene: SC.v_noe,    emoji: '👤' },
          { la: 'clāmat', scene: SC.v_clamat, emoji: '📢' },
          { la: 'iūstus', scene: SC.v_iustus, emoji: '👍' },
          { la: 'malus',  scene: SC.v_malus,  emoji: '💢' }
        ]
      },
      /* SONUS: vir / Noe / fīlius are three robed men, and multus / malus /
         clāmat are three crowds. One of each family per set, never two
         (LATIN-STYLE §4: a distractor must be wrong IN THE PICTURE). */
      sonus: [
        { la: 'Noe',
          answer: { la: 'Noe', scene: SC.v_noe },
          options: [{ la: 'Noe', scene: SC.v_noe },
                    { la: 'multus', scene: SC.v_multi },
                    { la: 'arca', scene: SC.v_arca }] },
        { la: 'clāmat',
          answer: { la: 'clāmat', scene: SC.v_clamat },
          options: [{ la: 'clāmat', scene: SC.v_clamat },
                    { la: 'Noe', scene: SC.v_noe },
                    { la: 'audit', scene: SC.v_audit },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'audit',
          answer: { la: 'audit', scene: SC.v_audit },
          options: [{ la: 'audit', scene: SC.v_audit },
                    { la: 'clāmat', scene: SC.v_clamat },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'fīlius',
          answer: { la: 'fīlius', scene: SC.v_filius },
          options: [{ la: 'fīlius', scene: SC.v_filius },
                    { la: 'clāmat', scene: SC.v_clamat },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'arca', scene: SC.v_arca }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Noe',    scene: SC.v_noe },
            { la: 'fīlius', scene: SC.v_filius },
            { la: 'multus', scene: SC.v_multi },
            { la: 'malus',  scene: SC.v_malus },
            { la: 'iūstus', scene: SC.v_iustus },
            { la: 'clāmat', scene: SC.v_clamat }
          ],
          scrambles: [
            { la: 'Hominēs malī sunt.',      scene: SC.h6_mali },
            { la: 'Multī hominēs clāmant.',  scene: SC.h6_clamant },
            { la: 'Noe vir iūstus est.',     scene: SC.h6_vir },
            { la: 'Noe Deum audit.',         scene: SC.h6_audit }
          ]
        },
        corrige: [
          { words: ['Hominēs', 'bonī', 'sunt.'], wrong: 1,
            options: ['malī', 'iūstī', 'multī'], correct: 0, scene: SC.h6_mali },
          { words: ['Multī', 'hominēs', 'dormiunt.'], wrong: 2,
            options: ['clāmant.', 'audiunt.', 'labōrant.'], correct: 0, scene: SC.h6_clamant },
          { words: ['Noe', 'vir', 'malus', 'est.'], wrong: 2,
            options: ['iūstus', 'multus', 'īrātus'], correct: 0, scene: SC.h6_vir },
          { words: ['Noe', 'Deum', 'vocat.'], wrong: 2,
            options: ['audit.', 'vetat.', 'creat.'], correct: 0, scene: SC.h6_audit },
          { words: ['Noe', 'animālia', 'vocat.'], wrong: 1,
            options: ['fīliōs', 'hominēs', 'montēs'], correct: 0, scene: SC.h6_filii }
        ],
        comple: [
          { text: 'Ecce multī homin___!', options: ['ēs', 'em', 'is'], correct: 0, scene: SC.h6_multi },
          { text: 'Hominēs ___ sunt.', options: ['malī', 'malus', 'malum'], correct: 0, scene: SC.h6_mali },
          { text: 'Multī hominēs ___.', options: ['clāmant', 'clāmat', 'audit'], correct: 0, scene: SC.h6_clamant },
          { text: 'Sed Noe ___ est.', options: ['iūstus', 'malus', 'multus'], correct: 0, scene: SC.h6_noe },
          { text: 'Noe ___ iūstus est.', options: ['vir', 'virum', 'virī'], correct: 0, scene: SC.h6_vir },
          { text: 'Noe fīli___ vocat.', options: ['ōs', 'us', 'ī'], correct: 0, scene: SC.h6_filii }
        ]
      }
    },

    /* ============ h7 — ARCA AEDIFICĀTUR ============
       fons Gn 6,13–22 · 7,1–9. The building sequence, then the gathering.
       OMITTED: the ark's measurements (6,15), the pitch (6,14), the clean
       and unclean sevens (7,2) — numbers and distinctions that would cost
       the whole lexeme budget and teach nothing at S2. What is kept is
       exactly what the Vulgate keeps repeating: Noe builds, the creatures
       go in two by two, Noe and his household go in after them. */
    {
      id: 'h7',
      titulus: 'Arca Aedificātur',
      icon: '🚢🔨',
      numerus: 'VII',
      pos: { x: 0.72, y: 0.72 },
      fons: 'Gn 6, 13–22 · 7, 1–9',
      vocab: [
        { la: 'arca',      scene: SC.v_arca,      pars: 'nomen' },
        { la: 'lignum',    scene: SC.v_lignum,    pars: 'nomen' },
        { la: 'leō',       scene: SC.v_leo,       pars: 'nomen' },
        { la: 'ursus',     scene: SC.v_ursus,     pars: 'nomen' },
        { la: 'equus',     scene: SC.v_equus,     pars: 'nomen' },
        { la: 'columba',   scene: SC.v_columba,   pars: 'nomen' },
        { la: 'aedificat', scene: SC.v_aedificat, pars: 'verbum' },
        { la: 'intrat',    scene: SC.v_intrat,    pars: 'verbum' }
      ],
      story: [
        /* Gn 6,13 */
        { la: 'Deus Noe vocat. Noe audit.', scene: SC.h7_vocat },

        /* Gn 6,14 — "Fac tibi arcam" */
        { la: 'Noe arcam aedificat.', scene: SC.h7_aedificat,
          nova: [{ w: 'arcam', e: '🚢', g: 'arca, arcam' },
                 { w: 'aedificat', e: '🔨', g: '' }] },

        { la: 'Ecce arca! Arca in terrā est.', scene: SC.h7_arca,
          nova: [{ w: 'arca', e: '🚢', g: '' }] },

        /* Gn 6,14 — "de lignis laevigatis" */
        { la: 'In terrā lignum est. Noe lignum videt.', scene: SC.h7_lignum,
          nova: [{ w: 'lignum', e: '🌳➡🚢', g: 'arca lignum est' }] },

        { la: 'Fīliī lignum dant; Noe arcam aedificat.', scene: SC.h7_lignum2 },

        { la: 'Noe et fīliī arcam aedificant.', scene: SC.h7_omnes },

        /* Gn 6,19–20 · 7,8–9 */
        { la: 'Noe animālia vocat.', scene: SC.h7_animalia,
          nova: [{ w: 'animālia', e: '🐾🐾', g: 'ūnum animal, multa animālia' }] },

        { la: 'Ecce leō! Leō in arcam intrat.', scene: SC.h7_leo,
          nova: [{ w: 'leō', e: '🦁', g: '' },
                 { w: 'intrat', e: '➡🚪', g: '↔ exit' }] },

        { la: 'Ecce ursus! Ursus quoque in arcam intrat.', scene: SC.h7_ursus,
          nova: [{ w: 'ursus', e: '🐻', g: '' }] },

        { la: 'Ecce equus! Equus quoque intrat.', scene: SC.h7_equus,
          nova: [{ w: 'equus', e: '🐴', g: '' }] },

        { la: 'Ecce columba! Columba quoque intrat.', scene: SC.h7_columba,
          nova: [{ w: 'columba', e: '🐦', g: 'columba avis est' }] },

        { la: 'Leō et ursus in arcā sunt.', scene: SC.h7_intus1 },

        { la: 'Equus et columba quoque in arcā sunt.', scene: SC.h7_intus2 },

        /* Gn 7,7 */
        { la: 'Noe et fīliī quoque intrant.', scene: SC.h7_noe },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Noe arcam aedificat; animālia intrant.',
          scene: SC.h7_memoria,
          ttsText: 'Noe arcam aedificat; animalia intrant.' }
      ],
      ludus: {
        words: [
          { la: 'arca',    scene: SC.v_arca,    emoji: '🚢' },
          { la: 'leō',     scene: SC.v_leo,     emoji: '🦁' },
          { la: 'ursus',   scene: SC.v_ursus,   emoji: '🐻' },
          { la: 'equus',   scene: SC.v_equus,   emoji: '🐴' },
          { la: 'columba', scene: SC.v_columba, emoji: '🐦' },
          { la: 'lignum',  scene: SC.v_lignum,  emoji: '🌳' }
        ]
      },
      sonus: [
        { la: 'leō',
          answer: { la: 'leō', scene: SC.v_leo },
          options: [{ la: 'leō', scene: SC.v_leo },
                    { la: 'ursus', scene: SC.v_ursus },
                    { la: 'columba', scene: SC.v_columba }] },
        { la: 'ursus',
          answer: { la: 'ursus', scene: SC.v_ursus },
          options: [{ la: 'ursus', scene: SC.v_ursus },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'leō', scene: SC.v_leo },
                    { la: 'arca', scene: SC.v_arca }] },
        { la: 'columba',
          answer: { la: 'columba', scene: SC.v_columba },
          options: [{ la: 'columba', scene: SC.v_columba },
                    { la: 'equus', scene: SC.v_equus },
                    { la: 'lignum', scene: SC.v_lignum }] },
        { la: 'arca',
          answer: { la: 'arca', scene: SC.v_arca },
          options: [{ la: 'arca', scene: SC.v_arca },
                    { la: 'lignum', scene: SC.v_lignum },
                    { la: 'leō', scene: SC.v_leo },
                    { la: 'equus', scene: SC.v_equus }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'arca',    scene: SC.v_arca },
            { la: 'lignum',  scene: SC.v_lignum },
            { la: 'leō',     scene: SC.v_leo },
            { la: 'ursus',   scene: SC.v_ursus },
            { la: 'equus',   scene: SC.v_equus },
            { la: 'columba', scene: SC.v_columba }
          ],
          scrambles: [
            { la: 'Noe arcam aedificat.',      scene: SC.h7_aedificat },
            { la: 'Arca in terrā est.',        scene: SC.h7_arca },
            { la: 'Leō in arcam intrat.',      scene: SC.h7_leo },
            { la: 'Leō et ursus in arcā sunt.', scene: SC.h7_intus1 }
          ]
        },
        corrige: [
          { words: ['Noe', 'turrim', 'aedificat.'], wrong: 1,
            options: ['arcam', 'lignum', 'arborem'], correct: 0, scene: SC.h7_aedificat },
          { words: ['Ursus', 'in', 'arcam', 'intrat.'], wrong: 0,
            options: ['Leō', 'Columba', 'Equus'], correct: 0, scene: SC.h7_leo },
          { words: ['Equus', 'in', 'arcam', 'intrat.'], wrong: 0,
            options: ['Ursus', 'Leō', 'Columba'], correct: 0, scene: SC.h7_ursus },
          { words: ['Leō', 'et', 'columba', 'in', 'arcā', 'sunt.'], wrong: 2,
            options: ['ursus', 'equus', 'homō'], correct: 0, scene: SC.h7_intus1 },
          { words: ['Noe', 'et', 'fīliī', 'exeunt.'], wrong: 3,
            options: ['intrant.', 'clāmant.', 'dormiunt.'], correct: 0, scene: SC.h7_noe }
        ],
        comple: [
          { text: 'Noe arc___ aedificat.', options: ['am', 'ae', 'ā'], correct: 0, scene: SC.h7_aedificat },
          { text: 'Arca in terrā ___.', options: ['est', 'sunt', 'intrat'], correct: 0, scene: SC.h7_arca },
          { text: 'Noe lignum ___.', options: ['videt', 'intrat', 'clāmat'], correct: 0, scene: SC.h7_lignum },
          { text: 'Ecce ___! Leō in arcam intrat.', options: ['leō', 'ursus', 'equus'], correct: 0, scene: SC.h7_leo },
          { text: 'Ursus in arc___ intrat.', options: ['am', 'ā', 'ae'], correct: 0, scene: SC.h7_ursus },
          { text: 'Leō et ursus in arcā ___.', options: ['sunt', 'est', 'intrat'], correct: 0, scene: SC.h7_intus1 }
        ]
      }
    },

    /* ============ h8 — DĪLUVIUM MAGNUM ============
       fons Gn 7, 10–24. THE CAMERA STAYS ON THE ARK.
       Gn 7,21–23 — every living thing on the dry land dies — is OMITTED
       in full: not softened, not renamed, simply not told (DESIGN §8,
       "omit, never alter"). The liber's own facts are complete without
       it: the rain, the rising water, the covered mountains, the ark
       carried on the face of the waters (7,18 "porro arca ferebatur
       super aquas"). Every picture in this capitulum contains the ark or
       the water, and no picture contains a person in danger. */
    {
      id: 'h8',
      titulus: 'Dīluvium Magnum',
      icon: '🌊🚢',
      numerus: 'VIII',
      pos: { x: 0.26, y: 0.57 },
      fons: 'Gn 7, 10–24',
      vocab: [
        { la: 'pluvia',    scene: SC.v_pluvia,    pars: 'nomen' },
        { la: 'aqua',      scene: SC.v_aqua,      pars: 'nomen' },
        { la: 'dīluvium',  scene: SC.v_diluvium,  pars: 'nomen' },
        { la: 'mōns',      scene: SC.v_mons,      pars: 'nomen' },
        { la: 'cadit',     scene: SC.v_cadit,     pars: 'verbum' },
        { la: 'crēscit',   scene: SC.v_crescit,   pars: 'verbum' },
        { la: 'operit',    scene: SC.v_operit,    pars: 'verbum' },
        { la: 'natat',     scene: SC.v_natat,     pars: 'verbum' }
      ],
      story: [
        /* Gn 7,7 · 7,16 */
        { la: 'Noe in arcā est. Fīliī quoque in arcā sunt.', scene: SC.h8_intus },

        /* Gn 7,12 — "facta est pluvia super terram" */
        { la: 'Ecce pluvia! Pluvia cadit.', scene: SC.h8_pluvia,
          nova: [{ w: 'pluvia', e: '🌧', g: 'aqua ē caelō' },
                 { w: 'cadit', e: '⬇', g: '' }] },

        { la: 'Pluvia in terram cadit.', scene: SC.h8_cadit },

        { la: 'Ecce aqua! Aqua in terrā est.', scene: SC.h8_aqua,
          nova: [{ w: 'aqua', e: '💧', g: '' }] },

        /* Gn 7,17–18 — "multiplicatae sunt aquae … vehementer inundaverunt" */
        { la: 'Aqua crēscit.', scene: SC.h8_crescit,
          nova: [{ w: 'crēscit', e: '💧⬆', g: 'iam parva, iam magna' }] },

        { la: 'Aqua semper crēscit. Ecce dīluvium!', scene: SC.h8_diluvium,
          nova: [{ w: 'dīluvium', e: '🌊', g: 'aqua omnem terram operit' }] },

        { la: 'Dīluvium terram operit.', scene: SC.h8_operit,
          nova: [{ w: 'operit', e: '🌊➡🌍', g: '' }] },

        /* Gn 7,19–20 — "operti sunt omnes montes excelsi" */
        { la: 'Ecce mōns! Aqua montem operit.', scene: SC.h8_mons,
          nova: [{ w: 'mōns', e: '⛰', g: 'mōns, montem, montēs' }] },

        { la: 'Dīluvium montēs operit.', scene: SC.h8_montes },

        /* Gn 7,18 — "porro arca ferebatur super aquas" */
        { la: 'Sed arca natat.', scene: SC.h8_natat,
          nova: [{ w: 'natat', e: '🚢💧', g: 'nōn cadit' }] },

        { la: 'Arca in aquā natat. Noe in arcā est.', scene: SC.h8_natat2 },

        { la: 'Arca nōn cadit; arca natat.', scene: SC.h8_natat3 },

        /* memoriā tenē */
        { la: 'Memoriā tenē: aqua crēscit; sed arca natat.', scene: SC.h8_memoria,
          ttsText: 'Aqua crescit; sed arca natat.' }
      ],
      ludus: {
        words: [
          { la: 'pluvia',   scene: SC.v_pluvia,   emoji: '🌧' },
          { la: 'aqua',     scene: SC.v_aqua,     emoji: '💧' },
          { la: 'mōns',     scene: SC.v_mons,     emoji: '⛰' },
          { la: 'dīluvium', scene: SC.v_diluvium, emoji: '🌊' },
          { la: 'arca',     scene: SC.v_arca,     emoji: '🚢' },
          { la: 'columba',  scene: SC.v_columba,  emoji: '🐦' }
        ]
      },
      /* SONUS: pluvia, cadit and dīluvium are all the storm sky, and
         crēscit / operit are the same mountain in the same water. Only one
         of each family per set. */
      sonus: [
        { la: 'mōns',
          answer: { la: 'mōns', scene: SC.v_mons },
          options: [{ la: 'mōns', scene: SC.v_mons },
                    { la: 'aqua', scene: SC.v_aqua },
                    { la: 'arca', scene: SC.v_arca }] },
        { la: 'aqua',
          answer: { la: 'aqua', scene: SC.v_aqua },
          options: [{ la: 'aqua', scene: SC.v_aqua },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'arca', scene: SC.v_arca },
                    { la: 'pluvia', scene: SC.v_pluvia }] },
        { la: 'pluvia',
          answer: { la: 'pluvia', scene: SC.v_pluvia },
          options: [{ la: 'pluvia', scene: SC.v_pluvia },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'aqua', scene: SC.v_aqua }] },
        { la: 'natat',
          answer: { la: 'natat', scene: SC.v_natat },
          options: [{ la: 'natat', scene: SC.v_natat },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'aqua', scene: SC.v_aqua },
                    { la: 'pluvia', scene: SC.v_pluvia }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'pluvia',   scene: SC.v_pluvia },
            { la: 'aqua',     scene: SC.v_aqua },
            { la: 'mōns',     scene: SC.v_mons },
            { la: 'dīluvium', scene: SC.v_diluvium },
            { la: 'natat',    scene: SC.v_natat },
            { la: 'crēscit',  scene: SC.v_crescit }
          ],
          scrambles: [
            { la: 'Pluvia in terram cadit.', scene: SC.h8_cadit },
            { la: 'Aqua crēscit.',           scene: SC.h8_crescit },
            { la: 'Dīluvium montēs operit.', scene: SC.h8_montes },
            { la: 'Arca in aquā natat.',     scene: SC.h8_natat2 }
          ]
        },
        corrige: [
          { words: ['Ecce', 'arca!', 'Pluvia', 'cadit.'], wrong: 1,
            options: ['pluvia!', 'mōns!', 'aqua!'], correct: 0, scene: SC.h8_pluvia },
          { words: ['Aqua', 'cadit.'], wrong: 1,
            options: ['crēscit.', 'natat.', 'intrat.'], correct: 0, scene: SC.h8_crescit },
          { words: ['Dīluvium', 'montēs', 'aedificat.'], wrong: 2,
            options: ['operit.', 'natat.', 'audit.'], correct: 0, scene: SC.h8_montes },
          { words: ['Arca', 'in', 'aquā', 'cadit.'], wrong: 3,
            options: ['natat.', 'crēscit.', 'operit.'], correct: 0, scene: SC.h8_natat2 },
          { words: ['Leō', 'in', 'arcā', 'est.'], wrong: 0,
            options: ['Noe', 'Pluvia', 'Mōns'], correct: 0, scene: SC.h8_natat2 }
        ],
        comple: [
          { text: 'Ecce ___! Pluvia cadit.', options: ['pluvia', 'mōns', 'arca'], correct: 0, scene: SC.h8_pluvia },
          { text: 'Pluvia in terr___ cadit.', options: ['am', 'ā', 'ae'], correct: 0, scene: SC.h8_cadit },
          { text: 'Aqua ___.', options: ['crēscit', 'cadit', 'natat'], correct: 0, scene: SC.h8_crescit },
          { text: 'Aqua mont___ operit.', options: ['em', 'ēs', 'is'], correct: 0, scene: SC.h8_mons },
          { text: 'Dīluvium mont___ operit.', options: ['ēs', 'em', 'is'], correct: 0, scene: SC.h8_montes },
          { text: 'Sed arca ___.', options: ['natat', 'cadit', 'crēscit'], correct: 0, scene: SC.h8_natat }
        ]
      }
    },

    /* ============ h9 — COLUMBA ET RĀMUS ============
       fons Gn 8 (+ 9,8–17 for the promise). The raven "egrediebatur, et
       non revertebatur" (8,7) is told with the S1 verb exit, so the dove
       can own volat; the dove goes out, comes back, goes out again, and
       the third time brings the olive branch (8,8–11).
       MISSING ART (reported, not substituted): the bow in the clouds
       (9,13). There is no rainbow actor, so the covenant is the altar
       (8,20), the radiance and 'Deus prōmittit' — Gn 9,11's own content
       ("nequaquam ultra … diluvium") rendered as 'aqua iam nōn crēscit'.
       The bow is neither drawn nor named, so nothing false is shown.
       OMITTED: the dates and month-counts of 8,3–14, and Gn 9,20–27
       (Noe's vineyard) entirely — DESIGN §8. */
    {
      id: 'h9',
      titulus: 'Columba et Rāmus',
      icon: '🐦🌿',
      numerus: 'IX',
      pos: { x: 0.70, y: 0.42 },
      fons: 'Gn 8 · 9, 8–17',
      vocab: [
        { la: 'corvus',     scene: SC.v_corvus,    pars: 'nomen' },
        { la: 'rāmus',      scene: SC.v_ramus,     pars: 'nomen' },
        { la: 'altāre',     scene: SC.v_altare,    pars: 'nomen' },
        { la: 'volat',      scene: SC.v_volat,     pars: 'verbum' },
        { la: 'redit',      scene: SC.v_redit,     pars: 'verbum' },
        { la: 'portat',     scene: SC.v_portat,    pars: 'verbum' },
        { la: 'exspectat',  scene: SC.v_exspectat, pars: 'verbum' },
        { la: 'prōmittit',  scene: SC.v_promittit, pars: 'verbum' }
      ],
      story: [
        /* Gn 8,2 */
        { la: 'Pluvia iam nōn cadit.', scene: SC.h9_serenum },

        /* Gn 8,6 · 8,10 — "expectatis autem ultra septem diebus" */
        { la: 'Noe exspectat. Noe aquam videt.', scene: SC.h9_exspectat,
          nova: [{ w: 'exspectat', e: '⏳', g: 'iam nōn labōrat, sedet' }] },

        /* Gn 8,7 — "dimisit corvum, qui egrediebatur" */
        { la: 'Ecce corvus! Corvus exit.', scene: SC.h9_corvus,
          nova: [{ w: 'corvus', e: '🐦', g: 'corvus in arcā est' }] },

        /* Gn 8,7 — "et non revertebatur" */
        { la: 'Corvus nōn redit.', scene: SC.h9_nonredit,
          nova: [{ w: 'redit', e: '↩', g: 'exit, tum redit' }] },

        /* Gn 8,8 */
        { la: 'Tum columba volat.', scene: SC.h9_columba,
          nova: [{ w: 'volat', e: '🐦⬆', g: 'in caelō est' }] },

        /* Gn 8,9 — "reversa est ad eum in arcam" */
        { la: 'Sed columba redit: in terrā aqua est.', scene: SC.h9_redit },

        /* Gn 8,10 */
        { la: 'Noe iterum exspectat.', scene: SC.h9_iterum,
          nova: [{ w: 'iterum', e: '🔁', g: '' }] },

        { la: 'Posteā columba iterum volat et redit.', scene: SC.h9_volat2 },

        /* Gn 8,11 — "portans ramum olivae virentibus foliis in ore suo" */
        { la: 'Ecce rāmus! Columba volat et rāmum portat.', scene: SC.h9_ramus,
          nova: [{ w: 'rāmus', e: '🌿', g: 'rāmus arboris pars est' },
                 { w: 'portat', e: '🐦🌿', g: 'tenet et volat' }] },

        { la: 'Noe rāmum videt: columba rāmum portat.', scene: SC.h9_portat },

        /* Gn 8,4 — "requievitque arca … super montes Armeniae" */
        { la: 'Noe iam nōn exspectat. Arca in monte est.', scene: SC.h9_mons },

        /* Gn 8,18–19 */
        { la: 'Noe et fīliī et animālia exeunt.', scene: SC.h9_exeunt },

        /* Gn 8,20 — "aedificavit autem Noe altare Domino" */
        { la: 'Noe altāre aedificat.', scene: SC.h9_altare,
          nova: [{ w: 'altāre', e: '🔥', g: 'in altārī dōnum ārdet' }] },

        { la: 'Ecce altāre! Noe in altārī dōnum dat.', scene: SC.h9_donum },

        /* Gn 8,21 · 9,11 — the covenant, without the bow (see the header) */
        /* colon, not full stop: what follows IS the promise, and the two
           covenant pages are deliberately parallel (audit ruling) */
        { la: 'Deus prōmittit: aqua iam nōn crēscit.', scene: SC.h9_promittit,
          nova: [{ w: 'prōmittit', e: '🤝', g: 'Deus dīcit et facit' }] },

        { la: 'Deus prōmittit: dīluvium iam nōn est.', scene: SC.h9_foedus },

        /* memoriā tenē */
        { la: 'Memoriā tenē: columba rāmum portat; Deus prōmittit.',
          scene: SC.h9_memoria,
          ttsText: 'Columba ramum portat; Deus promittit.' }
      ],
      ludus: {
        words: [
          { la: 'corvus',    scene: SC.v_corvus,  emoji: '🐦' },
          { la: 'rāmus',     scene: SC.v_ramus,   emoji: '🌿' },
          { la: 'altāre',    scene: SC.v_altare,  emoji: '🔥' },
          { la: 'columba',   scene: SC.v_columba, emoji: '🐦' },
          { la: 'arca',      scene: SC.v_arca,    emoji: '🚢' },
          { la: 'mōns',      scene: SC.v_mons,    emoji: '⛰' }
        ]
      },
      /* SONUS: corvus and columba are both a bird over the ark, and volat /
         redit / portat are all the dove in flight. One per set, never two. */
      sonus: [
        { la: 'altāre',
          answer: { la: 'altāre', scene: SC.v_altare },
          options: [{ la: 'altāre', scene: SC.v_altare },
                    { la: 'arca', scene: SC.v_arca },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'rāmus',
          answer: { la: 'rāmus', scene: SC.v_ramus },
          options: [{ la: 'rāmus', scene: SC.v_ramus },
                    { la: 'altāre', scene: SC.v_altare },
                    { la: 'arca', scene: SC.v_arca },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'corvus',
          answer: { la: 'corvus', scene: SC.v_corvus },
          options: [{ la: 'corvus', scene: SC.v_corvus },
                    { la: 'altāre', scene: SC.v_altare },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'exspectat',
          answer: { la: 'exspectat', scene: SC.v_exspectat },
          options: [{ la: 'exspectat', scene: SC.v_exspectat },
                    { la: 'altāre', scene: SC.v_altare },
                    { la: 'rāmus', scene: SC.v_ramus },
                    { la: 'mōns', scene: SC.v_mons }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'corvus',    scene: SC.v_corvus },
            { la: 'rāmus',     scene: SC.v_ramus },
            { la: 'altāre',    scene: SC.v_altare },
            { la: 'volat',     scene: SC.v_volat },
            { la: 'exspectat', scene: SC.v_exspectat },
            { la: 'prōmittit', scene: SC.v_promittit }
          ],
          scrambles: [
            { la: 'Corvus nōn redit.',        scene: SC.h9_nonredit },
            { la: 'Tum columba volat.',       scene: SC.h9_columba },
            { la: 'Columba rāmum portat.',    scene: SC.h9_portat },
            { la: 'Noe altāre aedificat.',    scene: SC.h9_altare }
          ]
        },
        corrige: [
          { words: ['Columba', 'nōn', 'redit.'], wrong: 0,
            options: ['Corvus', 'Noe', 'Arca'], correct: 0, scene: SC.h9_nonredit },
          { words: ['Tum', 'columba', 'natat.'], wrong: 2,
            options: ['volat.', 'aedificat.', 'exspectat.'], correct: 0, scene: SC.h9_columba },
          { words: ['Columba', 'lignum', 'portat.'], wrong: 1,
            options: ['rāmum', 'montem', 'arcam'], correct: 0, scene: SC.h9_portat },
          { words: ['Noe', 'arcam', 'aedificat.'], wrong: 1,
            options: ['altāre', 'rāmum', 'montem'], correct: 0, scene: SC.h9_altare },
          { words: ['Arca', 'in', 'aquā', 'est.'], wrong: 2,
            options: ['monte', 'caelō', 'agrō'], correct: 0, scene: SC.h9_mons }
        ],
        comple: [
          { text: 'Ecce ___! Corvus exit.', options: ['corvus', 'columba', 'rāmus'], correct: 0, scene: SC.h9_corvus },
          { text: 'Corvus nōn ___.', options: ['redit', 'volat', 'portat'], correct: 0, scene: SC.h9_nonredit },
          { text: 'Tum columba ___.', options: ['volat', 'natat', 'crēscit'], correct: 0, scene: SC.h9_columba },
          { text: 'Columba rām___ portat.', options: ['um', 'us', 'ī'], correct: 0, scene: SC.h9_portat },
          { text: 'Noe ___ aedificat.', options: ['altāre', 'rāmum', 'montem'], correct: 0, scene: SC.h9_altare },
          { text: 'Deus ___.', options: ['prōmittit', 'exspectat', 'operit'], correct: 0, scene: SC.h9_promittit }
        ]
      }
    },

    /* ============ h10 — TURRIS BABEL ============
       fons Gn 11, 1–9. PLAYFUL CONFUSION, NOT FEAR: nobody is hurt, the
       tower is not thrown down (11,8 says only "cessaverunt aedificare"),
       and the last picture is a road, not a ruin.
       OMITTED: the bricks and bitumen of 11,3 — `later` has no actor and
       an emoji-only card would be the weakest picture in the liber; and
       the name Babel itself (11,9), because the explanation of the name
       is a pun on a Hebrew word that no picture can carry. The tower is
       "turris" throughout, and the capitulum's TITLE keeps Babel.
       'urbs' stands for the Vulgate's "civitas" — a synonym, not a
       different fact.
       Gn 11,7's "confundamus linguam eorum" is told as the plain thing it
       is: one tongue becomes many, and the men stop understanding. */
    {
      id: 'h10',
      titulus: 'Turris Babel',
      icon: '🗼💬',
      numerus: 'X',
      pos: { x: 0.30, y: 0.28 },
      fons: 'Gn 11, 1–9',
      vocab: [
        { la: 'turris',     scene: SC.v_turris,     pars: 'nomen' },
        { la: 'urbs',       scene: SC.v_urbs,       pars: 'nomen' },
        { la: 'lingua',     scene: SC.v_lingua,     pars: 'nomen' },
        { la: 'altus',      scene: SC.v_altus,      pars: 'adiectivum' },
        { la: 'intellegit', scene: SC.v_intellegit, pars: 'verbum' },
        { la: 'dēscendit',  scene: SC.v_descendit,  pars: 'verbum' },
        { la: 'discēdit',   scene: SC.v_discedit,   pars: 'verbum' }
      ],
      story: [
        { la: 'Ecce multī hominēs!', scene: SC.h10_multi },

        /* Gn 11,1 — "erat autem terra labii unius" */
        { la: 'Ūna lingua est. Hominēs intellegunt.', scene: SC.h10_lingua,
          nova: [{ w: 'ūna', e: '1️⃣', g: 'nōn multae' },
                 { w: 'lingua', e: '💬', g: '' },
                 { w: 'intellegunt', e: '💬✔', g: 'intellegit, intellegunt' }] },

        /* Gn 11,4 — "faciamus nobis civitatem et turrim" */
        { la: 'Ecce urbs! Hominēs urbem aedificant.', scene: SC.h10_urbs,
          nova: [{ w: 'urbs', e: '🏛', g: 'multae domūs' }] },

        { la: 'Hominēs turrim aedificant.', scene: SC.h10_turris,
          nova: [{ w: 'turrim', e: '🗼', g: 'turris, turrim' }] },

        { la: 'Turris alta est.', scene: SC.h10_alta,
          nova: [{ w: 'alta', e: '⬆', g: 'altus, alta' }] },

        /* Gn 11,4 — "cujus culmen pertingat ad caelum" */
        { la: 'Turris alta in caelum crēscit.', scene: SC.h10_caelum },

        /* Gn 11,5 — "descendit autem Dominus ut videret" */
        { la: 'Sed Deus dēscendit.', scene: SC.h10_descendit,
          nova: [{ w: 'dēscendit', e: '⬇', g: '↔ crēscit' }] },

        { la: 'Deus dēscendit; Deus turrim altam videt.', scene: SC.h10_videt },

        /* Gn 11,7 — "confundamus ibi linguam eorum" */
        { la: 'Iam multae linguae sunt.', scene: SC.h10_linguae,
          nova: [{ w: 'linguae', e: '💬💬', g: 'ūna lingua, multae linguae' }] },

        { la: 'Hominēs nōn intellegunt.', scene: SC.h10_nonintellegunt },

        { la: 'Hominēs clāmant, sed nōn intellegunt.', scene: SC.h10_clamant },

        /* Gn 11,8 — "cessaverunt aedificare civitatem". The tower still
           stands in the picture: the Vulgate never says it fell. */
        { la: 'Hominēs urbem et turrim iam nōn aedificant.', scene: SC.h10_cessant },

        /* Gn 11,8–9 — "divisit eos Dominus … dispersit eos" */
        { la: 'Hominēs dēscendunt et discēdunt.', scene: SC.h10_discedunt,
          nova: [{ w: 'discēdunt', e: '👥↔', g: 'discēdit, discēdunt' }] },

        { la: 'Hominēs in multās terrās discēdunt.', scene: SC.h10_terrae },

        /* memoriā tenē */
        { la: 'Memoriā tenē: ūna lingua iam nōn est. Hominēs discēdunt.',
          scene: SC.h10_memoria,
          ttsText: 'Una lingua iam non est. Homines discedunt.' }
      ],
      ludus: {
        words: [
          { la: 'turris',  scene: SC.v_turris,  emoji: '🗼' },
          { la: 'urbs',    scene: SC.v_urbs,    emoji: '🏛' },
          { la: 'lingua',  scene: SC.v_lingua,  emoji: '💬' },
          { la: 'mōns',    scene: SC.v_mons,    emoji: '⛰' },
          { la: 'arca',    scene: SC.v_arca,    emoji: '🚢' },
          { la: 'columba', scene: SC.v_columba, emoji: '🐦' }
        ]
      },
      /* SONUS: lingua and intellegit are the same crowd with different
         bubbles, so they are never offered together; turris and altus both
         show the tower, likewise. */
      sonus: [
        { la: 'turris',
          answer: { la: 'turris', scene: SC.v_turris },
          options: [{ la: 'turris', scene: SC.v_turris },
                    { la: 'urbs', scene: SC.v_urbs },
                    { la: 'lingua', scene: SC.v_lingua }] },
        { la: 'urbs',
          answer: { la: 'urbs', scene: SC.v_urbs },
          options: [{ la: 'urbs', scene: SC.v_urbs },
                    { la: 'turris', scene: SC.v_turris },
                    { la: 'mōns', scene: SC.v_mons },
                    { la: 'arca', scene: SC.v_arca }] },
        { la: 'lingua',
          answer: { la: 'lingua', scene: SC.v_lingua },
          options: [{ la: 'lingua', scene: SC.v_lingua },
                    { la: 'turris', scene: SC.v_turris },
                    { la: 'mōns', scene: SC.v_mons }] },
        { la: 'discēdit',
          answer: { la: 'discēdit', scene: SC.v_discedit },
          options: [{ la: 'discēdit', scene: SC.v_discedit },
                    { la: 'turris', scene: SC.v_turris },
                    { la: 'urbs', scene: SC.v_urbs },
                    { la: 'lingua', scene: SC.v_lingua }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'turris',     scene: SC.v_turris },
            { la: 'urbs',       scene: SC.v_urbs },
            { la: 'lingua',     scene: SC.v_lingua },
            { la: 'altus',      scene: SC.v_altus },
            { la: 'dēscendit',  scene: SC.v_descendit },
            { la: 'discēdit',   scene: SC.v_discedit }
          ],
          scrambles: [
            { la: 'Hominēs urbem aedificant.', scene: SC.h10_urbs },
            { la: 'Turris alta est.',          scene: SC.h10_alta },
            { la: 'Hominēs nōn intellegunt.',  scene: SC.h10_nonintellegunt },
            { la: 'Hominēs discēdunt.',        scene: SC.h10_terrae }
          ]
        },
        corrige: [
          { words: ['Hominēs', 'arcam', 'aedificant.'], wrong: 1,
            options: ['turrim', 'linguam', 'montem'], correct: 0, scene: SC.h10_turris },
          { words: ['Turris', 'parva', 'est.'], wrong: 1,
            options: ['alta', 'iūsta', 'mala'], correct: 0, scene: SC.h10_alta },
          { words: ['Sed', 'Deus', 'crēscit.'], wrong: 2,
            options: ['dēscendit.', 'intellegit.', 'natat.'], correct: 0, scene: SC.h10_descendit },
          { words: ['Iam', 'ūna', 'lingua', 'est.'], wrong: 1,
            options: ['multae', 'altae', 'malae'], correct: 0, scene: SC.h10_linguae },
          { words: ['Hominēs', 'intellegunt.'], wrong: 1,
            options: ['discēdunt.', 'aedificant.', 'natant.'], correct: 0, scene: SC.h10_terrae }
        ],
        comple: [
          { text: 'Ūna ___ est.', options: ['lingua', 'turris', 'urbs'], correct: 0, scene: SC.h10_lingua },
          { text: 'Hominēs urb___ aedificant.', options: ['em', 'ēs', 'is'], correct: 0, scene: SC.h10_urbs },
          { text: 'Turris ___ est.', options: ['alta', 'altus', 'altum'], correct: 0, scene: SC.h10_alta },
          { text: 'Sed Deus ___.', options: ['dēscendit', 'crēscit', 'intellegit'], correct: 0, scene: SC.h10_descendit },
          { text: 'Iam multae lingu___ sunt.', options: ['ae', 'a', 'am'], correct: 0, scene: SC.h10_linguae },
          { text: 'Hominēs in multās terrās ___.', options: ['discēdunt', 'aedificant', 'intellegunt'], correct: 0, scene: SC.h10_terrae }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ---------- */

  CONTENT.registerRegion({
    track: 'historia',
    id: 'l2',
    titulus: 'Dīluvium',
    ladder: 'S2',              /* CURRICULUM §0: nom/acc pl, 3rd conj, -que */
    progressId: 'l2',
    capitula: capitula,

    /* ---------- PROBĀTIŌ, not a duel ----------
       DESIGN §6: "Wolf duels are tonally wrong in Genesis." js/probatio.js
       runs a SECOND instance of the boss engine with foe:false, and
       js/app.js routes to it on this one field: kind === 'probatio'.

       The trial is the ark's gangway. Words drift down and cross the
       screen; the player steers a wicker basket and catches each one on
       the side it belongs to. Every field below is the shape probatio.js
       actually reads (its `cfg.data` is this phase object verbatim):
         titulus     → the banner over the two zones
         categories  → [{ label, accept:[la…], actor }] — TWO zones
         items       → optional; omitted, so the pool is the liber's own
                       vocabulary (js/app.js bossWords()), and any word
                       that neither zone accepts is skipped by zoneOf().

       ZONE DESIGN: 'IN ARCAM' holds only the five creatures this liber
       actually put aboard; 'NŌN' holds only things that could not be —
       the tower, the city, a mountain, the rain, the flood itself.
       Deliberately NOT sorted: lignum (it BECOMES the ark), rāmus (the
       dove carried it in), altāre (built after the landing), arca (the
       destination cannot also be the cargo). An ambiguous item would be
       exactly the "distractor that is accidentally also correct" that
       LATIN-STYLE §4 rejects, so those words simply never spawn.

       hp 6 = six correct sorts; the ramp in probatio.js scales the rest
       off the region index by itself. */
    boss: {
      id: 'b_l2',
      progressId: 'l2',
      kind: 'probatio',
      name: 'Arca',
      actor: 'ark',
      bg: 'sea',
      sceneY: 206,
      sceneScale: 1.05,
      /* NO vinceText: that field is the DUEL's challenge line, and js/app.js
         bossHeaderText() never reads it for a trial. A probatio derives its
         own header from name + phase — "Probātiō: Arca — ŌRDINĀ!" — which is
         exactly right here, so `headerText` is left unset too. */
      /* legacy single-phase fallback, for the same reason r01/r02 keep
         theirs: a client without js/probatio.js must still run something,
         and rules.php derives rule_boss_min_ms('l2') from these numbers. */
      hp: 6,
      seconds: 45,
      pos: { x: 0.68, y: 0.14 },
      phases: [
        { type: 'ordina',
          hp: 6,
          seconds: 45,
          titulus: 'IN ARCAM',
          categories: [
            { label: 'IN ARCAM', actor: 'ark',
              accept: ['leō', 'ursus', 'equus', 'columba', 'corvus'] },
            { label: 'NŌN',
              accept: ['turris', 'urbs', 'mōns', 'pluvia', 'dīluvium'] }
          ] }
      ],
      /* 5 cumulative questions, one per capitulum; every word is a vocab
         entry WITH a picture in its own capitulum, which is what
         js/app.js bossWords() needs to resolve it. Answer key lives on
         the server (server/lib/rules.php) — see content/_pending/l2.reg.json. */
      quiz: [
        { la: 'clāmat',   from: 'h6' },
        { la: 'arca',     from: 'h7' },
        { la: 'dīluvium', from: 'h8' },
        { la: 'rāmus',    from: 'h9' },
        { la: 'turris',   from: 'h10' }
      ]
    }
  });
})();
