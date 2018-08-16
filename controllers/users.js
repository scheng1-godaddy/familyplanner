const express = require('express');
const router = express.Router();

const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgresql://shawn:strinh777@localhost:5432/planner';
const db = pgp(connectionString);

//const db = require('../queries/userqueries');

// router.get('/', db.getAllUsers);
// router.get('/:id', db.getSinglePuppy);
// router.post('/', db.createPuppy);
// router.put('/:id', db.updatePuppy);
// router.delete('/:id', db.removePuppy);

router.get('/', (eq, res, next) => {
  console.log('Getting all users');
  db.any('select * from users')
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all users'
      });
    }).catch((err) => {
      return next(err);
    })

});

module.exports = router;
