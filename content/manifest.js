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
        { "id": "r02", "capitula": ["f4", "f5", "f6"], "boss": "b_r02" },
        { "id": "r03", "capitula": ["f7", "f8", "f9"], "boss": "b_r03" },
        { "id": "r04", "capitula": ["f10", "f11", "f12"], "boss": "b_r04" },
        { "id": "r05", "capitula": ["f13", "f14", "f15"], "boss": "b_r05" },
        { "id": "r06", "capitula": ["f16", "f17", "f18"], "boss": "b_r06" },
        { "id": "r07", "capitula": ["f19", "f20", "f21"], "boss": "b_r07" },
        { "id": "r08", "capitula": ["f22", "f23", "f24"], "boss": "b_r08" },
        { "id": "r09", "capitula": ["f25", "f26", "f27"], "boss": "b_r09" },
        { "id": "r10", "capitula": ["f28", "f29", "f30"], "boss": "b_r10" },
        { "id": "r11", "capitula": ["f31", "f32", "f33"], "boss": "b_r11" },
        { "id": "r12", "capitula": ["f34", "f35", "f36"], "boss": "b_r12" }
      ]
    },
    {
      "id": "historia",
      "regions": [
        { "id": "l1", "capitula": ["h1", "h2", "h3", "h4", "h5"] },
        { "id": "l2", "capitula": ["h6", "h7", "h8", "h9", "h10"], "boss": "b_l2" },
        { "id": "l3", "capitula": ["h11", "h12", "h13", "h14", "h15", "h16"], "boss": "b_l3" },
        { "id": "l4", "capitula": ["h17", "h18", "h19", "h20", "h21", "h22"], "boss": "b_l4" },
        { "id": "l5", "capitula": ["h23", "h24", "h25", "h26", "h27", "h28", "h29"], "boss": "b_l5" },
        { "id": "l6", "capitula": ["h30", "h31", "h32", "h33", "h34", "h35", "h36", "h37"], "boss": "b_l6" },
        { "id": "l7", "capitula": ["h38", "h39", "h40", "h41", "h42"], "boss": "b_l7" },
        { "id": "l8", "capitula": ["h43", "h44", "h45", "h46", "h47", "h48", "h49", "h50"], "boss": "b_l8" }
      ]
    },
    {
      "id": "aeneis",
      "regions": [
        { "id": "al1", "capitula": ["a1", "a2", "a3", "a4"], "boss": "b_al1" },
        { "id": "al2", "capitula": ["a5", "a6", "a7", "a8"], "boss": "b_al2" }
      ]
    }
  ],
  "steps": ["verba", "fabula", "sonus", "ludus", "aenigmata", "corrige", "comple"]
};
