let examResultService = require('./examResult.service.js')
let common = require('../utils/common/')

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
  let uploadData = await common.readFile(fileUrl, 'exams')
  if (!uploadData.validObjects) {
    ctx.body = {
      'message': 'Result upload failed',
      'status': 200
    }
  } else if (uploadData.invalidObjects && uploadData.invalidObjects.length > 0) {
    let data = await examResultService.uploadExamResult(uploadData.validObjects)
    ctx.body = {
      'message': 'Result uploaded partially',
      'status': 200,
      'failedData': uploadData.invalidObjects,
      'data': data
    }
  } else {
    let data = await examResultService.uploadExamResult(uploadData.validObjects)
    ctx.body = {
      'message': 'Result successfully updated',
      'status': 200,
      'failedData': '',
      'data': data
    }
  }
}

module.exports.isExamResultsExists = async function (reqBody) {
  let selector = {
    'studentId': reqBody.studentId,
    'examID': reqBody.examId
  }
  let isExist = await examResultService.isExamResultsExists(selector)
  return !!isExist
}
