const connection = require("../app/database")

class MomentService {
    async create(user_id,content) {
        const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`
        const [result] = await connection.execute(statement,[content,user_id])
        return result
    }

    async getMonent(id) {
        const statement = `
        SELECT 
            m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) 
            FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        WHERE m.id = ?;
        `
        const result = await connection.execute(statement,[id])
        return result[0]
    }

    async getMomentList(offset,size) {
        const statement = `
        SELECT
            m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) 
            FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        LIMIT ?,?;
        `
        const result = await connection.execute(statement,[offset,size])
        return result
    }

    // 更新动态
    async update (content,id) {
        const statement = ` UPDATE moment SET content = ? WHERE id = ?;`
        const result = await connection.execute(statement,[content,id])
        return result
    }

    // 删除动态
    async remove (momentId) {
        const statement =  `DELETE FROM moment WHERE id = ?;`
        const result = await connection.execute(statement,[momentId])
        return result
    }

    async hasLabel(momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result[0] ? true: false;
    }
    
    async addLabel(momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
    }
}

module.exports = new MomentService()