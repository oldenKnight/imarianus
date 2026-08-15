# HANDOFF STATUS — imarianus v2 build

Purpose: lets ANY fresh Claude session (new PC, new conversation) resume this
project with zero context loss. Read MASTER-PLAN.md first, then this. Keep this
file updated at every milestone; it is the cross-machine continuation point.
Last updated: 2026-08-14 ~19:00 (America/Mexico_City) by Fable (main agent).

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
- CONTENT shipped & line-audited: fabulae r01 (pre-existing, f1-f3), r02
  (f4-f6, audited), historia l1-l2 (h1-h10, audited — 3 fixes with integrator).

## IN FLIGHT at last update (relaunch if lost in a PC switch)

- INTEGRATOR agent: applying historia audit fixes F1-F3 (see task desc /
  git log), registering l1+l2 into manifest twins + rules.php, min_ms 15000,
  r02 vinceText. If its commits (prefix "INT:") are absent from git log,
  relaunch with the same assignment (recoverable from _pending/*.reg.json
  and the audit rulings in this file's git blame / conversation task list).
- M5 wave agent: content/fabulae-r03.js + r04.js (Rīvus S3: f7 Canis et
  Umbra, f8 Rāna et Bōs no-burst, f9 Cervus ad Fontem; Mōns S4: f10 Testūdō,
  f11 Vulpēs et Ciconia, f12 Haedus et Lupus wolf-cameo; bosses Bōs/Lepus).
  If "M5: Fabulae Regio III/IV" commits absent, relaunch per AUTHORING-BRIEF.

## NEXT WAVES (launch order)

1. After M5 r03/r04 lands: Fable line-audits the Latin, then second INT pass
   (r03/r04 snippets → manifest + rules).
2. Fabulae r05-r06 + r07-r08 (two agents), historia l3-l4 (Abraham/Iacob),
   aeneis l1-l2 (advanced track: own ledger, S12+, authentic Virgil lines per
   liber close — see CURRICULUM §3).
3. Then fabulae r09-r12, historia l5-l9, aeneis l3-l12 in successive waves.
4. M9: offline queue (storage.js), PWA (manifest.webmanifest + sw.js),
   teacher dashboard (server endpoints exist: class_roster.php).
5. Art addendum wave + polish backlog (task #12): arcus rainbow, sol/ventus
   face:false, later brick, radiance prop; 420px sonus/fabula clip; comple
   two-blank guard.
6. M10 final gauntlet: full visual sweep (every screen, 360/375/768/900),
   whole-corpus Latin audit, blind side-by-side vs commercial apps, fix
   rounds until it wins. Then owner deploy checklist (below).

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

- Dev server: node scripts/dev-server.js 8124 (serves /imarianus/ prefix too).
- Screenshots: chrome --headless=new --hide-scrollbars --screenshot=out.png
  --window-size=<w+40>,870 --virtual-time-budget=9000
  "http://localhost:8124/tests/qa-frame.html?w=375&screen=<name>".
- Session-limit deaths: agents die in groups at the account cap; relaunch
  after reset (check clock), preserve uncommitted work via a finisher agent.
- Agent transcripts expire fast — put full assignments in prompts, not
  follow-ups; audit fixes go to a NEW agent if resume fails.
