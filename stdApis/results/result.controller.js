const resultServices = require('./result.service')
module.exports.getResultByStudentId = async function (ctx) {
  let selector = {
    student_id: ctx.request.body.studentId
  }
  let data = await resultServices.getResult(selector)
  ctx.body = {
    status: true,
    data: data
  }
}

module.exports.getNews = async function (ctx) {

}

module.exports.getProfile = async function (ctx) {

}
