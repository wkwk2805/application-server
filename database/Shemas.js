const mongoose = require("mongoose");
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const oid = mongoose.SchemaTypes.ObjectId;
const userSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, require: true, trim: true },
  name: String,
  phone: String,
  email: String,
  images: [String],
  post_ids: [{ type: oid, ref: "post" }],
  be_shared_ids: [{ type: oid, ref: "post" }],
  comment_ids: [{ type: oid, ref: "comment" }],
  like_ids: [{ type: oid, ref: "like" }],
  friend_ids: [{ type: oid, ref: "user" }],
  del_yn: { type: String, default: "N" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const User = mongoose.model("user", userSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const fileShema = mongoose.Schema({
  name: { type: String, require: true },
  path: { type: String, require: true },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const File = mongoose.model("file", fileShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const postShema = mongoose.Schema({
  content: { type: String, require: true },
  author: { type: String, require: true },
  comment_ids: [{ type: oid, ref: "comment" }],
  like_ids: [{ type: oid, ref: "like" }],
  file_ids: [{ type: oid, ref: "file" }],
  share_ids: [{ type: oid, ref: "share" }],
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Post = mongoose.model("post", postShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const likeShema = mongoose.Schema({
  author: { type: String, require: true },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Like = mongoose.model("like", likeShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const commentShema = mongoose.Schema({
  content: { type: String, require: true },
  author: { type: String, require: true },
  like_ids: [{ type: oid, ref: "like" }],
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Comment = mongoose.model("comment", commentShema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const shareSchema = mongoose.Schema({
  shared_user: { type: oid, ref: "user" },
  share_date: { type: Date, default: Date.now() }
});
const Share = mongoose.model("share", shareSchema);
module.exports = { User, File, Post, Like, Comment, Share };
