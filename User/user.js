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
async function verifyFieldSignin(email, password, res, db){
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

    let cod = await SearchinDB(email, password, db, "signin");
    
    if(!cod){
        return res.json({status: "no user found"});
    }
    return res.json({status: "ok", Cod: cod});
}

//SIGNUP functions
async function verifyFieldSignup(email, Pcreated, Pconfirmed, res, db){
    let fields = {
        emailField: !email || email.trim() == "",
        createdPassword: !Pcreated || Pcreated.trim() == "",
        confirmedPassword: !Pconfirmed || Pconfirmed.trim() == ""
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

    if(await SearchinDB(email, Pcreated, db, "signup")){
        return res.json({status: "Account allready exists"});
    }

    const cod = createUserCod(Pcreated);
    POSTinDB(email, Pcreated, cod, res, db);
}

//DATA BASE operations
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

async function SearchinDB(email, password, db, type){
    const collection = db.collection("users");
    let verify = null;

    switch(type){
        case "signin":
            verify = await collection.findOne(
                {
                    Email: email,
                    Password: password
                },
                { 
                    Cod: 1, _id: 0 
                }
            );
            if(verify){return verify.Cod;}
        break;

        case "signup":
            verify = await collection.findOne(
                {
                    Email: email,
                }
            );
        break;
    }

    if(!verify){
        return false;
    }
    return true;
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