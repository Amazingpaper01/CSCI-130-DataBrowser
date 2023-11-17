<?php 
 
$title = $_GET['title'];
$director = $_GET['director'];
$year = $_GET['year'];
$rating = $_GET['rating'];
$imgLink = $_GET['imgLink'];
$index = $_GET['index'];

    $con = mysqli_connect("localhost","moviesDB","movies","moviesite");

    $sql = "INSERT INTO `movies`(`movieIndex`, `title`, `director`, `year`, `rating`, `imgLink`) VALUES ('".$index."','".$title."','".$director."','".$year."','".$rating."','".$imgLink."')"; 
  
   
    
    
   if($con->query($sql) == TRUE){
      
        
    }else{
       echo "Error: " . $sql . " <br>" . $con->error;
    }
    $con->close();

?>