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

let flag = true;
function displayData() {                                            //displays json data when button is clicked
    const jsonData = JSON.stringify(olympicArr, null, 2);           //stringifies the array into JSON format
    if (flag){      //shows JSON onclick
        document.getElementById("data").innerHTML = jsonData;
        flag = false;
    }
    else {          //hides JSON on reclick
        document.getElementById("data").innerHTML = '';
        flag = true;
    }
}

const newArr = new Array();         //new array responsible for handling json data 
var index = 0;

//Handles the http request and performs GET method to the server to read data for data.json
var req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        for (let i = 0; i < data.length; i++) {
        newArr.push(data[i]);
    }
    //displays the first object in the array
        console.log(newArr);
        displayObj();
    }
};
req.open("GET", "http://10.62.80.139/data.json", true);
req.send();

function previous() {
    if(index == 0){
        index = 4;
        displayObj();
    }
    else {
        index--;
        displayObj();
    }
}

function next() {
    if(index == 4){
        index = 0;
        displayObj();
    }
    else {
        index++;
        displayObj();
    }
}

//displays the objects in the new array (newArr)
function displayObj() {
    let obj = newArr[index];
    let img = document.createElement('img');
    img.src = obj.img;
    img.alt = obj.name;
    img.width = 400;
    img.height = 400;
    document.getElementById("get").innerHTML = "<b>Title: </b>" + obj.name + "<br>" 
    + "<b>Year: </b>" + obj.year + "<br>"
    + "<b>Location: </b>" + obj.location + "<br>"
    + "<b>Season: </b>" + obj.season + "<br>"
    + "<b>Mascot: </b>" + obj.mascot + "<br>";
    document.getElementById("get").appendChild(img);
}