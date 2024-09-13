const authUtil = require('../../../response/authUtil');
const { Users } = require('../../../models');

const UpdateUser = async (req, res) => {
  const { email } = req.body;
  const userId = req.user.dataValues.userId

  try {
    const user = await Users.findOne({
      where: { userId },
    });


    if (user.dataValues.authority === 'user') {
      return res
        .status(403)
        .send(authUtil.successFalse(403, '어드민권한으로 다시시도 해주세요.'));
    } else {
      const targetUser = await Users.findOne({
        where: { email: email },
      });

      if (!targetUser) {
        return res
          .status(403)
          .send(authUtil.successFalse(403, '유저를 찾을 수 없습니다.'));
      } else {
        await Users.update({
          authority: 'admin'
        }, { where: { email: email } });
        return res
          .status(200)
          .send(
            authUtil.jwtSent(200, '회원정보가 정상적으로 수정되었습니다.')
          );
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = UpdateUser;
