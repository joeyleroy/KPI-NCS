// recovery.js

var express     = require('express');
var router      = express.Router();
var orm         = require('orm');
var myConn      = require('/connections/loginConnection.js');
// recovery route
router.get('/recovery', function (req, res) {
  res.render('recovery');
})
module.exports = router;