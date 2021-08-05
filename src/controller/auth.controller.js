const jwt = require('jsonwebtoken')
const { PRIVATE_KEY} = require('../app/config')


class AuthController {
    async login(ctx,next) {
         //从上一个中间间传递来的数据库中user
        const {name,id} = ctx.user
        const token = jwt.sign({name,id},PRIVATE_KEY,{
            expiresIn:60*60*24, //24小时
            algorithm:'RS256'
        })
        //返回结果
        ctx.body = { id, name, token }
    }

    async success(ctx,next) {
        ctx.body = "授权成功~"
    }
}

module.exports = new AuthController();