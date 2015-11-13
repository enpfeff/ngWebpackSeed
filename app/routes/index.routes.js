module.exports = function(app) {
    var controller = require('../controllers/index.controller');
    app.route('/').get(controller.index);
};
