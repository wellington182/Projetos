var express = require('express');
var HomeController = require('../controllers/home-controller');
var UsuariosController = require('../controllers/usuarios-controller');
var router = express.Router();


/* GET home page. */
router.get('/', HomeController.index);
router.get('/usuario', HomeController.usuario);

router.head('/usuarios.json', UsuariosController.head);
router.get('/usuarios.json', UsuariosController.todos);
router.post('/usuarios.json', UsuariosController.criar);
router.options('/usuarios.json', UsuariosController.options);
router.get('/usuarios/:id', UsuariosController.porID);
router.put('/usuarios.json', UsuariosController.atualizar);
router.patch('/usuarios/:id', UsuariosController.atualizarPorID);
router.delete('/usuarios/:id', UsuariosController.excluirPorID);
router.options('/usuarios/:id', UsuariosController.options);

module.exports = router;
