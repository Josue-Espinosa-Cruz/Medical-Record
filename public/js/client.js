

var txtNombreAgregar = document.getElementById("txtNombreAgregar");
var txtEdadAgregar = document.getElementById("txtEdadAgregar");
var txtFechaAgregar = document.getElementById("txtFechaAgregar");
var txtHoraAgregar = document.getElementById("txtHoraAgregar");
var txtSintomasAgregar = document.getElementById("txtSintomasAgregar");
var txtDiagnosticoAgregar = document.getElementById("txtDiagnosticoAgregar");
var txtTratamientoAgregar = document.getElementById("txtTratamientoAgregar");

var txtNombreBuscar = document.getElementById("txtNombreBuscar");
var txtFechaBuscar = document.getElementById("txtFechaBuscar");

var IDactualizar = "";
var txtNombreActualizar = document.getElementById("txtNombreActualizar");
var txtEdadActualizar = document.getElementById("txtEdadActualizar");
var txtFechaActualizar = document.getElementById("txtFechaActualizar");
var txtHoraActualizar = document.getElementById("txtHoraActualizar");
var txtSintomasActualizar = document.getElementById("txtSintomasActualizar");
var txtDiagnosticoActualizar = document.getElementById("txtDiagnosticoActualizar");
var txtTratamientoActualizar = document.getElementById("txtTratamientoActualizar");

var lblNombreUsuario = document.getElementById("lblNombreUsuario");

const baseURL = "http://localhost:3000/api"
var string1 = "<h6>ID: "
var string2 = "</h6><h6>Nombre: "
var string3 = "</h6><h6>Edad: ";
var string4 = "</h6><h6>Fecha: ";
var string5 = "</h6><h6>Hora: ";
var string6 = "</h6><h6>Síntomas: ";
var string7 = "</h6><h6>Diagnóstico: ";
var string8 = "</h6><h6>Tratamiento:";
var string9 = "</h6><button class='btn btn-danger' onclick='eliminar("
var string10 = ")'> Eliminar </button><hr>"

//var string1E = "<h6>ID: "
var string2E = "<hr><h6>Nombre: "
var string3E = "</h6><h6>Edad: ";
var string4E = "</h6><h6>Fecha: ";
var string5E = "</h6><h6>Hora: ";
var string6E = "</h6><h6>Síntomas: ";
var string7E = "</h6><h6>Diagnóstico: ";
var string8E = "</h6><h6>Tratamiento:";
var string9E = "</h6><button class='btn btn-danger' onclick='plantilla("
var string10E = ")'> Editar </button><hr>"

const plantilla1 = "<hr><div class='row'><div class='col-4'><div class='input-group-prepend'><span class='input-group-text'>Nombre del paciente</span></div><input type='text' class='form-control' id='txtNombreActualizar'></div>"
const plantilla2 = "<div class='col-2'><div class='input-group-prepend'><span class='input-group-text'>Edad</span></div><input type='number' class='form-control' id='txtEdadActualizar'></div>"
const plantilla3 = "<div class='col-3'><div class='input-group-prepend'><span class='input-group-text'>Fecha de registro</span></div><input type='date' class='form-control' id='txtFechaActualizar'></div>"
const plantilla4 = "<div class='col-3'><div class='input-group-prepend'><span class='input-group-text'>Hora de registro</span></div><input type='time' class='form-control' id='txtHoraActualizar'></div></div>"
const plantilla5 = "<hr><div class='row'><div class='input-group mb-3'><div class='col-12'><div class='input-group-prepend'><span class='input-group-text'>Síntomas</span></div><input type='text' class='form-control' id='txtSintomasActualizar'></div></div>"
const plantilla6 = "<hr><div class='input-group mb-3'><div class='col-12'><div class='input-group-prepend'><span class='input-group-text'>Diagnóstico</span></div><input type='text' class='form-control' id='txtDiagnosticoActualizar'></div></div>"
const plantilla7 = "<div class='input-group mb-3'><div class='col-12'><div class='input-group-prepend'><span class='input-group-text'>Tratemiento</span></div><input type='text' class='form-control' id='txtTratamientoActualizar'></div></div>"
const plantilla8 = "</div><div class='text-center'><button onclick='updateUserProyecto("
const plantilla9 = ")' type='button' class='btn btn-success text-center w-50'>Actualizar</button></div>"
var formularioBase = plantilla1+plantilla2+plantilla3+plantilla4+plantilla5+plantilla6+plantilla7+plantilla8;
var formulario = formularioBase;

