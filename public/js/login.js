var txtUserNameLogin = document.getElementById("txtUserNameLogin");
var txtPasswordLogin = document.getElementById("txtPasswordLogin");

const baseURL = "http://localhost:3000/api"

var banderaSignUp = false;

window.onload = () =>{
    cargaUsuario();
}


var cargaUsuario = function(){
    var usuario = JSON.parse(localStorage.getItem("UsuarioIB"));
    console.log(usuario);
    if(usuario!=null && usuario!="temporal")
    {
        window.location.href = "http://localhost:3000/Ingresar.html"
    }
    else if(usuario=="temporal")
    {
        window.location.href = "http://localhost:3000/SignUp.html"
    }
}

var SignUp = function(){
    localStorage.setItem("UsuarioIB", JSON.stringify("temporal"))
    var usuario = JSON.parse(localStorage.getItem("UsuarioIB"));
    if(usuario=="temporal")
    {
        window.location.href = "http://localhost:3000/SignUp.html"
    }
}

var login = () =>{
    var URL = baseURL + "/login";

    var datos = {
        Username : txtUserNameLogin.value,
        Pass : txtPasswordLogin.value
    }
    console.log(JSON.stringify(datos));

    txtUserNameLogin.value = null;
    txtPasswordLogin.value = null;

    fetch(URL,
        {
            method : "POST",
            body : JSON.stringify(datos),
            headers : {
                "Content-Type" : "application/json"
            }
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        var usuario = data
        console.log(usuario)
        console.log(usuario.lenght)
        if(usuario.length != 0)
        {
            alert("Bienvenid@ " + usuario.nombre);
            localStorage.setItem("UsuarioIB", JSON.stringify(usuario))
            window.location.href = "http://localhost:3000/Ingresar.html";
        }
        else
        {
            alert("Error de credenciales");
        }
    }).catch((error) =>{
        console.log("Error al consultar base de datos: " + error);
    })
}

