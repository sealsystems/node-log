'use strict';

const assert = require('assertthat');

const logger = require('../lib/logger');

suite('Middleware', () => {
  test('has a Middleware constructor', async () => {
    assert.that(logger.Middleware).is.ofType('function');
  });

  test('returns a function.', async () => {
    const middleware = new logger.Middleware('warn');

    assert.that(middleware).is.ofType('function');
  });
});
