// import
const express = require("express");
const router = express.Router();
const { create, modify, remove } = require("../middleware/friend");
// create
router.put("/", create);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// export
module.exports = router;
