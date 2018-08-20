/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  CREATE ROUTE
  - Create new event type with POST
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new event type:', req.body);
  db.one('INSERT INTO eventtype (name, color_id) VALUES (${name}, ${color_id}) RETURNING id, name, color_id', req.body)
    .then((data) => {
      console.log('Successfully created event type:', res);
      res.status(200).json({
        status: 'success',
        message: 'Created event type',
        data: data
      })
    }).catch(error => {
      return next(error);
    })
})

/*============================================
  INDEX ROUTE
  - Get all event types
============================================*/
router.get('/', (req, res, next) => {
  console.log('Getting all event types');
  db.any('SELECT * FROM eventtype')
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all event types'
      });
    }).catch((err) => {
      return next(err);
    })
});

/*============================================
  Show ROUTE
  - Get one event type based on id
============================================*/
router.get('/:id', (req, res, next) => {
  console.log('Getting event type with id', req.params.id);
  db.one('SELECT * FROM eventtype WHERE id=$1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved event type with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

module.exports = router;
