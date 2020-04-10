const { Post } = require("../database/Shemas");
const {
  resultData,
  fileHandler,
  tagHandler,
  friendsHandler,
} = require("../utility/common");
const TAG = "/middleware/post.js/";
// read

// create
const register = async (req, res) => {
  try {
    console.log(req.body);
    console.log(TAG, "register");
    // 파일 가공
    const files = fileHandler(req.body.files);
    const tags = tagHandler(req.body.content);
    const friends = friendsHandler(req.body.content);
    // 데이터 추가
    const data = {
      content: req.body.content,
      author: req.user_id,
      files: files,
      scope: req.body.scope,
      tags: tags,
      friends: friends,
    };
    req.body.scope === ("GROUP" || "PLUS") && (data.groups = req.body.groups);
    const addedPost = await new Post(data).save();
    res.json(resultData(true, "글 등록 성공", addedPost));
  } catch (error) {
    console.log(error);
    res.json(resultData(false, "글 등록 실패"));
  }
};

// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  // 새로운 파일로 override
  const files = fileHandler(req.body.files);
  // 새로운 파일이 들어간 데이터로 변환
  const post = await Post.findOneAndUpdate(
    { _id: req.body.post_id },
    {
      content: req.body.content,
      files: files,
    },
    { new: true }
  );
  res.json(post);
};

// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
  const removedPost = await Post.findByIdAndUpdate(req.body.post_id, {
    del_yn: "Y",
    delete_date: Date.now(),
  });
  res.json(removedPost);
};

// like post
const like = async (req, res) => {
  console.log(TAG, "likePost");
  // 기존에 좋아요 유무 확인
  const isLike = await Post.findOne({
    _id: req.body.post_id,
    "likes.user": req.user_id,
  });
  // 기존에 좋아요가 있다면 취소
  let likeCnt = 0;
  if (isLike) {
    likeCnt = (
      await Post.findOneAndUpdate(
        { _id: req.body.post_id, "likes.user": req.user_id },
        { $pull: { likes: { user: req.user_id } } },
        { new: true }
      )
    ).likes.length;
  } else {
    // 기존에 좋아요가 없다면 좋아요
    likeCnt = (
      await Post.findOneAndUpdate(
        { _id: req.body.post_id },
        { $push: { likes: { user: req.user_id } } },
        { new: true }
      )
    ).likes.length;
  }
  res.json(resultData(true, "좋아요성공", likeCnt));
};

// share post
// 공유 완료시에 동작
const share = async (req, res) => {
  console.log(TAG, "likePost");
  let shareCnt = (
    await Post.findOneAndUpdate(
      { _id: req.body.post_id },
      { $push: { shares: { user: req.user_id } } },
      { new: true }
    )
  ).shares.length;
  res.json(resultData(true, "공유성공", shareCnt));
};

module.exports = { register, modify, remove, like, share };
