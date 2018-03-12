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

module.exports.updateExamResult = async function (ctx) {
  let reqBody = ctx.request.body
  let data = await examResultService.updateExamResult(reqBody)
  ctx.body = data
}

module.exports.removeExamResult = async function (ctx) {
  let selector = {
    'emailId': ctx.query.examId
  }
  let data = await examResultService.removeExamResult(selector)
  ctx.body = data
}
