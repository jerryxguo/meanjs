'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	//menu routing
	app.route('/menus')
		.get(core.menuList)
		.post(core.menuCreate);

	app.route('/menus/:menuId')		
		.delete(core.menuDelete);

	//item routing
	app.route('/items')
		.get(core.itemList)
		.post(core.itemCreate);

	app.route('/items/:itemId')		
		.delete(core.itemDelete);
	// Finish by binding the article middleware
	// Finish by binding the article middleware
	app.param('menuId', core.menuByID);
	app.param('itemId', core.itemByID);
		
};
