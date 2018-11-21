let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')

let ExamResultSchema = new Schema({
  student_id: { type: Schema.ObjectId, ref: config.collections.STUDENTS },
  exam_id: { type: String },
  exam_ref_id: { type: Schema.ObjectId, ref: config.collections.EXAMS },
  marks: { type: Number },
  uploaded_by: { type: Schema.ObjectId, ref: config.collections.USERS }
})

module.exports = mongoose.model(config.collections.EXAM_RESULTS, ExamResultSchema)
