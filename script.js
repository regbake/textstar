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

//define Object.entries
if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

//routes
app.get("/", function(req, res){
  res.render("index", {
    files: []
  });
});

app.post("/", upload.any("files"), function(req, res){
  var fileArray = [];
  var files = req.files; //an array of file Objects if multiple uploaded
  var allFileString, wordFrequencyObject, wordFrequencyArray;
  var obj = {1: "hey", 2: "sup"};

  if (files.length > 1){
    req.files.forEach(function(file){
        let entry = file.buffer.toString("utf8");
        fileArray.push(entry); //put each file into array
        allFileString += entry; // concat each file into string
    });
  }

  wordFrequencyObject = TextFunctions.countWords(allFileString);
  wordFrequencyArray = Object.entries(wordFrequencyObject);

  console.log(wordFrequencyArray);

  res.render("index", {
    files: []
  });
})

app.listen(3000, function(){
  console.log("Hooked up to port 3k");
});

module.exports = app;
