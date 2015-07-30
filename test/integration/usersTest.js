'use strict';
var env = require('../../env');

var mongotape = require('mongotape')({
	mongoose: require('mongoose'),
	models: '../../lib/models/*',
	env: env.get.bind(env)
});

var User = require('../../lib/models/user');
var users = require('../../lib/users');

mongotape(function tests (test) {
	test('Creating a user throws error if username is already taken', function (t) {
		var attrs = { username: 'andrew', password: 'password' };
		var u = new User(attrs);
		u.save(function (err) {
			users.createUser(attrs, function (err, user) {
				t.equal(err.message, 'User "andrew" already exists');
				t.end();
			});
		});
	});

	test('Creating a user returns the user if it did not exist previously', function (t) {
		users.createUser({ username: 'andrew', password: 'password' }, function (err, user) {
			t.error(err, 'no error');
			t.equal(user.username, 'andrew');
			t.ok(user.password);
			t.end();
		});
	});

	test('Finds user with correct username and password', function (t) {
		users.createUser({ username: 'andrew', password: 'password' }, function (err, user) {
			users.findUser('andrew', 'password', function (err, user)  {
				t.error(err, 'no error');
				t.ok(user, 'found user');
				t.end();
			});
		});
	});
});