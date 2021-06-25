var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Motorcycle = mongoose.model('Motorcycle');
var csvfile = __dirname + "/../public/files/MotorcycleData.csv";
var stream = fs.createReadStream(csvfile);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Importando arquivo CSV usando NodeJS.' });
});

module.exports = router;
