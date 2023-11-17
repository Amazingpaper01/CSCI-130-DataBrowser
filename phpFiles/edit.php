<?php 
$title = $_GET['title'];
$director = $_GET['director'];
$year = $_GET['year'];
$rating = $_GET['rating'];
$imgLink = $_GET['imgLink'];
$index = $_GET['index'];

    $con = mysqli_connect("localhost","moviesDB","movies","moviesite");

    $a = "UPDATE `movies` SET `movieIndex`='".$index."',`title`='".$title."',`director`='".$director."',`year`='".$year."',`rating`='".$rating."',`imgLink`='".$imgLink."' WHERE `movieIndex` = "; 
    $b = $index;
    $sql = $a.$b;
    echo $sql;
    
    
   if($con->query($sql) == TRUE){
      
        
    }else{
       echo "Error: " . $sql . " <br>" . $con->error;
    }
    $con->close();

?>