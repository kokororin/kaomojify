#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const cli = require('./cli');

const exitCode = cli(yargs.argv);

process.on('exit', () => {
  process.exit(exitCode);
});