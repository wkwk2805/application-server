const mongoose = require("mongoose");
const { Comment, Post, News } = require("../database/Shemas");
// read
const TAG = "/middleware/comment.js/";
// create
const create = async (req, res) => {
  console.log(TAG, "create");
  await Comment.createCollection();
  const session = await mongoose.startSession();
  try {
    session.startTransaction({ readConcern: { level: "snapshot" } });
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
    if (!post) {
      throw new Error("글이 존재하지 않음");
    }
    res.json(comment);
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
  console.log(TAG, "modify");
  const comment = await Comment.findByIdAndUpdate(
    req.body.comment_id,
    {
      content: req.body.content,
      update_date: Date.now()
    },
    { new: true, session }
  );
  res.json(comment);
};
// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
  const comment = await Comment.deleteOne(
    { _id: req.body.comment_id },
    { del_yn: "Y", delete_date: Date.now() }
  );
  res.json(comment);
};
module.exports = { create, modify, remove };
