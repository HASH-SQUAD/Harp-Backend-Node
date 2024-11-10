const authUtil = require('../../response/authUtil.js');
const { Community } = require('../../models')

const CreatePost = async (req, res) => {
  const { title, des, tag, images } = req.body

  console.log(req.body);

  try {
    await Community.create({
      title,
      des,
      tag,
      images,
      userId: req.user.dataValues.userId
    })

    return res
      .status(200)
      .send(authUtil.successTrue(200, '게시글 생성 성공'));
  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.unknownError({ error: error }));
  }
}

module.exports = CreatePost;