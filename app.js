const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const debug = require("debug")("http:multer");

const { multiUpload } = require("./app/controller/indexController");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// const uploadImgAdminSingle = uploadImgAdmin.single('avatar');
// /** file単体で送る場合のファイルとリクエストbody */
// app.post('/single', (req, res, next) => {
//   debug(req.file);
//   debug(req.body);
//   try {
//     uploadImgAdminSingle(req, res, (err) => {
//       /** マルターで判定できたエラー */
//       if (err instanceof multer.MulterError) {
//         throw new Error(err);
//       } else if (err) {
//         /** 謎エラー */
//         throw new Error(err);
//       }
//     })
//   } catch {
//     debug(err);
//     next(err);
//   }
//   // req.body.jsonを参照
//   res.redirect(301, '/');
// });

/** file単体で送る場合のファイルとリクエストbody */
// const uploadImgThumbnail = uploadThumbnail.single('thumbnail');
// app.post('/thumbnail', (req, res, next) => {
//   debug(req.file);
//   debug(req.body);
//   try {
//     uploadImgThumbnail(req, res, (err) => {
//       if (err instanceof multer.MulterError) {
//         throw new Error(err);
//       } else if (err) {
//         throw new Error(err);
//       }
//     })
//   } catch {
//     debug(err);
//     next(err);
//   }
//   res.redirect(301, '/');
// });


/** 複数fileをアップロードする時 */
app.post('/multiple', async (req, res, next) => {
  debug(req.body);
  debug(req.files);
  await multiUpload(req, res);
  res.send('multi');
  // res.redirect(301, '/');
});

/** 複数種類nameの組み合わせ */
// const uploadAdminField = uploadImgAdmin.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

// app.post('/multipart', (req, res, next) => {
//   debug(req.files);
//   debug(req.body);
//   try {
//     uploadAdminField(req, res, (err) => {
//       if (err instanceof multer.MulterError) {
//         throw new Error(err);
//       } else if (err) {
//         throw new Error(err);
//       }
//     })
//   } catch {
//     debug(err);
//     next(err);
//   }
//   res.redirect(301, '/');
// })

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
