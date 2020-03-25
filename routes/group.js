const router = require("express").Router();
const {
  register,
  modify,
  signin,
  changeStatus,
  getOut
} = require("../middleware/group");
router.put("/", register);
router.put("/signin", signin);
router.patch("/", modify);
router.patch("/changeStatus", changeStatus);
router.delete("/", getOut);

module.exports = router;
