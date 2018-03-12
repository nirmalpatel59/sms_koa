let ExamResultModel = require('../models/examResult.model')

module.exports.getExamResult = async function (selector) {
  let data = await ExamResultModel.findOne(selector).populate('studentId uploaded_by examId')
  return data
}

module.exports.addExamResult = async function (examResultData) {
  let ExamResultInstance = new ExamResultModel(examResultData)
  let data = await ExamResultInstance.save(ExamResultInstance)
  return data
}

module.exports.updateExamResult = async function (examResultData) {
  let data = await ExamResultModel.findByIdAndUpdate({ 'examId': examResultData.examId }, { $set: examResultData }, { new: true })
  return data
}

module.exports.removeExamResult = async function (selector) {
  let data = await ExamResultModel.findByIdAndRemove(selector)
  return data
}
