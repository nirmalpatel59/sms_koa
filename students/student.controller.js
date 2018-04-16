let studentService = require('./student.service')
let csv = require('csvtojson')
// let config = require('config')
// let fs = require('fs')

module.exports.getStudent = async function (ctx) {
  let studentId = ctx.query.studentId
  let data = await studentService.getStudent(studentId)
  ctx.body = data
}

module.exports.addStudent = async function (ctx) {
  let ctxReq = ctx.request.body
  if (!(await isStudentExists(ctxReq))) {
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
  } else {
    ctx.body = {
      message: 'User Already exist',
      code: 200
    }
  }
}

module.exports.updateStudent = async function (ctx) {
  let ctxReq = ctx.request.body
  let data = await studentService.updateStudent(ctxReq._id, ctx.request.body)
  ctx.body = data
}

module.exports.removeStudent = async function (ctx) {
  let studentId = ctx.query.studentId
  let data = await studentService.removeStudent(studentId)
  ctx.body = data
}

module.exports.uploadStudents = async function (ctx) {
  let fileUrl = ctx.request.body.files.uploadFile.path
  let uploadData = await readFile(fileUrl)
  let data
  if (uploadData.invalidStudentObject.length === 0 && uploadData.studentObject.length) {
    let data = await studentService.uploadStudents(uploadData)
  } else {

  }

  ctx.body = data
}

let isStudentExists = async function (reqBody) {
  let selector = {
    'e_phone_no': reqBody.e_phone_no,
    'first_name': reqBody.first_name,
    'last_name': reqBody.last_name
  }
  let isExist = await studentService.isStudentExists(selector)
  return isExist
}

let readFile = async function (path) {
  let studentObject = []
  let invalidStudentObject = []
  return new Promise((resolve, reject) => {
    csv().fromFile(path)
      .on('json', (jsonObj) => {
        if (validateFileUpload('students', jsonObj)) {
          studentObject.push(jsonObj)
        } else {
          invalidStudentObject.push(jsonObj)
        }
      })
      .on('done', (error) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            studentObject: studentObject,
            invalidStudentObject: invalidStudentObject
          })
        }
      })
  })
}

let validateFileUpload = async function (type, obj) {
  var fileValidator
  switch (type) {
    case 'students':
      fileValidator = await isStudentExists(obj)
      break
    case 'marks':
      break
  }
  return fileValidator
}
