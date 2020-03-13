const mongoose = require("mongoose");
const { Comment, Post } = require("../database/Shemas");
// read
const TAG = "/middleware/comment.js/"
// create
const create = async (req, res) => {
  console.log(TAG,"create")
  await Comment.createCollection();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const comment = await new Comment({
      content: req.body.content,
      author: req.user_id
    }).save(session);
    const post = await Post.findByIdAndUpdate(
      req.body.post_id,
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
    const comment = await Comment.findByIdAndUpdate(
      req.body.comment_id,
      {
        content: req.body.content,
        update_date: Date.now()
      },
      { new: true, session }
    );
    res.json(comment);
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
// delete
const remove = (req,res) => {
  console.log(TAG, "remove");
  const comment = await Comment.findByIdAndRemove(req.body.comment_id);
  res.json(comment);
}
module.exports = { create, modify };
