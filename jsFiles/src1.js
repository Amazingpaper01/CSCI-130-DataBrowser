// main source script
class Olympics  {
    constructor (name, year, location, season, mascot, img) {
        this.name = name;
        this.year = year;
        this.location = location;
        this.season = season;
        this.mascot = mascot;
        this.img = img;
    }
}

// objects of class Olympics
const olym2020 = new Olympics("Tokyo Olympic Games", 2020, "Tokyo, Japan", "Summer", "Miraitowa", "https://i.guim.co.uk/img/media/fb2c6a6572441be138321397a563f550c8ea4cf7/0_251_4589_2754/master/4589.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=56fd19cbc915803cbd6bda50417d819b");
const olym2016 = new Olympics("Rio Olympic Games", 2016, "Rio De Janeiro, Brazil", "Summer", "Vinicius", "https://content.fortune.com/wp-content/uploads/2016/03/rio-olympics0216.jpg");
const olym2014 = new Olympics("Sochi Olympic Games", 2014, "Sochi, Russia", "Winter", "The Hare, Polar Bear, and Leopard", "https://worldpittsburgh.files.wordpress.com/2014/02/picture1.png");
const olym1936 = new Olympics("Berlin Olympic Games", 1936, "Berlin, Germany", "Summer", "No Mascot", "https://alphahistory.com/nazigermany/wp-content/uploads/2012/06/stadium.jpg");
const olym2010 = new Olympics("Vancouver Olympic Games", 2010, "Vancouver, British Columbia, Canada", "Winter", "Quatchi and Miga", "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/2010_Winter_Olympics_logo.svg/1200px-2010_Winter_Olympics_logo.svg.png");

var req;
var len = 5;          // original length
var movies;
var indexes= [];
var index = 1;
const file = "data.json";
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
    req = new XMLHttpRequest(); // create the object
      if (!req) { 
       
        alert('Cannot create an XMLHTTP instance');
        return false;
      }
    req.onreadystatechange = function() {
        try {
            if (req.readyState === XMLHttpRequest.DONE) {
              if (req.status === 200) {      
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
        
    }; // we assign a function to the property onreadystatechange (callback function)
      httpRequest.open('GET','phpScripts/getLength.php'); // Use a file in reference to the page where you are!
      httpRequest.send(); // GET = send with no parameter !
   
  
  
      httpRequest2 = new XMLHttpRequest(); // create the object
      if (!httpRequest2) { 
       
        alert('Cannot create an XMLHTTP instance');
        return false;
      }
      httpRequest2.onreadystatechange = parseData; // we assign a function to the property onreadystatechange (callback function)
      httpRequest2.open('POST','phpScripts/dbLoading.php?index='+index); // Use a file in reference to the page where you are!
      httpRequest2.send(); // GET = send with no parameter !
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
  catch(e) { // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
    alert('Caught Exceptionparse: ' + e.description);
  }
}