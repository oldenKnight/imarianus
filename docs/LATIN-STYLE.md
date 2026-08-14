# IMARIANUS — LATIN STYLE GUIDE (binding on every content author)

The whole product is 100% Latin. No English/Spanish anywhere a learner can see.
Meaning is delivered by images, context, repetition, and Latin-only glosses —
numquam interpretātiōne.

## 1. Orthography

- Macrons on every long vowel, everywhere (titles, buttons, content): ā ē ī ō ū ȳ.
  Hidden vowel quantities must be CORRECT (check against OLD/L&S usage as embodied
  in Familia Romana; e.g. vōx, lūx, rēx, sōl; but lupus, canis short u/a).
- Consonantal v, vocalic u (vīnum, ūva) — Familia Romana convention. Classical
  spelling otherwise (caelum not coelum) EXCEPT proper names in Historia Sacra.
- Historia Sacra proper names use Clementine Vulgate forms: Noe, Moyses, Abraham,
  Isaac, Iacob, Ioseph, Iosue, Gedeon, Samson, Dalila, Samuel, Saul, David,
  Salomon, Elias, Isaias, Daniel, Tobias, Maria, Iesus. Most are indeclinable or
  Vulgate-declined (Abrahae gen./dat., Moysi dat., Iesu gen./dat./abl.) — follow
  the Vulgate's own inflection, verified in latin-sources/vulgata-clementina-raw.txt.
  Macronize conservatively (Mōyses? NO — leave Vulgate names unmacronized except
  where quantity is certain and classical: Dāvīd stays David; write Iesus, Maria).
- Aeneis proper names: classical macronized forms (Aenēās, Dīdō, Turnus, Lāvīnia,
  Anchīsēs, Ascanius/Iūlus, Sibylla).

## 2. Grading discipline (the Ørberg contract)

- A capitulum may use ONLY grammar at or below its ladder stage (CURRICULUM §0).
- ≤ 8 new lexemes per capitulum. Every new lexeme is (a) introduced by a scene
  image or a Latin gloss, (b) recycled ≥ 3× within its capitulum, (c) recycled
  again within the next two capitula. Maintain a running vocabulary ledger per
  track (content/_ledger-<track>.md, not shipped) listing each lexeme's first use.
- Sentence length caps: S1–2 ≤ 7 words; S3–5 ≤ 10; S6–8 ≤ 14; S9+ free but clear.
- One new thing at a time: a sentence introducing new grammar uses known vocab;
  a sentence introducing new vocab uses known grammar.
- Latin-only gloss devices (in margins/vocab cards): imāgō (picture), = synōnymum,
  ↔ contrārium, "id est …", "-a -um" pattern hints, small labelled scene diagrams.
- Repetition with variation, not repetition verbatim: vary word order naturally
  (Latin's flexibility is a feature to TEACH — subject-object-verb, verb-first for
  vividness, etc.). Exercises must accept all valid orders (DESIGN §4 COMPLĒ).
- Questions engage the reader: Quis? Quid? Ubi? Cūr? — with the answer visible in
  scene or text (comprehensible, never a trick).

## 3. Register and tone per track

- FABULAE: lively, concrete, direct speech in every fable, closing mōrāle (one
  sentence, gnomic present).
- HISTORIA SACRA: dignified, simple, reverent. Narrative present through L5;
  perfect as narrative tense from L6. NOTHING may contradict the Clementine
  Vulgate; simplify by OMISSION only. Each capitulum carries fons: 'Gn 1' etc.
  Traditional (pre-Vatican-II) treatment; no modernizing glosses.
- AENEIS: elevated but graded; pre-teach poetic vocabulary (ēnsis = gladius,
  aequor = mare, fātum, pietās) via gloss devices before the authentic lines use
  them. Authentic Virgil quoted EXACTLY (Hirtzel/OCT text), 2–4 lines per liber.

## 4. Quality bar (what Fable's audit rejects)

- Any agreement/case/tense error; any false vowel quantity; any un-idiomatic
  calque from English; any English word order habit (e.g. reflexive misuse,
  "est" overuse where Latin drops it, wrong sequence of tenses at S11+).
- Any exercise whose answer is ambiguous or whose distractors are accidentally
  also correct (every distractor must be clearly wrong IN THE PICTURED CONTEXT).
- Any new word not supported by image/gloss; any grammar above the stage.
- Any B-rating breach (DESIGN §8).

## 5. Mechanical conventions for content files

- ES5 object literals, same shape as existing DATA.fables entries, extended per
  the pipeline schema (M4 defines it in js/content/README first).
- Text fields are UTF-8 with real macron characters, never HTML entities.
- Scene specs reference only actors/backgrounds that exist after M2; if a scene
  needs a missing actor, STOP and report to Fable rather than substituting.
- ttsText field optional per page when display text ≠ ideal spoken text.
