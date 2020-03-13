const { User, Friend } = require("../database/Shemas");
const TAG = "userSelect";
// read
const getPostsByAllUser = async (req, res) => {
  const posts = await User.find({ user_id: req.body.id }).populate({
    path: "user_post_id_list",
    populate: {
      path: "post_file_id_list"
    }
  });
  res.json(posts);
};

module.exports = { getPostsByAllUser };
