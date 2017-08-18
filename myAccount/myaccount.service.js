const UserModel = require('../models/user.model.js')
const getHashedPassword = require('../utils/common/common.utilities').getHashedPassword

module.exports.changePassword = async function (userData, passData) {
  let password = await getHashedPassword(passData.new_password)
  let data = await UserModel.findOneAndUpdate(userData, {'password': password})
  return data
}
