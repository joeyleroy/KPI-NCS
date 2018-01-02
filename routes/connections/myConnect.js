// require mysql
'use strict';
var mysql = require('mysql')

// set up and configure the connection pool
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'joey5639',
  database: 'node',
  debug: false
})

// handle requests to the connection
exports.getQRY = function(req, res) {
    pool.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error connecting to the database"});
            return;
        }

        // query variables
        var condition1 = 'user';
        var condition2 = 'password';
        var input1 = 'sbrooks'; // req.input1
        var input2 = '12345678'; // req.input2
        var inserts = [input1];
        // var sql = "SELECT * FROM 'login' where ?=? AND ?=?";
        var sql = "SELECT * FROM login WHERE user = ?";
        sql = mysql.format(sql, inserts);
        console.log(sql);

        //run query
        connection.query(sql, function(err, rows) {
            connection.release();
            if(!err) {
                if(rows!="") {
                    console.log('Returning: ' + rows);
                    res = rows;
                    return;
                } else {
                    return '{"code" : 100, "status" : "no records found"}';
                }
            } else {
                return '{"code" : 100, "status" : "Error conpleting the query"}';
            }
        });
    });
}