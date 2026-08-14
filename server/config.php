<?php
/* ============================================================
   config.php — environment + security constants
   ------------------------------------------------------------
   FILL IN the database credentials for your host, then keep this
   file OUTSIDE the web root if your host allows it, or at least
   ensure .htaccess blocks direct access (the bundled .htaccess
   denies *.php in /server except the /api front controllers).
   ============================================================ */

/* ---- database (EDIT THESE on your host) ---- */
define('DB_HOST', 'localhost');
define('DB_NAME', 'mariane');          // TODO: your database name
define('DB_USER', 'mariane_user');     // TODO: your db user
define('DB_PASS', 'CHANGE_ME');        // TODO: your db password
define('DB_CHARSET', 'utf8mb4');

/* ---- environment ---- */
// Set to false in production so errors aren't leaked to clients.
define('APP_DEBUG', false);
// Used to decide Secure cookie flag; force true once you have HTTPS (you do).
define('APP_HTTPS', true);

/* ---- session + remember-me cookies ---- */
define('SESSION_NAME', 'mariane_sess');
define('REMEMBER_COOKIE', 'mariane_remember');
define('REMEMBER_DAYS', 45);           // "stay logged in" lifetime

/* ---- CORS ---- */
// If the API is served from the SAME origin as the app (recommended),
// leave this empty. Only set an origin if the front-end is on another domain.
define('CORS_ALLOW_ORIGIN', '');

/* ---- rate limiting ---- */
define('LOGIN_MAX_FAILS', 8);          // per window, per IP
define('LOGIN_WINDOW_MIN', 15);        // window length in minutes
