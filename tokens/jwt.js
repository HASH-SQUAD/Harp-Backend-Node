const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;
const AccessExpired = process.env.ACCESS_EXPIRED;
const RefreshExpired = process.env.REFRESH_EXPIRED;

const generateAccessToken = id => {
	const accessToken = jwt.sign(
		{
			id,
		},
		secret,
		{
			expiresIn: AccessExpired,
		}
	);
	return accessToken;
};

const generateRefreshToken = id => {
	const refreshToken = jwt.sign(
		{
			id,
		},
		secret,
		{
			expiresIn: RefreshExpired,
		}
	);
	return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
