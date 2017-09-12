const jwt = require('jsonwebtoken')
const config = require('config')

const stdLoginServices = require('./stdLogin.service')

module.exports.signIn = async function (ctx) {
  let stdDOB = ctx.request.body.date_of_birth
  let ePhone = ctx.request.body.e_phone_no
  let isExist = await verifyProfile(stdDOB, ePhone)

  if (isExist.status) {
    ctx.body = {
      message: isExist.message,
      token: jwt.sign({
        'username': isExist.data.e_phone_no,
        'date_of_birth': isExist.data.date_of_birth,
        'first_name': isExist.data.first_name,
        'last_name': isExist.data.last_name
      }, config.auth.secret)
    }
  } else {
    ctx.body = isExist.message
  }
}

let verifyProfile = async function (stdDOB, ePhone) {
  let selector = [{ e_phone_no: ePhone }, { date_of_birth: stdDOB }]
  let stdData = await stdLoginServices.profileExist(selector)
  if (!stdData) {
    return {
      status: false,
      message: 'No Profile Found with given details'
    }
  } else if (!(matchProfile(stdDOB, ePhone, stdData))) {
    return {
      status: false,
      message: 'Credentials do not match'
    }
  } else {
    return {
      status: true,
      message: 'successfully loggedIn',
      data: stdData
    }
  }
}

let matchProfile = function (stdDOB, ePhone, stdData) {
  if (stdData.date_of_birth === stdDOB && stdData.e_phone_no === ePhone) {
    return true
  } else {
    return false
  }
}
