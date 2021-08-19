'use strict';

// Parse environment variable LOG_LEVEL if set, overwrites LOG_LEVELS
require('./parseLogLevelEnv')();

const { flaschenpost } = require('flaschenpost');

const logAndTerminate = require('./logAndTerminate');
const getMiddleware = require('./getMiddleware');

// 1. Do not log multiple times if different versions of this module are required in the project
// 2. Do not catch exceptions when running Mocha tests
if (process.listenerCount('uncaughtException') === 0 && !global.suite) {
  process.on('uncaughtException', logAndTerminate);
  process.on('unhandledRejection', logAndTerminate);
}

const defaultConfig = flaschenpost.getConfiguration();
flaschenpost.configure(
  defaultConfig.withFormatter((logEntry) => {
    logEntry.isoTimestamp = new Date(logEntry.timestamp).toISOString();
    // Temporary: If incoming metadata is not of type object, transform it.
    // This is neccessary to fit the type definitions in ELK
    if (logEntry.metadata && logEntry.metadata.err && typeof logEntry.metadata.err !== 'object') {
      logEntry.metadata.err = { message: logEntry.metadata.err.toString() };
    }
    return defaultConfig.formatter(logEntry);
  })
);
flaschenpost.Middleware = getMiddleware(flaschenpost);

module.exports = flaschenpost;
