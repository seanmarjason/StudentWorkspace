var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors')
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artifactsRouter = require('./routes/artifacts');
var workspacesRouter = require('./routes/workspaces');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add CORS policy that allows all crossdomain requests for now
app.use(cors({ origin: '*' }));

// add middleware to automatically manage login sessions
app.use(session({
  secret: "blahblah4398u98dhuhioo",
  name: "session-id",
  saveUninitialized: false,
  resave: false,
  cookie: {expires: 3600 * 1000, domain: "localhost"}
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artifacts', artifactsRouter);
app.use('/workspaces', workspacesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// temporary
process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  process.exit();
});

module.exports = app;
