const errorTypes = require('../contants/error-types')
// 专门用于对错误进行处理
const errorHandler = (error,ctx) =>{
    let status,message;
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED: //如果是这种错误
            status = 400 //Bad Request
            message = "用户名或者密码不能为空~"
            break;
        case errorTypes.USER_ALREADY_EXISTS: //如果是这种错误
            status = 409 //conflict
            message = "用户名已经存在~"
            break;
        case errorTypes.USER_DOES_NOT_EXISTS: //如果是这种错误
            status = 400 //Bad Request
            message = "用户名不存在~"
            break;
        case errorTypes.PASSWORD_IS_INCORRECT: //如果是这种错误
            status = 400 //Bad Request
            message = "密码错误~"
            break;
        case errorTypes.UNAUTHORIZATION: //如果是这种错误
            status = 401 //unauthorization
            message = "未授权~"
            break;
        case errorTypes.UNAUTHORIZATION: 
            status = 401 //unpermission
            message = "没有权限~"
            break;
        default:
            status = 404;
            message = "NOT FOUND"
    }

    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandler;