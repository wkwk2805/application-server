const router = require("express").Router();
const {
  pushCommentLikeButton,
  pushPostLikeButton
} = require("../middleware/like");

// 글에 대하여 좋아요 눌렀을 때
router.patch("/post", pushPostLikeButton);

// 댓글에 대하여 좋아요 눌렀을 때
router.patch("/comment", pushCommentLikeButton);

module.exports = router;
