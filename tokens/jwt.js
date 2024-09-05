const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;
const AccessExpired = process.env.ACCESS_EXPIRED;
const RefreshExpired = process.env.REFRESH_EXPIRED;

const generateAccessToken = email => {
	return jwt.sign({ email: email }, secret, { expiresIn: AccessExpired });
};

const generateRefreshToken = email => {
	return jwt.sign({ email: email }, secret, { expiresIn: RefreshExpired });
};

const verifyToken = token => {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
