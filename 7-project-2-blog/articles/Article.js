const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/Category');

const Article = connection.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

// 1:1 relationship
Article.belongsTo(Category);
// 1:n relationship
Category.hasMany(Article);

Article.sync({
  force: false
}).then(() => {
  console.log('Article model OK!');
});

module.exports = Article;