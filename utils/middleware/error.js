export default function (app) {
  return async function (ctx, next) {
    try {
      await next()
    } catch (e) {
      e.status = e.status || 500
      ctx.body = {
        status: e.status,
        message: e.message || 'Internal server error'
      }
    }
  }
}
