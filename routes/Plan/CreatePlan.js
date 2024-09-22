const { Plan } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const CreatePlan = async (req, res) => {
  const { planName, mainImg, startDate, endDate, data } = req.body;

  try {
    await Plan.create({
      planName,
      mainImg,
      startDate,
      endDate,
      data,
      userId: req.user.dataValues.userId
    })

    const UserPlanData = await Plan.findOne({
      order: [['planId', 'DESC']]
    });

    return res
      .status(200)
      .send(authUtil.successTrue(200, '일정 생성에 성공하였습니다.', UserPlanData));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, '디코딩 중 문제발생 Console 확인바람'));
  }


}

module.exports = CreatePlan;
