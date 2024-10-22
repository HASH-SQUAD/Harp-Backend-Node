const authUtil = require('../../response/authUtil.js');
const { Community, Wish, sequelize } = require('../../models');

const GetAllPost = async (req, res) => {
  try {
    const communities = await Community.findAll({
      attributes: [
        'communityId',
        'title',
        'des',
        [sequelize.fn('COUNT', sequelize.col('Wishes.wishId')), 'wishCount']
      ],
      include: [{
        model: Wish,
        attributes: [],
        required: false
      }],
      group: ['Community.communityId', 'Community.title', 'Community.des'],
      raw: true
    });

    return res
      .status(200)
      .send(authUtil.successTrue(200, '게시글 찾음', { communities }));
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = GetAllPost;