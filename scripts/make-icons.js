/* ============================================================
   scripts/make-icons.js — generates icons/icon-*.png (PWA)
   ------------------------------------------------------------
   WHY THIS EXISTS. The manifest needs real PNG icons: Android's installer
   and the Chrome install prompt both refuse SVG-only icon sets, and an
   inline data: URI is not allowed in a webmanifest icon `src` on every
   engine. We have no build step and no image tooling in this project, so
   the PNGs are generated here, from the SAME fox the app draws
   (js/scenes.js Scenes.mascot), by a ~200-line rasteriser using only
   node's built-in zlib. Re-run it if the mascot or the palette changes:

       node scripts/make-icons.js

   NOT part of the site. The site ships the committed PNGs.

   HOW IT WORKS (three plain steps):
     1. describe the mascot as a list of filled shapes in mascot coordinates
        (the SVG viewBox is -30..30 on both axes);
     2. for every output pixel take NxN sample points, ask the topmost shape
        that contains each one for its colour, and average — that averaging
        IS the antialiasing;
     3. write the RGB rows into a minimal PNG (IHDR + zlib'd IDAT + IEND).
   ============================================================ */
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

/* ---- palette: identical values to js/scenes.js C.* and css/styles.css ---- */
var C = {
  fox:      '#d96e30',
  foxDark:  '#b6531e',
  foxLight: '#ffeede',
  ink:      '#3a2417',
  wall:     '#2b1c16',   /* --wall */
  ochre:    '#e0a93e'    /* --ochre */
};

function rgb(hex) {
  return [parseInt(hex.substr(1, 2), 16),
          parseInt(hex.substr(3, 2), 16),
          parseInt(hex.substr(5, 2), 16)];
}

/* ============================================================
   shape primitives — each returns {hit(x,y), color}
   ============================================================ */

function circle(cx, cy, r, color) {
  var r2 = r * r;
  return {
    color: rgb(color),
    hit: function (x, y) {
      var dx = x - cx, dy = y - cy;
      return dx * dx + dy * dy <= r2;
    }
  };
}

/* an annulus, for the medallion ring */
function ring(cx, cy, rOuter, rInner, color) {
  var ro2 = rOuter * rOuter, ri2 = rInner * rInner;
  return {
    color: rgb(color),
    hit: function (x, y) {
      var dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
      return d2 <= ro2 && d2 >= ri2;
    }
  };
}

/* generic filled polygon (ray casting; the mascot has no self-intersections
   so the odd-even rule and the nonzero rule agree) */
