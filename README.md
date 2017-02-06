# seal-log

[![Circle CI](https://circleci.com/gh/plossys/seal-log.svg?style=svg&circle-token=8d3e43c11b1a8b9879825d67ce5f98aeea94e99b)](https://circleci.com/gh/plossys/seal-log)
[![Appveyor](https://ci.appveyor.com/api/projects/status/oq5a0dyr4xievpta?svg=true)](https://ci.appveyor.com/project/Plossys/seal-log)

seal-log is the logger for all Node.js modules by SEAL Systems.

All log messages will be written to `stdout` and can then be processed by 3rd-party tools.

## Installation

```bash
$ npm install seal-log
```

## Quick start

First you need to integrate seal-log into your application.

```javascript
const log = require('seal-log').getLogger();
```

### Logging

The following log levels are defined:

- debug:

  ```javascript
  log.debug('This is a debug message.');
  ```

- info:

  ```javascript
  log.info('This is a info message.');
  ```

- warn:

  ```javascript
  log.warn('This is a warning message.');
  ```

- error:

  ```javascript
  log.error('This is a error message.');
  ```

- fatal:

  ```javascript
  log.fatal('This is a fatal error message.');
  ```

  **Please note:** This level will be used for logging an unhandled exception.

### Uncaught exceptions

Exceptions that are not caught otherwise are also logged with log level `fatal`. After logging the exception, the process will be terminated with exit code `1`. You have to require the log module at least one time in your project to enable this feature. No further configuration is required.

## Environment Variables

### LOG_LEVELS

A list of log levels to print out. Possible levels are:

- `debug`
- `info`
- `warn`
- `error`
- `fatal`

You have to provide a comma seperated list of the log levels you are interessted in:

```
LOG_LEVELS=info,warn,error,fatal
```
The list given above is the default setting, if no environment variable is set.

You can enable all logging levels with the shortcut

```
LOG_LEVELS=*
```

### LOG_LEVEL

A single minimum log level which includes all higher levels.

```
LOG_LEVEL=warn
```

The setting above includes log levels `warn`, `error` and `fatal`.

The environment variable `LOG_LEVEL` has precedence over `LOG_LEVELS`.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
