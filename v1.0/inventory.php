<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$bd = include "../pdo.php";

try {
	$md = $bd->prepare("SELECT id_item FROM item WHERE nome_item LIKE :nome");
	$md->execute([
		'nome' => $_GET['no']
	]);
	if($md->rowCount()==0){//the object does not exists
		createItem($bd);//now exists
	}
	addItem($bd,$md);//add the object to the inventory

} catch(Exception $ex) {
	die ("Aconteceu um erro ao executar: " . $ex->getMessage());
}

function createItem($bd){
	$array=[];
	$array['nome'] = $_GET['no'];

	if(isset($_GET['nu'])&&isset($_GET['de'])){
		$array['num'] = $_GET['nu'];
		$array['descr'] = $_GET['de'];
		$md = $bd->prepare("INSERT INTO item(nome_item,patrimonio_item,desc_item) VALUES(:nome,:num,:descr)");
		$md->execute($array);
		return;
	}
	if(isset($_GET['nu'])){
		$array['num'] = $_GET['nu'];
		$md = $bd->prepare("INSERT INTO item(nome_item,patrimonio_item) VALUES(:nome,:num)");
		$md->execute($array);
		return;
	}
	else if(isset($_GET['de'])){
		$array['descr'] = $_GET['de'];
		$md = $bd->prepare("INSERT INTO item(nome_item,desc_item) VALUES(:nome,:descr)");
		$md->execute($array);
		return;
	}
	$md = $bd->prepare("INSERT INTO item(nome_item) VALUES(:nome)");
	$md->execute($array);
}

function addItem($bd){
	$md = $bd->prepare("SELECT id_item FROM item WHERE nome_item LIKE :nome");
	$md->execute([
		'nome' => $_GET['no']
	]);
	$qtd = intval($_GET['qt']);
	$idItem = (int) current($md->fetchAll(PDO::FETCH_COLUMN, 0));
	for($i=0; $i<$qtd; $i++){
		$md = $bd->prepare("INSERT INTO item_inventario(id_item) VALUES(:id)");
		$md->execute([
		'id' => $idItem
		]);
	}
}