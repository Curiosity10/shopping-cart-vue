const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const history = require('connect-history-api-fallback');
const createError = require('http-errors');
const path = require('path');
const expressStaticGzip = require("express-static-gzip");
const products = require('./routes/products');

const app = express();

//-----------------------MONGODB--------------
//----------Local db--------------------------
//const mongoDB = 'mongodb://127.0.0.1/my_database';
//----------Mlab db--------------------------
const mongoDB = 'mongodb://Admin:admin@ds131989.mlab.com:31989/intshop';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors({ origin: true }));
app.use(history());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", expressStaticGzip(path.join(__dirname, 'dist')));

app.use('/products', products);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
