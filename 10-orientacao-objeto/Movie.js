class Movie {

  constructor(title, year, genre, director, actors, duration) {
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.director = director;
    this.actors = [];
    this.duration = duration;
  }

  open() {
    console.log('Open');
  }

  reproduce() {
    console.log('Reproduce');
  }

  pause() {
    console.log('Pause');
  }

  advance() {
    console.log('Advance');
  }

  close() {
    console.log('Close');
  }

  print() {
    console.log(`
      Title: ${this.title}
      Year: ${this.year}
      Genre: ${this.genre}
      Director: ${this.director}
      Duration: ${this.duration}
    `);
  }

}


class Calculator {

  static sum(a, b) {
    return a + b;
  }

  static sub(a, b) {
    return a - b;
  }

}

var movie1 = new Movie('Title X', 2024, 'Terror', 'Director X', [], 110);
movie1.print();

console.log(Calculator.sum(5, 2));
console.log(Calculator.sub(5, 2));