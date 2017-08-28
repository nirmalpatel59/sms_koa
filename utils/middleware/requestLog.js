let moment = require('moment')
module.exports = function () {
  return async function (ctx, next) {
    let startTime = moment()
    await next()
    let endTime = moment()
    console.log('request Time :: ' + endTime.diff(startTime))
  }
}
