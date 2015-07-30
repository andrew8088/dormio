'use strict';
var qconf  = require('qconf');
var config = require('./config.json');
var env    = process.env.NODE_ENV;

module.exports = qconf(config[env]);