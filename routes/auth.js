const router = require("express").Router();
const { login, register } = require("../middleware/auth");

// login
router.post("/login", login);
// logout
// 로그아웃은 사용자 쪽에서 token을 제거하면 해결될 듯
// 회원가입
router.put("/", register);

module.exports = router;
