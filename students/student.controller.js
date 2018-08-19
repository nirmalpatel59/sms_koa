// let util = require('util')
let studentService = require('./student.service')
// let csv = require('csvtojson')
let common = require('../utils/common/')
// let config = require('config')
// let fs = require('fs')
// let asyncReadFile = util.promisify(common.readFile)
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

module.exports.getStudents = async function (ctx) {
  // TODO :: extends this endpoint to make generalize querySelector
  let query = {}
  query.current_standard = ctx.query.std
  if (query.current_standard_section) query.current_standard_section = ctx.query.sec
  let data = await studentService.getStudents(query)
  ctx.body = data
}

module.exports.uploadStudents = async function (ctx) {
  let fileUrl = ctx.request.body.files.uploadFile.path
  let uploadData = await common.readFile(fileUrl)
  // for(var i=0;i<upload)
  let data
  if (!uploadData.validObjects) {
    ctx.body = {
      'message': 'Student upload failed',
      'status': 504
    }
  } else if (uploadData.invalidObjects.length > 0) {
    data = await studentService.uploadStudents(uploadData.studentObject)
    ctx.body = {
      'message': 'Student upload partially successful',
      'status': 200,
      'failedData': uploadData.invalidObjects,
      'data': data
    }
  } else {
    data = await studentService.uploadStudents(uploadData.validObjects)
    ctx.body = {
      'message': 'Student uploaded successfully',
      'status': 200,
      'data': data
    }
  }
}

let isStudentExists = module.exports.isStudentExists = async function (reqBody) {
  let selector = {
    'e_phone_no': reqBody.e_phone_no,
    'first_name': reqBody.first_name,
    'last_name': reqBody.last_name
  }
  let isExist = await studentService.isStudentExists(selector)
  return !!isExist
}

// let readFile = function (path) {
//   let studentObject = []
//   let invalidStudentObject = []
//   return new Promise((resolve, reject) => {
//     csv().fromFile(path)
//       .on('json', (jsonObj) => {
//         if (validateFileUpload('students', jsonObj)) {
//           studentObject.push(jsonObj)
//         } else {
//           invalidStudentObject.push(jsonObj)
//         }
//       })
//       .on('done', (error) => {
//         if (error) {
//           reject(error)
//         } else {
//           resolve({
//             studentObject: studentObject,
//             invalidStudentObject: invalidStudentObject
//           })
//         }
//       })
//   })
// }
