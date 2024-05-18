const fs = require('fs');
const util = require('util');

class Writer {

  constructor() {
    // fs.writer usa callback, e não promises, portanto não é possível utilizar async-await para retornar os dados.
    // Para transformá-la em uma promise é necessário o promisify.
    this.writer = util.promisify(fs.writeFile);
  }

  async write(file, data) {
    try {
      await this.writer(file, data);
      return true;
    }
    catch(error) {
      return false;
    }
  }

}

module.exports = Writer;