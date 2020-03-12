const mongoose = require("mongoose");
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const userSchema = mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  user_pw: { type: String, require: true, trim: true },
  user_name: String,
  user_phone: String,
  user_email: String,
  user_del_yn: { type: String, default: "N" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const User = mongoose.model("user", userSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const fileShema = mongoose.Schema({
  file_id: { type: Number, require: true, unique: true },
  file_path: String,
  user_id: { type: String, ref: "user" },
  post_id: { type: Number, ref: "post" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const File = mongoose.model("file", fileShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const postShema = mongoose.Schema({
  post_id: { type: Number, require: true, unique: true },
  post_content: String,
  user_id: { type: String, ref: "user" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Post = mongoose.model("post", postShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const likeShema = mongoose.Schema({
  like_id: { type: Number, require: true, unique: true },
  post_id: { type: Number, ref: "post" },
  user_id: { type: String, ref: "user" },
  comment_id: { type: Number, ref: "comment" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Like = mongoose.model("like", likeShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const commentShema = mongoose.Schema({
  comment_id: { type: Number, require: true, unique: true },
  comment_contents: String,
  post_id: { type: Number, ref: "post" },
  user_id: { type: String, ref: "user" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Comment = mongoose.model("comment", commentShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const friendShema = mongoose.Schema({
  friend_id: { type: Number, require: true, unique: true },
  user_id_1: { type: String, require: true, ref: "user" },
  user_id_2: { type: String, require: true, ref: "user" },
  friend_yn: String,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Friend = mongoose.model("friend", friendShema);

module.exports = { User, File, Post, Like, Comment, Friend };
