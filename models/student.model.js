let mongoose = require('mongoose')
let Schema = mongoose.Schema
let config = require('config')
mongoose.Promise = Promise

let studentSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  middle_name: { type: String },
  primary_address: { type: String, required: true },
  secondary_address: { type: String },
  phone_no: { type: String },
  e_phone_no: { type: String, required: true, unique: true },
  e_name: { type: String, required: true },
  e_relation: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  date_of_joining: { type: String },
  academics: [{
    standard: { type: String },
    standard_section: { type: String },
    medium: { type: String },
    stream: { type: String },
    shift: { type: String },
    roll_no: { type: String },
    _id: false
  }],
  current_standard: { type: String },
  current_standard_section: { type: String },
  current_medium: { type: String },
  current_stream: { type: String },
  current_shift: { type: String },
  current_roll_no: { type: String }
})

module.exports = mongoose.model(config.collections.STUDENTS, studentSchema)
