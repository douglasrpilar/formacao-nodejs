const pdf = require('html-pdf');

class PdfWriter {

  constructor() {
    // fs.writer usa callback, e não promises, portanto não é possível utilizar async-await para retornar os dados.
    // Para transformá-la em uma promise é necessário o promisify.
    this.writer = util.promisify(fs.writeFile);
  }

  static write(file, html) {
    const options = {
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        },
      }
    }

    pdf.create(html, options).toFile(file, (error) => {});
  }

}

module.exports = PdfWriter;