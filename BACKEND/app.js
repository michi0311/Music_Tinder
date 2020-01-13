/* * * * * * * * * * * * * * *
 * Created By Michael Marolt *
 * * * * * * * * * * * * * * */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require(path.normalize('../BACKEND/src/routes/login'));
var usersRouter = require(path.normalize('../BACKEND/src/routes/user'));
var matchRouter = require(path.normalize('../BACKEND/src/routes/userMatch'));
var songRouter = require(path.normalize('../BACKEND/src/routes/song'))

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/match',matchRouter);
app.use('/api/song',songRouter)

module.exports = app;
