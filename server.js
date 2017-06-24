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
router.get('/users', require('./users').getUsers)
router.pst('/users', require('./users').saveUsers)

app.listen(config.api.port)
