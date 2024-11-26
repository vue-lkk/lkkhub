const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "insert into moment (content,user_id) values (?,?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async queryList(offset = 0, size = 10) {
    const statement = `
    select 
      m.id as id, 
      m.content as content,
      m.createAt as createTime,
      m.updateAt as updateTime,
      json_object(
        'id', w.id, 
        'name', w.name, 
        'avatarURL',w.avatar_url,
        'createTime',w.createAt, 
        'updateTime',w.updateAt) user,
      (select count(*) from comment where moment_id=m.id) commentCount,
      (select count(*) from moment_label ml where ml.moment_id=m.id) labelCount 
    from moment as m 
    left join user as w on w.id = m.user_id
    limit ? offset ?;
    `;
    // 注意：必须是字符串 String
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }

  async queryById(id) {
    const statement = `
    select 
      m.id as id, 
      m.content as content,
      m.createAt as createTime,
      m.updateAt as updateTime,
      json_object(
        'id', w.id, 
        'name', w.name, 
        'avatarURL',w.avatar_url,
        'createTime',w.createAt, 
        'updateTime',w.updateAt) user,
      (
        select 
          json_arrayagg(json_object(
        'id',c.id,
        'content',c.content,
        'commentId',c.comment_id,
        'user',
          json_object(
            'id',cu.id,
            'name',cu.name,
            'avatarURL',cu.avatar_url
          )
        ))
        from comment as c 
        left join user cu on c.user_id = cu.id
        where c.moment_id = m.id
        ) comments,
      json_arrayagg(json_object(
        'id',l.id,
        'name',l.name)) labels
    from moment as m 
    left join user as w on w.id = m.user_id
    left join moment_label as ml on ml.moment_id = m.id
    left join label as l on ml.label_id = l.id
    where m.id = ?;
    `;
    // 注意：必须是字符串 String
    const [result] = await connection.execute(statement, [String(id)]);
    return result;
  }

  async update(id, content) {
    const statement = `update moment set content = ? where id = ?;`;
    // 注意：必须是字符串 String
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `select * from moment_label where moment_id=? and label_id = ?;`;
    // 注意：必须是字符串 String
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return Boolean(result.length);
  }

  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label (moment_id,label_id) values (?,?);`;
    // 注意：必须是字符串 String
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
