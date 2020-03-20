const router = require("express").Router();
const { register } = require("../middleware/group");
router.put("/", register);
