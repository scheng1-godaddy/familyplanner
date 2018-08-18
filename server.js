/*=====================================
  Imports
=====================================*/
const express = require('express');
const morgan = require('morgan');
const promise = require('bluebird');

const app = express();


/*=====================================
  MiddleWare and Dependencies
=====================================*/
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan('tiny'));

/*=====================================
  Controllers
=====================================*/
const userController = require('./controllers/users.js');
app.use('/users', userController);

/*=====================================
  Constants
=====================================*/
const port = process.env.PORT || 3000;


/*=====================================
  Start listener
=====================================*/
app.listen(port, () => {
  console.log('listening......');
});
