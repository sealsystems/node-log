'use strict';

const { flaschenpost } = require('flaschenpost');

const logAndTerminate = function(err, promise) {
  if (promise) {
    flaschenpost.getLogger().fatal('Unhandled rejection occurred. Terminate process.', { err, promise });
  } else {
    flaschenpost.getLogger().fatal('Uncaught exception occurred. Terminate process.', { err });
  }

  // Allow process to write out log entry before exiting
  process.nextTick(() => {
    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable no-process-exit */
  });
};

module.exports = logAndTerminate;
