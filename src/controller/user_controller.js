/**
 * 控制器：用户相关
 */
const userService = require("../service/user_service");
const fileService = require("../service/file_service");
const fs = require("fs");
const { UPLOAD_PATH } = require("../config/path");

class UserController {
  // 创建用户
  async create(ctx, next) {
    // 1.获取用户传递过来的的信息
    const user = ctx.request.body;

    // 2.将user信息存储到数据库中
    const result = await userService.create(user);

    // 3.查看存储的结果，告知前端创建成功
    ctx.body = {
      message: "创建用户成功",
      data: result,
    };
  }

  async showAvatarImage(ctx, next) {
    // 1.获取用户id
    const { userId } = ctx.params;

    // 2.根据用户id获取头像
    const avatarInfo = await fileService.queryAvatarWithUserId(userId);

    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    // 设置文件类型,可以让浏览器展示图片，而不是下载
    ctx.type = mimetype;
    // 返回图片
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new UserController();
