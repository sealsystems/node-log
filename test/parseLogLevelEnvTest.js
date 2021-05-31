'use strict';

const assert = require('assertthat');
const { nodeenv } = require('nodeenv');

const parse = require('../lib/parseLogLevelEnv');

/* eslint-disable no-process-env */
suite('parseLogLevelEnv', () => {
  test('is a function.', (done) => {
    assert.that(parse).is.ofType('function');
    done();
  });

  test('sets LOG_LEVEL according to LOG_LEVEL.', (done) => {
    const restore = nodeenv('LOG_LEVEL', 'error');

    parse();
    assert.that(process.env.LOG_LEVEL).is.equalTo('error');
    restore();
    done();
  });

  test('sets LOG_LEVEL to info if LOG_LEVEL is invalid.', (done) => {
    const restore = nodeenv('LOG_LEVEL', 'hugo');

    parse();
    assert.that(process.env.LOG_LEVEL).is.equalTo('info');
    restore();
    done();
  });
});
/* eslint-enable no-process-env */
