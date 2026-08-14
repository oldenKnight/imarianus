/* ============================================================
   content/fabulae-r01.js — FĀBULAE · Regiō I · SILVA  (ladder S1)
   ------------------------------------------------------------
   Three graded fables (Ørberg-style progression):
     f1 Vulpēs et Ūva      — nom/acc, present tense
     f2 Corvus et Vulpēs   — + adjectives, direct speech
     f3 Lupus et Agnus     — + imperfect, questions, clauses
   The Latin, the vocab and every scene spec below are UNCHANGED
   from the original js/data.js; only the envelope is new (M4).

   PROGRESS IDS ARE FROZEN: capitulum ids f1/f2/f3 and the boss's
   progressId 'region1' are what the server's step_completions and
   boss_clears rows already contain. Renaming any of them would
   erase a live learner's progress.

   The file registers itself with CONTENT the moment it is injected
   by content-loader.js; it is never bundled into the initial load.
   Schema: see content/README.md.
   ============================================================ */
(function () {
  'use strict';

  var G = 210; /* ground line in scene space */

  /* ---------- shared scene specs ---------- */

  var SC = {
    /* fable 1 */
    f1_fox:      { bg: 'forest', items: [{ t: 'fox', x: 200, y: G }] },
    f1_walk:     { bg: 'forest', items: [{ t: 'tree', x: 330, y: G }, { t: 'fox', x: 140, y: G, pose: 'walk' }] },
    f1_hungry:   { bg: 'forest', items: [{ t: 'fox', x: 170, y: G }],
                   bubbles: [{ x: 255, y: 110, w: 70, h: 44, text: '🍗', kind: 'thought', tail: 'left', fs: 22 }] },
    f1_grapes:   { bg: 'forest', items: [{ t: 'tree', x: 290, y: G, grapes: true }] },
    f1_sees:     { bg: 'forest', items: [{ t: 'tree', x: 300, y: G, grapes: true }, { t: 'fox', x: 130, y: G }],
                   bubbles: [{ x: 195, y: 95, w: 58, h: 40, text: '🍇', kind: 'thought', tail: 'left', fs: 20 }] },
    f1_jump:     { bg: 'forest', items: [{ t: 'tree', x: 300, y: G, grapes: true }, { t: 'fox', x: 215, y: 165, pose: 'jump' }] },
    f1_cannot:   { bg: 'forest', items: [{ t: 'tree', x: 300, y: G, grapes: true }, { t: 'fox', x: 190, y: G, pose: 'sad' }],
                   bubbles: [{ x: 120, y: 100, w: 78, h: 44, text: '🍇 ✗', kind: 'thought', tail: 'right', fs: 20 }] },
    f1_again:    { bg: 'forest', items: [{ t: 'tree', x: 300, y: G, grapes: true }, { t: 'fox', x: 220, y: 158, pose: 'jump' }],
                   bubbles: [{ x: 120, y: 95, w: 72, h: 42, text: '✗ ✗', kind: 'thought', tail: 'right', fs: 20 }] },
    f1_sour:     { bg: 'forest', items: [{ t: 'tree', x: 320, y: G, grapes: true }, { t: 'fox', x: 160, y: G, flip: true }],
                   bubbles: [{ x: 105, y: 90, w: 86, h: 46, text: '🍇 = 😖', kind: 'speech', tail: 'right', fs: 18 }] },
    f1_leaves:   { bg: 'forest', items: [{ t: 'tree', x: 330, y: G, grapes: true }, { t: 'fox', x: 120, y: G, pose: 'walk', flip: true }] },

    /* fable 2 */
    f2_crow:     { bg: 'plain', items: [{ t: 'tree', x: 210, y: G }, { t: 'crow', x: 228, y: 84 }] },
    f2_cheese:   { bg: 'plain', items: [{ t: 'tree', x: 210, y: G }, { t: 'crow', x: 228, y: 84, pose: 'hold' }] },
    f2_foxsees:  { bg: 'plain', items: [{ t: 'tree', x: 250, y: G }, { t: 'crow', x: 268, y: 84, pose: 'hold' }, { t: 'fox', x: 100, y: G, pose: 'walk' }] },
    f2_wants:    { bg: 'plain', items: [{ t: 'tree', x: 260, y: G }, { t: 'crow', x: 278, y: 84, pose: 'hold' }, { t: 'fox', x: 120, y: G, pose: 'sit' }],
                   bubbles: [{ x: 70, y: 80, w: 60, h: 42, text: '🧀', kind: 'thought', tail: 'right', fs: 20 }] },
    f2_flatter:  { bg: 'plain', items: [{ t: 'tree', x: 260, y: G }, { t: 'crow', x: 278, y: 84, pose: 'hold' }, { t: 'fox', x: 110, y: G, pose: 'sit' }],
                   bubbles: [{ x: 75, y: 75, w: 84, h: 44, text: '✨ 😍 ✨', kind: 'speech', tail: 'right', fs: 16 }] },
    f2_sing:     { bg: 'plain', items: [{ t: 'tree', x: 260, y: G }, { t: 'crow', x: 278, y: 84, pose: 'hold' }, { t: 'fox', x: 110, y: G, pose: 'sit' }],
                   bubbles: [{ x: 75, y: 75, w: 78, h: 44, text: '🎶 ❓', kind: 'speech', tail: 'right', fs: 17 }] },
    f2_cra:      { bg: 'plain', items: [{ t: 'tree', x: 260, y: G }, { t: 'crow', x: 278, y: 84, pose: 'sing' }, { t: 'fallingCheese', x: 245, y: 140 }, { t: 'fox', x: 110, y: G, pose: 'sit' }],
                   bubbles: [{ x: 345, y: 50, w: 70, h: 40, text: 'CRĀ!', kind: 'speech', tail: 'left', fs: 16 }] },
    f2_falls:    { bg: 'plain', items: [{ t: 'tree', x: 260, y: G }, { t: 'crow', x: 278, y: 84, pose: 'sing' }, { t: 'fallingCheese', x: 240, y: 190 }, { t: 'fox', x: 150, y: G }] },
    f2_eats:     { bg: 'plain', items: [{ t: 'tree', x: 280, y: G }, { t: 'crow', x: 298, y: 84, pose: 'sad' }, { t: 'fox', x: 140, y: G }, { t: 'cheese', x: 178, y: 158, s: 0.7 }],
                   bubbles: [{ x: 95, y: 85, w: 60, h: 40, text: '😋', kind: 'speech', tail: 'right', fs: 18 }] },
    f2_end:      { bg: 'plain', items: [{ t: 'tree', x: 290, y: G }, { t: 'crow', x: 308, y: 84, pose: 'sad' }, { t: 'fox', x: 110, y: G, pose: 'walk', flip: true }],
                   bubbles: [{ x: 360, y: 45, w: 56, h: 38, text: '😢', kind: 'thought', tail: 'left', fs: 16 }, { x: 60, y: 105, w: 56, h: 38, text: '😀', kind: 'thought', tail: 'right', fs: 16 }] },

    /* fable 3 */
    f3_river:    { bg: 'river', items: [{ t: 'wolf', x: 85, y: 155 }, { t: 'lamb', x: 330, y: 230 }] },
    f3_drink:    { bg: 'river', items: [{ t: 'wolf', x: 85, y: 155 }, { t: 'lamb', x: 330, y: 230 }],
                   bubbles: [{ x: 85, y: 60, w: 58, h: 38, text: '⬆ 💧', kind: 'thought', tail: 'left', fs: 15 }, { x: 330, y: 110, w: 58, h: 38, text: '⬇ 💧', kind: 'thought', tail: 'right', fs: 15 }] },
    f3_shout:    { bg: 'river', items: [{ t: 'wolf', x: 85, y: 155, pose: 'angry' }, { t: 'lamb', x: 330, y: 230, pose: 'fear' }],
                   bubbles: [{ x: 175, y: 60, w: 84, h: 44, text: '💢 ❓', kind: 'speech', tail: 'left', fs: 18 }] },
    f3_reply:    { bg: 'river', items: [{ t: 'wolf', x: 85, y: 155, pose: 'angry' }, { t: 'lamb', x: 330, y: 230, pose: 'fear' }],
                   bubbles: [{ x: 300, y: 95, w: 92, h: 44, text: '💧 ➡ 🐑', kind: 'speech', tail: 'right', fs: 15 }] },
    f3_accuse:   { bg: 'river', items: [{ t: 'wolf', x: 85, y: 155, pose: 'angry' }, { t: 'lamb', x: 330, y: 230, pose: 'fear' }],
                   bubbles: [{ x: 175, y: 60, w: 84, h: 44, text: '👴 💢', kind: 'speech', tail: 'left', fs: 17 }] },
    f3_deny:     { bg: 'river', items: [{ t: 'wolf', x: 85, y: 155, pose: 'angry' }, { t: 'lamb', x: 330, y: 230, pose: 'fear' }],
                   bubbles: [{ x: 300, y: 95, w: 84, h: 44, text: '👴 🚫', kind: 'speech', tail: 'right', fs: 17 }] },
    f3_leap:     { bg: 'river', items: [{ t: 'wolf', x: 200, y: 165, pose: 'leap' }, { t: 'lamb', x: 335, y: 230, pose: 'fear' }],
                   bubbles: [{ x: 120, y: 60, w: 70, h: 42, text: '💢 !', kind: 'speech', tail: 'right', fs: 18 }] },
    f3_caught:   { bg: 'river', items: [{ t: 'wolf', x: 285, y: 185, pose: 'leap' }, { t: 'lamb', x: 348, y: 233, pose: 'fear', s: 0.85 }] },
    f3_moral:    { bg: 'plain', items: [{ t: 'wolf', x: 250, y: G, flip: true, pose: 'stand' }],
                   bubbles: [{ x: 130, y: 80, w: 96, h: 46, text: '😈 ⚖', kind: 'thought', tail: 'right', fs: 18 }] },

    /* vocab mini-scenes */
    v_salit:     { bg: 'plain', items: [{ t: 'fox', x: 200, y: 150, pose: 'jump' }] },
    v_ambulat:   { bg: 'plain', items: [{ t: 'fox', x: 200, y: G, pose: 'walk' }] },
    v_sedet:     { bg: 'plain', items: [{ t: 'fox', x: 200, y: G, pose: 'sit' }] },
    v_corvus:    { bg: 'plain', items: [{ t: 'crow', x: 200, y: G, s: 2.2 }] },
    v_bibit:     { bg: 'river', items: [{ t: 'lamb', x: 300, y: 228 }] },

    /* silva: a proper woods — three foreground trees of varied size with low
       bushes scattered as undergrowth, over the forest backdrop (which already
       supplies distant trees and a sun). Visually unambiguous as "the woods"
       rather than "a single tree". */
    v_silva:     { bg: 'forest', items: [
                   { t: 'tree', x: 90,  y: G, s: 0.78 },
                   { t: 'tree', x: 220, y: G, s: 0.95 },
                   { t: 'tree', x: 335, y: G, s: 0.72 },
                   { t: 'bush', x: 45,  y: G },
                   { t: 'bush', x: 165, y: G },
                   { t: 'bush', x: 285, y: G },
                   { t: 'bush', x: 375, y: G }
                 ] },

    /* vox: face in three-quarter view with an open singing mouth and three
       red sound arcs to the right. Distinct from cantat (🎶 musical notes). */
    v_vox:       { bg: 'plain', items: [{ t: 'voice', x: 170, y: 110, s: 2.2 }] },

    /* pulcher: a pink rose with sparkles — a single iconic "beautiful" object
       that does not get confused with cantat sparkles in the story. */
    v_pulcher:   { bg: 'plain', items: [{ t: 'rose', x: 200, y: 175, s: 2.4 }] },

    /* rīvus: a clear flowing river — bgRiver alone is enough (water band +
       flow arrows). Much less ambiguous than 🌊 (ocean wave). */
    v_rivus:     { bg: 'river', items: [] }
  };

  /* ---------- capitula ---------- */

  var capitula = [

    /* ============ FABLE 1 ============ */
    {
      id: 'f1',
      titulus: 'Vulpēs et Ūva',
      icon: '🦊🍇',
      numerus: 'I',
      pos: { x: 0.24, y: 0.86 },
      vocab: [
        { la: 'vulpēs',  emoji: '🦊' },
        { la: 'ūva',     emoji: '🍇' },
        { la: 'arbor',   emoji: '🌳' },
        { la: 'silva',   scene: SC.v_silva },
        { la: 'videt',   emoji: '👀' },
        { la: 'salit',   scene: SC.v_salit },
        { la: 'ambulat', scene: SC.v_ambulat },
        { la: 'capit',   emoji: '✊' },
        { la: 'nōn',     emoji: '🚫' },
        { la: 'dīcit',   emoji: '💬' }
      ],
      story: [
        { la: 'Ecce vulpēs!', scene: SC.f1_fox,
          nova: [{ w: 'ecce', e: '👉', g: 'vidē!' }] },
        { la: 'Vulpēs in silvā ambulat.', scene: SC.f1_walk, nova: [] },
        { la: 'Vulpēs ēsurit.', scene: SC.f1_hungry,
          nova: [{ w: 'ēsurit', e: '🍗❓', g: 'cibum cupit' }] },
        { la: 'Ecce ūva! Ūva in arbore est.', scene: SC.f1_grapes, nova: [] },
        { la: 'Vulpēs ūvam videt. Vulpēs ūvam cupit!', scene: SC.f1_sees,
          nova: [{ w: 'cupit', e: '💭❤', g: 'habēre vult' }] },
        { la: 'Vulpēs salit!', scene: SC.f1_jump, nova: [] },
        { la: 'Sed ūva alta est. Vulpēs ūvam capere nōn potest.', scene: SC.f1_cannot,
          nova: [{ w: 'alta', e: '⬆', g: 'nōn parva' }, { w: 'nōn potest', e: '🚫💪', g: '' }] },
        { la: 'Iterum salit. Iterum capere nōn potest.', scene: SC.f1_again,
          nova: [{ w: 'iterum', e: '🔁', g: 'rūrsus' }] },
        { la: 'Vulpēs dīcit: “Ūva acerba est! Ūvam nōn cupiō.”', scene: SC.f1_sour,
          nova: [{ w: 'acerba', e: '😖', g: 'nōn dulcis' }] },
        { la: 'Vulpēs trīstis discēdit.', scene: SC.f1_leaves,
          nova: [{ w: 'discēdit', e: '🚶↩', g: 'abit' }, { w: 'trīstis', e: '😢', g: 'nōn laeta' }] }
      ],
      ludus: {
        words: [
          { la: 'vulpēs', emoji: '🦊' },
          { la: 'ūva',    emoji: '🍇' },
          { la: 'arbor',  emoji: '🌳' },
          { la: 'silva',  scene: SC.v_silva, emoji: '🌲' }
        ]
      },
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'vulpēs', emoji: '🦊' },
            { la: 'ūva',    emoji: '🍇' },
            { la: 'arbor',  emoji: '🌳' },
            { la: 'videt',  emoji: '👀' },
            { la: 'nōn',    emoji: '🚫' },
            { la: 'dīcit',  emoji: '💬' }
          ],
          scrambles: [
            { la: 'Vulpēs ūvam videt.', scene: SC.f1_sees },
            { la: 'Ūva in arbore est.', scene: SC.f1_grapes },
            { la: 'Vulpēs in silvā ambulat.', scene: SC.f1_walk },
            { la: 'Vulpēs ūvam capere nōn potest.', scene: SC.f1_cannot }
          ]
        },
        corrige: [
          { words: ['Vulpēs', 'in', 'silvā', 'salit.'], wrong: 3,
            options: ['ambulat.', 'videt.', 'est.'], correct: 0, scene: SC.f1_walk },
          { words: ['Ūva', 'in', 'silvā', 'est.'], wrong: 2,
            options: ['arbore', 'vulpe', 'aquā'], correct: 0, scene: SC.f1_grapes },
          { words: ['Vulpēs', 'ambulat.'], wrong: 1,
            options: ['salit.', 'est.', 'dīcit.'], correct: 0, scene: SC.f1_jump },
          { words: ['Arbor', 'ūvam', 'videt.'], wrong: 0,
            options: ['Vulpēs', 'Silva', 'Ūva'], correct: 0, scene: SC.f1_sees }
        ],
        comple: [
          { text: 'Ecce ___!', options: ['vulpēs', 'ūva', 'arbor'], correct: 0, scene: SC.f1_fox },
          { text: 'Vulpēs ūv___ videt.', options: ['am', 'a', 'ae'], correct: 0, scene: SC.f1_sees },
          { text: 'Ūva in arbore ___.', options: ['est', 'salit', 'ambulat'], correct: 0, scene: SC.f1_grapes },
          { text: 'Vulpēs in silv___ ambulat.', options: ['ā', 'am', 'īs'], correct: 0, scene: SC.f1_walk },
          { text: 'Vulpēs ūvam capere ___ potest.', options: ['nōn', 'ecce', 'in'], correct: 0, scene: SC.f1_cannot }
        ]
      }
    },

    /* ============ FABLE 2 ============ */
    {
      id: 'f2',
      titulus: 'Corvus et Vulpēs',
      icon: '🧀🦊',
      numerus: 'II',
      pos: { x: 0.70, y: 0.63 },
      vocab: [
        { la: 'corvus',  scene: SC.v_corvus },
        { la: 'cāseus',  emoji: '🧀' },
        { la: 'sedet',   scene: SC.v_sedet },
        { la: 'tenet',   emoji: '🤲' },
        { la: 'cantat',  emoji: '🎶' },
        { la: 'vōx',     scene: SC.v_vox },
        { la: 'pulcher', scene: SC.v_pulcher },
        { la: 'laetus',  emoji: '😀' },
        { la: 'trīstis', emoji: '😢' },
        { la: 'cadit',   emoji: '⬇️' }
      ],
      story: [
        { la: 'Ecce corvus! Corvus in arbore sedet.', scene: SC.f2_crow, nova: [] },
        { la: 'Corvus cāseum in rōstrō tenet.', scene: SC.f2_cheese,
          nova: [{ w: 'rōstrum', e: '🐦👄', g: 'ōs avis' }] },
        { la: 'Vulpēs venit. Vulpēs cāseum videt.', scene: SC.f2_foxsees,
          nova: [{ w: 'venit', e: '🚶➡', g: 'ambulat ad' }] },
        { la: 'Vulpēs cāseum cupit, sed corvus in arbore altā sedet.', scene: SC.f2_wants,
          nova: [{ w: 'sed', e: '↔', g: '' }] },
        { la: 'Vulpēs dīcit: “Ō corve! Quam pulcher es!”', scene: SC.f2_flatter,
          nova: [{ w: 'quam', e: '❗', g: 'valdē' }] },
        { la: '“Vōx tua quoque pulchra est? Cantā, corve!”', scene: SC.f2_sing,
          nova: [{ w: 'quoque', e: '➕', g: 'etiam' }] },
        { la: 'Corvus laetus est. Corvus cantat: “CRĀ!”', scene: SC.f2_cra, nova: [] },
        { la: 'Cāseus cadit!', scene: SC.f2_falls, nova: [] },
        { la: 'Vulpēs cāseum capit et dēvorat.', scene: SC.f2_eats,
          nova: [{ w: 'dēvorat', e: '😋', g: 'ēst, edit' }] },
        { la: 'Corvus trīstis est, sed vulpēs laeta discēdit.', scene: SC.f2_end, nova: [] }
      ],
      ludus: {
        words: [
          { la: 'cāseus',  emoji: '🧀' },
          { la: 'vulpēs',  emoji: '🦊' },
          { la: 'ūva',     emoji: '🍇' },
          { la: 'laetus',  emoji: '😀' },
          { la: 'trīstis', emoji: '😢' },
          { la: 'arbor',   emoji: '🌳' }
        ]
      },
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'cāseus',  emoji: '🧀' },
            { la: 'cantat',  emoji: '🎶' },
            { la: 'vōx',     scene: SC.v_vox },
            { la: 'laetus',  emoji: '😀' },
            { la: 'trīstis', emoji: '😢' },
            { la: 'cadit',   emoji: '⬇️' }
          ],
          scrambles: [
            { la: 'Corvus in arbore sedet.', scene: SC.f2_crow },
            { la: 'Corvus cāseum tenet.', scene: SC.f2_cheese },
            { la: 'Vulpēs cāseum videt.', scene: SC.f2_foxsees },
            { la: 'Vulpēs cāseum capit et dēvorat.', scene: SC.f2_eats }
          ]
        },
        corrige: [
          { words: ['Corvus', 'ūvam', 'tenet.'], wrong: 1,
            options: ['cāseum', 'arborem', 'vulpem'], correct: 0, scene: SC.f2_cheese },
          { words: ['Vulpēs', 'cantat.'], wrong: 0,
            options: ['Corvus', 'Cāseus', 'Arbor'], correct: 0, scene: SC.f2_cra },
          { words: ['Corvus', 'laetus', 'est.'], wrong: 1,
            options: ['trīstis', 'pulcher', 'altus'], correct: 0, scene: SC.f2_end },
          { words: ['Cāseus', 'salit.'], wrong: 1,
            options: ['cadit.', 'cantat.', 'sedet.'], correct: 0, scene: SC.f2_falls }
        ],
        comple: [
          { text: 'Corvus in arbore ___.', options: ['sedet', 'cadit', 'cantat'], correct: 0, scene: SC.f2_crow },
          { text: 'Corvus cāse___ tenet.', options: ['um', 'us', 'ō'], correct: 0, scene: SC.f2_cheese },
          { text: 'Vulpēs dīcit: “Quam ___ es!”', options: ['pulcher', 'trīstis', 'altus'], correct: 0, scene: SC.f2_flatter },
          { text: 'Corvus cantat et cāseus ___.', options: ['cadit', 'sedet', 'tenet'], correct: 0, scene: SC.f2_cra },
          { text: 'Vulpēs laeta est, sed corvus ___ est.', options: ['trīstis', 'pulcher', 'laetus'], correct: 0, scene: SC.f2_end }
        ]
      }
    },

    /* ============ FABLE 3 ============ */
    {
      id: 'f3',
      titulus: 'Lupus et Agnus',
      icon: '🐺🐑',
      numerus: 'III',
      pos: { x: 0.30, y: 0.40 },
      vocab: [
        { la: 'lupus',     emoji: '🐺' },
        { la: 'agnus',     emoji: '🐑' },
        { la: 'rīvus',     scene: SC.v_rivus },
        { la: 'aqua',      emoji: '💧' },
        { la: 'bibit',     scene: SC.v_bibit },
        { la: 'clāmat',    emoji: '📢' },
        { la: 'īrātus',    emoji: '😠' },
        { la: 'timet',     emoji: '😨' },
        { la: 'respondet', emoji: '🗣️' },
        { la: 'cūr?',      emoji: '❓' }
      ],
      story: [
        { la: 'Ōlim lupus et agnus ad rīvum veniēbant.', scene: SC.f3_river,
          nova: [{ w: 'ōlim', e: '🕰', g: 'tunc, nōn nunc' }, { w: 'veniēbant', e: '🚶🚶', g: 'veniunt (tunc)' }] },
        { la: 'Lupus suprā bibēbat; agnus īnfrā bibēbat.', scene: SC.f3_drink,
          nova: [{ w: 'suprā', e: '⬆', g: '' }, { w: 'īnfrā', e: '⬇', g: '' }] },
        { la: 'Lupus agnum videt et clāmat: “Cūr aquam meam turbās?”', scene: SC.f3_shout,
          nova: [{ w: 'turbās', e: '🌀💧', g: 'aquam sordidam facis' }] },
        { la: 'Agnus timet et respondet: “Nōn possum, domine! Aqua ā tē ad mē fluit.”', scene: SC.f3_reply,
          nova: [{ w: 'fluit', e: '💧➡', g: 'aqua it' }, { w: 'domine', e: '🙇', g: '' }] },
        { la: 'Lupus īrātus dīcit: “Pater tuus male dē mē dīcēbat!”', scene: SC.f3_accuse,
          nova: [{ w: 'male', e: '👎', g: 'nōn bene' }] },
        { la: 'Agnus respondet: “Patrem nōn habeō, domine!”', scene: SC.f3_deny,
          nova: [{ w: 'habeō', e: '🤲', g: 'meum est' }] },
        { la: 'Lupus clāmat: “Verba tua nōn cūrō!”', scene: SC.f3_leap,
          nova: [{ w: 'verba', e: '💬💬', g: '' }, { w: 'nōn cūrō', e: '🤷', g: 'nihil mihi est' }] },
        { la: 'Lupus agnum capit et dēvorat.', scene: SC.f3_caught, nova: [] },
        { la: 'Fābula docet: malus causam semper invenit.', scene: SC.f3_moral,
          nova: [{ w: 'docet', e: '🏫', g: 'monstrat' }, { w: 'semper', e: '♾', g: '' }, { w: 'invenit', e: '🔍', g: '' }] }
      ],
      ludus: {
        words: [
          { la: 'lupus',  emoji: '🐺' },
          { la: 'agnus',  emoji: '🐑' },
          { la: 'aqua',   emoji: '💧' },
          { la: 'vulpēs', emoji: '🦊' },
          { la: 'cāseus', emoji: '🧀' },
          { la: 'ūva',    emoji: '🍇' }
        ]
      },
      overrides: {
        aenigmata: {
          pairs: [
            { la: 'lupus',  emoji: '🐺' },
            { la: 'agnus',  emoji: '🐑' },
            { la: 'aqua',   emoji: '💧' },
            { la: 'clāmat', emoji: '📢' },
            { la: 'timet',  emoji: '😨' },
            { la: 'īrātus', emoji: '😠' }
          ],
          scrambles: [
            { la: 'Lupus aquam bibit.', scene: SC.f3_drink },
            { la: 'Agnus lupum timet.', scene: SC.f3_shout },
            { la: 'Lupus īrātus clāmat.', scene: SC.f3_accuse },
            { la: 'Lupus agnum capit et dēvorat.', scene: SC.f3_caught }
          ]
        },
        corrige: [
          { words: ['Agnus', 'clāmat.'], wrong: 0,
            options: ['Lupus', 'Rīvus', 'Cāseus'], correct: 0, scene: SC.f3_shout },
          { words: ['Lupus', 'et', 'agnus', 'ad', 'silvam', 'veniēbant.'], wrong: 4,
            options: ['rīvum', 'arborem', 'ūvam'], correct: 0, scene: SC.f3_river },
          { words: ['Lupus', 'timet.'], wrong: 0,
            options: ['Agnus', 'Corvus', 'Rīvus'], correct: 0, scene: SC.f3_reply },
          { words: ['Lupus', 'aquam', 'cantat.'], wrong: 2,
            options: ['bibit.', 'tenet.', 'sedet.'], correct: 0, scene: SC.f3_drink }
        ],
        comple: [
          { text: 'Lupus et agnus ad rīv___ veniēbant.', options: ['um', 'us', 'ō'], correct: 0, scene: SC.f3_river },
          { text: 'Lupus ___: “Cūr aquam meam turbās?”', options: ['clāmat', 'timet', 'bibit'], correct: 0, scene: SC.f3_shout },
          { text: 'Agnus ___ et respondet.', options: ['timet', 'clāmat', 'dēvorat'], correct: 0, scene: SC.f3_reply },
          { text: 'Lupus īrāt___ est.', options: ['us', 'a', 'um'], correct: 0, scene: SC.f3_accuse },
          { text: 'Lupus agnum capit et ___.', options: ['dēvorat', 'cantat', 'sedet'], correct: 0, scene: SC.f3_caught }
        ]
      }
    }
  ];

  /* ---------- the region envelope ---------- */

  CONTENT.registerRegion({
    track: 'fabulae',
    id: 'r01',
    titulus: 'Silva',
    ladder: 'S1',                 /* CURRICULUM §0: nom/acc sg, present */
    /* FROZEN: server boss_clears rows for this region already say 'region1' */
    progressId: 'region1',
    capitula: capitula,
    boss: {
      id: 'b_r01',
      progressId: 'region1',
      name: 'Lupus',              /* the wolf villain doubles as the boss */
      actor: 'wolf',
      hp: 6,                      /* correct catches needed to defeat */
      seconds: 45,                /* soft+hard timer for the fight */
      pos: { x: 0.66, y: 0.16 },
      /* quiz: 5 cumulative questions, word → pick the image. Pulled across
         all three fables (one each from f1/f2/f3 + two extra). */
      quiz: [
        { la: 'vulpēs', from: 'f1' },
        { la: 'cāseus', from: 'f2' },
        { la: 'lupus',  from: 'f3' },
        { la: 'ūva',    from: 'f1' },
        { la: 'aqua',   from: 'f3' }
      ]
    }
  });
})();
