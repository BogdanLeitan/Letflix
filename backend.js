const express = require("express");
const path = require("path");
const mongodb = require("mongodb");
let FileServe = require("./fileServe.js");
let dbManager = require("./dbManager.js");

const app = express();
const url = "mongodb://localhost:27017/";
const client = new mongodb.MongoClient(url);

//load Profiles
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

//verify user
app.get("/vireo/:id", conectDB, async function(req, res){
    const exist = await validateUser(req.params.id);
    if(exist){
        res.sendFile(path.join(__dirname, "Moviepage", "moviepage.html"));
    } else if(!exist){
        res.send("No user found!");
    }
});

app.listen(5000);

//DB operation
async function conectDB(req, res, next){
    try{
        const connection = await client.connect();

        if(connection){
            next();
        }

    } catch(error){
        console.log(error);
        return res.sendFile(path.join(__dirname, "Errors", "dbNotConected.html"));
    } 
}

async function validateUser(USER){
    try{
        const DB = client.db("vireo").collection("users");
        const name = await DB.findOne({user: USER});

        return !!name;
    } catch(error){
        console.log(error);
    } finally{
        await client.close();
    }
}