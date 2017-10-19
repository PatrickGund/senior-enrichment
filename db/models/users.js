const db = require('../../db');
const Sequelize = require('sequelize');
const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');

function randPhoto () {
  var gender = chance.gender();
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}


module.exports = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: randPhoto()
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  }
});

