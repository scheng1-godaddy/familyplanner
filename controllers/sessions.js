/*============================================
  Imports
============================================*/
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/db');

// Create router object
const router = express.Router();

/*============================================
  CREATE SESSION ROUTE
============================================*/
router.post('/', (req, res, next) => {
  console.log('Creating new session', req.body);
  db.one('SELECT * FROM users WHERE email=$1', [req.body.email])
    .then((foundUser) => {
      if (foundUser.email === null) {
        console.log('Unable to find user');
        res.status(403).json({
          status: 403,
          message: "Email not found"
        })
      } else {
        // Found user
        // Check password
        console.log('Found users email is', foundUser.email);
        console.log('reqbody password', req.body.password);
        console.log('foundUser password', foundUser.password);
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          // Set session to current user
          req.session.currentUser = foundUser
          res.status(201).json({
            status: 201,
            message: "Session created"
          })
        } else {
          // Password didn't match
          res.status(401).json({
            status: 401,
            message: "Login Failed"
          })
        }
      }
    }).catch(error => {
      return next(error);
    })
})


module.exports = router;
