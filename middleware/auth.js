const { User } = require("../database/Shemas");
const { hashPwd, SECRET_KEY, resultData } = require("../utility/common");
const jwt = require("jsonwebtoken");
const TAG = "/middleware/auth.js/";

// login
const login = (req, res) => {
  console.log(TAG, "/login", req.body);
  User.find(
    { id: req.body.id, password: hashPwd(req.body.password) },
    (err, data) => {
      if (err) throw err;
      if (data.length === 1) {
        const token = jwt.sign({ data: data }, SECRET_KEY, {
          expiresIn: "1d"
        });
        res.json(resultData(true, "Success Certification", token));
      } else {
        res.json(resultData(false, "Failed Certification"));
      }
    }
  );
};
// verify
const verify = async (req, res, next) => {
  try {
    console.log(TAG, "verify");
    const decode = jwt.verify(req.headers.token, SECRET_KEY);
    const password = decode.data[0].password;
    const id = decode.data[0].id;
    const data = await User.find({ id: id, password: password });
    if (data.length === 1) {
      req.user_id = decode.data[0]._id;
      next();
    } else {
      throw new Error("로그인이 불가합니다.");
    }
  } catch (e) {
    console.error(e);
    switch (e.name) {
      case "TokenExpiredError":
        return res.json(resultData(false, "로그인 기간이 만료되었습니다."));
      case "JsonWebTokenError":
        return res.json(resultData(false, "로그인이 불가합니다"));
      default:
        return res.json(resultData(false, "ERROR", e.toString()));
    }
  }
};
// 로그아웃 시에는 jwt를 화면쪽에서 token을 지워주면 될듯

// 회원가입 - 여기에 한 이유는 app.use(verify)를 사용하기 위해서
const register = (req, res) => {
  console.log(TAG, "register", req.body);
  User.find({ id: req.body.id }, function(err, data) {
    if (err) throw err;
    if (data.length === 0) {
      const user = new User({
        id: req.body.id,
        password: hashPwd(req.body.password)
      });
      user.save((err, data) => {
        if (err) throw err;
        data.password = undefined;
        res.json(resultData(true, "Success Insert", data));
      });
    } else {
      res.json(resultData(false, "사용자가 이미 존재합니다."));
    }
  });
};
module.exports = { login, verify, register };
