// loginConnection.js
var express     = require('express');
var router      = express.Router();
var orm         = require('orm'); // Object Relational Mapping

// Modify mySQL connection through variables
var sqlUser = "test"; // mySQL server login user name
var sqlPass = "test"; // mySQL server login password
var sqlURL  = "localhost"; // IP or URL of the mySQL server
var sqlPort = '3306'; // Port of the mySQL server
var sqlData = "node"; // Name of the targeted database
var sqlConn = `mysql://${sqlUser}:${sqlPass}@${sqlURL}:${sqlPort}/${sqlData}`; // Assembled connection string
var sqlTabl = 'login'; // Name of the tartgeted datatable

// mySQL Connection
router.use(orm.express(sqlConn, {
    define: function (db, models, next) {
        models.person = db.define(sqlTabl, {
            id          : { type: 'serial', key: true },
            firstname   : String,
            lastname    : String,
            email       : String,
            user        : String,
            password    : String,
            recovery    : String,
        });
        next();
    }
}));
module.exports = router;