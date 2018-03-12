let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')

let ExamResultSchema = new Schema({
  studentId: { type: Schema.ObjectId, ref: config.collections.STUDENTS },
  examId: { type: String, ref: config.collections.EXAMS },
  marks: { type: Number },
  uploaded_by: { type: Schema.ObjectId, ref: config.collections.USERS }
})

module.exports = mongoose.model(config.collections.EXAM_RESULTS, ExamResultSchema)
