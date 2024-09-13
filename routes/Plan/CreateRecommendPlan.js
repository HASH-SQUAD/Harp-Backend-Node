const { RecommendPlan, Users } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const CreatePlan = async (req, res) => {
  const { mainImg, title, data } = req.body;
  const userId = req.user.dataValues.userId

  try {
    const user = await Users.findOne({
      where: { userId: userId },
    });

    console.log(user.dataValues.authority);

    if (user.dataValues.authority === 'user') {
      return res
        .status(403)
        .send(authUtil.successFalse(403, '어드민권한으로 다시시도 해주세요.'));
    } else {
      await RecommendPlan.create({
        mainImg,
        title,
        data,
        userId
      })
      return res
        .status(200)
        .send(authUtil.successTrue(200, '추천일정 생성에 성공하였습니다.'));
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, '디코딩 중 문제발생 Console 확인바람'));
  }


}

module.exports = CreatePlan;
