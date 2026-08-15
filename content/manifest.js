/* ============================================================
   content/manifest.js — the content index the CLIENT reads
   ------------------------------------------------------------
   TWIN FILE: content/manifest.json holds the SAME data for the
   server (lib/rules.php reads the .json so its fable/step/region
   lists can never drift from the client's — brief §5).
   *** EDIT BOTH FILES TOGETHER. *** They are kept as two files
   rather than one because the client has no build step (a bare
   .json cannot be <script>-included) and PHP cannot eval JS.

   Schema (version 2):
     version : int, bumped when the SHAPE changes
     tracks  : [{ id, regions: [{ id, capitula:[ids], boss:id }] }]
     steps   : the default step order, ids frozen forever

   `boss` is OPTIONAL. A region whose curriculum gives it no trial
   (Historia l1 — CURRICULUM §2) simply omits the key: js/app.js only
   pushes a boss node when the loaded CONTENT region declares one, and
   lib/rules.php reads the field with isset(), so an absent boss is an
   absent boss and not an empty-string one.

   A region listed here is loadable; content-loader.js turns
   (track,region) into content/<track>-<region>.js on demand.
   An empty `regions` array = a door that opens the "MOX" screen.
   ============================================================ */
var CONTENT_MANIFEST = {
  "version": 2,
  "tracks": [
    {
      "id": "fabulae",
      "regions": [
        { "id": "r01", "capitula": ["f1", "f2", "f3"], "boss": "b_r01" },
        { "id": "r02", "capitula": ["f4", "f5", "f6"], "boss": "b_r02" }
      ]
    },
    {
      "id": "historia",
      "regions": [
        { "id": "l1", "capitula": ["h1", "h2", "h3", "h4", "h5"] },
        { "id": "l2", "capitula": ["h6", "h7", "h8", "h9", "h10"], "boss": "b_l2" }
      ]
    },
    { "id": "aeneis", "regions": [] }
  ],
  "steps": ["verba", "fabula", "sonus", "ludus", "aenigmata", "corrige", "comple"]
};
