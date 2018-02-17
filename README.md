# kaomojify (≧∀≦*)

[![Build Status](http://img.shields.io/travis/kokororin/kaomojify.svg)](https://travis-ci.org/kokororin/kaomojify)
[![GitHub issues](https://img.shields.io/github/issues/kokororin/kaomojify.svg)](https://github.com/kokororin/kaomojify/issues)
[![npm](https://img.shields.io/npm/dt/kaomojify.svg?maxAge=2592000)]()
[![npm version](https://badge.fury.io/js/kaomojify.svg)](https://badge.fury.io/js/kaomojify)

Convert Javascript code to Japanese kawaii kaomoji(かわいい顔文字).  
The converter is powered by [utf-8.jp](http://utf-8.jp/public/aaencode.html).

## Installation
```bash
npm install -g kaomojify
yarn global add kaomojify
```

## Usage
```bash
kaomojify <input> -o <output>
```

example:
```bash
# single file
kaomojify src/main.js -o dist/main.js

# use glob definition in input
kaomojify src/*.js -o dist/
```

## Contribute
Feel free to contribute (PR-s and issues welcomed).

## License
[MIT license](http://opensource.org/licenses/mit-license.php)
