const Router = require("@koa/router");
const router = new Router();
const fs = require("fs");

// // 引入user路由模块
// const userRouter = require("./user_router");
// // 引入login路由模块
// const loginRouter = require("./login_router");

// // 先注册成：路由级中间件
// router.use("/user", userRouter.routes(), userRouter.allowedMethods());
// router.use("/login", loginRouter.routes(), userRouter.allowedMethods());

/**
 * 自动化注册路由
 */
// 1.获取当前文件夹下的所有文件
const files = fs.readdirSync(__dirname);
// 2.遍历所有文件
for (const file of files) {
  // 排除 index.js文件
  if (!file.endsWith("_router.js")) continue;
  // 获取名称
  const [name] = file.split("_");
  // 导入路由模块
  const routers = require(`./${file}`);
  // 注册
  router.use(`/${name}`, routers.routes(), routers.allowedMethods());
}

module.exports = router;
