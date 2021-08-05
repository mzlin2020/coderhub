const connection = require('../app/database')

class LabelService {
     async create(name) {
        const statement = `INSERT INTO label (name) VALUES (?)`
        const [result] = await connection.execute(statement,[name])
        return result
    }

    async getLabelByName(name) {
        const statement =  `select * from label where name = ?;`
        const [result] = await connection.execute(statement,[name])
        return result[0]
    }

    // 获取标签接口
    async getLabels(offset,limit) {
        const statement =  `select * from label LIMIT ?,?;`
        const [result] = await connection.execute(statement,[offset,limit])
        return result
    }
}

module.exports = new LabelService()