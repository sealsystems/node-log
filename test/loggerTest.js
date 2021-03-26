'use strict';

const assert = require('assertthat');
const sinon = require('sinon');

const logger = require('../lib/logger');

suite('logger', () => {
  let sandbox;

  setup(async () => {
    sandbox = sinon.createSandbox();
    sandbox.spy(console, 'log');
  });

  teardown(async () => {
    sandbox.restore();
  });

  test('is a object.', async () => {
    assert.that(logger).is.ofType('object');
  });

  test('returns a logger object.', async () => {
    const log = logger.getLogger();

    assert.that(log).is.ofType('object');
    assert.that(log.debug).is.ofType('function');
    assert.that(log.info).is.ofType('function');
    assert.that(log.warn).is.ofType('function');
    assert.that(log.error).is.ofType('function');
  });

  test('log message', async () => {
    logger.getLogger().info('test');
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.isoTimestamp).is.ofType('string');
    assert.that(logEntry.isoTimestamp).is.equalTo(new Date(logEntry.timestamp).toISOString());
  });
});
