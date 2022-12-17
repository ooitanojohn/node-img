const { uploadUser } = require("../module/indexUploader");
const debug = require("debug")("http:index");

const uploadIndex = async (res, req, next) => {
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
}

module.exports = { uploadIndex };