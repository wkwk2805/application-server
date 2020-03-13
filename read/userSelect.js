const { User, Friend } = require("../database/Shemas");
const TAG = "userSelect";
// read
const getPostsByAllUser = async (req, res) => {
  const posts = await User.find({ user_id: req.body.id }).populate({
    path: "post_ids",
    populate: {
      path: "file_ids"
    }
  });
  res.json(posts);
};

module.exports = { getPostsByAllUser };
