/*=====================================
  Imports
=====================================*/

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const promise = require('bluebird');
const session = require('express-session');

const app = express();

app.use(session({
  secret: "feedmeseymour",
  resave: false,
  saveUninitialized: false
}));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());

app.use(morgan('tiny'));

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

/*=====================================
  Controllers
=====================================*/
const userController = require('./controllers/users.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const categoryController = require('./controllers/category.js');
app.use('/category', categoryController);

const appointmentsController = require('./controllers/appointments.js');
app.use('/appointments', appointmentsController);

const colorsController = require('./controllers/colors.js');
app.use('/colors', colorsController);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
