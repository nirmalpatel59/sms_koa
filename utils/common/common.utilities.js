const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports.getHashedPassword = async function (password) {
  let hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}
