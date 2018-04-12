let moment = require('moment')
module.exports.requestLog = async function (ctx, next) {
  let startTime = moment()
  await next()
  let endTime = moment()
  console.log('API url :: ' + ctx.url + ' request Time :: ' + endTime.diff(startTime) + ' ms')
}
