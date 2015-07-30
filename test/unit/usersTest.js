'use strict';

var test = require('tape');
var sinon = require('sinon');
var rewire = require('rewire');
var users = rewire('../../lib/users');

test('Creating a user throws error if username is already taken', function (t) {
	var revert = users.__set__('User', { findOne: sinon.stub().yields(null, {})});

	users.createUser({ username: 'andrew', password: 'password'}, function (err, user) {
		t.equal(err.message, 'User "andrew" already exists');
		t.end();
		revert();
	});
});

test('Creating a user returns the user if it does not exist', function (t) {
	function UserStub(attrs) {
		this.save = sinon.stub().yields(null, attrs);
	}
	UserStub.findOne = sinon.stub().yields(null, undefined);

	var r1 = users.__set__('User', UserStub);
	var r2 = users.__set__('credential', { hash: sinon.stub().yields(null, {}) });

	users.createUser({ username: 'andrew', password: 'password' }, function (err, user) {
		t.error(err, 'no error');
		t.equal(user.username, 'andrew');
		t.deepEqual(user.password, {});
		t.end();
		r1();
		r2();
	});
});

test('Finds user with correct username and password', function (t) {
	var r1 = users.__set__('User', { findOne: sinon.stub().yields(null, {}) });
	var r2 = users.__set__('credential', { verify: sinon.stub().yields(null, true) });

	users.findUser({ username: 'andrew', password: 'password' }, function (err, user)  {
		t.error(err, 'no error');
		t.ok(user, 'found user');
		t.end();
		r1();
		r2();
	});
});