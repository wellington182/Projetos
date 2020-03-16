var db = require('../../config/db');

function Usuario(usuario) {
    if (usuario !== undefined) {
        this.nome = usuario.nome;
        this.login = usuario.login;
        this.senha = usuario.senha;
        this.email = usuario.email;
    }
    else {
        this.id = 0;
        this.nome = "";
        this.login = "";
        this.senha = "";
        this.email = "";
    }
    

    this.salvar = function(callback) {
        var query = "";

        // Valores undefined, null, 0, "" e NaN se convertem para false
        if (!this.id) {           
            query = "INSERT INTO CMS.usuarios(nome, login, senha, email) VALUES ('" + this.nome + "', '" + this.login+ "', '" + this.senha + "', '" + this.email + "');";

            db.cnn.exec(query, function(rows, err) {
                if (err) {
                    // console.log('-------------ERRO ao incluir dados de usuários---------------\n' + err);
                    callback.call(null, {erro: true, message: err.message});
                }
                else {
                    // console.log("Usuário incluído com sucesso.");
                    callback.call(null, {erro: false});
                }
            });
           
        }
        else {
            query = "UPDATE CMS.usuarios SET nome='" + this.nome + "', login='" + this.login+ "', senha='" + this.senha + "', email='" + this.email + "' WHERE id='" + this.id + "';";

            db.cnn.exec(query, function(rows, err) {
                if (err) {
                    // console.log('-------------ERRO ao atualizar dados de usuário---------------\n' + err);
                    callback.call(null, {erro: true, message: err.message});
                }
                else {
                    // console.log("Usuário atualizado com sucesso.");
                    callback.call(null, {erro: false});    
                }
            });
        }
    };
}

Usuario.excluirTodos = function(callback) {
    var query = "DELETE FROM usuarios;";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            // console.log('-------------ERRO ao excluir todos os usuários---------------\n' + err);
            callback.call(null, {erro: true, message: err.message});
        }
        else {
            // console.log("Usuários exclúidos com sucesso.");
            callback.call(null, {erro: false});
        }
    });
};

Usuario.truncate = function(callback) {
    var query = "TRUNCATE usuarios;";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            // console.log('-------------ERRO ao excluir todos os usuários---------------\n' + err);
            callback.call(null, {erro: true, message: err.message});
        }
        else {
            // console.log("Usuários exclúidos com sucesso.");
            callback.call(null, {erro: false});
        }
    });
};

Usuario.todos = function(callback) {
    query = "SELECT * FROM usuarios;";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            // console.log('-------------ERRO ao excluir todos os usuários---------------\n' + err);
            callback.call(null, {erro: true, message: err.message, usuarios: []});
        }
        else {
            // console.log("Usuários exclúidos com sucesso.");
            callback.call(null, {erro: false, usuarios: rows});
        }
    });
};

Usuario.buscarPorID = function(id, callback) {
    var query = "SELECT * FROM usuarios WHERE id = " + id + ";";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            callback.call(null, {erro: true, message: err.message, usuario: {}});
        }
        else {
            if (rows.length > 0) {
                callback.call(null, {erro: false, usuario: rows[0]});
            }
            else {
                callback.call(null, {erro: false, usuario: {}});
            }
        }
    });
};

Usuario.excluirPorID = function(id, callback) {
    var query = "DELETE FROM usuarios WHERE id = " + id + ";";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            callback.call(null, {erro: true, message: err.message});
        }
        else {
            callback.call(null, {erro: false});
        }
    });
};

Usuario.buscarPorNome = function(nome, callback) {
    var query = "SELECT * FROM usuarios WHERE nome LIKE '%" + nome + "%';";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            callback.call(null, {erro: true, message: err.message, usuarios: []});
        }
        else {
            if (rows.length > 0) {
                callback.call(null, {erro: false, usuarios: rows});
            }
            else {
                callback.call(null, {erro: false, usuarios: []});
            }
        }
    });
};

module.exports = Usuario;