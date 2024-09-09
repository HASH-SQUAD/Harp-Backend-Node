const authUtil = require('../../../response/authUtil.js');
const { Survey } = require('../../../models');
const { where } = require('sequelize');

const CreateSurvey = async (req, res) => {
  const { Q1, Q2, Q3, etc } = req.body;

  try {
    const user = await Survey.findOne({
      where: { userId: req.user.dataValues.userId },
    });

    if (user) {
      return res
        .status(403)
        .send(authUtil.successTrue(403, '이미 설문조사에 참여하셨습니다.'));
    } else {
      await Survey.create({
        question1: Q1,
        question2: Q2,
        question3: Q3,
        etc,
        userId: req.user.dataValues.userId
      })
      return res
        .status(200)
        .send(authUtil.successTrue(200, '설문조사 완료'));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
}

module.exports = CreateSurvey;