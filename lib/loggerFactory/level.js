/* eslint-disable no-process-env */
'use strict';

const logLevels = ['debug', 'info', 'warn', 'error', 'fatal'];

const DEFAULT_LEVEL = { name: 'info', index: 1 };

const getLogLevel = function () {
  if (!process.env.LOG_LEVEL) {
    return DEFAULT_LEVEL;
  }

  const index = logLevels.indexOf(process.env.LOG_LEVEL);

  if (index === -1) {
    console.log(`Environment variable LOG_LEVEL is invalid: ${process.env.LOG_LEVEL}. Fallback to 'info'.`);
    return DEFAULT_LEVEL;
  }

  return { name: process.env.LOG_LEVEL, index };
};

module.exports = { logLevels, getLogLevel, DEFAULT_LEVEL };
