const router = require("express").Router();
const multer = require("multer");
const { register, modify, remove, like } = require("../middleware/post");

// multer setting
const upload = multer({ dest: "uploads/" });

// read

// create
router.put("/", upload.single("asset"), register);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// like
router.put("/like", like);
// export
module.exports = router;
