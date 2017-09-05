let examResultService = require('./examResult.service.js')

module.exports.getResultByExamId = function (ctx) {

}

module.exports.addExamResult = async function (ctx) {
  let examData = {
    studentId: ctx.request.body.studentId,
    examId: ctx.request.body.examId,
    marks: ctx.request.body.marks
  }
  let data = await examResultService.addExamResult(examData)
  ctx.body = data
}

module.exports.updateExamResult = function (ctx) {

}

module.exports.updateExamResult = function (ctx) {

}
