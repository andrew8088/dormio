'use strict';
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {
		first: String,
		last: String
	},
	username: String,
	password: String,
	accessToken: String,
	accessSecret: String,
	sleepData: [mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('User', userSchema);