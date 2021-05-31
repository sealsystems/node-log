'use strict';

/* eslint-disable no-process-env */
const parseLogLevelEnv = function() {
  if (!process.env.LOG_LEVEL) {
    return;
  }

  const logLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  let index = logLevels.indexOf(process.env.LOG_LEVEL);

  if (index === -1) {
    index = logLevels.indexOf('info');
    console.log(`Environment variable LOG_LEVEL is invalid: ${process.env.LOG_LEVEL}. Fallback to 'info'.`);
  }

  process.env.LOG_LEVEL = logLevels[index];
};
/* eslint-enable no-process-env */

module.exports = parseLogLevelEnv;
