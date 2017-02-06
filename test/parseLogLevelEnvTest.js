'use strict';

const assert = require('assertthat');
const nodeenv = require('nodeenv');

const parse = require('../lib/parseLogLevelEnv');

/* eslint-disable no-process-env */
suite('parseLogLevelEnv', () => {
  test('is a function', (done) => {
    assert.that(parse).is.ofType('function');
    done();
  });

  test('does not set LOG_LEVELS', (done) => {
    parse();
    assert.that(process.env.LOG_LEVELS).is.undefined();
    done();
  });

  test('sets LOG_LEVELS according to LOG_LEVEL', (done) => {
    nodeenv('LOG_LEVEL', 'error', (restore) => {
      parse();
      assert.that(process.env.LOG_LEVELS).is.equalTo('error,fatal');
      restore();
      done();
    });
  });

  test('throws error if LOG_LEVEL is invalid', (done) => {
    nodeenv('LOG_LEVEL', 'hugo', (restore) => {
      assert.that(() => {
        parse();
      }).is.throwing('Environment variable LOG_LEVEL is invalid. It must be set to one of the following values: debug,info,warn,error,fatal');
      restore();
      done();
    });
  });
});
/* eslint-enable no-process-env */
