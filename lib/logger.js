'use strict';

// Parse environment variable LOG_LEVEL if set, overwrites LOG_LEVELS
require('./parseLogLevelEnv')();

const { flaschenpost, asJson, getMiddleware } = require('flaschenpost');

const logAndTerminate = require('./logAndTerminate');

// 1. Do not log multiple times if different versions of this module are required in the project
// 2. Do not catch exceptions when running Mocha tests
if (process.listenerCount('uncaughtException') === 0 && !global.suite) {
  process.on('uncaughtException', logAndTerminate);
  process.on('unhandledRejection', logAndTerminate);
}

flaschenpost.configure(
  flaschenpost.getConfiguration().withFormatter((logEntry) => {
    logEntry.isoTimestamp = new Date(logEntry.timestamp).toISOString();
    return asJson(logEntry);
  })
);
flaschenpost.Middleware = function(logLevel) {
  return getMiddleware({ logLevel });
};

module.exports = flaschenpost;
