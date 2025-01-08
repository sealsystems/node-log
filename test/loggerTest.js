'use strict';

const assert = require('assertthat');
const sinon = require('sinon');

const asHumanReadable = require('../lib/loggerFactory/formatter').asHumanReadable;
const loggerFactory = require('../lib/logger');

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
    assert.that(loggerFactory).is.ofType('object');
    assert.that(loggerFactory.getLogger).is.ofType('function');
    assert.that(loggerFactory.logLevels).is.ofType('array');
    assert.that(loggerFactory.formatter).is.ofType('object');
    assert.that(loggerFactory.Middleware).is.ofType('function');
  });

  test('returns a logger object.', async () => {
    const log = loggerFactory.getLogger();

    assert.that(log).is.ofType('object');
    assert.that(log.debug).is.ofType('function');
    assert.that(log.info).is.ofType('function');
    assert.that(log.warn).is.ofType('function');
    assert.that(log.error).is.ofType('function');
  });

  test('log message', async () => {
    loggerFactory.getLogger().info('test');
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.isoTimestamp).is.ofType('string');
    assert.that(logEntry.isoTimestamp).is.equalTo(new Date(logEntry.timestamp).toISOString());
  });

  test('log message, log object as is', async () => {
    loggerFactory.getLogger().info('test', { statusCode: 500 });
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata).is.ofType('object');
  });

  test('log error object as plain text', async () => {
    loggerFactory.getLogger().error('test', { err: new Error('da gabs wohl ein Problem') });
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata.err).is.ofType('object');
    assert.that(logEntry.metadata.err.message).is.equalTo('da gabs wohl ein Problem');
  });

  test('log error message as is', async () => {
    loggerFactory.getLogger().error('test', { err: { code: 500, message: 'da gabs wohl ein Problem' } });
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata.err).is.ofType('object');
  });

  test('log error message, transform to object', async () => {
    loggerFactory.getLogger().error('test', { err: 500 });
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.metadata.err).is.ofType('object');
  });

  test('log human readable message', async () => {
    const log = loggerFactory.getLogger();
    log.configuration.formatter = asHumanReadable;

    log.info('human readable message test', { name: 'hugo', statusCode: 500 });
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    assert.that(logMessage.split('\n').length).is.equalTo(8);
    assert.that(logMessage.split('\n')[0]).is.containing('human readable message test (info)');
    assert.that(logMessage.split('\n')[7]).is.containing('\u2500');
  });

  test('loggerFactory returns copy of all available log levels.', async () => {
    const levels1 = loggerFactory.logLevels;
    const levels2 = loggerFactory.logLevels;

    assert.that(levels1).is.equalTo(['debug', 'info', 'warn', 'error', 'fatal']);
    assert.that(levels2).is.equalTo(levels1);
    assert.that(levels1).is.not.sameAs(levels2);
  });

  test('loggerFactory returns available formatter', async () => {
    const formatter = loggerFactory.formatter;

    assert.that(formatter).is.ofType('object');
    assert.that(formatter.asJson).is.ofType('function');
    assert.that(formatter.asHumanReadable).is.ofType('function');
  });

  test('logger returns copy of all available log levels.', async () => {
    const log = loggerFactory.getLogger();
    const levels1 = log.logLevels;
    const levels2 = log.logLevels;

    assert.that(levels1).is.equalTo(['debug', 'info', 'warn', 'error', 'fatal']);
    assert.that(levels2).is.equalTo(levels1);
    assert.that(levels1).is.not.sameAs(levels2);
  });

  test('logger returns available formatter', async () => {
    const log = loggerFactory.getLogger();
    const formatter = log.formatter;

    assert.that(formatter).is.ofType('object');
    assert.that(formatter.asJson).is.ofType('function');
    assert.that(formatter.asHumanReadable).is.ofType('function');
  });

  test('enable debug log', async () => {
    const log = loggerFactory.getLogger();

    log.debug('do not log this');
    assert.that(console.log.calledOnce).is.false();

    log.enable();
    log.debug('log this');
    assert.that(console.log.calledOnce).is.true();
    const logMessage = console.log.getCall(0).args[0];
    const logEntry = JSON.parse(logMessage);
    assert.that(logEntry.message).is.equalTo('log this');
  });
});
