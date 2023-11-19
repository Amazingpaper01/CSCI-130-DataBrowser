<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// creating connection to DB
$con = new mysqli("localhost", "olympicUser", "4VPnroTOC6wOU3mn", "Olympics");

// checks if connections fails
if ($con->connect_error) {
    die(json_encode(array('error' => 'Connection failed: ' . $con->connect_error)));
}

// get object details from AJAX call
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // convert JSON object to an array

// creates state var to get it ready to input into the table on the DB
$stmt = $con->prepare("INSERT INTO olympicsData (name, year, location, season, mascot, img) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissss", $name, $year, $location, $season, $mascot, $img);

$name = $input['name'];
$year = $input['year'];
$location = $input['location'];
$season = $input['season'];
$mascot = $input['mascot'];
$img = $input['img'];

if ($stmt->execute()) {
    echo json_encode(array('success' => 'New record created successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $stmt->error));
}

// closes the connection
$stmt->close();
$con->close();
?>