# MARIANE — Phase 1 backend setup

Server-authoritative progress for the Latin app. The game runs in the browser
exactly as before; the PHP/MySQL backend owns each student's progress, grants
XP, grades boss quizzes, and keeps students logged in across devices.

## 1. Upload

Put the whole folder at your web root so the layout is:

```
/  (web root)
├── index.html
├── .htaccess            ← HTTPS redirect + security headers + protects /server
├── css/  js/            ← the app (unchanged game)
├── content/             ← generated content files + manifest.json (optional)
└── server/
    ├── config.php       ← EDIT: DB credentials
    ├── db.php
    ├── schema.sql       ← import this into MySQL (first install)
    ├── schema_v2.sql    ← import this too (additive upgrade, see §2b)
    ├── admin_seed.php    ← run ONCE, then DELETE
    ├── lib/             ← protected by .htaccess
    └── api/             ← the endpoints the app calls
```

## 2. Database

Create a MySQL/MariaDB database (utf8mb4), then import the schema:

```
mysql -u USER -p YOURDB < server/schema.sql
```

## 2b. Database upgrade — schema v2 (rankings, profiles, records)

`server/schema_v2.sql` adds everything the leaderboards, public profiles and
boss records need. **Run it on the live database.** It is designed to be run on
a database that already has students, XP and progress in it.

```
mysql -u USER -p YOURDB < server/schema_v2.sql
```

If you have no shell access, paste the file into phpMyAdmin's **SQL** tab (or
use its Import tab). It needs no `DELIMITER` change and defines no stored
procedures, precisely so those tools can swallow it.

### The preservation guarantee

`schema_v2.sql` is **additive only**. Read the file: every statement is one of

- `CREATE TABLE IF NOT EXISTS`
- `ALTER TABLE … ADD COLUMN`, wrapped in an `information_schema` guard so it
  runs only when the column is missing
- `CREATE INDEX`, guarded the same way
- `INSERT IGNORE` (three rows into the new `apps` table)

There is **no `DROP`, no `DELETE`, no `TRUNCATE`, no `MODIFY`, no `CHANGE`**
anywhere in it. No existing column is redefined and no existing row is
rewritten — with one deliberate, opt-out exception, clearly marked in the file:
a single `UPDATE IGNORE students SET nickname_lc = …` that fills in the
brand-new `nickname_lc` column for students who already have a nickname, so the
boards are not empty on launch day. It writes only that new column, only where
it is still `NULL`, and you may comment it out if you would rather every
student claim a nickname explicitly first.

**The file is safe to run twice.** Every statement is guarded, so a second run
is a no-op. If the import stops halfway (a host timeout, a dropped connection),
just run it again.

Sanity check afterwards:

```sql
SHOW TABLES;                    -- + apps, score_events, leaderboard_cache, boss_records
SHOW COLUMNS FROM students;     -- + nickname_lc
SELECT COUNT(*) FROM students;  -- identical to before the run
SELECT COUNT(*) FROM progress;  -- identical to before the run
```

Nothing else in the app depends on the upgrade having been applied: the
ranking writes are wrapped so that if `schema_v2.sql` has *not* been imported
yet, students keep playing and earning XP exactly as before, and the failures
are written to the PHP error log instead of to the screen.

### What the upgrade adds

| object | why |
| --- | --- |
| `apps` (id, code) | 'web', 'ios', 'books' — the account/score service is shared with the two other apps. Fixed ids, seeded. |
| `score_events` | **Append-only** source of truth: (student, app, board, metric, value, ref, achieved_at). Never updated, never deleted. |
| `leaderboard_cache` | Derived, disposable board snapshots. Holds ids and numbers only, never a name. |
| `boss_records` | One row per (student, region): best time, fewest mistakes, attempts, phase breakdown of the best run. |
| `students.nickname_lc` | Nullable + UNIQUE. The public identity key behind `/u/<nickname>`. `NULL` = this student is not public. |
| `progress(xp)`, `progress(streak)` indexes | The total-XP and streak boards read `progress` directly — cheapest possible source. |
| `login_attempts(identifier, created_at)` index | The boss-result and nickname rate limiters reuse this table with a bucketed identifier. |

