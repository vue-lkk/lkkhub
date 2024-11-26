const Koa = require("koa");
// 1.创建app
const app = new Koa();
const router = require("../router/index");
const bodyParser = require("koa-bodyparser");

// 2.对app使用中间件,获取post参数
app.use(bodyParser());

// 再注册成：应用级中间件
app.use(router.routes()).use(router.allowedMethods());

// 3.将app导出
module.exports = app;
