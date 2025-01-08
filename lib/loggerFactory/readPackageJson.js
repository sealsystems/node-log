'use strict';

const fs = require('fs');
const path = require('path');

const readPackageJson = function (directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  let name = '(unknown)';
  let version = '(unknown)';
  try {
    /* eslint-disable no-sync */
    const data = fs.readFileSync(packageJsonPath, { encoding: 'utf8' });
    /* eslint-enable no-sync */
    const parsedData = JSON.parse(data);
    ({ name, version } = parsedData);
  } catch {
    // Intentionally ignore any errors.
  }
  return { name, version };
};

module.exports = readPackageJson;
