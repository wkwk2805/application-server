const { Post, Comment, User } = require("../database/Shemas");

const getAllPosts = async (req, res) => {
  const resultList = [];
  // 자신이 쓴글
  const myPostList = [];
  const myPosts = await Post.find({ author: req.user_id })
    .populate("author")
    .populate("likes.user");
  for (let myPost of myPosts) {
    const comments = await Comment.find({ post: myPost._id }).populate(
      "author"
    );
    const myPostJson = myPost.toJSON();
    myPostJson["comments"] = comments;
    myPostJson["mine"] = true;
    myPostList.push(myPostJson);
  }
  resultList.push(...myPostList);
  // 친구가 쓴글 나중에 구현
  const user = await User.findOne({ _id: req.user_id, "friends.status": "Y" });

  // 그룹에서 쓴글 나중에 구현
  res.json(resultList);
};

module.exports = { getAllPosts };