**Weekly XP is computed, not rolled up.** There is no cron on shared hosting,
so a weekly rollup table would need its Monday reset faked lazily on read
anyway — all of the cost, none of the simplicity. Instead the weekly board is
one indexed range scan over `score_events` from Monday 00:00 UTC, cached for
five minutes. Whatever the history grows to, that scan only ever touches one
week of it. The reasoning is repeated in the SQL file next to the index.

## 3. Configure

Edit `server/config.php`:
- `DB_NAME`, `DB_USER`, `DB_PASS` for your host.
- `APP_DEBUG` → keep `false` in production.
- `APP_HTTPS` → `true` (you have HTTPS).

## 4. Create your teacher + class (one time)

Set a one-time key inside `server/admin_seed.php` (`$SETUP_KEY`), then visit:

```
https://YOURSITE/server/admin_seed.php?key=YOURKEY&email=you@example.com&pass=YOURPASSWORD&class=Latina%20I
```

It prints a **JOIN CODE**. Give that to students who self-register so they're
attached to your class. **Then delete `server/admin_seed.php`.**

## 5. How students get in

- **Self-register:** the app's register screen — username + password, pick an
  avatar, and (optionally) enter the class join code to be attached to you.
- **Teacher-provisioned:** you can pre-create student rows + `auth_identities`
  (a small admin UI for this is Phase 2; for now they self-register with the
  code).

## Endpoints

All responses are JSON, all errors are `{"ok":false,"error":"..."}` with a real
HTTP status. Every **POST** requires a live session and the `X-CSRF-Token`
header (the token comes back from `login`, `register` and `me`).

### Existing (phase 1)

| method | endpoint | notes |
| --- | --- | --- |
| POST | `api/register.php` | `{username, password, displayName, nickname?, avatar?, joinCode?}` |
| POST | `api/login.php` | `{username, password, remember?}` |
| POST | `api/logout.php` | clears session + remember token |
| GET | `api/me.php` | current student + snapshot |
| POST | `api/step_complete.php` | `{fable, step, score?}` — XP granted once, server-side |
| POST | `api/boss_fight.php` | `{region}` — marks the fight cleared |
| POST | `api/boss_quiz.php` | `{region, answers}` — graded against the server-side key |
| POST | `api/sync.php` | `{hearts?, mapNode?}` |

### New in v2 (M8)

| method | endpoint | auth | notes |
| --- | --- | --- | --- |
| GET | `api/board.php?id=total\|weekly\|rating\|records\|streak[&region=]` | **public** | Serves `leaderboard_cache`; any request that finds it older than 5 minutes recomputes it inline under a MySQL advisory lock (there is no cron on shared hosting). `region` is required for `records`. Response carries `order` (`asc` for records — fastest first — `desc` otherwise), `unit`, `computedAt` and `ttl`. |
| GET | `api/profile.php?nickname=` | **public** | The `/u/<nickname>` profile: nickname, avatar, gradus, xp, streak, rating, records, badges, tracks in progress. |
| POST | `api/boss_result.php` | student | `{region, ms, mistakes, phases[]}`. Records the clear + the speed/mistake record and grants the first-clear XP. |
| POST | `api/nickname.php` | student | `{nickname}` — claim/change your own public nickname. 3-20 chars, `[A-Za-z0-9_]`, unique, blacklist-checked. |
| POST | `api/teacher_login.php` | — | `{email, password}` — binds a **teacher** session (`$_SESSION['tid']`). Groundwork for the M9 dashboard; no remember-me. |
| GET | `api/class_roster.php[?class=]` | teacher | Own classes, join codes, and per-student steps/capitula/bosses/XP/streak. Ownership is enforced by the SQL join, not by the query string. |

### The public/private line

