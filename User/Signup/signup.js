function getData(sendData){
    let email = document.getElementById("email_field").value;
    let password_created = document.getElementById("password_creation").value;
    let password_confirmated = document.getElementById("password_confirmation").value;

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

    } catch(error){
        console.log(error);
    }
}

function statusCheck(results){
    switch(results.status){
        case "ok":
            window.location.href = "/signin";
        break;

        case "not an email":
            console.log("not an email");
        break;

        case "not the same password":
            console.log("not the same password");
        break;
    }
}