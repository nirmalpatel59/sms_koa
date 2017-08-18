const bcrypt = require('bcrypt')
const myAccountService = require('./myaccount.service')
const getUserData = require('../utils/common/common.utilities').getUserData
// const jwt = require('jsonwebtoken')
// const myAccountService = require('./myaccount.services')

module.exports.changePassword = async function (ctx) {
  // console.log(ctx.auth)
  let userData = {
    'phone_no': ctx.auth.username
  }

  let cpData = {
    'old_password': ctx.request.body.old_password,
    'new_password': ctx.request.body.new_password,
    'confirm_password': ctx.request.body.confirm_password
  }
  let data = await getUserData(userData)

  if (data) {
    let verificationData = await verifyPassword(data, cpData)
    if (verificationData.status) {
      let cData = await myAccountService.changePassword(userData, cpData)
      if (cData) {
        ctx.body = {
          message: 'Password successfully changed',
          data: cData
        }
      } else {
        // TODO :: Handle error when db operation fails from service
        ctx.body = {
          message: 'error  in Db operation'
        }
      }
    } else {
      ctx.body = {
        message: verificationData.message
      }
    }
  } else {
    // no user found with current auth token
    ctx.throw('Authentication required', 401)
  }
  // ctx.body = {
  //   'tets': 'fdsfs'
  // }
  // let decodedData = await ctx
  // let currentPassword = ctx.request.body.current_password
  // let newPassword = ctx.request.body.current_password
  // let data = await myAccountService.changePassword()
  // ctx.body = data
}

let verifyPassword = async function (userData, cpData) {
  if (!cpData.old_password || !cpData.new_password || !cpData.confirm_password) {
    return {
      message: 'Password fields are improper',
      status: false
    }
  } else if (cpData.new_password !== cpData.confirm_password) {
    return {
      message: 'New password and confirm password do not match',
      status: false
    }
  } else if (!(await matchOldPassword(userData.password, cpData.old_password))) {
    return {
      message: 'Current password is wrong',
      status: false
    }
  } else {
    return {
      message: '',
      status: true
    }
  }
}

let matchOldPassword = async function (upass, opass) {
  let res = await bcrypt.compare(opass, upass)
  return res
}
