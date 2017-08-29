const userService = require('./user.service.js')
const getHashedPassword = require('../utils/common').getHashedPassword
module.exports.getUser = async function (ctx) {
  let data = await userService.getUser(ctx.query.phone_no)
  ctx.body = data
}

module.exports.saveUser = async function (ctx) {
  let ctxReq = ctx.req.body
  if (!(await isUserExists())) {
    let userInstance = {
      'first_name': ctxReq.first_name,
      'middle_name': ctxReq.middle_name,
      'last_name': ctxReq.last_name,
      'marital_status': ctxReq.marital_status,
      'gender': ctxReq.gender,
      'email': ctxReq.email,
      'phone_no': ctxReq.phone_no,
      'date_of_joining': ctxReq.date_of_joining,
      'date_of_birth': ctxReq.date_of_birth,
      'role': ctxReq.role,
      'status': ctxReq.status,
      'type': ctxReq.type,
      'password': await getHashedPassword(ctxReq.password),
      'academics': ctxReq.academics,
      'specialization': ctxReq.specialization,
      'major_specialization': ctxReq.major_specialization,
      'standard_association': ctxReq.standard_association,
      'current_standard_association': ctxReq.current_standard_association
    }
    let data = await userService.saveUser(userInstance)
    ctx.body = data
  } else {
    ctx.body = {
      message: 'User Already exist',
      code: 200
    }
  }
}

module.exports.updateUser = async function (ctx) {
  let body = ctx.request.body
  let userInstance = {
    'first_name': body.first_name,
    'middle_name': body.middle_name,
    'last_name': body.last_name,
    'marital_status': body.marital_status,
    'gender': body.gender,
    'email': body.email,
    'date_of_joining': body.date_of_joining,
    'date_of_birth': body.date_of_birth,
    'role': body.role,
    'status': body.status,
    'type': body.type,
    'academics': body.academics,
    'specialization': body.specialization,
    'major_specialization': body.major_specialization,
    'standard_association': body.standard_association,
    'current_standard_association': body.current_standard_association
  }
  let data = await userService.updateUser(body.phone_no, userInstance)
  ctx.body = data
}

module.exports.removeUser = async function (ctx) {
  let phoneNo = ctx.query.phone_no
  let data = await userService.removeUser(phoneNo)
  ctx.body = data
}

let isUserExists = async function (reqBody) {
  let selector = {
    'phone_no': reqBody.phone_no
  }
  let isExist = await userService.isUserExist(selector)
  return isExist
}
