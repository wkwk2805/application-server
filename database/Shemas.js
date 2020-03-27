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
      status: { type: String, default: "N" }, // Y:승인, N:모름, B:차단
      create_date: { type: Date, default: Date.now() }
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
  scope: { type: String, default: "ALL" }, // 모두(ALL), 친구만(FRIEND), 그룹만(GROUP), 나만(ME), 친구+그룹(PLUS)
  groups: [{ type: oid, ref: "group" }],
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
  recomments: [{ type: oid, ref: "comment" }],
  delete_date: Date,
  update_date: Date
});
const Comment = mongoose.model("comment", commentSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const newsSchema = new mongoose.Schema({
  from: { type: oid, ref: "user" },
  message: { type: String, require: true },
  is_new: { type: String, default: "Y" },
  to: [{ type: oid, ref: "user" }],
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const News = mongoose.model("news", newsSchema);
// !!!!!!스키마 변경시 update 부분도 꼭 변경해주기!!!!!!
const groupSchema = new mongoose.Schema({
  // 공개범위를 그룹도 넣기
  name: { type: String, require: true, unique: true },
  author: { type: oid, ref: "user" },
  members: [
    {
      member: { type: oid, ref: "user" },
      status: { type: String, default: "N" },
      grade: { type: String, default: "MEMBER" } // MEMBER, MANAGER
    }
  ],
  description: String,
  image: String,
  create_date: { type: Date, default: Date.now() },
  update_date: Date
});
const Group = mongoose.model("group", groupSchema);

module.exports = { User, Post, Comment, News, Group };
