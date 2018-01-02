'use strict';
// require mysql
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

var executeQuery = function(qry, callback) {
    pool.getConnection(function(err, connection) {
        if(err) {
            callback( 'Error connecting to database...' );
        } else {
            connection.query(qry, function(err, rows, fields){
                if(err) {
                    console.log('Error executing query...')
                    callback( 'Error executing query...' );
                } else {
                    callback( rows );
                }
            })
        }
        connection.release();
    })
}

exports.executeQuery = executeQuery;