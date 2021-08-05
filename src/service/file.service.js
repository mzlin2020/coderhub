const connection = require('../app/database')

class fileService {
    async createAvatar(filename,mimetype,size,id) {
        const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?);`
        const [result] = await connection.execute(statement,[filename,mimetype,size,id])
        return result
    }

    async getAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const [result] = await connection.execute(statement,[userId])
        return result.pop()
    }

    // 将动态配图插入数据库
    async createFile(filename,mimetype,size,id,momentId) {
        const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES(?,?,?,?,?);`
        const [result] = await connection.execute(statement,[filename,mimetype,size,id,momentId])
        return result
    }

    async getFileByFilename(filename) {
        const statement = `SELECT * FROM file WHERE filename = ?;`
        const [result] = await connection.execute(statement,[filename])
        return result[0]
    }
}

module.exports = new fileService()