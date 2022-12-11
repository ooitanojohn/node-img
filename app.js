var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const debug = require("debug")("http:multer");
const { upload } = require("./common/multer");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


/** ファイルサイズ制限 */

/** file単体で送る場合のファイルとリクエストbody */
app.post('/profile', upload.single('avatar'), (req, res, next) => {
  debug(req.file);
  debug(req.body);
  // req.body.jsonを参照
  res.redirect(301, '/');
});

/** 複数fileをアップロードする時 */
app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
  debug(req.files);
  debug(req.body);
  res.redirect(301, '/');
});

/** 複数種類nameの組み合わせ */
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, (req, res, next) => {
  debug(req.files);
  debug(req.body);
  res.redirect(301, '/');
})






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
