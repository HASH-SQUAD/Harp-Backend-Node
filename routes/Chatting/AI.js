const authUtil = require('../../response/authUtil.js');
const { AI } = require('../../models')

const CreateAI = async (req, res) => {
  try {
    const Ai_Instance = await AI.create({ userId: req.user.dataValues.userId })
    return res
      .status(200)
      .send(authUtil.successTrue(200, 'AI 생성에 성공하였습니다.', { AI_ID: Ai_Instance.aiId }));
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
}

module.exports = CreateAI;