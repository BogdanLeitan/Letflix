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
            throw new Error("Conexiune esuala");
        }

        const result = await response.json();
        console.log(result);

    } catch(error){
        console.log(error);
    }
}