const { Comment } = require("../database/Shemas");
const { resultData } = require("../utility/common");
// read
const TAG = "/middleware/comment.js/";
// create
const create = async (req, res) => {
  console.log(TAG, "create");
  const savedComment = await new Comment({
    content: req.body.content,
    post: req.body.post_id,
    author: req.user_id
  }).save();
  res.json(resultData(true, "댓글등록성공", savedComment));
};
// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  const updatedComment = await Comment.findOneAndUpdate(
    { _id: req.body.comment_id },
    {
      content: req.body.content,
      update_date: Date.now()
    },
    { new: true }
  );
  res.json(resultData(true, "댓글수정성공", updatedComment));
};
// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
  const comment = await Comment.findOneAndUpdate(
    { _id: req.body.comment_id },
    { del_yn: "Y", delete_date: Date.now() }
  );
  res.json(comment);
};
// like comment
const like = async (req, res) => {
  console.log(TAG, "likeComment");
  // 기존에 좋아요 유무 확인
  const isLike = await Comment.findOne({
    _id: req.body.comment_id,
    "likes.user": req.user_id
  });
  // 기존에 좋아요가 있다면 취소
  let likeCnt = 0;
  if (isLike) {
    likeCnt = (
      await Comment.findOneAndUpdate(
        { _id: req.body.comment_id, "likes.user": req.user_id },
        { $pull: { likes: { user: req.user_id } } },
        { new: true }
      )
    ).likes.length;
  } else {
    // 기존에 좋아요가 없다면 좋아요
    likeCnt = (
      await Comment.findOneAndUpdate(
        { _id: req.body.comment_id },
        { $push: { likes: { user: req.user_id } } },
        { new: true }
      )
    ).likes.length;
  }
  res.json(resultData(true, "좋아요성공", likeCnt));
};

module.exports = { create, modify, remove, like };
