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
    logger.getLogger().info('test', 'noch ein test string');
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.isoTimestamp).is.ofType('string');
    assert.that(logEntry.isoTimestamp).is.equalTo(new Date(logEntry.timestamp).toISOString());
  });

  test('log message, transform string to object', async () => {
    logger.getLogger().info('test', 'noch ein test string');
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata).is.ofType('object');
  });

  test('log message, transform array to object', async () => {
    logger.getLogger().info('test', ['element1', 'element2', 'element3']);
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata).is.ofType('object');
  });

  test('log message, log object as is', async () => {
    logger.getLogger().info('test', { statusCode: 500 });
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata).is.ofType('object');
  });
});
