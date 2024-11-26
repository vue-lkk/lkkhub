const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = "insert into label (name) values (?);";
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async list() {
    const statement = "select * from label;";
    const result = await connection.execute(statement);
    return result[0];
  }

  async queryLabelByName(name) {
    const statement = "select * from label where name=?;";
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
