const mongoose = require('mongoose')
const config = require('config')
const dbUri = config.mongodb.uri
const options = {
  useMongoClient: true
}
mongoose.connect(dbUri, options)
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', function () {
  console.log('error while connecting to MongoDB')
})

mongoose.connection.on('disconnected', function () {
  console.log('DB disconnected')
})
mongoose.connection.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('DB connection terminated by application')
    process.exit(0)
  })
})
// module.exports = function() {
//   return async function authorize(ctx, next) {

//     await next()
//   }
// }
