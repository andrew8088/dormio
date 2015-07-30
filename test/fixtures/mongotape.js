'use strict';
var env = require('../../env');

module.exports = require('mongotape')({
	mongoose: require('mongoose'),
	models: '../../lib/models/*',
	env: env.get.bind(env)
});