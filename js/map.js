/* ============================================================
   map.js — PRŌVINCIA: the SMB3-style overworld (ES5, SVG)
   A bright green/blue bonus map laid OVER the linear cursus
   (showHome). Fable nodes sit along a winding path; the fox
   avatar stands on the current node; the path ends in a boss
   castle, then a locked future gate. This module only RENDERS
   the map + reports clicks; app.js owns all progress logic and
   decides which nodes are open/locked and what a click does.

   Public API:
     Map.render(model) -> html string
     Map.bind(rootEl, model, handlers)   // wire node clicks
   where model = {
     nodes: [{id,kind,x,y,label,state:'done'|'open'|'shut',links}],
     foxNode: 'f2'         // node id the avatar stands on
   }
   handlers = { onNode: function(nodeId, kind){} }
   ============================================================ */
var WorldMap = (function () {
  'use strict';

  /* logical drawing surface; SVG scales to the container width */
  var W = 600, H = 820;

  /* SMB3-ish overworld palette (bright, distinct from the fresco chrome) */
  var C = {
    grass:   '#7ec850',
    grassDk: '#5fa838',
    water:   '#4ea3d9',
    waterDk: '#3a82b8',
    sand:    '#e8d49a',
    path:    '#caa45a',
    pathDk:  '#a07c38',
    nodeOpen:'#3fb53f',
    nodeDone:'#2f8f2f',
    nodeShut:'#b9b9b9',
    nodeShutDk:'#9a9a9a',
    castle:  '#c9b89a',
    ink:     '#2c3a1a',
    cream:   '#f3f7e8'
  };

  function px(frac, dim) { return Math.round(frac * dim); }

  /* ---- decorative scenery scattered across the grass ---- */
  function scenery() {
    var s = '';
    /* a pond in the lower-right, like SMB3's water tiles */
    s += '<ellipse cx="' + px(0.82, W) + '" cy="' + px(0.80, H) + '" rx="95" ry="62" fill="' + C.water + '"/>';
    s += '<ellipse cx="' + px(0.82, W) + '" cy="' + px(0.80, H) + '" rx="95" ry="62" fill="none" stroke="' + C.waterDk + '" stroke-width="4"/>';
    s += '<path d="M' + px(0.72, W) + ',' + px(0.80, H) + ' q12,-6 24,0 q12,6 24,0" stroke="' + C.cream + '" stroke-width="2.5" fill="none" opacity="0.6"/>';
    /* little hill clusters */
    s += hill(0.12, 0.30) + hill(0.86, 0.22) + hill(0.20, 0.58) + hill(0.74, 0.50);
    /* bushes */
    s += bushDot(0.40, 0.90) + bushDot(0.60, 0.92) + bushDot(0.10, 0.74) + bushDot(0.90, 0.40) + bushDot(0.08, 0.46);
    return s;
  }
  function hill(fx, fy) {
    var x = px(fx, W), y = px(fy, H);
    return '<path d="M' + (x - 40) + ',' + y + ' q40,-50 80,0 Z" fill="' + C.grassDk + '" opacity="0.55"/>';
  }
  function bushDot(fx, fy) {
    var x = px(fx, W), y = px(fy, H);
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<circle cx="-8" cy="0" r="9" fill="' + C.grassDk + '"/>' +
      '<circle cx="4" cy="-3" r="11" fill="' + C.grassDk + '"/>' +
      '<circle cx="13" cy="1" r="8" fill="' + C.grassDk + '"/></g>';
  }

  /* ---- the connecting path drawn behind the nodes ---- */
  function paths(nodes) {
    var byId = {}, i;
    for (i = 0; i < nodes.length; i++) { byId[nodes[i].id] = nodes[i]; }
    var s = '';
    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!n.links) { continue; }
      var j;
      for (j = 0; j < n.links.length; j++) {
        var m = byId[n.links[j]];
        if (!m) { continue; }
        var x1 = px(n.x, W), y1 = px(n.y, H), x2 = px(m.x, W), y2 = px(m.y, H);
        /* dashed "footprint" road: thick tan stroke + dotted centre line */
        s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
             '" stroke="' + C.pathDk + '" stroke-width="20" stroke-linecap="round"/>';
        s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
             '" stroke="' + C.path + '" stroke-width="14" stroke-linecap="round"/>';
        s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
             '" stroke="' + C.cream + '" stroke-width="2.5" stroke-dasharray="2 10" stroke-linecap="round" opacity="0.8"/>';
      }
    }
    return s;
  }

  /* ---- a single node (fable disc, boss castle, or locked gate) ---- */
  function node(n) {
    var x = px(n.x, W), y = px(n.y, H);
    var open = (n.state === 'open' || n.state === 'done');
    var s = '<g class="map-node" data-id="' + n.id + '" data-kind="' + n.kind + '" transform="translate(' + x + ',' + y + ')"' +
            (open ? ' style="cursor:pointer"' : '') + '>';

    if (n.kind === 'boss') {
      /* castle on a stone platform; greyed when shut */
      var roof = open ? '#b33a2b' : '#8a8a8a';
      s += '<ellipse cx="0" cy="34" rx="50" ry="14" fill="' + (open ? C.grassDk : C.nodeShutDk) + '"/>';
      s += '<g transform="translate(0,6) scale(0.9)">' + Scenes.castle({ roof: roof }) + '</g>';
      if (n.state === 'done') {
        s += '<text x="0" y="-58" text-anchor="middle" font-size="26">👑</text>';
      } else if (n.state === 'shut') {
        s += '<text x="0" y="-2" text-anchor="middle" font-size="24">🔒</text>';
      }
    } else if (n.kind === 'gate') {
      /* locked future region marker */
      s += '<circle cx="0" cy="0" r="30" fill="' + C.nodeShut + '" stroke="' + C.nodeShutDk + '" stroke-width="4"/>';
      s += '<text x="0" y="2" text-anchor="middle" dominant-baseline="middle" font-size="26">🔒</text>';
    } else {
      /* fable disc — chunky SMB3 button with a drop shadow */
      var top = (n.state === 'done') ? C.nodeDone : (open ? C.nodeOpen : C.nodeShut);
      var side = (n.state === 'done') ? '#1f6f1f' : (open ? '#2f8f2f' : C.nodeShutDk);
      s += '<ellipse cx="0" cy="8" rx="34" ry="30" fill="' + side + '"/>';
      s += '<circle cx="0" cy="0" r="32" fill="' + top + '" stroke="' + side + '" stroke-width="3"/>';
      if (n.state === 'done') {
        s += '<path d="M-12,0 l8,9 l16,-18" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      } else if (n.state === 'shut') {
        s += '<text x="0" y="2" text-anchor="middle" dominant-baseline="middle" font-size="24">🔒</text>';
      } else {
        s += '<text x="0" y="3" text-anchor="middle" dominant-baseline="middle" font-size="22" font-family="Palatino, Georgia, serif" font-weight="bold" fill="#fff">' + n.label + '</text>';
      }
    }
    s += '</g>';
    return s;
  }

  /* ---- the fox avatar standing on its current node ---- */
  function avatar(nodes, foxNode) {
    var i, n = null;
    for (i = 0; i < nodes.length; i++) { if (nodes[i].id === foxNode) { n = nodes[i]; break; } }
    if (!n) { n = nodes[0]; }
    var x = px(n.x, W), y = px(n.y, H) - 46;
    /* the mascot SVG sits in a small <g>; CSS transitions the translate so the
       fox "walks" when foxNode changes between renders (handled by re-render). */
    return '<g class="map-fox" pointer-events="none" transform="translate(' + x + ',' + y + ')">' +
      '<ellipse cx="0" cy="44" rx="20" ry="6" fill="rgba(0,0,0,0.18)"/>' +
      '<g transform="translate(-26,-26)">' + Scenes.mascot(52) + '</g>' +
      '</g>';
  }

  function render(model) {
    var s = '<svg class="worldmap" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">';
    /* grass field */
    s += '<rect width="' + W + '" height="' + H + '" fill="' + C.grass + '"/>';
    s += scenery();
    s += paths(model.nodes);
    var i;
    for (i = 0; i < model.nodes.length; i++) { s += node(model.nodes[i]); }
    s += avatar(model.nodes, model.foxNode);
    s += '</svg>';
    return s;
  }

  /* attach click handlers to open nodes */
  function bind(root, model, handlers) {
    var groups = root.querySelectorAll('.map-node');
    var arr = Array.prototype.slice.call(groups);
    arr.forEach(function (gEl) {
      var id = gEl.getAttribute('data-id');
      var kind = gEl.getAttribute('data-kind');
      /* find state from model */
      var i, st = 'shut';
      for (i = 0; i < model.nodes.length; i++) {
        if (model.nodes[i].id === id) { st = model.nodes[i].state; break; }
      }
      if (st === 'open' || st === 'done') {
        gEl.addEventListener('click', function () {
          if (handlers.onNode) { handlers.onNode(id, kind); }
        });
      }
    });
  }

  return { render: render, bind: bind };
})();
