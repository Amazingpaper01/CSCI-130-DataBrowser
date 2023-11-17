class Movies{
    constructor(title,director,year,rating,imgLink){
        this.title = title;
        this.director = director;
        this.year = year;
        this.rating = rating;
        this.imgLink = imgLink;
    }
    
}
/*
const movie1 = new Movies("Thor: Ragnorok", "Taika Waititi", 2017, 3.5, "https://a.ltrbxd.com/resized/film-poster/2/0/9/3/8/2/209382-thor-ragnarok-0-460-0-690-crop.jpg?k=02c656f39b");
const movie2 = new Movies("My Dinner with Andre", "Louis Malle", 1981, 5, "https://a.ltrbxd.com/resized/film-poster/3/6/0/4/2/36042-my-dinner-with-andre-0-460-0-690-crop.jpg?k=c1d3b48517");
const movie3 = new Movies("Moonrise Kingdom", "Wes Anderson", 2012, 4, "https://a.ltrbxd.com/resized/sm/upload/v5/7f/mn/y8/ysTohGF7NY9Z6MYz9vLNYiyzh0r-0-460-0-690-crop.jpg?k=9bee8528b0");
const movie4 = new Movies("Good Time", "Josh Safdie, Benny Safdie", 2017, 4, "https://a.ltrbxd.com/resized/film-poster/3/6/2/3/6/2/362362-good-time-0-460-0-690-crop.jpg?k=961512abc0");
const movie5 = new Movies("Kill Bill: Vol. 1", "Quentin Tarantion", 2003, 5, "https://a.ltrbxd.com/resized/sm/upload/sw/w2/ep/v4/9O50TVszkz0dcP5g6Ej33UhR7vw-0-460-0-690-crop.jpg?k=604246a795");
*/
var len = 5;
var movies;
var indexes= [];
var index = 1;
const file = "movies.json";
var indexI = 0;
var httpRequest2;
var ascendingABC = 1;
var ascending123 = 1;
var initialLoad = 0;
var httpRequest7;
var subList = false;

function onLoadFunc(){
  

  for(let x = 0; x < len; x++){
    indexes[x] = x+1;
    console.log(x);
  }

}
function selection(){   

  httpRequest = new XMLHttpRequest(); // create the object
    if (!httpRequest) { 
	 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
  httpRequest.onreadystatechange = getLength; // we assign a function to the property onreadystatechange (callback function)
	httpRequest.open('GET','phpFiles/getLength.php'); // Use a file in reference to the page where you are!
	httpRequest.send(); // GET = send with no parameter !
 


    httpRequest2 = new XMLHttpRequest(); // create the object
    if (!httpRequest2) { 
	 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest2.onreadystatechange = parseData; // we assign a function to the property onreadystatechange (callback function)
	httpRequest2.open('POST','phpFiles/dbLoading.php?index='+index); // Use a file in reference to the page where you are!
	httpRequest2.send(); // GET = send with no parameter !


  
            

}
function getLength(){
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {      
      if(subList){
        len = indexes.length;
      }else{
        answer = httpRequest.responseText;
      
        len = answer;
        document.getElementById("indexOf").innerText = len;
        if (initialLoad == 0){
          onLoadFunc();
          initialLoad = 1;
        }
      
      }
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
    alert('Caught ExceptionLength: ' + e.description);
  }


}
var data;

function parseData(){
    
   
    try {
        if (httpRequest2.readyState === XMLHttpRequest.DONE) {
          if (httpRequest2.status === 200) {      
          
            answer = httpRequest2.responseText;
            data = JSON.parse(answer);
            //console.log(data[1]);
            loadElements();
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
      catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
        alert('Caught Exceptionparse: ' + e.description);
      }

    
}



function loadElements(){
  document.getElementById("moviePoster").src = data[5];
  document.getElementById("title").value = data[1]
  document.getElementById("year").value = data[3];
  document.getElementById("director").value = data[2];
  document.getElementById("rating").value = data[4];
  document.getElementById("index").innerText = indexI+1;
  document.getElementById("indexOf").innerText = len;


}
function toggleImgInput(){
  if (editable == true){
  document.getElementById("posterInputContainer").innerHTML = " <label for 'imgLink' >Movie Poster Link: </label><input id = 'imgLink' class = 'inputs' name = 'imgLink' type = 'text'></input>";
  document.getElementById("imgLink").value = data[5];
  }else{
    document.getElementById("posterInputContainer").innerHTML = "";
  }
}
function loadFromJSON(){
  
  httpRequest7 = new XMLHttpRequest(); // create the object
    if (!httpRequest7) { 
	 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
  httpRequest7.onreadystatechange = loadCallBack; // we assign a function to the property onreadystatechange (callback function)
	httpRequest7.open('GET','phpScripts/jsonLoading.php'); // Use a file in reference to the page where you are!
	httpRequest7.send(); // GET = send with no parameter !
 


}
function loadCallBack(){

  
  try {
    if (httpRequest7.readyState === XMLHttpRequest.DONE) {
      if (httpRequest7.status === 200) {      
      
   
       answer = httpRequest7.responseText;
       initialLoad = 0;
       index = 1;
      
       indexI = 0;
       onLoadFunc();
       selection();  
     
        console.log(answer);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
    alert('Caught Exceptionparse: ' + e.description);
  }


}
var httpRequest8;
function select5(){
if(subList == false){
document.getElementById("editButton").style.display = "none";
  document.getElementById("insertButton").style.display = "none";
  document.getElementById("deleteButton").style.display = "none"; 
  document.getElementById("sortByTitleButton").style.display = "none";
  document.getElementById("sortByYearButton").style.display = "none"; 
  document.getElementById("loadFromJSON").style.display = "none"; 
  document.getElementById("select5Button").innerText = "Show All"; 
  httpRequest8 = new XMLHttpRequest(); // create the object
    if (!httpRequest8) { 
	 
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest8.onreadystatechange = select5CB; // we assign a function to the property onreadystatechange (callback function)
    httpRequest8.open('GET','phpScripts/select5.php'); // Use a file in reference to the page where you are!
    httpRequest8.send(); // GET = send with no parameter !
 


  
}else{
  document.getElementById("editButton").style.display = "inline-block";
  document.getElementById("insertButton").style.display = "inline-block";
  document.getElementById("deleteButton").style.display = "inline-block"; 
  document.getElementById("sortByTitleButton").style.display = "inline-block";
  document.getElementById("sortByYearButton").style.display = "inline-block"; 
  document.getElementById("loadFromJSON").style.display = "inline-block"; 
  document.getElementById("select5Button").innerText = "Show All 5s"; 
  subList = false;
  initialLoad = 0;
  onLoadFunc();
  index = indexes[indexI];

  selection();
  
}
  
}
function select5CB(){

  
  try {
    if (httpRequest8.readyState === XMLHttpRequest.DONE) {
      if (httpRequest8.status === 200) {      
      
   
       answer = httpRequest8.responseText;
       data = JSON.parse(answer);
       indexes = data;
       subList = true;
       indexI = 0;
       len = indexes.length;
     index = indexes[indexI];

      selection();  
     
      
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch( e ) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
    alert('Caught Exceptionparse: ' + e.description);
  }

}