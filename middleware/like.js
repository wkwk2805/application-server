const { Like, Post, Comment } = require("../database/Shemas");
const { resultData } = require("../utility/common");
const TAG = "/middleware/like.js";
// 글 좋아요 눌렀을 때
const pushPostLikeButton = async (req, res) => {
  console.log(TAG, "pushPostLikeButton");
  const isPost = await Post.findOne({ _id: req.body.post_id }).populate({
    path: "like_ids",
    populate: {
      path: "author",
      match: { _id: req.user_id }
    }
  });
  // 글 좋아요 줄이기
  if (isPost.like_ids.length > 0 && isPost.like_ids[0]) {
    const post = await Post.findByIdAndUpdate(
      { _id: req.body.post_id },
      { $pullAll: { like_ids: [isPost.like_ids[0]] } },
      { new: true }
    );
    if (post) {
      const like = await Like.deleteOne({ _id: isPost.like_ids[0] });
      console.log("글의 좋아요 수", post.like_ids.length);
      if (like.ok > 1) {
        res.json(resultData(true, "like제거", post.like_ids.length));
      }
    }
    // 글 좋아요 늘리기
  } else {
    const like = await new Like({ author: req.user_id }).save();
    if (like) {
      const post = await Post.findByIdAndUpdate(
        { _id: req.body.post_id },
        { $push: { like_ids: like._id } },
        { new: true }
      );
      if (like.ok === 1) {
        console.log("글의 좋아요 수", post.like_ids.length);
        res.json(resultData(true, "like추가", post.like_ids.length));
      }
    }
  }
};
// 댓글 좋아요 눌렀을때
const pushCommentLikeButton = async (req, res) => {
  console.log(TAG, "pushCommentLikeButton");
  const isComment = await Comment.findOne({
    _id: req.body.comment_id
  }).populate({
    path: "like_ids",
    populate: {
      path: "author",
      match: { _id: req.user_id }
    }
  });
  // 글 좋아요 줄이기
  if (isComment.like_ids.length > 0 && isComment.like_ids[0]) {
    const comment = await Comment.findByIdAndUpdate(
      { _id: req.body.comment_id },
      { $pullAll: { like_ids: [isComment.like_ids[0]] } },
      { new: true }
    );
    if (comment) {
      const like = await Like.deleteOne({ _id: isComment.like_ids[0] });
      console.log("댓글의 좋아요 수", comment.like_ids.length);
      console.log(like);
      if (like.ok === 1) {
        res.json(resultData(true, "like제거", comment.like_ids.length));
      }
    }
    // 글 좋아요 늘리기
  } else {
    const like = await new Like({ author: req.user_id }).save();
    if (like) {
      const comment = await Comment.findByIdAndUpdate(
        { _id: req.body.comment_id },
        { $push: { like_ids: like._id } },
        { new: true }
      );
      console.log("댓글의 좋아요 수", comment.like_ids.length);
      res.json(resultData(true, "like추가", comment.like_ids.length));
    }
  }
};

module.exports = { pushCommentLikeButton, pushPostLikeButton };
