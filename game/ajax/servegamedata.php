<?php
error_reporting(E_ALL & E_NOTICE);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
        ],
        "LEVELDATA"=>[
            "ID int(10) AUTO_INCREMENT",
            "MAPCODE varchar(8) NOT NULL",
            "LVLNUM int(3) NOT NULL",
            "LVLCOORDSX varchar(30) NOT NULL",
            "LVLCOORDSY varchar(30) NOT NULL",
            "SAFETOCRS BOOLEAN NOT NULL",
            "EXPLANATION varchar(255) NOT NULL",
            "PRIMARY KEY (ID)"
        ]
    );
    
    try {
        //SETUP CONNECTION
        $conn = new mysqli($SQLservername, $SQLusername, $SQLpassword);
        if ($conn->connect_error) {die("Connection failed: " . $conn->connect_error);};
        
        //CREATE TABLE OR DATABASE IF NOT EXISTS
        $conn->query("CREATE DATABASE IF NOT EXISTS ".$SQLdbname);
        $conn->select_db($SQLdbname);
        foreach(array_keys($tableinfo) as $key) {
            $conn->query("CREATE TABLE IF NOT EXISTS ".$key." (".implode(",",$tableinfo[$key]).")");
        }
        
        if (!isset($_POST['map'])) {
            //Query Database for list of maps, including location info for each (but not answers)
            $result = $conn->query("SELECT MAPCODE, MAPNAME, MAPDESC, OFFICIAL FROM MAPDATA");
            $mapList = [];
        
            while ($row = $result->fetch_assoc()) {
                array_push($mapList, $row);
            }
            echo json_encode($mapList);
        } else {
            if (!isset($_POST['answer'])) {
                $result = $conn->query("SELECT LVLNUM, LVLCOORDSX, LVLCOORDSY FROM LEVELDATA WHERE MAPCODE = '".mysqli_real_escape_string($_POST['map'])."'");
                $lvlList = [];
                while ($row = $result->fetch_assoc()) {
                    array_push($lvlList, $row);
                }
                echo ('MAPCODE: '.mysqli_real_escape_string($_POST['map']));
                echo json_encode($lvlList);
            } else {
                //Query $_POST['answer'] in map $_POST['map'] for round $_POST['round']
            }
        };
        $conn->close();
    } catch(exception $e) {
        echo "Error: " . $e->getMessage();
    };
} else {
    echo('<p style="text-align:center;position:relative;top:50%;">This page is for use as part of a POST request; it is not supposed to be viewed in the browser.</p>');
};
?>