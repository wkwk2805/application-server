const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const DBConnection = require("./database/DBConnection");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const likeRouter = require("./routes/like");
const { verify } = require("./middleware/auth");

// DB연결
DBConnection();

// body parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 라우터
app.use("/auth", authRouter);
// 로그인 후에 사용될 verify
app.use(verify);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);

app.listen(80, () => {
  console.log("Connect! Application Server");
});
