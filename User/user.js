function signin(app, path, express){
    app.get("/signin", function(req, res){
        res.sendFile(path.join(__dirname, "Signin", "Signin.html"));
    });

    app.get("/signup", function(req, res){
        res.sendFile(path.join(__dirname, "Signup", "signup.html"));
    });

    app.get("/Signin/Signin.css", function(req, res){
        res.sendFile(path.join(__dirname, "Signin", "Signin.css"));
    });

    app.get("/Signup/signup.css", function(req, res){
        res.sendFile(path.join(__dirname, "Signup", "signup.css"));
    });

    app.get("/Signin/signin.js", function(req, res){
        res.sendFile(path.join(__dirname, "Signin", "signin.js"));
    });

    app.get("/Signup/signup.js", function(req, res){
        res.sendFile(path.join(__dirname, "Signup", "signup.js"));
    });

    app.get("/Assets/background.png", function(req, res){
        res.sendFile(path.join(__dirname, "Assets", "background.png"));
    });
}

module.exports = { signin }