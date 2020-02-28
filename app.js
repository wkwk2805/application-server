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
  const user = new User({ user_id: req.body.id, user_pw: req.body.pw });
  user.save((err, data) => {
    if (err) throw err;
    res.json(resultObj(true, "Success Insert", data));
  });
});

app.post("/certification", (req, res) => {
  console.log("/certification", req.body);
  User.find({ user_id: req.body.id, user_pw: req.body.pw }, (err, data) => {
    if (err) throw err;
    if (data.length === 1) {
      const token = jwt.sign({ data: data }, SECRET_KEY, { expiresIn: "1h" });
      res.json(resultObj(true, "Success Certification", token));
    } else {
      res.json(resultObj(false, "Failed Certification"));
    }
  });
});

app.post("/verify", (req, res) => {
  const decode = jwt.verify(req.body.token, SECRET_KEY);
  res.json(decode);
});

app.listen(80, () => {
  console.log("Connect! Application Server");
});
