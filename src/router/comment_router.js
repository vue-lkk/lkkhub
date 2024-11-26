const Router = require("@koa/router");
const { verifyToken } = require("../middleware/login_middleware");
const commnetController = require("../controller/comment_controller");
const router = new Router();

// 增：新增评论
router.post("/", verifyToken, commnetController.create);
// 增：回复评论
router.post("/reply", verifyToken, commnetController.reply);

module.exports = router;
