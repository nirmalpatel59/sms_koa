const bcrypt = require('bcrypt')
const saltRounds = 10
const UserModel = require('../../models/user.model')
const csv = require('csvtojson')
const isStudentExists = require('../../students/student.controller').isStudentExists
const isExamResultsExists = require('../../examResults/examResult.controller').isExamResultsExists
//

module.exports.getHashedPassword = async function (password) {
  let hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

module.exports.getUserData = async function (userSelector) {
  let data = await UserModel.findOne(userSelector)
  return data
}

module.exports.readFile = async function (path) {
  var validObjects = []
  var invalidObjects = []
  // const jsonArray = await csv().fromFile(path)
  // return jsonArray
  return new Promise(async (resolve, reject) => {
    await csv().fromFile(path).subscribe(async (jsonObj) => {
      var isExist = await validateFileUpload('students', jsonObj)
      if (isExist) {
        invalidObjects.push(jsonObj)
      } else {
        validObjects.push(jsonObj)
      }
    }).on('done', (error) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve({
          validObjects: validObjects,
          invalidObjects: invalidObjects
        })
      }
    })
  })
}

let validateFileUpload = function (type, obj) {
  var fileValidator
  switch (type) {
    case 'students':
      fileValidator = isStudentExists(obj)
      break
    case 'marks':
      fileValidator = isExamResultsExists(obj)
      break
  }
  return fileValidator
}
