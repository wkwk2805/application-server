const resultData = (isSuccess, message, returnValue) => ({
  success: isSuccess,
  message: message,
  returnValue: returnValue
});
const hashSecret = "!)@(#*$&^%";
const SECRET_KEY = "secret-key";
const hashPwd = password =>
  require("crypto")
    .createHmac("sha256", hashSecret)
    .update(password)
    .digest("hex");
const fileHandler = files => {
  const fileList = [];
  // 수정파일이라면 기존파일 제거
  return fileList;
};
// tag를 배열화 하여 값 넣기
const tagHandler = contents => {
  console.log(contents);
  const hashTagList = [];
  const list = contents.split(" ");
  if (list.length === 0) {
    return false;
  }
  for (let item of list) {
    if (item.indexOf("#") > -1) {
      hashTagList.push(item);
    }
  }
  let resultList = [];
  if (hashTagList.length === 0) {
    return false;
  }
  for (let item of hashTagList) {
    const array = item.split("#");
    array.shift();
    resultList = resultList.concat(array);
  }
  if (resultList.length === 0) {
    return false;
  }
  return resultList.map(e => "#" + e);
};

module.exports = {
  resultData,
  hashSecret,
  SECRET_KEY,
  hashPwd,
  fileHandler,
  tagHandler
};
