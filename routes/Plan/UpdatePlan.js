const authUtil = require('../../response/authUtil');
const { Plan } = require('../../models');

const UpdateUser = async (req, res) => {
  const { planName, mainImg, startDate, endDate, data } = req.body;
  const userId = req.user.dataValues.userId
  const planId = req.params.id;

  try {
    const PlanData = await Plan.findOne({
      where: { planId },
    });

    if (!PlanData) {
      return res
        .status(403)
        .send(
          authUtil.jwtSent(403, '일정을 찾을 수 없음')
        );
    } else {
      if (PlanData.dataValues.userId != userId) {
        return res
          .status(403)
          .send(
            authUtil.jwtSent(403, '접근권한이 없습니다.')
          );
      } else {
        await Plan.update({ planName, mainImg, startDate, endDate, data }, { where: { planId: planId } });

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
