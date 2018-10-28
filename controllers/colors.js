/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();


/*============================================
  INDEX ROUTE
  - Get all categorys
============================================*/
router.get('/', (req, res, next) => {
  console.log('Getting all colors');
  db.any('SELECT * FROM colors')
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all categories'
      });
    }).catch((err) => {
      return next(err);
    })
});

module.exports = router;
