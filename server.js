const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const koaBody = require('koa-body')

const app = new Koa()
let router = new Router()
router.pst = router.post
require('./utils/mongooseConnection')

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', ctx => {
  ctx.body = 'Alive Happy and Handsome !!!'
})
router.get('/users', require('./users').getUser)
router.pst('/users', require('./users').saveUser)
router.put('/users', require('./users').updateUser)
router.del('/users', require('./users').removeUser)
app.listen(config.api.port)
