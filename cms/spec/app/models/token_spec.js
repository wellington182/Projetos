var Token = require('../../../app/models/token');

describe("O modelo de token", function() {
    describe("com o atributo", function() {        
        it("id deve ser válido", function() {
            var token = new Token();
            expect(token.id).toBe(0);
        });

        it("token precisa ser válido", function() {
            var token = new Token();
            expect(token.token).toBe("");
        });        
    });

    describe("com o método criar", function() {
        it("deve criar no banco de dados", function(done) {
            new Token().criar(function(retorno) {
                expect(retorno.erro).toBe(false);
                expect(retorno.token).not.toBe("");

                done();
            });
        });
    });

    describe("com o método verificaToken", function() {
        it("deve retornar false para um token inválido", function(done) {
            Token.verificaToken("tokinInvalido", function(retorno) {
                expect(retorno.erro).toBe(false);
                expect(retorno.tokenValido).toBe(false);
                done();
            });
        });
    });

    describe("com o método apagarToken", function() {
        it("deve excluir um token", function(done) {
            new Token().criar(function(retornoCriar) {
                var token = retornoCriar.token;

                Token.apagarToken(token, function(retornoApagar) {
                    Token.verificaToken(token, function(retornoVerifica) {
                        expect(retornoVerifica.erro).toBe(false);
                        expect(retornoVerifica.tokenValido).toBe(false);
                        done();
                    });
                });
            });
        });
    });
});