const fs = require('fs')
const fileService = require('../service/file.service.js')
const { AVATAR_PATH } = require('../contants/file-path')
const userService = require('../service/user.service.js')
const { APP_PATH, APP_PORT} = require('../app/config')
class FileController {
    async saveAvatarInfo(ctx,next) {
        //1.获取信息
        // console.log(ctx.req.file); //打印图片上传时的附带的所有信息
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user

        // 2.将图像信息数据保存到数据库中
        const result = await fileService.createAvatar(filename,mimetype,size,id)
        
        // 将用户的头像路径保存到avatar_url中
        const avatarUrl = `${APP_PATH}:${APP_PORT}/upload/${id}/avatar` //图片路径
        await userService.updateAvatarUrlById(avatarUrl,id)

        ctx.body = '上传图片成功~'

    }    


    async showAvatarInfo(ctx,next) {
        // 用户的头像是哪一个文件
        const {userId} = ctx.params
        const avatarInfo = await fileService.getAvatarByUserId(userId)
        // console.log(avatarInfo);
        ctx.body = avatarInfo

        // // 提供图像信息
        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    }

    // 保存图片配图
    async savePictureInfo(ctx,next) {
        // 获取数据
        const files = ctx.req.files
        const { id } = ctx.user
        const { momentId } = ctx.query

        // 将所有图片信息保存到数据库中(多张图片)
        for(let file of files) {
            const  {filename, mimetype ,size } = file
            await fileService.createFile(filename, mimetype ,size,id,momentId)
        }
        ctx.body = '动态配图上传完成~'
    }
}

module.exports = new FileController()