const router = require("express").Router();
const {
  register,
  modify,
  signin,
  member,
  getOut,
  removeGroup
} = require("../middleware/group");
// 그룹 만들기
router.put("/", register);
// 그룹 가입하기
router.put("/signin", signin);
// 그룹 정보 수정하기
router.patch("/", modify);
// 그룹 멤버 상태 변경하기
router.patch("/member", member);
// 그룹 멤버 탈퇴 하기(시키기)
router.delete("/getout", getOut);
// 그룹 지우기
router.delete("/", removeGroup);
// export
module.exports = router;
