const mongoose = require("mongoose");
const { Post, User, News } = require("../database/Shemas");
const { resultData, fileHandler } = require("../utility/common");
const TAG = "/middleware/post.js/";
// read

// create
const register = async (req, res) => {
  console.log(TAG, "register", req.body);
  const session = await mongoose.startSession();
  try {
    session.startTransaction({ readConcern: { level: "snapshot" } });
    await Post.createCollection();
    // 파일 가공
    const files = fileHandler(req.body.files);
    // 데이터 추가
    const addedPost = await new Post({
      content: req.body.content,
      author: req.user_id,
      files: files,
      scope: req.body.scope,
      groups: req.body.groupIds
    }).save(session);
    // 소식지 추가
    if (req.body.scope === "GROUP") {
      await new News({
        from: req.user_id,
        message: `${user.id}님이 게시글을 올렸습니다.`,
        to: user.friends.map(e => e.user)
      }).save(session);
    } else {
      const user = await User.findOne({ _id: req.user_id });
      await new News(
        {
          from: req.user_id,
          message: `${user.id}님이 게시글을 올렸습니다.`,
          to: user.friends.map(e => e.user)
        },
        { session }
      ).save();
    }
    await session.commitTransaction();
    res.json(addedPost);
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  const session = await mongoose.startSession();
  try {
    session.startTransaction({ readConcern: { level: "snapshot" } });
    // 새로운 파일로 override
    const files = fileHandler(req.body.files);
    // 새로운 파일이 들어간 데이터로 변환
    const post = await Post.findOneAndUpdate(
      { _id: req.body.post_id },
      {
        content: req.body.content,
        files: files
      },
      { session, new: true }
    );
    await session.commitTransaction();
    res.json(post);
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    res.json(resultData(false, "ERROR", error));
  } finally {
    session.endSession();
  }
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

module.exports = { register, modify, remove };
