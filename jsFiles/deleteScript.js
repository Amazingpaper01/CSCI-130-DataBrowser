function deleteMovie(){
    deleteRequest();
    if(index == len){
        indexI--;
        index = indexes[indexI];
    }
        len--;
        document.getElementById("index").innerText = index;
        document.getElementById("indexOf").innerText = len;
    }


var httpRequest3;
function deleteRequest(){
    httpRequest3 = new XMLHttpRequest(); // create the object
    if (!httpRequest3) { 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest3.onreadystatechange = deleteCallBack; // we assign a function to the property onreadystatechange (callback function)
	httpRequest3.open('POST','phpScripts/delete.php?index='+index+'&len='+len); // Use a file in reference to the page where you are!
	httpRequest3.send(); // GET = send with no parameter !
    console.log("delete");
}

function deleteCallBack(){
    try {
        if (httpRequest3.readyState === XMLHttpRequest.DONE) {
          if (httpRequest3.status === 200) {      
              len = Number(len)-Number(1);
                 selection();
                console.log(httpRequest3.responseText); // Display the textual information from the httpRequest (just a basic alert function)
                // You can parse manually what is returned: waste of time --> structure the information so you can access to all you need directly
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
      catch(err) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
        alert('Caught ExceptionDel: ' + err.description);
      } 
}