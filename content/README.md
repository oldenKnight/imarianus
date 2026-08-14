# content/ — the authoring format

Everything a learner reads lives here. The engine (`js/`) contains no Latin.
One file per **region** (Fabulae) or **liber** (Historia Sacra, Aeneis):

    content/manifest.js      the index the CLIENT reads   ─┐ EDIT BOTH
    content/manifest.json    the same index for the SERVER ┘ TOGETHER
    content/fabulae-r01.js   FĀBULAE · Regiō I · Silva
    content/historia-l1.js   (not written yet)
    content/aeneis-l1.js     (not written yet)

File name is **derived by convention**: `content/<track>-<region>.js`.
`content-loader.js` builds that path from the manifest, so a new region is
(1) an entry in both manifests, (2) a file with the matching name. Nothing else.

Read `docs/LATIN-STYLE.md` before writing a single Latin word, and
`docs/CURRICULUM.md` for which grammar stage the region may use.

---

## 1. The region envelope

A content file is an IIFE that ends with exactly one `CONTENT.registerRegion()`:

```js
(function () {
  'use strict';
  var SC = { /* scene specs, shared by every step of the region */ };
  var capitula = [ /* … */ ];

  CONTENT.registerRegion({
    track:      'fabulae',   // must match a track id in the manifest
    id:         'r01',       // must match a region id in the manifest
    titulus:    'Silva',     // shown on the map header
    ladder:     'S1',        // CURRICULUM §0 stage — BINDING on the author
    progressId: 'region1',   // key used for boss rows on the server (see §5)
    steps:      [...],       // OPTIONAL: override the 7-step order for this region
    capitula:   capitula,
    boss:       { /* §4 */ }
  });
})();
```

## 2. The capitulum schema

A capitulum is one lesson: seven steps generated from a small hand-authored core.

```js
{
  id:      'f1',                 // FROZEN once shipped — it is a database key
  titulus: 'Vulpēs et Ūva',      // displayed title, macrons included
  icon:    '🦊🍇',                // small glyph on the capitulum header
  numerus: 'I',                  // numeral drawn in the map tile badge
  pos:     { x: 0.24, y: 0.86 }, // map node position: 0..1 FRACTIONS, y from top
  fons:    'Gn 6–9',             // OPTIONAL: source citation (Historia Sacra)
  steps:   [...],                // OPTIONAL: this capitulum's own step order

  /* ---- hand-authored inputs (the only mandatory writing) ---- */
  vocab: [
    { la: 'vulpēs', emoji: '🦊' },              // picture = emoji, or…
    { la: 'silva',  scene: SC.v_silva },        // …a scene spec (preferred)
    { la: 'ambulat', scene: SC.v_ambulat, pos: 'verbum' }   // pos is OPTIONAL
  ],
  story: [
    { la: 'Vulpēs in silvā ambulat.',
      scene: SC.f1_walk,
      nova: [ { w: 'ecce', e: '👉', g: 'vidē!' } ],  // Latin-only marginal gloss
      ttsText: 'Vulpes in silva ambulat' }           // OPTIONAL, see §3
  ],
  ludus: { words: [ { la: 'ūva', emoji: '🍇' } ] },  // falling-word minigame pool

  /* ---- optional hand-authored SONUS items ---- */
  sonus: [ { la: 'vulpēs', answer: {…vocabItem}, options: [ {…}, {…}, {…} ] } ],

  /* ---- optional hand-tuned exercises; anything omitted is GENERATED ---- */
  overrides: {
    aenigmata: { pairs: [ …vocab items… ], scrambles: [ { la, scene } ] },
    corrige:   [ { words: [...], wrong: 3, options: [correct, …], correct: 0, scene } ],
    comple:    [ { text: 'Ecce ___!', options: [...], accept: ['vulpēs'],
                   constraints: { adjacent: [['in','silvā']] }, scene } ]
  }
}
```

### Field notes

