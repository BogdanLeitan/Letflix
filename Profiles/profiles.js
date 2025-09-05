function profiles(app, path, express, db){
    app.get("/:cod", function(req, res){
        res.sendFile(path.join(__dirname, "profiles.html"));
    });

    app.get("/assets/profiles.css", function(req, res){
        res.sendFile(path.join(__dirname, "assets", "profiles.css"));
    });

    app.get("/assets/icon.png", function(req, res){
        res.sendFile(path.join(__dirname, "assets", "icon.png"));
    });

    app.get("/assets/newIcon.png", function(req, res){
        res.sendFile(path.join(__dirname, "assets", "newIcon.png"));
    });
}

module.exports = { profiles };