var a = false;

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
            lblNombreUsuario.innerHTML = data[0].Nombre;
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

//LISTO!!
var getUsersByNombreProyecto = () =>{
    if(txtFechaBuscar.value=="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + txtNombreBuscar.value + "/" + "nd" + "/nd";
    }

    if(txtNombreBuscar.value=="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + "nd" + "/" + txtFechaBuscar.value + "/nd";
    }

    if(txtNombreBuscar.value!="" && txtFechaBuscar.value!="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + txtNombreBuscar.value + "/" + txtFechaBuscar.value + "/nd";
    }

    txtNombreBuscar.value = null;
    txtFechaBuscar.value = null;

    fetch(URL,
        {
            method: "GET"
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        $('#lista').empty();
        data.forEach(element => {
            var stringHTML = string1;
            stringHTML += element.id;
            stringHTML += string2;
            stringHTML += element.Nombre;
            stringHTML += string3;
            stringHTML += element.Edad;
            stringHTML += string4;
            stringHTML += element.Fecha;
            stringHTML += string5;
            stringHTML += element.Hora;
            stringHTML += string6;
            stringHTML += element.Sintomas;
            stringHTML += string7;
            stringHTML += element.Diagnostico;
            stringHTML += string8;
            stringHTML += element.Tratamiento;
            stringHTML += string9;
            stringHTML += element.id;
            stringHTML += string10;
            $('#lista').append(stringHTML);
            console.log(stringHTML);
        })
    }).catch((error) =>{
        console.log("Error al consultar base de datos: " + error);
    })
}

//LISTO!!
var getUsersByNombreProyecto2 = () =>{
    if(txtNombreBuscar.value=="" && txtFechaBuscar.value=="" && txtHoraBuscar.value!="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + "nd/nd/" + txtHoraBuscar.value;
    }

    if(txtNombreBuscar.value=="" && txtFechaBuscar.value!="" && txtHoraBuscar.value=="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + "nd/" + txtFechaBuscar.value + "/nd";
    }

    if(txtNombreBuscar.value=="" && txtFechaBuscar.value!="" && txtHoraBuscar.value!="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + "nd/" + txtFechaBuscar.value + "/" + txtHoraBuscar.value;
    }

    if(txtNombreBuscar.value!="" && txtFechaBuscar.value=="" && txtHoraBuscar.value=="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + txtNombreBuscar.value + "/nd/nd";
    }

    if(txtNombreBuscar.value!="" && txtFechaBuscar.value=="" && txtHoraBuscar.value!="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + txtNombreBuscar.value + "/nd/" + txtHoraBuscar.value;
    }

    if(txtNombreBuscar.value!="" && txtFechaBuscar.value!="" && txtHoraBuscar.value=="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + txtNombreBuscar.value + "/" + txtFechaBuscar.value + "/nd";
    }

    if(txtNombreBuscar.value!="" && txtFechaBuscar.value!="" && txtHoraBuscar.value!="")
    {
        var URL = baseURL + "/getUsersByNombreProyecto/" + txtNombreBuscar.value + "/" + txtFechaBuscar.value + "/" + txtHoraBuscar.value;
    }

    //txtNombreBuscar.value = null;
    //txtFechaBuscar.value = null;
    //txtHoraBuscar.value = null;

    fetch(URL,
        {
            method: "GET"
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        $('#lista2').empty();
        data.forEach(element => {
            var stringHTML = string2E;
            stringHTML += element.Nombre;
            stringHTML += string3E;
            stringHTML += element.Edad;
            stringHTML += string4E;
            stringHTML += element.Fecha;
            stringHTML += string5E;
            stringHTML += element.Hora;
            stringHTML += string6E;
            stringHTML += element.Sintomas;
            stringHTML += string7E;
            stringHTML += element.Diagnostico;
            stringHTML += string8E;
            stringHTML += element.Tratamiento;
            stringHTML += string9E;
            stringHTML += element.id+","+ '"' + element.Nombre+ '"'+","+element.Edad+","+ '"' +element.Fecha+ '"' + ","+'"'+element.Hora+'"'+","+'"'+element.Sintomas+'"'+","+'"'+element.Diagnostico+'"'+","+'"'+element.Tratamiento + '"';
            stringHTML += string10E;
            $('#lista2').append(stringHTML);
            console.log(stringHTML);
        })
    }).catch((error) =>{
        console.log("Error al consultar base de datos: " + error);
    })
}

