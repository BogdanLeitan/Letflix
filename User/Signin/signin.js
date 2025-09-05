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
    switch(results.status){
        case "ok":
            console.log("User found");
        break;

        case "no user found":
            console.log("no user found");
        break;

        case "not an email":
            console.log("not an email");
        break;

        case "field empty":
            console.log("field empty");
        break;

        case "email empty":
            console.log("email empty");
        break;

        case "password empty":
            console.log("password empty");
        break;
    }
}