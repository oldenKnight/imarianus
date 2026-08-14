/* ============================================================
   map.js — the overworld board (ES5, pure SVG)
   ------------------------------------------------------------
   DESIGN §3: a dark carved wooden board seen slightly from above,
   with bevelled diamond tiles standing on pedestal feet, zigzagging
   from the bottom of the board to the top, numbered badges, carved
   figurines and props sitting at depth, and the region's boss on a
   bigger tile at the summit.

   This module only RENDERS and reports clicks. app.js owns all
   progress logic and decides which node is open, done or locked.

   Public API:
     WorldMap.render(model) -> html string
     WorldMap.bind(rootEl, model, handlers)
   model = {
     nodes: [{ id, kind:'fable'|'boss', x, y,      // x,y are 0..1 FRACTIONS
               label, titulus, state:'done'|'open'|'shut' }],
     foxNode: 'f2',            // node the mascot stands on
     track:   'fabulae',       // per-track background tint
     titulus: 'Silva',
     avatar:  'fox'
   }
   handlers = { onNode: function (nodeId, kind) {} }

   SCALE RULE (learned from a screenshot, not from theory): the board
   must show 5–7 nodes at 375px. That fixes the tile size, and the
   tile size fixes everything else — badge, mascot, props. Change
   TILE below and the whole board stays in proportion.

   WHY SVG AND NOT CANVAS: crisp at any zoom on any phone, text is
   real text for screen readers, and states are one attribute swap
   instead of a repaint loop.
   ============================================================ */
