var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var base = require('./routes/base');
var users = require('./routes/users');
var api = require('./routes/api');
var auth = require('./routes/auth');
//var jwtMiddleware = require('./middleware/jwtauth.js');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var app = express();
var jwtTokenSecret = 'ENGAGE_6383_5587_RSNS';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/', base);
app.use('/auth', auth);
app.use('/users', users);
app.use('/api', jwt({
    secret: jwtTokenSecret
}), api);
app.all('/login*', function(req, res) {
    res.render('index');
});

/*app.all('/app*', function(req, res) {
    res.render('index');
});*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('Successfully Connected to Local Mongo!');
});

module.exports = app;