function signin(app, path, express, db){
    app.use(express.json());

    //post
    app.post("/send/data", function(req, res){
        let user = req.body;
        verifyField(user.Email, user.Password, res, db);
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

function verifyField(email, password, res, db){
    let emailFormat = false;
    let emailFormatString = "";

    if(email == ""){
        if(email == "" && password == ""){
            return res.json({status: "field empty"});
        } else{
            return res.json({status: "email empty"});
        }                               
    }
    else if(password == ""){
        return res.json({status: "password empty"});
    }

    for (let em of email){
        em == "@" && (emailFormat = true);

        if(emailFormat){
            emailFormatString += em;
        }
    }

    if(emailFormatString == "@gmail.com"){
        verifyDatainDB(email, password, res, db);
    } else{
        return res.json({status: "not an email"});
    }
}

async function verifyDatainDB(email, password, res, db){
    const users = db.collection("users");
    
    const result = await users.findOne(
        { Email: email, Password: password },
        { Cod: 1, _id: 0 }
    );
    
    if(!result){
        return res.json({status: "no user found"});
    } else{
        return res.json({status: "ok", Cod: result.Cod});
    }
}

module.exports = { signin }