'use strict'

const { link } = require('fs');
const { idText } = require('typescript');
var productObj = require('../models/productsModel');
var fs = require('fs');
//var path = require('path');

var controller = {

  //**Testting**
  home: function(req, res){
      return res.status(200).send({
        message: 'home'
      });
  },

  test: function(req, res){
    return res.status(200).send({
      message: 'test'
    });
  },

  /**Save Product **/
  saveProducts: function (req, res){
    var product = new productObj();

    var params = req.body;
    product.name = params.name;
    product.descrip = params.descrip;
    product.link = params.link;
    product.img = null;

    product.save((err, productStored) => {
        if(err) return res.status(500).send({
          message:"Saving Error"
        })

        if(!productStored) return res.status(404).send({
          message:"Failed to Save"
        })

        return res.status(200).send({product: productStored});
    });
  },

  /**get Product by ID **/
  getProductsById: function (req, res){
      var productId = req.params.id;

      if(productId == null) return res.status(404).send({
        message:"Id is null"
      });

      productObj.findById(productId, (err, product) =>{

        if(err) return res.status(500).send({
          message:"Error get Data"
        })
        //Check exist product
        if(!product) return res.status(404).send({
          message:"the Product doesn't exist"
        });

        return res.status(200).send({
          product
        });
      });
  },

  /**get Products**/
  getProducts: function (req, res){

    productObj.find({/*we can filter example:' name: roller skates ' */}).exec((err, products) =>{

      if(err) return res.status(500).send({
        message:"Error get Data"
      })
      //Check exist product
      if(!products) return res.status(404).send({
        message:"the Product doesn't exist"
      });

      return res.status(200).send({
        products
      });
    });
  },

  //**Update Product **/
  updateProduct: function (req, res){

    var productId = req.params.id;
    var updated = req.body;

    productObj.findByIdAndUpdate(productId, updated, {new:true}, (err, productUpdated) => {

      if(err) return res.status(500).send({
        message:"Error update"
      });
      //Check exist product
      if(!productUpdated) return res.status(404).send({
        message:"the Product doesn't exist"
      });

      return res.status(200).send({
        product: productUpdated
      });
    });
  },
  //**Delete Product **/
  deleteProduct: function (req, res){

    var productId = req.params.id;

    productObj.findByIdAndRemove(productId, (err, productRemoved) => {

      if(err) return res.status(500).send({
        message:"Error delete"
      });

      if(!productRemoved) return res.status(404).send({
        message:"the Product can't be delete"
      });

      return res.status(200).send({
        product: productRemoved
      });
    });
  },
  //**Save image **/
  uploadImage: function(req, res){
		var productId = req.params.id;
		var fileName = 'Image not uploaded...';

    if(req.files){
      var filePath = req.files.img.path;
      var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

      if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

      productObj.findByIdAndUpdate(productId, {img: fileName}, {new: true}, (err, productUpdated) => {

        if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

        if(!productUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});


        return res.status(200).send({product: productUpdated
        });
      });
      }
      else{
        fs.unlink(filePath, (err) => {
          return res.status(200).send({message: 'La extensión no es válida'});
        });
      }
    }
    else{
      return res.status(200).send({message: fileName
      });
    }
	}
};

module.exports = controller;
