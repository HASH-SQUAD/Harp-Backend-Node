const authUtil = require('../../response/authUtil.js');
const { Wish } = require('../../models');

const GetIsLike = async (req, res) => {
  const userId = req.user.dataValues.userId;
  const communityId = req.params.id
  console.log(typeof communityId);

  try {
    const existingWish = await Wish.findAll({
      where: {
        userId: userId,
      }
    });

    if (communityId) {
      let isTure = false
      existingWish.some(wish => {
        if (wish.dataValues.communityId === Number(communityId)) {
          isTure = true
        }
      });
      return res
        .status(200)
        .send(authUtil.successTrue(200, '찜 찾음', { status: isTure }));
    }

    return res
      .status(404)
      .send(authUtil.successTrue(404, "찜을 찾을 수 없음"))

  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = GetIsLike;