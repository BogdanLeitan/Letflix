const express = require("express");
const path = require("path");
const mongodb = require("mongodb");

const app = express();
const PORT = 5000;

const url = "mongodb://localhost:27017/";
const client = new mongodb.MongoClient(url);

app.get("/profiles", function(req, res){
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

app.get("/Letflix/:id", async function(req, res){
    const exist = await validateUser(req.params.id);
    if(exist){
        res.sendFile(path.join(__dirname, "Moviepage", "moviepage.html"));
    } else{
        res.send("No user found!");
    }
});

app.listen(PORT, function(){
    console.log(`Letflix merge pe portul ${PORT}`);
});

async function validateUser(USER){
    await client.connect();

    const DB = await client.db("Letflix").collection("Users");
    const name = await DB.findOne({User: USER});

    await client.close();

    if(name) return true; else return false;
}