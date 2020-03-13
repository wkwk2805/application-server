const router = require("express").Router();
const { modify, remove } = require("../middleware/user");
const { getPostsByAllUser } = require("../read/userSelect");
// read
router.post("/", getPostsByAllUser);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// export
module.exports = router;
