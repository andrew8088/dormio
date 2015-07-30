'use strict';
var test = require('tape');
var sinon = require('sinon');
var users = require('../../lib/users');
sinon.stub(users, 'findUser');
sinon.stub(users, 'createUser').yields(null, { username: 'andrew' });

var accountRoutes = require('../../lib/routes/accounts');

test('Creating new user accounts via AJAX', function (t) {
	var req = {
		accepts: sinon.stub().returns(false),
		body: { username: 'andrew', password: 'password' },
		login: sinon.stub().yields()
	};
	var res = { json: sinon.spy() };

	accountRoutes.signup(req, res);

	t.equal(req.login.callCount, 1);
	t.equal(res.json.firstCall.args[0].username, 'andrew');
	t.end();
});

test('Creating new user account via form', function (t) {
	var req = {
		accepts: sinon.stub().returns('html'),
		body: { username: 'andrew', password: 'password' },
		login: sinon.stub().yields()
	};
	var res = { redirect: sinon.spy() };

	accountRoutes.signup(req, res);

	t.equal(req.login.callCount, 1);
	t.equal(res.redirect.firstCall.args[0], '/');
	t.end();
});