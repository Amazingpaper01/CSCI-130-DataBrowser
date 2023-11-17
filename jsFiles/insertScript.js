function insert(){
    document.getElementById("editButton").style.display = "none";
    document.getElementById("deleteButton").style.display = "none"; 
    document.getElementById("sortByTitleButton").style.display = "none";
    document.getElementById("sortByYearButton").style.display = "none"; 
    document.getElementById("loadFromJSON").style.display = "none"; 

    var inputs =  document.getElementsByClassName('inputs');
    
    if (editable == false){
        for(let i = 0; i < inputs.length; i++){
            inputs[i].value = "";
            inputs[i].removeAttribute('readonly');
        }
        document.getElementById("moviePoster").src = "";
        document.getElementById("insertButton").innerText = "Submit";
        editable = true;
        toggleImgInput();
        document.getElementById("imgLink").value = "";
        len++;
        index=len;
        indexI = Number(len)-Number(1);
        
        document.getElementById("index").innerText = index;
        document.getElementById("indexOf").innerText = len;
    } else {
        for(let i = 0; i < inputs.length; i++){
            inputs[i].setAttribute('readonly',true);
            document.getElementById("editButton").style.display = "inline-block";
            document.getElementById("deleteButton").style.display = "inline-block"; 
            document.getElementById("sortByTitleButton").style.display = "inline-block";
            document.getElementById("sortByYearButton").style.display = "inline-block";
            document.getElementById("loadFromJSON").style.display = "inline-block";  
            
        }
        collectTextBoxes();
        insertRequest();
        document.getElementById("insertButton").innerText = "Insert";
        editable = false;
        toggleImgInput();
        onLoadFunc();
        selection();
    }
}

var httpRequest4;
function insertRequest(){
    httpRequest4 = new XMLHttpRequest(); // create the object
    if (!httpRequest4) { 
	 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest4.onreadystatechange = insertCallBack; // we assign a function to the property onreadystatechange (callback function)
	httpRequest4.open('POST','phpScripts/insert.php?index='+(index)+'&title='+newTitle+'&director='+newDirector+'&year='+newYear+'&rating='+newRating+'&imgLink='+newImgLink); // Use a file in reference to the page where you are!
	httpRequest4.send(); // GET = send with no parameter !
    console.log("insert"); 
}


function insertCallBack(){
    try {
        if (httpRequest4.readyState === XMLHttpRequest.DONE) {
                //alert(httpRequest.responseText); // Display the textual information from the httpRequest (just a basic alert function)
                // You can parse manually what is returned: waste of time --> structure the information so you can access to all you need directly
          } else {
           // alert('There was a problem with the request.');
          }
        }
      catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
        alert('Caught Exception: ' + e.description);
      }
}