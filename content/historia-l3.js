/* ============================================================
   content/historia-l3.js — HISTORIA SACRA · Liber III · ABRAHAM  (ladder S3)
   ------------------------------------------------------------
   Six capitula from Genesis 12–24, still in the NARRATIVE PRESENT
   (CURRICULUM §2: the perfect arrives at Liber VI):

     h11 Vocātiō Abrahae    — Gn 12, 1–9
     h12 Abraham et Lot     — Gn 13
     h13 Prōmissum Deī      — Gn 15, 1–6
     h14 Isaac nāscitur     — Gn 21, 1–8
     h15 Sacrificium Isaac  — Gn 22, 1–19
     h16 Rebecca ad puteum  — Gn 24 (abridged)
     PROBĀTIŌ 'Prōmissa'    — sententia (DESIGN §6)

   STAGE CEILING (CURRICULUM §0 S3, binding):
     everything Librī I–II may use (nom/acc sg + pl · est/sunt ·
     3rd-person present of ANY conjugation, AUTHORING-BRIEF ruling 1 ·
     -que · et…et · nōn) PLUS the GENITIVE and the DATIVE sg/pl.
     NO ablative beyond the receptive locative `in` + abl that Librī I–II
     already ship (in terrā, in agrō, in caelō, in arcā, in montē…) and
     the `in`/`ad` + acc of direction, glossed with an arrow at first use.
     NO free ablative, NO imperative, NO vocative, NO pronouns, NO
     imperfect, NO perfect, NO comparative, NO infinitive.
     Where the ladder and the episode collided the SENTENCE was changed,
     never the grammar (AUTHORING-BRIEF, golden exemplar).

   THE GENITIVE AND THE DATIVE ARE PICTURED BEFORE THEY ARE ASSERTED,
   exactly as Regiō III does it in FĀBULAE:
     · h11 p4  `mulier Abrahae` — the picture is the pair standing
       together; the gloss is the arrow `Abraham → mulier Abrahae`.
     · h11 p15 `Deō dōnum dat`  — the picture is the altar and the
       radiance; the gloss is `Deus → Abraham Deō dōnum dat`.
   Marked, unmistakable endings come first (`Abrahae`, `Deō`,
   `pāstōribus`, `camēlīs`, `ovium`); no ambiguous form is ever the
   learner's FIRST sight of a case.

   NAMES — every form verified in latin-sources/vulgata-clementina-raw.txt:
     Abraham  gen./dat. `Abrahae` (Gn 22,20 "nuntiatum est Abrahæ";
              Gn 25,12 "filii Abrahæ"); acc. `Abraham` (Gn 17,9 "ad
              Abraham"). The name ABRAM (Gn 12–16) and its change at
              Gn 17,5 are OMITTED — see the ledger; the patriarch carries
              his Vulgate name Abraham from the first page.
     Sara     acc. `Saram` (Gn 21,1), gen./dat. `Sarae` (Gn 24,67
              "tabernaculum Saræ matris suæ").
     Lot      INDECLINABLE (nom. Gn 13,5; acc. Gn 13,8 "ad Lot"; the
              oblique cases are the same form), so `grex Lot` is a
              genitive and `Abraham Lot terram dat` a dative.
     Isaac    INDECLINABLE (nom. Gn 21,5; acc. Gn 25,19 "genuit Isaac";
              dat. Gn 24,4 "uxorem filio meo Isaac"; gen. Gn 28,13
              "Deus Isaac").
     Rebecca  acc. `Rebeccam` (Gn 25,20), gen./dat. `Rebeccae` (Gn 24,29
              "frater Rebeccæ"). Fully declined, 1st declension.

   GOD is drawn exactly as in Librī I–II: the gold radiance (`star`),
   never a body, and a gold speech bubble for his word.

   FIXED VULGATE FORMULAE — one per capitulum at most, image-glossed and
   NEVER parsed (the `Fiat lūx` mechanism of h1):
     h11 `Egredere dē terrā tuā` (Gn 12,1)
     h12 `Frātrēs sumus`         (Gn 13,8 "fratres enim sumus")
     h13 `Numerā stēllās`        (Gn 15,5 "numera stellas, si potes")
     h15 `Abraham!`              (Gn 22,1.11 — the vocative of an
         indeclinable name is identical to the nominative, so the
         name-call is legal as written; it is flagged in the report)
   h14 and h16 carry none.

   B-RATING (DESIGN §8) — the two decisions that shaped this liber:
     · SODOM (Gn 19) IS ABSENT IN FULL. Lot walks toward the city in h12
       and the liber never returns to him. Nothing is destroyed, nothing
       is threatened, nothing is renamed.
     · h15 NEVER PUTS A WEAPON OR A BOUND CHILD ON THE PAGE. Gn 22,6's
       sword, Gn 22,9's binding and Gn 22,10's raised hand are all
       omitted. What is shown is the climb, the altar, Isaac's own
       question, the angel's call and the ram — the Vulgate's own
       resolution, which is the child-safe telling.

   MISSING ART, reported and NOT substituted: there is no `aries` actor.
   Gn 22,13's ram is therefore told and drawn as `ovis` — a sheep, which
   a ram is — using the `lamb` and `grex` actors. The word `aries` never
   appears, so nothing false is shown or said. (Art addendum request: a
   horned `aries`.)

   FIDELITY: every capitulum carries `fons`; every episode was checked
   against the Clementine text BEFORE writing and is simplified by
   OMISSION only. The omissions are registered in
   content/_ledger-historia.md.

   IDS ARE DATABASE KEYS once shipped: h11…h16, boss b_l3, progressId
   'l3' (content/README.md §5).

   Schema: content/README.md. Style: docs/LATIN-STYLE.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space (400 × 240) */

  /* ---------- shared scene specs ---------- */

  var SC = {

    /* ============ vocabulary mini-scenes ============ */

    v_abraham:  { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'patriarch' }
                ] },

    v_sara:     { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.08, role: 'woman' }
                ] },

    v_lot:      { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.08, role: 'man' }
                ] },

    v_tabernaculum: { bg: 'desert', items: [
                  { t: 'tent', x: 200, y: G, s: 1.05 }
                ] },

    v_camelus:  { bg: 'desert', items: [
                  { t: 'camelus', x: 200, y: G, s: 0.9 }
                ] },

    /* grex = the FLOCK (three together); ovis = ONE sheep (`lamb`).
       Two different pictures, so no exercise can be a coin-flip. */
    v_grex:     { bg: 'plain', items: [
                  { t: 'grex', x: 200, y: G, s: 1.35 }
                ] },

    v_ovis:     { bg: 'plain', items: [
                  { t: 'lamb', x: 200, y: G, s: 1.5, flip: true }
                ] },

    v_ambulat:  { bg: 'desert', items: [
                  { t: 'person', x: 148, y: G, s: 1.05, role: 'patriarch', pose: 'walk' }
                ],
                bubbles: [{ x: 306, y: 96, w: 58, h: 42, text: '🚶', kind: 'thought', tail: 'left', fs: 20 }] },

    v_monstrat: { bg: 'desert', items: [
                  { t: 'star',   x: 88,  y: 84, s: 0.85 },
                  { t: 'person', x: 208, y: G, s: 1.05, role: 'patriarch', pose: 'point' }
                ],
                bubbles: [{ x: 332, y: 110, w: 56, h: 42, text: '👉', kind: 'thought', tail: 'left', fs: 20 }] },

    v_magnus:   { bg: 'plain', items: [
                  { t: 'camelus', x: 262, y: G, s: 1.05 },
                  { t: 'lamb',    x: 92,  y: G, s: 0.7, flip: true }
                ],
                bubbles: [{ x: 300, y: 66, w: 56, h: 40, text: '⬆', kind: 'thought', tail: 'left', fs: 20 }] },

    v_parvus:   { bg: 'plain', items: [
                  { t: 'camelus', x: 300, y: G, s: 1.05 },
                  { t: 'lamb',    x: 118, y: G, s: 0.7, flip: true }
                ],
                bubbles: [{ x: 66, y: 106, w: 56, h: 40, text: '⬇', kind: 'thought', tail: 'right', fs: 20 }] },

    v_pastor:   { bg: 'plain', items: [
                  { t: 'grex',   x: 268, y: G, s: 1.1 },
                  { t: 'person', x: 108, y: G, s: 1.05, role: 'shepherd' }
                ] },

    v_bos:      { bg: 'plain', items: [
                  { t: 'bos', x: 200, y: G, s: 1 }
                ] },

    v_manet:    { bg: 'desert', items: [
                  { t: 'tent',   x: 128, y: G, s: 0.95 },
                  { t: 'person', x: 210, y: G, s: 1.05, role: 'patriarch' },
                  { t: 'person', x: 350, y: G, s: 0.9,  role: 'man', pose: 'walk' }
                ] },

    v_stella:   { bg: 'nightSky', items: [
                  { t: 'person', x: 96, y: G, s: 1.05, role: 'patriarch', pose: 'arms-up' }
                ],
                bubbles: [{ x: 288, y: 156, w: 64, h: 42, text: '⭐⭐', kind: 'thought', tail: 'left', fs: 18 }] },

    v_nox:      { bg: 'nightSky', items: [
                  { t: 'tent',   x: 268, y: G, s: 0.95 },
                  { t: 'person', x: 128, y: G, s: 1.05, role: 'patriarch' }
                ] },

    v_numerat:  { bg: 'nightSky', items: [
                  { t: 'person', x: 120, y: G, s: 1.05, role: 'patriarch', pose: 'point' }
                ],
                bubbles: [{ x: 306, y: 120, w: 72, h: 44, text: '1️⃣2️⃣3️⃣', kind: 'thought', tail: 'left', fs: 16 }] },

    v_credit:   { bg: 'nightSky', items: [
                  { t: 'star',   x: 300, y: 96, s: 0.95 },
                  { t: 'person', x: 128, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' }
                ] },

    v_senex:    { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'patriarch', hair: 'long', beard: 'long' }
                ],
                bubbles: [{ x: 92, y: 92, w: 56, h: 40, text: '👴', kind: 'thought', tail: 'right', fs: 20 }] },

    v_isaac:    { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.25, role: 'child' }
                ] },

    v_puer:     { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.25, role: 'child' }
                ] },

    v_mater:    { bg: 'plain', items: [
                  { t: 'person', x: 176, y: G, s: 1.05, role: 'woman' },
                  { t: 'person', x: 246, y: G, s: 1.15, role: 'child' }
                ] },

    v_pater:    { bg: 'plain', items: [
                  { t: 'person', x: 172, y: G, s: 1.1,  role: 'patriarch' },
                  { t: 'person', x: 248, y: G, s: 1.15, role: 'child' }
                ] },

    v_nomen:    { bg: 'plain', items: [
                  { t: 'person', x: 150, y: G, s: 1.05, role: 'woman', pose: 'point' },
                  { t: 'person', x: 250, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 90, y: 82, w: 62, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    v_habet:    { bg: 'plain', items: [
                  { t: 'person', x: 168, y: G, s: 1.05, role: 'woman' },
                  { t: 'person', x: 236, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 84, y: 88, w: 58, h: 40, text: '👐', kind: 'thought', tail: 'right', fs: 20 }] },

    v_ridet:    { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.08, role: 'woman' }
                ],
                bubbles: [{ x: 96, y: 84, w: 58, h: 42, text: '😄', kind: 'thought', tail: 'right', fs: 20 }] },

    v_laetus:   { bg: 'plain', items: [
                  { t: 'person', x: 148, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' },
                  { t: 'person', x: 254, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 330, y: 82, w: 58, h: 42, text: '😄', kind: 'thought', tail: 'left', fs: 20 }] },

    v_paret:    { bg: 'mountain', items: [
                  { t: 'star',   x: 300, y: 88, s: 0.9 },
                  { t: 'person', x: 148, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' }
                ],
                bubbles: [{ x: 68, y: 100, w: 60, h: 42, text: '🙇', kind: 'thought', tail: 'right', fs: 20 }] },

    v_ascendit: { bg: 'mountain', items: [
                  { t: 'person', x: 132, y: 176, s: 0.85, role: 'patriarch', pose: 'walk' }
                ],
                bubbles: [{ x: 306, y: 92, w: 58, h: 42, text: '⛰⬆', kind: 'thought', tail: 'left', fs: 18 }] },

    v_amat:     { bg: 'desert', items: [
                  { t: 'person', x: 166, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'person', x: 242, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 90, y: 84, w: 58, h: 42, text: '💛', kind: 'thought', tail: 'right', fs: 20 }] },

    v_benedicit: { bg: 'mountain', items: [
                  { t: 'star',   x: 200, y: 82, s: 1.05 },
                  { t: 'person', x: 142, y: G, s: 1.05, role: 'patriarch', pose: 'arms-up' },
                  { t: 'person', x: 250, y: G, s: 1.1,  role: 'child' }
                ] },

    v_rebecca:  { bg: 'desert', items: [
                  { t: 'person', x: 200, y: G, s: 1.08, role: 'woman' }
                ] },

    v_puteus:   { bg: 'desert', items: [
                  { t: 'well', x: 200, y: G, s: 1.25 }
                ] },

    v_servus:   { bg: 'desert', items: [
                  { t: 'camelus', x: 296, y: G, s: 0.75 },
                  { t: 'person',  x: 136, y: G, s: 1.05, role: 'man' }
                ] },

    v_bibit:    { bg: 'desert', items: [
                  { t: 'well',    x: 100, y: G, s: 1 },
                  { t: 'camelus', x: 262, y: G, s: 0.8 }
                ],
                bubbles: [{ x: 330, y: 92, w: 58, h: 42, text: '💧', kind: 'thought', tail: 'left', fs: 20 }] },

    v_urna:     { bg: 'desert', items: [
                  { t: 'urna', x: 200, y: G, s: 1.4 }
                ] },

    v_uxor:     { bg: 'desert', items: [
                  { t: 'person', x: 170, y: G, s: 1.08, role: 'man' },
                  { t: 'person', x: 240, y: G, s: 1.05, role: 'woman' }
                ] },

    v_quaerit:  { bg: 'desert', items: [
                  { t: 'camelus', x: 306, y: G, s: 0.72 },
                  { t: 'person',  x: 128, y: G, s: 1.05, role: 'man', pose: 'point' }
                ],
                bubbles: [{ x: 214, y: 92, w: 56, h: 42, text: '👀', kind: 'thought', tail: 'right', fs: 20 }] },

    /* ============ h11 — Vocātiō Abrahae ============ */

    h11_abraham: { bg: 'desert', items: [
                  { t: 'tent',   x: 316, y: G, s: 0.85 },
                  { t: 'person', x: 168, y: G, s: 1.12, role: 'patriarch' }
                ] },

    h11_tabernaculum: { bg: 'desert', items: [
                  { t: 'tent',   x: 210, y: G, s: 1.1 },
                  { t: 'person', x: 90,  y: G, s: 1.05, role: 'patriarch' }
                ] },

    h11_sara:   { bg: 'desert', items: [
                  { t: 'tent',   x: 300, y: G, s: 0.95 },
                  { t: 'person', x: 168, y: G, s: 1.05, role: 'woman' }
                ] },

    h11_sara2:  { bg: 'desert', items: [
                  { t: 'tent',   x: 322, y: G, s: 0.85 },
                  { t: 'person', x: 148, y: G, s: 1.1,  role: 'patriarch' },
                  { t: 'person', x: 218, y: G, s: 1.05, role: 'woman' }
                ] },

    h11_grex:   { bg: 'plain', items: [
                  { t: 'grex',   x: 246, y: G, s: 1.2 },
                  { t: 'person', x: 92,  y: G, s: 1.05, role: 'patriarch' }
                ] },

    h11_cameli: { bg: 'plain', items: [
                  { t: 'camelus', x: 268, y: G, s: 0.8 },
                  { t: 'camelus', x: 158, y: G, s: 0.72 },
                  { t: 'person',  x: 62,  y: G, s: 1, role: 'patriarch' }
                ] },

    h11_lot:    { bg: 'desert', items: [
                  { t: 'tent',   x: 328, y: G, s: 0.8 },
                  { t: 'person', x: 116, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'person', x: 202, y: G, s: 1,    role: 'man' }
                ] },

    h11_vocat:  { bg: 'desert', items: [
                  { t: 'star',   x: 92,  y: 84, s: 0.95 },
                  { t: 'person', x: 250, y: G, s: 1.1, role: 'patriarch' }
                ],
                bubbles: [{ x: 168, y: 120, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    /* THE FIXED FORMULA (Gn 12,1). The bubble is God's own gold word;
       the tent behind Abraham and the road in front of him are the gloss. */
    h11_verbum: { bg: 'desert', items: [
                  { t: 'star',   x: 88,  y: 82, s: 1 },
                  { t: 'tent',   x: 344, y: G, s: 0.72 },
                  { t: 'person', x: 246, y: G, s: 1.08, role: 'patriarch' }
                ],
                bubbles: [{ x: 176, y: 118, w: 132, h: 46,
                            text: 'Egredere dē terrā tuā', kind: 'speech', tail: 'right', fs: 11 }] },

    h11_monstrat: { bg: 'desert', items: [
                  { t: 'star',   x: 84,  y: 84, s: 0.9 },
                  { t: 'person', x: 196, y: G, s: 1.08, role: 'patriarch', pose: 'point' },
                  { t: 'palmTree', x: 358, y: G, s: 0.6 }
                ] },

    h11_exeunt: { bg: 'desert', items: [
                  { t: 'tent',   x: 62,  y: G, s: 0.85 },
                  { t: 'person', x: 176, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                  { t: 'person', x: 244, y: G, s: 1,    role: 'woman', pose: 'walk' },
                  { t: 'person', x: 306, y: G, s: 1,    role: 'man', pose: 'walk' }
                ] },

    h11_ambulant: { bg: 'desert', items: [
                  { t: 'person', x: 118, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                  { t: 'person', x: 196, y: G, s: 1,    role: 'woman', pose: 'walk' },
                  { t: 'person', x: 264, y: G, s: 1,    role: 'man', pose: 'walk' }
                ] },

    h11_grexambulat: { bg: 'desert', items: [
                  { t: 'camelus', x: 106, y: G, s: 0.72 },
                  { t: 'camelus', x: 210, y: G, s: 0.66 },
                  { t: 'grex',    x: 316, y: G, s: 0.95 }
                ] },

    h11_adterram: { bg: 'desert', items: [
                  { t: 'palmTree', x: 350, y: G, s: 0.66 },
                  { t: 'person',   x: 122, y: G, s: 1.05, role: 'patriarch', pose: 'walk' }
                ],
                bubbles: [{ x: 224, y: 92, w: 58, h: 42, text: '➡', kind: 'thought', tail: 'right', fs: 22 }] },

    h11_altare: { bg: 'desert', items: [
                  { t: 'star',   x: 96,  y: 80, s: 0.85 },
                  { t: 'altar',  x: 268, y: G, s: 1, flame: true, smoke: true },
                  { t: 'person', x: 158, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' }
                ] },

    h11_memoria: { bg: 'desert', items: [
                  { t: 'star',     x: 92,  y: 82, s: 0.85 },
                  { t: 'palmTree', x: 352, y: G, s: 0.6 },
                  { t: 'person',   x: 184, y: G, s: 1.08, role: 'patriarch', pose: 'point' }
                ] },

    /* ============ h12 — Abraham et Lot ============ */

    h12_ambo:   { bg: 'desert', items: [
                  { t: 'tent',   x: 74,  y: G, s: 0.8 },
                  { t: 'tent',   x: 330, y: G, s: 0.8 },
                  { t: 'person', x: 158, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'person', x: 244, y: G, s: 1,    role: 'man', flip: true }
                ] },

    h12_grexA:  { bg: 'plain', items: [
                  { t: 'grex',   x: 236, y: G, s: 1.3 },
                  { t: 'grex',   x: 336, y: G, s: 1 },
                  { t: 'person', x: 84,  y: G, s: 1.05, role: 'patriarch' }
                ] },

    h12_grexL:  { bg: 'plain', items: [
                  { t: 'grex',   x: 180, y: G, s: 1.25 },
                  { t: 'grex',   x: 296, y: G, s: 1.05 },
                  { t: 'person', x: 76,  y: G, s: 1, role: 'man' }
                ] },

    h12_ovis:   { bg: 'plain', items: [
                  { t: 'lamb', x: 132, y: G, s: 1.35, flip: true },
                  { t: 'grex', x: 292, y: G, s: 1 }
                ] },

    h12_greges: { bg: 'plain', items: [
                  { t: 'grex', x: 90,  y: G, s: 1.05 },
                  { t: 'grex', x: 212, y: G, s: 1.1 },
                  { t: 'grex', x: 326, y: G, s: 0.95 }
                ] },

    h12_bos:    { bg: 'plain', items: [
                  { t: 'bos',  x: 244, y: G, s: 1 },
                  { t: 'lamb', x: 110, y: G, s: 0.85, flip: true }
                ] },

    h12_pastores: { bg: 'plain', items: [
                  { t: 'grex',   x: 232, y: G, s: 1.05 },
                  { t: 'person', x: 96,  y: G, s: 1.05, role: 'shepherd' },
                  { t: 'person', x: 330, y: G, s: 1,    role: 'shepherd', flip: true }
                ] },

    /* the quarrel is TWO SHOUTS and nothing else: no gesture, no blow */
    h12_rixa:   { bg: 'plain', items: [
                  { t: 'grex',   x: 200, y: G, s: 0.95 },
                  { t: 'person', x: 84,  y: G, s: 1.05, role: 'shepherd' },
                  { t: 'person', x: 318, y: G, s: 1.05, role: 'shepherd', flip: true }
                ],
                bubbles: [{ x: 70, y: 74, w: 56, h: 40, text: '📢', kind: 'speech', tail: 'right', fs: 19 },
                          { x: 330, y: 74, w: 56, h: 40, text: '📢', kind: 'speech', tail: 'left', fs: 19 }] },

    h12_parva:  { bg: 'plain', items: [
                  { t: 'grex',   x: 132, y: G, s: 1.15 },
                  { t: 'grex',   x: 236, y: G, s: 1.1 },
                  { t: 'grex',   x: 330, y: G, s: 1.05 },
                  { t: 'person', x: 52,  y: G, s: 1, role: 'shepherd' }
                ],
                bubbles: [{ x: 200, y: 62, w: 66, h: 42, text: '⬅➡', kind: 'thought', tail: 'left', fs: 18 }] },

    /* THE FIXED FORMULA (Gn 13,8). Two men, one bubble, no flocks —
       the picture says only what the words say. */
    h12_fratres: { bg: 'desert', items: [
                  { t: 'person', x: 142, y: G, s: 1.1,  role: 'patriarch' },
                  { t: 'person', x: 232, y: G, s: 1.02, role: 'man', flip: true }
                ],
                bubbles: [{ x: 82, y: 84, w: 86, h: 42,
                            text: 'Frātrēs sumus', kind: 'speech', tail: 'right', fs: 13 }] },

    h12_dat:    { bg: 'desert', items: [
                  { t: 'person',   x: 128, y: G, s: 1.1, role: 'patriarch', pose: 'point' },
                  { t: 'person',   x: 236, y: G, s: 1,   role: 'man' },
                  { t: 'palmTree', x: 356, y: G, s: 0.62 }
                ] },

    h12_eligit: { bg: 'plain', items: [
                  { t: 'person', x: 118, y: G, s: 1.05, role: 'man', pose: 'point' },
                  { t: 'bush',   x: 296, y: G },
                  { t: 'bush',   x: 348, y: G }
                ] },

    h12_discedunt: { bg: 'desert', items: [
                  { t: 'person', x: 68,  y: G, s: 1.05, role: 'patriarch', pose: 'walk', flip: true },
                  { t: 'person', x: 332, y: G, s: 1,    role: 'man', pose: 'walk' }
                ] },

    h12_urbs:   { bg: 'plain', items: [
                  { t: 'cityWall', x: 300, y: G, s: 0.8 },
                  { t: 'person',   x: 104, y: G, s: 1, role: 'man', pose: 'walk' },
                  { t: 'grex',     x: 46,  y: G, s: 0.85 }
                ] },

    h12_manet:  { bg: 'desert', items: [
                  { t: 'tent',   x: 148, y: G, s: 1 },
                  { t: 'person', x: 244, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'grex',   x: 340, y: G, s: 0.9 }
                ] },

    h12_promittit: { bg: 'desert', items: [
                  { t: 'star',   x: 96,  y: 82, s: 0.95 },
                  { t: 'person', x: 214, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' },
                  { t: 'palmTree', x: 356, y: G, s: 0.58 }
                ] },

    h12_memoria: { bg: 'desert', items: [
                  { t: 'person', x: 132, y: G, s: 1.08, role: 'patriarch', pose: 'point' },
                  { t: 'person', x: 258, y: G, s: 1,    role: 'man' },
                  { t: 'grex',   x: 348, y: G, s: 0.85 }
                ] },

    /* ============ h13 — Prōmissum Deī ============ */

    h13_senex:  { bg: 'desert', items: [
                  { t: 'tent',   x: 314, y: G, s: 0.85 },
                  { t: 'person', x: 160, y: G, s: 1.12, role: 'patriarch' }
                ] },

    h13_nofilius: { bg: 'desert', items: [
                  { t: 'tent',   x: 300, y: G, s: 0.9 },
                  { t: 'person', x: 132, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'person', x: 208, y: G, s: 1.02, role: 'woman' }
                ],
                bubbles: [{ x: 68, y: 84, w: 62, h: 42, text: '👶🚫', kind: 'thought', tail: 'right', fs: 17 }] },

    h13_nox:    { bg: 'nightSky', items: [
                  { t: 'tent',   x: 300, y: G, s: 0.9 },
                  { t: 'person', x: 142, y: G, s: 1.08, role: 'patriarch' }
                ] },

    h13_stellae: { bg: 'nightSky', items: [
                  { t: 'person', x: 118, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' }
                ],
                bubbles: [{ x: 292, y: 150, w: 76, h: 44, text: '⭐⭐⭐', kind: 'thought', tail: 'left', fs: 17 }] },

    h13_numerat: { bg: 'nightSky', items: [
                  { t: 'person', x: 122, y: G, s: 1.08, role: 'patriarch', pose: 'point' }
                ],
                bubbles: [{ x: 300, y: 128, w: 78, h: 44, text: '1️⃣2️⃣3️⃣', kind: 'thought', tail: 'left', fs: 16 }] },

    /* THE FIXED FORMULA (Gn 15,5). The night sky is already full of
       stars: the picture IS the gloss. */
    h13_verbum: { bg: 'nightSky', items: [
                  { t: 'star',   x: 322, y: 92, s: 0.95 },
                  { t: 'person', x: 122, y: G, s: 1.05, role: 'patriarch' }
                ],
                bubbles: [{ x: 214, y: 148, w: 106, h: 44,
                            text: 'Numerā stēllās', kind: 'speech', tail: 'left', fs: 13 }] },

    h13_promittit: { bg: 'nightSky', items: [
                  { t: 'star',   x: 314, y: 96, s: 1 },
                  { t: 'person', x: 116, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' }
                ] },

    h13_sic:    { bg: 'nightSky', items: [
                  { t: 'person', x: 108, y: G, s: 1.05, role: 'patriarch', pose: 'point' }
                ],
                bubbles: [{ x: 286, y: 142, w: 82, h: 44, text: '⭐➡👥', kind: 'thought', tail: 'left', fs: 17 }] },

    h13_credit: { bg: 'nightSky', items: [
                  { t: 'star',   x: 310, y: 100, s: 0.95 },
                  { t: 'person', x: 130, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' }
                ] },

    h13_semper: { bg: 'desert', items: [
                  { t: 'star',   x: 100, y: 82, s: 0.85 },
                  { t: 'person', x: 232, y: G, s: 1.08, role: 'patriarch', pose: 'kneel' }
                ] },

    h13_memoria: { bg: 'nightSky', items: [
                  { t: 'star',   x: 318, y: 96, s: 0.9 },
                  { t: 'person', x: 126, y: G, s: 1.05, role: 'patriarch', pose: 'arms-up' }
                ] },

    /* ============ h14 — Isaac nāscitur ============ */

    h14_senes:  { bg: 'desert', items: [
                  { t: 'tent',   x: 320, y: G, s: 0.85 },
                  { t: 'person', x: 138, y: G, s: 1.1,  role: 'patriarch' },
                  { t: 'person', x: 216, y: G, s: 1.02, role: 'woman' }
                ] },

    h14_promissum: { bg: 'desert', items: [
                  { t: 'star',   x: 96,  y: 84, s: 0.9 },
                  { t: 'person', x: 218, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' }
                ] },

    h14_puer:   { bg: 'plain', items: [
                  { t: 'tent',   x: 330, y: G, s: 0.8 },
                  { t: 'person', x: 156, y: G, s: 1.05, role: 'woman' },
                  { t: 'person', x: 228, y: G, s: 1.15, role: 'child' }
                ] },

    h14_materpater: { bg: 'plain', items: [
                  { t: 'person', x: 120, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'person', x: 200, y: G, s: 1.15, role: 'child' },
                  { t: 'person', x: 276, y: G, s: 1.02, role: 'woman' }
                ] },

    h14_nomen:  { bg: 'plain', items: [
                  { t: 'person', x: 142, y: G, s: 1.08, role: 'patriarch', pose: 'point' },
                  { t: 'person', x: 246, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 84, y: 82, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    h14_isaac:  { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.3, role: 'child' }
                ] },

    h14_ridet:  { bg: 'plain', items: [
                  { t: 'person', x: 168, y: G, s: 1.05, role: 'woman' },
                  { t: 'person', x: 244, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 92, y: 82, w: 58, h: 42, text: '😄', kind: 'thought', tail: 'right', fs: 20 }] },

    h14_ridet2: { bg: 'plain', items: [
                  { t: 'person', x: 178, y: G, s: 1.1, role: 'patriarch' },
                  { t: 'person', x: 262, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 96, y: 82, w: 58, h: 42, text: '😄', kind: 'thought', tail: 'right', fs: 20 }] },

    h14_puerridet: { bg: 'plain', items: [
                  { t: 'person', x: 200, y: G, s: 1.28, role: 'child' }
                ],
                bubbles: [{ x: 92, y: 96, w: 58, h: 42, text: '😄', kind: 'thought', tail: 'right', fs: 20 }] },

    h14_aqua:   { bg: 'plain', items: [
                  { t: 'urna',   x: 118, y: G, s: 1 },
                  { t: 'person', x: 186, y: G, s: 1.05, role: 'woman', pose: 'point' },
                  { t: 'person', x: 268, y: G, s: 1.15, role: 'child' }
                ] },

    h14_laeti:  { bg: 'plain', items: [
                  { t: 'person', x: 128, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' },
                  { t: 'person', x: 210, y: G, s: 1.15, role: 'child' },
                  { t: 'person', x: 292, y: G, s: 1.02, role: 'woman', pose: 'arms-up' }
                ] },

    h14_donum:  { bg: 'desert', items: [
                  { t: 'star',   x: 92,  y: 82, s: 0.9 },
                  { t: 'person', x: 200, y: G, s: 1.08, role: 'patriarch', pose: 'arms-up' },
                  { t: 'person', x: 286, y: G, s: 1.12, role: 'child' }
                ] },

    h14_memoria: { bg: 'plain', items: [
                  { t: 'person', x: 128, y: G, s: 1.08, role: 'patriarch' },
                  { t: 'person', x: 212, y: G, s: 1.15, role: 'child' },
                  { t: 'person', x: 292, y: G, s: 1.02, role: 'woman' }
                ],
                bubbles: [{ x: 330, y: 78, w: 56, h: 40, text: '😄', kind: 'thought', tail: 'left', fs: 20 }] },

    /* ============ h15 — Sacrificium Isaac ============
       Every scene in this capitulum was chosen so that NO frame contains
       a weapon, a bound child or a raised hand (DESIGN §8). */

    h15_vocat:  { bg: 'desert', items: [
                  { t: 'star',   x: 92,  y: 82, s: 1 },
                  { t: 'person', x: 258, y: G, s: 1.1, role: 'patriarch' }
                ],
                bubbles: [{ x: 172, y: 118, w: 82, h: 42,
                            text: 'Abraham!', kind: 'speech', tail: 'right', fs: 14 }] },

    h15_paret:  { bg: 'desert', items: [
                  { t: 'star',   x: 96,  y: 84, s: 0.9 },
                  { t: 'person', x: 244, y: G, s: 1.08, role: 'patriarch', pose: 'kneel' }
                ],
                bubbles: [{ x: 154, y: 128, w: 58, h: 42, text: '🙇', kind: 'thought', tail: 'right', fs: 20 }] },

    h15_amat:   { bg: 'desert', items: [
                  { t: 'person', x: 162, y: G, s: 1.1,  role: 'patriarch' },
                  { t: 'person', x: 244, y: G, s: 1.15, role: 'child' }
                ],
                bubbles: [{ x: 88, y: 82, w: 58, h: 42, text: '💛', kind: 'thought', tail: 'right', fs: 20 }] },

    h15_iter:   { bg: 'desert', items: [
                  { t: 'mountain', x: 348, y: G, s: 0.55 },
                  { t: 'person',   x: 116, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                  { t: 'person',   x: 190, y: G, s: 1.1,  role: 'child', pose: 'walk' }
                ] },

    h15_lignum: { bg: 'desert', items: [
                  { t: 'truncus', x: 246, y: G, s: 0.72 },
                  { t: 'person',  x: 116, y: G, s: 1.05, role: 'patriarch', pose: 'walk' },
                  { t: 'person',  x: 186, y: G, s: 1.1,  role: 'child', pose: 'walk' }
                ] },

    h15_ascendunt: { bg: 'mountain', items: [
                  { t: 'person', x: 116, y: 182, s: 0.9,  role: 'patriarch', pose: 'walk' },
                  { t: 'person', x: 172, y: 190, s: 0.95, role: 'child', pose: 'walk' }
                ],
                bubbles: [{ x: 320, y: 88, w: 58, h: 42, text: '⛰⬆', kind: 'thought', tail: 'left', fs: 18 }] },

    h15_altare: { bg: 'mountain', items: [
                  { t: 'altar',  x: 268, y: G, s: 1.05, flame: false },
                  { t: 'person', x: 132, y: G, s: 1.05, role: 'patriarch', pose: 'point' }
                ] },

    h15_lignum2: { bg: 'mountain', items: [
                  { t: 'altar',   x: 268, y: G, s: 1.05, flame: false },
                  { t: 'truncus', x: 138, y: G, s: 0.7 },
                  { t: 'person',  x: 78,  y: G, s: 1, role: 'child' }
                ] },

    h15_rogat:  { bg: 'mountain', items: [
                  { t: 'altar',  x: 320, y: G, s: 0.9, flame: false },
                  { t: 'person', x: 132, y: G, s: 1.05, role: 'patriarch' },
                  { t: 'person', x: 210, y: G, s: 1.1,  role: 'child' }
                ],
                bubbles: [{ x: 292, y: 96, w: 88, h: 44,
                            text: 'Ubi est ovis?', kind: 'speech', tail: 'left', fs: 13 }] },

    h15_respondet: { bg: 'mountain', items: [
                  { t: 'altar',  x: 326, y: G, s: 0.9, flame: false },
                  { t: 'person', x: 138, y: G, s: 1.05, role: 'patriarch' },
                  { t: 'person', x: 216, y: G, s: 1.1,  role: 'child' }
                ],
                bubbles: [{ x: 82, y: 92, w: 96, h: 44,
                            text: 'Deus ovem dat', kind: 'speech', tail: 'right', fs: 13 }] },

    h15_angelus: { bg: 'mountain', items: [
                  { t: 'person', x: 108, y: 150, s: 0.95, role: 'angel' },
                  { t: 'altar',  x: 320, y: G, s: 0.9, flame: false },
                  { t: 'person', x: 226, y: G, s: 1.05, role: 'patriarch' }
                ],
                bubbles: [{ x: 172, y: 106, w: 58, h: 42, text: '💬', kind: 'speech', tail: 'right', fs: 20 }] },

    h15_angelus2: { bg: 'mountain', items: [
                  { t: 'person', x: 104, y: 148, s: 0.95, role: 'angel' },
                  { t: 'person', x: 240, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' },
                  { t: 'person', x: 318, y: G, s: 1.05, role: 'child' }
                ],
                bubbles: [{ x: 176, y: 100, w: 58, h: 42, text: '🙇', kind: 'thought', tail: 'right', fs: 20 }] },

    /* the ram of Gn 22,13 — a SHEEP, because there is no aries actor
       (reported). Nothing in the text names it a ram. */
    h15_ovis:   { bg: 'mountain', items: [
                  { t: 'lamb',   x: 268, y: G, s: 1.35, flip: true },
                  { t: 'person', x: 122, y: G, s: 1.05, role: 'patriarch', pose: 'point' }
                ] },

    h15_ovis2:  { bg: 'mountain', items: [
                  { t: 'star',   x: 92,  y: 80, s: 0.9 },
                  { t: 'lamb',   x: 296, y: G, s: 1.2, flip: true },
                  { t: 'person', x: 190, y: G, s: 1.05, role: 'patriarch' }
                ] },

    h15_donum:  { bg: 'mountain', items: [
                  { t: 'altar',  x: 274, y: G, s: 1.05, flame: true, smoke: true },
                  { t: 'person', x: 134, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' },
                  { t: 'person', x: 62,  y: G, s: 1,    role: 'child' }
                ] },

    h15_benedicit: { bg: 'mountain', items: [
                  { t: 'star',   x: 200, y: 80, s: 1.05 },
                  { t: 'person', x: 142, y: G, s: 1.05, role: 'patriarch', pose: 'arms-up' },
                  { t: 'person', x: 250, y: G, s: 1.1,  role: 'child' }
                ] },

    h15_descendunt: { bg: 'mountain', items: [
                  { t: 'person', x: 258, y: 186, s: 0.9,  role: 'patriarch', pose: 'walk', flip: true },
                  { t: 'person', x: 318, y: 194, s: 0.95, role: 'child', pose: 'walk', flip: true }
                ] },

    h15_memoria: { bg: 'mountain', items: [
                  { t: 'star',   x: 96,  y: 80, s: 0.9 },
                  { t: 'lamb',   x: 322, y: G, s: 1.05, flip: true },
                  { t: 'person', x: 186, y: G, s: 1.05, role: 'patriarch', pose: 'kneel' }
                ] },

    /* ============ h16 — Rebecca ad puteum ============ */

    h16_senex:  { bg: 'desert', items: [
                  { t: 'tent',   x: 320, y: G, s: 0.85 },
                  { t: 'person', x: 140, y: G, s: 1.1, role: 'patriarch' },
                  { t: 'person', x: 222, y: G, s: 1.02, role: 'man' }
                ] },

    h16_servus: { bg: 'desert', items: [
                  { t: 'person', x: 138, y: G, s: 1.08, role: 'patriarch', pose: 'point' },
                  { t: 'person', x: 244, y: G, s: 1.02, role: 'man' }
                ] },

    h16_iter:   { bg: 'desert', items: [
                  { t: 'camelus', x: 300, y: G, s: 0.78 },
                  { t: 'camelus', x: 196, y: G, s: 0.7 },
                  { t: 'person',  x: 92,  y: G, s: 1.02, role: 'man', pose: 'walk' }
                ] },

    h16_quaerit: { bg: 'desert', items: [
                  { t: 'camelus', x: 314, y: G, s: 0.72 },
                  { t: 'person',  x: 122, y: G, s: 1.05, role: 'man', pose: 'point' }
                ],
                bubbles: [{ x: 212, y: 90, w: 62, h: 44, text: '👀', kind: 'thought', tail: 'right', fs: 20 }] },

    h16_puteus: { bg: 'desert', items: [
                  { t: 'well', x: 214, y: G, s: 1.2 }
                ] },

    h16_adputeum: { bg: 'desert', items: [
                  { t: 'well',    x: 306, y: G, s: 1.05 },
                  { t: 'camelus', x: 196, y: G, s: 0.72 },
                  { t: 'person',  x: 82,  y: G, s: 1.02, role: 'man', pose: 'walk' }
                ] },

    h16_rebecca: { bg: 'desert', items: [
                  { t: 'well',   x: 302, y: G, s: 1 },
                  { t: 'person', x: 152, y: G, s: 1.05, role: 'woman' }
                ] },

    h16_urna:   { bg: 'desert', items: [
                  { t: 'well',   x: 306, y: G, s: 1 },
                  { t: 'person', x: 158, y: G, s: 1.05, role: 'woman' },
                  { t: 'urna',   x: 214, y: G, s: 0.9 }
                ] },

    h16_aqua:   { bg: 'desert', items: [
                  { t: 'well',   x: 130, y: G, s: 1.1 },
                  { t: 'urna',   x: 232, y: G, s: 1 },
                  { t: 'person', x: 306, y: G, s: 1.02, role: 'woman', flip: true }
                ] },

    h16_servobibit: { bg: 'desert', items: [
                  { t: 'well',   x: 330, y: G, s: 0.9 },
                  { t: 'person', x: 130, y: G, s: 1.02, role: 'man' },
                  { t: 'urna',   x: 196, y: G, s: 0.85 },
                  { t: 'person', x: 256, y: G, s: 1.02, role: 'woman', flip: true }
                ],
                bubbles: [{ x: 72, y: 86, w: 56, h: 40, text: '💧', kind: 'thought', tail: 'right', fs: 20 }] },

    h16_camelis: { bg: 'desert', items: [
                  { t: 'camelus', x: 300, y: G, s: 0.78 },
                  { t: 'camelus', x: 198, y: G, s: 0.7 },
                  { t: 'urna',    x: 120, y: G, s: 0.85 },
                  { t: 'person',  x: 66,  y: G, s: 1, role: 'woman' }
                ] },

    h16_bibunt: { bg: 'desert', items: [
                  { t: 'well',    x: 78,  y: G, s: 0.9 },
                  { t: 'camelus', x: 200, y: G, s: 0.78 },
                  { t: 'camelus', x: 318, y: G, s: 0.72 }
                ],
                bubbles: [{ x: 200, y: 62, w: 58, h: 40, text: '💧', kind: 'thought', tail: 'left', fs: 20 }] },

    h16_donum:  { bg: 'desert', items: [
                  { t: 'well',   x: 330, y: G, s: 0.9 },
                  { t: 'person', x: 138, y: G, s: 1.02, role: 'man', pose: 'point' },
                  { t: 'person', x: 232, y: G, s: 1.02, role: 'woman', flip: true }
                ] },

    h16_redeunt: { bg: 'desert', items: [
                  { t: 'camelus', x: 106, y: G, s: 0.75 },
                  { t: 'person',  x: 208, y: G, s: 1.02, role: 'man', pose: 'walk' },
                  { t: 'person',  x: 280, y: G, s: 1.02, role: 'woman', pose: 'walk' }
                ] },

    h16_uxor:   { bg: 'desert', items: [
                  { t: 'tent',   x: 330, y: G, s: 0.82 },
                  { t: 'person', x: 148, y: G, s: 1.05, role: 'man' },
                  { t: 'person', x: 226, y: G, s: 1.02, role: 'woman', flip: true }
                ] },

    h16_memoria: { bg: 'desert', items: [
                  { t: 'well',    x: 96,  y: G, s: 0.95 },
                  { t: 'urna',    x: 186, y: G, s: 0.85 },
                  { t: 'person',  x: 246, y: G, s: 1.02, role: 'woman' },
                  { t: 'camelus', x: 340, y: G, s: 0.7 }
                ] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ h11 — VOCĀTIŌ ABRAHAE ============
       fons Gn 12, 1–9. The call, the household, the journey, the altar.
       OMITTED: the name ABRAM and its change at Gn 17,5 (the patriarch
       carries his Vulgate name Abraham from the first page — the change
       itself belongs to a chapter whose sign is not child material);
       Gn 12,2–3 (the blessing of the nations — unsayable at S3 without
       the future); Gn 12,10–20 in full (Egypt, and Sarai taken into
       Pharaoh's house — DESIGN §8); the place-names Haran, Sichem,
       Bethel, Chanaan (no picture value at S3).
       Nothing told here contradicts 12,4 ("egressus est itaque Abram …
       et ivit cum eo Lot"), 12,5 ("tulitque Sarai uxorem suam"), 12,7
       ("ædificavit ibi altare Domino") or 12,8 ("tetendit ibi
       tabernaculum suum"). */
    {
      id: 'h11',
      titulus: 'Vocātiō Abrahae',
      icon: '👤⛺',
      numerus: 'XI',
      pos: { x: 0.26, y: 0.90 },
      fons: 'Gn 12, 1–9',
      vocab: [
        { la: 'Abraham',      scene: SC.v_abraham,      pars: 'nomen' },
        { la: 'Sara',         scene: SC.v_sara,         pars: 'nomen' },
        { la: 'Lot',          scene: SC.v_lot,          pars: 'nomen' },
        { la: 'tabernāculum', scene: SC.v_tabernaculum, pars: 'nomen' },
        { la: 'camēlus',      scene: SC.v_camelus,      pars: 'nomen' },
        { la: 'grex',         scene: SC.v_grex,         pars: 'nomen' },
        { la: 'ambulat',      scene: SC.v_ambulat,      pars: 'verbum' },
        { la: 'mōnstrat',     scene: SC.v_monstrat,     pars: 'verbum' }
      ],
      story: [
        /* Gn 12,1 — the man before the call */
        { la: 'Ecce Abraham! Abraham vir iūstus est.', scene: SC.h11_abraham,
          nova: [{ w: 'Abraham', e: '👤', g: '' }] },

        /* Gn 12,8 — "tetendit ibi tabernaculum suum" */
        { la: 'Ecce tabernāculum! Abraham in tabernāculō est.', scene: SC.h11_tabernaculum,
          nova: [{ w: 'tabernāculum', e: '⛺', g: 'Abraham in tabernāculō dormit' }] },

        /* Gn 12,5 — "tulitque Sarai uxorem suam" */
        { la: 'Ecce Sara! Sara quoque in tabernāculō est.', scene: SC.h11_sara,
          nova: [{ w: 'Sara', e: '👤', g: '' }] },

        /* THE GENITIVE, pictured before it is asserted: the frame is the
           pair standing together, and the gloss is the arrow. */
        { la: 'Sara mulier Abrahae est.', scene: SC.h11_sara2,
          nova: [{ w: 'Abrahae', e: '👤➡', g: 'Abraham → mulier Abrahae' }] },

        { la: 'Ecce grex! Grex Abrahae in agrō est.', scene: SC.h11_grex,
          nova: [{ w: 'grex', e: '🐑', g: 'grex: multa animālia' }] },

        /* Gn 12,16 — "fueruntque ei oves et boves … et cameli" */
        { la: 'Ecce camēlus! Camēlī Abrahae quoque in agrō sunt.', scene: SC.h11_cameli,
          nova: [{ w: 'camēlus', e: '🐫', g: 'camēlus animal est' }] },

        /* Gn 12,5 — "Lot filium fratris sui" */
        { la: 'Ecce Lot! Lot fīlius frātris Abrahae est.', scene: SC.h11_lot,
          nova: [{ w: 'Lot', e: '👤', g: '' },
                 { w: 'frātris', e: '👥➡', g: 'frāter → fīlius frātris' }] },

        /* Gn 12,1 — "Dixit autem Dominus ad Abram" */
        { la: 'Deus Abraham vocat. Deus terram mōnstrat.', scene: SC.h11_vocat,
          nova: [{ w: 'mōnstrat', e: '👉🌍', g: 'Deus terram mōnstrat; Abraham terram videt' }] },

        /* FIXED VULGATE FORMULA — Gn 12,1, the ONE in this capitulum.
           Never parsed, never translated; the picture (tent behind, road
           ahead) is the gloss, and the page that follows is the second. */
        { la: 'Deus dīcit: "Egredere dē terrā tuā."', scene: SC.h11_verbum,
          nova: [{ w: 'Egredere', e: '⛺➡🌍', g: 'Abraham exit et ambulat' }],
          ttsText: 'Deus dicit: Egredere de terra tua.' },

        /* Gn 12,7 — "Semini tuo dabo terram hanc" */
        { la: 'Deus Abrahae terram mōnstrat.', scene: SC.h11_monstrat },

        { la: 'Abraham Deum audit. Abraham exit.', scene: SC.h11_exeunt },

        /* Gn 12,4–5 */
        { la: 'Abraham ambulat. Sara et Lot quoque ambulant.', scene: SC.h11_ambulant,
          nova: [{ w: 'ambulat', e: '🚶', g: 'exit et ambulat' }] },

        { la: 'Camēlī quoque ambulant. Grex ambulat.', scene: SC.h11_grexambulat },

        /* Gn 12,9 — "perrexitque Abram vadens" */
        { la: 'Abraham ad terram ambulat.', scene: SC.h11_adterram,
          nova: [{ w: 'ad', e: '➡📍', g: 'ad terram: Abraham ambulat, et ecce terra' }] },

        /* Gn 12,7–8 — "ædificavit ibi altare Domino": THE DATIVE,
           pictured (altar + radiance) before it is asserted. */
        { la: 'Abraham altāre aedificat. Abraham Deō dōnum dat.', scene: SC.h11_altare,
          nova: [{ w: 'Deō', e: '➡✨', g: 'Deus → Abraham Deō dōnum dat' }] },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Deus Abrahae terram mōnstrat.', scene: SC.h11_memoria,
          ttsText: 'Deus Abrahae terram monstrat.' }
      ],
      ludus: {
        words: [
          { la: 'Abraham',      scene: SC.v_abraham,      emoji: '👤' },
          { la: 'tabernāculum', scene: SC.v_tabernaculum, emoji: '⛺' },
          { la: 'camēlus',      scene: SC.v_camelus,      emoji: '🐫' },
          { la: 'grex',         scene: SC.v_grex,         emoji: '🐑' },
          { la: 'Sara',         scene: SC.v_sara,         emoji: '👤' },
          { la: 'ambulat',      scene: SC.v_ambulat,      emoji: '🚶' }
        ]
      },
      /* SONUS, shared-picture rule: Abraham / Sara / Lot are three robed
         people and are NEVER offered together; ambulat and mōnstrat are
         both a patriarch alone in the desert, likewise. */
      sonus: [
        { la: 'tabernāculum',
          answer: { la: 'tabernāculum', scene: SC.v_tabernaculum },
          options: [{ la: 'tabernāculum', scene: SC.v_tabernaculum },
                    { la: 'camēlus', scene: SC.v_camelus },
                    { la: 'grex', scene: SC.v_grex }] },
        { la: 'camēlus',
          answer: { la: 'camēlus', scene: SC.v_camelus },
          options: [{ la: 'camēlus', scene: SC.v_camelus },
                    { la: 'grex', scene: SC.v_grex },
                    { la: 'tabernāculum', scene: SC.v_tabernaculum },
                    { la: 'Abraham', scene: SC.v_abraham }] },
        { la: 'grex',
          answer: { la: 'grex', scene: SC.v_grex },
          options: [{ la: 'grex', scene: SC.v_grex },
                    { la: 'tabernāculum', scene: SC.v_tabernaculum },
                    { la: 'camēlus', scene: SC.v_camelus }] },
        { la: 'ambulat',
          answer: { la: 'ambulat', scene: SC.v_ambulat },
          options: [{ la: 'ambulat', scene: SC.v_ambulat },
                    { la: 'grex', scene: SC.v_grex },
                    { la: 'camēlus', scene: SC.v_camelus },
                    { la: 'tabernāculum', scene: SC.v_tabernaculum }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Abraham',      scene: SC.v_abraham },
            { la: 'Sara',         scene: SC.v_sara },
            { la: 'tabernāculum', scene: SC.v_tabernaculum },
            { la: 'camēlus',      scene: SC.v_camelus },
            { la: 'grex',         scene: SC.v_grex },
            { la: 'mōnstrat',     scene: SC.v_monstrat }
          ],
          scrambles: [
            { la: 'Abraham in tabernāculō est.',  scene: SC.h11_tabernaculum },
            { la: 'Grex Abrahae in agrō est.',    scene: SC.h11_grex },
            { la: 'Deus Abrahae terram mōnstrat.', scene: SC.h11_monstrat },
            { la: 'Abraham Deō dōnum dat.',       scene: SC.h11_altare }
          ]
        },
        corrige: [
          { words: ['Abraham', 'in', 'arcā', 'est.'], wrong: 2,
            options: ['tabernāculō', 'agrō', 'caelō'], correct: 0, scene: SC.h11_tabernaculum },
          { words: ['Grex', 'Abrahae', 'in', 'marī', 'est.'], wrong: 3,
            options: ['agrō', 'caelō', 'arcā'], correct: 0, scene: SC.h11_grex },
          { words: ['Ecce', 'leō!', 'Camēlī', 'Abrahae', 'sunt.'], wrong: 1,
            options: ['camēlus!', 'grex!', 'ursus!'], correct: 0, scene: SC.h11_cameli },
          { words: ['Deus', 'Abrahae', 'terram', 'operit.'], wrong: 3,
            options: ['mōnstrat.', 'aedificat.', 'natat.'], correct: 0, scene: SC.h11_monstrat },
          { words: ['Abraham', 'Deō', 'dōnum', 'vetat.'], wrong: 3,
            options: ['dat.', 'clāmat.', 'timet.'], correct: 0, scene: SC.h11_altare }
        ],
        comple: [
          { text: 'Ecce ___! Abraham in tabernāculō est.',
            options: ['tabernāculum', 'camēlus', 'grex'], correct: 0, scene: SC.h11_tabernaculum },
          { text: 'Sara mulier Abrah___ est.',
            options: ['ae', 'am', 'a'], correct: 0, scene: SC.h11_sara2 },
          { text: 'Grex Abrahae in ___ est.',
            options: ['agrō', 'agrum', 'ager'], correct: 0, scene: SC.h11_grex },
          { text: 'Lot fīlius frātr___ Abrahae est.',
            options: ['is', 'em', 'ēs'], correct: 0, scene: SC.h11_lot },
          { text: 'Abraham ad terram ___.',
            options: ['ambulat', 'aedificat', 'dormit'], correct: 0, scene: SC.h11_adterram },
          { text: 'Abraham De___ dōnum dat.',
            options: ['ō', 'um', 'us'], correct: 0, scene: SC.h11_altare }
        ]
      }
    },

    /* ============ h12 — ABRAHAM ET LOT ============
       fons Gn 13. The land divides and the two households part in peace.
       SODOM IS ABSENT. Gn 13,13 ("homines autem Sodomitæ pessimi erant")
       and the whole of Gn 19 are OMITTED — not softened, not renamed:
       Lot walks toward a city and this liber never returns to him
       (DESIGN §8; see the omissions register).
       ALSO OMITTED: Gn 13,10's geography (the Jordan, Segor, Egypt) and
       Gn 13,16's "semen tuum sicut pulverem terræ" — the dust-simile
       waits for h13, where the STARS carry the same promise with a
       picture the night sky already paints.
       The quarrel of 13,7 is TWO SHOUTS and nothing else. */
    {
      id: 'h12',
      titulus: 'Abraham et Lot',
      icon: '👥🐑',
      numerus: 'XII',
      pos: { x: 0.70, y: 0.78 },
      fons: 'Gn 13',
      vocab: [
        { la: 'ovis',   scene: SC.v_ovis,   pars: 'nomen' },
        { la: 'pāstor', scene: SC.v_pastor, pars: 'nomen' },
        { la: 'bōs',    scene: SC.v_bos,    pars: 'nomen' },
        { la: 'magnus', scene: SC.v_magnus, pars: 'adiectivum' },
        { la: 'parvus', scene: SC.v_parvus, pars: 'adiectivum' },
        { la: 'manet',  scene: SC.v_manet,  pars: 'verbum' }
      ],
      story: [
        /* Gn 13,1 — "Ascendit ergo Abram … et Lot cum eo" */
        { la: 'Abraham et Lot in agrō sunt.', scene: SC.h12_ambo },

        /* Gn 13,2.5 — "erat autem dives valde"; "fuerunt greges ovium" */
        { la: 'Ecce grex Abrahae! Grex magnus est.', scene: SC.h12_grexA,
          nova: [{ w: 'magnus', e: '⬆', g: 'magnus grex: multa animālia' }] },

        /* Lot is INDECLINABLE in the Clementine text, so `grex Lot` is a
           genitive exactly as `grex Abrahae` is (see the header). */
        { la: 'Grex Lot quoque magnus est.', scene: SC.h12_grexL,
          nova: [{ w: 'Lot', e: '👤➡🐑', g: 'Lot → grex Lot' }] },

        { la: 'Ecce ovis! In grege multae ovēs sunt.', scene: SC.h12_ovis,
          nova: [{ w: 'ovis', e: '🐑', g: 'grex: multae ovēs' }] },

        /* GENITIVE PLURAL, on a picture of three flocks */
        { la: 'Gregēs ovium in agrō sunt.', scene: SC.h12_greges,
          nova: [{ w: 'ovium', e: '🐑🐑➡', g: 'ovēs → gregēs ovium' }] },

        /* Gn 13,5 — "et armenta" */
        { la: 'Ecce bōs! Bōs animal magnum est.', scene: SC.h12_bos,
          nova: [{ w: 'bōs', e: '🐂', g: 'bōs, bovem, bovēs' }] },

        { la: 'Bovēs et ovēs in agrō sunt.', scene: SC.h12_bos },

        /* Gn 13,7 — "inter pastores gregum Abram et Lot" */
        { la: 'Ecce pāstōrēs! Pāstōrēs gregēs custōdiunt.', scene: SC.h12_pastores,
          nova: [{ w: 'pāstōrēs', e: '👤🐑', g: 'pāstor gregem custōdit' }] },

        { la: 'Pāstōrēs Abrahae clāmant. Pāstōrēs Lot quoque clāmant.', scene: SC.h12_rixa },

        /* Gn 13,6 — "nec poterat eos capere terra" */
        { la: 'Gregēs magnī sunt; terra parva est.', scene: SC.h12_parva,
          nova: [{ w: 'parva', e: '⬇', g: '↔ magna' }] },

        /* DATIVE PLURAL, unmistakable ending, on the same picture */
        { la: 'Terra pāstōribus parva est.', scene: SC.h12_parva,
          nova: [{ w: 'pāstōribus', e: '➡👥', g: 'pāstōrēs → terra pāstōribus parva est' }] },

        /* FIXED VULGATE FORMULA — Gn 13,8 "fratres enim sumus", the ONE
           in this capitulum. Never parsed; the two men are the gloss. */
        { la: 'Abraham Lot dīcit: "Frātrēs sumus."', scene: SC.h12_fratres,
          nova: [{ w: 'Frātrēs sumus', e: '👥🤝', g: 'Abraham et Lot frātrēs sunt' }],
          ttsText: 'Abraham Lot dicit: Fratres sumus.' },

        /* Gn 13,9 — "Ecce universa terra coram te est: recede a me" */
        { la: 'Abraham Lot terram bonam dat.', scene: SC.h12_dat },

        /* Gn 13,10–11 — "elevatis itaque Lot oculis, vidit" */
        { la: 'Lot terram bonam videt.', scene: SC.h12_eligit },

        /* Gn 13,11 — "divisique sunt alterutrum a fratre suo" */
        { la: 'Abraham et Lot discēdunt.', scene: SC.h12_discedunt },

        /* Gn 13,12 — "Lot vero moratus est in oppidis". The city is
           NAMED nowhere and nothing happens to it (see the header). */
        { la: 'Lot ad urbem ambulat. Abraham nōn ambulat: manet.', scene: SC.h12_urbs,
          nova: [{ w: 'manet', e: '⛺', g: '↔ discēdit' }] },

        { la: 'Abraham in agrō manet. Grex Abrahae quoque manet.', scene: SC.h12_manet },

        /* Gn 13,14–15 — "Omnem terram, quam conspicis, tibi dabo" */
        { la: 'Deus Abrahae terram iterum prōmittit.', scene: SC.h12_promittit },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Abraham Lot terram bonam dat.', scene: SC.h12_memoria,
          ttsText: 'Abraham Lot terram bonam dat.' }
      ],
      ludus: {
        words: [
          { la: 'ovis',    scene: SC.v_ovis,    emoji: '🐑' },
          { la: 'pāstor',  scene: SC.v_pastor,  emoji: '👤' },
          { la: 'bōs',     scene: SC.v_bos,     emoji: '🐂' },
          { la: 'grex',    scene: SC.v_grex,    emoji: '🐑' },
          { la: 'camēlus', scene: SC.v_camelus, emoji: '🐫' },
          { la: 'manet',   scene: SC.v_manet,   emoji: '⛺' }
        ]
      },
      /* SONUS: ovis and grex are both white sheep — never together;
         magnus and parvus are the SAME two animals in the same frame and
         are never offered against each other either. */
      sonus: [
        { la: 'bōs',
          answer: { la: 'bōs', scene: SC.v_bos },
          options: [{ la: 'bōs', scene: SC.v_bos },
                    { la: 'camēlus', scene: SC.v_camelus },
                    { la: 'ovis', scene: SC.v_ovis }] },
        { la: 'pāstor',
          answer: { la: 'pāstor', scene: SC.v_pastor },
          options: [{ la: 'pāstor', scene: SC.v_pastor },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'camēlus', scene: SC.v_camelus },
                    { la: 'tabernāculum', scene: SC.v_tabernaculum }] },
        { la: 'ovis',
          answer: { la: 'ovis', scene: SC.v_ovis },
          options: [{ la: 'ovis', scene: SC.v_ovis },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'camēlus', scene: SC.v_camelus }] },
        { la: 'manet',
          answer: { la: 'manet', scene: SC.v_manet },
          options: [{ la: 'manet', scene: SC.v_manet },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'pāstor', scene: SC.v_pastor }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'ovis',   scene: SC.v_ovis },
            { la: 'pāstor', scene: SC.v_pastor },
            { la: 'bōs',    scene: SC.v_bos },
            { la: 'magnus', scene: SC.v_magnus },
            { la: 'parvus', scene: SC.v_parvus },
            { la: 'manet',  scene: SC.v_manet }
          ],
          scrambles: [
            { la: 'Grex Abrahae magnus est.',      scene: SC.h12_grexA },
            { la: 'Gregēs ovium in agrō sunt.',    scene: SC.h12_greges },
            { la: 'Pāstōrēs gregēs custōdiunt.',   scene: SC.h12_pastores },
            { la: 'Abraham in agrō manet.',        scene: SC.h12_manet }
          ]
        },
        corrige: [
          { words: ['Grex', 'Abrahae', 'parvus', 'est.'], wrong: 2,
            options: ['magnus', 'iūstus', 'altus'], correct: 0, scene: SC.h12_grexA },
          { words: ['Gregēs', 'camēlōrum', 'in', 'agrō', 'sunt.'], wrong: 1,
            options: ['ovium', 'hominum', 'montium'], correct: 0, scene: SC.h12_greges },
          { words: ['Pāstōrēs', 'gregēs', 'aedificant.'], wrong: 2,
            options: ['custōdiunt.', 'natant.', 'intrant.'], correct: 0, scene: SC.h12_pastores },
          { words: ['Terra', 'pāstōribus', 'magna', 'est.'], wrong: 2,
            options: ['parva', 'alta', 'mala'], correct: 0, scene: SC.h12_parva },
          { words: ['Abraham', 'in', 'agrō', 'discēdit.'], wrong: 3,
            options: ['manet.', 'clāmat.', 'natat.'], correct: 0, scene: SC.h12_manet }
        ],
        comple: [
          { text: 'Grex Abrahae ___ est.',
            options: ['magnus', 'magna', 'magnum'], correct: 0, scene: SC.h12_grexA },
          { text: 'Ecce ___! In grege multae ovēs sunt.',
            options: ['ovis', 'bōs', 'pāstor'], correct: 0, scene: SC.h12_ovis },
          { text: 'Gregēs ov___ in agrō sunt.',
            options: ['ium', 'ēs', 'is'], correct: 0, scene: SC.h12_greges },
          { text: 'Terra pāstōr___ parva est.',
            options: ['ibus', 'ēs', 'em'], correct: 0, scene: SC.h12_parva },
          { text: 'Abraham Lot terram bonam ___.',
            options: ['dat', 'videt', 'audit'], correct: 0, scene: SC.h12_dat },
          { text: 'Abraham in agrō ___.',
            options: ['manet', 'discēdit', 'natat'], correct: 0, scene: SC.h12_manet }
        ]
      }
    },

    /* ============ h13 — PRŌMISSUM DEĪ ============
       fons Gn 15, 1–6. The night, the stars, the promise, the faith.
       THE FUTURE IS THE PROBLEM OF THIS CAPITULUM and it is solved, not
       bent: Gn 15,5's "Sic ERIT semen tuum" cannot be said at S3, and an
       approximation in the present ("fīliī Abrahae sunt sīcut stēllae")
       would assert as a present fact something the chapter's whole point
       is that Abraham does NOT yet have. The page therefore says what
       the picture says and no more — 'Ecce stēllae! Sīc fīliī Abrahae.'
       — a verbless comparison, which is idiomatic Latin, exactly as
       elliptical as the Vulgate's own clause minus its verb, and free of
       any false assertion. `sīcut` is not used at all; `sīc` does the
       work and is glossed with the arrow ⭐➡👥.
       The promise ITSELF is carried by the dative + prōmittit, the same
       device h9 uses for the covenant ('Deus prōmittit: aqua iam nōn
       crēscit').
       OMITTED: Gn 15,2–3 (Eliezer the heir — a name with no picture
       value at S3), Gn 15,7–21 in full (the divided animals, the smoking
       furnace, the four hundred years, the list of nations). */
    {
      id: 'h13',
      titulus: 'Prōmissum Deī',
      icon: '⭐🤝',
      numerus: 'XIII',
      pos: { x: 0.28, y: 0.65 },
      fons: 'Gn 15, 1–6',
      vocab: [
        { la: 'stēlla',  scene: SC.v_stella,  pars: 'nomen' },
        { la: 'nox',     scene: SC.v_nox,     pars: 'nomen' },
        { la: 'senex',   scene: SC.v_senex,   pars: 'adiectivum' },
        { la: 'numerat', scene: SC.v_numerat, pars: 'verbum' },
        { la: 'crēdit',  scene: SC.v_credit,  pars: 'verbum' }
      ],
      story: [
        { la: 'Abraham senex est. Sara quoque senex est.', scene: SC.h13_senex,
          nova: [{ w: 'senex', e: '👴', g: 'senex vir: Noe quoque senex est' }] },

        /* Gn 15,2–3 rendered as the one fact a picture can carry */
        { la: 'Sed fīlius Abrahae nōn est.', scene: SC.h13_nofilius },

        { la: 'Nox est. Abraham in nocte caelum videt.', scene: SC.h13_nox,
          nova: [{ w: 'nox', e: '🌙', g: 'nox: sōl nōn est' },
                 { w: 'nocte', e: '🌙', g: 'nox → in nocte' }] },

        /* Gn 15,5 — "Suscipe cælum, et numera stellas" */
        { la: 'Ecce stēllae! Stēllae in caelō sunt.', scene: SC.h13_stellae,
          nova: [{ w: 'stēllae', e: '⭐', g: 'ūna stēlla, multae stēllae' }] },

        { la: 'Stēllae multae sunt. Abraham stēllās numerat.', scene: SC.h13_numerat,
          nova: [{ w: 'numerat', e: '1️⃣2️⃣3️⃣', g: 'ūnus, et ūnus, et ūnus: Abraham numerat' }] },

        /* FIXED VULGATE FORMULA — Gn 15,5, the ONE in this capitulum.
           Never parsed; the sky full of stars is the gloss. */
        { la: 'Deus dīcit: "Numerā stēllās."', scene: SC.h13_verbum,
          nova: [{ w: 'Numerā stēllās', e: '⭐1️⃣2️⃣3️⃣', g: 'Abraham stēllās videt et numerat' }],
          ttsText: 'Deus dicit: Numera stellas.' },

        /* THE DATIVE SHOWCASE (Gn 15,4–5) */
        { la: 'Deus Abrahae fīliōs prōmittit.', scene: SC.h13_promittit },

        /* the comparison, verbless: see the header note */
        { la: 'Ecce stēllae! Sīc fīliī Abrahae.', scene: SC.h13_sic,
          nova: [{ w: 'sīc', e: '⭐➡👥', g: 'stēllae multae; fīliī multī' }] },

        /* Gn 15,6 — "Credidit Abram Deo": the dative again, and the
           sentence the whole liber turns on. */
        { la: 'Abraham Deō crēdit.', scene: SC.h13_credit,
          nova: [{ w: 'crēdit', e: '🙏', g: 'Deus dīcit; Abraham audit et nōn timet' }] },

        { la: 'Abraham senex est, sed Deō semper crēdit.', scene: SC.h13_semper },

        { la: 'Deus Abrahae fīliōs et terram prōmittit.', scene: SC.h13_promittit },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Abraham Deō crēdit.', scene: SC.h13_memoria,
          ttsText: 'Abraham Deo credit.' }
      ],
      ludus: {
        words: [
          { la: 'stēlla',  scene: SC.v_stella,  emoji: '⭐' },
          { la: 'nox',     scene: SC.v_nox,     emoji: '🌙' },
          { la: 'numerat', scene: SC.v_numerat, emoji: '🔢' },
          { la: 'crēdit',  scene: SC.v_credit,  emoji: '🙏' },
          { la: 'senex',   scene: SC.v_senex,   emoji: '👴' },
          { la: 'grex',    scene: SC.v_grex,    emoji: '🐑' }
        ]
      },
      /* SONUS: stēlla, nox, numerat and crēdit ALL live under the same
         night sky, so each set holds exactly one of them and fills the
         rest from earlier capitula. */
      sonus: [
        { la: 'stēlla',
          answer: { la: 'stēlla', scene: SC.v_stella },
          options: [{ la: 'stēlla', scene: SC.v_stella },
                    { la: 'grex', scene: SC.v_grex },
                    { la: 'camēlus', scene: SC.v_camelus }] },
        { la: 'nox',
          answer: { la: 'nox', scene: SC.v_nox },
          options: [{ la: 'nox', scene: SC.v_nox },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'pāstor', scene: SC.v_pastor },
                    { la: 'ovis', scene: SC.v_ovis }] },
        { la: 'senex',
          answer: { la: 'senex', scene: SC.v_senex },
          options: [{ la: 'senex', scene: SC.v_senex },
                    { la: 'grex', scene: SC.v_grex },
                    { la: 'tabernāculum', scene: SC.v_tabernaculum }] },
        { la: 'crēdit',
          answer: { la: 'crēdit', scene: SC.v_credit },
          options: [{ la: 'crēdit', scene: SC.v_credit },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'camēlus', scene: SC.v_camelus },
                    { la: 'manet', scene: SC.v_manet }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'stēlla',  scene: SC.v_stella },
            { la: 'nox',     scene: SC.v_nox },
            { la: 'senex',   scene: SC.v_senex },
            { la: 'numerat', scene: SC.v_numerat },
            { la: 'crēdit',  scene: SC.v_credit }
          ],
          scrambles: [
            { la: 'Stēllae in caelō sunt.',        scene: SC.h13_stellae },
            { la: 'Abraham stēllās numerat.',      scene: SC.h13_numerat },
            { la: 'Deus Abrahae fīliōs prōmittit.', scene: SC.h13_promittit },
            { la: 'Abraham Deō crēdit.',           scene: SC.h13_credit }
          ]
        },
        corrige: [
          { words: ['Abraham', 'puer', 'est.'], wrong: 1,
            options: ['senex', 'iūstus', 'malus'], correct: 0, scene: SC.h13_senex },
          { words: ['Ecce', 'montēs!', 'Stēllae', 'in', 'caelō', 'sunt.'], wrong: 1,
            options: ['stēllae!', 'linguae!', 'arborēs!'], correct: 0, scene: SC.h13_stellae },
          { words: ['Abraham', 'stēllās', 'operit.'], wrong: 2,
            options: ['numerat.', 'aedificat.', 'natat.'], correct: 0, scene: SC.h13_numerat },
          { words: ['Deus', 'Abrahae', 'fīliōs', 'vetat.'], wrong: 3,
            options: ['prōmittit.', 'clāmat.', 'timet.'], correct: 0, scene: SC.h13_promittit },
          { words: ['Abraham', 'Deō', 'nōn', 'crēdit.'], wrong: 2,
            options: ['semper', 'iterum', 'quoque'], correct: 0, scene: SC.h13_credit },
          { words: ['Lūx', 'est.', 'Abraham', 'stēllās', 'videt.'], wrong: 0,
            options: ['Nox', 'Pluvia', 'Terra'], correct: 0, scene: SC.h13_nox }
        ],
        comple: [
          { text: 'Abraham ___ est: Abraham nōn puer est.',
            options: ['senex', 'iūstus', 'parvus'], correct: 0, scene: SC.h13_senex },
          { text: '___ est. Abraham caelum videt.',
            options: ['Nox', 'Lūx', 'Sōl'], correct: 0, scene: SC.h13_nox },
          { text: 'Ecce stēll___! Stēllae in caelō sunt.',
            options: ['ae', 'a', 'am'], correct: 0, scene: SC.h13_stellae },
          { text: 'Abraham stēllās ___.',
            options: ['numerat', 'aedificat', 'portat'], correct: 0, scene: SC.h13_numerat },
          { text: 'Deus Abrah___ fīliōs prōmittit.',
            options: ['ae', 'am', 'a'], correct: 0, scene: SC.h13_promittit },
          { text: 'Abraham De___ crēdit.',
            options: ['ō', 'um', 'us'], correct: 0, scene: SC.h13_credit }
        ]
      }
    },

    /* ============ h14 — ISAAC NĀSCITUR ============
       fons Gn 21, 1–8. Laughter, and the child.
       THE TITLE keeps the CURRICULUM's own wording; `nāscitur` is a
       DEPONENT (S10) and therefore never appears in the body text — the
       same licence Liber II's title 'Arca Aedificātur' already carries
       for a passive. The birth is told with `habet` and the picture.
       OMITTED: Gn 21,4 (circumcision), Gn 21,6–7 (Sara's speech — first
       person), Gn 21,8's great feast (lexeme cap), and the whole of
       Gn 21,9–21 (Agar and Ismael sent away) — an episode of exile that
       Gn 16 already made unsuitable and that this liber never opens. */
    {
      id: 'h14',
      titulus: 'Isaac Nāscitur',
      icon: '👶😄',
      numerus: 'XIV',
      pos: { x: 0.72, y: 0.52 },
      fons: 'Gn 21, 1–8',
      vocab: [
        { la: 'Isaac',  scene: SC.v_isaac,  pars: 'nomen' },
        { la: 'puer',   scene: SC.v_puer,   pars: 'nomen' },
        { la: 'māter',  scene: SC.v_mater,  pars: 'nomen' },
        { la: 'pater',  scene: SC.v_pater,  pars: 'nomen' },
        { la: 'nōmen',  scene: SC.v_nomen,  pars: 'nomen' },
        { la: 'habet',  scene: SC.v_habet,  pars: 'verbum' },
        { la: 'rīdet',  scene: SC.v_ridet,  pars: 'verbum' },
        { la: 'laetus', scene: SC.v_laetus, pars: 'adiectivum' }
      ],
      story: [
        { la: 'Abraham senex est. Sara quoque senex est.', scene: SC.h14_senes },

        /* Gn 21,1 — "Visitavit autem Dominus Saram, sicut promiserat" */
        { la: 'Sed Deus Abrahae fīlium prōmittit.', scene: SC.h14_promissum },

        /* Gn 21,2 — "concepitque et peperit filium" */
        { la: 'Ecce puer! Sara puerum habet.', scene: SC.h14_puer,
          nova: [{ w: 'puer', e: '👶', g: 'puer parvus est; nōn est vir' },
                 { w: 'habet', e: '👐', g: 'Abraham camēlōs habet; Sara puerum habet' }] },

        { la: 'Sara māter est. Abraham pater est.', scene: SC.h14_materpater,
          nova: [{ w: 'māter', e: '👤👶', g: 'Sara puerum habet: Sara māter est' },
                 { w: 'pater', e: '👤👶', g: 'Abraham pater puerī est' }] },

        /* Gn 21,3 — "Vocavitque Abraham nomen filii sui … Isaac" */
        { la: 'Nōmen puerī Isaac est.', scene: SC.h14_nomen,
          nova: [{ w: 'nōmen', e: '💬👶', g: 'Adam nōmen hominis est' },
                 { w: 'puerī', e: '👶➡', g: 'puer → nōmen puerī' }] },

        { la: 'Ecce Isaac! Isaac fīlius Abrahae et Sarae est.', scene: SC.h14_isaac,
          nova: [{ w: 'Isaac', e: '👶', g: '' },
                 { w: 'Sarae', e: '👤➡', g: 'Sara → fīlius Sarae' }] },

        /* Gn 21,6 — "Risum fecit mihi Deus" */
        { la: 'Sara rīdet. Sara laeta est.', scene: SC.h14_ridet,
          nova: [{ w: 'rīdet', e: '😄', g: 'laetus homō rīdet' },
                 { w: 'laeta', e: '😄', g: '↔ īrātus' }] },

        { la: 'Pater quoque rīdet. Abraham laetus est.', scene: SC.h14_ridet2 },

        { la: 'Puer parvus rīdet.', scene: SC.h14_puerridet },

        /* the dative, on a domestic picture */
        { la: 'Māter puerō aquam dat.', scene: SC.h14_aqua },

        { la: 'Pater puerum videt. Pater laetus est.', scene: SC.h14_materpater },

        { la: 'Abraham et Sara et Isaac laetī sunt.', scene: SC.h14_laeti },

        /* Gn 21,1 — "implevit quæ locutus est" */
        { la: 'Deus Abrahae fīlium dat.', scene: SC.h14_donum },

        /* memoriā tenē */
        { la: 'Memoriā tenē: nōmen puerī Isaac est; omnēs rīdent.', scene: SC.h14_memoria,
          ttsText: 'Nomen pueri Isaac est; omnes rident.' }
      ],
      ludus: {
        words: [
          { la: 'puer',   scene: SC.v_puer,   emoji: '👶' },
          { la: 'māter',  scene: SC.v_mater,  emoji: '👤' },
          { la: 'pater',  scene: SC.v_pater,  emoji: '👤' },
          { la: 'rīdet',  scene: SC.v_ridet,  emoji: '😄' },
          { la: 'stēlla', scene: SC.v_stella, emoji: '⭐' },
          { la: 'grex',   scene: SC.v_grex,   emoji: '🐑' }
        ]
      },
      /* SONUS: puer, Isaac, māter, pater and laetus are all the same
         family group in the same plain — one per set, and the rest come
         from capitula whose pictures share nothing with them. */
      sonus: [
        { la: 'puer',
          answer: { la: 'puer', scene: SC.v_puer },
          options: [{ la: 'puer', scene: SC.v_puer },
                    { la: 'grex', scene: SC.v_grex },
                    { la: 'stēlla', scene: SC.v_stella }] },
        { la: 'nōmen',
          answer: { la: 'nōmen', scene: SC.v_nomen },
          options: [{ la: 'nōmen', scene: SC.v_nomen },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'nox', scene: SC.v_nox },
                    { la: 'camēlus', scene: SC.v_camelus }] },
        { la: 'rīdet',
          answer: { la: 'rīdet', scene: SC.v_ridet },
          options: [{ la: 'rīdet', scene: SC.v_ridet },
                    { la: 'numerat', scene: SC.v_numerat },
                    { la: 'manet', scene: SC.v_manet }] },
        { la: 'māter',
          answer: { la: 'māter', scene: SC.v_mater },
          options: [{ la: 'māter', scene: SC.v_mater },
                    { la: 'bōs', scene: SC.v_bos },
                    { la: 'stēlla', scene: SC.v_stella },
                    { la: 'tabernāculum', scene: SC.v_tabernaculum }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'puer',   scene: SC.v_puer },
            { la: 'māter',  scene: SC.v_mater },
            { la: 'pater',  scene: SC.v_pater },
            { la: 'nōmen',  scene: SC.v_nomen },
            { la: 'rīdet',  scene: SC.v_ridet },
            { la: 'laetus', scene: SC.v_laetus }
          ],
          scrambles: [
            { la: 'Sara puerum habet.',       scene: SC.h14_puer },
            { la: 'Nōmen puerī Isaac est.',   scene: SC.h14_nomen },
            { la: 'Sara laeta est.',          scene: SC.h14_ridet },
            { la: 'Māter puerō aquam dat.',   scene: SC.h14_aqua }
          ]
        },
        corrige: [
          { words: ['Ecce', 'vir!', 'Sara', 'puerum', 'habet.'], wrong: 1,
            options: ['puer!', 'pāstor!', 'bōs!'], correct: 0, scene: SC.h14_puer },
          { words: ['Sara', 'pater', 'est.'], wrong: 1,
            options: ['māter', 'puer', 'senex'], correct: 0, scene: SC.h14_materpater },
          { words: ['Nōmen', 'puerī', 'Adam', 'est.'], wrong: 2,
            options: ['Isaac', 'Noe', 'Lot'], correct: 0, scene: SC.h14_nomen },
          { words: ['Sara', 'clāmat.', 'Sara', 'laeta', 'est.'], wrong: 1,
            options: ['rīdet.', 'dormit.', 'timet.'], correct: 0, scene: SC.h14_ridet },
          { words: ['Māter', 'puerō', 'aquam', 'vetat.'], wrong: 3,
            options: ['dat.', 'videt.', 'audit.'], correct: 0, scene: SC.h14_aqua }
        ],
        comple: [
          { text: 'Ecce ___! Sara puerum habet.',
            options: ['puer', 'pāstor', 'camēlus'], correct: 0, scene: SC.h14_puer },
          { text: 'Sara ___ est. Abraham pater est.',
            options: ['māter', 'pater', 'puer'], correct: 0, scene: SC.h14_materpater },
          { text: 'Nōmen puer___ Isaac est.',
            options: ['ī', 'um', 'ō'], correct: 0, scene: SC.h14_nomen },
          { text: 'Isaac fīlius Sar___ est.',
            options: ['ae', 'am', 'a'], correct: 0, scene: SC.h14_isaac },
          { text: 'Sara ___. Sara laeta est.',
            options: ['rīdet', 'clāmat', 'timet'], correct: 0, scene: SC.h14_ridet },
          { text: 'Māter puer___ aquam dat.',
            options: ['ō', 'um', 'ī'], correct: 0, scene: SC.h14_aqua }
        ]
      }
    },

    /* ============ h15 — SACRIFICIUM ISAAC ============
       fons Gn 22, 1–19. The summit of the liber, told the way the
       Vulgate itself resolves it.
       WHAT IS ON THE PAGE: the call, Abraham's obedience, the walk, the
       wood on Isaac's shoulders (22,6), the climb, the altar (22,9),
       Isaac's own question (22,7), Abraham's answer (22,8), the angel
       (22,11–12), the ram (22,13), the offering, the blessing (22,17).
       WHAT IS NOT, AND WHY: the sword and the fire of 22,6, the binding
       of 22,9 and the raised hand of 22,10 are OMITTED IN FULL — not
       softened, not implied. There is no frame in this capitulum
       containing a weapon, a bound child or a hand over a child, and no
       sentence in which Isaac is in danger. The angel arrives BEFORE
       anything could be raised, which is exactly the order Gn 22 gives
       once its instruments are left out (DESIGN §8).
       Isaac's question is 'Ubi est ovis?' where 22,7 has "ubi est
       victima holocausti?" — a simplification to the animal the chapter
       itself supplies four verses later, registered in the ledger.
       Gn 22,12's "nunc cognovi quod times Deum" is rendered 'Abraham
       Deō pāret': `timet` was glossed 😨 in h4 and would carry fear
       where the Latin carries reverence.
       MISSING ART: no `aries`. The ram is drawn and named `ovis`. */
    {
      id: 'h15',
      titulus: 'Sacrificium Isaac',
      icon: '⛰🐑',
      numerus: 'XV',
      pos: { x: 0.26, y: 0.38 },
      fons: 'Gn 22, 1–19',
      vocab: [
        { la: 'pāret',     scene: SC.v_paret,     pars: 'verbum' },
        { la: 'ascendit',  scene: SC.v_ascendit,  pars: 'verbum' },
        { la: 'amat',      scene: SC.v_amat,      pars: 'verbum' },
        { la: 'benedīcit', scene: SC.v_benedicit, pars: 'verbum' }
      ],
      story: [
        /* Gn 22,1 — "dixit ad eum: Abraham, Abraham". The vocative of an
           indeclinable name IS the nominative, so the call is written as
           the Vulgate writes it (see the report). */
        { la: 'Deus Abraham vocat: "Abraham!"', scene: SC.h15_vocat,
          ttsText: 'Deus Abraham vocat: Abraham!' },

        { la: 'Abraham Deum audit. Abraham Deō pāret.', scene: SC.h15_paret,
          nova: [{ w: 'pāret', e: '🙇➡✨', g: 'Deus dīcit; Abraham audit et Deō pāret' }] },

        /* Gn 22,2 — "filium tuum unigenitum, quem diligis" */
        { la: 'Abraham fīlium amat. Isaac fīlius Abrahae est.', scene: SC.h15_amat,
          nova: [{ w: 'amat', e: '💛', g: 'pater fīlium amat' }] },

        /* Gn 22,3–4 */
        { la: 'Abraham et Isaac ad montem ambulant.', scene: SC.h15_iter },

        /* Gn 22,6 — "tulit quoque ligna holocausti, et imposuit super
           Isaac filium suum". The sword of the same verse is omitted. */
        { la: 'Isaac lignum portat. Pater quoque ambulat.', scene: SC.h15_lignum },

        { la: 'Abraham et Isaac in montem ascendunt.', scene: SC.h15_ascendunt,
          nova: [{ w: 'ascendunt', e: '⛰⬆', g: '↔ dēscendunt' }] },

        /* Gn 22,9 — "ædificavit altare, et desuper ligna composuit" */
        { la: 'Abraham altāre aedificat.', scene: SC.h15_altare },

        { la: 'Lignum in altārī est.', scene: SC.h15_lignum2 },

        /* Gn 22,7 — Isaac's own question, DATIVE patrī */
        { la: 'Isaac patrī dīcit: "Ubi est ovis?"', scene: SC.h15_rogat,
          ttsText: 'Isaac patri dicit: Ubi est ovis?' },

        /* Gn 22,8 — "Deus providebit sibi victimam holocausti" */
        { la: 'Abraham dīcit: "Deus ovem dat."', scene: SC.h15_respondet,
          ttsText: 'Abraham dicit: Deus ovem dat.' },

        /* Gn 22,11 — the angel comes BEFORE anything is raised */
        { la: 'Ecce angelus! Angelus Abraham vocat.', scene: SC.h15_angelus },

        /* Gn 22,12 — "nunc cognovi quod times Deum" */
        { la: 'Angelus dīcit: "Abraham Deō pāret."', scene: SC.h15_angelus2,
          ttsText: 'Angelus dicit: Abraham Deo paret.' },

        /* Gn 22,13 — "viditque post tergum arietem" */
        { la: 'Ecce ovis! Ovis in monte est.', scene: SC.h15_ovis },

        { la: 'Deus Abrahae ovem dat.', scene: SC.h15_ovis2 },

        { la: 'Abraham Deō dōnum dat. Dōnum in altārī ārdet.', scene: SC.h15_donum },

        /* Gn 22,17 — "benedicam tibi, et multiplicabo semen tuum" */
        { la: 'Deus Abrahae benedīcit. Deus Isaac quoque benedīcit.', scene: SC.h15_benedicit,
          nova: [{ w: 'benedīcit', e: '✨👤', g: 'Deus dīcit: bonum est' }] },

        { la: 'Abraham et Isaac dēscendunt. Pater et fīlius laetī sunt.', scene: SC.h15_descendunt },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Abraham Deō pāret; Deus Abrahae ovem dat.', scene: SC.h15_memoria,
          ttsText: 'Abraham Deo paret; Deus Abrahae ovem dat.' }
      ],
      ludus: {
        words: [
          { la: 'ovis',      scene: SC.v_ovis,      emoji: '🐑' },
          { la: 'ascendit',  scene: SC.v_ascendit,  emoji: '⛰' },
          { la: 'amat',      scene: SC.v_amat,      emoji: '💛' },
          { la: 'pāret',     scene: SC.v_paret,     emoji: '🙇' },
          { la: 'puer',      scene: SC.v_puer,      emoji: '👶' },
          { la: 'stēlla',    scene: SC.v_stella,    emoji: '⭐' }
        ]
      },
      /* SONUS: pāret and benedīcit are both a patriarch under the
         radiance on the mountain, and ascendit is the same mountain —
         one per set, the rest drawn from other capitula. */
      sonus: [
        { la: 'ascendit',
          answer: { la: 'ascendit', scene: SC.v_ascendit },
          options: [{ la: 'ascendit', scene: SC.v_ascendit },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'puer', scene: SC.v_puer }] },
        { la: 'amat',
          answer: { la: 'amat', scene: SC.v_amat },
          options: [{ la: 'amat', scene: SC.v_amat },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'stēlla', scene: SC.v_stella },
                    { la: 'ascendit', scene: SC.v_ascendit }] },
        { la: 'pāret',
          answer: { la: 'pāret', scene: SC.v_paret },
          options: [{ la: 'pāret', scene: SC.v_paret },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'numerat', scene: SC.v_numerat }] },
        { la: 'benedīcit',
          answer: { la: 'benedīcit', scene: SC.v_benedicit },
          options: [{ la: 'benedīcit', scene: SC.v_benedicit },
                    { la: 'manet', scene: SC.v_manet },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'camēlus', scene: SC.v_camelus }] }
      ],
      overrides: {
        aenigmata: {
          /* h15 carries only FOUR cards of its own (the capitulum's whole
             weight is on recycled vocabulary, which is what makes the
             summit readable), so the memory board is filled out with two
             deliberate review pairs: `ovis` from h12 — the animal this
             capitulum turns on — and `pater` from h14. */
          pairs: [
            { la: 'pāret',     scene: SC.v_paret },
            { la: 'ascendit',  scene: SC.v_ascendit },
            { la: 'amat',      scene: SC.v_amat },
            { la: 'benedīcit', scene: SC.v_benedicit },
            { la: 'ovis',      scene: SC.v_ovis },
            { la: 'pater',     scene: SC.v_pater }
          ],
          scrambles: [
            { la: 'Abraham Deō pāret.',        scene: SC.h15_paret },
            { la: 'Abraham fīlium amat.',      scene: SC.h15_amat },
            { la: 'Abraham altāre aedificat.', scene: SC.h15_altare },
            { la: 'Deus Abrahae ovem dat.',    scene: SC.h15_ovis2 }
          ]
        },
        corrige: [
          { words: ['Abraham', 'Deō', 'nōn', 'pāret.'], wrong: 2,
            options: ['semper', 'iterum', 'quoque'], correct: 0, scene: SC.h15_paret },
          { words: ['Abraham', 'fīlium', 'timet.'], wrong: 2,
            options: ['amat.', 'vocat.', 'vetat.'], correct: 0, scene: SC.h15_amat },
          { words: ['Abraham', 'et', 'Isaac', 'dēscendunt.'], wrong: 3,
            options: ['ascendunt.', 'natant.', 'dormiunt.'], correct: 0, scene: SC.h15_ascendunt },
          { words: ['Abraham', 'arcam', 'aedificat.'], wrong: 1,
            options: ['altāre', 'montem', 'urbem'], correct: 0, scene: SC.h15_altare },
          { words: ['Deus', 'Abrahae', 'bovem', 'dat.'], wrong: 2,
            options: ['ovem', 'camēlum', 'urnam'], correct: 0, scene: SC.h15_ovis2 }
        ],
        comple: [
          { text: 'Abraham De___ pāret.',
            options: ['ō', 'um', 'us'], correct: 0, scene: SC.h15_paret },
          { text: 'Abraham fīlium ___.',
            options: ['amat', 'vetat', 'timet'], correct: 0, scene: SC.h15_amat },
          { text: 'Abraham et Isaac in montem ___.',
            options: ['ascendunt', 'dēscendunt', 'natant'], correct: 0, scene: SC.h15_ascendunt },
          { text: 'Isaac patr___ dīcit.',
            options: ['ī', 'em', 'is'], correct: 0, scene: SC.h15_rogat },
          { text: 'Deus Abrahae ___ dat.',
            options: ['ovem', 'bovem', 'urnam'], correct: 0, scene: SC.h15_ovis2 },
          { text: 'Deus Abrahae et Isaac ___.',
            options: ['benedīcit', 'ascendit', 'numerat'], correct: 0, scene: SC.h15_benedicit }
        ]
      }
    },

    /* ============ h16 — REBECCA AD PUTEUM ============
       fons Gn 24 (abridged). The servant, the well, the kindness.
       THE DATIVE PLURAL IS THIS CAPITULUM'S SHOWCASE: Gn 24,19–20
       ("quin et camelis tuis hauriam aquam … haustam omnibus camelis
       dedit") gives it in the Vulgate's own words, and `camēlīs` is an
       unmistakable ending on a picture the learner has met since h11.
       OMITTED: the oath on the thigh (24,2–9), the servant's prayer and
       its retelling (24,12–14. 34–49 — first person throughout), the
       gold ornaments' weights (24,22), Bathuel and Melcha and Nachor
       (genealogy), and Gn 24,67's "lenitus est dolor" (Sara's death,
       which this liber never tells). `urna` stands for the Vulgate's
       *hydria* — a synonym, not a different thing, exactly as `urbs`
       stands for *civitas* in h10. Laban (24,29) waits for Liber IV,
       where he acts. */
    {
      id: 'h16',
      titulus: 'Rebecca ad Puteum',
      icon: '🐫💧',
      numerus: 'XVI',
      pos: { x: 0.70, y: 0.25 },
      fons: 'Gn 24',
      vocab: [
        { la: 'Rebecca', scene: SC.v_rebecca, pars: 'nomen' },
        { la: 'puteus',  scene: SC.v_puteus,  pars: 'nomen' },
        { la: 'servus',  scene: SC.v_servus,  pars: 'nomen' },
        { la: 'urna',    scene: SC.v_urna,    pars: 'nomen' },
        { la: 'uxor',    scene: SC.v_uxor,    pars: 'nomen' },
        { la: 'bibit',   scene: SC.v_bibit,   pars: 'verbum' },
        { la: 'quaerit', scene: SC.v_quaerit, pars: 'verbum' }
      ],
      story: [
        /* Gn 24,1 — "Erat autem Abraham senex" */
        { la: 'Abraham senex est. Isaac fīlius Abrahae est.', scene: SC.h16_senex },

        /* Gn 24,2 — "dixitque ad servum seniorem domus suæ" */
        { la: 'Abraham servum vocat.', scene: SC.h16_servus,
          nova: [{ w: 'servum', e: '👤', g: 'servus virō labōrat' }] },

        /* Gn 24,4 — "accipias uxorem filio meo Isaac": DATIVE Isaac */
        { la: 'Servus Isaac uxōrem quaerit.', scene: SC.h16_quaerit,
          nova: [{ w: 'uxōrem', e: '👤👤', g: 'Sara uxor Abrahae est' },
                 { w: 'quaerit', e: '👀', g: 'nōn videt: quaerit' }] },

        /* Gn 24,10 — "tulitque decem camelos de grege domini sui" */
        { la: 'Servus Abrahae camēlōs habet. Servus discēdit.', scene: SC.h16_iter },

        /* Gn 24,11 — "cumque camelos fecisset accumbere … juxta puteum" */
        { la: 'Ecce puteus! In puteō aqua est.', scene: SC.h16_puteus,
          nova: [{ w: 'puteus', e: '⛲💧', g: 'aqua puteī bona est' }] },

        { la: 'Servus ad puteum ambulat. Camēlī quoque ad puteum ambulant.', scene: SC.h16_adputeum },

        /* Gn 24,15 — "et ecce Rebecca egrediebatur" */
        { la: 'Ecce Rebecca! Rebecca mulier bona est.', scene: SC.h16_rebecca,
          nova: [{ w: 'Rebecca', e: '👤', g: '' }] },

        /* Gn 24,15–16 — "habens hydriam in scapula sua" */
        { la: 'Rebecca urnam portat.', scene: SC.h16_urna,
          nova: [{ w: 'urnam', e: '🏺', g: 'in urnā aqua est' }] },

        { la: 'In urnā aqua puteī est.', scene: SC.h16_aqua,
          nova: [{ w: 'puteī', e: '⛲➡', g: 'puteus → aqua puteī' }] },

        /* Gn 24,17–18 — "Bibe, domine mi" */
        { la: 'Rebecca servō aquam dat. Servus bibit.', scene: SC.h16_servobibit,
          nova: [{ w: 'bibit', e: '💧', g: 'aquam bibit' }] },

        /* Gn 24,19–20 — THE DATIVE PLURAL, in the Vulgate's own words */
        { la: 'Rebecca camēlīs quoque aquam dat.', scene: SC.h16_camelis,
          nova: [{ w: 'camēlīs', e: '➡🐫🐫', g: 'camēlī → Rebecca camēlīs aquam dat' }] },

        { la: 'Camēlī bibunt. Camēlī multam aquam bibunt.', scene: SC.h16_bibunt },

        /* Gn 24,22 — "protulit vir inaures aureas": DATIVE Rebeccae */
        { la: 'Servus Rebeccae dōnum dat.', scene: SC.h16_donum },

        /* Gn 24,61 — "igitur Rebecca … secutæ sunt virum" */
        { la: 'Rebecca et servus ad Isaac ambulant.', scene: SC.h16_redeunt },

        /* Gn 24,67 — "accepit eam uxorem" */
        { la: 'Rebecca uxor Isaac est.', scene: SC.h16_uxor },

        /* memoriā tenē */
        { la: 'Memoriā tenē: Rebecca camēlīs aquam dat.', scene: SC.h16_memoria,
          ttsText: 'Rebecca camelis aquam dat.' }
      ],
      ludus: {
        words: [
          { la: 'puteus',  scene: SC.v_puteus,  emoji: '⛲' },
          { la: 'urna',    scene: SC.v_urna,    emoji: '🏺' },
          { la: 'servus',  scene: SC.v_servus,  emoji: '👤' },
          { la: 'camēlus', scene: SC.v_camelus, emoji: '🐫' },
          { la: 'bibit',   scene: SC.v_bibit,   emoji: '💧' },
          { la: 'ovis',    scene: SC.v_ovis,    emoji: '🐑' }
        ]
      },
      /* SONUS: Rebecca / servus / uxor are robed people, and puteus /
         bibit / urna all stand at the well — one of each family per set. */
      sonus: [
        { la: 'puteus',
          answer: { la: 'puteus', scene: SC.v_puteus },
          options: [{ la: 'puteus', scene: SC.v_puteus },
                    { la: 'camēlus', scene: SC.v_camelus },
                    { la: 'ovis', scene: SC.v_ovis }] },
        { la: 'urna',
          answer: { la: 'urna', scene: SC.v_urna },
          options: [{ la: 'urna', scene: SC.v_urna },
                    { la: 'grex', scene: SC.v_grex },
                    { la: 'stēlla', scene: SC.v_stella },
                    { la: 'bōs', scene: SC.v_bos }] },
        { la: 'Rebecca',
          answer: { la: 'Rebecca', scene: SC.v_rebecca },
          options: [{ la: 'Rebecca', scene: SC.v_rebecca },
                    { la: 'urna', scene: SC.v_urna },
                    { la: 'puteus', scene: SC.v_puteus }] },
        { la: 'bibit',
          answer: { la: 'bibit', scene: SC.v_bibit },
          options: [{ la: 'bibit', scene: SC.v_bibit },
                    { la: 'urna', scene: SC.v_urna },
                    { la: 'ovis', scene: SC.v_ovis },
                    { la: 'grex', scene: SC.v_grex }] }
      ],
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'Rebecca', scene: SC.v_rebecca },
            { la: 'puteus',  scene: SC.v_puteus },
            { la: 'servus',  scene: SC.v_servus },
            { la: 'urna',    scene: SC.v_urna },
            { la: 'bibit',   scene: SC.v_bibit },
            { la: 'quaerit', scene: SC.v_quaerit }
          ],
          scrambles: [
            { la: 'Servus Isaac uxōrem quaerit.',   scene: SC.h16_quaerit },
            { la: 'Rebecca urnam portat.',          scene: SC.h16_urna },
            { la: 'Rebecca servō aquam dat.',       scene: SC.h16_servobibit },
            { la: 'Rebecca camēlīs aquam dat.',     scene: SC.h16_camelis }
          ]
        },
        corrige: [
          { words: ['Servus', 'Isaac', 'gregem', 'quaerit.'], wrong: 2,
            options: ['uxōrem', 'urnam', 'ovem'], correct: 0, scene: SC.h16_quaerit },
          { words: ['Ecce', 'mōns!', 'In', 'puteō', 'aqua', 'est.'], wrong: 1,
            options: ['puteus!', 'urna!', 'arca!'], correct: 0, scene: SC.h16_puteus },
          { words: ['Rebecca', 'arcam', 'portat.'], wrong: 1,
            options: ['urnam', 'ovem', 'stēllam'], correct: 0, scene: SC.h16_urna },
          { words: ['Rebecca', 'servō', 'aquam', 'vetat.'], wrong: 3,
            options: ['dat.', 'clāmat.', 'timet.'], correct: 0, scene: SC.h16_servobibit },
          { words: ['Camēlī', 'natant.'], wrong: 1,
            options: ['bibunt.', 'aedificant.', 'rīdent.'], correct: 0, scene: SC.h16_bibunt },
          { words: ['Servus', 'aquam', 'portat.'], wrong: 2,
            options: ['bibit.', 'numerat.', 'aedificat.'], correct: 0, scene: SC.h16_servobibit }
        ],
        comple: [
          { text: 'Servus Isaac ___ quaerit.',
            options: ['uxōrem', 'urnam', 'ovem'], correct: 0, scene: SC.h16_quaerit },
          { text: 'Ecce ___! In puteō aqua est.',
            options: ['puteus', 'urna', 'servus'], correct: 0, scene: SC.h16_puteus },
          { text: 'In urnā aqua putē___ est.',
            options: ['ī', 'um', 'ō'], correct: 0, scene: SC.h16_aqua },
          { text: 'Rebecca serv___ aquam dat.',
            options: ['ō', 'um', 'us'], correct: 0, scene: SC.h16_servobibit },
          { text: 'Rebecca camēl___ aquam dat.',
            options: ['īs', 'ōs', 'us'], correct: 0, scene: SC.h16_camelis },
          { text: 'Camēlī multam aquam ___.',
            options: ['bibunt', 'portant', 'numerant'], correct: 0, scene: SC.h16_bibunt }
        ]
      }
    }
  ];

  /* ---------- the liber envelope ---------- */

  CONTENT.registerRegion({
    track: 'historia',
    id: 'l3',
    titulus: 'Abraham',
    ladder: 'S3',              /* CURRICULUM §0: genitive, dative sg/pl */
    progressId: 'l3',
    capitula: capitula,

    /* ---------- PROBĀTIŌ, not a duel ----------
       DESIGN §6: "Wolf duels are tonally wrong in Genesis." The trial of
       this liber is its PROMISES: a sentence about something Abraham was
       given or shown, with the picturable word missing, and three cards
       sinking gently through the night sky.

       The five items are HAND-AUTHORED (AUTHORING-BRIEF, binding from
       wave 3 on) and every one of them obeys the two gates
       js/boss-phases.js enforces on authored items:
         · the answer is a vocabulary word of THIS liber with a real
           scene (app.js bossWords() only sees this region's capitula),
         · the gap is a nomen/verbum, never a function word,
       plus the rule LATIN-STYLE §4 adds: each distractor is the same
       part of speech AND clearly wrong in the pictured context.
       All six capitula are represented across the trial and the quiz:
       h11 · h13 · h14 · h15 · h16 here, h12 in the quiz. */
    boss: {
      id: 'b_l3',
      progressId: 'l3',
      kind: 'probatio',
      name: 'Prōmissa',
      actor: 'star',
      bg: 'nightSky',
      sceneY: 150,
      sceneScale: 1.5,
      /* No vinceText: that field is the DUEL's challenge line and
         js/app.js bossHeaderText() never reads it for a trial, which
         derives "Probātiō: Prōmissa — SENTENTIA!" from name + phase. */
      /* legacy single-phase fallback, for the same reason l2 keeps its
         own: a client without js/probatio.js must still run something,
         and rules.php derives rule_boss_min_ms('l3') from these. */
      hp: 5,
      seconds: 50,
      pos: { x: 0.42, y: 0.11 },
      phases: [
        { type: 'sententia',
          hp: 5,
          seconds: 55,
          items: [
            { text: 'Abraham ad terram ____.',
              answer: 'ambulat',
              options: ['ambulat', 'numerat', 'bibit'],
              scene: SC.h11_adterram },
            { text: 'Nox est. Abraham Deō ____.',
              answer: 'crēdit',
              options: ['crēdit', 'manet', 'ascendit'],
              scene: SC.h13_credit },
            { text: 'Sara puerum videt et ____.',
              answer: 'rīdet',
              options: ['rīdet', 'quaerit', 'numerat'],
              scene: SC.h14_ridet },
            { text: 'Abraham in montem ____.',
              answer: 'ascendit',
              options: ['ascendit', 'bibit', 'rīdet'],
              scene: SC.v_ascendit },
            { text: 'Ecce ____! Rebecca aquam portat.',
              answer: 'urna',
              options: ['urna', 'puteus', 'stēlla'],
              scene: SC.h16_urna }
          ] }
      ],
      /* 5 cumulative questions, word → pick the image. Every word is a
         vocab entry WITH a picture in its own capitulum, which is what
         js/app.js bossWords() needs to resolve it. Answer key lives on
         the server (server/lib/rules.php) — see content/_pending/l3.reg.json. */
      quiz: [
        { la: 'camēlus', from: 'h11' },
        { la: 'ovis',    from: 'h12' },
        { la: 'stēlla',  from: 'h13' },
        { la: 'puer',    from: 'h14' },
        { la: 'puteus',  from: 'h16' }
      ]
    }
  });
})();
