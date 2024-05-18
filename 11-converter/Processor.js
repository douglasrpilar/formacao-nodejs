class Processor {

  static process(data) {
    let rows = [];

    data.split("\n").forEach((row) => {
      rows.push(row.split(';'));
    });

    return rows;
  }
}

module.exports = Processor;