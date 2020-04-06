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
            "EXPLANATION MEDIUMTEXT NOT NULL",
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
                //echo ('MAPCODE: '.mysqli_real_escape_string($_POST['map']));
                
                $lvlList = [
                    [-43.640204,172.4847637,true,"Right here is a pedestrian crossing--the designated places for you to cross. It's safe to cross here, but still be visualent to oncoming vehicles."],
                    [-43.6327348,172.4845592, false, "You should be careful with this road as cars will begin to travel quite fast down it. Don't cross, as there is a car approaching."],
                    [-43.619917,172.4819197, true, "The map description said there were gravel roads, and well... we needed one. Can you see any cars? No? Cross!"],
                    [-43.6413878,172.4746944, false, "Crossing at intersections is a bad idea. Instead of having two directions of traffic to worry about, you effectively have four."],
                    [-43.6449333,172.5015875, false, "Crossing on a main road is just generally a bad idea. The cars travel so fast."],
                    [-43.6434251,172.4943935, false, "This is what is known as 'da hood', kids. Crossing the road here is a bad idea, unless it's for the sole purpose of getting yer a** out of here ASAP."],
                    [-43.6379826,172.4833182, true, "Here is fine to cross. Cars won't be going to fast, and you have good visibility. Just make sure your vision is not blocked by a parked car by the side of the road."],
                    [-43.6416564,172.4707025, true, "Roundabouts are a dodgey place to be near - for both pedestrians and cars - however if you need to cross, then here is the place to do so. With that said, watch out for traffic in both directions."]
                ];
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