const UserModel = require('../models/user.model')
module.exports.getUser = async function (ctx) {
  console.log(ctx.query)
  let data = await UserModel.findOne({'phone_no': ctx.query.phone_no})
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
    'password': ctx.request.body.password,
    'academics': ctx.request.body.academics,
    'specialization': ctx.request.body.specialization,
    'major_specialization': ctx.request.body.major_specialization,
    'standard_association': ctx.request.body.standard_association,
    'current_standard_association': ctx.request.body.current_standard_association
  }
  let userSchema = new UserModel(userInstance)
  let data = await userSchema.save()
  ctx.body = data
}

module.exports.updateUser = async function (ctx) {
  let body = ctx.request.body;
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
    'password': body.password,
    'academics': body.academics,
    'specialization': body.specialization,
    'major_specialization': body.major_specialization,
    'standard_association': body.standard_association,
    'current_standard_association': body.current_standard_association
  }
  let data = await UserModel.findOneAndUpdate({ 'phone_no': body.phone_no }, userInstance, { new: true })
  ctx.body = data
}

module.exports.removeUser = async function (ctx) {
  let phone_no = ctx.query.phone_no
  let data = await UserModel.findOneAndRemove({ 'phone_no': phone_no })
  ctx.body = data
}














