const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');

//在传入数据库之前对账户密码进行校验
const verifyUser = async (ctx, next) => {
      // 1.获取用户名和密码
      const { name, password } = ctx.request.body;

      // 2.判断用户名或者密码不能空
      if (!name || !password) {
            const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
            return ctx.app.emit('error', error, ctx);
      }

      // 3.判断这次注册的用户名是没有被注册过
      console.log(123213213, password);
      const result = await service.getUserByName(name);
      console.log(123213213, result);
      if (result.length) {
            // console.log(123, name, password);

            const error = new Error(errorTypes.USER_ALREADY_EXISTS);
            return ctx.app.emit('error', error, ctx);
      }

      await next();
}

const handlePassword = async (ctx, next) => {
      const { password } = ctx.request.body;
      ctx.request.body.password = md5password(password)

      await next();
}

module.exports = {
      verifyUser,
      handlePassword
}
