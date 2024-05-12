import * as ops from './operations.js';
const args = process.argv;

var op = null;
if (args[2]) {
  op = args[2];
}

var arg1 = null;
if (args[3]) {
  arg1 = parseFloat(args[3]);
}

var arg2 = null;
if (args[4]) {
  arg2 = parseFloat(args[4]);
}

console.log(ops.name + ' ' + ops.version);
console.log('');

if (op && arg1 && arg2) {
  switch (op) {
    case 'sum':
      console.log(arg1 + ' + ' + arg2 + ' = ' + ops.sum(arg1, arg2));
      break;

    case 'sub':
      console.log(arg1 + ' - ' + arg2 + ' = ' + ops.sub(arg1, arg2));
      break;

    case 'mult':
      console.log(arg1 + ' * ' + arg2 + ' = ' + ops.mult(arg1, arg2));
      break;

    case 'div':
      console.log(arg1 + ' / ' + arg2 + ' = ' + ops.div(arg1, arg2));
      break;

    default:
      console.log('Operation not found!');
  }
}