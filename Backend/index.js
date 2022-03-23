'use strict'
//bbdd connection
var mongoose = require('mongoose');
var app = require ('./app');
var port =  3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:12345_aA@marcdb.mcdaz.mongodb.net/Hokeydb?retryWrites=true&w=majority')
        .then(() =>{
            console.log("Data Base is connected");

          app.listen(port, () =>{
              console.log("Server OKAY");
          })

        })
        .catch( err => console.log(err));
