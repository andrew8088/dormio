'use strict';
var test = require('tape');
var request = require('supertest');
var mongotape = require('../fixtures/mongotape');
var server = require('../fixtures/server');

var accountRoutes = require('../../lib/routes/accounts');

mongotape(function (test) {
	test('Can signup for new accounts via form', function (t) {
		var app = server().post('/signup', accountRoutes.signup);

		request(app)
		.post('/signup')
		.type('form')
		.send({ username: 'andrew', password: 'password' })
		.end(function (err, res) {
			t.equal(res.status, 302);
			t.ok(res.redirect);
			t.end();
		});
	});

	test('Can signup for new accounts via Ajax', function (t) { 
		var app = server().post('/signup', accountRoutes.signup);

		request(app)
		.post('/signup')
		.send({ username: 'andrew', password: 'password' })
		.set('Accept', 'application/json')
		.end(function (err, res) {
			t.equal(res.body.username, 'andrew');
			t.end();
		});
	});
});