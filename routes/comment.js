const router = require("express").Router();
const { create } = require("../middleware/comment");
// read
router.put("/", create);
// create

// update

// delete
module.exports = router;
