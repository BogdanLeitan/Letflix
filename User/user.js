function signin(app, path, express){
    app.use(express.json());

    //post
    app.post("/send/data", function(req, res){
        let user = req.body;
        verifyField(user.Email, user.Password, res);
    });

    //get
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

function verifyField(email, password, res){
    let emailFormat = false;
    let emailFormatString = "";

    if(email == ""){
        email == "" && password == "" ? res.json({status: "field empty"}) : 
                                        res.json({status: "email empty"})
    }
    else if(password == ""){res.json({status: "password empty"});}

    for (let em of email){
        em == "@" && (emailFormat = true);

        if(emailFormat){
            emailFormatString += em;
        }
    }

    if(emailFormatString == "@gmail.com"){
        verifyDatainDB(email, password, res);
    } else{
        res.json({status: "not an email"});
    }
}

function verifyDatainDB(email, password, res){
    
}

module.exports = { signin }