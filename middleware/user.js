const { User } = require("../database/Shemas");
const { resultData, hashPwd } = require("../utility/common");
const TAG = "/middleware/user.js/";

// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.body.id },
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        $push: { images: req.body.image },
        update_date: Date.now()
      },
      { new: true }
    );
    // 비밀번호 넘기지 않기
    updatedUser.password = undefined;
    if (updatedUser) {
      res.json(resultData(true, "수정되었습니다.", updatedUser));
    } else {
      res.json(resultData(false, "수정이 안되었습니다."));
    }
  } catch (e) {
    console.error(e);
    res.json(resultData(false, "수정이 안되었습니다.", e));
  }
};
// 비밀번호 변경
const modifyPassword = async (req, res) => {
  console.log(TAG, "modify");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.body.id },
      {
        user_name: hashPwd(req.body.pw),
        update_date: Date.now()
      },
      { new: true }
    );
    // 비밀번호 넘기지 않기
    updatedUser.password = undefined;
    if (updatedUser) {
      res.json(resultData(true, "수정되었습니다.", updatedUser));
    } else {
      res.json(resultData(false, "수정이 안되었습니다."));
    }
  } catch (e) {
    console.error(e);
    res.json(resultData(false, "수정이 안되었습니다.", e));
  }
};
// 유저제거
const remove = async (req, res) => {
  console.log(TAG, "remove");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.body.id },
      { del_yn: "Y" },
      { new: true }
    );
    // 비밀번호 넘기지 않기
    updatedUser.password = undefined;
    if (updatedUser) {
      res.json(resultData(true, "수정되었습니다.", updatedUser));
    } else {
      res.json(resultData(false, "수정이 안되었습니다."));
    }
  } catch (e) {
    console.error(e);
    res.json(resultData(false, "수정이 안되었습니다.", e));
  }
};
// export
module.exports = { modify, remove, modifyPassword };
