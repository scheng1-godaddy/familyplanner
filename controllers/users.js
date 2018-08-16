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

// router.get('/:id', );
// router.post('/', );
// router.put('/:id', );
// router.delete('/:id', );

module.exports = router;
