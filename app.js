require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("./config/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const db = mongoose.connection;
// When successfully connected
db.on("connected", function() {
  console.log("Mongo DB connection open for DB");
});

var indexRouter = require('./routes/index');

var app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
