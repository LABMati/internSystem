<?php

// Retorna um objeto PDO para o $dbh
$dbh = include('pdo.php');


//Os próximos 3 blocos de código verificam se todos os parâmetros foram enviados pela query string
if (!isset($_GET['origem'])) {
    echo "Informe a origem da transação";
    die;
}

if (!isset($_GET['valor'])) {
    echo "Informe o valor da transação";
    die;
}

if (!isset($_GET['data'])) {
    echo "Informe a data da transação";
    die;
}

//Instancia um statement handler com o valor retornado do método prepare do $dbh
$sth = $dbh->prepare("INSERT INTO transacao (origem, valor, data) VALUES (:ori, :val, :dat)");

//Executa a query preparada antes passando como parâmetro um array de valores vindo da query string
$sth->execute([
    "ori" => $_GET['origem'],
    "val" => $_GET['valor'],
    "dat" => $_GET['data']
]);

//Faz a contagem das colunas afetadas pela query, alguma tenha sido afetada, termina a execução do código com mensagem de sucesso
if($sth->rowCount() > 0){
    echo "Transação adicionada ao banco de dados";
    die;
}

//Se isso for exibido em algum momento temos um problema.
die("Deu merda");