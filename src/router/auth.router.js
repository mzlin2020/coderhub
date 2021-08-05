const Router = require('koa-router')

const authRouter = new Router();

const {
    login,
    success
} = require('../controller/auth.controller')

// 增加中间件：用于验证用户登录的信息是否正确
const {
    verifyLogin,
    verifyAuth
} = require("../middleware/auth.middleware")

authRouter.post('/login',verifyLogin,login) //增加一层中间件verifyLogin，验证登录信息是否正确
authRouter.get('/test',verifyAuth, success) //用于测试的路由，verifyAuth验证用户是否授权
module.exports = authRouter 