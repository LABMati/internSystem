<?php
    return new PDO("mysql:host=mysql.hostinger.com.br;dbname=u535468846_lab", "u535468846_boss", "lab124578", [
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
    ]);
?>