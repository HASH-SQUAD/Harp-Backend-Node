const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.post('/', async (req, res) => {
	const { googleId, email, name, profileImg, provider } = req.body;
	// 유저아이디 존재여부 확인
	const user = await Users.findOne({ where: { googleId: googleId } });

	if (!user) {
		Users.create({
			googleId: googleId,
			name: name,
			email: email,
			profileImg: profileImg,
			provider: provider,
		});
		res.json('회원가입 성공!');
	} else {
		res.json({ error: '이미 존재하는 아이디입니다.' });
	}
});

module.exports = router;
