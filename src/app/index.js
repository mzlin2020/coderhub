const koa = require('koa');
const bodyParser = require('koa-bodyparser');


const useRoutes = require("../router/index")  //统一导入路由
const errorHandler = require('./error.handle')

const app = new koa()

app.use(bodyParser()) //解析json

useRoutes(app); //使用路由

// 错误处理
app.on('error',errorHandler)

// 导出
module.exports = app