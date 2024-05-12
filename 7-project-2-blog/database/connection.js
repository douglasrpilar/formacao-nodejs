const Sequelize = require('sequelize');

const connection = new Sequelize(
  'nodejs_blog',
  'root',
  '10203040',
  {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
  }
);

module.exports = connection;