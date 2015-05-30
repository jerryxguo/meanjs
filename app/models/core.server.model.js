'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MenuSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	caption: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	css: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Menu', MenuSchema);

