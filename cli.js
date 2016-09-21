'use strict';

const glob = require('glob');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const sh = require('shelljs');
const mkdirp = require('mkdirp');
const convert = require('./convert');

const cwd = sh.pwd().toString();

const convertAndWrite = (file, outputPath) => {

  let output = fs.readFileSync(file, 'utf8');
  try {
    output = convert(output);
  } catch ( e ) {
    console.error('ERROR: convert error. Input code is too complex to convert.');
    return 1;
  }
  const outputDir = path.join(cwd, '/' + outputPath);
  mkdirp(outputPath);
  fs.writeFileSync(outputDir + path.basename(file), output);
  return 0;
};

const cli = (args) => {
  if (typeof args === 'undefined') {
    return 1;
  }
  if (typeof args !== 'string') {
    return 1;
  }
  args = yargs(args).argv;
  yargs
    .describe('output', 'Output file')
    .describe('version', 'Print version number and exit')
    .help('help')
    .alias('o', 'output')
    .alias('h', 'help')
    .alias('v', 'version');

  if (args.version || args.v) {
    const json = require('./package.json');
    console.log(json.name + ' ' + json.version);
    return 0;
  }


  if (args._[0]) {
    const input = args._[0];
    let output = undefined;
    if (args.output || args.o) {
      output = args.output || args.o;
    } else {
      console.error('ERROR: Invalid output');
      return 1;
    }
    if (fs.existsSync(input)) {
      return convertAndWrite(input, output);
    }
    glob(input, (err, files) => {
      if (err) {
        console.error('ERROR: Invalid glob definition');
        return 1;
      }
      for (let file of files) {
        convertAndWrite(file, output);
      }
    });
    return 0;
  }

  if ((args.output || args.o) && !args._[0]) {
    console.error('ERROR: Invalid input');
    return 1;
  }

  console.log('Usage: kaomojify <input> -o <output>');
  return 0;
};

module.exports = cli;