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
  files: [
    {
      name: { type: String },
      path: { type: String },
      create_date: { type: Date, default: Date.now() }
    }
  ],
  friends: [
    {
      user: { type: oid, ref: "user" },
      create_date: { type: Date, default: Date.now() },
      status: { type: String, default: "N" }
    }
  ],
  del_yn: { type: String, default: "N" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date,
  delete_date: Date
});
const User = mongoose.model("user", userSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const postSchema = new mongoose.Schema({
  content: { type: String, require: true },
  author: { type: oid, require: true, ref: "user" },
  categories: [{ type: String, default: "ALL" }], // Category 이름을 스스로 정해서 사용할 수 있도록 한다
  tags: [String],
  likes: [
    {
      user: { type: oid, ref: "user" },
      create_date: { type: Date, default: Date.now() }
    }
  ],
  files: [
    {
      name: { type: String },
      path: { type: String },
      create_date: { type: Date, default: Date.now() }
    }
  ],
  shares: [
    {
      user: { type: oid, ref: "user" },
      create_date: { type: Date, default: Date.now() }
    }
  ],
  create_date: { type: Date, default: Date.now() },
  del_yn: { type: String, default: "N" },
  delete_date: Date,
  update_date: Date
});
const Post = mongoose.model("post", postSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const commentSchema = new mongoose.Schema({
  content: { type: String, require: true },
  author: { type: oid, require: true, ref: "user" },
  post_ids: { type: oid, require: true, ref: "post" },
  likes: [
    {
      user: { type: oid, ref: "user" },
      create_date: { type: Date, default: Date.now() }
    }
  ],
  create_date: { type: Date, default: Date.now() },
  del_yn: { type: String, default: "N" },
  delete_date: Date,
  update_date: Date
});
const Comment = mongoose.model("comment", commentSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const newsSchema = new mongoose.Schema({
  message: { type: String, require: true },
  is_new: { type: String, default: "Y" },
  author: { type: oid, ref: "user" },
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const News = mongoose.model("news", newsSchema);

module.exports = { User, Post, Comment, News };
