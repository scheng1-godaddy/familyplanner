/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  CREATE ROUTE
  - Create new category with POST
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new category:', req.body);
  db.one('INSERT INTO category (name, color_id) VALUES (${name}, ${color_id}) RETURNING id, name, color_id', req.body)
    .then((data) => {
      console.log('Successfully created category:', res);
      res.status(200).json({
        status: 'success',
        message: 'Created category',
        data: data
      })
    }).catch(error => {
      return next(error);
    })
})

/*============================================
  INDEX ROUTE
  - Get all categorys
============================================*/
router.get('/', (req, res, next) => {
  console.log('Getting all category');
  db.any('SELECT * FROM category')
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

/*============================================
  Show ROUTE
  - Get one category based on id
============================================*/
router.get('/:id', (req, res, next) => {
  console.log('Getting category with id', req.params.id);
  db.one('SELECT * FROM category WHERE id=$1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved category with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

module.exports = router;
