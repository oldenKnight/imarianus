/* ============================================================
   actors-props.js — every prop, animal and object the three tracks need
   ------------------------------------------------------------
   Same style contract as js/scenes.js and js/actors-person.js:
     flat fills · one computed darker tone per colour · shade on the
     RIGHT / lower side · ink dot eyes · round-capped stroke limbs ·
     origin at the GROUND POINT · everything faces RIGHT (use flip).

   Structure, and the reason for it: two thirds of this file's actors are
   four-legged animals or birds. Written one by one they would drift
   apart, so there is a single QUADRUPED core and a single BIRD core,
   each driven by a small config row (proportions, ears, horns, tail).
   Adding "camelus" is then a nine-line table entry that cannot look like
   it came from a different hand than "leo".

   Poses shared by the animal cores:
     'stand' (default) · 'walk' · 'lie' (aegrōtus / sleeping / resting)
     · 'eat' (head lowered to the ground — grazing, drinking)
   Birds: 'stand' · 'fly' (wings spread) · 'peck'.
   ============================================================ */
(function () {
  'use strict';
  if (!window.Scenes || !Scenes.register) { return; }

  /* ---------- palette ---------- */
  var COL = {
    ink:    '#3a2417',
    cream:  '#f4e7cd',
    linen:  '#e3d0a8',
    terra:  '#c9663c',
    ochre:  '#d9a441',
    umber:  '#7a4a26',
    olive:  '#6f8f3f',
    leaf:   '#6f8f3f',
    leafD:  '#5d7a33',
    wine:   '#8e4257',
    indigo: '#4d6c8a',
    gold:   '#e0a93e',
    bronze: '#c08a3e',
    iron:   '#8d9299',
    wood:   '#8a5a30',
    woodD:  '#66401f',
    stone:  '#c9b89a',
    stoneD: '#9c8a6a',
    white:  '#fbf6ea',
    grey:   '#a89c8a',
    water:  '#7fa8c9',
    waterD: '#5d8db3',
    flame:  '#e8873a',
    flame2: '#f2c14e',
    blood:  '#b33a2b',
    straw:  '#d9b56a',
    sand2:  '#e0c184'
  };

  /* ---------- colour maths (see actors-person.js) ---------- */
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
  function sh(hex) { return mix(hex, 0, 0.26); }
  function hi(hex) { return mix(hex, 255, 0.22); }
  function own(o, k) { return !!k && Object.prototype.hasOwnProperty.call(o, k); }
  function n(v, d) { return (typeof v === 'number') ? v : d; }

  /* ============================================================
     1. QUADRUPED CORE
     ============================================================ */

  /* legs: round-capped strokes, exactly the fox's language. The far pair
     is drawn at 0.85 opacity so depth reads without a second colour. */
  function quadLegs(cfg, dark, pose) {
    var y0 = cfg.legY, w = cfg.legW || 8, xs = cfg.legX;
    var s = '', i, x, foot, op;
    for (i = 0; i < xs.length; i++) {
      x = xs[i];
      op = (i === 1 || i === 2) ? ' opacity="0.85"' : '';
      foot = x;
      if (pose === 'walk') { foot = x + ((i % 2) ? 7 : -7); }
      if (pose === 'run') { foot = x + ((i < 2) ? -11 : 11); }
      s += '<path d="M' + x + ',' + y0 + ' L' + foot + ',-1" stroke="' + dark +
        '" stroke-width="' + w + '" stroke-linecap="round" fill="none"' + op + '/>';
      if (cfg.hooves) {
        s += '<ellipse cx="' + foot + '" cy="-1.5" rx="' + (w / 2 + 0.6) + '" ry="2.4" fill="' + COL.ink + '" opacity="0.7"/>';
      }
    }
    return s;
  }

  /* folded legs for the lying pose: two soft mounds instead of strokes */
  function quadFolded(cfg, dark) {
    var s = '';
    s += '<ellipse cx="' + (cfg.legX[0] + 2) + '" cy="-5" rx="' + (cfg.body.rx * 0.34) + '" ry="6" fill="' + dark + '"/>';
    s += '<ellipse cx="' + (cfg.legX[3] - 2) + '" cy="-5" rx="' + (cfg.body.rx * 0.34) + '" ry="6" fill="' + dark + '"/>';
    return s;
  }

  function ears(kind, r, fur, dark) {
    var s = '';
    if (kind === 'pointed') {
      s += '<path d="M' + (-r * 0.75) + ',' + (-r * 0.8) + ' L' + (-r * 0.2) + ',' + (-r * 1.75) +
        ' L' + (r * 0.15) + ',' + (-r * 0.85) + ' Z" fill="' + dark + '"/>';
      s += '<path d="M' + (r * 0.25) + ',' + (-r * 0.95) + ' L' + (r * 0.8) + ',' + (-r * 1.7) +
        ' L' + (r * 1.0) + ',' + (-r * 0.7) + ' Z" fill="' + dark + '"/>';
    } else if (kind === 'round') {
      s += '<circle cx="' + (-r * 0.55) + '" cy="' + (-r * 0.95) + '" r="' + (r * 0.42) + '" fill="' + dark + '"/>';
      s += '<circle cx="' + (r * 0.62) + '" cy="' + (-r * 0.9) + '" r="' + (r * 0.42) + '" fill="' + dark + '"/>';
    } else if (kind === 'long') {          /* asinus, lepus */
      s += '<path d="M' + (-r * 0.5) + ',' + (-r * 0.7) + ' q-4,' + (-r * 1.9) + ' 2,' + (-r * 2.1) +
        ' q6,' + (r * 0.4) + ' 3,' + (r * 2.0) + ' Z" fill="' + dark + '"/>';
      s += '<path d="M' + (r * 0.35) + ',' + (-r * 0.8) + ' q1,' + (-r * 2.0) + ' 7,' + (-r * 1.9) +
        ' q3,' + (r * 0.6) + ' -2,' + (r * 2.0) + ' Z" fill="' + fur + '"/>';
    } else if (kind === 'side') {          /* hircus, haedus: ears out to the
                                             side so the horns own the skyline */
      s += '<path d="M' + (-r * 0.8) + ',' + (-r * 0.3) + ' q-10,-3 -13,4 q8,5 13,1 Z" fill="' + dark + '"/>';
      s += '<path d="M' + (r * 0.65) + ',' + (-r * 0.35) + ' q10,-3 13,4 q-8,5 -13,1 Z" fill="' + fur + '"/>';
    } else if (kind === 'droop') {         /* canis */
      s += '<path d="M' + (-r * 0.6) + ',' + (-r * 0.75) + ' q-7,3 -5,' + (r * 0.85) +
        ' q6,2 6,' + (-r * 0.5) + ' Z" fill="' + dark + '"/>';
      s += '<path d="M' + (r * 0.45) + ',' + (-r * 0.85) + ' q7,2 6,' + (r * 0.85) +
        ' q-7,2 -7,' + (-r * 0.45) + ' Z" fill="' + dark + '"/>';
    } else if (kind === 'tuft') {          /* mus, feles kittenish */
      s += '<circle cx="' + (-r * 0.5) + '" cy="' + (-r * 1.0) + '" r="' + (r * 0.6) + '" fill="' + dark + '"/>';
      s += '<circle cx="' + (-r * 0.5) + '" cy="' + (-r * 1.0) + '" r="' + (r * 0.34) + '" fill="' + hi(fur) + '"/>';
      s += '<circle cx="' + (r * 0.7) + '" cy="' + (-r * 0.85) + '" r="' + (r * 0.6) + '" fill="' + dark + '"/>';
      s += '<circle cx="' + (r * 0.7) + '" cy="' + (-r * 0.85) + '" r="' + (r * 0.34) + '" fill="' + hi(fur) + '"/>';
    }
    return s;
  }

  function horns(kind, r, col) {
    var s = '', c = col || COL.stone, d = sh(c);
    if (kind === 'goat') {
      s += '<path d="M' + (-r * 0.4) + ',' + (-r * 0.95) + ' q-2,-10 6,-13 q-2,7 -2,13 Z" fill="' + c + '"/>';
      s += '<path d="M' + (r * 0.45) + ',' + (-r * 0.95) + ' q-1,-11 7,-13 q-3,8 -2,13 Z" fill="' + d + '"/>';
    } else if (kind === 'ox') {
      s += '<path d="M' + (-r * 0.8) + ',' + (-r * 0.8) + ' q-10,-6 -13,1 q7,-1 13,4 Z" fill="' + c + '"/>';
      s += '<path d="M' + (r * 0.8) + ',' + (-r * 0.85) + ' q10,-6 13,1 q-7,-1 -13,4 Z" fill="' + d + '"/>';
    } else if (kind === 'antler') {
      s += '<path d="M-4,' + (-r * 0.9) + ' l-5,-14 m0,0 l-7,4 m7,-4 l1,-8" stroke="' + c +
        '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
      s += '<path d="M5,' + (-r * 0.95) + ' l5,-15 m0,0 l7,3 m-7,-3 l0,-8" stroke="' + c +
        '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    }
    return s;
  }

  function tail(kind, cfg, fur, dark) {
    var bx = -cfg.body.rx * 0.95, by = cfg.body.cy;
    var s = '';
    if (kind === 'brush') {
      s += '<path d="M' + bx + ',' + by + ' q-20,-2 -24,-20 q12,-6 20,4 q6,7 8,12 Z" fill="' + fur + '"/>';
      s += '<path d="M' + (bx - 22) + ',' + (by - 20) + ' q9,-5 15,3 l-5,7 q-7,-2 -10,-10 Z" fill="' + hi(fur) + '"/>';
    } else if (kind === 'tuft') {
      s += '<path d="M' + bx + ',' + (by - 4) + ' q-16,4 -14,22" stroke="' + dark +
        '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      s += '<ellipse cx="' + (bx - 14) + '" cy="' + (by + 20) + '" rx="4.5" ry="6" fill="' + dark + '"/>';
    } else if (kind === 'thin') {
      s += '<path d="M' + bx + ',' + (by + 2) + ' q-18,6 -22,-8" stroke="' + dark +
        '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    } else if (kind === 'curl') {
      s += '<path d="M' + bx + ',' + (by - 2) + ' q-12,-10 -2,-15 q8,-3 6,7" stroke="' + fur +
        '" stroke-width="6" fill="none" stroke-linecap="round"/>';
    } else if (kind === 'hair') {           /* equus */
      s += '<path d="M' + bx + ',' + (by - 4) + ' q-14,6 -12,26 q7,2 10,-8 q3,-10 6,-14 Z" fill="' + dark + '"/>';
    } else if (kind === 'stub') {
      s += '<circle cx="' + (bx - 2) + '" cy="' + (by - 2) + '" r="5" fill="' + hi(fur) + '"/>';
    }
    return s;
  }

  /* the core. cfg is a table row; o is the live opts object. */
  function quad(cfg, o) {
    o = o || {};
    var pose = o.pose || 'stand';
    var fur = o.color || cfg.fur;
    var dark = sh(fur);
    var belly = cfg.belly || hi(fur);
    var lie = (pose === 'lie' || pose === 'sleep' || pose === 'aegrotus' || o.aegrotus);
    var eat = (pose === 'eat' || pose === 'drink' || pose === 'graze');
    var b = cfg.body;
    var hx = cfg.head.x, hy = cfg.head.y, hr = cfg.head.r;
    var s = '', drop = 0;
    /* An OUTLINE, off by default and used by exactly one animal so far:
       a white sow on the cream sky (C.sky #f6e8c9) has no silhouette at
       all without it — the same problem pellis and ventus solved the same
       way. Every other animal in the table is saturated enough that the
       flat two-tone shading is the whole edge it needs. */
    var edgeAttr = (o.edge || cfg.edge) ? ' stroke="' + mix(fur, 0, 0.30) + '" stroke-width="2"' : '';

    if (lie) {
      drop = -cfg.legY * 0.60;              /* body settles toward the ground */
      hy += drop * 0.55;
      hx -= b.rx * 0.10;
    }
    if (eat) { hy = -hr - 3; hx = hx + 6; }

    var inner = '';

    /* tail and far legs live behind the body */
    inner += tail(cfg.tail, cfg, fur, dark);
    inner += lie ? quadFolded(cfg, dark) : quadLegs(cfg, dark, pose);

    /* body */
    var rot = (pose === 'run') ? -8 : 0;
    inner += '<g transform="rotate(' + rot + ' 0 ' + b.cy + ')">' +
      '<ellipse cx="0" cy="' + b.cy + '" rx="' + b.rx + '" ry="' + b.ry + '" fill="' + fur + '"' + edgeAttr + '/>' +
      '<path d="M' + (-b.rx) + ',' + b.cy + ' a' + b.rx + ',' + b.ry + ' 0 0 0 ' + (2 * b.rx) + ',0 Z" fill="' + dark + '" opacity="0.35"/>' +
      '<ellipse cx="' + (b.rx * 0.22) + '" cy="' + (b.cy + b.ry * 0.5) + '" rx="' + (b.rx * 0.5) +
      '" ry="' + (b.ry * 0.42) + '" fill="' + belly + '" opacity="0.85"/>' +
      '</g>';

    /* humps ride on the back (camelus) */
    if (cfg.humps === 1) {
      inner += '<path d="M-12,' + (b.cy - b.ry + 2) + ' q12,-20 26,0 Z" fill="' + fur + '"/>';
    } else if (cfg.humps === 2) {
      inner += '<path d="M-22,' + (b.cy - b.ry + 3) + ' q10,-17 21,0 Z" fill="' + fur + '"/>';
      inner += '<path d="M2,' + (b.cy - b.ry + 3) + ' q10,-17 21,0 Z" fill="' + mix(fur, 0, 0.10) + '"/>';
    }
    if (cfg.woolly) {
      /* fleece bumps for sheep-like animals, as in scenes.js lamb */
      inner += '<circle cx="' + (-b.rx * 0.55) + '" cy="' + (b.cy - b.ry * 0.7) + '" r="' + (b.ry * 0.62) + '" fill="' + fur + '"/>';
      inner += '<circle cx="' + (b.rx * 0.05) + '" cy="' + (b.cy - b.ry * 0.95) + '" r="' + (b.ry * 0.68) + '" fill="' + fur + '"/>';
      inner += '<circle cx="' + (b.rx * 0.6) + '" cy="' + (b.cy - b.ry * 0.65) + '" r="' + (b.ry * 0.6) + '" fill="' + fur + '"/>';
    }

    /* neck: a thick stroke from the shoulder to the head */
    if (cfg.neck) {
      inner += '<path d="M' + (b.rx * 0.55) + ',' + (b.cy - b.ry * 0.35) + ' L' + (hx - hr * 0.35) + ',' + (hy + hr * 0.6) +
        '" stroke="' + fur + '" stroke-width="' + cfg.neck + '" stroke-linecap="round" fill="none"/>';
      inner += '<path d="M' + (b.rx * 0.55 + 2) + ',' + (b.cy - b.ry * 0.2) + ' L' + (hx - hr * 0.2) + ',' + (hy + hr * 0.75) +
        '" stroke="' + dark + '" stroke-width="' + (cfg.neck * 0.32) + '" opacity="0.5" fill="none"/>';
      if (cfg.mane === 'ridge') {           /* equus: jagged mane along the neck */
        inner += '<path d="M' + (b.rx * 0.35) + ',' + (b.cy - b.ry * 0.95) + ' Q' + ((b.rx * 0.35 + hx) / 2 - 4) + ',' +
          ((b.cy + hy) / 2 - 12) + ' ' + (hx - hr * 0.75) + ',' + (hy - hr * 0.5) + ' q4,6 -2,9 Q' +
          ((b.rx * 0.35 + hx) / 2 + 2) + ',' + ((b.cy + hy) / 2 - 2) + ' ' + (b.rx * 0.3) + ',' + (b.cy - b.ry * 0.55) + ' Z" fill="' + sh(dark) + '"/>';
      }
    }

    /* head group */
    var headTilt = eat ? 42 : (lie ? -6 : 0);
    var h = '<g transform="translate(' + hx + ',' + hy + ') rotate(' + headTilt + ')">';
    if (cfg.mane === 'ring') {              /* leo */
      h += '<circle cx="-2" cy="1" r="' + (hr * 1.72) + '" fill="' + (cfg.maneColor || sh(fur)) + '"/>';
      var i, a;
      for (i = 0; i < 10; i++) {
        a = i * 36 * Math.PI / 180;
        h += '<circle cx="' + (-2 + Math.cos(a) * hr * 1.62).toFixed(1) + '" cy="' + (1 + Math.sin(a) * hr * 1.62).toFixed(1) +
          '" r="' + (hr * 0.42) + '" fill="' + (cfg.maneColor || sh(fur)) + '"/>';
      }
    }
    h += ears(cfg.ears, hr, fur, dark);
    h += '<circle cx="0" cy="0" r="' + hr + '" fill="' + fur + '"' + edgeAttr + '/>';
    /* snout: a flat disc with two nostrils, not a tapering muzzle. It is
       the single feature that makes `sus` a pig rather than a small pale
       dog, and it lives in the core (rather than in an `extra`) because
       only the core knows where the head went in the eat/lie poses. */
    if (cfg.snout) {
      h += '<ellipse cx="' + (hr * 0.92) + '" cy="' + (hr * 0.30) + '" rx="' + (hr * 0.46) +
        '" ry="' + (hr * 0.40) + '" fill="' + belly + '" stroke="' + mix(belly, 0, 0.22) + '" stroke-width="1.2"/>';
      h += '<circle cx="' + (hr * 1.02) + '" cy="' + (hr * 0.16) + '" r="' + (hr * 0.10) + '" fill="' + COL.ink + '" opacity="0.8"/>';
      h += '<circle cx="' + (hr * 1.02) + '" cy="' + (hr * 0.46) + '" r="' + (hr * 0.10) + '" fill="' + COL.ink + '" opacity="0.8"/>';
    }
    /* muzzle */
    if (cfg.muzzle) {
      h += '<ellipse cx="' + (hr * 0.72 + cfg.muzzle * 0.4) + '" cy="' + (hr * 0.32) + '" rx="' + (hr * 0.52 + cfg.muzzle * 0.5) +
        '" ry="' + (hr * 0.40) + '" fill="' + belly + '"/>';
      h += '<circle cx="' + (hr * 1.05 + cfg.muzzle * 0.85) + '" cy="' + (hr * 0.26) + '" r="' + Math.max(1.8, hr * 0.16) +
        '" fill="' + COL.ink + '"/>';
    }
    h += horns(cfg.horns, hr, cfg.hornColor);
    if (cfg.beardTuft) {
      h += '<path d="M' + (hr * 0.5) + ',' + (hr * 0.75) + ' q2,10 -4,12 q-3,-6 -2,-12 Z" fill="' + hi(fur) + '"/>';
    }
    /* eye: one ink dot, closed when lying asleep */
    if (lie && cfg.sleepy !== false) {
      h += '<path d="M' + (hr * 0.1) + ',' + (-hr * 0.2) + ' q3,3 6,0" stroke="' + COL.ink +
        '" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    } else {
      h += '<circle cx="' + (hr * 0.35) + '" cy="' + (-hr * 0.22) + '" r="' + Math.max(1.7, hr * 0.19) + '" fill="' + COL.ink + '"/>';
    }
    h += '</g>';
    inner += h;
    if (cfg.extra) { inner += cfg.extra(fur, dark, o, cfg); }

    s = drop ? '<g transform="translate(0,' + drop.toFixed(1) + ')">' + inner + '</g>' : inner;

    /* saddle-load for the ass (Asinus et Sal, the flight into Egypt) */
    if (o.onus) {
      s += '<g transform="translate(-4,' + (b.cy - b.ry - 2 + drop) + ')">' +
        '<path d="M-16,0 q-4,14 4,18 l24,0 q8,-4 4,-18 Z" fill="' + COL.linen + '"/>' +
        '<path d="M4,0 q6,0 12,0 q4,14 -4,18 l-10,0 Z" fill="' + sh(COL.linen) + '"/>' +
        '<path d="M-16,2 L16,2" stroke="' + COL.umber + '" stroke-width="2.4"/></g>';
    }
    return s;
  }

  /* ---- quadruped table ----
     body   ellipse of the trunk   legY/legX/legW  where the legs attach
     head   circle centre + radius muzzle          snout length (0 = none)
     Values are in the same units as the fox and wolf in scenes.js, so an
     asinus next to a lupus is believably the same world. */
  var QUADS = {
    canis: {
      fur: '#c08a4e', belly: '#f0dcb8', body: { cy: -26, rx: 24, ry: 15 },
      legY: -16, legX: [-14, -6, 7, 15], legW: 7,
      head: { x: 27, y: -42, r: 11 }, muzzle: 6, ears: 'droop', tail: 'curl'
    },
    feles: {
      fur: '#8f8578', belly: '#e6ddcd', body: { cy: -20, rx: 19, ry: 11 },
      legY: -12, legX: [-12, -5, 5, 12], legW: 5.5,
      head: { x: 21, y: -33, r: 9 }, muzzle: 2, ears: 'pointed', tail: 'thin'
    },
    leo: {
      fur: '#d9a441', belly: '#f0d79a', maneColor: '#a86a24', mane: 'ring',
      body: { cy: -32, rx: 34, ry: 19 },
      legY: -20, legX: [-20, -9, 10, 21], legW: 9,
      head: { x: 36, y: -54, r: 14 }, muzzle: 6, ears: 'round', tail: 'tuft'
    },
    ursus: {
      fur: '#6b4526', belly: '#8d6236', body: { cy: -30, rx: 33, ry: 22 },
      legY: -18, legX: [-20, -8, 9, 20], legW: 11,
      head: { x: 32, y: -48, r: 14 }, muzzle: 7, ears: 'round', tail: 'stub'
    },
    asinus: {
      fur: '#9a9186', belly: '#ded5c6', body: { cy: -36, rx: 27, ry: 16 },
      legY: -24, legX: [-17, -7, 8, 18], legW: 6.5, hooves: true,
      neck: 13, head: { x: 34, y: -56, r: 10 }, muzzle: 9, ears: 'long', tail: 'tuft'
    },
    equus: {
      fur: '#a9622f', belly: '#c98a52', body: { cy: -44, rx: 33, ry: 18 },
      legY: -30, legX: [-21, -9, 10, 22], legW: 7, hooves: true,
      neck: 16, mane: 'ridge', head: { x: 42, y: -70, r: 11 }, muzzle: 10,
      ears: 'pointed', tail: 'hair'
    },
    bos: {
      fur: '#b98a4e', belly: '#e0c396', body: { cy: -40, rx: 35, ry: 20 },
      legY: -26, legX: [-22, -9, 10, 23], legW: 8.5, hooves: true,
      neck: 16, head: { x: 40, y: -58, r: 12 }, muzzle: 8, ears: 'round',
      horns: 'ox', hornColor: '#e6dcc4', tail: 'tuft'
    },
    cervus: {
      fur: '#c08a5a', belly: '#eed9b8', body: { cy: -42, rx: 27, ry: 15 },
      legY: -30, legX: [-17, -7, 8, 18], legW: 5.5, hooves: true,
      neck: 11, head: { x: 34, y: -66, r: 9.5 }, muzzle: 6, ears: 'pointed',
      horns: 'antler', hornColor: '#8a5a30', tail: 'stub'
    },
    hircus: {
      fur: '#cbbba0', belly: '#f0e6d2', body: { cy: -30, rx: 24, ry: 14 },
      legY: -20, legX: [-15, -6, 7, 16], legW: 5.5, hooves: true,
      head: { x: 28, y: -46, r: 10 }, muzzle: 6, ears: 'side',
      horns: 'goat', hornColor: '#b0a084', beardTuft: true, tail: 'stub'
    },
    haedus: {
      fur: '#e2d6bd', belly: '#f7f1e3', body: { cy: -20, rx: 16, ry: 10 },
      legY: -14, legX: [-10, -4, 5, 11], legW: 4.2, hooves: true,
      head: { x: 19, y: -31, r: 7.5 }, muzzle: 4, ears: 'side', tail: 'stub'
    },
    camelus: {
      fur: '#d9b678', belly: '#f0dcb0', body: { cy: -50, rx: 30, ry: 16 },
      legY: -36, legX: [-19, -8, 9, 20], legW: 6.5, humps: 2,
      neck: 13, head: { x: 40, y: -78, r: 10 }, muzzle: 8, ears: 'round', tail: 'thin'
    },
    lepus: {
      fur: '#c2a583', belly: '#f0e4cf', body: { cy: -17, rx: 17, ry: 11 },
      legY: -10, legX: [-11, -4, 5, 12], legW: 5,
      head: { x: 18, y: -28, r: 8.5 }, muzzle: 3, ears: 'long', tail: 'stub'
    },
    mus: {
      fur: '#9a8f84', belly: '#e6dbcc', body: { cy: -10, rx: 13, ry: 8 },
      legY: -6, legX: [-8, -3, 3, 8], legW: 3.4,
      head: { x: 13, y: -16, r: 6.5 }, muzzle: 4, ears: 'tuft', tail: 'thin'
    },
    /* sus: fat body, no neck, curl tail, and the snout the core draws for
       nobody else. `alba` (the white sow of Aen. 8,43–45) and `porci` are
       handled by the wrapper and the `extra` below, not by a second row. */
    sus: {
      fur: '#cf9a90', belly: '#f2d6cd', body: { cy: -23, rx: 28, ry: 16 },
      legY: -13, legX: [-16, -7, 8, 17], legW: 7, hooves: true,
      head: { x: 30, y: -31, r: 10 }, muzzle: 0, snout: true, ears: 'droop',
      tail: 'curl', extra: susPorci
    }
  };

  /* ============================================================
     2. BIRD CORE
     ============================================================ */
  function bird(cfg, o) {
    o = o || {};
    var pose = o.pose || 'stand';
    var col = o.color || cfg.col;
    var dark = cfg.dark || sh(col);
    var light = cfg.light || hi(col);
    var bx = 0, by = cfg.bodyY, rx = cfg.rx, ry = cfg.ry;
    var hx = cfg.headX, hy = cfg.headY, hr = cfg.headR;
    var fly = (pose === 'fly');
    var peck = (pose === 'peck');
    var s = '';

    if (peck) { hy = -hr - 2; hx += 4; }

    /* legs */
    if (!fly) {
      s += '<path d="M-3,' + (by + ry - 1) + ' L-3,-2 M5,' + (by + ry - 1) + ' L5,-2" stroke="' +
        (cfg.legCol || COL.ink) + '" stroke-width="' + (cfg.legW || 2.6) + '" stroke-linecap="round" fill="none"/>';
      s += '<path d="M-7,-1 L1,-1 M1,-1 L9,-1" stroke="' + (cfg.legCol || COL.ink) +
        '" stroke-width="' + (cfg.legW || 2.6) + '" stroke-linecap="round" fill="none"/>';
    }

    /* far wing when flying */
    if (fly) {
      s += '<path d="M-4,' + (by - 2) + ' q-14,-24 -34,-26 q6,20 26,30 Z" fill="' + dark + '"/>';
    }

    /* tail */
    if (cfg.tail === 'fan' && (o.fan || cfg.alwaysFan)) {
      /* the peacock's display: a wide arc of eyes */
      var i, a, ex, ey;
      s += '<path d="M-6,' + (by) + ' q-46,-44 0,-88 q46,44 0,88 Z" fill="' + mix(col, 0, 0.1) + '" opacity="0.25"/>';
      for (i = 0; i < 9; i++) {
        a = (-150 + i * 15) * Math.PI / 180;
        ex = -4 + Math.cos(a) * 44;
        ey = by - 14 + Math.sin(a) * 44;
        s += '<path d="M-4,' + (by - 4) + ' Q' + (ex * 0.6) + ',' + (ey * 0.75) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1) +
          '" stroke="' + COL.olive + '" stroke-width="2" fill="none" opacity="0.85"/>';
        s += '<circle cx="' + ex.toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="5" fill="' + COL.indigo + '"/>';
        s += '<circle cx="' + ex.toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="2.6" fill="' + COL.gold + '"/>';
      }
    } else if (cfg.tail === 'long') {
      s += '<path d="M' + (-rx * 0.7) + ',' + (by - 2) + ' l-' + (rx * 1.5) + ',10 l' + (rx * 0.6) + ',6 Z" fill="' + dark + '"/>';
    } else {
      s += '<path d="M' + (-rx * 0.8) + ',' + (by - 3) + ' l-' + (rx * 0.9) + ',6 l' + (rx * 0.75) + ',7 Z" fill="' + dark + '"/>';
    }

    /* body */
    s += '<ellipse cx="' + bx + '" cy="' + by + '" rx="' + rx + '" ry="' + ry + '" fill="' + col + '"/>';
    s += '<path d="M' + (-rx) + ',' + by + ' a' + rx + ',' + ry + ' 0 0 0 ' + (2 * rx) + ',0 Z" fill="' + dark + '" opacity="0.3"/>';

    /* neck */
    if (cfg.neck) {
      s += '<path d="M' + (rx * 0.4) + ',' + (by - ry * 0.5) + ' L' + (hx - hr * 0.2) + ',' + (hy + hr * 0.7) +
        '" stroke="' + col + '" stroke-width="' + cfg.neck + '" stroke-linecap="round" fill="none"/>';
    }

    /* near wing */
    if (fly) {
      s += '<path d="M2,' + (by - 3) + ' q16,-26 38,-24 q-8,22 -30,30 Z" fill="' + light + '"/>';
      s += '<path d="M8,' + (by - 4) + ' q14,-18 28,-19" stroke="' + dark + '" stroke-width="1.8" fill="none"/>';
    } else {
      s += '<path d="M' + (-rx * 0.45) + ',' + (by - ry * 0.35) + ' q' + (rx * 0.9) + ',-' + (ry * 0.5) + ' ' +
        (rx * 1.05) + ',' + (ry * 0.55) + ' q-' + (rx * 0.8) + ',' + (ry * 0.5) + ' -' + (rx * 1.05) + ',-' + (ry * 0.9) + ' Z" fill="' + light + '"/>';
      if (cfg.wingBar) {
        s += '<path d="M' + (-rx * 0.3) + ',' + (by + ry * 0.25) + ' q' + (rx * 0.7) + ',' + (ry * 0.2) + ' ' +
          (rx * 0.95) + ',-' + (ry * 0.2) + '" stroke="' + cfg.wingBar + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
      }
    }

    /* head */
    s += '<g transform="translate(' + hx + ',' + hy + ')' + (peck ? ' rotate(38)' : '') + '">';
    s += '<circle cx="0" cy="0" r="' + hr + '" fill="' + col + '"/>';
    if (cfg.crest === 'comb') {             /* gallina */
      s += '<path d="M-3,' + (-hr - 1) + ' q2,-6 5,-1 q3,-6 5,0 q3,-5 4,2 q-7,3 -14,-1 Z" fill="' + COL.blood + '"/>';
      s += '<path d="M2,' + (hr * 0.7) + ' q4,4 1,8 q-4,-1 -4,-7 Z" fill="' + COL.blood + '"/>';
    } else if (cfg.crest === 'plume') {     /* pavo */
      s += '<path d="M-1,' + (-hr) + ' l-2,-9 M2,' + (-hr) + ' l1,-10 M5,' + (-hr - 1) + ' l4,-9" stroke="' + COL.olive +
        '" stroke-width="1.6" fill="none"/>';
      s += '<circle cx="-3" cy="' + (-hr - 10) + '" r="2.2" fill="' + COL.gold + '"/>';
      s += '<circle cx="3" cy="' + (-hr - 11) + '" r="2.2" fill="' + COL.gold + '"/>';
      s += '<circle cx="9" cy="' + (-hr - 10) + '" r="2.2" fill="' + COL.gold + '"/>';
    }
    /* beak */
    var bk = cfg.beak || 'short', bc = cfg.beakCol || COL.ochre;
    if (cfg.faceless) { bk = 'none'; }
    if (bk === 'none') {
      /* a bird with NO FACE: the head stays a silhouette. This is how the
         harpy is drawn (DESIGN §8 "fear": menacing but stylized) — give it
         an eye and a hooked beak and it becomes a horror illustration. */
      bk = '';
    } else if (bk === 'long') {
      s += '<path d="M' + (hr * 0.6) + ',-1 l' + (hr * 2.6) + ',3 l-' + (hr * 2.5) + ',4 Z" fill="' + bc + '"/>';
    } else if (bk === 'hooked') {
      /* a raptor's beak: deep base, a real down-curved tip */
      s += '<path d="M' + (hr * 0.35) + ',-4.5 l' + (hr * 1.25) + ',1.5 q5,3 3,8 q-3,4 -7,1 q-4,-3 -' +
        (hr * 0.9) + ',-2 Z" fill="' + bc + '"/>';
      s += '<path d="M' + (hr * 1.6) + ',-3 q5,3 3,8 q-3,4 -7,1 Z" fill="' + mix(bc, 0, 0.22) + '"/>';
    } else {
      s += '<path d="M' + (hr * 0.6) + ',-1 l' + (hr * 1.15) + ',3 l-' + (hr * 1.1) + ',4 Z" fill="' + bc + '"/>';
    }
    if (cfg.brow && !cfg.faceless) {
      /* the frown ridge that separates an eagle from a duck */
      s += '<path d="M' + (-hr * 0.15) + ',' + (-hr * 0.62) + ' q' + (hr * 0.8) + ',-2 ' + (hr * 1.15) + ',3" stroke="' +
        mix(col, 0, 0.35) + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }
    if (!cfg.faceless) {
      s += '<circle cx="' + (hr * 0.28) + '" cy="' + (-hr * 0.3) + '" r="' + Math.max(1.5, hr * 0.22) + '" fill="' + COL.ink + '"/>';
      if (cfg.eyeRing) { s += '<circle cx="' + (hr * 0.28) + '" cy="' + (-hr * 0.3) + '" r="0.8" fill="' + COL.white + '"/>'; }
    }
    s += '</g>';

    if (cfg.extra) { s += cfg.extra(col, dark, o, cfg); }
    if (o.ramus) { s += oliveSprig(hx + hr * 1.6, hy + 4); }
    return s;
  }

  function oliveSprig(x, y) {
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<path d="M0,0 q12,4 22,2" stroke="' + COL.leafD + '" stroke-width="1.8" fill="none"/>' +
      '<path d="M6,1 q4,-6 9,-5 q-2,6 -9,5 Z" fill="' + COL.leaf + '"/>' +
      '<path d="M13,2 q5,4 4,9 q-6,-3 -4,-9 Z" fill="' + COL.leaf + '"/>' +
      '<path d="M17,2 q5,-6 9,-4 q-3,6 -9,4 Z" fill="' + COL.leaf + '"/>' +
      '</g>';
  }

  var BIRDS = {
    aquila: {
      col: '#7a4a26', light: '#c9a06a', dark: '#4f2f16', bodyY: -30, rx: 18, ry: 14,
      headX: 16, headY: -48, headR: 10.5, beak: 'hooked', beakCol: COL.gold, brow: true,
      legCol: COL.gold, legW: 3.2, tail: 'short'
    },
    columba: {
      col: '#fbf6ea', light: '#ffffff', dark: '#cdc2ad', bodyY: -18, rx: 13, ry: 10,
      headX: 12, headY: -31, headR: 7, beak: 'short', beakCol: '#d98a54',
      legCol: '#d98a54', legW: 2.2, neck: 7, tail: 'short', eyeRing: true
    },
    gallina: {
      col: '#e3d0a8', light: '#f6ecd6', dark: '#b99f74', bodyY: -20, rx: 16, ry: 13,
      headX: 14, headY: -36, headR: 7.5, beak: 'short', beakCol: COL.ochre,
      legCol: COL.ochre, legW: 2.6, crest: 'comb', tail: 'long'
    },
    pavo: {
      col: '#2f7d8c', light: '#4aa8b5', dark: '#1e535e', bodyY: -30, rx: 15, ry: 12,
      headX: 14, headY: -50, headR: 7, neck: 9, beak: 'short', beakCol: COL.linen,
      legCol: COL.grey, legW: 2.4, crest: 'plume', tail: 'fan', alwaysFan: true
    },
    grus: {
      col: '#b9b2a4', light: '#ded7c8', dark: '#8a8375', bodyY: -46, rx: 17, ry: 12,
      headX: 18, headY: -76, headR: 7, neck: 7, beak: 'long', beakCol: COL.ochre,
      legCol: '#6b5f4e', legW: 2.6, tail: 'short'
    },
    ciconia: {
      col: '#fbf6ea', light: '#ffffff', dark: '#cdc2ad', bodyY: -46, rx: 17, ry: 12,
      headX: 18, headY: -74, headR: 7, neck: 7, beak: 'long', beakCol: COL.blood,
      legCol: COL.blood, legW: 2.6, tail: 'short', wingBar: '#4a4038'
    },
    /* coturnix (Ex 16,13): small, round, ground-coloured and SPECKLED —
       the speckles are the whole identification, since a plain buff bird
       this size is a partridge, a chick or nothing in particular. */
    coturnix: {
      col: '#b98f5e', light: '#dcc094', dark: '#7d5c34', bodyY: -15, rx: 15, ry: 11,
      headX: 13, headY: -26, headR: 6.5, beak: 'short', beakCol: '#8a7a5e',
      legCol: '#c9a06a', legW: 2.2, tail: 'short', extra: coturnixMarks
    },
    /* harpyia (Aen. 3,209–258). Aeneis Liber III already flies the aquila
       recoloured livid; this is that composition given a NAME, so no scene
       has to carry the override. Aquila's proportions exactly — only the
       colour, the ragged wing edges and the missing FACE differ. */
    harpyia: {
      col: '#7e8a72', light: '#9aa88e', dark: '#4d5849', bodyY: -30, rx: 18, ry: 14,
      headX: 16, headY: -48, headR: 10.5, faceless: true,
      legCol: '#6b6f5c', legW: 3.2, tail: 'short', extra: harpyiaRags
    }
  };

  /* ============================================================
     3. INSECTS
     ============================================================ */
  function insect(cfg, o) {
    o = o || {};
    var col = o.color || cfg.col, dark = sh(col), s = '';
    var y = cfg.y;
    /* legs */
    var i, lx;
    for (i = 0; i < 3; i++) {
      lx = -cfg.len * 0.4 + i * cfg.len * 0.4;
      s += '<path d="M' + lx + ',' + (y + 2) + ' l' + (-4 - i) + ',' + (-y - 2) +
        '" stroke="' + dark + '" stroke-width="1.6" stroke-linecap="round" fill="none"/>';
      s += '<path d="M' + (lx + 3) + ',' + (y + 2) + ' l' + (5 + i) + ',' + (-y - 2) +
        '" stroke="' + dark + '" stroke-width="1.6" stroke-linecap="round" fill="none"/>';
    }
    if (cfg.jumper) {   /* locusta: powerful hind legs */
      s += '<path d="M' + (-cfg.len * 0.5) + ',' + (y + 1) + ' q-12,-10 -4,-16 q6,8 10,10 Z" fill="' + dark + '"/>';
      s += '<path d="M' + (-cfg.len * 0.5 - 12) + ',' + (y - 13) + ' l-4,15" stroke="' + dark +
        '" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
    }
    /* segments: abdomen, thorax, head */
    s += '<ellipse cx="' + (-cfg.len * 0.5) + '" cy="' + y + '" rx="' + (cfg.len * 0.42) + '" ry="' + (cfg.h * 0.9) + '" fill="' + col + '"/>';
    s += '<ellipse cx="' + (cfg.len * 0.02) + '" cy="' + y + '" rx="' + (cfg.len * 0.28) + '" ry="' + (cfg.h * 0.78) + '" fill="' + dark + '"/>';
    if (cfg.wings) {
      s += '<path d="M' + (-cfg.len * 0.62) + ',' + (y - 3) + ' q' + (cfg.len * 0.5) + ',-' + (cfg.h * 1.9) + ' ' +
        (cfg.len * 0.72) + ',1 q-' + (cfg.len * 0.4) + ',' + (cfg.h * 0.6) + ' -' + (cfg.len * 0.72) + ',-1 Z" fill="' +
        hi(col) + '" opacity="0.75"/>';
      s += '<path d="M' + (-cfg.len * 0.5) + ',' + (y - 5) + ' q' + (cfg.len * 0.4) + ',-' + (cfg.h * 0.9) + ' ' +
        (cfg.len * 0.6) + ',0" stroke="' + dark + '" stroke-width="1" fill="none" opacity="0.7"/>';
    }
    s += '<circle cx="' + (cfg.len * 0.42) + '" cy="' + (y - 0.5) + '" r="' + (cfg.h * 0.8) + '" fill="' + col + '"/>';
    /* antennae */
    s += '<path d="M' + (cfg.len * 0.55) + ',' + (y - cfg.h * 0.5) + ' q7,-6 10,-12 M' + (cfg.len * 0.55) + ',' +
      (y - cfg.h * 0.2) + ' q9,-2 13,-5" stroke="' + dark + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>';
    s += '<circle cx="' + (cfg.len * 0.62) + '" cy="' + (y - 1) + '" r="1.4" fill="' + COL.ink + '"/>';
    return s;
  }

  /* ============================================================
     4. OBJECTS
     ============================================================ */

  /* Noah's ark — the barn-on-a-hull of the whole Western tradition */
  function ark(o) {
    o = o || {};
    var hull = COL.wood, house = '#a9723c', roof = COL.terra, s = '';
    s += '<path d="M-76,-16 Q-70,6 -46,11 L46,11 Q70,6 76,-16 Z" fill="' + hull + '"/>';
    s += '<path d="M0,-16 L76,-16 Q70,6 46,11 L0,11 Z" fill="' + sh(hull) + '" opacity="0.55"/>';
    s += '<path d="M-72,-8 L72,-8 M-66,0 L66,0" stroke="' + sh(hull) + '" stroke-width="2" opacity="0.7" fill="none"/>';
    /* house */
    s += '<rect x="-56" y="-64" width="112" height="48" fill="' + house + '"/>';
    s += '<rect x="10" y="-64" width="46" height="48" fill="' + sh(house) + '" opacity="0.5"/>';
    s += '<path d="M-56,-52 L56,-52" stroke="' + sh(house) + '" stroke-width="2" opacity="0.6"/>';
    /* roof */
    s += '<path d="M-64,-64 L0,-96 L64,-64 Z" fill="' + roof + '"/>';
    s += '<path d="M0,-96 L64,-64 L0,-64 Z" fill="' + sh(roof) + '"/>';
    s += '<path d="M-64,-64 L64,-64" stroke="' + sh(roof) + '" stroke-width="3"/>';
    /* window and door */
    s += '<rect x="-8" y="-88" width="16" height="12" rx="2" fill="' + COL.ink + '" opacity="0.8"/>';
    s += '<path d="M-14,-16 L-14,-44 Q0,-52 14,-44 L14,-16 Z" fill="' + COL.woodD + '"/>';
    s += '<path d="M0,-48 L0,-16" stroke="' + sh(COL.woodD) + '" stroke-width="1.8"/>';
    if (o.ramp !== false) {
      s += '<path d="M14,-16 L54,10 L44,14 L6,-12 Z" fill="' + COL.wood + '"/>';
      s += '<path d="M20,-10 L48,9" stroke="' + sh(COL.wood) + '" stroke-width="2"/>';
    }
    if (o.dove) { s += '<g transform="translate(-58,-104) scale(0.5)">' + bird(BIRDS.columba, { pose: 'fly', ramus: true }) + '</g>'; }
    return s;
  }

  /* nomad tent (Abraham, the camp of Israel) */
  function tent(o) {
    var cloth = (o && o.color) || COL.linen, s = '';
    s += '<path d="M0,-64 L-52,0 L52,0 Z" fill="' + cloth + '"/>';
    s += '<path d="M0,-64 L52,0 L6,0 Z" fill="' + sh(cloth) + '"/>';
    s += '<path d="M0,-64 L-22,0 M0,-64 L20,0" stroke="' + sh(cloth) + '" stroke-width="1.8" opacity="0.6" fill="none"/>';
    /* opening */
    s += '<path d="M-12,0 L-2,-34 L10,0 Z" fill="' + COL.umber + '"/>';
    s += '<path d="M-2,-34 L10,0 L2,0 Z" fill="' + sh(COL.umber) + '"/>';
    /* pole + guy ropes */
    s += '<path d="M0,-64 L0,-72" stroke="' + COL.wood + '" stroke-width="3" stroke-linecap="round"/>';
    s += '<path d="M0,-68 L-64,-2 M0,-68 L64,-2" stroke="' + COL.umber + '" stroke-width="1.4" opacity="0.7" fill="none"/>';
    s += '<path d="M-64,-6 l0,6 M64,-6 l0,6" stroke="' + COL.umber + '" stroke-width="2" stroke-linecap="round"/>';
    return s;
  }

  /* stone altar; opts.flame lights the offering */
  function altar(o) {
    o = o || {};
    var s = '';
    s += '<rect x="-26" y="-14" width="52" height="14" fill="' + COL.stone + '"/>';
    s += '<rect x="-22" y="-30" width="44" height="17" fill="' + hi(COL.stone) + '"/>';
    s += '<rect x="-30" y="-38" width="60" height="9" rx="2" fill="' + COL.stone + '"/>';
    s += '<path d="M2,-38 L30,-38 L30,-29 L2,-29 Z" fill="' + sh(COL.stone) + '" opacity="0.5"/>';
    s += '<path d="M4,-13 L26,-13 L26,0 L4,0 Z" fill="' + sh(COL.stone) + '" opacity="0.4"/>';
    s += '<path d="M-22,-29 L22,-29 M-26,-13 L26,-13" stroke="' + COL.stoneD + '" stroke-width="1.6" fill="none"/>';
    if (o.flame !== false) { s += '<g transform="translate(0,-38)">' + flames(0.85) + '</g>'; }
    if (o.smoke) {
      s += '<path d="M0,-60 q-8,-12 2,-20 q10,-8 2,-20" stroke="' + COL.grey +
        '" stroke-width="4" fill="none" opacity="0.45" stroke-linecap="round"/>';
    }
    return s;
  }

  /* flame cluster used by altar, fire and the burning bush */
  function flames(k) {
    k = k || 1;
    return '<g transform="scale(' + k + ')">' +
      '<path d="M0,0 q-13,-10 -7,-24 q2,7 7,8 q-4,-14 6,-22 q-2,12 7,18 q6,10 -2,20 Z" fill="' + COL.flame + '"/>' +
      '<path d="M1,-1 q-7,-8 -3,-17 q2,6 5,7 q-1,-9 3,-14 q0,9 5,14 q3,7 -3,11 Z" fill="' + COL.flame2 + '"/>' +
      '</g>';
  }

  function fire(o) {
    o = o || {};
    var s = '';
    if (o.pyre) {
      /* the distant funeral glow of DESIGN §8: light, never a body */
      s += '<ellipse cx="0" cy="-30" rx="42" ry="34" fill="' + COL.flame2 + '" opacity="0.18"/>';
      s += '<ellipse cx="0" cy="-24" rx="26" ry="22" fill="' + COL.flame + '" opacity="0.25"/>';
    }
    /* logs */
    s += '<path d="M-24,-2 L18,-10 L20,-4 L-22,4 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M-20,-10 L22,-2 L20,4 L-22,-4 Z" fill="' + COL.woodD + '"/>';
    s += '<g transform="translate(0,-6)">' + flames(o.pyre ? 1.5 : 1.1) + '</g>';
    if (o.sparks !== false) {
      s += '<circle cx="-14" cy="-46" r="2" fill="' + COL.flame2 + '" opacity="0.8"/>';
      s += '<circle cx="12" cy="-54" r="1.6" fill="' + COL.flame2 + '" opacity="0.7"/>';
      s += '<circle cx="4" cy="-64" r="1.2" fill="' + COL.flame2 + '" opacity="0.5"/>';
    }
    return s;
  }

  /* the two tablets of the Law */
  function tabulae(o) {
    o = o || {};
    var st = COL.stone, s = '';
    function slab(x, tilt) {
      var t = '<g transform="translate(' + x + ',0) rotate(' + tilt + ' 0 -2)">' +
        '<path d="M-17,0 L-17,-40 Q-17,-52 0,-52 Q17,-52 17,-40 L17,0 Z" fill="' + st + '"/>' +
        '<path d="M4,-51 Q17,-49 17,-40 L17,0 L4,0 Z" fill="' + sh(st) + '" opacity="0.55"/>';
      var i;
      for (i = 0; i < 5; i++) {
        t += '<path d="M-11,' + (-42 + i * 8) + ' L9,' + (-42 + i * 8) + '" stroke="' + COL.stoneD +
          '" stroke-width="2" opacity="0.8" stroke-linecap="round"/>';
      }
      return t + '</g>';
    }
    s += slab(-16, -5) + slab(16, 5);
    return s;
  }

  /* standalone crown (a prop on a cushion or in the air) */
  function crownProp() {
    var g = COL.gold, s = '';
    /* a band with five tall spikes; the band is what makes it read as a
       crown rather than a row of hills, so it stays thick and separate */
    s += '<path d="M-22,-12 L-16,-34 L-9,-19 L0,-40 L9,-19 L16,-34 L22,-12 Z" fill="' + g + '"/>';
    s += '<path d="M0,-40 L9,-19 L16,-34 L22,-12 L0,-12 Z" fill="' + sh(g) + '" opacity="0.45"/>';
    s += '<rect x="-24" y="-14" width="48" height="14" rx="2" fill="' + g + '"/>';
    s += '<rect x="0" y="-14" width="24" height="14" fill="' + sh(g) + '" opacity="0.4"/>';
    s += '<rect x="-24" y="-11" width="48" height="3" fill="' + hi(g) + '"/>';
    /* jewels on the band and finials on the spikes */
    s += '<circle cx="0" cy="-42" r="3" fill="' + COL.blood + '"/>';
    s += '<circle cx="-16" cy="-36" r="2.2" fill="' + COL.indigo + '"/>';
    s += '<circle cx="16" cy="-36" r="2.2" fill="' + COL.indigo + '"/>';
    s += '<circle cx="0" cy="-6" r="3.4" fill="' + COL.blood + '"/>';
    s += '<circle cx="-13" cy="-6" r="2.6" fill="' + COL.olive + '"/>';
    s += '<circle cx="13" cy="-6" r="2.6" fill="' + COL.olive + '"/>';
    return s;
  }

  /* well: stone ring, crossbar, bucket (Rebecca, the fox and the goat) */
  function well(o) {
    o = o || {};
    var s = '';
    s += '<path d="M-30,-2 q30,-9 60,0 l0,-24 q-30,-9 -60,0 Z" fill="' + COL.stone + '"/>';
    s += '<path d="M2,-27 q16,1 28,4 l0,21 q-14,-4 -28,-4 Z" fill="' + sh(COL.stone) + '" opacity="0.55"/>';
    s += '<ellipse cx="0" cy="-26" rx="30" ry="9" fill="' + COL.stoneD + '"/>';
    s += '<ellipse cx="0" cy="-26" rx="23" ry="6" fill="' + COL.ink + '" opacity="0.75"/>';
    /* stone courses */
    s += '<path d="M-24,-14 l0,10 M-8,-11 l0,11 M8,-11 l0,11 M24,-14 l0,10" stroke="' + COL.stoneD +
      '" stroke-width="1.6" opacity="0.8" fill="none"/>';
    /* posts + crossbar */
    s += '<path d="M-24,-30 L-24,-64 M24,-30 L24,-64" stroke="' + COL.wood + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    s += '<path d="M-30,-64 L30,-64" stroke="' + COL.wood + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    s += '<path d="M0,-64 L0,-48" stroke="' + COL.umber + '" stroke-width="1.6" fill="none"/>';
    /* bucket */
    s += '<path d="M-8,-48 L8,-48 L6,-36 L-6,-36 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M0,-48 L8,-48 L6,-36 L0,-36 Z" fill="' + sh(COL.wood) + '"/>';
    s += '<path d="M-8,-45 L8,-45" stroke="' + COL.bronze + '" stroke-width="1.6"/>';
    return s;
  }

  /* serpent — coiled, stylized, sly rather than frightening (DESIGN §8) */
  function serpent(o) {
    o = o || {};
    var green = o.color || '#6f8f3f', d = sh(green), l = hi(green), s = '';
    /* coils */
    s += '<ellipse cx="0" cy="-8" rx="30" ry="9" fill="' + d + '"/>';
    s += '<ellipse cx="0" cy="-8" rx="20" ry="5.5" fill="' + green + '"/>';
    s += '<ellipse cx="2" cy="-18" rx="24" ry="8" fill="' + green + '"/>';
    s += '<ellipse cx="2" cy="-18" rx="15" ry="4.5" fill="' + l + '" opacity="0.7"/>';
    /* rising body */
    s += '<path d="M-10,-22 q-8,-22 6,-32 q14,-9 22,2" stroke="' + green +
      '" stroke-width="11" fill="none" stroke-linecap="round"/>';
    s += '<path d="M-8,-24 q-6,-18 6,-27" stroke="' + l + '" stroke-width="3.5" fill="none" opacity="0.7"/>';
    /* head */
    s += '<g transform="translate(20,-52)">';
    s += '<ellipse cx="0" cy="0" rx="12" ry="8" fill="' + green + '"/>';
    s += '<path d="M-12,0 a12,8 0 0 0 24,0 Z" fill="' + d + '" opacity="0.4"/>';
    s += '<path d="M11,2 q9,1 13,4 q-6,3 -13,1 Z" fill="' + l + '"/>';
    s += '<circle cx="4" cy="-2.6" r="2.4" fill="' + COL.gold + '"/>';
    s += '<circle cx="4.6" cy="-2.6" r="1.2" fill="' + COL.ink + '"/>';
    s += '<path d="M22,6 l9,3 m-9,-3 l9,-1" stroke="' + COL.blood + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
    s += '</g>';
    if (o.apple) {
      s += '<circle cx="-24" cy="-40" r="8" fill="' + COL.blood + '"/>';
      s += '<path d="M-24,-48 q3,-5 7,-5" stroke="' + COL.leafD + '" stroke-width="2" fill="none"/>';
    }
    return s;
  }

  /* radiant star; opts.comet gives the Magi's trailing tail */
  function star(o) {
    o = o || {};
    var g = o.color || COL.gold, s = '';
    s += '<circle cx="0" cy="-30" r="26" fill="' + g + '" opacity="0.16"/>';
    s += '<circle cx="0" cy="-30" r="15" fill="' + g + '" opacity="0.22"/>';
    if (o.comet) {
      s += '<path d="M-4,-26 q-30,26 -46,40 q26,-8 48,-34 Z" fill="' + g + '" opacity="0.5"/>';
    }
    s += '<path d="M0,-56 L5,-36 L25,-30 L5,-24 L0,-4 L-5,-24 L-25,-30 L-5,-36 Z" fill="' + g + '"/>';
    s += '<path d="M0,-56 L5,-36 L25,-30 L5,-24 L0,-4 Z" fill="' + sh(g) + '" opacity="0.45"/>';
    s += '<path d="M-14,-44 L-8,-33 L-19,-38 Z" fill="' + g + '" opacity="0.85"/>';
    s += '<path d="M14,-44 L8,-33 L19,-38 Z" fill="' + g + '" opacity="0.85"/>';
    s += '<path d="M-14,-16 L-8,-27 L-19,-22 Z" fill="' + g + '" opacity="0.85"/>';
    s += '<path d="M14,-16 L8,-27 L19,-22 Z" fill="' + g + '" opacity="0.85"/>';
    return s;
  }

  /* city wall with a gate: Jericho, Troy, any urbs */
  function cityWall(o) {
    o = o || {};
    var st = o.color || COL.stone, d = sh(st), s = '', i, x;
    /* wall body */
    s += '<rect x="-90" y="-56" width="180" height="56" fill="' + st + '"/>';
    s += '<rect x="0" y="-56" width="90" height="56" fill="' + d + '" opacity="0.35"/>';
    /* crenellations */
    for (i = 0; i < 9; i++) {
      x = -90 + i * 21;
      s += '<rect x="' + x + '" y="-68" width="13" height="13" fill="' + st + '"/>';
      s += '<rect x="' + (x + 8) + '" y="-68" width="5" height="13" fill="' + d + '" opacity="0.4"/>';
    }
    /* towers */
    s += '<rect x="-104" y="-78" width="24" height="78" fill="' + hi(st) + '"/>';
    s += '<rect x="80" y="-78" width="24" height="78" fill="' + hi(st) + '"/>';
    s += '<rect x="-104" y="-88" width="24" height="12" fill="' + st + '"/>';
    s += '<rect x="80" y="-88" width="24" height="12" fill="' + st + '"/>';
    s += '<rect x="92" y="-88" width="12" height="88" fill="' + d + '" opacity="0.3"/>';
    /* masonry lines */
    s += '<path d="M-90,-40 L90,-40 M-90,-22 L90,-22" stroke="' + d + '" stroke-width="1.6" opacity="0.6" fill="none"/>';
    /* gate */
    s += '<path d="M-20,0 L-20,-30 Q0,-48 20,-30 L20,0 Z" fill="' + COL.woodD + '"/>';
    s += '<path d="M0,-42 L0,0" stroke="' + sh(COL.woodD) + '" stroke-width="2"/>';
    s += '<path d="M-20,-30 Q0,-48 20,-30" stroke="' + COL.bronze + '" stroke-width="3" fill="none"/>';
    if (o.open) {
      s += '<path d="M-18,0 L-18,-30 Q0,-46 18,-30 L18,0 Z" fill="' + COL.ink + '" opacity="0.85"/>';
    }
    return s;
  }

  /* foreground mountain prop (Sinai, Ararat) */
  function mountain(o) {
    o = o || {};
    var rock = o.color || '#9c8a6a', s = '';
    s += '<path d="M-80,0 L-16,-88 L8,-58 L26,-76 L80,0 Z" fill="' + rock + '"/>';
    s += '<path d="M-16,-88 L8,-58 L26,-76 L80,0 L14,0 Z" fill="' + sh(rock) + '"/>';
    s += '<path d="M-16,-88 L-34,-52 q10,4 16,-2 q8,8 16,2 q8,6 12,-6 Z" fill="' + COL.white + '" opacity="0.9"/>';
    s += '<path d="M26,-76 L14,-60 q8,4 12,0 q6,4 8,-4 Z" fill="' + COL.white + '" opacity="0.75"/>';
    if (o.cloud) {
      s += '<g opacity="0.85">' +
        '<ellipse cx="-16" cy="-92" rx="34" ry="13" fill="' + COL.white + '"/>' +
        '<ellipse cx="-38" cy="-88" rx="20" ry="10" fill="' + COL.white + '"/>' +
        '<ellipse cx="8" cy="-86" rx="22" ry="10" fill="' + mix(COL.white, 0, 0.08) + '"/>' +
        '</g>';
    }
    return s;
  }

  /* Greek/Roman galley: one mast, curved stern, oars and sail optional */
  function ship(o) {
    o = o || {};
    var hull = o.color || COL.wood, s = '';
    var sail = (o.sail === false) ? 'none' : (o.sail || 'full');
    /* oars first, behind the hull */
    if (o.oars) {
      var i, x;
      for (i = 0; i < 5; i++) {
        x = -44 + i * 20;
        s += '<path d="M' + x + ',-16 L' + (x - 14) + ',10" stroke="' + COL.woodD +
          '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
        s += '<path d="M' + (x - 14) + ',10 l-5,4 l3,-8 Z" fill="' + COL.woodD + '"/>';
      }
    }
    /* mast + yard */
    s += '<path d="M0,-18 L0,-96" stroke="' + COL.wood + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    if (sail === 'full') {
      s += '<path d="M-42,-90 L42,-90" stroke="' + COL.woodD + '" stroke-width="3.4" stroke-linecap="round"/>';
      s += '<path d="M-40,-88 Q0,-79 40,-88 L34,-30 Q0,-22 -34,-30 Z" fill="' + COL.cream + '"/>';
      s += '<path d="M2,-81 Q22,-83 40,-88 L34,-30 Q16,-25 2,-24 Z" fill="' + sh(COL.cream) + '" opacity="0.5"/>';
      s += '<path d="M-37,-58 Q0,-49 37,-58" stroke="' + COL.terra + '" stroke-width="5" fill="none" opacity="0.85"/>';
    } else if (sail === 'furled') {
      s += '<path d="M-42,-90 L42,-90" stroke="' + COL.woodD + '" stroke-width="3.4" stroke-linecap="round"/>';
      s += '<path d="M-36,-90 q36,11 72,0 q-36,8 -72,0 Z" fill="' + COL.cream + '"/>';
      s += '<path d="M-20,-84 l0,5 M0,-82 l0,5 M20,-84 l0,5" stroke="' + COL.umber + '" stroke-width="1.6"/>';
    }
    /* hull */
    s += '<path d="M-62,-18 L62,-18 Q54,10 26,12 L-30,12 Q-56,10 -62,-18 Z" fill="' + hull + '"/>';
    s += '<path d="M0,-18 L62,-18 Q54,10 26,12 L0,12 Z" fill="' + sh(hull) + '" opacity="0.45"/>';
    s += '<path d="M-62,-14 L62,-14" stroke="' + sh(hull) + '" stroke-width="2.4"/>';
    /* stern curl and ram prow */
    s += '<path d="M-62,-18 q-12,-8 -6,-24 q10,6 12,20 Z" fill="' + hull + '"/>';
    s += '<path d="M62,-18 q14,2 20,8 q-12,4 -20,0 Z" fill="' + sh(hull) + '"/>';
    /* the eye every ancient ship wore */
    s += '<ellipse cx="44" cy="-8" rx="7" ry="5" fill="' + COL.cream + '"/>';
    s += '<circle cx="45" cy="-8" r="2.4" fill="' + COL.ink + '"/>';
    /* shields along the gunwale */
    var j;
    for (j = 0; j < 4; j++) {
      s += '<circle cx="' + (-40 + j * 20) + '" cy="-19" r="6" fill="' + COL.terra + '"/>';
      s += '<circle cx="' + (-40 + j * 20) + '" cy="-19" r="2.2" fill="' + COL.bronze + '"/>';
    }
    return s;
  }

  /* the Trojan horse on its wheeled platform */
  function woodenHorse() {
    var w = '#a9723c', d = sh(w), s = '';
    /* platform */
    s += '<rect x="-52" y="-14" width="104" height="10" fill="' + COL.wood + '"/>';
    s += '<path d="M-52,-4 L52,-4 L52,-8 L-52,-8 Z" fill="' + sh(COL.wood) + '"/>';
    s += '<circle cx="-34" cy="-2" r="9" fill="' + COL.woodD + '"/>';
    s += '<circle cx="34" cy="-2" r="9" fill="' + COL.woodD + '"/>';
    s += '<circle cx="-34" cy="-2" r="3" fill="' + COL.bronze + '"/>';
    s += '<circle cx="34" cy="-2" r="3" fill="' + COL.bronze + '"/>';
    /* legs (stiff wooden posts) */
    s += '<path d="M-26,-16 L-26,-44 M-12,-16 L-12,-44 M12,-16 L12,-44 M26,-16 L26,-44" stroke="' + d +
      '" stroke-width="9" stroke-linecap="round" fill="none"/>';
    /* body */
    s += '<rect x="-38" y="-78" width="76" height="36" rx="10" fill="' + w + '"/>';
    s += '<path d="M2,-78 L38,-78 q0,36 0,36 L2,-42 Z" fill="' + d + '" opacity="0.4"/>';
    s += '<path d="M-38,-64 L38,-64 M-38,-54 L38,-54" stroke="' + d + '" stroke-width="1.8" opacity="0.75" fill="none"/>';
    /* the fatal hatch */
    s += '<rect x="-16" y="-70" width="22" height="18" rx="2" fill="' + COL.woodD + '"/>';
    s += '<circle cx="2" cy="-61" r="1.8" fill="' + COL.bronze + '"/>';
    /* neck + head */
    s += '<path d="M22,-72 L40,-104 L54,-100 L40,-70 Z" fill="' + w + '"/>';
    s += '<path d="M40,-104 L54,-100 L40,-70 L34,-80 Z" fill="' + d + '" opacity="0.35"/>';
    s += '<path d="M38,-106 q16,-4 22,6 q-4,10 -18,7 Z" fill="' + w + '"/>';
    s += '<path d="M40,-110 l3,-9 l6,8 Z" fill="' + d + '"/>';
    s += '<path d="M48,-110 l5,-8 l4,9 Z" fill="' + d + '"/>';
    s += '<circle cx="50" cy="-101" r="2.4" fill="' + COL.ink + '"/>';
    s += '<path d="M30,-102 q10,-4 14,2 q-8,3 -14,-2 Z" fill="' + d + '"/>';
    /* tail plank */
    s += '<path d="M-38,-72 q-14,4 -18,20 q10,-2 20,-12 Z" fill="' + d + '"/>';
    return s;
  }

  /* crossed sword and shield — the emblem of battle, no combat shown */
  function swordShield(o) {
    o = o || {};
    var s = '';
    if (!o.single) {
      /* sword behind the shield, hilt down-right */
      s += '<path d="M-34,-72 L-24,-82 L26,-24 L18,-16 Z" fill="' + COL.iron + '"/>';
      s += '<path d="M-34,-72 L-24,-82 L26,-24 Z" fill="' + hi(COL.iron) + '"/>';
      s += '<path d="M20,-22 l14,14" stroke="' + COL.wood + '" stroke-width="7" stroke-linecap="round"/>';
      s += '<path d="M12,-6 l16,-16" stroke="' + COL.bronze + '" stroke-width="5" stroke-linecap="round"/>';
      /* spear crossing the other way */
      s += '<path d="M30,-78 L-22,-16" stroke="' + COL.wood + '" stroke-width="4" stroke-linecap="round" fill="none"/>';
      s += '<path d="M34,-84 L26,-72 L36,-70 Z" fill="' + COL.iron + '"/>';
    }
    /* shield */
    s += '<ellipse cx="0" cy="-44" rx="30" ry="34" fill="' + COL.terra + '"/>';
    s += '<path d="M0,-78 a30,34 0 0 1 0,68 Z" fill="' + sh(COL.terra) + '"/>';
    s += '<ellipse cx="0" cy="-44" rx="30" ry="34" fill="none" stroke="' + COL.bronze + '" stroke-width="3.5"/>';
    /* emblem: a laurel-wreathed boss */
    s += '<circle cx="0" cy="-44" r="9" fill="' + COL.bronze + '"/>';
    s += '<circle cx="0" cy="-44" r="4" fill="' + hi(COL.bronze) + '"/>';
    s += '<path d="M0,-70 q-9,10 0,18 q9,-8 0,-18 Z" fill="' + COL.gold + '" opacity="0.8"/>';
    s += '<path d="M0,-30 q-9,-10 0,-18 q9,8 0,18 Z" fill="' + COL.gold + '" opacity="0.8"/>';
    return s;
  }

  /* amphora with a Greek-key band */
  function amphora(o) {
    o = o || {};
    var body = o.color || '#b5713f', s = '';
    s += '<path d="M-6,0 L6,0 L9,-10 L-9,-10 Z" fill="' + sh(body) + '"/>';
    s += '<path d="M0,-72 q-19,10 -19,34 q0,20 19,28 q19,-8 19,-28 q0,-24 -19,-34 Z" fill="' + body + '"/>';
    s += '<path d="M0,-72 q19,10 19,34 q0,20 -19,28 Z" fill="' + sh(body) + '" opacity="0.45"/>';
    /* handles */
    s += '<path d="M-12,-64 q-14,4 -9,20" stroke="' + body + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    s += '<path d="M12,-64 q14,4 9,20" stroke="' + sh(body) + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    /* neck + lip */
    s += '<path d="M-8,-72 L8,-72 L10,-80 L-10,-80 Z" fill="' + body + '"/>';
    s += '<ellipse cx="0" cy="-80" rx="10" ry="3.4" fill="' + hi(body) + '"/>';
    /* meander band */
    s += '<path d="M-16,-46 h4 v-5 h6 v5 h4 v-5 h6 v5 h4 v-5 h4" stroke="' + COL.ink +
      '" stroke-width="1.8" fill="none" opacity="0.75"/>';
    return s;
  }

  /* four-column temple front */
  function temple(o) {
    o = o || {};
    var st = o.color || COL.stone, s = '', i, x;
    /* steps */
    s += '<rect x="-66" y="-10" width="132" height="10" fill="' + st + '"/>';
    s += '<rect x="-60" y="-18" width="120" height="8" fill="' + hi(st) + '"/>';
    /* columns */
    for (i = 0; i < 4; i++) {
      x = -44 + i * 29;
      s += '<rect x="' + (x - 6) + '" y="-72" width="12" height="54" fill="' + hi(st) + '"/>';
      s += '<rect x="' + (x + 1) + '" y="-72" width="5" height="54" fill="' + sh(st) + '" opacity="0.35"/>';
      s += '<rect x="' + (x - 8) + '" y="-77" width="16" height="6" rx="1.5" fill="' + st + '"/>';
      s += '<rect x="' + (x - 8) + '" y="-22" width="16" height="5" rx="1.5" fill="' + st + '"/>';
    }
    /* architrave + pediment */
    s += '<rect x="-58" y="-88" width="116" height="12" fill="' + st + '"/>';
    s += '<path d="M-64,-88 L0,-120 L64,-88 Z" fill="' + hi(st) + '"/>';
    s += '<path d="M0,-120 L64,-88 L0,-88 Z" fill="' + sh(st) + '" opacity="0.32"/>';
    s += '<path d="M-56,-90 L0,-116 L56,-90 Z" fill="' + st + '" opacity="0.7"/>';
    /* akroterion */
    s += '<path d="M0,-120 l0,-8" stroke="' + COL.gold + '" stroke-width="3" stroke-linecap="round"/>';
    s += '<circle cx="0" cy="-100" r="5" fill="' + COL.gold + '" opacity="0.85"/>';
    return s;
  }

  function throne(o) {
    o = o || {};
    var st = o.color || COL.stone, g = COL.gold, s = '';
    /* Drawn in strict back-to-front order so the parts read as a CHAIR:
       tall back plate → seat slab → cushion → arm rails → foot step. */
    /* back plate, standing behind everything */
    s += '<path d="M-23,-32 L-23,-86 Q0,-98 23,-86 L23,-32 Z" fill="' + st + '"/>';
    s += '<path d="M3,-95 Q14,-91 23,-86 L23,-32 L3,-32 Z" fill="' + sh(st) + '" opacity="0.4"/>';
    s += '<path d="M-23,-86 Q0,-98 23,-86" stroke="' + g + '" stroke-width="3.4" fill="none"/>';
    s += '<path d="M-15,-76 L15,-76 M-15,-64 L15,-64" stroke="' + COL.stoneD + '" stroke-width="1.6" fill="none"/>';
    /* seat slab, clearly proud of the back */
    s += '<rect x="-30" y="-34" width="60" height="9" rx="2" fill="' + hi(st) + '"/>';
    s += '<rect x="-26" y="-25" width="52" height="21" fill="' + st + '"/>';
    s += '<rect x="6" y="-25" width="20" height="21" fill="' + sh(st) + '" opacity="0.45"/>';
    /* cushion */
    s += '<path d="M-26,-34 q26,-8 52,0 q-26,5 -52,0 Z" fill="' + COL.wine + '"/>';
    /* arm rails: horizontal bars on little posts, the readable part */
    s += '<path d="M-30,-46 L30,-46" stroke="' + g + '" stroke-width="4" stroke-linecap="round"/>';
    s += '<path d="M-28,-46 L-28,-34 M28,-46 L28,-34" stroke="' + g + '" stroke-width="3.4" stroke-linecap="round"/>';
    s += '<circle cx="-30" cy="-47" r="3.2" fill="' + hi(g) + '"/>';
    s += '<circle cx="30" cy="-47" r="3.2" fill="' + hi(g) + '"/>';
    /* foot step */
    s += '<rect x="-20" y="-6" width="40" height="6" rx="1.5" fill="' + hi(st) + '"/>';
    s += '<rect x="0" y="-6" width="20" height="6" fill="' + sh(st) + '" opacity="0.35"/>';
    return s;
  }

  function palmTree(o) {
    o = o || {};
    var tr = COL.wood, s = '';
    s += '<path d="M-7,0 q3,-46 -8,-84 l13,-2 q6,42 6,86 Z" fill="' + tr + '"/>';
    s += '<path d="M0,-2 q4,-44 -2,-84 l-2,0 q4,42 -3,86 Z" fill="' + sh(tr) + '" opacity="0.5"/>';
    /* fronds */
    s += '<path d="M-14,-86 q-30,-6 -40,12 q26,-2 40,-6 Z" fill="' + COL.leafD + '"/>';
    s += '<path d="M-14,-88 q-24,-22 -46,-18 q22,10 44,14 Z" fill="' + COL.leaf + '"/>';
    s += '<path d="M-12,-90 q-6,-28 12,-38 q0,22 -6,38 Z" fill="' + COL.leaf + '"/>';
    s += '<path d="M-10,-88 q22,-24 44,-16 q-22,10 -42,18 Z" fill="' + COL.leafD + '"/>';
    s += '<path d="M-10,-86 q30,-6 40,12 q-26,-2 -40,-6 Z" fill="' + COL.leaf + '"/>';
    /* dates */
    s += '<circle cx="-4" cy="-80" r="3.2" fill="' + COL.ochre + '"/>';
    s += '<circle cx="4" cy="-83" r="3" fill="' + COL.ochre + '"/>';
    s += '<circle cx="1" cy="-76" r="2.6" fill="' + sh(COL.ochre) + '"/>';
    return s;
  }

  /* Moses' basket among the reeds of the Nile */
  function fiscella(o) {
    o = o || {};
    var b = '#c9a45e', s = '';
    /* reeds behind */
    s += reedCluster(-34, 0.9) + reedCluster(30, 1.05);
    /* water line */
    s += '<path d="M-46,-2 q14,-4 26,0 q14,4 28,0 q12,-4 24,0" stroke="' + COL.water +
      '" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>';
    /* basket */
    s += '<path d="M-24,-12 q4,14 24,14 q20,0 24,-14 Z" fill="' + b + '"/>';
    s += '<path d="M0,2 q20,0 24,-14 L0,-12 Z" fill="' + sh(b) + '" opacity="0.5"/>';
    s += '<path d="M-24,-12 q24,-8 48,0" stroke="' + sh(b) + '" stroke-width="2.4" fill="none"/>';
    s += '<path d="M-16,-11 q2,10 4,12 M0,-12 l0,14 M16,-11 q-2,10 -4,12" stroke="' + sh(b) +
      '" stroke-width="1.6" fill="none" opacity="0.8"/>';
    /* the child's blanket, tucked and modest */
    s += '<path d="M-14,-13 q14,-9 28,0 q-14,5 -28,0 Z" fill="' + COL.linen + '"/>';
    s += '<circle cx="6" cy="-16" r="5" fill="#e8b78a"/>';
    s += '<circle cx="5" cy="-17" r="1.2" fill="' + COL.ink + '"/>';
    s += '<circle cx="9" cy="-17" r="1.2" fill="' + COL.ink + '"/>';
    s += '<path d="M2,-20 q4,-4 8,-1" stroke="' + COL.umber + '" stroke-width="2" fill="none"/>';
    return s;
  }

  function reedCluster(x, k) {
    var s = '<g transform="translate(' + x + ',0) scale(' + k + ')">';
    var st = [[0, -52], [-9, -40], [8, -44], [15, -34]], i;
    for (i = 0; i < st.length; i++) {
      s += '<path d="M' + st[i][0] + ',2 q' + (st[i][0] * 0.2) + ',' + (st[i][1] / 2) + ' ' +
        (st[i][0] * 0.5) + ',' + st[i][1] + '" stroke="' + COL.leafD +
        '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
      s += '<ellipse cx="' + (st[i][0] * 0.5) + '" cy="' + (st[i][1] - 4) + '" rx="2.6" ry="6" fill="' + COL.umber + '"/>';
    }
    s += '</g>';
    return s;
  }

  /* Jacob's ladder: rails converging as they climb into the sky */
  function scala(o) {
    o = o || {};
    var w = COL.wood, s = '', i, y, half;
    s += '<path d="M-14,0 L-5,-150 L1,-150 L-6,0 Z" fill="' + w + '"/>';
    s += '<path d="M14,0 L5,-150 L11,-150 L22,0 Z" fill="' + sh(w) + '"/>';
    for (i = 0; i < 9; i++) {
      y = -6 - i * 16;
      half = 14 - i * 1.0;
      s += '<path d="M' + (-half) + ',' + y + ' L' + half + ',' + y + '" stroke="' + w +
        '" stroke-width="' + (4 - i * 0.25) + '" stroke-linecap="round" fill="none"/>';
    }
    if (o.glow !== false) {
      /* Light opening at the top of the ladder. Flat ellipses left a hard
         grey disc hanging in the night sky, so this is a real radial fade.
         The gradient id is fixed on purpose: if two ladders land in one
         document the duplicate <defs> are IDENTICAL, so the first
         definition wins and both ladders still glow correctly. */
      s += '<defs><radialGradient id="imGlowGold">' +
        '<stop offset="0%" stop-color="' + COL.gold + '" stop-opacity="0.38"/>' +
        '<stop offset="55%" stop-color="' + COL.gold + '" stop-opacity="0.12"/>' +
        '<stop offset="100%" stop-color="' + COL.gold + '" stop-opacity="0"/>' +
        '</radialGradient></defs>';
      s += '<ellipse cx="3" cy="-152" rx="52" ry="28" fill="url(#imGlowGold)"/>';
    }
    return s;
  }

  /* Ark of the Covenant: gold chest, carrying poles, two winged figures */
  function arcaFoederis() {
    var g = COL.gold, s = '';
    s += '<rect x="-40" y="-46" width="80" height="34" rx="3" fill="' + g + '"/>';
    s += '<rect x="4" y="-46" width="36" height="34" fill="' + sh(g) + '" opacity="0.45"/>';
    s += '<rect x="-44" y="-54" width="88" height="9" rx="3" fill="' + hi(g) + '"/>';
    s += '<path d="M-40,-30 L40,-30" stroke="' + sh(g) + '" stroke-width="2" opacity="0.8"/>';
    /* poles */
    s += '<path d="M-58,-20 L58,-20" stroke="' + COL.wood + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<circle cx="-58" cy="-20" r="3.4" fill="' + g + '"/>';
    s += '<circle cx="58" cy="-20" r="3.4" fill="' + g + '"/>';
    /* two cherubim facing one another over the mercy seat */
    function cherub(x, flip) {
      var t = '<g transform="translate(' + x + ',-54)' + (flip ? ' scale(-1,1)' : '') + '">';
      t += '<path d="M0,0 q-9,-4 -13,-18 q9,2 13,10 Z" fill="' + hi(g) + '"/>';
      t += '<path d="M2,0 q9,-6 12,-20 q-8,3 -12,12 Z" fill="' + g + '"/>';
      t += '<path d="M-4,0 q0,-14 4,-14 q4,0 4,14 Z" fill="' + g + '"/>';
      t += '<circle cx="0" cy="-16" r="4.4" fill="' + hi(g) + '"/>';
      t += '<circle cx="1.4" cy="-16.5" r="1" fill="' + COL.ink + '"/>';
      return t + '</g>';
    }
    s += cherub(-18, false) + cherub(18, true);
    s += '<ellipse cx="0" cy="-62" rx="30" ry="12" fill="' + g + '" opacity="0.14"/>';
    /* the chest is drawn around its poles; shift it so the lowest point
       lands on y=0 and the actor obeys the ground-point origin rule. */
    return '<g transform="translate(0,9)">' + s + '</g>';
  }

  /* trellised vine with clusters (the vineyard, and Vulpēs et Ūva) */
  function grapevine(o) {
    o = o || {};
    var s = '';
    s += '<path d="M-4,0 q-3,-26 2,-44" stroke="' + COL.wood + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
    s += '<path d="M-48,-46 L48,-46" stroke="' + COL.wood + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<path d="M-44,-46 L-44,-6 M44,-46 L44,-6" stroke="' + COL.wood + '" stroke-width="5" stroke-linecap="round"/>';
    var i, x;
    for (i = 0; i < 5; i++) {
      x = -40 + i * 20;
      s += '<path d="M' + x + ',-46 q-8,-10 2,-16 q10,-4 12,6 q2,10 -8,10 Z" fill="' + COL.leaf + '"/>';
      s += '<path d="M' + (x + 2) + ',-62 l4,4 M' + (x + 4) + ',-58 l-6,4" stroke="' + COL.leafD +
        '" stroke-width="1.2" fill="none"/>';
    }
    s += '<path d="M-24,-44 q-6,10 -2,16" stroke="' + COL.leafD + '" stroke-width="1.8" fill="none"/>';
    s += grapeBunch(-24, -40) + grapeBunch(20, -42);
    return s;
  }

  function grapeBunch(x, y) {
    var rows = [[0], [-7, 7], [-13, 0, 13], [-7, 7], [0]], s = '', i, j, yy = y;
    for (i = 0; i < rows.length; i++) {
      for (j = 0; j < rows[i].length; j++) {
        s += '<circle cx="' + (x + rows[i][j]) + '" cy="' + yy + '" r="6" fill="#7b4d8f" stroke="#5e3a70" stroke-width="1.5"/>';
      }
      yy += 8.5;
    }
    return s;
  }

  /* grex — a little flock of three lambs, back ones smaller */
  function grex(o) {
    o = o || {};
    var s = '';
    function littleLamb(x, k, op) {
      var w = COL.white, d = '#d8cfba';
      var t = '<g transform="translate(' + x + ',0) scale(' + k + ')"' + (op ? ' opacity="' + op + '"' : '') + '>';
      t += '<path d="M-9,-11 L-9,-1 M9,-11 L9,-1 M-3,-11 L-3,-1 M4,-11 L4,-1" stroke="' + d +
        '" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
      t += '<circle cx="-9" cy="-20" r="10" fill="' + w + '"/>';
      t += '<circle cx="2" cy="-24" r="11" fill="' + w + '"/>';
      t += '<circle cx="11" cy="-19" r="9" fill="' + w + '"/>';
      t += '<ellipse cx="0" cy="-19" rx="15" ry="10" fill="' + w + '"/>';
      t += '<g transform="translate(16,-27)">';
      t += '<ellipse cx="0" cy="0" rx="7.5" ry="6.5" fill="' + d + '"/>';
      t += '<ellipse cx="-2" cy="-6" rx="5.5" ry="3.6" fill="' + w + '"/>';
      t += '<path d="M-5,-2 q-5,3 -4,7" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      t += '<circle cx="3" cy="-1" r="1.8" fill="' + COL.ink + '"/>';
      t += '</g></g>';
      return t;
    }
    s += littleLamb(-34, 0.76, 0.9) + littleLamb(30, 0.8, 0.94) + littleLamb(-1, 1, 0);
    return s;
  }

  /* testudo — the shell is the whole character */
  function testudo(o) {
    o = o || {};
    var shell = '#8a6a3a', s = '';
    if (o.pose === 'hide') {
      s += '<path d="M-24,-2 q0,-22 24,-22 q24,0 24,22 Z" fill="' + shell + '"/>';
      s += '<path d="M0,-24 q24,0 24,22 L0,-2 Z" fill="' + sh(shell) + '" opacity="0.5"/>';
      return s;
    }
    /* legs */
    s += '<path d="M-15,-6 l-3,6 M13,-6 l4,6" stroke="' + COL.olive + '" stroke-width="7" stroke-linecap="round" fill="none"/>';
    /* shell */
    s += '<path d="M-26,-4 q2,-26 26,-26 q24,0 26,26 Z" fill="' + shell + '"/>';
    s += '<path d="M0,-30 q24,0 26,26 L0,-4 Z" fill="' + sh(shell) + '" opacity="0.45"/>';
    s += '<path d="M-26,-4 q26,-8 52,0" stroke="' + COL.ochre + '" stroke-width="3" fill="none"/>';
    /* scutes */
    s += '<path d="M-13,-8 l4,-14 M0,-9 l0,-18 M13,-8 l-4,-14" stroke="' + sh(shell) +
      '" stroke-width="2" fill="none" opacity="0.85"/>';
    /* head */
    s += '<g transform="translate(30,-14)">';
    s += '<ellipse cx="0" cy="0" rx="9" ry="7" fill="' + COL.olive + '"/>';
    s += '<circle cx="3" cy="-2.4" r="1.8" fill="' + COL.ink + '"/>';
    s += '<path d="M6,2 q4,1 6,3" stroke="' + sh(COL.olive) + '" stroke-width="1.6" fill="none"/>';
    s += '</g>';
    /* tail */
    s += '<path d="M-26,-8 l-7,3" stroke="' + COL.olive + '" stroke-width="4" stroke-linecap="round"/>';
    return s;
  }

  /* rana — the frog, and (inflata) the frog that would be an ox */
  function rana(o) {
    o = o || {};
    var gr = o.color || '#7fa03f', d = sh(gr), s = '';
    var k = o.inflata ? 1.45 : 1;
    s += '<g transform="scale(' + k + ')">';
    /* hind legs */
    s += '<path d="M-14,-6 q-12,2 -14,10 q10,2 14,-4 Z" fill="' + d + '"/>';
    s += '<path d="M14,-6 q12,2 14,10 q-10,2 -14,-4 Z" fill="' + d + '"/>';
    /* body */
    s += '<ellipse cx="0" cy="-13" rx="20" ry="' + (o.inflata ? 16 : 12) + '" fill="' + gr + '"/>';
    s += '<path d="M-20,-13 a20,' + (o.inflata ? 16 : 12) + ' 0 0 0 40,0 Z" fill="' + d + '" opacity="0.35"/>';
    s += '<ellipse cx="2" cy="-8" rx="11" ry="5" fill="' + hi(gr) + '" opacity="0.8"/>';
    /* front feet */
    s += '<path d="M-10,-3 l-4,3 M-6,-3 l-1,4 M10,-3 l4,3 M6,-3 l1,4" stroke="' + d +
      '" stroke-width="2.2" stroke-linecap="round" fill="none"/>';
    /* eyes on top */
    s += '<circle cx="-7" cy="-25" r="5.5" fill="' + gr + '"/>';
    s += '<circle cx="7" cy="-25" r="5.5" fill="' + gr + '"/>';
    s += '<circle cx="-7" cy="-26" r="2.6" fill="' + COL.gold + '"/>';
    s += '<circle cx="7" cy="-26" r="2.6" fill="' + COL.gold + '"/>';
    s += '<circle cx="-6.4" cy="-26" r="1.3" fill="' + COL.ink + '"/>';
    s += '<circle cx="7.6" cy="-26" r="1.3" fill="' + COL.ink + '"/>';
    s += '<path d="M-8,-14 q8,4 16,0" stroke="' + d + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    s += '</g>';
    return s;
  }

  /* oak: broad, lobed, sturdier than the generic tree in scenes.js */
  function quercus() {
    var s = '';
    s += '<path d="M-13,0 q4,-40 -2,-64 l30,0 q-6,26 -1,64 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M2,0 q4,-40 0,-64 l13,0 q-6,26 -1,64 Z" fill="' + sh(COL.wood) + '" opacity="0.5"/>';
    s += '<path d="M-12,-46 q-16,-6 -24,-20" stroke="' + COL.wood + '" stroke-width="8" fill="none" stroke-linecap="round"/>';
    s += '<path d="M12,-52 q16,-6 22,-18" stroke="' + COL.wood + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
    s += '<circle cx="-34" cy="-92" r="28" fill="' + COL.leafD + '"/>';
    s += '<circle cx="30" cy="-96" r="30" fill="' + COL.leafD + '"/>';
    s += '<circle cx="-6" cy="-112" r="34" fill="' + COL.leaf + '"/>';
    s += '<circle cx="-38" cy="-104" r="22" fill="' + COL.leaf + '"/>';
    s += '<circle cx="34" cy="-110" r="24" fill="' + COL.leaf + '"/>';
    s += '<circle cx="4" cy="-84" r="24" fill="' + COL.leafD + '"/>';
    /* acorns */
    s += '<circle cx="-20" cy="-70" r="4" fill="' + COL.ochre + '"/>';
    s += '<path d="M-24,-73 q4,-3 8,0 Z" fill="' + COL.umber + '"/>';
    s += '<circle cx="18" cy="-66" r="3.4" fill="' + COL.ochre + '"/>';
    return s;
  }

  /* arborNuda — the winter twin of the `tree` actor in scenes.js.
     The trunk is deliberately the SAME rect (x -11..11, y -95..0, rx 6) and
     the crown reaches the same envelope, so putting tree and arborNuda in
     the same spot of two scenes reads as one tree in two seasons rather
     than as two different trees. opts.nix dusts the limbs with snow. */
  function arborNuda(o) {
    o = o || {};
    var t = COL.umber, d = sh(t), s = '';
    /* root flare, then the trunk */
    s += '<path d="M-11,-10 q-9,4 -13,10 l48,0 q-4,-6 -13,-10 Z" fill="' + t + '"/>';
    s += '<rect x="-11" y="-95" width="22" height="95" rx="6" fill="' + t + '"/>';
    s += '<rect x="1" y="-93" width="9" height="91" rx="4.5" fill="' + d + '" opacity="0.45"/>';
    /* three main limbs, forking twice, thinning as they go */
    function limb(dd, w) {
      return '<path d="' + dd + '" stroke="' + t + '" stroke-width="' + w +
        '" fill="none" stroke-linecap="round"/>';
    }
    s += limb('M-6,-84 Q-24,-106 -36,-132', 9);
    s += limb('M6,-88 Q26,-110 34,-138', 9);
    s += limb('M0,-92 Q4,-122 -4,-154', 8);
    s += limb('M-27,-116 Q-40,-126 -50,-140', 5.5);
    s += limb('M-33,-127 Q-34,-146 -30,-158', 5);
    s += limb('M25,-120 Q40,-130 50,-142', 5.5);
    s += limb('M31,-131 Q34,-148 30,-160', 5);
    s += limb('M2,-124 Q16,-138 22,-156', 5);
    s += limb('M-1,-130 Q-14,-142 -18,-160', 5);
    /* twigs */
    s += '<path d="M-48,-138 l-8,-7 M-31,-156 l-7,-8 M-29,-157 l7,-7 M48,-140 l9,-6' +
      ' M31,-158 l-7,-8 M33,-159 l7,-6 M21,-154 l7,-8 M-17,-158 l-8,-7 M-4,-152 l0,-10"' +
      ' stroke="' + t + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    if (o.nix) {
      /* snow settles on the upper side of each limb only */
      s += '<path d="M-6,-84 Q-24,-106 -36,-132 M6,-88 Q26,-110 34,-138 M0,-92 Q4,-122 -4,-154"' +
        ' stroke="#f2f1ea" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"' +
        ' transform="translate(-2,-3)"/>';
      s += '<path d="M-11,-95 l22,0" stroke="#f2f1ea" stroke-width="3" stroke-linecap="round" opacity="0.8"/>';
    }
    return s;
  }

  /* nidus — a bird's nest. `ova` is 0..3 ON PURPOSE: an EMPTY nest is what
     lets a scene say "iam gallīna ōva aurea nōn pōnit" truthfully, instead
     of contradicting the sentence with eggs that are still there.
     opts: { ova: 0..3, aureum: bool } */
  function nidus(o) {
    o = o || {};
    var count = n(o.ova, 2);
    if (count < 0) { count = 0; }
    if (count > 3) { count = 3; }
    var straw = '#c9a45e', s = '';
    var eggCol = o.aureum ? COL.gold : COL.cream;
    /* eggs sit INSIDE the bowl, so they are drawn between the back rim and
       the front rim */
    s += '<path d="M-28,-10 q4,-14 28,-14 q24,0 28,14 Z" fill="' + sh(straw) + '"/>';
    /* eggs ride high in the bowl: sunk to the old -15 the front rim ate
       most of each one and a single golden egg barely read at cell size */
    var slots = [[-11, -19, 7.5], [11, -19, 7.5], [0, -23, 7]];
    var i, e;
    for (i = 0; i < count; i++) {
      e = slots[i];
      /* a thin darker edge: a gold egg against the tan straw of the nest
         has almost no contrast without it (and the cream one little more) */
      s += '<ellipse cx="' + e[0] + '" cy="' + e[1] + '" rx="' + (e[2] * 0.78) + '" ry="' + e[2] +
        '" fill="' + eggCol + '" stroke="' + mix(eggCol, 0, 0.34) + '" stroke-width="1.4"/>';
      s += '<path d="M' + e[0] + ',' + (e[1] - e[2]) + ' a' + (e[2] * 0.78) + ',' + e[2] + ' 0 0 1 0,' +
        (2 * e[2]) + ' Z" fill="' + sh(eggCol) + '" opacity="0.4"/>';
      s += '<ellipse cx="' + (e[0] - e[2] * 0.28) + '" cy="' + (e[1] - e[2] * 0.3) + '" rx="' + (e[2] * 0.22) +
        '" ry="' + (e[2] * 0.3) + '" fill="' + hi(eggCol) + '" opacity="0.8"/>';
    }
    /* front of the bowl, woven */
    s += '<path d="M-30,-12 q5,14 30,14 q25,0 30,-14 q-30,8 -60,0 Z" fill="' + straw + '"/>';
    s += '<path d="M-30,-12 q30,8 60,0" stroke="' + sh(straw) + '" stroke-width="2.2" fill="none"/>';
    s += '<path d="M-18,-9 q3,9 5,11 M0,-7 l0,13 M18,-9 q-3,9 -5,11" stroke="' + sh(straw) +
      '" stroke-width="1.8" fill="none" opacity="0.8"/>';
    /* loose twigs sticking out, which is what makes it read as a nest */
    s += '<path d="M-30,-13 l-9,-3 M30,-13 l9,-4 M-24,-6 l-10,2 M25,-5 l10,3" stroke="' + sh(straw) +
      '" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    return s;
  }

  /* harundo — reeds that bend and do not break */
  function harundo(o) {
    o = o || {};
    var bend = o.bend ? 1 : 0, s = '', i;
    var st = [[-16, -58, -10], [-4, -74, -6], [8, -66, -8], [20, -50, -12]];
    for (i = 0; i < st.length; i++) {
      var x = st[i][0], top = st[i][1], curve = st[i][2] + (bend ? 26 : 0);
      s += '<path d="M' + x + ',2 q' + (curve * 0.3) + ',' + (top / 2) + ' ' + (x + curve) + ',' + top +
        '" stroke="' + COL.leafD + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      s += '<ellipse cx="' + (x + curve) + '" cy="' + (top - 5) + '" rx="3.4" ry="8" fill="' + COL.umber +
        '" transform="rotate(' + (bend ? 32 : 0) + ' ' + (x + curve) + ' ' + (top - 5) + ')"/>';
      /* a leaf blade */
      s += '<path d="M' + (x + curve * 0.4) + ',' + (top * 0.5) + ' q12,-6 18,2 q-12,4 -18,-2 Z" fill="' + COL.leaf + '"/>';
    }
    return s;
  }

  /* urna — the tall jar of Cornīx et Urna, with water level and pebbles */
  function urna(o) {
    o = o || {};
    var body = o.color || '#a86a3c', s = '';
    s += '<path d="M-16,0 q-6,-30 0,-46 q4,-8 16,-8 q12,0 16,8 q6,16 0,46 Z" fill="' + body + '"/>';
    s += '<path d="M0,-54 q12,0 16,8 q6,16 0,46 L0,0 Z" fill="' + sh(body) + '" opacity="0.42"/>';
    s += '<ellipse cx="0" cy="-54" rx="13" ry="4" fill="' + sh(body) + '"/>';
    s += '<ellipse cx="0" cy="-55" rx="10" ry="3" fill="' + COL.ink + '" opacity="0.6"/>';
    if (o.water !== false) {
      /* the water must stay INSIDE the jar: its outline follows the same
         curve as the body wall, inset by 2 units, instead of being a
         rectangle that spilled out past the belly. */
      var wy = o.high ? -42 : -20;
      var half = 14 - (wy < -34 ? 3 : 0);   /* the jar narrows near the neck */
      s += '<path d="M' + (-half) + ',' + wy + ' q' + half + ',4 ' + (2 * half) + ',0' +
        ' q4,' + (-wy * 0.55) + ' 0,' + (-wy) + ' q' + (-half) + ',4 ' + (-2 * half) + ',0' +
        ' q-4,' + (wy * 0.55) + ' 0,' + wy + ' Z" fill="' + COL.water + '" opacity="0.8"/>';
      s += '<path d="M' + (-half) + ',' + wy + ' q' + half + ',4 ' + (2 * half) + ',0" stroke="' +
        COL.waterD + '" stroke-width="2" fill="none"/>';
    }
    if (o.lapilli) {
      s += '<circle cx="-6" cy="-6" r="3.4" fill="' + COL.grey + '"/>';
      s += '<circle cx="3" cy="-4" r="3" fill="' + sh(COL.grey) + '"/>';
      s += '<circle cx="-1" cy="-11" r="2.6" fill="' + COL.grey + '"/>';
    }
    return s;
  }

  /* umbra — the soft dark ellipse used for reflections and cast shadows
     (Canis et Umbra, and under any actor that needs grounding) */
  function umbra(o) {
    o = o || {};
    var w = n(o.w, 40), h = n(o.h, 9);
    return '<ellipse cx="0" cy="0" rx="' + w + '" ry="' + h + '" fill="' + (o.color || COL.ink) +
      '" opacity="' + n(o.opacity, 0.22) + '"/>';
  }

  /* ---------- additions the curriculum demands (see report) ---------- */

  /* sol — the sun with a calm face (Ventus et Sōl, R8) */
  function sol(o) {
    o = o || {};
    var g = COL.gold, s = '', i, a;
    for (i = 0; i < 12; i++) {
      a = i * 30 * Math.PI / 180;
      s += '<path d="M' + (Math.cos(a) * 26).toFixed(1) + ',' + (Math.sin(a) * 26 - 30).toFixed(1) +
        ' L' + (Math.cos(a) * 38).toFixed(1) + ',' + (Math.sin(a) * 38 - 30).toFixed(1) +
        '" stroke="' + g + '" stroke-width="4" stroke-linecap="round"/>';
    }
    s += '<circle cx="0" cy="-30" r="24" fill="' + g + '"/>';
    s += '<path d="M0,-54 a24,24 0 0 1 0,48 Z" fill="' + sh(g) + '" opacity="0.35"/>';
    /* { face: false } — the REVERENT register. In a fable the sun argues
       with the wind and needs a face; in Historia Sacra the sun is a thing
       God made, and a smiling face on it turns Gn 1 into a nursery decal.
       Content opts in; every existing scene keeps the face. */
    if (o.face !== false) {
      s += '<circle cx="-7" cy="-33" r="2.4" fill="' + COL.ink + '"/>';
      s += '<circle cx="7" cy="-33" r="2.4" fill="' + COL.ink + '"/>';
      s += '<path d="M-8,-24 q8,7 16,0" stroke="' + COL.ink + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
    return s;
  }

  /* ventus — the blowing wind, a cloud face with three gusts (R8) */
  function ventus(o) {
    o = o || {};
    var c = '#cfd8dc', s = '';
    /* Outline first, as a slightly larger silhouette UNDERNEATH the fills
       rather than a stroke on each ellipse — a stroke per ellipse would
       draw the seams where the three overlap. Needed for the same reason
       as pellis: a pale cloud on the cream sky has no edge otherwise. */
    var edge = mix(c, 0, 0.30);
    s += '<ellipse cx="-14" cy="-40" rx="28" ry="20" fill="' + edge + '"/>';
    s += '<ellipse cx="-34" cy="-36" rx="18" ry="14" fill="' + edge + '"/>';
    s += '<ellipse cx="2" cy="-48" rx="20" ry="15" fill="' + edge + '"/>';
    s += '<ellipse cx="-14" cy="-40" rx="26" ry="18" fill="' + c + '"/>';
    s += '<ellipse cx="-34" cy="-36" rx="16" ry="12" fill="' + c + '"/>';
    s += '<ellipse cx="2" cy="-48" rx="18" ry="13" fill="' + hi(c) + '"/>';
    s += '<path d="M-40,-40 a26,18 0 0 0 40,10 Z" fill="' + sh(c) + '" opacity="0.28"/>';
    /* { face: false }: the same cloud with the gusts and no blowing face —
       the wind of Gn 8,1 rather than the character of Ventus et Sōl. */
    if (o.face !== false) {
      s += '<circle cx="-4" cy="-44" r="2.4" fill="' + COL.ink + '"/>';
      s += '<circle cx="6" cy="-45" r="2.4" fill="' + COL.ink + '"/>';
      s += '<ellipse cx="12" cy="-36" rx="5" ry="4" fill="' + COL.ink + '" opacity="0.8"/>';
    }
    /* gusts */
    s += '<path d="M20,-38 q22,-6 34,2 q-14,4 -30,2" stroke="' + edge + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    s += '<path d="M18,-26 q28,-4 44,6 q-18,2 -38,-1" stroke="' + edge + '" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>';
    s += '<path d="M22,-50 q18,-8 30,-4" stroke="' + edge + '" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.7"/>';
    return s;
  }

  function ovumAureum(o) {
    o = o || {};
    var s = '';
    /* nest */
    s += '<path d="M-26,-2 q4,-14 26,-14 q22,0 26,14 Z" fill="' + COL.straw + '"/>';
    s += '<path d="M-26,-2 q26,6 52,0" stroke="' + sh(COL.straw) + '" stroke-width="2.4" fill="none"/>';
    s += '<path d="M-20,-8 q18,-6 40,0 M-18,-12 q16,-5 36,1" stroke="' + sh(COL.straw) +
      '" stroke-width="1.6" fill="none" opacity="0.8"/>';
    /* the golden egg */
    s += '<ellipse cx="0" cy="-22" rx="12" ry="15" fill="' + COL.gold + '"/>';
    s += '<path d="M0,-37 a12,15 0 0 1 0,30 Z" fill="' + sh(COL.gold) + '" opacity="0.4"/>';
    s += '<ellipse cx="-4" cy="-28" rx="3.4" ry="5" fill="' + hi(COL.gold) + '" opacity="0.8"/>';
    return s;
  }

  function praesepe(o) {
    o = o || {};
    var s = '';
    /* trestle legs */
    s += '<path d="M-22,-2 L-12,-26 M22,-2 L12,-26 M-12,-2 L-22,-26 M12,-2 L22,-26" stroke="' + COL.wood +
      '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    /* trough */
    s += '<path d="M-32,-26 L32,-26 L22,-4 L-22,-4 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M0,-26 L32,-26 L22,-4 L0,-4 Z" fill="' + sh(COL.wood) + '" opacity="0.45"/>';
    /* straw */
    s += '<path d="M-30,-26 q12,-8 26,-6 q14,-4 32,6 Z" fill="' + COL.straw + '"/>';
    s += '<path d="M-22,-28 l-6,-6 M-6,-31 l-2,-8 M10,-30 l6,-7 M20,-28 l8,-4" stroke="' + sh(COL.straw) +
      '" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
    if (o.infans) {
      /* the swaddled child — cloth and a sleeping face, nothing more */
      s += '<path d="M-14,-32 q14,-10 28,-2 q-12,8 -28,2 Z" fill="' + COL.linen + '"/>';
      s += '<circle cx="8" cy="-36" r="5.5" fill="#e8b78a"/>';
      s += '<path d="M5,-36 q1.6,2 3,0 M10,-36 q1.6,2 3,0" stroke="' + COL.ink +
        '" stroke-width="1.1" fill="none" stroke-linecap="round"/>';
      s += '<circle cx="8" cy="-38" r="10" fill="' + COL.gold + '" opacity="0.16"/>';
    }
    return s;
  }

  function mensa(o) {
    o = o || {};
    var s = '';
    s += '<path d="M-40,-24 L40,-24 L40,-18 L-40,-18 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M0,-24 L40,-24 L40,-18 L0,-18 Z" fill="' + sh(COL.wood) + '" opacity="0.4"/>';
    s += '<path d="M-32,-18 L-26,-1 M32,-18 L26,-1" stroke="' + COL.wood + '" stroke-width="6" stroke-linecap="round" fill="none"/>';
    s += '<path d="M-28,-10 L28,-10" stroke="' + COL.woodD + '" stroke-width="3"/>';
    /* the town mouse's feast: bread, a dish, a cup */
    s += '<path d="M-28,-26 q6,-10 16,-2 q-8,4 -16,2 Z" fill="' + COL.straw + '"/>';
    s += '<ellipse cx="2" cy="-26" rx="13" ry="4" fill="' + COL.linen + '"/>';
    s += '<circle cx="-2" cy="-29" r="3.4" fill="' + COL.blood + '"/>';
    s += '<circle cx="5" cy="-29" r="3" fill="' + COL.olive + '"/>';
    s += '<path d="M24,-26 l3,-10 l8,0 l3,10 Z" fill="' + COL.terra + '"/>';
    return s;
  }

  function patina(o) {
    o = o || {};
    var c = o.color || '#b5713f', s = '';
    s += '<path d="M-26,-8 q26,14 52,0 q-6,10 -26,10 q-20,0 -26,-10 Z" fill="' + c + '"/>';
    s += '<ellipse cx="0" cy="-8" rx="26" ry="6" fill="' + hi(c) + '"/>';
    s += '<ellipse cx="0" cy="-8" rx="20" ry="4" fill="' + sh(c) + '" opacity="0.5"/>';
    if (o.food) {
      s += '<ellipse cx="-6" cy="-9" rx="6" ry="2.6" fill="' + COL.linen + '"/>';
      s += '<ellipse cx="6" cy="-8" rx="5" ry="2.4" fill="' + COL.straw + '"/>';
    }
    return s;
  }

  /* rete — the net that holds the lion until a mouse gnaws it */
  function rete(o) {
    o = o || {};
    /* hemp rope, not pale straw: at cell size the old tint vanished into
       the cream ground and the net read as an empty box. */
    var c = o.color || '#8a6a3a', s = '', i;
    s += '<path d="M-46,-2 q10,-46 46,-46 q36,0 46,46 Z" fill="' + c + '" opacity="0.16"/>';
    for (i = -4; i <= 4; i++) {
      s += '<path d="M' + (i * 11) + ',-2 q' + (i * 2) + ',-30 ' + (i * 7) + ',-46" stroke="' + c +
        '" stroke-width="2.4" fill="none"/>';
    }
    for (i = 1; i <= 4; i++) {
      s += '<path d="M' + (-46 + i * 3) + ',' + (-i * 11) + ' q46,' + (-i * 3) + ' ' + (92 - i * 6) + ',0" stroke="' + c +
        '" stroke-width="2.4" fill="none"/>';
    }
    /* the knot the mouse gnaws through */
    s += '<circle cx="0" cy="-48" r="4.5" fill="' + sh(c) + '"/>';
    s += '<circle cx="-1.2" cy="-49" r="1.6" fill="' + hi(c) + '"/>';
    return s;
  }

  function truncus(o) {
    o = o || {};
    var s = '';
    s += '<path d="M-40,-14 L34,-14 q10,0 10,7 q0,7 -10,7 L-40,0 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M-40,-6 L38,-6" stroke="' + sh(COL.wood) + '" stroke-width="2.4" opacity="0.7"/>';
    s += '<ellipse cx="-40" cy="-7" rx="6" ry="7" fill="' + COL.woodD + '"/>';
    s += '<ellipse cx="-40" cy="-7" rx="3" ry="3.6" fill="' + sh(COL.woodD) + '"/>';
    s += '<path d="M6,-14 q6,-8 14,-6 q-4,6 -14,6 Z" fill="' + COL.leafD + '"/>';
    return s;
  }

  function fascis(o) {
    o = o || {};
    var s = '', i, a, x2, y2;
    for (i = 0; i < 7; i++) {
      a = (-70 + i * 14) * Math.PI / 180;
      x2 = Math.sin(a) * 30;
      y2 = -34 - Math.cos(a) * 8;
      s += '<path d="M' + (x2 * 0.15) + ',-2 L' + x2.toFixed(1) + ',' + y2.toFixed(1) + '" stroke="' + COL.wood +
        '" stroke-width="3.4" stroke-linecap="round" fill="none"/>';
    }
    s += '<path d="M-14,-16 q14,6 28,0" stroke="' + COL.umber + '" stroke-width="4" fill="none"/>';
    return s;
  }

  function frumentum(o) {
    o = o || {};
    var s = '', i, x, top;
    for (i = 0; i < 7; i++) {
      x = -18 + i * 6;
      top = -46 - ((i % 3) * 5);
      s += '<path d="M0,-2 L' + x + ',' + top + '" stroke="' + COL.straw + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>';
      s += '<ellipse cx="' + x + '" cy="' + (top - 4) + '" rx="3.4" ry="7" fill="' + COL.ochre +
        '" transform="rotate(' + (x * 0.6) + ' ' + x + ' ' + (top - 4) + ')"/>';
    }
    s += '<path d="M-12,-14 q12,6 24,0" stroke="' + COL.umber + '" stroke-width="3.4" fill="none"/>';
    /* a few loose grains at the foot */
    s += '<ellipse cx="-16" cy="-2" rx="3" ry="2" fill="' + COL.ochre + '"/>';
    s += '<ellipse cx="16" cy="-1" rx="3" ry="2" fill="' + COL.ochre + '"/>';
    return s;
  }

  /* pellis — a hide to disguise oneself in: fleece (R9) or lion skin (R10) */
  function pellis(o) {
    o = o || {};
    var lion = (o.kind === 'leonis');
    var c = lion ? '#d9a441' : COL.white, d = sh(c), s = '';
    /* An outline, which this actor needs and most do not: the fleece is
       near-white on a cream ground (C.sky #f6e8c9), so without a darker
       edge it dissolves into the background. Same 2px darker-tone stroke
       the lamb in scenes.js uses for exactly the same reason. */
    var edge = mix(c, 0, 0.34), ew = 2;
    function hide(dd, fill) {
      return '<path d="' + dd + '" fill="' + fill + '" stroke="' + edge +
        '" stroke-width="' + ew + '" stroke-linejoin="round"/>';
    }
    /* four splayed leg flaps make it read as a HIDE laid out flat rather
       than as a shapeless white blob */
    s += hide('M-28,-40 q-14,-4 -18,6 q10,6 20,2 Z', d);
    s += hide('M26,-40 q14,-4 18,6 q-10,6 -20,2 Z', d);
    s += hide('M-26,-10 q-14,2 -16,12 q11,3 19,-6 Z', d);
    s += hide('M24,-10 q14,2 16,12 q-11,3 -19,-6 Z', d);
    s += hide('M-30,-2 q-6,-30 8,-42 q22,-10 44,2 q12,14 6,40 q-30,8 -58,0 Z', c);
    s += '<path d="M6,-46 q12,4 22,8 q12,14 6,40 q-14,4 -28,4 Z" fill="' + d + '" opacity="0.35"/>';
    if (lion) {
      s += '<circle cx="-2" cy="-52" r="18" fill="#a86a24"/>';
      s += '<circle cx="-2" cy="-52" r="11" fill="' + c + '"/>';
      s += '<circle cx="-7" cy="-54" r="2.2" fill="' + COL.ink + '"/>';
      s += '<circle cx="3" cy="-54" r="2.2" fill="' + COL.ink + '"/>';
      s += '<path d="M-4,-46 q4,3 8,0" stroke="' + COL.ink + '" stroke-width="1.6" fill="none"/>';
    } else {
      s += '<circle cx="-16" cy="-46" r="11" fill="' + c + '"/>';
      s += '<circle cx="2" cy="-50" r="12" fill="' + c + '"/>';
      s += '<circle cx="18" cy="-44" r="10" fill="' + c + '"/>';
      s += '<circle cx="-8" cy="-30" r="9" fill="' + hi(c) + '" opacity="0.7"/>';
    }
    return s;
  }

  function turris(o) {
    o = o || {};
    var st = COL.stone, s = '', i, w, y;
    /* a ziggurat of shrinking storeys */
    for (i = 0; i < 5; i++) {
      w = 76 - i * 13;
      y = -20 - i * 20;
      s += '<rect x="' + (-w / 2) + '" y="' + y + '" width="' + w + '" height="20" fill="' + (i % 2 ? hi(st) : st) + '"/>';
      s += '<rect x="4" y="' + y + '" width="' + (w / 2 - 4) + '" height="20" fill="' + sh(st) + '" opacity="0.28"/>';
      s += '<path d="M' + (-w / 2) + ',' + (y + 20) + ' L' + (w / 2) + ',' + (y + 20) + '" stroke="' + COL.stoneD + '" stroke-width="1.6"/>';
    }
    /* the spiral ramp, a thin ribbon rather than a slab across the face */
    s += '<path d="M-34,-4 L34,-42" stroke="' + COL.stoneD + '" stroke-width="4" opacity="0.5" fill="none" stroke-linecap="round"/>';
    s += '<path d="M-26,-44 L26,-78" stroke="' + COL.stoneD + '" stroke-width="3.4" opacity="0.45" fill="none" stroke-linecap="round"/>';
    /* unfinished top: scaffolding */
    s += '<path d="M-14,-120 L-14,-134 M14,-120 L14,-134 M-18,-134 L18,-134" stroke="' + COL.wood +
      '" stroke-width="3" stroke-linecap="round" fill="none"/>';
    return s;
  }

  function pyramis(o) {
    o = o || {};
    var st = '#d8c08a', s = '';
    s += '<path d="M-70,0 L-30,-46 L10,0 Z" fill="' + st + '"/>';
    s += '<path d="M-30,-46 L10,0 L-30,0 Z" fill="' + sh(st) + '" opacity="0.4"/>';
    s += '<path d="M-6,0 L34,-70 L74,0 Z" fill="' + hi(st) + '"/>';
    s += '<path d="M34,-70 L74,0 L34,0 Z" fill="' + sh(st) + '" opacity="0.4"/>';
    s += '<path d="M34,-70 L34,0" stroke="' + sh(st) + '" stroke-width="1.4" opacity="0.5"/>';
    return s;
  }

  function rubusArdens() {
    var s = '';
    s += '<ellipse cx="0" cy="-28" rx="34" ry="26" fill="' + COL.gold + '" opacity="0.16"/>';
    s += '<ellipse cx="-14" cy="-14" rx="20" ry="13" fill="' + COL.leafD + '"/>';
    s += '<ellipse cx="12" cy="-16" rx="18" ry="12" fill="' + COL.leaf + '"/>';
    s += '<ellipse cx="0" cy="-24" rx="16" ry="11" fill="' + COL.leafD + '"/>';
    s += '<g transform="translate(-12,-24)">' + flames(0.8) + '</g>';
    s += '<g transform="translate(10,-28)">' + flames(0.95) + '</g>';
    s += '<g transform="translate(-1,-34)">' + flames(0.7) + '</g>';
    return s;
  }

  function vitulusAureus() {
    var g = COL.gold, s = '';
    /* pedestal */
    s += '<rect x="-26" y="-14" width="52" height="14" fill="' + COL.stone + '"/>';
    s += '<rect x="-30" y="-20" width="60" height="7" rx="2" fill="' + hi(COL.stone) + '"/>';
    s += '<rect x="4" y="-14" width="22" height="14" fill="' + sh(COL.stone) + '" opacity="0.45"/>';
    /* a small golden calf, deliberately stiff and idol-like */
    s += '<g transform="translate(0,-20)">';
    s += '<path d="M-16,-8 L-16,0 M-7,-8 L-7,0 M7,-8 L7,0 M16,-8 L16,0" stroke="' + sh(g) +
      '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    s += '<ellipse cx="0" cy="-16" rx="21" ry="12" fill="' + g + '"/>';
    s += '<path d="M-21,-16 a21,12 0 0 0 42,0 Z" fill="' + sh(g) + '" opacity="0.35"/>';
    s += '<circle cx="22" cy="-26" r="9" fill="' + g + '"/>';
    s += '<path d="M15,-33 q-4,-7 3,-6 q2,3 1,6 Z" fill="' + hi(g) + '"/>';
    s += '<path d="M29,-33 q4,-7 -3,-6 q-2,3 -1,6 Z" fill="' + hi(g) + '"/>';
    s += '<circle cx="24" cy="-28" r="1.8" fill="' + COL.ink + '"/>';
    s += '<path d="M-21,-18 q-8,2 -7,10" stroke="' + sh(g) + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    s += '</g>';
    return s;
  }

  function ramusAureus() {
    var g = COL.gold, s = '';
    s += '<ellipse cx="0" cy="-26" rx="26" ry="22" fill="' + g + '" opacity="0.14"/>';
    s += '<path d="M-2,0 q2,-18 0,-34" stroke="' + g + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    s += '<path d="M-2,-22 q-14,-4 -20,-16 M-2,-30 q14,-4 20,-16 M-2,-38 q-10,-8 -12,-20 M-2,-40 q12,-6 16,-18"' +
      ' stroke="' + g + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    var pts = [[-22, -38], [18, -46], [-14, -58], [14, -58], [0, -52]], i;
    for (i = 0; i < pts.length; i++) {
      s += '<path d="M' + pts[i][0] + ',' + pts[i][1] + ' q7,-6 12,1 q-7,7 -12,-1 Z" fill="' + hi(g) + '"/>';
    }
    return s;
  }

  function arborFructus(o) {
    o = o || {};
    var fruit = o.fruit || COL.blood, s = '';
    s += '<path d="M-10,0 q4,-32 -2,-52 l24,0 q-6,20 -2,52 Z" fill="' + COL.wood + '"/>';
    s += '<path d="M2,0 q4,-32 0,-52 l10,0 q-6,20 -2,52 Z" fill="' + sh(COL.wood) + '" opacity="0.45"/>';
    s += '<circle cx="-24" cy="-74" r="24" fill="' + COL.leafD + '"/>';
    s += '<circle cx="22" cy="-78" r="26" fill="' + COL.leafD + '"/>';
    s += '<circle cx="0" cy="-92" r="26" fill="' + COL.leaf + '"/>';
    s += '<circle cx="-18" cy="-88" r="18" fill="' + COL.leaf + '"/>';
    var pts = [[-26, -66], [12, -64], [-6, -78], [24, -88], [-30, -86], [4, -100]], i;
    for (i = 0; i < pts.length; i++) {
      s += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="5.5" fill="' + fruit + '"/>';
      s += '<circle cx="' + (pts[i][0] - 1.6) + '" cy="' + (pts[i][1] - 1.8) + '" r="1.8" fill="' + hi(fruit) + '" opacity="0.7"/>';
    }
    return s;
  }

  /* crux — the empty cross on its little hill; dignified, never a body */
  function crux(o) {
    o = o || {};
    var w = COL.wood, s = '';
    if (o.hill !== false) {
      s += '<path d="M-46,0 q22,-16 46,-16 q24,0 46,16 Z" fill="' + mix(COL.stone, 0, 0.12) + '"/>';
    }
    s += '<rect x="-5" y="-96" width="10" height="96" fill="' + w + '"/>';
    s += '<rect x="1" y="-96" width="4" height="96" fill="' + sh(w) + '" opacity="0.55"/>';
    s += '<rect x="-26" y="-76" width="52" height="9" fill="' + w + '"/>';
    s += '<rect x="-26" y="-70" width="52" height="3" fill="' + sh(w) + '" opacity="0.55"/>';
    if (o.glow) { s += '<circle cx="0" cy="-72" r="30" fill="' + COL.gold + '" opacity="0.14"/>'; }
    return s;
  }

  /* sepulcrum — the tomb with the stone rolled away (Resurrēctiō) */
  function sepulcrum(o) {
    o = o || {};
    var rock = '#a99377', s = '';
    s += '<path d="M-56,0 q-4,-52 34,-56 q40,-4 46,56 Z" fill="' + rock + '"/>';
    s += '<path d="M4,-56 q30,4 34,56 L4,0 Z" fill="' + sh(rock) + '" opacity="0.35"/>';
    /* the doorway */
    s += '<path d="M-22,0 L-22,-26 Q-6,-40 10,-26 L10,0 Z" fill="' + COL.ink + '" opacity="0.85"/>';
    if (o.open !== false) {
      /* the round stone, rolled aside */
      s += '<circle cx="34" cy="-16" r="17" fill="' + hi(rock) + '"/>';
      s += '<path d="M34,-33 a17,17 0 0 1 0,34 Z" fill="' + sh(rock) + '" opacity="0.4"/>';
      s += '<circle cx="34" cy="-16" r="17" fill="none" stroke="' + sh(rock) + '" stroke-width="2"/>';
      s += '<ellipse cx="-6" cy="-8" rx="14" ry="5" fill="' + COL.gold + '" opacity="0.20"/>';
    }
    return s;
  }

  /* fons — a small spring: the pool a stag looks into (R3) */
  function fons(o) {
    o = o || {};
    var s = '';
    s += '<ellipse cx="0" cy="-6" rx="46" ry="14" fill="' + COL.stoneD + '"/>';
    s += '<ellipse cx="0" cy="-8" rx="40" ry="11" fill="' + COL.water + '"/>';
    s += '<ellipse cx="-6" cy="-9" rx="26" ry="6" fill="' + hi(COL.water) + '" opacity="0.55"/>';
    s += '<path d="M-24,-6 q10,3 20,0 M4,-11 q10,3 20,0" stroke="' + COL.waterD +
      '" stroke-width="1.8" fill="none" opacity="0.8" stroke-linecap="round"/>';
    /* a few stones on the rim */
    s += '<ellipse cx="-40" cy="-4" rx="9" ry="5" fill="' + COL.stone + '"/>';
    s += '<ellipse cx="38" cy="-3" rx="8" ry="4.5" fill="' + COL.stone + '"/>';
    return s;
  }

  /* murusAquae — a standing wall of water. Trānsitus Maris Rubrī (L6.4)
     and the trānsitus probātiō need the sea to stand up on both sides;
     two of these (one flipped) make the corridor. Wonder, not menace:
     rounded crest, sunlit highlights, small fish caught inside. */
  function murusAquae(o) {
    o = o || {};
    var w = o.color || COL.water, d = sh(w), l = hi(w), s = '';
    var h = n(o.h, 150);
    s += '<path d="M-30,0 q-8,' + (-h * 0.6) + ' 2,' + (-h) + ' q26,' + (-h * 0.12) + ' 34,' + (h * 0.1) +
      ' q10,' + (h * 0.55) + ' 6,' + (h * 0.9) + ' Z" fill="' + w + '"/>';
    s += '<path d="M4,' + (-h) + ' q26,' + (-h * 0.12) + ' 34,' + (h * 0.1) +
      ' q10,' + (h * 0.55) + ' 6,' + (h * 0.9) + ' L6,0 Z" fill="' + d + '" opacity="0.45"/>';
    /* the crest curling over */
    s += '<path d="M2,' + (-h) + ' q22,-14 40,2 q-14,14 -34,6 Z" fill="' + l + '"/>';
    s += '<path d="M6,' + (-h - 2) + ' q18,-9 32,3" stroke="' + COL.cream + '" stroke-width="3" fill="none" opacity="0.85"/>';
    /* internal current lines */
    var i, y;
    for (i = 0; i < 4; i++) {
      y = -h * (0.75 - i * 0.18);
      s += '<path d="M-22,' + y.toFixed(0) + ' q22,-8 42,2" stroke="' + l +
        '" stroke-width="2.4" fill="none" opacity="0.55" stroke-linecap="round"/>';
    }
    /* foam at the foot */
    s += '<ellipse cx="4" cy="-4" rx="34" ry="8" fill="' + COL.cream + '" opacity="0.35"/>';
    /* dry sea bed running inward from the foot of the wall. Two walls (one
       flipped) lay their aprons toward each other and the corridor Israel
       walks through appears between them — without this the scene reads as
       two waterspouts standing in the sea. */
    if (o.floor) {
      /* length is tunable because the two walls must MEET: at wall spacing
         d and scale k the apron has to reach at least d/(2k) inward. */
      var f = (typeof o.floor === 'number') ? o.floor : 140;
      s += '<path d="M0,-6 q' + (f * 0.42) + ',-6 ' + f + ',-2 q4,8 0,14 q' + (-f * 0.58) + ',4 ' + (-f) + ',-2 Z" fill="' +
        COL.sand2 + '"/>';
      s += '<path d="M6,-2 q' + (f * 0.45) + ',-4 ' + (f - 8) + ',0" stroke="' + sh(COL.sand2) +
        '" stroke-width="2" fill="none" opacity="0.7"/>';
      s += '<ellipse cx="' + (f * 0.45) + '" cy="2" rx="7" ry="3" fill="' + sh(COL.sand2) + '" opacity="0.55"/>';
      s += '<ellipse cx="' + (f * 0.75) + '" cy="0" rx="5" ry="2.4" fill="' + sh(COL.sand2) + '" opacity="0.45"/>';
    }
    if (o.fish !== false) {
      s += '<g transform="translate(6,' + (-h * 0.55) + ') scale(0.42)">' + piscis({}) + '</g>';
      s += '<g transform="translate(-8,' + (-h * 0.3) + ') scale(0.3)">' + piscis({ color: '#8fb3a0' }) + '</g>';
    }
    return s;
  }

  function piscis(o) {
    o = o || {};
    var c = o.color || '#6f9fb5', s = '';
    s += '<path d="M-26,-14 q16,-12 34,0 q-16,12 -34,0 Z" fill="' + c + '"/>';
    s += '<path d="M-26,-14 q16,12 34,0 L-26,-14 Z" fill="' + sh(c) + '" opacity="0.4"/>';
    s += '<path d="M-26,-14 l-12,-8 l3,8 l-3,8 Z" fill="' + sh(c) + '"/>';
    s += '<path d="M-6,-19 q4,-7 10,-5 q-2,5 -10,5 Z" fill="' + hi(c) + '"/>';
    s += '<circle cx="4" cy="-15" r="1.9" fill="' + COL.ink + '"/>';
    s += '<path d="M-4,-20 q2,10 0,12" stroke="' + sh(c) + '" stroke-width="1.4" fill="none" opacity="0.7"/>';
    return s;
  }

  function columna(o) {
    o = o || {};
    var st = o.color || COL.stone, s = '', i;
    s += '<rect x="-16" y="-8" width="32" height="8" fill="' + st + '"/>';
    s += '<rect x="-12" y="-96" width="24" height="88" fill="' + hi(st) + '"/>';
    for (i = 0; i < 4; i++) {
      s += '<path d="M' + (-8 + i * 5.5) + ',-94 L' + (-8 + i * 5.5) + ',-10" stroke="' + sh(st) +
        '" stroke-width="1.4" opacity="0.35" fill="none"/>';
    }
    s += '<rect x="6" y="-96" width="6" height="88" fill="' + sh(st) + '" opacity="0.3"/>';
    /* Ionic-ish capital */
    s += '<rect x="-17" y="-106" width="34" height="10" rx="2" fill="' + st + '"/>';
    s += '<circle cx="-11" cy="-101" r="4" fill="' + hi(st) + '"/>';
    s += '<circle cx="11" cy="-101" r="4" fill="' + hi(st) + '"/>';
    if (o.broken) {
      s += '<path d="M-12,-96 l6,6 l6,-8 l7,7 l5,-5 l0,-6 l-24,0 Z" fill="' + COL.stone + '"/>';
    }
    return s;
  }

  /* ============================================================
     4b. ART2 — the gaps the three content tracks reported
     ------------------------------------------------------------
     Every entry below exists because a finished capitulum asked for
     it by name and had to be staged around its absence (see the
     MISSING ART sections of content/_ledger-*.md). Same contract as
     everything above: flat fills, one computed darker tone, light
     from the upper left, origin at the ground point, facing right.
     ============================================================ */

  /* ---- catena: the collar and its chain ----
     The hinge of Lupus et Canis (f36): the wolf sees the mark of the
     collar and walks away. There was no collar, chain or neck-band in
     the library, and an `umbra` ellipse laid on the dog's throat landed
     on its CHEEK and read as a wound, because `canis` has no neck.
     Two forms out of one actor, because they are one object:
       default        collar + hanging chain + links trailing on the
                      ground — the standalone prop for a vocabulary card;
       { collar:true} the COMPACT form: the band alone with two links on
                      its ring, drawn AROUND the origin instead of above
                      it, so a scene item can be dropped straight onto a
                      quadruped's throat (canis head centre ≈ x27,y-42 at
                      s=1, so { t:'catena', collar:true } at that point,
                      scaled with the dog, sits where a collar sits).
     The band is a flat ellipse ring seen slightly from above — the angle
     at which it reads as "around something" and not as a stripe. */
  function chainLink(x, y, rx, ry, rot, col, w) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry +
      '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2.6) +
      '" transform="rotate(' + rot + ' ' + x + ' ' + y + ')"/>';
  }

  function collarBand(cy) {
    var lea = COL.umber, s = '';
    s += '<ellipse cx="0" cy="' + cy + '" rx="15" ry="6" fill="none" stroke="' + lea + '" stroke-width="6"/>';
    /* lit top edge, shaded lower edge: the two-tone rule, on a ring */
    s += '<path d="M-15,' + cy + ' a15,6 0 0 1 30,0" fill="none" stroke="' + hi(lea) +
      '" stroke-width="2" opacity="0.65"/>';
    s += '<path d="M15,' + cy + ' a15,6 0 0 1 -30,0" fill="none" stroke="' + sh(lea) +
      '" stroke-width="2.4" opacity="0.7"/>';
    /* studs along the top of the band */
    s += '<circle cx="-9" cy="' + (cy - 4.8) + '" r="1.6" fill="' + COL.bronze + '"/>';
    s += '<circle cx="0" cy="' + (cy - 6) + '" r="1.6" fill="' + COL.bronze + '"/>';
    s += '<circle cx="9" cy="' + (cy - 4.8) + '" r="1.6" fill="' + COL.bronze + '"/>';
    /* the ring the chain hangs from, at the front of the band */
    s += '<circle cx="0" cy="' + (cy + 7) + '" r="4.2" fill="none" stroke="' + COL.bronze + '" stroke-width="2.4"/>';
    return s;
  }

  function catena(o) {
    o = o || {};
    var iron = o.color || COL.iron, s = '', i, y;
    if (o.collar) {
      s += chainLink(0, 15, 3.2, 5.4, 0, iron);
      s += chainLink(0, 22, 5.4, 3.2, 0, iron);
      s += collarBand(0);
      /* `tilt` (degrees, clamped to ±30) leans the band with the animal's
         neck. A scene item can scale and flip an actor but cannot rotate
         it, and a dead-level band on a dog that has no neck reads as a ring
         lying on its back — this is the one option that fixes that. */
      var t = n(o.tilt, 0);
      if (t < -30) { t = -30; }
      if (t > 30) { t = 30; }
      return t ? '<g transform="rotate(' + t + ')">' + s + '</g>' : s;
    }
    /* the chain hanging from the ring */
    for (i = 0; i < 6; i++) {
      y = -48 + i * 8;
      s += (i % 2) ? chainLink(0, y, 5.4, 3.2, 0, iron) : chainLink(0, y, 3.2, 5.6, 0, iron);
    }
    /* the last links lie flat and trail away to the right: that is what
       says "chain" rather than "necklace hanging in the air" */
    s += chainLink(6, -5, 6, 3.4, -14, iron);
    s += chainLink(17, -3.5, 6, 3.4, -6, iron);
    s += chainLink(28, -3, 6, 3.4, 3, iron);
    s += collarBand(-62);
    return s;
  }

  /* ---- via: the road ----
     A FOREGROUND strip: widest at the reader's feet, converging to a
     point 48 units up. Placed at { x:200, y:238 } it runs off the bottom
     of the frame and gives a scene a road to walk out of; at y=210 it
     lies on the standing line and runs to the horizon. */
  function via(o) {
    o = o || {};
    var dirt = o.color || '#c6a066', d = sh(dirt), l = hi(dirt), s = '';
    var nx = 112, fx = 15, fy = -48, k = fx / nx;
    s += '<path d="M' + (-nx) + ',2 L' + (-fx) + ',' + fy + ' L' + fx + ',' + fy + ' L' + nx + ',2 Z" fill="' + dirt + '"/>';
    /* the right half is the shade side, as everywhere in this set */
    s += '<path d="M0,2 L0,' + fy + ' L' + fx + ',' + fy + ' L' + nx + ',2 Z" fill="' + d + '" opacity="0.16"/>';
    /* two wheel ruts. Drawn as WEDGES, not strokes: a stroke cannot taper,
       and a rut of constant width is what kills a perspective road. */
    function rut(x0, x1) {
      return '<path d="M' + x0 + ',2 L' + x1 + ',2 L' + (x1 * k).toFixed(1) + ',' + fy +
        ' L' + (x0 * k).toFixed(1) + ',' + fy + ' Z" fill="' + d + '" opacity="0.42"/>';
    }
    s += rut(-64, -46) + rut(46, 64);
    /* the grass crown between the ruts, that no wheel ever touches */
    if (o.herba !== false) {
      s += '<path d="M-15,2 L15,2 L' + (15 * k).toFixed(1) + ',' + fy + ' L' + (-15 * k).toFixed(1) + ',' + fy +
        ' Z" fill="' + COL.olive + '" opacity="0.28"/>';
      var tufts = [[-8, -4], [6, -12], [-4, -24], [3, -34]], i;
      for (i = 0; i < tufts.length; i++) {
        s += '<path d="M' + tufts[i][0] + ',' + tufts[i][1] + ' l-3,-5 M' + tufts[i][0] + ',' + tufts[i][1] +
          ' l1,-6 M' + tufts[i][0] + ',' + tufts[i][1] + ' l4,-4" stroke="' + COL.leafD +
          '" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.75"/>';
      }
    }
    /* verges: a darker lip, then grass tufts along both edges */
    s += '<path d="M' + (-nx) + ',2 L' + (-fx) + ',' + fy + '" stroke="' + d +
      '" stroke-width="2.4" fill="none" opacity="0.6"/>';
    s += '<path d="M' + nx + ',2 L' + fx + ',' + fy + '" stroke="' + d +
      '" stroke-width="2.4" fill="none" opacity="0.6"/>';
    var edges = [[-100, -2, 1], [-64, -18, 0.8], [-40, -32, 0.6], [96, -1, 1], [62, -18, 0.8], [38, -32, 0.6]], j, e;
    for (j = 0; j < edges.length; j++) {
      e = edges[j];
      s += '<g transform="translate(' + e[0] + ',' + e[1] + ') scale(' + e[2] + ')">' +
        '<path d="M0,0 q-2,-7 -6,-10 M0,0 q0,-8 2,-12 M0,0 q4,-6 8,-9" stroke="' + COL.leafD +
        '" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.85"/></g>';
    }
    /* a few stones, so the dirt has a surface */
    var st = [[-52, -6, 4], [-20, -20, 3], [26, -12, 3.4], [70, -4, 4.2], [8, -40, 2], [-78, -1, 3.4]], p;
    for (j = 0; j < st.length; j++) {
      p = st[j];
      s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + (p[2] * 0.5) +
        '" fill="' + l + '" opacity="0.7"/>';
    }
    return s;
  }

  /* ---- arcus: the bow in the clouds (Gn 9,13–16) ----
     Three soft bands, WARM: terracotta, gold and olive rather than the
     seven-colour spectrum, so the covenant sign sits in the Pompeiian
     palette instead of arriving from a different picture book. Springs
     from the ground line, so at { y:210 } its feet stand on the earth.
     { nubes:true } gives it the clouds Genesis puts it in. */
  function arcus(o) {
    o = o || {};
    var bands = [[88, COL.terra], [76, COL.gold], [64, COL.olive]], s = '', i, r;
    if (o.nubes) {
      /* the clouds carry a darker silhouette UNDERNEATH rather than a
         stroke on each ellipse — the ventus trick, for the same reason:
         white cloud on the cream sky has no edge otherwise. */
      var ec = '#c3bda9';
      s += '<g opacity="0.9">' +
        '<ellipse cx="-84" cy="-10" rx="32" ry="13" fill="' + ec + '"/>' +
        '<ellipse cx="-62" cy="-6" rx="22" ry="10" fill="' + ec + '"/>' +
        '<ellipse cx="84" cy="-12" rx="30" ry="12" fill="' + ec + '"/>' +
        '<ellipse cx="62" cy="-6" rx="20" ry="9" fill="' + ec + '"/>' +
        '<ellipse cx="-84" cy="-11" rx="30" ry="11" fill="' + COL.white + '"/>' +
        '<ellipse cx="-62" cy="-7" rx="20" ry="8" fill="' + COL.white + '"/>' +
        '<ellipse cx="84" cy="-13" rx="28" ry="10" fill="' + COL.white + '"/>' +
        '<ellipse cx="62" cy="-7" rx="18" ry="7" fill="' + mix(COL.white, 0, 0.07) + '"/>' +
        '</g>';
    }
    for (i = 0; i < bands.length; i++) {
      r = bands[i][0];
      s += '<path d="M' + (-r) + ',0 A' + r + ',' + r + ' 0 0 1 ' + r + ',0" fill="none" stroke="' +
        bands[i][1] + '" stroke-width="11" opacity="0.55" stroke-linecap="round"/>';
    }
    /* a pale inner edge: the light the bow is made of, not a fourth colour */
    s += '<path d="M-56,0 A56,56 0 0 1 56,0" fill="none" stroke="' + COL.cream +
      '" stroke-width="6" opacity="0.35" stroke-linecap="round"/>';
    return s;
  }

  /* ============ mūsica ============ */

  /* cithara — the small lyre: a shell sound box, two horns, a yoke and
     six strings. Deliberately the size of something a person can hold. */
  function cithara(o) {
    o = o || {};
    var w = o.color || COL.wood, d = sh(w), g = COL.gold, s = '', i, x;
    /* the arms rise from behind the shell */
    s += '<path d="M-15,-22 q-13,-14 -5,-40" stroke="' + w + '" stroke-width="5.5" fill="none" stroke-linecap="round"/>';
    s += '<path d="M15,-22 q13,-14 5,-40" stroke="' + d + '" stroke-width="5.5" fill="none" stroke-linecap="round"/>';
    /* the yoke across the top */
    s += '<path d="M-23,-62 L23,-62" stroke="' + w + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    s += '<path d="M-21,-63.5 L21,-63.5" stroke="' + hi(w) + '" stroke-width="1.6" opacity="0.7" fill="none"/>';
    s += '<circle cx="-23" cy="-62" r="3" fill="' + g + '"/>';
    s += '<circle cx="23" cy="-62" r="3" fill="' + sh(g) + '"/>';
    /* strings, from the yoke down to the bridge */
    for (i = 0; i < 6; i++) {
      x = -10 + i * 4;
      s += '<path d="M' + x + ',-60 L' + x + ',-20" stroke="' + COL.cream +
        '" stroke-width="1.2" opacity="0.9" fill="none"/>';
    }
    /* the shell: a tortoise back, its face a stretched soundboard */
    s += '<path d="M-21,-6 q-2,-24 21,-24 q23,0 21,24 q-21,9 -42,0 Z" fill="' + w + '"/>';
    s += '<path d="M0,-30 q23,0 21,24 q-10,4.5 -21,4.5 Z" fill="' + d + '" opacity="0.45"/>';
    s += '<ellipse cx="0" cy="-18" rx="15" ry="10" fill="' + COL.linen + '"/>';
    s += '<path d="M0,-28 a15,10 0 0 1 0,20 Z" fill="' + sh(COL.linen) + '" opacity="0.4"/>';
    s += '<circle cx="0" cy="-20" r="3.6" fill="' + COL.woodD + '"/>';
    /* bridge */
    s += '<path d="M-12,-20 L12,-20" stroke="' + g + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
    return s;
  }

  /* the two horns share their fittings — the cup at the lip and the
     flared bell are one object on both instruments, and only the tube
     between them is straight (tuba) or bent round (buccina). */
  function hornBell(x, y, rot, k, col) {
    var d = sh(col);
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ') scale(' + k + ')">' +
      '<path d="M0,-4.5 Q10,-13 17,-15 L17,15 Q10,13 0,4.5 Z" fill="' + col + '"/>' +
      '<path d="M0,0 Q9,4 17,15 L17,0 Z" fill="' + d + '" opacity="0.45"/>' +
      '<ellipse cx="17" cy="0" rx="3.6" ry="15" fill="' + d + '"/>' +
      '<ellipse cx="17" cy="0" rx="3.6" ry="15" fill="none" stroke="' + hi(col) + '" stroke-width="2"/>' +
      '</g>';
  }
  function hornMouth(x, y, rot, col) {
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ')">' +
      '<ellipse cx="0" cy="0" rx="2.6" ry="5" fill="' + hi(col) + '"/>' +
      '<path d="M2,-4.5 L6,-3.6 L6,3.6 L2,4.5 Z" fill="' + col + '"/></g>';
  }

  /* tuba — the long straight war-trumpet, mouthpiece low, bell raised */
  function tuba(o) {
    o = o || {};
    var b = o.color || COL.bronze, s = '';
    var rot = -36;
    /* the tube */
    s += '<path d="M-34,-8 L26,-52" stroke="' + b + '" stroke-width="7" stroke-linecap="round" fill="none"/>';
    s += '<path d="M-32,-10 L24,-51" stroke="' + hi(b) + '" stroke-width="2" opacity="0.7" fill="none"/>';
    /* reinforcing bands */
    s += '<path d="M-14,-23 l5,-7 M4,-36 l5,-7" stroke="' + sh(b) + '" stroke-width="7" stroke-linecap="butt" fill="none"/>';
    s += hornBell(26, -52, rot, 1, b);
    s += hornMouth(-34, -8, rot, sh(b));
    if (o.vexillum) {
      /* the little banner a Roman tuba hangs below the tube */
      s += '<path d="M-2,-29 L18,-44 L20,-32 L2,-19 Z" fill="' + COL.blood + '"/>';
      s += '<path d="M-2,-29 L18,-44 L19,-38 L0,-24 Z" fill="' + sh(COL.blood) + '" opacity="0.5"/>';
    }
    return s;
  }

  /* buccina — the curved horn. Same bell and same mouthpiece; the tube
     is a filled crescent, because a horn TAPERS and a stroke cannot. */
  function buccina(o) {
    o = o || {};
    var b = o.color || COL.bronze, s = '';
    /* The crescent: outer edge up the left, then the mouth of the tube,
       then the inner edge back down. The bell is set on the MIDPOINT of
       that mouth and rotated to its normal (-50°) — get the rotation
       wrong and a wedge of daylight opens between tube and bell. */
    s += '<path d="M-30,-4 Q-40,-40 -6,-60 L6,-50 Q-22,-32 -18,-4 Z" fill="' + b + '"/>';
    s += '<path d="M-30,-4 Q-34,-28 -18,-4 Z" fill="' + sh(b) + '" opacity="0.35"/>';
    s += '<path d="M-27,-10 Q-34,-38 -8,-54" stroke="' + hi(b) + '" stroke-width="2" fill="none" opacity="0.65"/>';
    /* the reinforcing band where the tube widens */
    s += '<path d="M-14,-49 L-8,-40" stroke="' + sh(b) + '" stroke-width="4.5" fill="none"/>';
    s += hornBell(0, -55, -50, 0.82, b);
    s += hornMouth(-24, -4, 90, sh(b));
    return s;
  }

  /* tympanum — the hand drum (Ex 15,20, Maria with the women).
     Held facing the reader: a wooden hoop, a stretched skin, the cords
     that tension it, and two pairs of bronze jingles in the rim. */
  function tympanum(o) {
    o = o || {};
    var w = o.color || COL.wood, head = COL.linen, s = '', i, a1, a2, dd;
    var cy = -26, r = 25, ri = r - 6;
    s += '<circle cx="0" cy="' + cy + '" r="' + r + '" fill="' + w + '"/>';
    s += '<path d="M0,' + (cy - r) + ' a' + r + ',' + r + ' 0 0 1 0,' + (2 * r) + ' Z" fill="' + sh(w) + '" opacity="0.45"/>';
    s += '<circle cx="0" cy="' + cy + '" r="' + ri + '" fill="' + head + '"/>';
    s += '<path d="M0,' + (cy - ri) + ' a' + ri + ',' + ri + ' 0 0 1 0,' + (2 * ri) + ' Z" fill="' + sh(head) + '" opacity="0.30"/>';
    s += '<circle cx="0" cy="' + cy + '" r="' + ri + '" fill="none" stroke="' + sh(head) + '" stroke-width="1.4"/>';
    s += '<path d="M-13,' + (cy - 11) + ' a17,17 0 0 1 13,-5" stroke="' + hi(head) +
      '" stroke-width="2.4" fill="none" opacity="0.8" stroke-linecap="round"/>';
    /* tension cords: a zigzag between the hoop and the skin */
    dd = '';
    for (i = 0; i <= 12; i++) {
      a1 = (i * 30) * Math.PI / 180;
      dd += (i ? 'L' : 'M') + (Math.cos(a1) * (i % 2 ? ri + 1 : r - 1.5)).toFixed(1) + ',' +
        (cy + Math.sin(a1) * (i % 2 ? ri + 1 : r - 1.5)).toFixed(1) + ' ';
    }
    s += '<path d="' + dd + '" stroke="' + COL.straw + '" stroke-width="1.6" fill="none" opacity="0.85"/>';
    /* jingles */
    for (i = 0; i < 2; i++) {
      a2 = (i ? 330 : 210) * Math.PI / 180;
      s += '<circle cx="' + (Math.cos(a2) * r).toFixed(1) + '" cy="' + (cy + Math.sin(a2) * r).toFixed(1) +
        '" r="4" fill="' + COL.bronze + '"/>';
      s += '<circle cx="' + (Math.cos(a2) * r).toFixed(1) + '" cy="' + (cy + Math.sin(a2) * r).toFixed(1) +
        '" r="1.6" fill="' + hi(COL.bronze) + '"/>';
    }
    return s;
  }

  /* ---- domus: a small house front, and the DOOR is the point ----
     Ex 12,7 needs doorposts and a lintel that can be marked, so the door
     is built as a frame (two posts + lintel) with a leaf inside it, and
     { signum:true } lays one short stroke on each post and one across the
     lintel — a mark, deliberately not a smear (DESIGN §8). */
  function domus(o) {
    o = o || {};
    var wall = o.color || COL.linen, d = sh(wall), roof = COL.terra, s = '';
    s += '<rect x="-52" y="-72" width="104" height="72" fill="' + wall + '"/>';
    s += '<rect x="6" y="-72" width="46" height="72" fill="' + d + '" opacity="0.28"/>';
    s += '<path d="M-62,-72 L0,-97 L62,-72 Z" fill="' + roof + '"/>';
    s += '<path d="M0,-97 L62,-72 L0,-72 Z" fill="' + sh(roof) + '" opacity="0.42"/>';
    s += '<path d="M-64,-72 L64,-72" stroke="' + sh(roof) + '" stroke-width="4" stroke-linecap="round"/>';
    s += '<path d="M-40,-84 L-34,-78 M-20,-90 L-14,-84 M20,-90 L26,-84" stroke="' + sh(roof) +
      '" stroke-width="1.6" opacity="0.5" fill="none"/>';
    /* window, on the lit side */
    s += '<rect x="-42" y="-58" width="22" height="20" rx="2" fill="' + COL.ink + '" opacity="0.7"/>';
    s += '<path d="M-31,-58 L-31,-38 M-42,-48 L-20,-48" stroke="' + COL.wood + '" stroke-width="2.4"/>';
    /* the door: frame first, then the leaf inside it */
    s += '<rect x="-20" y="-52" width="40" height="52" fill="' + COL.wood + '"/>';
    s += '<rect x="13" y="-52" width="7" height="52" fill="' + sh(COL.wood) + '" opacity="0.5"/>';
    s += '<rect x="-13" y="-45" width="26" height="45" fill="' + COL.woodD + '"/>';
    s += '<path d="M0,-45 L0,0" stroke="' + sh(COL.woodD) + '" stroke-width="1.8"/>';
    s += '<path d="M-7,-45 L-7,0 M7,-45 L7,0" stroke="' + sh(COL.woodD) + '" stroke-width="1.2" opacity="0.7"/>';
    s += '<circle cx="9" cy="-22" r="2.6" fill="' + COL.bronze + '"/>';
    if (o.signum) {
      var m = COL.blood;
      s += '<path d="M-16.5,-44 L-16.5,-20" stroke="' + m + '" stroke-width="4" stroke-linecap="round" opacity="0.85"/>';
      s += '<path d="M16.5,-44 L16.5,-20" stroke="' + m + '" stroke-width="4" stroke-linecap="round" opacity="0.85"/>';
      s += '<path d="M-13,-48.5 L13,-48.5" stroke="' + m + '" stroke-width="4" stroke-linecap="round" opacity="0.85"/>';
    }
    /* the step */
    s += '<rect x="-26" y="-4" width="52" height="4" rx="1.5" fill="' + COL.stone + '"/>';
    s += '<rect x="0" y="-4" width="26" height="4" fill="' + sh(COL.stone) + '" opacity="0.4"/>';
    return s;
  }

  /* ---- manna: white grains on the ground (Ex 16,14.31) ----
     "quasi semen coriandri album" — small, round, white, LYING THERE.
     The pale patch under them is what keeps them from floating. */
  function manna(o) {
    o = o || {};
    var count = n(o.n, 15), g = COL.white, edge = mix(g, 0, 0.34), s = '', i, p;
    if (count < 4) { count = 4; }
    if (count > 22) { count = 22; }
    /* the patch of ground, in sand rather than cream: on the desert and on
       the gallery's cream tile a cream patch is invisible, and white grains
       with nothing under them float like soap bubbles. */
    s += '<ellipse cx="0" cy="-4" rx="46" ry="11" fill="' + COL.sand2 + '" opacity="0.55"/>';
    s += '<ellipse cx="0" cy="-4" rx="46" ry="11" fill="none" stroke="' + sh(COL.sand2) +
      '" stroke-width="1.4" opacity="0.4"/>';
    var pts = [[-38, -4, 3], [-27, -7, 2.4], [-19, -2, 3.4], [-10, -8, 2.6], [-2, -3, 3.2],
      [6, -9, 2.4], [15, -4, 3], [24, -8, 2.6], [33, -3, 3.2], [41, -6, 2.2],
      [-33, -1, 2.2], [-6, -1, 2.6], [19, -1, 2.4], [30, -12, 2], [-15, -12, 2.2],
      [9, -14, 2], [-24, -12, 1.8], [37, -13, 1.9], [0, -17, 1.8], [-41, -10, 1.8],
      [26, -18, 1.7], [-30, -18, 1.7]];
    for (i = 0; i < count; i++) {
      p = pts[i];
      /* each grain gets the small shadow that puts it ON the ground */
      s += '<ellipse cx="' + (p[0] + p[2] * 0.35) + '" cy="' + (p[1] + p[2] * 0.5) + '" rx="' + p[2] +
        '" ry="' + (p[2] * 0.5) + '" fill="' + sh(COL.sand2) + '" opacity="0.45"/>';
      s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + (p[2] * 0.74) +
        '" fill="' + g + '" stroke="' + edge + '" stroke-width="1.1"/>';
      s += '<ellipse cx="' + (p[0] - p[2] * 0.3) + '" cy="' + (p[1] - p[2] * 0.28) + '" rx="' + (p[2] * 0.3) +
        '" ry="' + (p[2] * 0.22) + '" fill="#ffffff"/>';
    }
    return s;
  }

  /* ---- the pig, and her piglets ----
     `porci` are drawn AT HER FEET and inside her own footprint on
     purpose: a line of piglets trailing off to the left would force the
     sprite bounds wide and shrink the sow in every vocabulary tile. */
  function susPorci(fur, dark, o, cfg) {
    if (!o || !o.porci) { return ''; }
    var count = o.porci > 3 ? 3 : o.porci, s = '', i;
    var slots = [[-18, 0.40], [4, 0.40], [24, 0.36]];
    for (i = 0; i < count; i++) {
      s += '<g transform="translate(' + slots[i][0] + ',0) scale(' + slots[i][1] + ')">' +
        quad(cfg, { color: fur, edge: o.edge, porci: 0 }) + '</g>';
    }
    return s;
  }

  function sus(o) {
    o = o || {};
    var c = {}, k;
    for (k in o) { if (own(o, k)) { c[k] = o[k]; } }
    if (o.alba) {
      /* the white sow of Aen. 8,43–45, and the one animal in the table
         that needs an outline to exist against the cream sky */
      c.color = o.color || '#f0e7d8';
      c.edge = true;
    }
    return quad(QUADS.sus, c);
  }

  /* ---- the Magi's two other gifts ----
     Both must be readable as NOT the amphora: tūs is a cubic casket seen
     from a low three-quarter angle, myrrha a squat stoppered jar with no
     handles at all. */
  function tus(o) {
    o = o || {};
    var box = o.color || COL.wood, d = sh(box), g = COL.gold, s = '';
    var lift = o.fumus ? 4 : 0;              /* the lid stands ajar for the smoke */
    /* body */
    s += '<path d="M-18,0 L18,0 L18,-20 L-18,-20 Z" fill="' + box + '"/>';
    s += '<path d="M18,0 L26,-6 L26,-26 L18,-20 Z" fill="' + d + '"/>';
    s += '<path d="M-18,-20 L-10,-26 L26,-26 L18,-20 Z" fill="' + COL.ink + '" opacity="0.55"/>';
    /* lid */
    s += '<g transform="translate(0,' + (-lift) + ')">';
    s += '<path d="M-20,-20 L20,-20 L20,-27 L-20,-27 Z" fill="' + hi(box) + '"/>';
    s += '<path d="M20,-20 L28,-26 L28,-33 L20,-27 Z" fill="' + d + '"/>';
    s += '<path d="M-20,-27 L-12,-33 L28,-33 L20,-27 Z" fill="' + mix(box, 255, 0.32) + '"/>';
    s += '<circle cx="4" cy="-30" r="2.6" fill="' + g + '"/>';
    s += '</g>';
    /* gold fittings */
    s += '<path d="M-18,-11 L18,-11" stroke="' + g + '" stroke-width="3" fill="none"/>';
    s += '<path d="M18,-11 L26,-17" stroke="' + sh(g) + '" stroke-width="3" fill="none"/>';
    s += '<path d="M-2,-20 L-2,0 L2,0 L2,-20 Z" fill="' + g + '"/>';
    s += '<circle cx="0" cy="-11" r="3.4" fill="' + hi(g) + '"/>';
    if (o.fumus) {
      s += '<path d="M0,-34 q-9,-11 2,-20 q11,-9 2,-19" stroke="' + COL.grey +
        '" stroke-width="3.4" fill="none" opacity="0.40" stroke-linecap="round"/>';
      s += '<path d="M8,-34 q6,-9 0,-16" stroke="' + COL.grey +
        '" stroke-width="2.4" fill="none" opacity="0.28" stroke-linecap="round"/>';
      s += '<circle cx="-2" cy="-76" r="2" fill="' + COL.gold + '" opacity="0.5"/>';
    }
    return s;
  }

  function myrrha(o) {
    o = o || {};
    var st = o.color || '#e2d6c0', d = sh(st), g = COL.gold, s = '';
    /* the round belly of an alabastron */
    s += '<path d="M-17,-16 q0,-18 17,-18 q17,0 17,18 q0,14 -17,14 q-17,0 -17,-14 Z" fill="' + st + '"/>';
    s += '<path d="M0,-34 q17,0 17,18 q0,14 -17,14 Z" fill="' + d + '" opacity="0.42"/>';
    s += '<ellipse cx="-6" cy="-24" rx="4.5" ry="6" fill="' + hi(st) + '" opacity="0.75"/>';
    /* neck and lip */
    s += '<path d="M-6,-33 L6,-33 L5,-45 L-5,-45 Z" fill="' + st + '"/>';
    s += '<path d="M0,-33 L6,-33 L5,-45 L0,-45 Z" fill="' + d + '" opacity="0.45"/>';
    s += '<ellipse cx="0" cy="-45" rx="8" ry="3" fill="' + hi(st) + '"/>';
    /* the stopper, and one gold band on the shoulder */
    s += '<path d="M-5,-45 L5,-45 L3.5,-52 L-3.5,-52 Z" fill="' + g + '"/>';
    s += '<circle cx="0" cy="-53" r="3" fill="' + hi(g) + '"/>';
    s += '<path d="M-14,-27 q14,7 28,0" stroke="' + g + '" stroke-width="2.6" fill="none" opacity="0.9"/>';
    return s;
  }

  /* ---- the harpy's ragged wings ----
     The only thing added to the eagle's silhouette besides the colour and
     the missing face: torn feather points along the wing edges. */
  function harpyiaRags(col, dark, o, cfg) {
    var pose = (o && o.pose) || 'stand', s = '', i, t, x, y;
    var by = cfg.bodyY, hr = cfg.headR;
    /* a torn feather point, hanging OFF a wing edge: the two corners sit
       ON the edge and only the point leaves it, so nothing floats free */
    function rag(px, py, dx, dy, fill) {
      return '<path d="M' + px.toFixed(1) + ',' + py.toFixed(1) +
        ' l' + dx.toFixed(1) + ',' + dy.toFixed(1) +
        ' l' + (-dx * 0.35).toFixed(1) + ',' + (-dy * 1.5).toFixed(1) + ' Z" fill="' + fill + '"/>';
    }
    if (pose === 'fly') {
      /* the near wing's outer edge runs (40,by-24) -> (10,by+6) */
      for (i = 0; i < 4; i++) {
        t = 0.12 + i * 0.26;
        x = 40 - t * 30; y = (by - 24) + t * 30;
        s += rag(x, y, 7, 7, cfg.light);
      }
      /* the far wing's edge runs (-38,by-28) -> (-12,by+2) */
      for (i = 0; i < 3; i++) {
        t = 0.15 + i * 0.32;
        x = -38 + t * 26; y = (by - 28) + t * 30;
        s += rag(x, y, -8, 6, dark);
      }
    } else {
      /* folded wing: the edge lies along the flank, y ≈ by + ry*0.2 */
      for (i = 0; i < 4; i++) {
        s += rag(-12 + i * 8, by + 3 + i * 0.8, 6, 6, cfg.light);
      }
    }
    /* THE HOOD. A faceless head is a ball unless something shapes it, so
       the front half of the skull is in shadow and that shadow runs out
       into the wedge where a beak would be. The silhouette of a raptor is
       there; the eye, the brow and the hooked tip are not. */
    s += '<g transform="translate(' + cfg.headX + ',' + cfg.headY + ')">' +
      '<path d="M0,' + (-hr) + ' A' + hr + ',' + hr + ' 0 0 1 0,' + hr +
      ' Q' + (hr * 0.65) + ',' + (hr * 0.62) + ' ' + (hr * 1.45) + ',' + (hr * 0.18) +
      ' Q' + (hr * 0.65) + ',' + (-hr * 0.4) + ' 0,' + (-hr) + ' Z" fill="' + dark + '"/>' +
      '</g>';
    return s;
  }

  /* ---- the quail's markings ---- */
  function coturnixMarks(col, dark, o, cfg) {
    var s = '', i, p;
    var flecks = [[-9, -19], [-3, -13], [3, -20], [8, -14], [-6, -10], [1, -23], [10, -19], [-12, -14]];
    for (i = 0; i < flecks.length; i++) {
      p = flecks[i];
      s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="2.4" ry="1.3" fill="' + dark +
        '" opacity="0.75" transform="rotate(' + (i % 2 ? 18 : -14) + ' ' + p[0] + ' ' + p[1] + ')"/>';
    }
    s += '<path d="M-11,-21 q7,-3 13,-1 M-8,-16 q7,-3 12,-1" stroke="' + COL.cream +
      '" stroke-width="1.4" fill="none" opacity="0.65" stroke-linecap="round"/>';
    return s;
  }

  /* ============================================================
     4c. TRACK MASCOTS
     js/map.js walks the player's avatar across the board with
     Scenes.mascot(52, avatar) — a fox head in a -30..30 box. These two
     are the same object for the other two tracks: same size, same
     friendly front-facing head language, so map.js can swap in
     Scenes.sprite('columbaMascot', {}, 52) and change nothing else.
     They are drawn CENTRED ON THE ORIGIN rather than on a ground
     point, which is exactly what makes them interchangeable with
     mascot() — and why they are mascots and not scene actors.
     ============================================================ */
  function columbaMascot() {
    var w = COL.white, d = '#d8cdb8', s = '';
    /* the bust: shoulders and a folded wing */
    s += '<path d="M-24,24 q4,-16 24,-16 q20,0 24,16 q-24,7 -48,0 Z" fill="' + w + '"/>';
    s += '<path d="M0,8 q20,0 24,16 q-12,3.5 -24,3.5 Z" fill="' + d + '" opacity="0.55"/>';
    s += '<path d="M-20,18 q10,-8 20,-4 q-8,8 -20,4 Z" fill="' + d + '" opacity="0.7"/>';
    /* head */
    s += '<circle cx="0" cy="-2" r="17" fill="' + w + '"/>';
    s += '<path d="M0,-19 a17,17 0 0 1 0,34 Z" fill="' + d + '" opacity="0.45"/>';
    s += '<path d="M14,0 l14,4 l-14,5 Z" fill="#d98a54"/>';
    s += '<path d="M14,4 l14,0 l-14,5 Z" fill="' + mix('#d98a54', 0, 0.22) + '"/>';
    s += '<circle cx="-7" cy="-5" r="2.8" fill="' + COL.ink + '"/>';
    s += '<circle cx="7" cy="-5" r="2.8" fill="' + COL.ink + '"/>';
    s += '<circle cx="-6" cy="-6" r="0.9" fill="#ffffff"/>';
    s += '<circle cx="8" cy="-6" r="0.9" fill="#ffffff"/>';
    /* the crown feather that keeps it from reading as an egg */
    s += '<path d="M-4,-18 q-3,-8 3,-11 q3,6 1,11 Z" fill="' + d + '"/>';
    return s;
  }

  function navisMascot() {
    var hull = COL.wood, d = sh(hull), s = '';
    /* mast, yard and sail */
    s += '<path d="M0,6 L0,-26" stroke="' + hull + '" stroke-width="4" stroke-linecap="round" fill="none"/>';
    s += '<path d="M-16,-24 L16,-24" stroke="' + COL.woodD + '" stroke-width="2.6" stroke-linecap="round"/>';
    s += '<path d="M-15,-23 Q0,-16 15,-23 L12,2 Q0,7 -12,2 Z" fill="' + COL.cream + '"/>';
    s += '<path d="M1,-19 Q9,-20 15,-23 L12,2 Q6,4 1,4 Z" fill="' + sh(COL.cream) + '" opacity="0.45"/>';
    s += '<path d="M-13,-9 Q0,-3 13,-9" stroke="' + COL.terra + '" stroke-width="4" fill="none" opacity="0.85"/>';
    s += '<path d="M0,-26 l10,3 l-10,4 Z" fill="' + COL.blood + '"/>';
    /* hull */
    s += '<path d="M-24,6 L24,6 Q20,20 8,21 L-8,21 Q-20,20 -24,6 Z" fill="' + hull + '"/>';
    s += '<path d="M0,6 L24,6 Q20,20 8,21 L0,21 Z" fill="' + d + '" opacity="0.45"/>';
    s += '<path d="M-24,9 L24,9" stroke="' + d + '" stroke-width="2.2"/>';
    s += '<ellipse cx="15" cy="13" rx="4" ry="3" fill="' + COL.cream + '"/>';
    s += '<circle cx="15.5" cy="13" r="1.5" fill="' + COL.ink + '"/>';
    /* two waves, so it is sailing and not shelved */
    s += '<path d="M-27,22 q7,-5 13,0 q7,5 14,0 q7,-5 13,0" stroke="' + COL.water +
      '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    return s;
  }

  /* ============================================================
     5. registration — bounds are measured from the geometry above
     ============================================================ */
  function reg(name, fn, b) { Scenes.register(name, fn, b); }

  /* animals from the quadruped core */
  function quadActor(key) {
    var cfg = QUADS[key];
    return function (o) { return quad(cfg, o); };
  }
  /* Bounds are MEASURED, never guessed: each actor was rendered into an
     oversized viewBox for every pose and option it supports, the getBBox()
     results unioned, and 3 units added for stroke half-widths. That is why
     e.g. leo is 137 wide — the 'lie' and 'eat' poses reach further than
     'stand' does, and sprite() gets exactly one box per name. */
  var QUAD_BOUNDS = {
    canis:   { x: -33, y: -56,  w: 90,  h: 70 },
    feles:   { x: -44, y: -52,  w: 94,  h: 63 },
    leo:     { x: -54, y: -84,  w: 137, h: 109 },
    ursus:   { x: -42, y: -71,  w: 113, h: 85 },
    asinus:  { x: -48, y: -87,  w: 125, h: 106 },
    equus:   { x: -47, y: -93,  w: 128, h: 115 },
    bos:     { x: -55, y: -78,  w: 132, h: 98 },
    cervus:  { x: -36, y: -102, w: 113, h: 124 },
    hircus:  { x: -33, y: -77,  w: 102, h: 94 },
    haedus:  { x: -27, y: -55,  w: 79,  h: 68 },
    camelus: { x: -54, y: -95,  w: 127, h: 121 },
    lepus:   { x: -27, y: -55,  w: 79,  h: 65 },
    mus:     { x: -38, y: -30,  w: 76,  h: 37 },
    sus:     { x: -37, y: -46,  w: 93,  h: 58 }
  };
  var qk;
  for (qk in QUADS) {
    if (own(QUADS, qk)) { reg(qk, quadActor(qk), QUAD_BOUNDS[qk]); }
  }
  /* sus goes through its own wrapper (the `alba` variant needs an outline
     the plain table row cannot express), so it overwrites the generic
     registration the loop just made. */
  reg('sus', sus, QUAD_BOUNDS.sus);

  /* birds */
  function birdActor(key) {
    var cfg = BIRDS[key];
    return function (o) { return bird(cfg, o); };
  }
  var BIRD_BOUNDS = {
    aquila:  { x: -41, y: -61,  w: 84, h: 71 },
    columba: { x: -41, y: -49,  w: 94, h: 57 },
    gallina: { x: -41, y: -52,  w: 84, h: 64 },
    pavo:    { x: -51, y: -121, w: 94, h: 129 },
    grus:    { x: -41, y: -86,  w: 88, h: 100 },
    ciconia: { x: -41, y: -84,  w: 88, h: 98 },
    coturnix: { x: -41, y: -46, w: 84, h: 53 },
    harpyia: { x: -46, y: -62,  w: 92, h: 67 }
  };
  var bk;
  for (bk in BIRDS) {
    if (own(BIRDS, bk)) { reg(bk, birdActor(bk), BIRD_BOUNDS[bk]); }
  }

  /* insects */
  var INSECTS = {
    formica: { col: '#8a4b2a', len: 26, h: 5, y: -9 },
    cicada:  { col: '#7a6a4a', len: 26, h: 6, y: -10, wings: true },
    locusta: { col: '#8f9a45', len: 26, h: 6, y: -12, wings: true, jumper: true }
  };
  function insectActor(key) {
    var cfg = INSECTS[key];
    return function (o) { return insect(cfg, o); };
  }
  reg('formica', insectActor('formica'), { x: -27, y: -27, w: 58, h: 30 });
  reg('cicada', insectActor('cicada'), { x: -27, y: -28, w: 58, h: 31 });
  reg('locusta', insectActor('locusta'), { x: -32, y: -30, w: 63, h: 33 });

  /* objects */
  reg('ark', ark, { x: -80, y: -130, w: 159, h: 147 });
  reg('tent', tent, { x: -67, y: -75, w: 134, h: 78 });
  reg('altar', altar, { x: -33, y: -103, w: 66, h: 106 });
  reg('tabulae', tabulae, { x: -41, y: -57, w: 81, h: 61 });
  reg('crown', crownProp, { x: -27, y: -33, w: 54, h: 36 });
  reg('well', well, { x: -33, y: -67, w: 66, h: 70 });
  reg('serpent', serpent, { x: -35, y: -63, w: 89, h: 67 });
  reg('star', star, { x: -53, y: -59, w: 82, h: 76 });
  reg('fire', fire, { x: -45, y: -69, w: 90, h: 76 });
  reg('cityWall', cityWall, { x: -107, y: -91, w: 214, h: 94 });
  reg('mountain', mountain, { x: -83, y: -108, w: 166, h: 111 });
  reg('ship', ship, { x: -73, y: -99, w: 158, h: 116 });
  reg('woodenHorse', woodenHorse, { x: -59, y: -122, w: 122, h: 132 });
  reg('swordShield', swordShield, { x: -37, y: -87, w: 76, h: 84 });
  reg('amphora', amphora, { x: -26, y: -87, w: 51, h: 90 });
  reg('temple', temple, { x: -69, y: -131, w: 138, h: 134 });
  reg('throne', throne, { x: -38, y: -95, w: 76, h: 98 });
  reg('palmTree', palmTree, { x: -63, y: -131, w: 100, h: 134 });
  reg('fiscella', fiscella, { x: -50, y: -69, w: 106, h: 74 });
  reg('scala', scala, { x: -30, y: -171, w: 66, h: 174 });
  reg('arcaFoederis', arcaFoederis, { x: -65, y: -69, w: 129, h: 78 });
  reg('grapevine', grapevine, { x: -51, y: -67, w: 109, h: 70 });
  reg('grex', grex, { x: -44, y: -40, w: 89, h: 42 });
  reg('testudo', testudo, { x: -36, y: -33, w: 81, h: 36 });
  reg('rana', rana, { x: -44, y: -48, w: 88, h: 57 });
  reg('quercus', quercus, { x: -65, y: -149, w: 128, h: 152 });
  reg('harundo', harundo, { x: -45, y: -91, w: 102, h: 96 });
  reg('urna', urna, { x: -22, y: -61, w: 44, h: 64 });
  reg('umbra', umbra, { x: -49, y: -13, w: 98, h: 26 });
  reg('sol', sol, { x: -41, y: -71, w: 82, h: 82 });
  reg('ventus', ventus, { x: -53, y: -64, w: 118, h: 48 });
  reg('ovumAureum', ovumAureum, { x: -29, y: -40, w: 58, h: 44 });
  reg('praesepe', praesepe, { x: -35, y: -51, w: 70, h: 52 });
  reg('mensa', mensa, { x: -43, y: -39, w: 86, h: 41 });
  reg('patina', patina, { x: -29, y: -17, w: 58, h: 22 });
  reg('rete', rete, { x: -75, y: -55, w: 150, h: 56 });
  reg('truncus', truncus, { x: -49, y: -24, w: 96, h: 27 });
  reg('fascis', fascis, { x: -32, y: -45, w: 49, h: 46 });
  reg('frumentum', frumentum, { x: -26, y: -71, w: 52, h: 75 });
  reg('pellis', pellis, { x: -35, y: -73, w: 74, h: 82 });
  reg('turris', turris, { x: -41, y: -137, w: 82, h: 140 });
  reg('pyramis', pyramis, { x: -73, y: -73, w: 150, h: 76 });
  reg('rubusArdens', rubusArdens, { x: -37, y: -68, w: 74, h: 70 });
  reg('vitulusAureus', vitulusAureus, { x: -33, y: -63, w: 67, h: 66 });
  reg('ramusAureus', ramusAureus, { x: -29, y: -64, w: 62, h: 67 });
  reg('arborFructus', arborFructus, { x: -51, y: -121, w: 102, h: 124 });
  reg('crux', crux, { x: -49, y: -105, w: 98, h: 108 });
  reg('sepulcrum', sepulcrum, { x: -60, y: -60, w: 114, h: 64 });
  reg('fons', fons, { x: -52, y: -23, w: 101, h: 34 });
  reg('piscis', piscis, { x: -41, y: -28, w: 52, h: 25 });
  reg('murusAquae', murusAquae, { x: -37, y: -160, w: 85, h: 167 });
  /* measured like the rest; arborNuda deliberately matches the `tree`
     bounds in scenes.js so the seasonal pair crops identically */
  reg('arborNuda', arborNuda, { x: -62, y: -172, w: 124, h: 180 });
  reg('nidus', nidus, { x: -43, y: -31, w: 86, h: 37 });
  reg('columna', columna, { x: -20, y: -109, w: 40, h: 112 });

  /* ---- ART2 ----
     Bounds measured the same way as everything above: each actor was
     rendered into an oversized viewBox for EVERY option it supports
     ({collar}, {porci}, {fumus}, {signum}, {nubes}, {vexillum}, and each
     pose for the two new birds), the getBBox() results unioned, and 3
     units added for stroke half-widths. */
  reg('catena', catena, { x: -29, y: -73, w: 66, h: 105 });
  reg('via', via, { x: -115, y: -51, w: 230, h: 56 });
  reg('arcus', arcus, { x: -119, y: -91, w: 236, h: 98 });
  reg('cithara', cithara, { x: -29, y: -68, w: 58, h: 70 });
  reg('tuba', tuba, { x: -43, y: -80, w: 97, h: 80 });
  reg('buccina', buccina, { x: -36, y: -79, w: 59, h: 84 });
  reg('tympanum', tympanum, { x: -29, y: -54, w: 58, h: 56 });
  reg('domus', domus, { x: -67, y: -100, w: 134, h: 103 });
  reg('manna', manna, { x: -49, y: -23, w: 98, h: 33 });
  reg('tus', tus, { x: -23, y: -81, w: 54, h: 84 });
  reg('myrrha', myrrha, { x: -20, y: -59, w: 40, h: 60 });
  /* The two mascots are the ONE deliberate exception to tight bounds:
     their box is Scenes.mascot's own -30..30 square (the artwork sits
     inside it), because the whole point is that map.js can draw a dove or
     a ship at the same 52px as the fox head and have it come out the same
     size on the board. A tight box would render them 8% larger. */
  reg('columbaMascot', columbaMascot, { x: -30, y: -30, w: 60, h: 60 });
  reg('navisMascot', navisMascot, { x: -30, y: -30, w: 60, h: 60 });
}());
