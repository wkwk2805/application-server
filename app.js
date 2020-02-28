const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

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
  create_date: { type: Date, default: Date.now }
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
    for (const d of data) {
      delete d.user_pw;
    }
    res.json(resultObj(true, "Success Certification", data));
  });
});

app.listen(80, () => {
  console.log("Connect! Application Server");
});
