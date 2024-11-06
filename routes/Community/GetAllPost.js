const authUtil = require('../../response/authUtil.js');
const { Community, Wish, sequelize, Comments } = require('../../models');

const GetAllPost = async (req, res) => {
  try {
    const communities = await Community.findAll({
      attributes: [
        'communityId',
        'title',
        'des',
        'tag',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Wishes.wishId')), 'wishCount'],
        [sequelize.fn('COUNT', sequelize.col('comments.commnetsId')), 'commentCount']
      ],
      include: [
        {
          model: Wish,
          attributes: [],
          required: false
        },
        {
          model: Comments,
          as: 'comments',
          attributes: [],
          required: false
        }
      ],
      group: [
        'Community.communityId',
        'Community.title',
        'Community.des',
        'Community.tag',
        'Community.createdAt',
        'Community.updatedAt'
      ],
      raw: true
    });

    const Formatting = communities.map(community => ({
      ...community,
      tag: JSON.parse(community.tag || '[]'),
      wishCount: parseInt(community.wishCount),
      commentCount: parseInt(community.commentCount),
      createdAt: community.createdAt,
      updatedAt: community.updatedAt
    }));

    return res
      .status(200)
      .send(authUtil.successTrue(200, '게시글 찾음', { Formatting }));
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = GetAllPost;