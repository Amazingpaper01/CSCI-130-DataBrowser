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

const olympicArr = [olym2020, olym2016, olym2014, olym1936, olym2010];

var newArr;         //new array responsible for handling json data 
var index = 0;      //holds the current index 
var len = 0;

function createDB() {                           //creates the database in MySQL server
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Handle success or error here
        console.log(this.responseText);
      }
    };
    req.open("POST", "phpFiles/createDB.php", true);
    req.send();
    document.getElementById("createDB").disabled = true;
  }

  function fetchData() {                //fetches olympic data from the database. meant to be used to update the page from database
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Parse the JSON response
        try {
        var response = JSON.parse(this.responseText);
        } catch (err) {
            console.log('Parsing error:', err);
            console.log('Received response:', this.responseText);
        }
  
        if (response.error) {
          console.error('Error fetching data:', response.error);
          return;
        } 
        
        newArr = response;
        len = newArr.length;
        console.log(newArr);
        loadObject();
      }
    };
    xhttp.open("GET", "phpFiles/fetchData.php", true);
    xhttp.send();
  }

function previous() {             //goes to previous object
    if(index == 0){
        index = len -1;
        loadObject();
    }
    else {
        index--;
        loadObject();
    }
}

function next() {                   //goes to next object
    if(index == len-1){
        index = 0;
        loadObject();
    }
    else {
        index++;
        loadObject();
    }
}

function goToFirst() {              //goes to first object
    index = 0;
    loadObject();
}

function goToLast() {               //goes to last object 
    index = len-1;
    loadObject();
}

function loadObject() {             //function gets called when the next object needs to be loaded. 
    document.getElementById('title').value = newArr[index].name || '';
    document.getElementById('year').value = newArr[index].year || '';
    document.getElementById('location').value = newArr[index].location || '';
    document.getElementById('season').value = newArr[index].season || '';
    document.getElementById('mascot').value = newArr[index].mascot || '';
    document.getElementById('olympicPicture').src = newArr[index].img || '';
    document.getElementById("currentIndex").innerHTML = index+1 + " out of " + len;     //displays current position in the table
}

/* INSERTING SCRIPT HERE */
function openInsertModal() {
        document.getElementById('insertModal').style.display = 'block';
}

function closeInsertModal() {
        document.getElementById('insertModal').style.display = 'none';
}

function insertData() {                                     //inserts object data into the table on the database
    var olympicData = {                                     //stores data into an object 
      name: document.getElementById('newTitle').value,
      year: document.getElementById('newYear').value,
      location: document.getElementById('newLocation').value,
      season: document.getElementById('newSeason').value,
      mascot: document.getElementById('newMascot').value,
      img: document.getElementById('newImg').value
    };
                                                            //makes connection request to server through AJAX 
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.success) {
          console.log('Data inserted successfully');
          closeInsertModal();
          fetchData();
        } else {
          console.log('Error inserting data');
        }
      }
    };
    req.open("POST", "phpFiles/insert.php", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(olympicData));
    //fetchData();
}

/* DELETE DATA SCRIPT HERE */
function deleteObj() {
    var id = index+1;                       //gets position of current position 
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.success) {
            console.log('Olympic event deleted successfully');
            index--;
            fetchData();
          } else {
            console.log('Error deleting the Olympic event');
          }
      }
    };
    xhttp.open("POST", "phpFiles/delete.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ id: id }));
  }

  /* EDIT SCRIPT HERE*/
  function edit() {
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'inline';
    document.getElementById('newImgURLtxt').style.display = 'inline';
    document.getElementById('newImgURL').style.display = 'inline';
    var inputs = document.getElementsByClassName('inputs');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = false;
    }
  }
  
  function saveEdit() {
    var olympicData = {
      id: index + 1,
      name: document.getElementById('title').value,
      year: document.getElementById('year').value,
      location: document.getElementById('location').value,
      season: document.getElementById('season').value,
      mascot: document.getElementById('mascot').value,
      img: document.getElementById('newImgURL').value
    };
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.success) {
          console.log('Olympic event updated successfully');
          document.getElementById('editButton').style.display = 'inline';
          document.getElementById('saveButton').style.display = 'none';
          document.getElementById('newImgURLtxt').style.display = 'none';
          document.getElementById('newImgURL').style.display = 'none';
          var inputs = document.getElementsByClassName('inputs');
          for (var i = 0; i < inputs.length; i++) {
            inputs[i].readOnly = true;
          }
          fetchData();
        } else {
          console.log('Error updating the Olympic event');
        }
      }
    };
    xhttp.open("POST", "phpFiles/edit.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(olympicData));
  }

  /* SORTING SCRIPT HERE */
  function sortByTitle() {                  //orders the olympic games in alphabetical order based on name/title
    newArr.sort((a, b) => {                 //using javascript sort() feature to sort the array of objects
        let nameA = a.name.toUpperCase(); 
        let nameB = b.name.toUpperCase();
        
        if (nameA < nameB) {
          return -1; // 'a' comes first
        }
        if (nameA > nameB) {
          return 1; // 'b' comes first
        }
        return 0; // names are equal
      });
      loadObject();
  }

  function sortDefault() {          //resets the original order
        fetchData();
  }

  /* UPLOADING IMAGE FILES HERE */
  function upload() {
    
  }