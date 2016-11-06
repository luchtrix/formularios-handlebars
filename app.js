/* BLOQUE UNO DE DEPENDECIAS */
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
var server = http.createServer(app);
var handlebars = require('express-handlebars');
//usando middleware (body parser) para recibir datos del formulario
var bodyParser = require('body-parser');
//Persistencia de datos
var mongoDb = [];

/* BLOQUE DOS DE CONFIGURACION DE EXPRESS*/
//configuracion del Nombre de la APlicacion
app.set("miAplicacion","TRAFFCITY");
//configuracion de puerto
app.set("port", process.env.PORT || 3000);
//configuracion de vistas
app.set('views', path.join(__dirname, 'views'));
// me he equivocado en la configuracion, recuerda que para configurar un motor se usa app.engine
app.engine('handlebars', handlebars({
	"defaultLayout": "main"
}));
// ya lo unico que falta es simplemente es ejecutar la app , dale y dime los errores :D
app.set('view engine','handlebars');

/*BLOQUE MIDDLEWARES - ANTES DE LAS RUTAS */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//listo probemos al fin nuestro server
// primero crea un folder views en la ruta del proyecto----ok

/* BLOQUE TRES DE RUTAS DEL PROYECTO */
app.get('/', function(req, res){
  //este es el error, el que renderiza no es la app es la respuesta
  res.render('index', { alertas: mongoDb });
  //res.render('index');
});

app.post('/ciudadano-alerta', function(req, res){
  //res.render('alert')
  //console.log(req.body.question);
  //res.end();
  mongoDb.push(req.body.question);
  res.redirect('/');
  
});

app.get('/alert', function(req, res){
  res.render('alert')
});


/* BLOQUE CUATRO DE INICIALIZCION */
server.listen(app.get("port"),function() {
	console.log("Servidor de "+app.get("miAplicacion")+" inicializado en el puerto "+app.get("port"));
});

