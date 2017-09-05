let ExamResultModel = require('../models/examResult.model')

module.exports.addExamResult = async function (examResultData) {
  let ExamResultInstance = new ExamResultModel(examResultData)
  let data = await ExamResultInstance.save(ExamResultInstance)
  return data
}
