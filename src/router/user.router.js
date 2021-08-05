const Router = require('koa-router');
const { verifyUser,handlePassword} = require('../middleware/user.middleware');//进行错误处理
const { create } = require('../controller/user.controller'); //创建用户名相关操作

const userRouter = new Router({prefix:'/users'});

// 注册中间件
userRouter.post('/',verifyUser,handlePassword,create)

module.exports = userRouter;