var db = require('../../config/db');
var Guid = require('guid');

function Token(token) {
    if (token !== undefined) {
        this.token = token.token;
    }
    else {
        this.id = 0;
        this.token = "";
    }
    

    this.criar = function(callback) {
        var token = Guid.raw();
        var query = "INSERT INTO CMS.token(token) VALUES ('" + token + "');";

        db.cnn.exec(query, function(rows, err) {
            if (err) {
                callback.call(null, {erro: true, token: ""});
            }
            else {
                callback.call(null, {erro: false, token: token});
            }
        });           
    };    
}

Token.verificaToken = function(token, callback) {
    var query = "SELECT * FROM CMS.token WHERE token = '" + token + "'";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            callback.call(null, {erro: true, tokenValido: false});
        }
        else {
            callback.call(null, {erro: false, tokenValido: (rows.length > 0)});
        }
    });           
};

Token.apagarToken = function(token, callback) {
    var query = "DELETE FROM CMS.token WHERE token = '" + token + "'";

    db.cnn.exec(query, function(rows, err) {
        if (err) {
            if (callback !== undefined) {
                callback.call(null, {erro: true});
            }
        }
        else {
            if (callback !== undefined) {
                callback.call(null, {erro: false});            
            }
        }
    });           
};

module.exports = Token;