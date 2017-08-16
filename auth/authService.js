const UserModel = require('../models/user.model.js')

module.exports.signIn = async function (username, password) {
  let data = await UserModel.find({'phone_no': username}, ['phone_no', 'password'])
  return data
}

module.exports.signUp = async function (userInstance) {
  let UserSchema = new UserModel(userInstance)
  let data = UserSchema.save()
  return data
}

module.exports.getUserByPhoneNo = async function (phoneNo) {
  let data = UserModel.findOne({ 'phone_no': phoneNo })
  return data
}
