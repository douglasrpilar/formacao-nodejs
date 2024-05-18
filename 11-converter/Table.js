
class Table {

  constructor(rows) {
    this.header = rows[0];
    rows.shift();
    this.rows = rows;
  }

  // get epera um return
  // Campo virtual
  get rowsCount() {
    return this.rows.length;
  }

  get columnsCount() {
    return this.header.length;
  }

}

module.exports = Table;