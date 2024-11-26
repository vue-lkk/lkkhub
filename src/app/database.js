const mysql = require("mysql2");

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: "43.163.199.208",
  port: 3306,
  database: "lkkhub",
  user: "lkkhub",
  password: "1315637668",
  connectionLimit: 5,
});

// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 2.1判断是否有错误信息
  if (err) {
    console.log("获取连接失败~", err);
    return;
  }

  // 2.2获取connection,尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败~", err);
    } else {
      console.log("数据库交互成功，可以操作数据库~");
    }
  });
});

// 3.获取连接池中连接对象（promise）
const connection = connectionPool.promise();

module.exports = connection;
