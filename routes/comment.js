const router = require("express").Router();
const { create, modify, remove, like } = require("../middleware/comment");
// read
// create
router.put("/", create);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// like
router.put("/like", like);
//export
module.exports = router;
