let jwt = require('jsonwebtoken')
let config = require('config')

module.exports = function () {
  return async function authorize (ctx, next) {
    if (ctx.method === 'OPTIONS') return await next()
    let token = ctx.get('x-auth-token')
    if (!token) {
      ctx.throw('Authentication required', 401)
    }
    let jwtDecode = jwt.verify(token, config.auth.secret)
    // console.log(jwtDecode)

    ctx.auth = jwtDecode
    await next()
  }
}
