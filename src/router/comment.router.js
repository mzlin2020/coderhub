const Router = require('koa-router')

const { verifyAuth, verifyPermission} = require('../middleware/auth.middleware')
const { create, reply, update, remove, list } = require('../controller/comment.controller')

const commentRouter = new Router({prefix:'/comment'})
//发表评论接口
commentRouter.post('/',verifyAuth,create)
// 回复评论的评论接口
commentRouter.post('/:commentId/reply',verifyAuth,reply)

// 更新、修改评论的接口
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)

// 删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remove)

// 获取评论
commentRouter.get('/',list)

module.exports = commentRouter