# IMARIANUS v2 — FULL PROJECT REPORT

Prepared by Fable (planner/designer/critic) for Mariano (owner).
Covers the complete build session of 14–16 August 2026 and the state of the
project as delivered. Final commit at time of writing: `bb63960`, pushed to
`github.com/oldenKnight/imarianus` (private).

---

## 1. EXECUTIVE SUMMARY

imarianus.com was, before this session, a small Latin-learning site: three
Aesop fables, one region, a broken boss fight, and a plan document written by
a previous session. It is now a complete Latin curriculum — **142 lessons
across three parallel tracks**, taking a learner from no Latin at all to
reading authentic Virgil and the Vulgate, entirely in Latin, with no
translation anywhere in the product.

Everything is built, audited, regression-tested, committed and pushed. The
only outstanding action is the owner's FTP deployment and the six tuning
decisions listed in §11.

**Headline numbers**

| | |
|---|---|
| Lessons (capitula) | **142** in 33 regions |
| Story pages authored | ~1,000 |
| Exercise items generated/authored | ~7,700 |
| Authentic Virgil passages quoted | 12 (OCT-exact) |
| Vulgate formulae quoted | ~20, each verbatim-verified |
| Art library | 107 actors, 15 backgrounds, all programmatic SVG |
| Code | 19 JS modules + 34 content files, ~70,000 lines |
| Server endpoints | 14 PHP APIs |
| Regression checks | **108**, all green |
| Git commits this session | 120 |

---

## 2. WHAT THE PRODUCT IS

A gamified, image-driven Latin course built on the **Ørberg natural method**:
meaning is conveyed by pictures, context and repetition — never by
translation. The learner never sees English or Spanish.

**Three doors, one account, shared XP:**

- **FĀBULAE** — 36 Aesop fables in 12 regions, walking the full grammar
  ladder from nominative/accusative singular to indirect statement and
  ablative absolute. A single wolf recurs as antagonist across four boss
  fights and is finally granted the last word of the track.
- **HISTORIA SACRA** — Lhomond's *Epitome Historiae Sacrae* simplified and
  completed: 58 capitula over 9 librī, Creation through the Resurrection,
  every episode cross-checked against the Clementine Vulgate.
- **AENĒIS** — all twelve books of Virgil in graded Latin prose (48
  capitula), each book closing with authentic hexameters the learner can
  actually read, and the track ending with the complete seven-line proem
  read unassisted.

**Each lesson has seven steps:** VERBA (vocabulary cards) → FĀBULA
(illustrated auto-playing story) → SONUS (hear it, pick the picture) →
LŪDUS (catch-the-word arcade game) → AENIGMATA (memory pairs + sentence
scrambles) → CORRIGE (find the wrong word) → COMPLĒ (complete the sentence,
accepting **any** grammatically valid word order).

**Each region ends in a boss:** Fabulae get three-phase duels (vocabulary
catch → sentence-gap syntax test → dodge-and-recall); Historia and Aenēis get
non-combat *probātiōnēs* (sorting animals into the ark, crossing the Red Sea,
sorting what Aeneas saves from burning Troy — *pietās* as a game mechanic).

**Platform:** vanilla ES5, no build step, no external dependencies, served as
plain files from the existing shared PHP/MySQL host. Installable PWA with an
offline queue. Public leaderboards with nickname-only exposure. A teacher
dashboard with class join codes and a per-student progress grid.

---

## 3. HOW THE PROJECT WAS RUN

Per the owner's instruction, the main agent (Fable) acted **only** as
planner, designer and harsh critic; **every line of implementation was
written by Opus subagents** — 30+ of them, running up to six at a time, each
with an explicit file-ownership list to prevent collisions.

The cycle for every unit of work was: **specify → implement (subagent) →
critic review (screenshots + line-audit) → fix round → integrate → push.**

Four documents governed everything and are the authoritative specs:

| Document | Role |
|---|---|
| `docs/MASTER-PLAN.md` | architecture, milestones, standing rules, quality gates |
| `docs/DESIGN.md` | UX, step types, boss/probatio design, the binding children's-rating rules |
| `docs/CURRICULUM.md` | the 12-stage grammar ladder and the full content map |
| `docs/LATIN-STYLE.md` | orthography, grading discipline, register per track |
| `docs/AUTHORING-BRIEF.md` | (v3) the working brief every content agent implemented from |

**Interruptions handled autonomously:** the account usage limit terminated
agent groups four times (5 pm, 10 pm, 3 am, 8 am, 1 pm). Each time, work in
progress was salvaged from the working tree by "finisher" agents rather than
redone, and every wave was relaunched at the reset without owner
intervention.

