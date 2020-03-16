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
  be_shared_ids: [{ type: oid, ref: "post" }],
  comment_ids: [{ type: oid, ref: "comment" }],
  like_ids: [{ type: oid, ref: "like" }],
  friend_ids: [{ type: oid, ref: "user" }],
  del_yn: { type: String, default: "N" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date,
  delete_date: Date
});
userSchema.post("remove", doc => {
  console.log("removed", doc);
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
  author: { type: String, require: true },
  comment_ids: [{ type: oid, ref: "comment" }],
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
  author: { type: String, require: true },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Like = mongoose.model("like", likeSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const commentSchema = new mongoose.Schema({
  content: { type: String, require: true },
  author: { type: String, require: true },
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
module.exports = { User, File, Post, Like, Comment, Share };
