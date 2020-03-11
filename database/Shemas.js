const mongoose = require("mongoose");

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
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const User = mongoose.model("user", userSchema);

const fileShema = mongoose.Schema({
  file_id: { type: Number, require: true, unique: true },
  file_path: String,
  user_id: String,
  post_id: Number,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const File = mongoose.model("file", fileShema);

const postShema = mongoose.Schema({
  post_id: { type: Number, require: true, unique: true },
  post_content: String,
  user_id: String,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Post = mongoose.model("post", postShema);

const likeShema = mongoose.Schema({
  like_id: { type: Number, require: true, unique: true },
  post_id: Number,
  user_id: String,
  comment_id: Number,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Like = mongoose.model("like", likeShema);

const commentShema = mongoose.Schema({
  comment_id: { type: Number, require: true, unique: true },
  comment_contents: String,
  post_id: Number,
  user_id: String,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Comment = mongoose.model("comment", commentShema);

const friendShema = mongoose.Schema({
  friend_id: { type: Number, require: true, unique: true },
  user_id_1: { type: String, require: true },
  user_id_2: { type: String, require: true },
  friend_yn: String,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Friend = mongoose.model("friend", friendShema);

module.exports = { User, File, Post, Like, Comment, Friend };