`api/board.php` and `api/profile.php` are open to strangers by the owner's
decision, and they expose **exactly two columns of the `students` table:
`nickname` and `avatar`**. Never `display_name`, never the email or username
from `auth_identities`, never `class_id`, its teacher, or `source`. This is
enforced in the SQL — every SELECT on that path names its columns one at a
time, and there is no `SELECT *` in either file. A student whose
`nickname_lc` is `NULL` has not claimed a public identity and is omitted from
every public board and profile.

`api/class_roster.php` is the deliberate mirror image: a teacher sees
`display_name` for **her own** pupils, and the query reaches them only through
`classes.teacher_id = <session teacher>`.

### Anti-cheat on `api/boss_result.php`

1. A body containing `xp`, `level`, `gradus`, `rating`, `granted` or `score` is
   **rejected outright** (422). The client states measurements; the server
   states rewards.
2. Per-student rate limit (default 20 results/hour), reusing the
   `login_attempts` table with a bucketed identifier.
3. Minimum plausible duration per region (`rule_boss_min_ms()` in
   `lib/rules.php`; 20 s for region1) and a 1-hour upper bound.
4. The region must actually be unlocked — every capitulum in it complete.
5. First-clear XP is granted at most once per region, guarded by the
   append-only `events` log. A replay bumps `attempts`, may improve the
   record, and pays nothing.
6. A daily XP cap per student (`RULE_DAILY_XP_CAP`, default 1000) trims
   whatever is left.

### Content manifest

`lib/rules.php` reads `content/manifest.json` when it is present:

```json
{ "version": 2,
  "tracks": [ { "id": "fabulae",
                "regions": [ { "id": "r01", "capitula": ["f1","f2","f3"],
                               "boss": "b_r01" } ] } ],
  "steps": ["verba","fabula","sonus","ludus","aenigmata","corrige","comple"] }
```

The manifest owns the capitulum list, region membership and the **step list**
— step validation accepts whatever it declares, so adding `sonus` is a content
deploy, not a PHP edit. XP values and quiz **answer keys** are never in the
manifest (it is generated from client content and would leak them); they stay
in `lib/rules.php`. When the file is absent the server falls back to the
hardcoded f1-f3 / six-step lists and behaves exactly as before.

**Region renaming (`region1` → `r01`).** The manifest names the first region
`r01`; the shipped client, and every row already in `boss_clears` and
`events`, say `region1`. `rule_region_aliases()` bridges the two: `r01`
inherits `region1`'s XP values and quiz answer key, both ids are accepted from
clients, and everything that *writes* canonicalises to `region1` first — so
the two names can never become two rows, two first-clear XP grants or two
split records. Remove the alias entry once no client and no stored row uses
the old id. A manifest region with **no** answer key (aliased or otherwise)
now refuses its quiz outright (`quiz_unavailable`) instead of passing a
student who answered nothing.

A drift
between the two — a step or capitulum the server knows and the manifest does
not, or a region whose membership disagrees — is written to the PHP error log
(throttled to once an hour) so it cannot rot silently.

## What's enforced server-side

- Passwords hashed (`password_hash`); never stored or returned.
- Prepared statements throughout (no SQL injection).
- The logged-in student id comes from the session, never the request body.
- CSRF token required on every state-changing call.
- Login rate-limited per IP.
- XP granted once per step (replays grant nothing) — the farm exploit is closed
  on the server too, not just the client.
- Boss quiz graded against a server-side answer key never shipped to the browser.
- "Stay logged in" uses a rotating selector/verifier remember-me token; logout
  deletes it.
- **Boards are derived, never declared.** The client posts events; the server
  computes XP, rating, records and ranks. There is no request shape that lets a
  browser write a score.
- **The public API cannot leak an identity.** nickname + avatar, enforced in
  SQL, on every public path.

## Not in this phase

- Teacher dashboard UI — `api/teacher_login.php` and `api/class_roster.php`
  exist as groundwork (M8); the dashboard itself is M9.
- Google login for external students — `auth_identities` already supports a
  `google` provider; wiring is a later phase.
- Payments — later.
