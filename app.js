const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret-key";

mongoose.connect("mongodb://127.0.0.1:27017/faith_book", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = err => console.log(`Error on DB Connection : ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);

const resultObj = (isSuccess, message, returnValue) => {
  return {
    success: isSuccess,
    message: message,
    returnValue: returnValue
  };
};

const userSchema = mongoose.Schema({
  user_id: String,
  user_pw: String,
  create_date: { type: Date, default: Date.now() }
});

const User = mongoose.model("user", userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/insert", (req, res) => {
  console.log("request contents", req.body);
  User.find({ user_id: req.body.id }, function(err, data) {
    if (err) throw err;
    if (data.length === 0) {
      const user = new User({ user_id: req.body.id, user_pw: req.body.pw });
      user.save((err, data) => {
        if (err) throw err;
        res.json(resultObj(true, "Success Insert", data));
      });
    } else {
      res.json(resultObj(false, "사용자가 이미 존재합니다."));
    }
  });
});

app.post("/certification", (req, res) => {
  console.log("/certification", req.body);
  User.find({ user_id: req.body.id, user_pw: req.body.pw }, (err, data) => {
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
    delete decode.data[0].user_pw;
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
