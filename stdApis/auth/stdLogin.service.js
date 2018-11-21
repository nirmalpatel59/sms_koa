let stdModel = require('../../models/student.model.js')

module.exports.profileExist = async function (selector) {
  let data = await stdModel.findOne({ '$and': selector })
  return data
}
