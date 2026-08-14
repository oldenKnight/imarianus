/* ============================================================
   backgrounds2.js — the twelve extra scene backgrounds
   ------------------------------------------------------------
   Same contract as bgForest / bgRiver / bgPlain in js/scenes.js:
   a drawFn() returning body markup that covers the WHOLE 400x240
   scene rectangle, with the ground line at y=210 so every actor
   registered anywhere in this art set stands correctly on it.

   Backgrounds are deliberately quiet: low contrast, few shapes, no
   detail near the middle band where actors and speech bubbles live.
   They set place and mood; the actors carry the meaning (DESIGN §1).
   ============================================================ */
(function () {
  'use strict';
  if (!window.Scenes || !Scenes.registerBg) { return; }

  var W = 400, H = 240, GROUND = 210;

  var COL = {
    ink:     '#3a2417',
    sky:     '#f6e8c9',
    sky2:    '#f0d9a8',
    sand:    '#e0c184',
    sandD:   '#c8a463',
    ground:  '#b98a4e',
    grass:   '#8d9c52',
    stone:   '#c9b89a',
    stoneD:  '#9c8a6a',
    water:   '#7fa8c9',
    waterD:  '#5d8db3',
    deep:    '#3f6c92',
    storm:   '#4a5a68'
  };
  /* extra keys, kept out of the literal above so each background can be
     read next to the two or three colours it actually uses */
  COL.stormSky = '#6b7684';
  COL.night = '#1e2540';
  COL.night2 = '#2c3555';
  COL.wall = '#d8c9a8';
  COL.roof = '#b5573a';
  COL.leaf = '#6f8f3f';
  COL.leafD = '#5d7a33';
  COL.wood = '#8a5a30';
  COL.gold = '#e0a93e';
  COL.flame = '#e8873a';
  COL.cream = '#f4e7cd';

  /* ---------- colour maths (mirrors actors-*.js) ---------- */
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

  function sky(top, bottom) {
    return '<rect width="' + W + '" height="' + H + '" fill="' + top + '"/>' +
      '<rect y="' + (H * 0.32) + '" width="' + W + '" height="' + (H * 0.68) + '" fill="' + bottom + '" opacity="0.55"/>';
  }

  /* ============================================================
     desert — dunes and a high sun (Abraham, the wandering, Egypt)
     ============================================================ */
  function bgDesert() {
    var s = sky(COL.sky, COL.sky2);
    s += '<circle cx="322" cy="46" r="22" fill="' + COL.gold + '" opacity="0.85"/>';
    s += '<circle cx="322" cy="46" r="34" fill="' + COL.gold + '" opacity="0.16"/>';
    /* far dunes */
    s += '<path d="M0,178 q60,-26 120,-6 q70,22 130,-10 q80,-30 150,4 L400,240 L0,240 Z" fill="' + mix(COL.sand, 246, 0.35) + '"/>';
    s += '<path d="M0,196 q70,-22 140,-2 q60,18 120,-8 q60,-24 140,6 L400,240 L0,240 Z" fill="' + COL.sand + '"/>';
    /* ground band at the scene's standing line */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + COL.sandD + '"/>';
    s += '<path d="M0,' + GROUND + ' q100,-8 200,0 q100,8 200,0" stroke="' + hi(COL.sand) +
      '" stroke-width="5" fill="none" opacity="0.7"/>';
    /* wind ripples */
    s += '<path d="M40,224 q22,-4 44,0 M150,230 q26,-4 52,0 M280,222 q24,-4 48,0" stroke="' + COL.sandD +
      '" stroke-width="2" fill="none" opacity="0.7"/>';
    return s;
  }

  /* ============================================================
     sea — open water to the horizon (voyages, Aeneis)
     ============================================================ */
  function bgSea() {
    var s = sky(COL.sky, COL.sky2);
    s += '<circle cx="70" cy="44" r="18" fill="' + COL.gold + '" opacity="0.5"/>';
    /* horizon */
    s += '<rect y="150" width="' + W + '" height="90" fill="' + COL.water + '"/>';
    s += '<rect y="150" width="' + W + '" height="6" fill="' + hi(COL.water) + '" opacity="0.7"/>';
    s += '<rect y="188" width="' + W + '" height="52" fill="' + COL.waterD + '" opacity="0.55"/>';
    /* gentle waves, denser toward the viewer */
    var rows = [[162, 26, 0.5], [178, 34, 0.6], [198, 44, 0.7], [220, 54, 0.8]], i, j, y, w, o, x;
    for (i = 0; i < rows.length; i++) {
      y = rows[i][0]; w = rows[i][1]; o = rows[i][2];
      for (j = 0; j * w < W + w; j++) {
        x = j * w + (i % 2 ? w / 2 : 0);
        s += '<path d="M' + x + ',' + y + ' q' + (w / 4) + ',-4 ' + (w / 2) + ',0" stroke="' + hi(COL.water) +
          '" stroke-width="2.2" fill="none" opacity="' + o + '" stroke-linecap="round"/>';
      }
    }
    /* sun glitter: a widening ladder of short dashes under the sun,
       instead of one long stroke that read as a scratch on the water */
    var gy;
    for (gy = 0; gy < 5; gy++) {
      s += '<ellipse cx="' + (66 + gy * 2) + '" cy="' + (160 + gy * 12) + '" rx="' + (7 + gy * 3) +
        '" ry="2" fill="' + COL.gold + '" opacity="0.2"/>';
    }
    return s;
  }

  /* ============================================================
     stormSea — dark, high waves, far-off lightning.
     Dramatic, not frightening: no black, no jagged foam teeth, the
     lightning stays small and distant (DESIGN §8 "fear").
     ============================================================ */
  function bgStormSea() {
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + COL.stormSky + '"/>';
    /* cloud bank */
    s += '<path d="M0,0 L400,0 L400,86 q-40,16 -80,2 q-50,18 -96,-2 q-46,16 -92,0 q-60,14 -132,-6 Z" fill="' +
      sh(COL.stormSky) + '" opacity="0.75"/>';
    s += '<ellipse cx="90" cy="52" rx="70" ry="30" fill="' + mix(COL.stormSky, 0, 0.18) + '"/>';
    s += '<ellipse cx="250" cy="40" rx="86" ry="30" fill="' + mix(COL.stormSky, 0, 0.12) + '"/>';
    /* distant lightning */
    s += '<path d="M318,60 l-10,26 l10,-4 l-12,28" stroke="' + COL.gold +
      '" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>';
    s += '<circle cx="314" cy="76" r="26" fill="' + COL.gold + '" opacity="0.10"/>';
    /* sea */
    s += '<rect y="140" width="' + W + '" height="100" fill="' + COL.storm + '"/>';
    /* three big rolling swells */
    s += '<path d="M-10,182 q56,-46 112,-6 q52,36 108,-6 q56,-42 116,-2 q40,26 84,6 L400,240 L-10,240 Z" fill="' +
      sh(COL.storm) + '"/>';
    s += '<path d="M-10,206 q60,-38 120,-2 q56,32 112,-4 q54,-34 118,2 L400,240 L-10,240 Z" fill="' +
      mix(COL.storm, 0, 0.18) + '"/>';
    /* foam crests — rounded, friendly shapes */
    s += '<path d="M32,158 q18,-10 34,-2 q-18,5 -34,2 Z" fill="' + COL.cream + '" opacity="0.7"/>';
    s += '<path d="M148,158 q18,-11 34,-2 q-18,5 -34,2 Z" fill="' + COL.cream + '" opacity="0.65"/>';
    s += '<path d="M266,160 q18,-10 34,-2 q-18,5 -34,2 Z" fill="' + COL.cream + '" opacity="0.6"/>';
    s += '<path d="M96,186 q20,-10 38,-2 q-20,5 -38,2 Z" fill="' + COL.cream + '" opacity="0.45"/>';
    s += '<path d="M240,188 q20,-10 38,-2 q-20,5 -38,2 Z" fill="' + COL.cream + '" opacity="0.4"/>';
    /* rain, sparse and soft */
    var i, x;
    for (i = 0; i < 14; i++) {
      x = 12 + i * 28;
      s += '<path d="M' + x + ',' + (60 + (i % 4) * 18) + ' l-5,16" stroke="' + COL.cream +
        '" stroke-width="1.6" opacity="0.3" stroke-linecap="round"/>';
    }
    return s;
  }

  /* ============================================================
     mountain — Sinai: a great peak, cloud-capped by default
     ============================================================ */
  function bgMountain() {
    var s = sky(COL.sky, COL.sky2);
    var rock = '#a08e70';
    /* far range */
    s += '<path d="M0,190 L60,120 L110,168 L170,104 L240,180 L300,132 L360,178 L400,150 L400,240 L0,240 Z" fill="' +
      mix(rock, 246, 0.45) + '"/>';
    /* the mountain itself, left of centre so actors stand right */
    s += '<path d="M40,' + GROUND + ' L150,44 L210,' + GROUND + ' Z" fill="' + rock + '"/>';
    s += '<path d="M150,44 L210,' + GROUND + ' L150,' + GROUND + ' Z" fill="' + sh(rock) + '" opacity="0.55"/>';
    s += '<path d="M150,44 L124,92 q14,6 22,-2 q10,10 20,0 q8,8 14,-4 Z" fill="#fbf6ea" opacity="0.9"/>';
    s += '<path d="M104,140 L118,116 M164,132 L176,110" stroke="' + sh(rock) +
      '" stroke-width="2" fill="none" opacity="0.35" stroke-linecap="round"/>';
    /* cloud cap: the presence of God on Sinai, drawn as calm bands */
    s += '<g opacity="0.9">' +
      '<ellipse cx="150" cy="62" rx="62" ry="16" fill="#fbf6ea"/>' +
      '<ellipse cx="106" cy="70" rx="34" ry="12" fill="#fbf6ea"/>' +
      '<ellipse cx="196" cy="68" rx="38" ry="12" fill="' + mix('#fbf6ea', 0, 0.06) + '"/>' +
      '</g>';
    /* ground */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + COL.ground + '"/>';
    s += '<rect y="' + (GROUND - 5) + '" width="' + W + '" height="7" fill="' + mix(COL.grass, 0, 0.06) + '"/>';
    /* a few boulders for scale */
    s += '<ellipse cx="330" cy="206" rx="24" ry="11" fill="' + COL.stone + '"/>';
    s += '<ellipse cx="352" cy="208" rx="14" ry="7" fill="' + COL.stoneD + '"/>';
    return s;
  }

  /* ============================================================
     interior — a Roman room: plastered wall, column, window, floor
     ============================================================ */
  function bgInterior() {
    var wall = COL.wall, floor = '#b07a4a';
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + wall + '"/>';
    /* upper frieze and dado, in the Pompeiian manner */
    s += '<rect width="' + W + '" height="26" fill="' + COL.roof + '" opacity="0.85"/>';
    s += '<rect y="26" width="' + W + '" height="5" fill="' + COL.gold + '" opacity="0.8"/>';
    s += '<rect y="150" width="' + W + '" height="60" fill="' + mix(wall, 0, 0.12) + '"/>';
    s += '<rect y="150" width="' + W + '" height="4" fill="' + COL.gold + '" opacity="0.6"/>';
    /* meander band along the frieze */
    var i, x, m = '';
    for (i = 0; i < 20; i++) {
      x = i * 20 + 4;
      m += 'M' + x + ',18 h6 v-9 h6 v9 h4 ';
    }
    s += '<path d="' + m + '" stroke="' + COL.cream + '" stroke-width="2" fill="none" opacity="0.8"/>';
    /* window with a slice of sky */
    s += '<rect x="252" y="52" width="88" height="72" rx="3" fill="' + COL.sky + '"/>';
    s += '<rect x="252" y="52" width="88" height="72" rx="3" fill="none" stroke="' + COL.wood + '" stroke-width="6"/>';
    s += '<path d="M252,104 q22,-16 44,-6 q22,10 44,-4 L340,124 L252,124 Z" fill="' + COL.leafD + '" opacity="0.55"/>';
    s += '<circle cx="316" cy="72" r="9" fill="' + COL.gold + '" opacity="0.7"/>';
    s += '<path d="M296,52 L296,124" stroke="' + COL.wood + '" stroke-width="4"/>';
    /* column at the left */
    s += '<rect x="46" y="30" width="30" height="164" fill="' + hi(COL.stone) + '"/>';
    s += '<rect x="66" y="30" width="10" height="164" fill="' + sh(COL.stone) + '" opacity="0.3"/>';
    s += '<rect x="38" y="18" width="46" height="14" rx="3" fill="' + COL.stone + '"/>';
    s += '<rect x="38" y="192" width="46" height="12" rx="3" fill="' + COL.stone + '"/>';
    s += '<path d="M52,36 L52,190 M60,36 L60,190" stroke="' + sh(COL.stone) + '" stroke-width="1.4" opacity="0.35"/>';
    /* floor */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + floor + '"/>';
    s += '<path d="M0,' + GROUND + ' L400,' + GROUND + '" stroke="' + sh(floor) + '" stroke-width="3"/>';
    for (i = 0; i < 9; i++) {
      s += '<path d="M' + (i * 46 + 10) + ',' + (GROUND + 2) + ' l-10,28" stroke="' + sh(floor) +
        '" stroke-width="1.6" opacity="0.5" fill="none"/>';
    }
    return s;
  }

  /* ============================================================
     nightSky — deep blue, a large moon, quiet stars
     ============================================================ */
  function bgNightSky() {
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + COL.night + '"/>';
    s += '<rect y="90" width="' + W + '" height="150" fill="' + COL.night2 + '" opacity="0.7"/>';
    /* stars: a fixed pseudo-random spread (deterministic, no RNG in art) */
    var pts = [[24, 34], [58, 62], [92, 26], [128, 54], [166, 30], [196, 70], [232, 38],
      [268, 64], [304, 28], [338, 58], [372, 40], [46, 96], [140, 100], [286, 104],
      [354, 96], [18, 130], [212, 122], [110, 138], [382, 132]], i, r;
    for (i = 0; i < pts.length; i++) {
      r = (i % 3 === 0) ? 2 : ((i % 3 === 1) ? 1.4 : 1);
      s += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="' + r + '" fill="#fbf6ea" opacity="' +
        (0.55 + (i % 4) * 0.12) + '"/>';
    }
    /* a couple of four-point sparkles for interest */
    s += '<path d="M84,74 l1.6,-6 l1.6,6 l6,1.6 l-6,1.6 l-1.6,6 l-1.6,-6 l-6,-1.6 Z" fill="#fbf6ea" opacity="0.85"/>';
    s += '<path d="M320,120 l1.2,-5 l1.2,5 l5,1.2 l-5,1.2 l-1.2,5 l-1.2,-5 l-5,-1.2 Z" fill="#fbf6ea" opacity="0.7"/>';
    /* moon */
    s += '<circle cx="318" cy="58" r="40" fill="' + COL.gold + '" opacity="0.12"/>';
    s += '<circle cx="318" cy="58" r="26" fill="#f4e7cd"/>';
    s += '<circle cx="326" cy="52" r="5" fill="#e2d3b4"/>';
    s += '<circle cx="310" cy="66" r="7" fill="#e2d3b4"/>';
    s += '<circle cx="322" cy="70" r="3.4" fill="#e2d3b4"/>';
    /* ground, moonlit */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="#3b3f52"/>';
    s += '<rect y="' + (GROUND - 4) + '" width="' + W + '" height="6" fill="#4d5468"/>';
    s += '<path d="M0,' + (GROUND - 4) + ' q120,-10 210,-2 q100,8 190,0" stroke="#6b7286" stroke-width="2" fill="none" opacity="0.6"/>';
    return s;
  }

  /* ============================================================
     city — a wall and the rooftops behind it
     ============================================================ */
  function bgCity() {
    var s = sky(COL.sky, COL.sky2);
    var st = COL.stone, roof = COL.roof;
    /* distant hills */
    s += '<path d="M0,168 q70,-30 140,-6 q80,26 150,-8 q60,-24 110,6 L400,240 L0,240 Z" fill="' +
      mix(COL.grass, 246, 0.4) + '"/>';
    /* rooftops behind the wall */
    var houses = [[30, 132, 56], [96, 120, 48], [156, 138, 60], [224, 118, 52], [286, 134, 64], [352, 126, 44]], i, h;
    for (i = 0; i < houses.length; i++) {
      h = houses[i];
      s += '<rect x="' + h[0] + '" y="' + h[1] + '" width="' + h[2] + '" height="' + (176 - h[1]) + '" fill="' + hi(st) + '"/>';
      s += '<rect x="' + (h[0] + h[2] * 0.6) + '" y="' + h[1] + '" width="' + (h[2] * 0.4) + '" height="' + (176 - h[1]) +
        '" fill="' + sh(st) + '" opacity="0.22"/>';
      s += '<path d="M' + (h[0] - 5) + ',' + h[1] + ' L' + (h[0] + h[2] / 2) + ',' + (h[1] - 16) + ' L' +
        (h[0] + h[2] + 5) + ',' + h[1] + ' Z" fill="' + roof + '"/>';
      s += '<rect x="' + (h[0] + h[2] / 2 - 5) + '" y="' + (h[1] + 12) + '" width="10" height="12" fill="' + COL.ink + '" opacity="0.55"/>';
    }
    /* a temple silhouette for a skyline landmark */
    s += '<rect x="180" y="112" width="60" height="8" fill="' + st + '"/>';
    s += '<path d="M176,112 L210,92 L244,112 Z" fill="' + hi(st) + '"/>';
    /* the wall */
    s += '<rect x="0" y="172" width="' + W + '" height="38" fill="' + st + '"/>';
    for (i = 0; i * 26 < W; i++) {
      s += '<rect x="' + (i * 26) + '" y="162" width="16" height="12" fill="' + st + '"/>';
      s += '<rect x="' + (i * 26 + 10) + '" y="162" width="6" height="12" fill="' + sh(st) + '" opacity="0.35"/>';
    }
    s += '<path d="M0,186 L400,186 M0,198 L400,198" stroke="' + COL.stoneD + '" stroke-width="1.6" opacity="0.6" fill="none"/>';
    /* gate */
    s += '<path d="M172,210 L172,190 Q200,168 228,190 L228,210 Z" fill="#5a3a22"/>';
    s += '<path d="M200,176 L200,210" stroke="#3f2716" stroke-width="2"/>';
    /* ground */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + COL.ground + '"/>';
    return s;
  }

  /* ============================================================
     troy — the same skyline at dusk with a distant, subtle glow.
     "Trōia ārdet" told with light on the horizon, never with a
     burning building in the foreground (B rating, DESIGN §8).
     ============================================================ */
  function bgTroy() {
    var duskTop = '#e9b978', duskLow = '#d9895a';
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + duskTop + '"/>';
    s += '<rect y="70" width="' + W + '" height="170" fill="' + duskLow + '" opacity="0.75"/>';
    /* smoke haze */
    s += '<ellipse cx="250" cy="100" rx="120" ry="34" fill="#8a6a5a" opacity="0.14"/>';
    s += '<ellipse cx="186" cy="84" rx="96" ry="26" fill="#8a6a5a" opacity="0.10"/>';
    s += '<ellipse cx="300" cy="74" rx="70" ry="20" fill="#8a6a5a" opacity="0.08"/>';
    /* the glow itself: warm light behind the city, no flames on screen */
    s += '<ellipse cx="256" cy="176" rx="120" ry="52" fill="' + COL.flame + '" opacity="0.22"/>';
    s += '<ellipse cx="256" cy="182" rx="70" ry="30" fill="' + COL.gold + '" opacity="0.22"/>';
    /* skyline in silhouette */
    var st = '#6e5847', i, h;
    var houses = [[24, 146, 50], [86, 132, 46], [144, 152, 58], [212, 126, 54], [278, 144, 60], [346, 136, 46]];
    for (i = 0; i < houses.length; i++) {
      h = houses[i];
      s += '<rect x="' + h[0] + '" y="' + h[1] + '" width="' + h[2] + '" height="' + (188 - h[1]) + '" fill="' + st + '"/>';
      s += '<path d="M' + (h[0] - 5) + ',' + h[1] + ' L' + (h[0] + h[2] / 2) + ',' + (h[1] - 15) + ' L' +
        (h[0] + h[2] + 5) + ',' + h[1] + ' Z" fill="' + sh(st) + '"/>';
      /* lit windows */
      s += '<rect x="' + (h[0] + h[2] / 2 - 4) + '" y="' + (h[1] + 14) + '" width="8" height="10" fill="' + COL.gold + '" opacity="0.75"/>';
    }
    /* wall in front, darker */
    s += '<rect x="0" y="182" width="' + W + '" height="28" fill="' + sh(st) + '"/>';
    for (i = 0; i * 26 < W; i++) {
      s += '<rect x="' + (i * 26) + '" y="174" width="15" height="10" fill="' + sh(st) + '"/>';
    }
    /* ground */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="#6b4f38"/>';
    s += '<rect y="' + GROUND + '" width="' + W + '" height="4" fill="#8a6647"/>';
    return s;
  }

  /* ============================================================
     riverNile — a broad river with reeds and a far bank
     ============================================================ */
  function bgRiverNile() {
    var s = sky(COL.sky, COL.sky2);
    s += '<circle cx="60" cy="42" r="20" fill="' + COL.gold + '" opacity="0.6"/>';
    /* far bank with palms suggested as shapes only */
    s += '<rect y="150" width="' + W + '" height="14" fill="' + mix(COL.sand, 246, 0.25) + '"/>';
    var i, x;
    for (i = 0; i < 5; i++) {
      x = 40 + i * 82;
      s += '<path d="M' + x + ',150 q3,-22 0,-34" stroke="#8a7a54" stroke-width="3" fill="none"/>';
      s += '<ellipse cx="' + (x - 10) + '" cy="118" rx="14" ry="5" fill="' + COL.leafD + '" opacity="0.7"/>';
      s += '<ellipse cx="' + (x + 10) + '" cy="118" rx="14" ry="5" fill="' + COL.leafD + '" opacity="0.7"/>';
      s += '<ellipse cx="' + x + '" cy="112" rx="10" ry="6" fill="' + COL.leaf + '" opacity="0.75"/>';
    }
    /* water */
    s += '<rect y="164" width="' + W + '" height="46" fill="' + COL.water + '"/>';
    s += '<rect y="164" width="' + W + '" height="5" fill="' + hi(COL.water) + '" opacity="0.7"/>';
    s += '<path d="M20,178 q18,-4 36,0 M120,186 q20,-4 40,0 M240,180 q18,-4 36,0 M320,192 q20,-4 40,0" stroke="' +
      COL.waterD + '" stroke-width="2.2" fill="none" opacity="0.8" stroke-linecap="round"/>';
    s += '<path d="M60,200 q22,-5 44,0 M200,202 q22,-5 44,0 M300,206 q22,-5 44,0" stroke="' +
      hi(COL.water) + '" stroke-width="2.2" fill="none" opacity="0.8" stroke-linecap="round"/>';
    /* near bank */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + COL.sandD + '"/>';
    s += '<path d="M0,' + GROUND + ' q90,-8 190,-2 q110,8 210,0" stroke="' + COL.sand + '" stroke-width="5" fill="none"/>';
    /* reeds at both edges, framing the scene */
    function reeds(bx, k, op) {
      var t = '<g transform="translate(' + bx + ',' + (GROUND + 4) + ') scale(' + k + ')" opacity="' + op + '">';
      var st = [[0, -56], [-12, -44], [11, -50], [20, -38]], j;
      for (j = 0; j < st.length; j++) {
        t += '<path d="M' + st[j][0] + ',0 q' + (st[j][0] * 0.2) + ',' + (st[j][1] / 2) + ' ' +
          (st[j][0] * 0.5) + ',' + st[j][1] + '" stroke="' + COL.leafD + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
        t += '<ellipse cx="' + (st[j][0] * 0.5) + '" cy="' + (st[j][1] - 4) + '" rx="3" ry="7" fill="#7a4a26"/>';
      }
      return t + '</g>';
    }
    s += reeds(26, 1.05, 1) + reeds(372, 0.95, 1) + reeds(330, 0.7, 0.7);
    return s;
  }

  /* ============================================================
     paradise — a lush garden: fruit trees, flowers, soft light
     ============================================================ */
  function bgParadise() {
    var s = '<rect width="' + W + '" height="' + H + '" fill="#f7edd0"/>';
    s += '<rect y="60" width="' + W + '" height="180" fill="#eddfae" opacity="0.7"/>';
    /* warm glow overhead */
    s += '<ellipse cx="200" cy="20" rx="200" ry="60" fill="' + COL.gold + '" opacity="0.14"/>';
    /* rolling lawn */
    s += '<path d="M0,176 q100,-22 200,-6 q100,16 200,-4 L400,240 L0,240 Z" fill="#93a85a"/>';
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="#7f9448"/>';
    /* a stream crossing the garden (the river of Eden) */
    s += '<path d="M0,196 q60,10 120,4 q70,-8 130,6 q70,12 150,-2 L400,214 q-90,14 -170,2 q-80,-12 -140,-2 q-56,10 -90,2 Z" fill="' +
      COL.water + '" opacity="0.85"/>';
    s += '<path d="M20,202 q40,6 80,2 M180,206 q40,8 80,2" stroke="' + hi(COL.water) +
      '" stroke-width="2" fill="none" opacity="0.8"/>';
    /* trees at both sides, out of the acting area */
    function fruitTree(x, y, k, flip) {
      var t = '<g transform="translate(' + x + ',' + y + ') scale(' + (flip ? -k : k) + ',' + k + ')">';
      t += '<path d="M-8,0 q4,-26 -2,-44 l20,0 q-6,18 -2,44 Z" fill="' + COL.wood + '"/>';
      t += '<circle cx="-20" cy="-62" r="21" fill="' + COL.leafD + '"/>';
      t += '<circle cx="20" cy="-66" r="23" fill="' + COL.leafD + '"/>';
      t += '<circle cx="0" cy="-78" r="24" fill="' + COL.leaf + '"/>';
      t += '<circle cx="-18" cy="-74" r="15" fill="' + COL.leaf + '"/>';
      var pts = [[-22, -56], [10, -54], [-4, -66], [22, -76], [-26, -74], [2, -88]], i;
      for (i = 0; i < pts.length; i++) {
        t += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="4.6" fill="#b33a2b"/>';
      }
      return t + '</g>';
    }
    s += fruitTree(44, GROUND - 2, 1, false) + fruitTree(356, GROUND - 4, 0.92, true) +
      fruitTree(300, 186, 0.6, false) + fruitTree(112, 184, 0.55, true);
    /* flowers on the lawn */
    var fl = [[150, 200, '#d96e8a'], [186, 208, '#e0a93e'], [246, 198, '#fbf6ea'],
      [88, 214, '#d96e8a'], [330, 210, '#e0a93e'], [270, 218, '#fbf6ea']], i;
    for (i = 0; i < fl.length; i++) {
      s += '<circle cx="' + fl[i][0] + '" cy="' + fl[i][1] + '" r="3.4" fill="' + fl[i][2] + '"/>';
      s += '<circle cx="' + fl[i][0] + '" cy="' + fl[i][1] + '" r="1.2" fill="' + COL.gold + '"/>';
    }
    /* butterflies, because this is the one scene that may be merry */
    s += '<path d="M120,120 q6,-8 10,0 q-6,7 -10,0 Z M130,120 q8,-8 12,0 q-8,7 -12,0 Z" fill="' + COL.gold + '" opacity="0.85"/>';
    return s;
  }

  /* ============================================================
     stabulum — the stable interior of the Nativity
     ============================================================ */
  function bgStabulum() {
    var wall = '#6b4f38', straw = '#d9b56a';
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + mix(wall, 0, 0.18) + '"/>';
    /* stone back wall */
    s += '<rect y="60" width="' + W + '" height="150" fill="#7d6a52"/>';
    var i, j, x, y;
    for (j = 0; j < 6; j++) {
      y = 66 + j * 24;
      for (i = 0; i < 9; i++) {
        x = (j % 2 ? -22 : 0) + i * 46;
        s += '<rect x="' + x + '" y="' + y + '" width="42" height="20" rx="3" fill="#8a7358" opacity="0.75"/>';
      }
    }
    /* rafters */
    s += '<rect y="30" width="' + W + '" height="30" fill="#5a4028"/>';
    s += '<path d="M0,60 L400,60" stroke="#3f2a18" stroke-width="4"/>';
    for (i = 0; i < 6; i++) {
      s += '<rect x="' + (14 + i * 70) + '" y="0" width="14" height="60" fill="#4a3421"/>';
    }
    /* the opening to the night, with the star's light spilling in */
    s += '<path d="M300,60 L300,150 L380,150 L380,60 Z" fill="#2c3555"/>';
    s += '<circle cx="340" cy="92" r="18" fill="' + COL.gold + '" opacity="0.35"/>';
    s += '<circle cx="340" cy="92" r="7" fill="#fbf6ea" opacity="0.9"/>';
    s += '<path d="M300,150 L380,150 L400,210 L286,210 Z" fill="' + COL.gold + '" opacity="0.10"/>';
    /* straw floor */
    s += '<rect y="' + GROUND + '" width="' + W + '" height="' + (H - GROUND) + '" fill="' + straw + '"/>';
    s += '<rect y="' + (GROUND - 5) + '" width="' + W + '" height="7" fill="' + hi(straw) + '"/>';
    for (i = 0; i < 22; i++) {
      x = 6 + i * 18;
      s += '<path d="M' + x + ',' + (GROUND + 6 + (i % 3) * 8) + ' l10,-5" stroke="' + sh(straw) +
        '" stroke-width="1.6" opacity="0.7" stroke-linecap="round"/>';
    }
    /* a hanging lamp for warmth */
    s += '<path d="M110,30 L110,68" stroke="#3f2a18" stroke-width="2"/>';
    s += '<path d="M100,68 q10,14 20,0 Z" fill="#c08a3e"/>';
    s += '<circle cx="110" cy="70" r="16" fill="' + COL.gold + '" opacity="0.22"/>';
    s += '<circle cx="110" cy="70" r="4" fill="' + COL.flame + '"/>';
    return s;
  }

  /* ---------- registration ---------- */
  Scenes.registerBg('desert', bgDesert);
  Scenes.registerBg('sea', bgSea);
  Scenes.registerBg('stormSea', bgStormSea);
  Scenes.registerBg('mountain', bgMountain);
  Scenes.registerBg('interior', bgInterior);
  Scenes.registerBg('nightSky', bgNightSky);
  Scenes.registerBg('city', bgCity);
  Scenes.registerBg('troy', bgTroy);
  Scenes.registerBg('riverNile', bgRiverNile);
  Scenes.registerBg('paradise', bgParadise);
  Scenes.registerBg('stabulum', bgStabulum);
}());
