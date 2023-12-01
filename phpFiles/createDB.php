<?php
// Create connection
$conn = new mysqli("localhost", "olympicUser", "4VPnroTOC6wOU3mn");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS Olympics";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully\n";
} else {
  echo "Error creating database: " . $conn->error . "\n";
}

// selects the database
$conn->select_db('Olympics');

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS olympicsData (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
year INT(4) NOT NULL,
location VARCHAR(50) NOT NULL,
season ENUM('Summer', 'Winter') NOT NULL,
mascot VARCHAR(50),
img VARCHAR(255)
)";

if ($conn->query($sql) === TRUE) {
  echo "Table olympics created successfully\n";
} else {
  echo "Error creating table: " . $conn->error . "\n";
}

$jsonData = file_get_contents('data.json');
$olympicsData = json_decode($jsonData, true);

// prepares the insert statement
$stmt = $conn->prepare("INSERT INTO olympicsData (name, year, location, season, mascot, img) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissss", $name, $year, $location, $season, $mascot, $img);

foreach ($olympicsData as $olympic) {
  // assign values to parameters
  $name = $olympic['name'];
  $year = $olympic['year'];
  $location = $olympic['location'];
  $season = $olympic['season'];
  $mascot = $olympic['mascot'];
  $img = $olympic['img'];
  
  $stmt->execute();
}

echo "New records created successfully\n";

$stmt->close();
$conn->close();
?>