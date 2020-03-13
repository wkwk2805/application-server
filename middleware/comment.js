const mongoose = require("mongoose");
const { Comment, Post } = require("../database/Shemas");
// read

// create
const create = async (req, res) => {
  await Comment.createCollection();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const comment = await new Comment({
      content: req.body.content,
      author: req.user_id
    }).save(session);
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $push: { comment_ids: comment._id }
      },
      { new: true, session }
    );
    res.json(post);
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
// update
const modify = async (req, res) => {
  await Comment.createCollection();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const comment = await new Comment({
      content: req.body.content,
      author: req.user_id
    }).save(session);
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $push: { comment_ids: comment._id }
      },
      { new: true, session }
    );
    res.json(post);
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
// delete
module.exports = { create, modify };
