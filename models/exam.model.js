let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')

let examSchema = new Schema({
  exam_id: { type: String, required: true, unique: true },
  exam_name: { type: String, required: true },
  exam_description: { type: String },
  type: { type: String },
  total_marks: { type: Number, required: true },
  standard: { type: Number, required: true },
  medium: { type: String },
  standard_stream: { type: String },
  subject: { type: String, require: true },
  created_by: { type: Schema.ObjectId, ref: config.collections.USERS },
  duration: { type: Number },
  duration_type: { type: String },
  passing_marks: { type: Number },
  exam_date: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model(config.collections.EXAMS, examSchema)
