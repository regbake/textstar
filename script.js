const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

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
  // console.log(req.file.buffer.toString("utf8"));
  var files = req.files;

  res.render("index", {
    files: files
  });
})

app.listen(3000, function(){
  console.log("Hooked up to port 3k");
});

module.exports = app;
