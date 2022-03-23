'use strict'
//API routes
var express = require('express');
var ProductsController = require('../controllers/productsController');

var router = express.Router();


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });


router.get('/home', ProductsController.home);
router.post('/test', ProductsController.test);
router.post('/saveProducts', ProductsController.saveProducts);
router.get('/getProductsById/:id?', ProductsController.getProductsById);
router.get('/getProducts', ProductsController.getProducts);
router.put('/updateProduct/:id', ProductsController.updateProduct);
router.delete('/deleteProduct/:id', ProductsController.deleteProduct);
router.post('/uploadImage/:id', multipartMiddleware,  ProductsController.uploadImage);

module.exports = router;
