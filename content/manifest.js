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
        { "id": "r01", "capitula": ["f1", "f2", "f3"], "boss": "b_r01" }
      ]
    },
    { "id": "historia", "regions": [] },
    { "id": "aeneis", "regions": [] }
  ],
  "steps": ["verba", "fabula", "ludus", "aenigmata", "corrige", "comple"]
};
