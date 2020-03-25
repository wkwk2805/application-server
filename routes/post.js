const router = require("express").Router();
const { register, modify, remove, like } = require("../middleware/post");
// read

// create
router.put("/", register);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// like
router.put("/like", like);

module.exports = router;
