const authUtil = require('../../response/authUtil.js');
const { Comments } = require('../../models');

const AddComments = async (req, res) => {
  const { des, isCommentForComment, parentComment, communityId } = req.body
  const userId = req.user.dataValues.userId;

  try {
    if (isCommentForComment) {
      const ParentComment = await Comments.findOne({ where: { commnetsId: parentComment } })
      if (!ParentComment) {
        return res
          .status(404)
          .send(authUtil.successTrue(404, '부모 댓글을 찾을 수 없습니다.'));
      }

      await Comments.create({
        des,
        isCommentForComment: true,
        parentComment,
        communityId,
        userId: userId
      });
      return res
        .status(200)
        .send(authUtil.successTrue(200, '댓글 작성 성공'));

    } else {
      await Comments.create({
        des,
        isCommentForComment,
        parentComment: null,
        communityId,
        userId: userId
      });
      return res
        .status(200)
        .send(authUtil.successTrue(200, '댓글 작성 성공'));
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error.message }));
  }
};

module.exports = AddComments;