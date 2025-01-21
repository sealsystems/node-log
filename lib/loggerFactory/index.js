/* eslint-disable class-methods-use-this */
'use strict';

const os = require('os');

const appRootPath = require('app-root-path').toString();
const findRoot = require('find-root');
const stackTrace = require('stack-trace');

const formatter = require('./formatter');
const getLogEntryIdGenerator = require('./getLogEntryIdGenerator');
const { getLogLevel, logLevels } = require('./level');
const Logger = require('./Logger');
const getMiddleware = require('./getMiddleware');
const readPackageJson = require('./readPackageJson');

class LoggerFactory {
  get formatter() {
    return formatter;
  }
  get logLevels() {
    return logLevels.slice();
  }

  constructor() {
    this.defaultConfiguration = {
      logLevel: getLogLevel(),
      formatter: process.stdout.isTTY ? formatter.asHumanReadable : formatter.asJson,
      hostname: os.hostname(),
      idGenerator: getLogEntryIdGenerator(),
      application: readPackageJson(appRootPath)
    };

    this.Middleware = getMiddleware(this);
  }

  getLogger(configOrSourcePath) {
    const configuration = Object.assign({}, this.defaultConfiguration);

    if (typeof configOrSourcePath === 'string') {
      configuration.sourcePath = configOrSourcePath;
    } else {
      Object.assign(configuration, configOrSourcePath);
      configuration.sourcePath = stackTrace
        .get()[1]
        .getFileName() // get the file path of the calling module
        .replace(/^file:\/\//, ''); // remove file:// prefix
    }

    const module = findRoot(configuration.sourcePath);
    configuration.module = readPackageJson(module);

    return new Logger(this, configuration);
  }
}

const loggerFactory = new LoggerFactory();

module.exports = { LoggerFactory, loggerFactory };
