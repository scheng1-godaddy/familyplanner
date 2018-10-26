/*============================================
  Imports
============================================*/
const express = require('express');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  CREATE ROUTE
  - Create new appointments with POST
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new appointments entry:', req.body);
  db.one('INSERT INTO appointment '+
  '(start_datetime, end_datetime, name, description, location, creator_id, family_id, category_id, recurring,  is_recurring) '+
  'VALUES (${start_datetime}, ${end_datetime}, ${name}, ${description}, ${location}, ${creator_id}, ${family_id}, ${category_id}, ${recurring}, ${is_recurring}) RETURNING id, start_datetime, end_datetime, name, description, location, creator_id, family_id, category_id, recurring, is_recurring', req.body)
    .then((data) => {
      console.log('Successfully created appointment:', res);
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
  - Get all appointments events based on family ID
============================================*/
router.get('/family/:id', (req, res, next) => {
  console.log('Getting all appointments for family ID:', req.params.id);
  db.any('SELECT appointment.*, '+
  'category.name as category, '+
  'colors.name as color, '+
  'colors.value as color_value, '+
  'family.name as family_name, '+
  'users.name as creator_name ' +
  'FROM appointment '+
  'JOIN category ON appointment.category_id = category.id '+
  'JOIN colors ON category.color_id = colors.id '+
  'JOIN family ON appointment.family_id = family.id '+
  'JOIN users ON appointment.creator_id = users.id '+
  'WHERE appointment.family_id = $1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved all appointments events based on family ID'
      });
    }).catch((err) => {
      return next(err);
    })
});

/*============================================
  Show ROUTE
  - Get one appointments event based on id
============================================*/
router.get('/:id', (req, res, next) => {
  console.log('Getting appointments event with id', req.params.id);
  db.one('SELECT appointment.*, '+
  'category.name as category, '+
  'colors.name as color, '+
  'colors.value as color_value, '+
  'family.name as family_name, '+
  'users.name as creator_name ' +
  'FROM appointment '+
  'JOIN category ON appointment.category_id = category.id '+
  'JOIN colors ON category.color_id = colors.id '+
  'JOIN family ON appointment.family_id = family.id '+
  'JOIN users ON appointment.creator_id = users.id '+
  'WHERE appointment.id = $1', [req.params.id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved appointments event with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

/*============================================
  UPDATE ROUTE
  - Update appointments event with PUT
============================================*/
router.put('/:id', (req, res, next) => {
  req.body['id'] = req.params.id;
  console.log('Updating appointments entry:', req.body);
  db.one('UPDATE appointment SET start_datetime=${start_datetime}, end_datetime=${end_datetime}, name=${name}, description=${description}, location=${location}, creator_id=${creator_id}, family_id=${family_id}, category_id=${category_id}, recurring=${recurring},  is_recurring=${is_recurring} WHERE id=${id} RETURNING id, start_datetime, end_datetime, name, description, location, creator_id, family_id, category_id, recurring, is_recurring', req.body)
    .then((data) => {
      console.log('Successfully updated appointments event:', res);
      res.status(200).json({
        status: 'success',
        message: 'Updated appointments event',
        data: data
      })
    }).catch(error => {
      return next(error);
    })
})


/*============================================
  DELETE ROUTE
  - Delete one appointments event based on id
============================================*/
router.delete('/:id', (req, res, next) => {
  console.log('Deleting appointments event with id', req.params.id);
  db.none('DELETE FROM appointment WHERE id=$1', [req.params.id])
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Deleted appointments event with id: ' + req.params.id
      });
    }).catch((err) => {
      return next(err);
    })
});

module.exports = router;
