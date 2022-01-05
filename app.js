var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var myRouter = require('./routes/router');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var api_exercise = require('./routes/api_exercise');
var api_study = require('./routes/api_study');

//登入註冊mongodb
var mongoose = require('mongoose');            
mongoose.connect('mongodb://localhost/PunchIn')//連接本地數據庫PunchIn
var db = mongoose.connection;
console.log("DB connected!!");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'mySecret',
  name: 'user', // optional
  saveUninitialized: false,
  resave: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', myRouter);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api_exercise', api_exercise);
app.use('/api_study', api_study);
app.use('/public',express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// 連接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 連接失敗
db.on('error', function(){
    console.log('MongoDB Connection Error');
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

module.exports = app;
