const Router = require('koa-router')


const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    saveAvatarInfo,
    showAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller.js')
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')
const fileRouter = new Router({prefix:'/upload'})

fileRouter.post('/avatar',verifyAuth,avatarHandler,saveAvatarInfo) //保存头像信息

// 在浏览器显示图片
fileRouter.get('/:userId/avatar',showAvatarInfo)

// 上传动态配图接口
fileRouter.post('/picture',verifyAuth,pictureHandler,savePictureInfo)

module.exports = fileRouter