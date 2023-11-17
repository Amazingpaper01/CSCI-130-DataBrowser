var editable = false;
function edit(){
    var inputs =  document.getElementsByClassName('inputs');
    
    if (editable == false){
        for(let i = 0; i < inputs.length; i++){
            
            inputs[i].removeAttribute('readonly');
        }
        document.getElementById("editButton").innerText = "Submit";
        editable = true;
        toggleImgInput();
        document.getElementById("insertButton").style.display = "none";
        document.getElementById("deleteButton").style.display = "none"; 
        document.getElementById("sortByTitleButton").style.display = "none";
        document.getElementById("sortByYearButton").style.display = "none"; 
        document.getElementById("loadFromJSON").style.display = "none"; 
    }else{
        for(let i = 0; i < inputs.length; i++){
        
           
            inputs[i].setAttribute('readonly',true);
            
        }
        collectTextBoxes();
        editRequest();
        selection();
        document.getElementById("editButton").innerText = "Edit";
        editable = false;
        toggleImgInput();
        document.getElementById("insertButton").style.display = "inline-block";
        document.getElementById("deleteButton").style.display = "inline-block"; 
        document.getElementById("sortByTitleButton").style.display = "inline-block";
        document.getElementById("sortByYearButton").style.display = "inline-block"; 
        document.getElementById("loadFromJSON").style.display = "inline-block"; 

    }
    
}
var newTitle;
var newYear;
var newDirector;
var imgLink;
var newRating;
function collectTextBoxes(){

    newTitle = document.getElementById("title").value;
    newYear = document.getElementById("year").value;
    newDirector = document.getElementById("director").value;
    newRating = document.getElementById("rating").value;
    newImgLink =  document.getElementById("imgLink").value;


}

function editRequest(){   
    httpRequest = new XMLHttpRequest(); // create the object
    if (!httpRequest) { 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = editCallBack; // we assign a function to the property onreadystatechange (callback function)
	httpRequest.open('POST','phpScripts/edit.php?index='+index+'&title='+newTitle+'&director='+newDirector+'&year='+newYear+'&rating='+newRating+'&imgLink='+newImgLink); // Use a file in reference to the page where you are!
	httpRequest.send(); // GET = send with no parameter !
  console.log("edit1");
}
function editCallBack(){
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {      
            responseT = httpRequest.responseText;
            console.log(responseT);
                //alert(httpRequest.responseText); // Display the textual information from the httpRequest (just a basic alert function)
                // You can parse manually what is returned: waste of time --> structure the information so you can access to all you need directly
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
      catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
        alert('Caught Exception: ' + e.description);
      }
}