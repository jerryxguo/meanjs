'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MenuSchema = new Schema({
	
	title: {
		type: String,
		trim: true,
		required: true
	},
	link: {
		type: String,
		trim: true,		
	},
	class: {
		type: String,		
		trim: true
	},
	highlightClass: {
		type: String,		
		trim: true
	},
	subClass: {
		type: String,		
		trim: true
	},
	position: {
		type: Number,
		default: 0,		
	},
	hasChild: {
		type: Boolean,
		default: false,		
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Menu', MenuSchema);

var ItemSchema = new Schema({
	
	title: {
		type: String,
		trim: true,
		required: true
	},
	link: {
		type: String,
		trim: true,		
	},
	class: {
		type: String,		
		trim: true
	},
	highlightClass: {
		type: String,		
		trim: true
	},
	position: {
		type: Number,
		default: 0,		
	},
	menu: {
		type: Schema.ObjectId,
		ref: 'Menu'
	}
});

mongoose.model('Item', ItemSchema);

