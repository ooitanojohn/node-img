var express = require('express');
var router = express.Router();
const debug = require("debug")("http:index");

const { uploadIndex } = require("../app/controller/indexController");
const { uploadUser } = require("../app/module/indexUploader");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/** file単体で送る場合のファイルとリクエストbody */
router.post('/single/:params', async (req, res, next) => {
  // await uploadIndex(req, res, next);
  await uploadUser(req, res, next)
    .then((req) => {
      debug(req.body);
      debug(req.file);
    })
    .catch((err) => {
      debug(err);
    });
  // req.body.jsonを参照
  res.redirect(301, '/');
});

module.exports = router;
