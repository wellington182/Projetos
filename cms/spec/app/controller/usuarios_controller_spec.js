var request = require("request");
var Usuario = require('../../../app/models/usuario');

describe("O Controller de usuarios", function() {
    describe("GET /usuarios.json deve retornar no serviço todos os usuarios cadastrados", function() {
        it("deve retornar status code de 200", function(done) {
            request.get("http://localhost:3000/usuarios.json", function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(200);
                }

                done();
            });

        });
    });

    describe("GET /usuarios.json?nome=br deve retornar no serviço todos os usuarios cadastrados que contenham 'br' em seu nome", function() {
        beforeEach(function(done) {
            Usuario.excluirTodos(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Welinson Fabrício";
                usuario.login = "cabo";
                usuario.senha = "shutup";
                usuario.email = "cabowelinson@gmail.com";
    
                usuario.salvar(function(retorno1) {  
                    Usuario.todos(function(retorno2) {
                        if(!retorno2.erro) {
                            usuarioCadastrado = retorno2.usuarios[0];
                        }
                        done();
                    });
                });
            });
        });

        it("deve retornar status code de 200 e retornar o Welinson Fabrício no serviço", function(done) {
            request.get("http://localhost:3000/usuarios.json?nome=br", function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(200);
                    var json = JSON.parse(response.body);
                    expect(json.length).toBe(1);
                }

                done();
            });

        });
    });

    describe("GET /usuarios/1 deve retornar no serviço somente 1 usuário", function() {
        it("deve retornar status code de 200 e retornar somente 1 usuário", function(done) {
            Usuario.truncate(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Welinson Fabrício";
                usuario.login = "cabowelinson";
                usuario.senha = "cabo";
                usuario.email = "cabowelinson@gmail.com";
    
                usuario.salvar(function(retorno1) {    
                    request.get("http://localhost:3000/usuarios/1", function(error, response, body) {
                        if (!response) {
                            console.log("Não consegui localizar o servidor");
                            expect(503).toBe(200);
                        }
                        else {
                            expect(response.statusCode).toBe(200);
                            var json = JSON.parse(response.body);
                            expect(json.id).toBe(1);
                            expect(json.nome).toBe("Welinson Fabrício");
                        }
        
                        done();
                    });

                });
            });
        });

        it("deve retornar status code de 404 para usuário não cadastrado", function(done) {
            Usuario.truncate(function(retorno) {
                request.get("http://localhost:3000/usuarios/9999", function(error, response, body) {
                    if (!response) {
                        console.log("Não consegui localizar o servidor");
                        expect(503).toBe(200);
                    }
                    else {
                        expect(response.statusCode).toBe(404);
                    }
    
                    done();
                });
            });
        });
    });

    describe("POST /usuarios.json - deve criar um usuário", function() {
        it("deve retornar status code de 201", function(done) {
            request.post({url: "http://localhost:3000/usuarios.json", form: {nome: "Wellington Fernando", login: "prico182", senha: "prico182", email: "prico182@gmail.com"}}, function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(201);
                    var json = JSON.parse(response.body);                    
                    expect(json.mensagem).toBe("Usuário criado com sucesso");
                }

                done();
            });
        });
    });

    describe("PUT /usuarios.json - deve atualizar um usuário", function() {
        var usuarioCadastrado;

        beforeEach(function(done) {
            Usuario.excluirTodos(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Usuário para atualizar";
                usuario.login = "ratata";
                usuario.senha = "tatata";
                usuario.email = "ratata@gmail.com";
    
                usuario.salvar(function(retorno1) {  
                    Usuario.todos(function(retorno2) {
                        if(!retorno2.erro) {
                            usuarioCadastrado = retorno2.usuarios[0];
                        }
                        done();
                    });
                });
            });
        });
    
        it("deve retornar status code de 200", function(done) {
            usuarioCadastrado.nome = "Usuário atualizado";  
        
            request.put({url: "http://localhost:3000/usuarios.json", form: usuarioCadastrado}, function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(200);
                    var json = JSON.parse(response.body);                    
                    expect(json.mensagem).toBe("Usuário atualizado com sucesso");

                    Usuario.buscarPorID(usuarioCadastrado.id, function(retorno) {
                        expect(retorno.usuario.nome).toBe("Usuário atualizado");
                    });
                }
                
                done();
            });
        });

        it("deve retornar status code de 400", function(done) {        
            request.put({url: "http://localhost:3000/usuarios.json", form: {}}, function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(400);
                }
                
                done();
            });
        });
    });

    describe("PATCH /usuarios/{id} - deve atualizar um usuário", function() {
        var usuarioCadastrado;

        beforeEach(function(done) {
            Usuario.excluirTodos(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Usuário para atualizar";
                usuario.login = "ratata";
                usuario.senha = "tatata";
                usuario.email = "ratata@gmail.com";
    
                usuario.salvar(function(retorno1) {  
                    Usuario.todos(function(retorno2) {
                        if(!retorno2.erro) {
                            usuarioCadastrado = retorno2.usuarios[0];
                        }
                        done();
                    });
                });
            });
        });
    
        it("deve retornar status code de 200", function(done) {
            usuarioCadastrado.nome = "Usuário atualizado"; 
        
            request.patch({url: "http://localhost:3000/usuarios/" + usuarioCadastrado.id, form: {nome: usuarioCadastrado.nome}}, function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(200);
                    var json = JSON.parse(response.body);                    
                    expect(json.mensagem).toBe("Usuário atualizado com sucesso");

                    Usuario.buscarPorID(usuarioCadastrado.id, function(retorno) {
                        expect(retorno.usuario.nome).toBe("Usuário atualizado");
                    });
                }
                
                done();
            });
        });

        it("deve retornar status code de 400", function(done) {        
            request.patch({url: "http://localhost:3000/usuarios/" + usuarioCadastrado.id, form: {}}, function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(400);
                }
                
                done();
            });
        });
    });

    describe("DELETE /usuarios/{id} - deve excluir um usuário", function() {
        var usuarioCadastrado;

        beforeEach(function(done) {
            Usuario.excluirTodos(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Usuário para atualizar";
                usuario.login = "ratata";
                usuario.senha = "tatata";
                usuario.email = "ratata@gmail.com";
    
                usuario.salvar(function(retorno1) {  
                    Usuario.todos(function(retorno2) {
                        if(!retorno2.erro) {
                            usuarioCadastrado = retorno2.usuarios[0];
                        }
                        done();
                    });
                });
            });
        });
    
        it("deve retornar status code de 204", function(done) {        
            request.delete({url: "http://localhost:3000/usuarios/" + usuarioCadastrado.id}, function(error, response, body) {
                if (!response) {
                    console.log("Não consegui localizar o servidor");
                    expect(503).toBe(200);
                }
                else {
                    expect(response.statusCode).toBe(204);
                }
                
                done();
            });
        });        
    });
});

