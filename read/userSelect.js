const { User } = require("../database/Shemas");
const TAG = "userSelect";
// read
const getPostsByAllUser = async (req, res) => {
  console.log(TAG, "getPostsByUser");
  const posts = await User.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "user_id",
        foreignField: "user_id",
        as: "posts"
      }
    },
    {
      $unwind: "$posts"
    },
    {
      $lookup: {
        from: "files",
        localField: "posts.post_id",
        foreignField: "post_id",
        as: "files"
      }
    },
    {
      $addFields: {
        "posts.files": "$files"
      }
    },
    {
      $project: {
        files: 0
      }
    },

    {
      $lookup: {
        from: "comments",
        localField: "posts.post_id",
        foreignField: "post_id",
        as: "comments"
      }
    },
    {
      $addFields: {
        "posts.comments": "$comments"
      }
    },
    {
      $project: {
        comments: 0
      }
    },
    {
      $group: {
        _id: {
          user_id: "$user_id",
          user_name: "$user_name",
          user_phone: "$user_phone",
          user_email: "$user_email",
          user_del_yn: "$user_del_yn"
        },
        posts: {
          $push: "$posts"
        }
      }
    }
  ]);
  res.json(posts);
};

module.exports = { getPostsByAllUser };
