'use strict';

const { loggerFactory } = require('./loggerFactory');

const logAndTerminate = require('./logAndTerminate');

// 1. Do not log multiple times if different versions of this module are required in the project
// 2. Do not catch exceptions when running Mocha tests
if (process.listenerCount('uncaughtException') === 0 && !global.suite) {
  process.on('uncaughtException', logAndTerminate);
  process.on('unhandledRejection', logAndTerminate);
}

module.exports = loggerFactory;
