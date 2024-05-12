// Let => escopos: global, local e block
// Var => escopos: global e local

var varName = 'Douglas var';  // escopo: global
let letName = 'Douglas let';

function foo1() {
  var varSurname = 'Pilar var'; // escopo: local
  let letSurname = 'Pilar let'; // escopo: local

  let a = 10;
  {
    let b = 20; // escopo: block
    var c = 40;
    console.log(a + b);
  }

  // console.log(b) // error
  console.log(c);
  console.log('local:', varName + ' | ' + varSurname);
  console.log('local:', letName + ' | ' + letSurname);
}


foo1();
console.log('global:', varName);


console.log('--------------------------------------------------');
console.log('Parâmetros Opcionais');
function foo2(a, b = '') {
  console.log(b);
}

foo2(1);
foo2(1, 2);


console.log('--------------------------------------------------');
console.log('JSON Encurtado');

var name = 'Douglas';
var email = 'douglas@gmail.com';
var age = 27;
const company = {
  site: 'dexa.ag',
  city: 'Porto Alegre',
}
var json = {
  name,
  email,
  age,
  company
}

console.log(json);


console.log('--------------------------------------------------');
console.log('Operador Spread');

var json = {
  name,
  email,
  age,
  ... company
}

console.log(json);

console.log('--------------------------------------------------');
console.log('Desestruturação (Destructuring)');
console.log('');
console.log('JSON');

var {name, email} = json;
console.log(name);
console.log(email);

console.log('');
console.log('Array');

const array = ['I', 'am', 1, 'Douglas'];

var [pronoun, verb] = array;
console.log('pronoun:', pronoun);
console.log('verb:', verb);

console.log('');

var [pronoun, , , name] = array;
console.log('pronoun:', pronoun);
console.log('name:', name);

var [pronoun, ...remaining] = array;
console.log('remaining:', remaining);


console.log('--------------------------------------------------');
console.log('Arrow Function');

function sum(a, b) {
  return a + b;
}

var mult = function(a, b) {
  return a * b;
}

// Arrow Function

var mult3 = (a, b, c = 1) => {
  return a * b * c;
}

// Pode quando só tem um parâmetro
var print1 = a => {
  console.log(a);
}

// Pode quando o conteúdo da função possui uma única linha.
var fooReturn = a => a;

// Retorno de uma arrow funtion

console.log(sum(2, 4));
console.log(mult(2, 4));
console.log(mult3(3, 3));
print1('print 1');
console.log(fooReturn('print 2'));


console.log('--------------------------------------------------');
console.log('Find');

const user1 = {
  name: 'User 1',
  email: 'user1@email.com',
  age: 18,
}

const user2 = {
  name: 'User 2',
  email: 'user2@email.com',
  age: 20,
}

const user3 = {
  name: 'User 3',
  email: 'user3@email.com',
  age: 25,
}

var users = [user1, user2, user3];
var user = users.find(user => user.age > 18);
console.log(user);

console.log('--------------------------------------------------');
console.log('Template literals');

var var1 = 'abc';
var var2 = 'def';
var var3 = 'ghi';
var var4 = 'jkl';

var str = `1: ${var1} 2: ${var2}

3: ${var3}
   4: ${var4}.`;

console.log(str);