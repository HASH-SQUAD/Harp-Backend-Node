const authUtil = require('../../../response/authUtil');
const { Users } = require('../../../models');

const UpdateUser = async (req, res) => {
  const { profileImg, nickname, birthdate, gender } = req.body;
  const userId = req.user.dataValues.userId


  try {
    const user = await Users.findOne({
      where: { userId: req.user.dataValues.userId },
    });

    if (!user) {
      return res
        .status(403)
        .send(
          authUtil.jwtSent(403, '유저를 찾을 수 없음')
        );
    } else {
      await Users.update({
        profileImg,
        nickname,
        birthdate,
        gender,
      }, { where: { userId: userId } });

      return res
        .status(200)
        .send(
          authUtil.jwtSent(200, '회원정보가 정상적으로 수정되었습니다.')
        );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = UpdateUser;
