const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const koaBody = require('koa-body')
const jwt = require('koa-jwt')

const app = new Koa()
let router = new Router()
router.pst = router.post
require('./utils/mongooseConnection')

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      'message': err.message,
      'status': ctx.status
    }
    ctx.app.emit('error', err, ctx)
  }
})

app.use(koaBody())
app.use(jwt({
  secret: config.auth.secretKey
}).unless({
  path: [/^\/signin/, /^\/signup/, /^\/forgot_password/, /^\/varify_otp/]
}))
app.use(router.routes())
app.use(router.allowedMethods())
router.get('/', ctx => {
  ctx.body = 'Alive Happy and Handsome !!!'
})
router.get('/users', require('./users/').getUser)
router.pst('/users', require('./users').saveUser)
router.put('/users', require('./users').updateUser)
router.del('/users', require('./users').removeUser)

router.pst('/myaccount/change_password', require('./myAccount').changePassword)

router.pst('/signin', require('./auth').signIn)
router.pst('/signup', require('./auth').signUp)
router.pst('/forgot_password', require('./auth').forgotPassword)
router.pst('/varify_otp', require('./auth').varifyOTP)

app.listen(config.api.port)
