function signin(app, path, express, db){
    app.use(express.json());

    //post
    app.post("/send/data", function(req, res){
        let user = req.body;
        verifyFieldSignin(user.Email, user.Password, res, db);
    });

    app.post("/create/account", function(req, res){
        let user = req.body;
        verifyFieldSignup(user.Email, user.Password_created, user.Password_confirmated, res, db);
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

//SIGNIN functions
function verifyFieldSignin(email, password, res, db){
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

    if(!isEmailValid(email)){
        return res.json({status: "not an email"});
    }

    verifyDatainDB(email, password, res, db);
}

async function verifyDatainDB(email, password, res, db){
    const collection = db.collection("users");
    
    const push = await collection.findOne(
        { Email: email, Password: password },
        { Cod: 1, _id: 0 }
    );
    
    if(!push){
        return res.json({status: "no user found"});
    } else{
        return res.json({status: "ok", Cod: push.Cod});
    }
}

//SIGNUP functions
function verifyFieldSignup(email, Pcreated, Pconfirmed, res, db){
    let fields = {
        email: !email || email.trim() == "",
        Pcreated: !Pcreated || Pcreated.trim() == "",
        Pconfirmed: !Pconfirmed || Pconfirmed.trim() == ""
    };

    let emptyField = Object.values(fields).some(value => value === true);

    if(emptyField){
        return res.json(fields);
    }

    if(!isEmailValid(email)){
        return res.json({status: "not an email"});
    }

    if(!isTheSamePassword(Pcreated, Pconfirmed)){
        return res.json({status: "not the same password"});
    }

    const cod = createUserCod(Pcreated);
    POSTinDB(email, Pcreated, cod, res, db);
}

async function POSTinDB(email, Pcreated, cod, res, db){
    const collection = db.collection("users");

    const push = await collection.insertOne(
        {
            Email: email,
            Password: Pcreated,
            Cod: cod
        }
    );

    if(!push.acknowledged){
        return res.json({status: "error"});
    }
    return res.json({status: "ok"});
}

//functions
function createUserCod(Pcreated){
    let characters = ["q", "w", "e", "r", "t", "y", "i", "a", "d", "f", 
                        "1", "5", "@", "$", "#", "*", "8", "g", "x", "4"];
    let cod = "";
    
    for(let i = 0; i < Pcreated.length; i++){
        cod += characters[Math.floor(Math.random() * characters.length)];
    }

    return cod;
}

function isTheSamePassword(Pcreated, Pconfirmed){
    return Pcreated.trim() === Pconfirmed.trim();
}

function isEmailValid(email){
    let emailFormat = false;
    let emailFormatString = "";

    for (let em of email){
        em == "@" && (emailFormat = true);
        emailFormat && (emailFormatString += em);
    }

    if(emailFormatString == "@gmail.com"){
        return true;
    }

    return false;
}

module.exports = { signin }