# IMARIANUS — DESIGN SPEC v2

## 1. Visual identity

Pompeiian flat-vector: warm terracotta/ochre/dark-umber palette on deep brown
(#2b1c16 family already in styles.css), cream text, gold accents, laurel and meander
(Greek key) ornament. Every illustration is programmatic SVG from scenes.js actors —
consistent stroke weight, soft two-tone shading (base + darker side), subtle drop
shadows. No emoji in shipped UI chrome for the new tracks' node icons where an SVG
actor exists (emoji stay OK inside speech bubbles and vocab hints where already used).

Typography: keep current stack; headings may use small-caps letterspacing for Roman
feel. All Latin text carries macrons (ā ē ī ō ū) everywhere, including buttons.

## 2. Home = three doors (+ landing when logged out)

Logged out: landing page — hero scene (fox + ark + ship triptych), one-line pitch in
Latin with an illustrated subtitle, ludus preview screenshot band, INTRA (login) /
INCIPE (register) buttons. Same file, `showLanding()` route; OG tags already exist.

Logged in: three carved doors, each an SVG arch:
  FABULAE (fox/wolf art)  |  HISTORIA SACRA (ark/tablets)  |  AENEIS (ship/Troy)
Aeneis door carries a small "PROVECTIS" (for advanced) laurel badge — recommended
after Fabulae VIII or Historia VI, but never locked (owner: free choice, no gating).
Topbar (XP, hearts, streak, gradus) shared across tracks. Streak counts any track.

## 3. Overworld map — "chess.com puzzle path" tier, Romanized

Reference: isometric dark wooden board, numbered diamond tiles on pedestals zigzagging
upward, decorative game pieces and gears scattered at depth. Our version per track:

- Background: rich dark wood grain (SVG filter noise + plank lines) tinted per track
  (Fabulae warm brown, Historia deep indigo-night, Aeneis wine-dark sea tones).
- Path: diamond (rotated-square) tiles with bevelled edges on small pedestal feet,
  zigzag bottom→top, number badge (dark circle, cream numeral) per capitulum node.
  States: done (gold, lit, small laurel), current (pulsing glow + mascot standing on
  it), locked (desaturated wood, no badge glow).
- Boss/probatio node: larger tile with flag + castle (Fabulae), temple/ark (Historia),
  city gate/ship (Aeneis).
- Decorations at isometric depth around the path, per region theme: trees/bushes,
  chess-like carved animal figurines (fox, wolf), amphorae, gears→replace with
  waterwheel/columns, scattered tesserae. Parallax: decorations move slightly slower
  than path on scroll (two SVG groups, transform on scroll).
- Vertical scroll/pan with touch drag + wheel; auto-centers current node on entry.
- Implementation: map.js renders SVG (not canvas) for crispness; keeps 0..1 fractional
  node positions.
- **ONE CONTINUOUS BOARD PER TRACK** (revised; this section previously said "region =
  one tall SVG per screenful chunk", i.e. one board per region). A board per region
  turned out to be the whole navigation: the app rendered the region it had loaded and
  offered no way to reach another, so beating a boss left the learner on a gold summit
  with no road off it and 142 shipped capitula reduced to each track's first board.
  The board now stacks EVERY region of the track — regiō I at the foot, the last
  region at the summit — each region keeping its own 0..1 layout scaled into its own
  band, separated by a carved REGION TITLE BAND (numeral + titulus, padlock when
  locked) that the path ribbon runs straight across. Locked regions are veiled and
  padlocked. Depth (prop size/opacity) and the parallax lag are per REGION, not per
  board: each region has its own horizon, and a lag proportional to a six-thousand-
  pixel scroll would drag the scenery off the bottom of the board.
- Region membership, names and boss keys live in `content/manifest.js` so a locked
  region can be drawn and named without downloading its content file; the loaded file
  wins whenever it is in memory.
- **REGIŌNĒS** — a region index over the board (track title or the Regiōnēs button):
  numeral, titulus, n/m capitula, boss mark, tap to scroll the board there. Distinct
  from CURSUS, which lists one region's capitula.
- **AUTO-ADVANCE** — clearing a region's boss moves the saved map node to the first
  capitulum of the next region, so returning to the board lands on the new segment.
  The last region of a track shows `Cursum cōnfēcistī! 🏆` on the summit instead.
- Unlock is per TRACK, mirroring `server/lib/progress.php`: a capitulum opens when the
  previous capitulum IN THE SAME TRACK is complete. Clearing the boss is the ceremony,
  not the gate (Historia's liber I has no boss at all).

## 4. Step types per capitulum (7)

Order: VERBA → FĀBULA → SONUS → LŪDUS → AENIGMATA → CORRIGE → COMPLĒ
(existing six + new SONUS; engine treats list as data so tracks can vary it).

- VERBA: vocab cards, scene + word; tap to hear TTS.
- FĀBULA: illustrated pages; **autoplays** page→page (per-page dwell computed from
  text length) with pause/play and manual arrows; TTS reads each page (toggle).
- SONUS (new): hear a Latin word/sentence (TTS), pick the matching PICTURE from 3–4
  scenes. Never a speaker-icon-vs-text exercise; audio→image only.
- LŪDUS: existing catch-the-word canvas game, difficulty from region index.
- AENIGMATA: picture→word, word→picture, matching pairs.
- CORRIGE: spot & fix the wrong word in a sentence about a shown scene.
- COMPLĒ: complete the sentence (tap words). **Ordering: accept any grammatically
  valid Latin order**; only enforce order where syntax truly requires (preposition
  before its case, -que attachment, etc.). Validator = set of accepted orders or
  constraint rules, not a single string.

## 5. TTS (js/tts.js)

Web Speech API. Voice selection priority: any `it-IT` voice (Italianate ecclesiastical
color) → `es-ES` → default; utterance.lang set explicitly (never en-*; the iFabulae
"daiez" bug). Strip macrons to plain vowels before speaking (macron chars confuse
some voices) but display keeps them. Rate ~0.85. Central Tts.speak(text, opts),
Tts.available() guard; every speaking UI works silently without TTS support.

## 6. Boss = three-phase duel (Fabulae) / Probatio (Historia, Aeneis)

Per brief §4: Boss.PHASES registry { caterva, clamor, fuga } each init/update/draw/
teardown; shared HP pool, master clock, interstitial roar between phases; config in
content files. clamor (sentence-gap, catch the completing image) is the pedagogical
core — never cut. Rebalance: target-word spawn 35%→25% by region, up to 6 items,
faster spawns, wrong catch −4 s and +1 mistake, min plausible duration enforced
server-side. Result payload { region, ms, mistakes, phases[] } → api/boss_result.php.

Probatio phase types (same registry, non-combat):
  - ordina: drag/catch items into categories under time (animals into the ark;
    provisions onto Aeneas' ships).
  - transitus: timed crossing (Red Sea walls of water; storm at sea) steering with
    left/right, catching correct words to keep the path open.
  - sententia: plagues/oracles as sentence completion under gentle time pressure.
Wolf duels are tonally wrong in Genesis — Historia and Aeneis bosses are trials.

CITATION-FORM RULE (sententia / clamor gaps): the answer that fills a gap is always
the word's CARD CITATION FORM — the nominative singular of a noun, the 3rd-person
singular present of a verb — because the learner picks it from a picture card that
shows exactly that form; a gap whose answer is `arcam` or `dedit` asks the child to
inflect a form nobody has shown them. Oblique-case and other inflected constructions
belong in the STORY PAGES, where the surrounding sentence teaches them by repetition.
Hand-authored boss items are held to the same rule.

Input: keyboard arrows + pointer/touch X everywhere; touch is primary.

## 7. Gamification

XP server-granted, first-completion-only (existing property, keep). Gradus ladder:
Tiro → Auditor → Lector → Grammaticus → Rhetor → Magister (thresholds proposed in
data-core.js: 0/150/450/1000/2000/3500 — flagged for owner tuning, not final).
Hearts, streak as today. Boards: total XP, weekly XP (Mon 00:00 UTC reset), rating
(rolling accuracy last 50 exercises), records (best boss ms/mistakes), streak.
Public profile /u/<nickname>: nickname + avatar ONLY from students table (SQL-level
enforcement). DATA.BOTS deleted; seed rows only if board <5 real entries, marked
"exemplum" visibly.

## 8. Children's rating (B) — binding content rules

- Violence: stylized, brief, bloodless. A wolf may seize a lamb off-scene (cut to
  moral); David fells Goliath with a single stone, no wound detail; battles in the
  Aeneid are shields/spears/retreat, never gore.
- Death: acknowledged, dignified, never depicted graphically. Dido: grief and a
  distant pyre glow seen from the sea (Virgil's own discretion); no suicide shown
  or described mechanically.
- Nudity/sexuality: none, ever. Adam & Eve in modest garments of leaves post-fall,
  tasteful framing pre-fall (waist-up behind foliage). Potiphar episode = "falso
  accusatus est" without the wife's advances. Samson/Delilah = betrayal of a secret.
- Fear: villains menacing but stylized; interstitials short; no horror imagery.

## 9. Accessibility & mobile

Touch targets ≥44px; all minigames playable one-thumb portrait; text scalable;
aria-labels on interactive SVG; color choices AA-contrast on dark ground.
