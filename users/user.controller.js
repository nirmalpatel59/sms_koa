const userService = require('./user.service.js')
const getHashedPassword = require('../utils/common').getHashedPassword
module.exports.getUser = async function (ctx) {
  let data = await userService.getUser(ctx.query.phone_no)
  ctx.body = data
}

module.exports.saveUser = async function (ctx) {
  let userInstance = {
    'first_name': ctx.request.body.first_name,
    'middle_name': ctx.request.body.middle_name,
    'last_name': ctx.request.body.last_name,
    'marital_status': ctx.request.body.marital_status,
    'gender': ctx.request.body.gender,
    'email': ctx.request.body.email,
    'phone_no': ctx.request.body.phone_no,
    'date_of_joining': ctx.request.body.date_of_joining,
    'date_of_birth': ctx.request.body.date_of_birth,
    'role': ctx.request.body.role,
    'status': ctx.request.body.status,
    'type': ctx.request.body.type,
    'password': await getHashedPassword(ctx.request.body.password),
    'academics': ctx.request.body.academics,
    'specialization': ctx.request.body.specialization,
    'major_specialization': ctx.request.body.major_specialization,
    'standard_association': ctx.request.body.standard_association,
    'current_standard_association': ctx.request.body.current_standard_association
  }
  let data = await userService.saveUser(userInstance)
  ctx.body = data
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
