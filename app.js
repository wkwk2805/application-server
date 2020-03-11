const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret-key";
const crypto = require("crypto");
const hashSecret = "!)@(#*$&^%";
const { User } = require("./database/Shemas");
const DBConnection = require("./database/DBConnection");

// DB연결
DBConnection();

// 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 결과값
const resultObj = (isSuccess, message, returnValue) => {
  return {
    success: isSuccess,
    message: message,
    returnValue: returnValue
  };
};

// 라우터
app.post("/insert", (req, res) => {
  console.log("request contents", req.body);
  const hash = crypto
    .createHmac("sha256", hashSecret)
    .update(req.body.pw)
    .digest("hex");
  User.find({ user_id: req.body.id }, function(err, data) {
    if (err) throw err;
    if (data.length === 0) {
      const user = new User({ user_id: req.body.id, user_pw: hash });
      user.save((err, data) => {
        if (err) throw err;
        data.user_pw = undefined;
        res.json(resultObj(true, "Success Insert", data));
      });
    } else {
      res.json(resultObj(false, "사용자가 이미 존재합니다."));
    }
  });
});

app.post("/certification", (req, res) => {
  console.log("/certification", req.body);
  const hash = crypto
    .createHmac("sha256", hashSecret)
    .update(req.body.pw)
    .digest("hex");
  User.find({ user_id: req.body.id, user_pw: hash }, (err, data) => {
    if (err) throw err;
    if (data.length === 1) {
      const token = jwt.sign({ data: data }, SECRET_KEY, {
        expiresIn: "1d"
      });
      res.json(resultObj(true, "Success Certification", token));
    } else {
      res.json(resultObj(false, "Failed Certification"));
    }
  });
});

app.post("/verify", (req, res) => {
  try {
    const decode = jwt.verify(req.body.token, SECRET_KEY);
    decode.data[0].user_pw = undefined;
    res.json(decode);
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        res.send(resultObj(false, "로그인 기간이 만료되었습니다."));
        break;
      case "JsonWebTokenError":
        res.send(resultObj(false, "로그인이 불가합니다"));
        break;
      default:
        res.send(e);
        break;
    }
  }
});

app.listen(80, () => {
  console.log("Connect! Application Server");
});
