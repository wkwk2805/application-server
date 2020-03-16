// import
const TAG = "/middleware/friend.js";
// create
const create = (req, res) => {
  console.log(TAG, "create");
};
// update
const modify = (req, res) => {
  console.log(TAG, "modify");
};
// delete
const remove = (req, res) => {
  console.log(TAG, "remove");
};
// export
module.exports = { create, modify, remove };
