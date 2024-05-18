const fs = require('fs');
const util = require('util');

class Reader {

  constructor() {
    // fs.readFile usa callback, e não promises, portanto não é possível utilizar async-await para retornar os dados.
    // Para transformá-la em uma promise é necessário o promisify.
    this.reader = util.promisify(fs.readFile);
  }

  async read(file) {
    try {
      let content = await this.reader(file, { encoding: 'utf-8' });
      return content;
    }
    catch(error) {
      return undefined;
    }

  }

}

module.exports = Reader;