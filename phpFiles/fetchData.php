<?php
header('Content-Type: application/json');

// establishing the connection
$con = new mysqli("localhost", "olympicUser", "4VPnroTOC6wOU3mn", "Olympics");

// checking if the connection fails
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = "SELECT * FROM olympicsData";
$result = $con->query($sql);

$olympics = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $olympics[] = $row;
    }
    echo json_encode($olympics);
} else {
    echo json_encode(array('error' => 'No data found'));
}

$con->close();
?>