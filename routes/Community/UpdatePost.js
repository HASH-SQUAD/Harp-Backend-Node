const authUtil = require('../../response/authUtil.js');
const { Community } = require('../../models')

const UpdatePost = async (req, res) => {
  const { title, des, tag, images } = req.body
  const postId = req.params.id

  try {
    const communities = await Community.findOne({ where: { communityId: postId } })

    if (!communities) {
      return res
        .status(401)
        .send(authUtil.successFalse(401, '게시글을 찾을 수 없습니다.'));
    }

    if (communities.userId === req.user.dataValues.userId) {
      await Community.update({
        title,
        des,
        tag,
        images
      }, { where: { communityId: postId } });
      return res
        .status(200)
        .send(authUtil.successTrue(200, '게시글 수정 완료!'));
    } else {
      return res
        .status(401)
        .send(authUtil.successFalse(401, '게시글 작성자만 수정할 수 있습니다.'));
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(authUtil.unknownError({ end: err }));
  }
};

module.exports = UpdatePost;
