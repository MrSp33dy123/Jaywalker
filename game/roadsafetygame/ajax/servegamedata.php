<?php
error_reporting(E_ALL & E_NOTICE);

//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $SQLservername = "127.0.0.1";
    $SQLusername = "root";
    $SQLpassword = "";
    $SQLdbname = "JAYWALKERGAME";
    $tableinfo = array(
        "MAPDATA"=>[
            "ID int(10) AUTO_INCREMENT",
            "MAPCODE varchar(8) NOT NULL",
            "MAPNAME varchar(32) NOT NULL",
            "MAPDESC varchar(255) NOT NULL",
            "OFFICIAL BOOLEAN NOT NULL",
            "PRIMARY KEY (ID)"
        ]
    );
    
    try {
        //SETUP CONNECTION
        $conn = new mysqli($SQLservername, $SQLusername, $SQLpassword);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        };

        //CREATE TABLE OR DATABASE IF NOT EXISTS
        $conn->query("CREATE DATABASE IF NOT EXISTS ".$SQLdbname);
        $conn->select_db($SQLdbname);
        if (empty($conn->query("SELECT ID FROM MAPDATA"))) {
            echo "MAPDATA table not found, creating now! Database ".$SQLdbname." may have been created as well.";
            $sql = "CREATE TABLE MAPDATA (" . implode(",", $tableinfo['MAPDATA']) . ")";
            if (! $conn->query($sql)) {
                printf("SQL create table failure: %s\n", $conn->error);
            };
        };
        if (!isset($_POST['answer'])) {
            //Query Database for list of maps, including location info for each (but not answers)
            $result = $conn->query("SELECT MAPCODE, MAPNAME, MAPDESC, OFFICIAL FROM MAPDATA");
            $mapList = [];
        
            while ($row = $result->fetch_assoc()) {
                array_push($mapList, $row);
            }
            echo json_encode($mapList);
        } else {
            //Query $_POST['answer'] in map $_POST['map'] for round $_POST['round']
        };
        $conn->close();
    } catch(exception $e) {
        echo "Error: " . $e->getMessage();
    };
//} else {
//    echo('<p>This page is for use as part of a POST request; it is not supposed to be viewed in the browser.</p>');
//};
?>