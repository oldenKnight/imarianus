/* dev-server.js — zero-dependency static server for local QA.
   Serves the repo root so /index.html, /tests/regression.html etc. work.
   NOT deployed; the production site is plain files on shared hosting.
   Usage: node scripts/dev-server.js [port]                              */
var http = require('http');
var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var PORT = parseInt(process.argv[2], 10) || 8123;

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.webmanifest': 'application/manifest+json'
};

http.createServer(function (req, res) {
  var urlPath = decodeURIComponent(req.url.split('?')[0]);
  /* production serves this repo at /imarianus/ (see .htaccess + <base href>);
     accept that prefix locally so index.html's relative URLs resolve. */
  if (urlPath.indexOf('/imarianus/') === 0) { urlPath = urlPath.slice('/imarianus'.length); }
  /* DirectoryIndex, as .htaccess does it in production: any path that names a
     directory gets its index.html. '/' is only the commonest case of this —
     '/teacher/' used to 404 here while working on the real host. */
  if (urlPath.charAt(urlPath.length - 1) === '/') { urlPath += 'index.html'; }
  var file = path.join(ROOT, urlPath);
  /* keep requests inside the repo root */
  if (file.indexOf(ROOT) !== 0) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(file, function (err, buf) {
    if (err) { res.writeHead(404); res.end('not found: ' + urlPath); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, function () {
  console.log('imarianus dev server on http://localhost:' + PORT + '/');
});
