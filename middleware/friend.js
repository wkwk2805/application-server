// import
const { User, News } = require("../database/Shemas");
const { resultData } = require("../utility/common");
const TAG = "/middleware/friend.js";
// create
const create = async (req, res) => {
  console.log(TAG, "create");
  const friend = await User.findByIdAndUpdate(
    { _id: req.user_id },
    { $push: { friend_ids: req.body.friend_id } },
    { new: true }
  );
  if (friend.friend_ids && friend.friend_ids.includes(req.body.friend_id)) {
    let friend_yn = "N";
    // 추가 후 승인 시 Y, 추가만 했을시 N
    const user = await User.findOne({
      _id: req.body.friend_id,
      friend_ids: req.user_id
    });
    if (user) friend_yn = "Y";
    await new News({
      author: req.user_id,
      friend_id: req.body.friend_id,
      friend_yn: friend_yn
    }).save();
    res.json(resultData(true, "친구추가 및 승인"));
  }
};

// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
  await User.deleteOne({ _id: req.body.friend_id });
  await new News({
    author: req.user_id,
    friend_id: req.body.friend_id,
    friend_yn: "N"
  }).save();
};
// export
module.exports = { create, modify, remove };
