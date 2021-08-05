const Router = require('koa-router')

const labelRouter = new Router({prefix:'/label'})
const {verifyAuth} = require('../middleware/auth.middleware')
const {create,list} = require('../controller/label.controller.js')

// 创建标签
labelRouter.post('/',verifyAuth,create)

// 获取标签列表接口
labelRouter.get('/',list)


module.exports = labelRouter
