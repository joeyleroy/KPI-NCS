// signin.js
'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('route /signin with GET detected...');
    res.send('respond with a resource');
});

router.post('/signin', function(req, res, next) {
  console.log('route /signin with POST detected...');
  res.send('respond with a resource');
})

module.exports = router;