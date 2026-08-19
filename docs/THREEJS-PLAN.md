> **ABORTED 2026-08-16 by owner instruction. No implementation was started
> and none is scheduled. This file is reference only.**

# THREE.JS ENRICHMENT PLAN (design only — NOT implemented; owner choosing)

Goal per owner: use three.js to SUBSTITUTE specific minigames or storytelling
moments, or ADD extras — improving the product without abandoning 2D canvas.

## Ground rules (engineering)

- three.js VENDORED (self-hosted single file, ~150 KB gzipped; no CDN ever —
  owner's standing rule). Loaded ON DEMAND via the existing content-loader
  pattern only when a 3D scene starts; the core app never pays its weight.
- EVERY 3D piece has the existing 2D implementation as automatic fallback:
  feature-detect WebGL + a device performance probe (first-frame timing); a
  settings toggle EFFECTŪS 3D: automaticē / semper / numquam. Old phones and
  failed loads silently get today's 2D. No XP/pedagogy difference between
  modes — 3D is presentation, the word-mechanics stay identical.
- Art direction: LOW-POLY FLAT-SHADED, same palette as the vector art (no
  textures, no PBR, fog + vignette) so 3D scenes read as the same world.
  30 fps cap on mobile; battery guard (pause on hidden).
- Server untouched. B-rating rules apply unchanged.

## Candidate roster

SUBSTITUTIONS (same mechanic, 3D presentation; 2D kept as fallback):
  S1 TRĀNSITUS MARIS RUBRĪ (Historia l6 boss) — the corridor in 3D: water
     walls towering both sides, fish shadows inside them, the dry path ahead;
     steer left/right, catch word-tablets. The single most cinematic payoff
     in the product; maps 1:1 onto the existing transitus mechanic.
  S2 NĀVIGĀTIŌ (Aeneis al3/al11 transitus) — steer Aenēās' galley on an open
     3D sea (storm swell for al3, cavalry-dust plain variant skipped — al11
     stays 2D reeds); waves by vertex displacement, word-amphorae bobbing.
     The Aenēis signature image become playable.
  S3 ARCA (Historia l2 ordina) — the gangway in 3D: animals walk up two
     planks, sort left/right. Charming but the 2D version already reads
     well post-fix; lowest value of the three substitutions.

ADDITIONS (new, not replacing anything):
  A1 STORYTELLING SET-PIECES — three slow "camera-walk" FĀBULA pages (no
     interaction, ~15 s each, skippable): (a) Trōia ārdēns seen from the
     fleeing ship (al2); (b) the Temple of Salomōn interior dolly (h48);
     (c) fūtūra Rōma rising from Elysium (al6/a24). Pure wonder moments at
     the three summits of the product.
  A2 LŪDUS ALTITUDO — an optional 3D variant of the falling-word game
     (words fall toward the player down a temple colonnade). Extra mode on
     replay only; the 2D ludus remains the step.
  A3 THEĀTRUM — a 3D "diorama shelf" on the track-complete screen: the
     learner's beaten bosses as figurines on a wooden shelf they can orbit.
     Trophy-room delight, zero pedagogy risk.

KEEP 2D (deliberate): boss duels (identity + readability), all card/choice
steps, the map (SVG board is the product's face and is at reference tier).

## Recommended package (my proposal as designer)

  S1 + S2 + A1 — the two signature crossings become 3D with full 2D
  fallback, plus the three storytelling set-pieces. This concentrates the
  wow where the narrative peaks are, touches zero pedagogy, and keeps the
  3D surface small enough to hold to the same quality bar as the rest.
  Second choice to add if appetite remains after seeing S1/S2: A3 (cheap,
  delightful). S3 and A2 I would skip — cost without proportional wonder.

## Effort/size estimate (for planning, not commitment)

  Vendor + loader + fallback scaffold: one engine milestone.
  Each S: ~1 agent-wave incl. tuning + QA. Each A1 scene: ~1/2 wave.
  Total for the recommended package: ~3-4 agent-waves + a QA pass.

## OWNER DECISION (2026-08-15, recorded)

Package: S1 + S2 + A1. Default: automatice (device probe + EFFECTUS 3D
toggle). Timing: implementation starts AFTER the map/art/clarity fix round
is verified by the owner on production. S3, A2 declined; A3 open for later.

## Original open questions (answered above)

  Q1 Which package: [recommended S1+S2+A1] / [also A3] / [also S3, A2] /
     [custom pick]?
  Q2 3D default: automaticē (probe decides, my recommendation) or numquam
     nisi ēlēctum (off unless the learner turns it on)?
  Q3 Priority: before or after the current fix-round (map navigation, art,
     option clarity) is verified on production?
