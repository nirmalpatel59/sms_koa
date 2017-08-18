const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const request = require('request')

const getHashedPassword = require('../utils/common').getHashedPassword
const authService = require('./authService')

module.exports.signIn = async function (ctx) {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let data = await authService.signIn(username, password)
  let verificationStatus = await varifyUser(username, password, data)
  if (verificationStatus.status) {
    ctx.body = {
      message: verificationStatus.message,
      token: jwt.sign({ 'username': data[0].phone_no, 'email': data[0].email }, config.auth.secret)
    }
  } else {
    ctx.body = {
      message: verificationStatus.message
    }
  }
}

let varifyUser = async function (username, password, data) {
  if (data.length === 0 || data.length > 1) {
    return {
      status: false,
      message: 'No User Found'
    }
  } else if (!(await verifyPassword(password, data[0].password))) {
    return {
      status: false,
      message: 'Password is wrong '
    }
  } else {
    return {
      status: true,
      message: 'Successfully Signed In'
    }
  }
}

let verifyPassword = async function (pwd, hash) {
  // console.log(pwd)
  // console.log(hash)
  let res = await bcrypt.compare(pwd, hash)
  // console.log(res)
  return res
}

module.exports.signUp = async function (ctx) {
  let userInstance = {
    'first_name': ctx.request.body.first_name,
    'middle_name': ctx.request.body.middle_name,
    'last_name': ctx.request.body.last_name,
    'marital_status': ctx.request.body.marital_status,
    'gender': ctx.request.body.gender,
    'email': ctx.request.body.email,
    'phone_no': ctx.request.body.phone_no,
    'date_of_joining': ctx.request.body.date_of_joining,
    'date_of_birth': ctx.request.body.date_of_birth,
    'role': ctx.request.body.role,
    'status': ctx.request.body.status,
    'type': ctx.request.body.type,
    'password': await getHashedPassword(ctx.request.body.password),
    'academics': ctx.request.body.academics,
    'specialization': ctx.request.body.specialization,
    'major_specialization': ctx.request.body.major_specialization,
    'standard_association': ctx.request.body.standard_association,
    'current_standard_association': ctx.request.body.current_standard_association
  }
  let data = await authService.signUp(userInstance)
  ctx.body = data
}

module.exports.forgotPassword = async function (ctx) {
  let phoneNo = ctx.request.body.phone_no
  let data = await authService.getUserByPhoneNo(phoneNo)
  if (data) {
    let options = { method: 'GET',
      url: 'http://2factor.in/API/V1/85dc3ded-8122-11e7-94da-0200cd936042/SMS/' + phoneNo + '/AUTOGEN',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: {} }

    let body = await request(options)
    console.log(body)
    ctx.body = body
  } else {
    ctx.body = {
      message: 'User not found'
    }
  }
}

module.exports.varifyOTP = async function (ctx) {
  let otp = ctx.request.body.otp
  let details = ctx.request.body.details

  let options = {
    method: 'GET',
    url: 'http://2factor.in/API/V1/85dc3ded-8122-11e7-94da-0200cd936042/SMS/VERIFY/' + details + '/' + otp,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {}
  }

  let body = await request(options)
  console.log(body)
  ctx.body = body
  // let verifiedData = request.get('https://2factor.in/API/V1/85dc3ded-8122-11e7-94da-0200cd936042/SMS/VERIFY/' + details + '/' + otp)
  // ctx.body = verifiedData
}
