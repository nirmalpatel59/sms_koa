const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const koaBody = require('koa-body')
const compose = require('koa-compose')
const jwt = require('koa-jwt')

const app   = new Koa()
let public  = new Router()
let private = new Router()
public.pst  = public.post
private.pst  = private.post

let auth = require('./utils/middleware/auth')
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

//Public Routes
public.pst('/signin', require('./auth').signIn)
public.pst('/signup', require('./auth').signUp)
public.pst('/forgot_password', require('./auth').forgotPassword)
public.pst('/varify_otp', require('./auth').varifyOTP)

//Private Routes
app.use(compose([public.routes(), public.allowedMethods(), auth(), private.routes(), private.allowedMethods()]))
private.get('/', ctx => {
  ctx.body = 'Alive Happy and Handsome !!!'
})
private.get('/users', require('./users/').getUser)
private.pst('/users', require('./users').saveUser)
private.put('/users', require('./users').updateUser)
private.del('/users', require('./users').removeUser)

private.pst('/myaccount/change_password', require('./myAccount').changePassword)

app.listen(config.api.port)
