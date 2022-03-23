'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = Schema({
  name: String,
  descrip: String,
  link: String,
  img: String
});

module.exports = mongoose.model('products', productsSchema);
