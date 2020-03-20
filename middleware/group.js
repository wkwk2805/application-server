const { Group } = require("../database/Shemas");

// 그룹만들기
const TAG = "/middleware/group.js";
const register = async (req, res) => {
  console.log(TAG, "register");
  const group = await new Group({
    name: req.body.name,
    members: [
      {
        member: req.user_id,
        status: "Y",
        grade: "MANAGER"
      }
    ],
    description: req.body.description,
    image: req.body.image
  }).save();
  res.json(group);
};

module.exports = { register };
