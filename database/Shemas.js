const mongoose = require("mongoose");
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const oid = mongoose.SchemaTypes.ObjectId;
const userSchema = new mongoose.Schema({
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
  authority: [{ type: String }],
  be_shared_ids: [{ type: oid, ref: "post" }],
  comment_ids: [{ type: oid, ref: "comment" }],
  like_ids: [{ type: oid, ref: "like" }],
  friend_ids: [{ type: oid, ref: "user" }],
  del_yn: { type: String, default: "N" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date,
  delete_date: Date
});
const User = mongoose.model("user", userSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const fileSchema = new mongoose.Schema({
  name: { type: String, require: true },
  path: { type: String, require: true },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const File = mongoose.model("file", fileSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const postSchema = new mongoose.Schema({
  content: { type: String, require: true },
  author: { type: oid, require: true, ref: "user" },
  comment_ids: [{ type: oid, ref: "comment" }],
  /*Category ALL, CHURCH, FRIEND, CELL, LEADER, 등등 */
  categories: [{ type: String, default: "ALL" }], // Category 이름을 스스로 정해서 사용할 수 있도록 한다
  tags: [String],
  like_ids: [{ type: oid, ref: "like" }],
  file_ids: [{ type: oid, ref: "file" }],
  share_ids: [{ type: oid, ref: "share" }],
  create_date: { type: Date, default: Date.now() },
  del_yn: { type: String, default: "N" },
  delete_date: Date,
  update_date: Date
});
const Post = mongoose.model("post", postSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const likeSchema = new mongoose.Schema({
  author: { type: oid, require: true, ref: "user" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Like = mongoose.model("like", likeSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const commentSchema = new mongoose.Schema({
  content: { type: String, require: true },
  author: { type: oid, require: true, ref: "user" },
  like_ids: [{ type: oid, ref: "like" }],
  create_date: { type: Date, default: Date.now() },
  del_yn: { type: String, default: "N" },
  delete_date: Date,
  update_date: Date
});
const Comment = mongoose.model("comment", commentSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const shareSchema = new mongoose.Schema({
  shared_user: { type: oid, ref: "user" },
  share_date: { type: Date, default: Date.now() }
});
const Share = mongoose.model("share", shareSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const newsSchema = new mongoose.Schema({
  post_id: { type: oid, ref: "post" },
  like_id: { type: oid, ref: "like" },
  comment_id: { type: oid, ref: "comment" },
  friend_id: { type: oid, ref: "user" },
  friend_yn: { type: String, default: "N" },
  is_new: { type: String, default: "Y" },
  author: { type: oid, ref: "user" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const News = mongoose.model("news", newsSchema);
module.exports = { User, File, Post, Like, Comment, Share, News };
