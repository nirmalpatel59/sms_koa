const bcrypt = require('bcrypt')
const saltRounds = 10
const UserModel = require('../../models/user.model')
const csv = require('csvtojson')
const isStudentExists = require('../../students/student.controller').isStudentExists
// isExamResultsExists

module.exports.getHashedPassword = async function (password) {
  let hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

module.exports.getUserData = async function (userSelector) {
  let data = await UserModel.findOne(userSelector)
  return data
}

module.exports.readFile = function (path) {
  let validObjects = []
  let invalidObjects = []
  return new Promise((resolve, reject) => {
    csv().fromFile(path)
      .on('json', (jsonObj) => {
        if (validateFileUpload('students', jsonObj)) {
          validObjects.push(jsonObj)
        } else {
          invalidObjects.push(jsonObj)
        }
      })
      .on('done', (error) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            validObjects: validObjects,
            invalidStudentObject: invalidObjects
          })
        }
      })
  })
}

let validateFileUpload = async function (type, obj) {
  var fileValidator
  switch (type) {
    case 'students':
      fileValidator = await isStudentExists(obj)
      break
    case 'marks':
      // fileValidator = isExamResultsExists(obj)
      break
  }
  return fileValidator
}
