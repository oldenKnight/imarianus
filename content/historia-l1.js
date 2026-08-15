/* ============================================================
   content/historia-l1.js — HISTORIA SACRA · Liber I · CREĀTIŌ  (ladder S1)
   ------------------------------------------------------------
   Five capitula from Genesis 1–4, told in the NARRATIVE PRESENT
   (CURRICULUM §2: the perfect arrives at Liber VI):

     h1 Deus mundum creat      — Gn 1
     h2 Adam et Eva            — Gn 2
     h3 Serpēns callidus       — Gn 3, 1–6
     h4 Ē paradīsō expulsī     — Gn 3, 7–24
     h5 Cain et Abel           — Gn 4

   THIS TRACK IS A SEPARATE DOOR. A learner may arrive here with ZERO
   Latin: nothing from FĀBULAE is assumed, and `Deus` on the first page
   of h1 is the first Latin word the track ever shows. The ledger for
   this track is content/_ledger-historia.md and it starts empty.

   STAGE CEILING (CURRICULUM §0 S1, binding):
     nom/acc SINGULAR (1st–3rd decl) · present of esse (est/sunt) ·
     3rd-person present of ANY conjugation, sg and pl (AUTHORING-BRIEF
     ruling 1, receptive) · nōn.
     NO plural nouns (that is S2 = Liber II), NO genitive, NO dative,
     NO ablative except the locative `in` + abl the pilot ships
     receptively (in caelō, in terrā, in hortō, in agrō, in marī),
     and the `in` + acc of direction glossed with an arrow in h5.
     NO pronouns, NO imperative, NO vocative, NO perfect.
     Where the ladder and the episode collided the SENTENCE was
     changed, never the grammar (AUTHORING-BRIEF, golden exemplar).

   HOW GOD IS DRAWN — he is NOT. Traditional (pre-Vatican-II) treatment:
   the Father is never given a body. His presence and his word are the
   gold radiance (`star`, gold) high in the sky, and a gold speech
   bubble. Every scene that would have needed a "deus" actor uses that
   convention instead; the missing art is reported, not substituted.

   MODESTY (DESIGN §8, binding): every human figure is the `person`
   actor with a ROLE PRESET — 'man' and 'woman' are fully robed by
   construction (long tunica + mantle, woman veiled). No pose, option
   or colour in this file removes clothing, and the garden scenes keep
   foliage between the viewer and the figures.

   FIDELITY: every capitulum carries `fons`; every episode was checked
   against latin-sources/vulgata-clementina-raw.txt BEFORE writing and
   is simplified by OMISSION only (see the report and the ledger for
   the list of omissions).

   IDS ARE DATABASE KEYS once shipped: h1…h5 and progressId 'l1'
   (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ vocabulary mini-scenes ============ */

    /* Deus: the gold radiance over the world he has made. The world is in
       the picture BECAUSE the radiance alone would only mean "light". */
    v_deus:     { bg: 'plain', items: [
                  { t: 'star',     x: 200, y: 86,  s: 1.15 },
                  { t: 'tree',     x: 62,  y: G, s: 0.78 },
                  { t: 'mountain', x: 334, y: G, s: 0.55 },
                  { t: 'grex',     x: 228, y: G, s: 0.85 }
                ] },

    /* creat: nothing → something. The radiance and the made things in one
       frame; the arrow bubble carries the "becomes". */
    v_creat:    { bg: 'plain', items: [
                  { t: 'star',  x: 96,  y: 92, s: 0.85 },
                  { t: 'tree',  x: 300, y: G, s: 0.9 },
                  { t: 'leo',   x: 210, y: G, s: 0.7 }
                ],
                bubbles: [{ x: 108, y: 168, w: 66, h: 40, text: '✨ ➡', kind: 'thought', tail: 'right', fs: 18 }] },

    /* lūx: light IN the dark — the only card in the set on a night ground,
       so it can never be confused with the sun disc of v_sol. */
    v_lux:      { bg: 'stormSea', items: [
                  { t: 'star', x: 200, y: 118, s: 1.7 }
                ] },

    v_caelum:   { bg: 'plain', items: [
                  { t: 'columba', x: 132, y: 92,  s: 1,   pose: 'fly' },
                  { t: 'aquila',  x: 278, y: 122, s: 0.9, pose: 'fly', flip: true }
                ] },

    v_terra:    { bg: 'plain', items: [
                  { t: 'tree',     x: 84,  y: G, s: 0.85 },
                  { t: 'bush',     x: 232, y: G },
                  { t: 'mountain', x: 330, y: G, s: 0.6 }
                ] },

    v_mare:     { bg: 'sea', items: [
                  { t: 'piscis', x: 148, y: 190, s: 1.15 },
                  { t: 'piscis', x: 268, y: 202, s: 0.95, flip: true }
                ] },

    v_sol:      { bg: 'plain', items: [
                  { t: 'sol', x: 200, y: 106, s: 1.5 }
                ] },

    v_homo:     { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'man' }
                ] },

    v_hortus:   { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 118, y: G, s: 0.9 },
                  { t: 'bush',         x: 296, y: G },
                  { t: 'columba',      x: 300, y: 138, s: 0.8, pose: 'fly' }
                ] },

    v_adam:     { bg: 'paradise', items: [
                  { t: 'bush',   x: 116, y: G },
                  { t: 'person', x: 212, y: G, s: 1.05, role: 'man' }
                ] },

    v_arbor:    { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 200, y: G, s: 1.15 }
                ] },

    v_animal:   { bg: 'paradise', items: [
                  { t: 'leo',     x: 104, y: G, s: 0.75 },
                  { t: 'equus',   x: 248, y: G, s: 0.72, flip: true },
                  { t: 'columba', x: 336, y: 148, s: 0.8, pose: 'fly' }
                ] },

    v_vocat:    { bg: 'paradise', items: [
                  { t: 'person', x: 118, y: G, s: 1, role: 'man', pose: 'point' },
                  { t: 'leo',    x: 282, y: G, s: 0.75, flip: true }
                ],
                bubbles: [{ x: 206, y: 68, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    v_dormit:   { bg: 'paradise', items: [
                  { t: 'bush',   x: 326, y: G },
                  { t: 'person', x: 176, y: G, s: 1, role: 'man', pose: 'sleep' }
                ],
                bubbles: [{ x: 292, y: 108, w: 52, h: 38, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },

    v_mulier:   { bg: 'paradise', items: [
                  { t: 'person', x: 200, y: G, s: 1.1, role: 'woman' }
                ] },

    /* Eva: the SAME referent as mulier, so this card differs by the whole
       staging (named beside Adam, under the tree), and Eva is deliberately
       kept out of every SONUS set that offers mulier. */
    v_eva:      { bg: 'paradise', items: [
                  { t: 'person',       x: 128, y: G, s: 1, role: 'man', pose: 'point' },
                  { t: 'person',       x: 264, y: G, s: 1, role: 'woman', flip: true },
                  { t: 'arborFructus', x: 350, y: G, s: 0.7 }
                ] },

    v_serpens:  { bg: 'paradise', items: [
                  { t: 'serpent', x: 200, y: G, s: 1.35 }
                ] },

    v_callidus: { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 296, y: G, s: 0.85 },
                  { t: 'serpent',      x: 142, y: G, s: 1.1 }
                ],
                bubbles: [{ x: 66, y: 108, w: 56, h: 40, text: '💭', kind: 'thought', tail: 'right', fs: 20 }] },

    v_vetat:    { bg: 'paradise', items: [
                  { t: 'star',         x: 74,  y: 90, s: 0.8 },
                  { t: 'arborFructus', x: 214, y: G, s: 1 }
                ],
                bubbles: [{ x: 322, y: 106, w: 56, h: 42, text: '🚫', kind: 'speech', tail: 'left', fs: 22 }] },

    v_dicit:    { bg: 'paradise', items: [
                  { t: 'person', x: 150, y: G, s: 1, role: 'man' }
                ],
                bubbles: [{ x: 276, y: 78, w: 60, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    v_videt:    { bg: 'paradise', items: [
                  { t: 'person',       x: 138, y: G, s: 1, role: 'woman' },
                  { t: 'arborFructus', x: 306, y: G, s: 0.8 }
                ],
                bubbles: [{ x: 224, y: 84, w: 56, h: 40, text: '👀', kind: 'thought', tail: 'right', fs: 20 }] },

    v_bonus:    { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 214, y: G, s: 1.1 }
                ],
                bubbles: [{ x: 84, y: 96, w: 56, h: 40, text: '👍', kind: 'thought', tail: 'right', fs: 20 }] },

    v_comedit:  { bg: 'paradise', items: [
                  { t: 'person', x: 186, y: G, s: 1.05, role: 'woman' }
                ],
                bubbles: [{ x: 300, y: 96, w: 56, h: 40, text: '🍎', kind: 'thought', tail: 'left', fs: 20 }] },

    v_timet:    { bg: 'paradise', items: [
                  { t: 'bush',   x: 320, y: G },
                  { t: 'person', x: 176, y: G, s: 1, role: 'man' }
                ],
                bubbles: [{ x: 82, y: 96, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'right', fs: 20 }] },

    /* latet: the figure BEHIND the foliage — the bush is the meaning */
    v_latet:    { bg: 'paradise', items: [
                  { t: 'person', x: 196, y: G, s: 0.95, role: 'man', pose: 'kneel' },
                  { t: 'bush',   x: 196, y: G },
                  { t: 'bush',   x: 246, y: G }
                ] },

    v_tunica:   { bg: 'plain', items: [
                  { t: 'pellis', x: 200, y: G, s: 1.15 }
                ] },

    v_dat:      { bg: 'plain', items: [
                  { t: 'star',   x: 82,  y: 92, s: 0.8 },
                  { t: 'pellis', x: 196, y: G, s: 0.85 },
                  { t: 'person', x: 306, y: G, s: 1, role: 'man', flip: true }
                ],
                bubbles: [{ x: 148, y: 96, w: 56, h: 40, text: '➡', kind: 'thought', tail: 'right', fs: 20 }] },

    v_exit:     { bg: 'plain', items: [
                  { t: 'arborFructus', x: 60,  y: G, s: 0.8 },
                  { t: 'person',       x: 250, y: G, s: 1, role: 'man', pose: 'walk' }
                ] },

    v_angelus:  { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.1, role: 'angel' }
                ] },

    v_custodit: { bg: 'plain', items: [
                  { t: 'arborFructus', x: 66,  y: G, s: 0.8 },
                  { t: 'person',       x: 226, y: G, s: 1.05, role: 'angel' },
                  { t: 'swordShield',  x: 300, y: G, s: 0.8 }
                ] },

    v_laborat:  { bg: 'plain', items: [
                  { t: 'frumentum', x: 320, y: G, s: 0.9 },
                  { t: 'person',    x: 178, y: G, s: 1, role: 'man', pose: 'kneel' }
                ],
                bubbles: [{ x: 82, y: 92, w: 56, h: 40, text: '💪', kind: 'thought', tail: 'right', fs: 20 }] },

    v_cain:     { bg: 'plain', items: [
                  { t: 'frumentum', x: 316, y: G, s: 0.85 },
                  { t: 'person',    x: 184, y: G, s: 1.05, role: 'man' }
                ] },

    v_abel:     { bg: 'plain', items: [
                  { t: 'person', x: 168, y: G, s: 1.05, role: 'shepherd' },
                  { t: 'grex',   x: 296, y: G, s: 0.9 }
                ] },

    v_frater:   { bg: 'plain', items: [
                  { t: 'person', x: 146, y: G, s: 1, role: 'man' },
                  { t: 'person', x: 246, y: G, s: 1, role: 'shepherd', flip: true }
                ] },

    v_ager:     { bg: 'plain', items: [
                  { t: 'frumentum', x: 62,  y: G, s: 0.88 },
                  { t: 'frumentum', x: 152, y: G, s: 1 },
                  { t: 'frumentum', x: 248, y: G, s: 0.95 },
                  { t: 'frumentum', x: 340, y: G, s: 0.85 }
                ] },

    v_donum:    { bg: 'plain', items: [
                  { t: 'altar', x: 200, y: G, s: 1.15, flame: false }
                ] },

    /* ārdet: the same altar as v_donum with the fire risen high — the pair
       is the gloss, exactly as aestās/hiems are in Regiō II. */
    v_ardet:    { bg: 'plain', items: [
                  { t: 'altar', x: 200, y: G, s: 1.15, flame: true, smoke: true }
                ] },

    v_iratus:   { bg: 'plain', items: [
                  { t: 'person', x: 190, y: G, s: 1.1, role: 'man' }
                ],
                bubbles: [{ x: 90, y: 92, w: 56, h: 40, text: '😠', kind: 'thought', tail: 'right', fs: 20 }] },

    /* signum: the mark set ON Cain — a small gold sign at his head, not a
       wound, not a brand (DESIGN §8). */
    v_signum:   { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.05, role: 'man' },
                  { t: 'star',   x: 200, y: 118, s: 0.42 }
                ] },

    /* ============ h1 — Deus mundum creat ============ */

    /* Gn 1,2 "tenebrae erant super faciem abyssi : et spiritus Dei ferebatur
       super aquas" — the dark water, NOT a starry sky: bgNightSky paints a
       moon, and the moon is not made until day IV (Gn 1,16). */
    h1_initium: { bg: 'stormSea', items: [
                  { t: 'star', x: 200, y: 112, s: 1.5 }
                ] },

    h1_fiat:    { bg: 'stormSea', items: [
                  { t: 'star', x: 116, y: 116, s: 1.35 }
                ],
                bubbles: [{ x: 286, y: 68, w: 92, h: 46, text: '✨', kind: 'speech', tail: 'left', fs: 26 }] },

    h1_lux:     { bg: 'plain', items: [
                  { t: 'star', x: 200, y: 100, s: 1.5 }
                ] },

    h1_mare:    { bg: 'sea', items: [
                  { t: 'mountain', x: 54,  y: G, s: 0.72 },
                  { t: 'star',     x: 330, y: 76, s: 0.8 }
                ] },

    h1_sol:     { bg: 'plain', items: [
                  { t: 'sol',  x: 296, y: 92, s: 1.1 },
                  { t: 'star', x: 92,  y: 100, s: 0.75 }
                ] },

    h1_sol2:    { bg: 'plain', items: [
                  { t: 'sol',  x: 200, y: 96, s: 1.35 },
                  { t: 'tree', x: 52,  y: G, s: 0.8 }
                ] },

    h1_pisces:  { bg: 'sea', items: [
                  { t: 'star',   x: 336, y: 72, s: 0.7 },
                  { t: 'piscis', x: 108, y: 192, s: 1.2 },
                  { t: 'piscis', x: 226, y: 178, s: 1,   flip: true },
                  { t: 'piscis', x: 306, y: 204, s: 0.9 }
                ] },

    h1_aves:    { bg: 'plain', items: [
                  { t: 'star',    x: 60,  y: 92, s: 0.7 },
                  { t: 'columba', x: 148, y: 116, s: 1.05, pose: 'fly' },
                  { t: 'aquila',  x: 286, y: 94,  s: 0.95, pose: 'fly', flip: true },
                  { t: 'tree',    x: 348, y: G, s: 0.8 }
                ] },

    h1_animalia: { bg: 'plain', items: [
                  { t: 'tree',  x: 352, y: G, s: 0.75 },
                  { t: 'star',  x: 62,  y: 92, s: 0.7 },
                  { t: 'leo',   x: 118, y: G, s: 0.8 },
                  { t: 'equus', x: 232, y: G, s: 0.75, flip: true },
                  { t: 'ursus', x: 320, y: G, s: 0.7 }
                ] },

    h1_homo:    { bg: 'paradise', items: [
                  { t: 'star',   x: 92,  y: 92, s: 0.85 },
                  { t: 'person', x: 232, y: G, s: 1, role: 'man' }
                ] },

    h1_homo2:   { bg: 'plain', items: [
                  { t: 'tree',   x: 52,  y: G, s: 0.8 },
                  { t: 'person', x: 208, y: G, s: 1, role: 'man' },
                  { t: 'grex',   x: 318, y: G, s: 0.85 }
                ] },

    h1_septimus: { bg: 'plain', items: [
                  { t: 'sol',    x: 320, y: 92, s: 0.95 },
                  { t: 'tree',   x: 56,  y: G, s: 0.85 },
                  { t: 'person', x: 190, y: G, s: 0.95, role: 'man' },
                  { t: 'grex',   x: 288, y: G, s: 0.9 }
                ] },

    h1_memoria: { bg: 'paradise', items: [
                  { t: 'star',   x: 200, y: 88, s: 0.95 },
                  { t: 'person', x: 200, y: G, s: 1, role: 'man' }
                ] },

    /* ============ h2 — Adam et Eva ============ */

    h2_hortus:  { bg: 'paradise', items: [
                  { t: 'star',         x: 78,  y: 90, s: 0.75 },
                  { t: 'arborFructus', x: 292, y: G, s: 0.85 }
                ] },

    h2_adam:    { bg: 'paradise', items: [
                  { t: 'bush',         x: 58,  y: G },
                  { t: 'person',       x: 196, y: G, s: 1, role: 'man' },
                  { t: 'arborFructus', x: 332, y: G, s: 0.8 }
                ] },

    h2_nomen:   { bg: 'paradise', items: [
                  { t: 'person', x: 178, y: G, s: 1.05, role: 'man' },
                  { t: 'bush',   x: 318, y: G }
                ] },

    h2_arbor:   { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 190, y: G, s: 1.05 },
                  { t: 'columba',      x: 214, y: 118, s: 0.75 }
                ] },

    h2_animalia: { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 350, y: G, s: 0.7 },
                  { t: 'leo',          x: 96,  y: G, s: 0.75 },
                  { t: 'equus',        x: 214, y: G, s: 0.72, flip: true },
                  { t: 'grex',         x: 300, y: G, s: 0.8 }
                ] },

    h2_vocat:   { bg: 'paradise', items: [
                  { t: 'person',  x: 96,  y: G, s: 1, role: 'man', pose: 'point' },
                  { t: 'leo',     x: 252, y: G, s: 0.75, flip: true },
                  { t: 'columba', x: 336, y: 138, s: 0.75, pose: 'fly', flip: true }
                ],
                bubbles: [{ x: 178, y: 66, w: 60, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    h2_vocat2:  { bg: 'paradise', items: [
                  { t: 'person', x: 88,  y: G, s: 1, role: 'man', pose: 'point' },
                  { t: 'ursus',  x: 216, y: G, s: 0.7, flip: true },
                  { t: 'equus',  x: 314, y: G, s: 0.7, flip: true }
                ],
                bubbles: [{ x: 168, y: 62, w: 66, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    h2_solus:   { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 344, y: G, s: 0.7 },
                  { t: 'leo',          x: 64,  y: G, s: 0.6 },
                  { t: 'person',       x: 172, y: G, s: 1, role: 'man' }
                ],
                bubbles: [{ x: 282, y: 96, w: 62, h: 42, text: '👤❓', kind: 'thought', tail: 'left', fs: 16 }] },

    h2_dormit:  { bg: 'paradise', items: [
                  { t: 'bush',   x: 330, y: G },
                  { t: 'person', x: 170, y: G, s: 1, role: 'man', pose: 'sleep' }
                ],
                bubbles: [{ x: 296, y: 104, w: 52, h: 38, text: '💤', kind: 'thought', tail: 'left', fs: 20 }] },

    h2_mulier:  { bg: 'paradise', items: [
                  { t: 'star',   x: 78,  y: 90, s: 0.8 },
                  { t: 'bush',   x: 58,  y: G },
                  { t: 'person', x: 232, y: G, s: 1.05, role: 'woman' }
                ] },

    h2_eva:     { bg: 'paradise', items: [
                  { t: 'person', x: 128, y: G, s: 1, role: 'man', pose: 'point' },
                  { t: 'person', x: 268, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 200, y: 60, w: 62, h: 42, text: '💬', kind: 'speech', tail: 'left', fs: 20 }] },

    h2_ambo:    { bg: 'paradise', items: [
                  { t: 'bush',         x: 48,  y: G },
                  { t: 'person',       x: 138, y: G, s: 1, role: 'man' },
                  { t: 'person',       x: 228, y: G, s: 1, role: 'woman', flip: true },
                  { t: 'arborFructus', x: 340, y: G, s: 0.8 }
                ] },

    h2_memoria: { bg: 'paradise', items: [
                  { t: 'star',   x: 200, y: 86, s: 0.9 },
                  { t: 'person', x: 152, y: G, s: 1, role: 'man' },
                  { t: 'person', x: 246, y: G, s: 1, role: 'woman', flip: true }
                ] },

    /* ============ h3 — Serpēns callidus ============ */

    h3_serpens: { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 300, y: G, s: 0.9 },
                  { t: 'serpent',      x: 138, y: G, s: 1.2 }
                ] },

    h3_arbor:   { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 194, y: G, s: 1.15 },
                  { t: 'serpent',      x: 306, y: G, s: 0.85, flip: true }
                ] },

    h3_vetat:   { bg: 'paradise', items: [
                  { t: 'star',         x: 70,  y: 88, s: 0.8 },
                  { t: 'arborFructus', x: 226, y: G, s: 1 }
                ],
                bubbles: [{ x: 328, y: 108, w: 54, h: 42, text: '🚫', kind: 'speech', tail: 'left', fs: 22 }] },

    h3_videt:   { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 348, y: G, s: 0.7 },
                  { t: 'serpent',      x: 116, y: G, s: 1.1 },
                  { t: 'person',       x: 268, y: G, s: 1, role: 'woman', flip: true }
                ] },

    h3_dicit1:  { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 348, y: G, s: 0.7 },
                  { t: 'serpent',      x: 110, y: G, s: 1.1 },
                  { t: 'person',       x: 272, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 190, y: 62, w: 74, h: 44, text: '❓🍎', kind: 'speech', tail: 'right', fs: 18 }] },

    h3_dicit2:  { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 348, y: G, s: 0.7 },
                  { t: 'serpent',      x: 110, y: G, s: 1.1 },
                  { t: 'person',       x: 272, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 186, y: 62, w: 76, h: 44, text: '🚫🍎', kind: 'speech', tail: 'left', fs: 18 }] },

    h3_dicit3:  { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 348, y: G, s: 0.7 },
                  { t: 'serpent',      x: 110, y: G, s: 1.15 },
                  { t: 'person',       x: 272, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 190, y: 62, w: 76, h: 44, text: '👍🍎', kind: 'speech', tail: 'right', fs: 18 }] },

    h3_videt2:  { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 292, y: G, s: 1 },
                  { t: 'person',       x: 142, y: G, s: 1, role: 'woman' }
                ],
                bubbles: [{ x: 210, y: 88, w: 58, h: 40, text: '👀', kind: 'thought', tail: 'right', fs: 20 }] },

    h3_comedit: { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 320, y: G, s: 0.85 },
                  { t: 'person',       x: 168, y: G, s: 1.05, role: 'woman' }
                ],
                bubbles: [{ x: 78, y: 94, w: 56, h: 40, text: '🍎', kind: 'thought', tail: 'right', fs: 20 }] },

    h3_adam:    { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 344, y: G, s: 0.75 },
                  { t: 'person',       x: 130, y: G, s: 1, role: 'man' },
                  { t: 'person',       x: 236, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 62, y: 92, w: 56, h: 40, text: '🍎', kind: 'thought', tail: 'right', fs: 20 }] },

    h3_memoria: { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 296, y: G, s: 0.95 },
                  { t: 'serpent',      x: 62,  y: G, s: 0.85 },
                  { t: 'person',       x: 150, y: G, s: 1, role: 'man' },
                  { t: 'person',       x: 224, y: G, s: 1, role: 'woman', flip: true }
                ] },

    /* ============ h4 — Ē paradīsō expulsī ============ */

    h4_timent:  { bg: 'paradise', items: [
                  { t: 'arborFructus', x: 340, y: G, s: 0.75 },
                  { t: 'person',       x: 140, y: G, s: 1, role: 'man' },
                  { t: 'person',       x: 224, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 62, y: 90, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the two figures are DRAWN FIRST so the bushes cover them: latet is
       carried by the staging order, not by a word */
    h4_latent:  { bg: 'paradise', items: [
                  { t: 'person', x: 150, y: G, s: 0.95, role: 'man', pose: 'kneel' },
                  { t: 'person', x: 250, y: G, s: 0.95, role: 'woman', pose: 'kneel', flip: true },
                  { t: 'bush',   x: 150, y: G },
                  { t: 'bush',   x: 250, y: G },
                  { t: 'bush',   x: 200, y: G }
                ] },

    h4_vocat:   { bg: 'paradise', items: [
                  { t: 'star',   x: 84,  y: 88, s: 0.85 },
                  { t: 'person', x: 236, y: G, s: 0.95, role: 'man', pose: 'kneel' },
                  { t: 'bush',   x: 236, y: G }
                ],
                bubbles: [{ x: 150, y: 118, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    h4_tunica:  { bg: 'paradise', items: [
                  { t: 'star',   x: 78,  y: 88, s: 0.8 },
                  { t: 'pellis', x: 196, y: G, s: 0.9 },
                  { t: 'person', x: 306, y: G, s: 1, role: 'man', flip: true }
                ] },

    h4_tunica2: { bg: 'paradise', items: [
                  { t: 'star',   x: 74,  y: 88, s: 0.75 },
                  { t: 'person', x: 178, y: G, s: 1, role: 'man' },
                  { t: 'person', x: 268, y: G, s: 1, role: 'woman', flip: true }
                ] },

    h4_exeunt:  { bg: 'plain', items: [
                  { t: 'arborFructus', x: 56,  y: G, s: 0.8 },
                  { t: 'person',       x: 218, y: G, s: 1, role: 'man', pose: 'walk' },
                  { t: 'person',       x: 296, y: G, s: 1, role: 'woman', pose: 'walk' }
                ] },

    h4_extra:   { bg: 'desert', items: [
                  { t: 'person', x: 168, y: G, s: 1, role: 'man' },
                  { t: 'person', x: 252, y: G, s: 1, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 76, y: 92, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'right', fs: 20 }] },

    h4_angelus: { bg: 'plain', items: [
                  { t: 'arborFructus', x: 62,  y: G, s: 0.85 },
                  { t: 'person',       x: 226, y: G, s: 1.05, role: 'angel' },
                  { t: 'swordShield',  x: 302, y: G, s: 0.8 }
                ] },

    h4_custodit: { bg: 'plain', items: [
                  { t: 'arborFructus', x: 58,  y: G, s: 0.85 },
                  { t: 'bush',         x: 128, y: G },
                  { t: 'person',       x: 216, y: G, s: 1.05, role: 'angel' },
                  { t: 'swordShield',  x: 292, y: G, s: 0.8 },
                  { t: 'fire',         x: 292, y: 152, s: 0.5 }
                ] },

    h4_laborat: { bg: 'desert', items: [
                  { t: 'frumentum', x: 318, y: G, s: 0.85 },
                  { t: 'person',    x: 174, y: G, s: 1, role: 'man', pose: 'kneel' }
                ],
                bubbles: [{ x: 78, y: 92, w: 56, h: 40, text: '💪', kind: 'thought', tail: 'right', fs: 20 }] },

    h4_laborat2: { bg: 'desert', items: [
                  { t: 'frumentum', x: 336, y: G, s: 0.85 },
                  { t: 'person',    x: 136, y: G, s: 1, role: 'man', pose: 'kneel' },
                  { t: 'person',    x: 240, y: G, s: 1, role: 'woman', pose: 'kneel', flip: true }
                ] },

    h4_memoria: { bg: 'plain', items: [
                  { t: 'pellis',      x: 74,  y: G, s: 0.75 },
                  { t: 'person',      x: 228, y: G, s: 1.05, role: 'angel' },
                  { t: 'swordShield', x: 302, y: G, s: 0.8 }
                ] },

    /* ============ h5 — Cain et Abel ============ */

    h5_fratres: { bg: 'plain', items: [
                  { t: 'frumentum', x: 60,  y: G, s: 0.85 },
                  { t: 'person',    x: 148, y: G, s: 1, role: 'man' },
                  { t: 'person',    x: 250, y: G, s: 1, role: 'shepherd', flip: true },
                  { t: 'grex',      x: 332, y: G, s: 0.8 }
                ] },

    h5_frater:  { bg: 'plain', items: [
                  { t: 'person', x: 152, y: G, s: 1, role: 'man' },
                  { t: 'person', x: 248, y: G, s: 1, role: 'shepherd', flip: true }
                ] },

    h5_ager:    { bg: 'plain', items: [
                  { t: 'frumentum', x: 66,  y: G, s: 0.9 },
                  { t: 'frumentum', x: 330, y: G, s: 0.9 },
                  { t: 'person',    x: 200, y: G, s: 1, role: 'man', pose: 'kneel' }
                ] },

    h5_abel:    { bg: 'plain', items: [
                  { t: 'frumentum', x: 350, y: G, s: 0.8 },
                  { t: 'person',    x: 138, y: G, s: 1, role: 'shepherd' },
                  { t: 'grex',      x: 268, y: G, s: 0.9 }
                ] },

    h5_donum1:  { bg: 'plain', items: [
                  { t: 'frumentum', x: 340, y: G, s: 0.8 },
                  { t: 'altar',     x: 246, y: G, s: 1, flame: false },
                  { t: 'person',    x: 132, y: G, s: 1, role: 'man', pose: 'point' }
                ] },

    h5_donum2:  { bg: 'plain', items: [
                  { t: 'grex',   x: 342, y: G, s: 0.75 },
                  { t: 'altar',  x: 244, y: G, s: 1, flame: false },
                  { t: 'person', x: 130, y: G, s: 1, role: 'shepherd', pose: 'point' }
                ] },

    h5_ardet:   { bg: 'plain', items: [
                  { t: 'star',   x: 322, y: 74, s: 0.7 },
                  { t: 'altar',  x: 236, y: G, s: 1.05, flame: true, smoke: true },
                  { t: 'person', x: 118, y: G, s: 1, role: 'shepherd' }
                ] },

    h5_nonardet: { bg: 'plain', items: [
                  { t: 'altar',  x: 236, y: G, s: 1.05, flame: false },
                  { t: 'person', x: 118, y: G, s: 1, role: 'man' }
                ] },

    h5_iratus:  { bg: 'plain', items: [
                  { t: 'altar',  x: 300, y: G, s: 0.95, flame: false },
                  { t: 'person', x: 168, y: G, s: 1.05, role: 'man' }
                ],
                bubbles: [{ x: 74, y: 90, w: 56, h: 40, text: '😠', kind: 'thought', tail: 'right', fs: 20 }] },

    /* Cain calls his brother out to the field. Both are walking, the field
       is ahead of them; this is the last frame either of them shares. */
    h5_vocat:   { bg: 'plain', items: [
                  { t: 'frumentum', x: 344, y: G, s: 0.9 },
                  { t: 'frumentum', x: 288, y: G, s: 0.8 },
                  { t: 'person',    x: 118, y: G, s: 1, role: 'man', pose: 'walk' },
                  { t: 'person',    x: 196, y: G, s: 1, role: 'shepherd', pose: 'walk' }
                ],
                bubbles: [{ x: 90, y: 62, w: 66, h: 42, text: '➡🌾', kind: 'speech', tail: 'right', fs: 17 }] },

    /* THE DEED IS OFF THE PAGE (DESIGN §8). The field is empty but for the
       standing grain; nothing is shown, nothing is described. */
    h5_solus:   { bg: 'plain', items: [
                  { t: 'frumentum', x: 78,  y: G, s: 0.9 },
                  { t: 'frumentum', x: 196, y: G, s: 0.95 },
                  { t: 'frumentum', x: 326, y: G, s: 0.85 }
                ] },

    h5_ubi:     { bg: 'plain', items: [
                  { t: 'star',      x: 92,  y: 88, s: 0.85 },
                  { t: 'frumentum', x: 342, y: G, s: 0.8 },
                  { t: 'person',    x: 232, y: G, s: 1, role: 'man' }
                ],
                bubbles: [{ x: 148, y: 116, w: 58, h: 42, text: '❓', kind: 'speech', tail: 'right', fs: 22 }] },

    h5_tacet:   { bg: 'plain', items: [
                  { t: 'frumentum', x: 344, y: G, s: 0.8 },
                  { t: 'person',    x: 200, y: G, s: 1, role: 'man', pose: 'kneel' }
                ],
                bubbles: [{ x: 86, y: 96, w: 56, h: 40, text: '😨', kind: 'thought', tail: 'right', fs: 20 }] },

    h5_signum:  { bg: 'desert', items: [
                  { t: 'star',   x: 82,  y: 86, s: 0.8 },
                  { t: 'person', x: 224, y: G, s: 1.05, role: 'man' },
                  { t: 'star',   x: 224, y: 118, s: 0.4 }
                ] },

    h5_exit:    { bg: 'desert', items: [
                  { t: 'person', x: 262, y: G, s: 1, role: 'man', pose: 'walk' },
                  { t: 'star',   x: 262, y: 118, s: 0.4 }
                ] },

    /* B-RATING / comprehension: Abel is NOT in this frame. Page 11 said
       "Posteā Abel nōn est", so a closing picture with him standing would
       be a contradiction the eye catches before the words do. What remains
       is the field, his flock, Cain — and the radiance over all of it. */
    h5_memoria: { bg: 'plain', items: [
                  { t: 'star',      x: 200, y: 82, s: 0.9 },
                  { t: 'frumentum', x: 74,  y: G, s: 0.85 },
                  { t: 'person',    x: 168, y: G, s: 1, role: 'man' },
                  { t: 'grex',      x: 306, y: G, s: 0.85 }
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ h1 — DEUS MUNDUM CREAT ============
       fons Gn 1 (+ 2, 1–3). Repetition IS the pedagogy here: the frame
       "Deus X creat" carries eight of the thirteen pages, so the learner
       meets one verb thirteen times and reads the accusative before ever
       being asked what an accusative is.
       OMITTED for the ≤8 lexeme cap (reported): the plants of day III,
       the moon and the stars of day IV, and the naming of the creatures
       ("appellavit"). Days V and VI are told with the SCENE carrying the
       creatures and the text keeping the frame — the animals are named
       in h2, where Adam names them and the words are needed anyway. */
    {
      id: 'h1',
      titulus: 'Deus Mundum Creat',
      icon: '✨🌍',
      numerus: 'I',
      pos: { x: 0.26, y: 0.87 },
      fons: 'Gn 1',
      vocab: [
        { la: 'Deus',   scene: SC.v_deus,   pars: 'nomen' },
        { la: 'caelum', scene: SC.v_caelum, pars: 'nomen' },
        { la: 'terra',  scene: SC.v_terra,  pars: 'nomen' },
        { la: 'lūx',    scene: SC.v_lux,    pars: 'nomen' },
        { la: 'mare',   scene: SC.v_mare,   pars: 'nomen' },
        { la: 'sōl',    scene: SC.v_sol,    pars: 'nomen' },
        { la: 'homō',   scene: SC.v_homo,   pars: 'nomen' },
        { la: 'creat',  scene: SC.v_creat,  pars: 'verbum' }
      ],
      story: [
        /* Gn 1,1 — the track's first sentence, and its first word is Deus */
        { la: 'Deus caelum et terram creat.', scene: SC.h1_initium,
          nova: [{ w: 'Deus', e: '✨', g: '' },
                 { w: 'creat', e: '✨ ➡ 🌍', g: '' },
                 { w: 'caelum', e: '☁', g: '' },
                 { w: 'terram', e: '🌍', g: 'terra, terram' },
                 { w: 'et', e: '➕', g: '' }] },

        /* Gn 1,3 — the ONE fixed Vulgate formula of this capitulum, glossed
           by an image and by the page that follows it, never translated */
        { la: 'Ecce Deus: "Fiat lūx!"', scene: SC.h1_fiat,
          nova: [{ w: 'ecce', e: '👉', g: '' },
                 { w: 'Fiat lūx', e: '🌑 ➡ ✨', g: 'lūx nōn est; iam lūx est' }] },

        { la: 'Iam lūx est. Lūx in caelō est.', scene: SC.h1_lux,
          nova: [{ w: 'lūx', e: '✨', g: '' },
                 { w: 'iam', e: '⏱', g: '' },
                 { w: 'in', e: '📍', g: 'in caelō, in terrā' },
                 { w: 'est', e: '=', g: '' }] },

        /* Gn 1,9–10 */
        { la: 'Tum Deus mare creat. Ecce mare et terra!', scene: SC.h1_mare,
          nova: [{ w: 'mare', e: '🌊', g: '' },
                 { w: 'tum', e: '1️⃣➡2️⃣', g: '' }] },

        /* Gn 1,16 — the moon and the stars are in the picture, not in the
           text: the lexeme cap buys them for a later liber */
        { la: 'Tum Deus sōlem creat.', scene: SC.h1_sol,
          nova: [{ w: 'sōlem', e: '☀', g: 'sōl, sōlem' }] },

        { la: 'Sōl in caelō est.', scene: SC.h1_sol2,
          nova: [{ w: 'sōl', e: '☀', g: '' }] },

        /* Gn 1,20–21 — the fish are the picture; the frame does not change */
        { la: 'Deus in marī creat.', scene: SC.h1_pisces },

        /* Gn 1,20–21 — the birds */
        { la: 'Deus in caelō creat.', scene: SC.h1_aves },

        /* Gn 1,24–25 — the beasts of the earth */
        { la: 'Tum Deus in terrā creat.', scene: SC.h1_animalia },

        /* Gn 1,27 */
        { la: 'Postrēmō Deus hominem creat.', scene: SC.h1_homo,
          nova: [{ w: 'hominem', e: '👤', g: 'homō, hominem' },
                 { w: 'postrēmō', e: '7️⃣', g: '' }] },

        { la: 'Homō in terrā est.', scene: SC.h1_homo2,
          nova: [{ w: 'homō', e: '👤', g: '' }] },

        /* Gn 2,2 — the seventh day, told by what does NOT happen */
        { la: 'Iam Deus nōn creat. Sōl in caelō est.', scene: SC.h1_septimus,
          nova: [{ w: 'nōn', e: '🚫', g: '' }] },

        /* memoriā tenē: one plain sentence, no new word */
        { la: 'Memoriā tenē: Deus caelum et terram et hominem creat.',
          scene: SC.h1_memoria,
          ttsText: 'Deus caelum et terram et hominem creat.',
          nova: [{ w: 'Memoriā tenē', e: '🧠', g: '' }] }
      ],
      ludus: {
        words: [
          { la: 'Deus',   scene: SC.v_deus,   emoji: '✨' },
          { la: 'caelum', scene: SC.v_caelum, emoji: '☁' },
          { la: 'terra',  scene: SC.v_terra,  emoji: '🌍' },
          { la: 'mare',   scene: SC.v_mare,   emoji: '🌊' },
          { la: 'sōl',    scene: SC.v_sol,    emoji: '☀' },
          { la: 'homō',   scene: SC.v_homo,   emoji: '👤' }
        ]
      },
      /* SONUS hand-authored: lūx and Deus are BOTH the gold radiance, and
         sōl is a second bright disc. Offering any two of the three by ear
         would be a coin-flip, so each of them is only ever heard against
         things it cannot be mistaken for (LATIN-STYLE §4). */
      sonus: [
        { la: 'mare',
          answer: { la: 'mare', scene: SC.v_mare },
          options: [{ la: 'mare', scene: SC.v_mare },
                    { la: 'terra', scene: SC.v_terra },
                    { la: 'homō', scene: SC.v_homo }] },
        { la: 'terra',
          answer: { la: 'terra', scene: SC.v_terra },
          options: [{ la: 'terra', scene: SC.v_terra },
                    { la: 'mare', scene: SC.v_mare },
                    { la: 'caelum', scene: SC.v_caelum },
                    { la: 'homō', scene: SC.v_homo }] },
        { la: 'sōl',
          answer: { la: 'sōl', scene: SC.v_sol },
          options: [{ la: 'sōl', scene: SC.v_sol },
                    { la: 'mare', scene: SC.v_mare },
                    { la: 'homō', scene: SC.v_homo }] },
        { la: 'homō',
          answer: { la: 'homō', scene: SC.v_homo },
          options: [{ la: 'homō', scene: SC.v_homo },
                    { la: 'caelum', scene: SC.v_caelum },
                    { la: 'terra', scene: SC.v_terra },
                    { la: 'mare', scene: SC.v_mare }] }
      ],
      overrides: {
        aenigmata: {
          /* Deus and lūx are both the gold radiance, so only ONE of them
             is a memory tile; here the WORD is on screen next to the
             picture, but two identical pictures would still be a guess. */
          pairs: [
            { la: 'Deus',   scene: SC.v_deus },
            { la: 'caelum', scene: SC.v_caelum },
            { la: 'terra',  scene: SC.v_terra },
            { la: 'mare',   scene: SC.v_mare },
            { la: 'sōl',    scene: SC.v_sol },
            { la: 'homō',   scene: SC.v_homo }
          ],
          scrambles: [
            { la: 'Deus caelum et terram creat.', scene: SC.h1_initium },
            { la: 'Deus mare creat.',             scene: SC.h1_mare },
            { la: 'Sōl in caelō est.',            scene: SC.h1_sol2 },
            { la: 'Deus hominem creat.',          scene: SC.h1_homo }
          ]
        },
        corrige: [
          { words: ['Deus', 'mare', 'et', 'terram', 'creat.'], wrong: 1,
            options: ['caelum', 'sōlem', 'hominem'], correct: 0, scene: SC.h1_initium },
          { words: ['Deus', 'terram', 'creat.'], wrong: 1,
            options: ['mare', 'caelum', 'sōlem'], correct: 0, scene: SC.h1_mare },
          { words: ['Mare', 'in', 'caelō', 'est.'], wrong: 0,
            options: ['Sōl', 'Terra', 'Homō'], correct: 0, scene: SC.h1_sol2 },
          { words: ['Deus', 'sōlem', 'creat.'], wrong: 1,
            options: ['hominem', 'caelum', 'mare'], correct: 0, scene: SC.h1_homo },
          { words: ['Homō', 'in', 'marī', 'est.'], wrong: 2,
            options: ['terrā', 'caelō', 'sōle'], correct: 0, scene: SC.h1_homo2 }
        ],
        comple: [
          { text: 'Deus caelum et terr___ creat.', options: ['am', 'a', 'ā'], correct: 0, scene: SC.h1_initium },
          { text: 'Iam ___ est.', options: ['lūx', 'mare', 'homō'], correct: 0, scene: SC.h1_lux },
          { text: 'Deus ___ creat.', options: ['mare', 'marī', 'maris'], correct: 0, scene: SC.h1_mare },
          { text: 'Sōl in cael___ est.', options: ['ō', 'um', 'ī'], correct: 0, scene: SC.h1_sol2 },
          { text: 'Postrēmō Deus homin___ creat.', options: ['em', 'ēs', 'is'], correct: 0, scene: SC.h1_homo },
          { text: 'Homō in terrā ___.', options: ['est', 'sunt', 'creat'], correct: 0, scene: SC.h1_homo2 }
        ]
      }
    },

    /* ============ h2 — ADAM ET EVA ============
       fons Gn 2. MODESTY (DESIGN §8): 'man' and 'woman' role presets only,
       both fully robed, foliage between viewer and figure wherever the
       staging allows. Nothing in Gn 2,25 is told or drawn.
       Gn 2,21's rib is OMITTED — Adam sleeps and God makes the woman; the
       anatomy is simply not on the page.
       Gn 2,23 (Adam names the woman) is compressed with Gn 3,20 (the name
       Eva) into one page, so the learner has a name from here on. */
    {
      id: 'h2',
      titulus: 'Adam et Eva',
      icon: '🌳👥',
      numerus: 'II',
      pos: { x: 0.72, y: 0.70 },
      fons: 'Gn 2',
      vocab: [
        { la: 'hortus', scene: SC.v_hortus, pars: 'nomen' },
        { la: 'Adam',   scene: SC.v_adam,   pars: 'nomen' },
        { la: 'arbor',  scene: SC.v_arbor,  pars: 'nomen' },
        { la: 'animal', scene: SC.v_animal, pars: 'nomen' },
        { la: 'mulier', scene: SC.v_mulier, pars: 'nomen' },
        { la: 'Eva',    scene: SC.v_eva,    pars: 'nomen' },
        { la: 'vocat',  scene: SC.v_vocat,  pars: 'verbum' },
        { la: 'dormit', scene: SC.v_dormit, pars: 'verbum' }
      ],
      story: [
        /* Gn 2,8 */
        { la: 'Deus hortum creat. Hortus in terrā est.', scene: SC.h2_hortus,
          nova: [{ w: 'hortum', e: '🌳', g: 'hortus, hortum' }] },

        /* Gn 2,15 */
        { la: 'Ecce homō! Homō in hortō est.', scene: SC.h2_adam,
          nova: [{ w: 'hortus', e: '🌳', g: '' }] },

        { la: 'Homō Adam est.', scene: SC.h2_nomen,
          nova: [{ w: 'Adam', e: '👤', g: 'nōmen hominis' }] },

        /* Gn 2,9 */
        { la: 'In hortō arbor est. In arbore animal est.', scene: SC.h2_arbor,
          nova: [{ w: 'arbor', e: '🌳', g: '' },
                 { w: 'animal', e: '🐾', g: '' }] },

        { la: 'In hortō animal quoque est.', scene: SC.h2_animalia,
          nova: [{ w: 'quoque', e: '➕', g: '= et' }] },

        /* Gn 2,19 */
        { la: 'Adam animal vocat.', scene: SC.h2_vocat,
          nova: [{ w: 'vocat', e: '💬', g: '' }] },

        /* Gn 2,20 */
        { la: 'Adam omne animal vocat.', scene: SC.h2_vocat2,
          nova: [{ w: 'omne', e: '💯', g: 'nōn ūnum animal' }] },

        /* Gn 2,18 */
        { la: 'Sed in hortō mulier nōn est.', scene: SC.h2_solus,
          nova: [{ w: 'sed', e: '↔', g: '' },
                 { w: 'mulier', e: '👤', g: '' }] },

        /* Gn 2,21 — the sleep; the rib is omitted */
        { la: 'Ecce, Adam dormit. Adam in hortō dormit.', scene: SC.h2_dormit,
          nova: [{ w: 'dormit', e: '💤', g: '' }] },

        /* Gn 2,22 */
        { la: 'Adam dormit. Tum Deus mulierem creat.', scene: SC.h2_mulier,
          nova: [{ w: 'mulierem', e: '👤', g: 'mulier, mulierem' }] },

        /* Gn 2,23 + Gn 3,20 */
        { la: 'Adam mulierem Evam vocat.', scene: SC.h2_eva,
          nova: [{ w: 'Evam', e: '👤', g: 'Eva, Evam' }] },

        { la: 'Adam et Eva in hortō sunt. Ecce arbor!', scene: SC.h2_ambo,
          nova: [{ w: 'sunt', e: '👥', g: 'ūnus est, Adam et Eva sunt' }] },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Deus Adam et Evam creat.', scene: SC.h2_memoria,
          ttsText: 'Deus Adam et Evam creat.' }
      ],
      ludus: {
        words: [
          { la: 'hortus', scene: SC.v_hortus, emoji: '🌳' },
          { la: 'arbor',  scene: SC.v_arbor,  emoji: '🌳' },
          { la: 'animal', scene: SC.v_animal, emoji: '🦁' },
          { la: 'mulier', scene: SC.v_mulier, emoji: '👤' },
          { la: 'homō',   scene: SC.v_homo,   emoji: '👤' },
          { la: 'terra',  scene: SC.v_terra,  emoji: '🌍' }
        ]
      },
      /* SONUS: Adam / mulier / Eva / homō are four robed figures. Only ONE
         of them is ever offered in a set, against pictures that are not
         people at all — otherwise the ear is asked to do what only the
         text can decide. */
      sonus: [
        { la: 'hortus',
          answer: { la: 'hortus', scene: SC.v_hortus },
          options: [{ la: 'hortus', scene: SC.v_hortus },
                    { la: 'mare', scene: SC.v_mare },
                    { la: 'animal', scene: SC.v_animal }] },
        { la: 'arbor',
          answer: { la: 'arbor', scene: SC.v_arbor },
          options: [{ la: 'arbor', scene: SC.v_arbor },
                    { la: 'animal', scene: SC.v_animal },
                    { la: 'sōl', scene: SC.v_sol },
                    { la: 'mare', scene: SC.v_mare }] },
        { la: 'animal',
          answer: { la: 'animal', scene: SC.v_animal },
          options: [{ la: 'animal', scene: SC.v_animal },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'terra', scene: SC.v_terra }] },
        { la: 'dormit',
          answer: { la: 'dormit', scene: SC.v_dormit },
          options: [{ la: 'dormit', scene: SC.v_dormit },
                    { la: 'vocat', scene: SC.v_vocat },
                    { la: 'hortus', scene: SC.v_hortus },
                    { la: 'arbor', scene: SC.v_arbor }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'hortus', scene: SC.v_hortus },
            { la: 'arbor',  scene: SC.v_arbor },
            { la: 'animal', scene: SC.v_animal },
            { la: 'mulier', scene: SC.v_mulier },
            { la: 'dormit', scene: SC.v_dormit },
            { la: 'vocat',  scene: SC.v_vocat }
          ],
          scrambles: [
            { la: 'Hortus in terrā est.',     scene: SC.h2_hortus },
            { la: 'In hortō arbor est.',      scene: SC.h2_arbor },
            { la: 'Adam animal vocat.',       scene: SC.h2_vocat },
            { la: 'Adam in hortō dormit.',    scene: SC.h2_dormit }
          ]
        },
        corrige: [
          { words: ['Hortus', 'in', 'marī', 'est.'], wrong: 2,
            options: ['terrā', 'caelō', 'sōle'], correct: 0, scene: SC.h2_hortus },
          { words: ['In', 'hortō', 'mare', 'est.'], wrong: 2,
            options: ['arbor', 'sōl', 'lūx'], correct: 0, scene: SC.h2_arbor },
          { words: ['Adam', 'animal', 'creat.'], wrong: 2,
            options: ['vocat.', 'dormit.', 'est.'], correct: 0, scene: SC.h2_vocat },
          { words: ['Adam', 'in', 'hortō', 'vocat.'], wrong: 3,
            options: ['dormit.', 'creat.', 'est.'], correct: 0, scene: SC.h2_dormit },
          { words: ['Deus', 'arborem', 'creat.'], wrong: 1,
            options: ['mulierem', 'hortum', 'animal'], correct: 0, scene: SC.h2_mulier }
        ],
        comple: [
          { text: 'Deus hort___ creat.', options: ['um', 'us', 'ō'], correct: 0, scene: SC.h2_hortus },
          { text: 'Homō in hort___ est.', options: ['ō', 'um', 'us'], correct: 0, scene: SC.h2_adam },
          { text: 'In hortō ___ est.', options: ['arbor', 'mare', 'sōl'], correct: 0, scene: SC.h2_arbor },
          { text: 'Adam animal ___.', options: ['vocat', 'dormit', 'est'], correct: 0, scene: SC.h2_vocat },
          { text: 'Adam in hortō ___.', options: ['dormit', 'vocat', 'creat'], correct: 0, scene: SC.h2_dormit },
          { text: 'Tum Deus mulier___ creat.', options: ['em', 'ēs', 'is'], correct: 0, scene: SC.h2_mulier }
        ]
      }
    },

    /* ============ h3 — SERPĒNS CALLIDUS ============
       fons Gn 3, 1–6. The serpent's opening QUESTION (3,1) and the
       woman's answer (3,2–3) are kept because they are sayable at S1;
       the serpent's "nequaquam morte moriemini" and "eritis sicut dii"
       (3,4–5) are OMITTED — death and the promise of divinity need
       grammar this stage does not have, and an approximation would have
       altered what the serpent actually says. What is left is the true
       shape of the scene: God forbids, the serpent contradicts by
       praising, the woman looks and eats, the man eats. */
    {
      id: 'h3',
      titulus: 'Serpēns Callidus',
      icon: '🐍🍎',
      numerus: 'III',
      pos: { x: 0.26, y: 0.53 },
      fons: 'Gn 3, 1–6',
      vocab: [
        { la: 'serpēns',  scene: SC.v_serpens,  pars: 'nomen' },
        { la: 'pōmum',    emoji: '🍎',          pars: 'nomen' },
        { la: 'callidus', scene: SC.v_callidus, pars: 'adiectivum' },
        { la: 'bonus',    scene: SC.v_bonus,    pars: 'adiectivum' },
        { la: 'vetat',    scene: SC.v_vetat,    pars: 'verbum' },
        { la: 'dīcit',    scene: SC.v_dicit,    pars: 'verbum' },
        { la: 'videt',    scene: SC.v_videt,    pars: 'verbum' },
        { la: 'comedit',  scene: SC.v_comedit,  pars: 'verbum' }
      ],
      story: [
        /* Gn 3,1 */
        { la: 'In hortō serpēns est. Serpēns callidus est.', scene: SC.h3_serpens,
          nova: [{ w: 'serpēns', e: '🐍', g: '' },
                 { w: 'callidus', e: '💭', g: '' }] },

        /* Gn 2,9 / 3,3 — the tree in the middle of the garden */
        { la: 'Ecce arbor! In arbore pōmum est.', scene: SC.h3_arbor,
          nova: [{ w: 'pōmum', e: '🍎', g: '' }] },

        /* Gn 2,17 */
        { la: 'Deus pōmum vetat.', scene: SC.h3_vetat,
          nova: [{ w: 'vetat', e: '🚫', g: '' }] },

        { la: 'Serpēns callidus mulierem videt.', scene: SC.h3_videt,
          nova: [{ w: 'videt', e: '👀', g: '' }] },

        /* Gn 3,1 — the serpent's own question */
        { la: 'Serpēns dīcit: "Cūr Deus pōmum vetat?"', scene: SC.h3_dicit1,
          nova: [{ w: 'dīcit', e: '💬', g: '' },
                 { w: 'cūr', e: '❓', g: '' }] },

        /* Gn 3,2–3 */
        { la: 'Eva dīcit: "Deus pōmum vetat."', scene: SC.h3_dicit2 },

        /* Gn 3,4–5, simplified by omission to the serpent's praise */
        { la: 'Sed serpēns callidus dīcit: "Pōmum bonum est!"', scene: SC.h3_dicit3,
          nova: [{ w: 'bonum', e: '👍', g: 'bonus, bonum' }] },

        /* Gn 3,6 — "vidit igitur mulier quod bonum esset lignum" */
        { la: 'Eva pōmum videt. Pōmum bonum est.', scene: SC.h3_videt2 },

        { la: 'Eva pōmum comedit.', scene: SC.h3_comedit,
          nova: [{ w: 'comedit', e: '🍎', g: '' }] },

        /* Gn 3,6 — "deditque viro suo, qui comedit". The giving is in the
           picture: the woman holds the fruit out, the man takes it. */
        { la: 'Adam quoque pōmum bonum videt et comedit.', scene: SC.h3_adam },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Adam et Eva pōmum comedunt.', scene: SC.h3_memoria,
          ttsText: 'Adam et Eva pomum comedunt.',
          nova: [{ w: 'comedunt', e: '👥🍎', g: 'ūnus comedit, Adam et Eva comedunt' }] }
      ],
      ludus: {
        words: [
          { la: 'serpēns', scene: SC.v_serpens, emoji: '🐍' },
          { la: 'pōmum',   emoji: '🍎' },
          { la: 'arbor',   scene: SC.v_arbor,   emoji: '🌳' },
          { la: 'hortus',  scene: SC.v_hortus,  emoji: '🌳' },
          { la: 'mulier',  scene: SC.v_mulier,  emoji: '👤' },
          { la: 'animal',  scene: SC.v_animal,  emoji: '🦁' }
        ]
      },
      /* SONUS: callidus (a serpent thinking) and serpēns (a serpent) share
         a picture element, so they are never offered together; vetat and
         bonus are both bubble-carried judgements on the same tree, so they
         are kept apart for the same reason. */
      sonus: [
        { la: 'serpēns',
          answer: { la: 'serpēns', scene: SC.v_serpens },
          options: [{ la: 'serpēns', scene: SC.v_serpens },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'mulier', scene: SC.v_mulier }] },
        { la: 'pōmum',
          answer: { la: 'pōmum', emoji: '🍎' },
          options: [{ la: 'pōmum', emoji: '🍎' },
                    { la: 'serpēns', scene: SC.v_serpens },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'mare', scene: SC.v_mare }] },
        { la: 'videt',
          answer: { la: 'videt', scene: SC.v_videt },
          options: [{ la: 'videt', scene: SC.v_videt },
                    { la: 'dormit', scene: SC.v_dormit },
                    { la: 'serpēns', scene: SC.v_serpens }] },
        { la: 'comedit',
          answer: { la: 'comedit', scene: SC.v_comedit },
          options: [{ la: 'comedit', scene: SC.v_comedit },
                    { la: 'dormit', scene: SC.v_dormit },
                    { la: 'vocat', scene: SC.v_vocat },
                    { la: 'arbor', scene: SC.v_arbor }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'serpēns',  scene: SC.v_serpens },
            { la: 'pōmum',    emoji: '🍎' },
            { la: 'callidus', scene: SC.v_callidus },
            { la: 'vetat',    scene: SC.v_vetat },
            { la: 'videt',    scene: SC.v_videt },
            { la: 'comedit',  scene: SC.v_comedit }
          ],
          scrambles: [
            { la: 'In hortō serpēns est.',    scene: SC.h3_serpens },
            { la: 'In arbore pōmum est.',     scene: SC.h3_arbor },
            { la: 'Deus pōmum vetat.',        scene: SC.h3_vetat },
            { la: 'Eva pōmum comedit.',       scene: SC.h3_comedit }
          ]
        },
        corrige: [
          { words: ['In', 'hortō', 'animal', 'callidum', 'est.'], wrong: 2,
            options: ['serpēns', 'arbor', 'pōmum'], correct: 0, scene: SC.h3_serpens },
          { words: ['In', 'arbore', 'animal', 'est.'], wrong: 2,
            options: ['pōmum', 'mare', 'sōl'], correct: 0, scene: SC.h3_arbor },
          { words: ['Deus', 'pōmum', 'vocat.'], wrong: 2,
            options: ['vetat.', 'comedit.', 'dormit.'], correct: 0, scene: SC.h3_vetat },
          { words: ['Eva', 'pōmum', 'dormit.'], wrong: 2,
            options: ['comedit.', 'vetat.', 'creat.'], correct: 0, scene: SC.h3_comedit },
          { words: ['Serpēns', 'bonus', 'est.'], wrong: 1,
            options: ['callidus', 'parvus', 'novus'], correct: 0, scene: SC.h3_serpens }
        ],
        comple: [
          { text: 'In hortō ___ est.', options: ['serpēns', 'mare', 'sōl'], correct: 0, scene: SC.h3_serpens },
          { text: 'In arbore pōm___ est.', options: ['um', 'a', 'ī'], correct: 0, scene: SC.h3_arbor },
          { text: 'Deus pōmum ___.', options: ['vetat', 'comedit', 'vocat'], correct: 0, scene: SC.h3_vetat },
          { text: 'Serpēns mulier___ videt.', options: ['em', 'ēs', 'is'], correct: 0, scene: SC.h3_videt },
          { text: 'Pōmum ___ est.', options: ['bonum', 'bonus', 'bona'], correct: 0, scene: SC.h3_videt2 },
          { text: 'Eva pōmum ___.', options: ['comedit', 'vetat', 'dormit'], correct: 0, scene: SC.h3_comedit }
        ]
      }
    },

    /* ============ h4 — Ē PARADĪSŌ EXPULSĪ ============
       fons Gn 3, 7–24. Sorrow with dignity: nobody is mocked, nobody is
       shouted at, and the last picture of the garden is a guard, not a
       punishment.
       Gn 3,7 (the discovery of nakedness) is OMITTED outright, DESIGN §8;
       the tunics of skins (3,21) do all the work the leaves would have.
       Gn 3,14–19 (the three curses) is reduced to its one picturable
       consequence, Gn 3,23: "ut operaretur terram" — Adam now works.
       The flaming sword (3,24) is in the picture, unnamed: gladius would
       have been a ninth lexeme.
       "Ē paradīsō" cannot be SAID at S1 (ex + ablative is S4), so the
       expulsion is told the way the ladder allows: exit · in hortō nōn
       sunt · angelus hortum custōdit. Sentence changed, grammar intact. */
    {
      id: 'h4',
      titulus: 'Ē Paradīsō Expulsī',
      icon: '😢🗡',
      numerus: 'IV',
      pos: { x: 0.72, y: 0.36 },
      fons: 'Gn 3, 7–24',
      vocab: [
        { la: 'tunica',   scene: SC.v_tunica,   pars: 'nomen' },
        { la: 'angelus',  scene: SC.v_angelus,  pars: 'nomen' },
        { la: 'timet',    scene: SC.v_timet,    pars: 'verbum' },
        { la: 'latet',    scene: SC.v_latet,    pars: 'verbum' },
        { la: 'dat',      scene: SC.v_dat,      pars: 'verbum' },
        { la: 'exit',     scene: SC.v_exit,     pars: 'verbum' },
        { la: 'custōdit', scene: SC.v_custodit, pars: 'verbum' },
        { la: 'labōrat',  scene: SC.v_laborat,  pars: 'verbum' }
      ],
      story: [
        /* Gn 3,10 — "timui" */
        { la: 'Iam Adam et Eva timent.', scene: SC.h4_timent,
          nova: [{ w: 'timent', e: '😨', g: 'timet, timent' }] },

        /* Gn 3,8 */
        { la: 'Adam latet. Eva quoque latet.', scene: SC.h4_latent,
          nova: [{ w: 'latet', e: '🙈', g: 'nōn vidētur' }] },

        /* Gn 3,9 — "Vocavitque Dominus Deus Adam" */
        { la: 'Adam latet. Sed Deus Adam vocat. Adam timet.', scene: SC.h4_vocat,
          nova: [{ w: 'timet', e: '😨', g: '' }] },

        /* Gn 3,21 */
        { la: 'Deus tunicam dat.', scene: SC.h4_tunica,
          nova: [{ w: 'tunicam', e: '👕', g: 'tunica, tunicam' },
                 { w: 'dat', e: '🤲 ➡', g: '' }] },

        { la: 'Ecce tunica! Deus tunicam dat.', scene: SC.h4_tunica2,
          nova: [{ w: 'tunica', e: '👕', g: '' }] },

        /* Gn 3,23 */
        { la: 'Adam exit. Eva quoque exit.', scene: SC.h4_exeunt,
          nova: [{ w: 'exit', e: '🚶 ➡', g: '' }] },

        { la: 'Adam et Eva exeunt. Iam in hortō nōn sunt. Timent.',
          scene: SC.h4_extra },

        /* Gn 3,24 — cherubim; the Epitome's own word is angelus */
        { la: 'Ecce angelus! Angelus hortum custōdit.', scene: SC.h4_angelus,
          nova: [{ w: 'angelus', e: '👼', g: 'nūntius Deī' },
                 { w: 'custōdit', e: '🛡', g: '' }] },

        { la: 'Angelus hortum semper custōdit.', scene: SC.h4_custodit,
          nova: [{ w: 'semper', e: '♾', g: '' }] },

        /* Gn 3,23 — "ut operaretur terram" */
        { la: 'Iam Adam in terrā labōrat.', scene: SC.h4_laborat,
          nova: [{ w: 'labōrat', e: '💪', g: 'nōn dormit' }] },

        { la: 'Adam labōrat; Eva quoque labōrat.', scene: SC.h4_laborat2 },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Deus tunicam dat; angelus hortum custōdit.',
          scene: SC.h4_memoria,
          ttsText: 'Deus tunicam dat; angelus hortum custodit.' }
      ],
      ludus: {
        words: [
          { la: 'tunica',   scene: SC.v_tunica,   emoji: '👕' },
          { la: 'angelus',  scene: SC.v_angelus,  emoji: '👼' },
          { la: 'hortus',   scene: SC.v_hortus,   emoji: '🌳' },
          { la: 'arbor',    scene: SC.v_arbor,    emoji: '🌳' },
          { la: 'serpēns',  scene: SC.v_serpens,  emoji: '🐍' },
          { la: 'pōmum',    emoji: '🍎' }
        ]
      },
      sonus: [
        { la: 'angelus',
          answer: { la: 'angelus', scene: SC.v_angelus },
          options: [{ la: 'angelus', scene: SC.v_angelus },
                    { la: 'tunica', scene: SC.v_tunica },
                    { la: 'arbor', scene: SC.v_arbor }] },
        { la: 'tunica',
          answer: { la: 'tunica', scene: SC.v_tunica },
          options: [{ la: 'tunica', scene: SC.v_tunica },
                    { la: 'pōmum', emoji: '🍎' },
                    { la: 'angelus', scene: SC.v_angelus },
                    { la: 'hortus', scene: SC.v_hortus }] },
        { la: 'latet',
          answer: { la: 'latet', scene: SC.v_latet },
          options: [{ la: 'latet', scene: SC.v_latet },
                    { la: 'labōrat', scene: SC.v_laborat },
                    { la: 'exit', scene: SC.v_exit }] },
        { la: 'labōrat',
          answer: { la: 'labōrat', scene: SC.v_laborat },
          options: [{ la: 'labōrat', scene: SC.v_laborat },
                    { la: 'dormit', scene: SC.v_dormit },
                    { la: 'latet', scene: SC.v_latet },
                    { la: 'angelus', scene: SC.v_angelus }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'tunica',   scene: SC.v_tunica },
            { la: 'angelus',  scene: SC.v_angelus },
            { la: 'latet',    scene: SC.v_latet },
            { la: 'labōrat',  scene: SC.v_laborat },
            { la: 'exit',     scene: SC.v_exit },
            { la: 'custōdit', scene: SC.v_custodit }
          ],
          scrambles: [
            { la: 'Adam et Eva timent.',          scene: SC.h4_timent },
            { la: 'Deus tunicam dat.',            scene: SC.h4_tunica },
            { la: 'Angelus hortum custōdit.',     scene: SC.h4_angelus },
            { la: 'Adam in terrā labōrat.',       scene: SC.h4_laborat }
          ]
        },
        corrige: [
          { words: ['Deus', 'pōmum', 'dat.'], wrong: 1,
            options: ['tunicam', 'hortum', 'arborem'], correct: 0, scene: SC.h4_tunica },
          { words: ['Angelus', 'hortum', 'creat.'], wrong: 2,
            options: ['custōdit.', 'comedit.', 'dormit.'], correct: 0, scene: SC.h4_angelus },
          { words: ['Serpēns', 'hortum', 'custōdit.'], wrong: 0,
            options: ['Angelus', 'Eva', 'Animal'], correct: 0, scene: SC.h4_custodit },
          { words: ['Adam', 'in', 'terrā', 'dormit.'], wrong: 3,
            options: ['labōrat.', 'latet.', 'creat.'], correct: 0, scene: SC.h4_laborat },
          { words: ['Adam', 'et', 'Eva', 'dormiunt.'], wrong: 3,
            options: ['timent.', 'creant.', 'vocant.'], correct: 0, scene: SC.h4_timent }
        ],
        comple: [
          { text: 'Adam et Eva ___.', options: ['timent', 'timet', 'creant'], correct: 0, scene: SC.h4_timent },
          { text: 'Adam ___. Eva quoque latet.', options: ['latet', 'labōrat', 'exit'], correct: 0, scene: SC.h4_latent },
          { text: 'Deus tunic___ dat.', options: ['am', 'a', 'ā'], correct: 0, scene: SC.h4_tunica },
          { text: 'Adam ___. Eva quoque exit.', options: ['exit', 'dormit', 'creat'], correct: 0, scene: SC.h4_exeunt },
          { text: 'Angelus hort___ custōdit.', options: ['um', 'ō', 'us'], correct: 0, scene: SC.h4_angelus },
          { text: 'Adam in terrā ___.', options: ['labōrat', 'latet', 'dormit'], correct: 0, scene: SC.h4_laborat }
        ]
      }
    },

    /* ============ h5 — CAIN ET ABEL ============
       fons Gn 4. THE HARDEST B-RATING PAGE IN THE LIBER, and it is solved
       the Greek way: the deed happens off-stage between two pictures.
         · Cain frātrem in agrum vocat.   (both walking, the field ahead)
         · Posteā Abel nōn est.           (the field, empty, standing grain)
       No blow, no blood, no body, no weapon anywhere in the file. The
       Vulgate's own facts are all kept: the two offerings (4,3–4), God's
       regard and Cain's anger (4,5), the calling out (4,8), God's question
       "Ubi est Abel?" (4,9), the sign that PROTECTS Cain (4,15), the exile
       (4,16).
       OMITTED: 4,10–12 (the blood crying from the ground, the curse of the
       soil) — unsayable at S1 and the wrong picture for this rating;
       4,7 (God's warning) and 4,13–14 (Cain's despair), for the lexeme cap.
       ALTARS: Gn 4 says "munera" and "obtulit", not "altare"; the altars
       here are the traditional iconography and are the only way to show an
       offering. The fire that rises on one and not the other renders
       "respexit Dominus ad Abel … ad Cain non respexit" as a picture,
       because respicere has no S1 rendering. */
    {
      id: 'h5',
      titulus: 'Cain et Abel',
      icon: '🔥🌾',
      numerus: 'V',
      pos: { x: 0.30, y: 0.18 },
      fons: 'Gn 4',
      vocab: [
        { la: 'Cain',   scene: SC.v_cain,   pars: 'nomen' },
        { la: 'Abel',   scene: SC.v_abel,   pars: 'nomen' },
        { la: 'frāter', scene: SC.v_frater, pars: 'nomen' },
        { la: 'ager',   scene: SC.v_ager,   pars: 'nomen' },
        { la: 'dōnum',  scene: SC.v_donum,  pars: 'nomen' },
        { la: 'signum', scene: SC.v_signum, pars: 'nomen' },
        { la: 'īrātus', scene: SC.v_iratus, pars: 'adiectivum' },
        { la: 'ārdet',  scene: SC.v_ardet,  pars: 'verbum' }
      ],
      story: [
        /* Gn 4,1–2 */
        { la: 'Ecce Cain! Ecce Abel!', scene: SC.h5_fratres,
          nova: [{ w: 'Cain', e: '👤', g: '' },
                 { w: 'Abel', e: '👤', g: '' }] },

        { la: 'Cain frāter est; Abel quoque frāter est.', scene: SC.h5_frater,
          nova: [{ w: 'frāter', e: '👥', g: 'Cain et Abel' }] },

        /* Gn 4,2 — "Cain agricola" */
        { la: 'Cain in agrō labōrat.', scene: SC.h5_ager,
          nova: [{ w: 'agrō', e: '🌾', g: 'ager, in agrō' }] },

        /* Gn 4,2 — "Abel pastor ovium"; the flock is the picture */
        { la: 'Abel quoque in agrō est.', scene: SC.h5_abel,
          nova: [{ w: 'ager', e: '🌾', g: '' }] },

        /* Gn 4,3 */
        { la: 'Cain dōnum dat.', scene: SC.h5_donum1,
          nova: [{ w: 'dōnum', e: '🎁', g: 'Deō dōnum' }] },

        /* Gn 4,4 */
        { la: 'Abel quoque dōnum dat.', scene: SC.h5_donum2 },

        /* Gn 4,4 — "respexit Dominus ad Abel, et ad munera ejus" */
        { la: 'Ecce! Dōnum ārdet.', scene: SC.h5_ardet,
          nova: [{ w: 'ārdet', e: '🔥', g: '' }] },

        /* Gn 4,5 — "ad Cain vero … non respexit" */
        { la: 'Sed dōnum nōn ārdet.', scene: SC.h5_nonardet },

        /* Gn 4,5 — "iratusque est Cain vehementer" */
        { la: 'Cain videt: dōnum nōn ārdet. Cain īrātus est.', scene: SC.h5_iratus,
          nova: [{ w: 'īrātus', e: '😠', g: '' }] },

        /* Gn 4,8 — "Egrediamur foras … cumque essent in agro" */
        { la: 'Cain īrātus frātrem in agrum vocat.', scene: SC.h5_vocat,
          nova: [{ w: 'in agrum', e: '➡🌾', g: 'Cain et Abel in agrum ambulant' },
                 { w: 'frātrem', e: '👤', g: 'frāter, frātrem' }] },

        /* THE DEED IS OFF THE PAGE. Six words, and the picture is a field. */
        { la: 'Posteā Abel nōn est.', scene: SC.h5_solus,
          nova: [{ w: 'posteā', e: '1️⃣➡2️⃣', g: '' }] },

        /* Gn 4,9 — "Ubi est Abel frater tuus?" */
        { la: 'Deus Cain vocat: "Ubi est Abel?"', scene: SC.h5_ubi,
          nova: [{ w: 'ubi', e: '❓📍', g: '' }] },

        /* Gn 4,9 — "Nescio; num custos fratris mei sum ego?" The evasion is
           told as what it is at S1: he does not say. */
        { la: 'Cain timet. Cain īrātus nōn dīcit.', scene: SC.h5_tacet },

        /* Gn 4,15 — the sign is a PROTECTION, and the text says so */
        { la: 'Ecce signum! Deus signum dat.', scene: SC.h5_signum,
          nova: [{ w: 'signum', e: '✳', g: '' }] },

        /* Gn 4,16 */
        { la: 'Cain exit; sed signum Cain custōdit.', scene: SC.h5_exit },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Deus frātrem semper videt.', scene: SC.h5_memoria,
          ttsText: 'Deus fratrem semper videt.' }
      ],
      ludus: {
        words: [
          { la: 'ager',   scene: SC.v_ager,   emoji: '🌾' },
          { la: 'dōnum',  scene: SC.v_donum,  emoji: '🎁' },
          { la: 'frāter', scene: SC.v_frater, emoji: '👥' },
          { la: 'signum', scene: SC.v_signum, emoji: '✳' },
          { la: 'tunica', scene: SC.v_tunica, emoji: '👕' },
          { la: 'hortus', scene: SC.v_hortus, emoji: '🌳' }
        ]
      },
      /* SONUS: Cain, Abel, frāter and signum are all robed men in a field;
         only ONE of them is offered per set, and never against the other
         three (LATIN-STYLE §4 — a distractor must be wrong in the PICTURE,
         and three men in a field are not). */
      sonus: [
        { la: 'ager',
          answer: { la: 'ager', scene: SC.v_ager },
          options: [{ la: 'ager', scene: SC.v_ager },
                    { la: 'hortus', scene: SC.v_hortus },
                    { la: 'mare', scene: SC.v_mare }] },
        { la: 'dōnum',
          answer: { la: 'dōnum', scene: SC.v_donum },
          options: [{ la: 'dōnum', scene: SC.v_donum },
                    { la: 'ager', scene: SC.v_ager },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'tunica', scene: SC.v_tunica }] },
        { la: 'ārdet',
          answer: { la: 'ārdet', scene: SC.v_ardet },
          options: [{ la: 'ārdet', scene: SC.v_ardet },
                    { la: 'ager', scene: SC.v_ager },
                    { la: 'hortus', scene: SC.v_hortus }] },
        { la: 'īrātus',
          answer: { la: 'īrātus', scene: SC.v_iratus },
          options: [{ la: 'īrātus', scene: SC.v_iratus },
                    { la: 'dōnum', scene: SC.v_donum },
                    { la: 'arbor', scene: SC.v_arbor },
                    { la: 'mare', scene: SC.v_mare }] }
      ],
      overrides: {
        aenigmata: {
          /* dōnum (an altar) and ārdet (the SAME altar, alight) are the
             deliberate pair here: on a memory grid the word is on screen,
             so telling them apart is a reading task the learner can win. */
          pairs: [
            { la: 'ager',   scene: SC.v_ager },
            { la: 'dōnum',  scene: SC.v_donum },
            { la: 'ārdet',  scene: SC.v_ardet },
            { la: 'īrātus', scene: SC.v_iratus },
            { la: 'signum', scene: SC.v_signum },
            { la: 'frāter', scene: SC.v_frater }
          ],
          scrambles: [
            { la: 'Cain in agrō labōrat.', scene: SC.h5_ager },
            { la: 'Abel dōnum dat.',       scene: SC.h5_donum2 },
            { la: 'Dōnum ārdet.',          scene: SC.h5_ardet },
            { la: 'Deus signum dat.',      scene: SC.h5_signum }
          ]
        },
        corrige: [
          { words: ['Cain', 'in', 'hortō', 'labōrat.'], wrong: 2,
            options: ['agrō', 'caelō', 'marī'], correct: 0, scene: SC.h5_ager },
          { words: ['Abel', 'quoque', 'pōmum', 'dat.'], wrong: 2,
            options: ['dōnum', 'signum', 'tunicam'], correct: 0, scene: SC.h5_donum2 },
          { words: ['Dōnum', 'dormit.'], wrong: 1,
            options: ['ārdet.', 'labōrat.', 'vocat.'], correct: 0, scene: SC.h5_ardet },
          { words: ['Cain', 'laetus', 'est.'], wrong: 1,
            options: ['īrātus', 'bonus', 'callidus'], correct: 0, scene: SC.h5_iratus },
          { words: ['Deus', 'tunicam', 'dat.'], wrong: 1,
            options: ['signum', 'dōnum', 'pōmum'], correct: 0, scene: SC.h5_signum }
        ],
        comple: [
          { text: 'Cain in agr___ labōrat.', options: ['ō', 'um', 'us'], correct: 0, scene: SC.h5_ager },
          { text: 'Cain dōnum ___.', options: ['dat', 'vetat', 'videt'], correct: 0, scene: SC.h5_donum1 },
          { text: 'Dōnum ___.', options: ['ārdet', 'dormit', 'exit'], correct: 0, scene: SC.h5_ardet },
          { text: 'Cain ___ est.', options: ['īrātus', 'bonus', 'callidus'], correct: 0, scene: SC.h5_iratus },
          { text: 'Cain frātrem in agr___ vocat.', options: ['um', 'ō', 'us'], correct: 0, scene: SC.h5_vocat },
          { text: 'Deus ___ dat.', options: ['signum', 'pōmum', 'hortum'], correct: 0, scene: SC.h5_signum }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ----------
     NO BOSS. CURRICULUM §2 gives Liber I no probātiō: the first door of
     the track opens on five capitula and nothing else, so a learner who
     starts here is never asked to fight before he can read. The map
     simply ends at h5 (js/app.js only pushes a boss node when the region
     declares one). */
  CONTENT.registerRegion({
    track: 'historia',
    id: 'l1',
    titulus: 'Creātiō',
    ladder: 'S1',              /* CURRICULUM §0: nom/acc sg, esse, 3rd-p present */
    progressId: 'l1',
    capitula: capitula
  });
})();
