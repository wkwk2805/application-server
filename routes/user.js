const router = require("express").Router();
const { modify, remove, getPostsByUser } = require("../middleware/user");
// read
router.post("/", getPostsByUser);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// export
module.exports = router;
