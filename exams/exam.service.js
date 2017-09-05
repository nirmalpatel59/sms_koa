const ExamModel = require('../models/exam.model.js')

module.exports.getExam = async function (selector) {
  let data = await ExamModel.findOne(selector).populate('created_by', ['first_name', 'last_name', 'phone_no']).exec()
  return data
}

module.exports.saveExam = async function (examData) {
  let ExamInstance = new ExamModel(examData)
  let data = await ExamInstance.save()
  return data
}

module.exports.updateExam = async function (examData) {
  let data = await ExamModel.findOneAndUpdate({ '_id': examData.examId }, { $set: examData }, { new: true })
  return data
}

module.exports.removeExam = async function (selector) {
  let data = await ExamModel.findByIdAndRemove(selector)
  return data
}
