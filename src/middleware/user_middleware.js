const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");

const userService = require("../service/user_service");
const md5Password = require("../utils/md5_password");

// 判断用户中间件
const verifyUser = async (ctx, next) => {
  // 1.获取用户传递过来的的信息
  const user = ctx.request.body;

  // 2.判断
  // 判断用户和密码是为空
  const { name, password } = user;
  if (!name || !password) {
    // 发送事件
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    // 发送事件
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 3.执行下一个中间件
  await next();
};

// 密码加密中间件
const handlePassword = async (ctx, next) => {
  // 1.获取加密
  const { password } = ctx.request.body;
  // 2.md5密码加密
  ctx.request.body.password = md5Password(password);
  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
