'use strict';

const assert = require('assertthat');

const logger = require('../lib/logger');

suite('logger', () => {
  test('is an object.', (done) => {
    assert.that(logger).is.ofType('object');
    done();
  });
});
