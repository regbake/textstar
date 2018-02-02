const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
  res.render("index");
});

app.listen(3000, function(){
  console.log("Hooked up to port 3k");
});

module.exports = app; 
