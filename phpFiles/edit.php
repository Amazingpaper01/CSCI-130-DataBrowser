<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// creates connection
$con = new mysqli("localhost", "olympicUser", "4VPnroTOC6wOU3mn", "Olympics");

// checks connection
if ($con->connect_error) {
    die(json_encode(array('error' => 'Connection failed: ' . $con->connect_error)));
}

// get object from AJAX method
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Convert JSON into an array

// perform update operation
$stmt = $con->prepare("UPDATE olympicsData SET name = ?, year = ?, location = ?, season = ?, mascot = ?, img = ? WHERE id = ?");
$stmt->bind_param("sissssi", $name, $year, $location, $season, $mascot, $img, $id);

// assigning values
$name = $input['name'];
$year = $input['year'];
$location = $input['location'];
$season = $input['season'];
$mascot = $input['mascot'];
$img = $input['img'];
$id = $input['id'];

// Execute the prepared statement
if ($stmt->execute()) {
    echo json_encode(array('success' => 'Record updated successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $stmt->error));
}

// Close statement and connection
$stmt->close();
$con->close();
?>