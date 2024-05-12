class Writer {
  write(filename, content) {
    console.log('Written content.');
  }
}

class Reader {
  read(filename) {
    console.log('File read.');
  }
}

class Creator {
  create(filename) {
    console.log('File created.');
  }
}

class Destroyer {
  destroy(filename) {
    console.log('File destroyed.');
  }
}

class FileManager {

  constructor() {
    this.writer = new Writer();
    this.reader = new Reader();
    this.creator = new Creator();
    this.destroyer = new Destroyer();
  }

}

class UserManager {

  constructor() {
    this.creator = new Creator();
    this.writer = new Writer();
  }

  creatUsersList(filename, list) {
    this.creator.write(filename);
    this.creator.write(filename, list);
  }

}

const fileManager = new FileManager();
fileManager.creator.create('file.csv');
fileManager.writer.write('file.csv', 'a;b;c');

const userManager = new UserManager();
userManager.creatUsersList('users.csv', ['a', 'b']);