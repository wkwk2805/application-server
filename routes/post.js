const router = require("express").Router();
const multer = require("multer");
const { register, modify, remove, like } = require("../middleware/post");
const fs = require("fs");
const { getAllPosts } = require("../read/postSelect");
// multer setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = `uploads/`;
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    dir = `uploads/${req.user_id}`;
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    cb(null, dir + "/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});
var upload = multer({ storage: storage });

// read
router.post("/", getAllPosts);
// create
router.put("/", upload.array("assets", 10), register);
// update
router.patch("/", modify);
// delete
router.delete("/", remove);
// like
router.put("/like", like);
// export
module.exports = router;
