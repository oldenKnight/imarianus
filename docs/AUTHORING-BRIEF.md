# AUTHORING BRIEF — read before writing any capitulum

You are writing GRADED LATIN for imarianus. Binding references, in order:
content/README.md (schema) → docs/LATIN-STYLE.md (language rules) →
docs/CURRICULUM.md (your region's fables/episodes + ladder stage) →
docs/DESIGN.md §8 (children's B rating). This file adds working rules and one
golden exemplar. Fable (main agent) line-audits every sentence; expect rejection
for any defect in LATIN-STYLE §4.

## Ladder amendments (designer rulings, binding)

1. RECEPTIVE VERB FORMS: from S1 the learner READS 3rd-person present of ANY
   conjugation (-at/-et/-it/-t, -ant/-ent/-unt/-iunt): Ørberg does exactly this
   (venit in Familia Romana cap. III). The conjugation system itself is only
   TESTED progressively. What stays hard-gated by stage: cases, tenses, moods,
   voice, pronouns — everything in CURRICULUM §0 that is not this ruling.
2. INFINITIVE with potest/vult/dēbet is allowed receptively from S5.
3. CUM + PRONOUN: never author a cloze splitting mēcum/tēcum/sēcum/nōbīscum/
   vōbīscum/quōcum; write the fused form as ONE token. Generators skip
   cum+pronoun pairs — if you see one generated, report it as an engine bug.
4. Vulgate names (Historia): follow the Vulgate's own inflection; check every
   form against latin-sources/vulgata-clementina-raw.txt before use.

## Working rules

- SCENES FIRST: before writing text, list which actors/backgrounds each scene
  needs and verify each exists (tests/art-gallery.html shows the library). A
  missing actor = STOP and report; never substitute or approximate.
- Every story page: `scene` + `la` text + `nova` for each new word. A page
  without a scene is only allowed for direct-speech pages that continue an
  established scene.
- Direct speech in every fable (it's what makes them alive) — but keep quoted
  grammar at stage, and remember generators skip quoted pages (by design).
- The vocabulary ledger (content/_ledger-<track>.md) is part of your
  deliverable: append your capitula's new lexemes with first-use location.
  Before introducing a "new" word, grep the ledger — if an earlier capitulum
  taught it, it is FREE (no nova gloss needed, doesn't count against your 8).
- Boss quiz words must come from the region's own capitula (`from:` field).
- Historia Sacra: every capitulum carries `fons`; verify the episode against
  the Vulgate text BEFORE writing; simplify by omission only.
- Self-check before reporting done: every vocab item recycled ≥3× in its
  capitulum; sentence-length caps respected; run tests/regression.html AND
  load your region via tests/qa.html headlessly to see every step render.

## Golden exemplar — Leō et Mūs (R2 AGER, stage S2) — imitate this shape

Latin at S2: nom/acc sg+pl, any-conj 3rd person present (ruling 1), -que, est/sunt.
New lexemes (8): leō, mūs, dormit, currit, capit, rēte, rōdit, līber.

    story: [
      { la: 'Ecce leō! Leō in silvā dormit.',
        scene: SC.l_dormit,
        nova: [ { w: 'leō', e: '🦁' }, { w: 'dormit', e: '💤' } ] },
      { la: 'Mūrēs quoque in silvā habitant. Mūrēs parvī sunt.',
        scene: SC.l_mures,
        nova: [ { w: 'mūs', e: '🐭', g: 'mūrēs = multī mūs' } ] },
      { la: 'Ūnus mūs super leōnem currit!',
        scene: SC.l_currit,
        nova: [ { w: 'currit', e: '🏃' } ] },
      { la: 'Leō oculōs aperit et mūrem capit.',
        scene: SC.l_capit,
        nova: [ { w: 'capit', e: '✊' } ] },
      { la: 'Mūs timet: leō enim magnus est, mūs parvus.',
        scene: SC.l_timet },
      { la: 'Sed leō mūrem nōn dēvorat: leō mūrem līberat.',
        scene: SC.l_liberat },
      { la: 'Posteā virī veniunt et leōnem capiunt.',
        scene: SC.l_viri },
      { la: 'Leō in rētī iacet et fremit.',
        scene: SC.l_rete,
        nova: [ { w: 'rēte', e: '🕸', g: 'virī rēte tenent' } ] },
      /* ^ gloss corrected: the first draft glossed 'rēte virōrum' — a GENITIVE,
         stage S3, inside an S2 capitulum. The pilot agent caught it. Glosses
         obey the ladder exactly like body text. */
      { la: 'Mūs leōnem audit, venit, rēte rōdit!',
        scene: SC.l_rodit,
        nova: [ { w: 'rōdit', e: '🦷' } ] },
      { la: 'Iam rēte leōnem nōn tenet: leō līber est!',
        scene: SC.l_liber,
        nova: [ { w: 'līber', g: '↔ captīvus', e: '🔓' } ] },
      { la: 'Leō et mūs iam amīcī sunt.',
        scene: SC.l_amici },
      { la: 'Etiam mūs parvus leōnem magnum iuvat.',
        scene: SC.l_moral }   /* mōrāle: gnomic present, no new words */
    ]

Why this passes audit: every sentence ≤7 words net of particles; the only
plural morphology is nom/acc + est/sunt agreement (the stage's target); leō/mūs
contrast big/small is shown by the pictures before the adjectives assert it;
rēte appears 4×, in three different cases only where the stage allows reading
them in context (in rētī ablative is S4 — NOTE: if your region is S2, write
'in rēte iacet'?? NO — that would be false Latin. The CORRECT solution at S2
is to avoid the construction: 'Rēte leōnem tenet.' Never bend grammar to the
ladder; reword instead. This trap is exactly what audits catch.)

Correspondingly the shipped page 8 must read: 'Rēte leōnem tenet! Leō fremit.'
— same meaning, stage-legal, and the moral of this note: WHEN THE LADDER AND
GOOD LATIN COLLIDE, CHANGE THE SENTENCE, NEVER THE GRAMMAR.

## Lexeme cap, clarified (supersedes the bare "≤8" where they conflicted)

The ≤8 cap counts PICTURED/GLOSSED CONTENT LEXEMES (nouns, verbs, adjectives
that get a vocab card or scene gloss). High-frequency FUNCTION words and
copula forms (et, sed, nōn, iam, enim, -que, quoque, ūnus, est/sunt, ecce,
posteā, semper, hic-there adverbs) are FREE but MUST carry a nova gloss at
first appearance and a ledger entry marked FUNCTION. Basic size/quality
adjectives (magnus, parvus, laetus, trīstis) count toward the 8 unless already
taught. Total new types per capitulum (content + function) should stay ≤16.
The golden exemplar's own overflow is the cautionary tale here — the pilot
counted it honestly; hold the cap the way f5/f6 of R2 do.

Note also (pilot rulings, now binding): 'ad' + accusative joins 'in' + ablative
as a receptive fixed pattern available from S2 WHEN glossed at first use with a
direction arrow; season/time idioms ('Aestās est') are free; emoji outside the
long-established core set may render as tofu — prefer scene cards, and if you
use an emoji, verify it renders (🪙 does not; 🥇 does).

## Registration protocol (collision safety — binding from wave 2 on)

Content agents DO NOT edit content/manifest.js, content/manifest.json, or
server/lib/rules.php (waves run in parallel in ONE working tree; concurrent
edits to shared files corrupt each other). Instead: own your content file(s)
and your track ledger, and write ONE registration snippet per region to
content/_pending/<region>.reg.json:

    { "track": "fabulae", "region": "r03", "titulus": "Rīvus",
      "capitula": ["f7","f8","f9"], "boss": "b_r03",
      "quizKey": [ { "q": "canis", "correct": 0 }, ... ],
      "xp": { "step": 10, "boss": 40 } }

A dedicated integrator applies all pending snippets to the manifest twins and
rules.php between waves, then deletes the snippet. Your region will not be
loadable until integration — verify your content by filtering the manifest in
a scratch harness (the R2 pilot's report documents the DOMContentLoaded trick).

## Boss clamor/sententia items — hand-author them (binding from wave 3 on)

The engine can derive clamor/sententia items from story pages, but derivation
is a FALLBACK. Every region/liber ships hand-authored `boss.clamor` (duels) or
sententia-phase `items` (probationes): 4-6 items, the gap always a picturable
content lexeme (never a function word), 3 options with same-POS distractors
clearly wrong in the pictured context, `scene` on every item. The M3 report's
config reference documents the exact fields.

## Assignment protocol

You will be given: track, region/liber ids, the CURRICULUM line, and which
manifest entries to add. Deliver: content file, both manifest entries, ledger
append, and a report listing every new lexeme, every scene actor used, any
missing art, any place you departed from the fable/episode as commonly told
(with the reason). Commit prefix "M5:"/"M6:"/"M7:" per track.
