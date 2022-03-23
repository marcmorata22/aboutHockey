'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos rutas
var productsRoutes = require ('./routes/productsRout');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//rutas
app.use('/api', productsRoutes);

app.get('/', (req, res)=> {
  res.status(200).send(
    "<h1>Welcome Marc</h1>"
  );
});/*
app.get('/test', (req, res)=> {
  res.status(200).send({
    message:"Hola mundo test"
  });
});
app.post('/testPost', (req, res)=> {
  console.log(req.query.hi + " " +req.body.name + " " + req.body.lastname);
  res.status(200).send({
    message:"Exemple Post"
  });
});*/

//exportar
module.exports = app;
