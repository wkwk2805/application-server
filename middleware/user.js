const mongoose = require("mongoose");
const { User, News } = require("../database/Shemas");
const { resultData, hashPwd } = require("../utility/common");
const TAG = "/middleware/user.js/";

// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  try {
    const updatedUser = await User.updateOne(
      { id: req.body.id },
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        $push: { files: req.body.files },
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
// 친구신청
const follow = async (req, res) => {
  console.log(TAG, "follow");
  const friend = await User.findOne({
    _id: req.user_id,
    "friends.user": req.body.friend_id
  });
  if (!friend) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user_id },
      { $push: { friends: { user: req.body.friend_id } } },
      { new: true }
    );
    res.json(updatedUser);
  } else {
    res.json("이미 추가한 친구입니다.");
  }
};
// 친구허가
const permission = async (req, res) => {
  console.log(TAG, "permission");
  await User.findOneAndUpdate(
    { _id: req.user_id },
    { $push: { friends: { user: req.body.friend_id, status: "Y" } } },
    { new: true }
  );
  // 허가시 기존에 있던 부분에서 status를 Y로 변경
  const friendUser = await User.findOne({
    _id: req.body.friend_id
  });
  const frs = friendUser.friends;
  for (i in frs) {
    if (frs[i].user == req.user_id) {
      frs[i].status = "Y";
    }
  }
  const permUser = await User.findOneAndUpdate(
    { _id: req.body.friend_id },
    { $set: { friends: frs } },
    { new: true }
  );
  res.json(resultData(true, "친구 수락 성공!", permUser));
};

const block = async (req, res) => {
  console.log(TAG, "permission");
  await User.findOneAndUpdate(
    { _id: req.user_id },
    { $push: { friends: { user: req.body.friend_id, status: "Y" } } },
    { new: true }
  );
  // 허가시 기존에 있던 부분에서 status를 Y로 변경
  const friendUser = await User.findOne({
    _id: req.body.friend_id
  });
  const frs = friendUser.friends;
  for (i in frs) {
    if (frs[i].user == req.user_id) {
      frs[i].status = "B";
    }
  }
  const permUser = await User.findOneAndUpdate(
    { _id: req.body.friend_id },
    { $set: { friends: frs } },
    { new: true }
  );
  res.json(resultData(true, "친구 수락 성공!", permUser));
};

// export
module.exports = { modify, remove, modifyPassword, follow, permission, block };
