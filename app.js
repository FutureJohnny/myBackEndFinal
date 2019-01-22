const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');
const testing = require('./config/testdatabase');

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api'); // Declare variable for API route

const app = express();

// Add Cors support before any routing
app.use(function(reg, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization'); // Have to expose so that browser have
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next();
});
app.use(passport.initialize());

// Connection to MongoDB wrapped in try catch block
try {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    if (process.env.NODE_ENV === 'test') {
        console.log("*******************");
        console.log("Using test database");
        console.log("*******************");
        mongoose.connect(config.database);
    }
    else {
        console.log("*******************");
        console.log("Using live database");
        console.log("*******************");
        mongoose.connect(config.database);
    }
}
catch(e) {
  console.log(e.message);
}

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.use('/api', api);
app.use('/users', users);

app.get('/', function(reg, res) {
  res.send('Page under construction.')
})

// Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;