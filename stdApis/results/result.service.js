let resultModel = require('../../models/examResult.model.js')

module.exports.getResult = async function (selector) {
  let data = await resultModel.find(selector).sort({'_id': -1}).populate('exam_ref_id', '_id exam_id exam_name')
  return data
}
