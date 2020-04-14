const router = require("express").Router();
const {
  create,
  modify,
  remove,
  like,
  reCreate,
  reRemove,
} = require("../middleware/comment");
const { getCommentsOfPost } = require("../read/commentSelect");

// read
router.post("/", getCommentsOfPost);
// create
router.put("/", create);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// like
router.put("/like", like);
// re create
router.put("/recomment", reCreate);
// re delete
router.delete("/recomment", reRemove);
//export
module.exports = router;
