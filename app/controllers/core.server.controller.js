'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Menu = mongoose.model('Menu'),
	Item = mongoose.model('Item'),
	_ = require('lodash');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

/**
 * Create a menu
 */
exports.menuCreate = function(req, res) {
	var menu = new Menu(req.body);
	menu.user = req.user;

	menu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(menu);
		}
	});
};



/**
 * Delete a menu
 */
exports.menuDelete = function(req, res) {
	var menu = req.menu;

	menu.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(menu);
		}
	});
};

/**
 * List of menu
 */
exports.menuList = function(req, res) {
	Menu.find().sort('position').exec(function(err, menu) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(menu);
		}
	});
};

/**
 * menu middleware
 */
exports.menuByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Item is invalid'
		});
	}

	Menu.findById(id).exec(function(err, menu) {
		if (err) return next(err);
		if (!menu) {
			return res.status(404).send({
				message: 'menu not found'
			});
		}
		req.menu = menu;
		next();
	});
};

/**
 * Create an Item
 */
exports.itemCreate = function(req, res) {
	var item = new Item(req.body);
	item.menu = req.menu;
	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};



/**
 * Delete an Item
 */
exports.itemDelete = function(req, res) {
	var item = req.item;

	item.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};

/**
 * List of item
 */
exports.itemList = function(req, res) {
	
	Item.find({ menu: req.menu}).sort('position').exec(function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};

/**
 * Item middleware
 */
exports.itemByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Item is invalid'
		});
	}

	Item.findById(id).exec(function(err, item) {
		if (err) return next(err);
		if (!item) {
			return res.status(404).send({
				message: 'Item not found'
			});
		}
		req.item = item;
		next();
	});
};