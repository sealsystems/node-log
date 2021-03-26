'use strict';

const { Writable } = require('stream');

const stackTrace = require('stack-trace');

const getMiddleware = function(flaschenpost) {
  class Middleware extends Writable {
    constructor(level, source) {
      if (!level) {
        throw new Error('Level is missing.');
      }

      const options = {};

      options.objectMode = true;
      options.source = source || stackTrace.get()[1].getFileName();

      super(options);

      this.level = level;
      this.logger = flaschenpost.getLogger(options.source);

      if (!this.logger[this.level]) {
        throw new Error('Level is invalid.');
      }
    }

    _write(chunk, encoding, callback) {
      this.logger[this.level](chunk);
      callback();
    }
  }

  return Middleware;
};

module.exports = getMiddleware;
