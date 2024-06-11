const { verifyToken, generateAccessToken } = require('../../tokens/jwt');
const authUtil = require('../../response/authUtil');

const Refresh = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).send(authUtil.successFalse(400, '리프레시 토큰이 존재하지 않습니다.'));
  }

  const decoded = verifyToken(refreshToken);
  if (!decoded) {
    return res.status(401).json(authUtil.successFalse(401, '유효하지 않은 리프레시 토큰입니다.'));
  }

  const accessToken = generateAccessToken(decoded.id);
  res.json({ accessToken });
};

module.exports = Refresh;
