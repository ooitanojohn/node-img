const debug = require("debug")("http:uploader");
const multer = require('multer');
const { storage, fileFilterImg, fileFilterPdf } = require("../common/multer");

/**
 * user
 */
/**
 * 設定
 * storage,フォルダ名を指定
 */
const uploadImgUser = multer({
  storage: storage('user'),
  fileFilter: fileFilterImg,
});
/** 単体アップロード */
const uploadImgUserSingle = uploadImgUser.single('avatar');
const uploadUser = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      uploadImgUserSingle(req, res, (err) => {
        // debug(req.file);
        // debug(req.body);
        /** マルターで判定できたエラー */
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          /** 謎エラー */
          throw new Error(err);
        }
        resolve(req);
      });
    } catch {
      debugMulti(err);
      reject(new Error(err));
    }
  })
};

/**
 * admin
 */
/** admin */
const uploadImgAdmin = multer({
  storage: storage('product'),
  fileFilter: fileFilterImg,
  // 画像の制限の最適が不明
  // limits: {}
});
/** 単体アップロード */
const uploadImgAdminSingle = uploadImgAdmin.single('avatar');
const uploadAdmin = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      uploadImgAdminSingle(req, res, (err) => {
        /** マルターで判定できたエラー */
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          /** 謎エラー */
          throw new Error(err);
        }
        resolve(req);
      });
    } catch {
      debugMulti(err);
      reject(new Error(err));
    }
  })
};

/** 複数枚アップロード */
const uploadImgAdminArray = uploadImgAdmin.array('photos', 12);
const multiUploadAdmin = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      uploadImgAdminArray(req, res, (err) => {
        // debugMulti(req.files);
        if (err instanceof multer.MulterError) {
          throw new Error(err);
        } else if (err) {
          throw new Error(err);
        }
        resolve(req);
      })
    } catch {
      debugMulti(err);
      reject(new Error(err));
    }
  });
};

/** 画像のリサイズ  */
const memoryStorage = multer.memoryStorage;
const uploadThumbnail = multer({
  storage: storage(),
  fileFilter: fileFilterImg,
});

/** pdfアップロード */
const uploadPdf = multer({
  storage: storage(),
  fileFilter: fileFilterPdf,
});


module.exports = { uploadUser, uploadAdmin, multiUploadAdmin };