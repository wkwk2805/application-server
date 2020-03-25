const { Group } = require("../database/Shemas");
const TAG = "/middleware/group.js";

// 그룹만들기
const register = async (req, res) => {
  console.log(TAG, "register");
  const isGroupName = await Group.findOne({
    name: req.body.name,
    author: req.user_id
  });
  if (!isGroupName) {
    const group = await new Group({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      author: req.user_id,
      members: [
        {
          member: req.user_id,
          status: "Y",
          grade: "MANAGER"
        }
      ]
    }).save();
    res.json(resultData(true, "그룹만들기성공", group));
  } else {
    res.json(resultData(false, "이미 존재하는 그룹입니다"));
  }
};

//그룹 가입하기
const signin = async (req, res) => {
  console.log(TAG, "signin");
  const isUser = await Group.findOne({
    _id: req.body.group_id,
    "members.member": req.user_id
  });
  if (!isUser) {
    const signInUser = await Group.findOneAndUpdate(
      { _id: req.body.group_id },
      { $push: { members: { member: req.user_id } } },
      { new: true }
    );
    res.json(resultData(true, "가입신청을 진행했습니다.", signInUser));
  } else {
    res.json(resultData(false, "이미 가입신청한 상태입니다."));
  }
};
//그룹 승인하기
const changeStatus = async (req, res) => {
  let change = req.body.change; // {key:[status, grade], value:[[Y,N],[MEMBER,MANAGER]]}
  const memberUser = await Group.findOne({
    _id: req.body.group_id
  });
  const mems = memberUser.members;
  for (i in mems) {
    if (mems[i].member == req.body.perm_id) {
      mems[i][change.key] = change.value;
    }
  }
  const updateGroup = await Group.findOneAndUpdate(
    { _id: req.body.group_id },
    { $set: { members: mems } },
    { new: true }
  );
  res.json(resultData(true, "", updateGroup));
};
//그룹 초대하기 - URL날려야하나?

//그룹 정보 수정하기
const modify = async (req, res) => {
  console.log(TAG, "modify");
  const data = {};
  req.body.name && (data["name"] = req.body.name);
  req.body.description && (data["description"] = req.body.description);
  req.body.image && (data["image"] = req.body.image);
  const updatedGroup = await Group.findOneAndUpdate(
    { _id: req.body.group_id },
    data,
    { new: true }
  );
  res.json(resultData(true, "그룹정보수정성공", updatedGroup));
};
//그룹 탈퇴하기(시키기)
const getOut = async (req, res) => {
  const outUser = await Group.findOneAndUpdate(
    { _id: req.body.group_id },
    { $pull: { members: { member: req.body.out_id } } },
    { new: true }
  );
  res.json(resultData(true, "그룹 탈퇴 성공", outUser));
};

module.exports = { register, signin, changeStatus, getOut, modify };
