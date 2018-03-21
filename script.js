const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const TextFunctions = require("./scripts/TextFunctions.js");

//multer shiz
var multer = require("multer");
var fs = require("fs");
var storage = multer.memoryStorage()
var upload = multer({storage: storage});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/')); //for styling

//define Object.entries
if (!Object.entries){
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

//routes
app.get("/", function(req, res){
  res.render("index", {
    fileArray: [],
    timeData: [],
    cleanArray: []
  });
});

app.post("/", upload.any("files"), function(req, res){
  const fileArray = [];
  const allFiles = req.files; //an array of file Objects if multiple uploaded
  const files = []; //all the .txtFiles
  let sortedFrequencyArray, cleanArray, timeData;

  //select only text files
  allFiles.forEach(function(file){
    if (file.mimetype === 'text/plain'){
      files.push(file);
    }
  });

  //declare this after cleaning out non-txt files
  const fileNameArray = TextFunctions.fileNameArray(files);

  if (files.length > 0){
    sortedFrequencyArray = TextFunctions.fileArrayToFrequencyArray(files); //raw not cleaned
    cleanArray = TextFunctions.cleanArray(sortedFrequencyArray); //filtered and cleaned, still has \'
    timeData = TextFunctions.extractTimeData(files.slice(0, (files.length)/2));

    console.log(timeData);
    // console.log(cleanArray);
    // console.log(sortedFrequencyArray);

  }

  res.render("index", {
    fileArray: fileNameArray,
    //commented out for testing
    // timeData: [],
    // cleanArray: []
    timeData: timeData,
    cleanArray: cleanArray
  });
})

app.listen(3000, function(){
  console.log("Hooked up to port 3k");
});

module.exports = app;
