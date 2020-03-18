const router = require("express").Router();
const { modify, remove, follow } = require("../middleware/user");
const { getPostsByAllUser } = require("../read/userSelect");
// read
router.post("/", getPostsByAllUser);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// follow
router.put("/follow", follow);
// export
module.exports = router;
