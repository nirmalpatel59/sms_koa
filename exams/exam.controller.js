let examService = require('./exam.service.js')

module.exports.getExam = async function (ctx) {
  let ExamIdSelector = {
    'exam_id': ctx.query.examId
  }
  let data = await examService.getExam(ExamIdSelector)
  ctx.body = data
}

module.exports.saveExam = async function (ctx) {
  let ctxReqBody = ctx.request.body
  let ExamData = {
    exam_id: ctxReqBody.exam_id,
    exam_name: ctxReqBody.exam_name,
    type: ctxReqBody.type,
    total_marks: ctxReqBody.total_marks,
    standard: ctxReqBody.standard,
    medium: ctxReqBody.medium,
    standard_stream: ctxReqBody.standard_stream,
    subject: ctxReqBody.subject,
    created_by: ctxReqBody.created_by,
    duration: ctxReqBody.duration,
    duration_type: ctxReqBody.duration_type,
    passing_marks: ctxReqBody.passing_marks,
    exam_date: ctxReqBody.exam_date
  }
  let data = await examService.saveExam(ExamData)
  ctx.body = data
}

module.exports.updateExam = function (ctx) {

}

module.exports.removeExam = function (ctx) {

}
