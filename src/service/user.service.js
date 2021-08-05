const connection = require("../app/database"); 

class UserService {
    async create(user) {
        // 将用户名，密码从user中解构出来
        const {name,password} = user;
        const statement = `INSERT INTO users (name,password) VALUES (?,?);`;

        // 将user存到数据库Hong Kong    
        const result = await connection.execute(statement,[name,password])
       
        return result;
    }

    // 获取数据库中用户的name，用于判断账号是否已存在
    async getUserByName(name) {
        const statement = `SELECT * FROM users WHERE name = ?;`
        const result = await connection.execute(statement,[name])
        return result[0];
    }

    // 更新数据库中，user表的头像url
    async updateAvatarUrlById(avatarUrl,userId) {
        const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
        const [result] = await connection.execute(statement,[avatarUrl,userId])
        return result
    }
}

module.exports = new UserService()  