- **`vocab[].pos`** — `'nomen' | 'verbum' | 'adiectivum' | 'praepositio'`.
  Optional. Only the generators use it, to keep distractors in the same class.
  Without it a coarse heuristic runs (`-t/-nt` ⇒ verb, closed list ⇒ preposition,
  everything else ⇒ other). Declaring it makes generated exercises sharper.
- **`story[].nova`** — new words for this page: `w` the word, `e` an emoji/diagram
  hint, `g` a Latin-only gloss (`= synōnymum`, `↔ contrārium`). Never a translation.
- **`pos` (capitulum)** — fractions, not pixels, so one layout serves every screen
  width; `y: 0.86` is near the BOTTOM of the map (the path climbs bottom→top).
- **Scene specs** — `{ bg, items:[{t,x,y,s,pose,flip}], bubbles:[…] }`, drawn by
  `js/scenes.js`. Coordinate space is 400×240 with the ground line at y=210.
  Only use actors that already exist; if a scene needs a missing actor, STOP and
  report it rather than substituting (LATIN-STYLE §5).

## 3. TTS text

`Tts.speak()` strips macrons itself, so ordinary text is fine. Supply `ttsText`
only where the displayed text is not what should be *spoken* — e.g. a page whose
display carries stage directions, or an abbreviation.

## 4. The boss

```js
boss: {
  id:        'b_r01',        // must match the manifest's "boss" field
  progressId: 'region1',     // key for boss_clears rows (see §5)
  name: 'Lupus', actor: 'wolf',
  hp: 6, seconds: 45,
  pos: { x: 0.66, y: 0.16 },
  phases: [ { type:'caterva', hp:3, seconds:25 }, … ],   // M3 phase engine
  quiz: [ { la: 'vulpēs', from: 'f1' }, … ]              // 5 cumulative questions
}
```

The quiz **answer key lives on the server** (`server/lib/rules.php`); the entries
here only choose which words are asked and where their pictures come from.

## 5. Ids are database keys — never rename them

`capitulum.id` and the step names go into `step_completions`; `progressId` goes
into `boss_clears`. A rename silently deletes a learner's progress. Region I ships
as `progressId: 'region1'` for exactly this reason, even though its content id is
`r01`. New regions may use their own id as the progressId.

Step ids are frozen too: `verba, fabula, sonus, ludus, aenigmata, corrige, comple`.

## 6. What the generators produce (js/content-loader.js)

If `overrides.<step>` is absent, the pipeline derives the step from `vocab` +
`story`. Generation is **deterministic** (RNG seeded from the capitulum id), so
the same learner sees the same items on a retry and bugs are reproducible.

| step | derived from | how |
|---|---|---|
| `aenigmata` | vocab with pictures; plain story sentences | up to 6 picture↔word memory pairs, up to 4 sentence scrambles |
| `corrige` | plain story sentences containing a vocab word | one word is swapped for a same-POS word from the capitulum's own vocab; the learner taps the intruder and picks the truth |
| `comple` | plain story sentences | one-word cloze, or a two-word cloze on a **preposition + its noun** (which emits an `adjacent` order constraint) |
| `sonus` | vocab with pictures | hear the word, pick the picture from 3–4 |

"Plain story sentence" = has a scene, no direct speech, 3–9 words. Direct speech
is skipped because a cloze inside quoted dialogue is usually ambiguous.

## 7. COMPLĒ: word order is FREE unless declared

Latin word order is free, and the exercise must not teach otherwise (DESIGN §4).
The validator accepts **any order** of the chosen words. Order is enforced only
by explicit constraints:

```js
constraints: {
  adjacent: [['in','silvā']],   // b must come immediately after a (prepositions)
  before:   [['ad','rīvum']],   // a must appear somewhere before b
  notFirst: ['agnusque'],       // an enclitic -que word cannot open the sequence
  strict:   true                // last resort: exact sequence (avoid)
}
```

Legacy single-blank items (`{ text, options, correct }`) still work: they are
normalised to `accept: [options[correct]]`, where order is moot anyway.
