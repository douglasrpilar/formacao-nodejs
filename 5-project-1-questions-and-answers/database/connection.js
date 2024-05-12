const Sequelize = require('sequelize');

const connection = new Sequelize('project_1', 'root', '10203040', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = connection;