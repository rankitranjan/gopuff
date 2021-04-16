const createError = require('http-errors');
const express = require('express');
const routes = require('./routes');
const constants = require('constants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routes);

app.use('/', (req, res) => {
  res.send('All Good')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(constants.response_code.NOT_FOUND));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error
  res.status(err.status || constants.response_code.INTERNAL_SERVER_ERROR);
  res.render('error');
});

module.exports = app;
