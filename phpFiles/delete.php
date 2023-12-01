<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// creating connection
$con = new mysqli("localhost", "olympicUser", "4VPnroTOC6wOU3mn", "Olympics");

// checks connection if it was successful
if ($con->connect_error) {
    die(json_encode(array('error' => 'Connection failed: ' . $con->connect_error)));
}

// obtains id from AJAX call
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Convert JSON into an array

$id = $input['id'];

// creating the DELETE operation
$stmt = $con->prepare("DELETE FROM olympicsData WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(array('success' => 'Record deleted successfully'));
} else {
    echo json_encode(array('error' => 'Error: ' . $stmt->error));
}

// $resetAutoIncrementSQL = "ALTER TABLE olympicsData AUTO_INCREMENT = 1;";
// $con->query($resetAutoIncrementSQL);

// closes the connection
$stmt->close();
$con->close();
?>
