const express = require("express")
const path = require("path")
const { MongoClient } = require("mongodb")
let { signin } = require("./User/user")
let { profiles } = require("./Profiles/profiles")

const app = express();

const client = new MongoClient("mongodb://localhost:27017/");

//Data Base connection
serverDB().then(function(db){
    signin(app, path, express, db);
    profiles(app, path, express, db);

    app.listen(5000);
});

async function serverDB(){
    try{
        await client.connect();
        return client.db("app");

    } catch(error){
        console.log(error);
    }
}