const UserModel = require('../models/user.model')
module.exports.getUsers = async function (ctx) {
  console.log(ctx.query)
  let data = await UserModel.findOne({'phone_no': ctx.query.phone_no})
  ctx.body = data
}

module.exports.saveUsers = async function (ctx) {
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
