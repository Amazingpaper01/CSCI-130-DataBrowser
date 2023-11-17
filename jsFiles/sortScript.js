var httpRequest5;
function sortByTitle() {
sortABC();
if(ascendingABC == 1){
document.getElementById("sortByTitleButton").innerText = "Sort by Title: Descending";
}else{
  document.getElementById("sortByTitleButton").innerText = "Sort by Title: Ascending";
}
}

function sortABC() {
  console.log('hi');
  httpRequest5 = new XMLHttpRequest(); // create the object
  if (!httpRequest5) {

    alert('Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest5.onreadystatechange = titleSortCallBack; // we assign a function to the property onreadystatechange (callback function)
  httpRequest5.open('GET', 'phpScripts/sortByTitle.php?asc='+ascendingABC); // Use a file in reference to the page where you are!
  httpRequest5.send(); // GET = send with no parameter !
}

var data2 = [];
function titleSortCallBack() {
  try {
    if (httpRequest5.readyState === XMLHttpRequest.DONE) {
      if (httpRequest5.status === 200) {
        console.log(httpRequest5.responseText);
        answer = httpRequest5.responseText;
        data2 = JSON.parse(answer);
        indexes = data2;
        index = indexes[0];
        indexI = 0;
        console.log(data2[0]);

        if(ascendingABC == 1){
          ascendingABC = 0;
          }else{
            ascendingABC = 1;
          }
        selection();
        //alert(httpRequest.responseText); // Display the textual information from the httpRequest (just a basic alert function)
        // You can parse manually what is returned: waste of time --> structure the information so you can access to all you need directly
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch (err) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
    alert('Caught Exception: ' + err.description);
  }
}

var httpRequest6;
function sortByYear() {
    sort123();

    if(ascending123 == 1){
    document.getElementById("sortByYearButton").innerText = "Sort by Year: Descending";
    } else {
    document.getElementById("sortByYearButton").innerText = "Sort by Year: Ascending";

    }
}

function sort123() {

  console.log('hi');
  httpRequest6 = new XMLHttpRequest(); // create the object
  if (!httpRequest6) {

    alert('Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest6.onreadystatechange = yearSortCallBack; // we assign a function to the property onreadystatechange (callback function)
  httpRequest6.open('GET', 'phpScripts/sortByYear.php?asc='+ascending123); // Use a file in reference to the page where you are!
  httpRequest6.send(); // GET = send with no parameter !
}

var data3;
function yearSortCallBack() {

  try {
    if (httpRequest6.readyState === XMLHttpRequest.DONE) {
      if (httpRequest6.status === 200) {
        console.log(httpRequest6.responseText);
        answer = httpRequest6.responseText;
        data3 = JSON.parse(answer);
        indexes = data3;
        indexI = 0;
        index = indexes[0];
        if(ascending123 == 1){
          ascending123 = 0;
          }else{
            ascending123 = 1;
          }
          selection();
        //alert(httpRequest.responseText); // Display the textual information from the httpRequest (just a basic alert function)
        // You can parse manually what is returned: waste of time --> structure the information so you can access to all you need directly
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch (e) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
    alert('Caught Exception: ' + e.description);
  }


}