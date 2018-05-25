const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
const products = require('./routes/products');
const morgan = require('morgan');

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev'));

app.use('/products', products);

module.exports = app;

