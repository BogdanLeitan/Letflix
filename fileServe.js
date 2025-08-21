const path = require("path");

function profileFileServe(app){
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
}

module.exports = {
    profileFileServe
};