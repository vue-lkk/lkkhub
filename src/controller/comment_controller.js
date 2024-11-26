const commentService = require("../service/comment_service");

class CommnetController {
  async create(ctx, next) {
    // 1.获取评论的内容和动态id
    const { content, momentId } = ctx.request.body;
    // 获取用户id
    const { id } = ctx.user;

    // 2.操作数据库，存储数据
    const result = await commentService.create(content, momentId, id);

    ctx.body = {
      code: 0,
      message: "发布评论成功~",
      data: result,
    };
  }

  async reply(ctx, next) {
    // 1.获取评论的内容、动态id 和 评论的id
    const { content, momentId, commentId } = ctx.request.body;
    // 获取用户id
    const { id } = ctx.user;

    // 2.操作数据库，存储数据
    const result = await commentService.reply(content, momentId, commentId, id);

    ctx.body = {
      code: 0,
      message: "回复评论成功~",
      data: result,
    };
  }

  async comment(ctx, next) {
    // 2.操作数据库，存储数据
    const result = await commentService.comment();
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new CommnetController();
