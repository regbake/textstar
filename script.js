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
    timeData: []
  });
});

app.post("/", upload.any("files"), function(req, res){
  const fileArray = [];
  const files = req.files; //an array of file Objects if multiple uploaded
  const fileNameArray = TextFunctions.fileNameArray(req.files);
  let sortedFrequencyArray, cleanArray, timeData;

  if (files.length > 0){
    sortedFrequencyArray = TextFunctions.fileArrayToFrequencyArray(files); //raw not cleaned
    cleanArray = TextFunctions.cleanArray(sortedFrequencyArray); //filtered and cleaned, still has \'
    timeData = TextFunctions.extractTimeData(files.slice(0, (files.length)/2));

    // console.log(timeData);
    // console.log(cleanArray);
    // console.log(sortedFrequencyArray);

  }

  res.render("index", {
    fileArray: fileNameArray,
    timeData: timeData
  });
})

app.listen(3000, function(){
  console.log("Hooked up to port 3k");
});

module.exports = app;
