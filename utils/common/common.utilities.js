const bcrypt = require('bcrypt')
const saltRounds = 10
const UserModel = require('../../models/user.model')

module.exports.getHashedPassword = async function (password) {
  let hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

module.exports.getUserData = async function (userSelector) {
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  console.log(userSelector)
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  let data = await UserModel.findOne(userSelector)
  return data
}
