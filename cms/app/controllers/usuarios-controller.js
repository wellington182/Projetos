var Usuario = require('../models/usuario');
var Token = require('../models/token');

var UsuariosController = {
    head: function(request, response, next) {
        new Token().criar(function(retorno) {
            response.header('auth_token', retorno.token);
            response.status(204).send("");
        })
    },

    todos: function(request, response, next) {
        var token = request.headers.auth_token;

        Token.verificaToken(token, function(retorno) {
            if (retorno.tokenValido) {

                Token.apagarToken(token);

                if (request.query.nome !== undefined) {
                    Usuario.buscarPorNome(request.query.nome, function(retorno) {
                        if (retorno.erro) {
                            response.status(500).send({erro: "erro ao buscar usuários por nome("+ request.query.nome + "(" + retorno.message + ")"});
                        }
                        else {
                            response.status(200).send(retorno.usuarios);
                        }
                    });
                }
                else {
                    Usuario.todos(function(retorno) {
                        if (retorno.erro) {
                            response.status(500).send({erro: "erro ao buscar usuarios (" + retorno.message + ")"});
                        }
                        else {
                            response.status(200).send(retorno.usuarios);
                        }
                    });
                }
            }
            else {
                response.status(401).send({erro: 'Token inválido, você não possui autorização para acessar esta API'});
            }
        });
    },

    porID: function(request, response, next) {
        Usuario.buscarPorID(request.params.id, function(retorno) {
            if (retorno.erro) {
                response.status(500).send({erro: "erro ao buscar o usuario ID: " + request.params.id +"(" + retorno.message + ")"});
            }
            else {
                if (retorno.usuario.nome !== undefined) {
                    response.status(200).send(retorno.usuario);
                }
                else {
                    response.status(404).send({message: "Usuário não encontrado"});
                }
            }
        });
    },

    criar: function(request, response, next) {
        var usuario = new Usuario();
        usuario.nome = request.body.nome;
        usuario.login = request.body.login;
        usuario.senha = request.body.senha;
        usuario.email = request.body.email;

        usuario.salvar(function(retorno) {
            if (retorno.erro) {
                response.status(500).send({erro: "erro ao cadastrar usuário (" + retorno.message + ")"});
            }
            else {
                response.status(201).send({mensagem: "Usuário criado com sucesso"});
            }
        });
    
    },

    atualizar: function(request, response, next) {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH');
        response.header('Access-Control-Allow-Headers', 'Content-type');

        Usuario.buscarPorID(request.body.id, function(retorno) {
            if (retorno.usuario.id === undefined) {
                response.status(400).send({erro: "Erro ao atualizar, ID de usuário não encontrado"});
            }
            else {
                if (request.body.nome === undefined || request.body.login === undefined || request.body.senha === undefined || request.body.email === undefined) {
                    response.status(400).send({erro: "Erro dados incompletos"});
                }
                else {
                    var usuario = new Usuario();
                    usuario.id = request.body.id;
                    usuario.nome = request.body.nome;
                    usuario.login = request.body.login;
                    usuario.senha = request.body.senha;
                    usuario.email = request.body.email;
            
                    usuario.salvar(function(retorno) {
                        if (retorno.erro) {
                            response.status(500).send({erro: "erro ao atualizar usuário (" + retorno.message + ")"});
                        }
                        else {
                            response.status(200).send({mensagem: "Usuário atualizado com sucesso"});
                        }
                    });
                }
            }
        });   
    },

    atualizarPorID: function(request, response, next) {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH');
        response.header('Access-Control-Allow-Headers', 'Content-type');

        Usuario.buscarPorID(request.params.id, function(retorno) {
            if (retorno.usuario.id === undefined) {
                response.status(400).send({erro: "Erro ao atualizar, ID de usuário não encontrado"});
            }
            else {
                if (request.body.nome === undefined && request.body.login === undefined && request.body.senha === undefined && request.body.email === undefined) {
                    response.status(400).send({erro: "Erro dados incompletos"});
                }
                else {
                    var usuario = new Usuario(retorno.usuario);
                    usuario.id = retorno.usuario.id;
    
                    if (request.body.nome !== undefined && request.body.nome !== "") {
                        usuario.nome = request.body.nome;
                    }
    
                    if (request.body.login !== undefined && request.body.login !== "") {
                        usuario.login = request.body.login;
                    }
    
                    if (request.body.senha !== undefined && request.body.senha !== "") {
                        usuario.senha = request.body.senha;
                    }
    
                    if (request.body.email !== undefined && request.body.email !== "") {
                        usuario.email = request.body.email;
                    }
                
                    usuario.salvar(function(retorno) {
                        if (retorno.erro) {
                            response.status(500).send({erro: "erro ao atualizar usuário (" + retorno.message + ")"});
                        }
                        else {
                            response.status(200).send({mensagem: "Usuário atualizado com sucesso"});
                        }
                    });
                }
            }
        });
    },

    excluirPorID: function(request, response, next) {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH');
        response.header('Access-Control-Allow-Headers', 'Content-type');

        Usuario.excluirPorID(request.params.id, function(retorno) {
           if (retorno.erro) {
               response.status(500).send({erro: "Erro ao excluir usuário (" + retorno.message + ")"});            
           }
           else {
               response.status(204).send("");
           }
        });
    },

    options: function(request, response, next) {
        response.status(204).send("");
    }
    
};

module.exports = UsuariosController;