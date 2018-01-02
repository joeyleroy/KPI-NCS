// login.js
'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var myConnect = require('./connections/mysql_query.js')

const session = require('express-session');
// Home page route
// router.get('/', function (req, res) {
//   res.send('Login home page. Should be attached to a Pug form file.');
// })


// Home page route
router.get('/', function (req, res) {
  res.render('index');
})

// recovery page route
router.get('/recovery', function (req, res) {
  res.render('recovery');
})

// Login Form submit via post request
router.post('/', function(req, res, next) {
  req.checkBody('user', 'Invalid name').isAlpha().notEmpty('Cannot be blank');
  req.checkBody('password', 'Cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log('Validation Errors');
    console.log(errors);
    // render form with errors
    // res.render('index', { title: 'Invalid Login', loginAttempt: loginAttempt, errors: errors });
    res.render('index', { errors: errors });
    return;
  } else {
    console.log('Validation Pass');
    // process request
    var sql = 'SELECT * FROM login WHERE ?? = ? AND ?? = ?';
    var insert1 = 'user';
    var insert2 = req.body.user;
    var insert3 = 'password';
    var insert4 = req.body.password;
    var inserts = [insert1, insert2, insert3, insert4];
    
    sql = mysql.format(sql, inserts);
    // Execute query
    myConnect.executeQuery(sql, function(result){
      if(Object.keys(result).length < 1) {
        console.log('Result empty');
        res.render('index');
      } else {
        console.log('Result has data');
        res.render('signin');
      }
      console.log('Result = ' + JSON.stringify(result));
    });
  }
  // res.render('signin');
})

module.exports = router;