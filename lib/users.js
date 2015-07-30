'use strict';
var db = require('mongoose').connection;
var credential = require('credential');
var User = require('./models/user');

exports.createUser = function createUser(attrs, callback) {
	User.findOne({ username: attrs.username }, 'username', function (err, person) {
		if (err) return callback(err);
		if (person) return callback(new Error('User "' + attrs.username + '" already exists'));

		credential.hash(attrs.password, function (err, hash) {
			if (err) return callback(err);
			attrs.password = hash;
			var user = new User(attrs);
			return user.save(function (err, user) {
				if (err) return callback(err);
				return callback(null, user);
			});
		});
	});
};

exports.findUser = function getUser(username, password, callback) {
	User.findOne({ username: username }, function (err, person) {
		if (err) return callback(err);
		if (!person) return callback(null, false);
		credential.verify(person.password, password, function (err, isValid) {
			if (err) return callback(err);
			return callback(null, isValid ? person : false);
		});
	});
};