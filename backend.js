const express = require("express");
const path = require("path");
let { signin } = require("./User/user")

const app = express();

//load Profiles
signin(app, path, express);

app.listen(5000);