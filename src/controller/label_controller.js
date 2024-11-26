const labelService = require("../service/label_service");

class LabelController {
  async create(ctx, next) {
    // 1.获取标签名称
    const { name } = ctx.request.body;

    // 2.操作数据库
    const result = await labelService.create(name);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建标签成功~",
      data: result,
    };
  }

  async list(ctx, next) {
    // 操作数据库
    const result = await labelService.list();

    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new LabelController();
