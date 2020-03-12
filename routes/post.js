const router = require("express").Router();
const { register } = require("../middleware/post");
// read

// create
router.put("/", register);
// update

// delete

module.exports = router;
