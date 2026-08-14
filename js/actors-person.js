/* ============================================================
   actors-person.js — THE human actor (Scenes.register('person'))
   ------------------------------------------------------------
   Historia Sacra and the Aeneid need hundreds of people: patriarchs,
   shepherds, kings, soldiers, mothers, children, angels. Drawing each
   one as its own actor would guarantee they drift apart stylistically,
   so there is exactly ONE person routine here, built from composable
   segments (head / hair / beard / robe / arms / legs / props) that a
   small preset table drives. Eleven roles = one core + eleven rows.

   Style contract (must match js/scenes.js exactly):
     - flat fills, no outline strokes on saturated shapes; a single
       darker tone per colour does all the shading,
     - the shade always falls on the RIGHT/lower side (light comes from
       the upper left) — every file in this art set obeys that,
     - eyes are ink dots (C.ink family), faces carry nothing else,
     - limbs are round-capped strokes, exactly like the fox's legs,
     - origin (0,0) is the GROUND POINT under the figure, art grows
       upward into negative y, and the figure faces RIGHT (use flip).

   Local coordinate budget for an adult:
       feet 0 · hem 0 · hip -34 · shoulders -58 · head centre -74
       crown of head -83 · raised hands -82 · staff top -100
   Children and crowd extras are the same drawing scaled by `k`.

   opts (all optional):
     role       'patriarch'|'shepherd'|'king'|'queen'|'soldier'|'priest'|
                'child'|'woman'|'man'|'crowd'|'angel'          (default 'man')
     pose       'stand'|'walk'|'kneel'|'arms-up'|'point'|'sit'|'sleep'|'carry'
     robeColor  hex — overrides the preset tunica colour
     mantleColor hex — overrides the cloak; mantle:false removes the cloak
     skin       'pale'|'light'|'mid'|'deep' or a hex
     hair       'short'|'long'|'bald'|'child'|'none'   hairColor hex
     beard      'none'|'short'|'long'                  beardColor hex
     veil       bool  (head veil; on by default for queen/woman)
     staff      bool  (crook for 'shepherd', plain rod otherwise)
     crook      bool  (force/forbid the shepherd's hook on the staff)
     crown      bool
     helmet     bool
     spear      bool   shield bool   sling bool
     halo       bool  (subtle gold ring)   wings bool (angels)
     stripes    bool  (Joseph's many-coloured tunica)
     carryRole  role of the figure riding the shoulders in pose 'carry'
     k          extra intrinsic scale (child = 0.62 by preset)
   `flip` and `s` are handled by Scenes.render/sprite, not here.
   ============================================================ */
