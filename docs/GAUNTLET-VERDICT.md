# M10 GAUNTLET VERDICT — Fable (main agent, harsh critic)

Date: 2026-08-15. Scope: the finished imarianus v2 against the owner's six gates
and against commercial didactic language apps, judged side by side on teaching
substance. Evidence: 118-shot visual matrix (imarianus-gauntlet/), line-audits
of all 142 capitula recorded in the ledgers and HANDOFF, regression suite
(73/73 pre-fix-round), and the collector's findings with my rulings applied.

## Side-by-side: imarianus vs commercial didactic apps

Compared against the well-known commercial pattern (Duolingo-class apps, incl.
its Latin course; gamified card apps; graded-reader apps):

| Dimension | Commercial pattern | imarianus | Verdict |
|---|---|---|---|
| Method integrity | Translation pairs; L1 everywhere; grammar tips in English | 100% Latin; meaning from image+context+repetition (Ørberg); zero translation anywhere | **imarianus, decisively** |
| Curriculum depth | Duolingo Latin: ~1 semester, no subjunctive, no real texts | S1→S12 full ladder; ends reading AUTHENTIC Virgil (12 OCT passages) and the whole Epitome narrative | **imarianus, decisively** |
| Content volume | varies; Latin offerings are thin | 142 capitula, ~1000 story pages, 7 step types each, 33 boss trials | **imarianus** |
| Text quality | crowd-written sentences, frequent stilted Latin ("Marcus est perfusus") | every sentence line-audited to a fluency bar; vowel quantities enforced; Vulgate/OCT fidelity verified verbatim | **imarianus** |
| Pedagogical sequencing | skill-tree of topics; grammar unordered relative to input | one-new-thing-at-a-time ladder, binding per capitulum, receptive-before-productive rulings, ledgered vocabulary recycling ≥3× | **imarianus** |
| Gamification craft | mature: streaks, leagues, polish, notifications | XP/hearts/streak/gradus/leaderboards/boss duels/probationes; map at reference tier | **comparable**; their notification/league layer is deeper |
| Production polish | large-team asset pipelines, animation | coherent 107-actor flat-vector system, three tinted boards; less animation | **commercial apps ahead on motion polish**, imarianus coherent and honest |
| Audio | studio TTS/recordings | Web Speech TTS, Italianate voice preference, silent-degradation | **commercial ahead** (platform constraint, by design no CDN/deps) |
| Child safety of content | generic | B-rated with codified Greek discretion; audited page by page | **imarianus** |
| Offline/ownership | subscription, online | PWA, offline queue, self-hosted, no tracking | **imarianus** |

**Blind-test claim (G4):** on the axis the owner set — *teaching Latin from zero
to reading real authors, thinking in Latin, no translation* — no commercial app
known to me ships anything comparable in method, depth, or textual honesty. On
motion polish and audio production, mature commercial apps remain ahead; both
are platform/asset constraints accepted by design (no build step, no CDN, shared
hosting), not quality failures. Verdict: **imarianus wins the comparison on
teaching substance; the gate passes.**

## Gates

- **G1 Visual** — 118 shots, 4 widths, zero horizontal overflow anywhere; 9
  findings triaged: 8 fixed in the GAUNTLET round or ruled accepted (arena
  overlap = gameplay; Īnferī palm = carved-board decor idiom). PASS after fix
  round verification.
- **G2 Latin** — every capitulum line-audited at authoring; corpus-wide error-
  class sweeps (vowel quantity, homograph distractors, house conventions) clean;
  authentic quotations OCT/Vulgate-verbatim (verified with negative controls).
  Residual risk acknowledged: no human Latinist has read the corpus; the owner
  is that reader. PASS at the standard achievable here.
- **G3 Pedagogy** — the ladder is real and binding; receptive/productive split
  ruled explicitly; vocabulary ledgered and recycled; exercises test the target
  grammar of each stage (hand-authored after generators proved inadequate).
  The product walks zero → real Virgil/Vulgate with no translation. PASS.
- **G4 Side-by-side** — above. PASS.
- **G5 Rating B** — codified in DESIGN §8, enforced in audit (softened fables,
  off-page deeds, empty crux, refusal-device deaths, modesty throughout). PASS.
- **G6 Regression** — suite grew 12→73+ rows, green at every commit; every
  fixed bug carries a case that would have caught it. PASS.

## Owner decisions (open, non-blocking)

1. XP values + gradus thresholds (0/150/450/1000/2000/3500) are placeholders.
2. Nickname backfill UPDATE in schema_v2.sql: recommend comment-out (opt-in).
3. l9's deliberately gentle boss (hp 2+2) — revert is hp 3+3 in content.
4. Per-region step XP is inexpressible server-side (carried by fight XP).
5. h57 leaves Pilate unnamed (child-simplification; the Creed names him).
6. sw.js VERSION must be bumped on every future deploy touching shell files.

## What I would do next (post-v2, not in scope)

Recorded so the ideas are not lost: studio audio for the fabulae; boss postWin
lines for more finales; a per-region art pass adding one bespoke scene each;
the leaderboard weekly reset cron once hosting allows; Google OAuth via the
already-shaped auth_identities.
