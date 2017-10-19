'use strict';

const router = require('express').Router();

const User = require('../db/models/users');
const School = require('../db/models/schools');

router.param('id', function (req, res, next, id) {
  School.findById(id)
  .then(function (school) {
    if (!school) res.redirect('/');
    req.school = school;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  School.findAll({
  })
  .then(function (schools) {
    res.json(schools);
  })
  .catch(next);
});


router.post('/', function (req, res, next) {
  School.create(req.body)
  .then(function (school) {
    res.status(201).json(school);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
    res.json(req.school)
    .catch(next);
});


router.put('/:id', function (req, res, next) {
  req.school.update(req.body)
  .then(function () {
    res.sendStatus(204)
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.school.destroy()
  .then(function () {
    res.sendStatus(204)
  })
  .catch(next);
});

module.exports = router;
