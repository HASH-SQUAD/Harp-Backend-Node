const authUtil = require('../../response/authUtil');
const { Users } = require('../../models');

const NewAccount = async (req, res) => {
  const { nickname, birthdate, gender } = req.body;
  const userId = req.user.dataValues.userId


  try {
    await Users.update({
      nickname, birthdate, gender
    }, { where: { userId: userId } });

    return res
      .status(200)
      .send(
        authUtil.jwtSent(200, '회원가입이 완료되었습니다.')
      );
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = NewAccount;
