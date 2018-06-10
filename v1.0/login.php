<?php
//Conecta no banco de dados
$dbh = include 'pdo.php';

function receiveObject($dbh){
    //Cria array para mensagens de erros 
    $errMsg = [];
    
    //Cria objeto com o corpo da requisição PHP
    $inputs = json_decode(file_get_contents('php://input'));
    
    //Retorna se o objeto for inválido
    if(!is_object($inputs))
        array_push($errMsg, "Objeto enviado inválido");
    
    //Retorna se o objeto existe mas não existem campos
    if(is_object($inputs)&&!property_exists($inputs,"login")&&!property_exists($inputs,"senha"))
        array_push($errMsg, "Campos não enviados");
    
    //Retorna se login não foi enviado ou for vazio
    if(is_object($inputs)&&!property_exists($inputs,"login")||empty($inputs->login))
        array_push($errMsg, "Login não inserido");
    
    //Retorna se senha não foi enviada ou for vazia
    if(is_object($inputs)&&!property_exists($inputs,"senha")||empty($inputs->senha))
        array_push($errMsg, "Senha não inserida");

    //Cancela operação se houver mensagem de erro
    if(count($errMsg)>0) die(implode("\n", $errMsg));

    return $inputs;
}

function queryUserDB($inputs){

    //Instancia um statement handler com o valor retornado do método prepare do $dbh 
    $sth = $dbh->prepare("
        SELECT id_pessoa, login, senha FROM pessoa WHERE login = ?
    ");
    //Execueta a query preparada passando como valor o login indicado
    $sth->execute([$inputs->login]);

    //Cria array com resultados da query
    $pessoa = $sth->fetchAll(PDO::FETCH_ASSOC);
    
    //Retorna se não encontrar resultados com o login indicado
    if(empty($pessoa)) 
       return "Login inválido";
    
    
    if($inputs->senha == $pessoa->senha){
        //Retorna o array de resultados se a senha confere
        return $pessoa;        
    }else{
        //Retorna se a senha não confere
        return "Senha inválida";
    }
}

function getPermission($id){
    //Instancia um statement handler com o valor retornado do método prepare do $dbh     
    $sth = $dbh->prepare("
        SELECT * FROM administrador WHERE id_pessoa_admin = ?
    ");
    //Execueta a query preparada passando como valor o id da pessoa encontrada
    $sth->execute([$id]);

    //Cria array com resultados da query
    $resultados = $sth->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($resultados))
        //Retorna se foi encontrado um usuário admin com o id encontrado
        return "Administrador";

    //Instancia um statement handler com o valor retornado do método prepare do $dbh         
    $sth = $dbh->prepare("
        SELECT * FROM lider_estagiario WHERE estagiario_id_pessoa_estagiario = ?
    ");
    //Execueta a query preparada passando como valor o id da pessoa encontrada
    $sth->execute([$id]);

    //Cria array com resultados da query
    $resultados = $sth->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($resultados))
        //Retorna se foi encontrado um estagiario lider com o id encontrado
        return "Lider estagiario";

    //Retorna se não for for encontrado resultado nas demais tabelas
    return "Estagiario";
}

try{
    $inputs = receiveObject($dbh);
    $pessoa = queryUserDB($inputs);
    if(is_object($pessoa)){
        $permission = getPermission($pessoa->id_pessoa);

        //inicia sessão no servidor
        session_start();

        //Adiciona o id gerado ao array da sessão para checagens futuras
        $_SESSION["id"] = session_id();
        
        //Adiciona a permissão encontrada ao array da sessão
        $_SESSION["permission"] = $permission;
        echo "Login feito com sucesso";
    }else{
        //Retornado se o login ou senha forem inválidos
        echo $pessoa;
    }
}catch(Exception $e){
    //Se ocorrer algum erro externo
    echo "Erro na conexão, entre em contato com a equipe do LabMat(i)²";
    print($e);
}