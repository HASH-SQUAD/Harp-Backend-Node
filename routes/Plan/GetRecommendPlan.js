const { RecommendPlan } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const GetRecommendPlan = async (req, res) => {
  try {
    let PlanData = await RecommendPlan.findAll({
      order: [['RecommendPlanId', 'DESC']],
      limit: 5
    });

    if (!PlanData || PlanData.length === 0) {
      return res
        .status(404)
        .send(authUtil.successTrue(404, '일정이 존재하지 않습니다.', { PlanData }));
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

module.exports = GetRecommendPlan;
