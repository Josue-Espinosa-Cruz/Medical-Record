
//  ADQUISICIÓN DE ID's
var txtNombreAgregar = document.getElementById("txtNombreAgregar");
var txtFechaAgregar = document.getElementById("txtFechaAgregar");
var txtCorreoAgregar = document.getElementById("txtCorreoAgregar");

var txtUsernameAgregar = document.getElementById("txtUsernameAgregar");
var txtPasswordAgregar = document.getElementById("txtPasswordAgregar");
var txtCPasswordAgregar = document.getElementById("txtCPasswordAgregar");

var txtPuestoAgregar = document.getElementById("txtPuestoAgregar");
var txtGeneroAgregar = document.getElementById("txtGeneroAgregar");
var txtTurnoAgregar = document.getElementById("txtTurnoAgregar");

const baseURL = "http://localhost:3000/api"

var banderaSignUp = false;

window.onload = () =>{
    cargaUsuario();
}

var cargaUsuario = function(){
    var usuario = JSON.parse(localStorage.getItem("UsuarioIB"));
    if(usuario!=null && usuario!="temporal")
    {
        window.location.href = "http://localhost:3000/Ingresar.html"
    }
    else if(usuario==null)
    {
        window.location.href = "http://localhost:3000/login.html"
    }
}

var login = function(){
    localStorage.removeItem("UsuarioIB");
    window.location.href = "http://localhost:3000/login.html"
}

var addUser = () =>{
    var URL = baseURL + "/addUser";

    var validacion=null;

    var datos = {
        Username: txtUsernameAgregar.value
    }
    
    var username = txtUsernameAgregar.value.trim();
    var pass1 = txtPasswordAgregar.value.trim();
    var pass2 = txtCPasswordAgregar.value.trim();

    var correcto = false;

    if(username == "" || pass1 == "" || pass2=="")
    {
        alert("Por favor, ingrese el correo y contraseña");
    }
    else
    {
        if(pass1 == pass2)
        {
            correcto = true;
        }
        else
        {
            correco = false;
            alert("Las contraseñas no coinciden");
        }
    }

    if(correcto == true)
    {
        fetch(baseURL+"/validateUser",
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
            console.log("Respuesta validate: ");
            validacion = data;
            console.log(validacion);
            if(validacion.length == 0)
            {
                datos = {
                    Nombre : txtNombreAgregar.value,
                    Fecha : txtFechaAgregar.value,
                    Correo : txtCorreoAgregar.value,
                    Username: txtUsernameAgregar.value.trim(),
                    Pass: txtPasswordAgregar.value.trim(),
                    Puesto: txtPuestoAgregar.value.trim(),
                    Genero: txtGeneroAgregar.value,
                    Turno: txtTurnoAgregar.value
                }
                console.log(datos);
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
                    console.log(data);

                    alert(data);
                    envio();
                    txtNombreAgregar.value = null;
                    txtFechaAgregar.value = null;
                    txtCorreoAgregar.value = null;
                    txtUsernameAgregar.value = null;
                    txtPasswordAgregar.value = null;
                    txtPuestoAgregar.value = null;
                    txtGeneroAgregar.value = null;
                    txtTurnoAgregar.value = null;
                    login();
                }).catch((error) =>{
                    console.log("Error al consultar base de datos: " + error);
                })
            }
            else
            {
                alert("El usuario ya existe, intente otro");
            }
        }).catch((error) =>{
            console.log("Error al consultar base de datos: " + error);
        })
    }
}

var envio = function(){
    var datos = {
        Correo: txtCorreoAgregar.value,
        Contenido: "Hola! Muchas gracias por crear la cuenta en la base de datos Hospitalarios JEC. Su usuario es: " + txtUsernameAgregar.value.trim() + " y su contraseña es: " + txtPasswordAgregar.value.trim(),
        Asunto: "Información de cuenta"
    }

    var url = baseURL + "/mail";

    fetch(url, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-type": "application/json"
        }
    }).then((result) => {
        return result.json();
    }).then((data) =>{
        console.log(data);
    }).then((err)=>{
        console.log(err);
    })
}
