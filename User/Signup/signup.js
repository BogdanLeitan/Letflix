function getData(sendData){
    let email = document.getElementById("email_field").value;
    let password_created = document.getElementById("password_creation").value;
    let password_confirmated = document.getElementById("password_confirmation").value;

    console.log(email);
    console.log(password_created)
    console.log(password_confirmated);

    sendData();
}

async function sendData(){
    console.log("test");
}