# HANDOFF STATUS — imarianus v2 build

Purpose: lets ANY fresh Claude session (new PC, new conversation) resume this
project with zero context loss. Read MASTER-PLAN.md first, then this. Keep this
file updated at every milestone; it is the cross-machine continuation point.
Last updated: 2026-08-15 ~16:10 (America/Mexico_City) by Fable (main agent).

**PROJECT COMPLETE.** All 142 capitula shipped, line-audited and registered;
art (107 actors, 15 backgrounds) and polish backlogs cleared; the M10 gauntlet
ran (118-shot visual matrix at 4 widths, zero overflow; 9 findings triaged;
10-ruling fix round applied and verified; final regression 77/77) and every
gate G1-G6 passes — the full verdict with the side-by-side comparison is in
docs/GAUNTLET-VERDICT.md, including the six open OWNER DECISIONS. Everything
is pushed to origin/main. What remains is the owner's deploy (checklist below).

## Roles (owner's standing instruction — binding)

Fable/main agent = planner, designer, HARSH CRITIC only. All implementation by
Opus subagents (max 6 active, depth 2). Critic gates: G1-G6 in MASTER-PLAN.
Owner is away often; proceed autonomously; PushNotification only when blocked.
/loop until utterly perfect (owner's 3.5); heartbeat wakeups keep waves moving.

## DONE (accepted by critic)

- M0 specs: MASTER-PLAN, DESIGN, CURRICULUM, LATIN-STYLE, AUTHORING-BRIEF (v3:
  lexeme cap clarified, registration protocol, hand-authored clamor binding).
- M1 boss crash fix + regression harness (tests/regression.html, 34/34 green).
- M2 art: 90 actors, 15 backgrounds (incl. winter set), gallery page.
- M4 pipeline: data split, content-loader + generators, three-door home,
  landing, chess.com-tier map, SONUS step, TTS, autoplay, free word order,
  qa harness (tests/qa.html + qa-frame.html — Chrome clamps layout <500px,
  always screenshot through qa-frame).
- M8 server v2: additive schema_v2.sql, boards/profile/boss_result/nickname,
  nickname-only privacy in SQL, anti-cheat. NOT yet applied to production DB.
- M3 boss/probatio engine: 6 commits, phases caterva/clamor/fuga + probatio
  ordina/transitus/sententia, boss-as-data, item validation gates.
- M9: offline queue with event ids, PWA (manifest/sw/icons/pwa.js), teacher
  dashboard at teacher/. Regression suite 50/50.
- **ALL THREE CONTENT TRACKS COMPLETE, LINE-AUDITED AND REGISTERED —
  142/142 capitula, 33 regions.** Nothing is left in content/_pending/.
  - FĀBULAE r01-r12 (f1-f36) — 12 duels, r12 the four-phase Lupus finale.
  - HISTORIA SACRA l1-l9 (h1-h58) — l9 Iesus is the last and the most
    closely audited; its probātiō (Lūx Mundī, two sententia phases, hp 2+2)
    is DELIBERATELY GENTLE and approved as shipped, flagged for owner tuning.
  - AENĒIS al1-al12 (a1-a48) — al12 Ultimum is the product's hardest region
    and its only THREE-phase boss (sententia 4/55 + 4/50 + 4/45).
  - Registration (INT-5): manifest.js/.json twins data-identical;
    server/lib/rules.php carries all 33 regions, answer keys and min-ms
    floors; the three vocabulary ledgers are merged back to ONE PER TRACK.
  - Verified headlessly at that registration: regression 50/50; a loadRegion
    sweep over all 33 regions generating every capitulum × 7 steps (994 steps,
    7719 items) with ZERO empty steps, ZERO console warnings and ZERO errors;
    map/boss/story DOM checks on l9, al6, al12, h57 and a48.

## IN FLIGHT

Two agents, both on non-content files and both running in parallel with INT-5:

- ART agent — js/actors-*, js/backgrounds2.js, tests/art-gallery.html,
  tests/regression.html (the art rows).
- POLISH agent — css/styles.css, js/app.js, js/map.js, js/probatio.js,
  js/boss.js, js/content-loader.js, tests/qa.html.

Their working-tree changes are NOT in the INT-5 commits. If either is lost,
relaunch per the finisher pattern; content/, the manifest twins, rules.php and
the ledgers are already committed and are not theirs to touch.

## NEXT (order)

1. INT-6 — ONLY IF NEEDED, i.e. if the art or polish agents queue registration
   work or leave anything in content/_pending/. There is no content wave left
   to integrate.
2. M10 final gauntlet: visual sweep across all 33 regions, whole-corpus Latin
   audit, side-by-side against commercial apps.
3. Owner deploy checklist below.

### Open, flagged for the OWNER (not blockers)

- Per-region STEP xp is inexpressible: rule_step_xp() is keyed by step name
  globally. The whole Aenēis track asked for 25; the signal is carried by
  fight xp (40 vs 30) instead. Fixing it needs a region argument and every
  caller changed.
- l9's gentle boss tuning (total hp 4 against the house 6+). Revert is
  hp 3+3 in content/historia-l9.js and touches nothing else.
- al11's `harundo` transitus wall is legible but the softest of the three
  walls (thin stems, green on teal) — the one to re-check on a small screen.

## AUDIT RULINGS LOG (Latin/design decisions — do not re-litigate)

- Receptive 3rd-person any-conj from S1; potest+inf from S5; ad+acc and
  in+acc as glossed fixed patterns from S2/S1; cūr/ubi allowed S1 glossed.
- Vulgate quotes as fixed formulae (≤1/capitulum, image-glossed): Fiat lūx,
  Nesciō. Eva (not Heva), declined as Vulgate declines Heva. Altars in h5 =
  registered traditional addition. urbs for civitas OK. No body for God —
  radiance only. Sol/ventus smiley faces flagged for face:false opt.
- pōnit (not parit) for egg-laying. B-rating: frog doesn't burst, hen not
  killed, Cain's deed off-page, flood shows no victims.
- Cap: ≤8 pictured content lexemes/capitulum (h1 granted 9), function words
  free but glossed+ledgered, ≤16 total types. Boss clamor/sententia items
  hand-authored from wave 3 on. AENĒIS runs on its own charter instead:
  ≤10 cards, whole S1-S12 ladder open, cōpia commūnis assumed (ledger §0).
- Wave-5 audit, APPROVED AS SHIPPED and recorded in content/_ledger-aeneis.md:
  the ten Librī VI-VIII open questions; the Liber XI closing-quotation swap
  (11,846-847 rejected, 11,508-509a quoted at a44); the balteus-exclusivity
  ruling (§0.8's colour variable and the SONUS pairs it forbids).
- Options that differ ONLY by a macron are a BUG, not a distractor:
  normWord() strips macrons, so the wrong chip grades correct. Guarded by
  tests/regression.html BUG-4 over every manifest region. Fix rule: replace
  the colliding NON-answer with a real form of the same declension that
  collides with nothing (-ae in decl. 1, the ablative in decl. 4).

## OWNER DEPLOY CHECKLIST (when project done — owner does this)

1. cPanel full backup. 2. Upload changed files via FTP. 3. Run
   server/schema_v2.sql once in phpMyAdmin (idempotent; DECIDE: the one
   UPDATE backfilling nicknames publishes existing display-name-derived
   nicknames — recommend commenting it out, opt-in instead). 4. Use https
   cPanel (2083) not http (2082).

## Infrastructure notes

- Remote: https://github.com/oldenKnight/imarianus (private). Standing owner
  authorization: auto-push main after every accepted milestone, before PC
  switches, at completion. Never push unaudited work. Credential manager
  authenticates; it cannot delete remote branches.

- Dev server: node scripts/dev-server.js 8124 (serves /imarianus/ prefix too).
- Screenshots: chrome --headless=new --hide-scrollbars --screenshot=out.png
  --window-size=<w+40>,870 --virtual-time-budget=9000
  "http://localhost:8124/tests/qa-frame.html?w=375&screen=<name>".
- Session-limit deaths: agents die in groups at the account cap; relaunch
  after reset (check clock), preserve uncommitted work via a finisher agent.
  STANDING OWNER PERMISSION (2026-08-14): auto-restart everything after any
  usage wall, no confirmation needed. No PC migration planned.
- Agent transcripts expire fast — put full assignments in prompts, not
  follow-ups; audit fixes go to a NEW agent if resume fails.

- server/config.php on THIS machine holds the owner PRODUCTION DB
  credentials (localized for FTP deploy). It is git skip-worktree flagged
  (git ls-files -v shows S) so local changes are invisible to git and can
  never be committed or pushed. NEVER unset the flag; the repo keeps the
  CHANGE_ME placeholder. Agents: never cat/print this file.
