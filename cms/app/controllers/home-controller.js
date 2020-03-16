var Usuario = require('../models/usuario');

var HomeController = {
    index: function(req, res, next) {
        res.render('index', { title: 'CMS - Express' });
    },

    usuario: function(req, res, next) {
        var usuario = new Usuario();
        usuario.id = 1;
        usuario.nome = "Wellington Fernando";
        usuario.login = "prico182";
        usuario.senha = "prico182";
        usuario.email = "prico182@gmail.com";

        usuario.salvar();

        res.send("Nome: " + usuario.nome + "<br />Login: " + usuario.login + "<br />Email: " + usuario.email);
    }
};

module.exports = HomeController;