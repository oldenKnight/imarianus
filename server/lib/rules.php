<?php
/* ============================================================
   lib/rules.php — the server's source of truth
   ------------------------------------------------------------
   The client (data.js) holds the CONTENT (Latin text, art). The
   server only needs the FACTS required to validate events and
   grant rewards: which fables/steps exist, their order, XP
   values, unlock prerequisites, the boss config, and the quiz
   ANSWER KEY (never shipped to the client).

   Keep these ids in sync with js/data.js: fables f1..f3, the six
   steps, region1, and the quiz vocab keys.
   ============================================================ */

/* ordered fables */
function rule_fables() {
  return array('f1', 'f2', 'f3');
}

/* ordered steps within every fable */
function rule_steps() {
  return array('verba', 'fabula', 'ludus', 'aenigmata', 'corrige', 'comple');
}

/* XP granted on FIRST completion of each step (idempotent thereafter) */
function rule_step_xp($step) {
  $map = array(
    'verba' => 20, 'fabula' => 20, 'ludus' => 20,
    'aenigmata' => 20, 'corrige' => 20, 'comple' => 20
  );
  return isset($map[$step]) ? $map[$step] : 0;
}

/* is (fable,step) a real curriculum slot? */
function rule_is_valid_step($fable, $step) {
  return in_array($fable, rule_fables(), true)
      && in_array($step, rule_steps(), true);
}

/* index helpers */
function rule_fable_index($fable) {
  $f = rule_fables();
  return array_search($fable, $f, true); // int|false
}
function rule_step_index($step) {
  $s = rule_steps();
  return array_search($step, $s, true);
}

/* regions and their bosses */
function rule_regions() {
  return array(
    'region1' => array(
      'fables' => array('f1', 'f2', 'f3'),
      'fight_xp' => 30,
      'quiz_xp_each' => 10,
      'quiz_pass_max_wrong' => 1,   // <=1 wrong of 5 passes
      // ANSWER KEY: question word -> the correct vocab key the student must pick.
      // For "word -> pick the matching image", the answer IS the same word; we
      // store it explicitly so grading is independent of client display order.
      'quiz' => array(
        array('q' => 'vulpēs', 'a' => 'vulpēs'),
        array('q' => 'cāseus', 'a' => 'cāseus'),
        array('q' => 'lupus',  'a' => 'lupus'),
        array('q' => 'ūva',    'a' => 'ūva'),
        array('q' => 'aqua',   'a' => 'aqua')
      )
    )
  );
}

function rule_region($regionId) {
  $r = rule_regions();
  return isset($r[$regionId]) ? $r[$regionId] : null;
}
