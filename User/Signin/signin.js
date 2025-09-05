function getData(sendData){
    let email = document.getElementById("email_field").value;
    let password = document.getElementById("password_field").value;

    sendData(email, password);
}

async function sendData(email, password){
    const user = {
        Email: email,
        Password: password
    };

    try{
        const response = await fetch("http://localhost:5000/send/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if(!response.ok){
            throw new Error("Conexiune esuata");
        }

        const results = await response.json();
        statusCheck(results);
        
    } catch(error){
        console.log(error);
    }
}

function statusCheck(results){
    let email = document.getElementById("email_field");
    let password = document.getElementById("password_field");

    switch(results.status){
        case "ok":
            window.location.href = `/${results.Cod}`;
        break;

        case "no user found":
            email.style.border = "1px solid red";
            password.style.border = "1px solid red";
            pushElement("No user found");
        break;

        case "not an email":
            email.style.border = "1px solid red";
            pushElement("Not an Email");
        break;

        case "field empty":
            email.style.border = "1px solid red";
            password.style.border = "1px solid red";
            pushElement("Field Empty");
        break;

        case "email empty":
            email.style.border = "1px solid red";
            pushElement("Email Empty");
        break;

        case "password empty":
            pushElement("Password Empty");
            password.style.border = "1px solid red";
        break;
    }
}

function pushElement(text){
    let problem = document.getElementById("problem");
    
    problem.textContent = text;
    problem.style.color = "red";
}