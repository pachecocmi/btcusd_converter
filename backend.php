<?php

if(isset($_GET['btc'])) {
    require_once "Access.php";
    
    $access = new Access();
    $return = [];
    switch(strtolower($_GET['btc'])) {
        case 'check': 
            $return = $access->checkExchange("USD"); 
        break;
        case 'convert':
            $return = $access->convertBTC($_GET['amount'], "USD");
        break;
    }

    print(json_encode($return));
}