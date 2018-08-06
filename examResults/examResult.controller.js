let examResultService = require('./examResult.service.js')

module.exports.getExamResult = async function (ctx) {
  let selector = {
    'examId': ctx.query.examId
  }
  let data = await examResultService.getExamResult(selector)
  ctx.body = data
}

module.exports.addExamResult = async function (ctx) {
  let examData = {
    studentId: ctx.request.body.studentId,
    examId: ctx.request.body.examId,
    marks: ctx.request.body.marks,
    uploaded_by: ctx.auth._id
  }
  let data = await examResultService.addExamResult(examData)
  ctx.body = data
}

module.exports.removeExamResult = async function (ctx) {
  let selector = {
    'emailId': ctx.query.examId
  }
  let data = await examResultService.removeExamResult(selector)
  ctx.body = data
}

module.exports.uploadExamResult = async function (ctx) {
  let fileUrl = ctx.request.body.files.uploadFile.path
  let uploadData = await readFile(fileUrl)
}

let readFile = function (path) {
  let studentObject = []
  let invalidStudentObject = []
  return new Promise((resolve, reject) => {
    csv().fromFile(path)
      .on('json', (jsonObj) => {
        if (validateFileUpload('students', jsonObj)) {
          studentObject.push(jsonObj)
        } else {
          invalidStudentObject.push(jsonObj)
        }
      })
      .on('done', (error) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            studentObject: studentObject,
            invalidStudentObject: invalidStudentObject
          })
        }
      })
  })
}
