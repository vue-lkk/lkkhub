const Router = require("@koa/router");
const loginController = require("../controller/login_controller");
const { verifyLogin, verifyToken } = require("../middleware/login_middleware");

const router = new Router();

// 用户登录
router.post("/", verifyLogin, loginController.sign);
// 测试token
router.post("/test", verifyToken, loginController.test);

module.exports = router;
