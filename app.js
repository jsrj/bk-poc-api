const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const bodyParser   = require('body-parser');

const app = express();

// default value for title local
app.locals.title = 'Product and Inventory Aggregate';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {

  // render the error message
  res.status(err.status || 404);
  res.json({
      [err.message] : "Sorry. Either the endpoint entered is invalid, or something has gone wrong. Valid endpoints for consuming this API are listed below.",
      "GET All Items" : "http://localhost:3000/items",
      "GET Item By Name" : "http://localhost:3000/items/:itemName"
  });
});

module.exports = app;
