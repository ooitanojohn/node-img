const debugMulti = require("debug")("http:multi");
const multer = require('multer');
const { uploadImgAdmin, uploadThumbnail } = require("../common/multer");

const uploadImgAdminArray = uploadImgAdmin.array('photos', 12);

const multiUpload = (req, res) => {
  try {
    uploadImgAdminArray(req, res, (err) => {
      debugMulti(req.files);
      debugMulti(req.body);
      if (err instanceof multer.MulterError) {
        throw new Error(err);
      } else if (err) {
        throw new Error(err);
      }
    })
  } catch {
    debug(err);
    return new Error(err);
  }
}

module.exports = { multiUpload };