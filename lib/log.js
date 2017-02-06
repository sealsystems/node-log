'use strict';

// Parse environment variable LOG_LEVEL if set, overwrites LOG_LEVELS
require('./parseLogLevelEnv')();

const flaschenpost = require('flaschenpost');

process.on('uncaughtException', (err) => {
  flaschenpost.getLogger().fatal('Uncaught exception occurred. Terminate process.', err);

  // Allow process to write out log entry before exiting (mis)
  process.nextTick(() => {
    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable no-process-exit */
  });
});

module.exports = flaschenpost;
