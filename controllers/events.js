/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  CREATE ROUTE
  - Create new event with POST
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new event type:', req.body);
  db.one('INSERT INTO events (name, description, location, eventtype_id) VALUES (${name}, ${description}, ${location}, ${eventtype_id}) RETURNING id, name, description, eventtype_id', req.body)
    .then((data) => {
      console.log('Successfully created event:', res);
      res.status(200).json({
        status: 'success',
        message: 'Created event',
        data: data
      })
    }).catch(error => {
      return next(error);
    })
})

/*============================================
  INDEX ROUTE
  - Get all events
============================================*/
router.get('/', (req, res, next) => {
  console.log('Getting all event');
  db.any('SELECT * FROM events')
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all events'
      });
    }).catch((err) => {
      return next(err);
    })
});

/*============================================
  Show ROUTE
  - Get one event based on id
============================================*/
router.get('/:id', (req, res, next) => {
  console.log('Getting event with id', req.params.id);
  db.one('SELECT * FROM events WHERE id=$1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved event with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

module.exports = router;
