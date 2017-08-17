module.exports = function() {
  return async function authorize(ctx, next) {
    if('OPTIONS' === ctx.method) return await next()
    let token = ctx.get('x-auth-token')
    if(!token) {
      ctx.throw("Authentication required", 401)
    }
    await next()
  }
}

