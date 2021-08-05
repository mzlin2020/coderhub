    const errotTypes = require('../contants/error-types')
    const service = require('../service/user.service')
    const md5password = require('../utils/password-handle')

    const verifyUser = async (ctx,next) => {
    // 1.获取用户名和密码
    const {name,password} = ctx.request.body;

    // 2.判断用户名或者密码不能为空
    if (!name || !password ) {
        const error = new Error(errotTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error",error,ctx)
    }

    // 3.判断这次注册的用户名是没有注册过的
    const result = await service.getUserByName(name);
    if(result.length) { //如果数据库有值，则返回错误
        const error = new Error(errotTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error',error,ctx) //把错误发射出去

    }
    // 如果前边没有返回值，则执行下一个中间件
    await next();
}


    //对数据库密码进行加密
    const handlePassword = async(ctx,next) => {
        const {password} = ctx.request.body;
        ctx.request.body.password = md5password(password) //我们需要创建一个md5password函数

       await next()
    }

module.exports = {
    verifyUser,
    handlePassword
}