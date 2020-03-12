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

module.exports = { resultData, hashSecret, SECRET_KEY, hashPwd };