---

## 4. TECHNICAL ARCHITECTURE

```
/imarianus/
  index.html                    single-page shell, ~20 deferred scripts
  css/styles.css                Pompeiian theme, mobile-first
  js/
    scenes.js                   SVG scene renderer + shared sprite/crop/tile helpers
    actors-person.js            one parameterised human (11 roles, 9 poses)
    actors-props.js             ~90 props and animals
    backgrounds2.js             15 backgrounds
    data-core.js                UI strings, gradus ladder
    content-loader.js           on-demand region loading + exercise generators
    chip-lint.js                picture-distinctness linter
    map.js                      the continuous overworld board
    app.js                      router + all seven step runners
    game.js / boss.js / boss-phases.js / probatio.js   minigames
    tts.js  storage.js  api.js  pwa.js  audio.js
  content/
    manifest.js + manifest.json   the region index (client + server twins)
    fabulae-r01…r12.js  historia-l1…l9.js  aeneis-al1…al12.js
    _ledger-fabulae.md  _ledger-historia.md  _ledger-aeneis.md
  server/                       PHP 7 / MySQL, server-authoritative XP
  teacher/                      dashboard
  tests/                        regression.html, qa.html, qa-frame.html, art-gallery.html
  docs/                         the specs above + this report
```

**Design decisions worth recording:**

- **No three.js, no frameworks, no CDN.** Everything is self-hosted flat
  vector art. This was chosen deliberately for load time, offline capability
  and the owner's ES5 debuggability requirement.
- **Content is data, not code.** A region is one file registering itself
  into a manifest; the engine reads step lists, boss phase arrays and scene
  specs as configuration.
- **The server never trusts the client.** XP is granted server-side on first
  completion only; answer keys live in `server/lib/rules.php` and are never
  shipped to the browser.
- **All schema changes are additive.** `server/schema_v2.sql` is idempotent
  and contains no DROP or destructive ALTER; the seven existing student
  accounts and their progress are preserved untouched.

---

## 5. CONTENT INVENTORY

### FĀBULAE — 12 regions (S1→S12)

I Silva · II Ager · III Rīvus · IV Mōns · V Via · VI Urbs · VII Lītus ·
VIII Hortus · IX Castra · X Portus · XI Templum · XII Forum

Each region teaches one rung of the ladder (R3 the genitive and dative, R7
the perfect, R10 the passive, R11 the subjunctive, R12 indirect statement)
and ends with a themed boss. The wolf arc runs R1 → R5 → R9 → R12, ending in
*Lupus et Canis*, where he refuses the collar: **`lībertās plūs quam cibus
valet`**.

### HISTORIA SACRA — 9 librī, 58 capitula

I Creātiō · II Dīluvium · III Abraham · IV Iacob · V Ioseph · VI Moyses ·
VII Iūdicēs · VIII Rēgēs · IX Iesus

Narrative present through Liber V; the perfect arrives deliberately in Liber
VI (Moyses), mirroring the ladder. Every capitulum carries a `fons` citation
and was written only after the underlying Vulgate chapters were read.
Famous formulae are quoted verbatim and taught as fixed phrases with picture
glosses: *Fiat lūx*, *Nesciō*, *EGO SUM QUĪ SUM*, *Ego sum Ioseph*, *Loquere
Domine quia audit servus tuus*, *Hoc est corpus meum*, *Nōn est hīc: surrēxit
enim*, and — as the track's last words — *Ecce ego vōbīscum sum omnibus
diēbus*.

### AENĒIS — 12 librī, 48 capitula

Graded prose retelling for advanced learners, with the whole grammar ladder
open and vocabulary the controlled variable. The twelve authentic passages
include *Arma virumque canō* (1,1–3), *timeō Danaōs et dōna ferentīs*
(2,49), *sequitur patrem nōn passibus aequīs* (2,723–724), *quis fallere
possit amantem?* (4,296–297), *possunt, quia posse videntur* (5,231), *tū
regere imperiō populōs, Rōmāne, mementō* (6,851–853), *Fortūnātī ambō!*
(9,446–447), and *stat sua cuique diēs* (10,467–468). The final capitulum
re-reads the complete proem, Aen. 1,1–7, unaided — the product's graduation
moment.

---

## 6. PEDAGOGICAL AND EDITORIAL RULINGS

These were decided during the build and are recorded in
`docs/HANDOFF-STATUS.md` so they are never re-litigated:

