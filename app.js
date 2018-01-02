// Required Packages
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var router        = express.Router();
var mysql         = require('mysql');
var expressValidator = require('express-validator');

// Required Route Files
var index         = require('./routes/index');
var users         = require('./routes/users');
var login         = require('./routes/login');
var signin        = require('./routes/signin');
var kpi        = require('./routes/kpi');

// Default app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');
app.set('view engine', 'pug');

// Use the required
// packages
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

// routes
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/signin', signin);
app.use('/kpi', kpi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
