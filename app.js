const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const DBConnection = require("./database/DBConnection");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const groupRouter = require("./routes/group");
const { verify } = require("./middleware/auth");
const cors = require("cors");

// DB연결
DBConnection();
// cors설정
app.use(cors());
// body parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 정적파일제공
app.use("/uploads", express.static(__dirname + "/uploads"));
// 라우터
app.use("/auth", authRouter);
// 로그인 후에 사용될 verify
app.use(verify);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/group", groupRouter);

app.listen(80, () => {
  console.log("Connect! Application Server");
});
