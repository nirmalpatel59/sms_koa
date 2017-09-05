const ExamModel = require('../models/exam.model.js')

module.exports.getExam = async function (selector) {
  let data = await ExamModel.findOne(selector).populate('created_by', ['first_name', 'last_name', 'phone_no']).exec()
  return data
}

module.exports.saveExam = async function (ExamData) {
  let ExamInstance = new ExamModel(ExamData)
  let data = await ExamInstance.save()
  return data
}
