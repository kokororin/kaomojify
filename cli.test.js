'use strict';

const assert = require('power-assert');
const cli = require('./cli');

describe('cli', () => {

  describe('options', () => {

    it('throw error of run `kaomojify` (empty)', () => {
      assert.strictEqual(cli(), 1);
    });

    it('no error of run `kaomojify -v`', () => {
      assert.strictEqual(cli('-v'), 0);
    });

    it('no error of run `kaomojify -h`', () => {
      assert.strictEqual(cli('-h'), 0);
    });

    it('no error of run `kaomojify example/simple.js -o example/dist/`', () => {
      assert.strictEqual(cli('example/simple.js -o example/dist/'), 0);
    });

  });
});
