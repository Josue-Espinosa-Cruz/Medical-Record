
//  ADQUISICIÓN DE ID's
var lblInfoNombreUsuario = document.getElementById("lblInfoNombreUsuario");
var lblInfoNombreReal = document.getElementById("lblInfoNombreReal");
var lblInfoCorreo = document.getElementById("lblInfoCorreo");

var lblInfoPuesto = document.getElementById("lblInfoPuesto");
var lblInfoGenero = document.getElementById("lblInfoGenero");
var lblInfoTurno = document.getElementById("lblInfoTurno");

var lblInfoFecha = document.getElementById("lblInfoFecha");
var lblInfoContraseña = document.getElementById("lblInfoContraseña");

const baseURL = "http://localhost:3000/api"

var banderaSignUp = false;

window.onload = () =>{
    cargaUsuario();
}


var cargaUsuario = function(){
    var usuario = JSON.parse(localStorage.getItem("UsuarioIB"));
    if(usuario!=null && usuario!="temporal")
    {
        var URL = baseURL + "/getUserById/" + usuario[0].idPersona;
        fetch(URL,
            {
                method: "GET"
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Usuario con ID: " + usuario[0].idPersona);
            console.log(data);
            console.log(data[0].Pass);
            lblNombreUsuario.innerHTML = data[0].Nombre;
            lblInfoNombreReal.innerHTML = data[0].Nombre;
            lblInfoCorreo.innerHTML = data[0].Correo;
            lblInfoPuesto.innerHTML = data[0].Puesto;
            lblInfoGenero.innerHTML = data[0].Genero;
            lblInfoTurno.innerHTML = data[0].Turno;
            lblInfoFecha.innerHTML = data[0].Fecha;
        }).catch((error) =>{
            console.log("Error al consultar base de datos: " + error);
        })

        var URL = baseURL + "/getUserNameById/" + usuario[0].idPersona;
        fetch(URL,
            {
                method: "GET"
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Usuario con ID: " + usuario[0].idPersona);
            console.log(data);
            lblInfoNombreUsuario.innerHTML = data[0].Username;
            lblInfoContraseña.innerHTML = data[0].Pass;
        }).catch((error) =>{
            console.log("Error al consultar base de datos: " + error);
        })        
    }
    else if(usuario=="temporal")
    {
        window.location.href = "http://localhost:3000/SignUp.html"
    }
    else
    {
        window.location.href = "http://localhost:3000/login.html"
    }
    console.log(usuario);
}


//  LISTO!!!
var logout = function(){
    localStorage.removeItem("UsuarioIB");
    window.location.href = "http://localhost:3000/login.html"
}

