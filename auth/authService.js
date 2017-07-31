const UserModel = require('../models/user.model.js')

module.exports.signIn = async function (username, password) {
  let data = await UserModel.find({'phone_no': username})
  return data
}
