const authUtil = require('../../response/authUtil.js');
const { Wish } = require('../../models');

const ToggleWish = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.dataValues.userId;

  try {
    const existingWish = await Wish.findOne({
      where: {
        userId: userId,
        communityId: postId
      }
    });

    if (existingWish) {
      await existingWish.destroy();
      return res
        .status(200)
        .send(authUtil.successTrue(200, '찜 취소 성공'));
    } else {
      await Wish.create({
        userId: userId,
        communityId: postId
      });
      return res
        .status(200)
        .send(authUtil.successTrue(200, '찜 추가 성공'));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = ToggleWish;