// 1.导入app
const app = require("./app");
// .env 配置
const { SERVER_PORT } = require("./config/server");
// 错误处理
require("./utils/handle_error");

// 2.将app启动起来
app.listen(SERVER_PORT, () => {
  console.log(`lkkhub服务器启动成功！http://localhost:${SERVER_PORT}`);
});
