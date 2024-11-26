// 拿到app
const app = require("../app");
// 错误常量
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  TOKENEXPIREDERROR,
  OPERATION_IS_NOT_ALLOW,
} = require("../config/error");

// 注册监听事件
app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经存在";
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = "用户名不存在,请检查用户名";
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1004;
      message = "密码错误，请检查密码";
      break;
    case UNAUTHORIZATION:
      code = -1005;
      message = "无效的token";
      break;
    case TOKENEXPIREDERROR:
      code = -1006;
      message = "token已过期，请重新登录";
      break;
    case OPERATION_IS_NOT_ALLOW:
      code = -1007;
      message = "无权限操作";
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
