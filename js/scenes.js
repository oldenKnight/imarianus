/* ============================================================
   scenes.js — declarative SVG scene engine (ES5)
   The natural method depends on images carrying ALL meaning,
   so every story sentence and exercise renders one of these
   scenes. Scenes are described as data specs in data.js and
   drawn here with reusable actor/prop primitives.
   Spec: { bg:'forest'|'river'|'plain',
           items:[{t:'fox',x:..,y:..,s:..,pose:..,flip:true}],
           bubbles:[{x,y,w,h,text,kind:'speech'|'thought',tail:'left'|'right',fs}] }
   Coordinate space: 400 x 240, ground at y=210.
   ============================================================ */
var Scenes = (function () {
  'use strict';

  var W = 400, H = 240, GROUND = 210;

  var C = {
    sky: '#f6e8c9',
    sky2: '#f0d9a8',
    ground: '#b98a4e',
    grass: '#8d9c52',
    trunk: '#7a4a26',
    leaf: '#6f8f3f',
    leaf2: '#5d7a33',
    grape: '#7b4d8f',
    grape2: '#5e3a70',
    fox: '#d96e30',
    foxDark: '#b6531e',
    foxLight: '#ffeede',
    ink: '#3a2417',
    crow: '#34302e',
    crowLight: '#54504d',
    cheese: '#f2c14e',
    cheeseDark: '#d9a02f',
    wolf: '#8a8580',
    wolfDark: '#6b6660',
    lamb: '#f7f1e3',
    lambDark: '#d8cfba',
    water: '#7fa8c9',
    water2: '#5d8db3',
    bubble: '#fffaef'
  };

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function g(x, y, s, flip, inner) {
    var t = 'translate(' + x + ',' + y + ')';
    if (s && s !== 1) { t += ' scale(' + s + ')'; }
    if (flip) { t += ' scale(-1,1)'; }
    return '<g transform="' + t + '">' + inner + '</g>';
  }

  /* ---------- backgrounds ---------- */

  function bgPlain() {
    return '<rect width="' + W + '" height="' + H + '" fill="' + C.sky + '"/>' +
      '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + C.ground + '"/>' +
      '<rect y="' + (GROUND - 6) + '" width="' + W + '" height="8" fill="' + C.grass + '"/>';
  }

  function bgForest() {
    var s = bgPlain();
    s += distantTree(40, GROUND, 0.55) + distantTree(355, GROUND, 0.6) + distantTree(305, GROUND, 0.4);
    s += '<circle cx="345" cy="40" r="20" fill="' + C.sky2 + '"/>';
    return s;
  }

  function bgRiver() {
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + C.sky + '"/>' +
      '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + C.grass + '"/>';
    /* river band crossing the scene */
    s += '<path d="M0,150 L400,185 L400,215 L0,180 Z" fill="' + C.water + '"/>';
    s += '<path d="M0,158 L400,193" stroke="' + C.water2 + '" stroke-width="3" fill="none"/>';
    /* flow arrows: water flows left-to-right (a lupo ad agnum) */
    s += flowArrow(120, 168) + flowArrow(210, 177) + flowArrow(300, 185);
    s += distantTree(30, 152, 0.45);
    return s;
  }

  function flowArrow(x, y) {
    return '<path d="M' + x + ',' + y + ' l16,1.5 m-5,-5 l5,5 l-6,4" stroke="' + C.bubble + '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>';
  }

  function distantTree(x, groundY, s) {
    var inner = '<rect x="-5" y="-34" width="10" height="34" fill="' + C.trunk + '" opacity="0.8"/>' +
      '<circle cx="0" cy="-46" r="20" fill="' + C.leaf2 + '" opacity="0.7"/>';
    return g(x, groundY, s, false, inner);
  }

  /* ---------- props ---------- */

  /* big tree, optionally with a grape vine hanging in the canopy */
  function tree(opts) {
    var withGrapes = opts && opts.grapes;
    var s = '<rect x="-11" y="-95" width="22" height="95" rx="6" fill="' + C.trunk + '"/>' +
      '<path d="M-9,-40 q-14,-6 -22,-18" stroke="' + C.trunk + '" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-28" cy="-112" r="30" fill="' + C.leaf + '"/>' +
      '<circle cx="22" cy="-118" r="34" fill="' + C.leaf + '"/>' +
      '<circle cx="-2" cy="-134" r="30" fill="' + C.leaf2 + '"/>';
    if (withGrapes) { s += g(8, -96, 1, false, grapeCluster()); }
    return s;
  }

  function grapeCluster() {
    var rows = [[0], [-7, 7], [-14, 0, 14], [-7, 7], [0]];
    var s = '<path d="M0,-12 q6,-8 12,-10" stroke="' + C.leaf2 + '" stroke-width="3" fill="none"/>';
    var y = 0, i, j;
    for (i = 0; i < rows.length; i++) {
      for (j = 0; j < rows[i].length; j++) {
        s += '<circle cx="' + rows[i][j] + '" cy="' + y + '" r="6.5" fill="' + C.grape + '" stroke="' + C.grape2 + '" stroke-width="1.5"/>';
      }
      y += 9;
    }
    return s;
  }

  /* loose grapes (e.g. vocabulary card) */
  function grapes() { return g(0, -38, 1, false, grapeCluster()); }

  function cheese(opts) {
    var s = '<path d="M-16,8 L16,8 L16,-6 Q0,-16 -16,-6 Z" fill="' + C.cheese + '" stroke="' + C.cheeseDark + '" stroke-width="2"/>' +
      '<circle cx="-5" cy="0" r="2.6" fill="' + C.cheeseDark + '"/>' +
      '<circle cx="7" cy="3" r="2" fill="' + C.cheeseDark + '"/>';
    return s;
  }

  /* ---------- actors ---------- */

  /* Fox: origin at ground under body centre, faces right.
     poses: stand | walk | jump | sit | sad | eat */
  function fox(opts) {
    var pose = (opts && opts.pose) || 'stand';
    var s = '';
    var bodyRot = 0, bodyY = -26, headX = 30, headY = -44, tailDown = false, legs = '';

    if (pose === 'jump') { bodyRot = -22; bodyY = -34; }
    if (pose === 'sad') { headY = -36; headX = 28; tailDown = true; }
    if (pose === 'sit') { bodyRot = -34; bodyY = -30; headX = 22; headY = -56; }

    /* tail */
    if (tailDown) {
      s += '<path d="M-26,-26 q-16,8 -14,24 q10,2 16,-8" fill="' + C.fox + '"/>' +
           '<path d="M-40,-2 q8,2 14,-6 l-4,8 q-6,2 -10,-2 Z" fill="' + C.foxLight + '"/>';
    } else {
      s += '<path d="M-26,-30 q-22,-2 -26,-22 q12,-6 22,4 q8,8 12,14 Z" fill="' + C.fox + '"/>' +
           '<path d="M-50,-50 q10,-6 18,2 l-6,8 q-8,-2 -12,-10 Z" fill="' + C.foxLight + '"/>';
    }

    /* legs */
    if (pose === 'jump') {
      legs = '<path d="M-12,-22 l-10,10" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M14,-26 l12,6" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>';
    } else if (pose === 'walk') {
      legs = '<path d="M-14,-14 L-20,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M-8,-14 L-2,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M10,-14 L4,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M16,-14 L22,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>';
    } else if (pose === 'sit') {
      legs = '<path d="M16,-16 L16,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<ellipse cx="-8" cy="-8" rx="14" ry="10" fill="' + C.fox + '"/>';
    } else {
      legs = '<path d="M-14,-14 L-14,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M14,-14 L14,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round"/>' +
             '<path d="M-6,-14 L-6,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round" opacity="0.85"/>' +
             '<path d="M8,-14 L8,0" stroke="' + C.foxDark + '" stroke-width="7" stroke-linecap="round" opacity="0.85"/>';
    }
    s += legs;

    /* body */
    s += '<g transform="rotate(' + bodyRot + ' 0 ' + bodyY + ')">' +
         '<ellipse cx="0" cy="' + bodyY + '" rx="30" ry="18" fill="' + C.fox + '"/>' +
         '<ellipse cx="8" cy="' + (bodyY + 8) + '" rx="16" ry="9" fill="' + C.foxLight + '"/>' +
         '</g>';

    /* head */
    var headDown = (pose === 'sad') ? ' rotate(18)' : (pose === 'jump' ? ' rotate(-12)' : '');
    s += '<g transform="translate(' + headX + ',' + headY + ')' + headDown + '">' +
         '<path d="M-10,-16 L-2,-2 L-14,-4 Z" fill="' + C.foxDark + '"/>' +
         '<path d="M4,-18 L12,-4 L-2,-6 Z" fill="' + C.foxDark + '"/>' +
         '<circle cx="0" cy="0" r="13" fill="' + C.fox + '"/>' +
         '<path d="M8,2 q10,2 14,7 q-6,5 -14,3 Z" fill="' + C.foxLight + '"/>' +
         '<circle cx="21" cy="8" r="2.8" fill="' + C.ink + '"/>' +
         eye(4, -2, pose) +
         '</g>';
    return s;
  }

  function eye(x, y, pose) {
    if (pose === 'sad') {
      return '<path d="M' + (x - 3) + ',' + y + ' q3,3 6,0" stroke="' + C.ink + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
    return '<circle cx="' + x + '" cy="' + y + '" r="2.6" fill="' + C.ink + '"/>';
  }

  /* Crow: origin at feet, faces LEFT by default (use flip for right).
     poses: hold (cheese in beak) | sing (beak open, cheese gone) | sad */
  function crow(opts) {
    var pose = (opts && opts.pose) || 'hold';
    var s = '';
    /* legs */
    s += '<path d="M-4,-10 L-4,0 M4,-10 L4,0" stroke="' + C.ink + '" stroke-width="2.6" stroke-linecap="round"/>';
    /* tail */
    s += '<path d="M6,-26 l18,8 l-14,6 Z" fill="' + C.crow + '"/>';
    /* body */
    s += '<ellipse cx="0" cy="-22" rx="15" ry="12" fill="' + C.crow + '"/>' +
         '<path d="M-2,-26 q10,-4 14,4 q-8,6 -14,2 Z" fill="' + C.crowLight + '"/>';
    /* head */
    var tilt = (pose === 'sing') ? -18 : (pose === 'sad' ? 14 : 0);
    s += '<g transform="translate(-12,-34) rotate(' + tilt + ')">' +
         '<circle cx="0" cy="0" r="8" fill="' + C.crow + '"/>' +
         '<circle cx="-2.5" cy="-2" r="1.8" fill="#fff"/>';
    if (pose === 'sing') {
      s += '<path d="M-7,-1 l-12,-4 l12,-2 Z" fill="' + C.cheeseDark + '"/>' +
           '<path d="M-7,1 l-11,5 l11,1 Z" fill="' + C.cheeseDark + '"/>';
    } else {
      s += '<path d="M-7,-1 l-13,2 l13,3 Z" fill="' + C.cheeseDark + '"/>';
      if (pose === 'hold') { s += g(-20, 4, 0.55, false, cheese()); }
    }
    s += '</g>';
    return s;
  }

  /* Wolf: like a big rough fox, gray. poses: stand | angry | leap */
  function wolf(opts) {
    var pose = (opts && opts.pose) || 'stand';
    var bodyRot = (pose === 'leap') ? -18 : 0;
    var s = '';
    s += '<path d="M-30,-34 q-18,2 -22,-14 q10,-8 20,0 q6,6 10,10 Z" fill="' + C.wolfDark + '"/>';
    if (pose === 'leap') {
      s += '<path d="M-14,-24 l-12,12" stroke="' + C.wolfDark + '" stroke-width="8" stroke-linecap="round"/>' +
           '<path d="M16,-28 l14,8" stroke="' + C.wolfDark + '" stroke-width="8" stroke-linecap="round"/>';
    } else {
      s += '<path d="M-16,-16 L-16,0 M16,-16 L16,0 M-7,-16 L-7,0 M9,-16 L9,0" stroke="' + C.wolfDark + '" stroke-width="8" stroke-linecap="round"/>';
    }
    s += '<g transform="rotate(' + bodyRot + ' 0 -30)">' +
         '<ellipse cx="0" cy="-30" rx="34" ry="20" fill="' + C.wolf + '"/>' +
         '<ellipse cx="8" cy="-22" rx="18" ry="9" fill="' + C.lamb + '" opacity="0.5"/>' +
         '</g>';
    /* head */
    var open = (pose === 'angry' || pose === 'leap');
    s += '<g transform="translate(34,-50)' + (pose === 'leap' ? ' rotate(-10)' : '') + '">' +
         '<path d="M-12,-18 L-4,-2 L-17,-6 Z" fill="' + C.wolfDark + '"/>' +
         '<path d="M3,-20 L11,-4 L-3,-8 Z" fill="' + C.wolfDark + '"/>' +
         '<circle cx="0" cy="0" r="15" fill="' + C.wolf + '"/>';
    if (open) {
      s += '<path d="M8,2 L26,-2 L12,8 Z" fill="' + C.wolfDark + '"/>' +
           '<path d="M8,6 L24,12 L10,12 Z" fill="' + C.wolfDark + '"/>' +
           '<path d="M12,2 l3,3 m4,-4 l3,3" stroke="#fff" stroke-width="2"/>' +
           '<path d="M2,-6 l7,-3" stroke="' + C.ink + '" stroke-width="2.4" stroke-linecap="round"/>' +
           '<circle cx="5" cy="-3" r="2.6" fill="' + C.ink + '"/>';
    } else {
      s += '<path d="M9,3 q11,2 15,7 q-7,5 -15,3 Z" fill="' + C.lamb + '" opacity="0.7"/>' +
           '<circle cx="23" cy="9" r="3" fill="' + C.ink + '"/>' +
           '<circle cx="5" cy="-3" r="2.8" fill="' + C.ink + '"/>';
    }
    s += '</g>';
    return s;
  }

  /* Lamb: origin at feet, faces LEFT (toward the wolf usually). poses: stand | fear */
  function lamb(opts) {
    var pose = (opts && opts.pose) || 'stand';
    var s = '';
    s += '<path d="M-10,-12 L-10,0 M10,-12 L10,0 M-3,-12 L-3,0 M4,-12 L4,0" stroke="' + C.lambDark + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<circle cx="-10" cy="-22" r="11" fill="' + C.lamb + '" stroke="' + C.lambDark + '" stroke-width="2"/>' +
         '<circle cx="2" cy="-26" r="12" fill="' + C.lamb + '" stroke="' + C.lambDark + '" stroke-width="2"/>' +
         '<circle cx="12" cy="-20" r="10" fill="' + C.lamb + '" stroke="' + C.lambDark + '" stroke-width="2"/>' +
         '<ellipse cx="0" cy="-20" rx="16" ry="11" fill="' + C.lamb + '"/>';
    var shake = (pose === 'fear') ? ' rotate(-8)' : '';
    s += '<g transform="translate(-18,-30)' + shake + '">' +
         '<ellipse cx="0" cy="0" rx="8" ry="7" fill="' + C.lambDark + '"/>' +
         '<ellipse cx="2" cy="-7" rx="6" ry="4" fill="' + C.lamb + '"/>' +
         '<path d="M5,-2 q5,3 4,7" stroke="' + C.lambDark + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    if (pose === 'fear') {
      s += '<circle cx="-3" cy="-1" r="2.6" fill="' + C.ink + '"/>' +
           '<circle cx="-3" cy="-1" r="1" fill="#fff"/>';
    } else {
      s += '<circle cx="-3" cy="-1" r="2" fill="' + C.ink + '"/>';
    }
    s += '</g>';
    return s;
  }

  /* falling cheese with motion lines */
  function fallingCheese() {
    return '<path d="M-2,-26 l0,10 M6,-22 l0,8" stroke="' + C.cheeseDark + '" stroke-width="2" stroke-linecap="round" opacity="0.7"/>' + cheese();
  }

  /* low foreground bush — origin at ground centre. Three overlapping leaf
     mounds give a "shrub-in-the-undergrowth" silhouette for silva scenes. */
  function bush() {
    return '<ellipse cx="0" cy="-7" rx="22" ry="11" fill="' + C.leaf2 + '"/>' +
           '<ellipse cx="-9" cy="-13" rx="13" ry="9" fill="' + C.leaf + '"/>' +
           '<ellipse cx="10" cy="-11" rx="11" ry="8" fill="' + C.leaf + '"/>' +
           '<path d="M-20,0 L20,0" stroke="' + C.leaf2 + '" stroke-width="2" opacity="0.5"/>';
  }

  /* Voice: a round head in three-quarter view with an open singing mouth and
     three concentric red sound-arcs emanating to the right. The arcs make
     vōx visually distinct from cantat (musical notes). Origin is at the
     centre of the head; head extends ~22r upward, arcs extend ~64u right. */
  function voice() {
    var skin = '#e8b78a';
    var arc = C.fresco_red || '#b33a2b'; /* read from CSS-equivalent if exposed */
    arc = '#b33a2b';
    var s = '';
    /* head */
    s += '<circle cx="0" cy="0" r="22" fill="' + skin + '" stroke="' + C.ink + '" stroke-width="2"/>';
    /* hair cap */
    s += '<path d="M-21,-4 q-2,-22 21,-22 q22,0 22,16 q-8,-10 -22,-10 q-16,0 -21,16 Z" fill="' + C.ink + '"/>';
    /* eye */
    s += '<circle cx="6" cy="-3" r="2" fill="' + C.ink + '"/>';
    /* open singing mouth (oval) */
    s += '<ellipse cx="16" cy="8" rx="5" ry="6.5" fill="' + C.ink + '"/>' +
         '<ellipse cx="16" cy="8" rx="3" ry="4.5" fill="' + arc + '"/>';
    /* three sound arcs */
    s += '<path d="M30,2 q7,7 0,12" stroke="' + arc + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    s += '<path d="M40,-2 q11,11 0,20" stroke="' + arc + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    s += '<path d="M50,-6 q15,15 0,28" stroke="' + arc + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    return s;
  }

  /* Rose: a single pink rose with stem, two leaves, and gold sparkles for
     "beautiful". Origin is roughly at the base of the bloom; stem drops
     below, flower head rises above. */
  function rose() {
    var pink = '#d96e8a', pinkDark = '#a8456a';
    var stem = '#5d7a33';
    var s = '';
    /* stem */
    s += '<path d="M0,18 L0,-2" stroke="' + stem + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    /* leaves */
    s += '<path d="M0,8 q-14,-2 -19,9 q14,4 19,-9 Z" fill="' + C.leaf + '" stroke="' + C.leaf2 + '" stroke-width="1.5"/>';
    s += '<path d="M0,0 q14,-3 19,8 q-14,5 -19,-8 Z" fill="' + C.leaf + '" stroke="' + C.leaf2 + '" stroke-width="1.5"/>';
    /* outer petals */
    s += '<circle cx="0" cy="-14" r="17" fill="' + pinkDark + '"/>';
    s += '<path d="M0,-30 q-14,4 -14,14 q0,11 14,12 q14,-1 14,-12 q0,-10 -14,-14 Z" fill="' + pink + '"/>';
    /* inner whorl: classic rose-bud spiral */
    s += '<path d="M-7,-16 q0,-9 9,-9 q9,0 9,9 q0,8 -9,7 q-9,2 -9,-7 Z" fill="' + pinkDark + '"/>';
    s += '<path d="M-3,-15 q3,-5 7,-3 q3,2 0,7 q-5,2 -7,-4 Z" fill="' + pink + '"/>';
    /* sparkles (4-point stars) */
    s += '<g fill="' + C.cheese + '" stroke="' + C.cheeseDark + '" stroke-width="0.6">' +
         '<path d="M-26,-26 l2,-7 l2,7 l7,2 l-7,2 l-2,7 l-2,-7 l-7,-2 Z"/>' +
         '<path d="M24,-4 l1.4,-4 l1.4,4 l4,1.4 l-4,1.4 l-1.4,4 l-1.4,-4 l-4,-1.4 Z"/>' +
         '<path d="M22,-34 l1,-3 l1,3 l3,1 l-3,1 l-1,3 l-1,-3 l-3,-1 Z"/>' +
         '</g>';
    return s;
  }

  /* ---------- bubbles ---------- */

  function bubble(b) {
    var w = b.w || 70, h = b.h || 40, x = b.x, y = b.y;
    var fs = b.fs || 18;
    var s = '';
    if (b.kind === 'thought') {
      s += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (w / 2) + '" ry="' + (h / 2) + '" fill="' + C.bubble + '" stroke="' + C.ink + '" stroke-width="2"/>';
      var dx = (b.tail === 'right') ? 1 : -1;
      s += '<circle cx="' + (x + dx * (w / 2 - 2)) + '" cy="' + (y + h / 2 + 6) + '" r="5" fill="' + C.bubble + '" stroke="' + C.ink + '" stroke-width="2"/>';
      s += '<circle cx="' + (x + dx * (w / 2 + 8)) + '" cy="' + (y + h / 2 + 16) + '" r="3" fill="' + C.bubble + '" stroke="' + C.ink + '" stroke-width="2"/>';
    } else {
      s += '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="10" fill="' + C.bubble + '" stroke="' + C.ink + '" stroke-width="2"/>';
      var tx = (b.tail === 'right') ? (x + w / 4) : (x - w / 4);
      var dir = (b.tail === 'right') ? 14 : -14;
      s += '<path d="M' + tx + ',' + (y + h / 2 - 1) + ' l' + dir + ',16 l' + (dir > 0 ? -2 : 2) + ',-16 Z" fill="' + C.bubble + '" stroke="' + C.ink + '" stroke-width="2"/>';
    }
    /* AUTO-FIT. Bubble widths are authored by eye against an estimate of how
       wide the Latin will set, and 21 of the shipped bubbles simply lost that
       bet — 'Revertere in terram patrum tuōrum' set 186px inside a 148px box,
       the words running out over the artwork on both sides. Nothing in SVG
       wraps text, so the two levers are a smaller font and textLength.

       est is a cheap advance estimate: Palatino bold averages ~0.585em per
       character across this corpus. (It was 0.56 until the GAUNTLET pass
       measured every shipped bubble against its rect: one line — 'Ūnum Deum
       adōrā!' — set 1.5px wider than its box, which is exactly the margin
       0.56 was under-reading by. 0.585 is the smallest coefficient that
       leaves NO bubble wider than its rect, and it still leaves the emoji
       bubbles an order of magnitude clear of the branch.) When the estimate
       already fits the inner
       box (w minus the 5px stroke-and-breathing margin per side) NOTHING is
       emitted that was not emitted before — which is what keeps every short
       emoji bubble byte-identical: '😠' at fs 20 estimates 22px inside a 44px
       inner box and never reaches this branch. Only when it does not fit is
       the size scaled down by the overflow ratio (floored at 7px, below which
       the text stops being readable at all) and textLength asked to squeeze
       the remainder, spacing and glyphs together so the letterforms stay
       even rather than the gaps collapsing. */
    var inner = w - 10;
    var est = String(b.text).length * fs * 0.585;
    var fit = '';
    if (inner > 0 && est > inner) {
      fs = Math.max(7, fs * (inner / est));
      fit = ' textLength="' + inner + '" lengthAdjust="spacingAndGlyphs"';
    }
    s += '<text x="' + x + '" y="' + (y + fs / 3) + '" text-anchor="middle" font-size="' + fs + '" font-family="Palatino, Georgia, serif" fill="' + C.ink + '" font-weight="bold"' + fit + '>' + esc(b.text) + '</text>';
    return s;
  }

  /* ---------- registry + render ---------- */

  /* Actor and background registries. Both are plain lookup tables. New entries
     can be added at run time with register()/registerBg(), so extra art files
     (actors-person.js, actors-props.js, backgrounds2.js …) can grow the library
     without this file being edited. Registered actors behave exactly like the
     built-ins below: render() and sprite() find them through the same lookup
     and hand them the same opts object (pose, flip, scale …). */
  var ACTORS = {
    fox: fox, crow: crow, wolf: wolf, lamb: lamb,
    tree: tree, grapes: grapes, cheese: cheese, fallingCheese: fallingCheese,
    bush: bush, voice: voice, rose: rose, castle: castle
  };

  var BGS = { forest: bgForest, river: bgRiver, plain: bgPlain };

  /* Tight drawing bounds per actor, expressed in the actor's OWN local
     coordinates — i.e. before the g(x,y,s,flip) placement transform that
     render() applies. This is what lets sprite() emit a viewBox that hugs the
     artwork, instead of the old trick of squeezing a whole 400x240 scene
     (sky + ground included) into a square box (BUG-2). Numbers are measured by
     hand from the path data above, with a couple of units of slack. */
  var BOUNDS = {
    fox:           { x: -58, y: -70,  w: 120, h: 78 },
    crow:          { x: -46, y: -48,  w: 78,  h: 56 },
    wolf:          { x: -56, y: -74,  w: 120, h: 80 },
    lamb:          { x: -32, y: -46,  w: 62,  h: 54 },
    tree:          { x: -62, y: -172, w: 124, h: 180 },
    grapes:        { x: -26, y: -58,  w: 52,  h: 68 },
    cheese:        { x: -20, y: -20,  w: 40,  h: 32 },
    fallingCheese: { x: -20, y: -32,  w: 40,  h: 44 },
    bush:          { x: -26, y: -26,  w: 52,  h: 32 },
    voice:         { x: -26, y: -30,  w: 96,  h: 62 },
    rose:          { x: -40, y: -42,  w: 76,  h: 66 },
    castle:        { x: -52, y: -78,  w: 104, h: 96 }
  };

  /* generous fallback for actors registered without explicit bounds */
  var DEFAULT_BOUNDS = { x: -60, y: -130, w: 120, h: 140 };

  /* Own-property lookups. ACTORS/BGS/BOUNDS are object literals, so a bare
     ACTORS[name] would cheerfully return inherited Object.prototype members
     ('constructor', 'toString', 'valueOf' …) for a mistyped or hostile spec
     item and then call them as if they were actor functions. hasOwnProperty
     keeps the lookup to what we actually registered. */
  function own(obj, name) {
    return !!name && Object.prototype.hasOwnProperty.call(obj, name);
  }

  function actorFn(name) { return own(ACTORS, name) ? ACTORS[name] : null; }
  function bgFn(name) { return own(BGS, name) ? BGS[name] : null; }
  function boundsFor(name) { return own(BOUNDS, name) ? BOUNDS[name] : DEFAULT_BOUNDS; }

  /* Public extension point: add an actor from another file.
       Scenes.register('person', function (opts) { return '<...svg body...>'; },
                       { x: -40, y: -120, w: 80, h: 130 });
     `drawFn(opts)` must return SVG *body* markup (no <svg> wrapper) drawn in
     local coordinates with the origin at the actor's ground point, exactly
     like the built-ins. `bounds` is optional but strongly recommended, since
     sprite() needs it to build a tight viewBox. Returns true when accepted. */
  function register(name, drawFn, bounds) {
    if (!name || typeof drawFn !== 'function') { return false; }
    ACTORS[name] = drawFn;
    if (bounds) { BOUNDS[name] = bounds; }
    return true;
  }

  /* same, for full-scene backgrounds: drawFn() returns body markup covering
     the 400x240 scene rectangle. */
  function registerBg(name, drawFn) {
    if (!name || typeof drawFn !== 'function') { return false; }
    BGS[name] = drawFn;
    return true;
  }

  /* introspection, used by tests/regression.html to sweep the whole library */
  function keysOf(obj) {
    var out = [], k;
    for (k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) { out.push(k); } }
    return out;
  }
  function actorNames() { return keysOf(ACTORS); }
  function bgNames() { return keysOf(BGS); }

  /* a small standalone castle sprite for the overworld boss node. Drawn around
     (0,0), roughly 90 wide × 80 tall. The map renderer scales/places it. */
  function castle(opts) {
    var stone = '#c9b89a', stoneDark = '#9c8a6a', roof = (opts && opts.roof) || '#b33a2b';
    var gold = '#e0a93e', door = '#5a3a22';
    var s = '';
    /* back wall */
    s += '<rect x="-34" y="-30" width="68" height="42" fill="' + stone + '" stroke="' + stoneDark + '" stroke-width="2"/>';
    /* crenellations */
    var cx, i;
    for (i = 0; i < 5; i++) {
      cx = -34 + i * 15;
      s += '<rect x="' + cx + '" y="-38" width="9" height="10" fill="' + stone + '" stroke="' + stoneDark + '" stroke-width="1.5"/>';
    }
    /* two towers */
    s += '<rect x="-46" y="-44" width="18" height="56" fill="' + stone + '" stroke="' + stoneDark + '" stroke-width="2"/>';
    s += '<rect x="28" y="-44" width="18" height="56" fill="' + stone + '" stroke="' + stoneDark + '" stroke-width="2"/>';
    /* tower roofs */
    s += '<path d="M-46,-44 L-37,-60 L-28,-44 Z" fill="' + roof + '"/>';
    s += '<path d="M28,-44 L37,-60 L46,-44 Z" fill="' + roof + '"/>';
    /* flag */
    s += '<path d="M-37,-60 L-37,-72 M-37,-72 l11,4 l-11,4" stroke="' + C.ink + '" stroke-width="1.5" fill="' + gold + '"/>';
    /* door */
    s += '<path d="M-9,12 L-9,-8 Q0,-18 9,-8 L9,12 Z" fill="' + door + '"/>';
    s += '<line x1="0" y1="-12" x2="0" y2="12" stroke="' + stoneDark + '" stroke-width="1.5"/>';
    return s;
  }

  function render(spec) {
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid meet">';
    s += (bgFn(spec.bg) || bgPlain)();
    var i, it, fn;
    if (spec.items) {
      for (i = 0; i < spec.items.length; i++) {
        it = spec.items[i];
        /* one lookup for built-in and registered actors alike; the whole spec
           item is passed through as opts, so pose/flip/scale keep working. */
        fn = actorFn(it.t);
        if (fn) { s += g(it.x, it.y, it.s || 1, !!it.flip, fn(it)); }
      }
    }
    if (spec.bubbles) {
      for (i = 0; i < spec.bubbles.length; i++) { s += bubble(spec.bubbles[i]); }
    }
    s += '</svg>';
    return s;
  }

  /* ---------- single-actor sprite (BUG-2) ----------

     Renders ONE actor on a transparent, tight viewBox: no sky, no ground, no
     background rect of any kind. The old boss code faked this by rendering a
     full {bg:'plain'} scene and forcing the 400x240 result into a 200x200 box,
     which painted an opaque cream-and-earth rectangle over the middle of the
     fight. A sprite is what canvas code actually wants.

     name  actor key (built-in or registered)
     opts  passed straight to the actor fn (pose, and flip handled here)
     px    pixel width/height written onto the <svg> tag (default 200)
     Returns an SVG *string*; wrap it with toImage() to get a canvas-drawable
     Image. Because the viewBox is not square while the emitted box is, the
     preserveAspectRatio="xMidYMid meet" letterbox is TRANSPARENT padding. */
  function sprite(name, opts, px) {
    var o = opts || {};
    var size = px || 200;
    var b = boundsFor(name);
    var fn = actorFn(name);
    var inner = fn ? fn(o) : '';
    if (o.flip) {
      /* mirror about the middle of the bounding box (x' = 2*cx - x) so the
         artwork stays inside the same viewBox after flipping. */
      var cx = b.x + b.w / 2;
      inner = '<g transform="translate(' + (2 * cx) + ',0) scale(-1,1)">' + inner + '</g>';
    }
    return '<svg viewBox="' + b.x + ' ' + b.y + ' ' + b.w + ' ' + b.h + '"' +
      ' width="' + size + '" height="' + size + '"' +
      ' xmlns="http://www.w3.org/2000/svg" role="img"' +
      ' preserveAspectRatio="xMidYMid meet">' + inner + '</svg>';
  }

  /* ---------- SVG -> Image (FIX-1a) ----------

     THE BUG THIS EXISTS TO KILL: boss.js used to do
         svg.replace('<svg ', '<svg width="80" height="80" ')
     on a string that ALREADY carried width/height (Scenes.mascot emits its
     own). The result had duplicate width/height attributes. A data:image/svg+xml
     URL is parsed as strict XML, where a duplicate attribute is a FATAL
     well-formedness error ("duplicate attribute"), so the Image silently
     entered the broken state, and drawImage() on a broken image throws
     InvalidStateError — which killed the boss animation loop.

     sizeSvg() therefore STRIPS any existing width/height from the OPENING
     <svg ...> tag before injecting the new pair. It touches the opening tag
     only: nested elements in the body keep their own width/height. */
  function sizeSvg(svg, px) {
    var s = String(svg);
    var open = s.indexOf('<svg');
    if (open < 0) { return s; }              /* not an svg: leave it alone */
    var close = s.indexOf('>', open);
    if (close < 0) { return s; }
    /* head = '<svg ...attrs...' with neither '>' nor a trailing '/' consumed */
    var head = s.substring(open, close);
    /* drop existing width=/height= attributes (single or double quoted).
       The leading \s is what keeps 'stroke-width="2"' safe: there the name is
       preceded by '-', not by whitespace. */
    head = head.replace(/\s(width|height)\s*=\s*("[^"]*"|'[^']*')/gi, '');
    head = head.replace(/^<svg/, '<svg width="' + px + '" height="' + px + '"');
    return s.substring(0, open) + head + s.substring(close);
  }

  /* ?debug=boss (FIX-1a regression aid): this failure mode is silent by
     construction — the browser reports nothing, the image just never decodes.
     With the flag on, every Image built here screams into the console.
     Evaluated once at load; wrapped in try/catch for non-browser hosts. */
  var DEBUG_IMAGES = (function () {
    try {
      return typeof window !== 'undefined' && !!window.location &&
        String(window.location.search).indexOf('debug=boss') >= 0;
    } catch (e) { return false; }
  })();

  /* the ONE conversion used by game.js and boss.js for every SVG-to-canvas
     image. Returns an HTMLImageElement; callers must still guard drawImage
     with (img && img.complete && img.naturalWidth > 0), because .complete is
     TRUE for a failed image and only naturalWidth reveals the truth. */
  function toImage(svg, px) {
    var sized = sizeSvg(svg, px);
    var img = new Image();
    if (DEBUG_IMAGES) {
      /* handlers must be attached BEFORE .src is assigned, or a fast failure
         can fire before we are listening. */
      img.onerror = function () {
        if (window.console) { console.error('[scenes] IMAGE FAILED TO DECODE, px=' + px, sized); }
      };
      img.onload = function () {
        if (!img.naturalWidth && window.console) {
          console.error('[scenes] image decoded with zero width, px=' + px, sized);
        }
      };
    }
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sized);
    return img;
  }

  /* ============================================================
     TILE PICTURES — the ONE "what does this word look like in a
     small square?" helper, shared by every canvas game.
     ------------------------------------------------------------
     LUDUS: this used to live inside boss.js's engine closure as
     soloActorOf/tileImage, and js/game.js (the lūdus fox-catcher)
     had its OWN path: makeSceneImage() rendered the whole 400x240
     mini-scene into 60px and drew it at 56. A mini-scene is sky,
     ground and the thing itself standing somewhere on it, so four
     falling items were four copies of the same landscape with a
     14px difference buried inside — exactly the complaint the CLAR
     pass fixed for the DOM chips and the boss tiles, still live in
     the minigame the owner actually plays.

     Two callers of one rule must not be two copies of it, so the
     rule moved HERE, next to sprite() and render(), which are the
     only two things it is made of. boss.js keeps its local names
     (they are published on the phase `env`) but they now delegate,
     and game.js calls Scenes.tileImage directly. chip-lint.js
     states the same rule a third time on purpose: it must stay
     loadable with no art library at all (see its header), so it
     guards on `typeof Scenes` instead of depending on this.

     THE RULE. A scene that is ONE registered actor and carries no
     speech bubble is only staging around that actor, so the tile
     may draw the actor ALONE — a tight, transparent sprite — and
     let the tile's own face be the background. Anything else keeps
     the raster, because there the COMPOSITION is the meaning
     (`mare` is two fish IN water; cropping one fish would lie).
     ============================================================ */

  var tileSceneCache = {};   /* sceneKey|px  → Image (whole-scene raster)   */
  var tileSpriteCache = {};  /* name|pose|role|flip|px → Image (crop)       */
  var tileSeq = 0;

  /* A cache key for a scene OBJECT.

     boss.js keyed its scene cache on `word.la`, which is safe only because one
     engine instance plays one region. This cache is module-level and outlives
     every screen, and `silva` in Regiō I is not the same artwork as `silva` in
     Regiō V — keying on the Latin would serve the first one's picture for the
     rest of the session. So the key is the scene's own identity: a hidden,
     NON-ENUMERABLE id stamped on the object the first time it is seen.
     Non-enumerable matters — chip-lint walks scene items with for-in and the
     content ledger JSON-stringifies scenes; an ordinary property would show up
     in both. A frozen scene cannot be stamped, and then we simply do not
     cache it rather than risk a wrong key. */
  function sceneKey(sc) {
    if (!sc) { return null; }
    if (sc.__tileId) { return sc.__tileId; }
    try {
      Object.defineProperty(sc, '__tileId', {
        value: 'sc' + (++tileSeq), enumerable: false, writable: false, configurable: false
      });
    } catch (e) { return null; }
    return sc.__tileId || null;
  }

  /* the scene item a word's picture collapses to, or null when the picture
     must keep its whole raster. Takes the WORD (vocab item / ludus item /
     authored literal), which is what every canvas caller has in hand. */
  function soloActorOf(word) {
    var sc = word && word.scene;
    if (!sc || !sc.items || sc.items.length !== 1) { return null; }
    /* a bubble is speech drawn on the STAGE, not on the actor: cropping to the
       actor would silently delete it, and for `dīcit` the bubble IS the word. */
    if (sc.bubbles && sc.bubbles.length) { return null; }
    var it = sc.items[0];
    if (!it || !it.t) { return null; }
    return actorFn(it.t) ? it : null;
  }

  /* ---------- the SUBJECT BOX of a multi-actor scene ----------

     The crop rule above only fires for a scene of ONE actor. Half of every
     lūdus pool in the product is scenes of two, three or four — `caelum` is a
     dove and an eagle, `terra` is a tree, a bush and a mountain, `mare` is two
     fish — and for those the composition really is the meaning, so they keep
     their raster and the crop rule leaves them alone.

     But the raster is a 400x240 STAGE, and the actors on it stand at ~15% of
     its height. Squeezed into a tile that is 88 canvas units of art, the dove
     and the eagle are eight pixels each, and `Deus`, `caelum` and `terra` land
     on screen as three identical cream rectangles with a brown line across
     them. Photographed side by side in the lūdus, they are indistinguishable —
     which is the owner's complaint, arriving by a second road that cropping to
     a single actor can never close.

     So a tile's raster keeps the WHOLE COMPOSITION but drops the empty sky and
     the empty ground: the viewBox is tightened to the box the actors actually
     occupy, padded and squared up. Nothing about the picture changes except
     how far away the camera stands — two fish in blue water are still two fish
     in blue water, because the background rect is painted across the whole
     stage and a narrower viewBox simply shows less of it.

     NOT DONE when the scene carries a bubble: bubbles are drawn at fixed stage
     coordinates and a tightened viewBox could crop one away, and for `dīcit`
     the bubble IS the word. Such a scene keeps the whole stage.
     NOT DONE when the scene has no actors at all (`rīvus` is a river
     background and nothing else): there the background IS the subject and it
     already fills the frame. */
  function subjectBox(spec) {
    if (!spec) { return null; }
    if (spec.bubbles && spec.bubbles.length) { return null; }
    /* A scene with NO actors is a background and nothing else — `rīvus` is the
       river band, `mare` in some capitula is the water itself. There the
       background IS the subject, but a 400x240 stage letterboxed into a square
       tile shows a 56x34 strip with cream above and below it, which is how the
       river arrived as a thin blue line. A centred square of the stage fills
       the tile with the thing the word means. */
    if (!spec.items || !spec.items.length) {
      return { x: (W - H) / 2, y: 0, w: H, h: H };
    }
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, found = 0;
    var i, it, b, s, ax, ay;
    for (i = 0; i < spec.items.length; i++) {
      it = spec.items[i];
      if (!it || !it.t || !actorFn(it.t)) { continue; }
      b = boundsFor(it.t);
      s = (typeof it.s === 'number') ? it.s : 1;
      /* g() is translate(x,y) then scale(s) then, for a flip, scale(-1,1) —
         so the mirrored box is the same width reflected through the actor's
         own origin, not through the stage. */
      ax = (typeof it.x === 'number') ? it.x : 0;
      ay = (typeof it.y === 'number') ? it.y : 0;
      var lx = it.flip ? (ax - s * (b.x + b.w)) : (ax + s * b.x);
      var ly = ay + s * b.y;
      if (lx < x0) { x0 = lx; }
      if (ly < y0) { y0 = ly; }
      if (lx + s * b.w > x1) { x1 = lx + s * b.w; }
      if (ly + s * b.h > y1) { y1 = ly + s * b.h; }
      found++;
    }
    if (!found) { return null; }
    /* Breathing room, then square the box up around its own centre — the tile
       is square and "meet" would letterbox a long thin box, giving back the
       margins that were just removed.

       The squaring only ever GROWS an axis, never shrinks one, and that is the
       load-bearing rule: shrinking would cut an actor out of the frame, and a
       tile that silently drops one of `Deus`'s four figures is a worse lie
       than a tile that is merely small. So a subject wider than the stage is
       tall stays wide and letterboxes, and the zoom is whatever honesty
       allows — 1.9x for `mare`, 1.6x for `caelum`, 1.1x for a story page whose
       actors are spread across the whole stage. */
    var pad = 16;
    x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
    var side = Math.max(x1 - x0, y1 - y0);
    var bw = Math.min(side, W), bh = Math.min(side, H);
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    x0 = cx - bw / 2; y0 = cy - bh / 2;
    /* clamp back inside the stage: outside the viewBox there is no background
       to show, only transparency. */
    if (x0 < 0) { x0 = 0; }
    if (y0 < 0) { y0 = 0; }
    if (x0 + bw > W) { x0 = W - bw; }
    if (y0 + bh > H) { y0 = H - bh; }
    /* nothing to gain when the subject already fills the stage */
    if (bw >= W - 4 && bh >= H - 4) { return null; }
    return { x: x0, y: y0, w: bw, h: bh };
  }

  /* the same SVG render(), re-aimed at the subject box. The viewBox is the
     only thing that differs, so every actor, background and z-order is exactly
     what the full illustration draws. */
  function subjectSvg(spec) {
    var box = subjectBox(spec);
    var svg = render(spec);
    if (!box) { return svg; }
    return svg.replace('viewBox="0 0 ' + W + ' ' + H + '"',
      'viewBox="' + box.x + ' ' + box.y + ' ' + box.w + ' ' + box.h + '"');
  }

  /* the whole mini-scene rastered into a px square. `px` is the RASTER size,
     not the draw size: a 60px image blown up into a 76px slot is the blur that
     made the clamor thumbnail unreadable, so a caller drawing bigger must ask
     for bigger, and the size is part of the key.

     This is the FAITHFUL whole-stage raster, and it stays that way: the boss's
     clamor banner and probatio's sententia banner show a STORY page next to a
     sentence, where the staging is the comprehensible input. Only tiles get
     the subject crop, through tileImage below. */
  function sceneImage(word, px) {
    if (!word || !word.scene) { return null; }
    px = px || 60;
    var k = sceneKey(word.scene);
    if (k === null) { return toImage(render(word.scene), px); }   /* uncacheable */
    k += '|' + px;
    if (own(tileSceneCache, k)) { return tileSceneCache[k]; }
    var img = toImage(render(word.scene), px);
    tileSceneCache[k] = img;
    return img;
  }

  /* a transparent single-actor sprite, cached. NEVER a whole scene squeezed
     into a square — that is what painted an opaque sky over the boss arena. */
  function actorImage(name, opts, px) {
    opts = opts || {};
    px = px || 160;
    var key = name + '|' + (opts.pose || '') + '|' + (opts.role || '') + '|' +
              (opts.flip ? 'f' : '') + '|' + px;
    if (own(tileSpriteCache, key)) { return tileSpriteCache[key]; }
    var img = null;
    try { img = toImage(sprite(name, opts, px), px); } catch (e) { img = null; }
    tileSpriteCache[key] = img;
    return img;
  }

  /* the multi-actor scene rastered at its subject box, cached like the rest */
  function subjectImage(word, px) {
    if (!word || !word.scene) { return null; }
    px = px || 60;
    var k = sceneKey(word.scene);
    if (k === null) { return toImage(subjectSvg(word.scene), px); }
    k += '|subj|' + px;
    if (own(tileSceneCache, k)) { return tileSceneCache[k]; }
    var img = toImage(subjectSvg(word.scene), px);
    tileSceneCache[k] = img;
    return img;
  }

  /* THE ENTRY POINT: the picture for one word, at the raster size it will
     actually be drawn. Returns null when the word has no picture at all, and
     the caller then falls back to its emoji (and finally to the word).

     Two ways to fill a small square with meaning, and the scene decides which:
     one registered actor with no bubble → that actor alone, transparent;
     anything else → the composition, aimed at its subject. */
  function tileImage(word, px) {
    var solo = soloActorOf(word);
    if (solo) {
      return actorImage(solo.t, { pose: solo.pose, role: solo.role, flip: solo.flip }, px);
    }
    return subjectImage(word, px);
  }

  /* ---------- the tile itself ----------

     Every catchable thing in every canvas game is the same object: a parchment
     square with a word's picture in it. boss.js owned the painter (caterva's
     falling items, clamor's drifting cards, fuga's obstacles, and probatio's
     ordina/transitus tiles all call it through the phase `env`), and js/game.js
     — the lūdus fox-catcher — painted a bare image on the floor instead. That
     is why the minigame's items read as smudges on a background rather than as
     things you can catch: they had no edge.

     So the painter moved here with the picture rule it uses. One implementation
     means the lūdus and the boss cannot drift apart, which is the whole point;
     boss.js keeps a one-line drawTile that forwards its own ctx.

     `opts.label` writes the word on a strip under the picture. ONLY exercises
     where the word is the QUESTION may pass it — ordina sorts a named thing.
     In caterva, clamor, fuga and the lūdus the word is the ANSWER (it is up in
     the banner, and the picture is what the learner must recognise), so a label
     there would hand the round away. The lūdus never passes it. */
  function drawTile(ctx, word, cx, cy, size, opts) {
    opts = opts || {};
    var half = size / 2;
    ctx.save();
    ctx.fillStyle = opts.bg || 'rgba(246,232,201,0.94)';
    tileRect(ctx, cx - half, cy - half, size, size, 10);
    ctx.fill();
    ctx.strokeStyle = opts.border || 'rgba(58,36,23,0.55)';
    ctx.lineWidth = opts.lineWidth || 2;
    tileRect(ctx, cx - half, cy - half, size, size, 10);
    ctx.stroke();
    var pad = 4;
    /* Raster at twice the drawn art box: a tile is 52–96 canvas units, the
       canvas is scaled up again by CSS on a phone, and a 1:1 raster was
       visibly soft. Two or three sizes in the whole app, so the extra cache
       keys cost nothing. */
    var img = tileImage(word, Math.round((size - 2 * pad) * 2));
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, cx - half + pad, cy - half + pad, size - 2 * pad, size - 2 * pad);
    } else if (word && word.emoji) {
      ctx.font = Math.round(size * 0.62) + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#3a2417';
      ctx.fillText(word.emoji, cx, cy + 1);
    } else if (word && word.la) {
      ctx.font = 'bold 14px Palatino, Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#3a2417';
      ctx.fillText(word.la, cx, cy);
    }
    if (opts.label && word && word.la) {
      ctx.font = 'bold 13px Palatino, Georgia, serif';
      var tw = ctx.measureText(word.la).width + 12;
      ctx.fillStyle = 'rgba(58,36,23,0.88)';
      tileRect(ctx, cx - tw / 2, cy + half - 2, tw, 20, 6);
      ctx.fill();
      ctx.fillStyle = '#f6e8c9';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(word.la, cx, cy + half + 8);
    }
    ctx.restore();
  }

  function tileRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* tiny standalone fox head used as the app mascot/logo */
  /* the mascot head. Optional `avatar` ('fox'|'crow'|'wolf'|'lamb') tints the
     same friendly head so the four register-screen choices look distinct.
     Distinct per-animal artwork is a later content stage; for now it's a
     recolour with fox as the default/fallback. */
  function mascot(size, avatar) {
    var pal = {
      fox:  { d: C.foxDark,  m: C.fox,    l: C.foxLight },
      crow: { d: '#2a2a33',  m: '#3d3d4a', l: '#9aa0b0' },
      wolf: { d: '#5a5f66',  m: '#8a9097', l: '#c9ced4' },
      lamb: { d: '#d8d2c4',  m: '#f3efe6', l: '#fffdf7' }
    };
    var c = pal[avatar] || pal.fox;
    var s = '<svg viewBox="-30 -30 60 60" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M-14,-22 L-4,-6 L-20,-8 Z" fill="' + c.d + '"/>' +
      '<path d="M14,-22 L20,-8 L4,-6 Z" fill="' + c.d + '"/>' +
      '<circle cx="0" cy="2" r="17" fill="' + c.m + '"/>' +
      '<path d="M-12,8 q12,14 24,0 q-4,12 -12,12 q-8,0 -12,-12 Z" fill="' + c.l + '"/>' +
      '<circle cx="0" cy="14" r="3.4" fill="' + C.ink + '"/>' +
      '<circle cx="-7" cy="0" r="2.8" fill="' + C.ink + '"/>' +
      '<circle cx="7" cy="0" r="2.8" fill="' + C.ink + '"/>' +
      '</svg>';
    return s;
  }

  return {
    render: render, mascot: mascot, castle: castle, GROUND: GROUND,
    /* sizing + canvas bridge (FIX-1a) */
    sizeSvg: sizeSvg, toImage: toImage,
    /* single-actor transparent sprite (BUG-2) */
    sprite: sprite,
    /* LUDUS: the shared tile-picture rule (boss.js + game.js both use these) */
    soloActorOf: soloActorOf, tileImage: tileImage,
    sceneImage: sceneImage, actorImage: actorImage,
    subjectSvg: subjectSvg, drawTile: drawTile,
    /* extension points for additional art files */
    register: register, registerBg: registerBg,
    actorNames: actorNames, bgNames: bgNames,
    W: W, H: H
  };
})();
