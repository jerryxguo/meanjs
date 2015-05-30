'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Menu = mongoose.model('Menu'),
	_ = require('lodash');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.create = function(req, res) {
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
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.menu);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var menu = req.menu;

	menu = _.extend(menu, req.body);

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
 * Delete an article
 */
exports.delete = function(req, res) {
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
 * List of Articles
 */
exports.list = function(req, res) {
	Menu.find().sort('-created').populate('user', 'displayName').exec(function(err, menu) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(menu);
		}
	});
};