var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profilesellerRouter = require('./routes/profilesellerRouter');
var profilebuyerRouter = require('./routes/profilebuyerRouter');
var contactusRouter = require('./routes/contactusRouter');
var postsubRouter = require('./routes/postsubRouter');
var submissionsRouter = require('./routes/submissionsRouter');
var editsubRouter = require('./routes/editsubRouter');
var adminverifyRouter = require('./routes/adminverifyRouter');
var adminverifysingleRouter = require('./routes/adminverifysingleRouter');
var homeRouter = require('./routes/homeRouter');
var itemDetailRouterRouter = require('./routes/itemdetailRouter');
var favoriteRouter = require('./routes/favoriteRouter');
var shoppingRouter = require('./routes/shoppingRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => {console.log(err);});

var app = express();
const port = 5000; //Node.js uses port 5000 for development server

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/profileseller', profilesellerRouter);
app.use('/profilebuyer', profilebuyerRouter);
app.use('/contactus', contactusRouter);
app.use('/postsub', postsubRouter);
app.use('/submissions', submissionsRouter);
app.use('/editsub', editsubRouter);
app.use('/adminverify', adminverifyRouter);
app.use('/adminverifysingle', adminverifysingleRouter);
app.use('/home', homeRouter);
app.use('/itemdetail', itemDetailRouterRouter);
app.use('/fav', favoriteRouter);
app.use('/shoppingcart', shoppingRouter);

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

/**
 * Should be listening to port 5000, will tell us if not
 */
app.listen(port, () => {
  console.log(`Development server is running on port: ${port}`);
});

module.exports = app;
