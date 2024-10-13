const { Users } = require('../../../models');
const authUtil = require('../../../response/authUtil');

const Logout = async (req, res) => {
  try {
    await Users.update({ refreshToken: null }, { where: { userId: req.user.dataValues.userId } });
    return res.status(200).send(authUtil.successTrue(200, '로그아웃 성공'));
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = Logout;