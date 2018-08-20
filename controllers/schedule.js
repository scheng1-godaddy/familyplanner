/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  CREATE ROUTE
  - Create new schedule with POST
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new schedule entry:', req.body);
  db.one('INSERT INTO schedule (start_datetime, end_datetime, event_id, creator_id, family_id, recurring,  is_recurring) VALUES (${start_datetime}, ${end_datetime}, ${event_id}, ${creator_id}, ${family_id}, ${recurring},  ${is_recurring}) RETURNING id, start_datetime, end_datetime, event_id, creator_id, family_id, recurring,  is_recurring', req.body)
    .then((data) => {
      console.log('Successfully scheduled event:', res);
      res.status(200).json({
        status: 'success',
        message: 'Scheduled event',
        data: data
      })
    }).catch(error => {
      return next(error);
    })
})

/*============================================
  INDEX ROUTE
  - Get all scheduled events
============================================*/
router.get('/', (req, res, next) => {
  console.log('Getting all scheduled events');
  db.any('SELECT * FROM schedule')
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all scheduled events'
      });
    }).catch((err) => {
      return next(err);
    })
});

/*============================================
  Show ROUTE
  - Get one scheduled event based on id
============================================*/
router.get('/:id', (req, res, next) => {
  console.log('Getting scheduled event with id', req.params.id);
  db.one('SELECT * FROM schedule WHERE id=$1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved scheduled event with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

/*============================================
  UPDATE ROUTE
  - Update schedule event with PUT
============================================*/
router.put('/:id', (req, res, next) => {
  console.log('Updating schedule entry:', req.body);
  db.one('UPDATE schedule SET start_datetime=${start_datetime}, end_datetime=${end_datetime}, event_id=${event_id}, creator_id=${creator_id}, family_id=${family_id}, recurring=${recurring},  is_recurring=${is_recurring} WHERE id=${id} RETURNING id, start_datetime, end_datetime, event_id, creator_id, family_id, recurring, is_recurring', req.body)
    .then((data) => {
      console.log('Successfully updated scheduled event:', res);
      res.status(200).json({
        status: 'success',
        message: 'Updated scheduled event',
        data: data
      })
    }).catch(error => {
      return next(error);
    })
})


/*============================================
  DELETE ROUTE
  - Delete one scheduled event based on id
============================================*/
router.delete('/:id', (req, res, next) => {
  console.log('Deleting scheduled event with id', req.params.id);
  db.one('DELETE FROM schedule WHERE id=$1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Deleted scheduled event with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

module.exports = router;
