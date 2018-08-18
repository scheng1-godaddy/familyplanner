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
      return next(error);
    })
})

/*============================================
  Show ROUTE
  - Get one user based on id
============================================*/
router.get('/:id', (req, res, next) => {
  console.log('Getting user with id', req.params.id);
  db.one('SELECT * FROM users WHERE id=$1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved user with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});
// router.get('/:id', );
// router.put('/:id', );
// router.delete('/:id', );

module.exports = router;
