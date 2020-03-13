const { File } = require("../database/Shemas");
// read
const TAG = "file";
// create
const fileInsert = async (fileList, session) => {
  await File.createCollection();
  console.log(TAG, "fileInsert");
  let fileArray = [];
  for (f of fileList) {
    const file = await new File({
      name: f.name,
      path: f.path
    }).save({ session });
    fileArray.push(file._id);
  }
  return fileArray;
};
// update

// delete
module.exports = { fileInsert };
