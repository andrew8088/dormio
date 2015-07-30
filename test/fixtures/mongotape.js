'use strict';
require('dotenv').load();

module.exports = require('mongotape')({
	mongoose: require('mongoose'),
	models: '../../lib/models/*'
});