const router = require("express").Router();
const { register, modify, remove } = require("../middleware/post");
// read

// create
router.put("/", register);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);

module.exports = router;
