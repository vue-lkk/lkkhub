const labelService = require("../service/label_service");

/**
 * 传入labels时,不确定labels是否有name已经存在label表中
 * 所有需要将labels都保存在label中，获取labels的id将获取
 * 的数据传递给下一个中间件
 */
const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来的所有labels
  const { labels } = ctx.request.body;
  const newLabels = [];

  // 2.操作数据：判断所有labels中的每一个name是否都存在于label表中
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    // 收集
    const labelObj = { name };

    if (result) {
      // 存在,获取name对应的label的id
      labelObj.id = result.id; // {name:"编程",id:1}
    } else {
      //不存在，插入name,并且获取插入后的id
      const insertResult = await labelService.create(name);
      labelObj.id = insertResult.insertId; // {name:"唱歌",id:3}
    }
    newLabels.push(labelObj);
  }

  // 3.所有的labels都变成 [{name:"编程",id:1},{name:"唱歌",id:3}]
  ctx.labels = newLabels;

  await next();
};

module.exports = {
  verifyLabelExists,
};
