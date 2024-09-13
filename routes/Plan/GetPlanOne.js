const { Plan } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const CreatePlanOne = async (req, res) => {
  const userId = req.user.dataValues.userId;
  const planId = req.params.id;

  try {
    let PlanData = await Plan.findOne({ where: { planId: planId } });

    if (!PlanData) {
      return res
        .status(404)
        .send(authUtil.successTrue(404, '일정이 존재하지 않습니다.', { PlanData }));
    }

    if (PlanData.dataValues.userId === userId) {
      return res
        .status(403)
        .send(authUtil.successTrue(403, '접근권한이 없습니다.'));
    } else {
      return res
        .status(200)
        .send(authUtil.successTrue(200, '일정을 찾았습니다.', { PlanData }));
    }

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, '디코딩 중 문제발생 Console 확인바람'));
  }
}

module.exports = CreatePlanOne;
