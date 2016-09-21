/* eslint-disable */
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

    it('no error of run `kaomojify example/single/alert.js -o example/single/alert.kaomojify.js`', () => {
      assert.strictEqual(cli('example/single/alert.js -o example/single/alert.kaomojify.js'), 0);
    });

    it('no error of run `kaomojify example/multiple/*.js -o example/multiple/dist/`', () => {
      assert.strictEqual(cli('example/multiple/*.js -o example/multiple/dist/'), 0);
    });

  });
});
