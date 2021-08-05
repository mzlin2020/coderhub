const service = require('../service/label.service.js')

class LabelController {
    async create(ctx,next) {
        const {name} = ctx.request.body
        const result = await service.create(name)
        ctx.body =result
    }

    // 获取标签列表
    async list(ctx,next) {
        const {offset,limit} = ctx.query
        const result = await service.getLabels(offset,limit)
        ctx.body = result
    }
}

module.exports = new LabelController()