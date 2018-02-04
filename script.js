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

app.get("/", function(req, res){
  res.render("index", {
    files: []
  });
});

app.post("/", upload.any("files"), function(req, res){
  var fileArray = [];
  var files = req.files; //an array of file Objects if multiple uploaded
  var allFileString;

  if (files.length > 1){
    req.files.forEach(function(file){
        let entry = file.buffer.toString("utf8");
        fileArray.push(entry); //put each file into array
        allFileString += entry; // concat each file into string
    });
  }

  res.render("index", {
    files: []
  });
})

app.listen(3000, function(){
  console.log("Hooked up to port 3k");
});

module.exports = app;
