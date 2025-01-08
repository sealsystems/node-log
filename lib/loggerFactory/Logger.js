'use strict';

const _ = require('lodash');
const serialize_error_1 = require('serialize-error');

const { logLevels } = require('./level');

const cloner = function (value) {
  if (!_.isError(value)) {
    return;
  }
  return serialize_error_1.serializeError(value);
};

const noop = function () {
  // Intentionally left blank.
};

const logop = function (logger, level = 'debug') {
  return function (message, metadata) {
    logger.log(level, message, metadata);
  };
};

class Logger {
  constructor(loggerFactory, configuration) {
    this.configuration = configuration;
    for (let level = 0; level < logLevels.length; level++) {
      this[logLevels[level]] = level < configuration.logLevel.index ? noop : logop(this, logLevels[level]);
    }

    Object.defineProperty(this, 'formatter', {
      get() {
        return loggerFactory.formatter;
      }
    });
    Object.defineProperty(this, 'logLevels', {
      get() {
        return loggerFactory.logLevels;
      }
    });
  }

  enable(level = 'debug') {
    if (logLevels.indexOf(level) === -1) {
      throw new Error('Level is invalid.');
    }
    this[level] = logop(this, level);
  }

  log(level, message, metadata) {
    const logEntry = {
      id: this.configuration.idGenerator.next().value,
      hostname: this.configuration.hostname,
      processId: process.pid,
      application: this.configuration.application,
      module: this.configuration.module,
      source: this.configuration.sourcePath,
      timestamp: Date.now(),
      level,
      message
    };
    logEntry.isoTimestamp = new Date(logEntry.timestamp).toISOString();
    if (metadata) {
      logEntry.metadata = _.cloneDeepWith(metadata, cloner);

      // try to avoid type mismatches in elasticsearch (pls-1626)
      if (typeof logEntry.metadata !== 'object') {
        logEntry.metadata = { value: logEntry.metadata.toString() };
      }
      // Temporary: If incoming metadata is not of type object, transform it.
      // This is neccessary to fit the type definitions in ELK
      else if (logEntry.metadata.err && typeof logEntry.metadata.err !== 'object') {
        logEntry.metadata.err = { message: logEntry.metadata.err.toString() };
      }
    }

    const formattedLogEntry = this.configuration.formatter(logEntry);
    console.log(formattedLogEntry);
  }
}

module.exports = Logger;
