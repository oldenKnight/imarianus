<?php
/* ============================================================
   api/logout.php — POST  (clears session + this device's token)
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';

session_boot();
require_method('POST');
require_csrf();

logout_current();
json_out(array('ok' => true));
