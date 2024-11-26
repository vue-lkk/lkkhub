const connection = require("../app/database");

class FileService {
  async create(filename, mimetype, size, user_id) {
    const statement =
      "insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?);";
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      user_id,
    ]);
    return result[0];
  }

  async queryAvatarWithUserId(user_id) {
    const statement = "select * from avatar where user_id = ?;";
    const [result] = await connection.execute(statement, [user_id]);
    return result.pop();
  }
}

module.exports = new FileService();
