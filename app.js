const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/faith_book", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("➡️ connected to DB");
const handleError = err => console.log(`❌ Error on DB Connection : ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("request contents", req.body);
  let isSuccess = false;
  let message = "message";
  const result = {
    success: isSuccess,
    message: message
  };
  res.json(result);
});

app.listen(80, () => {
  console.log("Connect! Application Server");
});
