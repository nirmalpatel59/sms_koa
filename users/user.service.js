const UserModel = require('../models/user.model')
module.exports.getUser = async function (phoneNo) {
  console.log(phoneNo)
  let data = await UserModel.findOne({'phone_no': phoneNo})
  return data
}

module.exports.saveUser = async function (userInstance) {
  let userSchema = new UserModel(userInstance)
  let data = await userSchema.save()
  return data
}

module.exports.updateUser = async function (phoneNo, userInstance) {
  let data = await UserModel.findOneAndUpdate({ 'phone_no': phoneNo }, userInstance, { new: true })
  return data
}

module.exports.removeUser = async function (phoneNo) {
  let data = await UserModel.findOneAndRemove({ 'phone_no': phoneNo })
  return data
}


