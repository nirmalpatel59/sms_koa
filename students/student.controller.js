let studentService = require('./student.service')

module.exports.getStudent = async function (ctx) {
  let studentId = ctx.query.studentId
  let data = await studentService.getStudent(studentId)
  ctx.body = data
}

module.exports.addStudent = async function (ctx) {
  let ctxReq = ctx.request.body
  if (isStudentExists()) {

  }
  let studentData = {
    first_name: ctxReq.first_name,
    last_name: ctxReq.last_name,
    middle_name: ctxReq.middle_name || '',
    primary_address: ctxReq.primary_address,
    secondary_address: ctxReq.secondary_address || '',
    phone_no: ctxReq.phone_no,
    e_phone_no: ctxReq.e_phone_no,
    e_name: ctxReq.e_name,
    e_relation: ctxReq.e_relation,
    gender: ctxReq.gender,
    date_of_birth: ctxReq.date_of_birth,
    date_of_joining: ctxReq.date_of_joining,
    academics: ctxReq.academics,
    current_standard: ctxReq.current_standard,
    current_standard_section: ctxReq.current_standard_section,
    current_medium: ctxReq.current_medium,
    current_stream: ctxReq.current_stream,
    current_shift: ctxReq.current_shift,
    current_roll_no: ctxReq.current_roll_no
  }
  let data = await studentService.addStudent(studentData)
  ctx.body = data
}

module.exports.updateStudent = async function (ctx) {
  let ctxReq = ctx.request.body
  let studentData = {
    first_name: ctxReq.first_name,
    last_name: ctxReq.last_name,
    middle_name: ctxReq.middle_name || '',
    primary_address: ctxReq.primary_address,
    secondary_address: ctxReq.secondary_address || '',
    e_phone_no: ctxReq.e_phone_no,
    e_name: ctxReq.e_name,
    e_relation: ctxReq.e_relation,
    date_of_birth: ctxReq.date_of_birth,
    date_of_joining: ctxReq.date_of_joining,
    academics: ctxReq.academics,
    current_standard: ctxReq.current_standard,
    current_standard_section: ctxReq.current_standard_section,
    current_medium: ctxReq.current_medium,
    current_roll_no: ctxReq.current_roll_no
  }

  let data = await studentService.updateStudent(ctxReq._id, studentData)
  ctx.body = data
}

module.exports.removeStudent = async function (ctx) {
  let studentId = ctx.query.studentId
  let data = await studentService.removeStudent(studentId)
  ctx.body = data
}

let isStudentExists = function (studentId) {

}
