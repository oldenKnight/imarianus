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
└── server/
    ├── config.php       ← EDIT: DB credentials
    ├── db.php
    ├── schema.sql       ← import this into MySQL
    ├── admin_seed.php    ← run ONCE, then DELETE
    ├── lib/             ← protected by .htaccess
    └── api/             ← the endpoints the app calls
```

## 2. Database

Create a MySQL/MariaDB database (utf8mb4), then import the schema:

```
mysql -u USER -p YOURDB < server/schema.sql
```

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

## Not in this phase

- Teacher dashboard (roster + drill-down) — schema is ready; endpoints/UI are
  Phase 2.
- Google login for external students — `auth_identities` already supports a
  `google` provider; wiring is a later phase.
- Payments — later.
