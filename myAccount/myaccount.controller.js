const jwt = require('jsonwebtoken')
// const myAccountService = require('./myaccount.services')

module.exports.changePassword = async function (ctx) {
  console.log(ctx)
  var decoded = jwt.decode(ctx, {complete: true});
  console.log(decoded.header)
  console.log(decoded.payload)
  ctx.body = {
    'tets': 'fdsfs'
  }
  // let decodedData = await ctx
  // let currentPassword = ctx.request.body.current_password
  // let newPassword = ctx.request.body.current_password
  // let data = await myAccountService.changePassword()
  // ctx.body = data
}
