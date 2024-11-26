const Router = require("@koa/router");
const { verifyToken } = require("../middleware/login_middleware");
const fileContioller = require("../controller/file_controller");
const { handleAvatar } = require("../middleware/file_middleware");

const router = new Router();

router.post("/avatar", verifyToken, handleAvatar, fileContioller.create);

module.exports = router;
