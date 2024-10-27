const authUtil = require('../../response/authUtil.js');
const { Comments } = require('../../models')

const DeleteComments = async (req, res) => {
  const commnetsId = req.params.id

  try {
    const Comment = await Comments.findOne({ where: { commnetsId } })

    if (!Comment) {
      return res
        .status(401)
        .send(authUtil.successFalse(401, '댓글을 찾을 수 없습니다.'));
    }

    if (Comment.userId === req.user.dataValues.userId) {
      await Comments.destroy({ where: { commnetsId } });
      return res.status(200).send(authUtil.successTrue(200, '댓글 삭제 완료!'));
    } else {
      return res
        .status(401)
        .send(authUtil.successFalse(401, '댓글 작성자만 삭제할 수 있습니다.'));
    }

  } catch (err) {
    console.log(err);
    return res.status(500).send(authUtil.unknownError({ end: err }));
  }
};

module.exports = DeleteComments;
