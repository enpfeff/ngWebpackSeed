/**
 * Created by ianpfeffer on 8/20/15.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    chalk = require('chalk');

//initialize express
var app = require('./config/express')();
//bind to socket
app.listen(config.port);
//expose the app
module.exports = app;

//Log init
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log('--')