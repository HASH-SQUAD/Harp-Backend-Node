const authUtil = require("../../../response/authUtil");

const AuthState = (req, res) => {
  return res.status(201).send(
    authUtil.successTrue(201, '회원상태 조회완료', {
      nickname: req.user?.name,
      email: req.user?.email,
      profileImg: req.user?.profileImg,
      newAccount: req.user?.newAccount
    }))
};

module.exports = AuthState;
