const { Post, Comment, User } = require("../database/Shemas");

const getCommentsOfPost = async (req, res) => {
  const resultList = [];
  // 자신이 쓴글
  const comments = await Comment.find({ post: req.body.post_id })
    .populate("author")
    .populate({ path: "recomments", populate: "author" });
  /* const myPosts = await Post.find({ author: req.user_id }).populate("author");
  for (let myPost of myPosts) {
    const myPostJson = myPost.toJSON();
    myPostJson["comments"] = comments;
    myPostJson["mine"] = true;
    myPostList.push(myPostJson);
  }
  resultList.push(...myPostList);
 */
  res.json(comments);
};

module.exports = { getCommentsOfPost };
