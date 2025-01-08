'use strict';

const chalk = require('chalk');
const stringifyObject = require('stringify-object');

const pad = function (num, length) {
  return String(num).padStart(length, '0');
};

const formatDate = function (date) {
  // dateFns.lightFormat(dateTime, 'HH:mm:ss.SSS')}@${dateFns.lightFormat(dateTime, 'yyyy-MM-dd')
  const result = [
    pad(date.getHours(), 2),
    ':',
    pad(date.getMinutes(), 2),
    ':',
    pad(date.getSeconds(), 2),
    '.',
    pad(date.getMilliseconds(), 3),
    '@',
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1, 2),
    '-',
    pad(date.getDate(), 2)
  ].join('');

  return result;
};

const asHumanReadable = function (logEntry) {
  const dateTime = new Date(logEntry.timestamp);
  let origin = '';
  let result = '';
  origin = `${logEntry.hostname}`;
  origin += `::${logEntry.application.name}@${logEntry.application.version}`;
  if (logEntry.application.name !== logEntry.module.name) {
    origin += `::${logEntry.module.name}@${logEntry.module.version}`;
  }
  if (logEntry.source) {
    origin += ` (${logEntry.source})`;
  }
  const colorize = {
    fatal: chalk.magenta,
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.green,
    debug: chalk.white
  };
  result += colorize[logEntry.level].bold(`${logEntry.message} (${logEntry.level})`);
  result += '\n';
  result += chalk.white(origin);
  result += '\n';
  result += chalk.gray(`${formatDate(dateTime)} ${logEntry.processId}#${logEntry.id}`);
  result += '\n';
  if (logEntry.metadata) {
    result += chalk.gray(
      stringifyObject(logEntry.metadata, {
        indent: '  ',
        singleQuotes: true
      }).replace(/\\n/gu, '\n')
    );
    result += '\n';
  }
  result += chalk.gray('\u2500'.repeat(process.stdout.columns || 80));
  return result;
};

module.exports = asHumanReadable;
