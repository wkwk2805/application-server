const { Post, File } = require("../database/Shemas");
const { resultData, hashPwd } = require("../utility/common");
const TAG = "post";
// read

// create
const register = async (req, res) => {
  console.log(TAG, "register", req.body);
  try {
    let pid = 0;
    const posts = await Post.find({}).sort({ post_id: "desc" });
    if (posts.length > 0) {
      pid = posts[0].post_id + 1;
    }
    const post = new Post({
      user_id: req.user_id,
      post_id: pid,
      post_content: req.body.content
    });
    if (req.body.files && req.body.files.length > 0) {
      for (path of req.body.files) {
        let fid = 0;
        const files = await File.find({}).sort({ file_id: "desc" });
        if (files.length > 0) {
          fid = files[0].file_id + 1;
        }
        const file = new File({
          file_id: fid,
          file_path: path,
          post_id: pid
        });
        const f = await file.save();
        console.log(f);
      }
    }
    const pData = await post.save();
    if (pData) {
      res.json(resultData(true, "글쓰기 성공!", pData));
    }
  } catch (error) {
    console.error(error);
    res.json(resultData(false, "ERROR", error));
  }
};
// update
const modify = async (req, res) => {
  console.log(TAG, "modify");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.body.id },
      {
        user_name: req.body.name,
        user_phone: req.body.phone,
        user_email: req.body.email,
        update_date: Date.now()
      },
      { new: true }
    );
    // 비밀번호 넘기지 않기
    updatedUser.user_pw = undefined;
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
// update
const modifyPassword = async (req, res) => {
  console.log(TAG, "modify");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.body.id },
      {
        user_name: hashPwd(req.body.pw),
        update_date: Date.now()
      },
      { new: true }
    );
    // 비밀번호 넘기지 않기
    updatedUser.user_pw = undefined;
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
// delete
const remove = async (req, res) => {
  console.log(TAG, "remove");
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.body.id },
      { user_del_yn: "Y" },
      { new: true }
    );
    // 비밀번호 넘기지 않기
    updatedUser.user_pw = undefined;
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

module.exports = { register, modify, remove };
