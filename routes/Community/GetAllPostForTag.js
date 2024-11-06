const authUtil = require('../../response/authUtil.js');
const { Community, Wish, sequelize } = require('../../models');

const GetAllPostForTag = async (req, res) => {
  const { tag } = req.body;

  try {
    const communities = await Community.findAll({
      attributes: [
        'communityId',
        'title',
        'des',
        'tag',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Wishes.wishId')), 'wishCount']
      ],
      include: [{
        model: Wish,
        attributes: [],
        required: false
      }],
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

    const FilterPost = communities.filter(community => {
      const communityTags = JSON.parse(community.tag || '[]');
      return tag.some(searchTag => communityTags.includes(searchTag));
    });

    const Formatting = FilterPost.map(community => ({
      ...community,
      tag: JSON.parse(community.tag || '[]'),
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

module.exports = GetAllPostForTag;