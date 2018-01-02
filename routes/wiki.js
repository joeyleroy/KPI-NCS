// wiki.js - Wiki route module

var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function (req, res) {
  res.send('Wiki home page');
})

// About page route
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

// How to set up the Route after creating the routes>wiki.js file.
// Edit app.js
// Require the wiki.js file by assigning it to a named variable.
// var wiki = require('./routes/wiki');
// Grant access to the path with the app.use function
// app.use('/wiki', wiki);

module.exports = router;

// The Router also provides route methods for all the other HTTP verbs, that 
// are mostly used in exactly the same way: post(), put(), delete(), options(), 
// trace(), copy(), lock(), mkcol(), move(), purge(), propfind(), proppatch(), 
// unlock(), report(), ​​​​​​ mkactivity(), checkout(), merge(), m-search(), notify(), 
// subscribe(), unsubscribe(), patch(), search(), and connect().

// Example Post request
// router.post('/about', function (req, res) {
//     res.send('About this wiki');
// })