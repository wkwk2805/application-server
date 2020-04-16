const { Post, Comment, User } = require("../database/Shemas");

const TAG = "read/postSelect.js";

const getAllPostsForUser = async (req, res) => {
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

const getExplorePosts = async (req, res) => {
  console.log(TAG, "getExplorePosts");
  let resultSet = new Set();
  let array = req.body.search.split(" ");
  array = array.map((e) => new RegExp(e));
  const allPosts = await Post.find().populate("author");
  for (let x of array) {
    const posts = allPosts.filter((e) => {
      return x.test(e.author.id) || x.test(e.author.name) || x.test(e.content);
    });
    for (let post of posts) {
      resultSet.add(post);
    }
  }
  const resultList = Array.from(resultSet);
  res.json(resultList);
};

module.exports = { getAllPostsForUser, getExplorePosts };
