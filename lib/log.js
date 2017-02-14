'use strict';

// Parse environment variable LOG_LEVEL if set, overwrites LOG_LEVELS
require('./parseLogLevelEnv')();

const flaschenpost = require('flaschenpost');

// Do not log multiple times if different versions of seal-log are required in the project
if (process.listenerCount('uncaughtException') === 0) {
  process.on('uncaughtException', (err) => {
    flaschenpost.getLogger().fatal('Uncaught exception occurred. Terminate process.', err);

    // Allow process to write out log entry before exiting
    process.nextTick(() => {
      /* eslint-disable no-process-exit */
      process.exit(1);
      /* eslint-enable no-process-exit */
    });
  });
}

module.exports = flaschenpost;
