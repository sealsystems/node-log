'use strict';

const assert = require('assertthat');
const sinon = require('sinon');

const logger = require('../lib/logger');

suite('Middleware', () => {
  let sandbox;

  setup(async () => {
    sandbox = sinon.createSandbox();
    sandbox.spy(console, 'log');
  });

  teardown(async () => {
    sandbox.restore();
  });

  test('has a Middleware constructor', async () => {
    assert.that(logger.Middleware).is.ofType('function');
  });

  test('returns a writeable stream object', async () => {
    const middleware = new logger.Middleware('warn');

    assert.that(middleware).is.ofType('object');
    assert.that(middleware.write).is.ofType('function');
  });

  test('logs message', async () => {
    const middleware = new logger.Middleware('warn');
    middleware.write('hansi');

    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.message).is.equalTo('hansi');
  });
});
