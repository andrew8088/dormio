'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

module.exports = function () {
	passport.serializeUser(function (user, done) { done(null, user); });
	return express()
		.use(bodyParser.urlencoded({ extended: true }))
		.use(bodyParser.json())
		.use(passport.initialize());
};