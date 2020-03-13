const { File } = require("../database/Shemas");
// read
const TAG = "/middleware/file.js/";
// create
const fileInsert = async (fileList, session) => {
  console.log(TAG, "fileInsert");
  await File.createCollection();
  const fileArray = [];
  for (f of fileList) {
    const file = await new File({
      name: f.name,
      path: f.path
    }).save({ session });
    fileArray.push(file._id);
  }
  return fileArray;
};

module.exports = { fileInsert };
