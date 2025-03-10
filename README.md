# @sealsystems/log

@sealsystems/log is the logger for all Node.js modules by SEAL Systems.

All log messages will be written to `stdout` and can then be processed by 3rd-party tools.

## Installation

```bash
npm install @sealsystems/log
```

## Quick start

First you need to integrate @sealsystems/log into your application.

```javascript
const log = require('@sealsystems/log').getLogger();
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

### Uncaught exceptions/Unhandled rejections

Exceptions and rejections that are not caught otherwise are also logged with log level `fatal`. After logging the error, the process will be terminated with exit code `1`. You have to require the log module at least one time in your project to enable this feature. No further configuration is required.

## Environment Variable LOG_LEVEL

A single minimum log level which includes all higher levels.

```bash
LOG_LEVEL=warn
```

The setting above includes log levels `warn`, `error` and `fatal`.
