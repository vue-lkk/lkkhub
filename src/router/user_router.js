const Router = require("@koa/router");
const userController = require("../controller/user_controller");
const { verifyUser, handlePassword } = require("../middleware/user_middleware");

// 1.创建路由的对象
const router = new Router();

// 2.定义路由中映射
// 2.1用户注册接口
router.post("/", verifyUser, handlePassword, userController.create);
// 2.2查看用户头像
router.get("/avatar/:userId", userController.showAvatarImage);

// 3.导出路由
module.exports = router;
