class Animal {

  constructor(b = '', c = '') {
    this.b = b;
    this.c = c;
  }

  foobar() {
    console.log('animal foobar()');
  }
}

class Dog extends Animal {

  constructor(a, b = '', c = '') {
    super(b, c);
    this.a = a;
  }

  foobar() {
    super.foobar();
    console.log('dog foobar()');
  }
}


const dog = new Dog('a');
dog.foobar();