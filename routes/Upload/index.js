const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware');
const { imgUpload } = require('./Upload');
const authUtil = require('../../response/authUtil.js');

router.post('/image', validateToken, imgUpload.single('img'), (req, res) => {
	const IMG_URL = `${process.env.SERVER_ORIGIN}/image/${req.file.filename}`;
	res
		.status(200)
		.send(authUtil.successTrue(200, '이미지 업로드가 완료되었습니다.', { url: IMG_URL }));
});

module.exports = router;
