const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})

const { create , detail, list, update, remove, addLabels, fileInfo } = require('../controller/moment.controller.js')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware') //验证用户是否登录过的中间间
const { verifyLabelExists } = require('../middleware/label.middleware') //验证label是否存在

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/',list) //获取用户动态（列表）
momentRouter.get('/:momentId',detail) //获取用户动态(单条)

// 修改动态的条件：1.用户必须已经登录 2.用户具备权限（只能修改自己的）
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update) //修改用户动态

// 删除动态
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)

// 给动态配图
momentRouter.get('/images/:filename',fileInfo)
    
module.exports = momentRouter