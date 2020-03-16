const router = require("express").Router();
const { create, modify, remove } = require("../middleware/comment");
// read
// create
router.put("/", create);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
//export
module.exports = router;
