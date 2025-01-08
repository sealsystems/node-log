'use strict';

const { loggerFactory } = require('./loggerFactory');

const logAndTerminate = function (err, promise) {
  if (promise) {
    loggerFactory.getLogger().fatal('Unhandled rejection occurred. Terminate process.', { err, promise });
  } else {
    loggerFactory.getLogger().fatal('Uncaught exception occurred. Terminate process.', { err });
  }

  // Allow process to write out log entry before exiting
  process.nextTick(() => {
    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable no-process-exit */
  });
};

module.exports = logAndTerminate;
