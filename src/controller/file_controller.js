const fileService = require("../service/file_service");
const userService = require("../service/user_service");
const { SERVER_PORT, SERVER_HOST } = require("../config/server");

class FileContioller {
  async create(ctx, next) {
    // 1.获取文件信息
    const { filename, mimetype, size } = ctx.request.file;
    // 获取用户id
    const { id } = ctx.user;

    // 2.将图片信息和id结合起来进行存储到avatar表
    const result = await fileService.create(filename, mimetype, size, id);

    // 3.将头像地址信息，保存到user表
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`;
    const result2 = await userService.updateUserAvatar(avatarUrl, id);
    console.log(result2);

    // 4.返回结果
    ctx.body = {
      code: 0,
      message: "文件上传成功~",
      data: result,
    };
  }
}

module.exports = new FileContioller();
