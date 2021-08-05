const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'keys/public.key'))

const dotenv = require('dotenv')
//加载后，process.env.APP_PORT已经8000这个属性

dotenv.config();
//解构并导出

module.exports = {
    APP_PATH,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env;

// 顺序-不能放上方，会被覆盖
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
