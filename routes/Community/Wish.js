const authUtil = require('../../response/authUtil.js');
const { Wish } = require('../../models');
const { Op } = require('sequelize');

const ToggleWish = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.dataValues.userId;

  try {
    const wish = await Wish.findOne({
      where: {
        userId: userId,
        communityId: postId,
      },
      paranoid: false
    });

    if (wish) {
      if (wish.deletedAt === null) {
        await wish.destroy();
        return res
          .status(200)
          .send(authUtil.successTrue(200, '찜 취소 성공'));
      } else {
        await wish.restore();
        return res
          .status(200)
          .send(authUtil.successTrue(200, '찜 추가 성공'));
      }
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
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .send(authUtil.successFalse(400, '이미 찜한 게시물입니다'));
    }
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = ToggleWish;