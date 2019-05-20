'use strict';

const assert = require('assertthat');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const logAndTerminate = require('../lib/logAndTerminate');

let logged;
const logAndTerminateMock = proxyquire('../lib/logAndTerminate', {
  flaschenpost: {
    getLogger() {
      return {
        fatal(message, metadata) {
          logged.push({ message, metadata });
        }
      };
    }
  }
});

suite('logAndTerminate', () => {
  setup((done) => {
    logged = [];
    done();
  });

  test('is an function.', (done) => {
    assert.that(logAndTerminate).is.ofType('function');
    done();
  });

  test('logs an uncaught exception and terminates.', (done) => {
    // const expected = new Error('Foobar');
    const expected = 'foo';

    sinon.stub(process, 'exit');
    assert.that(process.exit.isSinonProxy).is.true();

    logAndTerminateMock(expected);
    assert.that(logged).is.equalTo([
      {
        message: 'Uncaught exception occurred. Terminate process.',
        metadata: {
          err: expected
        }
      }
    ]);

    process.nextTick(() => {
      sinon.assert.called(process.exit);
      sinon.assert.calledWith(process.exit, 1);
      process.exit.restore();
      done();
    });
  });

  test('logs an unhandled rejection and terminates.', (done) => {
    sinon.stub(process, 'exit');
    assert.that(process.exit.isSinonProxy).is.true();

    const error = new Error('Foobar');
    const promise = new Promise((resolve, reject) => {
      reject(error);
    }).catch((err) => {
      logAndTerminateMock(err, promise);

      assert.that(err).is.equalTo(error);
      assert.that(logged).is.equalTo([
        {
          message: 'Unhandled rejection occurred. Terminate process.',
          metadata: {
            err,
            promise
          }
        }
      ]);

      process.nextTick(() => {
        sinon.assert.called(process.exit);
        sinon.assert.calledWith(process.exit, 1);
        process.exit.restore();
        done();
      });
    });
  });
});
