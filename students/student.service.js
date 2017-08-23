const StudentModel = require('../models/student.model')
module.exports.getStudent = async function (stdId) {
  let data = await StudentModel.findOne({ '_id': stdId })
  return data
}

module.exports.addStudent = async function (studentData) {
  let studentInstance = new StudentModel(studentData)
  let data = studentInstance.save()
  return data
}

module.exports.updateStudent = async function (stdId, studentData) {
  let data = StudentModel.findOneAndUpdate({ '_id': stdId }, { $set: studentData }, { new: true })
  return data
}

module.exports.removeStudent = async function (studentId) {
  let data = await StudentModel.findOneAndRemove({'_id': studentId})
  return data
}
