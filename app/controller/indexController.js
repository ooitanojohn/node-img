const debugMulti = require("debug")("http:multi");
const multer = require('multer');
const { uploadImgAdmin, uploadThumbnail } = require("../common/multer");

const uploadImgAdminArray = uploadImgAdmin.array('photos', 12);

const multiUpload = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      uploadImgAdminArray(req, res, (err) => {
        // debugMulti(req.files);
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          throw new Error(err);
        }
      })
    } catch {
      debug(err);
      reject(new Error(err));
    }
    resolve(req);
  });
}

module.exports = { multiUpload };