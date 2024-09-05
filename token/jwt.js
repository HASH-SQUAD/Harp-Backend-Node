const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;
const AccessExpired = process.env.ACCESS_EXPIRED;
const RefreshExpired = process.env.REFRESH_EXPIRED;

const generateAccessToken = userid => {
  return jwt.sign(
    {
      userid,
    },
    secret,
    {
      expiresIn: AccessExpired,
    }
  );
};

const generateRefreshToken = userid => {
  return jwt.sign(
    {
      userid,
    },
    secret,
    {
      expiresIn: RefreshExpired,
    }
  );
};

module.exports = {generateAccessToken, generateRefreshToken};
