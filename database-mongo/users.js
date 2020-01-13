var Promise = require('bluebird');
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);
