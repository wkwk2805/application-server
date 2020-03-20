const router = require("express").Router();
const { modify, remove, follow, permission } = require("../middleware/user");
const { getPostsByAllUser } = require("../read/userSelect");
// read
router.post("/", getPostsByAllUser);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// follow
router.put("/follow", follow);
// permission
router.put("/permission", permission);
// export
module.exports = router;
