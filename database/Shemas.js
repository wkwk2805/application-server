const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: String,
  user_pw: String,
  user_name: String,
  user_phone: String,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const User = mongoose.model("user", userSchema);

const fileShema = mongoose.Schema({});
const File = mongoose.model("file", fileShema);

const postShema = mongoose.Schema({});
const Post = mongoose.model("post", postShema);

const likeShema = mongoose.Schema({});
const Like = mongoose.model("like", likeShema);

const commentShema = mongoose.Schema({});
const Comment = mongoose.model("comment", commentShema);

const friendShema = mongoose.Schema({});
const Friend = mongoose.model("friend", friendShema);

module.exports = { User, File, Post, Like, Comment, Friend };
