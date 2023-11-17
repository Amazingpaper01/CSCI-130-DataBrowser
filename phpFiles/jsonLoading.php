<?php
    //$con = mysql_connect("moviesDB", "movies", "") or("Could not connect: ".mysql_connect());
   $con = mysqli_connect("localhost","moviesDB","movies","moviesite");
   $con2 = mysqli_connect("localhost","moviesDB","movies","moviesite");

    $movieJson = file_get_contents("../movies.json");

    $sqlDel = "DELETE FROM movies";


    if($con2->query($sqlDel) == TRUE){
        echo "Movie 1";
    }else{
        echo "Error: " . $sqlDel . " <br>" . $con2->error;
    }
    $con2->close();

    
    $data = json_decode($movieJson,true);
    
    $movie = $data['movies'];
    //$movie1 = $data['movies'][0]["title"];
    //echo $movie1;

    for($x=0; $x<5; $x++){
        $movieIndex = $x+1;
        $title = $data['movies'][$x]["title"];
        $director = $data['movies'][$x]["director"];
        $year = $data['movies'][$x]["year"];
        $rating = $data['movies'][$x]["rating"];
        $imgLink = $data['movies'][$x]["imgLink"];

        echo $title;
        echo $director;
        echo $year;
        echo $rating; 
        echo $imgLink; 
        $sql = "INSERT INTO movies VALUES('$movieIndex','$title', '$director', '$year', '$rating', '$imgLink')";
        
        if($con->query($sql) == TRUE){
            echo "Movie 1";
        }else{
            echo "Error: " . $sql . " <br>" . $con->error;
        }
    }
    
    $con->close();

?>