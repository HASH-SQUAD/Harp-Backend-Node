const { verifyToken } = require('../tokens/jwt');
const { Users } = require('../models');
const authUtil = require('../response/authUtil');

const validateToken = async (req, res, next) => {
	const accessToken = req.header('accessToken');

	if (!accessToken) {
		return res
			.status(400)
			.send(authUtil.successFalse(400, '엑세스 토큰이 존재하지 않습니다.'));
	}

	const decoded = verifyToken(accessToken);
	if (!decoded) {
		return res.status(401).json(authUtil.successFalse(401, '유효하지 않은 토큰입니다.'));
	}

	const userId = decoded.id;
	const user = await Users.findOne({ where: { "id": userId } });

	if (!user) {
		return res.status(401).send(authUtil.successFalse(401, '존재하지 않는 유저입니다.'));
	} else {
		req.user = user;
		return next();
	}
};

module.exports = { validateToken };
