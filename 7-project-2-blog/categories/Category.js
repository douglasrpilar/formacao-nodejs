const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Category = connection.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

Category.sync({
  force: false
}).then(() => {
  console.log('Category model OK!');
});

module.exports = Category;