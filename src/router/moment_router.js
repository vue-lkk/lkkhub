const Router = require("@koa/router");
const { verifyToken } = require("../middleware/login_middleware");
const {
  verifyMomentPermission,
  verifyPermission,
} = require("../middleware/permission_middleware");
const momentController = require("../controller/moment_controller");
const { verifyLabelExists } = require("../middleware/label_middleware");

const router = new Router();

// 发布动态
router.post("/", verifyToken, momentController.create);
// 获取动态列表
router.get("/", momentController.list);
// 根据动态id获取动态详情
router.post("/:momentId", momentController.detail);
// 修改动态
router.patch(
  "/:momentId",
  verifyToken,
  verifyPermission,
  momentController.update
);
// 删除动态
router.delete(
  "/:momentId",
  verifyToken,
  verifyPermission,
  momentController.remove
);

// 1.是否登录
// 2.验证是否有操作这个动态的权限
// 3.额外中间件，验证label的name是否已经存在于label表中
// ● 如果存在，那么直接使用即可
// ● 如果不存在，那么需要先将label的那么添加到label表
// 4.最终步骤
// ● 所有的label都已经在label表
// ● 动态 和 label关系，添加到关系表中
router.post(
  "/:momentId/labels",
  verifyToken,
  verifyPermission,
  verifyLabelExists,
  momentController.addLabels
);

module.exports = router;
