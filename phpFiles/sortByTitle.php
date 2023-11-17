<?php 

$asc = $_GET['asc'];
$con = mysqli_connect("localhost","moviesDB","movies","moviesite");
if($asc == 1){
  $sql = "SELECT `movieIndex`  FROM `movies` ORDER BY title";
}else{
  $sql = "SELECT `movieIndex`  FROM `movies` ORDER BY title DESC";
}


$indexes = [];
if($con->query($sql) == TRUE){
    $rsl = $con->query($sql);

    while(  $row =$rsl->fetch_row()) {
        
      $x =$row[0];
      array_push($indexes,$x);


      
    }
   echo json_encode($indexes);
    
   
   
   

    

    
}else{
    echo "Error: " . $sql . " <br>" . $con->error;
}

$con->close();




?>