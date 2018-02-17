#!/usr/bin/env node
'use strict';
const cli = require('./cli');
const exitCode = cli(process.argv.slice(2));

process.on('exit', () => {
  process.exit(exitCode);
});
