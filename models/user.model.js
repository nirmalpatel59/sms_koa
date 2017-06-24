let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  first_name: {type: String, required: true},
  middle_name: { type: String },
  last_name: { type: String, required: true },
  marital_status: { type: String },
  gender: { type: String, required: true },
  email: { type: String },
  phone_no: { type: String, required: true, unique: true },
  date_of_joining: { type: String },
  date_of_birth: { type: String },
  role: { type: String, required: true },
  status: { type: String, default: 'active' },
  type: { type: String },
  password: { type: String },
  academics: {type: Array},
  specialization: {type: Array},
  major_specialization: {type: String},
  standard_association: {type: Array},
  current_standard_association: {type: Array}
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)
