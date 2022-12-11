# multer

setting
```setting.js
const multer = require('multer')
/**
 * ファイルアップロードディレクトリ
 * dist or storage 保存場所
 * fileFilter ファイル受け入れ制御
 * limits ファイル大きさ制限
 * preservePath 元ファイル名保存
 */
const upload = multer({ dest: 'uploads/' });
```

req.file
```*.json
{
  "fieldname": "avatar", // フォームで指定されたフィールド名
  "originalname": "calendar2023.pdf", // ユーザーのコンピューター上のファイルの名前
  "encoding": "7bit", // ファイルのエンコーディングタイプ
  "mimetype": "application/pdf", // ファイルのMIMEタイプ
  "destination": "uploads/", // ファイルが保存されているフォルダ DiskStorage
  "filename": "d04f34eccc2cf8100b65ed726f28c14b", // 内のファイルの名前 destination DiskStorage
  "path": "uploads\\d04f34eccc2cf8100b65ed726f28c14b", // アップロードされたファイルへのフルパス DiskStorage
  "size": 7709762 // バイト単位のファイルのサイズ
}
```

form single or multiple
```*js
upload.single('avatar');
upload.array('photos', 12);
```

複数種類nameの組み合わせ
```*js
upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
```

https://github.com/mscdex/busboy#busboy-methods
busboy 制限を指定すると、サービス拒否( DoS )攻撃からサイトを保護できます
```
またよ、む
```



``` multerでのエラー処理
const multer = require('multer')
const upload = multer().single('avatar')

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  })
})
```