#!/usr/bin/env node
'use strict';

const glob = require('glob');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const sh = require('shelljs');
const convert = require('./convert');

const ARGS = yargs
  .describe('output', 'Output file')
  .describe('version', 'Print version number and exit')
  .help('help')
  .alias('o', 'output')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

const cwd = sh.pwd().toString();

const convertAndWrite = (file, outputPath) => {

  let output = fs.readFileSync(file, 'utf8');
  try {
    output = convert(output);
  } catch ( e ) {
    console.error('ERROR: convert error. Input code is too complex to convert.');
    process.exit(1);
  }
  const outputDir = path.join(cwd, '/' + outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  fs.writeFileSync(outputDir + path.basename(file), output);
};

if (ARGS.version || ARGS.v) {
  const json = require('./package.json');
  console.log(json.name + ' ' + json.version);
  process.exit(0);
}


if (ARGS._[0]) {
  const input = ARGS._[0];
  let output = undefined;
  if (ARGS.output || ARGS.o) {
    output = ARGS.output || ARGS.o;
  } else {
    console.error('ERROR: Invalid output');
    process.exit(1);
  }
  if (fs.existsSync(input)) {
    convertAndWrite(input, output);
    process.exit(0);
  }
  glob(input, (err, files) => {
    if (err) {
      console.error('ERROR: Invalid glob definition');
      process.exit(1);
    }
    for (let file of files) {
      convertAndWrite(file, output);
    }
  });
  process.exit(0);
}

if ((ARGS.output || ARGS.o) && !ARGS._[0]) {
  console.error('ERROR: Invalid input');
  process.exit(1);
}

console.log('Usage: kaomojify <input> -o <output>');
process.exit(0);