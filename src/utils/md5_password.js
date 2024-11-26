// koa内置的密码加密库
const crypto = require("crypto");

function md5Password(password) {
  const md5 = crypto.createHash("md5");
  // 通过md5加密，转换为16进制
  const md5Pwd = md5.update(password).digest("hex");
  return md5Pwd;
}

module.exports = md5Password;
