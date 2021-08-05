const mysql = require('mysql2')
const config = require('./config') 


// 创建连接池，获取对象
const connections = mysql.createPool({
    // 这里不能写死
    host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD
})

// 验证是否连接成功
connections.getConnection((err,conn) => {
    conn.connect((err) => {
        if (err) {
            console.log("连接失败",err);
        }else {
            console.log("数据库连接成功~");
        }
    })
})

module.exports = connections.promise()