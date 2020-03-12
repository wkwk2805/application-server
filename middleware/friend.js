// import
const express = require("express");
const router = express.Router();
const TAG = "Friend";
// create
router.put("/", (req, res) => {
  console.log(TAG, "insert");
  res.json("insert");
});
// update
router.patch("/", (req, res) => {
  console.log(TAG, "update");
  res.json("update");
});
// delete
router.delete("/", (req, res) => {
  console.log(TAG, "delete");
  res.json("delete");
});
// export
module.exports = router;
