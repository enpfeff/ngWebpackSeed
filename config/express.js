var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var config = require('./config');

module.exports = function() {
    var app = express();

    app.use(function(req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    // view engine setup
    app.set('view engine', 'ejs');
    app.set('views', path.join('./app/views'));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(express.static(path.resolve('./dist')));

    _.forEach(config.getGlobbedFiles('./app/routes/**/*.js'), function(routePath) {
         require(path.resolve(routePath))(app);
    });

    // catch 500
    app.use(function(err, req, res, next) {
        if (!err) {
            return next();
        }
        console.log(err.stack);

        res.status(500).render('500', {
            error: err.stack
        });
    });

    // catch 404 and forward to error handler
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });


    return app;
};
