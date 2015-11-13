/**
 * Created by ianpfeffer on 8/20/15.
 */

var glob = require('glob'),
    chalk = require('chalk');

module.exports = function() {
    var environmentConfig = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');

    if (!environmentConfig.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('No Configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.red('NODE_ENV is not defined! Using development instead'));
        }
        process.env.NODE_ENV = 'development';
    }
};