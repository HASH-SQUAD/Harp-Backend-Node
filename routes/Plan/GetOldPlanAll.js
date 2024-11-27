const { Plan } = require('../../models');
const authUtil = require('../../response/authUtil.js');
const { Op } = require('sequelize');
const moment = require('moment');

const GetOldPlanAll = async (req, res) => {
  const userId = req.user.dataValues.userId;
  const today = moment().format('YYYY/MM/DD');

  try {
    const whereClause = {
      userId: userId,
      endDate: { [Op.lt]: today }
    };

    console.log(whereClause);

    let PlanData = await Plan.findAll({
      where: whereClause,
      order: [['endDate', 'DESC']]
    });

    if (PlanData.length === 0) {
      return res
        .status(404)
        .send(authUtil.successTrue(404, '지난 일정이 존재하지 않습니다.', { PlanData }));
    } else {
      return res
        .status(200)
        .send(authUtil.successTrue(200, '지난 일정을 찾았습니다.', { PlanData }));
    }

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, '일정 조회 중 오류가 발생했습니다.'));
  }
}

module.exports = GetOldPlanAll;
