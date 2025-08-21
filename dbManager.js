const mongodb = require("mongodb");

const url = "mongodb://localhost:27017/";
const client = new mongodb.MongoClient(url);

async function validateUser(USER){
    try{
        await client.connect();
        const DB = client.db("vireo").collection("users");
        const name = await DB.findOne({user: USER});

        return !!name;

    } catch(error){
        console.log(error);
        return 400;
    } finally{
        await client.close();
    }
}

module.exports = {
    validateUser
}