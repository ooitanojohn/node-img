const debugMulti = require("debug")("http:multi");
const multer = require('multer');
const { uploadImgAdmin, uploadThumbnail } = require("../common/multer");


/** 単体アップロード */
const uploadImgAdminSingle = uploadImgAdmin.single('avatar');
const upload = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      uploadImgAdminSingle(req, res, (err) => {
        /** マルターで判定できたエラー */
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          /** 謎エラー */
          throw new Error(err);
        }
      });
    } catch {
      debugMulti(err);
      reject(new Error(err));
    }
    resolve(req);
  })
};

/** 複数枚アップロード */
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
      debugMulti(err);
      reject(new Error(err));
    }
    resolve(req);
  });
};




module.exports = { upload, multiUpload };