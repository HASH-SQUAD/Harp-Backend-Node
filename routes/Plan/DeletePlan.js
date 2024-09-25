const authUtil = require('../../response/authUtil');
const { Plan } = require('../../models');

const DeletePlan = async (req, res) => {
  const userId = req.user.dataValues.userId
  const planId = req.params.id;

  try {
    const PlanData = await Plan.findOne({
      where: { planId },
    });

    if (PlanData) {
      if (PlanData.dataValues.userId === userId) {
        await Plan.destroy({ where: { planId } });
        return res
          .status(200)
          .send(authUtil.successTrue(200, '일정을 삭제했습니다.'));
      } else {
        return res
          .status(403)
          .send(authUtil.successFalse(403, '접근권한이 없습니다.'));
      }
    } else {
      return res
        .status(404)
        .send(authUtil.successFalse(404, '삭제할 일정을 찾을 수 없습니다.'));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
};

module.exports = DeletePlan;
