/**
 * multer設定
 */
const debug = require("debug")("http:multer");
const multer = require('multer')
const path = require('path');

/**
 * ファイルアップロードディレクトリ
 * dist or storage 保存場所
 * fileFilter ファイル受け入れ制御
 * limits ファイル大きさ制限
 * preservePath 元ファイル名保存
 */
/** バイナリデータで保存 */
// const upload = multer({ dest: 'uploads/' });

/**
 * 保存するフォルダ、パス名を相対で指定する
 * @param {*} folderName 保存したいフォルダ名を入力
 * @param {*} fileName 保存したいファイル名を入力
 * @returns multerEngine
 */
const storage = (folderName, fileName) => {
  return multer.diskStorage({
    /** どのフォルダにどんな名前で保存するか */
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../uploads/${folderName}/`))
    },
    filename: (req, file, cb) => {
      cb(null, fileName + '.' + file.mimetype.split('/')[1])
    }
  })
};

/**
 * multerのファイルアップロードエラーハンドラ関数
 * mime-typeが画像の拡張子のみ許可する
 * 他にも実行ファイルを防ぐ、ファイルのチェック方法はあるみたい。
 * mime-typeは偽装可能
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 */
/** imgフィルタ */
const fileFilterImg = (req, file, cb) => {
  debug(file);
  if (["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new TypeError("Invalid File Type"));
};

/** pdf,csvフィルタ */
const fileFilterPdf = (req, file, cb) => {
  debug(file.mimetype);
  if (["application/pdf"].includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new TypeError("Invalid File Type"));
};


/**
 * multerのインスタンス設定
 * 下記に各種類の細かい設定
 * ファイル種類毎に変えよう！
 */
/** 画像ファイルアップロード */
/** admin */
const uploadImgAdmin = multer({
  storage: storage('test', 'temp'),
  fileFilter: fileFilterImg,
  // 画像の制限の最適が不明
  // limits: {}
});
/** user */
const uploadImgUser = multer({
  storage: storage,
  fileFilter: fileFilterImg,
});
/** pdfアップロード */
const uploadPdf = multer({
  storage: storage(),
  fileFilter: fileFilterPdf,
});

module.exports = { uploadImgAdmin, uploadImgUser, uploadPdf };


/** 使用例 */

/** ファイルサイズ制限 */
// const { upload } = require("./common/multer");

// /** file単体で送る場合のファイルとリクエストbody */
// app.post('/profile', upload.single('avatar'), (req, res, next) => {
//   debug(req.file);
//   debug(req.body);
//   // req.body.jsonを参照
//   res.redirect(301, '/');
// });

// /** 複数fileをアップロードする時 */
// app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
//   debug(req.files);
//   debug(req.body);
//   res.redirect(301, '/');
// });

// /** 複数種類nameの組み合わせ */
// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, (req, res, next) => {
//   debug(req.files);
//   debug(req.body);
//   res.redirect(301, '/');
// })


/** 使用例フォーム */

    // <h2>単体ファイルupload</h2>
    // <form action="/profile" method="post" enctype="multipart/form-data">
    //   <input type="file" name="avatar" />
    //   <button type="submit">送信</button>
    // </form>
    // <h2>複数ファイルアップロード</h2>
    // <form action="/photos/upload" method="post" enctype="multipart/form-data">
    //   <input type="file" name="photos" multiple />
    //   <button type="submit">送信</button>
    // </form>
    // <h2>複数種類nameの組み合わせ</h2>
    // <form action="/photos/upload" method="post" enctype="multipart/form-data">
    //   <input type="file" name="avatar" />
    //   <input type="file" name="gallery" multiple />
    //   <button type="submit">送信</button>
    // </form>