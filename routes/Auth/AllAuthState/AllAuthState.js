const authUtil = require('../../../response/authUtil');
const { Users } = require('../../../models');

const AllAuthState = async (req, res) => {
  const userId = req.user.dataValues.userId

  try {
    const user = await Users.findOne({
      where: { userId },
    });

    if (!user) {
      return res
        .status(403)
        .send(
          authUtil.successFalse(403, '유저를 찾을 수 없음')
        );//닉네임, 젠더, 프로필이미지, 이메일, 생년월일
    } else {
      return res
        .status(200)
        .send(
          authUtil.successTrue(200, '유저 정보를 찾았습니다.', {
            nickname: user.nickname,
            gender: user.gender,
            profileImg: user.profileImg,
            email: user.email,
            birthdate: user.birthdate
          })
        );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = AllAuthState;
