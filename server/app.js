const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.url);

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');

const MongoStore = require('connect-mongo')(session);
const mongoStore = new MongoStore({
  mongooseConnection: mongoose.connection,
});
const passportSocketIo = require('./config/socket')(mongoStore);
const io = require('socket.io');

const routes = require('./routes');
const socketRoutes = require('./routes/socket');

const app = express();

app.use(flash());
app.use(session({
  secret: 'NAME-secret',
  store: mongoStore,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.io = io();
app.io.use(passportSocketIo);
app.io.on('connection', socketRoutes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;