//LISTO!!!
var addUserProyecto = () =>{
    var URL = baseURL + "/addPatient";

    var datos = {
        Nombre : txtNombreAgregar.value,
        Edad : Number(txtEdadAgregar.value),
        Fecha: txtFechaAgregar.value,
        Hora: txtHoraAgregar.value,
        Sintomas: txtSintomasAgregar.value,
        Diagnostico: txtDiagnosticoAgregar.value,
        Tratamiento: txtTratamientoAgregar.value
    }
    console.log(JSON.stringify(datos));

    txtNombreAgregar.value = null;
    txtEdadAgregar.value = null;
    txtFechaAgregar.value = null;
    txtHoraAgregar.value = null;
    txtSintomasAgregar.value = null;
    txtDiagnosticoAgregar.value = null;
    txtTratamientoAgregar.value = null;

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
    }).catch((error) =>{
        console.log("Error al consultar base de datos: " + error);
    })
    //getAllUsers();
}

//LISTO!!!
var updateUserProyecto = (ID) =>{
    var URL = baseURL + "/updateUserProyecto";
    //Me quedé aqui
    var datos = {
        id: ID,
        Nombre : txtNombreActualizar.value,
        Edad : Number(txtEdadActualizar.value),
        Fecha: txtFechaActualizar.value,
        Hora: txtHoraActualizar.value,
        Sintomas: txtSintomasActualizar.value,
        Diagnostico: txtDiagnosticoActualizar.value,
        Tratamiento: txtTratamientoActualizar.value
    }
    console.log(JSON.stringify(datos));

    fetch(URL,
        {
            method : "PUT",
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
    }).catch((error) =>{
        console.log("Error al consultar base de datos: " + error);
    })
    $('#lista2').empty();
    getUsersByNombreProyecto2();
}

//LISTO!!!
var eliminar = function(id){
    var URL = baseURL + "/deleteUserProyecto/" + id;
    fetch(URL,
        {
            method: "DELETE"
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        alert(data);
    }).catch((error) =>{
        console.log("Error al consultar base de datos: " + error);
    })

    $('#lista').empty();
}

//LISTO
var plantilla = function(ID,NOMBRE,EDAD,FECHA,HORA,SINTOMAS,DIAGNOSTICO,TRATAMIENTO){
    $('#lista2').empty();
    formulario = formularioBase;
    formulario += ID + plantilla9;
    $('#lista2').append(formulario);

    txtNombreActualizar = document.getElementById("txtNombreActualizar");
    txtEdadActualizar = document.getElementById("txtEdadActualizar");
    txtFechaActualizar = document.getElementById("txtFechaActualizar");
    txtHoraActualizar = document.getElementById("txtHoraActualizar");
    txtSintomasActualizar = document.getElementById("txtSintomasActualizar");
    txtDiagnosticoActualizar = document.getElementById("txtDiagnosticoActualizar");
    txtTratamientoActualizar = document.getElementById("txtTratamientoActualizar");

    IDactualizar = ID;
    txtNombreActualizar.value = NOMBRE;
    txtEdadActualizar.value = EDAD;
    txtFechaActualizar.value = FECHA;
    txtHoraActualizar.value = HORA;
    txtSintomasActualizar.value = SINTOMAS;
    txtDiagnosticoActualizar.value = DIAGNOSTICO;
    txtTratamientoActualizar.value = TRATAMIENTO;

    txtNombreActualizar.disabled = true;
    txtEdadActualizar.disabled = true;
    txtFechaActualizar.disabled = true;
    txtHoraActualizar.disabled = true;
}


