const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

User.sync({
  force: false
}).then(() => {
  console.log('User model OK!');
});

module.exports = User;