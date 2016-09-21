var arr = 'abcdaabc';

var info = arr
  .split('')
  .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(info);