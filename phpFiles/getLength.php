<?php

$con = mysqli_connect("localhost","moviesDB","movies","moviesite");
$sql = "SELECT COUNT(*) as `count` FROM `movies`";

if($con->query($sql) == TRUE){
    $rsl = $con->query($sql);
    $row = $rsl->fetch_object();
    $countN = $row->count;
    echo $countN;
}else{
    echo "Error: " . $sql . " <br>" . $con->error;
}
$con->close();
?>