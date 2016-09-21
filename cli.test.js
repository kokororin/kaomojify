'use strict';

const assert = require('power-assert');
const cli = require('./cli');

const buildArgs = (str) => {
  let args = new Object();
  args._ = [];
  args[str] = true;
  return args;
};

describe('cli', () => {

  describe('options', () => {
  	
    it('throw error of run `kaomojify` (empty)', () => {
      assert.strictEqual(cli(), 1);
    });

    it('no error of run `kaomojify -v`', () => {
      assert.strictEqual(cli(buildArgs('-v')), 0);
    });

    it('no error of run `kotori -h`', () => {
      assert.strictEqual(cli(buildArgs('-h')), 0);
    });

  });
});
