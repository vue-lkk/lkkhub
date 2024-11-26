const { OPERATION_IS_NOT_ALLOW } = require("../config/error");
const permissionService = require("../service/permission_service");

const verifyPermission = async (ctx, next) => {
  // 1.获取到登录用户的id
  const { id } = ctx.user;

  // 2.获取资源(表)的name(moment/user名称)/id(表数据id)
  // params = {momentId:5} => 根据动态路由获取到对应操作的表名称和修改表数据的id
  const keyName = Object.keys(ctx.params)[0];
  const resouceId = ctx.params[keyName];
  const resouceName = keyName.replace("Id", "");
  // 3.查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkResouce(
    resouceName,
    resouceId,
    id
  );

  // 4.判断是否有权限
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOW, ctx);
  }
  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyPermission,
};
