const connection = require('../app/database')

class authService {
    async checkResource(tableName,momId,id) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
        const [result] = await connection.execute(statement,[momId,id])
        return result.length === 0 ? false : true
    }
}

module.exports = new authService()