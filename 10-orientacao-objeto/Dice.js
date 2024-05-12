class Dice {

  constructor(faces) {
    this.faces = faces;
  }

  roll() {
    console.log(Math.floor(Math.random() * this.faces) + 1);
  }
}

new Dice(1).roll();
new Dice(2).roll();
new Dice(6).roll();