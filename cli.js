const glob = require('glob');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const isThere = require('is-there');
const convert = require('./convert');

/**
 * @deprecated
 * @code const cwd = require('shelljs').pwd().toString();
 */

const convertAndWrite = (inputFile, outputPath, single) => {

  let outputData = fs.readFileSync(inputFile, 'utf8');

  try {
    outputData = convert(outputData);
  } catch ( e ) {
    console.error('ERROR: convert error. Input code is too complex to convert.');
    return 1;
  }

  let realOutputPath = undefined;

  if (single) {
    realOutputPath = outputPath;
    mkdirp(path.parse(realOutputPath).dir);
  } else {
    realOutputPath = outputPath + path.basename(inputFile);
    mkdirp(outputPath);
  }

  try {
    fs.writeFileSync(realOutputPath, outputData);
    console.log('SUCCESS: generated file `' + realOutputPath + '`');
  } catch ( e ) {
    console.error('ERROR: write data to `' + realOutputPath + '` failed.');
    return 1;
  }

  return 0;
};

const cli = (args) => {
  if (typeof args === 'undefined') {
    return 1;
  }
  if (typeof args === 'object') {
    args = args.join(' ');
  }
  if (typeof args !== 'string') {
    return 1;
  }
  args = yargs(args)
    .describe('output', 'Output file')
    .describe('version', 'Print version number and exit')
    .help('help')
    .alias('o', 'output')
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

  if (args.version || args.v) {
    const json = require('./package.json');
    console.log(json.name + ' ' + json.version);
    return 0;
  }

  if (args._.length > 0) {
    const inputFiles = args._;
    let outputPath = undefined;
    if (args.output || args.o) {
      outputPath = args.outputPath || args.o;
    } else {
      console.error('ERROR: Invalid output');
      return 1;
    }
    for (const inputFile of inputFiles) {
      if (!isThere(inputFile)) {
        glob(inputFile, (err, globFiles) => {
          for (const globFile of globFiles) {
            convertAndWrite(globFile, outputPath, false);
          }
        });
      } else {
        convertAndWrite(inputFile, outputPath, inputFiles.length===1);
      }
    }
    return 0;
  }

  if ((args.output || args.o) && args._.length === 0) {
    console.error('ERROR: Invalid input');
    return 1;
  }

  console.log('Usage: kaomojify <input> -o <output>');
  return 0;
};

module.exports = cli;