var WorldMap = (function () {
  'use strict';

  /* logical drawing width; the SVG scales to the container. Every number
     below is in these units, so the board is resolution independent. */
  var W = 600;

  /* the one size knob: half-width / half-height of a capitulum tile */
  var TILE = { rx: 62, ry: 36, lift: 13 };
  var BOSS = { rx: 84, ry: 49, lift: 17 };

  /* Per-track tint (DESIGN §3). Only these values change between tracks;
     everything else is shared, so a new track is a palette, not a renderer.
     Historia (indigo night) and Aeneis (wine-dark sea) are reserved now so
     the hook is proven before their content exists. */
  var TINTS = {
    fabulae: { wood: '#3c2415', woodDk: '#28160b', woodLt: '#4a2e1c',
               seam: '#1b0f07', glow: '#f0c268', haze: '#8a5a30', knot: '#2c1a0e' },
    historia: { wood: '#232a45', woodDk: '#151a2c', woodLt: '#2f3758',
                seam: '#0f121e', glow: '#e6d79a', haze: '#3d4a78', knot: '#1b2138' },
    aeneis: { wood: '#3d1f2a', woodDk: '#26121a', woodLt: '#502936',
              seam: '#190b11', glow: '#f0c268', haze: '#6b3346', knot: '#301722' }
  };

  /* shared palette (tile faces, badges, laurel) */
  var C = {
    tileTop: '#c8a463', tileTopLt: '#e2c187', tileSide: '#8a6a37', tileEdge: '#6b4f26',
    doneTop: '#e8bf62', doneTopLt: '#fbe0a0', doneSide: '#b8862a', doneEdge: '#8a621a',
    shutTop: '#6d6155', shutTopLt: '#847768', shutSide: '#4b4238', shutEdge: '#3a332b',
    badge: '#241610', badgeRim: '#e0a93e',
    cream: '#f3e6d0', creamDim: '#c9b69a',
    laurel: '#a8c46a', laurelDk: '#7c9a44', shadow: 'rgba(0,0,0,0.45)',
    flag: '#b33a2b'
  };

  /* Board height grows with the node count. 150 units per node keeps 5–7
     tiles on a 375px screen (a 600-unit-wide board renders ~0.62 px/unit
     there, and the viewport is ~500px tall). */
  function boardHeight(nodeCount) {
    return Math.max(620, 150 * nodeCount + 230);
  }

  /* deterministic RNG so the scenery does not jump around between renders
     (a re-render happens on every progress change). Seeded per track. */
  function rngFrom(seedStr) {
    var h = 2166136261, i;
    for (i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    var s = h >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function escXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* is this actor in the scene library? (art files are optional) */
  function hasActor(name) {
    if (!window.Scenes || !Scenes.actorNames || !Scenes.sprite) { return false; }
    var names = Scenes.actorNames() || [], i;
    for (i = 0; i < names.length; i++) { if (names[i] === name) { return true; } }
    return false;
  }

  /* ---------- defs: grain, shadow, glow, carved-wood filter ---------- */

  function defs(t) {
    var s = '<defs>';
    /* wood grain: stretched fractal noise (high frequency across, near-zero
       down) reads as long fibres running along the plank. */
    s += '<filter id="mmGrain" x="0" y="0" width="100%" height="100%">' +
         '<feTurbulence type="fractalNoise" baseFrequency="0.9 0.012" numOctaves="3" seed="7" result="n"/>' +
         '<feColorMatrix in="n" type="matrix" values="' +
           '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0 0 0 0"/>' +
         '</filter>';
    /* soft drop shadow under tiles */
    s += '<filter id="mmDrop" x="-40%" y="-40%" width="180%" height="180%">' +
         '<feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.5"/>' +
         '</filter>';
    /* CARVED WOOD: takes any full-colour actor from scenes.js and turns it
       into a piece carved from the same board — desaturate, then map the
       remaining luminance onto a warm umber ramp. That is what makes a fox
       actor read as a chess figurine instead of a cartoon lying on the
       floor, and it costs no new artwork. */
    s += '<filter id="mmCarved" x="-10%" y="-10%" width="120%" height="120%">' +
         '<feColorMatrix type="saturate" values="0.1"/>' +
         '<feComponentTransfer>' +
           '<feFuncR type="linear" slope="0.42" intercept="0.035"/>' +
           '<feFuncG type="linear" slope="0.27" intercept="0.02"/>' +
           '<feFuncB type="linear" slope="0.15" intercept="0.012"/>' +
         '</feComponentTransfer>' +
         '</filter>';
    /* the pool of light under the current tile: a real radial gradient, not
       an outline ring */
    s += '<radialGradient id="mmGlow" cx="50%" cy="50%" r="50%">' +
         '<stop offset="0%" stop-color="' + t.glow + '" stop-opacity="0.85"/>' +
         '<stop offset="45%" stop-color="' + t.glow + '" stop-opacity="0.35"/>' +
         '<stop offset="100%" stop-color="' + t.glow + '" stop-opacity="0"/>' +
         '</radialGradient>';
    /* warm haze pooled along the path so the eye follows it upward */
    s += '<radialGradient id="mmHaze" cx="50%" cy="50%" r="50%">' +
         '<stop offset="0%" stop-color="' + t.haze + '" stop-opacity="0.42"/>' +
         '<stop offset="100%" stop-color="' + t.haze + '" stop-opacity="0"/>' +
         '</radialGradient>';
    /* vignette: darkens the outer board so the lit path is the focus */
    s += '<radialGradient id="mmVig" cx="50%" cy="50%" r="72%">' +
         '<stop offset="55%" stop-color="#000" stop-opacity="0"/>' +
         '<stop offset="100%" stop-color="#000" stop-opacity="0.5"/>' +
         '</radialGradient>';
    s += '</defs>';
    return s;
  }

  /* ---------- background: planks of varied length, seams, knots ---------- */

  function planks(t, H) {
    var rnd = rngFrom('planks:' + t.wood);
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + t.wood + '"/>';
    var y = 0, row = 0;
    while (y < H) {
      var ph = 78 + Math.floor(rnd() * 46);          /* varied plank height */
      var shade = (row % 2) ? t.woodLt : t.wood;
      s += '<rect x="0" y="' + y + '" width="' + W + '" height="' + ph + '" fill="' + shade +
           '" opacity="' + (0.3 + rnd() * 0.22).toFixed(2) + '"/>';
      /* seam under the plank */
      s += '<rect x="0" y="' + (y + ph - 3) + '" width="' + W + '" height="3" fill="' +
           t.seam + '" opacity="0.85"/>';
      /* one or two butt joints, at varied offsets, so it stops reading as a
         brick grid */
      var joints = 1 + Math.floor(rnd() * 2), j;
      for (j = 0; j < joints; j++) {
        var jx = 40 + rnd() * (W - 80);
        s += '<rect x="' + jx.toFixed(0) + '" y="' + y + '" width="3" height="' + (ph - 3) +
             '" fill="' + t.seam + '" opacity="0.55"/>';
      }
      /* a knot every few planks: concentric ellipses, like real timber */
      if (rnd() < 0.55) {
        var kx = 30 + rnd() * (W - 60);
        var ky = y + 12 + rnd() * Math.max(8, ph - 24);
        var kr = 7 + rnd() * 7;
        s += '<g opacity="0.55">' +
             '<ellipse cx="' + kx.toFixed(0) + '" cy="' + ky.toFixed(0) + '" rx="' + kr.toFixed(1) +
               '" ry="' + (kr * 0.62).toFixed(1) + '" fill="' + t.knot + '"/>' +
             '<ellipse cx="' + kx.toFixed(0) + '" cy="' + ky.toFixed(0) + '" rx="' + (kr * 0.55).toFixed(1) +
               '" ry="' + (kr * 0.34).toFixed(1) + '" fill="none" stroke="' + t.seam + '" stroke-width="1.4"/>' +
             '</g>';
      }
      y += ph;
      row++;
    }
    /* grain overlay + darkened edges */
    s += '<rect width="' + W + '" height="' + H + '" filter="url(#mmGrain)" opacity="0.15"/>';
    s += '<rect x="0" y="0" width="22" height="' + H + '" fill="' + t.seam + '" opacity="0.45"/>';
    s += '<rect x="' + (W - 22) + '" y="0" width="22" height="' + H + '" fill="' + t.seam + '" opacity="0.45"/>';
    return s;
  }

  /* ---------- props ---------- */

  /* a turned base every carved figurine stands on */
  function figurineBase(w) {
    return '<ellipse cx="0" cy="4" rx="' + (w * 0.5).toFixed(1) + '" ry="' + (w * 0.17).toFixed(1) +
             '" fill="rgba(0,0,0,0.45)"/>' +
           '<path d="M' + (-w * 0.42) + ',2 q' + (w * 0.42) + ',-7 ' + (w * 0.84) + ',0 q' +
             (-w * 0.42) + ',6 ' + (-w * 0.84) + ',0 Z" fill="#2a1a0f"/>' +
           '<path d="M' + (-w * 0.3) + ',-2 h' + (w * 0.6) + ' l-' + (w * 0.06) + ',-4 h-' +
             (w * 0.48) + ' Z" fill="#3a2417"/>';
  }

  /* A carved figurine made from a real scenes.js actor (fox, wolf, lepus…)
     put through the umber filter and stood on a base. Falls back to nothing
     if the actor is not registered — the caller then draws a simple prop. */
  function figurine(actor, px) {
    if (!hasActor(actor)) { return ''; }
    return '<g>' + figurineBase(px * 0.62) +
      '<g transform="translate(' + (-px / 2) + ',' + (-px + 6) + ')">' +
      Scenes.sprite(actor, {}, px) + '</g></g>';
  }

  /* simple hand-drawn fallbacks (used when the art library is absent) */
  function propTreeSimple(scale) {
    return '<g transform="scale(' + scale + ')">' +
      '<ellipse cx="0" cy="3" rx="18" ry="6" fill="rgba(0,0,0,0.4)"/>' +
      '<rect x="-5" y="-30" width="10" height="32" rx="3" fill="#3b2412"/>' +
      '<circle cx="-12" cy="-46" r="17" fill="#3f5a2c"/>' +
      '<circle cx="12" cy="-50" r="19" fill="#4c6b34"/>' +
      '<circle cx="0" cy="-62" r="17" fill="#44612f"/>' +
      '</g>';
  }
  function propAmphoraSimple(scale) {
    return '<g transform="scale(' + scale + ')">' +
      '<ellipse cx="0" cy="4" rx="14" ry="5" fill="rgba(0,0,0,0.4)"/>' +
      '<path d="M0,-44 q-13,10 -13,25 q0,16 13,20 q13,-4 13,-20 q0,-15 -13,-25 Z" fill="#7a4a26"/>' +
      '<path d="M0,-44 q-13,10 -13,25 q0,16 13,20 Z" fill="#5a3419"/>' +
      '<rect x="-6" y="-50" width="12" height="8" rx="2" fill="#8a5a30"/>' +
      '<path d="M-12,-36 q-9,6 -3,15 M12,-36 q9,6 3,15" stroke="#5a3419" stroke-width="3" fill="none"/>' +
      '</g>';
  }

  /* scattered mosaic tesserae: cheap texture that fills dead board space */
  function tesserae(rnd, x, y, n) {
    var s = '<g opacity="0.5">', i;
    for (i = 0; i < n; i++) {
      var dx = (rnd() - 0.5) * 46;
      var dy = (rnd() - 0.5) * 22;
      var sz = 4 + rnd() * 3;
      var col = (rnd() < 0.5) ? '#8a6a37' : '#6b4f26';
      s += '<rect x="' + (x + dx).toFixed(0) + '" y="' + (y + dy).toFixed(0) + '" width="' + sz.toFixed(1) +
           '" height="' + (sz * 0.62).toFixed(1) + '" rx="1" fill="' + col +
           '" transform="rotate(' + ((rnd() * 40) - 20).toFixed(0) + ' ' + (x + dx).toFixed(0) + ' ' +
           (y + dy).toFixed(0) + ')"/>';
    }
    return s + '</g>';
  }

  /* Which figurines and props suit each track. Names are looked up in the
     scene library and silently skipped when absent. */
  var PROPS = {
    fabulae:  { carved: ['fox', 'wolf', 'lepus', 'mus', 'testudo'], props: ['quercus', 'amphora'] },
    historia: { carved: ['ovis', 'camelus'], props: ['palmTree', 'amphora', 'columna'] },
    aeneis:   { carved: ['equus'], props: ['columna', 'amphora', 'palmTree'] }
  };

  /* half-width of the widest tile within reach of this y, so a prop never
     tucks itself under the boss slab (which is wider than a capitulum one) */
  function clearanceAt(y, pts) {
    var c = TILE.rx, i, d;
    for (i = 0; i < pts.length; i++) {
      d = Math.abs(pts[i].y - y);
      if (d < 140) {
        c = Math.max(c, (pts[i].n.kind === 'boss') ? BOSS.rx : TILE.rx);
      }
    }
    return c + 54;
  }

  /* x of the path at a given y, by interpolating between node centres —
     used to keep every prop OUT of the corridor the tiles occupy. */
  function pathXAt(y, pts) {
    if (!pts.length) { return W / 2; }
    if (y <= pts[0].y) { return pts[0].x; }
    var i;
    for (i = 1; i < pts.length; i++) {
      if (y <= pts[i].y) {
        var a = pts[i - 1], b = pts[i];
        var f = (y - a.y) / ((b.y - a.y) || 1);
        return a.x + (b.x - a.x) * f;
      }
    }
    return pts[pts.length - 1].x;
  }

  /* Scatter props down the board, never over the path or a tile, scaled and
     faded by depth (higher up the board = further away = smaller, dimmer). */
  function scenery(track, H, pts) {
    var rnd = rngFrom('props2:' + track);
    var set = PROPS[track] || PROPS.fabulae;
    var carved = [], props = [], i;
    for (i = 0; i < set.carved.length; i++) { if (hasActor(set.carved[i])) { carved.push(set.carved[i]); } }
    for (i = 0; i < set.props.length; i++) { if (hasActor(set.props[i])) { props.push(set.props[i]); } }

    var s = '';
    var count = Math.round(H / 74);          /* plenty of them, DESIGN §3 */

    for (i = 0; i < count; i++) {
      var y = 70 + (i / count) * (H - 120) + (rnd() - 0.5) * 40;
      var px = pathXAt(y, pts);
      var CLEAR = clearanceAt(y, pts);
      /* choose the side with more room, then a position inside it */
      var leftRoom = (px - CLEAR) - 30;
      var rightRoom = (W - 30) - (px + CLEAR);
      var x;
      if (leftRoom < 40 && rightRoom < 40) { continue; }      /* no room here */
      if (rightRoom > leftRoom) { x = px + CLEAR + rnd() * Math.max(10, rightRoom - 10); }
      else { x = 30 + rnd() * Math.max(10, leftRoom - 10); }

      var depth = 1 - (y / H);                   /* 1 top, 0 bottom */
      var near = 1 - depth;                      /* 0 top, 1 bottom */
      var opacity = (0.55 + near * 0.3).toFixed(2);
      var roll = rnd();
      var art = '';

      if (roll < 0.34 && carved.length) {
        var size = Math.round(46 + near * 26);
        art = figurine(carved[Math.floor(rnd() * carved.length) % carved.length], size);
      } else if (roll < 0.72 && props.length) {
        var pname = props[Math.floor(rnd() * props.length) % props.length];
        var psize = Math.round(52 + near * 34);
        art = '<g transform="translate(' + (-psize / 2) + ',' + (-psize) + ')">' +
              Scenes.sprite(pname, {}, psize) + '</g>' +
              '<ellipse cx="0" cy="2" rx="' + (psize * 0.26).toFixed(0) + '" ry="' +
              (psize * 0.09).toFixed(0) + '" fill="rgba(0,0,0,0.35)"/>';
      } else if (roll < 0.86) {
        art = tesserae(rnd, 0, 0, 4 + Math.floor(rnd() * 4));
      } else {
        /* fallbacks keep the board furnished even with no art library */
        art = (rnd() < 0.5) ? propTreeSimple(0.55 + near * 0.4)
                            : propAmphoraSimple(0.5 + near * 0.35);
      }
      if (!art) { art = propTreeSimple(0.5 + near * 0.35); }
      s += '<g transform="translate(' + Math.round(x) + ',' + Math.round(y) + ')" opacity="' +
           opacity + '">' + art + '</g>';
    }
    return s;
  }

  /* ---------- the path ---------- */

  function pathLine(pts) {
    if (pts.length < 2) { return ''; }
    var d = 'M' + pts[0].x + ',' + pts[0].y, i;
    for (i = 1; i < pts.length; i++) {
      /* gentle S-curve between tiles: control points pull vertically, which
         reads as a road winding up a hillside rather than a zigzag of sticks */
      var a = pts[i - 1], b = pts[i];
      var my = (a.y + b.y) / 2;
      d += ' C' + a.x + ',' + my + ' ' + b.x + ',' + my + ' ' + b.x + ',' + b.y;
    }
    var s = '<path d="' + d + '" fill="none" stroke="#22130a" stroke-width="20" stroke-linecap="round" opacity="0.8"/>';
    s += '<path d="' + d + '" fill="none" stroke="#8a6a37" stroke-width="12" stroke-linecap="round" opacity="0.9"/>';
    s += '<path d="' + d + '" fill="none" stroke="' + C.badgeRim +
         '" stroke-width="2.5" stroke-dasharray="2 13" stroke-linecap="round" opacity="0.7"/>';
    return s;
  }

  /* ---------- tiles ---------- */

  function tile(n, big) {
    var g = big ? BOSS : TILE;
    var rx = g.rx, ry = g.ry, lift = g.lift;
    var pal = (n.state === 'done')
      ? { top: C.doneTop, lt: C.doneTopLt, side: C.doneSide, edge: C.doneEdge }
      : (n.state === 'shut')
        ? { top: C.shutTop, lt: C.shutTopLt, side: C.shutSide, edge: C.shutEdge }
        : { top: C.tileTop, lt: C.tileTopLt, side: C.tileSide, edge: C.tileEdge };

    function dia(r1, r2, y) {
      return '0,' + (y - r2) + ' ' + r1 + ',' + y + ' 0,' + (y + r2) + ' ' + (-r1) + ',' + y;
    }
    var s = '';
    s += '<ellipse cx="0" cy="' + (lift + 11) + '" rx="' + (rx * 0.78).toFixed(0) + '" ry="' +
         (ry * 0.4).toFixed(0) + '" fill="' + C.shadow + '"/>';
    /* pedestal feet */
    s += '<rect x="' + (-rx * 0.4).toFixed(0) + '" y="0" width="' + (rx * 0.2).toFixed(0) + '" height="' +
         lift + '" fill="' + pal.edge + '"/>';
    s += '<rect x="' + (rx * 0.2).toFixed(0) + '" y="0" width="' + (rx * 0.2).toFixed(0) + '" height="' +
         lift + '" fill="' + pal.edge + '"/>';
    /* extruded side, top face, inner bevel, lit edges */
    s += '<polygon points="' + dia(rx, ry, 10) + '" fill="' + pal.side + '"/>';
    s += '<polygon points="' + dia(rx, ry, 0) + '" fill="' + pal.top + '" stroke="' + pal.edge + '" stroke-width="2.5"/>';
    s += '<polygon points="' + dia(rx * 0.7, ry * 0.7, 0) + '" fill="' + pal.lt + '" opacity="0.5"/>';
    s += '<path d="M' + (-rx) + ',0 L0,' + (-ry) + ' L' + rx + ',0" fill="none" stroke="#fff" ' +
         'stroke-width="2" opacity="0.3"/>';
    return s;
  }

  function badge(n, big) {
    var r = big ? 22 : 19;
    var s = '<g class="mm-badge">';
    s += '<circle cx="0" cy="-1" r="' + r + '" fill="' + C.badge + '" stroke="' + C.badgeRim + '" stroke-width="2.5"/>';
    if (n.state === 'shut') {
      s += '<text x="0" y="' + (r * 0.34).toFixed(0) + '" text-anchor="middle" font-size="' +
           (r * 1.05).toFixed(0) + '" opacity="0.8">🔒</text>';
    } else {
      s += '<text x="0" y="' + (r * 0.36).toFixed(0) + '" text-anchor="middle" ' +
           'font-family="Palatino, Georgia, serif" font-size="' + (r * 1.05).toFixed(0) +
           '" font-weight="bold" fill="' + (n.state === 'done' ? C.badgeRim : C.cream) + '">' +
           escXml(n.label) + '</text>';
    }
    s += '</g>';
    return s;
  }

  /* A pair of crisp laurel branches curving up around a finished tile —
     drawn as a stem plus five clean leaves per side, mirrored. (The old
     version was three ellipses on a squiggle and read as a green scribble.) */
  function laurel(big) {
    var rx = (big ? BOSS.rx : TILE.rx);
    var span = rx * 0.92;
    function branch(dir) {
      var s = '<g transform="' + (dir < 0 ? 'scale(-1,1)' : '') + '">';
      s += '<path d="M' + (span * 0.86).toFixed(0) + ',14 C' + (span * 0.98).toFixed(0) + ',0 ' +
           (span * 0.9).toFixed(0) + ',-16 ' + (span * 0.62).toFixed(0) + ',-26" ' +
           'fill="none" stroke="' + C.laurelDk + '" stroke-width="2.6" stroke-linecap="round"/>';
      var leaves = [[0.9, 8, -28], [0.95, -1, -14], [0.9, -10, 2], [0.78, -18, 20], [0.62, -25, 38]];
      var i;
      for (i = 0; i < leaves.length; i++) {
        var lx = (span * leaves[i][0]).toFixed(1);
        var ly = leaves[i][1];
        s += '<ellipse cx="' + lx + '" cy="' + ly + '" rx="8.5" ry="3.6" fill="' + C.laurel +
             '" transform="rotate(' + leaves[i][2] + ' ' + lx + ' ' + ly + ')"/>';
        s += '<path d="M' + lx + ',' + ly + ' l6,-1" stroke="' + C.laurelDk +
             '" stroke-width="0.9" opacity="0.7"/>';
      }
      return s + '</g>';
    }
    return '<g class="mm-laurel" opacity="0.96">' + branch(1) + branch(-1) + '</g>';
  }

  /* the boss tile: castle and a pennant */
  function bossArt(n) {
    var s = '<g transform="translate(0,-30) scale(0.82)">' + Scenes.castle({
      roof: n.state === 'shut' ? '#6f6a63' : C.flag
    }) + '</g>';
    s += '<g transform="translate(52,-34)">' +
         '<rect x="-2" y="-44" width="3.5" height="50" fill="#3a2417"/>' +
         '<path d="M1.5,-44 l25,7 l-25,7 Z" fill="' + (n.state === 'shut' ? '#7d7873' : C.flag) + '"/>' +
         '</g>';
    return s;
  }

  /* the mascot standing ON the current tile */
  function mascotOn(avatar) {
    /* nested <svg> is legal SVG and lets us drop scenes.js art in unchanged */
    return '<g class="mm-mascot" pointer-events="none" transform="translate(-26,-76)">' +
      Scenes.mascot(52, avatar) + '</g>';
  }

  /* ---------- render ---------- */

  /* Node y fractions are authored per region and need not span the full
     0..1 range (region I runs 0.86 → 0.16). Mapping them raw left dead bands
     of empty board above and below the path. NORMALISE instead: the lowest
     node sits at the bottom margin, the highest at the top margin, and the
     spacing between them keeps the author's proportions exactly.
     The top margin is bigger because the boss castle and its pennant stand
     tall above their tile. */
  var TOP_MARGIN = 104, BOTTOM_MARGIN = 74;

  function layout(model) {
    var H = boardHeight(model.nodes.length);
    var i, n, lo = 1, hi = 0;
    for (i = 0; i < model.nodes.length; i++) {
      lo = Math.min(lo, model.nodes[i].y);
      hi = Math.max(hi, model.nodes[i].y);
    }
    var span = (hi - lo) || 1;
    var band = H - TOP_MARGIN - BOTTOM_MARGIN;
    var pts = [];
    for (i = 0; i < model.nodes.length; i++) {
      n = model.nodes[i];
      pts.push({
        id: n.id,
        x: Math.round(n.x * W),
        y: Math.round(TOP_MARGIN + ((n.y - lo) / span) * band),
        n: n
      });
    }
    return { H: H, pts: pts };
  }

  function render(model) {
    var t = TINTS[model.track] || TINTS.fabulae;
    var L = layout(model);
    var H = L.H;
    var pts = L.pts;

    var s = '<div class="map-view" tabindex="0" aria-label="' + escXml(model.titulus || '') + '">';
    s += '<svg class="worldmap" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" ' +
         'preserveAspectRatio="xMidYMin meet" role="group">';
    s += defs(t);
    s += planks(t, H);

    /* PARALLAX LAYER: bind() shifts this group as the board scrolls, so the
       scenery drifts slower than the path and the board reads as deep. */
    s += '<g class="mm-parallax" filter="url(#mmCarved)">' +
         scenery(model.track || 'fabulae', H, pts) + '</g>';

    var i;
    for (i = 0; i < pts.length; i++) {
      s += '<ellipse cx="' + pts[i].x + '" cy="' + pts[i].y + '" rx="130" ry="95" fill="url(#mmHaze)"/>';
    }

    s += pathLine(pts);

    for (i = 0; i < pts.length; i++) {
      var p = pts[i];
      var n = p.n;
      var big = (n.kind === 'boss');
      var open = (n.state === 'open' || n.state === 'done');
      var isHere = (n.id === model.foxNode);
      s += '<g class="map-node' + (open ? ' is-open' : ' is-shut') + (isHere ? ' is-here' : '') +
           '" data-id="' + escXml(n.id) + '" data-kind="' + escXml(n.kind) +
           '" data-state="' + escXml(n.state) + '"' +
           ' transform="translate(' + p.x + ',' + p.y + ')"' +
           (open ? ' role="button" tabindex="0" style="cursor:pointer"' : ' aria-disabled="true"') +
           ' aria-label="' + escXml((n.titulus || n.label || '') + (n.state === 'shut' ? ' — clausum' : '')) + '">';
      /* soft radial glow under the tile the learner is standing on */
      if (isHere && n.state !== 'shut') {
        var gr = (big ? BOSS.rx : TILE.rx) * 2.1;
        s += '<ellipse class="mm-glow" cx="0" cy="6" rx="' + gr.toFixed(0) + '" ry="' +
             (gr * 0.62).toFixed(0) + '" fill="url(#mmGlow)"/>';
      }
      s += '<g filter="url(#mmDrop)">' + tile(n, big) + '</g>';
      if (n.state === 'done') { s += laurel(big); }
      if (big) {
        s += bossArt(n);
        if (n.state !== 'done') { s += badge(n, true); }
      } else {
        s += badge(n, false);
      }
      if (isHere) { s += mascotOn(model.avatar); }
      s += '</g>';
    }

    s += '<rect width="' + W + '" height="' + H + '" fill="url(#mmVig)" pointer-events="none"/>';
    s += '</svg></div>';
    return s;
  }

  /* ---------- interaction: pan, parallax, auto-centre, clicks ---------- */

  function bind(root, model, handlers) {
    var view = root.querySelector('.map-view');
    var svg = root.querySelector('svg.worldmap');
    if (!view || !svg) { return; }
    var L = layout(model);
    var H = L.H;

    /* one SVG unit is this many CSS pixels right now */
    function scale() { return (view.clientWidth || svg.clientWidth || W) / W; }

    /* Pin the board's pixel height explicitly instead of leaving it to
       `height:auto` + viewBox aspect ratio. Two reasons: the scroll range is
       then correct on the very first frame (auto-centring below depends on
       it), and a phone rotation cannot leave a stale height behind. */
    function sizeBoard() {
      var boardPx = Math.round(H * scale());
      svg.style.height = boardPx + 'px';
      /* A short region (few nodes) can be shorter than the viewport, which
         left a dead strip of page background under the board. Shrink the
         viewport to the board in that case; tall boards keep the CSS height
         and scroll. */
      view.style.height = '';
      if (boardPx < view.clientHeight) { view.style.height = boardPx + 'px'; }
    }
    sizeBoard();

    var par = svg.querySelector('.mm-parallax');
    function onScroll() {
      if (!par) { return; }
      var dy = (view.scrollTop / (scale() || 1)) * 0.3;
      par.setAttribute('transform', 'translate(0,' + dy.toFixed(1) + ')');
    }
    view.addEventListener('scroll', onScroll);

    function centreOnce() {
      var i, p = null;
      for (i = 0; i < L.pts.length; i++) { if (L.pts[i].id === model.foxNode) { p = L.pts[i]; } }
      if (!p) { p = L.pts[L.pts.length - 1]; }
      if (!p) { return true; }
      var max = view.scrollHeight - view.clientHeight;
      if (max <= 0) { return false; }               /* not laid out yet */
      var target = p.y * scale() - view.clientHeight / 2;
      view.scrollTop = Math.max(0, Math.min(max, target));
      onScroll();
      return true;
    }
    onScroll();                          /* parallax at the rest position */
    if (!centreOnce()) {
      if (window.requestAnimationFrame) { window.requestAnimationFrame(centreOnce); }
      window.setTimeout(centreOnce, 80);
      window.setTimeout(centreOnce, 300);
    }
    window.addEventListener('resize', function () { sizeBoard(); onScroll(); });

    /* DRAG TO PAN. Touch and wheel are already handled by the scroll
       container (which keeps native momentum on phones); this adds
       click-and-drag for a mouse, and suppresses the click that would
       otherwise fire on the tile you dragged from. */
    var dragging = false, startY = 0, startTop = 0, moved = 0;
    function down(e) {
      if (e.button !== undefined && e.button !== 0) { return; }
      dragging = true; moved = 0;
      startY = e.clientY;
      startTop = view.scrollTop;
    }
    function move(e) {
      if (!dragging) { return; }
      var dy = e.clientY - startY;
      moved = Math.max(moved, Math.abs(dy));
      view.scrollTop = startTop - dy;
    }
    function up() { dragging = false; }
    view.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);

    /* node activation (click or keyboard) */
    var nodes = Array.prototype.slice.call(root.querySelectorAll('.map-node'));
    nodes.forEach(function (gEl) {
      var id = gEl.getAttribute('data-id');
      var kind = gEl.getAttribute('data-kind');
      var st = 'shut', i;
      for (i = 0; i < model.nodes.length; i++) {
        if (model.nodes[i].id === id) { st = model.nodes[i].state; break; }
      }
      if (st !== 'open' && st !== 'done') { return; }
      function fire() { if (handlers.onNode) { handlers.onNode(id, kind); } }
      gEl.addEventListener('click', function () {
        if (moved > 6) { return; }   /* that was a pan, not a tap */
        fire();
      });
      gEl.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) { e.preventDefault(); fire(); }
      });
    });
  }

  return { render: render, bind: bind, TINTS: TINTS };
})();
