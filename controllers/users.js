/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  INDEX ROUTE
  - Get all users
============================================*/
router.get('/', (req, res, next) => {
  console.log('Getting all users');
  db.any('SELECT * FROM users')
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

/*============================================
  CREATE ROUTE
  - Create new user with POST
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new user:', req.body);
  db.one('INSERT INTO users (username, password, email) VALUES (${username}, ${password}, ${email}) RETURNING id, username, email', req.body)
    .then((data) => {
      console.log('Successfully created user:', res);
      res.status(200).json({
        status: 'success',
        message: 'Inserted user',
        data: data
      })
    }).catch(error => {
      console.log('ERROR:', error);
    })
})

// function createPuppy(req, res, next) {
//   req.body.age = parseInt(req.body.age);
//   db.none('insert into pups(name, breed, age, sex)' +
//       'values(${name}, ${breed}, ${age}, ${sex})',
//     req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// router.get('/:id', );
// router.post('/', );
// router.put('/:id', );
// router.delete('/:id', );

module.exports = router;
