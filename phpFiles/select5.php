<?php 
    
    $con = mysqli_connect("localhost","moviesDB","movies","moviesite");

    $sql = "SELECT * FROM `movies` WHERE `rating`=5"; 

  
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
    
    /*echo
    
    "document.getElementById("moviePoster").src = $row[5]
    document.getElementById("title").value = data.movies[x].title;
    document.getElementById("year").value = data.movies[x].year;
    document.getElementById("director").value = data.movies[x].director;
    document.getElementById("rating").value = data.movies[x].rating;
    document.getElementById("index").innerText = index+1;
    document.getElementById("indexOf").innerText = len;"*/

?>