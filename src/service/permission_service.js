/**
 * 操作数据库
 */
const connection = require("../app/database");

class PermissionService {
  /**
   * 验证用户是否有操作表的权限
   * @param {表名称} resouceName
   * @param {表数据id} resouceId
   * @param {用户id} userId
   * @returns
   */
  async checkResouce(resouceName, resouceId, userId) {
    // 2.拼接statement
    const statement = `select * from ${resouceName} where id=? and user_id=?`;
    // 3.执行sql语句
    const [result] = await connection.execute(statement, [resouceId, userId]);
    return !!result.length;
  }
}

module.exports = new PermissionService();