function polygon(pts, color) {
  return {
    color: rgb(color),
    hit: function (x, y) {
      var inside = false, i, j, xi, yi, xj, yj;
      for (i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        xi = pts[i][0]; yi = pts[i][1];
        xj = pts[j][0]; yj = pts[j][1];
        if (((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
          inside = !inside;
        }
      }
      return inside;
    }
  };
}

/* flatten a quadratic bezier into line segments (SVG "q" is relative) */
function quadTo(out, from, c, to, steps) {
  var i, t, mt, x, y;
  for (i = 1; i <= steps; i++) {
    t = i / steps; mt = 1 - t;
    x = mt * mt * from[0] + 2 * mt * t * c[0] + t * t * to[0];
    y = mt * mt * from[1] + 2 * mt * t * c[1] + t * t * to[1];
    out.push([x, y]);
  }
}

/* ============================================================
   the mascot, in viewBox coordinates (-30..30), bottom of the list
   is the bottom of the stack — exactly the order Scenes.mascot draws
   ============================================================ */
function mascotShapes() {
  /* muzzle: M-12,8 q12,14 24,0 q-4,12 -12,12 q-8,0 -12,-12 Z */
  var m = [[-12, 8]];
  quadTo(m, [-12, 8], [0, 22], [12, 8], 14);
  quadTo(m, [12, 8], [8, 20], [0, 20], 14);
  quadTo(m, [0, 20], [-8, 20], [-12, 8], 14);

  return [
    polygon([[-14, -22], [-4, -6], [-20, -8]], C.foxDark),   /* left ear  */
    polygon([[14, -22], [20, -8], [4, -6]], C.foxDark),      /* right ear */
    circle(0, 2, 17, C.fox),                                  /* head      */
    polygon(m, C.foxLight),                                   /* muzzle    */
    circle(0, 14, 3.4, C.ink),                                /* nose      */
    circle(-7, 0, 2.8, C.ink),                                /* left eye  */
    circle(7, 0, 2.8, C.ink)                                  /* right eye */
  ];
}

/* ============================================================
   render one square icon
     size      : pixels
     foxSpan   : how much of the icon's width the 60-unit mascot box covers
                 (maskable icons keep everything inside the central 80%,
                  so they pass a smaller number)
     withRing  : draw the ochre medallion ring
   ============================================================ */
function renderIcon(size, foxSpan, withRing) {
  var SS = 3;                       /* 3x3 supersampling = 9 samples/pixel */
  var bg = rgb(C.wall);
  var shapes = mascotShapes();

  /* mascot units -> pixels. The head sits at y=2 and the ears reach y=-22,
     so the drawn mass is slightly below centre; nudge it up by 1.5 units. */
  var scale = (size * foxSpan) / 60;
  var cx = size / 2, cy = size / 2 + 1.5 * scale;

  var layers = [];
  if (withRing) {
    /* the ring is described in PIXELS (it belongs to the icon frame, not to
       the mascot), so it is flagged and tested in pixel space below. */
    var rg = ring(size / 2, size / 2, size * 0.455, size * 0.415, C.ochre);
    rg.pixelSpace = true;
    layers.push(rg);
  }
  /* topmost last in `shapes`; we test from the top down, so reverse */
  var stack = layers.concat(shapes).reverse();

  var row = Buffer.alloc(size * 3);
  var raw = Buffer.alloc((size * 3 + 1) * size);
  var y, x, sy, sx, s, i, hit, r, g, b, px, py, off = 0;

  for (y = 0; y < size; y++) {
    for (x = 0; x < size; x++) {
      r = 0; g = 0; b = 0;
      for (sy = 0; sy < SS; sy++) {
        for (sx = 0; sx < SS; sx++) {
          px = (x + (sx + 0.5) / SS - cx) / scale;
          py = (y + (sy + 0.5) / SS - cy) / scale;
          hit = null;
          for (i = 0; i < stack.length; i++) {
            /* the ring is in PIXEL space, the mascot in viewBox space */
            s = stack[i];
            if (s.pixelSpace) {
              if (s.hit(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS)) { hit = s; break; }
            } else if (s.hit(px, py)) { hit = s; break; }
          }
          var c = hit ? hit.color : bg;
          r += c[0]; g += c[1]; b += c[2];
        }
      }
      var n = SS * SS;
      row[x * 3] = Math.round(r / n);
      row[x * 3 + 1] = Math.round(g / n);
      row[x * 3 + 2] = Math.round(b / n);
    }
    raw[off++] = 0;                 /* PNG filter type 0 (None) */
    row.copy(raw, off); off += row.length;
  }
  return raw;
}

/* ============================================================
   minimal PNG writer (8-bit truecolour, no alpha)
   ============================================================ */
var CRC_TABLE = (function () {
  var t = [], c, n, k;
  for (n = 0; n < 256; n++) {
    c = n;
    for (k = 0; k < 8; k++) { c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); }
    t[n] = c >>> 0;
  }
  return t;
}());

function crc32(buf) {
  var c = 0xFFFFFFFF, i;
  for (i = 0; i < buf.length; i++) { c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  var len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  var body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  var crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function png(size, raw) {
  var sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  var ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;    /* bit depth */
  ihdr[9] = 2;    /* colour type 2 = truecolour RGB */
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* ---- run ---- */
var OUT = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(OUT)) { fs.mkdirSync(OUT); }

[
  { file: 'icon-192.png', size: 192, span: 0.92, ring: true },
  { file: 'icon-512.png', size: 512, span: 0.92, ring: true },
  /* maskable: platforms crop to a circle/squircle of ~80% of the canvas, so
     everything that matters stays well inside that, and there is no ring to
     be sliced through. */
  { file: 'icon-maskable-512.png', size: 512, span: 0.85, ring: false }
].forEach(function (spec) {
  var buf = png(spec.size, renderIcon(spec.size, spec.span, spec.ring));
  fs.writeFileSync(path.join(OUT, spec.file), buf);
  console.log('wrote icons/' + spec.file + '  (' + spec.size + 'px, ' + buf.length + ' bytes)');
});
