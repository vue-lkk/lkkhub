/**
 * 操作数据库：user表的类方法
 */
const connection = require("../app/database");

class UserService {
  // 创建用户
  async create(user) {
    // 1.获取用户 user
    const { name, password } = user;
    // 2.拼接statement
    const statement = "insert into user (name,password) values (?,?);";
    // 3.执行sql语句
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  // 根据用户名查找用户
  async findUserByName(name) {
    const statement = "select * from user where name=?;";
    const [values, fields] = await connection.execute(statement, [name]);
    return values;
  }

  async updateUserAvatar(avatarUrl, userId) {
    const statement = "update user set avatar_url = ? where id=?;";
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
