var express = require('express');
var HomeController = require('../controllers/home-controller');
var router = express.Router();


/* GET home page. */
router.get('/', HomeController.index);
router.get('/usuario', HomeController.usuario);

module.exports = router;
