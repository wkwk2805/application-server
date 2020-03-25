const { Post } = require("../database/Shemas");
const { resultData, fileHandler } = require("../utility/common");
const TAG = "/middleware/post.js/";
// read

// create
const register = async (req, res) => {
  console.log(TAG, "register", req.body);
  // 파일 가공
  const files = fileHandler(req.body.files);
  // 데이터 추가
  const data = {
    content: req.body.content,
    author: req.user_id,
    files: files,
    scope: req.body.scope
  };
  req.body.scope === "GROUP" && (data.groups = req.body.groupIds);
  const addedPost = await new Post(data).save();
  res.json(addedPost);
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
      files: files
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
    delete_date: Date.now()
  });
  res.json(removedPost);
};

// like post
const like = async (req, res) => {
  console.log(TAG, "likePost");
  // 기존에 좋아요 유무 확인
  const isLike = await Post.findOne({
    _id: req.body.post_id,
    "likes.user": req.user_id
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
