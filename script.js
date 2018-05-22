const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const TextFunctions = require("./scripts/TextFunctions.js");

//multer shizr
var multer = require("multer");
var fs = require("fs");
var storage = multer.memoryStorage()
var upload = multer({storage: storage});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/')); //for styling

//define Object.entries polyfill
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

app.get("/", function(req, res){
  res.render("index", {
    fileArray: [],
    timeData: [],
    cleanArray: [],
    timeObject: []
  });
});

app.post("/", upload.any("files"), function(req, res){
  console.log("ahoy from post, matey");

  const fileArray = [];
  //make sure to use REQ.FILES
  const allFiles = req.files; //an array of file Objects if multiple uploaded
  const files = []; //all the .txtFiles
  let sortedFrequencyArray, cleanArray, timeData, timeObject;

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

    //the first half of files is {file inforation}, the second half is string output
    timeData = TextFunctions.extractTimeData(files.slice(0, (files.length)/2));
    timeObject = TextFunctions.convertData(timeData);

  }

  console.log("Time object: ", timeObject[0].time);
  // console.log("files: ", files);
  // console.log("file slice ********############", files.slice(0, (files.length)/2));

  res.render("index", {
    fileArray: fileNameArray,
    //commented out for testing
    // timeData: [],
    // cleanArray: []
    timeData: timeData,
    cleanArray: cleanArray,
    timeObject
  });
})

app.listen(3001, function(){
  console.log("Hooked up to port 3k+1");
});

module.exports = app;
