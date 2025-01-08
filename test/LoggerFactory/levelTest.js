'use strict';

const assert = require('assertthat');
const { nodeenv } = require('nodeenv');

const level = require('../../lib/loggerFactory/level');

suite('LoggerFactory.level', () => {
  test('is an object.', async () => {
    assert.that(level).is.ofType('object');
    assert.that(level.logLevels).is.ofType('array');
    assert.that(level.DEFAULT_LEVEL).is.ofType('object');
    assert.that(level.getLogLevel).is.ofType('function');
  });

  test('returns default level if LOG_LEVEL is not set.', async () => {
    const restore = nodeenv({
      LOG_LEVEL: undefined
    });
    const result = level.getLogLevel();
    assert.that(result).is.equalTo(level.DEFAULT_LEVEL);

    restore();
  });

  test('returns default level if LOG_LEVEL is set to unknown level.', async () => {
    const restore = nodeenv({
      LOG_LEVEL: 'unknown'
    });
    const result = level.getLogLevel();
    assert.that(result).is.equalTo(level.DEFAULT_LEVEL);

    restore();
  });

  test('returns error level if LOG_LEVEL is set to error.', async () => {
    const restore = nodeenv({
      LOG_LEVEL: 'error'
    });
    const result = level.getLogLevel();
    assert.that(result).is.equalTo({ name: 'error', index: 3 });

    restore();
  });
});
