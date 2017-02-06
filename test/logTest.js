'use strict';

const assert = require('assertthat');

const log = require('../lib/log');

suite('log', () => {
  test('is an object', (done) => {
    assert.that(log).is.ofType('object');
    done();
  });
});
