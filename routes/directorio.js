var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/mail', function(req,res,next){
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // no need to set host or port etc.
        auth: {
            user: 'josue.espinosa.cruz.ivc@gmail.com',
            pass: 'harrypotter@1999'
        }
    });

   var datos = req.body;
   console.log(datos);

   transporter.sendMail({
       to: datos.Correo,
       subject: datos.Asunto,
       text: datos.Contenido,
       html: datos.Contenido
   }).then((result)=>{
       console.log(result);
       res.send(JSON.stringify(result));
   }).then((err)=>{
       console.log(err);
       res.send(JSON.stringify(err));
   })
});

var mysql = require('mysql2');
var conn = mysql.createConnection({
    host: "ec2-34-202-234-60.compute-1.amazonaws.com",
    user: "root",
    password: "Argonautas06",
    database: "ib601"
})

conn.connect(function(err){
    if(err)
    {
        console.log("Error en la base de datos: " + err);
    }
    else
    {
        console.log("Conección a MySQL establecida exitosamente");
    }
})

var lista = [];

var listaUsuarios = []

//  LISTO!!!
router.post("/validateUser", function(req, res, next){
    var credenciales = {
        usuario: req.body.Username
    }

    var query = "call stp_validateUser_proyecto3(?)";
    var parametros = [
        credenciales.usuario
    ]

    conn.query(query, parametros, function(err, results){
        if(err)
        {
            console.log("Error al consultar la base de datos (login)");
            
            res.send(JSON.stringify("Error al consultar la base de datos (login)" + err));
        }
        else
        {
            listaLogin=results[0];
            res.send(listaLogin);
        }
    })
})

//  LISTO!!!
router.post("/addUser", function(req, res, next){
    
    var usuario = {
        Nombre: req.body.Nombre,
        Correo: req.body.Correo,
        Puesto: req.body.Puesto,
        Genero: req.body.Genero,
        Turno: req.body.Turno,
        Fecha: req.body.Fecha,
        Username: req.body.Username,
        Pass: req.body.Pass
    }
    
    var query = "call stp_addUserProyecto3(?,?,?,?,?,?,?,?);";

    var datos = [
        usuario.Nombre,
        usuario.Correo,
        usuario.Puesto,
        usuario.Genero,
        usuario.Turno,
        usuario.Fecha,
        usuario.Username,
        usuario.Pass
    ]

    conn.query(query, datos, function(err, results, fields){
        if(err)
        {
            console.log("Error en la consulta 'Directorio': " + err)
        }
        else
        {
            lista = results[0];
            res.send(JSON.stringify("Usuario creado correctamente: "));
        }
    })
    
});

//  LISTO!!!
router.post("/login", function(req, res, next){
    var credenciales = {
        Username: req.body.Username,
        Pass: req.body.Pass
    }

    var envio = true;

    var query = "call stp_Login_proyecto3(?,?)";
    var parametros = [
        credenciales.Username,
        credenciales.Pass
    ]

    conn.query(query, parametros, function(err, results){
        if(err)
        {
            console.log("Error al consultar la base de datos (login)");
            
            res.send(JSON.stringify("Error al consultar la base de datos (login)" + err));
        }
        else
        {
            listaLogin=results[0];
            res.send(listaLogin);
        }
    })
})



router.get("/getUserById/:id", function(req, res, next){
    var id = Number(req.params.id);

    var query = "call getUsersById_proyecto3(?)";

    var datos=[id];

    //Consulta la base de datos
    conn.query(query, datos, function(err, results, fields){
        if(err)
        {
            console.log("Error en la consulta: " + err)
        }
        else
        {
            lista = results[0];
            res.send(lista);
        }
    })
})


router.get("/getUserNameById/:id", function(req, res, next){
    var id = Number(req.params.id);

    var query = "call getUserNameById_proyecto3(?)";

    var datos=[id];

    //Consulta la base de datos
    conn.query(query, datos, function(err, results, fields){
        if(err)
        {
            console.log("Error en la consulta: " + err)
        }
        else
        {
            lista = results[0];
            res.send(lista);
        }
    })
})

router.get("/getUsersByNombreProyecto/:Nombre/:Fecha/:Hora", function(req, res, next){
    var Nombre = req.params.Nombre;
    var Fecha = req.params.Fecha;
    var Hora = req.params.Hora;

    var query = "call getUsersByNombreProyecto(?,?,?)";

    var datos=[Nombre,Fecha,Hora];

    //Consulta la base de datos
    conn.query(query, datos, function(err, results, fields){
        if(err)
        {
            console.log("Error en la consulta: " + err)
        }
        else
        {
            lista = results[0];
            res.send(lista);
        }
    })
})


router.post("/addPatient", function(req, res, next){
    
    var usuario = {
        Nombre: req.body.Nombre,
        Edad: req.body.Edad,
        Fecha: req.body.Fecha,
        Hora: req.body.Hora,
        Sintomas: req.body.Sintomas,
        Diagnostico: req.body.Diagnostico,
        Tratamiento: req.body.Tratamiento
    }
    
    var query = "call addUserProyecto(?,?,?,?,?,?,?);";

    var datos = [
        usuario.Nombre,
        usuario.Edad,
        usuario.Fecha,
        usuario.Hora,
        usuario.Sintomas,
        usuario.Diagnostico,
        usuario.Tratamiento
    ]

    conn.query(query, datos, function(err, results, fields){
        if(err)
        {
            console.log("Error en la consulta 'Directorio': " + err)
        }
        else
        {
            lista = results[0];
            res.send(JSON.stringify("Usuario creado correctamente: "));
        }
    })
    
});


router.put("/updateUserProyecto", function(req, res, next){
    var usuario = {
        id: req.body.id,
        Nombre: req.body.Nombre,
        Edad: req.body.Edad,
        Fecha: req.body.Fecha,
        Hora: req.body.Hora,
        Sintomas: req.body.Sintomas,
        Diagnostico: req.body.Diagnostico,
        Tratamiento: req.body.Tratamiento
    }
    //Actualizar base de datos
    var datos = [
        usuario.id, 
        usuario.Nombre, 
        usuario.Edad, 
        usuario.Fecha,
        usuario.Hora,
        usuario.Sintomas,
        usuario.Diagnostico,
        usuario.Tratamiento
    ]

    var query = "call updateUserProyecto(?,?,?,?,?,?,?,?);"
    conn.query(query, datos, function(err,results,fields){
        if(err)
        {
            console.log("Error a lactualizar usuario" + err);
        }
        else{
            res.send(JSON.stringify("usuario actualizado correctamente"));
        }
        
    })
})


router.delete("/deleteUserProyecto/:id", function(req, res, next){
    var id = Number(req.params.id);

    var datos = [id];
    var query = "call deleteUserProyecto(?);"

    conn.query(query,datos, function(err, results, fields){
        if(err)
        {
            console.log("Error al eliminar usuario" + err);
        }
        else{
            res.send(JSON.stringify("Usuario eliminado correctamente"));
        }
    })
})

module.exports = router;