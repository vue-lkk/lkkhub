const Router = require("@koa/router");
const { verifyToken } = require("../middleware/login_middleware");
const labelController = require("../controller/label_controller");
const router = new Router();

router.post("/", verifyToken, labelController.create);
router.get("/", labelController.list);

module.exports = router;
