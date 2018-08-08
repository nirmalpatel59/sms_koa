let examResultService = require('./examResult.service.js')
let common = require('../utils/common/')

module.exports.getExamResult = async function (ctx) {
  let selector = {
    'exam_id': ctx.query.examId
  }
  let data = await examResultService.getExamResult(selector)
  ctx.body = data
}

module.exports.addExamResult = async function (ctx) {
  let examData = {
    student_id: ctx.request.body.studentId,
    exam_id: ctx.request.body.examId,
    exam_ref_id: ctx.request.body.examRefId,
    marks: ctx.request.body.marks,
    uploaded_by: ctx.auth._id
  }
  let data = await examResultService.addExamResult(examData)
  ctx.body = data
}

module.exports.removeExamResult = async function (ctx) {
  let selector = {
    'exam_id': ctx.query.examId
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
    'student_id': reqBody.studentId,
    'exam_id': reqBody.examId
  }
  let isExist = await examResultService.isExamResultsExists(selector)
  return !!isExist
}
