'use strict';

const assert = require('assertthat');

const logger = require('../lib/logger');

suite('logger', () => {
  test('is a object.', (done) => {
    assert.that(logger).is.ofType('object');
    done();
  });
});
