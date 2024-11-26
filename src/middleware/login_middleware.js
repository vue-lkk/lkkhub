const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  TOKENEXPIREDERROR,
  UNAUTHORIZATION,
} = require("../config/error");
const { PUBLICKEY } = require("../config/screct");
const userService = require("../service/user_service");
const md5Password = require("../utils/md5_password");

// 登录验证中间件
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2.查询用户是否在数据库中存在
  const users = await userService.findUserByName(name);
  const user = users[0];

  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 3.查询数据库中密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 4.将user对象存储在ctx
  ctx.user = user;

  // 执行next,下一个中间件
  await next();
};

// token验证中间件
const verifyToken = async (ctx, next) => {
  // 1.获取用户端携带过来的token
  const authorization = ctx.headers.authorization;
  console.log(authorization);
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.验证token
  try {
    // 2.1获取到token中的信息
    const result = jwt.verify(token, PUBLICKEY, {
      algorithm: "RS256", // 使用非对称加密算法
    });
    // 2.2将信息存储到ctx.user
    ctx.user = result;
    // 2.3执行下一个中间件
    await next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // token已过期
      ctx.app.emit("error", TOKENEXPIREDERROR, ctx);
    } else {
      // 无效的token
      ctx.app.emit("error", UNAUTHORIZATION, ctx);
    }
    return;
  }
};

module.exports = {
  verifyLogin,
  verifyToken,
};
