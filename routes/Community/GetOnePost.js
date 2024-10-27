const authUtil = require('../../response/authUtil.js');
const { Community, Wish, Comments, Users, sequelize } = require('../../models');

const GetOnePost = async (req, res) => {
  const communityId = req.params.id;

  try {
    const community = await Community.findOne({
      where: { communityId },
      attributes: [
        'communityId',
        'title',
        'des',
        'tag',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Wishes.wishId')), 'wishCount']
      ],
      include: [
        {
          model: Wish,
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

    if (!community) {
      return res
        .status(404)
        .send(authUtil.successTrue(404, '게시글을 찾을 수 없습니다.'));
    }

    const comments = await Comments.findAll({
      where: { communityId },
      attributes: [
        'commnetsId',
        'des',
        'isCommentForComment',
        'parentComment',
        'createdAt',
        'updatedAt',
        'likes'
      ],
      include: [
        {
          model: Users,
          as: 'author',
          attributes: ['userId', 'nickname', 'profileImg']
        }
      ],
      order: [['createdAt', 'ASC']],
      raw: true,
      nest: true
    });

    const structuredComments = comments.reduce((acc, comment) => {
      if (!comment.parentComment) {
        const repliesCount = comments.filter(reply =>
          reply.parentComment === comment.commnetsId
        ).length;

        const replies = comments
          .filter(reply => reply.parentComment === comment.commnetsId)
          .map(reply => ({
            ...reply,
            createdAt: new Date(reply.createdAt).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }),
            updatedAt: new Date(reply.updatedAt).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          }));

        acc.push({
          ...comment,
          repliesCount,
          replies 
        });
      }
      return acc;
    }, []);

    const formattedResponse = {
      ...community,
      tag: JSON.parse(community.tag || '[]'),
      wishCount: parseInt(community.wishCount),
      createdAt: new Date(community.createdAt).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      updatedAt: new Date(community.updatedAt).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      comments: structuredComments.map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }))
    };

    return res
      .status(200)
      .send(authUtil.successTrue(200, '게시글 찾음', { post: formattedResponse }));
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = GetOnePost;