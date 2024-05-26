const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '10203040',
    database: 'nodejs_knex',
  },
});

module.exports = knex;