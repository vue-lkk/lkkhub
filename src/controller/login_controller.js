/**
 * 控制器:登录相关
 */
const jwt = require("jsonwebtoken");
const { PRIVATEKEY } = require("../config/screct");

class loginController {
  // 生成token
  sign(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user;
    // 2.颁发token令牌
    try {
      const token = jwt.sign({ id, name }, PRIVATEKEY, {
        expiresIn: 24 * 60 * 60, // 过期时间（秒）
        algorithm: "RS256", // 使用非对称加密算法
      });
      // 3.返回用户信息和token
      ctx.body = {
        code: 0,
        data: { token, id, name },
      };
    } catch (err) {
      console.error("Token signing error(令牌签名错误):", err.message);
      ctx.status = 500;
      ctx.body = {
        code: 1,
        message: "Internal Server Error(服务器内部错误)",
        error: err.message,
      };
    }
  }

  // 测试
  test(ctx, next) {
    ctx.body = {
      code: 0,
      data: [{ id: 111, name: "vue" }],
    };
  }
}

module.exports = new loginController();
