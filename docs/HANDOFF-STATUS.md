# HANDOFF STATUS — imarianus v2 build

Purpose: lets ANY fresh Claude session (new PC, new conversation) resume this
project with zero context loss. Read MASTER-PLAN.md first, then this. Keep this
file updated at every milestone; it is the cross-machine continuation point.
Last updated: 2026-08-15 ~03:15 (America/Mexico_City) by Fable (main agent).

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
  dashboard at teacher/. Regression suite 49/49.
- CONTENT shipped, LINE-AUDITED and registered: fabulae r01-r06 (f1-f18),
  historia l1-l4 (h1-h22). Committed+audited awaiting registration: fabulae
  r07 (one fix queued), r10, aeneis al1/al2 (all in task-13 INT-4 queue).

## IN FLIGHT as of 2026-08-15 03:15 (relaunch per finisher pattern if lost)

Four FINISHER agents: fabulae r08(draft)+r09(new), fabulae r11(draft)+r12(new,
finale Lupus Ultimus), historia l5(draft)+l6(draft; perfect-tense landmark),
historia l7(draft, has known stage violations to fix)+l8(new). Drafts sit
untracked in content/. If their "M5:"/"M6:" commits are absent, relaunch.

## NEXT (order)

1. Audit each finished wave; INT-4 per task 13 (aeneis al1/al2 registration,
   queued audit fixes, ledger part2 merges, r07-r12 + l5-l8 registration, push).
2. Historia L9 IESUS — dedicated agent, most doctrinally sensitive, closest
   audit (8 capitula per CURRICULUM §2).
3. Aeneis librī III-XII in three waves (a9+; ids continue al3..al12; 4
   capitula each; authentic Virgil lines per liber close; charter in the
   al1/al2 file headers + CURRICULUM §3).
4. Art addendum + polish backlog (task 12). 5. M10 final gauntlet (visual
   sweep, whole-corpus Latin audit, side-by-side vs commercial apps), then
   owner deploy checklist below.

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
  hand-authored from wave 3 on.

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
