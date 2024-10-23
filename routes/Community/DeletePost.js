const authUtil = require('../../response/authUtil.js');
const { Community } = require('../../models')

const DeletePost = async (req, res) => {
  const postId = req.params.id

  try {
    const communities = await Community.findOne({ where: { communityId: postId } })

    if (!communities) {
      return res
        .status(401)
        .send(authUtil.successFalse(401, '게시글을 찾을 수 없습니다.'));
    }

    if (communities.userId === req.user.dataValues.userId) {
      await Community.destroy({ where: { communityId: postId } });
      return res.status(200).send(authUtil.successTrue(200, '게시글 삭제 완료!'));
    } else {
      return res
        .status(401)
        .send(authUtil.successFalse(401, '글 작성자만 삭제할 수 있습니다.'));
    }

  } catch (err) {
    console.log(err);
    return res.status(500).send(authUtil.unknownError({ end: err }));
  }
};

module.exports = DeletePost;
