const authUtil = require('../../../response/authUtil');
const { Users } = require('../../../models');

const DeleteAccount = async (req, res) => {

  try {
    const user = await Users.findOne({
      where: { email: req.user.dataValues.email },
    });

    if (!user) {
      return res.status(401).send(authUtil.successFalse(401, '계정을 찾을 수 없습니다.'));
    } else {
      await Users.destroy({ where: { email: req.user.dataValues.email } });
      return res.status(200).send(authUtil.successTrue(200, '계정 삭제성공'));
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(authUtil.unknownError({ error: err }));
  }
};

module.exports = DeleteAccount;
