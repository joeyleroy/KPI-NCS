// users.js - users route module

var express = require('express');
var router = express.Router();
var orm         = require('orm');
// var mysql = require('mysql');
// var myConnect = require('./connections/mysql_query.js')
// var bodyParser = require('body-parser');

var sqlUser = "root";
var sqlPass = "joey5639";
var sqlURL  = "localhost";
var sqlPort = '3306';
var sqlData = "db_users";
var sqlConn = `mysql://${sqlUser}:${sqlPass}@${sqlURL}:${sqlPort}/${sqlData}`;
// Datatable
var kpi_data = 'kpi_data';
var kpi_clientrating = 'kpi_clientrating';
var kpi_ncsrating = 'kpi_ncsrating';
var kpi_users = 'kpi_users';

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));


router.use(orm.express(sqlConn, {
  define: function (db, models, next) {
    models.kpi_data = db.define(kpi_data, {
      id                : { type: 'serial', key: true },
      operatorname      : String,
      customername      : String,
      wellname          : String,
      accountmgr        : String,
      quotenumber       : String,
      jobtype           : String,
      date              : String,
      fsonumber         : String,
      formation         : String
    });
    models.kpi_ncsrating = db.define(kpi_ncsrating, {
      id                : { type: 'serial', key: true },
      date            : String,
      fsonumber       : String,
      quotenumber     : String,
      hse             : String,
      personnel       : String,
      product         : String,
      service         : String,
      support         : String,
      technology      : String
    });
    models.kpi_clientrating = db.define(kpi_clientrating, {
      id                : { type: 'serial', key: true },
      date            : String,
      fsonumber       : String,
      quotenumber     : String,
      hse             : String,
      personnel       : String,
      product         : String,
      service         : String,
      support         : String,
      technology      : String
    });
    next();
  }
}));

router.post('/', function(req, res, next) {
  var fsonum = req.body.kpinumber;
  var result = req.models.kpi_data.find({ fsonumber: fsonum }, function(error, kpi) {
    if(error) throw error;
    console.log('The result is: ', kpi[0]);
    console.log('A piece = ' + kpi[0]['wellname']);
    // var id        = kpi[0]['id'];
    // var operatorname = kpi[0]['operatorname'];
    // var customername  = kpi[0]['customername'];
    // var wellname     = kpi[0]['wellname'];
    // var accountmgr      = kpi[0]['accountmgr'];
    // var quotenumber  = kpi[0]['quotenumber'];
    // var jobtype  = kpi[0]['jobtype'];
    // var date  = kpi[0]['date'];
    // var fsonumber  = kpi[0]['fsonumber'];
    // var formation  = kpi[0]['formation'];
    var myKPI = JSON.stringify(kpi);

    res.render('kpi2', { kpi: kpi });
  });
  // console.log('result = ' + kpi);
  // console.log('JSON result = ' + JSON.stringify(kpi));
  // res.render('kpi2', { kpi: kpi });
});

router.get('/', function(req, res, next) {
    res.render('kpi');
});

module.exports = router;