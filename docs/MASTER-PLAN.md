# IMARIANUS — MASTER PLAN v2 (authoritative)

Owner: Mariano. Planner/designer/critic: Fable (main agent). Implementers: Opus subagents.
This supersedes nothing in `LATIN INPUT/imarianus-plan.txt` except where noted; that brief's
bug diagnoses (§2–3) are implemented verbatim. Owner's 2026-08-14 instructions EXPAND scope:

1. Whole Epitome Historiae Sacrae, simplified (Ørberg-graded), Vulgate-checked.
2. Full Aesop track = **36 fables, 12 regions of 3** (owner's confirmed choice).
3. Full simplified Aeneid = third track, 12 libri.
4. Major visual update: overworld map at "chess.com puzzle path" quality (Romanized).

## Standing rules (every commit)

- **ES5 vanilla JS.** No build step, no transpiler, no framework. Vendored libraries only
  if a feature truly cannot be done without one (owner: "npm/non-ES5 only if needed",
  never CDN links — everything self-hosted). Decision below: NO three.js; 2D SVG+canvas.
- Separate files, one concern each. Explicit, commented, debuggable code (owner has C/CS50
  background; explain non-obvious mechanisms in comments).
- Surgical changes; never rewrite working modules wholesale.
- Every bug fixed gets a regression case that would have caught it (tests/regression.html).
- Server: PHP 7+/MySQL on shared hosting, FTP-deployable. **Schema changes ADDITIVE ONLY**
  (`server/schema_v2.sql`); never DROP/ALTER-destructive on existing tables; preserve all
  existing data and the server-authoritative XP property (client posts events, never XP).
- Client never receives answer keys for server-graded things; rules stay in lib/rules.php,
  fed from the generated content manifest.
- Git: work on main in this local repo; one milestone = one or few clean commits.

## Technology decision: canvas + SVG, no three.js

The owner's vision is flat-vector Pompeiian art, mobile-first students, shared hosting.
A 600 KB 3D engine adds load time and complexity and serves nothing this art style needs.
The chess.com-tier map look is achieved with layered isometric SVG (wood-grain background,
diamond nodes on pedestals, drop shadows, decorative props, smooth pan) — see DESIGN.md §3.
Minigames stay HTML5 canvas. If a future minigame genuinely demands WebGL, vendor it then.

## Architecture (target tree)

    /imarianus/
      index.html               three-door app shell (landing view when logged out)
      css/styles.css           theme; may add css/map.css, css/landing.css
      js/  (engine, ES5, load order fixed via defer)
        storage.js api.js audio.js tts.js
        scenes.js              core renderer + Scenes.register() + toImage() + sprite()
        actors-person.js       parameterised person actor
        actors-props.js        prop actors (ark…temple, ship, wooden horse)
        backgrounds2.js        desert, sea, mountain, interior, night, city, storm, Troy
        data-core.js           UI strings, gradus table, shared config (from data.js split)
        content-loader.js      on-demand <script> loading of content files + manifest
        auth-ui.js game.js boss.js map.js app.js
      content/
        manifest.js            track/region/capitulum index (also emitted as manifest.json)
        fabulae-r01.js … r12.js
        historia-l1.js … l9.js
        aeneis-l1.js  … l12.js
      server/                  additive: api/board.php profile.php boss_result.php
                               class endpoints; schema_v2.sql; rules.php reads manifest.json
      teacher/                 dashboard page (same engine styles)
      manifest.webmanifest, sw.js (PWA)
      tests/regression.html    browser-run regression checks (no framework)
      docs/                    these specs

## Milestones and dependencies

  M1 bug fixes (brief §2–3, verbatim) ──→ M2 art ──→ M3 boss phases/probationes
  M1 ──→ M4 pipeline + home + map + sonus/TTS
  M2+M4 ──→ M5 Fabulae (36), M7 Aeneis;  M2+M3+M4 ──→ M6 Historia Sacra
  M8 server v2 (parallel-safe: touches only server/ + DATA.BOTS removal)
  M4+M8 ──→ M9 offline queue + PWA + landing + teacher dashboard
  M10 critic loop: continuous from M4 on; final full pass at the end.

## Agent protocol

- Max 6 active subagents, max depth 2. Implementers are **Opus**.
- Each agent owns an explicit file list; two agents never edit the same file concurrently.
- Every agent reads: this file + DESIGN.md + (content agents) CURRICULUM.md + LATIN-STYLE.md.
- Agents commit their own work with descriptive messages.
- Fable reviews every deliverable as harsh critic (code, Latin, visuals). Rejected work
  goes back with an itemised defect list. Nothing ships unreviewed.
- Latin content: Opus drafts strictly per CURRICULUM.md/LATIN-STYLE.md; Fable line-audits
  every Latin sentence (Oxford-professor standard) and corrects before commit.

## Quality gates (from owner, binding)

- G1 Visual: every screen inspected in browser, desktop + mobile widths; must read as
  triple-A polish, coherent Pompeiian identity, no placeholder look.
- G2 Latin: zero grammar/syntax/vowel-quantity errors; would pass fluent Latinists at
  Cicero/Erasmus level. Word order natural and varied (Latin is flexible — exploit it,
  don't enforce artificial fixed order).
- G3 Pedagogy: a complete beginner can walk from zero to reading real Virgil/Cicero with
  no translation anywhere; one new thing at a time; massive comprehensible repetition.
- G4 Side-by-side: blind-compare finished product against commercial didactic apps
  (Duolingo-class); must win on teaching quality. Loop until it does.
- G5 Content rating: B (children-appropriate). Mild violence allowed, zero gore, zero
  nudity/sexual content; Greek discretion (tell off-scene, imply, never show).
- G6 Regression: tests/regression.html green before every commit that touches engine code.

## Sources (local, reference-only, NOT deployed)

- C:\Dev\web\latin-sources\epitome-carfagni-raw.txt  (Vivarium Novum 2009 ed., OCR noisy —
  use for episode structure/coverage; do NOT copy its text: shipped capitula are original
  simplified retellings of the public-domain Lhomond narrative).
- C:\Dev\web\latin-sources\vulgata-clementina-raw.txt (Clementine Vulgate — fidelity check
  for every Historia Sacra episode and for Vulgate name forms: Noe, Moyses, Isaias…).
- Familia Romana PDF (grading reference for what vocabulary/grammar is "beginner").
