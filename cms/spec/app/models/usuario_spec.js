var Usuario = require('../../../app/models/usuario');

describe("O modelo de usuário", function() {
    describe("com o atributo", function() {        
        it("id deve ser válido", function() {
            var usuario = new Usuario();
            expect(usuario.id).toBe(0);
        });

        it("nome deve ser válido", function() {
            var usuario = new Usuario();
            expect(usuario.nome).toBe("");
        });

        it("login deve ser válido", function() {
            var usuario = new Usuario();
            expect(usuario.login).toBe("");
        });

        it("senha deve ser válido", function() {
            var usuario = new Usuario();
            expect(usuario.senha).toBe("");
        });

        it("email deve ser válido", function() {
            var usuario = new Usuario();
            expect(usuario.email).toBe("");
        });
    });

    describe("com o método salvar", function() {
        it("deve incluir no banco de dados", function(done) {
            var usuario = new Usuario();
            usuario.nome = "Welinson Fabrício";
            usuario.login = "cabowelinson";
            usuario.senha = "cabo";
            usuario.email = "cabowelinson@gmail.com";

            usuario.salvar(function(retorno) {
                expect(retorno.erro).toBe(false);
                done();
            });
        });
    });

    describe("com o método excluirTodos", function() {
        it("deve excluir todos os usuários", function(done) {
            Usuario.excluirTodos(function(retorno) {
                expect(retorno.erro).toBe(false);
                done();
            });
        });
    });

    describe("com o método todos", function() {
        it("deve retornar todos os usuários", function(done) {
            Usuario.excluirTodos(function(retorno) {

                var usuario = new Usuario();
                usuario.nome = "Welinson Fabrício";
                usuario.login = "cabowelinson";
                usuario.senha = "cabo";
                usuario.email = "cabowelinson@gmail.com";

                usuario.salvar(function(retorno1) {
                    Usuario.todos(function(retorno2) {
                        expect(retorno2.erro).toBe(false);
                        expect(retorno2.usuarios.length).toBe(1);
                        done();
                    });                                  
                });

            });
        });
    });

    describe("com o método buscarPorID", function() {
        it("deve retornar o usuário pelo seu ID", function(done) {
            
            Usuario.truncate(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Welinson Fabrício";
                usuario.login = "cabowelinson";
                usuario.senha = "cabo";
                usuario.email = "cabowelinson@gmail.com";
    
                usuario.salvar(function(retorno1) {                    
                    Usuario.buscarPorID(1, function(retorno2) {
                        expect(retorno2.erro).toBe(false);
                        expect(retorno2.usuario.id).toBe(1);
                        done();
                    });
                });
            });
        });
    });

    describe("com o método excluirPorID", function() {
        it("deve excluir o usuário pelo seu ID", function(done) {
            
            Usuario.truncate(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Welinson Fabrício";
                usuario.login = "cabowelinson";
                usuario.senha = "cabo";
                usuario.email = "cabowelinson@gmail.com";
    
                usuario.salvar(function(retorno1) {                    
                    Usuario.excluirPorID(1, function(retorno2) {
                        expect(retorno2.erro).toBe(false);
                        done();
                    });
                });
            });
        });
    });

    describe("com o método salvar para atualizar", function() {
        it("deve atualizar o usuário criado", function(done) {
            
            Usuario.excluirTodos(function(retorno) {
                var usuario = new Usuario();
                usuario.nome = "Welinson Fabrício";
                usuario.login = "cabowelinson";
                usuario.senha = "cabo";
                usuario.email = "cabowelinson@gmail.com";
                
                usuario.salvar(function(retorno1) {
                    Usuario.todos(function(retorno2) {
                        usuarioUpdate = retorno2.usuarios[0];
                        usuarioUpdate.nome = "Welinson Fabrício da Silva";
                        
                        var usuario = new Usuario(usuarioUpdate);
                        usuario.salvar(function(retorno3) {
                            expect(retorno3.erro).toBe(false);
                            done();
                        });
                    });                    
                });
            });
        });
    });
    
    describe("com o método buscarPorNome", function() {
        it("deve retornar o usuários pelo seu Nome", function(done) {
            
            Usuario.excluirTodos(function(retorno) {
                var usuario = new Usuario({nome: "Welinson Fabrício", login: "cabowelinson", senha: "cabo", email: "cabowelinson@gmail.com"});
                
                usuario.salvar(function(retorno1) { 
                    var usuario2 = new Usuario({nome: "Wellington Fernando", login: "prico182", senha: "prico182", email: "prico182@gmail.com"});
                    usuario2.salvar(function(retorno2) {
                        Usuario.buscarPorNome("br", function(retorno3) {
                            expect(retorno3.erro).toBe(false);
                            expect(retorno3.usuarios.length).toBe(1);
                            expect(retorno3.usuarios[0].nome).toBe("Welinson Fabrício");
                            done();
                        });
                    });  
                });
            });
        });
    }); 

});