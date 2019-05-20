'use strict';

/* eslint-disable no-process-env */
const parseLogLevelEnv = function() {
  if (!process.env.LOG_LEVEL) {
    return;
  }

  const logLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const index = logLevels.indexOf(process.env.LOG_LEVEL);

  if (index === -1) {
    throw new Error(
      `Environment variable LOG_LEVEL is invalid. It must be set to one of the following values: ${logLevels.toString()}`
    );
  }

  process.env.LOG_LEVELS = logLevels.slice(index).toString();
};
/* eslint-enable no-process-env */

module.exports = parseLogLevelEnv;