- **Receptive before productive.** From stage 1 the learner *reads* any
  conjugation's third person; the conjugation system is only *tested*
  progressively. This is Ørberg's own practice.
- **When the ladder and good Latin collide, change the sentence — never the
  grammar.** No capitulum ever bends a construction to fit its stage.
- **Vocabulary is ledgered.** ≤8 pictured new words per capitulum, each
  recycled at least three times, tracked in per-track ledgers; function words
  are free but must be glossed at first use.
- **Word order is free.** COMPLĒ accepts any grammatically valid arrangement;
  constraints are declared per item only where syntax truly requires them
  (prepositions, enclitics). `mēcum`-type fused forms are never split.
- **Citation-form rule.** A gap answered by catching a picture card must be
  answerable in the card's citation form; oblique-case teaching lives in the
  story pages.
- **Vulgate fidelity: simplify by omission, never by alteration.** Where the
  narrative could not be told at a stage, it was cut, not changed. Name forms
  follow the Clementine text's own inflection (indeclinable *Noe*, *Cain*,
  *Samsōn*, *David*).
- **Children's rating (B), enforced page by page.** The frog does not burst;
  the hen is not killed; Cain's deed is off-page; the Flood shows no victims;
  Goliath falls whole and unmarked and the fight ends there; Samson's end is
  three clauses over an empty room; the cross is drawn empty under stars;
  Dido's death is acknowledged and its manner refused *out loud in Latin*
  (*Vergilius plūra dīcit, nōs autem hīc tacēmus*); Turnus' death is stated,
  its manner withheld, and its motive explicitly left open for the learner to
  judge when older — *quod poēta apertum relīquit, nēmō claudere dēbet*.

---

## 7. QUALITY SYSTEM

Four independent mechanisms, all still in the repo and runnable:

1. **Line-audit.** Every one of the ~1,000 story pages was read by the main
   agent against stage, idiom, vowel quantity, and source fidelity. This
   caught real errors — a bare transitive *creat* with no object, Cain shown
   silent where Scripture records *Nesciō*, a genitive gloss above stage
   (inside my own briefing document), unmacronised *ēius*, and more.
2. **Regression suite** (`tests/regression.html`) — grew from 12 checks to
   **108**. Every bug fixed in this session has a check that fails against
   the pre-fix code; several were proven by deliberately reverting the fix.
3. **Headless visual QA** (`tests/qa.html` + `qa-frame.html`) — drives the
   real app with no backend, at true device widths. The gauntlet produced a
   **118-screenshot matrix** across four widths with zero horizontal overflow
   anywhere.
4. **Content linters** (`js/chip-lint.js`) — fingerprint every picture-choice
   set in the product and fail the build on ambiguity. Coverage: 985 option
   sets, 142 lūdus pools, 33 region-wide boss pools.

### Notable defects found and fixed

| Defect | Consequence had it shipped |
|---|---|
| Duplicate XML attribute in an SVG data-URI (inherited) | the Lupus boss fight froze — the original reported bug |
| Unguarded phase registry | a boss fight with a missing script file awarded **victory and XP without drawing a frame** |
| `line.nova.length` unguarded | any story page without glosses dead-ended the reader mid-fable, in already-shipped content |
| Macron-stripping in answer checking | 11 exercises where a wrong chip graded as correct |
| Boss actor hardcoded to the wolf | Regiō II's lion boss told the child to defeat a wolf |
| Distractors attested beside the gap | exercises where a "wrong" answer was defensibly right |
| Seeded crowds rendering identically | three Historia scenes silently drew clones |
| Veil geometry crossing the jaw | every woman in the product read as a bearded man |
| Region navigation absent | **all 142 lessons shipped but only 3 were reachable** |
| Picture options rendered as shrunken full scenes | choices were guesswork; the lūdus was unplayable |

---

## 8. THE POST-LAUNCH CRITIQUE ROUND

After the owner deployed and tested on a phone, three defects were reported
and all three are fixed and pushed:

1. **Only the first region of each track was reachable.** The map rendered
   one region and no code path could reach a second. Fixed with a
   **continuous scrolling board per track** (all regions stacked with carved
   title bands), **boss auto-advance** onto the next region, and a
   **Regiōnēs index** for jumping. The implementing agent also discovered
   that my specification of the unlock rule contradicted the server's actual
   rule and correctly followed the server.
2. **"Mulier looks like an old man with a beard."** Correct diagnosis: the
   veil's rear panel crossed the jaw and read as a beard at card size. The
   veil is now an arch with visible hair at the brow, a bare chin, and cloth
   falling from the shoulders. All 28 named women re-verified; all male
   figures byte-identical.
