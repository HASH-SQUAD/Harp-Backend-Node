const authUtil = require('../../response/authUtil.js');
const { Wish } = require('../../models');

const GetWish = async (req, res) => {
  const userId = req.user.dataValues.userId;

  try {
    const existingWish = await Wish.findAll({
      where: {
        userId: userId,
      }
    });

    return res
      .status(200)
      .send(authUtil.successTrue(200, '찜 찾음', existingWish));

  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = GetWish;