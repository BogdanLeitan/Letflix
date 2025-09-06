function getData(sendData){
    let email = document.getElementById("emailField").value;
    let password_created = document.getElementById("createdPassword").value;
    let password_confirmated = document.getElementById("confirmedPassword").value;

    sendData(email, password_created, password_confirmated);
}

async function sendData(email, password_created, password_confirmated){
    const user = {
        Email: email,
        Password_created: password_created,
        Password_confirmated: password_confirmated
    };

    try{
        const response = await fetch("http://localhost:5000/create/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        
        if(!response.ok){
            throw new Error("Conexiune esuata!");
        }

        const results = await response.json();
        statusCheck(results);

    } catch(error){ console.log(error);}
}

function statusCheck(results){
    switch(results.status){
        case "ok": window.location.href = "/signin"; break;
        case "not an email": pushElement(3, "Not an Email"); break;
        case "not the same password": pushElement(1, "The PASSWORD is not IDENTICAL"); break;
        case "Account allready exists": pushElement(2, "Account allready exists"); break;
        
        default:
            let variables = ["emailField", "createdPassword", "confirmedPassword"];
            
            for(let i = 0; i < variables.length; i++){
                if(results[variables[i]] == true){
                    let element = document.getElementById(variables[i]);
                    element.style.border = "1px solid red";
                }
            }
            pushElement(4, "Empty field");
        break;
    }
}

function pushElement(isPassWrong = false, text){
    let emailField = document.getElementById("emailField");
    let createdPassword = document.getElementById("createdPassword");
    let confirmedPassword = document.getElementById("confirmedPassword");
    
    switch(isPassWrong){
        case 1:
            createdPassword.style.border = "1px solid red";
            confirmedPassword.style.border = "1px solid red";
        break;

        case 2:
            createdPassword.style.border = "1px solid red";
            confirmedPassword.style.border = "1px solid red";
            emailField.style.border = "1px solid red";
        break;

        case 3: emailField.style.border = "1px solid red"; break;
        case 4: console.log("empty"); break;
    }
    let problem = document.getElementById("problem");
    
    problem.textContent = text;
    problem.style.color = "red";
}