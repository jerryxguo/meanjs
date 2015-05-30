'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/api/menus/').get(core.list);
	app.route('/api/menus/add').post(core.create);
};
