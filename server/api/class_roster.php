<?php
/* ============================================================
   api/class_roster.php — GET [?class=<id>]
   ------------------------------------------------------------
   M8 GROUNDWORK for the M9 teacher dashboard: every class this teacher
   owns, its join code, and each student's progress (steps completed,
   capitula finished, bosses cleared, XP, streak, last active day).

   OWNERSHIP IS ENFORCED IN SQL. The roster query joins through
   `classes.teacher_id = <session teacher>`; there is no path where a
   class id from the query string selects rows on its own. Passing
   ?class=<someone else's id> simply matches nothing.

   THIS IS THE PRIVATE VIEW, and it is the mirror image of api/profile.php:
   here a teacher legitimately sees display_name for her own pupils. It is
   why the public endpoints must never take this shortcut — the two
   audiences are different and the SQL says so in both files.
   ============================================================ */

require_once __DIR__ . '/../lib/auth.php';
require_once __DIR__ . '/../lib/rules.php';

session_boot();
require_method('GET');
$teacherId = require_teacher();

$classFilter = isset($_GET['class']) ? (int) $_GET['class'] : 0;

$pdo = db();

/* ---- 1. the teacher's own classes ---- */
$sql = 'SELECT id, name, join_code, created_at
          FROM classes
         WHERE teacher_id = ?';
$args = array($teacherId);
if ($classFilter > 0) { $sql .= ' AND id = ?'; $args[] = $classFilter; }
$sql .= ' ORDER BY created_at ASC, id ASC';

$stmt = $pdo->prepare($sql);
$stmt->execute($args);

$classes = array();
$order   = array();
foreach ($stmt->fetchAll() as $c) {
  $cid = (int) $c['id'];
  $classes[$cid] = array(
    'id'        => $cid,
    'name'      => $c['name'],
    'joinCode'  => $c['join_code'],   // the teacher's to share; private here
    'createdAt' => $c['created_at'],
    'students'  => array()
  );
  $order[] = $cid;
}

/* ---- 2. every student in those classes, with derived progress ----
   One query. The two LEFT JOINed aggregates are grouped subqueries rather
   than per-row correlated subqueries, so the cost stays flat as a class
   grows. Column list is explicit (no SELECT *) — habit, not ceremony: it
   is what stops a future column being published by accident. */
if (count($order) > 0) {
  $stmt = $pdo->prepare(
    'SELECT s.id            AS id,
            s.class_id      AS class_id,
            s.display_name  AS display_name,
            s.nickname      AS nickname,
            s.avatar        AS avatar,
            s.status        AS status,
            s.source        AS source,
            s.created_at    AS created_at,
            COALESCE(p.xp, 0)     AS xp,
            COALESCE(p.streak, 0) AS streak,
            p.last_day            AS last_day,
            p.current_node        AS current_node,
            COALESCE(sc.n, 0)     AS steps_done,
            COALESCE(bc.n, 0)     AS bosses_cleared
       FROM students s
       JOIN classes c ON c.id = s.class_id AND c.teacher_id = ?
       LEFT JOIN progress p ON p.student_id = s.id
       LEFT JOIN (SELECT student_id, COUNT(*) AS n
                    FROM step_completions GROUP BY student_id) sc
              ON sc.student_id = s.id
       LEFT JOIN (SELECT student_id, COUNT(*) AS n
                    FROM boss_clears
                   WHERE fight_cleared_at IS NOT NULL
                   GROUP BY student_id) bc
              ON bc.student_id = s.id
      ORDER BY s.display_name ASC, s.id ASC'
  );
  $stmt->execute(array($teacherId));

  $stepCount = count(rule_steps());
  foreach ($stmt->fetchAll() as $r) {
    $cid = (int) $r['class_id'];
    if (!isset($classes[$cid])) { continue; }   // filtered-out class
    $steps = (int) $r['steps_done'];
    $classes[$cid]['students'][] = array(
      'id'            => (int) $r['id'],
      'displayName'   => $r['display_name'],
      'nickname'      => $r['nickname'],
      'avatar'        => $r['avatar'],
      'status'        => $r['status'],
      'source'        => $r['source'],
      'xp'            => (int) $r['xp'],
      'streak'        => (int) $r['streak'],
      'lastDay'       => $r['last_day'],
      'mapNode'       => $r['current_node'],
      'stepsDone'     => $steps,
      // whole capitula finished, for a one-glance progress column
      'capitulaDone'  => $stepCount > 0 ? (int) floor($steps / $stepCount) : 0,
      'bossesCleared' => (int) $r['bosses_cleared'],
      'joinedAt'      => $r['created_at']
    );
  }
}

/* ---- 3. shape the response (array, not a map, so order is preserved) ---- */
$out = array();
foreach ($order as $cid) {
  $c = $classes[$cid];
  $c['studentCount'] = count($c['students']);
  $out[] = $c;
}

json_out(array(
  'ok'        => true,
  'teacherId' => $teacherId,
  'stepsPerCapitulum' => count(rule_steps()),
  'classes'   => $out
));
