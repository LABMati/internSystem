<?php

// Retorna um objeto PDO
$dbh = include('pdo.php');

//Instancia um statement handler com o valor retornado do método prepare do $dbh
$sth = $dbh->prepare("SELECT * FROM transacao WHERE 1 ORDER BY data desc");

//Executa a query
$sth->execute();

//Transforma as linhas recebidas como resultado da query em um array
$sth = $sth->fetchAll(PDO::FETCH_ASSOC);

//Converte o array para JSON e da isso como resposta
echo json_encode($sth);