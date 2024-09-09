const multer = require('multer');
const path = require('path');

// 이미지 업로드
const imgUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/image');
    },
    filename(req, file, cb) {
      file.originalname = file.originalname
        .replace(/(.)/g, '')
        .toString('utf8');
      const ext = path
        .extname(file.originalname + Math.random(1, 1000))
        .toString('utf8');
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext + '.jpg');
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }
});


module.exports = { imgUpload };