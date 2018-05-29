<?php

$dbh = include('pdo.php');

$sth = $dbh->prepare("SELECT * FROM transacao WHERE 1 ORDER BY data");

$sth->execute();

$sth = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($sth);
return json_encode($sth);