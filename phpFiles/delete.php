<?php 
 

$index = $_GET['index'];

$len = $_GET['len'];
    $con = mysqli_connect("localhost","moviesDB","movies","moviesite");

    $sql = "DELETE FROM `movies` WHERE movieIndex =".$index;   
    
   if($con->query($sql) == TRUE){
      
        
    }else{
       echo "Error: " . $sql . " <br>" . $con->error;
    }
    $con->close();

    if($index == $len){
        

    }else{

    for($x = $index; $x < $len; $x++){

    $con = mysqli_connect("localhost","moviesDB","movies","moviesite");

    $sql = "UPDATE `movies` SET `movieIndex`='".$x."' WHERE movieIndex = ".$x+1;   
    echo("hello");
    
   if($con->query($sql) == TRUE){
      
        
    }else{
       echo "Error: " . $sql . " <br>" . $con->error;
    }
    $con->close();
    }
    
   }
?>
