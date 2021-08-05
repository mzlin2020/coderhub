const jwt = require("jsonwebtoken")

const errorTtypes = require('../contants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const authService = require('../service/auth.service')

const verifyLogin  = async (ctx,next) => {
    // 1.获取用户名和密码
    const {name,password} = ctx.request.body

    // 2.判断用户名和密码是否为空
    if(!name || !password) {
        const error = new Error(errorTtypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx)
    }

    // 3.判断用户是否存在
    const result = await service.getUserByName(name) //取出来的result是数组
    const user = result[0]
    if(!user) {
        const error = new Error(errorTtypes.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }

    //4. 判断密码是否和数据库中的密码是否一致（需要加密再对比）
    if(md5password(password) !== user.password) {
        const error = new Error(errorTtypes.PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error',error,ctx)
    }

    ctx.user = user //将数据库中的user信息保存在ctx.user中
    // 到这里还没错，就执行下一个中间件
    await next();
}
    //验证用户用否已有登录授权
    const verifyAuth = async (ctx,next) => {
        console.log("验证授权的middleware");
        // 1.获取token
        const authorrization = ctx.headers.authorization

        // 如果authorrization为空直接报错(说明没有token)
        if(!authorrization) {
            const error = new Error(errorTtypes.UNAUTHORIZATION);
            return ctx.app.emit('error',error,ctx)
        }

        const token = authorrization.replace('Bearer ', '')

        // 2.验证token
        try{
            const result = jwt.verify(token,PUBLIC_KEY,{
                algorithms:['RS256']
            })
            ctx.user = result
            await next()
        } catch (err) {
            // 发现错误
            const error = new Error(errorTtypes.UNAUTHORIZATION)
            ctx.app.emit('error',error,ctx)
        }
    }

    // 判断用户是否具备操作权限
    const verifyPermission = async (ctx,next) => {
        console.log("验证权限的middleware~");

         // 1.获取参数 { commentId: '1' }
        const [resourceKey] = Object.keys(ctx.params);
        const tableName = resourceKey.replace('Id', '');
        const resourceId = ctx.params[resourceKey];
        const { id } = ctx.user;

        // 查询是否具备权限
        const isPermission = await authService.checkResource(tableName,resourceId,id)
        if(!isPermission) {
            const error = new Error(errorTtypes.UNPERMISSION)
            return ctx.app.emit('error',error,ctx)
        }
        await next()

    }

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}