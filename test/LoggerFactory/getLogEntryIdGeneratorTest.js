'use strict';

const assert = require('assertthat');

const getLogEntryIdGenerator = require('../../lib/loggerFactory/getLogEntryIdGenerator');

suite('LoggerFactory.getLogEntryIdGenerator', () => {
  test('Is a function.', async () => {
    assert.that(getLogEntryIdGenerator).is.ofType('function');
  });

  test('Returns a generator.', async () => {
    const generator = getLogEntryIdGenerator();
    assert.that(generator).is.ofType('object');
    assert.that(generator.next).is.ofType('function');
  });

  test('Generates unique ids.', async () => {
    const generator = getLogEntryIdGenerator();
    const ids = new Set();

    for (let i = 0; i < 1000; i++) {
      const { value } = generator.next();
      assert.that(value).is.ofType('number');
      ids.add(value);
    }

    assert.that(ids.size).is.equalTo(1000);
  });
});
