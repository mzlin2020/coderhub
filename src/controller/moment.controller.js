const fs = require('fs')
const fileService = require('../service/file.service');
const service = require('../service/monent.service')
const { PICTURE_PATH } = require('../contants/file-path')

class MomentControler {
    async create (ctx,next) {
        // 1.获取数据（user_id,content）
        const user_id = ctx.user.id
        const content = ctx.request.body.content
        console.log(user_id,content);

        //2.向数据库插入数据
        const result =  await service.create(user_id,content)
        ctx.body = result
    }

    async detail(ctx,next) {

        // 1.获取数据
        const id = ctx.params.momentId //根据路由传递过来的参数
        console.log(id);
        // 2.向数据库查询数据
        const result = await service.getMonent(id)
        ctx.body = result
    }

    async list(ctx,next) {
        // 1.获取数据
        const { offset, size } = ctx.request.query

        // 2.向数据库查询数据
        const result = await service.getMomentList(offset,size)
        ctx.body = result[0]
    }

    // 修改用户动态
    async update(ctx,next) {
        // 1.获取数据
        const {momentId} = ctx.params
        const {content} = ctx.request.body

        // 修改数据
        const result = await service.update(content,momentId)
        ctx.body =result
    }

    async remove(ctx,next) {
        // 1.获取数据
        const {momentId} = ctx.params
        
        // 2.删除数据
        const result = await service.remove(momentId)
        ctx.body = result
    }

    // 给动态添加标签
    async addLabels(ctx,next) {
    // 1.获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1.判断标签是否已经和动态有关系
      const isExist = await service.hasLabel(momentId, label.id);
      if (!isExist) {
        await service.addLabel(momentId, label.id);
      }
    }

    ctx.body = "给动态添加标签成功~"; 
    }

    // 给动态配图
    async fileInfo(ctx,next) {
        const {filename} = ctx.params
        const fileInfo = await fileService.getFileByFilename(filename)

        ctx.response.set('content-type',fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentControler()