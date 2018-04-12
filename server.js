const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const koaBody = require('koa-body')
const compose = require('koa-compose')
const app = new Koa()

let pubRouter = new Router()
let priRouter = new Router()
pubRouter.pst = pubRouter.post
priRouter.pst = priRouter.post

let auth = require('./utils/middleware/auth')
let requestLog = require('./utils/middleware/requestLog').requestLog

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
    // ctx.app.emit('error', err, ctx)
  }
})

app.use(koaBody({
  multipart: true,
  formidable: {}
}))

// Public Routes
pubRouter.pst('/signin', require('./auth').signIn)
pubRouter.pst('/signup', require('./auth').signUp)
pubRouter.pst('/forgot_password', require('./auth').forgotPassword)
pubRouter.pst('/varify_otp', require('./auth').varifyOTP)
pubRouter.pst('/stdSignIn', require('./stdApis/auth').signIn)

// Private Routes
app.use(compose([requestLog, pubRouter.routes(), pubRouter.allowedMethods(), auth(), priRouter.routes(), priRouter.allowedMethods()]))
priRouter.get('/', ctx => {
  ctx.body = 'Alive Happy and Handsome !!!'
})
priRouter.get('/users', require('./users/').getUser)
priRouter.pst('/users', require('./users').saveUser)
priRouter.put('/users', require('./users').updateUser)
priRouter.del('/users', require('./users').removeUser)

priRouter.pst('/myaccount/change_password', require('./myAccount').changePassword)

priRouter.get('/student', require('./students').getStudent)
priRouter.pst('/student', require('./students').addStudent)
priRouter.put('/student', require('./students').updateStudent)
priRouter.del('/student', require('./students').removeStudent)

priRouter.pst('/upload_students', require('./students').uploadStudents)

priRouter.get('/getExam', require('./exams').getExam)
priRouter.pst('/saveExam', require('./exams').saveExam)
priRouter.pst('/updateExam', require('./exams').updateExam)
priRouter.pst('/removeExam', require('./exams').removeExam)

priRouter.get('/getExamResult', require('./examResults').getExamResult)
priRouter.pst('/saveExamResult', require('./examResults').addExamResult)
// priRouter.get('/students', require('./students/').getStudents)
pubRouter.pst('/stdSignIn', require('./stdApis/auth').signIn)
app.listen(config.api.port, () => {
  console.log(`server is running on port ${config.api.port}`)
})
