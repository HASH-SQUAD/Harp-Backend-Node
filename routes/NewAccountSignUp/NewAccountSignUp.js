const authUtil = require('../../response/authUtil');
const { Users } = require('../../models');

const NewAccount = async (req, res) => {
  const { nickname, birthdate, gender } = req.body;
  const userId = req.user.dataValues.userId


  try {
    const user = await Users.findOne({
      where: { userId: req.user.dataValues.userId },
    });

    if (!user.newAccount == false) {
      return res
        .status(403)
        .send(
          authUtil.jwtSent(403, '이미 가입된 유저입니다.')
        );
    } else {
      await Users.update({
        nickname,
        birthdate,
        gender,
        newAccount: false,
        authority: 'user'
      }, { where: { userId: userId } });

      return res
        .status(200)
        .send(
          authUtil.jwtSent(200, '회원가입이 완료되었습니다.')
        );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = NewAccount;
