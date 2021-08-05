const service = require('../service/comment.service.js')

class CommentController {
    async create(ctx,next) {
        const {momentId,content} = ctx.request.body
        const {id} = ctx.user
        const result = await service.create(content,momentId,id)
        ctx.body = result
        // ctx.body = momentId + content + id
    }
    //回复评论
    async reply(ctx,next) {
        const {momentId,content} = ctx.request.body
        const {commentId} = ctx.params
        const {id} = ctx.user
        const result = await service.reply(momentId,content,id,commentId)
        ctx.body = result 
    }

    // 修改评论
    async update(ctx,next) {
        const {content} = ctx.request.body
        const {commentId} = ctx.params

        const result = await service.update(content,commentId)
        ctx.body = result
        // ctx.body = "修改评论成功~" + content + commentId
    }

    // 删除评论
    async remove(ctx,next) {
        const {commentId} = ctx.params
        const result = await service.remove(commentId)
        ctx.body = result
    }

    // 获取评论
    async list(ctx,next) {
        const {momentId} = ctx.query
        const result = await service.getCommentsByMomentId(momentId);
        ctx.body = result
    }
}

module.exports = new CommentController()