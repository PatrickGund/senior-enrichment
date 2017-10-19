const db = require('../../db');
const Sequelize = require('sequelize');


module.exports = db.define('schools', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: null
    }
});