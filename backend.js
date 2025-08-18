const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "Profiles", "profiles.html"));
});

app.get("/Profiles/assets/icon.png", function(req, res){
    res.sendFile(path.join(__dirname, "Profiles", "assets", "icon.png"));
});

app.get("/Profiles/profiles.css", function(req, res){
    res.setHeader("Content-type", "text/css");
    res.sendFile(path.join(__dirname, "Profiles", "profiles.css"));
});

app.get("/Profiles/assets/newIcon.png", function(req, res){
    res.sendFile(path.join(__dirname, "Profiles", "assets", "newIcon.png"));
});

app.get("/Profiles/assets/logo.png", function(req, res){
    res.sendFile(path.join(__dirname, "Profiles", "assets", "logo.png"));
});

app.listen(PORT, function(){
    console.log(`Letflix merge pe portul ${PORT}`);
});