const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../config/path");

// 上传文件的中间件
const uploadAvatar = multer({
  dest: UPLOAD_PATH,
});

const handleAvatar = uploadAvatar.single("avatar");

module.exports = {
  handleAvatar,
};
