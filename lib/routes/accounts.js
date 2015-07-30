'use strict';
var users = require('../users');

exports.signup = function (req, res, next) {
	var userAttrs = req.body;
	users.createUser(userAttrs, function (err, user) {
		if (err) return next(err);
		req.login(user, function (err) {
			if (err) return next(err);
			if(req.accepts('html')) return res.redirect('/');
			else res.json(user);
		});
	});
};