(function () {
  'use strict';
  if (!window.Scenes || !Scenes.register) { return; }

  /* ---------- palette (defined ONCE, warm Pompeiian) ---------- */
  var COL = {
    ink:    '#3a2417',
    cream:  '#f4e7cd',
    linen:  '#e3d0a8',
    terra:  '#c9663c',
    ochre:  '#d9a441',
    umber:  '#7a4a26',
    olive:  '#6f8f3f',
    wine:   '#8e4257',
    indigo: '#4d6c8a',   /* used sparingly — Mary's veil, royal trim */
    gold:   '#e0a93e',
    bronze: '#c08a3e',
    wood:   '#8a5a30',
    white:  '#fbf6ea',
    grey:   '#a89c8a',
    iron:   '#8d9299',
    blood:  '#b33a2b'    /* crests and hems only, never wounds */
  };

  var SKIN = {
    pale:  '#f0cfa8',
    light: '#e8b78a',
    mid:   '#d29a63',
    deep:  '#a9713f'
  };

  /* ---------- colour maths ----------
     Every shade in this file is COMPUTED from its base colour, so a
     recoloured robe shades itself correctly and the whole set keeps one
     shading logic. (Same three helpers live in actors-props.js and
     backgrounds2.js; they are four lines and copying beats a shared
     global in a no-build ES5 project.) */
  function clamp255(n) { return n < 0 ? 0 : (n > 255 ? 255 : Math.round(n)); }
  function hexToRgb(hex) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) { h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2); }
    return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
  }
  function rgbToHex(r, g, b) {
    function p(n) { var s = clamp255(n).toString(16); return s.length < 2 ? '0' + s : s; }
    return '#' + p(r) + p(g) + p(b);
  }
  function mix(hex, target, t) {
    var c = hexToRgb(hex);
    return rgbToHex(c[0] + (target - c[0]) * t, c[1] + (target - c[1]) * t, c[2] + (target - c[2]) * t);
  }
  function sh(hex) { return mix(hex, 0, 0.26); }    /* shadow side */
  function hi(hex) { return mix(hex, 255, 0.20); }  /* lit side / highlight */

  function own(o, k) { return !!k && Object.prototype.hasOwnProperty.call(o, k); }

  /* ---------- role presets ----------
     Each row is only the DIFFERENCE from `man`; the merge below fills in
     the rest. Keep rows short — that is the point of the table. */
  var BASE = {
    robeColor: COL.linen, mantleColor: COL.terra, skin: 'light',
    hair: 'short', hairColor: COL.umber, beard: 'short', beardColor: COL.umber,
    veil: false, staff: false, crown: false, helmet: false, spear: false,
    shield: false, sling: false, halo: false, wings: false, stripes: false,
    female: false, shortTunic: false, k: 1
  };

  var ROLES = {
    man:       {},
    patriarch: { robeColor: COL.cream, mantleColor: COL.umber, hair: 'long',
                 hairColor: COL.grey, beard: 'long', beardColor: COL.grey, staff: true },
    shepherd:  { robeColor: COL.terra, mantleColor: COL.linen, beard: 'short',
                 staff: true, crook: true },
    king:      { robeColor: COL.wine, mantleColor: COL.gold, crown: true,
                 hair: 'long', beard: 'short', beardColor: COL.ink },
    queen:     { robeColor: COL.wine, mantleColor: COL.cream, female: true,
                 veil: true, crown: true, hair: 'long', hairColor: COL.ink, beard: 'none' },
    soldier:   { robeColor: COL.terra, mantleColor: COL.blood, shortTunic: true,
                 helmet: true, spear: true, shield: true, beard: 'short' },
    priest:    { robeColor: COL.cream, mantleColor: COL.indigo, beard: 'long',
                 hairColor: COL.grey, beardColor: COL.grey },
    child:     { robeColor: COL.ochre, mantleColor: false, hair: 'child',
                 beard: 'none', shortTunic: true, k: 0.62 },
    woman:     { robeColor: COL.olive, mantleColor: COL.linen, female: true,
                 veil: true, hair: 'long', hairColor: COL.ink, beard: 'none' },
    crowd:     { robeColor: COL.linen, mantleColor: false, beard: 'short' },
    angel:     { robeColor: COL.white, mantleColor: COL.gold, hair: 'long',
                 hairColor: COL.gold, beard: 'none', halo: true, wings: true }
  };

  /* ---------- pose geometry ----------
     One row per pose: where the shoulders sit, and the three joints of
     each arm (shoulder → elbow → hand). The back arm is the far one and
     is drawn before the body; the front arm after it. */
  var POSES = {
    stand:   { shY: -58, back: [[-9, -56], [-13, -44], [-12, -30]], front: [[9, -56], [13, -44], [12, -30]] },
    walk:    { shY: -58, back: [[-9, -56], [-15, -47], [-15, -34]], front: [[9, -56], [15, -47], [18, -38]] },
    point:   { shY: -58, back: [[-9, -56], [-13, -44], [-12, -30]], front: [[9, -56], [18, -52], [30, -55]] },
    'arms-up': { shY: -58, back: [[-9, -56], [-17, -67], [-19, -82]], front: [[9, -56], [17, -67], [19, -82]] },
    carry:   { shY: -58, back: [[-9, -56], [-14, -63], [-9, -70]], front: [[9, -56], [14, -63], [9, -70]] },
    kneel:   { shY: -44, back: [[-8, -42], [-13, -33], [-5, -27]], front: [[8, -42], [13, -33], [5, -27]] },
    sit:     { shY: -46, back: [[-9, -44], [-13, -35], [-10, -25]], front: [[9, -44], [13, -35], [10, -25]] }
  };

  /* ============================================================
     segments
     ============================================================ */

  /* a limb: sleeve (robe colour, thick) then forearm (skin) then hand.
     Same round-capped stroke language as the fox's legs. */
  function arm(pts, sleeve, skin, back) {
    var o = back ? ' opacity="0.9"' : '';
    var s = '<path d="M' + pts[0][0] + ',' + pts[0][1] + ' L' + pts[1][0] + ',' + pts[1][1] +
      '" stroke="' + (back ? sh(sleeve) : sleeve) + '" stroke-width="9" stroke-linecap="round" fill="none"' + o + '/>';
    s += '<path d="M' + pts[1][0] + ',' + pts[1][1] + ' L' + pts[2][0] + ',' + pts[2][1] +
      '" stroke="' + (back ? sh(skin) : skin) + '" stroke-width="5.5" stroke-linecap="round" fill="none"' + o + '/>';
    s += '<circle cx="' + pts[2][0] + '" cy="' + pts[2][1] + '" r="3.4" fill="' + (back ? sh(skin) : skin) + '"' + o + '/>';
    return s;
  }

  /* long robe (tunica + stola): a soft trapezoid, shaded on the right,
     with two fold lines. hemY is 0 for standing figures. */
  function robeShape(shY, shHalf, hemHalf, hemY, col, stripes) {
    var midY = (shY + hemY) / 2;
    var s = '<path d="M' + (-shHalf) + ',' + shY +
      ' Q' + (-shHalf - 3) + ',' + midY + ' ' + (-hemHalf) + ',' + hemY +
      ' Q0,' + (hemY + 4) + ' ' + hemHalf + ',' + hemY +
      ' Q' + (shHalf + 3) + ',' + midY + ' ' + shHalf + ',' + shY + ' Z" fill="' + col + '"/>';
    /* shade: right half only */
    s += '<path d="M1,' + shY + ' Q2,' + midY + ' ' + (hemHalf * 0.42) + ',' + (hemY + 2.2) +
      ' Q' + (hemHalf * 0.8) + ',' + (hemY + 3) + ' ' + hemHalf + ',' + hemY +
      ' Q' + (shHalf + 3) + ',' + midY + ' ' + shHalf + ',' + shY + ' Z" fill="' + sh(col) + '"/>';
    /* fold lines */
    s += '<path d="M' + (-shHalf * 0.4) + ',' + (shY + 6) + ' L' + (-hemHalf * 0.55) + ',' + (hemY - 2) +
      '" stroke="' + sh(col) + '" stroke-width="1.6" opacity="0.55" fill="none"/>';
    if (stripes) {
      /* Joseph's tunica of many colours: three narrow bands down the front */
      s += '<path d="M' + (-shHalf * 0.55) + ',' + (shY + 4) + ' L' + (-hemHalf * 0.6) + ',' + (hemY - 1) +
        '" stroke="' + COL.terra + '" stroke-width="3.4" fill="none"/>';
      s += '<path d="M0,' + (shY + 4) + ' L0,' + (hemY - 1) + '" stroke="' + COL.olive + '" stroke-width="3.4" fill="none"/>';
      s += '<path d="M' + (shHalf * 0.55) + ',' + (shY + 4) + ' L' + (hemHalf * 0.6) + ',' + (hemY - 1) +
        '" stroke="' + COL.indigo + '" stroke-width="3" opacity="0.85" fill="none"/>';
    }
    return s;
  }

  /* short tunica for soldiers and children, plus bare legs */
  function shortTunic(shY, col, pose, skin) {
    var hemY = -30, s = '';
    var stride = (pose === 'walk');
    /* legs first, so the hem overlaps them */
    var lx = stride ? [-9, 11] : [-6, 7];
    var lfoot = stride ? [-16, 17] : [-6, 7];
    s += '<path d="M' + lx[0] + ',' + (hemY + 4) + ' L' + lfoot[0] + ',-2" stroke="' + sh(skin) +
      '" stroke-width="6.5" stroke-linecap="round" fill="none"/>';
    s += '<path d="M' + lx[1] + ',' + (hemY + 4) + ' L' + lfoot[1] + ',-2" stroke="' + skin +
      '" stroke-width="6.5" stroke-linecap="round" fill="none"/>';
    /* sandals */
    s += '<ellipse cx="' + (lfoot[0] + 1) + '" cy="-1" rx="5" ry="2.4" fill="' + COL.umber + '"/>';
    s += '<ellipse cx="' + (lfoot[1] + 1) + '" cy="-1" rx="5" ry="2.4" fill="' + COL.umber + '"/>';
    s += robeShape(shY, 11, 14, hemY, col, false);
    /* belt */
    s += '<path d="M-12,-42 L12,-42" stroke="' + COL.umber + '" stroke-width="3.5" fill="none"/>';
    return s;
  }

  /* cloak thrown over the left shoulder and falling to the knee */
  function mantleShape(shY, hemY, col) {
    var s = '<path d="M-12,' + (shY + 1) + ' Q-19,' + (shY + 20) + ' -17,' + hemY +
      ' Q-8,' + (hemY + 3) + ' -3,' + hemY + ' Q-6,' + (shY + 18) + ' 0,' + (shY - 1) + ' Z" fill="' + col + '"/>';
    s += '<path d="M-2,' + (shY - 1) + ' Q10,' + (shY + 4) + ' 13,' + (shY + 14) +
      ' Q6,' + (shY + 12) + ' -3,' + (shY + 4) + ' Z" fill="' + sh(col) + '"/>';
    /* shoulder clasp */
    s += '<circle cx="-1" cy="' + (shY - 1) + '" r="2.6" fill="' + COL.gold + '"/>';
    return s;
  }

  /* head: neck, skull, hair, beard, minimal dot eyes (3/4 view, facing right) */
  function head(c, cx, cy, skin) {
    var s = '';
    /* neck */
    s += '<path d="M-3.5,' + (cy + 12) + ' L3.5,' + (cy + 12) + ' L3,' + (cy + 4) + ' L-3,' + (cy + 4) +
      ' Z" fill="' + sh(skin) + '"/>';
    /* hair behind the skull (long styles and the veil's back drape) */
    if (c.veil) {
      s += '<path d="M-12,' + (cy - 2) + ' Q-13,' + (cy + 20) + ' -9,' + (cy + 26) +
        ' L13,' + (cy + 26) + ' Q13,' + (cy + 16) + ' 11,' + (cy - 2) + ' Z" fill="' +
        sh(c.veilColor || c.mantleColorResolved || COL.linen) + '"/>';
    } else if (c.hair === 'long') {
      s += '<path d="M-10,' + (cy - 3) + ' Q-13,' + (cy + 14) + ' -8,' + (cy + 20) +
        ' L2,' + (cy + 20) + ' Q-4,' + (cy + 8) + ' -2,' + (cy - 4) + ' Z" fill="' + sh(c.hairColor) + '"/>';
    }
    s += '<g transform="translate(' + cx + ',' + cy + ')">';
    /* skull */
    s += '<circle cx="0" cy="0" r="9" fill="' + skin + '"/>';
    /* the shade side of the face: the right cap of the skull circle, cut
       by a vertical chord at x=4.5 (y = ±sqrt(81-20.25) = ±7.79). Flat
       two-tone, same light-from-upper-left rule as every other actor. */
    s += '<path d="M4.5,-7.79 A9,9 0 0 1 4.5,7.79 Z" fill="' + sh(skin) + '" opacity="0.40"/>';
    /* hair */
    if (c.hair !== 'none' && c.hair !== 'bald' && !c.helmet && !c.veil) {
      if (c.hair === 'child') {
        s += '<path d="M-9,-1 q-1,-12 9,-12 q10,0 9,12 q-3,-6 -9,-4 q-6,2 -9,4 Z" fill="' + c.hairColor + '"/>';
      } else {
        s += '<path d="M-9,-2 q0,-11 9,-11 q9,0 9,11 q-3,-6 -9,-6 q-6,0 -9,6 Z" fill="' + c.hairColor + '"/>';
      }
    }
    /* veil: front band arching over the crown, drawn after the face */
    if (c.veil) {
      var vc = c.veilColor || COL.linen;
      s += '<path d="M-11,1 q0,-13 11,-13 q11,0 11,13 q-2,-7 -11,-7 q-9,0 -11,7 Z" fill="' + vc + '"/>';
      s += '<path d="M0,-12 q11,0 11,13 q-1,-8 -4,-11 Z" fill="' + sh(vc) + '"/>';
    }
    /* eyes: two ink dots, the far one nearer the centre (3/4 turn) */
    s += '<circle cx="1.5" cy="-1.5" r="1.5" fill="' + COL.ink + '"/>';
    s += '<circle cx="6.2" cy="-1.5" r="1.5" fill="' + COL.ink + '"/>';
    if (c.pose === 'sleep' || c.eyes === 'closed') {
      s += '<rect x="0" y="-3.4" width="8" height="4" fill="' + skin + '"/>' +
        '<path d="M0,-1.5 q1.8,2 3.4,0 M4.8,-1.5 q1.8,2 3.4,0" stroke="' + COL.ink +
        '" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
    }
    /* beard: starts below the cheekbone so the face is not swallowed */
    if (c.beard === 'short') {
      s += '<path d="M-5.5,4.5 q0,8 6,8 q6.5,0 6.5,-8 q-6.5,3.5 -12.5,0 Z" fill="' + c.beardColor + '"/>';
    } else if (c.beard === 'long') {
      s += '<path d="M-6,2 q-2,13 1,21 q5,5 8,-1 q3,-10 4,-20 q-7,4 -13,0 Z" fill="' + c.beardColor + '"/>' +
        '<path d="M2,4 q2,10 2,17 q2,-2 3,-8 q1,-6 1,-11 Z" fill="' + sh(c.beardColor) + '"/>';
    }
    s += '</g>';
    return s;
  }

  /* gold band with five points */
  function crown(cy) {
    var s = '<path d="M-10,' + (cy - 7) + ' L10,' + (cy - 7) + ' L10,' + (cy - 11) +
      ' L6,' + (cy - 16) + ' L3,' + (cy - 11) + ' L0,' + (cy - 18) + ' L-3,' + (cy - 11) +
      ' L-6,' + (cy - 16) + ' L-10,' + (cy - 11) + ' Z" fill="' + COL.gold + '"/>';
    s += '<path d="M-10,' + (cy - 7) + ' L10,' + (cy - 7) + ' L10,' + (cy - 10) + ' L-10,' + (cy - 10) +
      ' Z" fill="' + sh(COL.gold) + '"/>';
    s += '<circle cx="0" cy="' + (cy - 8.6) + '" r="1.6" fill="' + COL.blood + '"/>';
    return s;
  }

  /* bronze Roman-ish helmet with a red crest */
  function helmet(cy) {
    var s = '<path d="M-10,' + (cy + 1) + ' q0,-13 10,-13 q10,0 10,13 q-4,-5 -10,-5 q-6,0 -10,5 Z" fill="' + COL.bronze + '"/>';
    s += '<path d="M0,-12 q10,0 10,13 q-3,-8 -6,-10 Z" transform="translate(0,' + (cy) + ')" fill="' + sh(COL.bronze) + '"/>';
    /* cheek guard: kept clear of the eye dots (which sit at x 1.5 and 6.2) */
    s += '<path d="M8,' + (cy + 1) + ' q3,1 2.5,6 q-0.5,3 -3,3 q-1,-5 0.5,-9 Z" fill="' + COL.bronze + '"/>';
    s += '<path d="M-9.6,' + (cy - 1) + ' q-2,1 -1.6,5 q2,1 2.6,-2 Z" fill="' + sh(COL.bronze) + '"/>';
    /* crest */
    s += '<path d="M-8,' + (cy - 11) + ' q8,-11 16,0 q-8,-5 -16,0 Z" fill="' + COL.blood + '"/>';
    s += '<path d="M-8,' + (cy - 12) + ' q8,-10 16,-1" stroke="' + sh(COL.blood) + '" stroke-width="2.2" fill="none"/>';
    return s;
  }

  /* subtle gold ring — holiness without glare */
  function halo(cy) {
    return '<circle cx="1" cy="' + cy + '" r="13.5" fill="none" stroke="' + COL.gold +
      '" stroke-width="2.4" opacity="0.75"/>' +
      '<circle cx="1" cy="' + cy + '" r="13.5" fill="' + COL.gold + '" opacity="0.10"/>';
  }

  /* two soft feathered wings behind the shoulders */
  function wings(shY) {
    var w = COL.white, s = '';
    s += '<path d="M-4,' + (shY + 4) + ' q-22,-6 -25,-26 q14,3 22,14 Z" fill="' + sh(w) + '"/>';
    s += '<path d="M4,' + (shY + 4) + ' q22,-6 25,-26 q-14,3 -22,14 Z" fill="' + w + '"/>';
    s += '<path d="M-6,' + (shY + 2) + ' q-16,-4 -20,-18" stroke="' + mix(w, 0, 0.16) +
      '" stroke-width="1.6" fill="none"/>';
    s += '<path d="M6,' + (shY + 2) + ' q16,-4 20,-18" stroke="' + mix(w, 0, 0.16) +
      '" stroke-width="1.6" fill="none"/>';
    return s;
  }

  /* ---------- hand props ---------- */

  function staffProp(pose, crook) {
    var topY = -100, x = 13, s = '';
    if (pose === 'arms-up') {
      /* raised rod (Moses over the sea) */
      s = '<path d="M8,-62 L34,-104" stroke="' + COL.wood + '" stroke-width="4" stroke-linecap="round" fill="none"/>';
      return s;
    }
    if (pose === 'kneel' || pose === 'sit') { topY = -80; x = 11; }
    s += '<path d="M' + x + ',2 L' + x + ',' + topY + '" stroke="' + COL.wood +
      '" stroke-width="4" stroke-linecap="round" fill="none"/>';
    s += '<path d="M' + (x - 1.4) + ',2 L' + (x - 1.4) + ',' + topY + '" stroke="' + hi(COL.wood) +
      '" stroke-width="1.2" opacity="0.6" fill="none"/>';
    if (crook) {
      s += '<path d="M' + x + ',' + topY + ' q0,-10 -9,-10 q-8,0 -8,8" stroke="' + COL.wood +
        '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    }
    return s;
  }

  function spearProp(pose) {
    var x = 16, s = '';
    s += '<path d="M' + x + ',3 L' + x + ',-88" stroke="' + COL.wood +
      '" stroke-width="3.4" stroke-linecap="round" fill="none"/>';
    s += '<path d="M' + x + ',-100 L' + (x - 4.5) + ',-86 L' + x + ',-82 L' + (x + 4.5) + ',-86 Z" fill="' + COL.iron + '"/>';
    s += '<path d="M' + x + ',-100 L' + (x + 4.5) + ',-86 L' + x + ',-82 Z" fill="' + sh(COL.iron) + '"/>';
    return s;
  }

  function shieldProp() {
    /* round shield on the back arm */
    var s = '<circle cx="-15" cy="-42" r="13" fill="' + COL.terra + '"/>';
    s += '<path d="M-15,-55 a13,13 0 0 1 0,26 Z" fill="' + sh(COL.terra) + '"/>';
    s += '<circle cx="-15" cy="-42" r="13" fill="none" stroke="' + COL.bronze + '" stroke-width="2.2"/>';
    s += '<circle cx="-15" cy="-42" r="3.4" fill="' + COL.bronze + '"/>';
    return s;
  }

  function slingProp() {
    /* David's funda: a whirling strap with a stone — motion, not violence */
    var s = '<path d="M12,-30 q12,-13 6,-23" stroke="' + COL.umber + '" stroke-width="2.2" fill="none"/>';
    s += '<path d="M12,-30 q18,-8 16,-19" stroke="' + COL.umber + '" stroke-width="2.2" fill="none"/>';
    s += '<path d="M15,-53 q7,-4 13,-1 q-5,8 -13,1 Z" fill="' + COL.linen + '"/>';
    s += '<circle cx="21.5" cy="-52" r="3.6" fill="' + COL.grey + '"/>';
    s += '<circle cx="20.3" cy="-53" r="1.2" fill="' + hi(COL.grey) + '"/>';
    return s;
  }

  /* ---------- lying figure (pose 'sleep') ---------- */
  function sleeping(c, robe, skin) {
    var s = '';
    /* stone pillow */
    s += '<ellipse cx="-27" cy="-8" rx="9" ry="6" fill="' + COL.grey + '"/>';
    s += '<path d="M-36,-8 a9,6 0 0 0 18,0 Z" fill="' + sh(COL.grey) + '"/>';
    /* body under the mantle */
    s += '<path d="M-20,-2 q-2,-16 12,-16 q16,0 24,4 q10,4 12,12 q-24,5 -48,0 Z" fill="' + robe + '"/>';
    s += '<path d="M-8,-18 q16,0 24,4 q10,4 12,12 q-12,2 -22,1 q2,-10 -14,-17 Z" fill="' + sh(robe) + '"/>';
    /* head */
    s += '<g transform="translate(-24,-14)">';
    s += '<circle cx="0" cy="0" r="8.5" fill="' + skin + '"/>';
    s += '<path d="M-8,-3 q1,-9 8,-9 q9,0 8,9 q-4,-5 -8,-4 q-5,1 -8,4 Z" fill="' + c.hairColor + '"/>';
    s += '<path d="M-6,1 q1.6,2 3.2,0 M-1,1 q1.6,2 3.2,0" stroke="' + COL.ink +
      '" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
    s += '</g>';
    /* an arm resting on top */
    s += '<path d="M-6,-12 q10,2 16,7" stroke="' + skin + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    return s;
  }

  /* ============================================================
     the actor
     ============================================================ */
  function person(opts) {
    var o = opts || {}, key;
    var c = {};
    for (key in BASE) { if (own(BASE, key)) { c[key] = BASE[key]; } }
    var preset = own(ROLES, o.role) ? ROLES[o.role] : ROLES.man;
    for (key in preset) { if (own(preset, key)) { c[key] = preset[key]; } }
    /* explicit opts win over the preset; `undefined` never overrides */
    for (key in o) {
      if (own(o, key) && typeof o[key] !== 'undefined' && key !== 'role') { c[key] = o[key]; }
    }

    var pose = c.pose || 'stand';
    if (!own(POSES, pose) && pose !== 'sleep') { pose = 'stand'; }
    c.pose = pose;

    var skin = own(SKIN, c.skin) ? SKIN[c.skin] : (String(c.skin).charAt(0) === '#' ? c.skin : SKIN.light);
    var robe = c.robeColor || COL.linen;
    var mantle = (c.mantleColor === false || c.mantleColor === 'none') ? null : (c.mantleColor || null);
    c.mantleColorResolved = mantle;
    c.veilColor = c.veilColor || mantle || COL.linen;
    if (c.hair === 'none' || c.hair === 'bald') { c.hair = 'bald'; }

    var body = '';

    if (pose === 'sleep') {
      body = (c.halo ? halo(-14) : '') + sleeping(c, robe, skin);
    } else {
      var P = POSES[pose];
      var shY = P.shY;
      var headY = shY - 16;
      var hemY = 0;

      /* behind everything */
      if (c.halo) { body += halo(headY); }
      if (c.wings) { body += wings(shY); }
      if (c.shield) { body += shieldProp(); }

      /* back arm */
      body += arm(P.back, robe, skin, true);

      /* torso + legs */
      if (pose === 'sit') {
        /* thigh forward, shin down: the figure sits on a throne/stone */
        body += '<path d="M-2,-24 L17,-24" stroke="' + sh(robe) + '" stroke-width="13" stroke-linecap="round" fill="none"/>';
        body += '<path d="M18,-25 L20,-4" stroke="' + sh(skin) + '" stroke-width="6.5" stroke-linecap="round" fill="none"/>';
        body += '<path d="M-2,-27 L15,-27" stroke="' + robe + '" stroke-width="13" stroke-linecap="round" fill="none"/>';
        body += '<path d="M16,-28 L18,-4" stroke="' + skin + '" stroke-width="6.5" stroke-linecap="round" fill="none"/>';
        body += '<ellipse cx="19" cy="-3" rx="6" ry="2.6" fill="' + COL.umber + '"/>';
        body += robeShape(shY, 11, 13, -22, robe, c.stripes);
      } else if (c.shortTunic) {
        body += shortTunic(shY, robe, pose, skin);
      } else {
        var hemHalf = c.female ? 18 : 16;
        var shHalf = c.female ? 9.5 : 11;
        if (pose === 'kneel') { hemHalf = 21; }
        body += robeShape(shY, shHalf, hemHalf, hemY, robe, c.stripes);
        if (pose === 'kneel') {
          /* the forward knee lifting the cloth */
          body += '<ellipse cx="12" cy="-8" rx="10" ry="7" fill="' + robe + '"/>';
          body += '<path d="M2,-8 a10,7 0 0 0 20,0 Z" fill="' + sh(robe) + '"/>';
        }
        if (pose === 'walk') {
          /* a sandalled foot stepping out of the hem */
          body += '<ellipse cx="15" cy="-1.5" rx="6" ry="2.8" fill="' + COL.umber + '"/>';
        }
      }

      if (mantle) { body += mantleShape(shY, c.female ? -14 : -18, mantle); }

      /* props held in the front hand, drawn UNDER that hand */
      if (c.staff) { body += staffProp(pose, c.crook); }
      if (c.spear) { body += spearProp(pose); }

      /* front arm */
      body += arm(P.front, robe, skin, false);
      if (c.sling) { body += slingProp(); }

      /* passenger on the shoulders (Aenēās portat Anchīsēn) */
      if (pose === 'carry') {
        /* Big enough to read as a second person at scene scale (the first
           pass at 0.6 turned into a hump on the carrier's back), and set
           back on the shoulders so the two heads never fuse into one mass.
           A sitting figure's seat is 22 units above its own origin, so the
           rider's origin goes at shoulderY + 22*pk. */
        var pk = 0.68;
        var rider = person({
          role: c.carryRole || 'patriarch', pose: 'sit', k: 1,
          robeColor: c.carryRobe || COL.cream,
          mantleColor: c.carryMantle || COL.umber, staff: false, spear: false, shield: false
        });
        body += '<g transform="translate(-9,' + (shY + 22 * pk).toFixed(1) + ') scale(' + pk + ')">' + rider + '</g>';
      }

      /* head last (it overlaps collar, mantle and any rider's legs) */
      body += head(c, 0, headY, skin);
      if (c.helmet) { body += helmet(headY); }
      if (c.crown) { body += crown(headY); }
    }

    if (c.k && c.k !== 1) { return '<g transform="scale(' + c.k + ')">' + body + '</g>'; }
    return body;
  }

  /* ============================================================
     crowdGroup — 3–5 overlapping simplified people at depth.
     Historia constantly needs "populus": the Israelites, the brothers,
     the crowd at the Nativity. Back rows are smaller, shifted up and
     tinted toward the sky so they read as distance, exactly like the
     distantTree trick in scenes.js.
     opts: n (3..5), colors (array of hex), pose, seed
     ============================================================ */
  var CROWD_ROBES = [COL.linen, COL.terra, COL.olive, COL.ochre, COL.grey, COL.cream];
  var CROWD_SKINS = ['light', 'mid', 'deep', 'pale'];

  function crowdGroup(opts) {
    var o = opts || {};
    var n = o.n || 4;
    if (n < 3) { n = 3; }
    if (n > 5) { n = 5; }
    /* layout: middle figure in front, others fanned out behind */
    var slots = [
      { x: 0, k: 1.00, d: 0 },
      { x: -26, k: 0.92, d: 1 },
      { x: 25, k: 0.94, d: 1 },
      { x: -46, k: 0.84, d: 2 },
      { x: 45, k: 0.86, d: 2 }
    ];
    var order = [], i;
    for (i = 0; i < n; i++) { order.push(slots[i]); }
    /* draw the deepest first */
    order.sort(function (a, b) { return b.d - a.d; });

    var s = '', it, robeC, fig;
    for (i = 0; i < order.length; i++) {
      it = order[i];
      robeC = (o.colors && o.colors[i]) || CROWD_ROBES[(i * 2 + 1) % CROWD_ROBES.length];
      /* distance tint: mix toward the cream sky, like distantTree's opacity */
      if (it.d) { robeC = mix(robeC, 246, 0.12 * it.d); }
      fig = person({
        role: 'crowd',
        pose: (i % 3 === 1) ? 'point' : 'stand',
        robeColor: robeC,
        mantleColor: (i % 2) ? COL.umber : false,
        skin: CROWD_SKINS[i % CROWD_SKINS.length],
        veil: (i % 4 === 2),
        veilColor: COL.linen,
        beard: (i % 3 === 0) ? 'short' : 'none',
        hair: (i % 4 === 2) ? 'long' : 'short'
      });
      s += '<g transform="translate(' + it.x + ',' + (-2 * it.d) + ') scale(' + it.k + ')"' +
        (it.d ? ' opacity="' + (1 - 0.1 * it.d) + '"' : '') + '>' + fig + '</g>';
    }
    return s;
  }

  /* ---------- registration ----------
     Bounds must cover the WIDEST variant of the actor, because sprite()
     gets one box per registered name: a raised staff (y -104), a
     pointing hand, spread wings and the shoulder rider all reach past a
     plain standing figure. The numbers are MEASURED, not guessed: every
     role × pose × prop combination was rendered into an oversized
     viewBox, the getBBox() results unioned, and 3 units added for
     stroke half-widths. */
  Scenes.register('person', person, { x: -39, y: -113, w: 77, h: 119 });
  Scenes.register('crowdGroup', crowdGroup, { x: -63, y: -90, w: 140, h: 96 });
}());
