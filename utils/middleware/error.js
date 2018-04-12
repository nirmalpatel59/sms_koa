module.exports.error = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e.code === 11000) {
      e.message = 'Document already exist.constraint violation'
    }
    e.status = e.status || 500
    ctx.body = {
      status: e.status,
      message: e.message || 'Internal server error'
    }
  }
}
