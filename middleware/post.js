const mongoose = require("mongoose");
const { Post, User } = require("../database/Shemas");
const { resultData } = require("../utility/common");
const { fileInsert } = require("./file");
const TAG = "post";
// read

// create
const register = async (req, res) => {
  console.log(TAG, "register", req.body);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let fileArray = [];
    if (req.body.files && req.body.files.length > 0) {
      fileArray = await fileInsert(req.body.files, session);
    }
    await Post.createCollection();
    const post = await new Post({
      author: req.user_id,
      content: req.body.content,
      file_ids: fileArray
    }).save({ session });
    await User.createCollection();
    const user = await User.findOneAndUpdate(
      { id: req.user_id },
      { $push: { post_ids: post._id }, update_date: Date.now() },
      { new: true, session }
    );
    if (!user) {
      throw new Error("user가 존재하지 않음");
    }
    await session.commitTransaction();
    res.json(user);
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    res.json(resultData(false, "ERROR", error));
  } finally {
    session.endSession();
  }
};

// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // 새로운 파일로 override
    let fileArray = [];
    if (req.body.files && req.body.files.length > 0) {
      fileArray = await fileInsert(req.body.files, session);
    }
    // 새로운 파일이 들어간 데이터로 변환
    await Post.createCollection();
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        content: req.body.content,
        file_ids: fileArray,
        update_date: Date.now()
      },
      { new: true, session }
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
  const removedPost = await Post.findByIdAndRemove(req.body._id);
  res.json(removedPost);
};

module.exports = { register, modify, remove };
