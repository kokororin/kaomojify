#!/usr/bin/env node
'use strict';

const glob = require('glob');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const sh = require('shelljs');
const convert = require('./convert');

const argv = yargs.argv;

if (!argv._[0]) {
  console.error('ERROR: Invalid arguments');
  process.exit(1);
}

const input = argv._[0];

const convertAndWrite = (file) => {

  let output = fs.readFileSync(file, 'utf8');
  output = convert(output);
  if (!argv.o) {
    console.error('ERROR: Invalid -o');
    process.exit(1);
  }
  const outputPath = path.join(sh.pwd(), '/' + argv.o);
  if (!fs.existsSync(outputPath)) {
    console.log(outputPath);
    fs.mkdirSync(outputPath);
  }
  fs.writeFileSync(outputPath + path.basename(file), output);
};

glob(input, (err, files) => {
  if (err) {
    console.error('ERROR: Invalid glob definition');
    process.exit(1);
  }
  for (let file of files) {
    convertAndWrite(file);
  }
});
