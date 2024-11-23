const authUtil = require('../../../response/authUtil');
const { Users } = require('../../../models');
const bcrypt = require('bcrypt');

const SignUp = async (req, res) => {
	const { email, password, name } = req.body;
	const data = {
		email: email,
		name: name,
		profileImg: "http://img1.kakaocdn.net/thumb/R110x110.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
		newAccount: true,
		authority: 'user',
		provider: 'self-sign'
	}

	try {
		const user = await Users.findOne({
			where: { email },
			paranoid: false,
		});

		if (user) {
			if (user.deletedAt) {
				const tenMinutes = 10 * 60 * 1000;
				const now = new Date();
				const deletedAt = new Date(user.deletedAt);

				if (now - deletedAt < tenMinutes) {
					return res
						.status(401)
						.send(authUtil.successFalse(401, '탈퇴 후 너무 빠른 가입되었습니다. 10분 후에 다시 시도해주세요.'));
				}
			}
			const hash = await bcrypt.hash(password, 10);
			data.authId = hash
			await Users.create(data);
			await Users.update({ deletedAt: null }, { where: { email } });
			return res
				.status(200)
				.send(authUtil.successTrue(200, '유저 회원가입에 성공하였습니다.'));
		} else {
			const hash = await bcrypt.hash(password, 10);
			data.authId = hash
			await Users.create(data);
			return res
				.status(200)
				.send(authUtil.successTrue(200, '유저 회원가입에 성공하였습니다.'));
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error: error }));
	}

};

module.exports = SignUp;
