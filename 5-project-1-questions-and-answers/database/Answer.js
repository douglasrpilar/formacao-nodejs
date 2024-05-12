const Sequelize = require('sequelize');
const connection = require('./connection');

const Answer = connection.define('answer', {
  qid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

Answer.sync({
  force: false
}).then(() => {
  console.log('Answer table OK!');
});

module.exports = Answer;