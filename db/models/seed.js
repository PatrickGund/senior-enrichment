'use strict';

const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');

const db = require('../../db');
const User = require('./users');
const Schools = require('./schools');

const numUsers = 30;

const emails = chance.unique(chance.email, numUsers);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randUser () {
  var gender = chance.gender();
  return User.build({
    name: [chance.first({gender: gender}), chance.last()].join(' '),
    photo: randPhoto(gender),
    email: emails.pop(),
    schoolId: chance.weighted([1, 2, 3, 4], [25, 25, 25, 25]),
  });
}

function generateUsers () {
  var users = doTimes(numUsers, randUser);
  return users;
}


function createUsers () {
  return Promise.map(generateUsers(), function (user) {
    return user.save();
  });
}

function seedSchool () {
  return Schools.bulkCreate([
    {name: "Harvard", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Harvard_Wreath_Logo_1.svg/193px-Harvard_Wreath_Logo_1.svg.png"},
    {name: "Princeton", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Princeton_shield.svg/280px-Princeton_shield.svg.png" },
    {name: "Yale", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/91px-Yale_University_Shield_1.svg.pn"},
    {name: "Columbia", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Columbia_University_shield.svg/193px-Columbia_University_shield.svg.png"}])
}

function seed () {
  return createUsers();
}

console.log('Syncing database');

db.sync({force: true})
.then(function () {
  console.log('Seeding database');
  return seedSchool();
})
.then(function () {
  console.log('Seeding database');
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});
