var mysql = require('mysql');
var connectionString = 'mysql://root:prico182@localhost/CMS';

var db = {};
db.cnn = {};
db.cnn.exec = function(query, callback) {
    try {
        var connection = mysql.createConnection(connectionString);
        
        connection.query(query, function(err, rows) {    
            callback(rows, err);
            connection.end();
        });    
    }
    catch(e) {
        console.log("Erro ao conectar\n" + e);
    }
};

module.exports = db;