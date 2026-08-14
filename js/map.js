/* ============================================================
   map.js — the overworld board (ES5, pure SVG)
   ------------------------------------------------------------
   DESIGN §3: a dark carved wooden board seen slightly from above,
   with bevelled diamond tiles standing on little pedestal feet,
   zigzagging from the bottom of the board to the top, numbered
   badges, decorative props sitting at depth, and the region's
   boss on a bigger tile at the summit.

   This module only RENDERS and reports clicks. app.js owns all
   progress logic and decides which node is open, done or locked.

   Public API (unchanged from the previous renderer):
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

   WHY SVG AND NOT CANVAS: crisp at any zoom on any phone, text is
   real text for screen readers, and states are one attribute swap
   instead of a repaint loop.
   ============================================================ */
var WorldMap = (function () {
  'use strict';

  /* logical drawing width; the SVG scales to the container. Every number
     below is in these units, so the whole board is resolution independent. */
  var W = 600;

  /* Per-track tint (DESIGN §3). Only these six values change between tracks;
     everything else is shared, so a new track is a palette, not a renderer.
     Historia (indigo night) and Aeneis (wine-dark sea) are reserved now so
     the hook is proven before their content exists. */
  var TINTS = {
    fabulae: { wood: '#4a2f1d', woodDk: '#311d10', woodLt: '#5d3d27',
               seam: '#241408', glow: '#e0a93e', haze: '#8a5a30' },
    historia: { wood: '#232a45', woodDk: '#161a2e', woodLt: '#31395c',
                seam: '#10131f', glow: '#d9c27a', haze: '#3d4a78' },
    aeneis: { wood: '#3d1f2a', woodDk: '#28131b', woodLt: '#512a38',
              seam: '#1b0c12', glow: '#e0a93e', haze: '#6b3346' }
  };

  /* shared palette (tile faces, badges, laurel) */
  var C = {
    tileTop: '#c8a463', tileTopLt: '#e2c187', tileSide: '#8a6a37', tileEdge: '#6b4f26',
    doneTop: '#e8bf62', doneTopLt: '#fbe0a0', doneSide: '#b8862a', doneEdge: '#8a621a',
    shutTop: '#6d6155', shutTopLt: '#847768', shutSide: '#4b4238', shutEdge: '#3a332b',
    badge: '#2b1c16', badgeRim: '#e0a93e',
    cream: '#f3e6d0', creamDim: '#c9b69a',
    laurel: '#8fae55', shadow: 'rgba(0,0,0,0.45)',
    stone: '#c9b89a', stoneDk: '#9c8a6a', flag: '#b33a2b'
  };

  /* board height grows with the number of nodes so tiles never crowd:
     one screenful is roughly two tiles on a phone. */
  function boardHeight(nodeCount) {
    return Math.max(760, 200 * nodeCount + 260);
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

  /* ---------- background: planks + grain ---------- */

  function defs(t) {
    var s = '<defs>';
    /* wood grain: stretched fractal noise (high frequency across, very low
       down) reads as long fibres running along the plank. Drawn once into an
       overlay rect at low opacity, which is far cheaper than filtering art. */
    s += '<filter id="mmGrain" x="0" y="0" width="100%" height="100%">' +
         '<feTurbulence type="fractalNoise" baseFrequency="0.9 0.012" numOctaves="3" seed="7" result="n"/>' +
         '<feColorMatrix in="n" type="matrix" values="' +
           '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0 0 0 0"/>' +
         '</filter>';
    /* soft drop shadow under tiles and props */
    s += '<filter id="mmDrop" x="-40%" y="-40%" width="180%" height="180%">' +
         '<feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.45"/>' +
         '</filter>';
    /* warm pool of light behind the path */
    s += '<radialGradient id="mmHaze" cx="50%" cy="50%" r="50%">' +
         '<stop offset="0%" stop-color="' + t.haze + '" stop-opacity="0.5"/>' +
         '<stop offset="100%" stop-color="' + t.haze + '" stop-opacity="0"/>' +
         '</radialGradient>';
    s += '</defs>';
    return s;
  }

  function planks(t, H) {
    var s = '<rect width="' + W + '" height="' + H + '" fill="' + t.wood + '"/>';
    /* horizontal planks with alternating shade + a dark seam between them */
    var y = 0, i = 0, ph = 96;
    while (y < H) {
      s += '<rect x="0" y="' + y + '" width="' + W + '" height="' + ph + '" fill="' +
           ((i % 2) ? t.woodLt : t.wood) + '" opacity="0.55"/>';
      s += '<rect x="0" y="' + (y + ph - 3) + '" width="' + W + '" height="3" fill="' + t.seam + '" opacity="0.85"/>';
      /* a couple of plank-end joints, offset per row so it does not tile */
      s += '<rect x="' + (60 + (i % 3) * 170) + '" y="' + y + '" width="3" height="' + ph + '" fill="' +
           t.seam + '" opacity="0.6"/>';
      y += ph;
      i++;
    }
    /* the grain overlay, then a vignette that pushes the edges into shadow */
    s += '<rect width="' + W + '" height="' + H + '" filter="url(#mmGrain)" opacity="0.16"/>';
    s += '<rect width="' + W + '" height="' + H + '" fill="url(#mmVig)" opacity="0"/>';
    s += '<rect x="0" y="0" width="26" height="' + H + '" fill="' + t.seam + '" opacity="0.5"/>';
    s += '<rect x="' + (W - 26) + '" y="0" width="26" height="' + H + '" fill="' + t.seam + '" opacity="0.5"/>';
    return s;
  }

  /* ---------- decorative props (the parallax layer) ---------- */

  function propTree(scale) {
    var s = '<g transform="scale(' + scale + ')">';
    s += '<rect x="-5" y="-26" width="10" height="28" rx="3" fill="#3b2412"/>';
    s += '<path d="M0,-86 L26,-42 L-26,-42 Z" fill="#3f5a2c"/>';
    s += '<path d="M0,-66 L30,-20 L-30,-20 Z" fill="#4c6b34"/>';
    s += '<path d="M0,-66 L30,-20 L0,-20 Z" fill="#3f5a2c" opacity="0.7"/>';
    s += '</g>';
    return s;
  }
  function propAmphora(scale) {
    var s = '<g transform="scale(' + scale + ')">';
    s += '<path d="M0,-46 q-14,10 -14,26 q0,18 14,22 q14,-4 14,-22 q0,-16 -14,-26 Z" fill="#7a4a26"/>';
    s += '<path d="M0,-46 q-14,10 -14,26 q0,18 14,22 Z" fill="#5a3419"/>';
    s += '<rect x="-6" y="-52" width="12" height="8" rx="2" fill="#8a5a30"/>';
    s += '<path d="M-13,-38 q-10,6 -3,16 M13,-38 q10,6 3,16" stroke="#5a3419" stroke-width="3" fill="none"/>';
    s += '<ellipse cx="0" cy="4" rx="15" ry="5" fill="rgba(0,0,0,0.35)"/>';
    s += '</g>';
    return s;
  }
  /* carved chess-piece style figurines: the fable animals as dark silhouettes
     standing on turned bases, like pieces left on the board */
  function propFigurine(kind, scale) {
    var body = (kind === 'wolf')
      ? '<path d="M-13,0 v-22 q0,-16 13,-20 q6,10 6,20 q6,-4 10,2 l-6,8 v12 Z" fill="#2f2118"/>' +
        '<path d="M6,-42 l4,-10 l5,9 Z" fill="#2f2118"/>'
      : '<path d="M-12,0 v-20 q0,-15 12,-19 q10,4 12,14 q8,-8 12,-2 l-8,10 v17 Z" fill="#3a2417"/>' +
        '<path d="M-7,-40 l-3,-9 l7,5 Z" fill="#3a2417"/>';
    return '<g transform="scale(' + scale + ')">' +
      '<ellipse cx="0" cy="6" rx="20" ry="7" fill="rgba(0,0,0,0.4)"/>' +
      '<path d="M-16,4 q16,-8 32,0 q-16,7 -32,0 Z" fill="#241408"/>' +
      body + '</g>';
  }
  function propColumn(scale) {
    return '<g transform="scale(' + scale + ')">' +
      '<rect x="-14" y="-4" width="28" height="8" rx="2" fill="#b8a682"/>' +
      '<rect x="-10" y="-56" width="20" height="52" fill="#c9b89a"/>' +
      '<rect x="-10" y="-56" width="7" height="52" fill="#a39174"/>' +
      '<rect x="-15" y="-64" width="30" height="9" rx="2" fill="#d8c9ab"/>' +
      '</g>';
  }

  /* Scatter props down both sides of the board, avoiding the middle corridor
     where the tiles sit. Smaller + fainter higher up = distance. */
  function scenery(track, H) {
    var rnd = rngFrom('props:' + track);
    var s = '', y, i, left, x, kind, scale, depth;
    var count = Math.round(H / 130);
    for (i = 0; i < count; i++) {
      y = 90 + (i / count) * (H - 150) + rnd() * 40;
      left = (i % 2 === 0);
      x = left ? (40 + rnd() * 70) : (W - 40 - rnd() * 70);
      depth = 1 - (y / H);                 /* 1 at the top, 0 at the bottom */
      scale = 0.55 + (1 - depth) * 0.55;   /* nearer the bottom = bigger */
      kind = rnd();
      var art;
      if (kind < 0.42) { art = propTree(scale); }
      else if (kind < 0.62) { art = propAmphora(scale); }
      else if (kind < 0.86) { art = propFigurine(rnd() < 0.5 ? 'wolf' : 'fox', scale); }
      else { art = propColumn(scale); }
      s += '<g transform="translate(' + Math.round(x) + ',' + Math.round(y) + ')" opacity="' +
           (0.55 + (1 - depth) * 0.4).toFixed(2) + '">' + art + '</g>';
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
    var s = '<path d="' + d + '" fill="none" stroke="#241408" stroke-width="26" stroke-linecap="round" opacity="0.75"/>';
    s += '<path d="' + d + '" fill="none" stroke="#8a6a37" stroke-width="16" stroke-linecap="round" opacity="0.85"/>';
    s += '<path d="' + d + '" fill="none" stroke="' + C.badgeRim +
         '" stroke-width="3" stroke-dasharray="2 16" stroke-linecap="round" opacity="0.75"/>';
    return s;
  }

  /* ---------- tiles ---------- */

  /* one bevelled diamond on pedestal feet, centred on (0,0) of its own group */
  function tile(n, big) {
    var rx = big ? 116 : 88;          /* half width  */
    var ry = big ? 68 : 51;           /* half height (isometric squash) */
    var lift = big ? 20 : 16;         /* how tall the pedestal is */
    var pal = (n.state === 'done')
      ? { top: C.doneTop, lt: C.doneTopLt, side: C.doneSide, edge: C.doneEdge }
      : (n.state === 'shut')
        ? { top: C.shutTop, lt: C.shutTopLt, side: C.shutSide, edge: C.shutEdge }
        : { top: C.tileTop, lt: C.tileTopLt, side: C.tileSide, edge: C.tileEdge };

    var dia = function (r1, r2, y) {
      return '0,' + (y - r2) + ' ' + r1 + ',' + y + ' 0,' + (y + r2) + ' ' + (-r1) + ',' + y;
    };
    var s = '';
    /* ground shadow */
    s += '<ellipse cx="0" cy="' + (lift + 14) + '" rx="' + (rx * 0.8) + '" ry="' + (ry * 0.42) +
         '" fill="' + C.shadow + '"/>';
    /* pedestal feet: two short posts under the diamond */
    s += '<rect x="' + (-rx * 0.42) + '" y="0" width="' + (rx * 0.22) + '" height="' + lift +
         '" fill="' + pal.edge + '"/>';
    s += '<rect x="' + (rx * 0.2) + '" y="0" width="' + (rx * 0.22) + '" height="' + lift +
         '" fill="' + pal.edge + '"/>';
    /* the thick side of the slab (extruded diamond) */
    s += '<polygon points="' + dia(rx, ry, 12) + '" fill="' + pal.side + '"/>';
    /* the top face + inner bevel */
    s += '<polygon points="' + dia(rx, ry, 0) + '" fill="' + pal.top + '" stroke="' + pal.edge + '" stroke-width="3"/>';
    s += '<polygon points="' + dia(rx * 0.72, ry * 0.72, 0) + '" fill="' + pal.lt + '" opacity="0.55"/>';
    /* highlight along the two upper edges = the bevel catching the light */
    s += '<path d="M' + (-rx) + ',0 L0,' + (-ry) + ' L' + rx + ',0" fill="none" stroke="#fff" ' +
         'stroke-width="2.5" opacity="0.28"/>';
    return s;
  }

  /* dark numbered badge in the middle of a tile */
  function badge(n) {
    var s = '<g class="mm-badge">';
    s += '<circle cx="0" cy="-2" r="28" fill="' + C.badge + '" stroke="' + C.badgeRim + '" stroke-width="3"/>';
    if (n.state === 'shut') {
      s += '<text x="0" y="7" text-anchor="middle" font-size="24" opacity="0.75">🔒</text>';
    } else {
      s += '<text x="0" y="7" text-anchor="middle" font-family="Palatino, Georgia, serif" ' +
           'font-size="26" font-weight="bold" fill="' + (n.state === 'done' ? C.badgeRim : C.cream) + '">' +
           escXml(n.label) + '</text>';
    }
    s += '</g>';
    return s;
  }

  /* laurel sprigs framing a finished tile */
  function laurel() {
    var s = '<g opacity="0.95">';
    s += '<path d="M-34,10 q-10,-16 -4,-32" stroke="' + C.laurel + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    s += '<path d="M34,10 q10,-16 4,-32" stroke="' + C.laurel + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    var i, y;
    for (i = 0; i < 3; i++) {
      y = 2 - i * 11;
      s += '<ellipse cx="' + (-38 + i * 2) + '" cy="' + y + '" rx="6" ry="3" fill="' + C.laurel +
           '" transform="rotate(-35 ' + (-38 + i * 2) + ' ' + y + ')"/>';
      s += '<ellipse cx="' + (38 - i * 2) + '" cy="' + y + '" rx="6" ry="3" fill="' + C.laurel +
           '" transform="rotate(35 ' + (38 - i * 2) + ' ' + y + ')"/>';
    }
    s += '</g>';
    return s;
  }

  /* the boss tile: bigger slab, castle and a flag */
  function bossArt(n) {
    var s = '<g transform="translate(0,-34) scale(0.95)">' + Scenes.castle({
      roof: n.state === 'shut' ? '#6f6a63' : C.flag
    }) + '</g>';
    /* pennant on a pole beside the keep */
    s += '<g transform="translate(64,-40)">' +
         '<rect x="-2" y="-52" width="4" height="60" fill="#3a2417"/>' +
         '<path d="M2,-52 l30,9 l-30,9 Z" fill="' + (n.state === 'shut' ? '#7d7873' : C.flag) + '"/>' +
         '</g>';
    return s;
  }

  /* the mascot standing ON the current tile */
  function mascotOn(avatar) {
    /* nested <svg> is legal SVG and lets us drop scenes.js art in unchanged */
    return '<g class="mm-mascot" pointer-events="none" transform="translate(-37,-104)">' +
      Scenes.mascot(74, avatar) + '</g>';
  }

  function escXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- render ---------- */

  function layout(model) {
    var H = boardHeight(model.nodes.length);
    var pts = [], i, n;
    for (i = 0; i < model.nodes.length; i++) {
      n = model.nodes[i];
      pts.push({
        id: n.id,
        x: Math.round(n.x * W),
        /* keep tiles clear of the very top/bottom edges of the board */
        y: Math.round(60 + n.y * (H - 140)),
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
    s += '<g class="mm-parallax">' + scenery(model.track || 'fabulae', H) + '</g>';

    /* warm light pooled along the path so the eye follows it upward */
    var i;
    for (i = 0; i < pts.length; i++) {
      s += '<ellipse cx="' + pts[i].x + '" cy="' + pts[i].y + '" rx="150" ry="110" fill="url(#mmHaze)"/>';
    }

    s += pathLine(pts);

    /* tiles, bottom-up, so a higher tile overlaps the one behind it */
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
      /* the pulsing ring under the tile the learner is standing on */
      if (isHere && n.state !== 'shut') {
        s += '<ellipse class="mm-glow" cx="0" cy="10" rx="' + (big ? 134 : 106) + '" ry="' + (big ? 80 : 64) +
             '" fill="none" stroke="' + t.glow + '" stroke-width="5"/>';
      }
      s += '<g filter="url(#mmDrop)">' + tile(n, big) + '</g>';
      if (big) {
        s += bossArt(n);
        if (n.state === 'done') { s += laurel(); }
        else { s += badge(n); }
      } else {
        if (n.state === 'done') { s += laurel(); }
        s += badge(n);
      }
      if (isHere) { s += mascotOn(model.avatar); }
      s += '</g>';
    }

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
      svg.style.height = Math.round(H * scale()) + 'px';
    }
    sizeBoard();

    /* PARALLAX: the props group is pushed back DOWN by a fraction of the
       scroll, so it travels slower than the board it sits on. Set as an SVG
       transform ATTRIBUTE — a CSS transform would fight the layout. */
    var par = svg.querySelector('.mm-parallax');
    function onScroll() {
      if (!par) { return; }
      var dy = (view.scrollTop / (scale() || 1)) * 0.3;
      par.setAttribute('transform', 'translate(0,' + dy.toFixed(1) + ')');
    }
    view.addEventListener('scroll', onScroll);

    /* AUTO-CENTRE on the current node.
       TIMING: an SVG sized by viewBox aspect ratio does not have its final
       height on the first frame after innerHTML, so scrollHeight can still
       equal clientHeight and the centring silently does nothing. Retry until
       the board is genuinely taller than its viewport (or we run out of
       tries), rather than trusting one requestAnimationFrame. */
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
    /* with the height pinned above this succeeds immediately; the deferred
       retries only matter if the frame is still being laid out. */
    if (!centreOnce()) {
      if (window.requestAnimationFrame) { window.requestAnimationFrame(centreOnce); }
      window.setTimeout(centreOnce, 80);
      window.setTimeout(centreOnce, 300);
    }
    /* a rotation changes the scale: re-pin the height, then re-centre */
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
