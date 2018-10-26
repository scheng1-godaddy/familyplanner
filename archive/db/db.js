/*=====================================
  Creates a database pg-promise object that can be used to connect to postgres
=====================================*/
const promise = require('bluebird');

// Create options (We're using bluebird for promises)
const options = {
  promiseLib: promise
};

console.log('db env url', process.env.DATABASE_URL);
// Create the pg-promise object and export it
const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgresql://shawn:strinh777@localhost:5432/planner';
const db = pgp(connectionString);

module.exports = db;
