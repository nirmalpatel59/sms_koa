const authService = require('./authService')
module.exports.signIn = async function (ctx) {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let data = await authService.signIn(username, password)
  if (varifyUser(username, password, data)) {
    ctx.body = data
  } else {
    ctx.body = []
  }
}

let varifyUser = function (username, password, data) {
  if (data.length === 0 || data.length > 1) {
    return false
  } else if (username !== data[0].phone_no) {
    return false
  } else if (password !== data[0].password) {
    return false
  } else {
    return true
  }
}
