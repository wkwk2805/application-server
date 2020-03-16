// import
const { User, News, Friend } = require("../database/Shemas");
const { resultData } = require("../utility/common");
const TAG = "/middleware/friend.js";
// create
const create = async (req, res) => {
  console.log(TAG, "create");
};

// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
};
// export
module.exports = { create, modify, remove };
