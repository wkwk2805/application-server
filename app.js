const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
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
