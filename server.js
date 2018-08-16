/*=====================================
  Imports
=====================================*/
const express = require('express');
const morgan = require('morgan');
const promise = require('bluebird');
// const Sequelize = require('sequelize');

var options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);

const app = express();


/*=====================================
  MiddleWare and Dependencies
=====================================*/
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
// const db = pgp(process.env.DATABASE_URL || "postgres://localhost:5432/yourproject")



// const db = pgp('postgresql://shawn:strinh777@localhost:5432/planner');

/*=====================================
  Start listener
=====================================*/
app.listen(port, () => {
  console.log('listening......');
});

/*=====================================
  Define database connection
=====================================*/
// db.connect()
//     .then(obj => {
//         console.log('Connected');
//         obj.done(); // success, release the connection;
//     })
//     .catch(error => {
//         console.log('ERROR:', error.message || error);
//     });

// const sequelize = new Sequelize('planner', 'shawn', 'strinh777', {
//   host: 'localhost',
//   dialect: 'postgres',
//   operatorsAliases: false,
//
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });
//
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   }).catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
//
//
// const User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });
//
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   }).then(() => {
//     User.findAll().then(users => {
//       console.log(users)
//     })
//   });
// });
