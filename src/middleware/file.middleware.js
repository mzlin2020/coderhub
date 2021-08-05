const Multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../contants/file-path')
// 头像上传
const avatarUpload = Multer({
    dest:AVATAR_PATH //保存头像的位置
})
const avatarHandler = avatarUpload.single('avatar')

// 配图上传
const pictureUpload = Multer({
    dest:PICTURE_PATH //保存头像的位置
})
const pictureHandler = pictureUpload.array('picture',9)

module.exports = {
    avatarHandler,
    pictureHandler
}