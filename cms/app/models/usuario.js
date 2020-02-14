var db = require('../../config/db');

function Usuario() {
    this.id = 0;
    this.nome = "";
    this.login = "";
    this.senha = "";
    this.email = "";

    this.salvar = function() {
        var query = "";

        // Valores undefined, null, 0, "" e NaN se convertem para false
        if (!this.id) {           
            query = "INSERT INTO CMS.usuarios(nome, login, senha, email) VALUES ('" + this.nome + "', '" + this.login+ "', '" + this.senha + "', '" + this.email + "');";

            db.cnn.exec(query, function(rows, err) {
                if (err) {
                    console.log('-------------ERRO ao incluir dados de usuários---------------\n' + err);
                    return;
                }

                console.log("Usuário incluído com sucesso.");
            });
           
        }
        else {
            // TODO: atualizar na base de dados
        }
    };
}

module.exports = Usuario;