3. **Picture choices ambiguous and tiny.** Root cause: option art was the
   full 400×240 stage shrunk to a thumbnail, so three lessons about the same
   garden produced three identical chips. Fixed product-wide: chips and tiles
   now render a **tight crop of the distinguishing subject**, phone layout is
   a 2-column grid at 96–140 px, the memory board's cards nearly tripled in
   area, arena tiles went from 40 to ~50 CSS px, and sets that cannot be made
   distinct **flip automatically to picture→word**. A full audit table of all
   15 picture surfaces is in the agent record, with a regression tripwire so
   any future surface must be routed or explicitly exempted.

---

## 9. WHAT THE OWNER SHOULD KNOW ABOUT SECURITY

- Production database credentials were found in the local
  `server/config.php` after the owner localized it for deployment. They were
  **never committed and never pushed** — verified against the full history;
  the only committed version is the original `CHANGE_ME` placeholder. The
  file is now `skip-worktree` flagged so git permanently ignores local
  changes to it. Consequence: `git pull` will never overwrite the
  credentials, and no agent can ever commit them.
- Public leaderboard exposure is **nickname and avatar only**, enforced in
  the SQL SELECT rather than the client. Students who never claim a nickname
  do not appear on any board.
- No PHP debug mode was added; server errors go to `error_log` only.

---

## 10. CURRENT STATE

- **Repository:** `github.com/oldenKnight/imarianus` (private), branch
  `main`, HEAD `bb63960`, working tree clean.
- **Live site:** running an earlier build. The three critique fixes and all
  subsequent work are in the repository but **not yet uploaded**.
- **To deploy:** cPanel full backup → FTP-upload the repository contents
  (excluding your local `server/config.php`) → run `server/schema_v2.sql`
  once in phpMyAdmin (it is idempotent and additive) → hard-refresh.
  Use the https cPanel port (2083).
- **On future deploys:** bump the `VERSION` constant in `sw.js` whenever a
  shell file changes, or returning students keep the cached old shell.

---

## 11. OPEN DECISIONS FOR THE OWNER

None are blockers; all are tuning.

1. **XP values and gradus thresholds** (Tīrō → Magister at
   0/150/450/1000/2000/3500) are placeholders awaiting your judgement.
2. **Nickname backfill:** `schema_v2.sql` contains one clearly-marked
   optional `UPDATE` that would publish existing display-name-derived
   nicknames on the public boards. Recommendation: comment it out and let
   students opt in.
3. **Liber IX's boss is deliberately gentle** (hp 2+2 against the house 6+)
   because the life of Christ reads as meditation rather than exam. Revert is
   `hp 3+3` in `content/historia-l9.js`.
4. **Per-region step XP** is not expressible server-side (the rule is keyed
   by step name globally); the Aenēis track's higher difficulty is signalled
   through boss XP instead.
5. **Pilate is unnamed** in the Passion capitulum — a child-simplification;
   the Creed names him, so you may wish to add him.
6. **`sōl`/`ventus` have a `face:false` option** for solemn contexts; it is
   applied in the Aenēid finale and available anywhere else you want it.

---

## 12. CANCELLED / PARKED

- **three.js enrichment — ABORTED at owner's instruction (16 Aug 2026).**
  The design survives in `docs/THREEJS-PLAN.md` for reference only: it
  proposed a 3D Red Sea crossing, a 3D galley voyage, and three storytelling
  camera-walks, all with automatic 2D fallback. **No implementation was
  started and none is scheduled.**
- **All standing autonomous instructions are cleared** — no loops, no
  scheduled wakeups, no auto-restart after usage limits, no queued agents.
  Nothing will run unless you ask for it.
- Ideas recorded but out of scope: studio-recorded audio, per-region bespoke
  art scenes, Google OAuth (the schema is already shaped for it), a weekly
  leaderboard reset job.

---

## 13. HONEST ASSESSMENT

Judged against commercial language apps on the axis you set — teaching Latin
from zero to reading real authors, thinking in Latin rather than translating
— this product wins on method, depth, textual fidelity and child-safety, and
loses on motion polish and studio audio, both of which are consequences of
the no-dependency, no-build-step constraint you chose deliberately.

The one risk I cannot retire myself: **no human Latinist other than you has
read the corpus.** Every sentence was audited by me against the standards in
`LATIN-STYLE.md`, and the source fidelity was checked mechanically against
the Vulgate and OCT texts, but you are the final reader. The ledgers list
every word taught, in order, per track — they are the fastest way for you to
spot-check what your students will actually meet.

*Cōnsummātum est.*
