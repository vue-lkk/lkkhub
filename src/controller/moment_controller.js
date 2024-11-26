const momentService = require("../service/moment_service");

class MomentController {
  async create(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body;
    // 2.动态是由谁发布的
    const { id, name } = ctx.user;
    // 3.将动态数据存储到数据库
    const result = await momentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "创建用户动态成功~",
      data: result,
    };
  }

  // 获取动态列表
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    console.log(offset, size);
    // 获取动态列表
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async detail(ctx, name) {
    // 1.获取动态id
    const { momentId } = ctx.params;
    // 2.根据id查询动态详情
    const result = await momentService.queryById(momentId);
    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async update(ctx, name) {
    // 1.获取动态id
    const { momentId } = ctx.params;
    // 2.获取修改的内容
    const { content } = ctx.request.body;
    // 3.执行数据库操作：根据id修改内容
    const result = await momentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "修改动态成功~",
      data: result,
    };
  }

  async remove(ctx, name) {
    // 1.获取动态id
    const { momentId } = ctx.params;
    // 3.执行数据库操作：根据id修改内容
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "删除动态成功~",
      data: result,
    };
  }

  // 为moment添加label
  async addLabels(ctx, next) {
    // 1.获取labels
    const { labels } = ctx;
    // 获取动态di
    const { momentId } = ctx.params;

    // 2.将moment_id 和 label_id添加到moment_label关系表中
    try {
      for (const label of labels) {
        // 2.1判断label_id是否已经和moment_id存在关系数据
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          // 2.2不存在该moment_id和label_id的关系数据
          await momentService.addLabel(momentId, label.id);
        }
      }
      ctx.body = {
        code: 0,
        message: "为动态添加标签成功~",
      };
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: "为动态添加标签失败,请检查数据是否有问题~",
      };
    }
  }
}

module.exports = new MomentController();
