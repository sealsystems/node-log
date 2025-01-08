'use strict';

let nextId = 0;

const getLogEntryIdGenerator = function* () {
  while (true) {
    yield nextId;
    nextId += 1;
  }
};

module.exports = getLogEntryIdGenerator;
