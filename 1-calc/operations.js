const name = 'Calc'
const version = 'v.1.0';

function sum(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mult(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

export default {
  name,
  version,
  sum,
  sub,
  mult,
  div
};