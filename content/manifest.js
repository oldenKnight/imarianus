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
     tracks  : [{ id, regions: [{ id, titulus, progressId?,
                                  capitula:[ids], boss:id }] }]
     steps   : the default step order, ids frozen forever

   `titulus` and `progressId` are ADDITIVE (the shape did not change, so
   the version did not move; lib/rules.php reads `id`/`capitula`/`boss`
   and ignores the rest). They exist because the map is now ONE
   CONTINUOUS BOARD per track (DESIGN §3): js/map.js draws a title band
   for every region of the track at once, and the region index lists all
   of them, so the client needs every region's name and boss key WITHOUT
   downloading all twelve content files. `progressId` appears only where
   it differs from `id` — r01 shipped as 'region1' and those database
   rows are frozen (content/README.md §5). The content file stays the
   authority whenever it is in memory; this is the cheap stand-in.

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
        { "id": "r01", "titulus": "Silva", "progressId": "region1", "capitula": ["f1", "f2", "f3"], "boss": "b_r01" },
        { "id": "r02", "titulus": "Ager", "capitula": ["f4", "f5", "f6"], "boss": "b_r02" },
        { "id": "r03", "titulus": "Rīvus", "capitula": ["f7", "f8", "f9"], "boss": "b_r03" },
        { "id": "r04", "titulus": "Mōns", "capitula": ["f10", "f11", "f12"], "boss": "b_r04" },
        { "id": "r05", "titulus": "Via", "capitula": ["f13", "f14", "f15"], "boss": "b_r05" },
        { "id": "r06", "titulus": "Urbs", "capitula": ["f16", "f17", "f18"], "boss": "b_r06" },
        { "id": "r07", "titulus": "Lītus", "capitula": ["f19", "f20", "f21"], "boss": "b_r07" },
        { "id": "r08", "titulus": "Hortus", "capitula": ["f22", "f23", "f24"], "boss": "b_r08" },
        { "id": "r09", "titulus": "Castra", "capitula": ["f25", "f26", "f27"], "boss": "b_r09" },
        { "id": "r10", "titulus": "Portus", "capitula": ["f28", "f29", "f30"], "boss": "b_r10" },
        { "id": "r11", "titulus": "Templum", "capitula": ["f31", "f32", "f33"], "boss": "b_r11" },
        { "id": "r12", "titulus": "Forum", "capitula": ["f34", "f35", "f36"], "boss": "b_r12" }
      ]
    },
    {
      "id": "historia",
      "regions": [
        { "id": "l1", "titulus": "Creātiō", "capitula": ["h1", "h2", "h3", "h4", "h5"] },
        { "id": "l2", "titulus": "Dīluvium", "capitula": ["h6", "h7", "h8", "h9", "h10"], "boss": "b_l2" },
        { "id": "l3", "titulus": "Abraham", "capitula": ["h11", "h12", "h13", "h14", "h15", "h16"], "boss": "b_l3" },
        { "id": "l4", "titulus": "Iacob", "capitula": ["h17", "h18", "h19", "h20", "h21", "h22"], "boss": "b_l4" },
        { "id": "l5", "titulus": "Ioseph", "capitula": ["h23", "h24", "h25", "h26", "h27", "h28", "h29"], "boss": "b_l5" },
        { "id": "l6", "titulus": "Moyses", "capitula": ["h30", "h31", "h32", "h33", "h34", "h35", "h36", "h37"], "boss": "b_l6" },
        { "id": "l7", "titulus": "Iūdicēs", "capitula": ["h38", "h39", "h40", "h41", "h42"], "boss": "b_l7" },
        { "id": "l8", "titulus": "Rēgēs", "capitula": ["h43", "h44", "h45", "h46", "h47", "h48", "h49", "h50"], "boss": "b_l8" },
        { "id": "l9", "titulus": "Iesus", "capitula": ["h51", "h52", "h53", "h54", "h55", "h56", "h57", "h58"], "boss": "b_l9" }
      ]
    },
    {
      "id": "aeneis",
      "regions": [
        { "id": "al1", "titulus": "Arma Virumque", "capitula": ["a1", "a2", "a3", "a4"], "boss": "b_al1" },
        { "id": "al2", "titulus": "Trōia", "capitula": ["a5", "a6", "a7", "a8"], "boss": "b_al2" },
        { "id": "al3", "titulus": "Errōrēs", "capitula": ["a9", "a10", "a11", "a12"], "boss": "b_al3" },
        { "id": "al4", "titulus": "Pietās", "capitula": ["a13", "a14", "a15", "a16"], "boss": "b_al4" },
        { "id": "al5", "titulus": "Lūdī", "capitula": ["a17", "a18", "a19", "a20"], "boss": "b_al5" },
        { "id": "al6", "titulus": "Īnferī", "capitula": ["a21", "a22", "a23", "a24"], "boss": "b_al6" },
        { "id": "al7", "titulus": "Latium", "capitula": ["a25", "a26", "a27", "a28"], "boss": "b_al7" },
        { "id": "al8", "titulus": "Scūtum", "capitula": ["a29", "a30", "a31", "a32"], "boss": "b_al8" },
        { "id": "al9", "titulus": "Amīcitia", "capitula": ["a33", "a34", "a35", "a36"], "boss": "b_al9" },
        { "id": "al10", "titulus": "Fāma", "capitula": ["a37", "a38", "a39", "a40"], "boss": "b_al10" },
        { "id": "al11", "titulus": "Camilla", "capitula": ["a41", "a42", "a43", "a44"], "boss": "b_al11" },
        { "id": "al12", "titulus": "Ultimum", "capitula": ["a45", "a46", "a47", "a48"], "boss": "b_al12" }
      ]
    }
  ],
  "steps": ["verba", "fabula", "sonus", "ludus", "aenigmata", "corrige", "comple"]
};
