// import
const { User, News, Friend } = require("../database/Shemas");
const { resultData } = require("../utility/common");
const TAG = "/middleware/friend.js";
// create
const create = async (req, res) => {
  console.log(TAG, "create");
  const friend = await new Friend({
    user_id: req.user_id,
    friend_id: req.body.friend_id
  }).save();
  const updatedUser = await User.updateOne(
    { _id: req.user_id },
    { $push: { friend_ids: friend._id } },
    { new: true }
  );
  const uid = updatedUser.id;
  const fid = (await User.findOne({ _id: friend._id })).id;
  const news = await new News({
    message: `${uid}님이 ${fid}님에게 친구신청하였습니다.`,
    author: req.user_id
  }).save();
  res.json(resultData(true, "친구신청성공", news));
};

// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
};
// export
module.exports = { create, modify, remove };
