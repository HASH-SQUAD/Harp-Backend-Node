const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;
const AccessExpired = process.env.ACCESS_EXPIRED;
const RefreshExpired = process.env.REFRESH_EXPIRED;

const generateAccessToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: AccessExpired });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: RefreshExpired });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
